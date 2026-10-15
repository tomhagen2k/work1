# Đánh giá tiến triển hình ảnh — Chương 2 (mẫu cho các chương sau)

**Bản kiểm thử:** `Game/demo/index.html` (Trang chủ ghi "BẢN DEMO · v1.3 · đang làm")
**Ngày:** 15/10/2026
**Phạm vi:** chỉ Chương 2 · Khu đô thị mới (M6–M10). Chương 1 không xét vì chưa được thiết kế theo hướng tiến triển tăng dần.
**Mục đích:** ghi lại những gì Chương 2 đang làm được và chưa làm được, rồi rút ra nguyên tắc dùng chung cho các chương mới làm theo cùng mô hình.
**Ảnh bằng chứng:** [`playtest_evidence/visual_v13/`](playtest_evidence/visual_v13/)

| Ảnh | Nội dung |
|---|---|
| `S2_ch2_prep.png` | Màn chuẩn bị M6–M10 đặt cạnh nhau |
| `S4_ch2_ingame.png` | Khung hình ~3 giây sau khi xuất phát, M6–M10 |
| `S5_cutscenes.png` | Cảnh quay hoàn thành công trình ở M6, M7, M8: lúc công trình hiện ra và lúc hộp thoại xuất hiện |
| `S6_home_ch2.png` | Nền Trang chủ Chương 2 khi chưa thắng màn nào và sau khi thắng 3 màn |
| `L6_site_under_minimap.png` | Công trình Tiệm bánh bị bản đồ nhỏ che khi xe đang lái tới |
| `L6_site_arrive.png` | Công trình đang xây, nhìn khi xe tới nơi |
| `L8_lots_sapxay.png` | Lô "Sắp xây" nhìn thấy khi đang chơi |
| `L8_bakery_built.png` | Tiệm bánh đã xây, nhìn khi đang chơi |

> **Giới hạn:**
> - Đánh giá do AI mô phỏng góc nhìn người chơi, không phải dữ liệu người dùng thật.
> - Ảnh chụp tĩnh ở 844×390 nên chưa đánh giá được độ mượt chuyển động.
> - Đã chơi thắng M6, M7, M8 và xem trọn cảnh quay. M9 thua do hết giờ, nên **chưa quan sát được** cảnh hoàn thành Bệnh viện, Công viên và cảnh kết chương. Nhận xét về các cảnh này chỉ dựa trên mã vẽ (`drawChapter`, `finishCut`).

---

## 1. Chương 2 đang được dựng thế nào

Toàn chương dùng chung **một bản đồ 6×4**, vẽ bằng `drawChapter()`. Mỗi màn thay đổi trạng thái của bản đồ này như sau:

| Thành phần | Cách thay đổi theo màn | Thuộc loại |
|---|---|---|
| Vùng thông xe (`CH2.regions`) | 2×2 → 3×2 → 4×3 → **4×3** → 5×3 | Gameplay và hình ảnh |
| Ô ngoài vùng | Ruộng sọc, cây, đường đất có rào chắn | Trang trí, tạo cảm giác "chưa khám phá" |
| Công trình (`CH2.sites`) | Lô "Sắp xây" → đang xây (lưới xám, cần cẩu) → đã xây | Trọng tâm của tiến triển |
| Nhà phát triển | Nhà mái pastel mọc gần công trình đã xây (bỏ qua ngẫu nhiên 50%) | Trang trí |
| Cảnh quay khi thắng | Camera trượt tới công trình → công trình hiện ra → hộp thoại "… đã hoàn thành!" kèm câu thông xe | Phần thưởng |
| Nền Trang chủ | Vẽ lại bản đồ theo số màn đã thắng, phủ lớp trắng 28% | Phần thưởng ngoài màn chơi |

Mọi màn đều xuất phát cùng một chỗ (`start: c0r1 → c1r1`, hướng Đông).

---

## 2. Những điểm đang làm tốt (nên giữ cho các chương sau)

1. **Một bản đồ chung lớn dần.** Đặt màn chuẩn bị M6 → M10 cạnh nhau [S2] thấy rõ khu phố mở rộng, ruộng thành phố, công trình mọc lên. Đây là xương sống đúng của cảm giác tiến triển.
2. **Ruộng và đường đất có rào** tương phản tốt với khu đã thông xe, cho người chơi biết còn nơi chưa khám phá.
3. **Lô "Sắp xây"** [L8_lots_sapxay] là lời hứa thị giác: người chơi thấy trước nơi sẽ có công trình.
4. **Mỗi công trình có cảnh quay riêng** kèm câu thông xe.
5. **Nền Trang chủ phản ánh tiến độ** [S6].

---

## 3. Những điểm chưa ổn

| # | Vấn đề | Loại | Bằng chứng | Hệ quả |
|---|---|---|---|---|
| P1 | **Khung hình đầu trong game gần như giống hệt nhau giữa các màn.** Xe luôn xuất phát cùng chỗ, cùng hướng; phần mới đều ở xa, sát mép bản đồ | Khác biệt giữa màn | S4: M6 ≈ M7, M8 ≈ M9 ≈ M10 | Người chơi chỉ thấy tiến triển nếu mở màn chuẩn bị và nhìn kỹ |
| P2 | **Cảnh quay giấu phần thưởng.** Công trình chỉ hiện khoảng 2,5 giây rồi hộp thoại giữa màn hình che đúng công trình (M7, M8). Ở M6, Tiệm bánh nằm sát mép trên nên ~45% khung hình là bãi cỏ trống ngoài bản đồ | Bố cục, UX | S5 | Phần thưởng chính của chương gần như bị lãng phí |
| P3 | **Công trình đã xây không giống địa danh.** Được vẽ bằng đúng hàm `house()` như nhà thường, thêm một vòng tròn biểu tượng 26px. Kích thước ngang nhà bên cạnh (Trường học cam cạnh Nhà trẻ xanh cùng cỡ) | Mỹ thuật, điểm nhấn | S5 M7, L8_bakery_built | Người chơi khó nhớ "mình đã xây Trường học" |
| P4 | **Câu thông xe không có hình đi kèm.** "Thông xe tuyến mới phía Đông…" nhưng camera không cho thấy đoạn đường nào vừa mở. Câu ở M8 và M10 bị để trống nên hiện câu chung "Khu phố đông vui hơn rồi!" | Tò mò, động lực | S5 | Bỏ lỡ cơ hội nhá trước khu vực mới |
| P5 | **M8 → M9 không mở vùng mới** (cùng `region [4,3]`). Chợ mới xây xong đứng lẻ loi giữa ruộng vì nằm ngoài vùng đô thị | Nhịp tiến triển | S2, S5 M8 | Một màn không có "thêm gì mới" |
| P6 | **Công trình đang xây bị giao diện che.** Ở mép trên, nó lọt dưới bản đồ nhỏ khi xe đang tới. Bản thân hình đang xây cũng nhỏ: lưới xám và cần cẩu nét mảnh, đứng yên | Bố cục, mỹ thuật | L6_site_under_minimap, L6_site_arrive | Không thấy mục tiêu "đang xây" của màn |
| P7 | **Nhà phát triển khó nhận ra.** Cùng cỡ với nhà cũ, rải ngẫu nhiên, mọc sẵn không có hiệu ứng | Màu sắc, phân bổ | S4 M8–M10 | Có tồn tại nhưng gần như không ai chú ý |
| P8 | **Màn cuối chương (M10) không khác bố cục các màn trước.** Theo mã, Công viên đã xây chỉ là một hình chữ nhật xanh với 4 cây và đài phun nhỏ (chưa quan sát) | Cao trào | S2 M10 | Thiếu cảm giác "hoàn thành một chặng" |
| P9 | **Nền Trang chủ khó đọc tiến độ.** Lớp phủ trắng 28%, đường nối các nút màn và thẻ màn che bớt | Bố cục | S6 | Tiến độ có nhưng khó thấy |
| P10 | **Nhãn chồng nhau ở màn chuẩn bị M9, M10** (nhãn hạn giao quanh Bệnh viện) | Bố cục | S2 M9 | Rối mắt khi màn có nhiều điểm |

### So sánh từng cặp màn

| Cặp màn | Thay đổi hiện có | Dễ nhận biết? | Vấn đề chính | Ưu tiên |
|---|---|---|---|---|
| M6 → M7 | Mở thêm 1 cột; Tiệm bánh đã xây; Trường đang xây | Màn chuẩn bị: dễ. Trong game: **gần như không** | P1, P3 | Cao |
| M7 → M8 | Vùng thành 4×3; đường lớn phía Nam; Chợ mới đang xây | Màn chuẩn bị: dễ. Trong game: khó | P1, P7 | Trung bình |
| M8 → M9 | Vùng **không đổi**; Chợ mới đã xây; Bệnh viện đang xây | **Gần như không** | P5, P4 | **Cao** |
| M9 → M10 | Vùng thành 5×3 (dải phía Đông); Bệnh viện đã xây; Công viên đang xây; có chọn xe | Màn chuẩn bị: dễ. Trong game: gần như không | P1, P8 | **Cao** |

### Điểm từng màn (1–10)

Tiêu chí: **NH** điểm nhấn · **KB** khác biệt so với màn trước · **PP** phong phú · **BC** bố cục · **CĐ** hợp chủ đề · **TM** tạo tò mò · **CB** cân bằng giữa trang trí và khả năng chơi.

| Màn | NH | KB | PP | BC | CĐ | TM | CB | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| M6 | 6 | 8* | 6 | 6 | 8 | 7 | 8 | *Khác biệt lớn vì đổi chương. Công trình bị bản đồ nhỏ che |
| M7 | 5 | 4 | 6 | 6 | 8 | 6 | 8 | Màn chuẩn bị tốt; trong game giống M6 |
| M8 | 6 | 6 | 7 | 6 | 7 | 6 | 7 | Đa dạng nhất; Chợ mới đứng giữa ruộng |
| M9 | 5 | 2 | 7 | 5 | 7 | 4 | 6 | Không có vùng mới; nhãn chồng nhau |
| M10 | 5 | 4 | 7 | 5 | 7 | 6 | 6 | Thiếu cao trào; cảnh kết chưa quan sát |

**Nhịp tiến triển cả chương: 6/10.** Màn chuẩn bị cho thấy chương đi lên đều, nhưng nhịp chững lại ở M9, và trong lúc chơi gần như không cảm nhận được sự thay đổi.

---

## 4. Hướng cải tiến cho Chương 2

### Nguyên tắc
- **Mỗi màn có đúng một điểm nhấn mới**, và người chơi phải *thấy được* điểm đó: lúc vào màn, hoặc trên tuyến đường bắt buộc đi qua. Không để điểm nhấn chỉ nằm ở mép bản đồ.
- **Địa danh có hình khối riêng** và lớn khoảng 1,5 lần nhà thường. Ưu tiên một thứ lớn, rõ hơn là nhiều chi tiết nhỏ.
- **Trang trí không được lấn gameplay:** không đặt lên mặt đường; không dùng cam hoặc xanh dương đậm (đã dành cho đường đông, đường lớn); không đặt vật thể chuyển động gần ngã tư.

### Diện mạo mong muốn từng màn

| Màn | Điểm nhấn người chơi phải thấy | Điều chỉnh |
|---|---|---|
| M6 | Công trường Tiệm bánh với cần cẩu cao | Cần cẩu cao gấp đôi, cần quay chậm; camera chừa lề trên để công trình không lọt dưới bản đồ nhỏ |
| M7 | Tiệm bánh **đã xây** và khu phía Đông vừa thông | Đầu màn có đoạn 1,5–2 giây camera lướt qua Tiệm bánh về xe. Tiệm bánh có mái hiên sọc hồng, biển bánh lớn |
| M8 | Đường lớn phía Nam mới thông; Trường học có sân và cột cờ | Đầu màn camera đi dọc đường lớn mới; nhà mới quanh Trường mọc thành cụm |
| M9 | Khu chợ quanh Chợ mới (không còn đứng giữa ruộng) | Đô thị hoá ô quanh Chợ mới: sân lát, quầy hàng, người mua. Viết câu thông xe riêng |
| M10 (cuối chương) | Toàn cảnh khu đô thị và Công viên trung tâm lớn nhất bản đồ | Đầu màn lướt toàn cảnh. Công viên chiếm cả một ô phố. Cảnh kết kéo camera ra toàn bản đồ, đèn đường bật sáng |

### Danh sách công việc

Chi phí là **ước tính sơ bộ**, dựa trên cấu trúc mã hiện tại trong `demo/index.html` (`drawChapter`, `house`, `startCut` / `cutReveal` / `finishCut`).

| Mã | Giải quyết | Thay đổi cụ thể | Ưu tiên | Chi phí | Tiêu chí nghiệm thu |
|---|---|---|---|---|---|
| **T-01** | P2, P4 | (a) Chuyển hộp thoại hoàn thành xuống dải đáy (cao ≤ 30%), hoặc cho hiện chậm thêm 1,5 giây; (b) giới hạn camera trong bản đồ, phóng to khoảng 1,3 lần vào công trình; (c) công trình hiện ra có hiệu ứng nảy (scale 0 → 1,1 → 1 trong 0,5 giây) kèm vòng sáng; (d) sau đó camera lướt dọc đoạn đường vừa thông xe trong khi rào chắn biến mất | **Cao** | Thấp–TB | Ở 844×390: công trình hiện trọn, không bị che ít nhất 2 giây; không khung hình nào có quá 15% vùng ngoài bản đồ; mỗi câu thông xe đi kèm hình đoạn đường đó |
| **T-03** | P1 | Đoạn mở màn 1,5–2 giây sau khi bấm "Bắt đầu": camera đi từ điểm mới của màn (công trình vừa xây hoặc đường vừa thông) về xe. Đồng hồ chưa chạy; chạm để bỏ qua | **Cao** | Thấp (tái dùng camera của cảnh quay) | Khung hình đầu của M6 → M10 đều khác nhau; đồng hồ không chạy trong đoạn này |
| **T-07** | P5, P4 | Cho M9 một thay đổi riêng (đô thị hoá ô quanh Chợ mới, hoặc mở sớm một phần dải phía Đông). Viết câu thông xe riêng cho M8 và M10 | **Cao** | Thấp | Màn chuẩn bị M9 khác M8 ở ít nhất một vùng nhìn thấy được; không còn câu chung chung |
| **T-02** | P3 | Mỗi công trình đã xây có hình khối riêng, diện tích ~1,5 lần nhà thường: Tiệm bánh có mái hiên sọc và biển; Trường học hình chữ L, có sân, cột cờ, hàng rào; Chợ mới có 3–4 dãy quầy; Bệnh viện mái trắng viền xám, dấu thập đỏ lớn, xe cứu thương; Công viên chiếm cả ô, có hồ, lối đi, cây | **Cao** | TB | Nhìn ảnh M10, người xem chỉ ra đúng 5 công trình trong 5 giây mà không cần nhãn; không công trình nào đè lên đường |
| **T-08** | P8 | Cảnh kết chương: camera kéo ra toàn bản đồ, các công trình lần lượt sáng lên, đèn đường bật; ảnh toàn cảnh lưu thành "bưu thiếp" ở Trang chủ | **Cao** | TB | Cảnh dài ≤ 6 giây, bỏ qua được; thấy cả 5 công trình trong một khung hình |
| **T-05** | P6 | Cần cẩu cao gấp đôi, cần quay ±10° chậm, thêm vài khối vật liệu màu. Công trình ở mép trên không bị che (tăng lề trên cho camera, hoặc làm mờ bản đồ nhỏ khi xe ở 1/3 trên màn hình) | Trung bình | Thấp | Khi xe lái tới, công trình hiện ≥ 70% và không bị giao diện che |
| **T-06** | P7 | Bỏ cơ chế bỏ qua ngẫu nhiên 50%: nhà mới mọc thành cụm liền quanh công trình, có sân và hàng rào trắng. Khi vào màn, cụm mới "mọc" lần lượt | Trung bình | Thấp | Đặt ảnh M7 cạnh M8: người xem chỉ ra được cụm nhà mới |
| **T-09** | P9 | Giảm lớp phủ trắng xuống ~10%. Về Trang chủ sau khi thắng thì công trình vừa xây nhấp nháy một lần. Đặt đường nối các nút màn tránh che công trình | Trung bình | Thấp | Ở Trang chủ, nhận ra công trình vừa xây trong 3 giây |
| **T-10** | P10 | Tách nhãn hạn giao thành dòng riêng; nhãn tự né nhau | Thấp | Thấp | Màn chuẩn bị không có nhãn chồng lên nhau |
| **T-12** | Sức sống | Vài người đi bộ trên vỉa hè cạnh công trình đã xây, chim bay qua trong cảnh quay. Không đặt gần ngã tư | Thấp | TB | ≤ 6 vật thể động trên một màn hình; FPS giảm không quá 10% trên máy cấu hình thấp |

**Thứ tự đề xuất:**
1. **Làm trước:** T-01 → T-03 → T-07 → T-05. Gói này không đổi gameplay, chủ yếu dùng lại camera và cảnh quay đã có.
2. **Làm sau:** T-02 và T-08, vì cần vẽ thêm hình.

---

## 5. Nguyên tắc cho các chương mới (làm theo mô hình Chương 2)

Rút ra từ những gì Chương 2 làm được và chưa được. Nên kiểm tra theo danh sách này ngay khi thiết kế chương.

### 5.1. Khung một chương
| Màn | Vai trò hình ảnh | Bắt buộc có |
|---|---|---|
| Màn 1 | Giới thiệu bối cảnh mới, khu nhỏ giữa vùng chưa khám phá | Bảng màu và nền khác hẳn chương trước; lô "Sắp xây" thấy được từ điểm xuất phát |
| Màn 2–3 | Mở rộng đều | Mỗi màn mở **một vùng mới** và hoàn thành **một công trình**; điểm nhấn mới nằm trên tuyến đường bắt buộc |
| Màn 4 | Khu đặc trưng | Một địa danh có quy mô lớn hơn các màn trước |
| Màn cuối | Cao trào | Địa danh lớn nhất chương, có cảnh kết toàn cảnh, có "bưu thiếp" lưu ở Trang chủ |

### 5.2. Danh sách kiểm tra cho mỗi màn
- [ ] Màn này **mở vùng mới hoặc làm vùng cũ thay đổi thấy được**. Không có màn nào giữ nguyên `region` mà không có thay đổi khác bù vào (rút ra từ P5).
- [ ] Có **đoạn mở màn** đưa camera qua điểm mới, hoặc đặt điểm xuất phát gần điểm mới (P1).
- [ ] Công trình đang xây và đã xây **không nằm sát mép trên hoặc phải**, tức là dưới bản đồ nhỏ, đồng hồ hay cụm mũi tên. Nếu buộc phải đặt ở mép thì camera phải có lề (P6).
- [ ] Công trình đã xây có **hình khối riêng**, lớn khoảng 1,5 lần nhà thường, nhận ra được khi chưa đọc nhãn (P3).
- [ ] Công trình đã xây nằm **trong khu đô thị**, không đứng giữa ruộng (P5).
- [ ] Cảnh quay: công trình **hiện trọn và không bị che ≥ 2 giây**; hộp thoại không đè lên; camera không lộ vùng ngoài bản đồ (P2).
- [ ] Mỗi màn có **câu thông xe hoặc thông báo riêng**, và câu đó **có hình đi kèm** (P4).
- [ ] Nhà phát triển mọc **thành cụm, có hiệu ứng mọc**, không rải ngẫu nhiên (P7).
- [ ] Màn chuẩn bị không có nhãn chồng nhau (P10).
- [ ] Trang trí không nằm trên mặt đường, không trùng màu với loại đường, không có chuyển động gần ngã tư.

### 5.3. Cách kiểm chứng sau khi làm
1. **Bộ ảnh cố định cho mỗi màn**, cùng kích thước 844×390: (a) màn chuẩn bị; (b) 3 giây sau khi xuất phát; (c) khoảnh khắc công trình hiện ra; (d) lúc hộp thoại xuất hiện. Đặt các màn liên tiếp cạnh nhau để so.
2. **Kiểm tra 5 giây:** cho người xem khung hình đầu của hai màn liên tiếp và hỏi "Màn sau có gì mới?". Đạt khi họ nêu đúng mà không cần gợi ý. Có thể mô phỏng bằng AI trước, nhưng **cần ít nhất 5 người thật** để kết luận.
3. **Kiểm tra che khuất:** ở 844×390 và 667×375, công trình, điểm giao và xe không nằm dưới giao diện khi xe đang lái qua.
4. **Kiểm tra gameplay không đổi:** chơi lại các tuyến đã thắng, thời gian hoàn thành lệch không quá 1 giây.
5. **Hiệu năng:** FPS giảm không quá 10% trên máy cấu hình thấp, cả khi đang có cảnh quay.
