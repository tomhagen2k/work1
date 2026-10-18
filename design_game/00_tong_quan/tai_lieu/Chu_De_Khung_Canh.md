# Chủ đề khung cảnh theo chương — 15 chương

| Thông tin | Nội dung |
|---|---|
| Phiên bản | 0.6 — viết lại mục 3: **chi tiết 15 chủ đề theo thứ tự chương** (yếu tố có trong chương, bảng màu theo tông đã chốt, cách thể hiện yếu tố mới, kỳ quan, kiểu tiến triển, bộ tài nguyên). 0.5 — chốt bố cục **15 chủ đề cho 15 chương** theo yếu tố mới của từng chương (mục 5), bộ tài nguyên dùng chung (mục 6.1), mọi chương xây dựng dần, bỏ khung nhịp cố định (mục 9) |
| Ngày | 16/10/2026 |
| Trạng thái | **Đã chốt** (D-66 trong [Mo_Ta_Yeu_Cau_MVP.md](Mo_Ta_Yeu_Cau_MVP.md)). Các chương demo hiện có chỉ là thử nghiệm, không ràng buộc bố cục này |
| Căn cứ | Phản hồi BA: mỗi chương một vùng/chủ đề riêng; bài học từ mockup ô phố v1 → v3 ([mockups/khung_pho_v3.html](mockups/khung_pho_v3.html)); khung độ khó [level_design/Khung_Do_Kho_Chuong_Man.md](level_design/Khung_Do_Kho_Chuong_Man.md) (yếu tố mới theo chương, mục 3.2) |

---

## 1. Nguyên tắc chung cho mọi chủ đề

Rút ra từ 3 vòng mockup ô phố: cảnh đẹp khi **ít màu, có quy hoạch, chi tiết làm nền**; rối khi mọi thứ nổi ngang nhau.

| # | Nguyên tắc | Lý do |
|---|---|---|
| N1 | **Giữ cố định "ngôn ngữ chơi" ở mọi chương:** độ rộng đường theo loại, biển báo loại đường, ghim nhiệm vụ (▲ vuông / ● tròn), màu loại đường trên mini map. Chủ đề chỉ đổi **vật liệu bề mặt**, không đổi hình dáng nhận diện. | Người chơi học luật đường ở chương đầu; đổi ký hiệu ở chương sau là bắt học lại. Game không giải thích khi rẽ không được (D-15), nên biển báo phải nhất quán (BD-04). |
| N2 | **Nhìn từ trên xuống, đặc trưng nằm ở mái và mặt bằng**, không nằm ở mặt tiền. Chọn chi tiết "đọc được từ trên cao": hình mái, vật trên mái, màu mặt đất, loại cây, mặt nước, bóng đổ. | Mặt tiền đẹp (cửa sổ, ban công) gần như không thấy ở góc nhìn này. |
| N3 | **Biểu tượng chọn theo hình nhìn từ trên.** Ưu tiên công trình có mặt bằng đặc trưng (kim tự tháp, vườn đối xứng Taj Mahal, tượng hình chữ thập, dãy cổng torii) hơn công trình chỉ đặc trưng nhờ chiều cao. | Nhìn thẳng từ trên, tháp cao chỉ còn một chấm; mặt bằng đặc trưng thì nhận ra ngay. |
| N4 | **Tỉ lệ màu 60–30–10:** nền mặt đất ~60%, kiến trúc ~30% (**tối đa 3 màu**), điểm nhấn ~10% (**tối đa 2 màu**, chỉ ở khu đặc trưng hoặc công trình chính). | Bài học v2 → v3: nhiều màu là nguyên nhân chính gây rối mắt. |
| N5 | **Ghim nhiệm vụ và đường luôn nổi nhất.** Mỗi chủ đề phải qua kiểm tra tương phản; nền quá sáng (tuyết, cát, nhà trắng) hoặc quá tối (đêm) thì chỉnh viền ghim, màu vỉa hè, độ đậm mặt đường. | Đây là thông tin chơi; cảnh chỉ là nền. |
| N6 | **Quy hoạch trước, vẽ sau:** mỗi bản đồ chia khu (trung tâm, dân cư, ven đô, khu đặc trưng), mặt tiền quay ra đường, cảnh hai bên một loại đường giống nhau. | Bài học v1 → v2: ghép từng ô riêng lẻ thì nhìn rời rạc. |
| N7 | **Kỳ quan đặt ở rìa bản đồ hoặc chiếm trọn một ô phố**, không nằm trên đường, không đổi mạng đường. Có thể làm **phần thưởng cuối chương** (lộ dần như công trình ở Chương 2). | Giữ thiết kế màn độc lập với cảnh (nguyên tắc 1 của Chương 2). |
| N8 | **Ban đêm là biến thể ánh sáng, dùng tiết chế** (1–2 chương). Mini map và bản đồ lớn vẫn dùng bảng màu dễ đọc. | Ban đêm giảm tương phản, là chủ đề khó làm đẹp và dễ đọc nhất. |
| N9 | **Vật trang trí không được trông giống chướng ngại.** Bò, lạc đà, người tuyết… chỉ đứng trên vỉa hè hoặc trong ô phố, không đứng trên mặt đường. | MVP không có chướng ngại (D-04); người chơi không được hiểu nhầm. |

### 1.1. Cách thể hiện 5 loại đường trong một chủ đề

Mỗi chủ đề phải mô tả đủ 5 loại đường, giữ **độ rộng, vạch kẻ, biển báo** như hiện tại; chỉ đổi chất liệu và cảnh hai bên:

| Loại đường | Phần cố định ở mọi chương | Phần đổi theo chủ đề |
|---|---|---|
| Thường | Độ rộng 46, vạch giữa đứt | Màu nhựa, cảnh hai bên |
| Lớn | Rộng 64, vạch vàng đôi, biển xanh vuông | Hàng cây, nhà cao hai bên |
| Đông | Xe đứng kín hai làn, biển tam giác 2 xe | **Loại xe trên đường** (taxi vàng, tuk-tuk, xe đạp…), cửa hàng hai bên |
| Gồ ghề | Mặt nâu, ổ gà, biển tam giác mấp mô | **Chất liệu** (đá cuội, cát, tuyết lún, đường đất) |
| Hẻm | Hẹp 24, biển tròn cấm ô tô | Kiểu ngõ (ngõ phố cổ, bậc thang, lối xe đạp…) |

### 1.2. Thước đo khi duyệt một chủ đề

> Mục tiêu (BA, 14/10/2026): **càng đẹp càng tốt** — không dừng ở 8 điểm, hướng tới 9,5–10.

| Kiểm tra | Đạt khi |
|---|---|
| Nhìn mờ (nheo mắt / thu nhỏ ảnh) | Vẫn thấy rõ mạng đường và ghim; cảnh lùi về sau |
| Nhận diện | Người chưa biết, xem toàn cảnh 3 giây, đoán đúng vùng/chủ đề |
| Màu | Kiến trúc ≤ 3 màu, nhấn ≤ 2 màu (N4) |
| Tương phản | Ghim và chữ nổi trên nền ở mọi khu (chữ ≥ 12px theo UI-14) |
| Máy thật | Xem trên khung 844×390, cả lúc lái xe và toàn cảnh |
| Đầu chương / cuối chương | Cả hai đều đẹp, cuối chương phải "đầy đủ" rõ rệt hơn đầu chương |

---

## 2. Danh mục 10 chủ đề ban đầu (tham khảo)

Danh mục phân tích ngày 14/10, giữ để tham khảo; chi tiết chính thức theo chương ở **mục 3**. **Cột "Gắn cơ chế" là gợi ý cũ**, trước khi chốt chỉ vận chuyển hàng hóa (D-64) và khung độ khó (D-65). Chủ đề và yếu tố chính thức của từng chương xem **mục 5**.

| # | Chủ đề | Thời điểm | Tông màu | Biểu tượng chính (nhìn từ trên) | Loại đường nổi bật | Gắn cơ chế (gợi ý) | Khó đọc bản đồ | Chi phí hình |
|---|---|---|---|---|---|---|---|---|
| 1 | **Phố cổ Hà Nội** | Sáng | Ấm: vàng, ngói đỏ | Hồ Gươm + Tháp Rùa + cầu Thê Húc | Hẻm, đông | Xe máy vào hẻm | Thấp | Thấp |
| 2 | **New York về đêm** | Đêm | Tối, đèn vàng, neon | Tháp nước trên mái, Central Park, tượng Nữ thần Tự do | Lớn, đông | **Taxi chở khách** | **Cao** | Cao |
| 3 | **Rio de Janeiro** | Chiều nắng | Rực: biển xanh, nhà nhiều màu | Tượng Chúa Cứu Thế hình chữ thập, vỉa hè sóng Copacabana | Hẻm dốc, gồ ghề | Xe máy lên đồi | Trung bình | Trung bình – cao |
| 4 | **Ai Cập – sa mạc sông Nile** | Hoàng hôn | Vàng cát, nâu đất, lam ngọc | Kim tự tháp + Nhân sư | **Gồ ghề (đường cát)** | Chọn xe trên cát | Trung bình | Trung bình |
| 5 | **Paris** | Xuân | Dịu: kem, xám xanh | Khối nhà Haussmann sân trong, tháp Eiffel | Lớn (đại lộ), **gồ ghề (đá cuội)** | Cầu qua sông Seine | Thấp | Trung bình |
| 6 | **Amsterdam – kênh đào** | Ngày dịu | Gạch nâu, nước xanh xám | Vành đai kênh, cầu kéo, cối xay gió | Cầu, hẻm xe đạp | **Cầu đóng/mở theo giờ** | Trung bình | Trung bình – cao |
| 7 | **Kyoto mùa hoa anh đào** | Xuân | Xám, gỗ, hồng anh đào | Dãy cổng torii đỏ, chùa Vàng bên hồ | Hẻm đá | Xe máy vào hẻm | Trung bình | Trung bình |
| 8 | **Santorini (Hy Lạp)** | Hoàng hôn | Trắng, xanh coban | Mái vòm xanh, vách núi lửa ra biển | **Hẻm bậc thang** | Xe máy | Trung bình | Thấp – trung bình |
| 9 | **Làng tuyết Bắc Âu (Lapland)** | Chạng vạng | Trắng tuyết, gỗ đỏ, đèn vàng | Lều băng, rừng thông tuyết | Gồ ghề (tuyết lún) | Chương sự kiện mùa đông | **Cao** | Trung bình |
| 10 | **Ấn Độ – Jaipur & Agra** | Nắng ấm | Hồng đất, trắng ngà | Taj Mahal + vườn chia 4, giếng bậc thang | Đông (chợ), hẻm | Đường đông | Trung bình – cao | Trung bình – cao |

**Danh sách bổ sung** (từ 16/10 đã dùng Dubai, London, Bangkok — mục 5): thảo nguyên Kenya, Thượng Hải về đêm, thành phố tương lai để dự phòng.

---

## 3. Chi tiết 15 chủ đề theo chương

- Mã màu là **giá trị gợi ý**, chỉnh khi làm mockup. Mỗi bảng màu tuân N4: kiến trúc ≤ 3 màu, nhấn ≤ 2 màu; trang trí không dùng **cam** và **xanh dương đậm** (màu loại đường — K10).
- Dòng **"Có trong chương"** liệt kê các yếu tố chơi xuất hiện (tích lũy theo [khung độ khó](level_design/Khung_Do_Kho_Chuong_Man.md) mục 3.2). Loại đường **chưa học thì không vẽ thành đường**; nét đặc trưng của chủ đề liên quan (ví dụ bậc thang Santorini) chỉ làm lối đi bộ trong ô phố, không nối vào mạng đường.
- Thứ tự tông màu và thời điểm theo mục 5.2 (xen kẽ ấm/lạnh).

### 3.1. Chương 1 — Làng ven sông Việt Nam

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | Cơ bản: 1 kho, nhiều điểm giao, chia chuyến, đường lớn (ĐK 1–10) |
| Có trong chương | Đường thường, đường lớn · 1 kho · xe van |
| Cảm giác | Yên bình, gần gũi, buổi sáng trong lành. **Tông lạnh**: xanh lá, mặt nước |
| Bảng màu | Nền: lúa non `#8cc152`, đất bờ `#b99a6b`, sông và ao `#5fa8a0`. Kiến trúc: ngói đỏ cũ `#a8553a`, tường vôi vàng `#e9d9a6`, mái tôn xám xanh `#8a9aa3`. Nhấn: đỏ cờ, đèn lồng ở đình `#d6332e`, vàng rơm `#f2c94c` |
| Kiến trúc (từ trên) | Nhà ba gian mái ngói, **sân gạch phía trước** (ô đỏ nhạt rất rõ từ trên), vườn sau, ao bên cạnh; vài nhà mái bằng mới xen kẽ; cổng làng; đình mái cong |
| Cảnh quan | **Ruộng lúa ô bàn cờ**, **lũy tre bao quanh xóm** (dải xanh đậm), ao cá, sông có bến đò, cây đa đầu làng |
| Loại đường | Thường: đường bê tông liên thôn. Lớn: quốc lộ hoặc đường đê trải nhựa, hàng cây hai bên |
| Thể hiện yếu tố | **Kho:** hợp tác xã, nhà kho mái tôn có sân phơi. Điểm giao: nhà trong xóm, trường làng, trạm y tế |
| Vật trang trí | Trâu trong ruộng (không trên đường — N9), đống rơm, xe đạp ở sân, nón lá |
| Kỳ quan (màn trùm) | **Cây đa + đình làng + bến sông** quanh chợ phiên hoàn chỉnh |
| Kiểu tiến triển | Dựng chợ phiên: lều chợ, nhà văn hóa, bến đò mới… |
| Bộ tài nguyên | A (Đông Nam Á) |
| Rủi ro & xử lý | Nền lúa xanh dễ đơn điệu → ruộng chia ô có bờ đất, xen ao và lũy tre. Đường bê tông sáng nổi rõ trên nền lúa. K5: công trình nằm trong xóm, không đứng giữa ruộng |
| Chi phí | **Thấp** |

### 3.2. Chương 2 — Khu đô thị mới ven đô

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Nhiều kho** (ĐK 6–15) |
| Có trong chương | Đường thường, đường lớn · 1–3 kho · xe van |
| Cảm giác | Mới mẻ, đang lớn lên, nắng chiều. **Tông ấm**: pastel |
| Bảng màu | Nền: cỏ mới trồng `#9ccc65`, đất công trường `#c8a77e`. Kiến trúc: kem `#f3e6c8`, hồng nhạt `#f2c4b8`, mái xám xanh `#9aa8b5`. Nhấn: vàng cần cẩu `#f2b705`, xanh ngọc kính `#7fc8c0` |
| Kiến trúc (từ trên) | Nhà liền kề mái bằng đồng bộ, chung cư thấp tầng, lô đất trống có rào tôn, công trường có cần cẩu |
| Cảnh quan | Đường mới với hàng cây non, hồ điều hòa, công viên nhỏ, bãi cỏ chưa xây |
| Loại đường | Thường: đường nội khu mới. Lớn: đại lộ có dải phân cách trồng cây |
| Thể hiện yếu tố | **Mỗi kho một hình dạng riêng** để phân biệt từ trên: bãi vật liệu (đống cát, đá), kho tổng (nhà kho mái tôn lớn), xưởng gỗ (đống gỗ xếp) |
| Vật trang trí | Xe trộn bê tông đỗ trong lô, đống gạch, biển dự án |
| Kỳ quan (màn trùm) | **Công viên trung tâm + tháp đồng hồ** |
| Kiểu tiến triển | Xây mới. Công trình đã có hình khối ở demo: Tiệm bánh, Trường học, Chợ mới, Bệnh viện (D-59) |
| Bộ tài nguyên | A, B |
| Rủi ro & xử lý | Gần giống Chương 1 về vùng miền → dày, đô thị, pastel, buổi chiều (khác làng thưa, xanh, buổi sáng) |
| Chi phí | **Thấp – trung bình** (dùng lại phần đã làm ở demo) |

### 3.3. Chương 3 — New York về đêm

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Đường đông** (ĐK 11–20) |
| Có trong chương | Đường thường, lớn, **đông** · nhiều kho · xe van |
| Cảm giác | Hiện đại, sôi động, lấp lánh. Khoảng 21 giờ. **Tông lạnh**, ban đêm |
| Bảng màu | Nền: nhựa đêm `#23262d`, vỉa hè xám xanh `#3a4250`. Kiến trúc: mái xám than `#4b5058`, nâu brownstone `#5b4a42`, cửa sổ sáng vàng ấm `#ffd479`. Nhấn: taxi vàng `#f7c517`, neon hồng `#ff4fa3` (chỉ ở khu đường đông) |
| Kiến trúc (từ trên) | Tòa chọc trời mái bằng **lùi tầng bậc thang**; mái có **tháp nước gỗ hình trụ**; dãy brownstone 4–5 tầng |
| Cảnh quan | Ít cây, cây trong hố vuông; **công viên trung tâm** khối xanh chữ nhật có hồ; sông ở rìa với cầu treo trụ đá; ống hơi nước sọc trắng bốc khói |
| Loại đường | Thường: phố có đèn đường. Lớn: Avenue nhiều làn. **Đông: quảng trường màn hình LED, taxi vàng kín làn** |
| Thể hiện yếu tố | Đường đông là nhân vật chính: neon và taxi chỉ ở đường đông, phần còn lại tối và yên |
| Vật trang trí | Taxi đỗ, xe hot dog, vòi cứu hỏa đỏ, quầng sáng đèn đường trên mặt đường |
| Kỳ quan (màn trùm) | **Tượng cầm đuốc** trên đảo ngoài khơi + công viên trung tâm |
| Kiểu tiến triển | Thắp sáng thành phố: mỗi màn thêm một khu lên đèn |
| Bộ tài nguyên | B (đô thị hiện đại) + bộ ánh sáng đêm |
| Rủi ro & xử lý | Ban đêm giảm tương phản → mặt đường sáng hơn nền một bậc, ghim và biển báo có quầng sáng, mini map giữ bảng màu ngày (N8, mục 8.2). Tòa nhà nổi tiếng → vẽ "lấy cảm hứng" (mục 4) |
| Chi phí | **Cao** (bộ ánh sáng đêm) |

### 3.4. Chương 4 — Santorini

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Hạn giao** (ĐK 16–25) |
| Có trong chương | Đường thường, lớn, đông · nhiều kho · hạn giao · xe van |
| Cảm giác | Nghỉ dưỡng, biển, hoàng hôn. **Tông ấm**: cam hồng trên tường trắng |
| Bảng màu | Nền: đá núi lửa nâu xám `#7a6a5e`, biển `#1b8fc4` (mặt nước, không phải trang trí). Kiến trúc: trắng vôi `#f7f2ea` (ánh hồng hoàng hôn), xanh coban `#1f5fae` cho mái vòm, đất nung `#c97b5a`. Nhấn: hoa giấy hồng tím `#c2187f`, vàng nắng chiều `#f2c14e` |
| Kiến trúc (từ trên) | Khối hộp trắng mái bằng hoặc **mái vòm thùng**; **mái vòm xanh nhà thờ**; nhà xếp tầng trên vách; bể bơi trên sân thượng |
| Cảnh quan | **Vách núi lửa đổ ra biển** ở rìa; cối xay gió trắng; **vườn nho cuộn tròn** sát đất; ô liu xám bạc |
| Loại đường | Thường: phố lát đá xám. Lớn: đường ven vách. Đông: phố chợ trung tâm. **Lối bậc thang chỉ là lối đi bộ** trong ô phố (hẻm chưa học) |
| Thể hiện yếu tố | **Hạn giao: bến phà** — phà đậu ở bến, rời bến đúng giờ hạn; đơn có hạn là hàng phải kịp chuyến phà |
| Vật trang trí | Lừa (trong ô phố), bàn ghế xanh trắng, chậu hoa giấy, thuyền buồm |
| Kỳ quan (màn trùm) | **Nhà thờ ba mái vòm xanh** |
| Kiểu tiến triển | Chuẩn bị mùa du lịch: sơn lại nhà, mở quán, dựng cối xay |
| Bộ tài nguyên | D (Địa Trung Hải) |
| Rủi ro & xử lý | Trắng chói → mặt đường đá tối, bóng đổ rõ, ghim viền tối (mục 8.2). Mái vòm xanh coban gần màu đường lớn trên mini map → mái vòm chỉ ở công trình, không rải đều |
| Chi phí | **Thấp – trung bình** |

### 3.5. Chương 5 — Phố cổ Hà Nội

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Hẻm + xe máy** (ĐK 21–30) |
| Có trong chương | Đường thường, lớn, đông, **hẻm** · nhiều kho · hạn giao · xe van, **xe máy** |
| Cảm giác | Hoài cổ, nhộn nhịp dần lên. **Sáng sớm có sương — tông lạnh** |
| Bảng màu | Nền: xanh rêu `#6f8f5a`, mặt hồ xanh xám sương `#7fa39a`. Kiến trúc: vàng Hà Nội nhạt dưới sương `#e2cf95`, ngói nâu đỏ trầm `#8f5040`, mái bằng xám be `#cfc9bc`. Nhấn: đỏ cầu Thê Húc, đèn lồng `#d6332e`, lục ngọc mặt hồ dưới nắng sớm `#6aa68a` |
| Kiến trúc (từ trên) | **Nhà ống** hẹp sâu (tỉ lệ khoảng 1:5) liền kề; mái ngói âm dương xen sân thượng có **bồn nước inox tròn**; giếng trời; khu phố Tây có biệt thự vàng mái ngói đỏ |
| Cảnh quan | Hàng cây sấu, bàng tán tròn; Hồ Gươm làm khoảng thở giữa bản đồ; sông Hồng ở rìa. Không vẽ dây điện |
| Loại đường | Thường: phố nhỏ có cây. Lớn: đại lộ hàng cây. Đông: **phố hàng**, xe máy kín. **Hẻm: ngõ nhỏ chỉ xe máy** |
| Thể hiện yếu tố | Hẻm là nhân vật chính; biển cấm ô tô ở đầu ngõ; xe máy đỗ dọc ngõ làm dấu hiệu |
| Vật trang trí | Gánh hàng rong đội nón lá, ghế nhựa quán trà đá, ô dù quán cà phê (chỉ ở đường đông, 1–2 màu) |
| Kỳ quan (màn trùm) | **Hồ Gươm + Tháp Rùa + cầu Thê Húc** |
| Kiểu tiến triển | Phục dựng phố nghề: mỗi màn một phố hàng mở lại |
| Bộ tài nguyên | A, F |
| Rủi ro & xử lý | Phố hàng dễ rối → ô dù, mái hiên 1–2 màu. Sương chỉ là lớp ánh sáng nhẹ, không làm mờ đường và ghim |
| Chi phí | **Thấp** |

### 3.6. Chương 6 — Ai Cập, sông Nile

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Đường gồ ghề + xe tải** (ĐK 26–35) |
| Có trong chương | Đường thường, lớn, đông, hẻm, **gồ ghề** · nhiều kho · hạn giao · xe van, máy, **tải** |
| Cảm giác | Nóng khô, cổ kính. Hoàng hôn cam, bóng dài. **Tông ấm** |
| Bảng màu | Nền: cát `#e6c88f`. Kiến trúc: gạch bùn `#c9955c`, đá vôi kem `#efe2c4`, nâu đất tối `#7a5a3c`. Cây cọ, ruộng ven sông `#3f8f4a`, sông Nile `#2f8f83`. Nhấn: lam ngọc mái vòm `#2a9d8f`, vàng kim `#d4a017` |
| Kiến trúc (từ trên) | Nhà mái bằng khối hộp màu đất, mái có cột thép nhô; mái vòm + tháp tròn nhỏ; nhà sân trong |
| Cảnh quan | Không có cỏ; cọ chà là theo cụm; **sông Nile có dải ruộng xanh hai bên**; thuyền buồm trắng; cồn cát ở rìa |
| Loại đường | Thường: phố đất nện. Lớn: đại lộ ven sông. Đông: chợ có mái vải. Hẻm: ngõ chợ. **Gồ ghề: đường cát** |
| Thể hiện yếu tố | Đường cát là nhân vật chính; **xe tải chở đá** từ công trường khai quật — khu khai quật là kho |
| Vật trang trí | Lạc đà (ngoài đường), xe lừa, tuk-tuk, thảm phơi trên mái, chum gốm |
| Kỳ quan (màn trùm) | **Kim tự tháp + tượng Nhân sư** |
| Kiểu tiến triển | **Khai quật**: gò cát có rào → lộ dần tượng, đền, kim tự tháp |
| Bộ tài nguyên | E (sa mạc) |
| Rủi ro & xử lý | Cùng tông vàng nâu → mặt đường nhựa tối, vỉa hè đá sáng, dùng xanh (cây, sông) để tách; ghim viền tối (mục 8.2) |
| Chi phí | **Trung bình** |

### 3.7. Chương 7 — Rio de Janeiro

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Ngõ cụt, quay đầu** (ĐK 31–40) |
| Có trong chương | Đường thường, lớn, đông, hẻm, gồ ghề, **ngõ cụt** · 3 xe |
| Cảm giác | Nhiệt đới, núi gặp biển. **Buổi sáng, tông lạnh**: biển xanh |
| Bảng màu | Nền: cỏ nhiệt đới đậm `#3f7f4a`, cát `#f2dca4`, biển xanh ngọc `#2bb3c0`. Kiến trúc: trắng kem `#f4efe4`, ngói đỏ `#b8563a`, **favela tối đa 3 màu**: vàng `#f2c94c`, xanh lá `#6fcf97`, hồng san hô `#f28b82` (chỉ ở một khu đồi). Nhấn: vàng – xanh lá |
| Kiến trúc (từ trên) | **Favela trên sườn đồi**: khối hộp chồng xếp, mái có **bồn nước nhựa xanh**; căn hộ trắng ven biển có bể bơi; nhà thuộc địa mái ngói |
| Cảnh quan | **Vỉa hè sóng đen trắng** dọc bờ biển; cọ cao; dù bãi biển; đồi rừng ở rìa |
| Loại đường | Thường: phố ngói đỏ. Lớn: đại lộ ven biển. Đông: phố trung tâm. Hẻm: ngõ dốc favela. Gồ ghề: đường đất lên đồi |
| Thể hiện yếu tố | **Ngõ cụt**: đường lên đồi tận cùng ở sườn núi, đường ven biển cụt ở mũi đá; rào "chưa thông xe" ở đoạn đang làm |
| Vật trang trí | Dù bãi biển, xe nước dừa, cáp treo, cầu thang gạch men nhiều màu (một điểm) |
| Kỳ quan (màn trùm) | **Núi đá ven biển + cáp treo** và vỉa hè sóng. **Không dùng tượng Chúa Cứu Thế** (rủi ro quyền hình ảnh — mục 4) |
| Kiểu tiến triển | Chuẩn bị lễ hội diễu hành: dựng khán đài, trang trí phố |
| Bộ tài nguyên | D |
| Rủi ro & xử lý | Nhiều màu → favela chỉ ở một khu đồi. Địa hình đồi chỉ là trang trí (đường chơi vẫn phẳng) |
| Chi phí | **Trung bình – cao** |

### 3.8. Chương 8 — Paris

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Khu cấm tải** (ĐK 36–45) |
| Có trong chương | Mọi loại đường · ngõ cụt · **khu cấm tải** · 3 xe |
| Cảm giác | Thanh lịch, cổ điển. Chiều xuân nắng dịu. **Tông ấm**: kem |
| Bảng màu | Nền: cỏ xanh dịu `#8fae6b`, sỏi vườn `#d9cfb8`. Kiến trúc: đá vôi kem `#e9dfc8`, mái kẽm xám xanh `#7d8b99`, ống khói đất nung `#c67b5c`. Nhấn: mái hiên café đỏ đô `#9b2335`, vàng đồng `#c9a227` |
| Kiến trúc (từ trên) | **Khối nhà chiếm trọn ô, có sân trong**; mái Mansard kẽm với hàng ống khói đều; **góc nhà vát chéo** ở giao lộ |
| Cảnh quan | Đại lộ hai hàng cây; vườn đối xứng; sông có cầu đá và thuyền |
| Loại đường | Thường: phố đá kem. Lớn: đại lộ hai hàng cây. Đông: phố café. Hẻm: passage lát đá. **Gồ ghề: đá cuội** |
| Thể hiện yếu tố | **Khu cấm tải: đảo giữa sông và khu phố cổ** — biển cấm tải ở mọi lối vào, mặt đường lát đá màu khác nhẹ để nhận ra vùng |
| Vật trang trí | Bàn café tròn, ki-ốt báo, cột quảng cáo tròn, cửa metro, xe đạp |
| Kỳ quan (màn trùm) | **Tháp sắt** (chỉ cảnh ngày — đèn đêm có bản quyền) + khối nhà sân trong |
| Kiểu tiến triển | Trùng tu: giàn giáo gỡ dần khỏi các công trình |
| Bộ tài nguyên | C (châu Âu cổ) |
| Rủi ro & xử lý | Quảng trường hình sao không hợp lưới → chỉ trang trí trong ô. Tránh công trình hiện đại còn bản quyền (mục 4) |
| Chi phí | **Trung bình** |

### 3.9. Chương 9 — Amsterdam, kênh đào

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Cầu đóng/mở theo giờ** (ĐK 41–50) |
| Có trong chương | Mọi loại đường · ngõ cụt · khu cấm tải · **cầu đóng/mở** · 3 xe |
| Cảm giác | Thanh bình, sông nước, xe đạp. Ngày nhiều mây. **Tông lạnh** |
| Bảng màu | Nền: cỏ `#7fa35f`, nước kênh xanh xám `#5f8fa3`. Kiến trúc: gạch nâu đỏ `#8a4a3a`, gạch nâu đậm `#4d3a33`, viền trắng `#f0ece4`. Nhấn: tulip đỏ `#d64545` và vàng `#f2c94c` (chỉ ở đồng hoa ngoại ô) |
| Kiến trúc (từ trên) | **Nhà kênh hẹp, mái dốc nhọn** sát nhau dọc kênh, mái vuông góc với kênh; nhà thuyền dọc kênh |
| Cảnh quan | **Vành đai kênh** chạy giữa các ô (không thay đường); hàng cây ven kênh; **cối xay gió + đồng tulip** ở ngoại ô |
| Loại đường | Thường: đường ven kênh lát gạch. Lớn: đại lộ có tàu điện. Đông: phố mua sắm. Hẻm: lối xe đạp. Gồ ghề: gạch lát cũ |
| Thể hiện yếu tố | **Cầu kéo gỗ trắng** nâng cho thuyền qua theo giờ; có đồng hồ báo trước ở đầu cầu |
| Vật trang trí | Bãi xe đạp, thuyền, tàu điện, chậu hoa |
| Kỳ quan (màn trùm) | **Vành đai kênh + cối xay gió** |
| Kiểu tiến triển | Dựng lại cầu và cối xay |
| Bộ tài nguyên | C |
| Rủi ro & xử lý | Kênh không được giống đường: nước có gợn, bờ kè đá, không vạch kẻ |
| Chi phí | **Trung bình – cao** (nước, cầu kéo có chuyển động) |

### 3.10. Chương 10 — Thành phố cảng châu Á

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Hàng về kho theo đợt** (ĐK 46–55) |
| Có trong chương | Mọi loại đường · ngõ cụt · khu cấm tải · cầu đóng/mở · **hàng về theo đợt** · 3 xe |
| Cảm giác | Năng động, nhộn nhịp buôn bán, vịnh và đồi. Bình minh. **Tông ấm** |
| Bảng màu | Nền: bê tông cảng `#b8b2a7`, nước vịnh `#4f8fa8`, đồi xanh `#5e8f5a`. Kiến trúc: kính xám xanh `#8ea3b0`, nhà phố cũ kem `#e8dcc4`, mái đỏ gạch `#b5583e`. Nhấn: container đỏ gạch `#c0392b` và xanh lá `#2e8b57` (không dùng container cam, xanh dương — trùng màu loại đường) |
| Kiến trúc (từ trên) | Tháp cao tầng sát nhau, mái có sân đỗ trực thăng; phố cũ mái ngói; **bãi container xếp lưới** (rất đặc trưng từ trên); cần cẩu giàn |
| Cảnh quan | Vịnh có phà; đồi phía sau; cầu dây văng vượt biển |
| Loại đường | Thường: phố cũ. Lớn: đường ven cảng. Đông: phố chợ biển hiệu. Hẻm: ngõ chợ cũ. Gồ ghề: bãi cảng phủ tấm thép |
| Thể hiện yếu tố | **Hàng về theo đợt: tàu container cập bến đúng giờ** (thấy tàu tiến vào ở màn chuẩn bị, giờ cập ghi ở bến); ga tàu hàng làm kho thứ hai. Ngõ cụt: cầu tàu. Cấm tải: phố cổ. Cầu đóng/mở: cầu nâng qua kênh cảng |
| Vật trang trí | Xe nâng trong bãi, phà, thuyền đánh cá, xe đẩy hàng |
| Kỳ quan (màn trùm) | **Cụm cần cẩu giàn + cầu dây văng** |
| Kiểu tiến triển | Mở rộng cảng: thêm bến, thêm cần cẩu |
| Bộ tài nguyên | B |
| Rủi ro & xử lý | Container nhiều màu → giới hạn 2 màu. Tòa nhà nổi tiếng → không vẽ theo công trình thật, cách điệu chung (mục 4) |
| Chi phí | **Trung bình – cao** |

### 3.11. Chương 11 — Bangkok, chợ nổi

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Hàng tươi — hạn tính từ lúc lấy** (ĐK 51–60) |
| Có trong chương | Mọi loại đường và yếu tố trước · **hàng tươi** · 3 xe |
| Cảm giác | Nhiệt đới, sông nước, chợ sáng sớm. **Tông lạnh**: kênh xanh |
| Bảng màu | Nền: xanh lá nhiệt đới `#5a9e4b`, nước kênh xanh lục `#4f9e8a`. Kiến trúc: gỗ nâu `#8a5a3c`, mái tôn đỏ gỉ `#a4503a`, tường trắng `#f1ede4`. Nhấn: vàng mái chùa `#e3b23c`, hồng trái cây và hoa `#e0607e` |
| Kiến trúc (từ trên) | Nhà sàn gỗ ven kênh mái dốc; **chùa mái nhiều tầng chồng hình chữ thập**; dãy shophouse |
| Cảnh quan | Mạng kênh chạy giữa các ô; **thuyền bán hàng đội nón** (chấm tròn từ trên); dừa, chuối |
| Loại đường | Thường: phố shophouse. Lớn: đường ven sông. Đông: phố chợ có tuk-tuk. Hẻm: ngõ "soi". Gồ ghề: đường đất ven kênh |
| Thể hiện yếu tố | **Hàng tươi: sạp trái cây, hải sản trên thuyền** — thùng đá xanh nhạt ở điểm lấy. Cầu đóng/mở: cầu nâng qua kênh lớn. Hàng về theo đợt: thuyền hàng cập bến. Cấm tải: khu chùa |
| Vật trang trí | Thuyền chợ, xe đẩy bán hàng, cây đa có dải vải màu |
| Kỳ quan (màn trùm) | **Chùa mái vàng + chợ nổi** |
| Kiểu tiến triển | Lễ hội nước: dựng bến, trang trí kênh |
| Bộ tài nguyên | A |
| Rủi ro & xử lý | Nhiều kênh → kênh không giống đường (bờ kè, gợn nước). Chợ nổi nhiều màu → chỉ 2 màu nhấn |
| Chi phí | **Trung bình** |

### 3.12. Chương 12 — Kyoto mùa hoa anh đào

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Đơn theo chuỗi** (ĐK 56–65) |
| Có trong chương | Mọi loại đường và yếu tố trước · **đơn theo chuỗi** · 3 xe |
| Cảm giác | Tĩnh lặng, tinh tế. Chiều xuân. **Tông ấm**: hồng anh đào, gỗ |
| Bảng màu | Nền: rêu `#7aa35a`, sỏi trắng `#e7e3d8`. Kiến trúc: ngói xám ánh xanh `#5d6470`, gỗ nâu `#7a5134`, tường trắng `#f2efe8`. Nhấn: hồng anh đào `#f7b6c8`, đỏ son cổng torii `#d1382c` |
| Kiến trúc (từ trên) | Nhà gỗ mặt tiền hẹp mái ngói xám; **đền chùa mái cong rộng có sân sỏi**; **tháp năm tầng** (ô vuông lồng nhau) |
| Cảnh quan | **Cây anh đào tán hồng** thay cây xanh; vườn thiền sỏi cào; ao cá; rừng trúc |
| Loại đường | Thường: phố gỗ. Lớn: đại lộ ven sông. Đông: phố mua sắm có mái che. Hẻm: ngõ đá. Gồ ghề: đường sỏi trong vườn, đường núi |
| Thể hiện yếu tố | **Đơn theo chuỗi: chuẩn bị lễ hội hoa theo thứ tự** — xưởng đèn lồng → đền → quán trà. Đường đóng theo giờ: đoàn rước lễ hội chặn phố (thay cầu kéo). Cấm tải: khu đền |
| Vật trang trí | Đèn lồng đá, xe kéo, xe đạp |
| Kỳ quan (màn trùm) | **Dãy cổng torii đỏ nối nhau + chùa vàng bên hồ** |
| Kiểu tiến triển | Lễ hội hoa: treo đèn lồng, dựng lều hội |
| Bộ tài nguyên | F (châu Á cổ) |
| Rủi ro & xử lý | Mái xám trùng màu đường → mái ánh xanh hoặc đường sáng hơn. Cánh hoa rơi chỉ là hiệu ứng thưa, không gần ngã tư (K10) |
| Chi phí | **Trung bình** |

### 3.13. Chương 13 — Thành phố sa mạc hiện đại (cách điệu Dubai)

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Xe đầu kéo** (ĐK 61–70) |
| Có trong chương | Mọi loại đường và yếu tố trước · **4 xe** |
| Cảm giác | Tương lai, xa hoa, rộng lớn. **Ban đêm, tông lạnh** (chương đêm thứ hai) |
| Bảng màu | Nền: cát đêm `#3b3542`, nhựa đường `#22252b`. Kiến trúc: kính xanh đêm `#2f4a5c`, đá be dưới đèn `#8c7d68`, mái trắng `#c9cfd6`. Nhấn: đèn vàng ấm `#ffd479`, xanh ngọc đèn LED `#33d1c6` |
| Kiến trúc (từ trên) | Tháp chọc trời mảnh, tháp xoắn; **phố cổ mái bằng có tháp gió vuông**; trung tâm thương mại mái lớn |
| Cảnh quan | Đảo nhân tạo ngoài biển; cồn cát ở rìa; cọ trồng theo hàng; lạch nước có thuyền gỗ |
| Loại đường | Thường: phố mới. Lớn: **xa lộ nhiều làn** (rộng, nhiều vạch). Đông: khu chợ vàng. Hẻm: ngõ phố cổ. Gồ ghề: đường cát |
| Thể hiện yếu tố | **Đầu kéo chở container chạy trên xa lộ** nối cảng với khu công nghiệp — chỉ xa lộ là chở được hàng lớn. Cầu đóng/mở: cầu nâng qua lạch. Ngõ cụt: đường trên đảo nhân tạo |
| Vật trang trí | Xe sang đỗ, thuyền gỗ ở lạch, đèn cây cọ |
| Kỳ quan (màn trùm) | **Đảo hình cây cọ** (cách điệu, không dùng tên thật) |
| Kiểu tiến triển | Xây thành phố tương lai: đảo mọc dần ngoài biển |
| Bộ tài nguyên | B, E |
| Rủi ro & xử lý | Ban đêm → theo quy tắc chương New York (mục 8.2). Không vẽ tòa tháp cao nhất thế giới hay đảo thật theo đúng hình (mục 4) |
| Chi phí | **Cao** |

### 3.14. Chương 14 — London

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | Không thêm — **tổng hợp** (ĐK 66–75) |
| Có trong chương | Mọi yếu tố · 4 xe |
| Cảm giác | Cổ kính, đô hội. Chiều nắng vàng sau mưa. **Tông ấm**: gạch đỏ, đèn vàng |
| Bảng màu | Nền: cỏ công viên `#6f9a52`, nhựa xám `#5a5d63`, sông xám xanh `#6c8a94`. Kiến trúc: gạch đỏ `#9c4a3a`, đá kem `#e3dccb`, mái đá phiến xám `#5e6670`. Nhấn: đỏ xe buýt, hộp thư `#c8202f`, vàng đèn `#f2c14e` |
| Kiến trúc (từ trên) | Dãy nhà liền kề mái dốc với **hàng ống khói**; **quảng trường vườn kín** giữa ô phố; nhà ga mái vòm kính |
| Cảnh quan | Sông uốn khúc, công viên lớn có hồ, cầu đá |
| Loại đường | Thường: phố nhà liền kề. Lớn: đường ven sông. **Đông: phố mua sắm, xe buýt đỏ hai tầng**. Hẻm: ngõ lát đá. Gồ ghề: đá cuội chợ cũ |
| Thể hiện yếu tố | Cầu đóng/mở: cầu tháp đôi nâng nhịp giữa. Cấm tải: khu trung tâm. Ngõ cụt: ngõ lát đá. Hàng về theo đợt: ga hàng. Xa lộ: đường vành đai ở mép bản đồ |
| Vật trang trí | Hộp thư đỏ, buồng điện thoại, taxi đen, xe đạp |
| Kỳ quan (màn trùm) | **Tháp đồng hồ + cầu tháp đôi** (công trình cổ, cách điệu) |
| Kiểu tiến triển | Hội chợ thành phố |
| Bộ tài nguyên | C |
| Rủi ro & xử lý | Dễ xám ảm đạm → chiều nắng vàng; nhấn đỏ chỉ ở xe buýt và hộp thư |
| Chi phí | **Trung bình** |

### 3.15. Chương 15 — Jaipur & Agra

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | Không thêm — **tổng hợp đỉnh** (ĐK 71–80) |
| Có trong chương | Mọi yếu tố · 4 xe |
| Cảm giác | Lộng lẫy, thiêng liêng, kết thúc hành trình. **Bình minh, tông lạnh**: trắng ngà, mặt nước |
| Bảng màu | Nền: sân đá đỏ dịu `#b98a6e`, mặt nước `#7fa8b0`, vườn `#5f9e4b`. Kiến trúc: **trắng ngà cẩm thạch** `#f4efe6`, hồng đất dịu `#d9a08f`, đá đỏ `#a8553a`. Nhấn: vàng nghệ hoa vạn thọ `#e0a800` (không dùng cam — trùng màu đường đông), xanh ngọc `#16a085` |
| Kiến trúc (từ trên) | Nhà mái bằng có **đình nhỏ mái vòm ở góc mái**; tường thành hồng răng cưa; nhà sân trong |
| Cảnh quan | **Vườn chia bốn có kênh nước**; **giếng bậc thang** (hình vuông bậc lồng nhau); cây đa; sông Yamuna ở rìa |
| Loại đường | Thường: phố hồng. Lớn: đại lộ. Đông: chợ mái che nhiều màu. Hẻm: ngõ chợ. Gồ ghề: đường đất làng |
| Thể hiện yếu tố | Cầu đóng/mở: cầu phao qua sông. Đường đóng theo giờ: đoàn rước lễ hội. Xa lộ: đường vành đai. Cấm tải: khu cung điện. Hàng tươi: chợ hoa vạn thọ |
| Vật trang trí | Tuk-tuk, xe bò, bò nằm trên vỉa hè (không lên đường — N9), sạp hoa, voi ở cung điện |
| Kỳ quan (màn trùm) | **Taj Mahal + vườn chia bốn + hồ phản chiếu** — kỳ quan lớn nhất game. Cảnh kết chuyển sang tối, đèn dầu thắp sáng khắp thành phố |
| Kiểu tiến triển | Lễ hội ánh sáng |
| Bộ tài nguyên | E, F |
| Rủi ro & xử lý | Rất nhiều màu → nền chỉ 2 tông (hồng đất dịu, trắng ngà), màu rực chỉ ở khu chợ |
| Chi phí | **Trung bình – cao** |

### 3.16. Chương sự kiện — Làng tuyết Bắc Âu (ngoài 15 chương)

| Hạng mục | Nội dung |
|---|---|
| Cảm giác | Ấm áp giữa giá lạnh, cổ tích, lễ hội cuối năm. Chạng vạng xanh tím, đèn vàng |
| Bảng màu | Nền: tuyết trắng xanh `#eef4fa`, bóng tuyết `#c5d6e8`. Kiến trúc: gỗ đỏ `#8e2c22`, gỗ vàng đất `#c99a3e`. Rừng thông `#2f5141`. Nhấn: đèn vàng ấm `#ffcf6b`, cực quang (chỉ ở rìa hoặc màn kết quả) |
| Kiến trúc (từ trên) | Nhà gỗ đỏ mái dốc phủ tuyết, ống khói bốc khói; lều băng; lều kính |
| Loại đường | Thường: đường đã cào tuyết, bờ tuyết thay vỉa hè. Lớn: đường chính có cột đèn. Đông: chợ Giáng sinh. Gồ ghề: tuyết lún. Hẻm: đường xe trượt |
| Kỳ quan | Làng Ông già Noel, nhà thờ gỗ |
| Yếu tố | Tùy thời điểm mở sự kiện (chọn yếu tố người chơi đã học) |
| Rủi ro & xử lý | Nền trắng → đường tối, ghim viền tối; chạng vạng xử lý như ban đêm (N8) |
| Chi phí | **Trung bình** |

---

## 4. Rủi ro pháp lý khi dùng kỳ quan, công trình nổi tiếng

> Không phải tư vấn pháp lý — cần bộ phận pháp lý kiểm tra trước khi làm hình chính thức.

| Tình huống | Ví dụ (cần kiểm tra lại) | Cách giảm rủi ro |
|---|---|---|
| Công trình có đăng ký nhãn hiệu hình ảnh | Một số tòa nhà ở New York (vd Empire State Building) | Vẽ "lấy cảm hứng": giữ tinh thần, đổi chi tiết, không dùng tên thật |
| Chủ sở hữu đòi quyền hình ảnh | Có thông tin Tổng giáo phận Rio đòi cấp phép khi dùng hình tượng Chúa Cứu Thế cho mục đích thương mại | Tượng cách điệu chung chung, hoặc xin phép |
| Ánh sáng/thiết kế còn bản quyền | Hệ thống đèn đêm tháp Eiffel; công trình hiện đại ở Pháp (vd kim tự tháp kính Louvre); Pháp chỉ cho phép tự do chụp, vẽ công trình nơi công cộng với mục đích phi thương mại | Chỉ dùng cảnh ngày; tránh công trình hiện đại còn bản quyền |
| Công trình cổ | Kim tự tháp, Taj Mahal, Tháp Rùa, chùa Kyoto | Thường an toàn hơn, vẫn nên kiểm tra quy định từng nước |

**Đề xuất:** đặt **tên chương hư cấu, gợi vùng** (vd "Thành phố không ngủ", "Thành phố biển và núi") và dùng **kỳ quan cách điệu**. Vừa giảm rủi ro, vừa tự do thiết kế hơn.

---

## 5. Bố cục 15 chương (đã chốt 16/10/2026)

### 5.1. Tiêu chí chọn chủ đề

| # | Tiêu chí | Lý do |
|---|---|---|
| TĐ-1 | **Yếu tố mới của chương là thứ có thật ở nơi đó** (cầu kéo ở Amsterdam, hẻm và xe máy ở Hà Nội) | Người chơi hiểu luật mới bằng trực giác (D-15) |
| TĐ-2 | **Vẽ được đủ mọi yếu tố đã học** ở các chương trước | Yếu tố tích lũy dần (khung độ khó mục 3.2) |
| TĐ-3 | **Hai chương liền nhau khác rõ** về tông màu (ấm/lạnh), thời điểm trong ngày, vùng địa lý | Mỗi chương là "đến một nơi mới" |
| TĐ-4 | **Dùng chung bộ tài nguyên** với 2–3 chương khác (mục 6.1) | Game nhẹ (PV-04), làm nhanh |
| TĐ-5 | **Kỳ quan nhận ra được từ trên xuống** (N3), chiếm trọn ô phố (N7) | Kỳ quan là phần thưởng màn trùm |
| TĐ-6 | **Ít rủi ro pháp lý**: tên chương hư cấu, kỳ quan cách điệu (mục 4) | CĐ-Q2 |
| TĐ-7 | **Mỗi chủ đề một kiểu tiến triển** (xây mới, khai quật, chuẩn bị lễ hội…) | Tránh câu chuyện lặp 15 lần |

### 5.2. Bảng phân bổ

| Ch. | Yếu tố mới (khung độ khó) | Chủ đề | Vì sao khớp yếu tố | Tông · thời điểm | Kỳ quan (màn trùm) | Kiểu tiến triển | Bộ tài nguyên |
|---|---|---|---|---|---|---|---|
| 1 | Cơ bản, 1 kho | **Làng ven sông Việt Nam** | Hợp tác xã làm kho, giao các nhà trong làng; quốc lộ = đường lớn | Lạnh (xanh lá, nước) · sáng | Cây đa, đình làng, bến sông | Dựng chợ phiên | A |
| 2 | Nhiều kho | **Khu đô thị mới ven đô** | Bãi vật liệu, kho tổng, xưởng gỗ | Ấm (pastel) · chiều | Công viên, tháp đồng hồ | Xây mới | A, B |
| 3 | Đường đông | **New York về đêm** | Phố đông xe, taxi vàng kín làn | Lạnh · **đêm** | Tượng cầm đuốc, công viên trung tâm | Thắp sáng thành phố | B |
| 4 | Hạn giao | **Santorini** | Giao kịp trước khi phà rời bến | Ấm · hoàng hôn | Nhà thờ ba mái vòm xanh | Chuẩn bị mùa du lịch | D |
| 5 | Hẻm + xe máy | **Phố cổ Hà Nội** | Ngõ nhỏ, xe máy | Lạnh (sương sớm, hồ xanh rêu) · sáng sớm | Hồ Gươm, Tháp Rùa, cầu Thê Húc | Phục dựng phố nghề | A, F |
| 6 | Gồ ghề + xe tải | **Ai Cập – sông Nile** | Đường cát; xe tải chở đá | Ấm (vàng cát) · hoàng hôn | Kim tự tháp, Nhân sư | Khai quật | E |
| 7 | Ngõ cụt, quay đầu | **Rio de Janeiro** | Phố đồi dốc, đường cụt ra biển | Lạnh (biển xanh) · sáng | Núi đá ven biển, vỉa hè sóng | Chuẩn bị lễ hội diễu hành | D |
| 8 | Khu cấm tải | **Paris** | Khu trung tâm cổ cấm tải; đá cuội = gồ ghề | Ấm (kem, mái kẽm) · chiều xuân | Tháp sắt (chỉ cảnh ngày), khối nhà sân trong | Trùng tu | C |
| 9 | Cầu đóng/mở theo giờ | **Amsterdam** | Cầu kéo trên kênh | Lạnh (gạch nâu, nước xám xanh) · ngày mây | Vành đai kênh, cối xay gió | Dựng lại cầu, cối xay | C |
| 10 | Hàng về kho theo đợt | **Thành phố cảng châu Á** (cách điệu Hồng Kông, Thượng Hải) | Tàu container cập cảng theo giờ | Ấm (bình minh cam) · bình minh | Cần cẩu cảng, cầu vượt biển | Mở rộng cảng | B |
| 11 | Hàng tươi (hạn tính từ lúc lấy) | **Bangkok – chợ nổi** | Trái cây, hải sản giao nhanh | Lạnh (kênh xanh) · sáng sớm | Chùa mái vàng, chợ nổi | Lễ hội nước | A |
| 12 | Đơn theo chuỗi | **Kyoto mùa hoa anh đào** | Giao theo thứ tự nghi lễ (A → B → C) | Ấm (hồng anh đào, gỗ) · chiều | Dãy cổng torii đỏ, chùa vàng bên hồ | Lễ hội hoa | F |
| 13 | Xe đầu kéo | **Thành phố sa mạc hiện đại** (cách điệu Dubai) | Xa lộ nhiều làn, chỉ đầu kéo chở nổi | Lạnh (kính, đèn) · **đêm** | Đảo hình cây cọ | Xây thành phố tương lai | B, E |
| 14 | Không thêm — tổng hợp | **London** | Đủ yếu tố: xe buýt đỏ trên đường đông, cầu kéo, phố cổ cấm tải, đá cuội | Ấm (gạch đỏ, đèn vàng) · chiều | Tháp đồng hồ, cầu tháp đôi | Hội chợ thành phố | C |
| 15 | Không thêm — tổng hợp đỉnh | **Jaipur & Agra** | Chợ đông, hẻm, đường đất, sông và cầu | Lạnh (trắng ngà, mặt nước) · bình minh | **Taj Mahal + vườn chia bốn** — kỳ quan lớn nhất game | Lễ hội ánh sáng | E, F |
| Sự kiện | — | Làng tuyết Bắc Âu | — | Chạng vạng | Làng Ông già Noel | — | — |

- Tông màu **xen kẽ ấm/lạnh** suốt 15 chương. **Chỉ 2 chương ban đêm** (3 và 13), cách xa nhau (N8).
- Giữ đủ 5 chủ đề CĐ-Q1, dùng cả 4 dự phòng, thêm Làng ven sông, Khu đô thị mới, Cảng châu Á, Bangkok, Dubai, London.
- Tên chương hư cấu (CĐ-Q2) đặt khi làm mockup từng chương.

### 5.3. Thể hiện các yếu tố đã học (TĐ-2)

| Yếu tố | Học ở chương | Chủ đề khó thể hiện | Cách xử lý |
|---|---|---|---|
| Đường đông | 3 | — | Đổi loại xe đứng trên đường theo chủ đề (tuk-tuk, xe buýt đỏ…) |
| Hẻm | 5 | Ai Cập, Dubai (6, 13) | Lối đi trong khu chợ cổ, phố cổ |
| Gồ ghề | 6 | Amsterdam, Kyoto (9, 12) | Đá cuội, đường đất trong vườn |
| Ngõ cụt | 7 | — | Rào "chưa thông xe" dùng được ở mọi chủ đề |
| Khu cấm tải | 8 | — | Biển cấm tải dùng chung |
| Cầu đóng/mở | 9 | Bangkok, Dubai (11, 13) | Cả hai có kênh hoặc lạch nước |
| Hàng về theo đợt | 10 | — | Ga tàu, bến thuyền, xe hàng tùy chủ đề |
| Đầu kéo (xa lộ) | 13 | London, Jaipur (14, 15) | Đường vành đai ven ngoài bản đồ |

### 5.4. Rủi ro còn lại

| Rủi ro | Chương | Cách giảm |
|---|---|---|
| Pháp lý: tượng Chúa Cứu Thế, công trình Dubai, đèn đêm tháp Eiffel | 7, 13, 8 | Rio dùng núi đá thay tượng; Dubai dùng đảo cách điệu; Paris chỉ cảnh ngày |
| Ban đêm khó đọc | 3, 13 | Theo quy tắc đã kiểm chứng ở mockup New York (mục 8.2) |
| Hai chương Việt Nam liền nhau | 1–2 | Làng thưa, xanh, buổi sáng ↔ đô thị dày, pastel, buổi chiều |
| "Chuẩn bị lễ hội" lặp | 7, 11, 12 | Khác hình thức: diễu hành, lễ hội nước, hoa |

---

## 6. Ảnh hưởng tới cách làm

| Hạng mục | Nội dung |
|---|---|
| Dữ liệu | Mỗi chương có một **cấu hình chủ đề**: bảng màu, bộ khối nhà (mái, kích thước), bộ vật trang trí, chất liệu 5 loại đường, kỳ quan, ánh sáng. Bộ sinh cảnh trong [mockups/khung_pho_v3.html](mockups/khung_pho_v3.html) đã tách quy hoạch khu / kiểu mặt tiền / bảng màu, có thể mở rộng thành cấu hình theo chủ đề. |
| Hình 3D low-poly | Mỗi chủ đề ước lượng: 8–12 mẫu nhà (dùng chung khối, đổi mái/vật liệu), 10–15 vật trang trí, 1–2 kỳ quan, 1 bộ mặt đất + 5 chất liệu đường, 1 thiết lập ánh sáng. |
| Không đổi | Mạng đường, ký hiệu, biển báo, ghim, giao diện điều khiển, mini map (N1). |

### 6.1. Bộ tài nguyên dùng chung (TĐ-4)

Mỗi chương = **một hoặc hai bộ dùng chung** + bảng màu riêng + kỳ quan + các công trình riêng của chương. Không làm 15 bộ riêng.

| Bộ | Gồm | Dùng cho chương |
|---|---|---|
| **A. Đông Nam Á** | Nhà ống, mái ngói, chợ, cây nhiệt đới, sông kênh | 1, 2, 5, 11 |
| **B. Đô thị hiện đại** | Nhà cao tầng, kính, xa lộ, cần cẩu | 2, 3, 10, 13 |
| **C. Châu Âu cổ** | Nhà gạch/đá, đá cuội, kênh, cầu | 8, 9, 14 |
| **D. Địa Trung Hải / đồi biển** | Nhà trắng, bậc thang, vách, biển | 4, 7 |
| **E. Sa mạc** | Cát, nhà đất, cây cọ | 6, 13, 15 |
| **F. Châu Á cổ** | Chùa, mái cong, vườn, hồ | 5, 12, 15 |

**Thứ tự làm:** A, B (Chương 1–3) → D (Chương 4) → E (Chương 6) → C, F (từ Chương 8). Cách đóng gói (cài sẵn hay tải chương khi mở tới) chưa chốt.

---

## 7. Quyết định đã chốt (14/10 và 16/10/2026)

| ID | Quyết định |
|---|---|
| CĐ-Q1 | Dùng 5 chủ đề: **Phố cổ Hà Nội, New York về đêm, Ai Cập, Jaipur & Agra, Santorini**. Paris, Amsterdam, Kyoto, Rio, Làng tuyết để dự phòng |
| CĐ-Q2 | Dùng **tên chương hư cấu** (gợi vùng) |
| CĐ-Q3 | Gắn cơ chế khi khớp tự nhiên với các chương "Sắp có"; **không tạo cơ chế mới chỉ vì cảnh** |
| CĐ-Q4 | Có chương ban đêm (New York), nhưng **làm mockup kiểm tra độ đọc trước** |
| CĐ-Q5 | Kỳ quan **lộ dần** qua các màn của chương |
| CĐ-Q6 | Mockup trước: **New York về đêm, Ai Cập, Santorini** |

**Bổ sung 16/10/2026** (D-66):

| ID | Quyết định |
|---|---|
| CĐ-Q7 | **15 chủ đề cho 15 chương** theo bảng mục 5.2; chủ đề đi theo yếu tố mới của chương. Hà Nội chuyển từ Chương 1 sang **Chương 5** |
| CĐ-Q8 | Làm hình theo **bộ tài nguyên dùng chung** (mục 6.1) |
| CĐ-Q9 | **Mọi chương, kể cả Chương 1, xây dựng dần** (thay HA-Q5) |
| CĐ-Q10 | **Không dùng khung nhịp cố định** cho 10 màn; nhịp hình ảnh thiết kế theo cảnh quan thực tế của từng chủ đề (mục 9.1) |

### 7.1. Hệ quả cần lưu ý

| # | Nội dung | Tình trạng |
|---|---|---|
| H1 | Cầu đóng/mở theo giờ chưa có chủ đề khớp | **Đã xử lý** — Amsterdam, Chương 9 (CĐ-Q7) |
| H2 | Thứ tự chương cần sắp lại | **Đã xử lý** — mục 5.2 (CĐ-Q7) |

---

## 8. Mockup vòng 1 — New York về đêm, Ai Cập, Santorini

| Thông tin | Nội dung |
|---|---|
| File | [mockups/chu_de_canh.html](mockups/chu_de_canh.html) — chọn chủ đề, chọn tiến độ chương (màn 1 → hoàn thành) |
| Ảnh | [newyork_dau](mockups/chu_de_newyork_dau.jpg) · [newyork_cuoi](mockups/chu_de_newyork_cuoi.jpg) · [aicap_dau](mockups/chu_de_aicap_dau.jpg) · [aicap_cuoi](mockups/chu_de_aicap_cuoi.jpg) · [santorini_dau](mockups/chu_de_santorini_dau.jpg) · [santorini_cuoi](mockups/chu_de_santorini_cuoi.jpg) |
| Cách dựng | Nhìn từ trên, camera **nghiêng nhẹ** như ảnh tham chiếu (thấy mái + mặt tiền hướng nam, bóng đổ mềm). Khung lái xe đúng tỉ lệ demo 844×390, có giao diện điều khiển |
| Tên chương (đề xuất, chờ BA duyệt) | **Thành phố Không Ngủ** (New York về đêm) · **Ốc đảo Sông Vàng** (Ai Cập) · **Đảo Mây Trắng** (Santorini) |

### 8.1. Kỳ quan lộ dần (CĐ-Q5) — mỗi màn thắng lộ thêm một phần

> Mockup làm khi chương còn 5 màn. Nay mỗi chương 10 màn, nhịp lộ dần thiết kế lại theo từng chủ đề (CĐ-Q10).

| Chủ đề | Màn 1 → 5 |
|---|---|
| New York về đêm | Tượng nữ thần cầm đuốc → cầu treo lên đèn → tháp Art Deco (đang có cần cẩu) → biển LED quảng trường → sân băng công viên |
| Ai Cập | Câu chuyện **khai quật**: gò cát có rào → tượng Nhân sư → kim tự tháp nhỏ → giữa → lớn → đền cổ & cột tháp đá |
| Santorini | Nhà thờ ba mái vòm xanh (đang giàn giáo) → dãy cối xay gió → tháp chuông → cảng cũ dưới vách → hải đăng |

### 8.2. Kiểm tra độ đọc (CĐ-Q4 và nền sáng)

| Chủ đề | Kết quả | Cách đã xử lý |
|---|---|---|
| New York về đêm | **Đọc tốt.** Mạng đường là phần sáng nhất bản đồ; ghim có quầng sáng; biển báo rõ | Quầng đèn đường **chỉ rơi trên mặt đường**; mái nhà tối, viền sáng ánh trăng; neon chỉ ở phố đường đông |
| Ai Cập (nền cát) | Đọc tốt; ghim cam gần màu cát | Mặt đường nhựa tối, vỉa hè đá sáng; **ghim thêm viền tối**; đường gồ ghề thành đường cát |
| Santorini (nền trắng) | Đọc tốt; vỉa hè dễ lẫn với tường trắng | Mặt đường đá núi lửa sẫm, vỉa hè xám nhạt; bóng đổ xanh lam; ghim viền tối; hẻm vẽ thành bậc thang |

### 8.3. Tự đánh giá vòng 1 (Claude)

| Chủ đề | Điểm | Còn thiếu để lên 9,5+ |
|---|---|---|
| New York về đêm | ~8 | Chiều sâu ánh sáng thật (bloom, phản chiếu), mái nhà còn hơi đều |
| Ai Cập | ~8 | Lòng ô phố cổ còn hơi dày; thiếu hiệu ứng nắng chiều trên mặt nước |
| Santorini | ~7,5 | Thị trấn nằm trên mặt bằng phẳng nên chưa có cảm giác "bám vách"; nhà trắng còn đơn điệu |

> Giới hạn: đây là mockup 2D (SVG) để chốt **bố cục, bảng màu, kỳ quan và quy tắc độ đọc**. Mức 9,5–10 cần đồ họa 3D low-poly thật với ánh sáng, vật liệu và chuyển động (nước, khói, đèn nhấp nháy) trong engine.

---

## 9. Chuẩn bắt buộc cho chương xây dựng dần (HA-Q4)

BA chốt ngày 15/10/2026: mọi chương xây dựng dần phải qua danh sách dưới đây trước khi duyệt. Nguồn: mục 5 của [Danh_Gia_Hinh_Anh_Tien_Trien_Man.md](Danh_Gia_Hinh_Anh_Tien_Trien_Man.md) (các mã P1–P10 là vấn đề đã gặp ở Chương 2 demo). Từ 16/10/2026 **áp dụng cho cả 15 chương, kể cả Chương 1** (CĐ-Q9 — thay HA-Q5).

### 9.1. Khung một chương (10 màn)

**Không có khung nhịp cố định** (CĐ-Q10): công trình nào xây ở màn nào, vùng nào mở ở màn nào do cảnh quan thực tế của chủ đề quyết định. Chỉ bắt buộc các điểm sau:

| # | Bắt buộc | Liên quan |
|---|---|---|
| NC-01 | **Màn 1:** bối cảnh mới, bảng màu và nền khác hẳn chương trước; vùng xuất phát đã chứa các yếu tố của chương trước để ôn | Khung độ khó CT-02 |
| NC-02 | **Mỗi màn có thay đổi thấy được** (K1): công trình, vùng mới, cụm nhà mọc, thông tuyến… | K1 |
| NC-03 | **Màn 3 (màn có yếu tố mới):** vùng mở ở màn này chứa yếu tố mới; yếu tố mới **không xuất hiện** trong vùng chơi của màn 1–2 | Khung độ khó CT-02 |
| NC-04 | **Màn 10 (trùm):** kỳ quan hoàn chỉnh, cảnh kết toàn cảnh, bưu thiếp ở Trang chủ | D-62, khung độ khó CM-04 |
| NC-05 | Số công trình lớn mỗi chương **tùy chủ đề**, cân nhắc dung lượng (PV-04) — ưu tiên dùng lại khối của bộ tài nguyên | Mục 6.1 |
| NC-06 | Được phép đóng/mở đoạn đường bằng rào "chưa thông xe" từng màn để đạt chuẩn độ khó, miễn đúng câu chuyện tiến triển | Khung độ khó mục 9 |

### 9.2. Danh sách kiểm tra cho mỗi màn

| # | Kiểm tra | Rút ra từ | Demo đáp ứng bằng |
|---|---|---|---|
| K1 | Màn này **mở vùng mới hoặc làm vùng cũ thay đổi thấy được**; không màn nào giữ nguyên vùng mà không có thay đổi khác bù vào | P5 | D-56 |
| K2 | Có **đoạn mở màn** đưa camera qua điểm mới, hoặc điểm xuất phát gần điểm mới | P1 | D-55 |
| K3 | Công trình đang xây / đã xây **không nằm sát mép trên hoặc phải** (dưới mini map, đồng hồ, cụm mũi tên); nếu buộc phải đặt ở mép thì camera có lề hoặc giao diện tự mờ | P6 | D-57 |
| K4 | Công trình đã xây có **hình khối riêng**, lớn khoảng 1,5 lần nhà thường, nhận ra được khi chưa đọc nhãn | P3 | D-59 |
| K5 | Công trình đã xây nằm **trong khu dân cư** (phố, hoặc xóm làng ở Chương 1), không đứng trơ trọi giữa ruộng, bãi trống | P5 | D-56 |
| K6 | Cảnh quay: công trình **hiện trọn, không bị che ≥ 2 giây**; hộp thoại không đè; camera không lộ quá 15% vùng ngoài bản đồ | P2 | D-54 |
| K7 | Mỗi màn có **câu thông xe / thông báo riêng**, và câu đó **có hình đi kèm** | P4 | D-54, D-56 |
| K8 | Nhà phát triển mọc **thành cụm, có hiệu ứng mọc**, không rải ngẫu nhiên | P7 | D-60 |
| K9 | Màn chuẩn bị không có nhãn chồng nhau | P10 | D-58 |
| K10 | Trang trí không nằm trên mặt đường, không trùng màu loại đường (cam, xanh dương đậm), không có chuyển động gần ngã tư | N9 | D-57 |

### 9.3. Cách kiểm chứng

1. **Bộ ảnh cố định mỗi màn**, khung 844×390: (a) màn chuẩn bị; (b) 3 giây sau khi xuất phát; (c) lúc công trình hiện ra; (d) lúc hộp thoại hiện. Đặt các màn liên tiếp cạnh nhau để so.
2. **Kiểm tra 5 giây:** cho người xem khung hình đầu của hai màn liên tiếp, hỏi "Màn sau có gì mới?" — đạt khi nêu đúng không cần gợi ý. Có thể thử bằng AI trước, nhưng cần **ít nhất 5 người thật** để kết luận.
3. **Che khuất:** ở 844×390 và 667×375, công trình, điểm giao và xe không nằm dưới giao diện khi xe đang lái qua.
4. **Gameplay không đổi:** chạy lại các tuyến autopilot, thời gian lệch không quá 1 giây.
5. **Hiệu năng:** FPS giảm không quá 10% trên máy cấu hình thấp, kể cả lúc có cảnh quay.

---

## 10. Lịch sử

| Ngày | Phiên bản | Nội dung |
|---|---|---|
| 14/10/2026 | 0.1 → 0.3 | 10 chủ đề, nguyên tắc N1–N9, chốt CĐ-Q1 → Q6, mockup vòng 1 |
| 15/10/2026 | 0.4 | Mục 9: chuẩn bắt buộc cho chương xây dựng dần (HA-Q4) |
| 16/10/2026 | 0.5 | Bố cục 15 chủ đề theo yếu tố mới (CĐ-Q7), bộ tài nguyên dùng chung (CĐ-Q8), mọi chương xây dựng dần (CĐ-Q9), bỏ khung nhịp cố định (CĐ-Q10); cập nhật "Gắn cơ chế" ở mục 3 |
| 16/10/2026 | 0.6 | Viết lại mục 3 thành chi tiết 15 chủ đề theo thứ tự chương (thêm 6 chủ đề mới: Làng ven sông, Khu đô thị mới, Cảng châu Á, Bangkok, Thành phố sa mạc hiện đại, London); chỉnh bảng màu Hà Nội, Santorini, Rio, Kyoto, Jaipur theo tông đã chốt ở mục 5.2 |
