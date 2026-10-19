// Xuất ảnh + dữ liệu từng màn sang design_game/chuong_N (chỉ đọc demo, không sửa).
// Chạy (Windows / Mac / Linux, cần Node 22+ và Chrome hoặc Edge):
//   node design_game/00_tong_quan/script_xuat/export_design.mjs          → Chương 1, 2, 3, 4
//   node design_game/00_tong_quan/script_xuat/export_design.mjs 3        → chỉ Chương 3
//   node design_game/00_tong_quan/script_xuat/export_design.mjs 1 2      → Chương 1 và 2
// Đường dẫn tính theo vị trí repo (tệp này nằm ở design_game/00_tong_quan/script_xuat/).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const OUT = path.join(ROOT, 'design_game');
const DEMO = pathToFileURL(path.join(ROOT, 'Game', 'demo', 'index.html')).href;
const PROFILE = path.join(os.tmpdir(), 'lr_export_design_chrome');
const PORT = 9333;
const CHS = process.argv.slice(2).map(Number).filter(n => n >= 1);
if (!CHS.length) CHS.push(1, 2, 3, 4);
const sleep = ms => new Promise(r => setTimeout(r, ms));

// tìm Chrome giống chrome() trong Game/tools/chot_phien_ban.py
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
console.log('Chương', CHS.join(', '), '→', OUT);

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
const go = async (url) => { await send('Page.navigate', { url }); await sleep(1500); };

await send('Page.enable'); await send('Runtime.enable');
await size(844, 390, 2);
// chuẩn bị bộ nhớ: tiếng Việt, đã qua luật chơi Màn 1 (để ảnh không bị thẻ luật che)
await go(DEMO + '#lv=1');
await ev(`localStorage.setItem('lr_lang','vi');localStorage.setItem('lr_consent','1');localStorage.setItem('lr_link','0');localStorage.setItem('demo_rules_done','1');true`);
await go('about:blank'); await go(DEMO + '#ch=1');
await ev(`document.fonts.ready.then(()=>true)`); await sleep(500);

// quy ước chung
const conv = await ev(`({road_types:Object.fromEntries(Object.entries(ROAD).map(([k,v])=>[k,{name_vi:v.name,desc_vi:v.desc||'',speed_factor:v.f,minimap_color:(typeof RCOL!=='undefined'?RCOL[k]:null)||null}])),
  vehicles:Object.fromEntries(Object.entries(VEH).map(([k,v])=>[k,{name_vi:v.name,speed:v.v,capacity:v.cap}])),node_spacing_px:SP,stop_zone_half_px:ZONE_HALF,stage_px:[844,390]})`);

const EXTRACT = (i) => `(()=>{const r2=v=>Math.round(v*10)/10,L=LEVELS[${i}],i=${i};
 const ch=CHAPTERS.findIndex(c=>c.levels&&c.levels.includes(i)||c.bonus===i)+1;
 buildLevel(i);const [cols,rows]=L.grid,W=200+(cols-1)*SP,H=200+(rows-1)*SP;
 const types={};for(const t in (L.types||{}))for(const [a,b] of L.types[t])types[[a,b].sort().join('|')]=t;
 const inReg=n=>!L.region||(N[n].i<=L.region[0]&&N[n].j<=L.region[1]);
 const edges=[];const add=(a,b)=>edges.push({a,b,type:types[[a,b].sort().join('|')]||'thuong',open:inReg(a)&&inReg(b),from_xy:[N[a].x,N[a].y],to_xy:[N[b].x,N[b].y]});
 for(let b=0;b<rows;b++)for(let a=0;a<cols-1;a++)add('c'+a+'r'+b,'c'+(a+1)+'r'+b);
 for(let a=0;a<cols;a++)for(let b=0;b<rows-1;b++)add('c'+a+'r'+b,'c'+a+'r'+(b+1));
 const EN=EN_DATA;
 const pts=ZONES.map(z=>{const A=N[z.a],B=N[z.b],f=(z.d1+z.d2)/2/SP;let rc=null;try{const b=L.cc?chRect(z.id):buildingRect(z);rc={x:r2(b.x),y:r2(b.y),w:r2(b.w),h:r2(b.h),pin_xy:[r2(b.px),r2(b.py)]};}catch(e){}
   return {id:z.id,name_vi:z.name,name_en:EN.place[z.id]||null,role:z.kho?'kho — lấy hàng (ô vuông ▲)':'điểm giao — giao hàng (hình tròn ▼)',pin_color:z.col,on_road:[z.a,z.b],stop_xy:[r2(A.x+(B.x-A.x)*f),r2(A.y+(B.y-A.y)*f)],stop_zone_len_px:z.d2-z.d1,building:rc};});
 const C=L.cc,en=EN.lv[i]||[];
 return {level:i+1,chapter:ch,level_in_chapter:L.bonus?'thưởng':L.stage+1,name_vi:L.name,name_en:en[0]||null,intro_vi:L.intro,intro_en:en[1]||null,
  time_limit_s:L.T0,vehicles:L.vehicles,map_px:[W,H],grid_cols_rows:[cols,rows],node_spacing_px:SP,open_region_max_col_row:L.region||null,
  nodes:Object.fromEntries(Object.entries(N).map(([k,v])=>[k,[v.x,v.y]])),
  start:{road:[L.start[0],L.start[1]],fraction:L.start[2]},
  construction_site:C&&!L.bonus?{id:C.sites[L.stage],name_vi:C.siteNames[L.stage],name_en:((EN.cc||[])[ch-1]||{}).siteNames?.[L.stage]||null}:null,
  buildings_already_built:C?C.sites.slice(0,L.bonus?C.sites.length:L.stage).map((s,k)=>({id:s,name_vi:C.siteNames[k]})):[],
  points:pts,missions:L.missions.map(m=>({from:m.from,to:m.to,qty:m.qty,deadline_s:m.dl||null})),
  gems_count:L.gems?L.gems.length:0,edges};})()`;

const SVG = (pins) => `(()=>{const L=LV,[c,r]=L.grid,W=200+(c-1)*SP,H=200+(r-1)*SP;
  const defs=[...document.querySelectorAll('svg defs')].filter(d=>d.id!=='skDefs').map(d=>d.outerHTML).join('');
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" style="--pin:${pins ? 1 : 0}">'
   +'<style>@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&amp;display=swap");</style>'+defs+ST.innerHTML+'</svg>';})()`;

const all = Object.fromEntries(CHS.map(c => [c, []]));
const lvCh = await ev(`LEVELS.map((L,i)=>CHAPTERS.findIndex(c=>c.levels&&c.levels.includes(i)||c.bonus===i)+1)`);
for (let i = 0; i < lvCh.length; i++) {
  if (!CHS.includes(lvCh[i])) continue;
  const data = await ev(EXTRACT(i));
  const dir = path.join(OUT, `chuong_${data.chapter}`, data.level_in_chapter === 'thưởng' ? 'man_thuong' : `man_${String(data.level_in_chapter).padStart(2, '0')}`);
  console.log(`Màn ${i + 1} → ${path.relative(OUT, dir)}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'du_lieu_man.json'), JSON.stringify(data, null, 1));
  all[data.chapter].push(data);
  // 1. màn chuẩn bị (toàn bản đồ + nhiệm vụ ghi dưới điểm giao)
  // thẻ hướng dẫn (luật chơi, mẹo đường đông Ch.3 màn 3, mẹo hạn giao Ch.4 màn 3) hiện sau vài khung hình → ẩn lại sau khi chờ
  const HIDE_TIPS = `(()=>{if(typeof PC!=='undefined'&&PC)rulesEnd(true);['rulev','pcCatch','pcRing','pcTip'].forEach(x=>{const e=document.getElementById(x);if(!e)return;e.classList.remove('on');e.style.display='none';});return true;})()`;
  await ev(`(()=>{show(null);openLevel(${i});return true;})()`); await ev(HIDE_TIPS); await sleep(700); await ev(HIDE_TIPS); await sleep(200);
  await shot(path.join(dir, '1_man_chuan_bi.png'));
  // 4. bản vẽ vector của khung cảnh (lớp tĩnh của màn): có ghim/nhãn và không ghim
  fs.writeFileSync(path.join(dir, '4_ban_do_co_ghim.svg'), await ev(SVG(true)));
  fs.writeFileSync(path.join(dir, '5_khung_canh_khong_ghim.svg'), await ev(SVG(false)));
  // 2. đang lái xe (góc nhìn trong màn)
  await ev(`(()=>{startGame(true);if(G.tut){G.tut=null;}const t=document.getElementById('tutTip');if(t)t.style.display='none';document.getElementById('tutRing').style.display='none';return true;})()`); await sleep(900);
  await ev(`(()=>{const t=document.getElementById('tutTip');if(t)t.style.display='none';document.getElementById('tutRing').style.display='none';return true;})()`);
  await shot(path.join(dir, '2_dang_choi.png'));
  // 3. bản đồ lớn khi đang chơi (trạng thái các điểm)
  await ev(`(()=>{mapView();return true;})()`); await sleep(500);
  await shot(path.join(dir, '3_ban_do_lon_khi_choi.png'));
  await ev(`(()=>{resume();G.state='home';show(null);return true;})()`);
}
for (const ch of CHS) fs.writeFileSync(path.join(OUT, `chuong_${ch}`, 'du_lieu_tat_ca_man.json'), JSON.stringify(all[ch], null, 1));
fs.mkdirSync(path.join(OUT, '00_tong_quan'), { recursive: true });
fs.writeFileSync(path.join(OUT, '00_tong_quan', 'quy_uoc_chung.json'), JSON.stringify(conv, null, 1));

// Tổng quan chương: bản đồ chương (chưa chơi), rồi giả lập đã qua hết để có bản đồ chương hoàn thành + bưu thiếp toàn cảnh
for (const ch of CHS) {
  const od = path.join(OUT, `chuong_${ch}`, '00_tong_quan_chuong');
  await ev(`(()=>{HCH=${ch - 1};HSEL=null;openChapters();HCH=${ch - 1};HSEL=null;renderHome();return true;})()`); await sleep(600);
  await shot(path.join(od, '1_ban_do_chuong_luc_bat_dau.png'));
  await ev(`(()=>{CHAPTERS[${ch - 1}].levels.forEach(k=>{localStorage.setItem('demo_best_L'+(k+1),'40');localStorage.setItem('demo_stars_L'+(k+1),'3');});HSEL=null;renderHome();return true;})()`); await sleep(600);
  await shot(path.join(od, '2_ban_do_chuong_da_hoan_thanh.png'));
  await ev(`(()=>{openPost();return true;})()`); await sleep(700);
  await shot(path.join(od, '3_buu_thiep_toan_canh.png'));
  await ev(`(()=>{document.getElementById('postv').classList.remove('on');return true;})()`);
}

// Ảnh PNG độ phân giải đầy đủ của 2 bản vẽ vector (render lại từ SVG đã xuất); SVG không ghim chỉ là bước trung gian, xóa sau khi chụp
// (muốn có lại: mở 4_ban_do_co_ghim.svg, đổi --pin:1 thành --pin:0)
for (const ch of CHS) for (const d of fs.readdirSync(path.join(OUT, `chuong_${ch}`))) {
  const dir = path.join(OUT, `chuong_${ch}`, d); if (!d.startsWith('man_')) continue;
  for (const [svg, png] of [['4_ban_do_co_ghim.svg', '4_ban_do_co_ghim.png'], ['5_khung_canh_khong_ghim.svg', '5_khung_canh_khong_ghim.png']]) {
    const txt = fs.readFileSync(path.join(dir, svg), 'utf8'); const m = txt.match(/viewBox="0 0 (\d+) (\d+)"/);
    await size(+m[1], +m[2], 1); await go(pathToFileURL(path.join(dir, svg)).href); await sleep(600);
    await shot(path.join(dir, png));
  }
  fs.rmSync(path.join(dir, '5_khung_canh_khong_ghim.svg'), { force: true });
}

// Trang xem nhanh mọi ảnh của các chương đang có trong design_game
const chDirs = fs.readdirSync(OUT).filter(d => /^chuong_\d+$/.test(d)).sort();
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
let html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Khung cảnh Chương 1–${chDirs.length}</title>
<style>body{margin:0;font-family:system-ui,sans-serif;background:#eef1f4;color:#2d3440}main{max-width:1400px;margin:auto;padding:16px}h1{margin:0 0 4px}h2{margin:28px 0 8px}h3{margin:18px 0 6px;font-size:16px}.row{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}figure{margin:0;background:#fff;border-radius:10px;padding:6px}figure img{width:100%;display:block;border-radius:6px}figcaption{font-size:12px;color:#6b7686;margin-top:4px}.m{color:#6b7686;font-size:13px}@media (prefers-color-scheme:dark){body{background:#1b1f25;color:#e9ecef}figure{background:#262b33}}</style></head><body><main><h1>Khung cảnh Chương 1–${chDirs.length}</h1><p class="m">Bấm ảnh để mở cỡ đầy đủ. Dữ liệu logic: du_lieu_man.json trong từng thư mục màn.</p>\n`;
for (const c of chDirs) {
  html += `<h2>Chuong ${c.split('_')[1]}</h2>\n`;
  for (const d of fs.readdirSync(path.join(OUT, c)).filter(d => fs.statSync(path.join(OUT, c, d)).isDirectory()).sort()) {
    let title = d; const j = path.join(OUT, c, d, 'du_lieu_man.json');
    if (fs.existsSync(j)) { const x = JSON.parse(fs.readFileSync(j, 'utf8')); title = `${d} · ${x.name_vi}${x.name_en ? ' / ' + x.name_en : ''} · ${x.time_limit_s}s`; }
    html += `<h3>${esc(title)}</h3><div class="row">\n`;
    for (const f of fs.readdirSync(path.join(OUT, c, d)).filter(f => f.endsWith('.png')).sort())
      html += `<figure><a href="${c}/${d}/${f}" target="_blank"><img loading="lazy" src="${c}/${d}/${f}" alt="${f}"></a><figcaption>${f}</figcaption></figure>\n`;
    html += `</div>\n`;
  }
}
fs.writeFileSync(path.join(OUT, 'xem_tat_ca.html'), html + `</main></body></html>`);
ws.close(); proc.kill(); console.log('XONG');
