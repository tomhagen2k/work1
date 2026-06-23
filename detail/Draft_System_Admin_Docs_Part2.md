# Hướng dẫn sử dụng: Quản trị Hệ thống (Phần 2)

Tài liệu này hướng dẫn chi tiết cách cấu hình Nhóm quyền, API Keys và Quản lý cập nhật hệ thống.

---

## 2.4. Quản lý Nhóm quyền / Vai trò (Permission Group)
Hệ thống sử dụng mô hình phân quyền dựa trên vai trò (RBAC). Tính năng này cho phép Quản trị viên định nghĩa các nhóm quyền khác nhau (như ROLE_ADMIN, ROLE_USER) để gán cho người dùng, giúp kiểm soát chi tiết các hành động (Xem, Xóa, Tạo, Sửa...) trên từng màn hình chức năng.

### 2.4.1. Xem danh sách nhóm quyền
Giúp liệt kê toàn bộ các vai trò hiện có và các quyền hạn tổng quát đi kèm.

**Các bước thực hiện:**
1. Truy cập vào menu **System administration** > **Permission groups**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Role:** Tên vai trò.
    - **Permissions:** Tóm tắt các quyền hạn đã gán.
    - **Status:** Trạng thái hoạt động (**Active** hoặc **Inactive**).
3. Sử dụng thanh tìm kiếm **Enter keyword to search...** để tìm nhanh theo tên vai trò.

---

### 2.4.2. Cập nhật nhóm quyền (Update role)
Chỉnh sửa tên vai trò hoặc thay đổi chi tiết các quyền hạn trên từng màn hình.

**Các bước thực hiện:**
1. Tại danh sách Permission groups, nhấp vào biểu tượng **Sửa** (hình cây bút) tại cột Actions.
2. Trong cửa sổ **Update Role**, bạn có thể thay đổi:
    - **Role name (*):** Tên định danh của vai trò.
    - **Bảng Permissions:** Tích chọn vào các ô tương ứng với từng màn hình (Monitor, User Management, Device Management, System Log, v.v.) và từng loại hành động (**View, Delete, Create, Edit, View History, Apply, Change Status**). Có thể chọn **All** để cấp toàn quyền cho màn hình đó.
    - **Status (*):** Trạng thái hoạt động của nhóm quyền.
3. Nhấn vào nút **Save** để hoàn tất.

---

### 2.4.3. Xóa nhóm quyền (Delete role)
Gỡ bỏ một nhóm quyền không còn sử dụng khỏi hệ thống.

**Các bước thực hiện:**
1. Tại danh sách Permission groups, nhấp vào biểu tượng **Xóa** (hình thùng rác) tại cột Actions.
2. Cửa sổ xác nhận sẽ hiện ra: "Are you sure you want to delete role [Tên Role]?".
3. Nhấn **CONFIRM** để xác nhận xóa hoặc **CANCEL** để hủy.

> **Lưu ý:** Cẩn trọng khi xóa các nhóm quyền đang được gán cho nhiều người dùng, vì điều này có thể làm ảnh hưởng đến khả năng truy cập của họ.

---

## 2.5. Quản lý API Key
Tính năng này dùng để tạo và quản lý các mã khóa định danh (API Keys), cho phép các ứng dụng bên thứ ba hoặc các script tự động hóa kết nối và tương tác với Firewall một cách an toàn mà không cần dùng mật khẩu người dùng thông thường.

### 2.5.1. Xem danh sách API Key
Theo dõi trạng thái hoạt động và thời hạn của các API Key đã cấp.

**Các bước thực hiện:**
1. Truy cập vào menu **System administration** > **API Keys**.
2. Danh sách hiển thị các thông tin: **Name** (Tên Key), **Owner** (Người sở hữu), **Status**, và **Expires At** (Ngày hết hạn).
3. Tại cột Actions, bạn có thể:
    - Nhấp biểu tượng **Khóa/Mở khóa** để thu hồi (**Revoke**) API Key.
    - Nhấp biểu tượng **Thùng rác** để xóa Key.

---

### 2.5.2. Tạo mới API Key
Cấp một mã khóa mới cho một người dùng cụ thể với thời hạn và phạm vi quyền hạn xác định.

**Các bước thực hiện:**
1. Tại màn hình danh sách API Keys, nhấp vào nút **+ ADD NEW**.
2. Trên cửa sổ **Create API Key**, điền các thông tin:
    - **User (*):** Chọn người dùng sở hữu Key từ danh sách thả xuống.
    - **Name (*):** Đặt tên cho API Key (Ví dụ: Script_Auto_Apply).
    - **Expiration Date:** Chọn thời hạn hiệu lực (**1 Day, 1 Month, 1 Year, Forever** hoặc **Custom** để chọn ngày cụ thể).
    - **Objects & Permissions (*):** Nhấp nút **+ Add Object** để chọn các đối tượng và quyền hạn mà Key này được phép thao tác.
3. Nhấn **CREATE** để hoàn tất. Hệ thống sẽ hiển thị mã Key, hãy sao chép và lưu trữ cẩn thận vì mã này thường chỉ hiển thị một lần.

---

## 2.6. Quản lý Cập nhật hệ thống (Update management)
Đảm bảo hệ thống Firewall luôn chạy phiên bản mới nhất để cập nhật các bản vá bảo mật và tính năng mới.

**Các bước thực hiện:**
1. Truy cập vào menu **System administration** > **Update**.
2. Tại tab **System Update**, bạn sẽ thấy:
    - **CURRENT VERSION:** Phiên bản hiện tại đang chạy trên thiết bị.
    - **LATEST VERSION:** Phiên bản mới nhất khả dụng trên Server.
3. Nhấp vào nút **Check for Updates** để hệ thống kiểm tra và lấy thông tin phiên bản mới nhất.
4. Nếu có phiên bản mới, hệ thống sẽ hiển thị nút cập nhật. Nhấp vào để bắt đầu quá trình (Lưu ý: Thiết bị có thể khởi động lại trong quá trình này).

**Quản lý Lịch sử và Cấu hình Server:**
- **Tab Update History:** Cho phép tra cứu nhật ký các lần cập nhật thành công hoặc thất bại. Thông tin bao gồm: **Time** (Thời gian cập nhật), **Version** (Phiên bản đã cập nhật), **Status** (Trạng thái Success/Fail) và **Result** (Số lượng file đã được cập nhật).
- **Tab Server Configuration:** Quản lý danh sách các Server cung cấp bản cập nhật.
    1. Nhấp nút **+ Add New** để thêm Server mới.
    2. Trong cửa sổ **Add Server Configuration**, nhập các thông tin: **Name*** (Tên gợi nhớ), **Server URL*** (Địa chỉ Server cập nhật) và **Access Token** (Mã truy cập nếu Server yêu cầu).
    3. Nhấn **Test Connection** để kiểm tra kết nối tới Server trước khi lưu.
    4. Nhấn **Save** để hoàn tất.
