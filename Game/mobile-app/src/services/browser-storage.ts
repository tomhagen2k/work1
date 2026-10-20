import type { StoragePort } from './save-service';
// Access can throw (privacy mode/quota); SaveService handles both reads and writes.
export const browserStorage: StoragePort = {
  getItem: (key) => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
};
