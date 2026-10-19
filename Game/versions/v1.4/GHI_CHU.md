# Demo v1.4 — chốt 19/10/2026


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

## Bộ lái tự động

```
Màn 1 · Xe van: Đạt 26.5 s (giới hạn 90 s · lời giải tối ưu theo solver 29.4 s)
Màn 2 · Xe van: Đạt 34.3 s (giới hạn 50 s · lời giải tối ưu theo solver 37.2 s)
Màn 3 · Xe van: Đạt 37.4 s (giới hạn 55 s · lời giải tối ưu theo solver 42.2 s)
Màn 4 · Xe van: Đạt 41.3 s (giới hạn 60 s · lời giải tối ưu theo solver 46.1 s)
Màn 5 · Xe van: Đạt 52.5 s (giới hạn 80 s · lời giải tối ưu theo solver 56.3 s)
Màn 6 · Xe van: Đạt 56.5 s (giới hạn 75 s · lời giải tối ưu theo solver 61.3 s)
Màn 7 · Xe van: Đạt 59.9 s (giới hạn 80 s · lời giải tối ưu theo solver 66.7 s)
Màn 8 · Xe van: Đạt 64.2 s (giới hạn 95 s · lời giải tối ưu theo solver 69.1 s)
Màn 9 · Xe van: Đạt 69.8 s (giới hạn 95 s · lời giải tối ưu theo solver 75.5 s)
Màn 10 · Xe van: Đạt 79.1 s (giới hạn 105 s · lời giải tối ưu theo solver 83.6 s)
Màn 11 · Xe van: Đạt 51.8 s (giới hạn 70 s · lời giải tối ưu theo solver 55.9 s)
Màn 12 · Xe van: Đạt 51.9 s (giới hạn 70 s · lời giải tối ưu theo solver 58.7 s)
Màn 13 · Xe van: Đạt 53.6 s (giới hạn 80 s · lời giải tối ưu theo solver 60.2 s)
Màn 14 · Xe van: Đạt 68 s (giới hạn 90 s · lời giải tối ưu theo solver 72.7 s)
Màn 15 · Xe van: Đạt 72.3 s (giới hạn 95 s · lời giải tối ưu theo solver 75.1 s)
Màn 16 · Xe van: Đạt 71.9 s (giới hạn 95 s · lời giải tối ưu theo solver 76.8 s)
Màn 17 · Xe van: Đạt 72.2 s (giới hạn 95 s · lời giải tối ưu theo solver 80.9 s)
Màn 18 · Xe van: Đạt 80 s (giới hạn 105 s · lời giải tối ưu theo solver 88.7 s)
Màn 19 · Xe van: Đạt 87.2 s (giới hạn 115 s · lời giải tối ưu theo solver 95.2 s)
Màn 20 · Xe van: Đạt 94.3 s (giới hạn 125 s · lời giải tối ưu theo solver 102.4 s)
```
