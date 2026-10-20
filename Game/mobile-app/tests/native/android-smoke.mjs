import assert from 'node:assert/strict';
import process from 'node:process';
import console from 'node:console';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from '@playwright/test';

// Only the approved debug app on an explicitly selected emulator; never clear app data.
const serial = process.env.LITTLE_ROUTES_ANDROID_SERIAL;
assert(
  serial?.startsWith('emulator-'),
  'Set LITTLE_ROUTES_ANDROID_SERIAL to the dedicated emulator serial',
);
assert(process.env.ANDROID_HOME, 'Set ANDROID_HOME to the installed SDK');
const executable = join(
  process.env.ANDROID_HOME,
  'platform-tools',
  process.platform === 'win32' ? 'adb.exe' : 'adb',
);
const raw = (...args) =>
  execFileSync(executable, ['-s', serial, ...args], {
    timeout: 30_000,
    maxBuffer: 12 * 1024 * 1024,
  });
const adb = (...args) =>
  raw(...args)
    .toString('utf8')
    .trim();
assert.equal(
  adb('shell', 'getprop', 'ro.kernel.qemu'),
  '1',
  'Refusing a physical device',
);
const packageId = 'dev.littleroutes.slice';
const component = `${packageId}/.MainActivity`;
const output = join(process.cwd(), 'test-results', 'android');
mkdirSync(output, { recursive: true });
const report = {
  status: 'running',
  serial,
  api: adb('shell', 'getprop', 'ro.build.version.sdk'),
  checks: [],
  started: new Date().toISOString(),
};
const oldWifi = adb('shell', 'settings', 'get', 'global', 'wifi_on');
const oldData = adb('shell', 'settings', 'get', 'global', 'mobile_data');
let browser, page, forwardPort, touchBounds;
const pageErrors = [];
function verified(check) {
  report.checks.push(check);
  console.log(`PASS: ${check}`);
  writeFileSync(join(output, 'report.json'), JSON.stringify(report, null, 2));
}
async function waitFor(condition, description, seconds = 20) {
  const deadline = Date.now() + seconds * 1000;
  while (Date.now() < deadline) {
    if (await condition()) return;
    await delay(100);
  }
  throw new Error(`Timed out: ${description}`);
}
async function detach() {
  if (browser) {
    await browser.close();
    browser = undefined;
  }
  if (forwardPort) {
    adb('forward', '--remove', `tcp:${forwardPort}`);
    forwardPort = undefined;
  }
}
async function attach() {
  touchBounds = undefined;
  let lastError;
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const pid = adb('shell', 'pidof', packageId).split(/\s+/)[0];
      assert(pid && /^\d+$/.test(pid), 'App process is not ready');
      const sockets = adb('shell', 'cat', '/proc/net/unix');
      assert(
        sockets.includes(`@webview_devtools_remote_${pid}`),
        'WebView debugging socket not ready',
      );
      forwardPort = adb(
        'forward',
        'tcp:0',
        `localabstract:webview_devtools_remote_${pid}`,
      );
      assert(/^\d+$/.test(forwardPort));
      browser = await chromium.connectOverCDP(
        `http://127.0.0.1:${forwardPort}`,
        { timeout: 5000, noDefaults: true },
      );
      page = browser
        .contexts()[0]
        ?.pages()
        .find((target) => target.url().startsWith('https://localhost'));
      assert(page, 'Expected packaged Capacitor localhost page');
      page.on('pageerror', (error) => pageErrors.push(error.message));
      await page
        .locator('canvas')
        .waitFor({ state: 'visible', timeout: 15_000 });
      return;
    } catch (error) {
      lastError = error;
      await detach();
      await delay(250);
    }
  }
  throw new Error(`Cannot attach to installed WebView: ${String(lastError)}`);
}
const attribute = (name) => page.locator('#app').getAttribute(name);
const phase = () => attribute('data-phase');
async function tap(name) {
  const box = await page
    .getByRole('button', { name, exact: true })
    .boundingBox();
  assert(box, `Button is not visible: ${name}`);
  // Calibrate once while stationary; uiautomator idle waits must not delay timed turns.
  if (!touchBounds) {
    adb('shell', 'uiautomator', 'dump', '/sdcard/little-routes-view.xml');
    const xml = adb('shell', 'cat', '/sdcard/little-routes-view.xml');
    const match = xml.match(
      /<node\b[^>]*class="android.webkit.WebView"[^>]*bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/,
    );
    assert(match, 'Cannot determine native WebView bounds');
    touchBounds = match.slice(1).map(Number);
  }
  const [left, top, right, bottom] = touchBounds;
  const viewport = await page.evaluate(() => ({
    width: globalThis.innerWidth,
    height: globalThis.innerHeight,
  }));
  const x = Math.round(
    left + ((box.x + box.width / 2) * (right - left)) / viewport.width,
  );
  const y = Math.round(
    top + ((box.y + box.height / 2) * (bottom - top)) / viewport.height,
  );
  adb('shell', 'input', 'tap', String(x), String(y));
}
function screenshot(name) {
  writeFileSync(join(output, name), raw('exec-out', 'screencap', '-p'));
}
function readNativeSave() {
  const xml = adb(
    'shell',
    'run-as',
    packageId,
    'cat',
    'shared_prefs/CapacitorStorage.xml',
  );
  const match = xml.match(
    /<string name="little-routes\.mobile\.save\.v1">([\s\S]*?)<\/string>/,
  );
  assert(match, 'Save is absent from native SharedPreferences');
  const entities = { quot: '"', amp: '&', apos: "'", lt: '<', gt: '>' };
  return JSON.parse(
    match[1].replace(
      /&(quot|amp|apos|lt|gt);/g,
      (_entity, name) => entities[name],
    ),
  );
}
try {
  const installed = adb('shell', 'dumpsys', 'package', packageId);
  assert(
    installed.includes('versionName=0.1.0') && installed.includes('DEBUGGABLE'),
  );
  assert(
    !installed.includes('android.permission.INTERNET'),
    'Offline slice must not request INTERNET',
  );
  adb('shell', 'svc', 'wifi', 'disable');
  adb('shell', 'svc', 'data', 'disable');
  adb('shell', 'am', 'force-stop', packageId);
  adb('shell', 'am', 'start', '-W', '-n', component);
  await attach();
  assert.equal(await phase(), 'ready');
  report.viewport = await page.evaluate(() => ({
    width: globalThis.innerWidth,
    height: globalThis.innerHeight,
    dpr: globalThis.devicePixelRatio,
    ua: globalThis.navigator.userAgent,
  }));
  assert(
    report.viewport.width > report.viewport.height,
    'Expected landscape WebView',
  );
  screenshot('native-ready.png');
  verified('packaged cold start without internet permission/network');
  await tap('Đi phải');
  await waitFor(
    async () => (await phase()) === 'playing',
    'native touch departure',
  );
  adb('shell', 'input', 'keyevent', 'KEYCODE_HOME');
  await waitFor(
    async () => (await phase()) === 'paused',
    'native background pause',
  );
  const stopped = await attribute('data-elapsed-ticks');
  await delay(1500);
  assert.equal(await attribute('data-elapsed-ticks'), stopped);
  adb('shell', 'am', 'start', '-W', '-n', component);
  assert.equal(await phase(), 'paused');
  touchBounds = undefined;
  await tap('Tiếp tục');
  verified('OS background/resume freezes time and requires explicit resume');
  await waitFor(async () => (await phase()) === 'pickup', 'warehouse');
  await tap('Lấy 2 kiện · Chợ Phiên');
  await waitFor(
    async () =>
      (await phase()) === 'pickup' &&
      (await page.locator('#cargo').textContent()) === '2 / 3',
    'first pickup service',
  );
  await tap('Lấy 1 kiện · Xóm Trên');
  await waitFor(
    async () => (await page.locator('#cargo').textContent()) === '3 / 3',
    'second pickup service',
  );
  await tap('Đi lên');
  await waitFor(
    async () =>
      (await attribute('data-from')) === 'c2r1' &&
      (await attribute('data-to')) === 'c2r0',
    'north turn',
  );
  await tap('Đi phải');
  await waitFor(
    async () =>
      (
        await page.locator('.order-card[data-order="c1-l1-cho"]').textContent()
      ).includes('Đã giao 2'),
    'market delivery',
  );
  await tap('Quay đầu');
  await waitFor(async () => (await phase()) === 'won', 'final delivery', 30);
  assert(
    (await page.getByRole('dialog').textContent()).includes(
      'Đã giao đủ 3 kiện',
    ),
  );
  screenshot('native-won.png');
  verified(
    'real Android touches complete pickup, driving, automatic delivery and win offline',
  );
  await waitFor(
    async () => (await attribute('data-save-status')) === 'saved',
    'native storage acknowledgement',
  );
  report.runSeconds = Number(await attribute('data-elapsed-ticks')) / 60;
  const best = readNativeSave().best['c1-l1'];
  assert.equal(best.stars, 3);
  assert(best.seconds > 0 && best.seconds < 90);
  assert(best.seconds <= report.runSeconds);
  report.best = best;
  await tap('Chơi lại');
  assert.equal(await phase(), 'ready');
  assert.equal(await page.locator('#cargo').textContent(), '0 / 3');
  assert.equal(await attribute('data-elapsed-ticks'), '0');
  verified('restart resets the trip');
  await detach();
  adb('shell', 'am', 'force-stop', packageId);
  adb('shell', 'am', 'start', '-W', '-n', component);
  await attach();
  assert.equal(await phase(), 'ready');
  assert(
    await page.locator('#save-warning').isHidden(),
    'Save recovery should not be needed after a normal process restart',
  );
  const restored = readNativeSave().best['c1-l1'];
  assert.deepEqual(restored, best);
  verified('saved best survives Android process restart offline');
  assert.deepEqual(pageErrors, []);
  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.error = String(error);
  screenshot('native-failure.png');
  process.exitCode = 1;
} finally {
  try {
    await detach();
  } catch (error) {
    report.status = 'failed';
    report.cleanupError = String(error);
    process.exitCode = 1;
  }
  adb('shell', 'svc', 'wifi', oldWifi === '1' ? 'enable' : 'disable');
  adb('shell', 'svc', 'data', oldData === '1' ? 'enable' : 'disable');
  report.finished = new Date().toISOString();
  writeFileSync(join(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
