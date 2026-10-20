# design_game — Bộ hồ sơ khung cảnh Chương 1 → 4 (Little Routes)

Bản sao để giao cho AI hoặc người thiết kế **phân tích và vẽ lại khung cảnh** cho đẹp hơn mà **không đổi logic màn**.
Tất cả ở đây là bản chụp và bản sao từ `Game/` (Chương 1–2: demo v1.4, ngày 17/10/2026; Chương 3–4: demo v1.5 đang làm, ngày 19/10/2026). Bản gốc trong `Game/` không bị sửa hay xóa.

Chương 3 (Thành phố Không Ngủ) và Chương 4 (Đảo Mây Trắng) hiện vẽ bằng code (`drawNight`, `drawSanto`) — "code trước, ảnh sau" (BA chốt 19/10). Bộ hồ sơ này để người/AI thiết kế vẽ ảnh, rồi thay vào game như Chương 1–2 (D-77).

**Đọc trước:** [PROMPT_cho_AI.md](PROMPT_cho_AI.md) — prompt dán cho AI, kèm luật bắt buộc giữ.
**Vòng 2 (chuyển sang code):** [PROMPT_chuyen_sang_code.md](PROMPT_chuyen_sang_code.md).

## Cấu trúc

```
design_game/
├── README.md                     ← tệp này
├── PROMPT_cho_AI.md              ← prompt giao việc cho AI
├── YEU_CAU_KHO_ANH.md            ← khổ ảnh có lề + vẽ gì ở lề (dán thêm nếu AI làm khổ nhỏ)
├── xem_tat_ca.html               ← mở bằng trình duyệt để lướt toàn bộ ảnh
├── 00_tong_quan/
│   ├── quy_uoc_chung.json        ← loại đường (tên, hệ số tốc độ, màu mini map), xe, khoảng cách nút 350px, khung 844×390
│   ├── tai_lieu/                 ← bản sao tài liệu thiết kế
│   │   ├── Chu_De_Khung_Canh.md      (nguyên tắc N1–N9, cách vẽ 5 loại đường, bảng màu từng chương — QUAN TRỌNG)
│   │   ├── Thiet_Ke_Chuong_1.md … Thiet_Ke_Chuong_4.md   (thiết kế màn, tiến triển công trình)
│   │   ├── Khung_Do_Kho_Chuong_Man.md, Danh_Gia_Hinh_Anh_Tien_Trien_Man.md
│   │   └── Mo_Ta_Yeu_Cau_MVP.md      (tài liệu yêu cầu đầy đủ)
│   ├── ma_nguon_demo/index.html  ← bản sao mã demo (hàm vẽ cảnh: drawVillage = Chương 1, drawUrban = Chương 2, drawNight = Chương 3, drawSanto = Chương 4)
│   └── script_xuat/export_design.mjs ← script tạo lại bộ này
├── chuong_1/  (Làng ven sông — bản đồ 1950×1250 px, lưới 6×4 nút)
│   ├── du_lieu_tat_ca_man.json   ← dữ liệu 11 màn gộp
│   ├── 00_tong_quan_chuong/      ← bản đồ chương lúc bắt đầu, lúc hoàn thành, bưu thiếp toàn cảnh
│   ├── man_01 … man_10/          ← 10 màn chính
│   └── man_thuong/               ← màn thưởng kim cương (bản đồ hoàn thiện)
├── chuong_2/  (Khu đô thị mới — bản đồ 2300×1250 px, lưới 7×4 nút) — cấu trúc như chuong_1
├── chuong_3/  (Thành phố Không Ngủ, New York về đêm — bản đồ 2650×1250 px, lưới 8×4 nút) — cấu trúc như chuong_1
└── chuong_4/  (Đảo Mây Trắng, Santorini hoàng hôn — bản đồ 2650×1250 px, lưới 8×4 nút) — cấu trúc như chuong_1
```

## Trong mỗi thư mục màn

| Tệp | Là gì | Kích thước |
|---|---|---|
| `1_man_chuan_bi.png` | Màn chuẩn bị: toàn bản đồ, ghim, tên điểm, nhiệm vụ ghi dưới điểm giao, chú giải loại đường | 1688×780 (khung game 844×390 ×2) |
| `2_dang_choi.png` | Góc nhìn khi lái xe (camera gần, giao diện chơi) | 1688×780 |
| `3_ban_do_lon_khi_choi.png` | Bản đồ lớn mở trong lúc chơi | 1688×780 |
| `4_ban_do_co_ghim.svg` / `.png` | **Bản vẽ gốc của khung cảnh** (vector, đúng tọa độ game), có ghim và nhãn điểm | 1950×1250 (Ch.1) · 2300×1250 (Ch.2) · 2650×1250 (Ch.3, Ch.4) |
| `5_khung_canh_khong_ghim.png` | Cùng bản vẽ, ẩn ghim và nhãn (chỉ cảnh + đường) — nền để vẽ lại | như trên |
| `du_lieu_man.json` | **Logic màn**: nút, đoạn đường (loại, đã thông / chưa thông), điểm kho và điểm giao (tọa độ điểm dừng, ô công trình, ghim), nhiệm vụ, công trình đang xây, công trình đã xây, thời gian | — |

**Lưu ý khổ ảnh:** `4_*`, `5_*` chỉ là phần bản đồ chơi. Ảnh khung cảnh giao cho game phải **có lề** trái/phải 600, trên/dưới 250 (Ch.1 3150×1750, Ch.2 3500×1750, Ch.3–4 3850×1750; nét ×2 khi xuất) — xem [YEU_CAU_KHO_ANH.md](YEU_CAU_KHO_ANH.md).

Muốn có SVG không ghim: mở `4_ban_do_co_ghim.svg`, đổi `style="--pin:1"` ở thẻ `<svg>` thành `--pin:0`.

## Chương 3 — điểm cần biết khi vẽ

- **Bảng màu đêm, tông lạnh (~21 giờ)**: nền nhựa đêm `#23262d`, vỉa hè xám xanh `#3a4250`; mái xám than `#4b5058`, nâu brownstone `#5b4a42`, cửa sổ sáng vàng ấm `#ffd479`; nhấn taxi vàng `#f7c517`, neon hồng `#ff4fa3` (chỉ ở khu đường đông). Chi tiết: `00_tong_quan/tai_lieu/Chu_De_Khung_Canh.md` mục **3.3**.
- **Độ đọc ban đêm** (mục **8.2**): mạng đường là phần sáng nhất bản đồ; quầng đèn đường chỉ rơi trên mặt đường; mái nhà tối, viền sáng ánh trăng; ghim và biển báo có quầng sáng; mini map giữ bảng màu ngày.
- **Đường đông** (loại đường mới, `dong`): phố dọc cột 5 + hai phố ngang hàng 1, 2 từ cột 4 sang Đông (mở từ màn 3). Taxi vàng kín hai làn, biển tam giác 2 xe; neon và taxi **chỉ** ở đường đông, phần còn lại tối và yên.
- **3 kho**: Bến cảng (container, cẩu bờ), Kho ga hàng (nhà kho + đường ray), Trung tâm phân phối (mở ở màn 7). Công trình màn 1 → 10: Ga tàu điện → Dãy brownstone → Quảng trường LED → Nhà hát → Tháp nước → Cầu treo → Tòa Art Deco → Chợ đêm → Sân băng (công viên) → Tượng cầm đuốc (đảo nhỏ giữa vũng cảng, trong ô công trình). Chi tiết từng màn: `00_tong_quan/tai_lieu/Thiet_Ke_Chuong_3.md` mục 2 và 4.

## Chương 4 — điểm cần biết khi vẽ

- **Bảng màu hoàng hôn, tông ấm**: biển caldera `#1b8fc4`, đất núi lửa `#a08a74` / `#8c7663`; nhà trắng vôi `#fbf8f3`, đất nung `#c97b5a`, vàng đất `#e3c18f`; **xanh coban `#1f5fae` chỉ ở công trình** (mái vòm, cửa — gần màu đường lớn trên mini map); nhấn hoa giấy `#c2187f`, vàng nắng chiều `#f2c14e`. Chi tiết: `Chu_De_Khung_Canh.md` mục **3.4**.
- **Độ đọc trên nền trắng** (mục **8.2**): mặt đường đá núi lửa sẫm, vỉa hè xám nhạt, bóng đổ xanh lam, ghim có viền tối.
- **Địa hình**: vách núi lửa nhiều lớp đá đổ xuống biển caldera ở **phía Tây** (đảo núi lửa ngoài khơi, nhà hang xếp tầng trên vách, bậc thang zíc zắc + cáp treo xuống Cảng cũ), bãi cát đen phía Nam, vườn nho – cối xay – hải đăng phía Đông. Lối bậc thang chỉ là lối đi bộ (hẻm chưa học).
- **Đường**: đường lớn = đường ven vách (cột 0) + đường ven biển phía Nam (hàng 3); đường đông = **phố chợ** (hàng 1 cột 2→5 + cột 4) có từ màn 1 — mái hiên sọc trắng – hồng, xe buýt nhỏ, ATV, xe máy kín hai làn.
- **Hạn giao** (yếu tố mới, màn 3): đơn có hạn tới **Bến phà** (phà đậu sẵn, từ màn 3), **Quán hoàng hôn** (tiệc, màn 6), **Cảng cũ** (tàu gỗ, màn 7) — `deadline_s` trong `du_lieu_man.json`. Bến phải nhìn ra ngay là "bến có tàu chờ".
- **3 kho**: Kho cảng (thùng hàng, cáp tời), Kho sơn (xô vôi, sơn xanh, ngói), Xưởng rượu vang (thùng gỗ, mở ở màn 7). Công trình màn 1 → 10: Quán taverna → Phố sơn mới → Bến phà → Tháp chuông → Khách sạn bể bơi → Quán hoàng hôn → Cảng cũ → Cối xay gió → Hải đăng → **Nhà thờ ba mái vòm xanh** (kỳ quan, khối lớn sát vách). Tiến triển "chuẩn bị mùa du lịch": nhà ngoài vùng bạc màu, trong vùng đã quét vôi, quanh công trình xong được sơn mới (cửa xanh, hoa giấy, bể bơi trên mái). Chi tiết: `Thiet_Ke_Chuong_4.md` mục 2 và 4.

## Cách tạo lại bộ này

Script xuất `00_tong_quan/script_xuat/export_design.mjs` (đọc demo, không sửa demo): chạy Chrome ẩn, gọi các hàm của game để dựng từng màn, chụp ảnh và trích dữ liệu. Chạy được trên Windows, Mac, Linux (cần Node 22+ và Chrome hoặc Edge); đường dẫn tính theo vị trí repo. Chạy từ thư mục gốc repo, thêm số chương cần xuất (bỏ trống = cả 4 chương):

```bash
node design_game/00_tong_quan/script_xuat/export_design.mjs 4
```

Script cũng ghi lại `00_tong_quan/quy_uoc_chung.json` và `xem_tat_ca.html`. Nếu demo thay đổi, nhờ Claude chạy lại để cập nhật.
