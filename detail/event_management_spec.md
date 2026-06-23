# ĐẶC TẢ CHI TIẾT GIAO DIỆN: QUẢN LÝ SỰ KIỆN (EVENT MANAGEMENT)

## 1. Tổng quan Hệ thống
**Tên hệ thống:** Enterprise AV Management Console (EAMC)
**Mục tiêu:** Hệ thống quản trị tập trung dành cho doanh nghiệp để giám sát và điều khiển phần mềm diệt virus trên các máy trạm (Endpoints). Hệ thống hỗ trợ truy vấn mạnh mẽ để xác định nguồn gốc tấn công, theo dõi trạng thái quét mã độc và các hành vi bất thường trên hệ thống.

---

## 2. Cấu trúc Giao diện Tổng thể
Hệ thống sử dụng bố cục chuẩn Dashboard doanh nghiệp với:
- **Thanh Menu bên trái (Sidebar):** Cố định, chứa các biểu tượng điều hướng chính.
- **Khu vực Nội dung (Main Content):** Hiển thị dữ liệu và các công cụ tương tác.

### Danh mục Menu bên trái:
1. **Dashboard:** Tổng quan sức khỏe hệ thống.
2. **Event Management:** Quản lý các sự kiện an ninh và cảnh báo mã độc. (Đang chọn)
3. **Device Management:** Quản lý danh sách máy trạm và thực thi lệnh.
4. **Policy Management:** Thiết lập cấu hình bảo vệ cho các nhóm máy.
5. **IOC Management:** Quản lý các dấu hiệu thỏa hiệp (Hashes, IPs, Domains).
6. **Group Management:** Quản lý phân nhóm máy trạm.
7. **User Management:** Quản lý tài khoản quản trị viên hệ thống.

---

## 3. Đặc tả khu vực Quản lý Sự kiện

### 3.1. Thanh công cụ phía trên (Header Toolbar)
- **Tìm kiếm KQL (Bên trái):** Ô nhập liệu hỗ trợ truy vấn dạng Key-Value (ví dụ: `event.type: "malware" AND severity: "critical"`). 
    - Hệ thống hỗ trợ **Hint từ khóa** (tự động gợi ý tên trường và giá trị) khi người dùng đang nhập.
- **Bộ lọc nhanh (Bên phải):**
    - **Nhóm (Group):** Lọc sự kiện theo nhóm của thiết bị (Agent Group). Hỗ trợ chọn nhóm theo mô hình cây.
    - **Mức độ (Severity):** Critical, High, Medium, Low.
    - **Thời gian:** Picker chọn các khoảng thời gian cố định: *15 phút trước, 30 phút trước, 1 giờ trước, 7 ngày trước, 30 ngày trước* hoặc *Tùy chọn khoảng thời gian cụ thể (Custom Range)*.

### 3.2. Bảng Danh sách Sự kiện (Event Table)
- **Công cụ bảng:** Phía trên bên phải bảng có nút **"Cột hiển thị"** cho phép người dùng tùy chọn ẩn/hiện các cột dữ liệu trên Table theo nhu cầu.
- **Danh sách cột mặc định:** Bố cục cột được tối giản hóa để tập trung vào thông tin Agent và nội dung sự kiện:

| STT | Cột hiển thị | Mô tả dữ liệu | Định dạng hiển thị |
|:---:|:--- |:--- |:--- |
| 1 | **Checkbox** | Chọn nhiều sự kiện để xử lý hàng loạt | Ô tích chọn |
| 2 | **EVENT ID** | Mã định danh duy nhất của sự kiện | Text + Icon Copy nhanh |
| 3 | **THỜI GIAN** | Thời điểm phát hiện sự kiện tại máy trạm | Datetime (19/03/2026 17:42:11) |
| 4 | **AGENT** | Máy trạm gửi sự kiện về | Text (Agent Name / ID) |
| 5 | **MỨC ĐỘ** | Độ nghiêm trọng của sự kiện | **Badge màu:** Đỏ (Critical), Cam (High)... |
| 6 | **NỘI DUNG / MÔ TẢ** | Mô tả chi tiết về sự kiện an ninh | Text (Ví dụ: Phát hiện Malware Trojan.Win32...) |
| 7 | **HÀNH ĐỘNG** | Xem chi tiết sự kiện | Nút mũi tên `>` mở Drawer |

---

## 4. Màn hình Chi tiết Sự kiện (Event Detail Drawer)
Drawer hiển thị thông tin chuyên sâu và thay đổi linh hoạt theo từng loại sự kiện.

### 4.1. Header của Drawer
Hiển thị các thông tin nhận diện cốt lõi:
- **Tiêu đề:** Tên ngắn gọn của sự kiện.
- **Event ID:** Mã định danh duy nhất của sự kiện.
- **Thông tin Agent:** Agent ID & Agent Name.
- **Mức độ:** Badge mức độ nghiêm trọng.
- **Thời gian:** Thời gian phát hiện sự kiện cụ thể.

### 4.2. Hệ thống Tabs dữ liệu

#### Tab 1: Key-Value (Thông tin ngữ cảnh)
Hiển thị thông tin đặc thù của phần mềm AV. Các trường dữ liệu sẽ **thay đổi linh hoạt** tùy theo loại sự kiện:

**Các thông tin cơ bản luôn có:**
- Thời gian, Agent ID, Agent Name, Loại sự kiện, ID sự kiện, Mô tả, Mức độ nghiêm trọng.

**Thông tin bổ sung theo loại sự kiện:**
- **Sự kiện Phát hiện mã độc:** Danh sách các tệp tin độc hại, mã băm (Hash), đường dẫn tệp, hành động đã thực hiện (đã diệt/cách ly).
- **Sự kiện Kết nối độc hại:** IP nguồn/đích, Port, Giao thức, Tên tiến trình thực hiện kết nối.
- **Sự kiện Ransomware:** Danh sách các tệp tin bị tác động, tiến trình nghi vấn mã hóa dữ liệu.
- **Sự kiện Hệ thống (Quét toàn bộ/Quét theo lịch):** Thời gian bắt đầu/kết thúc, Tổng số file đã quét, Số lượng tệp độc hại phát hiện.

#### Tab 2: JSON (Dữ liệu thô)
- Hiển thị bản ghi dữ liệu thô dạng JSON để phục vụ kỹ thuật phân tích sâu.
- Có nút **"Copy"** để lấy dữ liệu.

#### Tab 3: Audit Trail (Lịch sử xử lý)
Hiển thị quá trình xử lý sự kiện từ lúc Agent gửi về cho đến khi quản trị viên thực hiện hành động đáp trả.

---

## 5. Các chức năng bổ sung
- **Export Nhật ký:** Tải xuống danh sách sự kiện theo bộ lọc hiện tại (CSV/JSON).
- **Collect Deep Logs:** Yêu cầu máy trạm gửi nhật ký chuyên sâu để điều tra thêm.
