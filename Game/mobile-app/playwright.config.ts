import { defineConfig } from '@playwright/test';

const built = process.env.LITTLE_ROUTES_TEST_BUILT === '1';
const baseURL = `http://127.0.0.1:${built ? 4173 : 5173}`;

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: built ? './test-results/built' : './test-results/dev',
  ...(built
    ? { testMatch: 'built-smoke.spec.ts' }
    : { testIgnore: 'built-smoke.spec.ts' }),
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: { baseURL },
  projects: [
    { name: 'small-landscape', use: { viewport: { width: 667, height: 375 } } },
    {
      name: 'standard-landscape',
      use: { viewport: { width: 844, height: 390 } },
    },
  ],
  webServer: {
    command: built ? 'npm run preview' : 'npm run dev',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
