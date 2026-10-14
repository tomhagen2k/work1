"""Bộ giải màn chơi (demo) — tính lộ trình tối ưu và lộ trình "không tính toán".

Mô hình khớp với luật demo:
- Xe chạy trên lưới đường; thời gian đoạn = dài / (tốc độ xe * hệ số loại đường).
- Quay đầu tốn thời gian cố định theo xe.
- Vùng đỗ coi như một điểm giữa đoạn đường.
- Tới điểm giao có hàng: tự giao (DROP giây). Tới kho: chọn lấy đơn nào, mỗi lần lấy tối đa theo chỗ trống (PICK giây).
- Bảng hỏi không tốn thời gian (đồng hồ dừng).
- Thời hạn riêng: đơn phải giao đủ trước hạn.
Chạy: python -I solver.py
"""
import heapq
import itertools

PICK, DROP = 2.0, 1.5
VEH = {  # tốc độ px/s, sức chứa, thời gian quay đầu
    'may': dict(name='Xe máy', v=130, cap=1, ut=1.0),
    'van': dict(name='Xe van', v=90, cap=3, ut=1.5),
    'tai': dict(name='Xe tải', v=65, cap=6, ut=2.5),
}
# hệ số tốc độ theo loại đường và loại xe; None = không được đi
ROAD = {
    'thuong': dict(may=1.0, van=1.0, tai=1.0),
    'lon':    dict(may=1.5, van=1.5, tai=1.5),
    'dong':   dict(may=0.8, van=0.45, tai=0.35),
    'gogh':   dict(may=0.5, van=0.7, tai=0.6),
    'hem':    dict(may=0.9, van=None, tai=None),
}
SP = 350  # khoảng cách giữa hai giao lộ


def build(level, veh):
    cols, rows = level['grid']
    N = {f'c{i}r{j}': (100 + i * SP, 100 + j * SP) for i in range(cols) for j in range(rows)}
    edges = {}
    def key(a, b): return tuple(sorted((a, b)))
    for j in range(rows):
        for i in range(cols - 1):
            edges[key(f'c{i}r{j}', f'c{i+1}r{j}')] = 'thuong'
    for i in range(cols):
        for j in range(rows - 1):
            edges[key(f'c{i}r{j}', f'c{i}r{j+1}')] = 'thuong'
    for e in level.get('remove', []):
        edges.pop(key(*e))
    for t, lst in level.get('types', {}).items():
        for e in lst:
            assert key(*e) in edges, e
            edges[key(*e)] = t
    # chèn điểm (vùng đỗ, xuất phát) vào giữa đoạn
    pts = dict(level['points'])
    pts['START'] = level['start']
    adj = {}
    def add(a, b, length, t):
        adj.setdefault(a, []).append((b, length, t))
        adj.setdefault(b, []).append((a, length, t))
    split = {}
    for pid, (a, b, frac) in pts.items():
        split.setdefault(key(a, b), []).append((frac if key(a, b)[0] == a else 1 - frac, pid))
    for (a, b), t in edges.items():
        L = SP
        chain = [(0.0, a)] + sorted(split.get((a, b), [])) + [(1.0, b)]
        for (f1, n1), (f2, n2) in zip(chain, chain[1:]):
            add(n1, n2, (f2 - f1) * L, t)
    V = VEH[veh]
    def cost(length, t):
        m = ROAD[t][veh]
        return None if m is None else length / (V['v'] * m)
    return adj, cost, V, edges


def dijkstra(adj, cost, ut, src_state):
    """Trạng thái có hướng: (nút, nút vừa rời). Quay lại nút vừa rời phải quay đầu."""
    dist = {src_state: 0.0}
    pq = [(0.0, src_state)]
    while pq:
        d, (n, prev) = heapq.heappop(pq)
        if d > dist.get((n, prev), 1e18):
            continue
        for (m, length, t) in adj.get(n, []):
            c = cost(length, t)
            if c is None:
                continue
            nd = d + c + (ut if m == prev else 0.0)
            if nd < dist.get((m, n), 1e18):
                dist[(m, n)] = nd
                heapq.heappush(pq, (nd, (m, n)))
    return dist


def solve(level, veh):
    adj, cost, V, _ = build(level, veh)
    M = level['missions']
    cap = V['cap']
    a0, b0, _ = level['start']
    start = ('START', a0)  # đang đi từ a0 về b0
    cache = {}
    def reach(state):
        if state not in cache:
            cache[state] = dijkstra(adj, cost, V['ut'], state)
        return cache[state]
    zones = sorted({m['from'] for m in M} | {m['to'] for m in M})
    n = len(M)
    init = (start, (0,) * n, (0,) * n, (0,) * n)
    best = {init: 0.0}
    pq = [(0.0, init, [])]
    while pq:
        t, st, path = heapq.heappop(pq)
        if t > best.get(st, 1e18) + 1e-9:
            continue
        pos, picked, onb, dlv = st
        if all(dlv[i] >= M[i]['qty'] for i in range(n)):
            return t, path
        dist = reach(pos)
        for z in zones:
            for (node, prev), dt in dist.items():
                if node != z:
                    continue
                t1 = t + dt
                p, o, d = list(picked), list(onb), list(dlv)
                # tự giao
                dels = [i for i in range(n) if M[i]['to'] == z and o[i] > 0]
                if dels:
                    t1 += DROP
                    for i in dels:
                        d[i] += o[i]; o[i] = 0
                if any(M[i].get('dl') and d[i] >= M[i]['qty'] and t1 > M[i]['dl'] for i in dels):
                    continue
                # các cách lấy hàng tại z (theo thứ tự chọn, lấy tối đa)
                cand = [i for i in range(n) if M[i]['from'] == z and p[i] < M[i]['qty']]
                options = [()]
                for r in range(1, len(cand) + 1):
                    options += list(itertools.permutations(cand, r))
                for seq in options:
                    p2, o2, t2 = p[:], o[:], t1
                    free = cap - sum(o2)
                    valid = True
                    for i in seq:
                        if free <= 0:
                            valid = False; break
                        k = min(M[i]['qty'] - p2[i], free)
                        p2[i] += k; o2[i] += k; free -= k; t2 += PICK
                    if not valid:
                        continue
                    if not dels and not seq:
                        continue
                    # hạn: đơn chưa xong mà đã quá hạn thì loại
                    if any(M[i].get('dl') and d[i] < M[i]['qty'] and t2 > M[i]['dl'] for i in range(n)):
                        continue
                    ns = ((z, prev), tuple(p2), tuple(o2), tuple(d))
                    if t2 < best.get(ns, 1e18) - 1e-9:
                        best[ns] = t2
                        act = []
                        if dels: act.append('giao ' + '+'.join(M[i]['id'] for i in dels))
                        if seq: act.append('lấy ' + '+'.join(f"{M[i]['id']}" for i in seq))
                        heapq.heappush(pq, (t2, ns, path + [(round(t2, 1), z, ', '.join(act))]))
    return None, None


def naive(level, veh):
    """Người chơi không tính toán: đường ngắn nhất theo độ dài (bỏ qua loại đường),
    lấy hàng theo thứ tự danh sách, giao điểm gần nhất trước, hết hàng thì về kho gần nhất."""
    adj, cost, V, _ = build(level, veh)
    def dcost(length, t):
        return None if ROAD[t][veh] is None else length
    M = level['missions']; n = len(M); cap = V['cap']
    a0, _, _ = level['start']
    pos = ('START', a0); t = 0.0
    p, o, d = [0] * n, [0] * n, [0] * n
    log = []
    fail = None
    for _ in range(60):
        if all(d[i] >= M[i]['qty'] for i in range(n)):
            break
        geo = dijkstra(adj, dcost, 0.0, pos)  # chọn đường theo độ dài
        def go(z):
            nonlocal pos, t
            cands = [(dd, s) for s, dd in geo.items() if s[0] == z]
            dd, s = min(cands)
            # thời gian thật của đường đã chọn: tính lại bằng cost trên cùng lộ trình xấp xỉ = theo dijkstra thời gian
            # giới hạn: đi theo đường ngắn nhất về độ dài -> dùng dijkstra độ dài để lấy đường, rồi cộng thời gian thật
            path = shortest_path(adj, dcost, pos, z)
            tt = path_time(path, adj, cost, V['ut'])
            pos = path[-1]; t += tt
        targets = [M[i]['to'] for i in range(n) if o[i] > 0]
        if targets:
            z = min(targets, key=lambda z: min(dd for s, dd in geo.items() if s[0] == z))
            go(z)
            dels = [i for i in range(n) if M[i]['to'] == z and o[i] > 0]
            t += DROP
            for i in dels:
                d[i] += o[i]; o[i] = 0
                if M[i].get('dl') and d[i] >= M[i]['qty'] and t > M[i]['dl']:
                    fail = fail or f"trễ hạn {M[i]['id']}"
            log.append((round(t, 1), z, 'giao'))
            continue
        kho = [M[i]['from'] for i in range(n) if p[i] < M[i]['qty']]
        z = min(kho, key=lambda z: min(dd for s, dd in geo.items() if s[0] == z))
        go(z)
        free = cap
        for i in range(n):
            if M[i]['from'] == z and p[i] < M[i]['qty'] and free > 0:
                k = min(M[i]['qty'] - p[i], free); p[i] += k; o[i] += k; free -= k; t += PICK
        log.append((round(t, 1), z, 'lấy'))
    return t, log, fail


def shortest_path(adj, cost, src, dst):
    dist = {src: 0.0}; prevs = {}
    pq = [(0.0, src)]
    while pq:
        d, (n, prev) = heapq.heappop(pq)
        if n == dst:
            path = [(n, prev)]
            s = (n, prev)
            while s in prevs:
                s = prevs[s]; path.append(s)
            return path[::-1]
        if d > dist.get((n, prev), 1e18):
            continue
        for (m, length, t) in adj.get(n, []):
            c = cost(length, t)
            if c is None:
                continue
            nd = d + c + (0.001 if m == prev else 0)
            if nd < dist.get((m, n), 1e18):
                dist[(m, n)] = nd; prevs[(m, n)] = (n, prev)
                heapq.heappush(pq, (nd, (m, n)))


def path_time(path, adj, cost, ut):
    t = 0.0
    for (n1, p1), (n2, p2) in zip(path, path[1:]):
        length, typ = next((l, ty) for (m, l, ty) in adj[n1] if m == n2)
        t += cost(length, typ) + (ut if n2 == p1 else 0)
    return t


if __name__ == '__main__':
    import json, os, sys
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    sys.stdout.reconfigure(encoding='utf-8')
    from levels import LEVELS
    out = {}
    for lv in LEVELS:
        print('=' * 70)
        print(lv['id'], '-', lv['name'])
        res = {}
        for veh in lv['vehicles']:
            t, path = solve(lv, veh)
            nt, nlog, nfail = naive(lv, veh)
            res[veh] = dict(opt=t, path=path, naive=nt, naive_fail=nfail, naive_log=nlog)
            print(f"  [{VEH[veh]['name']}] tối ưu: {t:.1f}s | không tính toán: {nt:.1f}s {('(' + nfail + ')') if nfail else ''}")
            for step in path:
                print('     ', step)
        out[lv['id']] = {k: dict(opt=v['opt'], naive=v['naive'], naive_fail=v['naive_fail'],
                                 path=v['path'], naive_log=v['naive_log']) for k, v in res.items()}
    json.dump(out, open('ket_qua.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
