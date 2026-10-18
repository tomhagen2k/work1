// Xuất ảnh khung cảnh từng màn từ thiết kế (design_moi/chuong_N/man_XX/khung_canh_moi.svg) → WebP nét ×2 + manifest khổ ảnh.
// Dùng: node tools/xuat_anh_canh.mjs <chương> <thư mục ra>    ví dụ: node tools/xuat_anh_canh.mjs 1 design_moi/thu_nghiem_anh/anh
// Khổ ảnh (viewBox: x, y, rộng, cao — toạ độ bản đồ chơi giữ gốc 0,0) đọc từ từng SVG, ghi vào <thư mục ra>/manifest.js để game đặt ảnh đúng chỗ,
// nên thiết kế có thể đổi bề rộng lề (vd lề trái/phải 600 px — GH-Q2) mà không phải sửa code. Cần Google Chrome.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const GAME = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const [ch, outArg] = process.argv.slice(2);
if (!ch || !outArg) { console.error('Dùng: node tools/xuat_anh_canh.mjs <chương> <thư mục ra>'); process.exit(1); }
const SRC = path.join(GAME, 'design_moi', `chuong_${ch}`), OUT = path.resolve(GAME, outArg), SCALE = 2, QUALITY = 0.9;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PROFILE = fs.mkdtempSync(path.join(os.tmpdir(), 'xuat_anh_'));
const sleep = ms => new Promise(r => setTimeout(r, ms));
fs.mkdirSync(OUT, { recursive: true });

const proc = spawn(CHROME, ['--headless=new', '--hide-scrollbars', '--remote-debugging-port=9351', `--user-data-dir=${PROFILE}`, 'about:blank'], { stdio: 'ignore' });
let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) { await sleep(200); try { wsUrl = (await (await fetch('http://127.0.0.1:9351/json')).json()).find(x => x.type === 'page')?.webSocketDebuggerUrl; } catch (e) {} }
if (!wsUrl) { console.error('Không mở được Chrome'); proc.kill(); process.exit(1); }
const ws = new WebSocket(wsUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map();
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 500)); return r.result?.result?.value; };
await send('Page.enable'); await send('Runtime.enable');

const mf = {};
const levels = fs.readdirSync(SRC).filter(d => /^man_/.test(d) && fs.existsSync(path.join(SRC, d, 'khung_canh_moi.svg'))).sort();
for (const nm of levels) {
  const svg = fs.readFileSync(path.join(SRC, nm, 'khung_canh_moi.svg'), 'utf8');
  const vb = svg.match(/viewBox="([^"]+)"/)[1].trim().split(/[\s,]+/).map(Number);
  const [w, h] = [vb[2], vb[3]];
  // vẽ SVG trong trang (phông Nunito tải như trong game), chụp ở ×2, rồi mã hoá WebP ngay trong trình duyệt
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: SCALE, mobile: false });
  await send('Page.navigate', { url: 'about:blank' }); await sleep(200);
  const html = `<!doctype html><html><head><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap" rel="stylesheet"></head><body style="margin:0">${svg.replace(/<svg\b/, `<svg style="display:block;width:${w}px;height:${h}px"`)}</body></html>`;
  await ev(`document.open();document.write(${JSON.stringify(html)});document.close();true`);
  await ev('document.fonts.ready.then(()=>true)'); await sleep(600);
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  const webp = await ev(`new Promise(r=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.width;c.height=i.height;c.getContext('2d').drawImage(i,0,0);r(c.toDataURL('image/webp',${QUALITY}));};i.src='data:image/png;base64,${shot.result.data}';})`);
  const file = path.join(OUT, `c${ch}_${nm}.webp`);
  fs.writeFileSync(file, Buffer.from(webp.split(',')[1], 'base64'));
  mf[nm] = vb;
  console.log(`${nm}: khổ ${w}×${h} (lề trái ${-vb[0]}, trên ${-vb[1]}) → ${path.basename(file)} ${(fs.statSync(file).size / 1e6).toFixed(2)} MB`);
}
// manifest gộp nhiều chương: giữ chương khác, thay chương vừa xuất
const MFP = path.join(OUT, 'manifest.js');
let all = {};
if (fs.existsSync(MFP)) { const m = fs.readFileSync(MFP, 'utf8').match(/=(\{[\s\S]*\});/); if (m) all = JSON.parse(m[1]); }
all[`c${ch}`] = mf;
fs.writeFileSync(MFP, `// Sinh bởi tools/xuat_anh_canh.mjs — khổ ảnh từng màn [x, y, rộng, cao] theo toạ độ bản đồ chơi\nwindow.IMG_MF=${JSON.stringify(all)};\n`);
console.log('Đã ghi', MFP);
ws.close(); proc.kill(); await new Promise(r => proc.once('exit', r)); await sleep(300);
try { fs.rmSync(PROFILE, { recursive: true, force: true }); } catch (e) {}
