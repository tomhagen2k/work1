"""Định nghĩa 5 màn demo. Điểm: (nút A, nút B, tỉ lệ từ A) — nằm trên đoạn A–B."""

def row(j, i0, i1):
    return [(f'c{i}r{j}', f'c{i+1}r{j}') for i in range(i0, i1)]

def col(i, j0, j1):
    return [(f'c{i}r{j}', f'c{i}r{j+1}') for j in range(j0, j1)]

LEVELS = [
    dict(id='L1', name='Làm quen', grid=(5, 3), vehicles=['van'],
         remove=[('c0r0', 'c1r0'), ('c4r0', 'c4r1')],
         start=('c0r1', 'c1r1', 40 / 350),
         points={'KhoA': ('c1r0', 'c2r0', .5), 'Hoa': ('c3r0', 'c3r1', .5), 'Sieu': ('c3r2', 'c4r2', .5)},
         missions=[dict(id='Sieu', **{'from': 'KhoA'}, to='Sieu', qty=2),
                   dict(id='Hoa', **{'from': 'KhoA'}, to='Hoa', qty=1)]),

    dict(id='L2', name='Chia chuyến', grid=(5, 3), vehicles=['van'],
         start=('c0r1', 'c1r1', 40 / 350),
         points={'KhoA': ('c2r1', 'c3r1', .5), 'Dong': ('c4r0', 'c4r1', .5), 'Bac': ('c3r0', 'c4r0', .5),
                 'Tay': ('c0r1', 'c0r2', .5)},
         missions=[dict(id='Dong', **{'from': 'KhoA'}, to='Dong', qty=2),
                   dict(id='Tay', **{'from': 'KhoA'}, to='Tay', qty=2),
                   dict(id='Bac', **{'from': 'KhoA'}, to='Bac', qty=1)]),

    dict(id='L3', name='Đường lớn & đường đông', grid=(5, 4), vehicles=['van'],
         start=('c0r3', 'c0r2', .2),
         types={'lon': row(3, 0, 4) + col(0, 1, 3) + col(4, 1, 3),
                'dong': row(1, 0, 4)},
         points={'KhoA': ('c0r0', 'c0r1', .5), 'Cho': ('c4r1', 'c4r2', .5),
                 'KhoB': ('c4r0', 'c4r1', .5), 'Truong': ('c0r1', 'c0r2', .5)},
         missions=[dict(id='Cho', **{'from': 'KhoA'}, to='Cho', qty=3),
                   dict(id='Truong', **{'from': 'KhoB'}, to='Truong', qty=3)]),

    dict(id='L4', name='Hạn giao', grid=(6, 4), vehicles=['van'],
         start=('c0r1', 'c1r1', 40 / 350),
         types={'lon': row(3, 0, 5) + col(5, 0, 3),
                'dong': row(1, 2, 4) + col(3, 0, 2)},
         points={'KhoA': ('c1r0', 'c2r0', .5), 'KhoB': ('c4r3', 'c5r3', .5),
                 'BenhVien': ('c4r0', 'c5r0', .5), 'Truong': ('c0r2', 'c0r3', .5),
                 'Cho': ('c2r2', 'c3r2', .5), 'Nha': ('c5r1', 'c5r2', .5)},
         missions=[dict(id='BenhVien', **{'from': 'KhoA'}, to='BenhVien', qty=1, dl=40),
                   dict(id='Cho', **{'from': 'KhoA'}, to='Cho', qty=2),
                   dict(id='Truong', **{'from': 'KhoB'}, to='Truong', qty=2, dl=85),
                   dict(id='Nha', **{'from': 'KhoB'}, to='Nha', qty=2)]),

    dict(id='L5', name='Chọn xe', grid=(6, 4), vehicles=['may', 'van', 'tai'],
         start=('c0r1', 'c1r1', 40 / 350),
         types={'lon': row(3, 0, 5) + col(0, 0, 3),
                'dong': row(1, 1, 4),
                'gogh': col(3, 1, 3) + row(2, 3, 5),
                'hem': col(2, 0, 1) + col(4, 2, 3)},
         points={'KhoA': ('c0r2', 'c0r3', .5), 'KhoB': ('c5r0', 'c5r1', .5),
                 'Cho': ('c2r0', 'c3r0', .5), 'Truong': ('c4r1', 'c4r2', .5),
                 'Nha': ('c1r2', 'c2r2', .5), 'Cang': ('c5r2', 'c5r3', .5)},
         missions=[dict(id='Cho', **{'from': 'KhoA'}, to='Cho', qty=2),
                   dict(id='Nha', **{'from': 'KhoA'}, to='Nha', qty=2),
                   dict(id='Cang', **{'from': 'KhoB'}, to='Cang', qty=3),
                   dict(id='Truong', **{'from': 'KhoB'}, to='Truong', qty=1, dl=60)]),
]
