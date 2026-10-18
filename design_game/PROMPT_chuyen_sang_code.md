# Prompt vòng 2 — Chuyển khung cảnh Chương 1 từ ảnh sang code

> Cách dùng: đưa cho AI **thư mục `design_game/`** + **thư mục kết quả vòng 1 `design_moi/`** (ảnh, SVG, `BAO_CAO_KIEM_TRA_CHUONG_1.md`), rồi dán phần trong khung.
> Làm xong và duyệt Chương 1 thì dùng lại prompt này cho Chương 2 (đổi tên hàm `drawVillage` → `drawUrban`, xem ghi chú cuối).

---

````text
# BỐI CẢNH
Vòng 1 bạn đã vẽ lại khung cảnh Chương 1 (Làng ven sông) thành ẢNH TĨNH cho từng màn (design_moi/chuong_1/man_XX/khung_canh_moi.svg).
Phần logic (đường, ghim) đúng 100%, nhưng game KHÔNG dùng ảnh tĩnh: game VẼ CẢNH BẰNG CODE từ dữ liệu màn, vì cùng một cảnh còn được dùng cho:
  • cảnh quay khi xây xong công trình (công trình "nảy" lên, cụm nhà mới mọc dần quanh nó, đường mới thông, rào chắn mờ đi),
  • đoạn mở màn (camera bay qua công trình vừa xây), bản đồ chương ở Trang chủ, bưu thiếp cuối chương,
  • camera phóng to tới 2 lần khi xem bản đồ lớn (ảnh PNG sẽ bị mờ, vector thì không),
  • mọi kích thước màn hình điện thoại (khung game 844×390 được phóng to/thu nhỏ theo máy).
Nhiệm vụ vòng này: CHUYỂN PHONG CÁCH MỚI THÀNH CODE VẼ CẢNH, đồng thời sửa các lỗi trong design_moi/BAO_CAO_KIEM_TRA_CHUONG_1.md (V1–V12).

# TỆP LÀM VIỆC
- Mã game: design_game/00_tong_quan/ma_nguon_demo/index.html (bản sao, 1 tệp HTML/SVG/JS, mở trực tiếp bằng Chrome là chạy).
- Phần bạn được viết lại: khối từ dòng chú thích
    /* ======================= Bộ vẽ cảnh Làng ven sông (Chương 1) =======================
  đến hết hàm drawVillage(opts) (ngay trước "function buildMinimap(){").
  Gồm: VPAL, VROOF, vHouse, bamboo, buffalo, strawStack, paddy, vLot, vBuild, vWarehouse, bigTree, vLandmark, drawVillage.
  Được thêm hàm phụ mới, đặt tên bắt đầu bằng "v" để không trùng.
- KHÔNG sửa phần khác của tệp. Nếu thật sự cần đổi engine, ghi vào báo cáo mục "Đề xuất đổi engine", không tự sửa.
- Dữ liệu từng màn để tự kiểm: design_game/chuong_1/man_XX/du_lieu_man.json. Phong cách tham khảo: design_moi/chuong_1/ (ảnh vòng 1) + bo_tai_nguyen.png.

# HỢP ĐỒNG VỚI ENGINE (bắt buộc giữ đúng)
1. Chữ ký: drawVillage(opts). Engine gọi qua CC.draw(opts); CC = cấu hình chương (CH1): CC.cols=6, CC.rows=4, CC.points, CC.sites (10 công trình theo thứ tự màn), CC.types (đường lớn), CC.regions.
2. Vẽ bằng hàm có sẵn el(tag, attrs, parent?) — parent mặc định là biến toàn cục TARGET. Không dùng innerHTML, không dùng ảnh PNG/JPG nhúng.
   Hàm có sẵn được dùng: house, tree, shade(hex, ±tỉ lệ), unit, keyE, signSVG, pinLayer, pin, label, chRect, TT, PAL, SP (=350).
3. Hệ tọa độ: bản đồ Wc = 200 + (cols−1)·350 = 1950, Hc = 1250; nút c{i}r{j} ở (100+350i, 100+350j).
   Được tô nền tràn ra ngoài bản đồ (hiện tại tô từ −600) để mép màn hình không lộ khoảng trống khi camera ở sát biên.
4. opts nhận vào (KHÔNG được bỏ qua trường nào):
   • region [c1, r1]: vùng đã thông xe = các nút i ≤ c1 và j ≤ r1. Đoạn đường có 2 đầu trong vùng = đã thông; còn lại = chưa thông.
   • built[k] (k = chỉ số trong CC.sites): công trình k đã xây xong chưa.
   • constructing: chỉ số công trình đang xây (vẽ công trường) hoặc −1.
   • pins: true thì cuối hàm phải gọi y như hiện tại:
       if(opts.pins)pinLayer(()=>ZONES.forEach(z=>{const b=chRect(z.id);pin(b.px,b.py,z.col,z.kho);label(b.lx,b.ly,z.name);}));
   • grow: chỉ số công trình vừa xây — các NHÀ MỚI mọc quanh nó phải được vẽ trong nhóm riêng (xem 5).
   • pop: chỉ số công trình vừa hoàn thành trong cảnh quay — vẽ công trình đó vào nhóm opts.popG = el('g',{}) (engine làm hiệu ứng nảy).
5. opts trả ra (engine đọc sau khi gọi):
   • opts.siteR = {x0,y0,x1,y1}: khung bao công trường (kể cả cần cẩu nhô lên) — engine làm mờ giao diện che lên nó.
   • opts.growI = [{g, cx, cy, d}]: mỗi nhà mới quanh công trình "grow" là một nhóm g, tâm (cx,cy), d = khoảng cách tới công trình; sắp theo d tăng dần.
     Engine phóng nhóm từ 0 → 1 quanh (cx,cy) lần lượt — nên mỗi nhà phải nằm gọn quanh tâm của nó.
6. Đường (giữ nguyên khối vẽ đường hiện tại, chỉ được đổi MÀU nhựa và vỉa hè trong giới hạn tương phản):
   độ rộng RW = {thuong:46, lon:64, dong:46, gogh:46, hem:24}; vạch trắng đứt ở đường thường; vạch vàng đôi ở đường lớn;
   đoạn chưa thông = đường đất + rào chắn sọc đỏ trắng ở đầu tiếp giáp vùng mở; mỗi dải đường đặc biệt 1 biển (signSVG). Thứ tự lớp: nền → ô phố → đường → công trình → ghim.
7. TIẾN TRIỂN SINH RA TỪ opts, KHÔNG viết tay từng màn (không có if theo số màn):
   • Ô phố trong vùng thông xe = xóm (vườn, lũy tre viền, nhà ba gian); ngoài vùng = ruộng lúa ô bàn cờ có bờ.
   • Ô phố có công trình đã xây = xóm, kể cả khi ở ngoài vùng (công trình không đứng giữa ruộng).
   • Quanh mỗi công trình (bán kính ~330 px): chưa xây → vườn rau / đất trống; đã xây → nhà mới có hàng rào tre. Nhờ vậy màn sau tự đông hơn màn trước.
   • Mỗi công trình có 3 trạng thái: chưa xây (lô "Sắp xây"), đang xây (công trường RIÊNG theo từng công trình: giàn tre, cọc gỗ, đống ngói, cần cẩu…), đã xây (hình khối nhận ra từ trên cao).
     Chợ phiên có 2 giai đoạn: lần 1 = lều chợ (màn 1), lần 2 = CHỢ PHIÊN HOÀN CHỈNH DƯỚI CÂY ĐA LỚN + cờ, đèn lồng, đông người (kỳ quan cuối chương; màn 10 là công trường, màn thưởng là hoàn chỉnh).
     Công trình nằm gọn trong chRect(id) (riêng cây đa và bến đò được tràn nhẹ ra ngoài ô, không chạm mặt đường).
   • Kho Hợp tác xã luôn có (nhà kho mái tôn + sân phơi thóc).
8. Ngẫu nhiên có hạt giống cố định (đã có hàm R(seed) trong drawVillage). Không dùng Math.random — cùng một ô phố phải giống nhau ở mọi màn và mỗi lần mở (L11).
9. Hàm phải chạy độc lập, không giữ trạng thái toàn cục ngoài TARGET và opts: engine gọi nó nhiều lần (dựng màn, cảnh quay, Trang chủ, bưu thiếp).

# NGÂN SÁCH HIỆU NĂNG (để chạy mượt trên điện thoại yếu)
- Toàn bản đồ Chương 1 ≤ 8.000 phần tử SVG ở màn đông nhất (đếm: document.querySelectorAll('#static *').length sau khi mở màn).
  Tham khảo: bản code hiện tại 3.500 (màn 1) → 8.400 (màn thưởng); bản ảnh vòng 1 của bạn ~3.700 nhưng có 58–68 phần tử dùng filter.
- Thời gian buildLevel ≤ 30 ms trên máy tính (hiện tại 3–7 ms) (đo trong Console: t=performance.now();buildLevel(9);performance.now()-t).
- KHÔNG dùng filter (feDropShadow, feGaussianBlur) — bản code hiện tại dùng 0; vòng 1 dùng 58–68 chỗ, trên điện thoại yếu sẽ giật khi camera di chuyển.
  Bóng đổ vẽ bằng hình lệch màu tối (như house/tree hiện tại). Tối đa 5 phần tử có filter, chỉ cho mảng lớn đứng yên.
- Hoạt ảnh: tối đa 15 phần tử có animate/animateTransform (cần cẩu, cờ, nước…).
- Không gradient trên từng phần tử nhỏ; gradient chỉ cho mảng lớn (sông).

# PHONG CÁCH & SỬA LỖI VÒNG 1
Giữ cái tốt của vòng 1 (mặt đường sạch, mái ngói, ao sen, sông có thuyền, công trình rõ hình). Bắt buộc sửa:
V1 không vật nào trên mặt đường (cây, trâu… cách mép đường ≥ 25 px) · V2 tiến triển rõ (mục 7) · V3 kỳ quan cuối chương · V4 màn 6/8/10 phải là công trường ·
V5 công trường riêng từng công trình, đủ lớn · V6 ruộng ô bàn cờ có bờ, lũy tre dày viền xóm, mỗi ô phố bố cục khác nhau · V7 bỏ cối xay gió (thay cây đa, miếu, đống rơm) ·
V8 bỏ mảng màu cạnh cứng, dải mờ chồng đường · V9/V10 không lối mòn nào nối vào lưới đường hoặc chạy ra mép bản đồ · V11 công trình gọn trong ô.
Nguyên tắc N1–N9 và bảng màu mục 3.1 trong Chu_De_Khung_Canh.md vẫn áp dụng.

# KIỂM TRA TRÊN NHIỀU KÍCH THƯỚC MÀN HÌNH
Mở index.html bằng Chrome, bật DevTools → Device Toolbar, xoay ngang, kiểm tra 4 máy:
  iPhone SE (667×375) · Android phổ thông (800×360) · iPhone 15 Pro Max (932×430) · iPad (1024×768).
Ở mỗi máy xem: màn chuẩn bị (toàn bản đồ thu nhỏ ~0,3 lần) và lúc lái (1:1). Đạt khi: đường và ghim nổi rõ, chi tiết nhỏ không thành "nhiễu", chữ nhãn đọc được.

# CÁCH MỞ NHANH TỪNG MÀN ĐỂ CHỤP / KIỂM TRA (thêm vào cuối địa chỉ index.html)
  #lv=N            màn chuẩn bị màn N (N = 1…10; màn thưởng = 21)
  #lv=N&play       đang lái
  #lv=N&play&map   bản đồ lớn khi chơi
  #lv=N&win        thắng ngay → cảnh quay xây công trình;  #lv=10&win&cutend → cảnh kết chương
  #ch=1            bản đồ chương

# KẾT QUẢ CẦN TRẢ
design_code_moi/chuong_1/
├── ve_canh_chuong_1.js     ← NGUYÊN khối code thay thế (từ chú thích "Bộ vẽ cảnh Làng ven sông" tới hết drawVillage), dán vào là chạy
├── index.html              ← bản sao index.html đã dán khối trên (để tôi mở thử ngay)
├── anh/man_XX_chuan_bi.png, man_XX_dang_choi.png (11 màn) + canh_quay_man_05.png + ket_chuong.png + ban_do_chuong.png
├── anh/thiet_bi_*.png       ← 4 máy ở mục kiểm tra, mỗi máy 2 ảnh
└── bao_cao.md
     • Bảng từng màn: số phần tử SVG, thời gian dựng (ms), công trình đang xây/đã xây đúng chưa, có vật trên đường không
     • Bảng V1–V12: đã sửa thế nào
     • Xác nhận đã chạy thử: cảnh quay màn 1–10 không lỗi Console, Trang chủ và bưu thiếp hiển thị đúng
     • Mục "Đề xuất đổi engine" (nếu có)
Trả lời bằng tiếng Việt. Không tự chấm điểm thẩm mỹ cao hơn 9 nếu chưa sửa hết V1–V12.
````

---

## Ghi chú cho Chương 2 (dùng sau)

Đổi trong prompt: hàm `drawUrban` (khối "Bộ vẽ cảnh khu đô thị (Chương 2 thử nghiệm)" … hết `drawUrban`), bản đồ 2300×1250 (lưới 7×4), cấu hình `CH2`, 3 kho có hình dạng riêng (Bãi vật liệu, Kho tổng, Xưởng gỗ), kỳ quan Công viên trung tâm (+ tháp đồng hồ), bảng màu mục 3.2. Ngân sách ≤ 10.000 phần tử — bản code hiện tại của Chương 2 đã 10.500 (màn 1) → 15.200 (màn thưởng), là điểm cần giảm.
