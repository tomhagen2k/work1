"""Chương 1 — Làng ven sông Việt Nam (xây dựng dần: dựng chợ phiên).

Bản đồ chung 6×4, mỗi màn dùng một VÙNG (đường ngoài vùng là "chưa thông xe").
Thiết kế và số đo: Thiet_Ke_Chuong_1.md. Khung độ khó: Khung_Do_Kho_Chuong_Man.md.
Dữ liệu này khớp CH1 trong demo/index.html.
Chạy: python -I levels_ch1.py  → tính lời giải tối ưu, cách chơi không tính toán, ghi ket_qua_ch1.json
"""

COLS, ROWS = 6, 4


def row(j, i0, i1):
    return [(f'c{i}r{j}', f'c{i+1}r{j}') for i in range(i0, i1)]


def col(i, j0, j1):
    return [(f'c{i}r{j}', f'c{i}r{j+1}') for j in range(j0, j1)]


# Đường lớn: đường đê dọc sông (cột phía Đông) + hai nhánh nối vào — chỉ nằm trong vùng mở ở màn 8
TYPES = {'lon': col(5, 0, 3) + row(0, 4, 5) + row(3, 4, 5)}

# Điểm của cả chương. HTX là kho duy nhất (Chương 1 chỉ 1 kho — YT-01).
POINTS = {
    'HTX': ('c1r1', 'c2r1', .5),         # Hợp tác xã (kho)
    'ChoPhien': ('c2r0', 'c3r0', .5),    # công trình màn 1 (lều chợ) và màn 10 (chợ phiên hoàn chỉnh)
    'GiengLang': ('c0r1', 'c0r2', .5),   # công trình màn 2
    'XomTren': ('c0r0', 'c1r0', .5),
    'XomGiua': ('c3r1', 'c3r2', .5),
    'NhaLy': ('c1r2', 'c2r2', .5),       # nhà ông Lý
    'TruongLang': ('c4r0', 'c4r1', .5),  # công trình màn 3
    'XomDong': ('c3r2', 'c4r2', .5),     # công trình màn 4 (cụm nhà mới)
    'TramYTe': ('c1r3', 'c2r3', .5),     # công trình màn 5
    'XomNam': ('c3r3', 'c4r3', .5),
    'AoCa': ('c0r2', 'c0r3', .5),        # công trình màn 6
    'DinhLang': ('c2r2', 'c2r3', .5),    # công trình màn 7
    'BenDo': ('c5r1', 'c5r2', .5),       # công trình màn 8 (trên đường đê)
    'NhaVanHoa': ('c4r2', 'c4r3', .5),   # công trình màn 9
    'XomBai': ('c5r2', 'c5r3', .5),
}

# Vùng theo màn: (cột cuối, hàng cuối)
REGIONS = [(3, 2), (3, 2), (4, 2), (4, 2), (4, 3), (4, 3), (4, 3), (5, 3), (5, 3), (5, 3)]
SITES = ['ChoPhien', 'GiengLang', 'TruongLang', 'XomDong', 'TramYTe', 'AoCa', 'DinhLang', 'BenDo', 'NhaVanHoa', 'ChoPhien']
START = ('c0r1', 'c1r1', 40 / 350)


def region(c1, r1):
    """Vùng dùng được: cột 0..c1, hàng 0..r1 → danh sách đoạn cần bỏ."""
    rem = []
    for j in range(ROWS):
        for i in range(COLS - 1):
            if not (i + 1 <= c1 and j <= r1):
                rem.append((f'c{i}r{j}', f'c{i+1}r{j}'))
    for i in range(COLS):
        for j in range(ROWS - 1):
            if not (i <= c1 and j + 1 <= r1):
                rem.append((f'c{i}r{j}', f'c{i}r{j+1}'))
    return rem


def M(to, qty):
    return dict(id=to, **{'from': 'HTX'}, to=to, qty=qty)


# (tên, T0, nhiệm vụ). T0 = T_opt đo trong demo × (1 + biên), làm tròn lên 5 giây (CT-05)
SPEC = [
    ('Ngày đầu đi giao', 90, [M('ChoPhien', 2), M('XomTren', 1)]),
    ('Giếng làng', 50, [M('ChoPhien', 2), M('GiengLang', 1)]),
    ('Trường làng', 55, [M('ChoPhien', 1), M('XomTren', 1), M('TruongLang', 1)]),
    ('Xóm Đông', 60, [M('ChoPhien', 1), M('XomTren', 1), M('XomDong', 1)]),
    ('Trạm y tế', 80, [M('NhaLy', 1), M('TruongLang', 3), M('TramYTe', 1)]),
    ('Ao cá', 75, [M('GiengLang', 1), M('XomGiua', 1), M('TruongLang', 2), M('AoCa', 2)]),
    ('Đình làng', 80, [M('ChoPhien', 1), M('GiengLang', 2), M('AoCa', 1), M('DinhLang', 3)]),
    ('Bến đò', 95, [M('ChoPhien', 1), M('XomTren', 1), M('XomNam', 2), M('BenDo', 1)]),
    ('Nhà văn hóa', 95, [M('XomTren', 1), M('NhaLy', 3), M('BenDo', 1), M('NhaVanHoa', 2)]),
    ('Chợ phiên', 105, [M('ChoPhien', 3), M('GiengLang', 1), M('XomDong', 1), M('AoCa', 2), M('XomBai', 2)]),
]

LEVELS = []
for k, (name, T0, ms) in enumerate(SPEC):
    used = {m['from'] for m in ms} | {m['to'] for m in ms}
    rm = region(*REGIONS[k])
    LEVELS.append(dict(id=f'C1L{k+1}', name=name, T0=T0, grid=(COLS, ROWS), vehicles=['van'], remove=rm,
                       types={t: [e for e in es if e not in rm] for t, es in TYPES.items()},
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
    json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ket_qua_ch1.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=1)
