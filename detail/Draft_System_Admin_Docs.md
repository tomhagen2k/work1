# Hướng dẫn sử dụng: Quản trị Hệ thống (System Administration)

Tài liệu này hướng dẫn chi tiết cách cấu hình và sử dụng các tính năng thuộc nhóm Quản trị Hệ thống, bao gồm Cấu hình chung, Quản lý bản quyền và Quản lý người dùng.

---

## 2.1. Cấu hình chung (General Configuration)
Cho phép Quản trị viên thiết lập các cấu hình cơ sở cho hệ thống Firewall như thời gian phiên làm việc, độ phức tạp mật khẩu, phương thức xác thực và đồng bộ thời gian. Bạn cần có quyền **Quản trị hệ thống (System Admin)** để thực hiện các thay đổi này.

**Các bước thực hiện:**
1. Truy cập vào menu **System administration** > **General configuration**.
2. Thiết lập các thông số sau:
    - **Session Timeout:** Nhập thời gian tự động đăng xuất (Ví dụ: 20 Seconds).
    - **Password Complexity:** Chọn mức độ **Weak**, **Medium**, hoặc **Strong** cho mật khẩu người dùng.
    - **Management Authentication:** Chọn **Traditional login** hoặc **Client certificate (mTLS)**.
    - **Time Server:** Bật **Automatically** để tự động đồng bộ hoặc chọn **Manually** để nhập thủ công. Chọn **Time Format** và **Time Zone** phù hợp.
3. Nhấp vào nút **APPLY** ở góc phải màn hình để lưu và áp dụng cấu hình.

> **Lưu ý:** Nếu sử dụng xác thực mTLS, hãy đảm bảo đã cấu hình chứng chỉ hợp lệ để tránh bị mất quyền truy cập hệ thống.

---

## 2.2. Quản lý Bản quyền (License)
Cung cấp thông tin chi tiết về bản quyền hiện tại của hệ thống, giúp theo dõi thời hạn và các thông số giới hạn.

**Các bước thực hiện:**
1. Truy cập vào menu **System administration** > **License**.
2. Xem các thông tin bản quyền bao gồm: **Customer Name**, **Firm Name**, **Product Name**, **License ID**, **Max Bandwidth** và **Expiry Date**.

Nếu chưa có bản quyền, các trường này sẽ hiển thị giá trị "Not set".

---

## 2.3. Quản lý Người dùng (Users)
Dùng để quản lý các tài khoản truy cập hệ thống thông qua các tác vụ xem danh sách, tạo mới, cập nhật và đặt lại mật khẩu.

### 2.3.1. Xem danh sách người dùng
Giúp quản trị viên tra cứu và kiểm tra trạng thái của các tài khoản người dùng.

**Các bước thực hiện:**
1. Truy cập vào menu **System administration** > **Users**.
2. Danh sách sẽ hiển thị các cột: **Username**, **Full name**, **Role**, **Status** và **Actions**.
3. Có thể tìm kiếm bằng từ khóa tại thanh **Enter keyword to search...** hoặc chuyển trang ở góc dưới bên phải.

---

### 2.3.2. Tạo mới người dùng
Cho phép tạo một tài khoản cá nhân mới truy cập và thao tác trên hệ thống Firewall dựa trên vai trò được phân công. Bạn phải có quyền tạo người dùng và các Nhóm quyền (Roles) phải được định nghĩa sẵn.

**Các bước thực hiện:**
1. Tại màn hình danh sách Users, nhấp vào nút **+ ADD NEW** ở góc phải màn hình.
2. Trên cửa sổ **Create User**, điền các thông tin:
    - **Username (*):** Tên đăng nhập.
    - **Password / Confirm password:** Mật khẩu (phải thỏa mãn các điều kiện độ phức tạp hiển thị bên dưới).
    - **Full name (*):** Họ và tên đầy đủ.
    - **Email / Phone number:** Thông tin liên hệ.
    - **Certificate identity:** SAN URI identity cho xác thực mTLS.
    - **Roles:** Chọn nhóm quyền từ danh sách thả xuống.
    - **Status (*):** Chọn **Active** hoặc **Inactive**.
3. Nhấn **[SUBMIT]** để hoàn tất.

---

### 2.3.3. Cập nhật thông tin người dùng
Chỉnh sửa thông tin, thay đổi phân quyền hoặc khóa tài khoản của người dùng đã tồn tại.

**Các bước thực hiện:**
1. Tại danh sách Users, nhấp vào biểu tượng **Sửa** (hình cây bút) tại cột Actions của tài khoản cần chỉnh sửa.
2. Thay đổi các thông tin cần thiết trong cửa sổ **Update User** (Trường Username sẽ không thể chỉnh sửa).
3. Nhấn **[SUBMIT]** để lưu thay đổi.

---

### 2.3.4. Reset mật khẩu người dùng
Cấp lại mật khẩu mới cho người dùng trong trường hợp họ quên mật khẩu.

**Các bước thực hiện:**
1. Tại danh sách Users, nhấp vào biểu tượng **Reset Password** (hình ổ khóa) tại cột Actions.
2. Hệ thống sẽ sinh mật khẩu ngẫu nhiên tại trường **New password**.
3. Nhấp vào biểu tượng **Copy** để sao chép mật khẩu gửi cho người dùng.
4. Nhấn **[SUBMIT]** để xác nhận.
