#!/usr/bin/env python3
"""Bản thử DÙNG ẢNH: sao chép demo/index.html → design_moi/thu_nghiem_anh/index.html, Chương 1 vẽ cảnh bằng ảnh từng màn.
Ảnh: anh/c1_man_XX.webp (xuất từ khung_canh_moi.svg của BA, nét ×2 = 4900×3500). #anh=goc → dùng nguyên PNG của BA (2450×1750).
Không sửa demo gốc."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
GAME = os.path.dirname(os.path.dirname(HERE))
s = open(os.path.join(GAME, 'demo', 'index.html'), encoding='utf-8').read()
def rep(old, new):
    global s
    if s.count(old) != 1: sys.exit('Không tìm thấy đúng chỗ: ' + old[:60])
    s = s.replace(old, new)
rep("draw:o=>drawVillage(o)", "draw:o=>imgDraw(1,o)||drawVillage(o)")
DRAW = r'''
/* ======================= Cảnh bằng ẢNH theo thiết kế (design_moi) — BẢN THỬ =======================
   Mỗi màn 1 ảnh toàn bản đồ kèm lề (khổ đọc từ anh/manifest.js — tools/xuat_anh_canh.mjs sinh ra; mặc định lề 250 px).
   Ngoài mép ảnh: soi gương ảnh ra 4 phía (dự phòng màn hình quá dẹt, GH-Q2). Ghim + nhãn kiểu B (GH-Q1): ghim 26 px ở góc trên
   công trình, nhãn chữ 11 px viền trắng dưới công trình. Cảnh quay: nền = ảnh màn vừa chơi, mảnh cắt ô công trình từ ảnh màn sau
   "nảy" lên, sau đó cả ảnh màn sau hiện ra. #canh=cu → cảnh cũ; #anh=goc → PNG gốc của BA (nét ×1). */
const IMG_OFF=/canh=cu/.test(location.hash),IMG_GOC=/anh=goc/.test(location.hash);let IMG_N=0;
function imgPin(p,x,y,col,kho){const g=el('g',{transform:`translate(${x}, ${y})`},p);
  if(kho){el('rect',{x:-13,y:-13,width:26,height:26,rx:6,fill:col,stroke:'#ffffff','stroke-width':3},g);el('path',{d:'M 0,-7 L 7,6 L -7,6 Z',fill:'#ffffff'},g);}
  else{el('circle',{cx:0,cy:0,r:13,fill:col,stroke:'#ffffff','stroke-width':3},g);el('path',{d:'M 0,7 L 7,-5 L -7,-5 Z',fill:'#ffffff'},g);}}
function imgLabel(p,x,y,t){const e=el('text',{x,y,'text-anchor':'middle','font-family':"'Nunito', 'Segoe UI', sans-serif",'font-weight':900,'font-size':11,
  fill:'#1d2733',stroke:'#ffffff','stroke-width':3.5,'paint-order':'stroke','stroke-linejoin':'round'},p);e.textContent=t;}
function imgDraw(ch,o){
  if(IMG_OFF)return false;
  const ns=CC.sites.length,nm=i=>i>=ns?'man_thuong':'man_'+String(i+1).padStart(2,'0'),MF=(window.IMG_MF||{})['c'+ch]||{};
  const src=i=>IMG_GOC?`../chuong_${ch}/${nm(i)}/khung_canh_moi.png`:`anh/c${ch}_${nm(i)}.webp`,vbOf=i=>MF[nm(i)]||[-250,-250,200+(CC.cols-1)*SP+500,200+(CC.rows-1)*SP+500];
  const idx=o.constructing>=0?Math.min(ns,o.constructing):Math.min(ns,o.built.filter(Boolean).length); // màn thưởng: constructing = số công trình
  const reg=i=>CC.regions[Math.min(i,CC.regions.length-1)],same=(a,b)=>a&&b&&a[0]===b[0]&&a[1]===b[1];
  const ph1=o.pop!=null&&o.pop>=0&&same(o.region,reg(idx-1)),base=ph1?idx-1:idx,[vx,vy,vw,vh]=vbOf(base);
  if(TARGET===ST)ST.innerHTML='';
  const img=(i,p,a)=>{const [x,y,w,h]=vbOf(i);return el('image',Object.assign({href:src(i),x,y,width:w,height:h,preserveAspectRatio:'none'},a||{}),p);};
  el('rect',{x:vx-vw,y:vy-vh,width:vw*3,height:vh*3,fill:'#8ec255'});
  // soi gương 4 phía: ảnh nối liền ở mép (dự phòng khi khung nhìn rộng hơn ảnh)
  [[2*vx,0,-1,1],[2*(vx+vw),0,-1,1],[0,2*vy,1,-1],[0,2*(vy+vh),1,-1]].forEach(([tx,ty,sx,sy])=>img(base,el('g',{transform:`translate(${tx},${ty}) scale(${sx},${sy})`})));
  img(base);
  if(ph1){                                                  // cảnh quay bước 1: nền cũ, công trình mới nảy lên
    const b=chRect(CC.sites[o.pop]),id='imgclip'+(++IMG_N),d=el('defs',{});
    el('rect',{x:b.x-14,y:b.y-14,width:b.w+28,height:b.h+28,rx:8},el('clipPath',{id},d));
    o.popG=el('g',{});img(idx,o.popG,{'clip-path':`url(#${id})`});
    if(same(reg(idx-1),reg(idx))){const f=img(idx,null,{opacity:0}),t0=performance.now();  // không có bước thông đường → hiện dần ảnh màn sau
      const tick=()=>{if(!f.isConnected)return;const e=(performance.now()-t0)/1000-1.3;f.setAttribute('opacity',Math.max(0,Math.min(1,e/.6)));if(e<.6)requestAnimationFrame(tick);};requestAnimationFrame(tick);}}
  if(o.constructing>=0&&o.constructing<ns){const b=chRect(CC.sites[o.constructing]);o.siteR={x0:b.x-6,y0:b.y-6,x1:b.x+b.w+6,y1:b.y+b.h+6};}
  if(o.pins)pinLayer(()=>{const d=el('defs',{});el('feDropShadow',{dx:0,dy:2,stdDeviation:2.5,'flood-color':'#000000','flood-opacity':.3},el('filter',{id:'imgPinSh',x:'-50%',y:'-50%',width:'200%',height:'200%'},d));
    const f=el('g',{filter:'url(#imgPinSh)'}),t=el('g',{});
    ZONES.forEach(z=>{const b=chRect(z.id);imgPin(f,b.x+b.w-4,b.y+4,z.col,z.kho);imgLabel(t,b.x+b.w/2,b.y+b.h+14,z.name);});});
  return true;}
'''
rep('function buildMinimap(){', DRAW + 'function buildMinimap(){')
rep('\n<script>\n', '\n<script src="anh/manifest.js"></script>\n<script>\n')
rep('<title>', '<title>[BẢN THỬ cảnh ẢNH] ')
open(os.path.join(HERE, 'index.html'), 'w', encoding='utf-8').write(s)
print('Đã tạo', os.path.join(HERE, 'index.html'))
