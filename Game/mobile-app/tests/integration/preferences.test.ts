import { describe, expect, it } from 'vitest';
import { createPreferencesStorage } from '../../src/services/preferences-storage';
import type { PreferencesPort } from '../../src/services/preferences-storage';
import { SaveService, SAVE_KEY } from '../../src/services/save-service';

describe('native storage adapter contracts (native execution tested separately on AVD)', () => {
  it('loads native values first, preserves legacy prototype keys and writes through only after acknowledgement', async () => {
    const values = new Map<string, string>([[SAVE_KEY, 'native-value']]);
    const preferences: PreferencesPort = {
      get: async ({ key }) => ({ value: values.get(key) ?? null }),
      set: async ({ key, value }) => {
        values.set(key, value);
      },
    };
    let legacyWrites = 0;
    const port = await createPreferencesStorage(preferences, {
      getItem: () => 'legacy-value',
      setItem: () => {
        legacyWrites++;
      },
    });
    expect(port.getItem(SAVE_KEY)).toBe('native-value');
    await port.setItem(SAVE_KEY, 'new-value');
    expect(port.getItem(SAVE_KEY)).toBe('new-value');
    expect(values.get(SAVE_KEY)).toBe('new-value');
    expect(legacyWrites).toBe(0);
  });
  it('reports unavailable storage without overwriting earlier data when native reads fail', async () => {
    let writes = 0;
    const port = await createPreferencesStorage(
      {
        get: async () => {
          throw new Error('Denied');
        },
        set: async () => {
          writes++;
        },
      },
      {
        getItem: () => null,
        setItem: () => {
          writes++;
        },
      },
    );
    const saves = new SaveService(port);
    saves.update({ timeItems: 1, giftGranted: true }, 'c1-l1', null);
    await saves.flush();
    expect(saves.warning).toContain('chặn');
    expect(writes).toBe(0);
  });
  it('propagates native write failures and preserves the last committed cache value', async () => {
    const port = await createPreferencesStorage(
      {
        get: async () => ({ value: null }),
        set: async () => {
          throw new Error('Disk full');
        },
      },
      { getItem: () => null, setItem: () => undefined },
    );
    const saves = new SaveService(port);
    saves.update({ timeItems: 1, giftGranted: true }, 'c1-l1', null);
    await saves.flush();
    expect(port.getItem(SAVE_KEY)).toBeNull();
    expect(saves.warning).toContain('Không lưu');
    expect(saves.saving).toBe(false);
  });
});
