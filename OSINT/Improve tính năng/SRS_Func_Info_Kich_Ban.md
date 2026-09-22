# ĐẶC TẢ THÔNG TIN CHUNG CHỨC NĂNG (SRS FUNCTIONAL INFO)
## MODULE: QUẢN LÝ KỊCH BẢN (SCENARIO MANAGEMENT)

Tài liệu này đặc tả **Thông tin chung chức năng** cho 3 tính năng cốt lõi thuộc Module Quản lý kịch bản: **Xem danh sách kịch bản**, **Thêm mới kịch bản**, và **Sửa kịch bản**. 

Tài liệu được biên soạn tuân thủ nghiêm ngặt theo Cấu trúc quy chuẩn 7 phần của Skill **`srs_func_info_writer`**.

---

## 1. CHỨC NĂNG 1: XEM DANH SÁCH KỊCH BẢN

### 1. Tên chức năng
Xem danh sách kịch bản

### 2. Mô tả
Chức năng Xem danh sách kịch bản cung cấp cho Quản trị viên không gian làm việc quản lý tập trung (bố cục 3 cột) toàn bộ các kịch bản tương tác tự động hóa nuôi nick AI trong hệ thống. Quản trị viên có thể tìm kiếm kịch bản theo tên thời gian thực (real-time filtering), lọc kịch bản theo loại (*Kịch bản đơn*, *Kịch bản lộ trình*), xem danh sách các Ngày của lộ trình đa ngày (Cột 2), và xem chi tiết danh sách các Khung giờ / Lượt chạy (Slots) được thiết lập trong từng Ngày kèm các bước hành động thực thi chi tiết (Cột 3).

### 3. Tác nhân
Quản trị viên (Admin OSINT)

### 4. Điều kiện trước
- Quản trị viên đã đăng nhập thành công vào hệ thống OSINT AI Automation.
- Quản trị viên được cấp quyền truy cập vào Module "Quản lý kịch bản".

### 5. Điều kiện sau
- Danh sách kịch bản và chi tiết tiến trình các Ngày/Lượt chạy được tải và hiển thị đầy đủ, chính xác trên giao diện 3 cột.
- Trạng thái từ khóa tìm kiếm và Tab bộ lọc được giữ nguyên trong phiên làm việc.

### 6. Ngoại lệ
- Mất kết nối mạng hoặc phản hồi máy chủ bị ngắt giữa chừng khi tải danh sách kịch bản: Hệ thống hiển thị thông báo lỗi kết nối và cho phép người dùng bấm thử lại (Retry).
- Không tìm thấy kịch bản nào khớp với từ khóa tìm kiếm hoặc bộ lọc: Hệ thống hiển thị trạng thái trống (empty state) và cập nhật số lượng hiển thị về 0.

### 7. Các yêu cầu đặc biệt
- Giao diện dạng 3 cột tương tác thời gian thực (Real-time filtering), cập nhật kết quả lọc ngay khi gõ từ khóa mà không cần tải lại trang.
- Hiển thị đầy đủ Tag loại kịch bản (`🔄 Kịch bản đơn`, `📅 Lộ trình (N ngày)`), Badge AI và tổng số `hành động` trên từng thẻ kịch bản ở Cột 1.

---

## 2. CHỨC NĂNG 2: THÊM MỚI KỊCH BẢN

### 1. Tên chức năng
Thêm mới kịch bản

### 2. Mô tả
Chức năng Thêm mới kịch bản cho phép Quản trị viên tạo ra một kịch bản nuôi nick mới trong hệ thống. Quản trị viên nhập tên kịch bản, chọn kênh nền tảng (mặc định Facebook) và chọn Loại kịch bản qua Combobox select (*🔄 Kịch bản đơn* hoặc *📅 Kịch bản lộ trình*). Ngay sau khi khởi tạo thành công, hệ thống tự động thiết lập cấu hình mặc định (Kịch bản đơn mở bảng hành động rỗng; Kịch bản lộ trình tự động tạo Ngày 1 chứa Lượt 1 lúc 08:30) và đưa kịch bản mới lên đầu danh sách để Quản trị viên bắt đầu thiết lập các bước hành động.

### 3. Tác nhân
Quản trị viên (Admin OSINT)

### 4. Điều kiện trước
- Quản trị viên đã đăng nhập vào hệ thống và có quyền "Tạo mới kịch bản".
- Màn hình Quản lý kịch bản đã được tải hoàn tất.

### 5. Điều kiện sau
- Kịch bản mới được ghi nhận và lưu trữ vào cơ sở dữ liệu hệ thống.
- Kịch bản mới xuất hiện ở vị trí trên cùng trong danh sách Cột 1 và tự động chuyển sang trạng thái được chọn (Active) để Quản trị viên thêm các bước hành động.
- Popup Tạo mới kịch bản tự động đóng lại.

### 6. Ngoại lệ
- Người dùng để trống ô "Tên kịch bản" và bấm Lưu: Hệ thống hiển thị thông báo lỗi validation inline/popup `"Vui lòng nhập tên kịch bản!"` và giữ nguyên popup để người dùng bổ sung.
- Nhập tên kịch bản bị trùng với một kịch bản đã tồn tại trên hệ thống: Hệ thống hiển thị thông báo lỗi `"Tên kịch bản đã tồn tại!"`.
- Lỗi kết nối máy chủ hoặc sự cố lưu dữ liệu: Hệ thống hiển thị toast message thất bại `"Tạo kịch bản không thành công!"`, không đóng popup và giữ nguyên dữ liệu đã nhập.

### 7. Các yêu cầu đặc biệt
- Trường "Loại kịch bản" được thiết kế dạng Combobox dropdown chọn nhanh gọn gàng (`🔄 Kịch bản đơn` vs `📅 Kịch bản lộ trình`).
- Tên kịch bản tự động trim khoảng trắng thừa ở đầu/cuối chuỗi trước khi kiểm tra tính duy nhất (unique) và lưu.
- Nút "Lưu kịch bản" có hiệu ứng Loading spinner và tự động disable chống click trùng lặp request (debounce) trong lúc chờ phản hồi từ máy chủ.

---

## 3. CHỨC NĂNG 3: SỬA KỊCH BẢN

### 1. Tên chức năng
Sửa kịch bản

### 2. Mô tả
Chức năng Sửa kịch bản cho phép Quản trị viên cập nhật lại tên thông tin hiển thị của một kịch bản đã tồn tại. Để bảo toàn cấu hình tiến trình nuôi nick và ngăn ngừa xung đột dữ liệu với các tài khoản ảo đã được gán, hệ thống tự động khóa (disable) không cho phép thay đổi trường "Kênh nền tảng" (mặc định Facebook) và trường "Loại kịch bản" (không cho đổi từ *Đơn* sang *Lộ trình* hoặc ngược lại).

### 3. Tác nhân
Quản trị viên (Admin OSINT)

### 4. Điều kiện trước
- Quản trị viên đã đăng nhập và được cấp quyền "Chỉnh sửa kịch bản".
- Kịch bản cần sửa đã tồn tại trong danh sách ở Cột 1.

### 5. Điều kiện sau
- Thông tin Tên kịch bản mới được cập nhật thành công vào cơ sở dữ liệu.
- Tên kịch bản mới được hiển thị đồng bộ tại Thẻ kịch bản ở Cột 1 và trên Header không gian làm việc Cột 3.
- Popup Chỉnh sửa kịch bản tự động đóng lại.

### 6. Ngoại lệ
- Người dùng để trống Tên kịch bản hoặc nhập tên mới bị trùng với một kịch bản khác: Hệ thống hiển thị thông báo lỗi validation và không cho phép lưu.
- Nhấn Hủy hoặc icon `x` đóng popup khi đã chỉnh sửa Tên kịch bản: Hệ thống hiển thị Hộp thoại cảnh báo dữ liệu chưa lưu (`"Thông tin bạn vừa nhập chưa được lưu lại. Bạn có chắc chắn muốn thoát...?"`).
- Lỗi kết nối máy chủ hoặc sự cố hệ thống khi lưu: Hệ thống hiển thị toast message thất bại `"Cập nhật kịch bản không thành công!"` và giữ nguyên Popup.

### 7. Các yêu cầu đặc biệt
- Khóa cứng (Disabled - hiển thị màu xám, không tương tác được) đối với 2 trường "Kênh nền tảng" và "Loại kịch bản" trên Popup sửa kịch bản.
- Đảm bảo tính đồng bộ dữ liệu thời gian thực (Real-time updates) giữa Cột 1 và Cột 3 ngay khi bấm Lưu kịch bản thành công.
