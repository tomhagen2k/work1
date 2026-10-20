import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, URL } from 'node:url';

const cli = fileURLToPath(
  new URL('../node_modules/@playwright/test/cli.js', import.meta.url),
);
const result = spawnSync(
  process.execPath,
  [cli, 'test', ...process.argv.slice(2)],
  {
    stdio: 'inherit',
    env: { ...process.env, LITTLE_ROUTES_TEST_BUILT: '1' },
  },
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
