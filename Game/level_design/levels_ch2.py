"""Chương 2 — Khu đô thị mới (phương án B: một bản đồ chung, xây dựng dần qua từng màn).

Bản đồ chung 6×4. Mỗi màn chỉ dùng một VÙNG của bản đồ (các đường ngoài vùng là "chưa thông xe").
Loại đường cố định cho cả chương; công trình không làm thay đổi đường đi.
"""

COLS, ROWS = 6, 4


def row(j, i0, i1):
    return [(f'c{i}r{j}', f'c{i+1}r{j}') for i in range(i0, i1)]


def col(i, j0, j1):
    return [(f'c{i}r{j}', f'c{i}r{j+1}') for j in range(j0, j1)]


# Loại đường của cả khu (dùng chung mọi màn)
TYPES = {
    'lon': row(3, 0, 5) + col(5, 1, 3),
    'dong': row(1, 1, 4) + row(2, 2, 3) + col(3, 0, 1),
    'gogh': col(5, 0, 1) + row(2, 4, 5),
    'hem': row(0, 4, 5),
}

# Các điểm của cả khu: kho và công trình (công trình hoàn thành ở màn nào → về sau là điểm giao hàng)
POINTS = {
    'BaiVL': ('c0r0', 'c0r1', .5),     # Bãi vật liệu (kho)
    'KhoTong': ('c1r2', 'c2r2', .5),     # Kho tổng (kho)
    'TiemBanh': ('c1r0', 'c2r0', .5),  # công trình màn 1
    'TruongHoc': ('c2r1', 'c2r2', .5), # công trình màn 2
    'NhaVH': ('c0r1', 'c0r2', .5),     # Nhà văn hóa — điểm giao
    'NhaTre': ('c3r1', 'c3r2', .5),    # Nhà trẻ — điểm giao
    'XuongGo': ('c4r2', 'c4r3', .5),   # Xưởng gỗ (kho phía đông)
    'ChoMoi': ('c4r1', 'c4r2', .5),    # công trình màn 3
    'BenhVien': ('c3r2', 'c3r3', .5),  # công trình màn 4
    'KhuNha': ('c1r3', 'c2r3', .5),    # khu nhà ở — điểm giao
    'CongVien': ('c5r2', 'c5r3', .5),  # công trình màn 5 (công viên + tháp đồng hồ)
}


def region(c1, r1):
    """Vùng dùng được: cột 0..c1, hàng 0..r1 → trả về danh sách đoạn cần bỏ."""
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


def mk(id, name, reg, vehicles, missions, start=('c0r1', 'c1r1', 40 / 350)):
    c1, r1 = reg
    rem = region(c1, r1)
    types = {t: [e for e in lst if e not in rem] for t, lst in TYPES.items()}
    types = {t: v for t, v in types.items() if v}
    used = {m['from'] for m in missions} | {m['to'] for m in missions}
    pts = {k: v for k, v in POINTS.items() if k in used}
    return dict(id=id, name=name, grid=(COLS, ROWS), vehicles=vehicles, remove=rem, types=types,
                start=start, points=pts, missions=missions, region=reg)


def M(f, t, q, dl=None):
    d = {'from': f, 'to': t, 'qty': q, 'id': t}
    if dl:
        d['dl'] = dl
    return d


LEVELS = [
    mk('C2L1', 'Khởi công', (2, 2), ['van'],
       [M('BaiVL', 'TiemBanh', 2), M('BaiVL', 'NhaVH', 1)]),
    mk('C2L2', 'Xây trường', (3, 2), ['van'],
       [M('KhoTong', 'TruongHoc', 2), M('KhoTong', 'NhaVH', 2), M('KhoTong', 'NhaTre', 1)]),
    mk('C2L3', 'Chợ mới', (4, 3), ['van'],
       [M('BaiVL', 'ChoMoi', 3), M('XuongGo', 'NhaVH', 3)]),
    mk('C2L4', 'Bệnh viện', (4, 3), ['van'],
       [M('KhoTong', 'BenhVien', 1, 35), M('BaiVL', 'BenhVien', 3), M('KhoTong', 'ChoMoi', 2), M('KhoTong', 'KhuNha', 2, 50)]),
    mk('C2L5', 'Công viên trung tâm', (5, 3), ['may', 'van', 'tai'],
       [M('BaiVL', 'CongVien', 4), M('KhoTong', 'BenhVien', 1), M('KhoTong', 'ChoMoi', 2), M('KhoTong', 'TiemBanh', 1)]),
]
