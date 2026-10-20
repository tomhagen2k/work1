import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import process from 'node:process';
import { createServer } from 'node:http';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { chromium } from '@playwright/test';

/* global document, window, localStorage, getComputedStyle, LVI, LV, G, LANG, STG,
          VER, VER_SAVED, CHAPTERS, LEVELS, LVNO, CH1, CH2, VEH, ROAD, SKIN */
// Globals above belong to the original demo, accessed only inside page.evaluate.

// Read-only reference capture. Never use the owner's browser profile or app save.
const appRoot = fileURLToPath(new URL('../', import.meta.url));
const workspace = path.resolve(appRoot, '..');
const demoRoot = path.join(workspace, 'demo');
const output = path.join(appRoot, 'tests/reference/demo-v1.5');
if (
  existsSync(path.join(output, 'manifest.json')) &&
  !process.argv.includes('--refresh')
) {
  throw new Error(
    'Reference already exists. Review source changes before explicitly using --refresh; never refresh to silence visual regressions.',
  );
}
const epoch = new Date('2026-10-20T05:00:00.000Z');
const sha = (buffer) => createHash('sha256').update(buffer).digest('hex');
const protectedPaths = [
  'demo/index.html',
  'demo/canh/manifest.js',
  'Mo_Ta_Yeu_Cau_MVP.md',
  'Cau_Truc_Giao_Dien.md',
  'CHANGELOG.md',
  'De_Xuat_Cong_Nghe_Mobile.md',
];
async function fingerprints() {
  return Object.fromEntries(
    await Promise.all(
      protectedPaths.map(async (name) => [
        name,
        sha(await readFile(path.join(workspace, name))),
      ]),
    ),
  );
}
const before = await fingerprints();
const assetFiles = await readdir(path.join(demoRoot, 'canh'));
const assets = await Promise.all(
  assetFiles.map(async (name) => {
    const bytes = await readFile(path.join(demoRoot, 'canh', name));
    return {
      path: `demo/canh/${name}`,
      bytes: bytes.length,
      sha256: sha(bytes),
    };
  }),
);
await mkdir(output, { recursive: true });
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const target = path.resolve(demoRoot, relative || 'index.html');
    if (
      !target.startsWith(`${demoRoot}${path.sep}`) ||
      !(await stat(target)).isFile()
    ) {
      response.writeHead(404).end();
      return;
    }
    const mime = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript',
      '.webp': 'image/webp',
    };
    response.writeHead(200, {
      'Content-Type': mime[path.extname(target)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(await readFile(target));
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolve);
});
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;
const records = [];
const errors = [];
const network = [];
const fontResources = [];
const fontRequests = [];
let inventory;
let browser;
const cases = [
  ['main', 'Trang chủ', 'showMain()', 'mainv'],
  [
    'chapters-c1',
    'Bản đồ Chương 1',
    "HCH=0; HSEL=null; renderHome(); show('home')",
    'home',
  ],
  [
    'chapters-c2',
    'Bản đồ Chương 2',
    "HCH=1; HSEL=null; renderHome(); show('home')",
    'home',
  ],
  [
    'chapters-c3',
    'Bản đồ Chương 3',
    "HCH=2; HSEL=null; renderHome(); show('home')",
    'home',
  ],
  [
    'chapters-c4',
    'Bản đồ Chương 4',
    "HCH=3; HSEL=null; renderHome(); show('home')",
    'home',
  ],
  [
    'c1l1-rules',
    'Luật lần đầu',
    "LS.set(RULE_KEY(),'0'); openLevel(0)",
    'rulev',
  ],
  [
    'c1l1-prep-coach',
    'Hướng dẫn chuẩn bị bước 1',
    "$('rulev').classList.remove('on'); PC={i:0}; pcShow()",
    'prep',
  ],
  [
    'c1l1-prep',
    'Chuẩn bị C1L1',
    'rulesEnd(true); openLevel(0); rulesEnd(false)',
    'prep',
  ],
  [
    'c1l1-tutorial',
    'Chờ xuất phát và tutorial',
    "LS.set(TUT_KEY(),'0'); startGame(true)",
    'view',
  ],
  ['c1l1-hud', 'HUD và xe chờ xuất phát', 'tutEnd(true); render()', 'view'],
  [
    'c1l1-pickup',
    'Bảng chọn hàng tại kho (fixture vị trí)',
    "{const z=ZONES.find(z=>z.kho);G.car.from=z.a;G.car.to=z.b;G.car.d=(z.d1+z.d2)/2;G.state='play';zoneProcess(z)}",
    'ask',
  ],
  ['c1l1-picking', 'Đang lấy hàng (fixture)', 'askChoose(0)', 'view', 600],
  ['c1l1-cargo', 'Xe đã có hàng, đơn đã lấy bị vô hiệu hóa', '', 'ask', 1600],
  [
    'c1l1-map',
    'Bản đồ lớn',
    'openLevel(0);rulesEnd(false);startGame(true);tutEnd(false);mapView()',
    'mapv',
  ],
  ['c1l1-missions', 'Danh sách đơn', "resume(); openInfo('mis')", 'infov'],
  [
    'c1l1-help',
    'Hướng dẫn trong game',
    "closeInfo(); openInfo('help')",
    'infov',
  ],
  ['c1l1-pause', 'Tạm dừng', 'closeInfo(); pauseGame()', 'pausev'],
  [
    'c1l1-confirm-restart',
    'Xác nhận chơi lại',
    'askConfirm(restart)',
    'pConfirm',
  ],
  [
    'c1l1-timeout-gift',
    'Hết giờ, có vật phẩm',
    'pendingAct=null; resume(); G.t=T0(); timeUp()',
    'tov',
    300,
  ],
  [
    'c1l1-timeout-empty',
    'Hết giờ, thiếu vật phẩm/kim cương',
    'WAL.gift=true; WAL.time=0; WAL.kc=0; renderTO()',
    'tov',
    2000,
  ],
  ['shop-gate', 'Cảnh báo mở cửa hàng', "toAct('shop')", 'gatev'],
  [
    'shop',
    'Cửa hàng',
    "$ ('gatev').classList.remove('on'); openShop()",
    'shopv',
  ],
  [
    'payment',
    'Thanh toán mô phỏng, chưa xác nhận',
    "payPack=0; $('payT').innerHTML='Gói '+GEM+NUM(PACKS[0].kc)+' · '+vnd(PACKS[0].vnd); $('payv').classList.add('on')",
    'payv',
  ],
  [
    'c1l1-lost',
    'Kết quả thua',
    "$ ('payv').classList.remove('on'); closeShop(); toAct('quit')",
    'result',
  ],
  [
    'c1l1-won',
    'Kết quả thắng (fixture, không phải lượt chơi thật)',
    'openLevel(0); rulesEnd(false); startGame(true); tutEnd(false); G.M.forEach(m=>{m.picked=m.qty;m.delivered=m.qty}); G.t=30; G.state="play"; step(1/60)',
    'result',
    1200,
  ],
  [
    'c1l1-construction',
    'Cảnh công trình (fixture thắng)',
    'startCut()',
    'view',
    1700,
  ],
  ['c1l1-construction-done', 'Hoàn thành công trình', 'finishCut()', 'cutv'],
  ['garage-default', 'Garage mặc định', 'showMain(); openGarage()', 'garv'],
  [
    'garage-locked',
    'Garage skin chưa sở hữu',
    '{const s=Object.values(SKIN.byId).find(s=>!skOwned(s));gK=s.k;gSel=s.id;renderGarage()}',
    'garv',
  ],
  [
    'garage-diamonds',
    'Garage skin mua kim cương',
    "gK='van';gSel=SKIN.S.van.find(s=>s.src.startsWith('kc:')).id; renderGarage()",
    'garv',
  ],
  [
    'garage-real-size',
    'Garage kích thước thật',
    'gReal=true; renderGarage()',
    'garv',
  ],
  [
    'garage-premium',
    'Garage skin tiền thật (chỉ preview)',
    "{const s=Object.values(SKIN.byId).find(s=>s.src.startsWith('vnd:'));gK=s.k;gSel=s.id;gReal=false;renderGarage()}",
    'garv',
  ],
  [
    'garage-motorbike',
    'Garage xe máy',
    "gK='may';gSel=eqSkin(gK);gReal=false;renderGarage()",
    'garv',
  ],
  [
    'garage-truck',
    'Garage xe tải',
    "gK='tai';gSel=eqSkin(gK);renderGarage()",
    'garv',
  ],
  [
    'settings-general',
    'Cài đặt chung',
    'closeGarage(); openSettings()',
    'setv',
  ],
  [
    'settings-sound',
    'Cài đặt âm thanh',
    "stTab='snd';renderSettings()",
    'setv',
  ],
  [
    'settings-data',
    'Cài đặt dữ liệu và mua hàng',
    "stTab='data';renderSettings()",
    'setv',
  ],
  [
    'settings-help',
    'Cài đặt hỗ trợ/pháp lý',
    "stTab='help';renderSettings()",
    'setv',
  ],
  ['policy-tos', 'Điều khoản (bản nháp)', "openPolicy('tos')", 'polv'],
  [
    'policy-privacy',
    'Quyền riêng tư (bản nháp)',
    "openPolicy('privacy')",
    'polv',
  ],
  ['policy-refund', 'Hoàn tiền (bản nháp)', "openPolicy('refund')", 'polv'],
  [
    'ad-simulated',
    'Quảng cáo mô phỏng, chưa được đóng',
    "ovx('polv',false);closeSettings();showAd(()=>{})",
    'adv',
  ],
  [
    'c2l1-prep',
    'Chuẩn bị cảnh WebP Chương 2',
    "ovx('adv',false);openLevel(CHAPTERS[1].levels.find(i=>!LEVELS[i].bonus));rulesEnd(false)",
    'prep',
  ],
  [
    'c3l3-prep',
    'Chuẩn bị SVG Chương 3, đường đông',
    'openLevel(CHAPTERS[2].levels.filter(i=>!LEVELS[i].bonus)[2]);rulesEnd(false)',
    'prep',
  ],
  [
    'c3l3-hud',
    'Gameplay cảnh SVG Chương 3',
    'startGame(true);tutEnd(false)',
    'view',
  ],
  [
    'c4l3-prep',
    'Chuẩn bị SVG Chương 4, hạn giao',
    'openLevel(CHAPTERS[3].levels.filter(i=>!LEVELS[i].bonus)[2]);rulesEnd(false)',
    'prep',
  ],
  [
    'c4l3-hud',
    'Gameplay cảnh SVG Chương 4',
    'startGame(true);tutEnd(false)',
    'view',
  ],
  [
    'c1-bonus-prep',
    'Chuẩn bị màn thưởng Chương 1',
    'openLevel(CHAPTERS[0].bonus);rulesEnd(false)',
    'prep',
  ],
  [
    'postcard-c2',
    'Bưu thiếp Chương 2 (fixture, không kiểm unlock)',
    "HCH=1;renderHome();show('home');openPost()",
    'postv',
  ],
  [
    'main-en',
    'Trang chủ tiếng Anh',
    "$('postv').classList.remove('on');LANG='en';LS.set('lr_lang','en');showMain()",
    'mainv',
  ],
];
try {
  browser = await chromium.launch({ headless: true });
  for (const viewport of [
    { width: 844, height: 390 },
    { width: 667, height: 375 },
  ]) {
    const tag = `${viewport.width}x${viewport.height}`;
    await mkdir(path.join(output, tag), { recursive: true });
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 1,
      locale: 'vi-VN',
      timezoneId: 'Asia/Bangkok',
      reducedMotion: 'reduce',
    });
    // Only demo files and its original Google font may leave the isolated browser.
    await context.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (
        url.origin === origin ||
        ['fonts.googleapis.com', 'fonts.gstatic.com'].includes(url.hostname)
      )
        return route.continue();
      return route.abort('blockedbyclient');
    });
    await context.addInitScript(() => {
      Math.random = () => 0.314159;
    });
    const page = await context.newPage();
    page.on('pageerror', (error) =>
      errors.push({ viewport: tag, message: error.message }),
    );
    page.on('requestfailed', (request) =>
      network.push({
        viewport: tag,
        url: request.url(),
        error: request.failure()?.errorText,
      }),
    );
    page.on('response', (response) => {
      if (response.status() >= 400)
        network.push({
          viewport: tag,
          url: response.url(),
          status: response.status(),
        });
    });
    page.on('response', (response) => {
      if (
        ['fonts.googleapis.com', 'fonts.gstatic.com'].includes(
          new URL(response.url()).hostname,
        )
      ) {
        fontRequests.push(
          response.body().then((body) =>
            fontResources.push({
              url: response.url(),
              status: response.status(),
              bytes: body.length,
              sha256: sha(body),
            }),
          ),
        );
      }
    });
    await page.clock.install({ time: epoch });
    await page.clock.pauseAt(epoch);
    await page.goto(origin, { waitUntil: 'networkidle', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    async function capture(id, title, action, expected, advance = 50) {
      if (action) await page.evaluate(action);
      await page.clock.runFor(advance);
      await page.waitForLoadState('networkidle');
      const state = await page.evaluate(() => ({
        level: LVI,
        levelName: LV.name,
        gameState: G.state,
        timer: G.t,
        locale: LANG,
        stage: STG,
        fontLoaded: document.fonts.check('900 14px Nunito'),
        fontFaces: [...document.fonts].map((f) => ({
          family: f.family,
          weight: f.weight,
          status: f.status,
        })),
        overlays: [...document.querySelectorAll('.ov.on,.ovx.on')].map(
          (e) => e.id,
        ),
        camera: document.getElementById('cam').getAttribute('transform'),
        svgImageSources: [...document.querySelectorAll('image')].map((e) =>
          e.getAttribute('href'),
        ),
        localStorage: { ...localStorage },
        buttons: [...document.querySelectorAll('button')]
          .filter(
            (e) =>
              e.getClientRects().length &&
              getComputedStyle(e).visibility !== 'hidden',
          )
          .map((e) => {
            const r = e.getBoundingClientRect();
            return {
              id: e.id,
              action: { ...e.dataset },
              text: e.textContent.trim(),
              disabled: e.disabled,
              x: r.x,
              y: r.y,
              width: r.width,
              height: r.height,
            };
          }),
      }));
      if (!(await page.locator(`#${expected}`).isVisible()))
        throw new Error(`${id}: expected visible #${expected}`);
      // Freeze SMIL/CSS timelines in the test browser, never rewrite demo CSS/art.
      const freeze = () =>
        page.evaluate(async () => {
          await document.fonts.ready;
          document.querySelectorAll('svg').forEach((svg) => {
            if (svg.ownerSVGElement) return;
            svg.pauseAnimations();
            svg.setCurrentTime(0);
          });
          document.getAnimations().forEach((animation) => {
            const end = animation.effect?.getComputedTiming().endTime;
            animation.pause();
            animation.currentTime = Number.isFinite(end) ? end : 0;
          });
        });
      await freeze();
      await page.screenshot({ animations: 'allow' }); // Warm up style/SMIL first paint.
      await freeze();
      const filename = `${tag}/${id}.png`;
      const png = await page.screenshot({
        path: path.join(output, filename),
        animations: 'allow',
      });
      const repeat = await page.screenshot({ animations: 'allow' });
      records.push({
        id,
        title,
        viewport,
        dpr: 1,
        file: filename,
        sha256: sha(png),
        sameFrozenFrameStable: sha(png) === sha(repeat),
        expected,
        setup: action || 'boot()',
        advanceMs: advance,
        method:
          'isolated demo; controlled clock; programmatic source-state fixture, not gameplay acceptance',
        ...state,
      });
      process.stdout.write(`${tag} ${id}\n`);
    }
    await capture('splash', 'Khởi động', '', 'splash', 400);
    await capture('language', 'Chọn ngôn ngữ lần đầu', '', 'langv', 1150);
    await capture(
      'consent',
      'Đồng ý chính sách',
      "document.querySelector('[data-lang=vi]').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))",
      'consv',
    );
    await capture(
      'first-link',
      'Liên kết tài khoản (mô phỏng)',
      "$('csOk').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))",
      'linkv',
    );
    await page.evaluate(
      "$('lkNo').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))",
    );
    if (!inventory)
      inventory = await page.evaluate(() => ({
        version: VER,
        savedVersion: VER_SAVED,
        chapters: CHAPTERS.map((c, index) => ({
          index,
          name: c.name,
          mechanism: c.mech,
          levels: c.levels,
          bonus: c.bonus,
        })),
        levels: LEVELS.map((level, index) => ({
          index,
          hashRoute: `#lv=${index + 1}`,
          displayNumber: level.bonus ? null : LVNO(index),
          name: level.name,
          bonus: !!level.bonus,
          chapter:
            CHAPTERS.findIndex(
              (c) => c.levels.includes(index) || c.bonus === index,
            ) + 1,
          time: level.T0,
          vehicles: level.vehicles,
          grid: level.grid,
          region: level.region,
          stage: level.stage,
          missions: level.missions,
          roadTypes: level.types,
          removedRoads: level.remove,
          start: level.start,
          gems: level.gems,
          fields: Object.keys(level),
          art:
            level.cc === CH1 || level.cc === CH2
              ? 'WebP + vector overlays'
              : 'SVG code',
        })),
        vehicles: VEH,
        roads: ROAD,
        skins: Object.values(SKIN.byId).map((s) => ({
          id: s.id,
          vehicle: s.k,
          name: s.vi,
          source: s.src,
          rarity: s.rar,
        })),
        overlays: [...document.querySelectorAll('.ov,.ovx')].map((e) => ({
          id: e.id,
          buttons: [...e.querySelectorAll('button')].map((b) => ({
            id: b.id,
            text: b.textContent.trim(),
            action: { ...b.dataset },
          })),
        })),
        stylesheets: [...document.styleSheets].map(
          (s) => s.href || 'inline demo CSS',
        ),
        imageManifest: window.IMG_MF,
      }));
    for (const [id, title, action, expected, advance] of cases)
      await capture(id, title, action, expected, advance);
    await context.close();
  }
  await Promise.all(fontRequests);
  const after = await fingerprints();
  if (JSON.stringify(before) !== JSON.stringify(after))
    throw new Error('Protected sources changed during capture');
  for (const asset of assets)
    if (sha(await readFile(path.join(workspace, asset.path))) !== asset.sha256)
      throw new Error(`Source asset changed: ${asset.path}`);
  const manifest = {
    generatedAt: new Date().toISOString(),
    baselineClock: epoch.toISOString(),
    chromium: browser.version(),
    platform: process.platform,
    fontPolicy:
      'original demo Google font; network failures/fallback recorded, not silently substituted',
    fontResources,
    screenshotPolicy:
      'DPR1, controlled clock, reduced motion; SMIL paused at 0, CSS finite animations at end/infinite at 0; fixtures are not proof of successful gameplay',
    sourceHashes: before,
    protectedSourcesUnchanged: true,
    assets,
    inventory,
    records,
    errors,
    network,
  };
  await writeFile(
    path.join(output, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  const tiles = records
    .filter((r) => r.viewport.width === 844)
    .map(
      (r) =>
        `<article><a href="${r.file}"><img src="${r.file}" alt="${r.id}" loading="lazy"></a><b>${r.title}</b><small>${r.id} · ${r.gameState}</small></article>`,
    )
    .join('\n');
  await writeFile(
    path.join(output, 'index.html'),
    `<!doctype html><html lang="vi"><meta charset="utf-8"><title>Little Routes — P0 reference</title><style>body{font:16px system-ui;margin:24px;background:#eef1ed;color:#202922}h1{font-size:24px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:20px}article{background:white;padding:12px;border-radius:8px}img{width:100%;display:block}b,small{display:block;margin-top:8px}small{color:#536059}</style><h1>P0 — Demo v1.5: ảnh tham chiếu</h1><p>Ảnh thật từ demo nguyên trạng trong Chromium riêng, không phải ảnh app mới. Các trạng thái thắng/công trình được thiết lập bằng fixture; không chứng minh chơi thắng. <a href="manifest.json">Manifest, nguồn, font và setup từng ảnh</a>. Có bộ 667×375 trong thư mục cùng tên.</p><main>${tiles}</main></html>`,
  );
  process.stdout.write(
    `Complete: ${records.length} screenshots; ${inventory.levels.length} levels; ${errors.length} page errors; ${network.length} network issues.\n`,
  );
  if (errors.length) process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
