# Thiết kế Chương 3 — Thành phố Không Ngủ

| Thông tin | Nội dung |
|---|---|
| Phiên bản | 1.0 — dựng theo khung độ khó: bản đồ chung 8×4, 10 màn, số đo, khung cảnh từng màn, mẹo đường đông, màn thưởng |
| Ngày | 19/10/2026 |
| Căn cứ | [Khung_Do_Kho_Chuong_Man.md](Khung_Do_Kho_Chuong_Man.md) (bản 0.5) · [Chu_De_Khung_Canh.md](../Chu_De_Khung_Canh.md) mục 3.3, 8, 9 · D-63 → D-78 · BA chốt 19/10: khung cảnh vẽ bằng code trước, ảnh sau · bản đồ 8×4 · mẹo đường đông ở màn 3 · nội dung theo đề xuất |
| Dữ liệu | [levels_ch3.py](levels_ch3.py) (bộ giải) · `CH3` trong [demo/index.html](../demo/index.html) · [ket_qua_ch3.json](ket_qua_ch3.json) |

---

## 1. Tóm tắt

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Đường đông** (từ màn 3): taxi kín làn, xe van chạy 0,45 tốc độ thường — một đoạn đông tốn bằng khoảng 2,2 đoạn thường |
| Có trong chương | Đường thường, đại lộ (đường lớn), **đường đông** · nhiều điểm giao · chia chuyến · nhiều kho (2 kho màn 1–6, 3 kho từ màn 7) · xe van |
| ĐK | 11 → 20 (CT-01) |
| Kiểu tiến triển | **Thắp sáng thành phố**: khu trong vùng thông xe lên đèn, khu ngoài vùng tối; mỗi màn thắng xong một công trình; màn 10 tượng cầm đuốc (kỳ quan), cảnh kết, bưu thiếp; sau đó mở màn thưởng |
| Bảng màu | Đêm 21 giờ, tông lạnh (Chu_De_Khung_Canh mục 3.3): nền `#1c2027`, ô phố `#2b303a`, mặt đường `#525866` (sáng hơn nền một bậc), mái xám than / nâu brownstone, cửa sổ vàng ấm `#ffd479`; neon hồng `#ff4fa3` và xanh `#4fd1ff` **chỉ ở đường đông**; mini map giữ bảng màu ban ngày (N8) |
| Số đo | 10 màn đều **đúng ĐK** (CT-05, CT-06, CT-07). Bộ lái tự động: 30/30 màn đạt (Chương 1–2 không đổi) |

## 2. Bản đồ chung

| Thành phần | Nội dung |
|---|---|
| Lưới | 8×4 (khung mục 6: Chương 3–4 từ 6×4 tới 8×5; chọn 8×4 để màn chuẩn bị không thu nhỏ quá — BA chốt 19/10) |
| Xuất phát | Đoạn c0r1–c1r1, hướng sang phải |
| Đại lộ (đường lớn) | **Ven sông phía Bắc** (hàng 0) và **phía Nam** (hàng 3), nối dài theo vùng |
| Đường đông | Khu trung tâm: **phố dọc cột 5** (r0 → r3) + **hai phố ngang hàng 1, 2** từ cột 4 sang Đông (9 đoạn khi mở hết). Vùng màn 1–2 (cột 0–4) không có đường đông (NC-03) |
| Vùng theo màn | M1–2: 5×4 · M3–4: 6×4 (có đường đông) · M5–6: 7×4 · M7–10: 8×4 (thêm Trung tâm phân phối) |
| Thành phố là một hòn đảo | Sông phía Tây, phía Nam (cảng) và phía Đông; phía Bắc là phố tối ngoài bản đồ |

Cách đặt đường đông được chọn sau khi so 4 phương án bố trí (đo trên 120–250 ứng viên mỗi phương án): đặt đường đông **ngay trên lối đi tự nhiên** giữa kho phía Tây và điểm giao phía Đông thì cách chơi không tính toán bị bẫy rõ nhất. Đặt đường đông ở rìa (phương án đầu) thì gần như không màn nào cần đến nó.

| Điểm | Đoạn | Vai trò |
|---|---|---|
| **Bến cảng** | c0r1–c0r2 | Kho 1 (container, cẩu bờ) |
| **Kho ga hàng** | c3r0–c3r1 | Kho 2 (nhà kho + đường ray) |
| **Trung tâm phân phối** | c7r1–c7r2 | Kho 3 — mở ở màn 7 (mái lớn, cửa xuất hàng sáng đèn, xe tải) |
| Ga tàu điện · Dãy brownstone · Quảng trường LED · Nhà hát · Tháp nước | c1r0–c1r1 · c4r2–c4r3 · c5r2–c5r3 · c4r0–c5r0 · c6r2–c6r3 | Công trình màn 1 → 5 |
| Cầu treo · Tòa Art Deco · Chợ đêm · Sân băng · Tượng cầm đuốc (bến phà) | c5r3–c6r3 · c6r0–c7r0 · c7r2–c7r3 · c6r1–c6r2 · c7r0–c7r1 | Công trình màn 6 → 10 |
| Tòa báo, Tiệm pizza, Căn hộ, Khách sạn, Tiệm tạp hóa, Xe hot dog, Bảo tàng, Phòng thu, Rạp phim, Tiệm nhạc, Quán cà phê | — | Điểm giao (không phải công trình). **Rạp phim, Tiệm nhạc** nằm trên phố đông |

## 3. Mười màn — logic chơi và số đo

**T_opt** đo bằng bộ lái tự động trong demo. Cách chơi không tính toán và số kế hoạch tính bằng bộ giải, quy đổi theo **tỉ lệ demo/bộ giải của từng màn** (0,86 – 0,96). Kế hoạch đếm theo kế hoạch chuẩn nhiều kho (như Chương 2). Cột "Đường đông" = thời gian thêm vào lời giải tối ưu do đường đông (so với coi đường đông là đường thường); "Đại lộ" = thời gian mất nếu không có đại lộ.

| Màn | ĐK | Tên | Nội dung (khung) | Nhiệm vụ | Kho · điểm · kiện | T_opt | Biên | T0 | Không tính toán | Kế hoạch đạt | Đạt 3★ | Đường đông | Đại lộ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 11 | Ga tàu điện | Ôn: 2 kho, chia chuyến | Kho ga → **Ga tàu điện** 2, Căn hộ 3 · Bến cảng → Bảo tàng 3 | 2 · 3 · 8 | 61,3 | 30% | 80 | thua (≈ 82,6) | 12 | 5 | — | 5,9 |
| 2 | 12 | Dãy brownstone | Ôn: đại lộ ven sông | Bến cảng → Ga tàu điện 2, **Brownstone** 3 · Kho ga → Căn hộ 2 | 2 · 3 · 7 | 70,4 | 29,5% | 95 | thua (≈ 99,2) | 8 | 5 | — | 3,7 |
| 3 | 13 | Quảng trường LED | **Mới: đường đông** | Bến cảng → Ga tàu điện 1, **Quảng trường LED** 3 · Kho ga → Rạp phim 2 | 2 · 3 · 6 | 76,0 | 39% | 110 | thua (≈ 127,8) | 18 | 14 | 8,7 | 7,3 |
| 4 | 14 | Nhà hát | Phố đông và phố vắng song song | Bến cảng → Quảng trường 1, Tiệm tạp hóa 2 · Kho ga → **Nhà hát** 2, Rạp phim 2 | 2 · 4 · 7 | 72,4 | 28,5% | 95 | thua (≈ 114,6) | 12 | 6 | 11,0 | 3,6 |
| 5 | 15 | Tháp nước | Đường đông + chia chuyến | Bến cảng → Nhà hát 3, Căn hộ 1 · Kho ga → **Tháp nước** 3, Rạp phim 3 | 2 · 4 · 10 | 92,0 | 28% | 120 | thua (≈ 136,8) | 14 | 3 | 4,3 | 10,6 |
| 6 | 16 | Cầu treo | Đại lộ, phố thường, phố đông | Kho ga → **Cầu treo** 3, Bảo tàng 1, Tiệm nhạc 3 · Bến cảng → Tiệm pizza 3 | 2 · 4 · 10 | 88,1 | 27,5% | 115 | thua (≈ 131,3) | 20 | 8 | 8,8 | 8,8 |
| 7 | 17 | Tòa Art Deco | Thêm kho thứ 3 | Bến cảng → Ga tàu điện 1 · Trung tâm → Cầu treo 2, Rạp phim 3 · Kho ga → **Art Deco** 3 | 3 · 4 · 9 | 91,4 | 27% | 120 | thua (≈ 137,3) | 8 | 5 | 9,4 | 12,4 |
| 8 | 18 | Chợ đêm | Phố đông chắn giữa hai cụm điểm giao | Kho ga → **Chợ đêm** 3 · Trung tâm → Tòa báo 2 · Bến cảng → Tiệm tạp hóa 2, Quán cà phê 3 | 3 · 4 · 10 | 119,2 | 26,5% | 155 | thua (≈ 225,6) | 15 | 7 | 3,7 | 21,2 |
| 9 | 19 | Sân băng | 3 kho + chia chuyến + phố đông | Kho ga → **Sân băng** 3 · Trung tâm → Tiệm nhạc 3 · Bến cảng → Khách sạn 1, Rạp phim 3 | 3 · 4 · 10 | 109,8 | 26% | 140 | thua (≈ 153,4) | 16 | 4 | 15,3 | 3,6 |
| 10 | 20 | Tượng cầm đuốc | **Trùm:** tổ hợp toàn chương | Kho ga → **Bến phà / tượng** 2, Chợ đêm 1 · Trung tâm → Cầu treo 2, Xe hot dog 3 · Bến cảng → Quán cà phê 3 | 3 · 5 · 11 | 120,0 | 25,5% | 155 | thua (≈ 175,7) | 71 | **21** | 5,8 | 20,6 |

**Đối chiếu ba điều kiện "đúng ĐK":**

| Điều kiện | Kết quả |
|---|---|
| CT-05 (T0 theo công thức) | Đạt cả 10 màn — T0 tính lại từ thời gian đo trong demo |
| CT-07 (không tính toán thua) | Đạt cả 10 màn. **Màn 1 thua sát** (≈ 82,6 so với T0 80, chỉ hơn 3%) — xem C3-1 |
| CT-06 (số kế hoạch) | Màn 1–9: 8 – 20, trong khoảng 5–20. Màn 10 trùm: đánh giá bằng **số kế hoạch đạt 3★ = 21** (như C2-1; Chương 2: 24) |

Đường đông có mặt trong lời giải tối ưu (làm chậm 3,7 – 15,3 giây) ở cả 8 màn có đường đông; đại lộ giúp nhanh hơn 3,6 – 21,2 giây ở cả 10 màn.

**Độ khó tăng dần (CM-02):** đo bằng CT-06 như khung quy định — T_opt, T0 không tăng đều (màn 4 có T0 95 thấp hơn màn 3 là 110, vì màn 3 có thêm 10% biên để học yếu tố mới; tương tự Chương 2 màn 5–7).

## 4. Khung cảnh từng màn

Vẽ bằng code (`drawNight`, BA chốt 19/10 — "code trước, ảnh sau"). Khi có ảnh thiết kế theo D-77 thì đổi `CH3.draw` thành `imgDraw(3,o)||drawNight(o)` như Chương 1–2.

| Màn | Vùng mới | Công trình hoàn thành (hình khối riêng — K4) | Câu thông báo |
|---|---|---|---|
| 1 | Bến cảng, khu phía Tây 5×4 | **Ga tàu điện** (lan can xanh, 2 đèn cầu xanh, chữ M) | Ga tàu điện lên đèn — đêm nay thành phố bắt đầu thức. |
| 2 | — | **Dãy brownstone** (4 nhà nâu, bậc thềm, cửa sổ sáng) | Dãy brownstone sáng từng ô cửa — đường vào khu trung tâm đã thông. |
| 3 | + cột 5: khu trung tâm có đường đông | **Quảng trường LED** (bậc thang đỏ, 4 bảng LED nhiều màu) | Quảng trường LED rực rỡ — phố trung tâm đông nghịt taxi. |
| 4 | — | **Nhà hát** (biển đèn viền bóng đèn, chữ ★ SHOW ★) | Nhà hát mở màn — đường sang phía Đông đã thông. |
| 5 | + cột 6 | **Tháp nước sân thượng** (bồn gỗ tròn, vườn trên mái) | Tháp nước trên sân thượng sáng đèn, vườn trên mái mở cửa. |
| 6 | — | **Cầu treo** (trụ đá, dây cáp lên đèn, cầu vẽ tiếp ra sông phía Nam) | Cầu treo lên đèn — thông xe tới Trung tâm phân phối phía Đông. |
| 7 | + cột 7, Trung tâm phân phối | **Tòa Art Deco** (các tầng lùi, chóp bạc sáng) | Tòa Art Deco thắp sáng chóp bạc. |
| 8 | — | **Chợ đêm** (dãy sạp nhiều màu, dây đèn) | Chợ đêm nhộn nhịp dưới những dây đèn. |
| 9 | — | **Sân băng** trong **công viên** (ô băng trắng xanh, người trượt; cả ô phố thành công viên có hồ) | Sân băng mở cửa giữa công viên — sẵn sàng cho đêm hội. |
| 10 | — | **Tượng cầm đuốc** trên đảo nhỏ giữa vũng cảng (bệ hình sao, tượng đồng xanh, đuốc sáng) → cảnh kết toàn cảnh, bưu thiếp | Tượng cầm đuốc rực sáng giữa cảng — thành phố đã lên đèn trọn vẹn. |

Tượng đặt **trong ô công trình** (không đặt trên đảo ngoài mép bản đồ như mô tả ở Chu_De_Khung_Canh mục 3.3) để hiện trong cảnh kết và bưu thiếp (NC-04). Mọi hình "lấy cảm hứng", không dùng tên thật (mục 4).

Khu sáng thêm quanh công trình vừa xong: các tòa nhà trong bán kính 300 px có cửa hàng neon — dùng hiệu ứng "mọc" của cảnh quay (K8).

## 5. Mẹo đường đông ở màn 3 (D-80)

| Hạng mục | Nội dung |
|---|---|
| Khi nào | Lần đầu mở **Màn 23 (màn 3 Chương 3)**; khóa lưu `demo_dong_tip` |
| Bước 1 | Khoanh các đoạn đường đông trên bản đồ chuẩn bị: "Đây là **đường đông** (vạch cam): taxi kín làn, xe van chạy **chậm hơn một nửa**." |
| Bước 2 | Khoanh mục "Đường đông" ở chú giải: "Đi thẳng qua phố đông **chưa chắc nhanh** — so với đường vòng hoặc đại lộ rồi hãy chọn." |
| Vì sao | Game không hiện số tốc độ (E2) — mức phạt của đường đông khó tự đoán; đường lớn (thưởng) thì dễ đoán hơn |
| Cơ chế | Dùng lại lớp khoanh của luật chơi Màn 1 (`pcRing`, `pcTip`); chạm để tiếp, có nút Bỏ qua. Xem lại ở nút ? tab "Màn này" |

## 6. Màn thưởng — "Đêm pháo hoa" (D-73)

| Hạng mục | Nội dung |
|---|---|
| Mở | Sau khi thắng màn 10; nút hộp quà sau cờ Về đích |
| Kim cương | 25, thành 7 cụm: c0r0–c1r0 (4), c3r1–c4r1 (3), **phố đông** c5r0–c5r1 (3), c7r0–c7r1 (4), đại lộ c6r3–c7r3 (3), c2r2–c2r3 (4), **phố đông** c4r2–c5r2 (4) |
| Thời gian | Vòng nhặt hết nhanh nhất ≈ 83,4 giây theo bộ giải (≈ 78 giây demo, ước) → T0 = 120 giây (+50%) |
| Quy tắc | MT-1 → MT-8 |

## 7. Điểm còn mở

| # | Nội dung | Đề xuất |
|---|---|---|
| C3-1 | **Màn 1 thua sát:** ở bản đồ 5×4 không có đường đông, mọi bố cục tìm được đều vướng một trong hai: cách chơi không tính toán chỉ thua sát (≈ 3%), hoặc số kế hoạch vượt 20 (27–56). Đã đo trực tiếp trong demo 21 ứng viên | Giữ bố cục hiện tại (đạt cả CT-06 và CT-07). Nếu muốn bẫy rõ hơn: (a) chấp nhận khoảng 27–29 kế hoạch như C2-1, hoặc (b) xem lại khoảng CT-06 cho các màn ôn đầu chương — cần BA quyết |
| C3-2 | Thời gian màn thưởng là ước theo bộ giải, chưa đo bằng bộ lái tự động | Đo khi làm bộ lái cho màn thưởng |
| C3-3 | Khung cảnh code là bản tạm; cần bộ hồ sơ `design_game/chuong_3` để người/AI thiết kế vẽ ảnh (D-77) | Xuất bộ hồ sơ (script xuất hiện chỉ chạy trên máy Mac) |
