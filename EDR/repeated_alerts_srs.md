# ĐẶC TẢ CHI TIẾT GIAO DIỆN: TAB CẢNH BÁO LẶP LẠI (REPEATED ALERTS) VÀ HỘP THOẠI CHI TIẾT (REPEATED ALERTS LIST DETAIL)

Tài liệu này đặc tả chi tiết giao diện người dùng và các thành phần giao diện (UI Components) của tab **Danh sách Cảnh báo Lặp lại (Repeated Alerts)**, hộp thoại **Chi tiết danh sách cảnh báo lặp lại (Repeated Alerts List)** và màn hình **Cấu hình General Setting (Alert Merging Settings)** trên hệ thống EDR. Tài liệu được viết theo định hướng thiết kế giao diện SOC chuyên nghiệp nhằm giải quyết vấn đề quá tải thông tin (Alert Fatigue) cho các nhà phân tích bảo mật (Analyst).

---

## 1. THAM CHIẾU NGHIỆP VỤ (BUSINESS RULES REFERENCE)

Dựa trên tài liệu [alert_processing_flow.md](file:///E:/Work/EDR/alert_processing_flow.md), các nghiệp vụ chính hiển thị và xử lý trên giao diện bao gồm:
1. **Tiêu chí gộp cảnh báo:** Hệ thống tự động gộp các cảnh báo đơn lẻ thành nhóm cảnh báo lặp lại khi trùng khớp đồng thời 3 thông tin:
   - **Agent ID** (`agent.id`): Máy trạm phát sinh cảnh báo.
   - **Rule ID** (`rule.id`): Luật phát hiện nguy cơ.
   - **Key Value** (Giá trị đối chiếu động): File Hash, Destination IP, Malware Name, Registry Key, hoặc Process Name tùy loại cảnh báo.
2. **Khung thời gian gộp:** Các cảnh báo liên tiếp cách nhau không quá $T_{sliding}$ (mặc định 1 giờ) và tổng thời gian của cả chuỗi gộp không quá $T_{max}$ (mặc định 24 giờ). Các tham số thời gian này có thể cấu hình được tại tab General của Setting.
3. **Quản lý trạng thái:** Tự động đóng (`Closed`) các cảnh báo cũ trong nhóm và chỉ giữ lại cảnh báo con mới nhất ở trạng thái mở (`Open`) làm đại diện hiển thị.
4. **Hành động hàng loạt:** Trong giao diện chi tiết, Analyst được phép chọn một hoặc nhiều cảnh báo con để liên kết vào một Incident mới hoặc Incident sẵn có, hoặc đóng (`Closed`) hàng loạt các cảnh báo đang mở.

---

## 2. GIAO DIỆN 1: MÀN HÌNH DANH SÁCH CẢNH BÁO LẶP LẠI (REPEATED ALERTS LIST)

Màn hình này hiển thị danh sách tổng quan các nhóm cảnh báo lặp lại đã được hệ thống tự động gom nhóm, hỗ trợ các bộ lọc tìm kiếm nâng cao và xuất báo cáo.

### 2.1. Thông tin chung
- **Tên màn hình:** Danh sách Cảnh báo Lặp lại (Repeated Alerts List)
- **Loại giao diện:** Tab (bên cạnh tab ALERTS thông thường)
- **Mô tả nghiệp vụ:** Cho phép người dùng theo dõi danh sách các nhóm cảnh báo lặp lại, thực hiện tìm kiếm, lọc theo mốc thời gian phát hiện đầu tiên hoặc cuối cùng và xuất file báo cáo.

### 2.2. Đặc tả các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **ALERTS** / **REPEATED ALERTS**<br>(Tab chuyển đổi) | Button (Tab) | - Cho phép người dùng thực hiện chuyển đổi qua lại giữa màn hình danh sách cảnh báo thông thường và danh sách cảnh báo lặp lại.<br>- **Trạng thái mặc định:** Tab `REPEATED ALERTS` được chọn (Active - hiển thị highlight màu xanh dương và đường gạch dưới).<br>- **Hành vi khi nhấn:**<br>1. Click tab `ALERTS`: Điều hướng người dùng sang màn hình Danh sách Cảnh báo Thông thường.<br>2. Click tab `REPEATED ALERTS`: Hệ thống tải lại danh sách cảnh báo lặp lại và giữ nguyên ở tab hiện tại. |
| **2** | **Repeated Alerts ({count})**<br>(Tiêu đề màn hình) | Label | - Cho phép người dùng theo dõi tiêu đề của tab hiện tại cùng tổng số lượng nhóm cảnh báo lặp lại đang có trên hệ thống.<br>- **Nội dung hiển thị mặc định:** `Repeated Alerts ({count})` với `{count}` là tổng số lượng nhóm cảnh báo lặp lại (Ví dụ trong ảnh: `Repeated Alerts (4567)`).<br>- **Tính chất hiển thị:** Động (thay đổi theo số lượng bản ghi thực tế trả về từ API). |
| **3** | **Export formatted**<br>(Nút Xuất dữ liệu) | Button | - Cho phép người dùng thực hiện xuất dữ liệu của danh sách cảnh báo lặp lại đang hiển thị ra file Excel/CSV đã định dạng sẵn.<br>- **Trạng thái mặc định:** Enabled.<br>- **Quyền hạn truy cập:** Tất cả người dùng.<br>- **Hành vi khi nhấn (OnClick Event):**<br>Khi nhấn vào thì sẽ thực hiện gọi API xuất file:<br>1. Khi bắt đầu gửi request xử lý: Hệ thống chuyển nút sang trạng thái Loading (hiển thị spinner xoay tròn, disable nút để chống việc người dùng click nhiều lần). Trạng thái disable này chỉ mở khóa sau khi nhận được file download hoặc có phản hồi lỗi từ API.<br>2. Nếu xuất file thành công: mở khóa nút bấm và hiển thị toast message tự động đóng với nội dung: `"Xuất dữ liệu thành công!"` (`"Export successful!"`).<br>3. Nếu xuất file thất bại: mở khóa nút bấm và hiển thị toast message tự động đóng với nội dung: `"Xuất dữ liệu thất bại!"` (`"Export failed!"`). |
| **4** | **Search**<br>(Thanh tìm kiếm) | Searchbox | - Cho phép người dùng nhập từ khóa tìm kiếm nhóm cảnh báo lặp lại theo ID, tên Agent, ID Rule, mô tả Rule, hoặc Key Value.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Tìm kiếm<br>&nbsp;&nbsp;+ EN: Search<br>- **Giá trị mặc định:** Trống.<br>- **Giới hạn ký tự:** Tối đa 255 ký tự.<br>- **Quy tắc Nghiệp vụ:**<br>1. Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi gọi API tìm kiếm.<br>2. Hệ thống tự động kích hoạt tìm kiếm sau 500 ms kể từ khi người dùng ngừng gõ (Debounce).<br>3. Cho phép click vào icon "x" ở phía phải ô nhập để xóa nhanh nội dung tìm kiếm và tự động tải lại danh sách mặc định. |
| **5** | **First seen**<br>(Bộ lọc thời điểm đầu tiên) | Datepicker (Range Picker) | - Cho phép người dùng chọn khoảng thời gian phát hiện đầu tiên của cảnh báo trong nhóm (`first_seen`) để lọc dữ liệu.<br>- **Định dạng hiển thị & nhập:** `MMM DD, YYYY @ HH:mm:ss` (Ví dụ trong ảnh: `Oct 11, 2024 @ 15:48:54 -> Oct 12, 2024 @ 15:48:54`).<br>- **Cách thức nhập:** Chọn khoảng ngày giờ từ giao diện lịch hoặc gõ trực tiếp.<br>- **Giá trị mặc định:** Trống.<br>- **Ràng buộc ngày:** Ngày kết thúc phải lớn hơn hoặc bằng Ngày bắt đầu.<br>- **Quy tắc Nghiệp vụ:**<br>1. Vô hiệu hóa việc chọn các ngày trong tương lai (lớn hơn ngày hiện tại của hệ thống).<br>2. Khi thay đổi khoảng thời gian, hệ thống tự động gọi API để tải lại dữ liệu danh sách theo bộ lọc mới.<br>- **Thông báo lỗi tương ứng:**<br>+ Sai định dạng ngày hoặc khoảng thời gian kết thúc nhỏ hơn bắt đầu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Khoảng thời gian First seen không hợp lệ!"` (`"Invalid First seen time range!"`). |
| **6** | **Last seen**<br>(Bộ lọc thời điểm cuối cùng) | Datepicker (Range Picker) | - Cho phép người dùng chọn khoảng thời gian phát hiện cuối cùng của cảnh báo trong nhóm (`last_seen`) để lọc dữ liệu.<br>- **Định dạng hiển thị & nhập:** `MMM DD, YYYY @ HH:mm:ss` (Ví dụ trong ảnh: `Oct 11, 2024 @ 15:48:54 -> Oct 12, 2024 @ 15:48:54`).<br>- **Cách thức nhập:** Chọn khoảng ngày giờ từ giao diện lịch hoặc gõ trực tiếp.<br>- **Giá trị mặc định:** Trống.<br>- **Ràng buộc ngày:** Ngày kết thúc phải lớn hơn hoặc bằng Ngày bắt đầu.<br>- **Quy tắc Nghiệp vụ:**<br>1. Vô hiệu hóa việc chọn các ngày trong tương lai (lớn hơn ngày hiện tại của hệ thống).<br>2. Khi thay đổi khoảng thời gian, hệ thống tự động gọi API để tải lại dữ liệu danh sách theo bộ lọc mới.<br>- **Thông báo lỗi tương ứng:**<br>+ Sai định dạng ngày hoặc khoảng thời gian kết thúc nhỏ hơn bắt đầu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Khoảng thời gian Last seen không hợp lệ!"` (`"Invalid Last seen time range!"`). |
| **7** | **Repeated Alerts Table**<br>(Bảng dữ liệu cảnh báo lặp lại) | Datatable | - Cho phép người dùng theo dõi danh sách các nhóm cảnh báo lặp lại dưới dạng bảng và click vào các liên kết hoặc nút hành động để điều tra sâu.<br>- **Các chức năng chung bổ trợ:**<br>&nbsp;&nbsp;+ Phân trang (Pagination): Có (mặc định hiển thị 20 bản ghi/trang).<br>&nbsp;&nbsp;+ Sắp xếp (Sorting): Cho phép click vào các cột tiêu đề để sắp xếp tăng/giảm dần, bao gồm: `AGENT ID`, `LAST SEEN` (cột First seen), `LAST SEEN` (cột Last seen).<br>- **Đặc tả chi tiết các cột dữ liệu (Fields/Columns):**<br>&nbsp;&nbsp;+ **Cột Checkbox chọn dòng:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng tích chọn dòng để thực hiện các thao tác hàng loạt hoặc xuất báo cáo cụ thể theo dòng.<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Checkbox ở Header:* Cho phép tích chọn hoặc bỏ chọn toàn bộ các bản ghi đang hiển thị trên trang hiện tại.<br>&nbsp;&nbsp;+ **AGENT ID (Cột liên kết):**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem mã định danh Agent phát sinh cảnh báo và click vào liên kết.<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Hành vi khi nhấn:* Khi người dùng click vào link AGENT ID, hệ thống tự động điều hướng sang màn hình Chi tiết Agent (`/agents/{agent_id}`).<br>&nbsp;&nbsp;+ **AGENT NAME:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem tên của máy trạm phát sinh cảnh báo (Ví dụ: `ubuntu`, `debian`...).<br>&nbsp;&nbsp;+ **RULE ID (Cột liên kết):**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem mã định danh Rule phát hiện nguy cơ và click vào liên kết.<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Hành vi khi nhấn:* Khi người dùng click vào link RULE ID, hệ thống tự động điều hướng sang màn hình Chi tiết Luật phát hiện (`/rules/{rule_id}`).<br>&nbsp;&nbsp;+ **RULE DESCRIPTION:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem mô tả của luật phát hiện nguy cơ (Ví dụ: `Windows Hacktool Mimikatz Execution`, `SQL Injection Attack on MySQL Database`).<br>&nbsp;&nbsp;+ **KEY VALUE:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem giá trị đối chiếu động dùng để gộp nhóm cảnh báo (Ví dụ: Hash file `f3a9c/d8e1b42...`, Địa chỉ IP `10.13.5.2`, hoặc dấu `-` nếu không trích xuất được giá trị gộp).<br>&nbsp;&nbsp;+ **ALERT COUNT:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem số lượng cảnh báo con bị gộp trong nhóm dưới dạng nhãn (pill badge) màu cam (Ví dụ: `3 times`, `5 times`, `1 time`...).<br>&nbsp;&nbsp;+ **FIRST SEEN** (Hiển thị nhãn cột là "LAST SEEN" cột bên trái trên UI):<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem mốc thời gian phát hiện cảnh báo đầu tiên trong chuỗi lặp.<br>&nbsp;&nbsp;&nbsp;&nbsp;* Định dạng: `MMM DD, YYYY @ HH:mm:ss.ms` (Ví dụ: `Dec 27, 2024 @ 10:28:56.41`).<br>&nbsp;&nbsp;+ **LAST SEEN** (Hiển thị nhãn cột là "LAST SEEN" cột bên phải trên UI):<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem mốc thời gian phát hiện cảnh báo cuối cùng trong chuỗi lặp.<br>&nbsp;&nbsp;&nbsp;&nbsp;* Định dạng: `MMM DD, YYYY @ HH:mm:ss.ms` (Ví dụ: `Dec 27, 2024 @ 10:28:56.41`).<br>&nbsp;&nbsp;+ **ACTION (Nút Xem chi tiết):**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng click vào biểu tượng hình con mắt màu xanh dương ở cột hành động để mở rộng xem thông tin chi tiết.<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Hành vi khi nhấn:* Khi người dùng click vào icon con mắt của dòng tương ứng, hệ thống mở hộp thoại popup **Chi tiết danh sách cảnh báo lặp lại (Repeated Alerts List)** của nhóm cảnh báo tương ứng. |
| **8** | **Rows per page**<br>(Dropdown số dòng/trang) | Dropdown (Single-select) | - Cho phép người dùng lựa chọn số lượng bản ghi hiển thị trên mỗi trang của bảng dữ liệu.<br>- **Nguồn dữ liệu cố định:**<br>&nbsp;&nbsp;+ 10 (10)<br>&nbsp;&nbsp;+ 20 (20)<br>&nbsp;&nbsp;+ 50 (50)<br>&nbsp;&nbsp;+ 100 (100)<br>- **Giá trị mặc định:** 20.<br>- **Quy tắc Nghiệp vụ:**<br>Khi người dùng thay đổi giá trị kích thước trang, hệ thống tự động tải lại dữ liệu trang 1 với số lượng dòng hiển thị tương ứng.<br>- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định). |
| **9** | **Pagination Controls**<br>(Điều khiển phân trang) | Button | - Cho phép người dùng thực hiện chuyển trang hiển thị dữ liệu của bảng danh sách cảnh báo lặp lại bằng cách nhấn vào các nút số trang hoặc nút di chuyển.<br>- **Trạng thái mặc định:** Enabled (Nút số trang hiện tại hiển thị highlight màu xanh dương).<br>- **Hành vi khi nhấn (OnClick Event):**<br>1. Click nút số trang cụ thể (Ví dụ: `1`, `2`, `3`...): Hệ thống chuyển đến trang tương ứng và tải dữ liệu mới từ API.<br>2. Click nút mũi tên trái `<`: Chuyển về trang trước đó (disabled nếu đang ở trang 1).<br>3. Click nút mũi tên phải `>`: Chuyển đến trang tiếp theo (disabled nếu đang ở trang cuối cùng). |

---

## 3. GIAO DIỆN 2: HỘP THOẠI CHI TIẾT DANH SÁCH CẢNH BÁO LẶP LẠI (REPEATED ALERTS LIST DETAIL POPUP)

Hộp thoại hiển thị chi tiết danh sách tất cả các cảnh báo con của một nhóm cảnh báo lặp lại đã được gộp. Analyst có thể kiểm tra thông tin chi tiết từng cảnh báo con và thực hiện các hành động xử lý hàng loạt.

### 3.1. Thông tin chung
- **Tên màn hình/Popup:** Chi tiết danh sách cảnh báo lặp lại (Repeated Alerts List)
- **Loại giao diện:** Popup Modal
- **Mô tả nghiệp vụ:** Cho phép người dùng theo dõi chi tiết lịch sử xảy ra cảnh báo con, thực hiện gán các cảnh báo con này vào sự cố (Incident) mới hoặc sẵn có, hoặc đóng hàng loạt các cảnh báo đang mở.

### 3.2. Đặc tả các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Repeated Alerts List**<br>(Tiêu đề popup) | Label | - Cho phép người dùng theo dõi tiêu đề của popup chi tiết cảnh báo lặp lại.<br>- **Nội dung hiển thị:** Repeated Alerts List<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **2** | **Close (X)**<br>(Nút đóng góc phải) | Button | - Cho phép người dùng click để đóng popup chi tiết và trở lại màn hình danh sách cảnh báo lặp lại.<br>- **Vị trí:** Góc trên cùng bên phải của popup modal.<br>- **Hành vi khi nhấn:** Đóng popup ngay lập tức, dữ liệu trên màn hình danh sách bên dưới được giữ nguyên trạng thái cũ. |
| **3** | **Agent & Rule Subtitle**<br>(Dòng thông tin phụ đề) | Label / Link | - Cho phép người dùng xem thông tin định danh máy trạm và tên quy tắc phát hiện tương ứng của nhóm cảnh báo lặp lại, đồng thời click vào các liên kết để xem chi tiết.<br>- **Nội dung hiển thị:** `Agent: {agent_id} ({agent_name}) \| Rule: {rule_id} ({rule_description})` (Ví dụ trong ảnh: `Agent: 001 (TEST_2805_2026_NSJ7_2) \| Rule: 010 (Windows Hacktool Usage)`).<br>- **Đặc tả chi tiết các phần tương tác:**<br>1. Link `{agent_id}`: Hiển thị ID của Agent dưới dạng liên kết link. Khi click, hệ thống tự động mở một tab mới điều hướng tới trang chi tiết Agent (`/agents/{agent_id}`).<br>2. Link `{rule_id}`: Hiển thị ID của Rule dưới dạng liên kết link. Khi click, hệ thống tự động mở một tab mới điều hướng tới trang chi tiết Rule (`/rules/{rule_id}`). |
| **4** | **Alerts ({count})**<br>(Tiêu đề danh sách) | Label | - Cho phép người dùng theo dõi tổng số lượng cảnh báo con thuộc nhóm cảnh báo lặp lại đang mở xem chi tiết.<br>- **Nội dung hiển thị mặc định:** `Alerts ({count})` với `{count}` là tổng số lượng cảnh báo con trong nhóm (Ví dụ trong ảnh: `Alerts (82)`).<br>- **Tính chất hiển thị:** Động. |
| **5** | **Create new incident**<br>(Nút Tạo sự cố mới) | Button | - Cho phép người dùng thực hiện liên kết các cảnh báo con đang được tích chọn trong bảng bên dưới vào một sự cố (Incident) mới được tạo thêm.<br>- **Trạng thái mặc định:** Disabled.<br>- **Quy tắc Nghiệp vụ:** Nút chỉ được chuyển sang trạng thái **Enabled** khi người dùng tích chọn ít nhất 1 cảnh báo con ở cột Checkbox của bảng dữ liệu.<br>- **Hành vi khi nhấn (OnClick Event):**<br>Khi click nút, hệ thống tự động điều hướng sang màn hình/giao diện tạo mới Incident, điền sẵn thông tin các Alert ID được chọn vào danh sách cảnh báo liên kết của Incident mới. |
| **6** | **Assign Incident**<br>(Nút Gán vào sự cố sẵn có) | Button | - Cho phép người dùng thực hiện gán các cảnh báo con đang được chọn vào một Incident đã tồn tại trong hệ thống.<br>- **Trạng thái mặc định:** Disabled.<br>- **Quy tắc Nghiệp vụ:** Nút chỉ được chuyển sang trạng thái **Enabled** khi người dùng tích chọn ít nhất 1 cảnh báo con ở cột Checkbox của bảng dữ liệu.<br>- **Hành vi khi nhấn (OnClick Event):**<br>Khi click nút, hệ thống hiển thị popup danh sách các Incident đang mở trên hệ thống để người dùng lựa chọn sự cố muốn gán. |
| **7** | **Close (Button hành động)**<br>(Nút đóng cảnh báo) | Button | - Cho phép người dùng thực hiện đóng (chuyển trạng thái sang `Closed`) hàng loạt đối với các cảnh báo con đang được chọn.<br>- **Trạng thái mặc định:** Disabled.<br>- **Quy tắc Nghiệp vụ:** Nút chỉ được chuyển sang trạng thái **Enabled** khi người dùng chọn ít nhất 1 cảnh báo con có trạng thái hiện tại là `Open`. Nếu tất cả cảnh báo con được chọn đều đã ở trạng thái `Closed`, nút vẫn giữ trạng thái **Disabled**.<br>- **Hành vi khi nhấn (OnClick Event):**<br>Khi người dùng bấm nút hành động Đóng:<br>1. Hệ thống hiển thị hộp thoại cảnh báo xác nhận đóng cảnh báo (Xem đặc tả Hộp thoại xác nhận ở Mục 4.1).<br>2. Nếu người dùng chọn xác nhận đồng ý đóng:<br>&nbsp;&nbsp;. Khi bắt đầu gửi request: chuyển nút sang trạng thái Loading (spinner, disable nút). Nút chỉ mở khóa sau khi có phản hồi kết quả từ máy chủ.<br>&nbsp;&nbsp;. Nếu đóng thành công: Cập nhật lại danh sách cảnh báo con (các cảnh báo được chọn chuyển sang trạng thái `Closed`), đóng hộp thoại xác nhận và hiển thị toast message tự động đóng: `"Đóng cảnh báo thành công!"` (`"Alerts closed successfully!"`).<br>&nbsp;&nbsp;. Nếu đóng không thành công: Hiển thị toast message tự động đóng: `"Đóng cảnh báo thất bại!"` (`"Failed to close alerts!"`). |
| **8** | **Alert Detail Table**<br>(Bảng danh sách cảnh báo con) | Datatable | - Cho phép người dùng theo dõi danh sách chi tiết các cảnh báo con trong nhóm gộp dưới dạng bảng dữ liệu.<br>- **Các chức năng chung bổ trợ:**<br>&nbsp;&nbsp;+ Phân trang (Pagination): Có (mặc định hiển thị 20 bản ghi/trang).<br>&nbsp;&nbsp;+ Sắp xếp (Sorting): Cho phép click vào các cột tiêu đề để sắp xếp tăng/giảm dần, bao gồm: `ALERT ID`, `TIME`.<br>- **Đặc tả chi tiết các cột dữ liệu (Fields/Columns):**<br>&nbsp;&nbsp;+ **Cột Checkbox chọn dòng:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng tích chọn dòng để thực hiện các thao tác hàng loạt (`Create new incident`, `Assign Incident`, `Close`).<br>&nbsp;&nbsp;&nbsp;&nbsp;* *Checkbox ở Header:* Cho phép tích chọn hoặc bỏ chọn toàn bộ các bản ghi trên trang hiện tại của popup.<br>&nbsp;&nbsp;+ **ALERT ID:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem mã định danh duy nhất của cảnh báo con (Ví dụ: `123456789.67584`).<br>&nbsp;&nbsp;+ **TIME:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem mốc thời gian phát sinh cụ thể của cảnh báo con.<br>&nbsp;&nbsp;&nbsp;&nbsp;* Định dạng: `MMM DD, YYYY @ HH:mm:ss.ms` (Ví dụ: `Apr 20, 2025 @ 03:08:44.90`).<br>&nbsp;&nbsp;+ **DESCRIPTION:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem mô tả lỗi/hành vi độc hại của cảnh báo con (Ví dụ: `Windows Hacktool Usage`).<br>&nbsp;&nbsp;+ **STATUS (Cột tag trạng thái):**<br>&nbsp;&nbsp;&nbsp;&nbsp;* Cho phép người dùng xem trạng thái hoạt động của cảnh báo con dưới dạng nhãn màu.<br>&nbsp;&nbsp;&nbsp;&nbsp;* **Quy tắc hiển thị trạng thái:**<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;. Trạng thái `Open`: Hiển thị nhãn tag màu xanh dương với chữ trắng, nhãn VI: `"Mở"` / EN: `"Open"`. Đại diện cho cảnh báo con mới nhất chưa được xử lý.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;. Trạng thái `Closed`: Hiển thị nhãn tag màu xám với chữ trắng, nhãn VI: `"Đóng"` / EN: `"Closed"`. Đại diện cho các cảnh báo lặp lại cũ đã được tự động đóng bởi pipeline gộp hoặc do người dùng đóng thủ công. |
| **9** | **Rows per page**<br>(Dropdown số dòng/trang popup) | Dropdown (Single-select) | - Cho phép người dùng lựa chọn số lượng dòng hiển thị trên một trang của bảng dữ liệu chi tiết trong popup.<br>- **Nguồn dữ liệu cố định:**<br>&nbsp;&nbsp;+ 10 (10)<br>&nbsp;&nbsp;+ 20 (20)<br>&nbsp;&nbsp;+ 50 (50)<br>&nbsp;&nbsp;+ 100 (100)<br>- **Giá trị mặc định:** 20.<br>- **Quy tắc Nghiệp vụ:**<br>Khi thay đổi kích thước trang hiển thị, hệ thống tự động tải lại dữ liệu trang 1 của bảng chi tiết trong popup với số dòng tương ứng.<br>- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định). |
| **10** | **Pagination Controls**<br>(Điều khiển phân trang popup) | Button | - Cho phép người dùng thực hiện chuyển trang hiển thị dữ liệu của bảng chi tiết trong popup bằng cách nhấn vào các nút số trang hoặc nút di chuyển.<br>- **Trạng thái mặc định:** Enabled (Nút số trang hiện tại hiển thị highlight màu xanh dương).<br>- **Hành vi khi nhấn (OnClick Event):**<br>1. Click nút số trang cụ thể (Ví dụ: `1`, `2`, `3`...): Hệ thống chuyển đến trang tương ứng và tải dữ liệu mới từ API cho popup.<br>2. Click nút mũi tên trái `<`: Chuyển về trang trước đó (disabled nếu đang ở trang 1).<br>3. Click nút mũi tên phải `>`: Chuyển đến trang tiếp theo (disabled nếu đang ở trang cuối cùng). |

---

## 4. ĐẶC TẢ HỘP THOẠI XÁC NHẬN (CONFIRMATION MODALS)

### 4.1. Hộp thoại xác nhận đóng các cảnh báo con được chọn
Hộp thoại xuất hiện khi Analyst chọn một hoặc nhiều cảnh báo con ở trạng thái `Open` trong bảng chi tiết và nhấn nút hành động `Close` ở thanh công cụ phía trên bảng.

- **Tên Modal:** Hộp thoại xác nhận đóng cảnh báo
- **Tiêu đề (Header):** `"Xác nhận đóng cảnh báo"` (`"Confirm closing alerts"`)
- **Nội dung thông báo (Body text):** `"Bạn có chắc chắn muốn đóng các cảnh báo đang được chọn không? Trạng thái của các cảnh báo này sẽ thay đổi thành Closed."` (`"Are you sure you want to close the selected alerts? The status of these alerts will be changed to Closed."`)
- **Nút Xác nhận (Confirm Button):**
  - Nhãn nút: `"Đồng ý"` (`"Confirm"`)
  - Hành vi khi nhấn: Hệ thống chuyển nút sang trạng thái Loading, disable các thao tác khác trên modal xác nhận, gọi API đóng cảnh báo hàng loạt cho các ID được chọn và trả về kết quả Toast thông báo.
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`) hoặc click icon `x` ở góc phải.
  - Hành vi khi nhấn: Đóng hộp thoại xác nhận, giữ nguyên trạng thái các cảnh báo trong popup chi tiết và cho phép người dùng tiếp tục thao tác.
- **Hành vi khi click vùng ngoài Modal:** Không đóng hộp thoại xác nhận.

---

## 5. GIAO DIỆN 3: MÀN HÌNH CẤU HÌNH GENERAL (TAB GENERAL SETTING)

Màn hình này cho phép Analyst cấu hình các cài đặt chung cho hệ thống EDR. Để mở rộng phát triển các thiết lập khác sau này, giao diện được phân chia rõ ràng thành từng khối/khu vực cấu hình độc lập (Cards), trong đó khối cấu hình đầu tiên là **Cấu hình gộp cảnh báo (Alert Merging Settings)**.

### 5.1. Thiết kế Giao diện Mockup

Dưới đây là hình ảnh thiết kế giao diện cấu hình tab General hiển thị chi tiết phần cấu hình thời gian gộp cảnh báo:

![Giao diện Cấu hình Gộp Cảnh báo trong General Setting](file:///C:/Users/Admin/.gemini/antigravity-ide/brain/c25357b4-910f-4100-8e66-37b28acc4fb7/general_settings_ui_1780560004156.png)

### 5.2. Đặc tả Thông tin Chung Chức năng (Functional Specifications)

#### 1. Tên chức năng
Cấu hình chung hệ thống (General Settings)

#### 2. Mô tả
Chức năng cho phép tác nhân có thẩm quyền tùy chỉnh các tham số cấu hình cốt lõi và tổng quát phục vụ cho các luồng xử lý của hệ thống EDR. Màn hình được thiết kế theo phân khu dạng thẻ (Card panels) độc lập giúp phân biệt rõ ràng các khu vực cài đặt nghiệp vụ khác nhau (như cấu hình gộp cảnh báo, cấu hình hiển thị, cấu hình thông báo) và dễ dàng mở rộng, tích hợp thêm các tính năng cấu hình khác trong tương lai. Khi tác nhân thực hiện thay đổi giá trị cấu hình và chọn lưu lại, hệ thống sẽ kiểm tra tính hợp lệ dữ liệu và áp dụng ngay các giá trị mới cho toàn bộ các quy trình nghiệp vụ tương ứng.

#### 3. Tác nhân
- Quản trị viên hệ thống (System Administrator)
- Nhà phân tích bảo mật có quyền quản trị cài đặt (Analyst with Settings permissions)

#### 4. Điều kiện trước
- Tác nhân đã đăng nhập thành công vào giao diện quản trị của hệ thống EDR.
- Tác nhân được phân quyền truy cập và thực hiện thay đổi cài đặt hệ thống.

#### 5. Điều kiện sau
- Các giá trị cấu hình chung mới được cập nhật và lưu trữ thành công vào cơ sở dữ liệu hệ thống.
- Hệ thống lập tức áp dụng thiết lập cấu hình mới cho các luồng xử lý và giám sát tương ứng trong thời gian thực.
- Nhật ký hoạt động (Audit Log) ghi nhận chi tiết thông tin hành động thay đổi tham số cấu hình của tác nhân (bao gồm tài khoản thực hiện, thời gian, tên cấu hình và giá trị cũ/mới).
- Nếu tác nhân hủy bỏ thay đổi hoặc rời trang khi chưa lưu, dữ liệu cấu hình của hệ thống được khôi phục về trạng thái hợp lệ trước đó.

#### 6. Ngoại lệ
- Lỗi kết nối mạng (Network Timeout) hoặc mất kết nối đến máy chủ API trong quá trình gửi yêu cầu lưu thay đổi.
- Lỗi ghi nhận cơ sở dữ liệu (Database Save Failure) khiến cấu hình mới không thể lưu trữ.
- Xảy ra xung đột cập nhật dữ liệu (Concurrency Update Alert) khi có hai tác nhân cùng thực hiện thay đổi và lưu cấu hình chung tại một thời điểm.
- Phiên làm việc của tác nhân hết hạn (Session Timeout) khiến yêu cầu lưu dữ liệu cấu hình bị hệ thống từ chối.

#### 7. Các yêu cầu đặc biệt
- Giao diện phải được thiết kế theo dạng khối tách biệt (Card-based layout) đảm bảo tính mở rộng cao để dễ dàng tích hợp các phân khu cấu hình phụ sau này mà không làm ảnh hưởng đến cấu trúc trang.
- Hệ thống phải kiểm tra tính hợp lệ của tất cả dữ liệu nhập vào (như giới hạn số lượng, kiểu dữ liệu, các ràng buộc điều kiện) theo thời gian thực (inline validation) trước khi gửi yêu cầu lưu.
- Đảm bảo tính bảo mật dữ liệu cấu hình, chỉ cho phép các tài khoản có quyền truy cập hợp lệ mới có thể xem hoặc thay đổi cài đặt.

### 5.3. Đặc tả các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **General** / **Integrations**<br>(Menu Left Sidebar) | Button (Menu) | - Cho phép người dùng điều hướng qua lại giữa các tab chức năng cài đặt của hệ thống EDR.<br>- **Trạng thái mặc định:** Mục `General` ở trạng thái Active (hiển thị màu chữ xanh dương sáng), mục `Integrations` ở trạng thái Inactive.<br>- **Hành vi khi nhấn:**<br>1. Click mục `General`: Giữ nguyên ở màn hình Cấu hình chung và tải lại các thông tin cài đặt chung của hệ thống.<br>2. Click mục `Integrations`: Nếu form General đang có thay đổi chưa lưu, hệ thống hiển thị modal Cảnh báo dữ liệu chưa lưu (Mục 6.1). Nếu không có thay đổi, điều hướng sang màn hình Danh sách Nguồn Tích Hợp. |
| **2** | **General Settings**<br>(Tiêu đề trang) | Label | - Cho phép người dùng theo dõi tiêu đề của trang cài đặt hiện tại.<br>- **Nội dung hiển thị:** General Settings<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **3** | **Alert Merging Settings**<br>(Tiêu đề phân khu cấu hình) | Label | - Cho phép người dùng nhận diện khu vực cấu hình gộp cảnh báo tự động. Phân khu này được đặt trong một khối hiển thị (Card) độc lập để phân biệt rõ ràng với các phân khu khác sẽ thêm mới trong tương lai.<br>- **Nội dung hiển thị:** Alert Merging Settings<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **4** | **Cấu hình gộp cảnh báo**<br>(Dòng giải thích nghiệp vụ) | Label | - Cho phép người dùng đọc hiểu mô tả nghiệp vụ của phân khu cấu hình gộp cảnh báo lặp lại.<br>- **Nội dung hiển thị:** Configure the time constraints for automatically grouping duplicate alerts.<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **5** | **Maximum Group Duration (T_max)**<br>(Số lượng) | Input Number | - Người dùng bắt buộc nhập vào giá trị thời gian sống tối đa của một nhóm gộp tính từ cảnh báo đầu tiên (`first_seen`) đến cảnh báo hiện tại.<br>- **Giá trị mặc định:** `24`<br>- **Kiểu dữ liệu số:** Số nguyên (Integer).<br>- **Khoảng giá trị cho phép:**<br>&nbsp;&nbsp;+ Min: >= 1<br>&nbsp;&nbsp;+ Max: <= 9999<br>- **Quy tắc Nghiệp vụ:**<br>1. Hệ thống tự động chặn nhập tất cả các ký tự không phải số.<br>2. Giá trị tại trường này bắt buộc phải lớn hơn hoặc bằng giá trị cấu hình tại trường `Sliding Time Window (T_sliding)`.<br>- **Thông báo lỗi tương ứng:**<br>+ Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường: `"T_max là bắt buộc!"` (`"T_max is required!"`)<br>+ Nhỏ hơn Min hoặc lớn hơn Max: Hiển thị lỗi inline màu đỏ ngay dưới trường: `"Giá trị phải nằm trong khoảng từ 1 đến 9999!"` (`"Value must be between 1 and 9999!"`)<br>+ Nhỏ hơn T_sliding: Hiển thị lỗi inline màu đỏ ngay dưới trường: `"Thời gian tối đa của nhóm gộp phải lớn hơn hoặc bằng khoảng cách gộp trượt (T_sliding)!"` (`"Maximum group duration must be greater than or equal to Sliding time window (T_sliding)!"`) |
| **6** | **T_max Unit**<br>(Đơn vị thời gian T_max) | Dropdown (Single-select) | - Cho phép người dùng chọn đơn vị thời gian cho cấu hình $T_{max}$.<br>- **Nguồn dữ liệu cố định:**<br>&nbsp;&nbsp;+ Minutes (Phút)<br>&nbsp;&nbsp;+ Hours (Giờ)<br>&nbsp;&nbsp;+ Days (Ngày)<br>- **Giá trị mặc định:** `Hours` (Giờ).<br>- **Quy tắc Nghiệp vụ:** Khi thay đổi đơn vị, hệ thống tự động lưu giữ giá trị đơn vị được chọn và gửi lên API khi nhấn Save.<br>- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định). |
| **7** | **Sliding Time Window (T_sliding)**<br>(Số lượng) | Input Number | - Người dùng bắt buộc nhập vào giá trị khoảng cách thời gian trượt tối đa giữa cảnh báo gần nhất trong nhóm (`last_seen`) đến cảnh báo đang xét.<br>- **Giá trị mặc định:** `1`<br>- **Kiểu dữ liệu số:** Số nguyên (Integer).<br>- **Khoảng giá trị cho phép:**<br>&nbsp;&nbsp;+ Min: >= 1<br>&nbsp;&nbsp;+ Max: <= 9999<br>- **Quy tắc Nghiệp vụ:**<br>1. Hệ thống tự động chặn nhập tất cả các ký tự không phải số.<br>2. Giá trị tại trường này bắt buộc phải nhỏ hơn hoặc bằng giá trị cấu hình tại trường `Maximum Group Duration (T_max)`.<br>- **Thông báo lỗi tương ứng:**<br>+ Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường: `"T_sliding là bắt buộc!"` (`"T_sliding is required!"`)<br>+ Nhỏ hơn Min hoặc lớn hơn Max: Hiển thị lỗi inline màu đỏ ngay dưới trường: `"Giá trị phải nằm trong khoảng từ 1 đến 9999!"` (`"Value must be between 1 and 9999!"`) |
| **8** | **T_sliding Unit**<br>(Đơn vị thời gian T_sliding) | Dropdown (Single-select) | - Cho phép người dùng chọn đơn vị thời gian cho cấu hình $T_{sliding}$.<br>- **Nguồn dữ liệu cố định:**<br>&nbsp;&nbsp;+ Minutes (Phút)<br>&nbsp;&nbsp;+ Hours (Giờ)<br>- **Giá trị mặc định:** `Hours` (Giờ).<br>- **Quy tắc Nghiệp vụ:** Khi thay đổi đơn vị, hệ thống tự động lưu giữ giá trị đơn vị được chọn và gửi lên API khi nhấn Save.<br>- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định). |
| **9** | **Save Changes**<br>(Nút Lưu cấu hình) | Button | - Cho phép người dùng thực hiện lưu lại toàn bộ cấu hình thời gian gộp cảnh báo vừa tùy chỉnh lên hệ thống.<br>- **Trạng thái mặc định:** Enabled.<br>- **Hành vi khi nhấn (OnClick Event):**<br>Khi người dùng nhấn Save Changes, hệ thống thực hiện kiểm tra tính hợp lệ dữ liệu:<br>+ Nếu thông tin không hợp lệ: Hiển thị các thông báo lỗi inline tương ứng dưới từng trường dữ liệu không hợp lệ.<br>+ Nếu dữ liệu hợp lệ:<br>&nbsp;&nbsp;. Hệ thống chuyển nút sang trạng thái Loading (hiển thị spinner xoay tròn, disable nút và các trường cấu hình). Trạng thái disable này chỉ mở khóa sau khi nhận được phản hồi kết quả từ máy chủ.<br>&nbsp;&nbsp;. Nếu lưu thành công: Giữ nguyên tại trang cấu hình General, mở khóa các trường dữ liệu và hiển thị toast message tự động đóng: `"Cập nhật cấu hình thành công!"` (`"Settings updated successfully!"`).<br>&nbsp;&nbsp;. Nếu lưu thất bại: Hiển thị toast message tự động đóng: `"Cập nhật cấu hình không thành công!"` (`"Failed to update settings!"`). |

---

## 6. ĐẶC TẢ CẢNH BÁO CHƯA LƯU KHI THOÁT FORM (GENERAL SETTINGS)

### 6.1. Hộp thoại cảnh báo chưa lưu dữ liệu cấu hình
Hộp thoại xuất hiện khi Analyst thực hiện thay đổi giá trị cấu hình tại tab General (như thay đổi số lượng hoặc đơn vị của $T_{max}$ hay $T_{sliding}$) nhưng click điều hướng sang tab khác (ví dụ: `Integrations`) hoặc chuyển trang mà chưa nhấn nút `Save Changes`.

- **Tên Modal:** Hộp thoại cảnh báo chưa lưu thay đổi
- **Tiêu đề (Header):** `"Thông tin chưa được lưu"` (`"Unsaved changes"`)
- **Nội dung thông báo (Body text):** `"Các thay đổi cấu hình cài đặt chung của bạn chưa được lưu lại. Bạn có chắc chắn muốn rời đi và hủy bỏ các thay đổi này không?"` (`"The changes you made to general settings have not been saved. Are you sure you want to leave and discard these changes?"`)
- **Nút Xác nhận rời đi (Confirm Button):**
  - Nhãn nút: `"Hủy thay đổi và Rời đi"` (`"Discard and Leave"`)
  - Hành vi khi nhấn: Đóng modal này và đóng tab General, điều hướng người dùng sang tab/trang mới mà người dùng đã click chọn trước đó, đồng thời hủy bỏ toàn bộ các thay đổi chưa được lưu.
- **Nút Hủy/Giữ lại (Cancel Button):**
  - Nhãn nút: `"Giữ lại và Chỉnh sửa"` (`"Keep editing"`)
  - Hành vi khi nhấn: Đóng modal này, giữ nguyên giao diện cấu hình tab General cùng các giá trị đang chỉnh sửa dở dang để người dùng tiếp tục thao tác hoặc nhấn Lưu.
- **Hành vi khi click vùng ngoài Modal:** Không đóng hộp thoại cảnh báo.
