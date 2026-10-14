"""Sơ đồ tổng thể Chương 2: vùng bản đồ mở rộng qua từng màn + công trình hoàn thành theo màn."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import levels_ch2 as C  # noqa: E402
from gen_maps import STYLE, NAMES, SP  # noqa: E402

W, H = 200 + (C.COLS - 1) * SP, 200 + (C.ROWS - 1) * SP + 70
N = {f'c{i}r{j}': (100 + i * SP, 100 + j * SP) for i in range(C.COLS) for j in range(C.ROWS)}
types = {}
for t, lst in C.TYPES.items():
    for a, b in lst:
        types[tuple(sorted((a, b)))] = t
o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" font-family="Segoe UI,Arial" font-weight="700">',
     f'<rect width="{W}" height="{H}" fill="#e9f5df"/>']
# vùng của từng màn (lồng nhau)
REG = [('Màn 1', (2, 2), '#2b8a3e'), ('Màn 2', (3, 2), '#1c7ed6'), ('Màn 3–4', (4, 3), '#7048e8'), ('Màn 5', (5, 3), '#e8590c')]
for k, (lab, (c1, r1), col) in enumerate(REG[::-1]):
    pad = 40 + (len(REG) - 1 - k) * 0
    x0, y0 = 100 - 60 + (3 - k) * 0, 100 - 60
    x1, y1 = 100 + c1 * SP + 60 - (3 - k) * 14, 100 + r1 * SP + 60 - (3 - k) * 14
    o.append(f'<rect x="{x0 + (3-k)*14}" y="{y0 + (3-k)*14}" width="{x1 - x0 - (3-k)*14}" height="{y1 - y0 - (3-k)*14}" rx="18" fill="none" stroke="{col}" stroke-width="6" stroke-dasharray="20 12"/>')
    o.append(f'<text x="{x1 - 20}" y="{y0 + (3-k)*14 + 34}" text-anchor="end" font-size="26" fill="{col}" stroke="#e9f5df" stroke-width="8" paint-order="stroke">{lab}</text>')
key = lambda a, b: tuple(sorted((a, b)))
edges = []
for j in range(C.ROWS):
    for i in range(C.COLS - 1):
        edges.append((f'c{i}r{j}', f'c{i+1}r{j}'))
for i in range(C.COLS):
    for j in range(C.ROWS - 1):
        edges.append((f'c{i}r{j}', f'c{i}r{j+1}'))
for a, b in sorted(edges, key=lambda e: types.get(key(*e)) == 'lon'):
    s = STYLE[types.get(key(a, b), 'thuong')]
    (x1, y1), (x2, y2) = N[a], N[b]
    o.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{s["c"]}" stroke-width="{s["w"]}" stroke-linecap="round"' + (f' stroke-dasharray="{s["dash"]}"' if s['dash'] else '') + '/>')
BUILT = {'TiemBanh': 1, 'TruongHoc': 2, 'ChoMoi': 3, 'BenhVien': 4, 'CongVien': 5}
KHO = {'BaiVL', 'KhoTong', 'XuongGo'}
for pid, (a, b, f) in C.POINTS.items():
    (x1, y1), (x2, y2) = N[a], N[b]
    x, y = x1 + (x2 - x1) * f, y1 + (y2 - y1) * f
    if pid in KHO:
        o.append(f'<rect x="{x-24}" y="{y-24}" width="48" height="48" rx="8" fill="#1c7ed6" stroke="#fff" stroke-width="5"/>')
    elif pid in BUILT:
        o.append(f'<polygon points="{x},{y-32} {x+30},{y+22} {x-30},{y+22}" fill="#f59f00" stroke="#fff" stroke-width="5"/>')
        o.append(f'<text x="{x}" y="{y+16}" text-anchor="middle" font-size="24" fill="#fff">{BUILT[pid]}</text>')
    else:
        o.append(f'<circle cx="{x}" cy="{y}" r="22" fill="#f76707" stroke="#fff" stroke-width="5"/>')
    horiz = y1 == y2
    left = x > W - 300
    lx, ly = (x, y - 40) if horiz else ((x - 36, y + 8) if left else (x + 36, y + 8))
    anc = 'middle' if horiz else ('end' if left else 'start')
    if pid == 'CongVien':
        lx, ly, anc = x - 36, y - 40, 'end'
    lab = NAMES.get(pid, pid) + (f' (xong màn {BUILT[pid]})' if pid in BUILT else '')
    o.append(f'<text x="{lx}" y="{ly}" text-anchor="{anc}" font-size="24" fill="#1d2733" stroke="#fff" stroke-width="7" paint-order="stroke">{lab}</text>')
lx = 40
for t, txt in [('thuong', 'Đường thường'), ('lon', 'Đường lớn'), ('dong', 'Đường đông'), ('gogh', 'Gồ ghề'), ('hem', 'Hẻm')]:
    s = STYLE[t]
    o.append(f'<line x1="{lx}" y1="{H-35}" x2="{lx+60}" y2="{H-35}" stroke="{s["c"]}" stroke-width="{min(s["w"],20)}"' + (f' stroke-dasharray="{s["dash"]}"' if s['dash'] else '') + '/>')
    o.append(f'<text x="{lx+72}" y="{H-27}" font-size="24" fill="#1d2733">{txt}</text>')
    lx += 280
o.append(f'<polygon points="{lx+10},{H-52} {lx+34},{H-18} {lx-14},{H-18}" fill="#f59f00"/><text x="{lx+46}" y="{H-27}" font-size="24" fill="#1d2733">Công trình</text>')
o.append('</svg>')
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'maps', 'C2_tong_the.svg'), 'w', encoding='utf-8').write('\n'.join(o))
print('ok')
