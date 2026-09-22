# ĐẶC TẢ CHI TIẾT CHỨC NĂNG: XEM DANH SÁCH KỊCH BẢN (SCENARIO LIST MANAGEMENT)

Tài liệu này đặc tả chi tiết giao diện và luồng xử lý của tính năng **Xem danh sách kịch bản** thuộc hệ thống OSINT AI Automation. Tính năng bao gồm 3 không gian làm việc tương tác (Bố cục 3 Cột): Cột 1 - Danh sách & Tìm kiếm Kịch bản, Cột 2 - Sub-menu Danh sách Ngày (dành cho Kịch bản lộ trình), và Cột 3 - Danh sách Khung giờ / Lượt chạy và các Hành động thực thi trong Ngày.

Tài liệu được soạn thảo tuân thủ nghiêm ngặt theo tiêu chuẩn đặc tả giao diện **`srs_ui_component_writer`**.

---

## 1. THÔNG TIN CHUNG

- **Tên màn hình/Giao diện:** Xem danh sách kịch bản (Scenario List Management Workspace)
- **Loại giao diện:** Màn hình làm việc dạng Bố cục 3 Cột (3-Column Workspace)
- **Mô tả nghiệp vụ:** Cho phép Quản trị viên xem kho kịch bản nuôi nick, lọc kịch bản theo loại (*Tất cả*, *Kịch bản đơn*, *Kịch bản lộ trình*), tìm kiếm kịch bản theo tên; xem danh sách Ngày đối với Kịch bản lộ trình; và xem chi tiết danh sách các Khung giờ / Lượt chạy (Slots) được thiết lập trong từng Ngày kèm các bước hành động tự động hóa tương ứng.

---

## 2. ĐẶC TẢ CHI TIẾT CÁC THÀNH PHẦN GIAO DIỆN (UI COMPONENTS)

Toàn bộ các thành phần hiển thị và tương tác trên màn hình được tổng hợp trong Bảng đặc tả tập trung dưới đây:

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Quản Lý Kịch Bản**<br>(Tiêu đề trang) | Label | - Tiêu đề chính của màn hình, hiển thị tên mô tả tính năng quản lý kịch bản.<br>- **Nội dung hiển thị mặc định:** Quản Lý Kịch Bản (`Scenario Management`)<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **2** | **Kịch bản [N]**<br>(Tổng số kịch bản) | Label / Badge | - Hiển thị tổng số lượng kịch bản hiện có trong kho dữ liệu tương ứng với kết quả lọc.<br>- **Nội dung hiển thị:** Kịch bản `[Số lượng]` (Ví dụ: `Kịch bản 4` - `4 Scenarios`)<br>- **Tính chất hiển thị:** Động (Dynamic - cập nhật tự động khi thêm, xóa hoặc lọc kịch bản). |
| **3** | **+ (Tạo mới kịch bản)**<br>(Nút tạo kịch bản) | Button | - Cho phép người dùng mở Popup Tạo mới kịch bản.<br>- **Vị trí:** Góc trên bên phải của Cột 1 (Danh sách kịch bản).<br>- **Trạng thái mặc định:** Enabled<br>- **Quyền hạn truy cập:** Tất cả Quản trị viên có quyền quản lý kịch bản.<br>- **Hành vi khi nhấn (OnClick Event):**<br>&nbsp;&nbsp;+ Hệ thống mở Popup "Tạo mới kịch bản" với ô tên kịch bản rỗng, mặc định chọn kênh Facebook và loại "Kịch bản đơn". |
| **4** | **Tìm kiếm tên kịch bản...**<br>(Thanh tìm kiếm) | Searchbox | - Cho phép người dùng nhập từ khóa để tìm kiếm nhanh kịch bản theo tên.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Tìm kiếm tên kịch bản...<br>&nbsp;&nbsp;+ EN: Search scenario name...<br>- **Giá trị mặc định:** Trống<br>- **Giới hạn ký tự:** Tối đa 100 ký tự.<br>- **Quy tắc Nghiệp vụ:**<br>1. Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi lọc.<br>2. Hệ thống áp dụng cơ chế tìm kiếm thời gian thực (Real-time filtering), tự động lọc danh sách kịch bản hiển thị ở Cột 1 ngay khi người dùng gõ từ khóa (không phân biệt chữ hoa hay chữ thường).<br>3. Nếu từ khóa tìm kiếm không khớp với bất kỳ kịch bản nào, Cột 1 hiển thị trạng thái danh sách trống và đếm số lượng là 0. |
| **5** | **Tab Loại kịch bản**<br>(Bộ lọc Tab) | Filter Tabs | - Cho phép người dùng chuyên đổi bộ lọc danh sách kịch bản theo từng loại kịch bản cụ thể.<br>- **Danh sách các Tab:**<br>&nbsp;&nbsp;+ Tất cả (`All`): Hiển thị toàn bộ kịch bản.<br>&nbsp;&nbsp;+ Kịch bản đơn (`Recurring`): Chỉ hiển thị các kịch bản thực thi theo phiên lặp định kỳ.<br>&nbsp;&nbsp;+ Lộ trình (`Roadmap`): Chỉ hiển thị các kịch bản thực thi phân rã theo lộ trình nhiều ngày.<br>- **Giá trị mặc định:** Tab "Tất cả"<br>- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định). |
| **6** | **Thẻ Kịch bản**<br>(Scenario Card Item) | Card / Datatable Item | - Hiển thị thông tin tóm tắt của từng kịch bản trong danh sách ở Cột 1.<br>- **Thông tin hiển thị trên thẻ:**<br>&nbsp;&nbsp;+ **Tên kịch bản:** Tên mô tả của kịch bản.<br>&nbsp;&nbsp;+ **Badge AI (🤖 AI):** Hiển thị nếu kịch bản được tạo tự động bởi AI.<br>&nbsp;&nbsp;+ **Tag Loại kịch bản:** Tag màu xanh lục `🔄 Kịch bản đơn` hoặc Tag màu tím `📅 Lộ trình (N ngày)`.<br>&nbsp;&nbsp;+ **Tổng số hành động:** Hiển thị tổng số bước hành động dạng `[N] hành động` (Ví dụ: `5 hành động` - `5 actions`).<br>&nbsp;&nbsp;+ **Nút công cụ trên thẻ:** Icon `✏️` (Chỉnh sửa kịch bản) và Icon `🗑️` (Xóa kịch bản).<br>- **Hành vi khi nhấn vào thẻ (OnClick Event):**<br>&nbsp;&nbsp;+ Thẻ chuyển sang trạng thái Active (viền xanh đậm, nền xanh nhạt).<br>&nbsp;&nbsp;+ Nếu kịch bản thuộc loại **Kịch bản lộ trình**: Hiển thị Sub-menu danh sách các Ngày ở Cột 2 và hiển thị các Lượt chạy của Ngày 1 ở Cột 3.<br>&nbsp;&nbsp;+ Nếu kịch bản thuộc loại **Kịch bản đơn**: Ẩn Cột 2 và hiển thị trực tiếp bảng danh sách hành động của kịch bản đơn ở Cột 3. |
| **7** | **✏️ (Sửa kịch bản trên thẻ)**<br>(Nút sửa kịch bản) | Button / Icon | - Cho phép người dùng mở Popup Chỉnh sửa thông tin cho kịch bản tương ứng.<br>- **Vị trí:** Góc trên bên phải của từng Thẻ Kịch bản ở Cột 1.<br>- **Hành vi khi nhấn (OnClick Event):**<br>1. Hệ thống mở Popup "Chỉnh sửa kịch bản [Tên kịch bản]".<br>2. Tự động điền Tên kịch bản và Kênh nền tảng hiện tại lên form.<br>3. Trường "Kênh nền tảng" (mặc định Facebook) và trường "Loại kịch bản" tự động bị KHÓA (Disabled) không cho phép thay đổi. |
| **8** | **🗑️ (Xóa kịch bản trên thẻ)**<br>(Nút xóa kịch bản) | Button / Icon | - Cho phép người dùng xóa kịch bản khỏi hệ thống.<br>- **Vị trí:** Góc trên bên phải của từng Thẻ Kịch bản ở Cột 1.<br>- **Quy tắc Nghiệp vụ:**<br>1. Kiểm tra trạng thái gán kịch bản trước khi xóa. Nếu kịch bản ĐÃ ĐƯỢC GÁN cho ít nhất 1 tài khoản ảo, hệ thống chặn không cho xóa và hiển thị cảnh báo: `"⚠️ KHÔNG THỂ XÓA: Kịch bản này đang được gán cho tài khoản ảo! Vui lòng gỡ kịch bản khỏi tất cả tài khoản ảo trước khi xóa."` (`"⚠️ CANNOT DELETE: This scenario is assigned to virtual accounts! Please unassign it first."`).<br>2. Nếu kịch bản chưa được gán cho tài khoản nào: Bắt buộc hiển thị Hộp thoại xác nhận xóa kịch bản. |
| **9** | **Danh sách Ngày ([N])**<br>(Tiêu đề Cột 2 Sub-menu) | Label | - Hiển thị tiêu đề không gian quản lý danh sách Ngày của Kịch bản lộ trình.<br>- **Điều kiện hiển thị:** Chỉ hiển thị ở Cột 2 khi kịch bản đang chọn là Kịch bản lộ trình.<br>- **Nội dung hiển thị:** Danh sách Ngày `([Số lượng ngày])` (Ví dụ: `Danh sách Ngày (30)` - `Days List (30)`)<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **10** | **Nút chọn Ngày trong Sub-menu**<br>(Day Item Button) | Button / List Item | - Cho phép người dùng chuyển đổi xem chi tiết các Lượt chạy và hành động của từng Ngày trong lộ trình.<br>- **Điều kiện hiển thị:** Nằm ở Cột 2 Sub-menu khi chọn Kịch bản lộ trình.<br>- **Thông tin hiển thị trên nút:**<br>&nbsp;&nbsp;+ Tên Ngày (Ví dụ: `Ngày 1`, `Ngày 2`...).<br>&nbsp;&nbsp;+ Các mốc giờ chạy dạng tóm tắt: `⏰ 09:12, 15:04, 19:23`.<br>&nbsp;&nbsp;+ Badge tổng số lượt: `[N] lượt` (Ví dụ: `3 lượt` - `3 slots`).<br>&nbsp;&nbsp;+ Icon nút xóa Ngày `🗑️` (xuất hiện khi rê chuột hover vào nút Ngày).<br>- **Hành vi khi nhấn (OnClick Event):**<br>&nbsp;&nbsp;+ Nút Ngày chuyển sang trạng thái Active (nền xanh blue đậm, chữ trắng).<br>&nbsp;&nbsp;+ Cột 3 lập tức tải và hiển thị danh sách các Thẻ Lượt chạy của Ngày được chọn. |
| **11** | **🗑️ (Xóa Ngày trên nút)**<br>(Nút xóa Ngày) | Button / Icon | - Cho phép người dùng xóa một Ngày khỏi kịch bản lộ trình.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi rê chuột hover vào nút Ngày ở Cột 2.<br>- **Quy tắc Nghiệp vụ:**<br>1. Kiểm tra trạng thái gán kịch bản: Nếu kịch bản lộ trình này ĐÃ ĐƯỢC GÁN cho tài khoản ảo, hệ thống chặn xóa và hiển thị thông báo: `"⚠️ RÀNG BUỘC SẢN PHẨM: Kịch bản lộ trình này đang được gán cho tài khoản ảo. Bạn không thể xóa bớt ngày của kịch bản đã gán!"`.<br>2. Nếu kịch bản chưa gán: Hiển thị Hộp thoại xác nhận xóa Ngày. Khi xác nhận xóa, hệ thống tự động đánh lại số thứ tự các Ngày còn lại (Ngày 1, Ngày 2...). |
| **12** | **+ Thêm Ngày mới**<br>(Nút thêm Ngày lộ trình) | Button | - Cho phép người dùng thêm một Ngày mới vào cuối lộ trình nuôi nick.<br>- **Vị trí:** Chân Cột 2 (Sub-menu danh sách Ngày).<br>- **Trạng thái mặc định:** Enabled<br>- **Quy tắc Nghiệp vụ:**<br>1. Kiểm tra trạng thái gán kịch bản: Nếu kịch bản lộ trình ĐÃ ĐƯỢC GÁN cho tài khoản ảo, hệ thống chặn thêm mới và hiển thị thông báo: `"⚠️ RÀNG BUỘC SẢN PHẨM: Kịch bản lộ trình này đang được gán cho tài khoản ảo. Bạn không thể thêm mới ngày để tránh xung đột tiến trình nuôi nick!"`.<br>2. Nếu kịch bản chưa gán: Hệ thống tạo thêm `Ngày N+1` chứa Lượt 1 mặc định lúc `08:30` và tự động chọn Ngày N+1. |
| **13** | **Chi tiết Ngày / Kịch bản**<br>(Tiêu đề Header Cột 3) | Label | - Hiển thị tiêu đề thông tin chi tiết kịch bản và Ngày đang chọn ở Cột 3.<br>- **Nội dung hiển thị:**<br>&nbsp;&nbsp;+ Kịch bản lộ trình: `[Tên kịch bản] ➔ Ngày [X]` (`Kênh: [Platform] \| Tổng lộ trình: [N] ngày ([M] lượt chạy • [K] hành động)`)<br>&nbsp;&nbsp;+ Kịch bản đơn: `[Tên kịch bản]` (`Kênh: [Platform] \| Loại: Kịch bản đơn`)<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **14** | **⏰ + Thêm lượt chạy**<br>(Nút thêm lượt chạy) | Button | - Cho phép người dùng mở Popup Thêm lượt chạy mới cho Ngày đang chọn.<br>- **Vị trí:** Góc trên bên phải Header Cột 3 (Chỉ hiển thị khi đang xem Kịch bản lộ trình).<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):**<br>&nbsp;&nbsp;+ Mở Popup "Thêm lượt chạy mới cho [Ngày X]". Ô chọn thời gian tự động gợi ý mốc giờ ngẫu nhiên hợp lệ (cách các lượt trước đó ≥ 30 phút). |
| **15** | **Thẻ Lượt Chạy**<br>(Execution Slot Card) | Card Block | - Hiển thị thông tin khung giờ chạy và bảng danh sách các bước hành động thực thi trong lượt đó.<br>- **Điều kiện hiển thị:** Nằm ở khu vực làm việc Cột 3 khi chọn Kịch bản lộ trình.<br>- **Thông tin Header Thẻ:**<br>&nbsp;&nbsp;+ Tiêu đề Lượt: `⏰ Lượt [K]` (Ví dụ: `⏰ Lượt 1`).<br>&nbsp;&nbsp;+ Badge mốc giờ: `[HH:mm]` (Ví dụ: `09:12`).<br>&nbsp;&nbsp;+ Icon `✏️` (Sửa giờ lượt chạy).<br>&nbsp;&nbsp;+ Nút `+ Thêm hành động` (Thêm bước vào lượt này).<br>&nbsp;&nbsp;+ Icon `🗑️` (Xóa lượt chạy). |
| **16** | **✏️ (Sửa giờ lượt chạy)**<br>(Icon sửa giờ Lượt) | Button / Icon | - Cho phép người dùng chỉnh sửa mốc thời gian thực thi của Lượt chạy tương ứng.<br>- **Vị trí:** Phía trên Header của từng Thẻ Lượt Chạy ở Cột 3.<br>- **Hành vi khi nhấn (OnClick Event):**<br>&nbsp;&nbsp;+ Mở Popup "Sửa giờ [Lượt K] cho Ngày X" với ô chọn giờ điền sẵn thời gian `HH:mm` hiện tại của Lượt. |
| **17** | **+ Thêm hành động (trên Lượt)**<br>(Nút thêm hành động Lượt) | Button | - Cho phép người dùng mở Modal chọn hành động để bổ sung vào Lượt chạy tương ứng.<br>- **Vị trí:** Bên phải Header của từng Thẻ Lượt Chạy ở Cột 3.<br>- **Hành vi khi nhấn (OnClick Event):**<br>&nbsp;&nbsp;+ Mở Modal "Chọn hành động" với danh mục phân loại (Tương tác, Kết bạn, Đăng bài, Seeding, Đổi thông tin). Khi chọn 1 hành động, hành động đó được lưu trực tiếp vào Thẻ Lượt Chạy này. |
| **18** | **🗑️ (Xóa lượt chạy)**<br>(Icon xóa Lượt) | Button / Icon | - Cho phép người dùng xóa một Lượt chạy khỏi Ngày.<br>- **Vị trí:** Phía trên Header của từng Thẻ Lượt Chạy ở Cột 3.<br>- **Quy tắc Nghiệp vụ:**<br>1. Mỗi Ngày phải duy trì tối thiểu 1 Lượt chạy. Nếu Ngày chỉ có 1 Lượt duy nhất, hệ thống chặn xóa và hiển thị cảnh báo: `"⚠️ Mỗi Ngày phải giữ lại tối thiểu 1 lượt chạy!"`.<br>2. Nếu Ngày có từ 2 Lượt trở lên: Bắt buộc hiển thị Hộp thoại xác nhận xóa Lượt chạy. Sau khi xóa, hệ thống tự động đánh lại số thứ tự Lượt (Lượt 1, Lượt 2...). |
| **19** | **Bảng danh sách Hành động**<br>(Actions Data Table) | Datatable | - Hiển thị danh sách các bước hành động thực thi tự động trong Kịch bản đơn hoặc trong từng Lượt chạy của Kịch bản lộ trình.<br>- **Đặc tả các cột dữ liệu:**<br>&nbsp;&nbsp;+ **STT:** Hiển thị số thứ tự bước (1, 2, 3...).<br>&nbsp;&nbsp;+ **Tên Hành Động:** Hiển thị tên cụ thể của hành động (Ví dụ: `Đọc thông báo`, `Tương tác Newsfeed`, `Kết bạn theo gợi ý`...).<br>&nbsp;&nbsp;+ **Loại Tương Tác:** Hiển thị Tag phân loại nhóm tương tác (Ví dụ: `Tương tác`, `Kết bạn`, `Đăng bài`...).<br>&nbsp;&nbsp;+ **Chức Năng:** Hiển thị 2 nút công cụ cho từng dòng: Icon **`✏️`** (Chỉnh sửa hành động) và Icon **`🗑️`** (Xóa hành động khỏi bảng). |
| **20** | **✏️ (Sửa hành động trong bảng)**<br>(Icon sửa bước hành động) | Button / Icon | - Cho phép người dùng mở giao diện chỉnh sửa tham số cấu hình chi tiết cho bước hành động tương ứng.<br>- **Vị trí:** Cột "Chức Năng" của từng dòng hành động trong bảng dữ liệu.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):**<br>&nbsp;&nbsp;+ Hệ thống mở Popup cấu hình tham số tương tác chi tiết cho bước hành động đó. |
| **21** | **🗑️ (Xóa hành động trong bảng)**<br>(Icon xóa bước hành động) | Button / Icon | - Cho phép người dùng loại bỏ bước hành động khỏi Lượt chạy hoặc khỏi Kịch bản đơn.<br>- **Vị trí:** Cột "Chức Năng" của từng dòng hành động trong bảng dữ liệu.<br>- **Hành vi khi nhấn (OnClick Event):**<br>&nbsp;&nbsp;+ Hệ thống lập tức xóa dòng hành động đó khỏi bảng và tự động đánh lại STT các dòng còn lại mà không cần mở Popup xác nhận. |

---

## 3. ĐẶC TẢ HỘP THOẠI POPUP ĐI KÈM (POPUPS & CONFIRMATION MODALS)

### 3.1. Popup Thêm / Sửa mốc thời gian Lượt chạy (Modal Slot Time)

- **Tên Modal:** Thiết lập thời gian Lượt chạy (Slot Time Config)
- **Tiêu đề (Header):** `"Thêm lượt chạy mới cho [Ngày X]"` (`"Add new execution slot for [Day X]"`) HOẶC `"Sửa giờ [Lượt K] cho Ngày X"` (`"Edit time for [Slot K] of Day X"`)
- **Các thành phần nhập liệu:**

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Thời điểm chạy trong ngày (HH:mm)** | Timepicker | - Người dùng bắt buộc chọn mốc thời gian thực thi cho Lượt chạy.<br>- **Định dạng hiển thị:** `HH:mm` (24 giờ)<br>- **Giá trị mặc định:** Tự động sinh ngẫu nhiên mốc giờ hợp lệ (cách các lượt trước đó ≥ 30 phút).<br>- **Quy tắc Nghiệp vụ (Validation 30 phút):**<br>Thời điểm của các Lượt chạy trong cùng một Ngày phải cách nhau **tối thiểu 30 phút**.<br>- **Thông báo lỗi tương ứng:**<br>+ Trống: Hiển thị lỗi inline màu đỏ ngay dưới ô nhập: `"Vui lòng chọn mốc thời gian!"` (`"Please select a time!"`)<br>+ Vi phạm khoảng cách 30 phút: Hiển thị lỗi inline màu đỏ ngay dưới ô nhập: `"⚠️ Thời điểm giữa các lượt chạy trong cùng một ngày phải cách nhau tối thiểu 30 phút! Vui lòng chọn mốc giờ khác."` (`"⚠️ Execution times within the same day must be at least 30 minutes apart! Please select another time."`) |
| **2** | **Hủy** | Button | - Nút hủy bỏ thao tác và đóng Popup.<br>- **Hành vi khi nhấn:** Đóng Popup, giữ nguyên mốc giờ và danh sách Lượt chạy hiện tại. |
| **3** | **Lưu lượt chạy** | Button | - Nút lưu mốc thời gian của Lượt chạy.<br>- **Hành vi khi nhấn:** Kiểm tra tính hợp lệ của mốc giờ. Nếu vi phạm quy tắc 30 phút, hiển thị dòng thông báo lỗi inline màu đỏ. Nếu hợp lệ, lưu Lượt chạy, sắp xếp lại các Lượt chạy theo thứ tự thời gian tăng dần trong Ngày và đóng Popup. |

---

### 3.2. Hộp thoại xác nhận Xóa Kịch bản (Confirm Delete Scenario)

- **Tên Modal:** Hộp thoại xác nhận xóa kịch bản
- **Tiêu đề (Header):** `"Xác nhận xóa kịch bản"` (`"Confirm scenario deletion"`)
- **Nội dung thông báo (Body text):** `"Bạn có chắc chắn muốn xóa kịch bản [Tên kịch bản] này không? Hành động này không thể hoàn tác."` (`"Are you sure you want to delete scenario [Scenario Name]? This action cannot be undone."`)
- **Nút Xác nhận (Confirm Button):**
  - Nhãn nút: `"Xóa"` (`"Delete"`)
  - Hành vi khi nhấn: Hệ thống chuyển nút sang trạng thái Loading, xóa kịch bản khỏi cơ sở dữ liệu, đóng Modal, xóa thẻ kịch bản khỏi Cột 1 và hiển thị Toast Message: `"Xóa kịch bản thành công!"` (`"Scenario deleted successfully!"`).
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`) hoặc click icon `x`.
  - Hành vi khi nhấn: Đóng hộp thoại xác nhận, giữ nguyên kịch bản.

---

### 3.3. Hộp thoại xác nhận Xóa Ngày trong Kịch bản Lộ trình (Confirm Delete Day)

- **Tên Modal:** Hộp thoại xác nhận xóa Ngày lộ trình
- **Tiêu đề (Header):** `"Xác nhận xóa Ngày"` (`"Confirm day deletion"`)
- **Nội dung thông báo (Body text):** `"Bạn có chắc chắn muốn xóa Ngày [X] khỏi lộ trình không? Toàn bộ các lượt chạy và hành động thuộc Ngày này sẽ bị xóa theo."` (`"Are you sure you want to delete Day [X] from the roadmap? All slots and actions in this day will be removed."`)
- **Nút Xác nhận (Confirm Button):**
  - Nhãn nút: `"Xóa Ngày"` (`"Delete Day"`)
  - Hành vi khi nhấn: Hệ thống xóa Ngày khỏi lộ trình, tự động đánh số thứ tự lại các Ngày còn lại (Ngày 1, Ngày 2...), đóng Modal và hiển thị Toast Message: `"Xóa Ngày thành công!"` (`"Day deleted successfully!"`).
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`) hoặc click icon `x`.
  - Hành vi khi nhấn: Đóng hộp thoại, giữ nguyên Ngày.

---

### 3.4. Hộp thoại xác nhận Xóa Lượt chạy (Confirm Delete Slot)

- **Tên Modal:** Hộp thoại xác nhận xóa Lượt chạy
- **Tiêu đề (Header):** `"Xác nhận xóa Lượt chạy"` (`"Confirm slot deletion"`)
- **Nội dung thông báo (Body text):** `"Bạn có chắc chắn muốn xóa Lượt chạy này khỏi Ngày [X] không?"` (`"Are you sure you want to delete this execution slot from Day [X]?"`)
- **Nút Xác nhận (Confirm Button):**
  - Nhãn nút: `"Xóa"` (`"Delete"`)
  - Hành vi khi nhấn: Hệ thống xóa Thẻ Lượt chạy khỏi Ngày, tự động đánh lại thứ tự Lượt (Lượt 1, Lượt 2...), đóng Modal và cập nhật giao diện Cột 3.
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`) hoặc click icon `x`.
  - Hành vi khi nhấn: Đóng hộp thoại, giữ nguyên Lượt chạy.
