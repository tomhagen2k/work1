"""Chương 3 — Thành phố Không Ngủ (New York về đêm, xây dựng dần: thắp sáng thành phố).

Bản đồ chung 8×4, mỗi màn dùng một VÙNG (đường ngoài vùng là "chưa thông xe"). Yếu tố mới của chương: ĐƯỜNG ĐÔNG
(từ màn 3; xe van chạy 0,45 tốc độ thường). Ôn: 2 kho (màn 1–6), 3 kho từ màn 7; đại lộ ven sông phía Bắc và phía Nam.
Thiết kế + số đo: Thiet_Ke_Chuong_3.md. Khớp CH3 trong demo/index.html.
Chạy: python -I levels_ch3.py → lời giải tối ưu, cách chơi không tính toán, ghi ket_qua_ch3.json
"""

COLS, ROWS = 8, 4
def row(j, i0, i1): return [(f'c{i}r{j}', f'c{i+1}r{j}') for i in range(i0, i1)]
def col(i, j0, j1): return [(f'c{i}r{j}', f'c{i}r{j+1}') for j in range(j0, j1)]

# Đại lộ ven sông phía Bắc (hàng 0) và phía Nam (hàng 3), mở dần theo vùng.
# Đường đông — khu trung tâm: phố dọc cột 5 + hai phố ngang hàng 1, 2 từ cột 4 sang Đông. Vùng màn 1–2 (cột 0–4) không có đường đông (NC-03).
TYPES = {'lon': row(0, 0, 7) + row(3, 0, 7),
         'dong': col(5, 0, 3) + row(1, 4, 7) + row(2, 4, 7)}
START = ('c0r1', 'c1r1', 40 / 350)
KHO = ['BenCang', 'KhoGa', 'TrungTam']
POINTS = {
    'BenCang': ('c0r1', 'c0r2', .5),     # kho 1 — bến cảng phía Tây
    'KhoGa': ('c3r0', 'c3r1', .5),       # kho 2 — kho ga hàng
    'TrungTam': ('c7r1', 'c7r2', .5),    # kho 3 — trung tâm phân phối phía Đông (mở ở màn 7)
    'GaTau': ('c1r0', 'c1r1', .5),       # công trình 1 — ga tàu điện ngầm
    'Brownstone': ('c4r2', 'c4r3', .5),  # công trình 2 — dãy brownstone
    'QuangTruong': ('c5r2', 'c5r3', .5), # công trình 3 — quảng trường LED (trên phố đông cột 5)
    'NhaHat': ('c4r0', 'c5r0', .5),      # công trình 4 — nhà hát
    'ThapNuoc': ('c6r2', 'c6r3', .5),    # công trình 5 — sân thượng tháp nước
    'CauTreo': ('c5r3', 'c6r3', .5),     # công trình 6 — cầu treo
    'ArtDeco': ('c6r0', 'c7r0', .5),     # công trình 7 — tòa Art Deco
    'ChoDem': ('c7r2', 'c7r3', .5),      # công trình 8 — chợ đêm
    'SanBang': ('c6r1', 'c6r2', .5),     # công trình 9 — sân băng công viên
    'BenPha': ('c7r0', 'c7r1', .5),      # công trình 10 — bến phà ra tượng cầm đuốc (kỳ quan)
    'ToaBao': ('c0r0', 'c1r0', .5),
    'Pizza': ('c1r1', 'c2r1', .5),
    'CanHo': ('c1r2', 'c1r3', .5),
    'KhachSan': ('c2r2', 'c3r2', .5),
    'Deli': ('c2r1', 'c2r2', .5),
    'HotDog': ('c1r2', 'c2r2', .5),
    'BaoTang': ('c2r0', 'c3r0', .5),
    'Studio': ('c3r1', 'c4r1', .5),
    'RapPhim': ('c4r1', 'c5r1', .5),     # trên phố đông
    'CuaHangNhac': ('c5r1', 'c6r1', .5), # trên phố đông
    'Cafe': ('c6r2', 'c7r2', .5),
}
REG = [(4, 3), (4, 3), (5, 3), (5, 3), (6, 3), (6, 3), (7, 3), (7, 3), (7, 3), (7, 3)]
SITE = ['GaTau', 'Brownstone', 'QuangTruong', 'NhaHat', 'ThapNuoc', 'CauTreo', 'ArtDeco', 'ChoDem', 'SanBang', 'BenPha']
# biên CT-04 theo ĐK 11–20 (+10% ở màn 3)
BIEN = [.30, .295, .39, .285, .28, .275, .27, .265, .26, .255]


def region(c1, r1):
    rem = []
    for j in range(ROWS):
        for i in range(COLS - 1):
            if not (i + 1 <= c1 and j <= r1): rem.append((f'c{i}r{j}', f'c{i+1}r{j}'))
    for i in range(COLS):
        for j in range(ROWS - 1):
            if not (i <= c1 and j + 1 <= r1): rem.append((f'c{i}r{j}', f'c{i}r{j+1}'))
    return rem


def M(f, to, qty):
    return dict(id=to, **{'from': f}, to=to, qty=qty)


# (tên, T0, nhiệm vụ) — T0 = T_opt đo trong demo × (1 + biên), làm tròn lên 5 giây (CT-05)
SPEC = [
    ('Ga tàu điện', 80, [M('KhoGa', 'GaTau', 2), M('KhoGa', 'CanHo', 3), M('BenCang', 'BaoTang', 3)]),
    ('Dãy brownstone', 95, [M('BenCang', 'GaTau', 2), M('BenCang', 'Brownstone', 3), M('KhoGa', 'CanHo', 2)]),
    ('Quảng trường LED', 110, [M('BenCang', 'GaTau', 1), M('BenCang', 'QuangTruong', 3), M('KhoGa', 'RapPhim', 2)]),
    ('Nhà hát', 95, [M('BenCang', 'QuangTruong', 1), M('KhoGa', 'NhaHat', 2), M('BenCang', 'Deli', 2), M('KhoGa', 'RapPhim', 2)]),
    ('Tháp nước', 120, [M('BenCang', 'NhaHat', 3), M('KhoGa', 'ThapNuoc', 3), M('BenCang', 'CanHo', 1), M('KhoGa', 'RapPhim', 3)]),
    ('Cầu treo', 115, [M('KhoGa', 'CauTreo', 3), M('BenCang', 'Pizza', 3), M('KhoGa', 'BaoTang', 1), M('KhoGa', 'CuaHangNhac', 3)]),
    ('Tòa Art Deco', 120, [M('BenCang', 'GaTau', 1), M('TrungTam', 'CauTreo', 2), M('KhoGa', 'ArtDeco', 3), M('TrungTam', 'RapPhim', 3)]),
    ('Chợ đêm', 155, [M('KhoGa', 'ChoDem', 3), M('TrungTam', 'ToaBao', 2), M('BenCang', 'Deli', 2), M('BenCang', 'Cafe', 3)]),
    ('Sân băng', 140, [M('KhoGa', 'SanBang', 3), M('TrungTam', 'CuaHangNhac', 3), M('BenCang', 'KhachSan', 1), M('BenCang', 'RapPhim', 3)]),
    ('Tượng cầm đuốc', 155, [M('KhoGa', 'BenPha', 2), M('TrungTam', 'CauTreo', 2), M('BenCang', 'Cafe', 3), M('TrungTam', 'HotDog', 3), M('KhoGa', 'ChoDem', 1)]),
]

LEVELS = []
for k, (name, T0, ms) in enumerate(SPEC):
    used = {m['from'] for m in ms} | {m['to'] for m in ms}
    rm = region(*REG[k])
    rs = {tuple(sorted(e)) for e in rm}
    LEVELS.append(dict(id=f'C3L{k+1}', name=name, T0=T0, grid=(COLS, ROWS), vehicles=['van'], remove=rm,
                       types={t: [e for e in es if tuple(sorted(e)) not in rs] for t, es in TYPES.items()},
                       start=START, points={p: POINTS[p] for p in used}, missions=ms))

if __name__ == '__main__':
    import json, os, sys
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    sys.stdout.reconfigure(encoding='utf-8')
    from solver import solve, naive
    out = {}
    for lv in LEVELS:
        t, path = solve(lv, 'van')
        nt, nlog, nf = naive(lv, 'van')
        print(f"{lv['id']} {lv['name']}: tối ưu {t:.1f}s | không tính toán {nt:.1f}s {nf or ''}")
        out[lv['id'] + '_van'] = dict(opt=t, path=path, naive=nt, naive_fail=nf, naive_log=nlog)
    json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ket_qua_ch3.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=1)
