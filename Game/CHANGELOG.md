# Nhật ký thay đổi demo

Quy trình: [Quy_Trinh_Phien_Ban.md](Quy_Trinh_Phien_Ban.md) · Danh sách và so sánh: [versions/index.html](versions/index.html) · Chấm điểm: [Danh_Gia_Trai_Nghiem.md](Danh_Gia_Trai_Nghiem.md)

Mỗi mục ứng với một phiên bản. Mục "đang làm" được ghi dần trong lúc làm; khi chốt, script đổi thành "chốt dd/mm/yyyy" và mở mục mới.
Mỗi thay đổi ghi kèm mã quyết định (D-xx, Q-xx) và **vị trí code** để sau này lấy lại được.

## v1.5 · đang làm

Tóm tắt: Chương 3 "Thành phố Không Ngủ" — 10 màn theo khung độ khó với yếu tố mới đường đông, khung cảnh đêm vẽ bằng code, mẹo đường đông, màn thưởng "Đêm pháo hoa" (D-79 → D-81)

Tài liệu yêu cầu: (ghi khi chốt)

### Thêm
- **Chương 3 · Thành phố Không Ngủ** (D-79; thiết kế + số đo: `level_design/Thiet_Ke_Chuong_3.md`): bản đồ chung 8×4, đại lộ ven sông phía Bắc và phía Nam, **đường đông** ở khu trung tâm (phố dọc cột 5 + phố ngang hàng 1, 2) mở từ màn 3; 2 kho (Bến cảng, Kho ga hàng), thêm Trung tâm phân phối từ màn 7. 10 màn ĐK 11–20 đều đúng ĐK (CT-05, CT-06, CT-07); T0 tính lại từ thời gian đo bằng bộ lái tự động.
- **Khung cảnh đêm vẽ bằng code** (`drawNight` — BA chốt "code trước, ảnh sau"): mặt đường sáng hơn nền, đèn đường có quầng sáng, tòa nhà mái tối có mặt tiền cửa sổ vàng, tháp nước gỗ trên mái, neon và taxi vàng **chỉ ở đường đông**, sông bao 3 phía, cầu treo ra sông phía Nam. Tiến triển "thắp sáng": khu trong vùng thông xe lên đèn, quanh công trình xong có thêm cửa hàng neon (hiệu ứng mọc của cảnh quay). 3 kho và 10 công trình mỗi cái một hình khối riêng; tượng cầm đuốc (màn 10) trên đảo nhỏ giữa vũng cảng, hiện trong cảnh kết và bưu thiếp.
- **Mẹo đường đông** (D-80): lần đầu mở màn 3 Chương 3 (Màn 23), 2 bước khoanh — các đoạn đường đông trên bản đồ chuẩn bị, rồi mục "Đường đông" ở chú giải. Văn bản cơ chế "Đường đông" ở tab "Màn này".
- **Màn thưởng "Đêm pháo hoa"**: 25 kim cương, 7 cụm (2 cụm trên phố đông), T0 120 giây.
- Tiếng Anh cho toàn bộ nội dung Chương 3 (tên màn, giới thiệu, địa danh, công trình, câu thông báo, chương).
- Cấu hình xem trước `game-demo-win` trong `.claude/launch.json` (dùng `python` trên Windows; `game-demo` giữ `python3` cho máy Mac).

### Thay đổi
- **Số màn hiển thị đếm liên tục, bỏ qua màn thưởng** (D-81 [GĐ]): Chương 3 là Màn 21–30 (trước đó sẽ hiện 23–32). Áp dụng ở Trang chủ, thẻ màn, màn chuẩn bị, popup Nhiệm vụ. Khóa lưu tiến trình không đổi.
- Danh sách chương: Chương 3 bỏ nhãn "Sắp có"; Chương 4 · Đảo Mây Trắng vẫn "Sắp có".
- `tools/chot_phien_ban.py`: bộ lái tự động chạy thêm 10 màn Chương 3 (đọc `level_design/ket_qua_ch3.json`).

### Bỏ

### Sửa
- Lớp mũi tên luật chơi (`pcSteps`, `rulesEnd`) dùng chung được cho mẹo khác (bước và khóa lưu riêng).

### Vị trí code
- Cấu hình: `CH3`, `C3_`, `CH3_LV`, `CH3_BONUS` ngay sau `CH1_BONUS,CH2_BONUS` (giữ chỉ số màn cũ); `PLACE`/`PCOL` của Chương 3; `KHO` thêm 3 kho; `MECH` thêm 11 mục; `CHAPTERS[2]`.
- Bộ vẽ: khối `/* Bộ vẽ cảnh Thành phố Không Ngủ (Chương 3) */` trước bộ vẽ Làng ven sông — `NPAL`, `nDefs`, `nBldg`, `nTree`, `nTaxi`, `nLot`, `nBuild`, `nightKho`, `nightLandmark`, `drawNight` (xóa lớp cảnh trước khi vẽ như `imgDraw`).
- Mẹo đường đông: `DONG_KEY`, `dongTipStart` (gọi từ `openLevel`), `PC.steps`/`PC.key`; đường trên bản đồ lớn có thuộc tính `data-t`.
- Số màn: `LVNO` (trước `CHAPTERS`), dùng ở `drawHomeMap`, `renderHome`, `renderPrep`, `openInfo`.
- Văn bản: `MECHTXT['Đường đông']`, `MECH_EN`, `MECHTXT_EN`; `EN_DATA` (place, lv, ch, cc[2]); `applyData` lặp qua `[CH1,CH2,CH3]`.
- Dữ liệu màn: `level_design/levels_ch3.py`, `level_design/ket_qua_ch3.json`. Ảnh kiểm chứng: `playtest_evidence/chuong3_v15/`.

## v1.4 · chốt 19/10/2026

Tóm tắt: Chương 1 "Làng ven sông" và Chương 2 "Khu đô thị mới" dựng theo khung độ khó, màn thưởng kim cương; khung cảnh bằng ảnh thiết kế (D-77); khung game đợt 1 Little Routes (Trang chủ, Cài đặt, Việt/Anh, quảng cáo mô phỏng); Garage với logo và 28 ngoại hình mới (D-78 — ngoại hình và thưởng xe khi hết chương BA chốt sau)

Tài liệu yêu cầu: v1.31

### Thêm
- **Khung game đợt 1** ([Cau_Truc_Giao_Dien.md](Cau_Truc_Giao_Dien.md), GD-01 → GD-13), tên game **Little Routes / Cung Đường Nhỏ**, logo phương án D:
  - **Khởi động**: logo, tên, thanh tải, mẹo chơi ngẫu nhiên, câu miễn trừ nội dung hư cấu.
  - **Lần đầu**: chọn ngôn ngữ (gợi ý theo máy) → Đồng ý điều khoản (mở được Điều khoản, Quyền riêng tư) → Lưu tiến trình (Liên kết Google Play Games / Game Center — **mô phỏng**; có "Để sau", TK-01 → TK-04).
  - **Trang chủ** (bản vẽ ④): hồ sơ (tên, tổng sao), ví, Hộp thư / Cửa hàng / Cài đặt; cột trái Điểm danh · Nhiệm vụ · Thành tựu và cột phải Garage · Sự kiện hiện nhãn "Sắp có" (đợt 2); nút **Chương** mở bản đồ chương; nền là khung cảnh chương đang chơi; thẻ chương (sao, 10 màn); nút **CHƠI** vào thẳng màn chưa qua đầu tiên.
  - **Cài đặt** (từ Trang chủ, Bản đồ chương, popup tạm dừng): Chung (ngôn ngữ, rung, chất lượng hình, nhắc điểm danh, bật lại hướng dẫn Màn 1) · Âm thanh · Dữ liệu & mua hàng (tài khoản, sao lưu, khôi phục mua hàng, mã người chơi, xóa dữ liệu bấm 2 lần) · Hỗ trợ & pháp lý (câu hỏi thường gặp, email phản hồi, 3 văn bản pháp lý, giấy phép, giới thiệu).
  - **Trang chính sách**: nhúng sẵn bản nháp Việt/Anh từ `phap_ly/` (đọc được khi offline) — sửa ở `phap_ly/` rồi chép lại.
  - **Quảng cáo mô phỏng sau mỗi 5 lượt** (GD-06, GD-09): đếm lượt có kết quả (thắng/thua), không tính thoát giữa màn và màn thưởng; hiện khi rời màn kết quả / cảnh công trình của lượt thứ 5, đóng sau 5 giây rồi làm tiếp việc vừa bấm; bộ đếm lưu trên máy. **Gói Bỏ quảng cáo** (49.000đ, mô phỏng) ở Cửa hàng mục Ưu đãi.
  - **Ngôn ngữ Việt/Anh** cho các màn đợt 1.
- **Garage — bộ sưu tập ngoại hình xe** (phương án B, GA-Q1 → GA-Q7; đề xuất và hình từng ngoại hình: [mockups/garage_de_xuat.html](mockups/garage_de_xuat.html)):
  - 19 ngoại hình: Van 7 · Xe máy 6 · Xe tải 6. Nguồn: có sẵn (3), thưởng chương khi thắng màn 10 (4), mua 300/400/500 💎 (7), mua tiền 49.000đ — khôi phục được (1: Vespa Bạc Hà), sự kiện theo mùa — không bán bằng tiền, quay lại năm sau (4).
  - Màn Garage: tab loại xe (đếm đã có), lưới thẻ viền theo độ hiếm (đang dùng ✓, khóa, giá, nhãn MỚI), thanh sưu tập, khung xem trước xe chạy trên đường, "Xem trong màn chơi" (kích thước thật kèm nhãn sức chứa), nút Dùng / Mua 💎 (bấm 2 lần để xác nhận) / Mua tiền (hộp thanh toán mô phỏng).
  - Ngoại hình đang dùng hiện ở xe trong màn chơi, màn chuẩn bị, cảnh công trình (G5, G7); ô Garage ở Trang chủ mở được, có nhãn MỚI khi có ngoại hình chưa xem; cảnh kết chương báo ngoại hình thưởng; "Khôi phục mua hàng" tính cả ngoại hình mua bằng tiền.
  - Vị trí code: `SKIN` (dữ liệu + bộ vẽ, đầu script), `SKS` (lưu `lr_skins`: own, paid, eq, seen), `skOwned`, `eqSkin`, `drawVehicle` (vẽ theo ngoại hình); khối `/* Garage */` trước Khung hình (`openGarage`, `renderGarage`, `gStage`); lớp phủ `#garv`.
- **Tiếng Anh cho toàn bộ phần chơi** (K1): màn chuẩn bị, luật chơi lần đầu, hướng dẫn Màn 1, bảng hỏi, popup Nhiệm vụ và Hướng dẫn (6 tab, kể cả hình minh họa), bản đồ lớn, hết giờ, kết quả, cảnh công trình, bưu thiếp, bản đồ chương, cửa hàng, nhãn nút và aria-label. Nội dung dữ liệu (tên và lời giới thiệu 22 màn, địa danh, tên công trình, câu thông báo, chương, xe, loại đường, tên cơ chế) có bản tiếng Anh; đổi ngôn ngữ trong Cài đặt là áp dụng ngay, đổi qua lại không mất bản tiếng Việt gốc. Giá hiển thị "20,000 VND" khi chọn tiếng Anh (bản thật do cửa hàng ứng dụng quy đổi theo quốc gia).
  - Vị trí code: `LANG`, `TT(vi,en)`, `NUM`, `PCL` đặt ngay sau `LS` (đầu script, vì phần chơi dựng chữ khi tải); `applyStatic()` (chữ cố định trong HTML), `EN_DATA` + `applyData()` (dữ liệu nội dung, giữ bản gốc trong `VI0`) trong khối Khung game đợt 1, gọi từ `applyLang()`; `MECH_EN`, `MN()`, `MECHTXT_EN`, `ROADDESC_EN`; `ILL` đổi thành hàm `ILL_()`; `HSEC()` viết lại với hàm dòng `hr()`.
  - Bản đồ chương: tên game thành nút **← Trang chủ**; nút âm thanh chuyển vào Cài đặt; thêm ⚙. Nút Trang chủ ở kết quả / tạm dừng / chuẩn bị về **đúng nơi đã mở màn** (Trang chủ hoặc Bản đồ chương — N1). Mở thẳng màn qua địa chỉ (`#lv=`, `#ch=`) bỏ qua màn khởi động như cũ.
  - Vị trí code: khối `/* Khung game đợt 1 */` cuối thẻ script (`I18N`, `boot`, `showMain`, `renderSettings`, `openPolicy`, `adTick`, `showAd`); lớp phủ `#splash #langv #consv #linkv #mainv #setv #polv #adv`; `goHome` (đổi), `openChapters` (tên cũ của goHome), `end` (gọi `adTick`).
- **Chương 1 · Làng ven sông** (10 màn, thay Chương 1 demo cũ "Khu phố nhỏ"): 1 kho (Hợp tác xã), xe van; yếu tố mới ở màn 1 (điều khiển), 3 (nhiều điểm giao), 5 (chia chuyến), 8 (đường lớn — đường đê); màn 10 là màn trùm. T0 theo CT-05 từ thời gian đo bằng autopilot. Thiết kế + số đo: `level_design/Thiet_Ke_Chuong_1.md` (D-63 → D-67).
- **Khung cảnh Làng ven sông** (bộ tài nguyên A): ruộng lúa chia ô có bờ, lũy tre viền xóm, nhà ba gian có sân gạch, sông và đường đê, trâu, đống rơm; vườn rau là chỗ nhà mới sẽ mọc (D-66).
- **10 công trình của làng** (mỗi màn thắng một công trình, câu thông báo riêng): lều chợ, giếng làng, trường làng, cụm nhà Xóm Đông, trạm y tế, ao cá, đình làng, bến đò, nhà văn hóa, chợ phiên dưới gốc đa (Chợ phiên xây 2 giai đoạn: màn 1 và màn 10). Cảnh kết chương và bưu thiếp dùng lại cơ chế Chương 2.
- `level_design/levels_ch1.py`, `ket_qua_ch1.json` (bộ giải), ảnh kiểm chứng `playtest_evidence/chuong1_v14/`.
- **Bản đồ lớn khi đang chơi hiện nhiệm vụ dưới tên điểm giao** (D-75): "Còn N kiện từ <kho>", "· đang chở n" (chữ cam) khi xe đang chở hàng tới, "⏱ hạn còn m:ss" với đơn có hạn; điểm đã giao đủ không còn dòng nhiệm vụ (ký hiệu xám ✓). Vị trí code: nhánh `mode==='play'` trong `buildMarks`.
- **Chương 2 · Khu đô thị mới dựng lại theo khung độ khó** (D-74, thay 5 màn thử nghiệm): bản đồ chung 7×4, 10 màn ĐK 6–15, yếu tố mới **nhiều kho** (Kho tổng từ màn 3, Xưởng gỗ từ màn 8), đại lộ phía Nam + phía Đông; T0 theo CT-05 từ thời gian đo bằng autopilot. 10 công trình: Tiệm bánh, Nhà trẻ, Trường học, Khu nhà ở, Chợ mới, Bệnh viện, Nhà văn hóa, Hồ điều hòa, Tháp văn phòng, Công viên trung tâm. Bảng màu pastel theo chủ đề; mỗi kho một hình dạng riêng. Thiết kế + số đo: `level_design/Thiet_Ke_Chuong_2.md`.
- **Màn thưởng Chương 2 "Lễ khánh thành"**: 25 kim cương, T0 100 giây.
- **Màn thưởng kim cương cuối Chương 1 — "Phiên chợ vàng"** (D-73, YT-03): bản đồ làng hoàn thiện, 25 kim cương thành 7 cụm trên các tuyến (kể cả đường đê), xe đi qua là nhặt; T0 90 giây (vòng nhặt hết nhanh nhất khoảng 57 giây + 50%). Bộ đếm 💎 trên HUD, chấm kim cương trên mini map và bản đồ lớn; không tính sao, không dùng Thêm giờ. Kết thúc khi hết giờ hoặc nhặt hết → cộng đúng số đã nhặt vào ví và **khóa** màn; thoát giữa chừng không tính, chơi lại được. Trang chủ: nút hộp quà sau cờ Hết chương (xám = khóa, đỏ nhấp nháy = đã mở, xanh ✓ = đã nhận); hộp thoại kết chương báo "Màn thưởng kim cương đã mở!".
- Trang chủ: cờ cuối con đường leo đổi chữ "Hết chương N" thành **"🏁 Về đích"**; nút màn thưởng đứng riêng bên phải cờ (bỏ đường nét đứt đè lên cờ); thẻ màn thưởng đã nhận chỉ hiện "✓ Đã nhận N 💎", chưa nhận chỉ hiện thời gian và số kim cương.
- **Luật chơi lần đầu ở Màn 1** (D-70, PA-C): (1) thẻ "Cách chơi" rút gọn — mục tiêu "Giao đủ mọi kiện hàng trước khi hết giờ!" + 3 biểu tượng kho ▲ → điểm giao ▼ → đồng hồ, câu nhắc xem bản đồ để tự nghĩ đường đi; (2) 4 bước khoanh trên bản đồ chuẩn bị: kho, điểm giao + dòng nhiệm vụ, thời gian của màn, nút Bắt đầu (chạm để tiếp, có Bỏ qua); chỉ chạy lần đầu mở Màn 1. (3) Tab **"Luật chơi"** đầu tiên trong nút ? (mục tiêu, lên kế hoạch, lái xe, thua khi, sao). Hướng dẫn lúc lái xe (D-45) giữ nguyên.
- **Hướng dẫn di chuyển Màn 1 luôn chạy** mỗi lần vào Màn 1 Chương 1 (D-72, thay "chỉ lần đầu" của D-45); "Bỏ qua hướng dẫn" chỉ bỏ qua lượt đang chơi.
- **Hướng dẫn lái xe Màn 1 thêm mẹo Quay đầu đặt trước** (D-71, D-72): khi đã lấy đủ hàng ở kho và xe dừng ở điểm giao thứ nhất, game đứng hình, khoanh nút Quay đầu và nhắc có thể bấm để xe quay đầu ngay khi xong việc; bấm thử Quay đầu hoặc chạm vào lời nhắc để đi tiếp.
- **Đặt trước lệnh Quay đầu khi đang dừng ở điểm** (D-69, QD-01): đang giao hàng, đang mở bảng hỏi hoặc đang lấy hàng thì bấm Quay đầu (hoặc phím U) để xe quay đầu ngay khi rời điểm. Nút Quay đầu sáng vàng như nút hướng đã chọn, trên xe có mũi tên chữ U; bấm lại để hủy; bấm một hướng thì lệnh quay đầu bị hủy (chỉ giữ một lệnh).

### Thay đổi
- **Logo mới và bộ ngoại hình xe mới** (D-78; nguồn `logo&skin/`):
  - Logo "hai ô đảo kho → nhà nối bằng con đường vàng" (`logo/little_routes_icon_120.svg`) ở màn khởi động, màn chọn ngôn ngữ; thêm biểu tượng tab trình duyệt. Bản 1024 (iOS), 512 (Android), nền trong suốt để dùng khi đóng gói ứng dụng.
  - Bỏ 16 ngoại hình cũ (v1–v7, m1–m7, t1–t5), giữ 3 ngoại hình mặc định (Van Trắng, Xe Máy Đỏ, Xe Tải Xanh). Thêm 28 ngoại hình từ `vehicle_skin_studio.html`: Van 9, Xe máy 9, Xe tải 10 — có chuyển động (chuông lắc, đèn chớp, bánh răng quay…), thu về đúng cỡ xe trong game; giá theo tệp (390–680 💎; Xe Tải Két Vàng 99.000đ, khôi phục được); độ hiếm Hiếm / Sử thi / Huyền thoại hiện ở viền thẻ và nhãn Garage; tên + mô tả Việt/Anh.
  - Dữ liệu cũ: ngoại hình đã bỏ được gỡ khỏi bộ nhớ, **hoàn lại 💎** đã mua (một lần), xe đang dùng ngoại hình cũ về mặc định.
  - Garage: mô tả dài cuộn trong khung, nút Mua luôn hiện; tên ngoại hình 17 px.
  - Vị trí code: `SKNEW` (dữ liệu sinh tự động, ngay trước `SKIN`), `SKIN.S` (3 mặc định + `SKNEW`), khối chuyển dữ liệu sau `saveSk`, hoàn 💎 sau `saveW`; Garage `RRC`, `RRT`, `RARX`; `LOGO()`; `<link rel="icon">`.
- **Khung cảnh Chương 2 dùng ảnh theo thiết kế mới** (D-77, cùng cách Chương 1; thiết kế `design_moi/chuong_2/`, báo cáo `design_moi/kiem_thu_chuong_2/BAO_CAO_KIEM_THU.md`): 11 ảnh khổ 3500×1750 (0,50–0,59 MB/màn), ghim kiểu B, cảnh quay, trang chủ, bưu thiếp, cảnh kết chương. Logic 22 màn không đổi. `#canh=cu` mở lại `drawUrban`. Vị trí code: `CH2.draw` → `imgDraw(2,o)||drawUrban(o)`; ảnh `demo/canh/c2_*.webp`, khổ trong `canh/manifest.js` (`node tools/xuat_anh_canh.mjs 2 demo/canh`).
- **Khung cảnh Chương 1 dùng ảnh theo thiết kế mới** (D-77; thiết kế ở `design_moi/chuong_1/`, báo cáo kiểm thử `design_moi/kiem_thu_chuong_1/BAO_CAO_KIEM_THU.md`):
  - Mỗi màn (10 màn chính + màn thưởng) là 1 ảnh WebP nét ×2 xuất từ `khung_canh_moi.svg` (khổ 3150×1750, lề trái/phải 600 px, trên/dưới 250 px — GH-Q2), khoảng 0,5 MB/màn. Ngoài mép ảnh soi gương ra 4 phía (dự phòng khung nhìn quá dẹt).
  - Ghim và nhãn điểm kiểu B (GH-Q1): ghim 26 px cùng kiểu thiết kế ở góc trên công trình, nhãn chữ 11 px viền trắng dưới công trình — không che công trình; tên theo ngôn ngữ đang chọn.
  - Cảnh quay hoàn thành công trình: nền là ảnh màn vừa chơi, ô công trình cắt từ ảnh màn sau "nảy" lên, rồi cả ảnh màn sau hiện ra (đường mới thông). Trang chủ, bưu thiếp, cảnh kết chương dùng ảnh theo tiến độ.
  - Chú giải "Chưa thông xe" Chương 1 đổi màu theo đường đất của thiết kế (#d4b486).
  - Logic 22 màn không đổi (so khớp từng ký tự với bản trước). Lái xe 60 khung/giây; dựng màn 0,4 ms (32 phần tử vẽ thay vì ~15.000).
  - `#canh=cu` mở lại cảnh vẽ bằng code cũ (`drawVillage` giữ nguyên) để so sánh; `#anh=goc` dùng PNG gốc trong `design_moi`.
  - Vị trí code: `<script src="canh/manifest.js">` trước script chính; khối `/* Khung cảnh bằng ẢNH … D-77 */` trước `buildMinimap` (`imgDraw`, `imgPin`, `imgLabel`); `CH1.draw`. Ảnh + manifest: `demo/canh/` (xuất bằng `node tools/xuat_anh_canh.mjs 1 demo/canh`). `tools/chot_phien_ban.py` chép thêm `demo/canh/` vào bản lưu.
- **Cửa hàng không còn tràn khung**: "Vật phẩm" và "Ưu đãi" xếp thành 2 cột, thẻ gói kim cương gọn hơn, mô tả ngắn hơn; phần thân cuộn được nếu vẫn dài (`#sBody`, `.shcols`, `renderShop`).
- Sửa chữ: kết thúc màn thưởng Chương 2 không còn ghi "phiên chợ kết thúc" (đổi thành "màn thưởng kết thúc"); câu cuối chương nói bưu thiếp lưu ở **Bản đồ chương** (không phải Trang chủ).
- **Engine đọc cấu hình chương** (`addChapter`, biến `CC`): bản đồ chung, vùng theo màn, công trình, câu thông báo, tiêu đề kết chương và bộ vẽ cảnh nằm trong cấu hình (`CH1`, `CH2`). Màn có `cc` là màn của chương xây dựng dần (thay `chapter===2`). Thêm chương mới = thêm cấu hình + bộ vẽ cảnh.
- Chương 2 (khu đô thị) giữ nguyên nội dung, ghi là **bản thử nghiệm**; nay là màn 11–15. Autopilot Chương 2 giữ nguyên thời gian (24.6 / 49.4 / 55.3 / 96.6 / 128.8 / 116.7).
- Danh sách chương "Sắp có" theo bố cục 15 chương (D-66): Chương 3 · Thành phố Không Ngủ (đường đông), Chương 4 · Đảo Mây Trắng (hạn giao) — thay "Trung tâm: chở khách, đổi xe" và "Cảng" (DK-Q7).
- Bảng "Cách chơi": thêm cơ chế "Nhiều điểm giao", "Đường lớn", "Tổng hợp" (màn trùm không gắn huy hiệu "! Cơ chế mới").
- Cảnh quay: khung cuối được nới mép dưới thêm khoảng cao dải hộp thoại, để công trình sát mép dưới bản đồ (Trạm y tế) không bị hộp thoại che (K6).
- `tools/chot_phien_ban.py`: bộ lái tự động đọc `ket_qua_ch1.json` (màn 1–10) và `ket_qua_ch2.json` (màn 11–15). **Lưu ý:** địa chỉ `#lv=` trong bộ ảnh chuẩn nay trỏ tới màn của Chương 1 mới; kỷ lục đã lưu trên máy theo số thứ tự màn cũ sẽ lệch.

### Bỏ
- 5 màn Chương 1 demo cũ ("Khu phố nhỏ": làm quen, chia chuyến, đường lớn & đông, hạn giao, chọn xe) — còn ở bản lưu `versions/v1.3/`.

### Vị trí code
- Cấu hình chương và sinh màn: `addChapter`, `CC`, `CH1`, `CH1_LV`, `CH2`, `CH2_LV`, `CHAPTERS` (`demo/index.html`).
- Khung công trình dùng chung: `chRect` (thay `ch2Rect`), `buildingRect`; chọn bộ vẽ: `drawChapter` → `CC.draw` (`drawUrban` cho Chương 2, `drawVillage` cho Chương 1).
- Cảnh làng: `VPAL`, `VROOF`, `vHouse`, `bamboo`, `buffalo`, `strawStack`, `paddy`, `vLot`, `vBuild`, `vWarehouse`, `bigTree`, `vLandmark`, `drawVillage`.
- Cảnh quay, đoạn mở màn, Trang chủ, bưu thiếp dùng `CC`: `siteCenter`, `newRoads`, `startCut`, `cutDraw`, `finFx`, `finishCut`, `postReady`, `openPost`, `drawHomeMap`, `buildMarks`; `camFit(x,y,z,yb)`, `camFrame`.
- Cơ chế theo màn: `MECH`, `MECHTXT`, `newMech`.
- Chương 2: `CH2` (cấu hình mới: `pal`, `bonus`), `CH2_LV`, `CH2_BONUS`, `C2_`; `drawUrban` đọc bảng màu `C.pal`; `urbanKho`, `urbanLandmark` (Nhà trẻ, Khu nhà ở, Nhà văn hóa, Hồ điều hòa, Tháp văn phòng); chợ tự co theo khung; camera cảnh kết theo bề ngang bản đồ. `level_design/levels_ch2.py`, `ket_qua_ch2.json` (mới); ảnh `playtest_evidence/chuong2_v14/`.
- Màn thưởng: `CH1.bonus`, `addBonus`, `CH1_BONUS` (màn 16 trong danh sách), `getBonus`, `bonusOpen`, `gemSprite`, `gemCollect`, `bonusEnd`, `GEMG`, `mmGem`; nhánh `LV.bonus` trong `step`, `reset`, `renderMissions`, `buildMarks`, `renderPrep`, `introKeys`, `HSEC`, `restart`, `drawHomeMap` (nút + thẻ màn thưởng).
- Luật chơi lần đầu: `#rulev`, `#pcCatch`, `#pcRing`, `#pcTip` (HTML + CSS), `rulesStart` (gọi từ `openLevel`), `rulesEnd` (gọi từ `startGame`), `pcSteps`, `pcShow`, `pcNext`, khóa `demo_rules_done`; tab `rule` trong `HSEC`.
- Quay đầu đặt trước: `G.car.uq`, `cUturn`, `doUturn`, `leaveZone` (gọi từ `zoneProcess`, `askSkip`), nhánh `c.uq` trong `render()` (mũi tên chữ U, lớp `sel` của `#bUturn`), phím U trong bảng hỏi.

### Sửa
- **Danh sách màn không hiện màn đã qua khi trình duyệt chặn bộ nhớ** (mở file trực tiếp, chế độ riêng tư, khung xem trước): lưu kết quả thất bại âm thầm nên trang chủ không có ✓/sao. Thêm bộ nhớ dự phòng `LS` — vẫn lưu vào trình duyệt khi được, nếu bị chặn thì ghi nhớ trong phiên đang chơi. Vị trí code: đầu thẻ `<script>` (`const LS`), mọi chỗ đọc/ghi tiến trình dùng `LS.get` / `LS.set`.

## v1.3 · chốt 15/10/2026

Tóm tắt: Chương 2 cho thấy khung cảnh tiến triển — cảnh quay mới, đoạn mở màn, địa danh riêng, cụm nhà mọc, cần cẩu, cảnh kết chương và bưu thiếp; sửa lỗi nút không phản hồi

Tài liệu yêu cầu: v1.14

### Thêm
- **Đoạn mở màn Chương 2** (D-55, T-03): camera đi từ đường vừa thông → công trình vừa xây (màn đầu: công trường) → xe; chỉ lần đầu vào màn, không chạy khi Thử lại; chạm / phím để bỏ qua; đồng hồ chưa chạy.
- **Cảnh quay mới** (D-54, T-01): camera phóng 1,3 vào công trình, công trình nảy lên; camera lướt tới đường vừa thông, rào chắn mờ dần, vạch vàng chạy; khung cuối là đoạn đường mới.
- **Công trường có cần cẩu cao, cần quay chậm, móc và đống vật liệu** (D-57, T-05); giao diện đè lên công trường mờ còn 30%.
- Câu thông báo riêng cho Chợ mới và Công viên (D-56, T-07).
- **5 địa danh có hình khối riêng**, lớn hơn nhà thường: Tiệm bánh (mái hiên sọc, biển bánh), Trường học (chữ L, sân, cột cờ), Chợ mới (3 dãy quầy), Bệnh viện (chữ thập lớn, xe cứu thương), Công viên lớn nhất bản đồ (hồ, đài phun nước) (D-59, T-02).
- **Cụm nhà mới mọc lần lượt** quanh công trình, có sân và hàng rào trắng — trong cảnh quay và đoạn mở màn màn sau (D-60, T-06).
- **Cảnh kết chương** sau Màn 10: toàn cảnh, trời tối dần, 5 công trình sáng lần lượt, đèn ngã tư bật (≤ 6 giây) (D-62, T-08).
- **Bưu thiếp** ở Trang chủ khi hoàn thành cả chương (D-62, T-08).
- Trang chủ: công trình vừa xây nhấp nháy ở lần về đầu tiên (D-61, T-09).

### Thay đổi
- **Sửa lỗi (phát sinh trong v1.3):** nút Trang chủ trong popup tạm dừng và nút "Màn tiếp ▶" sau cảnh quay không phản hồi — chú thích code chèn nhầm làm mất dòng gán sự kiện.
- **Sửa lỗi (có từ v1.2):** dấu "!" cơ chế mới trên nút màn ở Trang chủ mất nền tròn cam (cùng nguyên nhân).
- **Sửa lỗi:** cảnh quay lộ vùng cỏ ngoài bản đồ do dùng chung giới hạn camera lái xe của v1.2 (I-07) — cảnh quay và đoạn mở màn dùng camera riêng nằm trong bản đồ (D-54).
- Hộp thoại hoàn thành công trình chuyển xuống **dải đáy**; giao diện lái xe ẩn suốt cảnh; cảnh cuối chương vẫn ở giữa (D-54).
- Ô phố chứa công trình đã xây thành khu dân cư dù ngoài vùng thông xe — Màn 9 khác Màn 8 (D-56, T-07 a). Không đổi mạng đường.
- Lô phát triển: bỏ cơ chế bỏ ngẫu nhiên 50%, lấy mọi lô trong bán kính 330 quanh công trình (D-60).
- Trang chủ Chương 2: lớp phủ trắng 28% → 10% (D-61).
- Nhãn màn chuẩn bị: hạn giao tách dòng riêng "⏱ hạn m:ss"; xếp nhãn thử 8 chỗ, hở tối thiểu 4px (D-58, T-10).
- `level_design/autopilot.js` gọi `startGame(true)` để bỏ qua đoạn mở màn. Autopilot: 14 tuyến giữ nguyên thời gian.

### Bỏ

### Vị trí code
- Camera điện ảnh: `camFit`, `camPlay`, `camFrame`, `camAt`, `cineCam`; `render()` dùng `cineCam()||camPlay()` (`demo/index.html`).
- Cảnh quay: `newRoads`, `startCut`, `cutDraw`, `cutReveal`, `cutRoads`, `stepCut`, `cutFx`, `finishCut`; CSS `#cutv`, `#cutv.big`.
- Đoạn mở màn: `startGame(noIntro)`, `INTRO_LV`, `introKeys`, `endIntro`; trạng thái `intro` trong `loop`; `openLevel` đặt lại `INTRO_LV`.
- Đô thị hoá / công trường: `drawChapter` (`urbanB`, nhánh `st==='build'`, `opts.pop` / `opts.siteR`), `CSITE` trong `buildLevel`, làm mờ `#hud .abs.fade` trong `render()`.
- Nhãn: `buildMarks` (dòng hạn), `v.layout` trong `makeViewer`.
- Địa danh: `ch2Rect` (khung công trình dùng chung; `buildingRect`, `siteCenter` gọi tới), `landmark`.
- Cụm nhà mọc: nhánh lô phát triển trong `drawChapter` (`opts.grow` → `opts.growI`), `growSet`, `GROW_I`; `introKeys` (`growT`).
- Cảnh kết / bưu thiếp: `FIN_T`, `finFx`, nhánh `fin` trong `startCut`; `postReady`, `openPost`, `#bPost`, `#postv`.
- Trang chủ: `HOME_FLASH` (đặt trong `end`, xóa trong `openLevel`), `drawHomeMap`.
- Hash kiểm thử: `#lv=7&play&intro` để xem đoạn mở màn (mặc định `#…&play` bỏ qua).

## v1.2 · chốt 15/10/2026

Tóm tắt: Sửa theo báo cáo playtest 8 nhân vật — chơi được trên màn hình nhỏ và khi cầm dọc, nút Màn tiếp, bấm rẽ sớm, bảng lấy hàng cố định, hết giờ không ép mua, nút Bản đồ trong tạm dừng.

Tài liệu yêu cầu: v1.11

### Thêm

- Nút **"Màn tiếp ▶"** là nút chính ở màn thắng (Chương 1); phím Enter cũng sang màn tiếp (D-47).
- Nút **Bản đồ** trong popup tạm dừng; đóng bản đồ quay lại tạm dừng (D-51).
- Bước xác nhận trước khi mở cửa hàng từ popup hết giờ ("bán bằng tiền thật… hỏi ý kiến bố mẹ") (D-50).
- Dòng nhắc "Chưa có hàng cho … — lấy ở … trước" khi đi qua điểm giao mà chưa có hàng (D-52).

### Thay đổi

- **Khung hình căn giữa tuyệt đối** — hết lệch/cắt ở 667×375, 740×360, 640×360 (D-46, I-01).
- **Cầm dọc: game tự xoay 90°** thay cho màn "Xoay ngang điện thoại"; mọi thao tác chạm/kéo đổi tọa độ theo hướng xoay (D-46, I-17).
- Thắng xong về Trang chủ → **tự chọn màn kế tiếp** chưa hoàn thành (D-47, I-02).
- **Bấm rẽ sớm** được nhận nếu giao lộ kế tiếp có hướng đó (D-49, I-06a).
- **Bảng lấy hàng giữ cố định vị trí**, đơn đã lấy hết hiện xám; máy cảm ứng ẩn gợi ý phím (D-48).
- Hết giờ khi không có vật phẩm và không đủ kim cương: nút chính **"Thử lại"**, mua kim cương thành liên kết phụ (D-50, I-04).
- Camera lùi được ra ngoài mép bản đồ để giao diện không che xe/điểm (D-53, I-07).
- Bong bóng hướng dẫn Màn 1 tự chọn chỗ không che xe, nút, bảng hỏi (I-13).
- "×3 từ Kho B" → "3 kiện từ Kho B"; chấm "!" trên nút màn chỉ ở màn có cơ chế mới, thẻ màn ghi "! Cơ chế mới" (I-16).
- Màn kết quả rộng hơn để 3 nút nằm một hàng; sao hiện bằng hẹn giờ (nếu hiệu ứng không chạy sao vẫn hiện).
- Bộ lái tự động: chỉ chọn nút lấy hàng còn bấm được. Thời gian đo được không đổi.

### Bỏ

- Màn hình "Xoay ngang điện thoại để chơi".

### Vị trí code

| Tính năng | Hàm / khối chính |
|---|---|
| Khung hình, xoay | `fit`, `STG`, `toStage`, `rectToStage`; CSS `#wrap`, `#stage` |
| Màn tiếp | `nextLevel`, `goHome`, nút `#bNext2` trong `end` |
| Bảng lấy hàng | `choices` (cờ `ok`), `hasWork`, `askChoose`, `renderAsk` |
| Bấm rẽ sớm | `cTurn` (nhánh `!v[dir]`) |
| Hết giờ, cổng mua | `renderTO`, `toAct` (`retry`, `shop`), `#gatev` |
| Bản đồ từ tạm dừng | `pauseMap`, `resume` (`G.mapFromPause`) |
| Nhắc chưa có hàng | `step` (`G.noGoodsZ`) |
| Camera | `render` (`CAM`, lề ngoài bản đồ) |

## v1.1 · chốt 15/10/2026

Tóm tắt: Cải thiện từ báo cáo playtest — chờ xuất phát, popup Nhiệm vụ/Hướng dẫn, kim cương và Thêm giờ (gộp từ bản thử), xếp hạng 3 sao, âm thanh, hướng dẫn tương tác Màn 1, màn chuẩn bị rõ ràng hơn, D-pad nhận hướng theo góc.

Tài liệu yêu cầu: v1.10

### Thêm

- **Chờ xuất phát:** vào màn xe đứng yên, nút cùng hướng đầu xe nhấp nháy; nhấn mới chạy, đồng hồ tính từ lúc này; quay đầu khi chờ không tính giờ; bong bóng "Nhấn để xe chạy" ở Màn 1–3 (D-44, Q-65 → Q-67). Gộp từ `mockups/proto_trai_nghiem.html`.
- **Popup Nhiệm vụ** (danh sách, PA1) và **Hướng dẫn** (thẻ chủ đề, PA-C) ở góc trên trái; chấm "!" khi màn có cơ chế mới; chạm cụm vòng nhiệm vụ cũng mở (D-44, Q-68 → Q-71). Gộp từ bản thử.
- **Kim cương & vật phẩm Thêm giờ:** hết giờ → gợi ý +30 giây (tối đa 2 lần), cửa hàng 4 gói, thanh toán mô phỏng, +5 kim cương lần đầu thắng (D-35 → D-39). Gộp từ bản thử.
- **Xếp hạng 3 sao** theo thời gian còn lại; dùng Thêm giờ chỉ 1 sao; hiện ở màn kết quả, trang chủ, thẻ màn, tổng sao chương (D-41).
- **Âm thanh** tổng hợp + nút tắt/bật ở trang chủ và popup tạm dừng (D-42).
- **Hướng dẫn tương tác Màn 1** lần đầu chơi: xe dừng hẳn ở ngã tư cần rẽ, khoanh đúng nút, có "Bỏ qua hướng dẫn" (D-45).
- Màn chuẩn bị: nhãn "Xem bản đồ, lên kế hoạch · xe chưa chạy", nút Bắt đầu nhấp nháy, chạm bản đồ → bong bóng chỉ nút Bắt đầu (D-43).

### Thay đổi

- D-pad nhận hướng theo góc chạm so với tâm cụm nút, vùng bấm rộng hơn 10px, khe giữa nút 3px → 8px (D-43).
- Màn kết quả khi chưa đạt: "Hết giờ rồi!" / "Trễ hạn mất rồi!", thanh "Đã giao x/y kiện", mẹo theo nguyên nhân, nút "Thử lại" (D-43).
- Chỉ báo dừng giờ thống nhất dạng "⏸ mm:ss" ở bảng hỏi, bản đồ lớn, tạm dừng (Q-72).
- Lý do trễ hạn ghi "cần giao trong mm:ss đầu" (thay "đã quá hạn mm:ss").
- Sửa lỗi khi gộp bản thử: khối màn kết quả bị chèn hai lần (bản thừa không hiển thị nhưng trùng mã nút).
- Bộ lái tự động (`level_design/autopilot.js`): bỏ qua bước chờ xuất phát và hướng dẫn Màn 1. Thời gian đo được không đổi so với v1.0.

### Bỏ

- Câu "Đã tạm dừng · còn mm:ss" và tag "Thời gian đang dừng" (thay bằng "⏸ mm:ss").

### Vị trí code

| Tính năng | Hàm / khối chính |
|---|---|
| Chờ xuất phát | `startGame` (state `wait`), `cTurn`, `cUturn`, `render` (lớp `.go`, `#goHint`), `GO_HINT_LEVELS` |
| Popup Nhiệm vụ / Hướng dẫn | `openInfo`, `closeInfo`, `renderInfo`, `misList`, `helpTabs`, `HSEC`, `roadTable`, `newMech`, `helpSeen` |
| Kim cương, Thêm giờ, cửa hàng | `T0`, `timeUp`, `renderTO`, `toAct`, `winReward`, `openShop`, `renderShop`, `WAL`, `PACKS`, hằng `ITEM_PRICE`, `ITEM_SEC`, `MAX_EXT`, `WIN_KC` |
| Sao | `starsFor`, `STAR_CUT`, `getStars`, `end`, `drawHomeMap`, `renderHome` |
| Âm thanh | `SND`, `tone`, `SFX`, `sfx`, `setSound`, `renderSoundBtns` |
| Hướng dẫn Màn 1 | `tutStart`, `tutUpdate`, `tutBest`, `tutCost`, `tutEnd`, `#tutRing`, `#tutTip` |
| Màn chuẩn bị | `#pBanner`, `startHint`, `vPrep.onTap` (trong `makeViewer`: nhận chạm không kéo) |
| D-pad | khối `.dpad` `pointerdown` (tính góc), CSS `.dpad` |

## v1.0 · chốt 15/10/2026

Tóm tắt: Bản gốc khi bắt đầu quản lý phiên bản — 10 màn trong 2 chương, điều khiển 4 hướng, xe tự dừng và bảng hỏi ở điểm, Chương 2 xây dựng dần, bản đồ lớn phóng to/thu nhỏ, màn chuẩn bị ghi nhiệm vụ trên bản đồ.

Tài liệu yêu cầu: v1.9

### Thêm

Đây là bản đầu tiên nên liệt kê toàn bộ nội dung đang có:

- Trang chủ: cột chương bên trái, con đường leo theo màn (D-29); 4 chương, 2 chương chơi được.
- Màn chuẩn bị theo PA2: nhiệm vụ ghi ngay dưới điểm giao trên bản đồ, nhãn tự tránh chồng nhau; cột phải: thời gian, xe, Bắt đầu (D-34).
- Điều khiển: 4 nút hướng theo màn hình, vùng chọn hướng 2 giây trước giao lộ, bấm lại để hủy (D-19); Quay đầu bất kỳ lúc nào (Q-49).
- Xe tự dừng ở điểm có việc: tự giao hàng, hỏi lấy hàng qua bảng hỏi, đồng hồ dừng khi hỏi (D-23).
- 5 loại đường: thường, lớn, đông, gồ ghề, hẻm; ảnh hưởng tốc độ theo loại xe (D-26); 3 xe: máy, van, tải.
- Mini map toàn bản đồ, ký hiệu ▲ kho / ● điểm giao, vòng vàng = đang chở tới, xám ✓ = xong (D-20, D-28).
- Bản đồ lớn: kéo, chụm 2 ngón, con lăn, nút ＋/−/⤢; thu nhỏ tối đa = toàn bộ bản đồ, phóng to tối đa = gấp 2 lần lúc lái xe; mỗi lần mở về toàn cảnh (D-33, Q-61, Q-62).
- Popup tạm dừng nhỏ, 3 nút biểu tượng, hỏi xác nhận khi bỏ lượt (D-31).
- Chương 2 "Khu đô thị mới": vùng mở rộng dần, công trình hoàn thành sau mỗi màn thắng, cảnh quay sau khi thắng (D-32).
- Lưu thời gian tốt nhất mỗi màn trên máy.
- Số phiên bản ở góc trang chủ; bản lưu dùng khóa lưu riêng.

Chưa gồm (đang ở bản thử riêng [mockups/proto_trai_nghiem.html](mockups/proto_trai_nghiem.html)): chờ xuất phát, popup Nhiệm vụ / Hướng dẫn, kim cương và vật phẩm Thêm giờ (D-35 → D-39).

### Thay đổi

### Bỏ

### Vị trí code

Trong `demo/index.html`:

| Tính năng | Hàm / khối chính |
|---|---|
| Dữ liệu màn | `LEVELS`, `CH2`, `CHAPTERS` |
| Vẽ bản đồ | `drawStatic` (Chương 1), `drawChapter` (Chương 2), `buildMinimap` |
| Mô phỏng, điểm nhiệm vụ | `step`, `zoneProcess`, `choices`, `askChoose`, `askSkip` |
| Điều khiển | `cTurn`, `cUturn`, `validDirs` |
| Trang chủ | `renderHome`, `drawHomeMap` |
| Màn chuẩn bị | `renderPrep`, `prepView`, `vehHTML`, `legendHTML` |
| Bản đồ lớn | `makeViewer` (phóng/kéo/xếp nhãn), `buildMarks` |
| Tạm dừng, kết quả, cảnh quay | `pauseGame`, `askConfirm`, `end`, `startCut`, `finishCut` |

