import { Capacitor } from '@capacitor/core';
import { browserStorage } from './browser-storage';
import type { StoragePort } from './save-service';
import { createPreferencesStorage } from './preferences-storage';

export async function createPlatformStorage(): Promise<StoragePort> {
  if (!Capacitor.isNativePlatform()) return browserStorage;
  const { Preferences } = await import('@capacitor/preferences');
  return createPreferencesStorage(Preferences, browserStorage);
}
