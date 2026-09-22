# TÀI LIỆU ĐẶC TẢ THÔNG TIN CHUNG VÀ GIAO DIỆN CHỨC NĂNG (SRS)
## TÍNH NĂNG: GÁN KỊCH BẢN CHO TÀI KHOẢN ẢO (VIRTUAL ACCOUNT SCENARIO ASSIGNMENT)

Tài liệu này đặc tả toàn bộ nghiệp vụ và chi tiết thành phần giao diện của tính năng **Gán kịch bản cho tài khoản ảo** thuộc hệ thống OSINT AI Automation. Tài liệu được biên soạn kết hợp giữa tiêu chuẩn **`srs_func_info_writer`** (Đặc tả thông tin chung 7 phần) và tiêu chuẩn **`srs_ui_component_writer`** (Đặc tả thành phần giao diện UI Components).

---

# PHẦN I: ĐẶC TẢ THÔNG TIN CHUNG CHỨC NĂNG (SRS FUNCTIONAL INFO)

### 1. Tên chức năng
Gán kịch bản cho tài khoản ảo (Virtual Account Scenario Assignment)

### 2. Mô tả
Chức năng Gán kịch bản cho tài khoản ảo cho phép Quản trị viên thiết lập, quản lý và vận hành các kịch bản chạy tự động hóa (*Kịch bản đơn* hoặc *Kịch bản lộ trình*) cho từng tài khoản ảo được chọn trên bảng dữ liệu Datatable. Quản trị viên có thể xem danh sách các kịch bản đang gán cho tài khoản kèm ngày bắt đầu và tiến trình thực thi (`Ngày X/Y`), gán thêm Kịch bản đơn (cài đặt các khung giờ lặp định kỳ hàng tuần từ T2 đến CN), gán thêm Kịch bản lộ trình (chọn ngày bắt đầu ≥ Ngày hiện tại, chọn hành vi lặp chu kỳ hoặc dừng lại), bật/tắt công tắc hoạt động của kịch bản (kèm hộp thoại hỏi xử lý kích hoạt lại lộ trình dở dang: *Tiếp tục ngày dở* hay *Chạy lại từ Ngày 1*), và gỡ kịch bản khỏi tài khoản.

### 3. Tác nhân
Quản trị viên (Admin OSINT)

### 4. Điều kiện trước
- Quản trị viên đã đăng nhập thành công vào hệ thống OSINT AI Automation và có quyền quản lý tài khoản ảo.
- Quản trị viên tích chọn ít nhất 1 tài khoản ảo trên Datatable tại màn hình "Quản lý tài khoản ảo".

### 5. Điều kiện sau
- Cấu hình gán kịch bản được lưu trữ vào cơ sở dữ liệu và liên kết trực tiếp với tài khoản ảo mục tiêu.
- Cột "Số KB Đã Gán" trên bảng dữ liệu Datatable tự động cập nhật số lượng kịch bản gán mới.
- Trường hợp gán Kịch bản lộ trình lần đầu: Kịch bản lộ trình đó tự động khóa tính năng thêm/xóa Ngày ở màn hình Quản lý kịch bản.

### 6. Ngoại lệ
- Chưa chọn tài khoản ảo nào nhưng bấm nút Gán kịch bản: Hệ thống hiển thị cảnh báo `"Vui lòng chọn ít nhất 1 tài khoản ảo!"`.
- Vi phạm các quy tắc kiểm tra dữ liệu trên Form cấu hình gán: Chưa chọn kịch bản, chưa thêm khung giờ lặp cho kịch bản đơn, chọn ngày bắt đầu trong quá khứ... (Hệ thống không đóng Form và hiển thị dòng thông báo lỗi màu đỏ inline ngay bên dưới trường tương ứng).
- Lỗi máy chủ hoặc ngắt kết nối mạng khi bấm Lưu cấu hình: Hệ thống hiển thị Toast Message thất bại và giữ nguyên giao diện nhập liệu.

### 7. Các yêu cầu đặc biệt
- Tự động lọc bỏ các kịch bản đã gán trước đó khỏi danh sách lựa chọn khi gán thêm kịch bản mới cho cùng một tài khoản.
- Toàn bộ thông báo lỗi kiểm tra dữ liệu (Validation) phải được hiển thị dưới dạng dòng chữ màu đỏ inline trực tiếp bên dưới ô nhập liệu (không dùng ô Pop-up alert của trình duyệt).
- Sử dụng mốc ngày địa phương của máy tính người dùng (`getTodayLocalDateStr()`) để so sánh ngày bắt đầu gán kịch bản lộ trình nhằm tránh lỗi lệch múi giờ UTC.

---

# PHẦN II: ĐẶC TẢ CHI TIẾT CÁC THÀNH PHẦN GIAO DIỆN (SRS UI COMPONENTS)

## 1. POPUP 1: DANH SÁCH CHẠY KỊCH BẢN CHO TÀI KHOẢN (ASSIGNED SCENARIOS LIST MODAL)

### 1.1. Thông tin chung về Popup
- **Tên Popup:** Danh sách chạy kịch bản cho tài khoản (Assigned Scenarios List Modal)
- **Loại giao diện:** Popup Modal
- **Mô tả nghiệp vụ:** Hiển thị danh sách toàn bộ các kịch bản đang được gán cho tài khoản ảo được chọn. Cho phép người dùng theo dõi tiến trình nuôi nick, gán thêm kịch bản mới, bật/tắt trạng thái hoạt động, chỉnh sửa lịch lặp hoặc gỡ kịch bản.

### 1.2. Bảng đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Danh sách chạy kịch bản cho tài khoản [Email]**<br>(Tiêu đề popup) | Label | - Tiêu đề popup, hiển thị email của tài khoản ảo đang được xem danh sách gán.<br>- **Nội dung hiển thị:** `Danh sách chạy kịch bản cho tài khoản [Email]` (`Assigned scenario list for account [Email]`)<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **2** | **Close (Icon đóng X)** | Button | - Nút đóng popup danh sách kịch bản gán.<br>- **Vị trí:** Góc trên cùng bên phải popup.<br>- **Hành vi khi nhấn (OnClick Event):** Đóng popup, trở về màn hình Danh sách tài khoản ảo. |
| **3** | **Tổng số kịch bản gán: [N]**<br>(Thống kê số lượng) | Label / Badge | - Hiển thị tổng số lượng kịch bản hiện đang gán cho tài khoản này.<br>- **Nội dung hiển thị:** Tổng số kịch bản gán: `[Số lượng]` (Ví dụ: `Tổng số kịch bản gán: 2` - `Total assigned scenarios: 2`)<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **4** | **+ Thêm kịch bản chạy**<br>(Nút mở form gán) | Button | - Cho phép người dùng mở Popup Thêm kịch bản chạy mới cho tài khoản.<br>- **Vị trí:** Phía trên bên phải khu vực danh sách.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):**<br>&nbsp;&nbsp;+ Mở Popup 2 "Thêm kịch bản chạy mới" với các trường ở trạng thái rỗng và ô chọn kịch bản mặc định rỗng. |
| **5** | **Thẻ Kịch bản đã gán**<br>(Assigned Scenario Card) | Card / List Item | - Hiển thị thông tin tóm tắt từng kịch bản đang gán cho tài khoản.<br>- **Thông tin hiển thị trên thẻ:**<br>&nbsp;&nbsp;+ **Tên kịch bản & Tag loại:** Tên kịch bản kèm Tag `🔄 Kịch bản đơn` hoặc `📅 Lộ trình`.<br>&nbsp;&nbsp;+ **Thông tin tiến trình (Kịch bản lộ trình):** `📅 Ngày bắt đầu: [YYYY-MM-DD] \| ⏱️ Tiến trình: Ngày [X]/[Total]` (Ví dụ: `Ngày 5/30`).<br>&nbsp;&nbsp;+ **Thông tin lịch chạy (Kịch bản đơn):** `⏰ Lịch chạy: [N] khung giờ lặp định kỳ`.<br>&nbsp;&nbsp;+ **Nút công cụ trên thẻ:** Icon `✏️` (Sửa cấu hình), Icon `🗑️` (Gỡ gán kịch bản), Switch `Toggle` (Bật/Tắt hoạt động). |
| **6** | **✏️ (Sửa cấu hình gán)**<br>(Nút sửa gán kịch bản) | Button / Icon | - Cho phép người dùng mở Popup Chỉnh sửa cấu hình gán kịch bản.<br>- **Vị trí:** Trên từng Thẻ Kịch bản đã gán.<br>- **Hành vi khi nhấn (OnClick Event):**<br>&nbsp;&nbsp;+ Mở Popup 2 với tiêu đề "Chỉnh sửa kịch bản chạy". Các trường "Loại kịch bản", "Kịch bản cần chạy" và "Ngày bắt đầu chạy" (với lộ trình) ở trạng thái Khóa (Disabled). |
| **7** | **🗑️ (Gỡ kịch bản gán)**<br>(Nút gỡ kịch bản) | Button / Icon | - Cho phép người dùng gỡ gán kịch bản khỏi tài khoản ảo.<br>- **Vị trí:** Trên từng Thẻ Kịch bản đã gán.<br>- **Hành vi khi nhấn (OnClick Event):** Bắt buộc hiển thị Hộp thoại xác nhận gỡ kịch bản (Xem Mục 3.3). |
| **8** | **Công tắc Bật/Tắt hoạt động**<br>(Active Toggle Switch) | Switch | - Cho phép người dùng thay đổi nhanh trạng thái hoạt động của kịch bản gán.<br>- **Trạng thái mặc định:** Lấy theo trạng thái thực tế (`true` = On, `false` = Off).<br>- **Hành vi khi chuyển đổi (OnClick Event):**<br>1. **Gạt từ BẬT ➔ TẮT:** Chuyển trạng thái kịch bản sang tạm dừng (`active = false`), cập nhật biểu tượng trạng thái ở Datatable tài khoản.<br>2. **Gạt từ TẮT ➔ BẬT:**<br>&nbsp;&nbsp;+ Nếu là **Kịch bản đơn** hoặc **Kịch bản lộ trình chưa chạy (Ngày 1)**: Lập tức BẬT lại hoạt động (`active = true`).<br>&nbsp;&nbsp;+ Nếu là **Kịch bản lộ trình ĐÃ CHẠY DỞ (Ngày N > 1)**: Giữ nguyên chưa bật công tắc, mở Popup 3.1 "⚙️ Kích hoạt lại Kịch bản lộ trình" để hỏi người dùng lựa chọn *Tiếp tục ngày dở* hay *Chạy lại từ Ngày 1*. |
| **9** | **Đóng**<br>(Nút Đóng popup) | Button | - Cho phép người dùng đóng popup danh sách kịch bản gán.<br>- **Vị trí:** Góc dưới bên phải Popup.<br>- **Hành vi khi nhấn (OnClick Event):** Đóng Popup 1, trở về màn hình Danh sách tài khoản ảo. |

---

## 2. POPUP 2: THÊM / CHỈNH SỬA KỊCH BẢN CHẠY NÓI CHUNG (CONFIG ASSIGNMENT MODAL)

### 2.1. Thông tin chung về Popup
- **Tên Popup:** Thêm / Chỉnh sửa kịch bản chạy (Config Assignment Modal)
- **Loại giao diện:** Popup Modal
- **Mô tả nghiệp vụ:** Cho phép người dùng cấu hình chi tiết kịch bản chạy cho tài khoản ảo. Hỗ trợ cấu hình riêng cho Kịch bản đơn (thêm nhiều khung giờ lặp định kỳ hàng tuần T2-CN) và Kịch bản lộ trình (chọn ngày bắt đầu chạy và hành vi khi hết lộ trình). Toàn bộ các quy tắc kiểm tra dữ liệu lỗi được hiển thị trực tiếp dưới dạng dòng chữ màu đỏ inline ngay dưới từng ô nhập liệu.

### 2.2. Bảng đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Thêm kịch bản chạy mới**<br>(Tiêu đề popup) | Label | - Tiêu đề popup, hiển thị chế độ thêm mới hoặc chỉnh sửa cấu hình gán kịch bản.<br>- **Nội dung hiển thị:** `Thêm kịch bản chạy mới` (`Add new running scenario`) HOẶC `Chỉnh sửa kịch bản chạy` (`Edit running scenario`).<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **2** | **Close (Icon đóng X)** | Button | - Nút đóng popup cấu hình gán kịch bản.<br>- **Vị trí:** Góc trên cùng bên phải popup.<br>- **Hành vi khi nhấn (OnClick Event):** Đóng popup, không lưu thay đổi. |
| **3** | **Loại kịch bản ***<br>(Combobox chọn loại) | Combobox / Dropdown (Single-select) | - Cho phép người dùng chọn loại kịch bản muốn gán cho tài khoản.<br>- **Trạng thái:** Enabled khi thêm mới; Vô hiệu hóa (Disabled) khi chỉnh sửa.<br>- **Nguồn dữ liệu cố định:**<br>&nbsp;&nbsp;+ `-- Chọn loại kịch bản --` (Value: `""`)<br>&nbsp;&nbsp;+ 🔄 Kịch bản đơn (Value: `recurring`)<br>&nbsp;&nbsp;+ 📅 Kịch bản lộ trình (Value: `roadmap`)<br>- **Giá trị mặc định:** Trống (`""`) khi thêm mới.<br>- **Quy tắc Nghiệp vụ & Kích hoạt động (Dynamic Trigger Rules):**<br>1. Khi thay đổi giá trị: Tự động làm rỗng ô chọn "Kịch bản cần chạy *", gọi hàm lọc lại danh sách kịch bản khả dụng thuộc loại đã chọn.<br>2. Chọn **🔄 Kịch bản đơn**: Hiển thị Phần 5 (Thiết lập lịch chạy lặp lại); ẩn Phần 8 (Thiết lập lộ trình đa ngày).<br>3. Chọn **📅 Kịch bản lộ trình**: Hiển thị Phần 8 (Thiết lập lộ trình đa ngày); ẩn Phần 5 (Thiết lập lịch chạy lặp lại).<br>- **Thông báo lỗi tương ứng (Inline Error Message):**<br>+ Trống và nhấn button Lưu: Hiển thị dòng lỗi màu đỏ ngay dưới trường thông tin: `"Vui lòng chọn loại kịch bản!"` (`"Please select scenario type!"`) |
| **4** | **Kịch bản cần chạy ***<br>(Combobox chọn kịch bản) | Combobox / Dropdown (Single-select) | - Cho phép người dùng chọn kịch bản cụ thể muốn gán cho tài khoản.<br>- **Trạng thái:** Enabled khi thêm mới; Vô hiệu hóa (Disabled) khi chỉnh sửa.<br>- **Placeholder mặc định khi chưa chọn Loại kịch bản:** `-- Vui lòng chọn loại kịch bản trước --`<br>- **Nguồn dữ liệu động (Tự động lọc):**<br>Danh sách các kịch bản thuộc Loại đã chọn trong kho kịch bản CHƯA ĐƯỢC GÁN cho tài khoản ảo này (tự động ẩn hoàn toàn các kịch bản đã gán trước đó). nếu không có kịch bản nào thỏa mãn, hiển thị nhãn `⚠️ Không có kịch bản khả dụng (Đã gán hết)`.<br>- **Giá trị mặc định:** Trống (`""`) khi thêm mới.<br>- **Thông báo lỗi tương ứng (Inline Error Message):**<br>+ Trống và nhấn button Lưu: Hiển thị dòng lỗi màu đỏ ngay dưới trường thông tin: `"Vui lòng chọn kịch bản cần chạy!"` (`"Please select a scenario!"`) |
| **5** | **🎬 Thiết lập lịch chạy lặp lại**<br>(Tiêu đề phần Kịch bản đơn) | Label | - Tiêu đề nhóm thông tin cấu hình lịch chạy lặp lại cho Kịch bản đơn.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại kịch bản = Kịch bản đơn (`recurring`).<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **6** | **+ Thêm khung giờ**<br>(Nút thêm khung giờ lặp) | Button | - Cho phép người dùng bổ sung thêm một khung giờ lặp định kỳ mới.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại kịch bản = Kịch bản đơn.<br>- **Hành vi khi nhấn (OnClick Event):** Thêm một thẻ Khung giờ lặp mới vào danh sách bên dưới (mặc định mốc giờ `08:00` và chọn tất cả các ngày T2-CN). |
| **7** | **Danh sách Khung giờ lặp**<br>(Schedule Slots Container) | Card List / Dynamic Container | - Quản lý và hiển thị danh sách các khung giờ chạy lặp định kỳ cho Kịch bản đơn.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại kịch bản = Kịch bản đơn.<br>- **Thành phần trên mỗi Khung giờ (Khung giờ i):**<br>&nbsp;&nbsp;+ **Ô chọn giờ (Timepicker `HH:mm`):** Cho phép chọn/gõ mốc giờ thực thi.<br>&nbsp;&nbsp;+ **Nút chọn ngày trong tuần (Buttons T2, T3, T4, T5, T6, T7, CN):** Cho phép bật/tắt chọn ngày trong tuần.<br>&nbsp;&nbsp;+ **Icon xóa `🗑️`:** Cho phép xóa khung giờ lặp đó.<br>- **Thông báo lỗi tương ứng (Inline Error Message):**<br>+ Chưa thêm khung giờ nào và nhấn Lưu: Hiển thị dòng lỗi màu đỏ ngay dưới khối thông tin: `"Vui lòng thêm ít nhất 1 khung giờ chạy cho kịch bản!"` (`"Please add at least one execution schedule slot!"`)<br>+ Có khung giờ chưa chọn ngày nào trong tuần và nhấn Lưu: Hiển thị dòng lỗi màu đỏ ngay dưới khối thông tin: `"Vui lòng chọn ít nhất 1 ngày trong tuần cho khung giờ chạy!"` (`"Please select at least one day of the week!"`) |
| **8** | **📅 Thiết lập lộ trình đa ngày**<br>(Tiêu đề phần Kịch bản lộ trình) | Label | - Tiêu đề nhóm thông tin cấu hình lộ trình đa ngày cho Kịch bản lộ trình.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại kịch bản = Kịch bản lộ trình (`roadmap`).<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **9** | **Ngày bắt đầu chạy ***<br>(Ô chọn ngày bắt đầu) | Datepicker | - Người dùng bắt buộc chọn ngày bắt đầu thực thi lộ trình nuôi nick.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại kịch bản = Kịch bản lộ trình.<br>- **Định dạng hiển thị & nhập:** `YYYY-MM-DD` (Kiểu chọn ngày HTML5 Datepicker).<br>- **Giá trị mặc định:** Ngày hiện tại (`getTodayLocalDateStr()`).<br>- **Ràng buộc ngày (Min Date Constraint):**<br>Min Date = Ngày hiện tại (dựa trên múi giờ máy tính người dùng `getTodayLocalDateStr()`). Vô hiệu hóa chọn các ngày trong quá khứ.<br>- **Dòng hướng dẫn bên dưới:** `* Không được chọn ngày trong quá khứ`<br>- **Thông báo lỗi tương ứng (Inline Error Message):**<br>+ Trống và nhấn Lưu: Hiển thị dòng lỗi màu đỏ ngay dưới ô nhập ngày: `"Vui lòng chọn ngày bắt đầu chạy!"` (`"Please select a start date!"`)<br>+ Nhập ngày nhỏ hơn Ngày hiện tại: Hiển thị dòng lỗi màu đỏ ngay dưới ô nhập ngày: `"Ngày bắt đầu chạy không được nhỏ hơn ngày hiện tại!"` (`"Start date must not be earlier than today!"`) |
| **10** | **Hành vi khi chạy hết lộ trình ***<br>(Radio chọn hành vi hết lộ trình) | Radio Button | - Cho phép người dùng lựa chọn hành vi của bot sau khi thực thi hoàn tất ngày cuối cùng của lộ trình.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại kịch bản = Kịch bản lộ trình.<br>- **Danh sách tùy chọn:**<br>&nbsp;&nbsp;+ Tùy chọn 1: 🛑 Dừng lại sau khi chạy hết lộ trình (Value: `once`) - Mặc định.<br>&nbsp;&nbsp;+ Tùy chọn 2: 🔄 Lặp lại chu kỳ từ đầu (Value: `loop`).<br>- **Giá trị mặc định:** 🛑 Dừng lại sau khi chạy hết lộ trình (`once`).<br>- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định). |
| **11** | **Hủy**<br>(Nút Hủy) | Button | - Cho phép người dùng hủy bỏ thao tác cấu hình gán kịch bản và đóng popup.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):** Đóng Popup 2, quay lại Popup 1, không lưu thay đổi. |
| **12** | **Lưu cấu hình**<br>(Nút Lưu cấu hình) | Button | - Cho phép người dùng thực hiện lưu cấu hình gán kịch bản cho tài khoản ảo.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):**<br>1. Hệ thống xóa các dòng thông báo lỗi màu đỏ inline đang hiển thị.<br>2. Kiểm tra toàn bộ dữ liệu nhập trên form theo quy tắc validation của từng loại kịch bản.<br>3. Nếu có trường không hợp lệ: Hiển thị dòng thông báo lỗi màu đỏ inline tương ứng ngay dưới từng ô nhập liệu bị lỗi và không đóng Popup.<br>4. Nếu dữ liệu hợp lệ và là **Gán Kịch bản lộ trình lần đầu**: Bắt buộc hiển thị Popup 3.2 "Cảnh báo xác nhận gán kịch bản lộ trình lần đầu".<br>5. Khi dữ liệu được xác nhận thành công: Chuyển nút sang trạng thái Loading (spinner, disable nút), gọi API lưu gán kịch bản, đóng Popup 2, cập nhật danh sách ở Popup 1 & Datatable tài khoản, và hiển thị Toast Message: `"Cấu hình gán kịch bản thành công!"` (`"Scenario assigned successfully!"`). |

---

## 3. ĐẶC TẢ HỘP THOẠI POPUP ĐI KÈM (CONFIRMATION MODALS)

### 3.1. Popup Kích hoạt lại Kịch bản lộ trình dở dang (Resume Roadmap Modal)

- **Tên Modal:** Kích hoạt lại Kịch bản lộ trình (Resume Roadmap Modal)
- **Tiêu đề (Header):** `"⚙️ Kích hoạt lại Kịch bản lộ trình"` (`"⚙️ Resume Roadmap Scenario"`)
- **Nội dung thông báo (Body text):** `"Kịch bản này trước đó đã chạy đến Ngày [X]. Bạn muốn hệ thống xử lý tiếp tục như thế nào?"` (`"This scenario previously ran up to Day [X]. How would you like to proceed?"`)
- **Danh sách tùy chọn (Radio Buttons):**
  - **Tùy chọn 1 (Checked mặc định):** `▶️ Tiếp tục chạy tiếp Ngày đang dở` (Value: `resume`) — *Mô tả bên dưới:* `"Hệ thống sẽ thực thi tiếp tục từ ngày dừng trước đó."`
  - **Tùy chọn 2:** `🔄 Chạy lại từ Ngày 1` (Value: `restart`) — *Mô tả bên dưới:* `"Đặt lại lộ trình nuôi nick về bắt đầu từ Ngày 1."`
- **Nút Xác nhận kích hoạt (Confirm Button):**
  - Nhãn nút: `"Xác nhận kích hoạt"` (`"Confirm Activation"`)
  - Hành vi khi nhấn: BẬT công tắc hoạt động (`active = true`). Nếu chọn `restart`, reset tiến trình về `Ngày 1` và cập nhật Ngày bắt đầu là Ngày hôm nay. Đóng Modal và hiển thị Toast Message: `"Kích hoạt lại kịch bản thành công!"` (`"Scenario reactivated successfully!"`).
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`) hoặc click icon `x`.
  - Hành vi khi nhấn: Đóng Modal, giữ nguyên công tắc hoạt động ở trạng thái TẮT (`active = false`).

---

### 3.2. Modal Cảnh báo xác nhận Gán Kịch bản lộ trình lần đầu

- **Tên Modal:** Cảnh báo xác nhận gán Kịch bản lộ trình lần đầu
- **Tiêu đề (Header):** `"📢 XÁC NHẬN GÁN KỊCH BẢN LỘ TRÌNH"` (`"📢 CONFIRM ROADMAP ASSIGNMENT"`)
- **Nội dung thông báo (Body text):** `"Sau khi gán kịch bản lộ trình này cho tài khoản ảo, hệ thống sẽ KHÓA tính năng điều chỉnh thêm/xóa bớt ngày cho kịch bản ở màn Quản lý kịch bản. Bạn có chắc chắn muốn tiếp tục gán không?"` (`"After assigning this roadmap scenario to a virtual account, adding/deleting days for this scenario in Scenario Management will be LOCKED. Are you sure you want to proceed?"`)
- **Nút Đồng ý (Confirm Button):**
  - Nhãn nút: `"Đồng ý gán"` (`"Confirm Assignment"`)
  - Hành vi khi nhấn: Đóng Modal này, tiến hành thực hiện lưu cấu hình gán kịch bản lộ trình cho tài khoản.
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`) hoặc click icon `x`.
  - Hành vi khi nhấn: Đóng Modal cảnh báo, giữ nguyên giao diện Popup 2 để người dùng xem lại cấu hình.

---

### 3.3. Modal Hộp thoại xác nhận Gỡ kịch bản khỏi tài khoản ảo

- **Tên Modal:** Xác nhận gỡ kịch bản gán
- **Tiêu đề (Header):** `"Xác nhận gỡ kịch bản"` (`"Confirm unassign scenario"`)
- **Nội dung thông báo (Body text):** `"Bạn có chắc chắn muốn gỡ kịch bản [Tên kịch bản] khỏi tài khoản ảo này không?"` (`"Are you sure you want to unassign scenario [Scenario Name] from this virtual account?"`)
- **Nút Xác nhận (Confirm Button):**
  - Nhãn nút: `"Gỡ kịch bản"` (`"Unassign"`)
  - Hành vi khi nhấn: Hệ thống gỡ liên kết kịch bản khỏi tài khoản, cập nhật danh sách ở Popup 1 và giảm đếm số kịch bản gán ở Datatable tài khoản.
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`) hoặc click icon `x`.
  - Hành vi khi nhấn: Đóng Modal xác nhận, giữ nguyên kịch bản gán.
