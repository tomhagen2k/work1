// Chụp các màn hình giao diện chung (mở game, Trang chủ, danh sách chương) sang design_game/giao_dien/ (chỉ đọc demo, không sửa).
// Chạy từ thư mục gốc repo (Windows / Mac / Linux, cần Node 22+ và Chrome hoặc Edge):
//   node design_game/00_tong_quan/script_xuat/chup_giao_dien.mjs
// Mỗi ảnh chụp ở khung 844×390 (máy chuẩn, nét ×2) và khung nhỏ 667×375 (thư mục khung_nho_667x375).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const OUT = path.join(ROOT, 'design_game', 'giao_dien');
const DEMO = pathToFileURL(path.join(ROOT, 'Game', 'demo', 'index.html')).href;
const PROFILE = path.join(os.tmpdir(), 'lr_chup_giao_dien_chrome');
const PORT = 9334;
const sleep = ms => new Promise(r => setTimeout(r, ms));
function chrome() {
  const la = process.env.LOCALAPPDATA || '';
  for (const p of ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    la && path.join(la, 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'])
    if (p && fs.existsSync(p)) return p;
  return null;
}
const CHROME = chrome();
if (!CHROME) { console.error('Không tìm thấy Chrome / Edge'); process.exit(1); }
fs.rmSync(PROFILE, { recursive: true, force: true });
const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, '--lang=vi', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) { await sleep(200); try { const t = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); wsUrl = t.find(x => x.type === 'page')?.webSocketDebuggerUrl; } catch (e) {} }
if (!wsUrl) { console.error('no chrome'); proc.kill(); process.exit(1); }
const ws = new WebSocket(wsUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map();
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 800)); return r.result?.result?.value; };
const size = (w, h, s) => send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: s, mobile: false });
const shot = async (file) => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, Buffer.from(r.result.data, 'base64')); console.log('  ', path.relative(OUT, file)); };
const go = async (url) => { await send('Page.navigate', { url }); await sleep(300); };
await send('Page.enable'); await send('Runtime.enable');

// tiến độ giả lập: thắng 3★ các màn của những chương đã cho (kể cả màn thưởng)
const PROGRESS = (chs) => `(()=>{Object.keys(localStorage).filter(k=>/demo_(best|stars)_L/.test(k)).forEach(k=>localStorage.removeItem(k));
  ${JSON.stringify(chs)}.forEach(n=>{const c=CHAPTERS[n-1];[...c.levels,c.bonus].forEach(k=>{if(k==null)return;localStorage.setItem('demo_best_L'+(k+1),'60');localStorage.setItem('demo_stars_L'+(k+1),'3');});});return true;})()`;
const READY = `localStorage.setItem('lr_lang','vi');localStorage.setItem('lr_consent','1');localStorage.setItem('lr_link','0');localStorage.setItem('demo_rules_done','1');true`;

for (const [W, H, S, sub] of [[844, 390, 2, ''], [667, 375, 2, 'khung_nho_667x375']]) {
  const D = (...p) => path.join(OUT, sub, ...p);
  await size(W, H, S);
  console.log(`Khung ${W}×${H}`);
  // 1. Mở game lần đầu: bộ nhớ trống
  await go('about:blank'); await go(DEMO); await ev(`localStorage.clear();true`);
  await go('about:blank'); await send('Page.navigate', { url: DEMO }); await sleep(700);
  await shot(D('01_mo_game', '1_khoi_dong.png'));
  await sleep(1400);
  await shot(D('01_mo_game', '2_chon_ngon_ngu.png'));
  await ev(`(()=>{LANG='vi';LS.set('lr_lang','vi');applyLang();ovx('langv',false);openConsent();return true;})()`); await sleep(400);
  await shot(D('01_mo_game', '3_dong_y_dieu_khoan.png'));
  // trang chính sách mở từ bước Đồng ý (đầu trang và giữa trang), rồi đóng lại
  await ev(`(()=>{openPolicy('tos');return true;})()`); await sleep(400);
  await shot(D('01_mo_game', '3a_chinh_sach_dieu_khoan.png'));
  await ev(`(()=>{const b=document.getElementById('polB');b.scrollTop=b.scrollHeight*0.4;return true;})()`); await sleep(300);
  await shot(D('01_mo_game', '3b_chinh_sach_dieu_khoan_cuon_giua.png'));
  await ev(`(()=>{openPolicy('privacy');return true;})()`); await sleep(400);
  await shot(D('01_mo_game', '3c_chinh_sach_quyen_rieng_tu.png'));
  await ev(`(()=>{ovx('polv',false);return true;})()`); await sleep(200);
  await ev(`(()=>{LS.set('lr_consent','1');ovx('consv',false);openLink();return true;})()`); await sleep(400);
  await shot(D('01_mo_game', '4_luu_tien_trinh.png'));
  await ev(`(()=>{LS.set('lr_link','0');ovx('linkv',false);showMain();return true;})()`); await sleep(600);
  await shot(D('02_trang_chu', '1_trang_chu_lan_dau.png'));
  // lần mở sau (đã qua các bước lần đầu): khởi động rồi vào thẳng Trang chủ
  await ev(READY); await go('about:blank'); await send('Page.navigate', { url: DEMO }); await sleep(700);
  await shot(D('01_mo_game', '5_khoi_dong_lan_sau.png'));
  // 2. Trang chủ theo tiến độ
  for (const [chs, nm] of [[[1, 2], '2_trang_chu_dang_choi_chuong_3.png'], [[1, 2, 3, 4], '3_trang_chu_da_xong_het.png']]) {
    await ev(PROGRESS(chs)); await go('about:blank'); await go(DEMO + '#ch=1'); await sleep(600);
    await ev(`(()=>{showMain();return true;})()`); await sleep(600);
    await shot(D('02_trang_chu', nm));
  }
  // 3. Danh sách chương (bản đồ chương): chưa chơi
  await ev(PROGRESS([])); await go('about:blank'); await go(DEMO + '#ch=1'); await sleep(800);
  for (let n = 1; n <= 4; n++) {
    await ev(`(()=>{showMain();openChaptersFromMain();HCH=${n - 1};HSEL=null;renderHome();return true;})()`); await sleep(600);
    await shot(D('03_danh_sach_chuong', `${n}_chuong_${n}_chua_choi.png`));
  }
  await ev(`(()=>{const l=document.getElementById('hLeft');l.scrollTop=l.scrollHeight;return true;})()`); await sleep(300);
  await shot(D('03_danh_sach_chuong', '5_cuon_danh_sach_xuong_cuoi.png'));
  // đang chơi Chương 3 (đã xong Chương 1–2), chọn một màn đã thắng
  await ev(PROGRESS([1, 2])); await go('about:blank'); await go(DEMO + '#ch=3'); await sleep(800);
  await ev(`(()=>{showMain();openChaptersFromMain();return true;})()`); await sleep(600);
  await shot(D('03_danh_sach_chuong', '6_dang_choi_chuong_3.png'));
  await ev(`(()=>{HCH=0;HSEL=CHAPTERS[0].levels[4];renderHome();return true;})()`); await sleep(600);
  await shot(D('03_danh_sach_chuong', '7_chuong_1_da_xong_chon_man_5.png'));
  await ev(`(()=>{HCH=0;HSEL=CHAPTERS[0].bonus;renderHome();return true;})()`); await sleep(600);
  await shot(D('03_danh_sach_chuong', '8_chuong_1_chon_man_thuong.png'));
  await ev(`(()=>{HCH=0;HSEL=null;renderHome();openPost();return true;})()`); await sleep(800);
  await shot(D('03_danh_sach_chuong', '9_buu_thiep_chuong_1.png'));
}
ws.close(); proc.kill(); console.log('XONG');
