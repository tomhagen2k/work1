# Thiết kế 5 màn demo — độ khó tăng dần

| Thông tin | Nội dung |
|---|---|
| Phiên bản | 0.1 — bản phân tích chờ BA duyệt |
| Ngày | 14/10/2026 |
| Căn cứ | [Mo_Ta_Yeu_Cau_MVP.md](../Mo_Ta_Yeu_Cau_MVP.md) v1.0; phản hồi BA: dùng K1, K2, K3, K4, K5, K7, K8; **không dùng K6** (không hiện số giây trên đường) |
| Công cụ tính | [solver.py](solver.py) (bộ giải), [levels.py](levels.py) (dữ liệu màn), [gen_maps.py](gen_maps.py) (vẽ sơ đồ), kết quả thô [ket_qua.json](ket_qua.json) |

---

## 1. Nguyên tắc thiết kế

1. **Điều khiển giữ nguyên độ dễ** như demo hiện tại: 4 nút hướng, xe tự dừng ở điểm, bảng hỏi dừng đồng hồ. Độ khó chỉ đến từ **quyết định**.
2. **Mỗi màn thêm 1–2 yếu tố mới**, giữ lại các yếu tố của màn trước (mục 11.3 tài liệu yêu cầu).
3. **Không hiện số liệu thời gian** trên đường (bỏ K6). Người chơi **ước lượng** từ những gì nhìn thấy: độ dài đường, màu/loại đường, đặc tính xe. Vì vậy bài toán là **so sánh tương đối** ("đường lớn dài hơn nhưng nhanh hơn"), không phải cộng số.
4. **Mỗi màn phải chứng minh được 2 điều** bằng bộ giải:
   - Có **ít nhất một phương án** hoàn thành trong thời gian cho phép (T0).
   - Phương án **"không tính toán"** (định nghĩa ở mục 3.2) **không qua được** — tức là phải tính mới thắng.
5. **Thời gian cho phép** = thời gian tối ưu × hệ số dư, đủ cho **1–2 lần đi nhầm** (mục 3.3).

---

## 2. Thông số chung (giá trị khởi tạo, chỉnh qua chơi thử)

### 2.1. Phương tiện

| Xe | Tốc độ cơ sở | Sức chứa | Quay đầu | Xuất hiện từ |
|---|---|---|---|---|
| Xe van | 90 | 3 kiện | 1,5s | Màn 1 |
| Xe máy | 130 | 1 kiện | 1,0s | Màn 5 |
| Xe tải | 65 | 6 kiện | 2,5s | Màn 5 |

### 2.2. Loại đường — hệ số tốc độ theo xe

| Loại đường | Hình thức gợi ý | Xe máy | Xe van | Xe tải | Xuất hiện từ |
|---|---|---|---|---|---|
| Đường thường | Đường xám | ×1,0 | ×1,0 | ×1,0 | Màn 1 |
| Đường lớn | Đường rộng, nhiều làn | ×1,5 | ×1,5 | ×1,5 | Màn 3 |
| Đường đông | Nhiều xe nhỏ đứng/chạy chậm (hình ảnh, không va chạm) | ×0,8 | ×0,45 | ×0,35 | Màn 3 |
| Đường gồ ghề | Mặt đường đất, ổ gà | ×0,5 | ×0,7 | ×0,6 | Màn 5 |
| Hẻm | Đường hẹp | ×0,9 | Không vào được | Không vào được | Màn 5 |

> Đường đông bất lợi nhất cho xe lớn, gồ ghề bất lợi nhất cho xe máy → mỗi loại xe "thích" một kiểu đường khác nhau.

### 2.3. Thời gian phục vụ

Lấy hàng 2s mỗi lần chọn ở bảng hỏi; giao hàng 1,5s mỗi điểm. Bảng hỏi không tính giờ.

---

## 3. Cách tính thời gian

### 3.1. Bộ giải
[solver.py](solver.py) mô phỏng đúng luật demo (tốc độ theo xe và loại đường, quay đầu, tự giao, lấy tối đa theo chỗ trống, thời hạn riêng) và **duyệt mọi thứ tự** lấy/giao + **mọi đường đi** để tìm phương án nhanh nhất.

**Đối chiếu với demo thật:** màn 1 bộ giải cho 31,8s; demo chạy bằng script cho 30,9s → sai lệch khoảng 3%. Nguyên nhân: bộ giải coi vùng đỗ là một điểm giữa đoạn, demo dừng ở mép vùng.

### 3.2. Người chơi "không tính toán"
Mô phỏng một người chơi chỉ làm theo trực giác:
- Đi **đường ngắn nhất theo mắt nhìn** (theo độ dài, bỏ qua loại đường).
- Ở kho, **lấy theo thứ tự danh sách** nhiệm vụ.
- Có hàng thì **giao điểm gần nhất trước**; hết hàng thì về kho gần nhất.
- Không để ý thời hạn riêng.

### 3.3. Thời gian cho phép (T0) và "ngân sách lỗi"
- Một lần **rẽ nhầm** với xe van tốn khoảng **9s** (đi tới giao lộ kế tiếp + quay đầu + quay lại).
- Ngân sách lỗi = (T0 − tối ưu) / 9s.
- Mục tiêu: màn 1 dư nhiều để làm quen; màn 2–5 cho phép khoảng **1,5–2 lần nhầm**.

---

## 4. Tổng quan 5 màn

| Màn | Tên | Yếu tố mới | Bản đồ | Đơn / kiện | Tối ưu | Không tính toán | **T0** | Ngân sách lỗi |
|---|---|---|---|---|---|---|---|---|
| 1 | Làm quen | Điều khiển, xe tự dừng, bảng hỏi | 5×3 | 2 / 3 | 31,8s | 31,8s | **90s** | ~6 lần |
| 2 | Chia chuyến | **K1** Hàng nhiều hơn sức chứa | 5×3 | 3 / 5 | 50,9s | 93,9s ✗ | **70s** | ~2 lần |
| 3 | Đường lớn & đường đông | **K3** Tốc độ theo loại đường, **K2** 2 kho | 5×4 | 2 / 6 | 62,4s | 97,0s ✗ | **80s** | ~2 lần |
| 4 | Hạn giao | **K4** Thời hạn riêng (+ bản đồ lớn hơn, 4 đơn) | 6×4 | 4 / 7 | 98,4s | 124,4s ✗ (trễ hạn) | **120s** | ~2 lần |
| 5 | Chọn xe | **K8** Chọn xe, đường gồ ghề, hẻm | 6×4 | 4 / 8 | 98,9s (van) | 120,9s ✗ (trễ hạn) | **120s** | ~2 lần |

> **K7** (thời gian vừa đủ) áp dụng từ màn 2. **K5** (đường đóng/mở theo giờ) chưa đưa vào 5 màn này — đề xuất ở mục 7.

Độ phức tạp tăng theo: số kho (1 → 2), số đơn (2 → 4), tổng kiện (3 → 8), số chuyến tối thiểu (1 → 4), số loại đường (1 → 5), số ràng buộc (sức chứa → + tốc độ → + thời hạn → + chọn xe).

---

## 5. Chi tiết từng màn

### Màn 1 — Làm quen (giữ như demo hiện tại)

![Màn 1](maps/L1.svg)

| Mục | Nội dung |
|---|---|
| Mục tiêu học | Chọn hướng ở giao lộ, xe tự dừng ở điểm, bảng hỏi, quay đầu ở ngõ cụt |
| Nhiệm vụ | Kho A → Siêu thị 2 kiện; Kho A → Tiệm hoa 1 kiện (tổng 3 = vừa xe) |
| Phải tính | Hầu như không — chỉ chọn thứ tự giao (Tiệm hoa trên đường đi nên giao trước) |
| Tối ưu | Lấy cả 2 đơn → Tiệm hoa (22,6s) → Siêu thị (31,8s) |
| T0 | 90s (dư nhiều để người chơi tập điều khiển) |

### Màn 2 — Chia chuyến

![Màn 2](maps/L2.svg)

| Mục | Nội dung |
|---|---|
| Yếu tố mới | **Tổng hàng (5) lớn hơn sức chứa (3)** → phải đi ít nhất 2 chuyến |
| Nhiệm vụ | Kho A (giữa bản đồ) → Phía Đông 2 kiện; → Phía Tây 2 kiện; → Phía Bắc 1 kiện |
| Phải tính | **Gom đơn nào chung một chuyến.** Phía Đông và Phía Bắc gần nhau → nên đi chung |
| Tối ưu (50,9s) | Lấy Đông + Bắc (3 kiện) → Đông → Bắc → về kho lấy Tây → Tây |
| Bẫy | Lấy theo thứ tự danh sách: Đông 2 + Tây 1 → phải chạy cả hai phía trong một chuyến, rồi lại quay về chạy tiếp → **93,9s** |
| T0 | **70s** — tối ưu ×1,38 |

### Màn 3 — Đường lớn & đường đông

![Màn 3](maps/L3.svg)

| Mục | Nội dung |
|---|---|
| Yếu tố mới | **Đường lớn** (nhanh) và **đường đông** (chậm); **2 kho** ở hai phía |
| Nhiệm vụ | Kho A (Tây) → Chợ (Đông) 3 kiện; Kho B (Đông) → Trường (Tây) 3 kiện |
| Phải tính | **Đường ngắn hay đường nhanh.** Đường thẳng qua giữa bản đồ là đường đông. Có 2 đường vòng: phía trên (đường thường) và phía dưới (đường lớn, dài hơn nhưng nhanh hơn) |
| Tối ưu (62,4s) | Kho A → đi vòng tránh đường đông → Chợ → Kho B (ngay cạnh) → đi vòng → Trường |
| Bẫy | Đi thẳng qua đường đông cả 2 chiều → **97,0s** |
| T0 | **80s** — tối ưu ×1,28 |

### Màn 4 — Hạn giao

![Màn 4](maps/L4.svg)

| Mục | Nội dung |
|---|---|
| Yếu tố mới | **Thời hạn riêng** cho 2 trong 4 đơn; bản đồ lớn hơn (6×4) |
| Nhiệm vụ | Kho A → Bệnh viện 1 kiện (**hạn 40s**); Kho A → Chợ 2 kiện; Kho B → Trường 2 kiện (**hạn 85s**); Kho B → Khu nhà 2 kiện |
| Phải tính | **Đơn gấp trước hay gom chuyến trước.** Nếu không có hạn, phương án nhanh nhất (81,8s) giao Bệnh viện muộn và giao Khu nhà trước Trường. Thời hạn buộc người chơi đổi thứ tự |
| Tối ưu (98,4s) | Lấy Bệnh viện + Chợ → **Bệnh viện (26,4s)** → Chợ → Kho B lấy Trường → **Trường (74,6s)** → về Kho B lấy Khu nhà → Khu nhà |
| Bẫy | Phương án "hợp lý" theo quãng đường: giao Khu nhà trước (gần Kho B) → Trường lúc 88,5s → **trễ hạn 85s**. Người chơi không tính toán: trễ hạn Trường và mất 124,4s |
| Dư hạn | Bệnh viện: 13,6s; Trường: 10,4s (khoảng 1 lần nhầm) |
| T0 | **120s** — tối ưu ×1,22 |

### Màn 5 — Chọn xe

![Màn 5](maps/L5.svg)

| Mục | Nội dung |
|---|---|
| Yếu tố mới | **Chọn 1 trong 3 xe** trước khi chơi; **đường gồ ghề**; **hẻm** (chỉ xe máy) |
| Nhiệm vụ | Kho A → Chợ 2 kiện; Kho A → Khu nhà 2 kiện; Kho B → Cảng 3 kiện; Kho B → Trường 1 kiện (**hạn 60s**) |
| Phải tính | **Xe nào phù hợp.** Mỗi xe có một cái bẫy: xe máy nhanh nhưng chở 1 kiện (8 kiện = 8 chuyến); xe tải chở hết trong 2 chuyến nhưng chậm, và đường đông/gồ ghề làm chậm thêm; xe van ở giữa |
| Kết quả theo xe | **Xe van: 98,9s** (đạt) · Xe tải: 129,9s (không đạt — muốn kịp hạn Trường phải sang Kho B trước, rồi quay lại Kho A rất xa) · Xe máy: 142,2s (không đạt — quá nhiều chuyến) |
| Tối ưu (xe van) | Kho A lấy Chợ → Chợ → Kho B lấy Trường → **Trường (50,0s)** → Kho B lấy Cảng → Cảng → về Kho A lấy Khu nhà → Khu nhà |
| Bẫy | Chọn xe tải "để chở 1 lần cho xong" → trễ hạn hoặc hết giờ. Xe van chơi không tính toán: trễ hạn Trường |
| Dư hạn | Trường: 10s |
| T0 | **120s** — xe van tối ưu ×1,21 |

---

## 6. Rủi ro và giới hạn của phân tích

| # | Rủi ro | Mức | Cách xử lý |
|---|---|---|---|
| R1 | Bộ giải sai lệch khoảng 3% so với demo (vị trí dừng trong vùng đỗ) | Thấp | Sau khi dựng màn trong demo, chạy lại lộ trình tối ưu bằng script trong demo để chốt T0 |
| R2 | "Người chơi không tính toán" là mô hình giả định; người thật có thể chơi kém hơn hoặc tốt hơn | Trung bình | Chơi thử với vài người; ghi thời gian thực tế để chỉnh hệ số dư |
| R3 | Không có số liệu trên đường (bỏ K6) → người chơi có thể **không ước lượng nổi** đường đông chậm bao nhiêu | **Cao** | Cần **thể hiện trực quan rõ**: xe NPC trang trí chạy chậm trên đường đông, đường lớn có vạch nhiều làn; màn hình chuẩn bị có chú giải "Đường đông: xe van chậm hơn nhiều" (chỉ định tính, không có số) |
| R4 | Màn 5: chỉ một xe đạt → có thể quá khắt khe với nguyên tắc "nhiều phương án hợp lệ" | Trung bình | Phương án thay thế: bỏ hạn Trường → xe van (92,8s) và xe tải (100,2s) đều đạt, xe máy vẫn không đạt |
| R5 | Thời hạn ở màn 4–5 chỉ dư khoảng 10s (khoảng 1 lần nhầm) | Trung bình | Có thể nới thêm 5s sau khi chơi thử |
| R6 | Xe đi ngang một điểm giao khi đang chở hàng của điểm đó thì bị **tự dừng giao** dù người chơi chỉ muốn đi qua | Thấp | Luôn có lợi (đằng nào cũng phải giao), không ảnh hưởng kết quả |

---

## 7. Đề xuất sau 5 màn (chưa làm)

| Màn | Yếu tố | Ghi chú |
|---|---|---|
| 6 | **K5** Đường/cầu đóng–mở theo giờ (báo trước trên bản đồ) | Bài toán canh thời điểm, không bắt xe dừng chờ |
| 7 | Chở khách (taxi) + thời hạn theo lượt khách | Đã có trong yêu cầu (Q-43) |
| 8 | Điểm đổi xe | Kết hợp chọn xe trong lúc chơi |

---

## 8. Cần BA chốt

| ID | Câu hỏi | Đề xuất |
|---|---|---|
| Q-50 | Thứ tự và nội dung 5 màn như bảng mục 4 có phù hợp không? | Đồng ý như bảng |
| Q-51 | Bộ thông số xe và hệ số loại đường (mục 2) dùng làm giá trị khởi tạo? | Đồng ý; chỉnh sau khi chơi thử |
| Q-52 | Màn 5: chỉ xe van đạt (có hạn Trường), hay để 2 xe cùng đạt (bỏ hạn)? | Giữ hạn — màn cuối demo nên kiểm tra tính toán rõ nhất; mục R4 là phương án dự phòng |
| Q-53 | Cách thể hiện đường đông / gồ ghề / đường lớn khi không có số liệu (R3)? | Hình ảnh + chú giải định tính ở màn chuẩn bị |
| Q-54 | Demo có cho chọn màn tự do (để thử nhanh) hay phải qua màn trước mới mở màn sau? | Cho chọn tự do trong demo; bản chính thức mới khóa theo tiến độ |
