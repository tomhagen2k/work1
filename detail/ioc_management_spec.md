# ĐẶC TẢ CHI TIẾT GIAO DIỆN: QUẢN LÝ IOC (IOC MANAGEMENT)

## 1. Tổng quan Hệ thống
**Tên hệ thống:** Enterprise AV Management Console (EAMC)
**Mục tiêu:** Hệ thống quản trị tập trung dành cho doanh nghiệp để giám sát và điều khiển phần mềm diệt virus trên các máy trạm (Endpoints). Hệ thống hỗ trợ tích hợp và chia sẻ tình báo mối đe dọa để nâng cao khả năng phòng thủ chủ động.

---

## 2. Cấu trúc Giao diện Tổng thể
Hệ thống sử dụng bố cục chuẩn Dashboard doanh nghiệp với:
- **Thanh Menu bên trái (Sidebar):** Cố định.
- **Khu vực Nội dung (Main Content):** Chia thành 2 khu vực chính (có thể tổ chức dạng Sub-menu hoặc Tab lớn):
    1. **Danh sách IOC:** Quản lý tập trung các dấu hiệu nhận diện.
    2. **Cấu hình kết nối:** Thiết lập các nguồn dữ liệu STIX/TAXII và quản lý API tích hợp.

---

## 3. Đặc tả khu vực Danh sách IOC (Chuẩn STIX 2.1)

### 3.1. Thanh công cụ (Toolbar)
- **Tìm kiếm:** Theo giá trị IOC, ID, hoặc Tên.
- **Bộ lọc loại IOC:** Lọc theo *indicator, malware, observed-data...*
- **Nút "Thêm IOC":** Nhập thủ công.
- **Nút "Nhập từ File":** CSV, JSON.
- **Nút "Deploy":** Áp dụng tức thì xuống các Agent.

### 3.2. Bảng dữ liệu IOC Repository
Bảng tập trung vào các thuộc tính quản lý cốt lõi của Indicator:

| STT | Cột hiển thị | Thuộc tính STIX 2.1 | Định dạng hiển thị |
|:---:|:--- |:--- |:--- |
| 1 | **TÊN** | `name` | Text (In đậm) |
| 2 | **LOẠI** | `type` | Tag |
| 3 | **CONFIDENCE** | `confidence` | Progress bar / Number |
| 4 | **REVOKED** | `revoked` | **Badge:** Yes (Đỏ) / No |
| 5 | **VALID FROM** | `valid_from` | Datetime |
| 6 | **VALID UNTIL** | `valid_until` | Datetime |
| 7 | **NGÀY TẠO** | `created` | Datetime |
| 8 | **CẬP NHẬT** | `modified` | Datetime |
| 9 | **MÔ TẢ** | `description` | Text (Cắt ngắn) |

### 3.3. Màn hình Chi tiết IOC (STIX Object Viewer)
Khi nhấn vào một bản ghi, Drawer trượt từ bên phải vào hiển thị:
- **Header:** Tên Indicator (`name`) và ID (`id`).
- **Phần Pattern:** Hiển thị mã Pattern kỹ thuật (Ví dụ: `[file:hashes.'SHA-256' = '...']`).
- **Metadata:** 
    - `created`, `modified` (Thời gian tạo/chỉnh sửa).
    - `created_by_ref` (Nguồn gốc cung cấp).
- **Hành động:** Nút "Xem JSON gốc" để kiểm tra cấu trúc STIX 2.1.

---

## 4. Đặc tả khu vực Cấu hình Kết nối (Chuẩn TAXII 2.1)

### 4.1. Tab 1: TAXII Client (Tiếp nhận tình báo)
Cấu hình để hệ thống tự động lấy dữ liệu IOC từ các máy chủ tình báo bên ngoài.

**A. Thông số kết nối (Quy trình Discovery):**
- **Discovery URL:** Địa chỉ máy chủ TAXII cấp cao nhất (Ví dụ: `https://taxii-server.com/taxii2/`).
- **Xác thực (Authentication):** Hỗ trợ **Basic Auth** (Username/Password) hoặc **Bearer Token**.
- **API Root:** Sau khi kết nối thành công Discovery URL, hệ thống hiển thị danh sách các API Root để người dùng chọn.
- **Collections:** Hiển thị danh sách các danh mục dữ liệu trong API Root đã chọn. Người dùng tích chọn các Collection muốn đồng bộ.

**B. Hành động:**
- **Test Connection:** Kiểm tra tính hợp lệ của URL và tài khoản.
- **Polling Interval:** Cấu hình tần suất tự động kiểm tra dữ liệu mới (15p, 30p, 1h...).

### 4.2. Tab 2: TAXII Server (Chia sẻ tình báo ra bên ngoài)
Cung cấp API theo chuẩn TAXII 2.1 để các hệ thống SIEM/SOC bên ngoài có thể truy cập và lấy dữ liệu IOC về.

**A. Cấu hình Discovery Service:**
- Thiết lập thông tin định danh máy chủ: *Title, Description, Contact, Default API Root*.

**B. Quản lý API Roots & Collections:**
- **API Roots:** Tạo và quản lý các đường dẫn API khác nhau phục vụ các nhóm đối tác.
- **Collections:** 
    - Tạo các danh mục dữ liệu chia sẻ.
    - **Quy tắc gán dữ liệu:** Thiết lập bộ lọc (ví dụ: chỉ chia sẻ IOC có Confidence > 80) để dữ liệu tự động được đưa vào Collection tương ứng.

**C. Quản lý Truy cập (Access Control):**
- **Token Management:** Tạo mã Token xác thực cho từng hệ thống bên ngoài.
- **Permissions:** Chỉ định từng Token được phép truy cập vào API Root và Collection nào.

**D. Hành động:**
- **Nhật ký truy cập (Access Logs):** Theo dõi danh sách các hệ thống đã kết nối và số lượng dữ liệu đã được lấy đi.

---

## 5. Quy tắc Nghiệp vụ (Business Rules)
- **Xử lý Revoked:** Nếu `revoked: true`, gỡ bỏ luật rà quét trên Agent.
- **Validation:** Kiểm tra tính hợp lệ của JSON STIX Bundle trước khi nhập vào hệ thống.
- **Auto-Sync:** Các IOC mới từ nguồn TAXII Client sau khi được phê duyệt sẽ tự động có mặt trong các Outbound Collections của TAXII Server (nếu thỏa mãn bộ lọc).
