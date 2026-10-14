"""Vẽ sơ đồ SVG cho từng màn (để duyệt thiết kế). Chạy: python -I gen_maps.py"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from levels import LEVELS  # noqa: E402

SP = 350
STYLE = {
    'thuong': dict(c='#6b7280', w=26, dash=None),
    'lon': dict(c='#1f6feb', w=40, dash=None),
    'dong': dict(c='#e8590c', w=26, dash=None),
    'gogh': dict(c='#8d6e63', w=26, dash='22 12'),
    'hem': dict(c='#a3a3a3', w=12, dash=None),
}
NAMES = {'KhoA': 'Kho A', 'KhoB': 'Kho B', 'Sieu': 'Siêu thị', 'Hoa': 'Tiệm hoa', 'Dong': 'Phía Đông',
         'Bac': 'Phía Bắc', 'Tay': 'Phía Tây', 'Cho': 'Chợ', 'Truong': 'Trường', 'BenhVien': 'Bệnh viện',
         'Nha': 'Khu nhà', 'Cang': 'Cảng', 'BaiVL': 'Bãi vật liệu', 'KhoTong': 'Kho tổng', 'XuongGo': 'Xưởng gỗ',
         'TiemBanh': 'Tiệm bánh', 'TruongHoc': 'Trường học', 'NhaVH': 'Nhà văn hóa', 'NhaTre': 'Nhà trẻ', 'ChoMoi': 'Chợ mới',
         'KhuNha': 'Khu nhà ở', 'CongVien': 'Công viên'}


def gen(lv):
    cols, rows = lv['grid']
    W, H = 200 + (cols - 1) * SP, 200 + (rows - 1) * SP + 70
    N = {f'c{i}r{j}': (100 + i * SP, 100 + j * SP) for i in range(cols) for j in range(rows)}
    key = lambda a, b: tuple(sorted((a, b)))
    edges = {}
    for j in range(rows):
        for i in range(cols - 1):
            edges[key(f'c{i}r{j}', f'c{i+1}r{j}')] = 'thuong'
    for i in range(cols):
        for j in range(rows - 1):
            edges[key(f'c{i}r{j}', f'c{i}r{j+1}')] = 'thuong'
    for e in lv.get('remove', []):
        edges.pop(key(*e), None)
    for t, lst in lv.get('types', {}).items():
        for e in lst:
            edges[key(*e)] = t
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" font-family="Segoe UI,Arial" font-weight="700">',
         f'<rect width="{W}" height="{H}" fill="#e9f5df"/>']
    for (a, b), t in sorted(edges.items(), key=lambda x: x[1] == 'lon'):
        s = STYLE[t]
        (x1, y1), (x2, y2) = N[a], N[b]
        o.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{s["c"]}" stroke-width="{s["w"]}" stroke-linecap="round"'
                 + (f' stroke-dasharray="{s["dash"]}"' if s['dash'] else '') + '/>')
    for n, (x, y) in N.items():
        o.append(f'<circle cx="{x}" cy="{y}" r="7" fill="#fff" opacity=".8"/>')
    kho = {m['from'] for m in lv['missions']}
    for pid, (a, b, f) in lv['points'].items():
        (x1, y1), (x2, y2) = N[a], N[b]
        x, y = x1 + (x2 - x1) * f, y1 + (y2 - y1) * f
        horiz = y1 == y2
        lx, ly = (x, y - 42) if horiz else ((x - 34, y + 8) if x > W - 400 else (x + 34, y + 8))
        anchor = 'middle' if horiz else ('end' if x > W - 400 else 'start')
        if pid in kho:
            o.append(f'<rect x="{x-24}" y="{y-24}" width="48" height="48" rx="8" fill="#1c7ed6" stroke="#fff" stroke-width="5"/>')
            label = NAMES.get(pid, pid)
        else:
            ms = [m for m in lv['missions'] if m['to'] == pid]
            o.append(f'<circle cx="{x}" cy="{y}" r="26" fill="#f76707" stroke="#fff" stroke-width="5"/>')
            o.append(f'<text x="{x}" y="{y+9}" text-anchor="middle" font-size="26" fill="#fff">{sum(m["qty"] for m in ms)}</text>')
            dl = [m['dl'] for m in ms if m.get('dl')]
            label = NAMES.get(pid, pid) + (f' · hạn {dl[0]}s' if dl else '')
            src = {m['from'] for m in ms}
            label += ' ← ' + ', '.join(NAMES[s] for s in src)
        o.append(f'<text x="{lx}" y="{ly}" text-anchor="{anchor}" font-size="26" fill="#1d2733" stroke="#fff" stroke-width="7" paint-order="stroke">{label}</text>')
    a, b, f = lv['start']
    (x1, y1), (x2, y2) = N[a], N[b]
    x, y = x1 + (x2 - x1) * f, y1 + (y2 - y1) * f
    import math
    ang = math.degrees(math.atan2(y2 - y1, x2 - x1))
    o.append(f'<g transform="translate({x},{y}) rotate({ang})"><path d="M-22 -16 L22 0 L-22 16 Z" fill="#2b8a3e" stroke="#fff" stroke-width="4"/></g>')
    # chú giải
    lx = 40
    for t, txt in [('thuong', 'Đường thường'), ('lon', 'Đường lớn (nhanh)'), ('dong', 'Đường đông'), ('gogh', 'Gồ ghề'), ('hem', 'Hẻm (chỉ xe máy)')]:
        if t != 'thuong' and not any(t == k for k in lv.get('types', {})):
            continue
        s = STYLE[t]
        o.append(f'<line x1="{lx}" y1="{H-35}" x2="{lx+60}" y2="{H-35}" stroke="{s["c"]}" stroke-width="{min(s["w"],20)}"'
                 + (f' stroke-dasharray="{s["dash"]}"' if s['dash'] else '') + '/>')
        o.append(f'<text x="{lx+72}" y="{H-27}" font-size="24" fill="#1d2733">{txt}</text>')
        lx += 330
    o.append('</svg>')
    os.makedirs('maps', exist_ok=True)
    open(f'maps/{lv["id"]}.svg', 'w', encoding='utf-8').write('\n'.join(o))


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    for lv in LEVELS:
        gen(lv)
    print('ok')
