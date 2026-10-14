# Đề xuất trải nghiệm màn chơi — chờ xuất phát, xem nhiệm vụ, hướng dẫn

| Thông tin | Nội dung |
|---|---|
| Phiên bản | 0.2 — BA đã chốt Q-68 (PA1), Q-69 (PA-C), chỉ báo thời gian ngắn trong popup |
| Ngày | 14/10/2026 |
| Căn cứ | Phản hồi BA 14/10/2026; [Mo_Ta_Yeu_Cau_MVP.md](Mo_Ta_Yeu_Cau_MVP.md) v1.8 |
| Bản thử | [mockups/proto_trai_nghiem.html](mockups/proto_trai_nghiem.html) — bản sao demo, chơi được, đã đặt theo phương án BA chọn. Demo gốc **chưa sửa** |
| Trạng thái | **Chưa phải yêu cầu.** Chỉ đưa vào Mô tả yêu cầu khi BA chốt mục 5 |

---

## 1. Chờ xuất phát

| ID (đề xuất) | Nội dung | Nguồn |
|---|---|---|
| XP-01 | Nhấn **Bắt đầu** ở màn chuẩn bị → vào màn chơi, **xe đứng yên**. | [XN] phản hồi BA |
| XP-02 | Chỉ khi nhấn **mũi tên cùng hướng đầu xe** (theo màn hình, D-19) xe mới bắt đầu chạy. Mũi tên khác → không phản hồi (D-15). | [XN] |
| XP-03 | Nút cùng hướng đầu xe **sáng vàng, nhấp nháy**; bong bóng "Nhấn để xe chạy · Đồng hồ chưa chạy" cạnh cụm nút. | [GĐ] — Q-67 |
| XP-04 | **Đồng hồ chưa chạy** cho tới khi xe xuất phát. | [GĐ] — Q-65 |
| XP-05 | Quay đầu khi đang chờ: xe quay tại chỗ, **vẫn đứng chờ**, nút sáng đổi theo hướng mới. | [GĐ] — Q-66 |
| XP-06 | Khi đang chờ vẫn mở được Tạm dừng, Bản đồ lớn, Nhiệm vụ, Hướng dẫn; đóng lại → vẫn đứng chờ. | [SL] |

Ảnh hưởng tới yêu cầu hiện có: **GL-06** (đồng hồ chạy khi nhấn Bắt đầu) và **CT-01** (nhấn Bắt đầu xe tự chạy) phải sửa.

Ảnh: [tn_cho_xuat_phat.jpg](mockups/tn_cho_xuat_phat.jpg)

---

## 2. Nút ở góc trên bên trái

- Hàng trên cùng: **⏱ đồng hồ · 📋 Nhiệm vụ · ? Hướng dẫn**; nút tròn 44px (UI-14).
- Chạm vào **cụm vòng tiến độ nhiệm vụ** cũng mở popup nhiệm vụ (vùng chạm lớn hơn). [GĐ] — Q-71
- Nút Hướng dẫn có **chấm đỏ "!"** khi màn có cơ chế mới và chưa mở hướng dẫn. [GĐ] — Q-70

### Quy tắc chung của 2 popup [XN] / [SL]

| # | Quy tắc |
|---|---|
| P1 | Mở popup → **thời gian dừng** (như tạm dừng); bản đồ phía sau **phủ tối nhẹ, vẫn thấy**; popup nền trắng trong mờ (giống D-31) |
| P2 | Đầu popup có chỉ báo ngắn **"⏸ mm:ss"** (biểu tượng tạm dừng + thời gian còn lại) — [XN] BA yêu cầu rút gọn; [GĐ] dạng hiển thị cụ thể |
| P3 | Đóng: nút ✕ (44px), chạm ra ngoài popup, phím Esc → quay lại đúng trạng thái trước (đang chạy hoặc đang chờ xuất phát) |
| P4 | Không mở được khi đang hiện bảng hỏi hoặc đã kết thúc màn |

---

## 3. Popup nhiệm vụ — 3 phương án

| PA | Cách trình bày | Ưu | Nhược | Ảnh |
|---|---|---|---|---|
| **PA1 · Danh sách** ✅ BA chọn | Mỗi đơn một dòng: số thứ tự (khớp vòng trên HUD), **Kho → Điểm giao**, thanh tiến độ, trạng thái, hạn. Đơn có hạn lên đầu, đơn xong xuống cuối | Đơn giản, dễ mở rộng nhiều đơn | Không thấy ngay "ở kho này lấy được những gì" | [PA1](mockups/tn_nhiem_vu_PA1.jpg) |
| PA2 · Theo nơi lấy hàng (Claude đã khuyến nghị) | Nhóm theo kho: "Kho A · còn n kiện chờ lấy", dưới là các đơn đi từ kho đó | **Khớp đúng quyết định chính của game**: tới kho lấy đơn nào, gom chuyến ra sao. Chương taxi thì nhóm theo điểm đón | Kho chỉ có một đơn thì nhóm hơi thừa | [PA2](mockups/tn_nhiem_vu_PA2.jpg) |
| PA3 · Thẻ | Mỗi đơn một thẻ lớn có vòng tiến độ (cùng kiểu vòng trên HUD) | Trực quan, nhất quán với HUD | Chỉ vừa khoảng 4 đơn; nhiều đơn phải cuộn ngang | [PA3](mockups/tn_nhiem_vu_PA3.jpg) |

Cả 3 đều có dòng cuối: xe đang dùng · trên xe x/y kiện · đã giao tổng · lưu ý đơn có hạn.

**Trạng thái đơn:** Chờ lấy n · Đang chở n · Đã lấy hết · ✓ Xong. **Hạn:** "⏱ Hạn còn mm:ss" (đếm ngược như vòng trên HUD), đỏ đậm khi còn ≤ 10 giây.

---

## 4. Popup hướng dẫn — 3 phương án

Nội dung dùng chung, mỗi ý **một câu**, có biểu tượng; phần nào có hình minh họa thì kèm hình:

| Nhóm | Nội dung |
|---|---|
| ★ Màn này | Mục tiêu (số kiện, số đơn, thời gian) · **cơ chế mới của màn** · các loại đường có trong màn (kèm biển báo) · xe đang dùng và sức chứa |
| Lái xe | Xuất phát · Rẽ (nút sáng vàng, bấm lại để hủy) · Không bấm gì (đi thẳng / dừng chờ) · Quay đầu |
| Lấy & giao | Ký hiệu ▲ vuông / ▼ tròn · Xe tự dừng, tự giao · Lấy hàng qua bảng hỏi · Sức chứa, chia chuyến |
| Loại đường | Mỗi loại một dòng: biển báo, tên, mô tả ngắn, **ảnh hưởng theo từng xe** bằng chữ (Nhanh hơn / Bình thường / Hơi chậm / Chậm / Rất chậm / Không vào), tự suy từ bảng hệ số nên luôn khớp game. Không hiện số (D-26). Đường không có trong màn thì mờ; xe đang dùng có viền xanh |
| Thời gian | Đếm ngược, chỉ chạy khi xe đã xuất phát · Đơn có hạn · Khi nào đồng hồ đứng yên |

| PA | Cách trình bày | Ưu | Nhược | Ảnh |
|---|---|---|---|---|
| **PA-C · Thẻ chủ đề** ✅ BA chọn | Cột trái 5 tab; mở ra luôn ở tab **"Màn này"** | Người chơi đọc đúng thứ cần cho màn đang chơi trước; tra lại nhanh; thêm cơ chế mới (taxi, đổi xe) chỉ thêm tab | Phải chạm để xem tab khác | [Màn này](mockups/tn_huong_dan_C_man_nay.jpg) · [Lái xe](mockups/tn_huong_dan_C_lai_xe.jpg) · [Loại đường](mockups/tn_huong_dan_C_loai_duong.jpg) |
| PA-A · Lướt từng thẻ | 5 thẻ, nút ◀ ▶ và chấm trang | Mỗi lần một ý, rất dễ đọc; hợp lần đầu chơi | Tra lại một ý phải lướt qua nhiều thẻ | [PA-A](mockups/tn_huong_dan_A.jpg) |
| PA-B · Một trang | 3 cột Lái xe / Lấy & giao / Đường & giờ + dải "Màn này" | Thấy hết trong một lần nhìn | Chật trên điện thoại; màn nhiều loại đường phải cuộn | [PA-B](mockups/tn_huong_dan_B.jpg) |

---

## 5. Câu hỏi cần BA chốt

| ID | Câu hỏi | Đề xuất của Claude |
|---|---|---|
| Q-65 | Đồng hồ bắt đầu chạy khi nào? | **Khi xe xuất phát** — người chơi không bị trừ giờ lúc định hướng; màn chuẩn bị đã cho xem bản đồ không giới hạn |
| Q-66 | Quay đầu khi đang chờ xuất phát? | Quay tại chỗ, không tính giờ, vẫn đứng chờ |
| Q-67 | Có nút nhấp nháy + bong bóng "Nhấn để xe chạy"? | Có. Cân nhắc chỉ hiện bong bóng ở vài màn đầu, nút nhấp nháy giữ ở mọi màn |
| Q-68 | Popup nhiệm vụ chọn PA nào? | ✅ **Đã chốt: PA1 · Danh sách** |
| Q-69 | Popup hướng dẫn chọn PA nào? | ✅ **Đã chốt: PA-C · Thẻ chủ đề**, mở ở tab "Màn này" |
| Q-70 | Chấm "!" trên nút Hướng dẫn khi màn có cơ chế mới? Có tự mở hướng dẫn lần đầu chơi màn đó không? | Có chấm "!"; **không tự mở** (tránh làm phiền), chỉ nhắc |
| Q-71 | Chạm cụm vòng nhiệm vụ trên HUD cũng mở popup nhiệm vụ? | Có |
| Q-72 | Rút gọn tương tự ở các chỗ khác đang ghi dài: tag "⏸ Thời gian đang dừng" ở bản đồ lớn và bảng hỏi, dòng "⏸ Đã tạm dừng · còn mm:ss" ở popup tạm dừng? | Có — dùng chung dạng "⏸ mm:ss" cho nhất quán |

## 6. Phát hiện thêm (ngoài phạm vi yêu cầu lần này)

| # | Nội dung | Gợi ý |
|---|---|---|
| F1 | Màn chuẩn bị ghi "hạn 0:38" (tính từ lúc bắt đầu), còn đồng hồ trong màn **đếm ngược** (1:52 → 0:00). Người chơi dễ hiểu nhầm là "giao trước khi đồng hồ còn 0:38", trong khi thực tế là trước khi đồng hồ còn 1:14 | Thống nhất một cách ghi, ví dụ "giao trong 0:38 đầu" ở màn chuẩn bị, hoặc đổi sang mốc đồng hồ "trước 1:14" |
