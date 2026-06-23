# ĐẶC TẢ CHI TIẾT GIAO DIỆN: QUẢN LÝ NHÓM (GROUP MANAGEMENT)

## 1. Tổng quan Hệ thống
**Tên hệ thống:** Enterprise AV Management Console (EAMC)
**Mục tiêu:** Hệ thống quản trị tập trung dành cho doanh nghiệp để giám sát và điều khiển phần mềm diệt virus trên các máy trạm (Endpoints). Hệ thống hỗ trợ truy vấn mạnh mẽ để xác định nguồn gốc tấn công, theo dõi trạng thái quét mã độc và các hành vi bất thường trên hệ thống.

---

## 2. Cấu trúc Giao diện Tổng thể
Hệ thống sử dụng bố cục chuẩn Dashboard doanh nghiệp với:
- **Thanh Menu bên trái (Sidebar):** Cố định, chứa các biểu tượng điều hướng chính.
- **Cây thư mục Nhóm (Group Tree Sidebar):** Nằm giữa Menu chính và khu vực nội dung, hiển thị mô hình cây của tổ chức.
- **Khu vực Nội dung (Main Content):** Hiển thị bảng danh sách các nhóm con và công cụ tương tác.

### Danh mục Menu bên trái:
1. **Dashboard:** Tổng quan sức khỏe hệ thống.
2. **Event Management:** Quản lý các sự kiện an ninh và cảnh báo mã độc.
3. **Device Management:** Quản lý danh sách máy trạm và thực thi lệnh.
4. **Policy Management:** Thiết lập cấu hình bảo vệ cho các nhóm máy.
5. **IOC Management:** Quản lý các dấu hiệu thỏa hiệp (Hashes, IPs, Domains).
6. **Group Management:** (Đang chọn) Quản lý phân nhóm máy trạm.
7. **User Management:** Quản lý tài khoản quản trị viên hệ thống.

---

## 3. Đặc tả khu vực Quản lý Nhóm

### 3.1. Cây Thư mục Nhóm (Group Tree Sidebar)
Hiển thị toàn bộ cấu trúc phân cấp của tổ chức:
- **Tương tác trực tiếp trên cây:** Khi di chuột (hover) vào một tên nhóm trên cây, các icon chức năng sau sẽ xuất hiện:
    - **Icon `+`:** Thêm nhanh một nhóm con trực thuộc nhóm đang hover.
    - **Icon `Sửa` (Cái bút):** Mở form chỉnh sửa thông tin nhóm. (Không hiển thị đối với nhóm Root).
    - **Icon `Xóa` (Thùng rác):** Thực hiện lệnh xóa nhóm. (Không hiển thị đối với nhóm Root).
- **Quy tắc bảo vệ:** Nhóm Root (nhóm gốc cao nhất) là cố định, **không cho phép sửa hoặc xóa**.
- **Điều hướng:** Click vào một tên nhóm để xem danh sách **nhóm đó và các nhóm con trực thuộc nhóm đó** ở bảng bên phải.

### 3.2. Bảng Danh sách Nhóm (Main Data Table)
Hiển thị thông tin của nhóm đang được chọn trên cây và toàn bộ các nhóm cấp dưới trực thuộc.

| STT | Cột hiển thị | Mô tả dữ liệu | Định dạng hiển thị |
|:---:|:--- |:--- |:--- |
| 1 | **MÃ NHÓM** | Mã định danh duy nhất của nhóm | Text (In đậm) |
| 2 | **TÊN NHÓM** | Tên hiển thị của nhóm | Text |
| 3 | **POLICY** | Chính sách bảo mật đang áp dụng | Tag (Ví dụ: High Security) |
| 4 | **SỐ LƯỢNG AGENT** | Tổng số máy trạm thuộc nhóm | Number |
| 5 | **SỐ LƯỢNG USER** | Tổng số người dùng thuộc nhóm | Number |
| 6 | **MÔ TẢ** | Thông tin mô tả mục đích nhóm | Text (Có thể cắt bớt nếu quá dài) |
| 7 | **NGƯỜI TẠO** | Quản trị viên khởi tạo | Text |
| 8 | **NGÀY TẠO** | Thời gian tạo nhóm | Datetime |
| 9 | **NGÀY CẬP NHẬT** | Thời gian chỉnh sửa gần nhất | Datetime |
| 10 | **HÀNH ĐỘNG** | Các lệnh điều khiển | Icon **Sửa**, **Xóa** (Ẩn với nhóm Root) |

---

## 4. Quy tắc Nghiệp vụ (Business Rules)

### 4.1. Thêm mới Nhóm
- **Các trường bắt buộc nhập:**
    1. **Nhóm cha:** Dropdown chọn từ cây thư mục (mặc định là nhóm đang chọn).
    2. **Mã nhóm:** Text (Duy nhất, không dấu, không khoảng trắng).
    3. **Tên nhóm:** Text hiển thị.
    4. **Policy:** Dropdown danh sách chính sách bảo mật.
    5. **Mô tả:** Text chi tiết.

### 4.2. Chỉnh sửa Nhóm
- **Quy tắc:** Không được phép sửa trường **Mã nhóm** (Disabled). Các trường còn lại được phép thay đổi.

### 4.3. Xóa Nhóm
- **Kiểm tra ràng buộc & Thông báo lỗi:**
    - Hệ thống chỉ kiểm tra số lượng Agent và User đang được gán **trực tiếp** cho nhóm muốn xóa (không cần kiểm tra các nhóm con).
    - **Trường hợp có Agent:** Nếu Số lượng Agent trực tiếp > 0 -> Thông báo lỗi: *"Không thể xóa nhóm này vì đang có thiết bị (Agent) được gán trực tiếp cho nhóm. Vui lòng di chuyển các thiết bị sang nhóm khác trước khi thực hiện."*
    - **Trường hợp có User:** Nếu Số lượng User trực tiếp > 0 -> Thông báo lỗi: *"Không thể xóa nhóm này vì đang có người dùng (User) được gán trực tiếp cho nhóm. Vui lòng di chuyển người dùng sang nhóm khác trước khi thực hiện."*
    - **Trường hợp nhóm Root:** (Đã chặn ở mức giao diện) -> Thông báo: *"Đây là nhóm gốc của hệ thống, không thể xóa."*
- **Cơ chế gán lại Nhóm cha (Re-parenting):**
    - Khi một nhóm được xóa thành công, nếu nhóm đó có các nhóm con bên dưới, các nhóm con này sẽ tự động được cập nhật lại Nhóm cha là **nhóm cha của nhóm vừa bị xóa**.
    - *Ví dụ:* Cấu trúc A -> B -> C. Nếu xóa nhóm B, nhóm C sẽ tự động trở thành con trực tiếp của nhóm A.
- **Trường hợp hợp lệ:** Hiển thị Popup xác nhận: *"Bạn có chắc chắn muốn xóa nhóm [Tên Nhóm]? Các nhóm con trực thuộc (nếu có) sẽ được chuyển lên cấp trên."*

---

## 5. Phong cách Thiết kế (Aesthetics)
- **Tính đồng nhất:** Sử dụng bảng màu và kiểu dáng Badge/Tag giống với module Device và Event Management.
- **Hiệu ứng:** Sử dụng hiệu ứng chuyển động mượt mà khi đóng/mở các nhánh trên cây thư mục.
