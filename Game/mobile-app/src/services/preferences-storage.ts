import { SAVE_KEY, BACKUP_KEY } from './save-service';
import type { StoragePort } from './save-service';

export interface PreferencesPort {
  get(options: { key: string }): Promise<{ value: string | null }>;
  set(options: { key: string; value: string }): Promise<void>;
}
/** Hydrate once; SaveService serializes and awaits writes before reporting completion. */
export async function createPreferencesStorage(
  preferences: PreferencesPort,
  legacy: StoragePort,
): Promise<StoragePort> {
  try {
    const values = await Promise.all(
      [SAVE_KEY, BACKUP_KEY].map(async (key) => {
        const { value } = await preferences.get({ key });
        // Read only this app's earlier prototype namespace. Never erase or migrate demo keys.
        return [key, value ?? legacy.getItem(key)] as const;
      }),
    );
    const cache = new Map(values);
    return {
      getItem: (key) => cache.get(key) ?? null,
      setItem: async (key, value) => {
        await preferences.set({ key, value });
        cache.set(key, value);
      },
    };
  } catch (error) {
    const unavailable = () => {
      throw new Error('Native save is unavailable', { cause: error });
    };
    return { getItem: unavailable, setItem: unavailable }; // SaveService preserves data and reports read-only play.
  }
}
