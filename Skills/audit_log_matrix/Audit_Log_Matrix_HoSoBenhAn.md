# Ma trận Định nghĩa Audit Log: Quản lý Hồ sơ bệnh án và Xuất dữ liệu

Dựa trên chuẩn cấu trúc Audit Log đã thống nhất và yêu cầu bảo mật đặc biệt về dữ liệu y tế, dưới đây là ma trận các sự kiện cần lưu vết. Các kịch bản Thành công và Thất bại đã được tách thành các dòng độc lập.

| Module / Màn hình | Hành động | Người dùng | Mô tả (Dữ liệu thay đổi) | Trạng thái | Nguyên nhân thất bại (nếu có) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Quản lý Hồ sơ bệnh án | Tạo mới bệnh án | Username (Bác sĩ) | Đã tạo mới hồ sơ bệnh án cho bệnh nhân [Tên bệnh nhân] (Mã BN: [ID]). | Thành công | - |
| Quản lý Hồ sơ bệnh án | Tạo mới bệnh án | Username (Bác sĩ) | Tạo mới hồ sơ bệnh án cho bệnh nhân [Tên bệnh nhân] thất bại. | Thất bại | Lỗi kết nối DB, Lỗi hệ thống |
| Quản lý Hồ sơ bệnh án | Cập nhật bệnh án | Username (Bác sĩ) | Đã cập nhật kết quả chẩn đoán (từ [Cũ] sang [Mới]) và nội dung đơn thuốc cho bệnh nhân [Tên bệnh nhân]. | Thành công | - |
| Quản lý Hồ sơ bệnh án | Cập nhật bệnh án | Username (Bác sĩ) | Cập nhật kết quả chẩn đoán (từ [Cũ] sang [Mới]) và nội dung đơn thuốc cho bệnh nhân [Tên bệnh nhân] thất bại. | Thất bại | Lỗi lưu trữ dữ liệu, Phiên bản bệnh án xung đột |
| Quản lý Hồ sơ bệnh án | Xem chi tiết bệnh án VIP | Username (Bất kỳ) | Đã truy cập xem chi tiết hồ sơ bệnh án của bệnh nhân hạng VIP [Tên bệnh nhân] (Mã BN: [ID]). | Thành công | - |
| Quản lý Hồ sơ bệnh án | Xem chi tiết bệnh án VIP | Username (Bất kỳ) | Truy cập xem chi tiết hồ sơ bệnh án của bệnh nhân hạng VIP [Tên bệnh nhân] thất bại. | Thất bại | Không đủ quyền truy cập (Access Denied) |
| Quản lý Hồ sơ bệnh án | Xuất dữ liệu (Export) | Username (Bất kỳ) | Đã xuất file dữ liệu bệnh án của bệnh nhân [Tên bệnh nhân] ra bộ nhớ máy tính. | Thành công | - |
| Quản lý Hồ sơ bệnh án | Xuất dữ liệu (Export) | Username (Bất kỳ) | Xuất file dữ liệu bệnh án của bệnh nhân [Tên bệnh nhân] thất bại. | Thất bại | Lỗi tạo file, Không đủ quyền xuất dữ liệu |

*Ghi chú bổ sung dành cho Dev:*
- **Ngoại lệ Log Xem (View):** Hệ thống chỉ tự động kích hoạt logic ghi log "Xem" đối với các `patient_id` có cờ `is_vip = true`. Các bệnh án thông thường không áp dụng để tránh gây quá tải (spam) log.
- **Hành vi Xuất dữ liệu (Export):** Là hành vi rất nhạy cảm với nguy cơ lộ lọt dữ liệu. Khi có log xuất file xuất hiện với tần suất lớn từ một user, đội ngũ An ninh thông tin (InfoSec) có thể thiết lập cảnh báo tự động.
