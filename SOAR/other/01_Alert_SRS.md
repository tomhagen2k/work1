# ĐẶC TẢ CHI TIẾT TÍNH NĂNG QUẢN LÝ CẢNH BÁO (ALERTS)

Tài liệu này đặc tả chi tiết các tính năng quản lý Cảnh báo trên hệ thống SOAR, bao gồm chức năng Xem danh sách cảnh báo và Xem chi tiết cảnh báo.

---

## 1. CHỨC NĂNG: XEM DANH SÁCH CẢNH BÁO

### 1.1. Thông tin chung chức năng

| Tiêu chí | Nội dung |
| :--- | :--- |
| **1. Tên chức năng** | Xem danh sách cảnh báo |
| **2. Mô tả** | Tính năng này cho phép người dùng xem danh sách toàn bộ các cảnh báo (alerts) được thu thập từ các nguồn tích hợp khác nhau trong hệ thống SOAR. Người dùng có thể tìm kiếm, lọc cảnh báo theo thời gian, khách hàng, trạng thái, mức độ và thực hiện các thao tác nhanh (như tạo sự việc, gán vào sự việc, đánh dấu giả) đối với nhiều cảnh báo cùng lúc. |
| **3. Tác nhân** | Người dùng (User) / Quản trị viên (Admin) |
| **4. Điều kiện trước** | - Người dùng đã đăng nhập vào hệ thống SOAR.<br>- Người dùng được phân quyền truy cập vào chức năng Cảnh báo. |
| **5. Điều kiện sau** | - Hiển thị danh sách cảnh báo tương ứng với bộ lọc hoặc từ khóa tìm kiếm. |
| **6. Ngoại lệ** | - Lỗi kết nối mạng hoặc máy chủ không phản hồi: Hiển thị thông báo "Không thể tải dữ liệu cảnh báo, vui lòng thử lại sau".<br>- Khi thực hiện hành động trên thanh thao tác hàng loạt nhưng một trong các cảnh báo đã thay đổi trạng thái bởi người dùng khác: Thông báo "Một số cảnh báo đã thay đổi trạng thái, vui lòng tải lại trang". |
| **7. Các yêu cầu đặc biệt** | - Dữ liệu hiển thị phải hỗ trợ phân trang để đảm bảo tốc độ tải trang.<br>- **Phân quyền dữ liệu:** Danh sách cảnh báo phải được hiển thị dựa trên phân quyền của người dùng (người dùng chỉ nhìn thấy các cảnh báo thuộc tenant/hệ thống mà họ được phép quản lý).<br>- Các bộ lọc và tìm kiếm cần có độ trễ tải (debounce) khi nhập ký tự để tối ưu hiệu năng gọi API. |

### 1.2. Đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Tìm kiếm theo...**<br>(Thanh tìm kiếm) | Searchbox | - Cho phép người dùng nhập từ khóa tìm kiếm theo Mức độ, Nội dung cảnh báo.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Tìm kiếm theo: Mức độ, Nội dung...<br>&nbsp;&nbsp;+ EN: Search by: Severity, Content...<br>- **Giá trị mặc định:** Trống<br>- **Giới hạn ký tự:** Tối đa 255 ký tự.<br>- **Quy tắc Nghiệp vụ:**<br>1. Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi gọi API tìm kiếm.<br>2. Hệ thống tự động kích hoạt tìm kiếm sau 500ms kể từ khi người dùng ngừng gõ (Debounce). |
| **2** | **Bộ lọc**<br>(Icon Filter) | Button | - Cho phép người dùng mở sidebar chứa các bộ lọc nâng cao bên phải màn hình.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn:** Mở (slide in) thanh sidebar "BỘ LỌC" từ lề phải màn hình. |
| **3** | **Sidebar BỘ LỌC** | Sidebar / Drawer | - Chứa các trường lọc điều kiện chi tiết cho danh sách.<br>- **Tiêu đề:** `BỘ LỌC`<br>- **Nút Đóng (Icon X):** Cho phép đóng thanh sidebar bộ lọc. |
| **4** | **Thời gian**<br>(Trong sidebar) | Date Picker (Range) | - Cho phép người dùng lọc danh sách cảnh báo theo khoảng thời gian hệ thống ghi nhận.<br>- **Giá trị mặc định:** Trống (Lấy tất cả thời gian) hoặc một khoảng mặc định (vd: 7 ngày gần nhất).<br>- **Quy tắc Nghiệp vụ:** Khi chọn xong khoảng thời gian (Từ ngày - Đến ngày), hệ thống tự động tải lại bảng danh sách theo bộ lọc. |
| **4.1** | **Khách hàng**<br>(Trong sidebar) | Combobox | - Cho phép người dùng lọc danh sách cảnh báo theo khách hàng (tenant).<br>- **Nguồn dữ liệu:** Danh sách khách hàng mà người dùng có quyền quản lý.<br>- **Giá trị mặc định:** Tất cả<br>- **Chức năng tìm kiếm:** Có hỗ trợ tìm kiếm nhanh theo tên khách hàng.<br>- **Quy tắc Nghiệp vụ:** Khi thay đổi giá trị, hệ thống tự động tải lại bảng danh sách theo bộ lọc. |
| **5** | **Trạng thái**<br>(Trong sidebar) | Combobox (Single-select) | - Cho phép người dùng lọc danh sách cảnh báo theo trạng thái xử lý.<br>- **Nguồn dữ liệu:**<br>&nbsp;&nbsp;+ `New`<br>&nbsp;&nbsp;+ `Processing`<br>&nbsp;&nbsp;+ `Close`<br>- **Giá trị mặc định:** Mới + Đang xử lý.<br>- **Quy tắc Nghiệp vụ:** Khi thay đổi giá trị, hệ thống tự động tải lại bảng danh sách theo bộ lọc. |
| **6** | **Mức độ**<br>(Trong sidebar) | Combobox (Single-select) | - Cho phép người dùng lọc danh sách cảnh báo theo mức độ nghiêm trọng.<br>- **Nguồn dữ liệu:** Các mức độ cảnh báo (Low, Medium, High, Critical). Có thêm tùy chọn "Tất cả".<br>- **Giá trị mặc định:** Tất cả<br>- **Chức năng tìm kiếm:** Không<br>- **Quy tắc Nghiệp vụ:** Khi thay đổi giá trị, hệ thống tự động tải lại bảng danh sách theo bộ lọc. |
| **7** | **Làm mới**<br>(Icon refresh) | Button | - Cho phép người dùng làm mới (tải lại) dữ liệu của bảng danh sách cảnh báo.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn:** Hệ thống gọi lại API lấy danh sách mới nhất và cập nhật vào bảng. |
| **8** | **Thanh thao tác hàng loạt**<br>(Action Bar) | Label & Button | - Cho phép người dùng thực hiện các thao tác đối với các dòng cảnh báo đã chọn.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi có ít nhất một dòng trong bảng được tích chọn checkbox.<br>- **Thành phần con:**<br>1. **Label `[X] đã chọn`:** Hiển thị số lượng dòng đang chọn (X).<br>2. **Nút `x` (Hủy chọn):** Click để bỏ chọn tất cả các dòng hiện tại và ẩn thanh thao tác.<br>3. **Nút `Tạo sự việc`:** Click để tạo một case/sự việc mới từ các cảnh báo đã chọn.<br>4. **Nút `Gán vào sự việc`:** Click để gom các cảnh báo đã chọn vào một sự việc (case) đã tồn tại.<br>5. **Nút `Đánh dấu giả`:** Click để đánh dấu các cảnh báo đã chọn là cảnh báo giả (false positive). |
| **9** | **Bảng danh sách Cảnh báo** | Datatable | - Hiển thị danh sách các cảnh báo trên hệ thống dưới dạng bảng. Dữ liệu được hiển thị theo phân quyền của người dùng đang đăng nhập.<br>- **Các chức năng chung bổ trợ:**<br>&nbsp;&nbsp;+ Phân trang (Pagination): Có<br>&nbsp;&nbsp;+ Sắp xếp (Sorting): **Người dùng có thể sort (sắp xếp) dữ liệu theo chiều tăng dần/giảm dần bằng cách click chuột trực tiếp vào tiêu đề (header) của các cột tương ứng.**<br>- **Đặc tả chi tiết các cột dữ liệu (Fields/Columns):**<br>&nbsp;&nbsp;+ **Checkbox (Cột chọn):**<br>&nbsp;&nbsp;&nbsp;&nbsp;* - Cho phép người dùng tích chọn dòng để thực hiện thao tác hàng loạt.<br>&nbsp;&nbsp;&nbsp;&nbsp;* - **Checkbox ở Header:** Tích chọn toàn bộ các bản ghi đang hiển thị trên trang hiện tại.<br>&nbsp;&nbsp;+ **Mã Cảnh báo:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* - Hiển thị chuỗi mã định danh duy nhất của cảnh báo kèm theo icon copy để chép nhanh.<br>&nbsp;&nbsp;&nbsp;&nbsp;* - **Hành vi khi nhấn:** Khi click vào nội dung text có link, hệ thống sẽ mở sidebar/popup xem chi tiết.<br>&nbsp;&nbsp;+ **Thời gian:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* - Hiển thị thời gian cảnh báo được ghi nhận (vd: `dd/mm/yyyy HH:mm:ss`).<br>&nbsp;&nbsp;+ **Mã sự việc:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* - Hiển thị mã của sự việc (case) mà cảnh báo này đã được gán vào.<br>&nbsp;&nbsp;&nbsp;&nbsp;* - **Quy tắc hiển thị bổ sung:** Hiển thị kèm theo **Phương án xử lý của sự việc** ngay bên cạnh/dưới mã sự việc để người dùng nắm bắt nhanh.<br>&nbsp;&nbsp;+ **Số sự kiện:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* - Hiển thị tổng số lượng sự kiện thô của cảnh báo (hiển thị dạng badge màu xanh).<br>&nbsp;&nbsp;+ **Trạng thái:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* - Hiển thị trạng thái hiện tại của cảnh báo dưới dạng tag màu sắc.<br>&nbsp;&nbsp;&nbsp;&nbsp;* - **Quy tắc hiển thị trạng thái:**<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;. Tag `New`: Alert mới được đẩy vào và chưa xử lý gì.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;. Tag `Processing`: Alert đã được gán vào case và case chưa xử lý xong.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;. Tag `Close`: Alert đã được gán vào case và case đã xử lý xong, hoặc alert được đánh dấu cảnh báo giả.<br>&nbsp;&nbsp;+ **Cảnh báo giả:**<br>&nbsp;&nbsp;&nbsp;&nbsp;* - Hiển thị thông tin cho biết cảnh báo này có phải là cảnh báo giả hay không (Ví dụ dấu `-` nếu chưa có trạng thái). |

---

## 2. CHỨC NĂNG: XEM CHI TIẾT CẢNH BÁO

### 2.1. Thông tin chung chức năng

| Tiêu chí | Nội dung |
| :--- | :--- |
| **1. Tên chức năng** | Xem chi tiết cảnh báo |
| **2. Mô tả** | Cho phép người dùng xem thông tin chi tiết của một cảnh báo cụ thể. Giao diện cung cấp thông tin tóm tắt bằng các nhãn tag (Mức độ, Trạng thái) và 3 tab dữ liệu chuyên sâu bao gồm: Dữ liệu thô (JSON), Chi tiết các sự kiện cấu thành cảnh báo (Sự kiện), và Lịch sử thao tác trên cảnh báo đó (Nhật ký hệ thống). |
| **3. Tác nhân** | Người dùng (User) / Quản trị viên (Admin) |
| **4. Điều kiện trước** | - Người dùng click vào Mã cảnh báo từ màn hình Danh sách cảnh báo.<br>- Người dùng có quyền truy cập xem dữ liệu của cảnh báo này. |
| **5. Điều kiện sau** | - Hệ thống hiển thị panel/popup chứa toàn bộ thông tin chi tiết của cảnh báo. |
| **6. Ngoại lệ** | - Cảnh báo đã bị xóa hoặc không còn tồn tại: Hiển thị thông báo "Cảnh báo không tồn tại hoặc đã bị xóa" và tự động đóng giao diện chi tiết. |
| **7. Các yêu cầu đặc biệt** | - Tab "JSON" và "Sự kiện" chứa văn bản dài (code JSON, XML), cần hiển thị dạng code snippet hỗ trợ scroll ngang và bẻ dòng (word-wrap) để không phá vỡ bố cục.<br>- **Phân quyền dữ liệu:** Các thông tin nhạy cảm của tenant phải được hiển thị chính xác theo dữ liệu đã phân quyền cho người dùng đang đăng nhập. |

### 2.2. Đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Tag Mức độ / Trạng thái** | Label (Tag) | - Hiển thị các thông tin tổng quan của cảnh báo dưới dạng các thẻ (tag) màu sắc ở phần đầu giao diện.<br>- **Nội dung hiển thị:** 2 tag liên tiếp tương ứng với Mức độ (VD: `MEDIUM`) và Trạng thái.<br>- **Quy tắc hiển thị trạng thái:**<br>&nbsp;&nbsp;+ `New`: Alert mới được đẩy vào và chưa xử lý gì.<br>&nbsp;&nbsp;+ `Processing`: Alert đã được gán vào case và case chưa xử lý xong.<br>&nbsp;&nbsp;+ `Close`: Alert đã được gán vào case và case đã xử lý xong, hoặc alert được đánh dấu cảnh báo giả. |
| **2** | **Tên Tenant** | Label | - Hiển thị tên của tổ chức/tenant sở hữu cảnh báo.<br>- **Nội dung hiển thị:** (Ví dụ: `Test tenant vnd`)<br>- **Tính chất hiển thị:** Động (phụ thuộc vào phân quyền của người dùng). |
| **3** | **Mã cảnh báo** | Label (Khung readonly) | - Hiển thị mã định danh của cảnh báo phục vụ mục đích theo dõi và sao chép.<br>- **Tính chất hiển thị:** Văn bản hiển thị nổi bật trong một khung box riêng. |
| **4** | **Đóng**<br>(Icon X) | Button | - Cho phép người dùng đóng màn hình chi tiết cảnh báo.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn:** Đóng màn hình/sidebar chi tiết và trở về giao diện danh sách. |
| **5** | **Tab điều hướng** | Tabs | - Cho phép người dùng chuyển đổi xem các nhóm thông tin chuyên sâu của cảnh báo.<br>- **Danh sách Tab:**<br>&nbsp;&nbsp;+ **JSON** (Tab mặc định)<br>&nbsp;&nbsp;+ **Sự kiện**<br>&nbsp;&nbsp;+ **Nhật ký hệ thống** |
| **6** | **Dữ liệu JSON**<br>(Tab JSON) | Textbox (Codeblock) | - Hiển thị toàn bộ dữ liệu thô (raw data) của cảnh báo dạng JSON định dạng chuẩn giúp kỹ thuật viên dễ dàng kiểm tra.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi người dùng chọn tab JSON.<br>- **Tính chất hiển thị:** Read-only. Hỗ trợ scroll nội dung. |
| **7** | **Tìm kiếm Sự kiện**<br>(Tab Sự kiện) | Searchbox | - Cho phép người dùng nhập từ khóa tìm kiếm để lọc nội dung trong danh sách sự kiện.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi đang chọn tab Sự kiện.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Tìm kiếm<br>&nbsp;&nbsp;+ EN: Search<br>- **Giá trị mặc định:** Trống<br>- **Quy tắc Nghiệp vụ:** Lọc dữ liệu sự kiện ngay khi người dùng gõ (áp dụng Debounce). |
| **8** | **Thu gọn tất cả**<br>(Tab Sự kiện) | Button (Link text) | - Cho phép người dùng thu gọn (collapse) tất cả các khối sự kiện đang được mở bên dưới.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi đang chọn tab Sự kiện. |
| **9** | **Danh sách Sự kiện**<br>(Tab Sự kiện) | Accordion & Datatable | - Hiển thị chi tiết nội dung từng sự kiện (event).<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi đang chọn tab Sự kiện.<br>- **Đặc tả chi tiết:**<br>1. **Khối Accordion:** Mỗi sự kiện được bọc trong một khối mở rộng/thu gọn (Tiêu đề ví dụ: `Sự kiện 1`).<br>2. **Bảng dữ liệu bên trong:**<br>&nbsp;&nbsp;+ Cột `Trường dữ liệu`: Hiển thị tên trường/key.<br>&nbsp;&nbsp;+ Cột `Giá trị`: Hiển thị giá trị, hỗ trợ wrap text với các đoạn mã dài. |
| **10** | **Bảng Nhật ký hệ thống**<br>(Tab Nhật ký hệ thống) | Datatable | - Hiển thị lịch sử các thay đổi hoặc thao tác đã tác động lên cảnh báo.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi đang chọn tab Nhật ký hệ thống.<br>- **Đặc tả chi tiết các cột dữ liệu:**<br>&nbsp;&nbsp;+ **Thời gian:** Hiển thị thời gian hành động diễn ra.<br>&nbsp;&nbsp;+ **Người thực hiện:** Hiển thị tài khoản người dùng thực hiện (hoặc tag hệ thống như `SYSTEM`).<br>&nbsp;&nbsp;+ **Hành động / Tin nhắn:** Mô tả chi tiết hành động (Ví dụ: `Cảnh báo được tiếp nhận từ nguồn EDR`). |

---

## 3. CHỨC NĂNG: TẠO SỰ VIỆC TỪ CẢNH BÁO

### 3.1. Thông tin chung chức năng

| Tiêu chí | Nội dung |
| :--- | :--- |
| **1. Tên chức năng** | Tạo sự việc từ cảnh báo |
| **2. Mô tả** | Cho phép người dùng gộp một hoặc nhiều cảnh báo vào một sự việc (case) mới để tiến hành điều tra, xử lý tập trung. Chức năng này hiển thị giao diện nhập liệu để khởi tạo sự việc. |
| **3. Tác nhân** | Người dùng (User) / Quản trị viên (Admin) |
| **4. Điều kiện trước** | - Người dùng chọn một hoặc nhiều cảnh báo trên bảng danh sách.<br>- Tất cả các cảnh báo được chọn **phải thuộc cùng một khách hàng** thì nút "Tạo sự việc" mới được kích hoạt (enabled). |
| **5. Điều kiện sau** | - Một sự việc mới được tạo thành công trên hệ thống và các cảnh báo đang chọn được gán tự động vào sự việc đó. |
| **6. Ngoại lệ** | - Lỗi tạo sự việc do trùng mã hoặc mất kết nối mạng. |
| **7. Các yêu cầu đặc biệt** | - **Auto-fill & Khóa:** Khi mở form tạo sự việc, hệ thống tự động điền giá trị Khách hàng dựa theo khách hàng của các cảnh báo đang chọn và vô hiệu hóa (disabled/read-only) trường này, không cho phép thay đổi. |

### 3.2. Đặc tả chi tiết các thành phần giao diện (UI Components)

*(Do luồng này giống như tạo sự việc thông thường, các trường thông tin chung sẽ không được mô tả lại chi tiết. Dưới đây chỉ mô tả các thành phần đặc thù và các trường tuân theo quy tắc riêng khi được mở từ tính năng Cảnh báo).*

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Khách hàng** | Combobox (Single-select) | - Hiển thị tên khách hàng sở hữu sự việc sắp được tạo.<br>- **Giá trị mặc định:** Hệ thống tự động lấy tên khách hàng dựa vào các cảnh báo đã được chọn ở màn hình trước.<br>- **Quy tắc Nghiệp vụ:** Trường thông tin này luôn ở trạng thái khóa (disabled / read-only) trên màn hình này, người dùng không thể tự thay đổi. |
| **2** | **Các trường thông tin khác** | Các loại input | - Bao gồm Trạng thái xử lý, Phân loại, Tên sự việc, Mã, Loại sự việc, Đơn vị xử lý, Người thực hiện, Mức độ nguy hiểm, Độ ưu tiên, SLA, Thời gian xử lý, Thời gian phát hiện, Mô tả.<br>- *Đặc tả chi tiết kế thừa từ tài liệu thiết kế tính năng Tạo sự việc chung.* |
| **3** | **HỦY**<br>(Nút Hủy) | Button | - Cho phép người dùng hủy thao tác và đóng popup.<br>- **Hành vi khi nhấn:** Đóng form, không lưu bất kỳ thay đổi nào. |
| **4** | **TẠO MỚI**<br>(Nút Tạo mới) | Button | - Cho phép người dùng xác nhận khởi tạo sự việc.<br>- **Hành vi khi nhấn:** Hệ thống kiểm tra dữ liệu hợp lệ, thực hiện tạo mới sự việc và tự động gán các cảnh báo đang chọn vào sự việc này. Sau đó hiển thị thông báo thành công và tải lại bảng danh sách cảnh báo. |

---

## 4. CHỨC NĂNG: GÁN CẢNH BÁO VÀO SỰ VIỆC

### 4.1. Thông tin chung chức năng

| Tiêu chí | Nội dung |
| :--- | :--- |
| **1. Tên chức năng** | Gán Cảnh báo vào Sự việc |
| **2. Mô tả** | Cho phép người dùng chọn một hoặc nhiều cảnh báo trên bảng danh sách và gán (merge) chúng vào một sự việc (case) đã tồn tại trên hệ thống để thuận tiện cho quá trình phân tích và điều tra. |
| **3. Tác nhân** | Người dùng (User) / Quản trị viên (Admin) |
| **4. Điều kiện trước** | - Người dùng tích chọn các cảnh báo và nhấn nút "Gán vào sự việc".<br>- Hệ thống có tồn tại các sự việc (ở trạng thái Mở hoặc Đóng). |
| **5. Điều kiện sau** | - Các cảnh báo được gán thành công vào sự việc đã chọn, trạng thái của các cảnh báo này được chuyển thành `Processing`. |
| **6. Ngoại lệ** | - Cảnh báo hoặc Sự việc đích đã bị người dùng khác xóa khỏi hệ thống trong thời gian thực. |
| **7. Các yêu cầu đặc biệt** | - **Cảnh báo ghi đè (Overwrite warning):** Nếu người dùng chọn gán những cảnh báo *đã được gán vào 1 case trước đó* vào một case khác, hệ thống phải hiển thị cảnh báo để người dùng xác nhận.<br>- **Gán vào Sự việc đã đóng (Closed Case):** Người dùng có thể tìm kiếm và gán cảnh báo vào các sự việc đã Đóng. Khi thao tác, hệ thống sẽ yêu cầu người dùng xác nhận Mở lại (Re-open) sự việc kèm theo tùy chọn thiết lập lại SLA. |

### 4.2. Đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Gán Cảnh báo vào Sự việc** | Label | - Tiêu đề popup.<br>- **Tính chất hiển thị:** Tĩnh. |
| **2** | **Danh sách Cảnh báo đã chọn** | Danh sách (List) | - Hiển thị tóm tắt danh sách các cảnh báo đã được người dùng tích chọn ở màn hình bên ngoài.<br>- **Đặc tả hiển thị:** Liệt kê các dòng chứa Tên Tenant, Tag Mức độ (VD: `TRUNG BÌNH`), Tag Trạng thái (VD: `MỚI`). <br>- **Quy tắc hiển thị:** Nếu số lượng chọn quá nhiều, hệ thống chỉ hiển thị 3 cảnh báo đầu tiên và cung cấp dòng text thu gọn phía dưới (VD: `+ 1 cảnh báo khác...`). |
| **3** | **Tìm kiếm sự việc** | Searchbox | - Cho phép người dùng tìm kiếm sự việc đích theo tên hoặc mã.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Tìm kiếm sự việc theo tên hoặc mã...<br>&nbsp;&nbsp;+ EN: Search case by name or code...<br>- **Quy tắc Nghiệp vụ:** Tự động lọc danh sách sự kiện bên dưới khi người dùng gõ (Debounce). |
| **4** | **Danh sách Sự việc** | Danh sách chọn (Selectable List) | - Hiển thị danh sách các sự việc để người dùng click chọn làm đích gán.<br>- **Quy tắc Nghiệp vụ:** Hiển thị cả các sự việc đang Mở và Đã Đóng.<br>- **Đặc tả hiển thị:** Mỗi dòng hiển thị Mã sự việc, Trạng thái (Mở/Đóng), SLA còn lại (VD: `Còn 07h 59m`), icon cảnh báo, avatar người xử lý. Khi người dùng click vào một dòng, dòng đó sẽ được highlight để báo hiệu đã chọn. |
| **5** | **HỦY**<br>(Nút Hủy) | Button | - Cho phép người dùng hủy thao tác và đóng popup.<br>- **Hành vi khi nhấn:** Đóng popup, không thực hiện gán cảnh báo. |
| **6** | **GÁN VÀO SỰ VIỆC**<br>(Nút Gán) | Button | - Cho phép người dùng xác nhận việc gán các cảnh báo vào sự việc đích đã chọn.<br>- **Trạng thái mặc định:** Disabled (Chỉ Enable khi đã click chọn 1 sự việc ở danh sách phía trên).<br>- **Hành vi khi nhấn:**<br>1. Hệ thống kiểm tra: Nếu trong danh sách cảnh báo đã chọn có tồn tại cảnh báo đang được gán cho 1 case khác, bật hộp thoại **Cảnh báo thay đổi sự việc (Xem mục 4.3)**.<br>2. Hệ thống kiểm tra trạng thái Alert được chọn và Case đích để xử lý:<br>&nbsp;&nbsp;&nbsp;&nbsp;**TH1: Có ít nhất 1 cảnh báo đang ở trạng thái `Mới` hoặc `Đang xử lý`**<br>&nbsp;&nbsp;&nbsp;&nbsp;+ Chuyển trạng thái của các cảnh báo này thành `Đang xử lý` (ngoại trừ các alert có Cảnh báo giả = Yes).<br>&nbsp;&nbsp;&nbsp;&nbsp;+ Và mở lại case (nếu case đang `Đóng`): Bật hộp thoại **Mở lại Sự việc (Xem mục 4.4)**. Nếu mở lại case thì sẽ đổi cả trạng thái của các alert cũ trong Case (không phải cảnh báo giả) thành `Đang xử lý`.<br>&nbsp;&nbsp;&nbsp;&nbsp;**TH2: Tất cả cảnh báo được chọn đều ở trạng thái `Đóng` (bao gồm cả trường hợp cảnh báo giả)**<br>&nbsp;&nbsp;&nbsp;&nbsp;+ Nếu case đích ở trạng thái `Mở`: Chuyển trạng thái của các alert này về `Đang xử lý` (ngoại trừ các alert có Cảnh báo giả = Yes).<br>&nbsp;&nbsp;&nbsp;&nbsp;+ Nếu case đích ở trạng thái `Đóng`: Không thay đổi trạng thái của alert và không đổi trạng thái của case. Bỏ qua bước mở lại case và tiến hành gán trực tiếp.<br>3. Nếu các thông tin hợp lệ: Hệ thống gọi API thực hiện gán, đóng popup và hiển thị toast message `"Gán cảnh báo vào sự việc thành công!"`. |

### 4.3. Đặc tả Hộp thoại xác nhận (Confirmation Modals)

- **Tên Modal:** Cảnh báo thay đổi sự việc
- **Tiêu đề (Header):** `"Cảnh báo thay đổi sự việc"` (`"Case reassignment warning"`)
- **Nội dung thông báo (Body text):** `"Một số cảnh báo được chọn đang được gán cho một sự việc khác. Việc tiếp tục sẽ gỡ các cảnh báo này khỏi sự việc cũ và gán vào sự việc mới. Bạn có chắc chắn muốn tiếp tục không?"` (`"Some selected alerts are already assigned to another case. Continuing will reassign them to the new case. Are you sure you want to proceed?"`)
- **Nút Xác nhận (Confirm Button):**
  - Nhãn nút: `"Tiếp tục"` (`"Proceed"`)
  - Hành vi khi nhấn: Đồng ý chuyển các cảnh báo sang case mới, đóng hộp thoại cảnh báo này và bắt đầu tiến trình lưu dữ liệu gán.
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`)
  - Hành vi khi nhấn: Đóng hộp thoại cảnh báo và không thực hiện thao tác gán.

### 4.4. Đặc tả Hộp thoại Mở lại Sự việc (Re-open Case Modal)

- **Điều kiện hiển thị:** Kích hoạt khi người dùng gán cảnh báo vào một sự việc đang `Đóng` **VÀ** có ít nhất 1 cảnh báo đang chọn ở trạng thái `Mới` hoặc `Đang xử lý`.
- **Tiêu đề (Header):** `"Mở lại Sự việc"` (`"Re-open Case"`)
- **Nội dung thông báo (Body text):** `"Sự việc bạn chọn hiện đang đóng. Việc gán cảnh báo mới sẽ mở lại sự việc này. Vui lòng chọn cách tính thời gian xử lý (SLA) tiếp theo:"`
- **Tùy chọn SLA (Radio buttons):**
  - `(o) Đặt lại SLA từ đầu`: Thời gian SLA của sự việc sẽ được bắt đầu tính lại từ mức 0, bằng với SLA chuẩn cấu hình cho sự việc đó.
  - `( ) Tiếp tục tính SLA`: Giữ nguyên thời gian SLA còn lại hoặc đã quá hạn trước khi đóng sự việc.
  - *Mặc định:* Chọn "Đặt lại SLA từ đầu".
- **Nút Xác nhận (Confirm Button):**
  - Nhãn nút: `"Tiếp tục"` (`"Proceed"`)
  - Hành vi khi nhấn: Đồng ý mở lại sự việc với tùy chọn SLA đã chọn, đóng hộp thoại và thực hiện lưu dữ liệu gán cảnh báo. (Lúc này, các cảnh báo cũ thuộc case nếu không phải cảnh báo giả sẽ tự động chuyển trạng thái về `Đang xử lý` theo Ma trận trạng thái).
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`)
  - Hành vi khi nhấn: Đóng hộp thoại và hủy thao tác gán.

---

## 5. CHỨC NĂNG: ĐÁNH DẤU CẢNH BÁO GIẢ

### 5.1. Thông tin chung chức năng

| Tiêu chí | Nội dung |
| :--- | :--- |
| **1. Tên chức năng** | Đánh dấu cảnh báo giả (False Positive) |
| **2. Mô tả** | Cho phép người dùng đánh dấu một hoặc nhiều cảnh báo là cảnh báo giả (false positive) khi quá trình kiểm tra cho thấy đây không phải là một mối đe dọa thực sự. Chức năng yêu cầu người dùng phải cung cấp lý do đánh dấu. |
| **3. Tác nhân** | Người dùng (User) / Quản trị viên (Admin) |
| **4. Điều kiện trước** | - Người dùng tích chọn một hoặc nhiều cảnh báo trên bảng danh sách và nhấn nút "Đánh dấu giả". |
| **5. Điều kiện sau** | - Trạng thái của các cảnh báo được chuyển sang `Close`, đồng thời có nhãn/lý do hiển thị trên cột "Cảnh báo giả" tại bảng danh sách. |
| **6. Ngoại lệ** | - Cảnh báo đã bị xóa khỏi hệ thống trong quá trình thao tác. |
| **7. Các yêu cầu đặc biệt** | - Người dùng bắt buộc phải cung cấp lý do (bằng cách chọn mẫu có sẵn hoặc tự nhập) mới cho phép thực hiện lưu dữ liệu. |

### 5.2. Đặc tả chi tiết các thành phần giao diện (UI Components)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Đánh dấu Cảnh báo giả (False Positive)** | Label | - Tiêu đề màn hình popup.<br>- **Tính chất hiển thị:** Tĩnh. |
| **2** | **Lý do đánh dấu (Bắt buộc)**<br>(Nhãn tiêu đề) | Label | - Tiêu đề hướng dẫn cho phần nhập lý do đánh dấu giả. |
| **3** | **Các lựa chọn lý do có sẵn** | Chips / Buttons | - Cho phép người dùng click chọn nhanh một trong các lý do đánh dấu cảnh báo giả phổ biến.<br>- **Danh sách lựa chọn mặc định:**<br>&nbsp;&nbsp;+ Kiểm thử hệ thống<br>&nbsp;&nbsp;+ Hoạt động bảo trì<br>&nbsp;&nbsp;+ Cấu hình mạng IP nội bộ<br>&nbsp;&nbsp;+ Hành vi người dùng hợp lệ<br>- **Quy tắc Nghiệp vụ:** Người dùng có thể click để chọn hoặc bỏ chọn một lý do. Khi được chọn, thẻ (chip) sẽ đổi màu (highlight). |
| **4** | **Lý do chi tiết**<br>(Khung nhập liệu tự do) | Textbox (Multi-line) | - Cho phép người dùng tự nhập văn bản lý do đánh dấu giả theo ý muốn (thường dùng khi các mẫu lý do có sẵn không phù hợp).<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Hoặc nhập lý do chi tiết...<br>&nbsp;&nbsp;+ EN: Or enter detailed reason...<br>- **Giá trị mặc định:** Trống<br>- **Giới hạn ký tự:** Tối đa 500 ký tự. |
| **5** | **Cảnh báo Validate**<br>(Note màu đỏ) | Label | - Dòng hướng dẫn nhỏ hiển thị dưới textbox lý do, báo hiệu người dùng phải điền thông tin.<br>- **Nội dung:** `* Vui lòng chọn hoặc nhập lý do đánh dấu giả.` |
| **6** | **HỦY**<br>(Nút Hủy) | Button | - Cho phép người dùng hủy thao tác và đóng popup. |
| **7** | **XÁC NHẬN**<br>(Nút Xác nhận) | Button | - Xác nhận việc đánh dấu cảnh báo giả.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn:**<br>1. Kiểm tra Validate: Nếu người dùng chưa chọn bất kỳ lý do có sẵn nào VÀ khung "Lý do chi tiết" cũng bị bỏ trống thì chặn thao tác lưu, hiển thị lỗi inline: `"Vui lòng nhập hoặc chọn lý do đánh dấu giả!"`.<br>2. Nếu thông tin hợp lệ: Hệ thống gọi API cập nhật cảnh báo thành Cảnh báo giả (trạng thái `Close`), đóng popup và hiển thị toast message `"Đánh dấu cảnh báo giả thành công!"`. |

---

## 6. CHỨC NĂNG: GỠ ĐÁNH DẤU CẢNH BÁO GIẢ

### 6.1. Thông tin chung chức năng

| Tiêu chí | Nội dung |
| :--- | :--- |
| **1. Tên chức năng** | Gỡ đánh dấu cảnh báo giả |
| **2. Mô tả** | Cho phép người dùng hoàn tác (undo) thao tác Đánh dấu cảnh báo giả. Tính năng này được kích hoạt bằng cách nhấn nút "Gỡ" hiển thị trực tiếp trên dòng dữ liệu của cảnh báo (tại cột Cảnh báo giả) đang bị đánh dấu false positive. |
| **3. Tác nhân** | Người dùng (User) / Quản trị viên (Admin) |
| **4. Điều kiện trước** | - Cảnh báo hiện tại đang được đánh dấu là Cảnh báo giả (hiển thị lý do trên cột Cảnh báo giả).<br>- Người dùng click vào nút "Gỡ" bên cạnh lý do đánh dấu đó. |
| **5. Điều kiện sau** | - Trạng thái của cảnh báo được đưa trở về trạng thái xử lý bình thường (ví dụ: New hoặc Processing nếu đã gán case), và lý do cảnh báo giả bị xóa bỏ. |
| **6. Ngoại lệ** | - Cảnh báo đã bị người khác xóa khỏi hệ thống trong thời gian thực. |
| **7. Các yêu cầu đặc biệt** | - Hệ thống bắt buộc phải hiển thị popup xác nhận để tránh việc người dùng thao tác nhầm trên bảng dữ liệu. |

### 6.2. Đặc tả chi tiết Hộp thoại xác nhận (Confirmation Modals)

- **Tên Modal:** Gỡ đánh dấu Cảnh báo giả
- **Tiêu đề (Header):** `"Gỡ đánh dấu Cảnh báo giả"` (`"Unmark False Positive"`)
- **Nội dung thông báo (Body text):** `"Bạn đang gỡ đánh dấu cảnh báo giả. Cảnh báo này sẽ được chuyển trở lại trạng thái xử lý bình thường."` (`"You are unmarking a false positive. This alert will be reverted to its normal processing state."`)
- **Nút Xác nhận (Confirm Button):**
  - Nhãn nút: `"GỠ ĐÁNH DẤU"` (`"UNMARK"`)
  - Hành vi khi nhấn: Đổi nút sang trạng thái Loading. Hệ thống gọi API gỡ bỏ trạng thái cảnh báo giả, đóng popup, tải lại bảng danh sách và hiển thị toast message `"Gỡ đánh dấu thành công!"`.
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"HỦY"` (`"CANCEL"`)
  - Hành vi khi nhấn: Đóng hộp thoại xác nhận, không thực hiện hành động gỡ đánh dấu.

---

## 7. MA TRẬN TRẠNG THÁI CẢNH BÁO (STATE MATRIX)

Để phản ánh chính xác các quy tắc nghiệp vụ, hệ thống chia thành 2 nhóm hành động chính tác động lên trạng thái của Cảnh báo (Alert) và Sự việc (Case).

### 7.1. Các hành động đơn lẻ

| Hành động / Sự kiện | Tác động lên Case | Tác động lên Alert | Giải thích |
| :--- | :--- | :--- | :--- |
| **Alert mới đổ về hệ thống** | - | Trạng thái: `Mới` | Trạng thái mặc định. |
| **Người dùng đánh dấu Cảnh báo giả** | - | Trạng thái: `Đóng` (Cờ = Yes) | Dù đang ở trạng thái nào cũng sẽ Đóng lập tức. |
| **Gỡ đánh dấu Cảnh báo giả** | - | Tự động thành `Mới` (hoặc `Đang xử lý` nếu đang trong Case) | Hủy cờ Cảnh báo giả. |
| **Đóng Case (Hoàn thành)** | Chuyển thành `Đóng` | Tự động thành `Đóng` | Đóng theo Case (áp dụng cho Alert có Cảnh báo giả = No). |
| **Mở lại Case (Re-open)** | Chuyển thành `Mở` | Tự động thành `Đang xử lý` | Tách biệt rõ ràng. (Alert có Cảnh báo giả = Yes vẫn giữ nguyên Đóng). |
| **Bỏ gán Alert khỏi Case** | - | Tự động thành `Mới` | Alert bị gỡ khỏi Case sẽ quay về chờ xử lý. (Alert có Cảnh báo giả = Yes vẫn giữ nguyên Đóng). |

### 7.2. Hành động Gán Alert vào Case

Hành động gán Alert bị chi phối bởi 2 yếu tố: (1) Trạng thái của các Alert được chọn và (2) Trạng thái hiện tại của Case đích. *Lưu ý: Alert là "Cảnh báo giả" luôn giữ trạng thái Đóng trong mọi trường hợp gán.*

| Điều kiện của Alert được chọn | Trạng thái Case đích | Tác động lên Case đích | Tác động lên Alert được chọn | Tác động lên các Alert CŨ trong Case đích |
| :--- | :--- | :--- | :--- | :--- |
| **TH1:** Có ít nhất 1 Alert đang ở trạng thái `Mới` hoặc `Đang xử lý` | **ĐANG MỞ** | Không đổi (Vẫn Mở) | Chuyển thành `Đang xử lý` | Không thay đổi |
| | **ĐÃ ĐÓNG** | **Bị Mở lại (Re-open)** | Chuyển thành `Đang xử lý` | Chuyển thành `Đang xử lý` (do Case bị mở lại), ngoại trừ các alert có Cảnh báo giả = Yes |
| **TH2:** Tất cả Alert đều đã `Đóng` (bao gồm cả Cảnh báo giả) | **ĐANG MỞ** | Không đổi (Vẫn Mở) | Chuyển thành `Đang xử lý` | Không thay đổi |
| | **ĐÃ ĐÓNG** | Không đổi (Vẫn Đóng) | Giữ nguyên `Đóng` | Không thay đổi |
