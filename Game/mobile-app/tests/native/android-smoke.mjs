import assert from 'node:assert/strict';
import process from 'node:process';
import console from 'node:console';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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
const runId = process.env.LITTLE_ROUTES_ANDROID_RUN_ID ?? 'android';
assert(
  /^[a-z0-9][a-z0-9-]{0,63}$/.test(runId),
  'Invalid evidence directory name',
);
const output = join(process.cwd(), 'test-results', runId);
mkdirSync(output, { recursive: true });
const report = {
  status: 'running',
  serial,
  api: adb('shell', 'getprop', 'ro.build.version.sdk'),
  checks: [],
  started: new Date().toISOString(),
  screenshots: [],
};
const oldWifi = adb('shell', 'settings', 'get', 'global', 'wifi_on');
const oldData = adb('shell', 'settings', 'get', 'global', 'mobile_data');
const oldDisplay = adb('shell', 'wm', 'size');
const oldOverride = oldDisplay.match(/Override size:\s*(\d+x\d+)/)?.[1];
let displayChanged = false;
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
      // Canvas is appended before async WebP/SVG textures finish loading.
      // A visible canvas alone is not evidence that the game is ready.
      await waitFor(
        async () => Boolean(await attribute('data-phase')),
        'hydrated game and loaded scene',
        30,
      );
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
async function screenshot(name) {
  // A DOM phase change can precede Android's compositor by several frames.
  // Keep the screenshot an unmodified OS capture after rendering has settled.
  if (page && !page.isClosed()) {
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          globalThis.requestAnimationFrame(() =>
            globalThis.requestAnimationFrame(resolve),
          ),
        ),
    );
    await delay(250);
  }
  const png = raw('exec-out', 'screencap', '-p');
  writeFileSync(join(output, name), png);
  report.screenshots.push({
    file: name,
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20),
    sha256: createHash('sha256').update(png).digest('hex'),
  });
}
async function visualMetrics() {
  const metrics = await page.evaluate(() => {
    const doc = globalThis.document;
    const canvas = doc.querySelector('canvas');
    const gl = canvas?.getContext('webgl2') || canvas?.getContext('webgl');
    const bounds = (element) => {
      const r = element.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    };
    return {
      viewport: {
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
        dpr: globalThis.devicePixelRatio,
      },
      url: globalThis.location.href,
      fontLoaded: doc.fonts.check('900 14px Nunito', 'Hợp tác xã'),
      maxTextureSize: gl?.getParameter(gl.MAX_TEXTURE_SIZE),
      sceneTextures: JSON.parse(canvas.dataset.sceneTextures ?? 'null'),
      stage: bounds(doc.querySelector('.game-stage')),
      controls: [...doc.querySelectorAll('.dpad button,.icon-button')].map(
        (element) => ({
          label: element.getAttribute('aria-label'),
          ...bounds(element),
        }),
      ),
      resources: globalThis.performance
        .getEntriesByType('resource')
        .map((entry) => entry.name),
    };
  });
  assert(metrics.fontLoaded, 'Bundled Nunito must load offline');
  assert(metrics.sceneTextures, 'Scene texture metadata missing');
  assert.deepEqual(metrics.sceneTextures.source, { width: 6300, height: 3500 });
  assert(metrics.sceneTextures.tiles.length > 0, 'No scenery textures loaded');
  assert(
    metrics.sceneTextures.tiles.every(
      (tile) =>
        tile.width <= metrics.maxTextureSize &&
        tile.height <= metrics.maxTextureSize,
    ),
    'Scene tile exceeds the GPU limit',
  );
  for (const box of metrics.controls) {
    assert(
      box.width >= 44 && box.height >= 44,
      `Touch target too small: ${box.label}`,
    );
    assert(
      box.x >= 0 &&
        box.y >= 0 &&
        box.x + box.width <= metrics.viewport.width + 0.01 &&
        box.y + box.height <= metrics.viewport.height + 0.01,
      `Control clipped: ${box.label}`,
    );
  }
  assert(
    metrics.resources.every((url) => url.startsWith('https://localhost/')),
    'Expected only bundled local resources',
  );
  return metrics;
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
  report.apkSha256 = createHash('sha256')
    .update(
      readFileSync(
        join(
          process.cwd(),
          'android/app/build/outputs/apk/debug/app-debug.apk',
        ),
      ),
    )
    .digest('hex');
  const installedApk = adb('shell', 'pm', 'path', packageId).replace(
    /^package:/,
    '',
  );
  assert(
    installedApk.startsWith('/data/app/') && installedApk.endsWith('/base.apk'),
  );
  report.installedApkSha256 = adb('shell', 'sha256sum', installedApk).split(
    /\s+/,
  )[0];
  assert.equal(
    report.installedApkSha256,
    report.apkSha256,
    'Installed APK differs from the current build',
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
  await screenshot('native-ready.png');
  verified('packaged cold start without internet permission/network');
  report.visual = await visualMetrics();
  verified('bundled artwork/font and native touch targets render in landscape');
  for (const name of ['Nhiệm vụ', 'Hướng dẫn', 'Bản đồ']) {
    await tap(name);
    await waitFor(
      async () => (await phase()) === 'paused',
      `open native ${name}`,
    );
    await page
      .getByRole('heading', {
        name: name === 'Hướng dẫn' ? 'Cách chơi' : name,
        exact: true,
      })
      .waitFor({ state: 'visible' });
    await screenshot(
      name === 'Nhiệm vụ'
        ? 'native-orders.png'
        : name === 'Hướng dẫn'
          ? 'native-help.png'
          : 'native-map.png',
    );
    await tap('Đóng');
    await waitFor(
      async () => (await phase()) === 'ready',
      `close native ${name}`,
    );
  }
  report.webviewBounds = touchBounds;
  verified(
    'Android touches open and close orders/help/map panels without starting time',
  );
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
  await screenshot('native-paused.png');
  touchBounds = undefined;
  await tap('Tiếp tục');
  verified('OS background/resume freezes time and requires explicit resume');
  await waitFor(async () => (await phase()) === 'pickup', 'warehouse');
  await screenshot('native-pickup.png');
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
  await screenshot('native-won.png');
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
  await waitFor(
    async () => (await phase()) === 'ready',
    'native restart acknowledgement',
  );
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
  displayChanged = true;
  adb('shell', 'wm', 'size', '720x1280');
  touchBounds = undefined;
  await waitFor(async () => {
    const size = await page.evaluate(() => ({
      width: globalThis.innerWidth,
      height: globalThis.innerHeight,
    }));
    return size.width > size.height && size.width !== report.viewport.width;
  }, 'compact native landscape viewport');
  if ((await phase()) === 'paused') await tap('Tiếp tục');
  await waitFor(async () => (await phase()) === 'ready', 'compact ready view');
  report.compactVisual = await visualMetrics();
  await screenshot('native-compact-ready.png');
  verified(
    'second emulator display size keeps landscape controls visible and at least 44px',
  );
  assert.deepEqual(pageErrors, []);
  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.error = String(error);
  // Failure capture must also work if the WebView is unresponsive.
  const png = raw('exec-out', 'screencap', '-p');
  writeFileSync(join(output, 'native-failure.png'), png);
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
  if (displayChanged) adb('shell', 'wm', 'size', oldOverride ?? 'reset');
  report.restoredDisplay = adb('shell', 'wm', 'size');
  assert.equal(
    report.restoredDisplay,
    oldDisplay,
    'Display override was not restored',
  );
  report.finished = new Date().toISOString();
  writeFileSync(join(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
