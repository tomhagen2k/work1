# Skill: Viết Tài liệu Hướng dẫn sử dụng (User Manual Writer)

**Tên Skill:** `user_manual`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) hoặc Technical Writer tự động sinh ra **Tài liệu Hướng dẫn sử dụng (User Manual/Help Guide)** dành cho người dùng cuối (End-users). Giúp người dùng biết cách thao tác trên hệ thống để hoàn thành công việc của họ.

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Tính năng hoặc màn hình cần hướng dẫn.
- Mô tả các thao tác, luồng đi và các nút bấm có trên giao diện.

### Xử lý của AI
- Đóng vai trò là một người hướng dẫn thân thiện, nhiệt tình.
- Chia bài viết thành các mục rõ ràng: Mục đích của tính năng -> Cách truy cập -> Các bước thực hiện -> Lưu ý (Nếu có).
- Sử dụng format văn bản dễ đọc: In đậm tên các Nút bấm (Buttons) hoặc Menu (Ví dụ: Nhấn nút **[Lưu]**).
- Chừa các placeholder dạng `[Hình ảnh: ...]` để BA sau này chèn ảnh chụp màn hình minh họa vào đúng chỗ.

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được lưu thành file `.md` (Ví dụ: `HDSD_Dang_Ky_Nghi_Phep.md`).

```markdown
# Hướng dẫn sử dụng: Đăng ký nghỉ phép

## 1. Mục đích
Tính năng này giúp bạn gửi đơn xin nghỉ phép đến Quản lý trực tiếp để được phê duyệt nhanh chóng trên hệ thống.

## 2. Hướng dẫn các bước thao tác

**Bước 1: Truy cập tính năng**
- Tại thanh menu bên trái, bạn chọn **[Nhân sự]** > **[Quản lý nghỉ phép]**.
- Nhấn vào nút **[+ Tạo đơn nghỉ phép]** ở góc trên cùng bên phải.

*[Hình ảnh: Vị trí nút Tạo đơn nghỉ phép]*

**Bước 2: Điền thông tin đơn nghỉ**
Hệ thống sẽ hiển thị một biểu mẫu. Bạn vui lòng điền các thông tin sau:
- **Loại nghỉ phép:** Chọn loại tương ứng (Nghỉ ốm, Nghỉ phép năm...).
- **Từ ngày - Đến ngày:** Chọn khoảng thời gian bạn muốn nghỉ.
- **Lý do:** Ghi chú ngắn gọn lý do xin nghỉ.

**Bước 3: Gửi đơn**
- Kiểm tra lại thông tin và nhấn nút **[Gửi duyệt]**.
- Hệ thống sẽ thông báo "Gửi đơn thành công" và đơn của bạn sẽ ở trạng thái *Chờ duyệt*.

## 3. Một số lưu ý
> **Lưu ý:** Bạn chỉ có thể sửa hoặc xóa đơn xin nghỉ phép khi đơn đó vẫn đang ở trạng thái *Chờ duyệt*. Nếu quản lý đã duyệt, bạn phải liên hệ HR để hủy đơn.
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Tính trực quan:** Phân chia Heading rõ ràng, bullet point sạch sẽ, bôi đậm nút bấm để mắt dễ quét (scan).
- **Ngôn ngữ người dùng:** Lịch sự, dùng các từ ngữ như "Bạn vui lòng", "Hệ thống sẽ...", hoàn toàn mang tính chất hướng dẫn.

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Viết HDSD cho...", "Làm tài liệu hướng dẫn màn hình...", "Viết user manual...".

## 5. Các lệnh cần tránh
- KHÔNG giải thích các logic ngầm của hệ thống (Ví dụ: "Hệ thống sẽ lưu xuống bảng Database X"). User Manual chỉ tập trung vào Giao diện và Thao tác.
