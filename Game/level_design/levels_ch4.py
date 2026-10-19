"""Chương 4 — Đảo Mây Trắng (Santorini, xây dựng dần: chuẩn bị mùa du lịch).

Bản đồ chung 8×4, mỗi màn dùng một VÙNG (đường ngoài vùng là "chưa thông xe"). Yếu tố mới của chương: HẠN GIAO (từ màn 3) —
hàng phải kịp chuyến phà (Bến phà, màn 3), kịp tiệc ở Quán hoàng hôn (màn 6), kịp tàu ở Cảng cũ (màn 7). Hạn rộng: lời giải tốt nhất
còn dư ≥ 15 giây (BA chốt 19/10); hạn đầu tiên của mỗi màn "có tác dụng" (lời giải tốt nhất khi bỏ hạn sẽ trễ hạn).
Ôn: 2 kho (màn 1–6), 3 kho từ màn 7; đường lớn ven vách (cột 0) + ven biển phía Nam (hàng 3); phố chợ đông (hàng 1 cột 2→5, cột 4 hàng 1→3).
Thiết kế + số đo: Thiet_Ke_Chuong_4.md. Khớp CH4 trong demo/index.html.
Hạn (dl) và T0 ghi theo GIÂY DEMO; bộ giải chạy chậm hơn demo, nên hạn được quy đổi theo tỉ lệ demo/bộ giải của từng màn (TI_LE, đo bằng
bộ lái tự động) trước khi giải.
Chạy: python -I levels_ch4.py → lời giải chuẩn (tốt nhất còn dư ≥ 15 giây ở mọi hạn), cách chơi không tính toán, ghi ket_qua_ch4.json
"""

COLS, ROWS = 8, 4
def row(j, i0, i1): return [(f'c{i}r{j}', f'c{i+1}r{j}') for i in range(i0, i1)]
def col(i, j0, j1): return [(f'c{i}r{j}', f'c{i}r{j+1}') for j in range(j0, j1)]

TYPES = {'lon': col(0, 0, 3) + row(3, 0, 7),
         'dong': row(1, 2, 5) + col(4, 1, 3)}
START = ('c0r1', 'c1r1', 40 / 350)
KHO = ['KhoCang', 'KhoSon', 'XuongRuou']
POINTS = {
    'KhoCang': ('c0r1', 'c0r2', .5),     # kho 1 — kho cảng hàng (trên vách, cáp tời xuống cảng)
    'KhoSon': ('c4r0', 'c4r1', .5),      # kho 2 — kho sơn & vật liệu
    'XuongRuou': ('c7r1', 'c7r2', .5),   # kho 3 — xưởng rượu vang phía Đông (màn 7)
    'Taverna': ('c1r0', 'c1r1', .5),     # công trình 1 — quán taverna
    'PhoSon': ('c2r2', 'c3r2', .5),      # công trình 2 — phố sơn mới
    'BenPhaDao': ('c5r3', 'c6r3', .5),   # công trình 3 — bến phà (hạn: chuyến phà)
    'ThapChuong': ('c3r0', 'c3r1', .5),  # công trình 4 — tháp chuông
    'KSBeBoi': ('c4r2', 'c4r3', .5),     # công trình 5 — khách sạn bể bơi (trên phố đông cột 4)
    'QuanHH': ('c0r0', 'c0r1', .5),      # công trình 6 — quán hoàng hôn (hạn: tiệc hoàng hôn)
    'CangCu': ('c0r2', 'c0r3', .5),      # công trình 7 — cảng cũ dưới vách (hạn: tàu du lịch)
    'CoiXay': ('c6r0', 'c6r1', .5),      # công trình 8 — cối xay gió
    'HaiDang': ('c7r2', 'c7r3', .5),     # công trình 9 — hải đăng
    'NhaTho': ('c1r1', 'c1r2', .5),      # công trình 10 — nhà thờ ba mái vòm xanh (kỳ quan, khối lớn)
    'NhaHang': ('c2r0', 'c3r0', .5),
    'TiemGom': ('c2r1', 'c2r2', .5),
    'NhaNghi': ('c1r2', 'c2r2', .5),
    'LuuNiem': ('c3r1', 'c4r1', .5),     # trên phố đông
    'HieuBanh': ('c1r3', 'c2r3', .5),
    'PhongTranh': ('c4r1', 'c5r1', .5),  # trên phố đông
    'TiemKem': ('c5r2', 'c5r3', .5),
    'NhaTro': ('c3r2', 'c3r3', .5),
    'VuonNho': ('c6r1', 'c6r2', .5),
    'BaiBien': ('c3r3', 'c4r3', .5),
    'NhaDan': ('c2r0', 'c2r1', .5),
    'TiemHoa': ('c5r1', 'c5r2', .5),
    'CafeVach': ('c6r2', 'c7r2', .5),
    'LangDong': ('c7r0', 'c7r1', .5),
}
REG = [(5, 3)] * 2 + [(6, 3)] * 4 + [(7, 3)] * 4
SITE = ['Taverna', 'PhoSon', 'BenPhaDao', 'ThapChuong', 'KSBeBoi', 'QuanHH', 'CangCu', 'CoiXay', 'HaiDang', 'NhaTho']
# biên CT-04 theo ĐK 16–25 (+10% ở màn 3)
BIEN = [.275, .27, .365, .26, .255, .25, .245, .24, .235, .23]
DU_HAN = 15   # dư hạn tối thiểu (giây demo) của lời giải chuẩn — BA chốt 19/10
# tỉ lệ thời gian demo / bộ giải của từng màn (đo bằng bộ lái tự động — Thiet_Ke_Chuong_4.md mục 3)
TI_LE = [0.9234, 0.935, 0.9412, 0.9488, 0.9337, 0.9739, 0.9487, 0.9384, 0.9528, 0.9532]


def region(c1, r1):
    rem = []
    for j in range(ROWS):
        for i in range(COLS - 1):
            if not (i + 1 <= c1 and j <= r1): rem.append((f'c{i}r{j}', f'c{i+1}r{j}'))
    for i in range(COLS):
        for j in range(ROWS - 1):
            if not (i <= c1 and j + 1 <= r1): rem.append((f'c{i}r{j}', f'c{i}r{j+1}'))
    return rem


def M(f, to, qty, dl=None):
    m = dict(id=to, **{'from': f}, to=to, qty=qty)
    if dl: m['dl'] = dl
    return m


# (tên, T0, nhiệm vụ) — T0 = T_opt đo trong demo × (1 + biên), làm tròn lên 5 giây (CT-05); hạn dl theo giây demo
SPEC = [
    ('Quán taverna', 115, [M('KhoCang', 'Taverna', 1), M('KhoCang', 'LuuNiem', 3), M('KhoSon', 'PhongTranh', 1), M('KhoCang', 'BaiBien', 3)]),
    ('Phố sơn mới', 115, [M('KhoSon', 'PhoSon', 3), M('KhoCang', 'TiemKem', 2), M('KhoCang', 'PhongTranh', 2)]),
    ('Bến phà', 135, [M('KhoSon', 'BenPhaDao', 3, 80), M('KhoCang', 'VuonNho', 2), M('KhoCang', 'NhaDan', 3)]),
    ('Tháp chuông', 150, [M('KhoSon', 'ThapChuong', 2), M('KhoSon', 'BenPhaDao', 2, 60), M('KhoCang', 'VuonNho', 3)]),
    ('Khách sạn bể bơi', 160, [M('KhoSon', 'KSBeBoi', 3), M('KhoSon', 'BenPhaDao', 3, 75), M('KhoSon', 'HieuBanh', 3), M('KhoCang', 'Taverna', 1)]),
    ('Quán hoàng hôn', 160, [M('KhoSon', 'QuanHH', 2, 85), M('KhoSon', 'KSBeBoi', 2), M('KhoCang', 'TiemHoa', 3), M('KhoCang', 'VuonNho', 3)]),
    ('Cảng cũ', 165, [M('XuongRuou', 'CangCu', 2, 115), M('XuongRuou', 'BenPhaDao', 3, 65), M('KhoSon', 'BaiBien', 2), M('KhoCang', 'HieuBanh', 3)]),
    ('Cối xay gió', 170, [M('XuongRuou', 'CoiXay', 3), M('KhoSon', 'CangCu', 3, 110), M('KhoSon', 'QuanHH', 3, 70), M('KhoCang', 'HieuBanh', 2)]),
    ('Hải đăng', 175, [M('KhoSon', 'HaiDang', 2), M('XuongRuou', 'BenPhaDao', 2, 80), M('KhoCang', 'QuanHH', 2, 95), M('KhoCang', 'TiemHoa', 3), M('KhoCang', 'PhongTranh', 3)]),
    ('Nhà thờ mái vòm xanh', 185, [M('KhoSon', 'NhaTho', 3), M('KhoSon', 'QuanHH', 3, 90), M('XuongRuou', 'BenPhaDao', 2, 135), M('KhoCang', 'CangCu', 2, 45), M('XuongRuou', 'LangDong', 2)])
]

LEVELS = []
for k, (name, T0, ms) in enumerate(SPEC):
    used = {m['from'] for m in ms} | {m['to'] for m in ms}
    rm = region(*REG[k])
    rs = {tuple(sorted(e)) for e in rm}
    LEVELS.append(dict(id=f'C4L{k+1}', name=name, T0=T0, grid=(COLS, ROWS), vehicles=['van'], remove=rm,
                       types={t: [e for e in es if tuple(sorted(e)) not in rs] for t, es in TYPES.items()},
                       start=START, points={p: POINTS[p] for p in used}, missions=ms))


def for_solver(lv, k, du=0):
    """Bản màn cho bộ giải: hạn đổi từ giây demo sang giây bộ giải; du > 0: hạn sớm hơn du giây (lời giải chuẩn còn dư ≥ du)."""
    import copy
    lv = copy.deepcopy(lv)
    for m in lv['missions']:
        if m.get('dl'): m['dl'] = (m['dl'] - du) / TI_LE[k]
    return lv


if __name__ == '__main__':
    import json, os, sys
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    sys.stdout.reconfigure(encoding='utf-8')
    from solver import solve, naive
    out = {}
    for k, lv in enumerate(LEVELS):
        # lời giải chuẩn = tốt nhất trong các lời giải còn dư ≥ DU_HAN ở mọi hạn (T0 và bộ lái tự động theo lời giải này)
        t, path = solve(for_solver(lv, k, DU_HAN), 'van')
        t_sat, _ = solve(for_solver(lv, k), 'van')
        nt, nlog, nf = naive(for_solver(lv, k), 'van')
        print(f"{lv['id']} {lv['name']}: chuẩn {t:.1f}s (demo ≈ {t * TI_LE[k]:.1f}s; sát hạn {t_sat:.1f}s) | không tính toán {nt:.1f}s {nf or ''}")
        out[lv['id'] + '_van'] = dict(opt=t, path=path, naive=nt, naive_fail=nf, naive_log=nlog)
    json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ket_qua_ch4.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=1)
