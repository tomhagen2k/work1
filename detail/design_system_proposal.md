# YÊU CẦU CHỈNH SỬA GIAO DIỆN CHUNG (PROMPT CHO AI)

Dưới đây là đoạn yêu cầu ngắn gọn, tổng quát mà bạn có thể copy/paste trực tiếp cho AI (như v0, Claude, Cursor, v.v.) để nó tự động áp dụng và sửa lại toàn bộ giao diện cho dự án EAMC.

---

**Prompt yêu cầu AI chỉnh sửa giao diện:**

"Hãy chỉnh sửa lại toàn bộ hệ thống giao diện (UI/UX) của ứng dụng theo phong cách bảng điều khiển Cyber-Security chuyên nghiệp, sang trọng (giống Microsoft Defender, CrowdStrike). Áp dụng các nguyên tắc thiết kế chung sau đây cho tất cả các trang và Component:

1. **Tối giản hóa bảng màu (No Rainbow Effect):**
   - Tuyệt đối không lạm dụng các mảng màu chói (đỏ, vàng, xanh lá, xanh neon) đặt cạnh nhau.
   - Các hệ điều hành (Windows, Linux, macOS) và thông tin phụ: Bỏ hoàn toàn dạng thẻ Badge nền màu. Chỉ sử dụng icon đơn sắc (màu xám Slate) kết hợp text thường.
   - Trạng thái thiết bị (Online, Offline): Không dùng Badge nền đặc. Chuyển sang dạng chấm tròn nhỏ (Status dot) đi kèm text (ví dụ: 🟢 Online, ⚪ Offline).

2. **Hệ màu chức năng (Semantic Colors) nhã nhặn:**
   - Chỉ sử dụng màu nổi (Đỏ, Cam) cho các yếu tố cực kỳ quan trọng (Critical, High).
   - Thiết kế lại toàn bộ các Badge/Tag cảnh báo theo chuẩn: **Chữ màu sẫm + Nền màu siêu nhạt (Opacity 10-15%)** thay vì màu nền đặc. (Ví dụ: Critical dùng chữ đỏ đậm trên nền đỏ nhạt).

3. **Phân cấp Typography & Bố cục (Layout):**
   - Làm nổi bật các con số/dữ liệu quan trọng bằng font chữ to, đậm (Màu đen/Slate 900). 
   - Các thông tin mô tả, nhãn phụ (label) phải dùng màu xám (Slate 500 hoặc 400) và font nhỏ hơn để giảm nhiễu.
   - Trong các Bảng (Tables): Tăng khoảng cách padding cho thoáng, bỏ các đường kẻ dọc, chỉ giữ đường viền ngang mỏng màu xám nhạt (Slate 100/200) giữa các hàng.

4. **Loại bỏ các đường viền, hộp màu rườm rà (Clean Components):**
   - Xóa bỏ các hộp màu pastel (xanh nhạt, đỏ nhạt) ở các khu vực Thao tác khẩn cấp. Hãy dùng danh sách hành động (Action list) phẳng, viền xám mỏng với icon tinh tế.
   - Ở các Drawer hoặc Card chi tiết: Không dùng header đen tuyền tương phản gắt với nền trắng, và không dùng các khung viền đỏ bọc dữ liệu. Sử dụng nền trắng thống nhất, viền xám nhạt, chia thông tin thành dạng Grid 2 cột sạch sẽ.

5. **Sidebar & Nút bấm (Sidebar & Buttons):**
   - Sidebar dùng nền màu tối (Slate 900). Các mục Menu đang chọn (Active) chỉ nên dùng một đường viền dọc nhỏ bên trái và highlight nền rất nhẹ, tuyệt đối không dùng khối màu neon chói lọi.
   - Nút bấm (Buttons) chính dùng màu Indigo hoặc đen/xám đậm, các nút phụ dùng dạng Outline. Không dùng nút đen bóng hoặc nút màu nổi quá cỡ."

---

*Bạn chỉ cần copy đoạn chữ trong ngoặc kép ở trên và gửi cho AI, nó sẽ hiểu ngay các nguyên tắc cốt lõi và tự động refactor (chỉnh sửa lại) toàn bộ mã nguồn CSS/Component trên tất cả các màn hình.*
