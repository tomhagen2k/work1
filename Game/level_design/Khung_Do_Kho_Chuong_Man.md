# Khung độ khó — chương, màn và các yếu tố độ khó

| Thông tin | Nội dung |
|---|---|
| Phiên bản | 0.4 — màn trùm Chương 1 theo khoảng ≥ 10, độ khó màn trùm đánh giá bằng số kế hoạch đạt 3★. 0.3 — CT-06 đếm theo kế hoạch chuẩn, không áp dụng cho màn ≤ 2 điểm giao; CT-07 áp dụng từ màn đầu tiên có chia chuyến. 0.2 — chốt bố cục 15 chương, bộ công thức CT-01 → CT-09, bảng tra thời gian, quy trình kiểm chứng; bỏ phần câu chuyện và phần so sánh với demo |
| Ngày | 16/10/2026 |
| Mục đích | **Một nơi duy nhất** để giám sát: cấu trúc chương và màn, độ khó mục tiêu từng màn, yếu tố dùng ở từng chương, thời gian và cách kiểm chứng |
| Liên quan | [Mo_Ta_Yeu_Cau_MVP.md](../Mo_Ta_Yeu_Cau_MVP.md) (D-63, D-64, D-65) · [Chu_De_Khung_Canh.md](../Chu_De_Khung_Canh.md) · bộ giải [solver.py](solver.py) |

**Quy ước nguồn:** **[XN]** BA đã xác nhận · **[SL]** suy luận từ tài liệu · **[GĐ]** giả định cần xác nhận · **[MỞ]** câu hỏi còn mở (mục 11).

> **Các màn demo hiện có (Chương 1, Chương 2) là bản thử nghiệm**, không theo khung này. Màn thật sẽ được dựng lại theo khung. **[XN]** 16/10

---

## 1. Phạm vi

| # | Nội dung | Nguồn |
|---|---|---|
| PV-01 | Game chỉ dùng logic **vận chuyển hàng hóa**. Mọi chương cùng một nghề, cùng cách điều khiển | [XN] D-64 |
| PV-02 | **Chở khách (taxi)** và **đổi xe giữa màn** giữ trong tài liệu, không dùng trong lộ trình hiện tại; nếu dùng thì đặt ở các chương cuối | [XN] D-64 |
| PV-03 | Độ khó đến từ **quyết định** (lên phương án), không đến từ thao tác | [XN] |
| PV-04 | Game cần **nhẹ**, không chiếm nhiều dung lượng thiết bị. Không làm phần câu chuyện, nhân vật trong lộ trình chính; nếu cần thì thêm cho các **sự kiện** sau này | [XN] 16/10 |

---

## 2. Cấu trúc chương và màn

| # | Quy tắc | Nguồn |
|---|---|---|
| CM-01 | Khoảng **15 chương × 10 màn** (khoảng 150 màn) | [XN] D-63 |
| CM-02 | Trong một chương, **màn sau luôn khó hơn màn trước** (không có màn nghỉ xen giữa) | [XN] D-63 |
| CM-03 | Sang chương mới, độ khó **lùi 4 bậc**: màn 1 chương *c + 1* ngang màn 6 chương *c* | [XN] D-63 |
| CM-04 | **Màn 10 mỗi chương là màn trùm**: tổ hợp mọi yếu tố đã có trong chương, gắn với phần thưởng lớn nhất chương | [XN] 16/10 |

---

## 3. Bố cục 15 chương — yếu tố theo chương

### 3.1. Nguyên tắc giới thiệu yếu tố

| # | Nguyên tắc | Nguồn |
|---|---|---|
| YT-01 | **Chương 1 nhẹ nhàng:** 1 kho, 1 loại xe (van), các khái niệm nhỏ dễ hiểu bằng trực giác | [XN] |
| YT-02 | **Từ Chương 2, mỗi chương thêm tối đa 1 yếu tố mới**, đặt ở **màn 3**; màn 1–2 ôn lại | [XN] |
| YT-03 | Yếu tố "thưởng" dạy trước yếu tố "phạt" (đường lớn trước đường đông); một xe trước khi phải chọn xe | [XN] |
| YT-04 | Độ khó trong chương tăng nhờ **tổ hợp và bố trí điểm** (thêm điểm giao, điểm hai phía, gom chuyến khéo), không nhồi thêm luật | [XN] |

### 3.2. Bảng phân bổ

| Chương | ĐK | Yếu tố mới (ở màn 3) | Xe được dùng |
|---|---|---|---|
| 1 | 1–10 | Điều khiển (M1), nhiều điểm giao (M3), chia chuyến (M5), đường lớn (M8) | Van |
| 2 | 6–15 | **Nhiều kho** | Van |
| 3 | 11–20 | **Đường đông** | Van |
| 4 | 16–25 | **Hạn giao** | Van |
| 5 | 21–30 | **Hẻm + xe máy** (lần đầu chọn xe) | Van, máy |
| 6 | 26–35 | **Đường gồ ghề + xe tải** | Van, máy, tải |
| 7 | 31–40 | **Ngõ cụt, quay đầu** (thời gian quay đầu khác nhau theo xe) | 3 xe |
| 8 | 36–45 | **Khu cấm tải** | 3 xe |
| 9 | 41–50 | **Đường/cầu đóng mở theo giờ** (báo trước) | 3 xe |
| 10 | 46–55 | **Hàng về kho theo đợt** (biết trước ở màn chuẩn bị) | 3 xe |
| 11 | 51–60 | **Hàng tươi — hạn tính từ lúc lấy** | 3 xe |
| 12 | 56–65 | **Đơn theo chuỗi** (đơn B mở khi xong đơn A) | 3 xe |
| 13 | 61–70 | **Xe đầu kéo** (chỉ đường lớn, 10 kiện) | 4 xe |
| 14 | 66–75 | Không thêm — tổng hợp. Dự phòng cho đổi xe nếu sau này dùng (PV-02) | 4 xe |
| 15 | 71–80 | Không thêm — tổng hợp đỉnh | 4 xe |

Nguồn: [XN] 16/10. Nếu sau này thấy quá nhiều yếu tố, hai yếu tố nên bỏ trước là **đơn theo chuỗi** và **xe đầu kéo**.

---

## 4. Bộ công thức (chương *c*, màn *m*)

Nguồn: [XN] 16/10.

| ID | Thông số | Công thức / quy tắc |
|---|---|---|
| CT-01 | Độ khó | **ĐK = 5(c − 1) + m** |
| CT-02 | Yếu tố | Màn 1–2: ôn. **Màn 3: yếu tố mới** (mục 3.2). Màn 4–9: tổ hợp. **Màn 10: trùm.** Chương 1 ngoại lệ: yếu tố mới ở màn 1, 3, 5, 8 |
| CT-03 | Thời gian tối ưu (T_opt) | T_opt = T_min(c) + (T_max(c) − T_min(c)) × (m − 1) / 9, với **T_min(c) = min(30 + 20(c − 1), 90)** và **T_max(c) = min(80 + 25(c − 1), 165)**. Từ Chương 5, độ dài màn không tăng thêm |
| CT-04 | Biên thời gian | **biên = max(20%, 35% − 0,5% × (ĐK − 1))**; màn có yếu tố mới **+10%** |
| CT-05 | Thời gian cho phép | **T0 = T_opt × (1 + biên)**, làm tròn lên bội số 5 giây, **tối đa 200 giây** (thời gian đếm ngược người chơi thấy). Ngoại lệ: Chương 1 màn 1 (hướng dẫn) T0 = 90 |
| CT-06 | Số kế hoạch đạt (số cách thắng trong T0) | ĐK 1–10: ≥ 10 · ĐK 11–30: 5–20 · ĐK 31–50: 3–10 · ĐK 51–70: 2–6 · ĐK 71–80: 1–4. **Màn trùm:** Chương 1 theo khoảng của ĐK (≥ 10); độ khó màn trùm đánh giá thêm bằng **số kế hoạch đạt 3★** (về đích khi còn dư > 10% thời gian). Các chương sau: tạm lấy nửa dưới của khoảng, xem lại khi dựng (Chương 1 cho thấy 3 chuyến với biên ≥ 30% sinh ít nhất khoảng 60 kế hoạch). **Không áp dụng** cho màn có ≤ 2 điểm giao (số kế hoạch tối đa chỉ khoảng 4) |
| CT-07 | Bẫy | Từ **màn đầu tiên có chia chuyến** (Chương 1: màn 5, ĐK 5), cách chơi **không tính toán phải thua**. Màn chỉ 1 chuyến không thể đạt: cách chơi giao điểm gần nhất trước chỉ chậm hơn tối ưu tối đa khoảng 17%, thấp hơn biên |
| CT-08 | Có thể đạt 3★ | Hệ quả của CT-04: biên ≥ 20% → chạy tối ưu còn dư ≥ 16,7% thời gian, trên ngưỡng 10% của 3★ (D-41); còn chỗ cho khoảng 1 lần rẽ nhầm |
| CT-09 | Màn nhiều xe | Thông số tính theo **xe tốt nhất**. Mỗi xe khác còn được chọn phải đạt được, trừ khi màn cố ý cho xe đó thua. Không xe nào có số kế hoạch đạt vượt trần CT-06 |

**Định nghĩa "kế hoạch" (kế hoạch chuẩn):** chuỗi các chuyến; mỗi chuyến **về kho khi xe đã trống**, lấy hàng, rồi **chỉ đi tới các điểm có hàng trên xe** để giao. Hai kế hoạch khác nhau khi khác cách chia hàng vào chuyến hoặc khác thứ tự điểm. Giữa hai điểm xe đi đường nhanh nhất. (Đếm theo mọi thứ tự điểm dừng thì ra hàng trăm biến thể vô nghĩa — không dùng.)

**Một màn được coi là "đúng ĐK"** khi thỏa đủ **CT-05, CT-06 và CT-07**. Không dùng chỉ số có trọng số. [XN] — trả lời DK-Q1.

---

## 5. Bảng tra thời gian: T_opt / T0 (giây)

Ô có ✦ là màn có yếu tố mới (biên +10%). Tính theo CT-03 → CT-05.

| Ch. | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 | M9 | M10 trùm |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | ✦30/90 | 36/50 | ✦41/60 | 47/65 | ✦52/75 | 58/80 | 63/85 | ✦69/100 | 74/100 | 80/105 |
| 2 | 50/70 | 56/75 | ✦62/90 | 68/90 | 74/100 | 81/105 | 87/115 | 93/120 | 99/130 | 105/135 |
| 3 | 70/95 | 77/100 | ✦83/120 | 90/120 | 97/125 | 103/135 | 110/140 | 117/150 | 123/160 | 130/165 |
| 4 | 90/115 | 97/125 | ✦104/145 | 112/145 | 119/150 | 126/160 | 133/170 | 141/175 | 148/185 | 155/195 |
| 5–6 | 90/115 | 98/120–125 | ✦107/145 | 115/140–145 | 123/150–155 | 132/160–165 | 140/170–175 | 148/180–185 | 157/190 | 165/200 |
| 7–13 | 90/110 | 98/120 | ✦107/140 | 115/140 | 123/150 | 132/160 | 140/170 | 148/180 | 157/190 | 165/200 |
| 14–15 | 90/110 | 98/120 | 107/130 | 115/140 | 123/150 | 132/160 | 140/170 | 148/180 | 157/190 | 165/200 |

- Từ Chương 5, thời gian gần như giống nhau giữa các chương: độ khó tăng nhờ **số cách thắng giảm** (CT-06) và yếu tố mới, không nhờ màn dài hơn.
- T0 màn 3 có thể bằng hoặc lớn hơn màn 4 (vì +10% biên để học yếu tố mới). Không trái CM-02, vì độ khó đo bằng CT-06 chứ không bằng thời gian.

---

## 6. Hướng dẫn quy mô bản đồ

[GĐ] — dùng tạm, hiệu chỉnh khi dựng màn thật ([XN] 16/10).

| Chương | Kho | Điểm giao | Tổng kiện | Lưới |
|---|---|---|---|---|
| 1 | 1 | 2 → 5 | 3 → 9 | 5×3 → 6×4 |
| 2 | 1 → 3 (2 kho từ M3, 3 kho từ M8) | 3 → 5 | 5 → 10 | 6×4 → 7×4 |
| 3–4 | 1 → 3 | 3 → 6 | 6 → 12 | 6×4 → 8×5 |
| 5–15 | 1 → 3 | 3 → 6 | 6 → 12 | tối đa 8×5 |

Từ Chương 5 bản đồ không to thêm: quá mức này khó đọc trên khung 844×390 (D-20, D-33) và phải nhớ quá nhiều.

---

## 7. Chi tiết Chương 1 (1 kho, xe van, ĐK 1–10)

| Màn | ĐK | Nội dung | Điểm giao · kiện · số chuyến | T_opt | Biên | T0 | Kế hoạch đạt |
|---|---|---|---|---|---|---|---|
| 1 | 1 | **Mới:** làm quen điều khiển (hướng dẫn) | 2 · 3 · 1 | 30 | — | 90 | Không áp dụng (≤ 2 điểm giao) |
| 2 | 2 | Ôn điều khiển, bản đồ khác | 2 · 3 · 1 | 36 | 34,5% | 50 | Không áp dụng (≤ 2 điểm giao) |
| 3 | 3 | **Mới:** nhiều điểm giao, chọn thứ tự giao | 3 · 3 · 1 | 41 | 44% | 60 | ≥ 10 |
| 4 | 4 | Điểm giao ở hai phía kho | 3 · 3 · 1 | 47 | 33,5% | 65 | ≥ 10 |
| 5 | 5 | **Mới:** chia chuyến (5 kiện, xe chở 3) | 3 · 5 · 2 | 52 | 43% | 75 | ≥ 10 |
| 6 | 6 | Gom chuyến theo cụm điểm | 4 · 6 · 2 | 58 | 32,5% | 80 | ≥ 10 |
| 7 | 7 | Cách gom "trực giác" bị thua | 4 · 7 · 3 | 63 | 32% | 85 | ≥ 10 |
| 8 | 8 | **Mới:** đường lớn (đường vòng nhanh hơn đường thẳng) | 3 · 4 · 2 | 69 | 41,5% | 100 | ≥ 10 |
| 9 | 9 | Đường lớn + chia chuyến | 4 · 7 · 3 | 74 | 31% | 100 | ≥ 10 |
| 10 | 10 | **Trùm:** nhiều điểm + chia chuyến + đường lớn | 5 · 9 · 3 | 80 | 30,5% | 105 | ≥ 10 (đánh giá thêm bằng số kế hoạch đạt 3★) |

## 8. Chi tiết Chương 2 (thêm nhiều kho, ĐK 6–15)

| Màn | ĐK | Nội dung | T_opt | Biên | T0 | Kế hoạch đạt |
|---|---|---|---|---|---|---|
| 1 | 6 | Ôn: 1 kho, chia chuyến | 50 | 32,5% | 70 | ≥ 10 |
| 2 | 7 | Ôn: đường lớn + chia chuyến | 56 | 32% | 75 | ≥ 10 |
| 3 | 8 | **Mới:** 2 kho | 62 | 41,5% | 90 | ≥ 10 |
| 4 | 9 | 2 kho, mỗi kho 2 đơn | 68 | 31% | 90 | ≥ 10 |
| 5 | 10 | 2 kho + chia chuyến | 74 | 30,5% | 100 | ≥ 10 |
| 6 | 11 | 2 kho ở hai phía + đường lớn | 81 | 30% | 105 | 5–20 |
| 7 | 12 | Thứ tự kho quyết định thắng thua | 87 | 29,5% | 115 | 5–20 |
| 8 | 13 | 3 kho | 93 | 29% | 120 | 5–20 |
| 9 | 14 | 3 kho + chia chuyến + đường lớn | 99 | 28,5% | 130 | 5–20 |
| 10 | 15 | **Trùm:** tổ hợp toàn chương | 105 | 28% | 135 | 5–12 |

Chương 3–15: dùng bảng tra mục 5 và phân bổ mục 3.2; chi tiết từng màn viết khi dựng chương đó.

---

## 9. Quy trình kiểm chứng một màn

1. Dựng màn theo CT-02 và quy mô mục 6.
2. Chạy **bộ đếm kế hoạch theo đúng tốc độ demo**. Kết quả: T_opt thực, số kế hoạch đạt, kết quả của cách chơi không tính toán.
3. Đặt T0 theo CT-05 dựa trên T_opt thực.
4. Kiểm tra CT-06, CT-07, CT-09. Chưa đạt thì **sửa bản đồ** (vị trí điểm, đường lớn, số kiện); **không chỉnh T0** để ép đạt chuẩn.
5. Ghi kết quả vào bảng theo dõi của chương (thêm khi dựng chương).

**Việc cần làm trước khi dựng màn:** viết lại bộ đếm kế hoạch theo đúng tốc độ demo. Bộ giải hiện tại ([solver.py](solver.py)) tính chậm hơn demo khoảng 3–10%, nên số kế hoạch đếm được thấp hơn thực tế.

---

## 10. Các yếu tố độ khó (tham chiếu)

Cột **Chương** là chương giới thiệu yếu tố theo mục 3.2.

| Nhóm | ID | Yếu tố | Chương |
|---|---|---|---|
| A. Bản đồ | A1 | Loại đường: lớn · đông · hẻm · gồ ghề | 1 · 3 · 5 · 6 |
| | A2 | Khu cấm tải | 8 |
| | A3 | Kích thước bản đồ, số giao lộ | Tăng dần (mục 6) |
| | A4 | Ngõ cụt (buộc quay đầu) | 7 |
| | A5 | Bố trí điểm: cụm, hai phía, xa nhau | Từ 1 |
| | A6 | Nhiều tuyến gần ngang nhau | Từ 1 (M8) |
| | A7 | Đường/cầu đóng mở theo giờ | 9 |
| B. Phương tiện | B1 | Tốc độ, sức chứa, loại đường được đi | Từ 1 |
| | B2 | Thời gian quay đầu theo xe | 7 |
| | B3 | Chọn xe | 5 |
| | B4 | Xe đầu kéo | 13 |
| | B5 | Đổi xe giữa màn | Dự phòng (PV-02) |
| | B6 | Taxi, chở khách | Không dùng (PV-02) |
| C. Nhiệm vụ | C1 | Nhiều điểm giao · nhiều kho | 1 · 2 |
| | C2 | Chia chuyến (số kiện so với sức chứa) | 1 |
| | C3 | Hạn giao tuyệt đối | 4 |
| | C4 | Hạn tính từ lúc lấy hàng (hàng tươi) | 11 |
| | C5 | Hàng về kho theo đợt | 10 |
| | C6 | Đơn theo chuỗi | 12 |
| D. Thời gian | D1 | Biên thời gian | CT-04 |
| | D2 | Độ dư của hạn riêng | Từ 4 |
| E. Nhận thức | E1 | Độ bẫy (cách chơi không tính toán thua) | CT-07 |
| | E2 | Độ tinh của ước lượng (game không hiện số) | Ngầm |
| | E3 | Số phương án hợp lệ | CT-06 |
| | E4 | Lượng thông tin phải nhớ | Giới hạn bởi mục 6 |
| F. Thao tác | F1 | Mật độ giao lộ | Theo dõi, giữ thấp (PV-03) |
| | F2 | Cái giá của lỡ rẽ | Theo dõi |

**Đề xuất đã nêu, chưa chọn** (giữ để tham khảo): thử thách sao theo cách giải (cần xem D-11), nhịp màn ngắn/dài, xây dựng dần cho mọi chương, cổng sao mở chương, sưu tầm, "bóng ma" kỷ lục, thử thách ngày, câu chuyện và nhân vật (để dành cho sự kiện — PV-04). **Không làm:** sự kiện ngẫu nhiên, hạn mềm, nhiên liệu, giới hạn mở bản đồ (trái D-09, D-03, D-08, D-13).

---

## 11. Câu hỏi còn mở

| ID | Câu hỏi | Đề xuất của Claude |
|---|---|---|
| DK-Q7 | ~~Danh sách chương trong demo không khớp mục 3.2~~ | **Đã xử lý** ở demo v1.4: Chương 1 Làng ven sông, Chương 3–4 "Sắp có" theo bố cục 15 chương |

Đã trả lời: DK-Q1 (ba điều kiện đo được, mục 4), DK-Q2 (D-64), DK-Q3 (mục 3.2), DK-Q4 (sàn 20%, CT-04), DK-Q5 (màn trùm theo đúng công thức, không nới thêm), DK-Q6 (bỏ câu chuyện — PV-04).

---

## 12. Lịch sử

| Ngày | Phiên bản | Nội dung |
|---|---|---|
| 16/10/2026 | 0.1 | Tạo file: khung D-63, 6 nhóm yếu tố, D-64, màn trùm, đề xuất câu chuyện |
| 16/10/2026 | 0.2 | Chốt bố cục 15 chương (Chương 1 chỉ 1 kho, mỗi chương sau thêm 1 yếu tố), bộ công thức CT-01 → CT-09 (T0 tối đa 200 giây, sàn biên 20%, +10% màn có yếu tố mới, ba điều kiện đo được thay chỉ số trọng số), bảng tra, quy mô, chi tiết Chương 1–2, quy trình kiểm chứng. Bỏ câu chuyện (PV-04) và phần so sánh với demo (demo là thử nghiệm) |
| 16/10/2026 | 0.3 | Khi dựng Chương 1 thấy 3 điểm không đạt được: đổi định nghĩa kế hoạch thành kế hoạch chuẩn (CT-06), CT-06 không áp dụng cho màn ≤ 2 điểm giao, CT-07 từ màn đầu tiên có chia chuyến. BA duyệt |
| 16/10/2026 | 0.4 | Màn trùm Chương 1: số kế hoạch đạt theo khoảng ≥ 10 (khoảng 10–15 không đạt được với biên 30,5%); độ khó màn trùm đánh giá thêm bằng số kế hoạch đạt 3★. BA duyệt (C1-1) |
