# TÀI LIỆU ĐẶC TẢ CHI TIẾT THÀNH PHẦN GIAO DIỆN (SRS UI COMPONENTS)
## HỆ THỐNG QUẢN LÝ RULE - WHITELIST - MACROS CHO EDR (PT SIEM INTEGRATION)

Tài liệu này đặc tả chi tiết giao diện và các luồng xử lý tương tác của các màn hình quản lý quy tắc (Correlation Rules), danh sách whitelist (Whitelists) và bộ lọc vĩ mô (Macros) tích hợp từ hệ thống PT SIEM-EDR.

---

## 1. DANH SÁCH CORRELATION RULES (MÀN HÌNH CHÍNH)

### 1.1. Thông tin chung (Quy chuẩn 7 phần)

#### 1. Tên chức năng
Xem danh sách quy tắc tương quan (Correlation Rules List)

#### 2. Mô tả
Giao diện hiển thị toàn bộ danh sách các Correlation Rules hiện có trên hệ thống EDR dưới dạng bảng dữ liệu. Người dùng có thể tìm kiếm quy tắc theo ID, tên hoặc mô tả, thực hiện làm mới (Refresh) danh sách, hoặc bật/tắt (Switch) nhanh trạng thái hoạt động của từng quy tắc. Giao diện cũng cung cấp các tùy chọn tab để chuyển hướng nhanh đến các màn hình Whitelists hoặc Macros, nút xuất dữ liệu định dạng sẵn (Export formatted) và nút thêm quy tắc mới.

#### 3. Tác nhân
Người dùng (Nhân viên vận hành ATTT - Operator, Quản trị viên - Admin)

#### 4. Điều kiện trước
- Người dùng đã đăng nhập thành công vào hệ thống EDR.
- Tài khoản người dùng được cấp quyền truy cập tính năng Quản lý quy tắc.

#### 5. Điều kiện sau
- Danh sách Correlation Rules được tải và hiển thị chính xác trên bảng giao diện cùng tổng số lượng bản ghi tương ứng.
- Các hành động tìm kiếm, phân trang, lọc dữ liệu được cập nhật tức thời trên giao diện.

#### 6. Ngoại lệ
- Không thể kết nối với dịch vụ máy chủ EDR (mất kết nối mạng hoặc dịch vụ backend lỗi): Bảng dữ liệu hiển thị trạng thái trống và hệ thống thông báo lỗi `"Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại đường truyền!"` (`"Cannot connect to server. Please check your connection!"`).
- Phiên đăng nhập hết hạn trong quá trình thao tác: Hệ thống hiển thị popup thông báo và tự động điều hướng người dùng về trang đăng nhập.

#### 7. Các yêu cầu đặc biệt
- Dữ liệu danh sách phải được phân trang để tối ưu hóa thời gian tải trang.
- Thời gian tải dữ liệu và hiển thị lên bảng không quá 2 giây đối với các trang thông thường.

### 1.2. Đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Correlation Rules**<br>(Tiêu đề trang) | Label | - Tiêu đề màn hình chính, hiển thị tên mô tả tính năng quản lý Correlation Rules.<br>- **Nội dung hiển thị mặc định:** Correlation Rules (4567) (Số lượng rule hiển thị động tương ứng với tổng số bản ghi).<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **2** | **From here you can manage...**<br>(Mô tả phụ) | Label | - Nhãn văn bản mô tả ngắn gọn vai trò của màn hình.<br>- **Nội dung hiển thị mặc định:** "From here you can manage your rules."<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **3** | **CORRELATION RULES**<br>(Tab chuyển màn hình) | Button | - Cho phép người dùng chuyển hướng sang màn hình quản lý quy tắc tương quan.<br>- **Trạng thái mặc định:** Active (được highlight nổi bật).<br>- **Hành vi khi nhấn:** Tải lại dữ liệu của màn hình Danh sách Correlation Rules. |
| **4** | **WHITELISTS**<br>(Tab chuyển màn hình) | Button | - Cho phép người dùng chuyển hướng sang màn hình quản lý whitelist.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:** Điều hướng người dùng sang giao diện Danh sách Whitelist. |
| **5** | **MACROS**<br>(Tab chuyển màn hình) | Button | - Cho phép người dùng chuyển hướng sang màn hình quản lý macro.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:** Điều hướng người dùng sang giao diện Danh sách Macros. |
| **6** | **Search**<br>(Thanh tìm kiếm) | Searchbox | - Cho phép người dùng nhập từ khóa để tìm kiếm các correlation rules trong danh sách.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Tìm kiếm...<br>&nbsp;&nbsp;+ EN: Search...<br>- **Giá trị mặc định:** Trống.<br>- **Giới hạn ký tự:** Tối đa 128 ký tự.<br>- **Quy tắc Nghiệp vụ:**<br>1. Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi gọi API tìm kiếm.<br>2. Hệ thống tự động kích hoạt tìm kiếm sau 300 ms kể từ khi người dùng ngừng gõ (Debounce) và tải lại bảng dữ liệu bên dưới.<br>3. Tìm kiếm theo cơ chế chứa một phần (Partial Match) không phân biệt chữ hoa chữ thường trên các trường: ID, Name, Description. |
| **7** | **Add new rule**<br>(Nút Thêm mới) | Button | - Cho phép người dùng mở giao diện để thêm mới một quy tắc tương quan mới.<br>- **Trạng thái mặc định:** Enabled.<br>- **Quyền hạn truy cập:** Chỉ người dùng có vai trò Quản trị viên (Admin) hoặc Nhân viên vận hành ATTT (Operator).<br>- **Hành vi khi nhấn:** Điều hướng người dùng sang màn hình Thêm mới Correlation Rule (Popup/Page). |
| **8** | **Refresh**<br>(Nút Làm mới) | Button | - Cho phép người dùng tải lại dữ liệu danh sách quy tắc hiện tại trên bảng từ máy chủ.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:**<br>1. Hệ thống gửi request lấy lại danh sách rules.<br>2. Chuyển nút sang trạng thái loading (spinner xoay tròn) và vô hiệu hóa nút tạm thời.<br>3. Sau khi nhận phản hồi từ API, cập nhật lại bảng dữ liệu, hiển thị toast message: `"Làm mới danh sách thành công!"` (`"List refreshed successfully!"`) và trả nút về trạng thái bình thường. |
| **9** | **Export formatted**<br>(Nút Xuất dữ liệu) | Button | - Cho phép người dùng kết xuất danh sách quy tắc tương quan ra định dạng tệp tin Excel/CSV.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:**<br>1. Hệ thống thực hiện chuẩn bị file tải về. Hiển thị loading spinner trên nút và disable tạm thời.<br>2. Tự động tải xuống tệp dữ liệu đã định dạng.<br>3. Hiển thị toast message tự động đóng: `"Xuất dữ liệu thành công!"` (`"Data exported successfully!"`) khi hoàn tất hoặc `"Xuất dữ liệu không thành công!"` (`"Failed to export data!"`) nếu gặp lỗi hệ thống. |
| **10** | **Datatable**<br>(Bảng danh sách rules) | Datatable | - Hiển thị danh sách các quy tắc tương quan trên hệ thống.<br>- **Các chức năng chung bổ trợ:**<br>&nbsp;&nbsp;+ Phân trang: Có (mặc định hiển thị 20 bản ghi/trang).<br>&nbsp;&nbsp;+ Sắp xếp: Cho phép click vào header cột **ID** và **FILE** để sắp xếp tăng/giảm dần.<br>- **Đặc tả chi tiết các cột dữ liệu (Columns):**<br>&nbsp;&nbsp;+ **ID:** Hiển thị mã định danh duy nhất của rule dạng liên kết (ví dụ: `PT-CR-2314`).<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Hành vi khi nhấn:* Hệ thống mở giao diện side drawer **Chi tiết Correlation Rule** cho bản ghi tương ứng.<br>&nbsp;&nbsp;+ **NAME:** Hiển thị tên nghiệp vụ của rule (ví dụ: `Credential_Access_To_Passwords_Storage`).<br>&nbsp;&nbsp;+ **DESCRIPTION:** Hiển thị mô tả ngắn gọn về hành vi mã độc mà rule phát hiện.<br>&nbsp;&nbsp;+ **FILE:** Hiển thị tên tệp tin XML/CO chứa cấu hình rule dạng liên kết (ví dụ: `0010-rules_config.xml`).<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Hành vi khi nhấn:* Hệ thống mở trực tiếp drawer chi tiết rule và tự động cuộn đến/mở rộng phân đoạn hiển thị nội dung tệp tin cấu hình tương ứng.<br>&nbsp;&nbsp;+ **STATUS:** Cho phép người dùng bật/tắt (Switch) hoạt động của rule.<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Giá trị mặc định:* Lấy theo trạng thái thực tế của rule (Active/Inactive).<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Hành vi khi nhấn Switch:*<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Hệ thống không thay đổi trạng thái Switch ngay lập tức mà hiển thị **Hộp thoại xác nhận thay đổi trạng thái quy tắc**.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Nếu người dùng chọn **Đồng ý** (Confirm):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Vô hiệu hóa Switch tương ứng, hiển thị spinner nhỏ tại Switch.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Gọi API cập nhật trạng thái hoạt động của rule.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Nếu thành công: Cập nhật trạng thái Switch và hiển thị toast message: `"Cập nhật trạng thái rule thành công!"` (`"Rule status updated successfully!"`).<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. Nếu thất bại: Giữ nguyên trạng thái Switch cũ và hiển thị toast message: `"Cập nhật trạng thái rule thất bại!"` (`"Failed to update rule status!"`).<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Nếu người dùng chọn **Hủy** (Cancel) hoặc đóng popup: Đóng hộp thoại xác nhận và giữ nguyên trạng thái Switch.<br>&nbsp;&nbsp;+ **CREATED BY:** Hiển thị tên người dùng đã tạo rule.<br>&nbsp;&nbsp;+ **CREATED AT:** Hiển thị thời gian tạo rule theo định dạng `MMM DD, YYYY @ HH:mm:ss`. |
| **11** | **Rows per page**<br>(Số dòng trên trang) | Combobox / Dropdown (Single-select) | - Cho phép người dùng tùy chọn giới hạn số dòng dữ liệu hiển thị trên bảng dữ liệu.<br>- **Nguồn dữ liệu:** 10, 20, 50, 100 dòng.<br>- **Giá trị mặc định:** 20 dòng.<br>- **Hành vi khi thay đổi:** Hệ thống cập nhật số bản ghi hiển thị trên bảng và thiết lập lại phân trang về trang 1.<br>- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định). |
| **12** | **Page controls**<br>(Thanh điều hướng trang) | Button | - Cho phép người dùng chuyển đổi qua lại giữa các trang dữ liệu.<br>- **Các nút tương tác:** Đầu trang (`<<`), Trang trước (`<`), Danh sách số trang (`1`, `2`, `3`...), Trang sau (`>`), Cuối trang (`>>`).<br>- **Hành vi khi nhấn:** Tải dữ liệu tương ứng của trang được chọn và cập nhật giao diện bảng. |

---

## 2. CHI TIẾT CORRELATION RULE

### 2.1. Thông tin chung (Quy chuẩn 7 phần)

#### 1. Tên chức năng
Xem chi tiết quy tắc tương quan (Correlation Rule Details)

#### 2. Mô tả
Khi người dùng nhấn vào mã ID của một quy tắc tương quan trên màn hình danh sách, hệ thống sẽ mở ra một side drawer hiển thị chi tiết các thông tin của quy tắc đó. Các thông tin hiển thị bao gồm: mã ID, tên, người tạo, ngày tạo, mô tả chi tiết, trạng thái hoạt động của quy tắc (cho phép bật/tắt thông qua Switch Toggle kèm popup xác nhận). Ngoài ra, phần dưới của drawer có một khối accordion có thể đóng/mở hiển thị toàn bộ nội dung mã nguồn cấu hình của tệp tin quy tắc tương quan (được tô màu cú pháp syntax highlighting để dễ quan sát).

#### 3. Tác nhân
Người dùng (Operator, Admin)

#### 4. Điều kiện trước
- Người dùng đang ở màn hình Danh sách Correlation Rules hoặc tab Correlation Rules của chi tiết Whitelist.
- Người dùng đã click chọn mã ID hoặc tệp tin của quy tắc tương quan cần xem.

#### 5. Điều kiện sau
- Ngăn kéo Side Drawer chứa toàn bộ thông tin chi tiết của quy tắc tương quan được mở rộng từ cạnh phải màn hình.
- Trạng thái bật/tắt của quy tắc được đồng bộ hóa với màn hình danh sách chính nếu người dùng thực hiện cập nhật.

#### 6. Ngoại lệ
- Không thể tải tệp tin cấu hình quy tắc tương quan từ máy chủ (lỗi mất file hoặc lỗi phân quyền): Khung hiển thị code hiển thị thông báo lỗi `"Không thể tải nội dung tệp cấu hình rule!"` (`"Failed to load rule configuration file!"`) thay vì nội dung mã nguồn.

#### 7. Các yêu cầu đặc biệt
- Giao diện drawer phải mở ra mượt mà bằng hiệu ứng chuyển động (transition).
- Nội dung mã nguồn của file phải được định dạng và phân biệt màu sắc cú pháp trực quan (Syntax Highlighting).

### 2.2. Đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Rule Details**<br>(Tiêu đề Drawer) | Label | - Tiêu đề ngăn kéo, hiển thị tên mô tả giao diện chi tiết rule.<br>- **Nội dung hiển thị mặc định:** Rule Details<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **2** | **Close**<br>(Icon đóng X) | Button | - Cho phép người dùng đóng ngăn kéo chi tiết rule và trở về giao diện danh sách chính.<br>- **Vị trí:** Góc trên cùng bên phải ngăn kéo.<br>- **Hành vi khi nhấn:** Đóng Drawer ngay lập tức, giữ nguyên các trạng thái dữ liệu ở màn hình danh sách chính. |
| **3** | **Rule Name**<br>(Tên Rule) | Label | - Nhãn hiển thị tên quy tắc tương quan chính đang xem.<br>- **Nội dung hiển thị:** Lấy từ giá trị trường `NAME` (ví dụ: "Credential_Access_To_Passwords_Storage").<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **4** | **RULE ID**<br>(Mã Rule) | Label | - Nhãn hiển thị mã định danh duy nhất của rule.<br>- **Nội dung hiển thị:** Lấy từ trường `ID` (ví dụ: "PT-CR-2314").<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **5** | **FILE NAME**<br>(Tên tệp cấu hình) | Label | - Nhãn hiển thị tên tệp tin XML/CO chứa cấu trúc rule cấu hình từ PT SIEM.<br>- **Nội dung hiển thị:** Lấy từ trường `FILE` (ví dụ: "0010-rules_config.xml").<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **6** | **CREATED BY**<br>(Người tạo) | Label | - Nhãn hiển thị tài khoản đã tạo rule.<br>- **Nội dung hiển thị:** Lấy từ trường `CREATED BY` (ví dụ: "admin").<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **7** | **CREATED AT**<br>(Thời gian tạo) | Label | - Nhãn hiển thị ngày giờ tạo rule trên hệ thống.<br>- **Nội dung hiển thị:** Lấy từ trường `CREATED AT` (ví dụ: "Apr 08, 2026 @ 20:06:40").<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **8** | **DESCRIPTION**<br>(Mô tả chi tiết) | Label | - Nhãn hiển thị nội dung giải thích cơ chế/mục tiêu giám sát của quy tắc tương quan.<br>- **Nội dung hiển thị:** Lấy từ trường `DESCRIPTION`.<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **9** | **STATUS**<br>(Trạng thái hoạt động) | Switch / Toggle | - Cho phép người dùng kích hoạt hoặc vô hiệu hóa rule trực tiếp trong Drawer chi tiết.<br>- **Giá trị mặc định:** Lấy theo trạng thái thực tế hoạt động của rule (Active/Inactive).<br>- **Hành vi khi tương tác Switch:**<br>1. Hệ thống không thay đổi trạng thái Switch ngay lập tức mà hiển thị **Hộp thoại xác nhận thay đổi trạng thái quy tắc**.<br>2. Nếu người dùng chọn **Đồng ý** (Confirm):<br>&nbsp;&nbsp;a. Vô hiệu hóa Switch tạm thời và hiển thị spinner.<br>&nbsp;&nbsp;b. Gửi API cập nhật trạng thái lên máy chủ.<br>&nbsp;&nbsp;c. Nếu thành công: Cập nhật trạng thái Switch và đồng bộ trạng thái này ra bảng danh sách bên ngoài. Hiển thị toast message: `"Cập nhật trạng thái rule thành công!"` (`"Rule status updated successfully!"`).<br>&nbsp;&nbsp;d. Nếu thất bại: Giữ nguyên trạng thái Switch cũ và hiển thị toast message: `"Cập nhật trạng thái rule thất bại!"` (`"Failed to update rule status!"`).<br>3. Nếu người dùng chọn **Hủy** (Cancel) hoặc đóng popup: Đóng hộp thoại xác nhận và giữ nguyên trạng thái Switch. |
| **10** | **FILE**<br>(Khối Accordion File) | Button | - Cho phép người dùng ẩn/hiện phân đoạn nội dung tệp tin code cấu hình bên dưới.<br>- **Trạng thái mặc định:** Mở rộng (Expanded - hiển thị nội dung code).<br>- **Hành vi khi nhấn:** Bật tắt trạng thái đóng/mở của Accordion. Khi đóng, ẩn toàn bộ khối hiển thị code cấu hình bên dưới. |
| **11** | **Code Viewer**<br>(Trình xem code) | Textarea / Code Block | - Hiển thị toàn bộ mã nguồn cấu hình rule dạng JSON/CO/XML (đọc nội dung tệp cấu hình, ví dụ như [LOC-CR-2_rule.co](file:///e:/Work/EDR/LOC-CR-2_rule.co) hoặc [LOC-CR-3_rule.co](file:///e:/Work/EDR/LOC-CR-3_rule.co)).<br>- **Trạng thái:** Chỉ xem (Read-only), hỗ trợ cuộn dọc và cuộn ngang trong khung hiển thị.<br>- **Tính năng đi kèm:** Tự động tô màu cú pháp (Syntax highlighting) theo cấu trúc mã nguồn. |

---

## 3. DANH SÁCH WHITELIST (MÀN HÌNH CHÍNH)

### 3.1. Thông tin chung (Quy chuẩn 7 phần)

#### 1. Tên chức năng
Xem danh sách trắng (Whitelists List)

#### 2. Mô tả
Giao diện hiển thị danh sách các thực thể whitelist hiện có trong cơ sở dữ liệu của hệ thống EDR (đọc từ tệp tin [whitelist_database.json](file:///e:/Work/EDR/whitelist_database.json)). Các thực thể này được trình bày dưới dạng bảng gồm các thông tin: tên thực thể (dưới dạng liên kết), mô tả chức năng, số lượng bản ghi (rows) bên trong, và số lượng quy tắc tương quan có liên kết. Người dùng có thể tìm kiếm whitelist và sử dụng các nút Refresh hoặc Export.

#### 3. Tác nhân
Người dùng (Operator, Admin)

#### 4. Điều kiện trước
- Người dùng đã đăng nhập thành công vào hệ thống EDR.
- Tài khoản có quyền truy cập tính năng quản lý Whitelist.

#### 5. Điều kiện sau
- Danh sách các thực thể whitelist được tải từ file JSON và hiển thị đầy đủ trên bảng dữ liệu.
- Người dùng có thể tương tác chuyển hướng sang chi tiết từng Whitelist.

#### 6. Ngoại lệ
- Tệp tin whitelist_database.json bị lỗi cấu trúc (invalid JSON) hoặc không tìm thấy trên hệ thống: Bảng dữ liệu hiển thị trống và hệ thống hiển thị thông báo lỗi `"Dữ liệu Whitelist bị lỗi hoặc không tồn tại!"` (`"Whitelist database is invalid or not found!"`).

#### 7. Các yêu cầu đặc biệt
- Số lượng bản ghi liên kết (`NUMBER OF ROWS`) và số lượng rule liên kết (`LINKED CORRELATION RULES`) của mỗi whitelist phải được hệ thống tự động tính toán và cập nhật chính xác từ dữ liệu JSON.

### 3.2. Đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Whitelists**<br>(Tiêu đề trang) | Label | - Tiêu đề màn hình chính, hiển thị tên mô tả tính năng quản lý Whitelist.<br>- **Nội dung hiển thị mặc định:** Whitelists (32) (Hiển thị số lượng thực thể whitelist có trong file dữ liệu JSON).<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **2** | **From here you can manage...**<br>(Mô tả phụ) | Label | - Nhãn văn bản mô tả ngắn gọn vai trò của màn hình.<br>- **Nội dung hiển thị mặc định:** "From here you can manage your rules."<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **3** | **CORRELATION RULES**<br>(Tab chuyển màn hình) | Button | - Cho phép người dùng chuyển hướng sang màn hình quản lý quy tắc tương quan.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:** Điều hướng người dùng sang giao diện Danh sách Correlation Rules. |
| **4** | **WHITELISTS**<br>(Tab chuyển màn hình) | Button | - Cho phép người dùng chuyển hướng sang màn hình quản lý whitelist.<br>- **Trạng thái mặc định:** Active (được highlight nổi bật).<br>- **Hành vi khi nhấn:** Tải lại dữ liệu của màn hình Danh sách Whitelist. |
| **5** | **MACROS**<br>(Tab chuyển màn hình) | Button | - Cho phép người dùng chuyển hướng sang màn hình quản lý macro.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:** Điều hướng người dùng sang giao diện Danh sách Macros. |
| **6** | **Search**<br>(Thanh tìm kiếm) | Searchbox | - Cho phép người dùng nhập từ khóa tìm kiếm các whitelist trong danh sách.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Tìm kiếm...<br>&nbsp;&nbsp;+ EN: Search...<br>- **Giá trị mặc định:** Trống.<br>- **Giới hạn ký tự:** Tối đa 128 ký tự.<br>- **Quy tắc Nghiệp vụ:**<br>1. Tự động trim khoảng trắng đầu và cuối chuỗi trước khi tìm kiếm.<br>2. Hệ thống tìm kiếm tự động sau 300 ms kể từ khi dừng gõ (Debounce) trên các trường: Name (Tên thực thể), Description (Mô tả). |
| **7** | **Refresh**<br>(Nút Làm mới) | Button | - Cho phép người dùng tải lại danh sách các thực thể whitelist từ máy chủ (đọc lại file JSON).<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:** Tải lại dữ liệu, cập nhật bảng và hiển thị toast message: `"Làm mới danh sách whitelist thành công!"` (`"Whitelist list refreshed successfully!"`). |
| **8** | **Export formatted**<br>(Nút Xuất dữ liệu) | Button | - Cho phép người dùng xuất cấu trúc thông tin danh sách các whitelist ra Excel/CSV.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:** Tải xuống tệp dữ liệu đã định dạng và hiển thị toast message: `"Xuất dữ liệu thành công!"` (`"Data exported successfully!"`). |
| **9** | **Datatable**<br>(Bảng danh sách Whitelists) | Datatable | - Hiển thị danh sách các thực thể whitelist phân tích từ tệp JSON.<br>- **Các chức năng chung bổ trợ:**<br>&nbsp;&nbsp;+ Phân trang: Có (mặc định hiển thị 20 bản ghi/trang).<br>&nbsp;&nbsp;+ Sắp xếp: Cho phép click vào header cột **NAME** để sắp xếp theo thứ tự bảng chữ cái.<br>- **Đặc tả chi tiết các cột dữ liệu (Columns):**<br>&nbsp;&nbsp;+ **NAME:** Hiển thị tên thực thể whitelist dạng liên kết (ví dụ: `Common_whitelist_value`, `IP_whitelist`).<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Hành vi khi nhấn:* Hệ thống mở giao diện side drawer **Chi tiết Whitelist** cho thực thể tương ứng, mặc định hiển thị ở tab dữ liệu `ROWS`.<br>&nbsp;&nbsp;+ **DESCRIPTION:** Hiển thị mô tả chức năng của thực thể whitelist đó.<br>&nbsp;&nbsp;+ **NUMBER OF ROWS:** Hiển thị số lượng bản ghi cấu hình chi tiết nằm bên trong whitelist đó (ví dụ: `4`, `284`).<br>&nbsp;&nbsp;+ **LINKED CORRELATION RULES:** Hiển thị số lượng quy tắc tương quan độc nhất có liên quan trực tiếp đến whitelist này (được gom nhóm và lọc trùng từ trường `rule` trong các bản ghi chi tiết). |
| **10** | **Rows per page**<br>(Số dòng trên trang) | Dropdown (Single-select) | - Cho phép người dùng cấu hình số bản ghi hiển thị trên trang bảng danh sách whitelist.<br>- **Nguồn dữ liệu:** 10, 20, 50, 100 dòng. Mặc định: 20 dòng.<br>- **Hành vi khi chọn:** Thiết lập lại phân trang và tải lại số lượng dòng tương ứng. |
| **11** | **Page controls**<br>(Thanh điều hướng trang) | Button | - Cho phép người dùng di chuyển qua các trang dữ liệu whitelist.<br>- **Hành vi khi nhấn:** Tải dữ liệu tương ứng của trang được chọn và cập nhật giao diện bảng. |

---

## 4. CHI TIẾT WHITELIST

### 4.1. Thông tin chung (Quy chuẩn 7 phần)

#### 1. Tên chức năng
Xem chi tiết danh sách trắng (Whitelist Details)

#### 2. Mô tả
Khi nhấn vào tên của một whitelist từ danh sách, side drawer chi tiết whitelist sẽ mở ra. Drawer này hiển thị tên whitelist, mô tả, và có giao diện chia làm hai tab: tab `ROWS` hiển thị toàn bộ danh sách các bản ghi cấu hình chi tiết (các giá trị loại trừ cụ thể như IP, tiến trình, tài khoản) và tab `CORRELATION RULES` hiển thị danh sách các quy tắc tương quan đang áp dụng whitelist này. Cả hai tab đều hỗ trợ tìm kiếm riêng biệt và xuất dữ liệu ra file Excel/CSV.

#### 3. Tác nhân
Người dùng (Operator, Admin)

#### 4. Điều kiện trước
- Người dùng đang ở màn hình Danh sách Whitelist.
- Người dùng click chọn tên của một whitelist.

#### 5. Điều kiện sau
- Side drawer mở ra từ bên phải hiển thị đầy đủ thông tin chi tiết và danh sách bản ghi của whitelist đã chọn.
- Người dùng có thể nhấn vào các liên kết trong tab để chuyển tiếp đến màn hình chi tiết rule tương ứng.

#### 6. Ngoại lệ
- Không thể tải danh sách bản ghi của thực thể whitelist từ cơ sở dữ liệu: Tab ROWS hiển thị trạng thái trống và hiển thị thông báo `"Không thể tải danh sách bản ghi!"` (`"Failed to load records!"`).

#### 7. Các yêu cầu đặc biệt
- Chuyển đổi qua lại giữa hai tab `ROWS` và `CORRELATION RULES` phải diễn ra tức thời (dưới 100ms) không cần tải lại toàn bộ Drawer.
- Bộ lọc tìm kiếm trên từng tab phải hoạt động độc lập và không ảnh hưởng đến dữ liệu của tab còn lại.

### 4.2. Đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Whitelist Name**<br>(Tiêu đề Drawer) | Label | - Tiêu đề hiển thị tên thực thể whitelist đang được xem chi tiết.<br>- **Nội dung hiển thị:** Lấy động từ khóa thực thể (ví dụ: `Common_whitelist_value`).<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **2** | **Close**<br>(Icon đóng X) | Button | - Cho phép người dùng đóng ngăn kéo chi tiết whitelist và trở lại màn hình danh sách Whitelist chính.<br>- **Vị trí:** Góc trên cùng bên phải ngăn kéo.<br>- **Hành vi khi nhấn:** Đóng Drawer ngay lập tức. |
| **3** | **DESCRIPTION**<br>(Mô tả) | Label | - Nhãn hiển thị nội dung giải nghĩa chức năng của whitelist đang xem.<br>- **Nội dung hiển thị:** Lấy từ thuộc tính `description` của thực thể trong file JSON.<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **4** | **ROWS**<br>(Tab danh sách bản ghi) | Button | - Cho phép người dùng chuyển đổi xem danh sách các bản ghi dữ liệu chi tiết của whitelist.<br>- **Trạng thái mặc định:** Active khi mới mở Drawer.<br>- **Hành vi khi nhấn:** Hiển thị phân vùng dữ liệu các bản ghi chi tiết (bao gồm Search, Export, Bảng bản ghi). |
| **5** | **CORRELATION RULES**<br>(Tab danh sách rule) | Button | - Cho phép người dùng chuyển đổi xem danh sách các rule tương quan liên kết với whitelist này.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:** Hiển thị phân vùng dữ liệu các quy tắc liên kết (bao gồm Search, Export, Bảng quy tắc). |
| **6** | **Search (Tab ROWS)**<br>(Tìm kiếm bản ghi) | Searchbox | - Cho phép người dùng tìm kiếm nhanh các bản ghi chi tiết của whitelist.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Tìm kiếm bản ghi...<br>&nbsp;&nbsp;+ EN: Search rows...<br>- **Quy tắc Nghiệp vụ:** Tìm kiếm không phân biệt chữ hoa thường trên trường: `rule`, `host`, `user_id`, `specific_value`. |
| **7** | **Search (Tab RULES)**<br>(Tìm kiếm Rule liên kết) | Searchbox | - Cho phép người dùng tìm kiếm nhanh các quy tắc tương quan có liên kết.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Tìm kiếm rule liên kết...<br>&nbsp;&nbsp;+ EN: Search linked rules...<br>- **Quy tắc Nghiệp vụ:** Tìm kiếm không phân biệt chữ hoa thường trên các trường của rule như: ID, Name, File. |
| **8** | **Export (Tab ROWS & RULES)**<br>(Nút Xuất dữ liệu) | Button | - Cho phép người dùng xuất dữ liệu hiện tại của Tab đang active ra file Excel/CSV.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:** Tải xuống file và hiển thị toast message: `"Xuất dữ liệu thành công!"` (`"Data exported successfully!"`). |
| **9** | **Datatable (Tab ROWS)**<br>(Bảng dữ liệu bản ghi) | Datatable | - Hiển thị danh sách các bản ghi whitelist chi tiết nằm trong thực thể.<br>- **Các chức năng chung bổ trợ:** Phân trang (20 dòng/trang), Sắp xếp tăng/giảm ở cột `_id` (nếu có).<br>- **Đặc tả chi tiết các cột dữ liệu (Columns):**<br>&nbsp;&nbsp;+ **_id:** Hiển thị số ID bản ghi whitelist (nếu có, ví dụ: `283`).<br>&nbsp;&nbsp;+ **_last_changed:** Hiển thị ngày giờ cập nhật bản ghi gần nhất.<br>&nbsp;&nbsp;+ **rule:** Hiển thị tên quy tắc tương quan áp dụng whitelist này.<br>&nbsp;&nbsp;+ **host:** Hiển thị tên thiết bị máy trạm được áp dụng (có thể là tên cụ thể hoặc ký tự đại diện `*`).<br>&nbsp;&nbsp;+ **user_id:** Hiển thị mã tài khoản hoặc SID người dùng (ví dụ: `*` hoặc `synthetic:system@nt authority`).<br>&nbsp;&nbsp;+ **specific_value:** Hiển thị giá trị cụ thể được loại trừ (ví dụ đường dẫn tiến trình: `/usr/bin/systemctl` hoặc `c:\windows\sysmon.exe`).<br>&nbsp;&nbsp;+ **user_name:** Hiển thị tên tài khoản (nếu có, hoặc hiển thị `null` / trống).<br>&nbsp;&nbsp;+ **user_domain:** Hiển thị domain quản lý của tài khoản (nếu có, hoặc hiển thị `null` / trống). |
| **10** | **Datatable (Tab RULES)**<br>(Bảng danh sách rule liên quan) | Datatable | - Hiển thị danh sách các quy tắc tương quan có liên kết trực tiếp với whitelist này (được chọn lọc từ danh sách các rules trên hệ thống có tên trùng với cột `rule` của tab ROWS).<br>- **Các chức năng chung bổ trợ:** Phân trang (20 dòng/trang), Sắp xếp tăng/giảm ở cột `ID`.<br>- **Đặc tả chi tiết các cột dữ liệu (Columns):**<br>&nbsp;&nbsp;+ **ID:** Hiển thị mã ID rule dạng liên kết.<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Hành vi khi nhấn:* Điều hướng/mở trực tiếp ngăn kéo Chi tiết Correlation Rule của rule được chọn.<br>&nbsp;&nbsp;+ **NAME:** Hiển thị tên quy tắc tương quan.<br>&nbsp;&nbsp;+ **DESCRIPTION:** Hiển thị mô tả nghiệp vụ phát hiện của rule.<br>&nbsp;&nbsp;+ **FILE:** Hiển thị tên tệp cấu hình chứa rule dạng liên kết.<br>&nbsp;&nbsp;+ **STATUS:** Hiển thị trạng thái hoạt động của rule (Switch toggle cho phép bật tắt nhanh và hiển thị popup xác nhận tương tự như ở màn hình danh sách rule). |
| **11** | **Rows per page & Page controls** | Dropdown / Button | - Hỗ trợ phân trang và chọn giới hạn số lượng dòng hiển thị cho cả 2 tab dữ liệu riêng biệt. |

---

## 5. DANH SÁCH MACROS (MÀN HÌNH CHÍNH)

### 5.1. Thông tin chung (Quy chuẩn 7 phần)

#### 1. Tên chức năng
Xem danh sách bộ lọc vĩ mô (Macros List)

#### 2. Mô tả
Giao diện hiển thị danh sách các bộ lọc vĩ mô (Macros) hỗ trợ viết rule tương quan trong hệ thống EDR (đọc từ tệp tin [pt_siem_macros.txt](file:///e:/Work/EDR/pt_siem_macros.txt)). Danh sách được hiển thị dạng bảng gồm các cột: mã ID (dưới dạng liên kết), tên macro, mô tả, các nhãn phân loại (Tags) hiển thị dưới dạng chip, tài khoản người tạo và thời gian tạo. Người dùng có thể tìm kiếm, làm mới hoặc nhấn nút thêm mới macro.

#### 3. Tác nhân
Người dùng (Operator, Admin)

#### 4. Điều kiện trước
- Người dùng đã đăng nhập thành công vào hệ thống EDR.
- Tài khoản người dùng được cấp quyền xem danh sách Macros.

#### 5. Điều kiện sau
- Danh sách Macros được hiển thị đầy đủ lên bảng dữ liệu với tổng số lượng chính xác được phân tích từ tệp cấu hình.
- Người dùng có thể chuyển hướng xem chi tiết của bất kỳ Macro nào trên danh sách.

#### 6. Ngoại lệ
- Tệp tin pt_siem_macros.txt không tồn tại hoặc bị lỗi đọc file: Hệ thống hiển thị thông báo lỗi `"Không thể tải danh sách bộ lọc vĩ mô từ tệp nguồn!"` (`"Failed to load macros from source file!"`) và bảng hiển thị trống.

#### 7. Các yêu cầu đặc biệt
- Các thẻ Tags gắn với mỗi dòng macro phải được hiển thị gọn gàng, tự động rút gọn hiển thị và chỉ hiện đầy đủ qua tooltip khi rê chuột vào biểu tượng rút gọn.

### 5.2. Đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Macros**<br>(Tiêu đề trang) | Label | - Tiêu đề màn hình chính, hiển thị tên mô tả tính năng quản lý Macros.<br>- **Nội dung hiển thị mặc định:** Macros (153) (Hiển thị số lượng macro được parse thành công từ file cấu hình văn bản).<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **2** | **From here you can manage...**<br>(Mô tả phụ) | Label | - Nhãn văn bản mô tả ngắn gọn vai trò của màn hình.<br>- **Nội dung hiển thị mặc định:** "From here you can manage your macros."<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **3** | **CORRELATION RULES**<br>(Tab chuyển màn hình) | Button | - Cho phép người dùng chuyển sang màn hình quản lý quy tắc tương quan.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:** Điều hướng người dùng sang giao diện Danh sách Correlation Rules. |
| **4** | **WHITELISTS**<br>(Tab chuyển màn hình) | Button | - Cho phép người dùng chuyển sang màn hình quản lý whitelist.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:** Điều hướng người dùng sang giao diện Danh sách Whitelist. |
| **5** | **MACROS**<br>(Tab chuyển màn hình) | Button | - Cho phép người dùng chuyển sang màn hình quản lý macro.<br>- **Trạng thái mặc định:** Active (được highlight nổi bật).<br>- **Hành vi khi nhấn:** Tải lại dữ liệu của màn hình Danh sách Macros. |
| **6** | **Search**<br>(Thanh tìm kiếm) | Searchbox | - Cho phép người dùng nhập từ khóa tìm kiếm các macro trong danh sách.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Tìm kiếm...<br>&nbsp;&nbsp;+ EN: Search...<br>- **Quy tắc Nghiệp vụ:** Tìm kiếm chứa một phần không phân biệt hoa thường trên các trường: ID, Name, Description, Tags. |
| **7** | **Add new macro**<br>(Nút Thêm mới) | Button | - Cho phép người dùng mở giao diện để tạo mới một macro cấu hình.<br>- **Trạng thái mặc định:** Enabled.<br>- **Quyền hạn truy cập:** Admin hoặc Operator.<br>- **Hành vi khi nhấn:** Điều hướng người dùng sang màn hình Thêm mới Macro (Popup/Page). |
| **8** | **Refresh**<br>(Nút Làm mới) | Button | - Cho phép người dùng tải lại danh sách các macro từ máy chủ (đọc lại file text).<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn:** Tải lại dữ liệu, cập nhật bảng và hiển thị toast message: `"Làm mới danh sách macro thành công!"` (`"Macro list refreshed successfully!"`). |
| **9** | **Datatable**<br>(Bảng danh sách Macros) | Datatable | - Hiển thị danh sách các macro có trong hệ thống.<br>- **Các chức năng chung bổ trợ:** Phân trang (20 dòng/trang), cho phép sắp xếp theo ID.<br>- **Đặc tả chi tiết các cột dữ liệu (Columns):**<br>&nbsp;&nbsp;+ **ID:** Hiển thị mã định danh của macro dạng liên kết (ví dụ: `PT-RF-7`, `PT-RF-8`).<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Hành vi khi nhấn:* Hệ thống mở giao diện side drawer **Chi tiết Macro** cho bản ghi tương ứng.<br>&nbsp;&nbsp;+ **NAME:** Hiển thị tên hàm filter của macro (ví dụ: `Successful login (Windows OS)` hoặc tên filter gốc `Check_Profile`).<br>&nbsp;&nbsp;+ **DESCRIPTION:** Hiển thị mô tả ngắn gọn về chức năng lọc của macro.<br>&nbsp;&nbsp;+ **TAGS:** Hiển thị các tag gán cho macro dưới dạng thẻ (Chips/Tags).<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Dạng hiển thị:* Mỗi tag là một Chip màu xanh/xám độc lập. Nếu danh sách tag dài, hiển thị dạng rút gọn (ví dụ: `Obsolete`, `Active`, `Windows`, `+1`...). Khi hover chuột vào thẻ thu gọn `+n`, hiển thị danh sách các tag còn lại dưới dạng Tooltip.<br>&nbsp;&nbsp;+ **CREATED BY:** Hiển thị tài khoản người dùng đã tạo macro.<br>&nbsp;&nbsp;+ **CREATED AT:** Hiển thị thời gian tạo macro trên hệ thống. |
| **10** | **Rows per page & Page controls** | Dropdown / Button | - Hỗ trợ người dùng lựa chọn số lượng bản ghi hiển thị (10, 20, 50, 100) và di chuyển qua lại giữa các trang dữ liệu. |

---

## 6. CHI TIẾT MACRO

### 6.1. Thông tin chung (Quy chuẩn 7 phần)

#### 1. Tên chức năng
Xem chi tiết bộ lọc vĩ mô (Macro Details)

#### 2. Mô tả
Ngăn kéo bên phải mở ra khi nhấn vào mã ID của một Macro trên danh sách. Giao diện hiển thị các thông tin chi tiết của macro bao gồm: mã ID, tên hiển thị, hàm filter gốc, người tạo, ngày tạo, mô tả nghiệp vụ và các thẻ Tags được gán. Phần dưới drawer chứa một khối accordion có thể thu gọn/mở rộng hiển thị mã nguồn code của Macro (đọc từ tệp văn bản). Cho phép người dùng nhấn nút Copy Code nhanh vào Clipboard hoặc nút Fullscreen để phóng to trình xem code.

#### 3. Tác nhân
Người dùng (Operator, Admin)

#### 4. Điều kiện trước
- Người dùng đang ở màn hình Danh sách Macros.
- Người dùng nhấn chọn mã ID của một macro cần xem chi tiết.

#### 5. Điều kiện sau
- Drawer chi tiết macro hiển thị đầy đủ thông tin định nghĩa và mã nguồn lọc dữ liệu của macro.
- Người dùng thực hiện sao chép hoặc xem toàn màn hình mã nguồn của macro thành công.

#### 6. Ngoại lệ
- Không tìm thấy đoạn code của macro có ID tương ứng trong tệp văn bản: Khung hiển thị code hiển thị thông báo lỗi `"Không tìm thấy mã nguồn của macro!"` (`"Macro source code not found!"`).

#### 7. Các yêu cầu đặc biệt
- Nút sao chép mã nguồn phải hoạt động đúng trên các trình duyệt phổ biến và phản hồi bằng thông báo Toast ngay lập tức.
- Khung xem code toàn màn hình (Fullscreen) phải hỗ trợ phím bấm tắt ESC để quay lại kích thước Drawer bình thường.

### 6.2. Đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Macro Details**<br>(Tiêu đề Drawer) | Label | - Tiêu đề hiển thị tên ngăn kéo chi tiết macro.<br>- **Nội dung hiển thị mặc định:** Macro Details<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **2** | **Close**<br>(Icon đóng X) | Button | - Cho phép người dùng đóng ngăn kéo chi tiết macro.<br>- **Vị trí:** Góc trên cùng bên phải ngăn kéo.<br>- **Hành vi khi nhấn:** Đóng Drawer ngay lập tức. |
| **3** | **Macro Header Title**<br>(Tên Macro chính) | Label | - Nhãn hiển thị tên mô tả chính của macro đang xem.<br>- **Nội dung hiển thị:** Lấy từ trường `NAME` (ví dụ: "Registry Actions on a Windows-based host").<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **4** | **MACRO ID**<br>(Mã định danh) | Label | - Nhãn hiển thị mã ID của macro.<br>- **Nội dung hiển thị:** Lấy từ trường `ID` (ví dụ: "PT-RF-123").<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **5** | **MACRO NAME**<br>(Tên Hàm) | Label | - Nhãn hiển thị tên hàm filter gốc của macro trong mã nguồn.<br>- **Nội dung hiển thị:** Tên hàm filter (ví dụ: "Registry Actions on a Windows-based host"). |
| **6** | **CREATED BY**<br>(Người tạo) | Label | - Nhãn hiển thị tài khoản đã tạo hoặc cập nhật macro.<br>- **Nội dung hiển thị:** Lấy từ trường `CREATED BY` (ví dụ: "admin"). |
| **7** | **CREATED AT**<br>(Thời gian tạo) | Label | - Nhãn hiển thị thời điểm tạo hoặc import macro vào EDR.<br>- **Nội dung hiển thị:** Lấy từ trường `CREATED AT` (ví dụ: "Apr 08, 2026 @ 20:06:40"). |
| **8** | **DESCRIPTION**<br>(Mô tả) | Label | - Nhãn hiển thị nội dung giải thích chi tiết chức năng nghiệp vụ của macro.<br>- **Nội dung hiển thị:** Lấy từ trường `DESCRIPTION`. |
| **9** | **TAGS**<br>(Nhãn Tag) | Label | - Hiển thị danh sách các tag được phân loại cho macro dưới dạng các thẻ (Chips).<br>- **Dạng hiển thị:** Dạng thẻ màu xanh/xám độc lập (ví dụ: `Logout from the system`, `Windows`). |
| **10** | **Macro code**<br>(Khối Accordion Code) | Button | - Cho phép người dùng đóng/mở khối hiển thị code cấu hình macro bên dưới.<br>- **Trạng thái mặc định:** Mở rộng (Expanded).<br>- **Hành vi khi nhấn:** Bật/tắt ẩn hiện vùng hiển thị code. |
| **11** | **Copy Code**<br>(Nút Sao chép) | Button | - Cho phép người dùng sao chép nhanh toàn bộ mã nguồn của macro vào Clipboard của máy tính.<br>- **Vị trí:** Phía trên góc phải của khung hiển thị code.<br>- **Hành vi khi nhấn:**<br>1. Hệ thống thực hiện sao chép toàn bộ text code trong khung hiển thị vào bộ nhớ tạm thời của hệ điều hành.<br>2. Hiển thị toast message thành công tự động đóng: `"Sao chép mã nguồn thành công!"` (`"Code copied to clipboard!"`). |
| **12** | **Fullscreen**<br>(Nút Xem toàn màn hình) | Button | - Cho phép người dùng mở rộng khung xem code ra toàn màn hình để dễ đọc cấu trúc code dài.<br>- **Vị trí:** Phía trên góc phải của khung hiển thị code (bên cạnh nút Copy).<br>- **Hành vi khi nhấn:** Phóng to khung code ra dạng popup toàn màn hình (Modal zoom). Nhấn lại hoặc nhấn phím `ESC` để thu nhỏ về kích thước cũ trong Drawer. |
| **13** | **Code Viewer**<br>(Trình xem mã nguồn) | Textarea / Code Block | - Hiển thị mã nguồn chi tiết của macro (đọc cấu trúc filter từ file [pt_siem_macros.txt](file:///e:/Work/EDR/pt_siem_macros.txt)).<br>- **Trạng thái:** Chỉ xem (Read-only), hỗ trợ tự động tô màu cú pháp (Syntax highlighting), hỗ trợ thanh cuộn dọc và cuộn ngang. |

---

## 7. TOAST MESSAGE THÔNG BÁO CHUNG TRÊN GIAO DIỆN
Các toast message thông báo trên hệ thống được hiển thị ở góc trên cùng bên phải màn hình và tự động biến mất sau **3000 ms**.

### 7.1. Thông báo thao tác chung
- **Làm mới dữ liệu thành công:**
  - VI: `"Làm mới dữ liệu thành công!"`
  - EN: `"Data refreshed successfully!"`
- **Sao chép dữ liệu thành công:**
  - VI: `"Sao chép thành công vào bộ nhớ tạm!"`
  - EN: `"Copied successfully to clipboard!"`
- **Xuất dữ liệu thành công:**
  - VI: `"Xuất dữ liệu thành công!"`
  - EN: `"Data exported successfully!"`
- **Xuất dữ liệu thất bại:**
  - VI: `"Xuất dữ liệu không thành công!"`
  - EN: `"Failed to export data!"`

---

## 8. ĐẶC TẢ HỘP THOẠI XÁC NHẬN (CONFIRMATION MODALS)

### 8.1. Kịch bản xác nhận thay đổi trạng thái quy tắc (Correlation Rule Status Change)
- **Tên Modal:** Hộp thoại xác nhận thay đổi trạng thái quy tắc
- **Tiêu đề (Header):** `"Xác nhận thay đổi trạng thái"` (`"Confirm status change"`)
- **Nội dung thông báo (Body text):** `"Bạn có chắc chắn muốn thay đổi trạng thái của quy tắc tương quan này không? Việc thay đổi trạng thái có thể ảnh hưởng đến khả năng giám sát và phát hiện các mối đe dọa an ninh mạng của hệ thống EDR."` (`"Are you sure you want to change the status of this correlation rule? Changing the status may affect the security monitoring and threat detection capabilities of the EDR system."`)
- **Nút Xác nhận (Confirm Button):**
  - Nhãn nút: `"Đồng ý"` (`"Confirm"`)
  - Hành vi khi nhấn: Đóng hộp thoại xác nhận, hệ thống thực hiện gọi API để cập nhật trạng thái hoạt động của quy tắc và hiển thị Toast kết quả tương ứng.
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`) hoặc click icon `x`.
  - Hành vi khi nhấn: Đóng hộp thoại xác nhận, không thực hiện cập nhật trạng thái, giữ nguyên giá trị Switch cũ.
- **Hành vi khi click vùng ngoài Modal:** Không đóng hộp thoại.
