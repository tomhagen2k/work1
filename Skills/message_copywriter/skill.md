# Skill: Chuẩn hóa Thông báo Giao diện (Message Copywriter)

**Tên Skill:** `message_copywriter`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) viết và chuẩn hóa toàn bộ các thông báo trên giao diện người dùng (UI Messages) bao gồm: Thông báo thành công, Thông báo lỗi, Cảnh báo, Validation Text, và Tooltips. Đảm bảo ứng dụng có giọng văn (tone of voice) chuyên nghiệp, nhất quán, rõ ràng và thân thiện với người dùng.

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Danh sách các luồng/trường dữ liệu cần thông báo.
- (Tùy chọn) Đối tượng người dùng mục tiêu để điều chỉnh giọng văn (ví dụ: gen Z thì thân thiện, app ngân hàng thì trang trọng).

### Xử lý của AI
- Dựa trên input, liệt kê toàn bộ các kịch bản cần hiển thị thông báo.
- Viết copy song ngữ (Tiếng Việt và Tiếng Anh) cho từng loại:
  - **Success (Thành công):** Xác nhận hành động đã hoàn tất. Ngắn gọn.
  - **Error (Lỗi):** Báo lỗi rõ ràng + Đề xuất cách khắc phục (Actionable). Không dùng từ ngữ đổ lỗi cho người dùng.
  - **Warning (Cảnh báo):** Cảnh báo hệ quả trước khi thực hiện hành động phá hủy (Ví dụ: Xóa).
  - **Validation (Ràng buộc):** Thông báo tại các trường nhập liệu.
- Tổ chức thành một bảng (Message Dictionary) hỗ trợ song ngữ.

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được lưu thành file `.md` (Ví dụ: `UI_Messages_Dang_Ky.md`).

```markdown
# Từ điển Thông báo Giao diện (Message Dictionary)

| Kịch bản / Vị trí | Loại thông báo | Nội dung (Tiếng Việt) | Nội dung (Tiếng Anh) | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| Nhập sai định dạng Email | Validation | "Vui lòng nhập địa chỉ email hợp lệ (ví dụ: ten@domain.com)." | "Please enter a valid email address (e.g., name@domain.com)." | Hiển thị dưới text box |
| Lưu cấu hình thành công | Success | "Đã lưu cấu hình hệ thống thành công." | "System configuration saved successfully." | Toast message góc phải |
| Xóa dữ liệu quan trọng | Warning | "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác." | "Are you sure you want to delete this document? This action cannot be undone." | Popup xác nhận (Yes/No) |
| Lỗi kết nối mạng | Error | "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại đường truyền mạng và thử lại." | "Unable to connect to the server. Please check your network connection and try again." | Dialog |
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Tính Actionable (Có thể hành động):** Đặc biệt với Error message, phải cho người dùng biết họ cần làm gì tiếp theo (thay vì chỉ báo "Lỗi hệ thống").
- **Tính Ngắn Gọn & Vừa Vặn UI (Conciseness & UI Fit):** Thông báo phải ngắn gọn, súc tích, cung cấp đúng và đủ thông tin cần thiết. Tránh viết quá dài dòng để không gây nhiễu thông tin và không làm vỡ giao diện (UI).
- **Văn phong (Tone):** Sử dụng ngôn ngữ tiếng Việt và tiếng Anh tự nhiên, lịch sự, nhất quán (ví dụ: Tiếng Việt dùng "Bạn"/"Quý khách" tùy bối cảnh; Tiếng Anh dùng "you" hoặc phong thái chuyên nghiệp tương ứng, thống nhất).

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Chuẩn hóa thông báo lỗi cho...", "Viết các câu message UI cho chức năng...".

## 5. Các lệnh cần tránh
- KHÔNG dùng thuật ngữ kỹ thuật khó hiểu để báo lỗi cho end-user (Ví dụ: "Lỗi Null Pointer Exception", "Timeout 504"). Phải dịch sang ngôn ngữ người dùng.
