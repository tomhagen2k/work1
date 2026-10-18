#!/usr/bin/env python3
"""Chuyển khung cảnh thiết kế (design_moi/chuong_X/man_YY/khung_canh_moi.svg) thành dữ liệu cảnh cho demo.

Mỗi chương: danh sách CHUNG các nhóm hình (giữ đúng thứ tự vẽ), mỗi nhóm có mặt nạ bit cho biết xuất hiện ở màn nào.
Ghép các nhóm có bit của màn k theo thứ tự → đúng từng ký tự hình vẽ của màn k (kiểm tự động ở cuối).

Dùng: python3 tools/chuyen_design.py 1 man_01 man_02 man_03 man_04  >  (ghi design_moi/thu_nghiem_code/canh_c1.js)
"""
import difflib, json, re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def parse(path):
    s = open(path, encoding='utf-8').read()
    head = re.match(r'\s*<svg[^>]*>', s).group(0)
    vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', head).group(1).split()]
    d0, d1 = s.index('<defs>'), s.index('</defs>')
    defs, body = s[d0 + 6:d1], s[d1 + 7:s.rindex('</svg>')]
    out, depth, start = [], 0, None
    for m in re.finditer(r'<!--.*?-->|<(/?)([a-zA-Z]+)(?:\s[^>]*?)?(/?)>', body, flags=re.S):
        if m.group(0).startswith('<!--'):
            continue
        close, selfc = m.group(1), m.group(3)
        if depth == 0 and not close:
            start = m.start()
        if close:
            depth -= 1
        elif not selfc:
            depth += 1
        if depth == 0:
            out.append(body[start:m.end()])
    return vb, defs, out


def norm(e):  # bỏ khoảng trắng thừa giữa thẻ — không đổi hình vẽ
    e = re.sub(r'>\s+<', '><', e.strip())
    return re.sub(r'\s+', ' ', e)


def prefix_ids(txt, ids, pre):
    for i in ids:
        txt = re.sub(r'\bid="%s"' % re.escape(i), 'id="%s%s"' % (pre, i), txt)
        txt = txt.replace('url(#%s)' % i, 'url(#%s%s)' % (pre, i)).replace('href="#%s"' % i, 'href="#%s%s"' % (pre, i))
    return txt


def anchor(e):
    """Điểm neo gần đúng của nhóm hình (để xét thuộc ô công trình / tâm phóng to)."""
    m = re.match(r'<g[^>]*transform="translate\(\s*(-?[\d.]+)[ ,]+(-?[\d.]+)\)', e)
    if m:
        return [round(float(m.group(1))), round(float(m.group(2)))]
    nums = []
    for k in ('cx', 'cy', 'x', 'y', 'x1', 'y1'):
        mm = re.search(r'\b%s="(-?[\d.]+)"' % k, e)
        if mm:
            nums.append((k, float(mm.group(1))))
    d = dict(nums)
    for a, b in (('cx', 'cy'), ('x', 'y'), ('x1', 'y1')):
        if a in d and b in d:
            if a == 'x' and re.search(r'\bwidth="([\d.]+)"', e):
                w = float(re.search(r'\bwidth="([\d.]+)"', e).group(1)); h = float(re.search(r'\bheight="([\d.]+)"', e).group(1))
                return [round(d[a] + w / 2), round(d[b] + h / 2)]
            return [round(d[a]), round(d[b])]
    m = re.search(r'(?:d|points)="M?\s*(-?[\d.]+)[ ,]+(-?[\d.]+)', e)
    return [round(float(m.group(1))), round(float(m.group(2)))] if m else None


GRID = lambda v: any(abs(v - (100 + 350 * i)) <= 1 for i in range(8))


def is_road(e):
    """Hình thuộc lớp đường: vạch/đường nằm trên đường lưới, rào chắn đặt trên đường lưới."""
    m = re.match(r'<line\b([^>]*)/?>', e)
    if m:
        g = {k: float(v) for k, v in re.findall(r'\b(x1|y1|x2|y2)="(-?[\d.]+)"', m.group(1))}
        if len(g) == 4 and ((g['x1'] == g['x2'] and GRID(g['x1'])) or (g['y1'] == g['y2'] and GRID(g['y1']))):
            return True
    m = re.match(r'<g[^>]*transform="translate\(\s*(-?[\d.]+)[ ,]+(-?[\d.]+)\)\s*rotate', e)
    if m and 'width="48" height="12"' in e and (GRID(float(m.group(1))) or GRID(float(m.group(2)))):
        return True
    return False


def build(ch, levels):
    base = os.path.join(ROOT, 'design_moi', 'chuong_%d' % ch)
    master, vb0, defs0 = [], None, None   # master: [chuỗi, mặt nạ]
    raw = {}
    for li, nm in enumerate(levels):
        vb, defs, els = parse(os.path.join(base, nm, 'khung_canh_moi.svg'))
        vb0 = vb0 or vb
        defs0 = defs0 or defs
        if vb != vb0 or norm(defs) != norm(defs0):
            sys.exit('Khác khổ bản vẽ hoặc <defs> ở %s' % nm)
        els = [norm(e) for e in els]
        raw[nm] = els
        if not master:
            master = [[e, 1 << li] for e in els]
            continue
        sm = difflib.SequenceMatcher(None, [m[0] for m in master], els, autojunk=False)
        new, mi = [], 0
        for op, i1, i2, j1, j2 in sm.get_opcodes():
            new += master[mi:i1]; mi = i1
            if op == 'equal':
                for k in range(i2 - i1):
                    master[i1 + k][1] |= 1 << li
                new += master[i1:i2]
            else:
                new += master[i1:i2]
                new += [[e, 1 << li] for e in els[j1:j2]]
            mi = i2
        new += master[mi:]
        master = new
    # kiểm: ghép lại từng màn phải đúng từng ký tự
    for li, nm in enumerate(levels):
        got = [m[0] for m in master if m[1] >> li & 1]
        if got != raw[nm]:
            sys.exit('Ghép lại %s KHÔNG khớp' % nm)
    ids = re.findall(r'\bid="([^"]+)"', defs0) + [i for m in master for i in re.findall(r'\bid="([^"]+)"', m[0])]
    pre = 'd%d-' % ch
    defs_out = prefix_ids(norm(defs0), ids, pre)
    els_out = [[m[1], prefix_ids(m[0], ids, pre), 1 if is_road(m[0]) else 0, anchor(m[0])] for m in master]
    bg = re.search(r'fill="(#[0-9a-fA-F]{6})"', master[0][0]).group(1)
    return {'levels': levels, 'vb': vb0, 'bg': bg, 'defs': defs_out, 'els': els_out, 'pre': pre}


if __name__ == '__main__':
    ch, levels = int(sys.argv[1]), sys.argv[2:]
    d = build(ch, levels)
    total = sum(len(e[1]) for e in d['els'])
    out = 'DSN[%d]=%s;\n' % (ch, json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    sys.stdout.write(out)
    sys.stderr.write('Chương %d: %d màn, %d nhóm hình, %d ký tự hình vẽ; ghép lại từng màn khớp 100%%\n' % (ch, len(levels), len(d['els']), total))
