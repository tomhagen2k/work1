# ĐẶC TẢ CHI TIẾT GIAO DIỆN: QUẢN LÝ THIẾT BỊ (DEVICE MANAGEMENT)

## 1. Tổng quan Hệ thống
**Tên hệ thống:** Enterprise AV Management Console (EAMC)
**Mục tiêu:** Hệ thống quản trị tập trung dành cho doanh nghiệp để giám sát và điều khiển phần mềm diệt virus trên các máy trạm (Endpoints). Hỗ trợ ứng cứu sự cố tức thì qua tính năng cô lập mạng và quản lý chính sách bảo mật tập trung.

---

## 2. Cấu trúc Giao diện Tổng thể
Hệ thống sử dụng bố cục chuẩn Dashboard doanh nghiệp với:
- **Thanh Menu bên trái (Sidebar):** Cố định, chứa các biểu tượng điều hướng chính.
- **Khu vực Nội dung (Main Content):** Hiển thị dữ liệu và các công cụ tương tác.

### Danh mục Menu bên trái:
1. **Dashboard:** Tổng quan sức khỏe hệ thống.
2. **Event Management:** Quản lý các sự kiện an ninh và cảnh báo mã độc.
3. **Device Management:** (Đang chọn) Quản lý danh sách máy trạm và thực thi lệnh.
4. **Policy Management:** Thiết lập cấu hình bảo vệ cho các nhóm máy.
5. **IOC Management:** Quản lý các dấu hiệu thỏa hiệp (Hashes, IPs, Domains).
6. **Group Management:** Quản lý phân nhóm máy trạm.
7. **User Management:** Quản lý tài khoản quản trị viên hệ thống.

---

## 3. Đặc tả khu vực Quản lý Thiết bị

### 3.1. Hệ thống Tab điều hướng
Ngay bên dưới tiêu đề trang, sử dụng 2 Tab để phân loại đối tượng quản lý:
- **Tab 1: Agent:** Quản lý các thiết bị đã cài đặt phần mềm quản trị (Mặc định).
- **Tab 2: Thiết bị lạ:** Hiển thị các thiết bị phát hiện được trong mạng nội bộ nhưng chưa có Agent.

### 3.2. Nội dung Tab "Agent" (Thiết bị đã quản lý)

#### 3.2.1. Thanh công cụ phía trên (Header Toolbar)
- **Tìm kiếm (Bên trái):** Ô nhập văn bản có icon kính lúp. Cho phép tìm kiếm tự do theo: *Tên máy, IP, MAC*.
- **Bộ lọc nhanh (Bên phải):**
    - **Nhóm (Group):** Hiển thị danh sách nhóm theo mô hình cây (Tree view).
    - **Hệ điều hành:** Tất cả, Windows, Linux, macOS.
    - **Mức độ Rủi ro:** Tất cả, Critical, High, Medium, Low.
    - **Trạng thái:** Tất cả, Online, Offline, Lockdown.

#### 3.2.2. Bảng Danh sách Thiết bị (Device Table)
| STT | Cột hiển thị | Mô tả chi tiết | Định dạng hiển thị |
|:---:|:--- |:--- |:--- |
| 1 | **Checkbox** | Chọn thiết bị để thực hiện hành động hàng loạt | Ô tích chọn |
| 2 | **DEVICE NAME** | Tên máy trạm ghi nhận từ hệ điều hành | Text + Icon HĐH nhỏ |
| 3 | **NHÓM** | Tên nhóm mà thiết bị đang thuộc về | Text |
| 4 | **ĐỊA CHỈ IP** | Địa chỉ IP nội bộ của máy trạm | Text |
| 5 | **ĐỊA CHỈ MAC** | Địa chỉ vật lý của card mạng | Text |
| 6 | **MỨC ĐỘ RỦI RO** | Đánh giá độ nguy hiểm hiện tại của máy | **Badge màu:** Đỏ, Cam, Vàng, Xanh |
| 7 | **HỆ ĐIỀU HÀNH** | Phiên bản hệ điều hành | **Tag:** Nền nhạt, chữ đậm |
| 8 | **TRẠNG THÁI** | Tình trạng kết nối của Agent với Server | **Badge:** Online (Xanh), Offline (Xám), Lockdown (Cam) |
| 9 | **LẦN CUỐI HOẠT ĐỘNG** | Thời gian gần nhất gửi tín hiệu | Datetime |
| 10 | **HÀNH ĐỘNG** | Các lệnh điều khiển nhanh | Nút icon mở menu/drawer |

---

### 3.3. Nội dung Tab "Thiết bị lạ" (Unmanaged Discovery)
Dành cho các thiết bị do Agent tự động rà quét và báo cáo về.

#### 3.3.1. Bảng danh sách Thiết bị lạ
| STT | Cột hiển thị | Mô tả dữ liệu | Định dạng hiển thị |
|:---:|:--- |:--- |:--- |
| 1 | **ĐỊA CHỈ IP** | IP của thiết bị lạ phát hiện được | Text |
| 2 | **ĐỊA CHỈ MAC** | MAC Address | Text |
| 3 | **HÃNG (VENDOR)** | Hãng sản xuất thiết bị (tra cứu MAC) | Text (Ví dụ: Apple, Cisco) |
| 4 | **PHÂN LOẠI** | Dự đoán (PC, Printer, Mobile, IoT...) | Tag màu nhạt |
| 5 | **SCANNER** | Tên Agent phát hiện ra thiết bị này | Text/Link |
| 6 | **THỜI GIAN PHÁT HIỆN**| Lần đầu ghi nhận trong mạng | Datetime |
| 7 | **HÀNH ĐỘNG** | Thao tác xử lý | Icon: **Cài Agent**, **Tin cậy**, **Xóa** |

---

## 4. Luồng Tương tác Người dùng (UX Flows)

### 4.1. Thực hiện Cô lập thiết bị (Lockdown)
1. Admin chọn một hoặc nhiều thiết bị trong bảng Agent.
2. Nhấn nút **"Lockdown"** (trong menu Hành động hoặc Thanh công cụ nổi).
3. **Popup xác nhận:** Hiển thị cảnh báo về việc ngắt kết nối mạng của thiết bị.
4. **Kết quả:** Trạng thái tại cột "TRẠNG THÁI" chuyển sang màu Cam rực với chữ `Lockdown`. Agent trên máy trạm thực thi chặn toàn bộ traffic trừ kết nối tới Server.

### 4.2. Xem Chi tiết & Điều khiển nâng cao (Device Drawer)
*Chỉ áp dụng cho Tab Agent.* Khi click vào tên máy, một màn hình **Drawer** trượt từ bên phải vào:
- **Thông tin phần cứng:** CPU, RAM, Disk, Danh sách Card mạng.
- **Trạng thái Module bảo vệ:** Danh sách các công tắc (Switch ON/OFF) cho:
    - *Real-time Protection*, *Behavior Analysis*, *Network Firewall*, *Web Filtering*.
- **Nút hành động khẩn cấp:** `Scan Now`, `Update Signatures`, `Collect Diagnostics`.

---

## 5. Phong cách Thiết kế (Aesthetics)
- **Màu sắc:** Tuân thủ hệ màu của ảnh mẫu (Badges Critical: #FF4D4F, High: #FFA940, v.v.).
- **Trạng thái Hover:** Dòng trong bảng đổi màu nền sang `#F5F5F5` khi di chuột qua.
- **Độ phản hồi:** Giao diện Responsive, tự động ẩn một số cột ít quan trọng khi màn hình nhỏ.
