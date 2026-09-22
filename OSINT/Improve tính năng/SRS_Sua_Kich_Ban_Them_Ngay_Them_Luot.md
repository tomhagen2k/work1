# ĐẶC TẢ CHI TIẾT CHỨC NĂNG: SỬA KỊCH BẢN, THÊM NGÀY VÀ THÊM LƯỢT CHẠY

> **Hệ thống:** OSINT AI Automation  
> **Module:** Quản Lý Kịch Bản (Scenario Management)  
> **Tải liệu đặc tả giao diện theo chuẩn:** `srs_ui_component_writer`  

---

## 1. THÔNG TIN CHUNG

Tài liệu này đặc tả chi tiết giao diện và luồng xử lý của 3 tính năng nâng cao thuộc module Quản lý kịch bản:
1. **Tính năng Chỉnh sửa Kịch bản (Edit Scenario):** Popup cho phép sửa thông tin tên kịch bản (khóa không cho sửa Loại kịch bản và Kênh nền tảng để đảm bảo toàn vẹn dữ liệu).
2. **Tính năng Thêm Ngày mới (Add Roadmap Day):** Nút hành động tại Sub-menu Cột 2 cho phép mở rộng số Ngày trong kịch bản lộ trình (áp dụng với kịch bản chưa gán).
3. **Tính năng Thêm Lượt chạy trong Ngày (Add Execution Slot):** Popup cho phép thiết lập các mốc thời gian chạy khác nhau trong ngày với quy tắc validation cách nhau tối thiểu 30 phút.

---

## 2. CHỨC NĂNG 1: POPUP CHỈNH SỬA KỊCH BẢN (EDIT SCENARIO MODAL)

### 2.1. Thông tin chung về Popup
- **Tên Popup:** Chỉnh sửa kịch bản (Edit Scenario Modal)
- **Loại giao diện:** Popup Modal
- **Mô tả nghiệp vụ:** Cho phép người dùng chỉnh sửa tên kịch bản. Để tránh gây hỏng cấu hình các bước hành động và tiến trình nuôi nick đã gán cho tài khoản ảo, hệ thống tự động khóa (disable) ô "Kênh nền tảng" và ô "Loại kịch bản".

### 2.2. Bảng đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Chỉnh sửa kịch bản [Tên kịch bản]**<br>(Tiêu đề popup) | Label | - Tiêu đề popup, hiển thị tên kịch bản đang được chỉnh sửa.<br>- **Nội dung hiển thị:** `Chỉnh sửa kịch bản [Tên kịch bản hiện tại]` (`Edit Scenario [Scenario Name]`)<br>- **Tính chất hiển thị:** Động (Dynamic - thay đổi theo tên kịch bản được chọn). |
| **2** | **Close (Icon đóng X)** | Button | - Nút đóng popup, cho phép người dùng thoát khỏi giao diện chỉnh sửa kịch bản.<br>- **Vị trí:** Góc trên cùng bên phải popup.<br>- **Hành vi khi nhấn (OnClick Event):**<br>1. Không thực hiện kiểm tra dữ liệu đầu vào.<br>2. Nếu người dùng chưa thay đổi Tên kịch bản: Đóng popup.<br>3. Nếu người dùng đã chỉnh sửa Tên kịch bản: Hiển thị hộp thoại cảnh báo dữ liệu chưa lưu (Xem Mục 5.1). |
| **3** | **Kênh nền tảng ***<br>(Kênh mạng xã hội) | Combobox / Dropdown (Single-select) | - Cho phép người dùng xem kênh nền tảng của kịch bản (được khóa không cho sửa).<br>- **Trạng thái:** Vô hiệu hóa (Disabled - hiển thị màu xám, không thể tương tác).<br>- **Nguồn dữ liệu cố định:**<br>&nbsp;&nbsp;+ Facebook (`Facebook`)<br>&nbsp;&nbsp;+ Tiktok (`Tiktok`)<br>&nbsp;&nbsp;+ Zalo (`Zalo`)<br>&nbsp;&nbsp;+ Telegram (`Telegram`)<br>- **Giá trị mặc định:** Lấy theo Kênh nền tảng hiện tại của kịch bản (mặc định `Facebook`).<br>- **Quy tắc Nghiệp vụ:** Chống sửa kênh nền tảng của kịch bản đã tạo để đảm bảo tính đúng đắn của danh mục hành động tương tác.<br>- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định và ở trạng thái Disabled). |
| **4** | **Tên kịch bản ***<br>(Tên kịch bản) | Textbox (Single-line) | - Người dùng bắt buộc nhập vào tên mới cho kịch bản.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Nhập tên kịch bản...<br>&nbsp;&nbsp;+ EN: Enter scenario name...<br>- **Giá trị mặc định:** Lấy theo Tên kịch bản hiện tại.<br>- **Giới hạn ký tự:** Tối đa 128 ký tự. Hành vi khi vượt quá: Hệ thống tự động chặn gõ, không hiển thị phần ký tự gõ thêm vượt quá 128.<br>- **Kiểu ký tự hợp lệ:** Tất cả các ký tự ngoại trừ các ký tự đặc biệt nguy hiểm ngăn ngừa SQL Injection.<br>- **Quy tắc Nghiệp vụ:**<br>1. Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi kiểm tra trùng và lưu.<br>2. Tên kịch bản phải là duy nhất trên hệ thống (không trùng với các kịch bản khác, không phân biệt chữ hoa/chữ thường khi so sánh).<br>- **Thông báo lỗi tương ứng:**<br>+ Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng nhập tên kịch bản!"` (`"Scenario name is required!"`)<br>+ Trùng lặp: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Tên kịch bản đã tồn tại!"` (`"Scenario name already exists!"`) |
| **5** | **Loại kịch bản ***<br>(Loại kịch bản) | Combobox / Dropdown (Single-select) | - Cho phép người dùng xem loại kịch bản (được khóa không cho sửa).<br>- **Trạng thái:** Vô hiệu hóa (Disabled - hiển thị màu xám, không thể tương tác).<br>- **Nguồn dữ liệu cố định:**<br>&nbsp;&nbsp;+ 🔄 Kịch bản đơn (`recurring`)<br>&nbsp;&nbsp;+ 📅 Kịch bản lộ trình (`roadmap`)<br>- **Giá trị mặc định:** Lấy theo Loại kịch bản hiện tại.<br>- **Quy tắc Nghiệp vụ:** Không cho phép thay đổi Loại kịch bản từ Đơn sang Lộ trình (hoặc ngược lại) sau khi đã khởi tạo để tránh làm hỏng cấu trúc danh sách Ngày và Lượt chạy.<br>- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định và ở trạng thái Disabled). |
| **6** | **Hủy**<br>(Nút Hủy) | Button | - Cho phép người dùng hủy bỏ thao tác chỉnh sửa và đóng popup.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):**<br>1. Không thực hiện kiểm tra dữ liệu đầu vào.<br>2. Nếu người dùng chưa chỉnh sửa Tên kịch bản: Đóng popup.<br>3. Nếu người dùng đã sửa Tên kịch bản: Hiển thị hộp thoại cảnh báo dữ liệu chưa lưu (Xem Mục 5.1). |
| **7** | **Lưu kịch bản**<br>(Nút Lưu) | Button | - Cho phép người dùng thực hiện lưu các thay đổi thông tin kịch bản.<br>- **Trạng thái mặc định:** Enabled<br>- **Quyền hạn truy cập:** Quản trị viên có quyền sửa kịch bản.<br>- **Hành vi khi nhấn (OnClick Event):**<br>Khi nhấn vào thì sẽ kiểm tra thông tin Tên kịch bản người dùng nhập:<br>+ Thông tin không hợp lệ (trống hoặc trùng tên): Hiển thị thông báo lỗi inline màu đỏ tương ứng ngay dưới trường Tên kịch bản.<br>+ Thông tin hợp lệ thì sẽ thực hiện cập nhật kịch bản:<br>&nbsp;&nbsp;. Khi bắt đầu gửi request: Chuyển nút sang trạng thái Loading (spinner xoay tròn, disable nút Lưu kịch bản). Trạng thái disable này chỉ mở khóa sau khi nhận phản hồi từ máy chủ.<br>&nbsp;&nbsp;. Nếu cập nhật thành công: Đóng popup Chỉnh sửa kịch bản, cập nhật lại tên kịch bản mới trên giao diện Cột 1 và Cột 3, đồng thời hiển thị toast message tự động đóng với nội dung `"Cập nhật kịch bản thành công!"` (`"Scenario updated successfully!"`).<br>&nbsp;&nbsp;. Nếu cập nhật không thành công: Hiển thị toast message tự động đóng với nội dung `"Cập nhật kịch bản không thành công!"` (`"Failed to update scenario!"`). |

---

## 3. CHỨC NĂNG 2: THÊM NGÀY MỚI VÀO KỊCH BẢN LỘ TRÌNH (ADD ROADMAP DAY)

### 3.1. Thông tin chung
- **Vị trí nút thao tác:** Chân Cột 2 (Sub-menu danh sách Ngày).
- **Loại giao diện:** Nút bấm trực tiếp trên giao diện (Inline Action Button).
- **Mô tả nghiệp vụ:** Cho phép người dùng mở rộng lộ trình nuôi nick bằng cách thêm `Ngày N+1` vào cuối danh sách Ngày của Kịch bản lộ trình (chỉ áp dụng đối với các kịch bản chưa được gán cho tài khoản ảo nào).

### 3.2. Bảng đặc tả chi tiết nút hành động Thêm Ngày

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **+ Thêm Ngày mới**<br>(Nút Thêm Ngày) | Button (Dashed border) | - Cho phép người dùng thêm một Ngày mới vào cuối lộ trình nuôi nick hiện tại.<br>- **Vị trí:** Phía dưới cùng của Sub-menu danh sách Ngày ở Cột 2.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi kịch bản đang chọn là Kịch bản lộ trình.<br>- **Trạng thái mặc định:** Enabled<br>- **Quy tắc Nghiệp vụ & Ràng buộc sản phẩm (Product Constraints):**<br>1. **Kiểm tra trạng thái gán kịch bản:** Trước khi thêm Ngày, hệ thống kiểm tra kịch bản lộ trình này đã được gán cho bất kỳ tài khoản ảo nào chưa.<br>&nbsp;&nbsp;+ **Trường hợp ĐÃ GÁN:** Hệ thống chặn hành động thêm Ngày và hiển thị Pop-up cảnh báo: `"⚠️ RÀNG BUỘC SẢN PHẨM: Kịch bản lộ trình này đang được gán cho tài khoản ảo. Bạn không thể thêm mới ngày để tránh xung đột tiến trình nuôi nick!"` (`"⚠️ PRODUCT CONSTRAINT: This roadmap scenario is assigned to virtual accounts. You cannot add new days to avoid progress conflicts!"`).<br>&nbsp;&nbsp;+ **Trường hợp CHƯA GÁN:** Hệ thống khởi tạo `Ngày N+1` mới (Ví dụ: `Ngày 4`).<br>2. **Cấu hình mặc định cho Ngày mới:** Ngày mới tạo tự động chứa 1 Lượt chạy mặc định (`Lượt 1` với mốc giờ `08:30`) và bảng hành động rỗng.<br>3. **Hành vi chuyển đổi tự động:** Tự động chọn `Ngày N+1` vừa tạo (chuyển nút sang trạng thái Active màu xanh) và mở giao diện quản lý Lượt chạy của Ngày này ở Cột 3. |

---

## 4. CHỨC NĂNG 3: POPUP THÊM LƯỢT CHẠY MỚI TRONG NGÀY (ADD EXECUTION SLOT MODAL)

### 4.1. Thông tin chung về Popup
- **Tên Popup:** Thêm lượt chạy mới (Add Execution Slot Modal)
- **Loại giao diện:** Popup Modal
- **Mô tả nghiệp vụ:** Cho phép người dùng bổ sung thêm một Khung giờ / Lượt chạy mới cho Ngày đang chọn trong Kịch bản lộ trình. Mỗi Ngày có thể chứa nhiều Lượt chạy khác nhau (Sáng, Chiều, Tối). Hệ thống áp dụng quy tắc kiểm tra nghiêm ngặt: Mốc thời gian của các Lượt chạy trong cùng một Ngày phải cách nhau **tối thiểu 30 phút**.

### 4.2. Bảng đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Thêm lượt chạy mới cho [Ngày X]**<br>(Tiêu đề popup) | Label | - Tiêu đề popup, hiển thị tên Ngày đang được thêm Lượt chạy.<br>- **Nội dung hiển thị:** `Thêm lượt chạy mới cho [Ngày X]` (`Add new execution slot for [Day X]`) (Ví dụ: `Thêm lượt chạy mới cho [Ngày 1]`).<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **2** | **Close (Icon đóng X)** | Button | - Nút đóng popup, cho phép người dùng hủy thao tác thêm lượt chạy.<br>- **Vị trí:** Góc trên cùng bên phải popup.<br>- **Hành vi khi nhấn (OnClick Event):** Đóng popup, không thêm Lượt chạy mới. |
| **3** | **Thời điểm chạy trong ngày (HH:mm) ***<br>(Mốc giờ thực thi) | Timepicker | - Người dùng bắt buộc chọn mốc thời gian thực thi cho Lượt chạy mới trong ngày.<br>- **Định dạng hiển thị & nhập:** `HH:mm` (24 giờ).<br>- **Cách thức nhập:** Chọn qua đồng hồ picker hoặc gõ trực tiếp số giờ và phút.<br>- **Giá trị mặc định:** Hệ thống tự động tính toán và sinh ngẫu nhiên một mốc giờ hợp lệ rơi vào khung giờ vàng (cách mốc giờ của Lượt chạy cuối cùng hiện có trong Ngày từ 2 đến 3 tiếng, đảm bảo luôn ≥ 30 phút).<br>- **Dòng văn bản hướng dẫn bên dưới:** `⚠️ Ràng buộc hệ thống: Thời điểm của các lượt chạy trong cùng một ngày phải cách nhau tối thiểu 30 phút.`<br>- **Quy tắc Nghiệp vụ & Validation (Khoảng cách 30 phút):**<br>1. Mốc giờ chọn mới (`T_new`) phải cách tất cả mốc giờ của các Lượt chạy hiện có (`T_exist`) trong cùng Ngày này một khoảng thời gian `|T_new - T_exist| >= 30 phút`.<br>- **Thông báo lỗi tương ứng (Inline Error Message):**<br>+ Trống và nhấn Lưu: Hiển thị dòng lỗi màu đỏ ngay dưới ô nhập: `"Vui lòng chọn mốc thời gian!"` (`"Please select a time!"`)<br>+ Vi phạm khoảng cách 30 phút: Hiển thị dòng lỗi màu đỏ ngay dưới ô nhập: `"⚠️ Thời điểm giữa các lượt chạy trong cùng một ngày phải cách nhau tối thiểu 30 phút! Vui lòng chọn mốc giờ khác."` (`"⚠️ Execution times within the same day must be at least 30 minutes apart! Please select another time."`) |
| **4** | **Hủy**<br>(Nút Hủy) | Button | - Cho phép người dùng hủy bỏ thao tác thêm lượt chạy và đóng popup.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):** Đóng popup, giữ nguyên các Lượt chạy hiện có của Ngày. |
| **5** | **Lưu lượt chạy**<br>(Nút Lưu lượt) | Button | - Cho phép người dùng lưu Lượt chạy mới vào Ngày đang chọn.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):**<br>Khi nhấn vào thì sẽ kiểm tra thông tin mốc giờ người dùng chọn:<br>+ Nếu mốc giờ bị trống hoặc vi phạm quy tắc cách nhau 30 phút: Ẩn/hiển thị dòng thông báo lỗi inline màu đỏ ngay bên dưới ô nhập thời gian và không đóng popup.<br>+ Nếu mốc giờ hợp lệ thì sẽ thực hiện thêm Lượt chạy:<br>&nbsp;&nbsp;. Khởi tạo Thẻ Lượt chạy mới với tên mặc định (Ví dụ: `Lượt K`).<br>&nbsp;&nbsp;. Sắp xếp lại danh sách các Thẻ Lượt chạy trong Ngày theo thứ tự thời gian tăng dần (Chronological order).<br>&nbsp;&nbsp;. Đóng popup Thêm lượt chạy mới.<br>&nbsp;&nbsp;. Cập nhật hiển thị danh sách Thẻ Lượt chạy ở Cột 3 và tóm tắt mốc giờ trên nút Ngày ở Cột 2 Sub-menu.<br>&nbsp;&nbsp;. Hiển thị toast message tự động đóng với nội dung `"Thêm lượt chạy thành công!"` (`"Execution slot added successfully!"`). |

---

## 5. ĐẶC TẢ HỘP THOẠI XÁC NHẬN VÀ CẢNH BÁO ĐI KÈM (CONFIRMATION MODALS)

### 5.1. Modal Cảnh báo dữ liệu chưa lưu khi thoát Popup Sửa Kịch bản
- **Tên Modal:** Cảnh báo chưa lưu thay đổi kịch bản
- **Tiêu đề (Header):** `"Thông tin chưa được lưu"` (`"Unsaved changes"`)
- **Nội dung thông báo (Body text):** `"Tên kịch bản vừa chỉnh sửa chưa được lưu lại. Bạn có chắc chắn muốn thoát và hủy bỏ các thay đổi này không?"` (`"The scenario name you modified has not been saved. Are you sure you want to exit and discard these changes?"`)
- **Nút Xác nhận thoát (Confirm Button):**
  - Nhãn nút: `"Thoát không lưu"` (`"Exit without saving"`)
  - Hành vi khi nhấn: Đóng modal này và đóng Popup Chỉnh sửa kịch bản, khôi phục tên kịch bản cũ, không lưu thay đổi.
- **Nút Hủy/Giữ lại (Cancel Button):**
  - Nhãn nút: `"Giữ lại"` (`"Keep editing"`)
  - Hành vi khi nhấn: Đóng modal này, giữ nguyên Popup Chỉnh sửa kịch bản để người dùng tiếp tục thao tác.
- **Hành vi khi click vùng ngoài Modal:** Không đóng hộp thoại cảnh báo.

---

### 5.2. Modal Cảnh báo Ràng buộc Sản phẩm khi Thêm Ngày vào Kịch bản ĐÃ GÁN
- **Tên Modal:** Hộp thoại cảnh báo ràng buộc kịch bản đã gán
- **Tiêu đề (Header):** `"Cảnh báo ràng buộc sản phẩm"` (`"Product constraint warning"`)
- **Nội dung thông báo (Body text):** `"⚠️ RÀNG BUỘC SẢN PHẨM: Kịch bản lộ trình này đang được gán cho tài khoản ảo. Bạn không thể thêm mới ngày để tránh xung đột tiến trình nuôi nick!"` (`"⚠️ PRODUCT CONSTRAINT: This roadmap scenario is assigned to virtual accounts. You cannot add new days to avoid progress conflicts!"`)
- **Nút Đồng ý (OK Button):**
  - Nhãn nút: `"Đã hiểu"` (`"Got it"`)
  - Hành vi khi nhấn: Đóng hộp thoại cảnh báo.
