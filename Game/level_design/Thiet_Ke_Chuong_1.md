# Thiết kế Chương 1 — Làng ven sông Việt Nam

| Thông tin | Nội dung |
|---|---|
| Phiên bản | 0.2 — chốt C1-1 (màn trùm); đã dựng vào demo v1.4 và kiểm chứng bằng autopilot, ảnh `playtest_evidence/chuong1_v14/` |
| Ngày | 16/10/2026 |
| Căn cứ | [Khung_Do_Kho_Chuong_Man.md](Khung_Do_Kho_Chuong_Man.md) (bản 0.3) · [Chu_De_Khung_Canh.md](../Chu_De_Khung_Canh.md) mục 3.1, 9 · D-63 → D-67 |
| Dữ liệu | [levels_ch1.py](levels_ch1.py) (bộ giải) · `CH1` trong [demo/index.html](../demo/index.html) · kết quả bộ giải [ket_qua_ch1.json](ket_qua_ch1.json) |

---

## 1. Tóm tắt

| Hạng mục | Nội dung |
|---|---|
| Yếu tố | 1 kho (Hợp tác xã) · xe van · đường thường, **đường lớn** (từ màn 8) · nhiều điểm giao (từ màn 3) · chia chuyến (từ màn 5) |
| ĐK | 1 → 10 (CT-01) |
| Kiểu tiến triển | **Dựng chợ phiên**: mỗi màn thắng hoàn thành một công trình của làng; màn 10 chợ phiên hoàn chỉnh, cảnh kết, bưu thiếp |
| Bản đồ | Một bản đồ chung lưới 6×4, vùng chơi mở dần; đường ngoài vùng là "chưa thông xe" |

## 2. Bản đồ chung

| Thành phần | Nội dung |
|---|---|
| Kho | **Hợp tác xã** (giữa xóm đầu, đoạn c1r1–c2r1) — kho duy nhất của chương |
| Xuất phát | Đoạn c0r1–c1r1, cách c0r1 40px, hướng sang phải |
| Đường lớn | **Đường đê dọc sông** (cột phía Đông c5) + hai nhánh nối c4–c5 ở hàng trên và hàng dưới. Chỉ nằm trong vùng mở ở màn 8 (NC-03) |
| Sông | Chạy dọc mép Đông, ngoài đường đê; bến đò ở đê |
| Vùng theo màn | Màn 1–2: 4×3 giao lộ · Màn 3–4: 5×3 (thêm xóm Đông) · Màn 5–7: 5×4 (thêm xóm Nam) · Màn 8–10: 6×4 (thêm đê, bến đò) |

| Điểm | Vị trí (đoạn) | Vai trò |
|---|---|---|
| Hợp tác xã | c1r1–c2r1 | Kho |
| Chợ phiên | c2r0–c3r0 | Công trình màn 1 (lều chợ) và màn 10 (chợ phiên hoàn chỉnh) |
| Giếng làng | c0r1–c0r2 | Công trình màn 2 |
| Trường làng | c4r0–c4r1 | Công trình màn 3 |
| Xóm Đông | c3r2–c4r2 | Công trình màn 4 (cụm nhà mới) |
| Trạm y tế | c1r3–c2r3 | Công trình màn 5 |
| Ao cá | c0r2–c0r3 | Công trình màn 6 |
| Đình làng | c2r2–c2r3 | Công trình màn 7 |
| Bến đò | c5r1–c5r2 (trên đê) | Công trình màn 8 |
| Nhà văn hóa | c4r2–c4r3 | Công trình màn 9 |
| Xóm Trên, Xóm Giữa, Xóm Nam, Xóm Bãi, Nhà ông Lý | c0r0–c1r0, c3r1–c3r2, c3r3–c4r3, c5r2–c5r3, c1r2–c2r2 | Điểm giao (nhà dân) |

Công trình của màn sau **không** là điểm giao ở các màn trước (còn là lô "Sắp xây").

## 3. Mười màn — logic chơi và số đo

Số đo: **T_opt** đo bằng bộ lái tự động trong demo (đúng tốc độ demo). Cách chơi không tính toán và số kế hoạch tính bằng bộ giải, quy đổi theo tỉ lệ demo/bộ giải của từng màn. Kế hoạch đếm theo **kế hoạch chuẩn** (D-67).

| Màn | ĐK | Tên | Nội dung chơi (khung) | Nhiệm vụ (đều từ Hợp tác xã) | Kiện · chuyến | T_opt | Biên | T0 | Không tính toán | Kế hoạch đạt | Đạt 3★ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | Ngày đầu đi giao | **Mới:** điều khiển (hướng dẫn) | Chợ phiên 2, Xóm Trên 1 | 3 · 1 | 26,5 | — | 90 | đạt | 4 (không áp dụng) | 4 |
| 2 | 2 | Giếng làng | Ôn điều khiển | Chợ phiên 2, **Giếng làng** 1 | 3 · 1 | 34,3 | 34,5% | 50 | đạt | 4 (không áp dụng) | 4 |
| 3 | 3 | Trường làng | **Mới:** nhiều điểm giao | Chợ phiên, Xóm Trên, **Trường làng** (mỗi nơi 1) | 3 · 1 | 37,4 | 44% | 55 | đạt (44,3) | 19 | 12 |
| 4 | 4 | Xóm Đông | Điểm giao hai phía kho | Chợ phiên, Xóm Trên, **Xóm Đông** (mỗi nơi 1) | 3 · 1 | 41,3 | 33,5% | 60 | đạt (48,3) | 22 | 16 |
| 5 | 5 | Trạm y tế | **Mới:** chia chuyến | Nhà ông Lý 1, Trường làng 3, **Trạm y tế** 1 | 5 · 2 | 52,5 | 43% | 80 | **thua** (85,4) | 14 | 10 |
| 6 | 6 | Ao cá | Gom chuyến theo cụm | Giếng 1, Xóm Giữa 1, Trường 2, **Ao cá** 2 | 6 · 2 | 56,5 | 32,5% | 75 | **thua** (98,3) | 26 | 12 |
| 7 | 7 | Đình làng | Cách gom trực giác bị thua | Chợ 1, Giếng 2, Ao 1, **Đình làng** 3 | 7 · 3 | 59,9 | 32% | 80 | **thua** (86,2) | 79 | 12 |
| 8 | 8 | Bến đò | **Mới:** đường lớn (đường đê nhanh hơn đường thẳng) | Chợ 1, Xóm Trên 1, Xóm Nam 2, **Bến đò** 1 | 5 · 2 | 64,2 | 41,5% | 95 | **thua** (102,2) | 121 | 46 |
| 9 | 9 | Nhà văn hóa | Đường lớn + chia chuyến | Xóm Trên 1, Nhà ông Lý 3, Bến đò 1, **Nhà văn hóa** 2 | 7 · 3 | 69,8 | 31% | 95 | **thua** (107,8) | 60 | 15 |
| 10 | 10 | Chợ phiên | **Trùm:** nhiều điểm + chia chuyến + đường lớn | **Chợ phiên** 3, Giếng 1, Xóm Đông 1, Ao 2, Xóm Bãi 2 | 9 · 3 | 79,1 | 30,5% | 105 | **thua** (112,1) | 84 | 24 |

**Đối chiếu ba điều kiện "đúng ĐK":**

| Điều kiện | Kết quả |
|---|---|
| CT-05 (T0 theo công thức) | Đạt cả 10 màn |
| CT-07 (không tính toán thua, từ màn có chia chuyến) | Đạt màn 5–10 |
| CT-06 (số kế hoạch) | Màn 3–10 đạt (≥ 10). Màn 1–2 không áp dụng. Màn 10 (trùm): 84 kế hoạch đạt, **24 kế hoạch đạt 3★** (khung bản 0.4, C1-1) |

Đường lớn được dùng trong lời giải tối ưu của màn 8, 9, 10 (bỏ đường lớn thì chậm hơn).

## 4. Khung cảnh từng màn (NC-01 → NC-06, K1)

| Màn | Vùng | Lúc vào màn | Khi thắng (cảnh quay) | Câu thông báo |
|---|---|---|---|---|
| 1 | Xóm đầu 4×3 | Xóm nhỏ quanh Hợp tác xã, lũy tre, ruộng lúa bao quanh; lô chợ "Sắp xây" thấy ngay từ điểm xuất phát | **Lều chợ** dựng lên | Lều chợ đầu tiên đã dựng — làng có chỗ họp chợ rồi! |
| 2 | — | Lều chợ đã có | **Giếng làng** mái ngói | Giếng làng sửa xong — nước trong cho cả xóm. |
| 3 | + xóm Đông | Đường sang xóm Đông vừa thông | **Trường làng** | Trường làng khai giảng — tiếng trống vang cả xóm Đông. |
| 4 | — | | **Cụm nhà mới Xóm Đông** mọc lên | Xóm Đông có thêm nhà mới quanh trường. |
| 5 | + xóm Nam | Đường xuống xóm Nam vừa thông | **Trạm y tế** | Trạm y tế mở cửa — xóm Nam đã có đường vào. |
| 6 | — | | **Ao cá và vườn cây** | Ao cá thả giống xong — vườn cây xanh mát. |
| 7 | — | | **Đình làng** trùng tu | Đình làng trùng tu xong — mái cong đỏ thắm. |
| 8 | + đê ven sông | Đường đê vừa thông — đường lớn đầu tiên | **Bến đò** | Bến đò hoạt động — đường đê nối cả làng ra sông. |
| 9 | — | | **Nhà văn hóa** | Nhà văn hóa khánh thành — sẵn sàng cho phiên chợ lớn. |
| 10 | — | | **Chợ phiên hoàn chỉnh** cạnh cây đa → cảnh kết toàn cảnh: trời chiều, các công trình sáng lần lượt, đèn bật | Làng ven sông đã có chợ phiên! Bưu thiếp toàn cảnh đã lưu ở Trang chủ. |

Nhà mọc thành cụm quanh mỗi công trình vừa xây (K8). Ô phố chứa công trình đã xây là xóm làng (K5).

## 4b. Màn thưởng kim cương — "Phiên chợ vàng" (D-73)

| Hạng mục | Nội dung |
|---|---|
| Mở | Sau khi thắng màn 10; nút hộp quà sau cờ Hết chương ở Trang chủ |
| Bản đồ | Làng hoàn thiện (đủ 10 công trình, mọi tuyến đã thông) |
| Kim cương | 25, thành 7 cụm: c0r0–c1r0 (4), c3r0–c4r0 (3), đê c5r0–c5r1 (4), đê c5r2–c5r3 (3), c1r3–c2r3 (4), c3r1–c3r2 (3), c0r2–c0r3 (4) |
| Thời gian | Vòng nhặt hết nhanh nhất ≈ 60,5 giây theo bộ giải (≈ 57 giây demo) → T0 = 90 giây (+50%) |
| Quy tắc | MT-1 → MT-8 (Y_Tuong_Mo_Rong YT-03) |

## 5. Khung cảnh chủ đề (theo Chu_De_Khung_Canh mục 3.1)

| Hạng mục | Thể hiện trong demo |
|---|---|
| Nền | Ruộng lúa xanh non chia ô có bờ đất (ngoài xóm); xóm có nền đất sân vườn |
| Xóm | Nhà ba gian mái ngói đỏ có **sân gạch** phía trước, vài nhà mái tôn; **lũy tre** viền xóm; cây cau, chuối |
| Nước | Sông dọc mép Đông, ao ở góc xóm |
| Đường | Thường: đường bê tông liên thôn (màu sáng). Lớn: đường đê trải nhựa, vạch vàng |
| Trang trí | Trâu trong ruộng (không trên đường), đống rơm |
| Công trình | Mỗi công trình một hình khối riêng (K4): lều chợ mái lá, giếng tròn mái ngói, trường mái đỏ có sân cờ, trạm y tế mái xanh chữ thập đỏ, ao có cầu ao, đình mái cong, bến đò có thuyền, nhà văn hóa mái đỏ có sân khấu, chợ phiên nhiều sạp dưới cây đa |

## 6. Điểm còn mở

| # | Nội dung | Đề xuất |
|---|---|---|
| C1-1 | **Đã chốt (16/10):** màn trùm theo khoảng ≥ 10, độ khó đánh giá bằng số kế hoạch đạt 3★. Lý do: với biên 30,5% và 3 chuyến, chỉ riêng thứ tự các chuyến đã sinh ít nhất 6 kế hoạch cho mỗi cách chia chuyến; tìm tự động trên bản đồ này thấp nhất khoảng 60 | Khoảng 10–15 cho màn trùm ĐK thấp chưa thực tế; đề xuất màn trùm theo khoảng của ĐK (≥ 10) và đánh giá độ khó màn trùm bằng **số kế hoạch đạt 3★** (màn 10: 24) — cần BA xác nhận |
| C1-2 | Quy mô (khung mục 6) là hướng dẫn: màn 8 dùng 4 điểm · 5 kiện (khung ghi 3 · 4) để cách chơi không tính toán thua rõ ràng | Giữ |
| C1-3 | T_opt màn 4 (41 giây) và màn 8 (64 giây) thấp hơn mục tiêu CT-03 khoảng 10% | Giữ — điều kiện "đúng ĐK" là CT-05/06/07 |
