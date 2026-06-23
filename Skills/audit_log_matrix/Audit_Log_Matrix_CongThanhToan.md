# Ma trận Định nghĩa Audit Log: Tính năng Cấu hình Cổng thanh toán và Ví điện tử

Dựa trên yêu cầu điều chỉnh lại cấu trúc lưu log để chi tiết và sát với thực tế vận hành hơn, dưới đây là ma trận các sự kiện Audit Log mới (đã tách biệt các case Thành công và Thất bại thành các dòng riêng):

| Module / Màn hình | Hành động | Người dùng | Mô tả (Dữ liệu thay đổi) | Trạng thái | Nguyên nhân thất bại (nếu có) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Cấu hình Cổng thanh toán | Bật/Tắt cổng thanh toán | Username Admin | Đã thay đổi trạng thái cổng thanh toán [Tên cổng] từ [Trạng thái cũ] sang [Trạng thái mới]. | Thành công | - |
| Cấu hình Cổng thanh toán | Bật/Tắt cổng thanh toán | Username Admin | Thay đổi trạng thái cổng thanh toán [Tên cổng] từ [Trạng thái cũ] sang [Trạng thái mới] thất bại. | Thất bại | Lỗi kết nối DB, Không đủ quyền (Permission Denied) |
| Cấu hình Cổng thanh toán | Cập nhật cấu hình cổng | Username Admin | Đã cập nhật Merchant ID từ [Cũ] sang [Mới]. Đã thay đổi Secret Key (***). | Thành công | - |
| Cấu hình Cổng thanh toán | Cập nhật cấu hình cổng | Username Admin | Cập nhật cấu hình cổng [Tên cổng] (Merchant ID từ [Cũ] sang [Mới], thay đổi Secret Key) thất bại. | Thất bại | Lỗi gọi API xác thực, Không đủ quyền |
| Quản lý TK ngân hàng | Cập nhật tài khoản nhận tiền | Username Kế toán trưởng | Đã thay đổi STK nhận tiền từ [STK Cũ - Ngân hàng Cũ] sang [STK Mới - Ngân hàng Mới]. | Thành công | - |
| Quản lý TK ngân hàng | Cập nhật tài khoản nhận tiền | Username Kế toán trưởng | Thay đổi STK nhận tiền từ [STK Cũ - Ngân hàng Cũ] sang [STK Mới - Ngân hàng Mới] thất bại. | Thất bại | Lỗi kết nối DB, Không đủ quyền |
| Hệ thống / Truy cập | Đăng nhập hệ thống | Username/Email | Đăng nhập thành công vào hệ thống quản trị từ IP [IP Address]. | Thành công | - |
| Hệ thống / Truy cập | Đăng nhập hệ thống | Username/Email | Đăng nhập vào hệ thống quản trị từ IP [IP Address] thất bại. | Thất bại | Sai mật khẩu (Sai quá 3 lần sẽ khóa), Tài khoản không tồn tại |

*Ghi chú bổ sung dành cho Dev:*
- **Cột Mô tả:** Cần được build động (dynamic) tùy thuộc vào dữ liệu đầu vào. Đối với các trường nhạy cảm như `Secret Key`, bắt buộc không ghi bản rõ (plain-text) mà chỉ ghi log sự kiện "Đã thay đổi Secret Key" hoặc mask lại `***`.
- Việc tách dòng riêng biệt cho log Thành công và Thất bại giúp tối ưu việc viết câu truy vấn (query) khi Ops cần trace lỗi theo Status.
