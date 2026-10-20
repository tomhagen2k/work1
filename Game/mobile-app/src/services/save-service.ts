import Ajv from 'ajv';
import type { TimeAccount } from '../core/model';

export interface StoragePort {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void | Promise<void>;
}
export interface BestResult {
  seconds: number;
  stars: number;
}
export interface SaveData {
  version: 1;
  revision: number;
  account: TimeAccount;
  best: Record<string, BestResult>;
}
export const SAVE_KEY = 'little-routes.mobile.save.v1';
export const BACKUP_KEY = `${SAVE_KEY}.backup`;
const fresh = (): SaveData => ({
  version: 1,
  revision: 0,
  account: { timeItems: 0, giftGranted: false },
  best: {},
});
const validate = new Ajv({ strict: true }).compile<SaveData>({
  type: 'object',
  additionalProperties: false,
  required: ['version', 'revision', 'account', 'best'],
  properties: {
    version: { type: 'integer', const: 1 },
    revision: { type: 'integer', minimum: 0 },
    account: {
      type: 'object',
      additionalProperties: false,
      required: ['timeItems', 'giftGranted'],
      properties: {
        timeItems: { type: 'integer', minimum: 0, maximum: 999 },
        giftGranted: { type: 'boolean' },
      },
    },
    best: {
      type: 'object',
      maxProperties: 200,
      additionalProperties: false,
      patternProperties: {
        '^[a-z][a-z0-9-]{0,63}$': {
          type: 'object',
          additionalProperties: false,
          required: ['seconds', 'stars'],
          properties: {
            seconds: { type: 'number', minimum: 0, maximum: 4000 },
            stars: { type: 'integer', minimum: 1, maximum: 3 },
          },
        },
      },
    },
  },
});

/** Two atomic storage slots. Unsupported/corrupt saves remain intact for recovery. */
export class SaveService {
  private data = fresh();
  private readOnly = false;
  private writes: Promise<void> = Promise.resolve();
  private pendingWrites = 0;
  private readonly listeners = new Set<() => void>();
  warning: string | null = null;
  constructor(private readonly storage: StoragePort) {
    this.load();
  }
  snapshot(): SaveData {
    return structuredClone(this.data);
  }
  get saving(): boolean {
    return this.pendingWrites > 0;
  }
  onChange(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  async flush(): Promise<void> {
    await this.writes;
  }
  update(
    account: TimeAccount,
    levelId: string,
    result: BestResult | null,
  ): void {
    const next = this.snapshot();
    next.account = { ...account };
    if (result) {
      const previous = next.best[levelId];
      next.best[levelId] = {
        seconds: Math.min(previous?.seconds ?? Infinity, result.seconds),
        stars: Math.max(previous?.stars ?? 0, result.stars),
      };
    }
    if (
      JSON.stringify({ ...next, revision: 0 }) ===
      JSON.stringify({ ...this.data, revision: 0 })
    )
      return;
    next.revision++;
    if (!validate(next)) throw new Error('Refusing invalid save transaction');
    this.data = next; // Current session still works if persistence is unavailable.
    if (this.readOnly) return;
    const payload = JSON.stringify(next);
    this.pendingWrites++;
    this.writes = this.writes.then(async () => {
      try {
        const previous = this.storage.getItem(SAVE_KEY);
        if (previous !== null && this.decode(previous))
          await this.storage.setItem(BACKUP_KEY, previous);
        await this.storage.setItem(SAVE_KEY, payload);
        this.warning = null;
      } catch {
        this.warning =
          'Không lưu được trên thiết bị này. Kết quả hiện chỉ giữ trong phiên chơi.';
      } finally {
        this.pendingWrites--;
        this.notify();
      }
    });
    this.notify();
  }
  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }
  private decode(raw: string): SaveData | null {
    try {
      const value: unknown = JSON.parse(raw);
      return validate(value) ? value : null;
    } catch {
      return null;
    } // Invalid JSON is handled explicitly by load/recovery below.
  }
  private load(): void {
    try {
      const raw = this.storage.getItem(SAVE_KEY);
      if (raw === null) return;
      const primary = this.decode(raw);
      if (primary) {
        this.data = primary;
        return;
      }
      const backup = this.storage.getItem(BACKUP_KEY);
      const recovered = backup !== null ? this.decode(backup) : null;
      if (recovered) this.data = recovered;
      this.readOnly = true;
      this.warning = recovered
        ? 'Đã đọc bản lưu dự phòng. Giữ nguyên bản lỗi; tạm chơi mà không ghi đè dữ liệu.'
        : 'Bản lưu hỏng hoặc khác phiên bản. Giữ nguyên dữ liệu cũ; tạm chơi trong bộ nhớ.';
    } catch {
      this.readOnly = true;
      this.warning =
        'Thiết bị chặn lưu dữ liệu. Tiến trình chỉ giữ trong phiên chơi.';
    }
  }
}
