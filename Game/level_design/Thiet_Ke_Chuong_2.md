# Thiết kế Chương 2 — Khu đô thị mới

| Thông tin | Nội dung |
|---|---|
| Phiên bản | 1.1 — chốt C2-1. 1.0 — dựng lại theo khung độ khó (thay bản thử nghiệm 0.3 của demo trước v1.4): bản đồ chung 7×4, 10 màn, số đo, khung cảnh từng màn, màn thưởng |
| Ngày | 16/10/2026 |
| Căn cứ | [Khung_Do_Kho_Chuong_Man.md](Khung_Do_Kho_Chuong_Man.md) (bản 0.4) · [Chu_De_Khung_Canh.md](../Chu_De_Khung_Canh.md) mục 3.2, 9 · D-63 → D-73 |
| Dữ liệu | [levels_ch2.py](levels_ch2.py) (bộ giải) · `CH2` trong [demo/index.html](../demo/index.html) · [ket_qua_ch2.json](ket_qua_ch2.json) |
| Bản thử nghiệm cũ | 5 màn (khởi công → công viên, có đường đông, gồ ghề, hẻm) — còn ở bản lưu `versions/v1.3/` và lịch sử Git |

---

## 1. Tóm tắt

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Nhiều kho**: 2 kho từ màn 3 (Kho tổng), 3 kho từ màn 8 (Xưởng gỗ) |
| Có trong chương | Đường thường, **đường lớn** (đại lộ) · nhiều điểm giao · chia chuyến · nhiều kho · xe van |
| ĐK | 6 → 15 (CT-01) |
| Kiểu tiến triển | **Xây mới**: mỗi màn thắng xong một công trình; màn 10 Công viên trung tâm (kỳ quan), cảnh kết, bưu thiếp; sau đó mở màn thưởng |
| Bảng màu | Pastel, nắng chiều (Chu_De_Khung_Canh mục 3.2): cỏ `#a9d67a`, mái kem – hồng nhạt – xám xanh – nâu đất – xanh rêu – tím nhạt; ô chưa thông xe là đất trống chờ xây `#dccb9d` |

## 2. Bản đồ chung

| Thành phần | Nội dung |
|---|---|
| Lưới | 7×4 (khung mục 6: Chương 2 từ 6×4 tới 7×4) |
| Xuất phát | Đoạn c0r1–c1r1, hướng sang phải |
| Đại lộ (đường lớn) | **Ngang phía Nam** (hàng 2, từ màn 1) + **dọc phía Đông** (cột 5, mở ở màn 6) |
| Vùng theo màn | M1–2: 4×3 · M3: 5×3 (thêm Kho tổng) · M4–5: 5×4 · M6–7: 6×4 (đại lộ phía Đông) · M8–10: 7×4 (thêm Xưởng gỗ) |

| Điểm | Đoạn | Vai trò |
|---|---|---|
| **Bãi vật liệu** | c0r0–c0r1 | Kho 1 (cát, đá, lán) |
| **Kho tổng** | c4r1–c4r2 | Kho 2 — mở ở màn 3 (nhà kho mái tôn + kiện hàng) |
| **Xưởng gỗ** | c6r1–c6r2 | Kho 3 — mở ở màn 8 (đống gỗ xếp) |
| Tiệm bánh · Nhà trẻ · Trường học · Khu nhà ở · Chợ mới | c1r0–c2r0 · c2r1–c2r2 · c4r0–c4r1 · c1r3–c2r3 · c3r2–c4r2 | Công trình màn 1 → 5 |
| Bệnh viện · Nhà văn hóa · Hồ điều hòa · Tháp văn phòng · Công viên trung tâm | c5r0–c5r1 · c3r3–c4r3 · c6r2–c6r3 · c5r2–c5r3 · c5r1–c5r2 | Công trình màn 6 → 10 |
| VP dự án, Chung cư A, Chung cư B, Nhà mẫu, Khu B, Tòa C, Siêu thị, Quán cà phê, Nhà phố | — | Điểm giao (không phải công trình) |

Mỗi kho có hình dạng riêng để phân biệt từ trên xuống (Chu_De_Khung_Canh mục 3.2). Công trình màn sau không là điểm giao ở các màn trước.

## 3. Mười màn — logic chơi và số đo

**T_opt** đo bằng bộ lái tự động trong demo. Cách chơi không tính toán và số kế hoạch tính bằng bộ giải, quy đổi theo tỉ lệ demo/bộ giải của từng màn. Kế hoạch đếm theo **kế hoạch chuẩn** (D-67), mở rộng cho nhiều kho: mỗi chuyến lấy hàng ở một hay nhiều kho liên tiếp (khi xe còn chỗ), rồi chỉ đi tới các điểm có hàng trên xe.

| Màn | ĐK | Tên | Nội dung (khung) | Nhiệm vụ | Kho · điểm · kiện | T_opt | Biên | T0 | Không tính toán | Kế hoạch đạt | Đạt 3★ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 6 | Khởi công | Ôn: 1 kho, chia chuyến | Bãi VL → Tiệm bánh 1, VP dự án 1, Chung cư B 2, Quán cà phê 2 | 1 · 4 · 6 | 51,8 | 32,5% | 70 | thua (79,3) | 252 | 96 |
| 2 | 7 | Nhà trẻ | Ôn: đường lớn + chia chuyến | Bãi VL → Tiệm bánh 1, **Nhà trẻ** 1, VP dự án 3, Quán cà phê 2 | 1 · 4 · 7 | 51,9 | 32% | 70 | thua (87,9) | 474 | 114 |
| 3 | 8 | Trường học | **Mới: 2 kho** | Kho tổng → **Trường học** 1, VP dự án 3 · Bãi VL → Chung cư A 1 | 2 · 3 · 5 | 53,6 | 41,5% | 80 | thua (88,1) | 10 | 6 |
| 4 | 9 | Khu nhà ở | 2 kho, mỗi kho nhiều đơn | Bãi VL → Nhà trẻ 2 · Kho tổng → Trường học 1, **Khu nhà ở** 2, VP dự án 1 | 2 · 4 · 6 | 68,0 | 31% | 90 | thua (92,4) | 74 | 18 |
| 5 | 10 | Chợ mới | 2 kho + chia chuyến | Bãi VL → Tiệm bánh 1 · Kho tổng → **Chợ mới** 1, VP dự án 3, Chung cư B 2 | 2 · 4 · 7 | 72,3 | 30,5% | 95 | thua (100,8) | 65 | 28 |
| 6 | 11 | Bệnh viện | 2 kho hai phía + đường lớn | Bãi VL → **Bệnh viện** 3 · Kho tổng → Chung cư B 1, Nhà mẫu 3 | 2 · 3 · 7 | 71,9 | 30% | 95 | thua (102,4) | 7 | 4 |
| 7 | 12 | Nhà văn hóa | Thứ tự kho quyết định | Bãi VL → Nhà trẻ 1 · Kho tổng → Trường học 1, Khu nhà ở 3, **Nhà văn hóa** 3 | 2 · 4 · 8 | 72,2 | 29,5% | 95 | thua (113,5) | **22** | 8 |
| 8 | 13 | Hồ điều hòa | **3 kho** (thêm Xưởng gỗ) | Kho tổng → Tiệm bánh 1 · Bãi VL → Nhà văn hóa 3 · Xưởng gỗ → **Hồ điều hòa** 2, Chung cư B 2 | 3 · 4 · 8 | 80,0 | 29% | 105 | thua (134,8) | 18 | 5 |
| 9 | 14 | Tháp văn phòng | 3 kho + chia chuyến + đường lớn | Kho tổng → Khu nhà ở 1, Siêu thị 3 · Bãi VL → **Tháp văn phòng** 3 · Xưởng gỗ → Nhà mẫu 2 | 3 · 4 · 9 | 87,2 | 28,5% | 115 | thua (134,5) | **22** | 11 |
| 10 | 15 | Công viên trung tâm | **Trùm:** tổ hợp toàn chương | Kho tổng → Tiệm bánh 2 · Xưởng gỗ → Chợ mới 2, **Công viên** 3, Chung cư A 1 · Bãi VL → Nhà văn hóa 2 | 3 · 5 · 10 | 94,3 | 28% | 125 | thua (132,5) | **168** | 24 |

**Đối chiếu ba điều kiện "đúng ĐK":**

| Điều kiện | Kết quả |
|---|---|
| CT-05 (T0 theo công thức) | Đạt cả 10 màn |
| CT-07 (không tính toán thua) | Đạt cả 10 màn |
| CT-06 (số kế hoạch) | Màn 1–6, 8: đạt. Màn 7, 9: 22 kế hoạch — **chấp nhận** (C2-1). Màn 10 trùm: đánh giá bằng **số kế hoạch đạt 3★ = 24** (C2-1) |

Đường lớn được dùng trong lời giải tối ưu của cả 10 màn (bỏ đại lộ thì chậm hơn 2,6 – 15,4 giây).

## 4. Khung cảnh từng màn

| Màn | Vùng | Lúc vào màn | Khi thắng (cảnh quay) | Câu thông báo |
|---|---|---|---|---|
| 1 | Góc Tây Bắc 4×3 | Bãi vật liệu, đại lộ phía Nam, lô Tiệm bánh "Sắp xây" | **Tiệm bánh** (mái hồng, hiên sọc) | Tiệm bánh khai trương — khu đô thị có cửa hàng đầu tiên. |
| 2 | — | | **Nhà trẻ** (mái nhiều màu, cầu trượt, hố cát) | Nhà trẻ đón các bé — đường sang phía Đông đã thông, có thêm Kho tổng. |
| 3 | + phía Đông (Kho tổng) | Kho tổng thấy được khi vào màn | **Trường học** (chữ L, sân bóng, cột cờ) | Trường học khai giảng — đường xuống phía Nam đã thông. |
| 4 | + phía Nam | | **Khu nhà ở** (dãy nhà liền kề, vườn) | Khu nhà ở đón những cư dân đầu tiên. |
| 5 | — | | **Chợ mới** (dãy quầy nhiều màu) | Chợ mới đông vui — đại lộ phía Đông đã thông. |
| 6 | + đại lộ phía Đông | | **Bệnh viện** (mái trắng, chữ thập, xe cứu thương) | Bệnh viện đi vào hoạt động. |
| 7 | — | | **Nhà văn hóa** (mái đỏ, sân khấu, cờ) | Nhà văn hóa khánh thành — thông xe tới Xưởng gỗ phía Đông. |
| 8 | + Xưởng gỗ (7×4) | Xưởng gỗ thấy được khi vào màn | **Hồ điều hòa** (hồ, đường dạo, cây) | Hồ điều hòa trong xanh — có đường dạo quanh hồ. |
| 9 | — | | **Tháp văn phòng** (kính xanh ngọc, sân đỗ trực thăng) | Tháp văn phòng sáng đèn — sẵn sàng cho công viên trung tâm. |
| 10 | — | | **Công viên trung tâm** (hồ, đài phun nước, vòng cây) → cảnh kết toàn cảnh, bưu thiếp | Công viên mở cửa — đủ 10 công trình… Màn thưởng kim cương đã mở! |

## 5. Màn thưởng — "Lễ khánh thành" (D-73)

| Hạng mục | Nội dung |
|---|---|
| Mở | Sau khi thắng màn 10; nút hộp quà sau cờ Về đích |
| Kim cương | 25, thành 7 cụm: c0r0–c1r0 (4), c3r0–c4r0 (3), c6r0–c6r1 (4), đại lộ c4r2–c5r2 (3), c2r3–c3r3 (4), c5r2–c5r3 (3), c0r2–c0r3 (4) |
| Thời gian | Vòng nhặt hết nhanh nhất ≈ 69,4 giây theo bộ giải (≈ 66 giây demo) → T0 = 100 giây (+50%) |
| Quy tắc | MT-1 → MT-8 |

## 6. Điểm còn mở

| # | Nội dung | Đề xuất |
|---|---|---|
| C2-1 | **Đã chốt (16/10):** màn 7, 9 chấp nhận 22 kế hoạch; màn trùm đánh giá bằng số kế hoạch đạt 3★. Lý do — **CT-06 với ĐK 11–15:** màn 7 và 9 có 22 kế hoạch (khoảng 5–20); màn 10 trùm có 168 (khoảng 5–12). Tìm tự động (mỗi màn tới 15 phút, cả biến thể 4 điểm giao) không ra bố cục nào thấp hơn mà vẫn giữ được T0, cách chơi không tính toán thua và đường lớn quyết định. Như Chương 1: biên ≥ 28% với 3 chuyến sinh nhiều kế hoạch | Giống C1-1: (a) màn 7, 9 chấp nhận 22 (sát ngưỡng); (b) màn trùm đánh giá bằng **số kế hoạch đạt 3★** (màn 10: 24) thay khoảng 5–12; (c) xem lại khoảng CT-06 cho ĐK 11–30 dựa trên số liệu 2 chương — cần BA quyết |
| C2-2 | T_opt màn 1–3 (≈ 52–54 giây) gần nhau, màn 3 thấp hơn mục tiêu CT-03 (62) khoảng 14% | Giữ — màn 3 dạy yếu tố mới, có +10% biên |
