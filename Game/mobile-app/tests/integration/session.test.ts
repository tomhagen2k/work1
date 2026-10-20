import { describe, expect, it } from 'vitest';
import { Session } from '../../src/application/session';
import { FixedClock } from '../../src/application/fixed-clock';
import { loadFirstLevel } from '../../src/content/load-level';
import {
  SaveService,
  SAVE_KEY,
  BACKUP_KEY,
} from '../../src/services/save-service';
import type { StoragePort } from '../../src/services/save-service';
import { completeFirstLevel } from '../support/drive-first-level';

class MemoryStorage implements StoragePort {
  readonly items = new Map<string, string>();
  failWrites = false;
  getItem(key: string) {
    return this.items.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    if (this.failWrites) throw new Error('Quota exceeded');
    this.items.set(key, value);
  }
}
describe('session and persistence boundary', () => {
  it('records a win reached through gameplay exactly once, and reloads by stable level ID', async () => {
    const storage = new MemoryStorage();
    const session = new Session(loadFirstLevel(), new SaveService(storage));
    completeFirstLevel(session);
    const revision = session.saves.snapshot().revision;
    expect(revision).toBe(1);
    for (let i = 0; i < 600; i++) session.tick();
    expect(session.saves.snapshot().revision).toBe(revision);
    await session.saves.flush();
    expect(new SaveService(storage).snapshot().best['c1-l1']).toEqual({
      seconds: session.snapshot().elapsedTicks / 60,
      stars: 3,
    });
    session.restart();
    expect(session.snapshot().phase).toBe('ready');
    expect(session.saves.snapshot().best['c1-l1']?.stars).toBe(3);
  });
  it('persists the real timeout gift and consumes it across restart/reload without granting twice', async () => {
    const storage = new MemoryStorage();
    const session = new Session(loadFirstLevel(), new SaveService(storage));
    session.command({ type: 'direction', direction: 'right' });
    session.command({ type: 'direction', direction: 'down' });
    for (let i = 0; i < 5400; i++) session.tick();
    expect(session.snapshot().phase).toBe('timeout');
    await session.saves.flush();
    expect(new SaveService(storage).snapshot().account).toEqual({
      timeItems: 1,
      giftGranted: true,
    });
    session.command({ type: 'extend' });
    await session.saves.flush();
    session.restart();
    expect(session.snapshot().elapsedTicks).toBe(0);
    const reload = new Session(loadFirstLevel(), new SaveService(storage));
    expect(reload.snapshot().timeAccount).toEqual({
      timeItems: 0,
      giftGranted: true,
    });
  });
  it('keeps the fastest time and highest stars independently and ignores duplicate transactions', async () => {
    const storage = new MemoryStorage();
    const saves = new SaveService(storage);
    const account = saves.snapshot().account;
    saves.update(account, 'c1-l1', { seconds: 35, stars: 3 });
    saves.update(account, 'c1-l1', { seconds: 30, stars: 1 });
    const revision = saves.snapshot().revision;
    saves.update(account, 'c1-l1', { seconds: 30, stars: 1 });
    expect(saves.snapshot().revision).toBe(revision);
    await saves.flush();
    expect(new SaveService(storage).snapshot().best['c1-l1']).toEqual({
      seconds: 30,
      stars: 3,
    });
    expect(storage.getItem(BACKUP_KEY)).not.toBeNull();
  });
  it.each(['{broken', '{"version":99}', '{"version":1,"account":{}}'])(
    'preserves incompatible/corrupt data: %s',
    (raw) => {
      const storage = new MemoryStorage();
      storage.setItem(SAVE_KEY, raw);
      const saves = new SaveService(storage);
      expect(saves.warning).not.toBeNull();
      saves.update({ timeItems: 1, giftGranted: true }, 'c1-l1', null);
      expect(storage.getItem(SAVE_KEY)).toBe(raw);
    },
  );
  it('recovers a valid backup without overwriting the broken primary', async () => {
    const storage = new MemoryStorage();
    const saves = new SaveService(storage);
    saves.update({ timeItems: 1, giftGranted: true }, 'c1-l1', null);
    saves.update({ timeItems: 0, giftGranted: true }, 'c1-l1', null);
    await saves.flush();
    storage.setItem(SAVE_KEY, '{broken');
    const restored = new SaveService(storage);
    expect(restored.snapshot().account.timeItems).toBe(1);
    expect(restored.warning).toContain('dự phòng');
    restored.update({ timeItems: 0, giftGranted: true }, 'c1-l1', null);
    expect(storage.getItem(SAVE_KEY)).toBe('{broken');
  });
  it('handles storage denial and quota errors, preserves old data, and exposes a warning', async () => {
    const denied = new SaveService({
      getItem: () => {
        throw new Error('Denied');
      },
      setItem: () => {
        throw new Error('Denied');
      },
    });
    expect(denied.warning).toContain('chặn');
    const storage = new MemoryStorage();
    const saves = new SaveService(storage);
    saves.update({ timeItems: 1, giftGranted: true }, 'c1-l1', null);
    await saves.flush();
    const previous = storage.getItem(SAVE_KEY);
    storage.failWrites = true;
    saves.update({ timeItems: 0, giftGranted: true }, 'c1-l1', null);
    await saves.flush();
    expect(storage.getItem(SAVE_KEY)).toBe(previous);
    expect(saves.warning).toContain('Không lưu');
  });
  it('waits for asynchronous storage acknowledgement and serializes primary/backup transactions', async () => {
    const values = new Map<string, string>();
    let release: (() => void) | undefined;
    const barrier = new Promise<void>((resolve) => {
      release = resolve;
    });
    const storage: StoragePort = {
      getItem: (key) => values.get(key) ?? null,
      setItem: async (key, value) => {
        await barrier;
        values.set(key, value);
      },
    };
    const saves = new SaveService(storage),
      notifications: boolean[] = [];
    const unsubscribe = saves.onChange(() => notifications.push(saves.saving));
    saves.update({ timeItems: 1, giftGranted: true }, 'c1-l1', null);
    saves.update({ timeItems: 0, giftGranted: true }, 'c1-l1', {
      seconds: 31,
      stars: 3,
    });
    expect(saves.saving).toBe(true);
    expect(values.size).toBe(0);
    release?.();
    await saves.flush();
    expect(saves.saving).toBe(false);
    expect(JSON.parse(values.get(SAVE_KEY)!).revision).toBe(2);
    expect(JSON.parse(values.get(BACKUP_KEY)!).revision).toBe(1);
    expect(notifications.at(-1)).toBe(false);
    unsubscribe();
  });
  it('uses fixed ticks independent of frame partition and drops background-sized gaps', () => {
    const run = (frames: number[]) => {
      let ticks = 0;
      const clock = new FixedClock();
      frames.forEach((now) => clock.frame(now, () => ticks++));
      return ticks;
    };
    expect(run([0, 50, 100, 150, 200])).toBe(12);
    expect(run([0, 200])).toBe(12);
    expect(run([0, 100_000])).toBe(15);
    let ticks = 0;
    const clock = new FixedClock();
    clock.frame(0, () => ticks++);
    clock.reset();
    clock.frame(100_000, () => ticks++);
    expect(ticks).toBe(0);
  });
});
