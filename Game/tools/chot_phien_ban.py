"""Chốt phiên bản demo — xem Quy_Trinh_Phien_Ban.md.

Ví dụ bản đang làm là v1.0:
    python tools/chot_phien_ban.py              → lưu versions/v1.0, demo chuyển sang v1.1
    python tools/chot_phien_ban.py --lon        → lưu versions/v1.0, demo chuyển sang v2.0
    python tools/chot_phien_ban.py --thu        → chỉ in ra sẽ làm gì, không ghi gì
    python tools/chot_phien_ban.py --khong-git  → không commit/gắn nhãn Git

Script KHÔNG đẩy lên GitHub; việc đó làm riêng khi BA đồng ý.
"""
import argparse
import datetime
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

sys.stdout.reconfigure(encoding='utf-8')
GAME = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.dirname(GAME)
DEMO = os.path.join(GAME, 'demo', 'index.html')
VERS = os.path.join(GAME, 'versions')
LOG = os.path.join(GAME, 'CHANGELOG.md')
REQ = os.path.join(GAME, 'Mo_Ta_Yeu_Cau_MVP.md')
LD = os.path.join(GAME, 'level_design')

# Bộ ảnh chuẩn: chụp giống nhau ở mọi phiên bản để so sánh (tên file, phần sau dấu # của địa chỉ)
SHOTS = [
    ('01_trang_chu', ''),
    ('02_trang_chu_chuong2', 'ch=2'),
    ('03_chuan_bi_man4', 'lv=4'),
    ('04_chuan_bi_man10', 'lv=10'),
    ('05_dang_choi_man4', 'lv=4&play'),
    ('06_ban_do_lon_man10', 'lv=10&play&map'),
    ('07_tam_dung_man4', 'lv=4&play&pause'),
    ('08_hoan_thanh_man7', 'lv=7&win&cutend'),
]
RE_VER = re.compile(r"^const VER='(\d+)\.(\d+)';$", re.M)
RE_SAVED = re.compile(r"^const VER_SAVED=(true|false);", re.M)


def chrome():
    la = os.environ.get('LOCALAPPDATA', '')
    for p in [r'C:\Program Files\Google\Chrome\Application\chrome.exe',
              r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
              os.path.join(la, r'Google\Chrome\Application\chrome.exe'),
              r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
              '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']:
        if p and os.path.exists(p):
            return p
    return None


def url(path, h=''):
    u = 'file:///' + path.replace('\\', '/').lstrip('/')
    return u + ('#' + h if h else '')


def run_chrome(exe, prof, args, timeout=300):
    base = [exe, '--headless=new', '--disable-gpu', '--hide-scrollbars', f'--user-data-dir={prof}']
    return subprocess.run(base + args, capture_output=True, timeout=timeout)


def shots(exe, page, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    done = []
    for name, h in SHOTS:
        prof = tempfile.mkdtemp(prefix='cpb_')  # hồ sơ trình duyệt mới: không có kỷ lục cũ
        png = os.path.join(out_dir, name + '.png')
        run_chrome(exe, prof, ['--force-device-scale-factor=2', '--window-size=844,390',
                               '--virtual-time-budget=3000', f'--screenshot={png}', url(page, h)], 120)
        shutil.rmtree(prof, ignore_errors=True)
        if os.path.exists(png):
            done.append(name + '.png')
    return done


def autopilot(exe, page_html, out_txt):
    """Chạy bộ lái tự động theo lời giải tối ưu của solver trên mọi màn — số đo khách quan của phiên bản."""
    ap = open(os.path.join(LD, 'autopilot.js'), encoding='utf-8').read()

    def conv(path):
        return [{'zone': z, 'picks': a[4:].split('+')} if a.startswith('lấy ') else {'zone': z} for _, z, a in path]
    plans = []
    for k, vs in json.load(open(os.path.join(LD, 'ket_qua.json'), encoding='utf-8')).items():
        for v, r in vs.items():
            plans.append([int(k[1:]) - 1, v, conv(r['path']), round(r['opt'], 1)])
    for k, r in json.load(open(os.path.join(LD, 'ket_qua_ch2.json'), encoding='utf-8')).items():
        lid, v = k.split('_')
        plans.append([4 + int(lid[3:]), v, conv(r['path']), round(r['opt'], 1)])
    runner = '''
(function(){const PLANS=%s,VN={van:'Xe van',may:'Xe máy',tai:'Xe tải'};
const out=PLANS.map(([li,v,p,opt])=>{try{const r=runPlan(li,v,JSON.parse(JSON.stringify(p)));
  return `Màn ${li+1} · ${VN[v]}: ${r.state==='won'?'Đạt':'Không đạt'} ${r.t} s (giới hạn ${r.T0} s · lời giải tối ưu theo solver ${opt} s)`;}
  catch(e){return `Màn ${li+1} · ${VN[v]}: LỖI ${e.message}`;}});
const pre=document.createElement('pre');pre.id='RES';pre.textContent=out.join(String.fromCharCode(10));document.body.appendChild(pre);})();
''' % json.dumps(plans, ensure_ascii=False)
    tmp = tempfile.mkdtemp(prefix='cpb_')
    h = os.path.join(tmp, 'ap.html')
    s = open(page_html, encoding='utf-8').read()
    open(h, 'w', encoding='utf-8').write(s.replace('</body>', '<script>\n' + ap + runner + '</script>\n</body>'))
    try:
        r = run_chrome(exe, os.path.join(tmp, 'prof'), ['--virtual-time-budget=5000', '--dump-dom', url(h)])
        m = re.search(r'<pre id="RES">(.*?)</pre>', r.stdout.decode('utf-8', 'replace'), re.S)
        txt = m.group(1) if m else 'Không đọc được kết quả (bộ lái tự động có thể cần cập nhật theo luật chơi mới).'
    except Exception as e:  # noqa: BLE001
        txt = f'Không chạy được: {e}'
    shutil.rmtree(tmp, ignore_errors=True)
    open(out_txt, 'w', encoding='utf-8').write(txt.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>') + '\n')
    return txt


def changelog_section(log, ver):
    m = re.search(rf'^## v{re.escape(ver)} · đang làm\n(.*?)(?=^## v|\Z)', log, re.S | re.M)
    return m


def git(*a):
    return subprocess.run(['git', *a], cwd=REPO, capture_output=True, text=True, encoding='utf-8')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--lon', action='store_true', help='tăng số chính (1.x → 2.0)')
    ap.add_argument('--thu', action='store_true', help='chỉ in ra, không ghi')
    ap.add_argument('--khong-git', action='store_true')
    a = ap.parse_args()

    s = open(DEMO, encoding='utf-8').read()
    mv, ms = RE_VER.search(s), RE_SAVED.search(s)
    if not mv or not ms:
        sys.exit('Không tìm thấy dòng const VER / VER_SAVED trong demo/index.html')
    if ms.group(1) != 'false':
        sys.exit('demo/index.html đang đánh dấu là bản lưu (VER_SAVED=true) — kiểm tra lại.')
    major, minor = int(mv.group(1)), int(mv.group(2))
    ver = f'{major}.{minor}'
    nxt = f'{major + 1}.0' if a.lon else f'{major}.{minor + 1}'
    dst = os.path.join(VERS, f'v{ver}')
    today = datetime.date.today().strftime('%d/%m/%Y')
    log = open(LOG, encoding='utf-8').read() if os.path.exists(LOG) else ''
    sec = changelog_section(log, ver)
    req = open(REQ, encoding='utf-8').read()
    mreq = re.search(r'^\| Phiên bản \| ([0-9.]+)', req, re.M)
    req_ver = mreq.group(1) if mreq else '?'

    print(f'Chốt v{ver} → versions/v{ver}/ ; demo chuyển sang v{nxt} · đang làm ; tài liệu yêu cầu v{req_ver}')
    if os.path.exists(dst):
        sys.exit(f'versions/v{ver} đã tồn tại — không ghi đè.')
    if not sec:
        sys.exit(f'CHANGELOG.md chưa có mục "## v{ver} · đang làm".')
    if a.thu:
        print('(chạy thử — không ghi gì)')
        return

    # 1. bản lưu: sao chép, đánh dấu VER_SAVED=true (nhãn "bản lưu", khóa lưu riêng)
    os.makedirs(dst)
    saved = RE_SAVED.sub('const VER_SAVED=true;', s, count=1)
    open(os.path.join(dst, 'index.html'), 'w', encoding='utf-8').write(saved)
    # 2. bản sao tài liệu yêu cầu tại thời điểm chốt
    os.makedirs(os.path.join(dst, 'tai_lieu'))
    shutil.copy2(REQ, os.path.join(dst, 'tai_lieu', 'Mo_Ta_Yeu_Cau_MVP.md'))
    # 3. ảnh chuẩn + bộ lái tự động
    exe = chrome()
    imgs, ap_txt = [], 'Không tìm thấy Chrome — bỏ qua.'
    if exe:
        print('Chụp bộ ảnh chuẩn…')
        imgs = shots(exe, os.path.join(dst, 'index.html'), os.path.join(dst, 'anh'))
        print('Chạy bộ lái tự động…')
        ap_txt = autopilot(exe, os.path.join(dst, 'index.html'), os.path.join(dst, 'lai_tu_dong.txt'))
    else:
        print('Không tìm thấy Chrome — bỏ qua ảnh và bộ lái tự động.')
    # 4. CHANGELOG: đóng mục v{ver}, mở mục v{nxt}
    body = sec.group(1).rstrip() + '\n'
    body = re.sub(r'^Tài liệu yêu cầu:.*$', f'Tài liệu yêu cầu: v{req_ver}', body, count=1, flags=re.M)
    head = f'## v{ver} · chốt {today}\n'
    new_log = log[:sec.start()] + (f'## v{nxt} · đang làm\n\nTóm tắt: (chưa có thay đổi)\n\nTài liệu yêu cầu: (ghi khi chốt)\n\n'
                                   '### Thêm\n\n### Thay đổi\n\n### Bỏ\n\n### Vị trí code\n\n') + head + body + '\n' + log[sec.end():]
    open(LOG, 'w', encoding='utf-8').write(new_log)
    open(os.path.join(dst, 'GHI_CHU.md'), 'w', encoding='utf-8').write(
        f'# Demo v{ver} — chốt {today}\n\n' + body + f'\n## Bộ lái tự động\n\n```\n{ap_txt.strip()}\n```\n')
    # 5. danh sách phiên bản cho trang versions/index.html
    lst_p = os.path.join(VERS, 'danh_sach.json')
    lst = json.load(open(lst_p, encoding='utf-8')) if os.path.exists(lst_p) else []
    mt = re.search(r'^Tóm tắt:\s*(.*)$', body, re.M)
    lst.append({'ver': ver, 'ngay': today, 'tai_lieu': req_ver, 'tom_tat': mt.group(1).strip() if mt else '',
                'anh': imgs, 'tag': f'demo-v{ver}'})
    json.dump(lst, open(lst_p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open(os.path.join(VERS, 'danh_sach.js'), 'w', encoding='utf-8').write(
        '// Tự sinh bởi tools/chot_phien_ban.py — không sửa tay\nwindow.VERSIONS=' + json.dumps(lst, ensure_ascii=False, indent=1) + ';\n')
    # 6. Git: commit trạng thái v{ver} + gắn nhãn, rồi mới đổi demo sang v{nxt}
    if not a.khong_git:
        git('add', '-A', 'Game')
        r = git('commit', '-q', '-m', f'Chốt phiên bản demo v{ver}\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>')
        print(r.stdout.strip() or r.stderr.strip() or 'Đã commit.')
        r = git('tag', '-a', f'demo-v{ver}', '-m', f'Demo v{ver} — chốt {today}')
        print(r.stderr.strip() or f'Đã gắn nhãn demo-v{ver}.')
    # 7. demo sang bản mới
    s2 = RE_VER.sub(f"const VER='{nxt}';", s, count=1)
    open(DEMO, 'w', encoding='utf-8').write(s2)
    if not a.khong_git:
        git('add', DEMO, LOG)
        git('commit', '-q', '-m', f'Bắt đầu demo v{nxt}\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>')
    print(f'Xong. Bản lưu: versions/v{ver}/  ·  Bản đang làm: demo/index.html (v{nxt}).')
    print('Chưa đẩy lên GitHub — chạy "git push origin main --tags" khi BA đồng ý.')


if __name__ == '__main__':
    main()
