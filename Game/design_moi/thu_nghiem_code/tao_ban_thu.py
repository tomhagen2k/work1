#!/usr/bin/env python3
"""Tạo bản thử: sao chép demo/index.html → design_moi/thu_nghiem_code/index.html và gắn bộ vẽ cảnh theo thiết kế.
Không sửa demo gốc. Chạy lại sau khi cập nhật canh_c1.js."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
GAME = os.path.dirname(os.path.dirname(HERE))
s = open(os.path.join(GAME, 'demo', 'index.html'), encoding='utf-8').read()

def rep(old, new, count=1):
    global s
    if s.count(old) != count: sys.exit('Không tìm thấy đúng chỗ: ' + old[:60])
    s = s.replace(old, new)

# 1) nạp dữ liệu cảnh trước script chính
rep('\n<script>\n', '\n<script>const DSN={};</script>\n<script src="canh_c1.js"></script>\n<script>\n')
# 2) Chương 1 vẽ theo thiết kế khi có dữ liệu, không có thì dùng bộ vẽ cũ
rep("draw:o=>drawVillage(o)", "draw:o=>dsnDraw(1,o)||drawVillage(o)")
# 3) bộ vẽ cảnh theo thiết kế
DRAW = r'''
/* ======================= Bộ vẽ cảnh theo thiết kế (design_moi) — BẢN THỬ =======================
   Dữ liệu DSN[ch] do tools/chuyen_design.py sinh từ khung_canh_moi.svg: danh sách nhóm hình theo đúng thứ tự vẽ,
   mỗi nhóm có mặt nạ màn (bit), cờ "thuộc lớp đường", điểm neo. Màn k = các nhóm có bit k → đúng từng hình của thiết kế.
   Cảnh quay: nhóm mới so với màn trước — trong ô công trình vừa xây thì "nảy", còn lại "mọc"; lớp đường lấy theo vùng thông xe.
   #canh=cu → dùng bộ vẽ cũ để so sánh. */
const DSN_OFF=/canh=cu/.test(location.hash);
function dsnPin(p,x,y,col,kho){const g=el('g',{transform:`translate(${x}, ${y})`},p);
  if(kho){el('rect',{x:-24,y:-24,width:48,height:48,rx:10,fill:col,stroke:'#ffffff','stroke-width':4.5},g);el('path',{d:'M 0,-13 L 13,11 L -13,11 Z',fill:'#ffffff'},g);}
  else{el('circle',{cx:0,cy:0,r:23,fill:col,stroke:'#ffffff','stroke-width':4.5},g);el('path',{d:'M 0,13 L 13,-10 L -13,-10 Z',fill:'#ffffff'},g);}}
function dsnLabel(p,x,y,t){const g=el('g',{transform:`translate(${x}, ${y})`},p),w=Math.max(130,Math.round(t.length*8.4+26));
  el('rect',{x:-w/2,y:-14,width:w,height:23,rx:6,fill:'rgba(255,255,255,0.92)',stroke:'#ced4da','stroke-width':1.2},g);
  const e=el('text',{x:0,y:2,'text-anchor':'middle','font-family':"'Nunito', 'Segoe UI', sans-serif",'font-weight':900,'font-size':13.5,fill:'#1d2733'},g);e.textContent=t;}
function dsnDraw(ch,o){
  const D=DSN[ch];if(!D||DSN_OFF)return false;
  const ns=CC.sites.length,nm=i=>i>=ns?'man_thuong':'man_'+String(i+1).padStart(2,'0'),li=i=>i<0?-1:D.levels.indexOf(nm(i));
  const idx=o.constructing>=0?o.constructing:Math.min(ns,o.built.filter(Boolean).length),L=li(idx);if(L<0)return false;
  const reg=i=>CC.regions[Math.min(i,CC.regions.length-1)],same=(a,b)=>a&&b&&a[0]===b[0]&&a[1]===b[1];
  const R=same(o.region,reg(idx))?L:same(o.region,reg(idx-1))?li(idx-1):L;if(R<0)return false;   // lớp đường theo vùng thông xe
  const gi=o.grow!=null&&o.grow>=0&&o.grow===idx-1?li(idx-1):-1;                                // màn trước để biết nhóm "mới"
  const sel=D.els.filter(e=>e[0]>>(e[2]?R:L)&1);
  if(TARGET===ST)ST.innerHTML=''; // bộ vẽ cũ không xóa cảnh màn trước (cảnh chồng lên nhau)
  const g=el('g',{}),[vx,vy,vw,vh]=D.vb;
  g.innerHTML=`<defs>${D.defs}</defs><rect x="${vx-1000}" y="${vy-1000}" width="${vw+2000}" height="${vh+2000}" fill="${D.bg}"/>`+sel.map(e=>e[1]).join('');
  const kids=[...g.children].slice(2);
  if(gi>=0){const site=o.pop!=null&&o.pop>=0?chRect(CC.sites[o.pop]):null,sc=siteCenter(o.grow),pops=[];o.growI=[];
    sel.forEach((e,i)=>{if(e[2]||e[0]>>gi&1)return;const c=kids[i],w=document.createElementNS(NS,'g');c.replaceWith(w);w.appendChild(c);
      const [ax,ay]=e[3]||[sc.x,sc.y];
      if(site&&ax>=site.x-30&&ax<=site.x+site.w+30&&ay>=site.y-30&&ay<=site.y+site.h+30)pops.push(w);
      else o.growI.push({g:w,cx:ax,cy:ay,d:Math.hypot(ax-sc.x,ay-sc.y)});});
    o.growI.sort((a,b)=>a.d-b.d);
    if(pops.length)o.popG={get isConnected(){return pops[0].isConnected;},setAttribute:(k,v)=>pops.forEach(w=>w.setAttribute(k,v)),removeAttribute:k=>pops.forEach(w=>w.removeAttribute(k))};}
  if(o.constructing>=0){const b=chRect(CC.sites[o.constructing]);o.siteR={x0:b.x-6,y0:b.y-6,x1:b.x+b.w+6,y1:b.y+b.h+6};}
  if(o.pins)pinLayer(()=>{const f=el('g',{filter:`url(#${D.pre}pin-shadow)`});
    ZONES.forEach(z=>{const b=chRect(z.id);dsnPin(f,b.px,b.py,z.col,z.kho);dsnLabel(f,b.px,b.py+36,z.name);});});
  return true;}
'''
rep('function buildMinimap(){', DRAW + 'function buildMinimap(){')
rep('<title>', '<title>[BẢN THỬ cảnh mới] ')
open(os.path.join(HERE, 'index.html'), 'w', encoding='utf-8').write(s)
print('Đã tạo', os.path.join(HERE, 'index.html'))
