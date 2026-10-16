"""Chương 2 — Khu đô thị mới (xây dựng dần: xây mới). Thay bản thử nghiệm 5 màn trước v1.4.

Bản đồ chung 7×4, mỗi màn dùng một VÙNG (đường ngoài vùng là "chưa thông xe"). Yếu tố mới của chương: NHIỀU KHO
(2 kho từ màn 3, 3 kho từ màn 8). Thiết kế + số đo: Thiet_Ke_Chuong_2.md. Khớp CH2 trong demo/index.html.
Chạy: python -I levels_ch2.py → lời giải tối ưu, cách chơi không tính toán, ghi ket_qua_ch2.json
"""

COLS, ROWS = 7, 4
def row(j, i0, i1): return [(f'c{i}r{j}', f'c{i+1}r{j}') for i in range(i0, i1)]
def col(i, j0, j1): return [(f'c{i}r{j}', f'c{i}r{j+1}') for j in range(j0, j1)]

# Đại lộ: ngang phía Nam khu (hàng 2) + dọc phía Đông (cột 5, mở ở màn 6)
TYPES = {'lon': row(2, 0, 6) + col(5, 0, 3)}
START = ('c0r1', 'c1r1', 40 / 350)
KHO = ['BaiVL', 'KhoTong', 'XuongGo']
POINTS = {
    'BaiVL': ('c0r0', 'c0r1', .5),      # kho 1 (từ màn 1)
    'KhoTong': ('c4r1', 'c4r2', .5),    # kho 2 (mở ở màn 3)
    'XuongGo': ('c6r1', 'c6r2', .5),    # kho 3 (mở ở màn 8)
    'TiemBanh': ('c1r0', 'c2r0', .5),   # công trình 1
    'NhaTre': ('c2r1', 'c2r2', .5),     # công trình 2
    'TruongHoc': ('c4r0', 'c4r1', .5),  # công trình 3
    'KhuNha': ('c1r3', 'c2r3', .5),     # công trình 4
    'ChoMoi': ('c3r2', 'c4r2', .5),     # công trình 5
    'BenhVien': ('c5r0', 'c5r1', .5),   # công trình 6
    'NhaVH': ('c3r3', 'c4r3', .5),      # công trình 7
    'HoDieuHoa': ('c6r2', 'c6r3', .5),  # công trình 8
    'ThapVP': ('c5r2', 'c5r3', .5),     # công trình 9
    'CongVien': ('c5r1', 'c5r2', .5),   # công trình 10 (kỳ quan)
    'VanPhongDA': ('c0r1', 'c0r2', .5), # văn phòng dự án
    'ChungCuA': ('c1r1', 'c2r1', .5),
    'ChungCuB': ('c3r0', 'c3r1', .5),
    'NhaMau': ('c0r2', 'c0r3', .5),     # nhà mẫu
    'KhuB': ('c5r3', 'c6r3', .5),
    'ToaC': ('c2r2', 'c2r3', .5),
    'SieuThi': ('c6r0', 'c6r1', .5),
    'QuanCafe': ('c1r2', 'c2r2', .5),
    'NhaPho': ('c3r1', 'c3r2', .5),
}
REG = [(3, 2), (3, 2), (4, 2), (4, 3), (4, 3), (5, 3), (5, 3), (6, 3), (6, 3), (6, 3)]
SITE = ['TiemBanh', 'NhaTre', 'TruongHoc', 'KhuNha', 'ChoMoi', 'BenhVien', 'NhaVH', 'HoDieuHoa', 'ThapVP', 'CongVien']
KHO_AT = [['BaiVL']] * 2 + [['BaiVL', 'KhoTong']] * 5 + [['BaiVL', 'KhoTong', 'XuongGo']] * 3


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
    ('Khởi công', 70, [M('BaiVL', 'TiemBanh', 1), M('BaiVL', 'VanPhongDA', 1), M('BaiVL', 'ChungCuB', 2), M('BaiVL', 'QuanCafe', 2)]),
    ('Nhà trẻ', 70, [M('BaiVL', 'TiemBanh', 1), M('BaiVL', 'NhaTre', 1), M('BaiVL', 'VanPhongDA', 3), M('BaiVL', 'QuanCafe', 2)]),
    ('Trường học', 80, [M('KhoTong', 'TruongHoc', 1), M('KhoTong', 'VanPhongDA', 3), M('BaiVL', 'ChungCuA', 1)]),
    ('Khu nhà ở', 90, [M('BaiVL', 'NhaTre', 2), M('KhoTong', 'TruongHoc', 1), M('KhoTong', 'KhuNha', 2), M('KhoTong', 'VanPhongDA', 1)]),
    ('Chợ mới', 95, [M('BaiVL', 'TiemBanh', 1), M('KhoTong', 'ChoMoi', 1), M('KhoTong', 'VanPhongDA', 3), M('KhoTong', 'ChungCuB', 2)]),
    ('Bệnh viện', 95, [M('BaiVL', 'BenhVien', 3), M('KhoTong', 'ChungCuB', 1), M('KhoTong', 'NhaMau', 3)]),
    ('Nhà văn hóa', 95, [M('BaiVL', 'NhaTre', 1), M('KhoTong', 'TruongHoc', 1), M('KhoTong', 'KhuNha', 3), M('KhoTong', 'NhaVH', 3)]),
    ('Hồ điều hòa', 105, [M('KhoTong', 'TiemBanh', 1), M('BaiVL', 'NhaVH', 3), M('XuongGo', 'HoDieuHoa', 2), M('XuongGo', 'ChungCuB', 2)]),
    ('Tháp văn phòng', 115, [M('KhoTong', 'KhuNha', 1), M('BaiVL', 'ThapVP', 3), M('XuongGo', 'NhaMau', 2), M('KhoTong', 'SieuThi', 3)]),
    ('Công viên trung tâm', 125, [M('KhoTong', 'TiemBanh', 2), M('XuongGo', 'ChoMoi', 2), M('BaiVL', 'NhaVH', 2), M('XuongGo', 'CongVien', 3), M('XuongGo', 'ChungCuA', 1)]),
]

LEVELS = []
for k, (name, T0, ms) in enumerate(SPEC):
    used = {m['from'] for m in ms} | {m['to'] for m in ms}
    rm = region(*REG[k])
    LEVELS.append(dict(id=f'C2L{k+1}', name=name, T0=T0, grid=(COLS, ROWS), vehicles=['van'], remove=rm,
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
    json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ket_qua_ch2.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=1)
