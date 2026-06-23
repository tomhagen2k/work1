# HƯỚNG DẪN VIẾT MÔ TẢ CHI TIẾT THÀNH PHẦN GIAO DIỆN (UI COMPONENTS) TRONG TÀI LIỆU SRS

Tài liệu này được biên soạn nhằm quy chuẩn hóa cách mô tả các thành phần giao diện (UI Components) trên tài liệu Đặc tả Yêu cầu Phần mềm (SRS). Việc áp dụng bộ tài liệu này giúp đảm bảo sự nhất quán giữa bộ phận Phân tích nghiệp vụ (BA), Phát triển phần mềm (Developer) và Kiểm thử chất lượng (QA/QC), tránh tối đa các thiếu sót liên quan đến ràng buộc dữ liệu, trải nghiệm người dùng (UX) và thông báo lỗi.

---

## PHẦN 1: BẢNG MA TRẬN THUỘC TÍNH & KỊCH BẢN CHI TIẾT
Dưới đây là bảng ma trận quy chuẩn tổng quan cho các thành phần giao diện phổ biến. Bảng này giúp BA nhanh chóng tra cứu xem một thành phần cụ thể cần phải mô tả những gì tùy thuộc vào từng kịch bản nghiệp vụ.

> [!IMPORTANT]
> **Quy tắc Bố cục Bảng đặc tả:**
> Đối với mỗi màn hình/popup, toàn bộ các thành phần trên giao diện bao gồm **Tiêu đề màn hình (Label)**, **Các trường nhập liệu**, và **Các nút bấm hành động (Button)** phải được gom chung và mô tả trong một bảng duy nhất (gồm các cột: STT, Tên trường, Loại dữ liệu, Mô tả). Không tách biệt nút bấm hoặc tiêu đề ra các mục văn bản riêng lẻ bên ngoài bảng.

| STT | Loại thành phần (UI Component) | Các nội dung cần mô tả bắt buộc | Các kịch bản/Trường hợp đặc biệt cần mô tả chi tiết |
| :--- | :--- | :--- | :--- |
| **1** | **Textbox** (Trường nhập chữ) | - Mô tả hành động nhập của người dùng<br>- Placeholder (VI/EN)<br>- Giá trị mặc định<br>- Giới hạn ký tự (Min/Max)<br>- Định dạng hợp lệ (Regex)<br>- Quy tắc xử lý (Trim space)<br>- Thông báo lỗi inline (Validation) | - **Nhập mã (Code):** Check trùng lặp (Unique) trong DB, viết hoa không dấu, không khoảng trắng.<br>- **Nhập mô tả (Description/Note):** Cho phép xuống dòng (Textarea), giới hạn ký tự lớn (vd: 500-1000).<br>- **Nhập Mật khẩu (Password):** Ẩn/hiển thị ký tự (Icon mắt), độ phức tạp (chữ hoa, số, ký tự đặc biệt).<br>- **Thông tin liên hệ (Email, SĐT):** Định dạng chuẩn quốc tế hoặc quốc gia. |
| **2** | **Input Number** (Trường nhập số) | - Mô tả hành động nhập số của người dùng<br>- Placeholder (VI/EN)<br>- Giá trị mặc định<br>- Kiểu số (Số nguyên/Số thực)<br>- Ràng buộc khoảng giá trị (Min/Max)<br>- Định dạng hiển thị<br>- Nút tăng giảm & Bước nhảy (Step) | - **Nhập số lượng (Quantity):** Số nguyên dương > 0.<br>- **Nhập tỷ lệ phần trăm (%):** Khoảng [0 - 100], có cho phép số thập phân không.<br>- **Nhập số tiền (Currency):** Định dạng phân tách phần nghìn, ký hiệu tiền tệ (VND/USD), chặn số âm.<br>- **Nhập số thập phân:** Số chữ số cho phép sau dấu phẩy (vd: tối đa 2 chữ số). |
| **3** | **Datepicker** (Trường chọn ngày) | - Mô tả hành động chọn ngày của người dùng<br>- Định dạng nhập/hiển thị (Format)<br>- Placeholder (dd/mm/yyyy)<br>- Cách nhập (Chọn lịch/Gõ tay/Cả hai)<br>- Ràng buộc khoảng ngày (Min/Max Date)<br>- Thông báo lỗi inline | - **Đặt lịch tương lai:** Ngày chọn phải >= Ngày hiện tại (Vô hiệu hóa ngày quá khứ).<br>- **Xem dữ liệu lịch sử:** Ngày chọn phải <= Ngày hiện tại (Vô hiệu hóa ngày tương lai).<br>- **Khoảng thời gian (Từ ngày - Đến ngày):** Ràng buộc Từ ngày <= Đến ngày; Ràng buộc khoảng cách tối đa (Ví dụ: không quá 30 ngày hoặc 1 năm).<br>- **Ngày sinh nhật:** Ngày chọn < Ngày hiện tại, ràng buộc về độ tuổi tối thiểu (ví dụ: đủ 18 tuổi). |
| **4** | **Timepicker** (Trường chọn giờ) | - Mô tả hành động chọn giờ của người dùng<br>- Định dạng hiển thị (12h AM/PM hoặc 24h)<br>- Placeholder (hh:mm)<br>- Bước nhảy chọn (Step)<br>- Ràng buộc khoảng giờ (Min/Max Time)<br>- Cách thức nhập (Dropdown/Gõ tay)<br>- Thông báo lỗi inline | - **Ràng buộc kết hợp Datepicker:** Nếu ngày chọn là ngày hiện tại thì giờ bắt đầu phải lớn hơn giờ hiện tại tối thiểu N phút.<br>- **Khoảng thời gian (Từ giờ - Đến giờ):** Ràng buộc Từ giờ < Đến giờ khi cùng một ngày.<br>- **Khung giờ làm việc:** Chỉ cho phép chọn trong khoảng [08:00 - 17:30]. |
| **5** | **Button** (Nút hành động) | - Mô tả hành động khi click nút bấm<br>- Trạng thái hiển thị (Mặc định: Enabled/Disabled/Hidden)<br>- Quyền hạn truy cập nút<br>- Hành vi khi nhấn (OnClick Event)<br>- Trạng thái nút khi đang xử lý (Loading state)<br>- Chống click đúp (Double-click prevention) | - **Nút Lưu/Gửi/Tạo mới/Xuất file:** Quy trình validate dữ liệu -> Chuyển trạng thái loading & disable -> Gọi API -> Nhận response -> Hiển thị thông báo và mở khóa nút hoặc điều hướng.<br>- **Nút Hủy/Thoát (Cancel/Exit):** Đóng popup/Quay lại trang trước, hiển thị popup xác nhận mất dữ liệu nếu form đã thay đổi dữ liệu.<br>- **Nút Xóa (Delete):** Bắt buộc hiển thị Pop-up xác nhận (Confirmation Dialog) trước khi thực hiện hành động. |
| **6** | **Combobox / Dropdown** (Hộp chọn) | - Mô tả hành động chọn của người dùng<br>- Placeholder (VI/EN)<br>- Loại chọn (Chọn một/Chọn nhiều)<br>- Nguồn dữ liệu (Tĩnh hay Động)<br>- Chức năng tìm kiếm (Searchable)<br>- Chế độ hiển thị khi chọn nhiều<br>- Hành vi xử lý khi tràn độ dài (Overflow) | - **Dropdown phụ thuộc nhau:** Ví dụ: Chọn Tỉnh/Thành phố -> Load danh sách Quận/Huyện tương ứng.<br>- **Dropdown kích hoạt hiển thị trường động:** Chọn giá trị X thì hiển thị trường A, B, C; chọn giá trị Y thì hiển thị trường D, E.<br>- **Dropdown cho phép tạo mới (Creatable select):** Cho phép người dùng gõ từ khóa mới không có trong danh sách.<br>- **Dropdown phân quyền:** Ẩn/hiển thị tùy chọn dựa trên vai trò (Role) của user. |
| **7** | **Tab** (Thẻ chuyển đổi) | - Danh sách các thẻ Tab<br>- Thẻ Tab active mặc định khi load trang<br>- Hành vi khi chuyển đổi Tab (Giữ nguyên dữ liệu cũ đang nhập dở hay reset; Load lại API của tab mới hay không) | - **Tab phân quyền:** Hiển thị tab dựa theo quyền truy cập của người dùng.<br>- **Tab chứa form chưa lưu:** Hiển thị cảnh báo nếu người dùng chuyển tab khi dữ liệu đang nhập dở chưa được lưu. |
| **8** | **Switch / Toggle** (Công tắc bật/tắt) | - Nhãn (Label)<br>- Giá trị mặc định (On/Off)<br>- Hành vi khi chuyển đổi trạng thái (Lưu ngay lập tức qua API hay đợi nhấn nút Lưu chung) | - **Kích hoạt/Khóa (Active/Inactive):** Đổi trạng thái hoạt động của đối tượng. Nếu đổi sang "Inactive", cần check các ràng buộc liên quan (Ví dụ: có đang được sử dụng ở luồng khác không). |
| **9** | **Radio Button** (Nút chọn duy nhất) | - Mô tả hành động chọn của người dùng<br>- Danh sách các Tùy chọn (Options)<br>- Giá trị tương ứng từng tùy chọn (Value)<br>- Tùy chọn chọn mặc định (Default Active)<br>- Bố cục hiển thị (Dọc/Ngang)<br>- Trạng thái kích hoạt động (Dynamic Trigger) | - **Ẩn/hiển thị trường thông tin động:** Chọn Option X thì hiển thị Group trường A, B, C; Chọn Option Y thì ẩn Group trường A, B, C và hiển thị Group trường D, E. |
| **10**| **Checkbox** (Hộp kiểm) | - Nhãn hiển thị<br>- Trạng thái mặc định (Checked/Unchecked)<br>- Nhóm checkbox (Checkbox group - Chọn nhiều) | - **Select All (Chọn tất cả):** Một checkbox cha điều khiển trạng thái của toàn bộ checkbox con.<br>- **Ràng buộc nút bấm:** Phải tích chọn Checkbox "Tôi đồng ý..." thì nút "Tiếp tục" mới được enable. |
| **11**| **Tag Input** (Trường nhập dạng thẻ) | - Mô tả hành động nhập dạng thẻ của người dùng<br>- Placeholder (VI/EN)<br>- Ký tự trigger tạo thẻ (Enter/Comma/Space)<br>- Ràng buộc số lượng thẻ (Max tags)<br>- Ràng buộc độ dài ký tự của từng thẻ<br>- Ràng buộc trùng lặp thẻ trong list<br>- Định dạng hợp lệ từng thẻ (Regex)<br>- Hành vi khi tràn độ dài (Overflow)<br>- Thông báo lỗi inline | - **Nhập danh sách IP quét:** Chặn trùng lặp, tự động validate định dạng IPv4/IPv6 cho từng tag gõ vào.<br>- **Nhập danh sách Email nhận thông báo:** Validate định dạng email của từng tag, tự động convert thành chữ thường.<br>- **Nhập danh sách từ khóa tìm kiếm (Keywords):** Cho phép nhập chữ bất kỳ, giới hạn số lượng tag tối đa. |
| **12**| **Upload File** (Tải lên tệp tin) | - Mô tả hành động tải file của người dùng<br>- Định dạng file cho phép (Extensions)<br>- Dung lượng tối đa mỗi file (MB)<br>- Số lượng file tối đa cho phép tải lên<br>- Chế độ hiển thị danh sách file đã tải lên<br>- Thông báo lỗi inline liên quan | - **Đính kèm tài liệu thuyết minh:** Chỉ nhận file `.pdf, .docx, .xlsx`, dung lượng tối đa 10MB/file. Hiển thị danh sách file kèm dung lượng và icon xóa.<br>- **Tải tệp tin kết quả quét:** Giới hạn tối đa 5 file, tự động validate khi upload. |
| **13**| **Upload Image** (Tải lên hình ảnh) | - Mô tả hành động tải ảnh của người dùng<br>- Định dạng ảnh cho phép (Extensions)<br>- Dung lượng tối đa mỗi ảnh (MB)<br>- Số lượng ảnh tối đa cho phép tải lên<br>- Chế độ hiển thị preview (Đơn ảnh/Nhiều ảnh)<br>- Thông báo lỗi inline liên quan | - **Ảnh đại diện người dùng (Avatar):** Tải đơn ảnh, dạng tròn, có hover overlay để thay thế/xóa, dung lượng tối đa 2MB.<br>- **Ảnh chụp minh họa thiết bị (Gallery):** Tải tối đa 10 ảnh, hiển thị dạng lưới thumbnail có nút click xem ảnh lớn và nút xóa góc ảnh. |
| **14**| **Modal / Popup** (Hộp thoại xác nhận) | - Tiêu đề Modal (Header)<br>- Nội dung thông báo (Body)<br>- Nút xác nhận hành động (Confirm)<br>- Nút hủy hành động (Cancel)<br>- Hành vi khi click vùng ngoài Modal | - **Xác nhận xóa đối tượng:** Nội dung cảnh báo hành động không thể hoàn tác.<br>- **Cảnh báo dữ liệu chưa lưu khi thoát:** Xuất hiện khi người dùng tắt form khi đã có thay đổi dữ liệu nhưng chưa lưu. |
| **15**| **Toast Message** (Thông báo nhanh) | - Loại thông báo (Success/Error/Warning/Info)<br>- Thời gian tự đóng (Timeout)<br>- Nội dung thông báo theo hành động (Tạo mới, Cập nhật, Xóa) | - **Thông báo kết quả thao tác:** Thống nhất format câu chữ song ngữ cho tất cả trường hợp Thành công và Thất bại. |
| **16**| **Label** (Nhãn hiển thị / Tiêu đề) | - Nội dung hiển thị (Static/Dynamic)<br>- Tính chất hiển thị (Ẩn/Hiện động) | - **Tiêu đề màn hình:** Mô tả tiêu đề trang hoặc popup.<br>- **Nhãn thông tin động:** Hiển thị thông số đếm ngược, trạng thái cập nhật động trên giao diện. |

---

## PHẦN 2: BIỂU MẪU MÔ TẢ CHUẨN VÀ HƯỚNG DẪN CHI TIẾT

> [!IMPORTANT]
> **Lưu ý quy chuẩn mô tả và lược bỏ thông tin dư thừa:**
> 1. **Mô tả hành động đầu tiên:** Mỗi trường thông tin bắt buộc phải bắt đầu bằng một câu mô tả ngắn gọn đầu tiên diễn tả hành động, quyền hạn hoặc lựa chọn của người dùng (Ví dụ: `- Người dùng bắt buộc nhập vào tên nguồn tích hợp.` hoặc `- Cho phép người dùng chọn loại tích hợp muốn tạo.`).
> 2. **Không dùng dòng trạng thái bắt buộc dư thừa:** Không dùng dòng đặc tả riêng lẻ dạng `Bắt buộc nhập: Có/Không` hoặc `Bắt buộc chọn` trong mô tả. Sự bắt buộc này đã được thể hiện gián tiếp thông qua câu mô tả hành động đầu tiên và thông báo lỗi inline (Validation message) khi để trống trường thông tin.
> 3. **Xử lý các trường có giá trị mặc định:** Nếu một trường thông tin **đã có sẵn giá trị mặc định (Default Value)**:
>    - Lược bỏ hoàn toàn dòng đặc tả `Placeholder` và `Bắt buộc chọn/nhập` (vì trường đã có dữ liệu mặc định nên không cần placeholder và không bao giờ bị bỏ trống khi nhấn Lưu).
>    - Tại phần `Thông báo lỗi tương ứng`, mô tả là `Không có (do luôn có giá trị mặc định).` (đối với các trường không thể xóa rỗng như Dropdown/Radio/Checkbox).

---

### 1. TEXTBOX (TRƯỜNG NHẬP VĂN BẢN)

#### A. Biểu mẫu mô tả chuẩn (Template)
```markdown
##### {Tên trường}
- {Mô tả ngắn gọn hành động nhập của người dùng. Ví dụ: Người dùng bắt buộc nhập vào tên thiết bị...}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  - VI: Nhập {tên trường}
  - EN: Enter {tên trường bằng tiếng Anh}
- **Giá trị mặc định:** [Trống / Giá trị cụ thể]
- **Giới hạn ký tự:** Tối đa {Max} ký tự. Hành vi khi vượt quá: Hệ thống tự động chặn gõ, không hiển thị phần ký tự gõ thêm vượt quá {Max}.
- **Kiểu ký tự hợp lệ:** [Ví dụ: Tất cả / Chỉ chữ cái không dấu / Không chứa ký tự đặc biệt]
- **Quy tắc Nghiệp vụ (Business Rules):**
  - Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi kiểm tra trùng và lưu.
  - [Quy tắc khác: Ví dụ: {Tên trường} phải là duy nhất trên hệ thống]
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống (nếu bắt buộc) và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  - Vượt quá số ký tự (nếu hệ thống không chặn cứng mà báo lỗi sau): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} không được vượt quá {Max} ký tự!"` (`"{Tên trường} must not exceed {Max} characters!"`)
  - Trùng lặp (nếu check unique): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} đã tồn tại!"` (`"{Tên trường} already exists!"`)
  - Sai định dạng / Kiểu ký tự: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} không đúng định dạng!"` (`"{Tên trường} is invalid!"`)
```

#### B. Ví dụ mẫu áp dụng thực tế (Trường "Tên thiết bị")
##### Tên thiết bị
- Người dùng bắt buộc nhập vào tên thiết bị tích hợp trong hệ thống.
- **Placeholder:**
  - VI: Nhập tên thiết bị
  - EN: Enter device name
- **Giá trị mặc định:** Trống
- **Giới hạn ký tự:** Tối đa 128 ký tự. Hành vi khi vượt quá: Hệ thống tự động chặn gõ, không hiển thị phần ký tự gõ thêm vượt quá 128.
- **Kiểu ký tự hợp lệ:** Tất cả các ký tự ngoại trừ các ký tự đặc biệt nguy hiểm ngăn ngừa SQL Injection (vd: `'`, `"`, `;`).
- **Quy tắc Nghiệp vụ (Business Rules):**
  - Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi kiểm tra trùng và lưu.
  - Tên thiết bị phải là duy nhất trên hệ thống (không phân biệt chữ hoa, chữ thường khi so sánh trùng).
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Tên thiết bị là bắt buộc!"` (`"Device name is required!"`)
  - Trùng lặp (nếu check unique): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Tên thiết bị đã tồn tại!"` (`"Device name already exists!"`)

---

### 2. INPUT NUMBER (TRƯỜNG NHẬP SỐ)

#### A. Biểu mẫu mô tả chuẩn (Template)
```markdown
##### {Tên trường}
- {Mô tả ngắn gọn hành động nhập số của người dùng. Ví dụ: Người dùng bắt buộc nhập vào chu kỳ quét...}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  - VI: Nhập {tên trường}
  - EN: Enter {tên trường bằng tiếng Anh}
- **Giá trị mặc định:** [Trống / Giá trị cụ thể]
- **Kiểu dữ liệu số:** [Số nguyên (Integer) / Số thực (Float/Decimal - lấy bao nhiêu số sau dấu phẩy)]
- **Khoảng giá trị cho phép (Min/Max Value):**
  - Min: >= {Min}
  - Max: <= {Max}
- **Quy tắc Nghiệp vụ (Business Rules):**
  - Hệ thống tự động chặn nhập tất cả ký tự không phải số (bao gồm cả chữ cái và ký tự đặc biệt).
  - [Có/Không] hiển thị nút tăng giảm (spinner) với bước nhảy (Step) là {Step}.
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống (nếu bắt buộc) và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  - Nhỏ hơn Min: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} phải lớn hơn hoặc bằng {Min}!"` (`"{Tên trường} must be greater than or equal to {Min}!"`)
  - Lớn hơn Max: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} phải nhỏ hơn hoặc bằng {Max}!"` (`"{Tên trường} must be less than or equal to {Max}!"`)
  - Nhập sai định dạng số (ví dụ nhập chữ nếu hệ thống không chặn cứng): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} phải là số!"` (`"{Tên trường} must be a number!"`)
```

#### B. Ví dụ mẫu áp dụng thực tế (Trường "Chu kỳ quét")
##### Chu kỳ quét
- Cho phép người dùng cấu hình số ngày chu kỳ quét định kỳ của thiết bị.
- **Giá trị mặc định:** 7
- **Kiểu dữ liệu số:** Số nguyên (Integer)
- **Khoảng giá trị cho phép (Min/Max Value):**
  - Min: >= 1
  - Max: <= 365
- **Quy tắc Nghiệp vụ (Business Rules):**
  - Hệ thống tự động chặn nhập tất cả ký tự không phải số (bao gồm cả chữ cái và ký tự đặc biệt).
  - Có hiển thị nút tăng giảm (spinner) với bước nhảy (Step) là 1.
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Chu kỳ quét là bắt buộc!"` (`"Scan interval is required!"`)
  - Nhỏ hơn Min: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Chu kỳ quét phải lớn hơn hoặc bằng 1!"` (`"Scan interval must be greater than or equal to 1!"`)
  - Lớn hơn Max: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Chu kỳ quét phải nhỏ hơn hoặc bằng 365!"` (`"Scan interval must be less than or equal to 365!"`)

---

### 3. DATEPICKER (TRƯỜNG CHỌN NGÀY)

#### A. Biểu mẫu mô tả chuẩn (Template)
```markdown
##### {Tên trường}
- {Mô tả ngắn gọn hành động chọn ngày của người dùng. Ví dụ: Người dùng bắt buộc nhập hoặc chọn ngày quét...}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  - VI: Nhập {tên trường}
  - EN: Enter {tên trường bằng tiếng Anh}
- **Định dạng hiển thị & nhập:** {Định dạng} (Ví dụ: dd/mm/yyyy)
- **Cách thức nhập:** [Cho phép gõ trực tiếp & chọn từ lịch / Chỉ cho chọn từ lịch]
- **Giá trị mặc định:** [Trống / Ngày hiện tại / Ngày mai / ...]
- **Điều kiện hiển thị (Conditional Display):** [Luôn hiển thị / Chỉ hiển thị khi trường {Trường điều kiện} có giá trị là {Giá trị điều kiện}]
- **Ràng buộc ngày (Min/Max Date Constraints):**
  - Ngày bắt đầu (Min date): {Mốc so sánh Min} (Ví dụ: Ngày hiện tại hoặc >= {Trường Từ ngày})
  - Ngày kết thúc (Max date): {Mốc so sánh Max} (Ví dụ: Ngày hiện tại hoặc <= {Trường Đến ngày})
- **Quy tắc Nghiệp vụ (Business Rules):**
  - Vô hiệu hóa (disable) việc chọn các ngày nằm ngoài khoảng [Min Date - Max Date] trên Lịch chọn (các ngày này hiển thị màu xám và không click được).
  - Kiểm tra tính đúng đắn của ngày (ngày tồn tại thực tế).
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống (nếu bắt buộc) và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  - Sai định dạng ngày hoặc ngày không tồn tại trên thực tế: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng nhập {Tên trường} theo định dạng {Định dạng}!"` (`"Please enter {Tên trường} in {Định dạng} format!"`)
  - Nhập ngày nhỏ hơn Min Date: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} phải lớn hơn hoặc bằng {Mốc so sánh Min}!"` (`"{Tên trường} must be greater than or equal to {Mốc so sánh Min}!"`)
  - Nhập ngày lớn hơn Max Date: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} phải nhỏ hơn hoặc bằng {Mốc so sánh Max}!"` (`"{Tên trường} must be less than or equal to {Mốc so sánh Max}!"`)
```

#### B. Ví dụ mẫu áp dụng thực tế (Trường "Ngày thực hiện quét")
##### Ngày quét
- Người dùng bắt buộc nhập hoặc chọn ngày thực hiện quét.
- **Định dạng hiển thị & nhập:** dd/mm/yyyy
- **Cách thức nhập:** Cho phép cả gõ trực tiếp từ bàn phím hoặc click chọn từ Lịch (Calendar picker).
- **Giá trị mặc định:** Ngày hiện tại (ngày hôm nay).
- **Điều kiện hiển thị (Conditional Display):** Chỉ hiển thị khi trường Chế độ quét có giá trị là "Quét 1 lần".
- **Ràng buộc ngày (Min/Max Date Constraints):**
  - Ngày bắt đầu (Min date): ngày hiện tại
  - Ngày kết thúc (Max date): Không giới hạn
- **Quy tắc Nghiệp vụ (Business Rules):**
  - Vô hiệu hóa (disable) việc chọn các ngày nằm ngoài khoảng [ngày hiện tại - Không giới hạn] trên Lịch chọn (các ngày này hiển thị màu xám và không click được).
  - Kiểm tra tính đúng đắn của ngày (ngày tồn tại thực tế).
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Ngày quét là bắt buộc!"` (`"Scan date is required!"`)
  - Sai định dạng ngày hoặc ngày không tồn tại trên thực tế: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng nhập Ngày quét theo định dạng dd/mm/yyyy!"` (`"Please enter Ngày quét in dd/mm/yyyy format!"`)
  - Nhập ngày nhỏ hơn Min Date: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Ngày quét phải lớn hơn hoặc bằng ngày hiện tại!"` (`"Scan date must be greater than or equal to ngày hiện tại!"`)

---

### 4. TIMEPICKER (TRƯỜNG CHỌN GIỜ)

#### A. Biểu mẫu mô tả chuẩn (Template)
```markdown
##### {Tên trường}
- {Mô tả ngắn gọn hành động chọn giờ của người dùng. Ví dụ: Người dùng bắt buộc chọn giờ thực hiện quét...}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  - VI: Nhập {tên trường}
  - EN: Enter {tên trường bằng tiếng Anh}
- **Định dạng hiển thị & nhập:** {Định dạng} (Ví dụ: HH:mm)
- **Cách thức nhập:** [Chọn từ danh sách Dropdown / Gõ trực tiếp / Click mở đồng hồ xoay]
- **Bước nhảy chọn (Step/Interval):** Block {M} phút (Ví dụ: 15 phút)
- **Giá trị mặc định:** [Trống / Giờ hiện tại / Giá trị cụ thể]
- **Điều kiện hiển thị (Conditional Display):** [Luôn hiển thị / Chỉ hiển thị khi trường {Trường điều kiện} có giá trị là {Giá trị điều kiện}]
- **Ràng buộc giờ (Time Constraints):**
  - Giờ bắt đầu (Min Time): {Mốc so sánh Min}
  - Giờ kết thúc (Max Time): {Mốc so sánh Max}
- **Quy tắc Nghiệp vụ (Business Rules):**
  - [Quy tắc kết hợp ngày: Nếu trường ngày chọn là ngày hiện tại, thì {Tên trường} phải lớn hơn hoặc bằng Giờ hiện tại của hệ thống + {N} phút]
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống (nếu bắt buộc) và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  - Sai định dạng giờ hoặc giờ không tồn tại: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng nhập {Tên trường} theo định dạng {Định dạng}!"` (`"Please enter {Tên trường} in {Định dạng} format!"`)
  - Vượt quá ràng buộc giờ (nhỏ hơn Min / lớn hơn Max): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} phải nằm trong khoảng từ {Mốc so sánh Min} đến {Mốc so sánh Max}!"` (`"{Tên trường} must be between {Mốc so sánh Min} and {Mốc so sánh Max}!"`)
  - Nhập giờ nhỏ hơn thời gian tối thiểu (khi ngày quét là hôm nay): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng chọn {Tên trường} lớn hơn giờ hiện tại ít nhất {N} phút!"` (`"Please select {Tên trường} at least {N} minutes later than the current time!"`)
```

#### B. Ví dụ mẫu áp dụng thực tế (Trường "Giờ thực hiện quét")
##### Giờ quét
- Người dùng bắt buộc chọn hoặc nhập giờ thực hiện quét.
- **Placeholder:** hh:mm
- **Định dạng hiển thị & nhập:** HH:mm
- **Cách thức nhập:** Click vào ô hiển thị danh sách Dropdown để chọn. Đồng thời cho phép nhập trực tiếp bằng bàn phím.
- **Bước nhảy chọn (Step/Interval):** Block 15 phút
- **Giá trị mặc định:** Trống
- **Điều kiện hiển thị (Conditional Display):** Chỉ hiển thị khi trường Chế độ quét có giá trị là "Quét 1 lần" hoặc "Quét định kỳ".
- **Ràng buộc giờ (Time Constraints):**
  - Giờ bắt đầu (Min Time): Không giới hạn (trừ trường hợp trùng ngày hiện tại)
  - Giờ kết thúc (Max Time): Không giới hạn
- **Quy tắc Nghiệp vụ (Business Rules):**
  - Nếu trường ngày chọn là ngày hiện tại, thì Giờ quét phải lớn hơn hoặc bằng Giờ hiện tại của hệ thống + 10 phút.
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Giờ quét là bắt buộc!"` (`"Scan time is required!"`)
  - Sai định dạng giờ hoặc giờ không tồn tại: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng nhập Giờ quét theo định dạng HH:mm!"` (`"Please enter Giờ quét in HH:mm format!"`)
  - Nhỏ hơn thời gian tối thiểu (khi ngày quét là hôm nay): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng chọn Giờ quét lớn hơn giờ hiện tại ít nhất 10 phút!"` (`"Please select Giờ quét at least 10 minutes later than the current time!"`)

---

### 5. RADIO BUTTON (NÚT CHỌN DUY NHẤT)

#### A. Biểu mẫu mô tả chuẩn (Template)
```markdown
##### {Tên trường}
- {Mô tả ngắn gọn hành động chọn của người dùng. Ví dụ: Cho phép người dùng lựa chọn...}
- **Danh sách tùy chọn (Options):**
  - Tùy chọn 1: {Tên Tùy chọn 1} - Giá trị: {Value 1}
  - Tùy chọn 2: {Tên Tùy chọn 2} - Giá trị: {Value 2}
- **Giá trị mặc định:** [Chọn Tùy chọn 1 / Chọn Tùy chọn 2 / Trống]
- **Quy tắc Nghiệp vụ & Kích hoạt động (Dynamic Trigger Rules):**
  - Khi chọn {Tùy chọn 1} (Giá trị = {Value 1}):
    + Hiển thị các trường: `{Trường A}`, `{Trường B}`, `{Trường C}`
    + Ẩn các trường: `{Trường D}`, `{Trường E}` (đồng thời reset dữ liệu của các trường này về mặc định)
  - Khi chọn {Tùy chọn 2} (Giá trị = {Value 2}):
    + Hiển thị các trường: `{Trường D}`, `{Trường E}`
    + Ẩn các trường: `{Trường A}`, `{Trường B}`, `{Trường C}` (đồng thời reset dữ liệu của các trường này về mặc định)
- **Thông báo lỗi tương ứng (Validation & Error Messages):** (Chỉ ghi nếu không có giá trị mặc định)
  - Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng chọn {Tên trường}!"` (`"Please select {Tên trường}!"`)
```

#### B. Ví dụ mẫu áp dụng thực tế (Trường "Chế độ quét")
##### Chế độ quét
- Cho phép người dùng lựa chọn chế độ thực hiện quét.
- **Danh sách tùy chọn (Options):**
  - Tùy chọn 1: Quét 1 lần - Giá trị: ONCE
  - Tùy chọn 2: Quét định kỳ - Giá trị: PERIODIC
- **Giá trị mặc định:** Chọn Tùy chọn 1 (Quét 1 lần)
- **Quy tắc Nghiệp vụ & Kích hoạt động (Dynamic Trigger Rules):**
  - Khi chọn Quét 1 lần (Giá trị = ONCE):
    + Hiển thị các trường: Ngày quét, Giờ quét
    + Ẩn các trường: Loại chu kỳ, Chu kỳ quét (đồng thời reset dữ liệu của các trường này về mặc định)
  - Khi chọn Quét định kỳ (Giá trị = PERIODIC):
    + Hiển thị các trường: Loại chu kỳ, Chu kỳ quét, Giờ quét
    + Ẩn các trường: Ngày quét (đồng thời reset dữ liệu của các trường này về mặc định)
- **Thông báo lỗi tương ứng (Validation & Error Messages):** Không có.

---

### 6. COMBOBOX / DROPDOWN (HỘP CHỌN)

#### A. Biểu mẫu mô tả chuẩn (Template)
```markdown
##### {Tên trường}
- {Mô tả ngắn gọn hành động chọn của người dùng. Ví dụ: Cho phép người dùng chọn...}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  - VI: Chọn {tên trường}
  - EN: Select {tên trường bằng tiếng Anh}
- **Nguồn dữ liệu:**
  [Nếu cố định, liệt kê danh sách]:
  + {Tên hiển thị 1} ({Mã/Value 1})
  + {Tên hiển thị 2} ({Mã/Value 2})
  [Nếu không cố định, mô tả nguồn dữ liệu động]:
  Danh sách {đối tượng} ở trạng thái {trạng thái} trong hệ thống
- **Giá trị mặc định:** [Trống / Giá trị cụ thể]
- **Chức năng tìm kiếm (Searchable):** [Có (cho phép gõ từ khóa lọc danh sách) / Không]
- **Chế độ hiển thị khi chọn nhiều (Selection Display Mode - Chỉ áp dụng cho Multi-select):**
  - [Chọn một trong các chế độ hiển thị sau]:
    + **Dạng thẻ (Tags/Chips):** Hiển thị các giá trị đã chọn dưới dạng các thẻ màu xám độc lập, có icon "x" ở góc phải của từng tag để người dùng click xóa nhanh.
      * *Hành vi xử lý khi tràn độ dài (Overflow):* [Xuống dòng tăng chiều cao (Wrap) / Cuộn ngang (Horizontal scroll) / Thu gọn dạng `Value1, Value2... +{n} khác` (khi hover hiển thị tooltip đầy đủ)]
    + **Dạng danh sách phân cách (Comma-separated text):** Hiển thị danh sách các giá trị phân cách bằng dấu phẩy (vd: `Option 1, Option 2, Option 3`).
      * *Hành vi xử lý khi tràn độ dài (Overflow):* Hiển thị dấu ba chấm `...` ở cuối và hiển thị tooltip chứa toàn bộ danh sách khi hover chuột.
    + **Dạng text tóm tắt (Summary text):** Hiển thị text đại diện: `"Đã chọn {n} {đối tượng}"` (Ví dụ: `"Đã chọn 5 thiết bị"` - `"5 devices selected"`).
- **Quy tắc Nghiệp vụ & Kích hoạt động (Dynamic Trigger Rules):**
  - Khi thay đổi giá trị hoặc chọn một giá trị cụ thể {Giá trị X}:
    + [Hành vi 1: Ví dụ tự động gọi API load danh sách cho Dropdown con {Tên dropdown con}]
    + [Hành vi 2: Hiển thị trường {Trường A}, ẩn trường {Trường B}]
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - [Trường hợp có giá trị mặc định]: Không có (do luôn có giá trị mặc định).
  - [Trường hợp không có giá trị mặc định]: Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng chọn {Tên trường}!"` (`"Please select {Tên trường}!"`)
```

#### B. Ví dụ mẫu áp dụng thực tế (Trường "Loại chu kỳ" & "Danh sách thiết bị quét")
##### Loại chu kỳ
- Cho phép người dùng chọn loại chu kỳ quét.
- **Placeholder:**
  - VI: Chọn loại chu kỳ
  - EN: Select periodic type
- **Nguồn dữ liệu:**
  + Hằng ngày (DAILY)
  + Hằng tuần (WEEKLY)
  + Hằng tháng (MONTHLY)
- **Giá trị mặc định:** Trống
- **Chức năng tìm kiếm (Searchable):** Không
- **Quy tắc Nghiệp vụ & Kích hoạt động (Dynamic Trigger Rules):**
  - Khi chọn Hằng ngày (DAILY): Ẩn trường nhập Chu kỳ quét.
  - Khi chọn Hằng tuần (WEEKLY) hoặc Hằng tháng (MONTHLY): Hiển thị trường nhập Chu kỳ quét để người dùng cấu hình số tuần hoặc số tháng cách nhau giữa các lần quét.
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng chọn Loại chu kỳ!"` (`"Please select Periodic type!"`)

##### Danh mục thiết bị quét
- Người dùng bắt buộc chọn các thiết bị cần thực hiện quét.
- **Placeholder:**
  - VI: Chọn danh mục thiết bị quét
  - EN: Select scan targets
- **Nguồn dữ liệu:** Danh sách các thiết bị đang hoạt động trên hệ thống EDR
- **Giá trị mặc định:** Trống
- **Chức năng tìm kiếm (Searchable):** Có
- **Chế độ hiển thị khi chọn nhiều (Selection Display Mode):**
  - Dạng thẻ (Tags/Chips): Hiển thị các thiết bị đã chọn dưới dạng các thẻ màu xám độc lập, có icon "x" để click xóa nhanh.
  - Hành vi xử lý khi tràn độ dài (Overflow): Tự động bọc xuống dòng tăng chiều cao của ô chọn (Wrap), đảm bảo nhìn thấy toàn bộ các thẻ đã chọn.
- **Quy tắc Nghiệp vụ & Kích hoạt động (Dynamic Trigger Rules):**
  - Không có.
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng chọn Danh mục thiết bị quét!"` (`"Please select Scan targets!"`)

---

### 7. TAG INPUT (TRƯỜNG NHẬP DẠNG THẺ)

#### A. Biểu mẫu mô tả chuẩn (Template)
```markdown
##### {Tên trường}
- {Mô tả ngắn gọn hành động nhập dạng thẻ của người dùng. Ví dụ: Người dùng bắt buộc nhập danh sách IP...}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  - VI: Nhập {tên trường} và nhấn Enter
  - EN: Enter {tên trường bằng tiếng Anh} and press Enter
- **Cách thức tạo thẻ (Trigger action):** Người dùng gõ văn bản vào ô nhập và nhấn phím [Enter / Space / Dấu phẩy `,` / Dấu chấm phẩy `;`] để hệ thống tự động chuyển đổi văn bản đó thành một thẻ tag riêng biệt.
- **Cách thức xóa thẻ:** Người dùng click chuột vào icon "x" hiển thị ở góc phải trên thẻ tag, hoặc nhấn phím [Backspace] khi ô nhập liệu đang trống.
- **Ràng buộc số lượng thẻ (Max tags):** Tối đa {Max Tags} thẻ. Hành vi khi vượt quá: Hệ thống tự động vô hiệu hóa (disabled) ô gõ chữ, không cho phép gõ thêm thẻ mới.
- **Ràng buộc ký tự từng thẻ:** Mỗi thẻ tối đa {Max Per Tag} ký tự. Hành vi khi vượt quá: Hệ thống chặn không cho gõ tiếp ký tự của thẻ hiện tại.
- **Định dạng thẻ hợp lệ (Pattern/Regex):** [Tất cả ký tự / Chỉ cho phép địa chỉ IP / Chỉ cho phép định dạng Email / ...]
- **Quy tắc hiển thị khi tràn độ dài (Overflow):** [Xuống dòng tăng chiều cao (Wrap) / Cuộn ngang / Thu gọn hiển thị dạng `Tag 1, Tag 2... +{n} khác` khi hover hiện tooltip]
- **Quy tắc Nghiệp vụ (Business Rules):**
  - Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi tạo thẻ.
  - Tự động chuyển đổi toàn bộ ký tự thành [Chữ thường / Chữ hoa] (nếu cần).
  - Không cho phép nhập trùng lặp thẻ đã tồn tại trong danh sách. Nếu trùng, hệ thống tự động xóa nội dung đang gõ trong ô và không tạo thẻ mới.
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  - Sai định dạng thẻ: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Thẻ {Giá trị thẻ} không đúng định dạng!"` (`"Tag {Giá trị thẻ} is invalid!"`)
  - Vượt quá số lượng thẻ (nếu hệ thống không disable ô gõ mà báo lỗi sau): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} không được vượt quá {Max Tags} thẻ!"` (`"{Tên trường} must not exceed {Max Tags} tags!"`)
  - Nhập trùng thẻ (nếu cần hiển thị text lỗi thay vì bỏ qua âm thầm): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Thẻ {Giá trị thẻ} đã tồn tại trong danh sách!"` (`"Tag {Giá trị thẻ} already exists in the list!"`)
```

#### B. Ví dụ mẫu áp dụng thực tế (Trường "Danh sách IP quét")
##### Danh sách IP quét
- Người dùng bắt buộc nhập vào danh sách địa chỉ IP quét.
- **Placeholder:**
  - VI: Nhập địa chỉ IP và nhấn Enter
  - EN: Enter IP address and press Enter
- **Cách thức tạo thẻ (Trigger action):** Người dùng gõ địa chỉ IP vào ô nhập và nhấn phím Enter hoặc phím Space để tạo thẻ tag.
- **Cách thức xóa thẻ:** Click vào icon "x" trên thẻ, hoặc nhấn phím Backspace khi ô nhập đang trống.
- **Ràng buộc số lượng thẻ (Max tags):** Tối đa 50 thẻ. Hành vi khi vượt quá: Hệ thống vô hiệu hóa ô gõ, hiển thị tooltip *"Đã đạt số lượng IP tối đa là 50"*.
- **Ràng buộc ký tự từng thẻ:** Mỗi thẻ tối đa 15 ký tự (phù hợp định dạng IPv4).
- **Định dạng thẻ hợp lệ (Pattern/Regex):** Định dạng IPv4 chuẩn (ví dụ: `192.168.1.1`).
- **Quy tắc hiển thị khi tràn độ dài (Overflow):** Tự động bọc xuống dòng để tăng chiều cao của ô nhập liệu (Wrap).
- **Quy tắc Nghiệp vụ (Business Rules):**
  - Tự động trim khoảng trắng thừa ở đầu/cuối của IP trước khi tạo thẻ.
  - Không cho phép nhập trùng lặp IP đã tồn tại trong danh sách. Nếu trùng, hệ thống tự động xóa nội dung đang gõ và không tạo thẻ mới.
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Danh sách IP quét là bắt buộc!"` (`"Scan IP list is required!"`)
  - Sai định dạng thẻ: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Thẻ {Giá trị thẻ} không đúng định dạng IPv4!"` (`"Tag {Giá trị thẻ} is invalid IPv4 format!"`)

---

### 8. BUTTON (NÚT HÀNH ĐỘNG)

#### A. Biểu mẫu mô tả chuẩn (Template)
```markdown
##### {Tên nút}
- {Mô tả ngắn gọn hành vi khi click nút bấm. Ví dụ: Cho phép người dùng lưu... / Cho phép người dùng đóng...}
- **Trạng thái mặc định:** [Enabled / Disabled / Hidden]
- **Quyền hạn truy cập:** [Tất cả người dùng / Chỉ quyền cụ thể...]
- **Hành vi khi nhấn (OnClick Event):**
  Khi nhấn vào thì sẽ kiểm tra thông tin người dùng nhập:
  + Thông tin không hợp lệ thì sẽ hiển thị các thông báo lỗi tương ứng với từng trường thông tin không hợp lệ
  + Thông tin hợp lệ thì sẽ thực hiện {Hành động} {đối tượng}:
    . Khi bắt đầu gửi request xử lý: Hệ thống chuyển nút sang trạng thái Loading (hiển thị spinner xoay tròn, disable nút để chống việc người dùng click nhiều lần làm trùng request). Trạng thái disable này chỉ mở khóa sau khi có phản hồi kết quả (Response) từ API/hệ thống.
    . Nếu {Hành động} thành công thì sẽ đóng popup {Tên Popup}, trở về màn hình {Tên màn hình} và đồng thời hiển thị toast message tự động đóng với nội dung “{Hành động} {đối tượng} thành công!” (Ví dụ: "{Action} {object} successfully!")
    . Nếu {Hành động} không thành công thì sẽ hiển thị toast message tự động đóng với nội dung “{Hành động} {đối tượng} không thành công!” (Ví dụ: "Failed to {action} {object}!")
```

#### B. Ví dụ mẫu áp dụng thực tế (Nút "Lưu", "Thoát" & "Export")
##### Nút Lưu
- Cho phép người dùng thực hiện lưu và ghi nhận thông tin đã thay đổi.
- **Trạng thái mặc định:** Enabled
- **Quyền hạn truy cập:** Người dùng có quyền thêm mới lịch quét
- **Hành vi khi nhấn (OnClick Event):**
  Khi nhấn vào thì sẽ kiểm tra thông tin người dùng nhập:
  + Thông tin không hợp lệ thì sẽ hiển thị các thông báo lỗi tương ứng với từng trường thông tin không hợp lệ
  + Thông tin hợp lệ thì sẽ thực hiện thêm lịch quét:
    . Khi bắt đầu gửi request xử lý: Hệ thống chuyển nút sang trạng thái Loading (hiển thị spinner xoay tròn, disable nút). Trạng thái disable này chỉ mở khóa sau khi nhận được phản hồi từ máy chủ.
    . Nếu thêm lịch quét thành công thì sẽ đóng popup Thêm lịch quét, trở về màn hình Danh sách lịch quét và đồng thời hiển thị toast message tự động đóng với nội dung “Thêm lịch quét thành công!” ("Scan schedule added successfully!")
    . Nếu thêm lịch quét không thành công thì sẽ hiển thị toast message tự động đóng với nội dung “Thêm lịch quét không thành công!” ("Failed to add scan schedule!")

##### Nút Xuất File
- Cho phép người dùng thực hiện xuất dữ liệu báo cáo ra tệp tin.
- **Trạng thái mặc định:** Enabled
- **Quyền hạn truy cập:** Người dùng có quyền xem báo cáo
- **Hành vi khi nhấn (OnClick Event):**
  - Khi click vào nút, hệ thống kiểm tra các bộ lọc tìm kiếm đang chọn.
  - Ngay khi gửi request xuất file: Hệ thống chuyển nút sang trạng thái Loading (hiển thị spinner và disable nút). Nút chỉ hoạt động trở lại sau khi tệp tin đã được tạo xong và bắt đầu tải xuống (hoặc khi xuất hiện lỗi tải file).
  - Nếu xuất dữ liệu thành công: Tải file về máy người dùng và hiển thị toast message tự động đóng: `"Xuất báo cáo thành công!"` (`"Report exported successfully!"`).
  - Nếu xuất dữ liệu thất bại: Hiển thị toast message lỗi tự động đóng: `"Xuất báo cáo không thành công!"` (`"Failed to export report!"`) và mở khóa lại nút bấm.

##### Nút Thoát
- Cho phép người dùng thoát khỏi màn hình hiện tại mà không thực hiện lưu trữ dữ liệu.
- **Trạng thái mặc định:** Enabled
- **Quyền hạn truy cập:** Tất cả người dùng
- **Hành vi khi nhấn (OnClick Event):**
  - Không thực hiện kiểm tra dữ liệu đầu vào.
  - Hệ thống đóng popup Thêm lịch quét và quay trở về màn hình Danh sách lịch quét mà không lưu lại bất cứ thông tin nào người dùng đã nhập.
  - *Lưu ý:* Nếu người dùng đã thực hiện chỉnh sửa bất kỳ thông tin nào trên form, hiển thị Pop-up xác nhận hủy dữ liệu (Xem biểu mẫu Modal cảnh báo chưa lưu ở mục 11).

---

### 9. UPLOAD FILE (TẢI LÊN TỆP TIN)

#### A. Biểu mẫu mô tả chuẩn (Template)
```markdown
##### {Tên trường}
- {Mô tả ngắn gọn hành động tải file của người dùng. Ví dụ: Cho phép người dùng tải lên tài liệu thuyết minh...}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  - VI: Nhập {tên trường}
  - EN: Enter {tên trường bằng tiếng Anh}
- **Định dạng file cho phép:** Danh sách định dạng đuôi file `{Định dạng}` (Ví dụ: `.pdf, .docx, .xlsx`)
- **Dung lượng tối đa mỗi file:** Tối đa {Max Size} MB.
- **Số lượng file tối đa cho phép tải lên:** Tối đa {Max Count} file.
- **Chế độ hiển thị danh sách file đã tải lên (List Display Mode):**
  - Hiển thị danh sách file ngay dưới ô chọn file gồm các thông tin: [Tên file, Dung lượng file, Icon định dạng tương ứng, Icon Thùng rác/Dấu x để xóa, Thanh tiến trình tải lên - Progress bar].
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống (nếu bắt buộc) và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  - Chọn file sai định dạng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Định dạng file {Tên file} không hợp lệ! Chỉ cho phép tải lên file {Định dạng}."` (`"File format {Tên file} is invalid! Only {Định dạng} files are allowed."`)
  - Tải file quá dung lượng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Dung lượng file {Tên file} vượt quá giới hạn cho phép ({Max Size}MB)!"` (`"File size of {Tên file} exceeds the limit ({Max Size}MB)!"`)
  - Vượt quá số lượng file: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Số lượng file tải lên vượt quá giới hạn cho phép (Tối đa {Max Count} file)!"` (`"Number of uploaded files exceeds the limit (Max {Max Count} files)!"`)
```

#### B. Ví dụ mẫu áp dụng thực tế (Trường "Tài liệu thuyết minh")
##### Tài liệu thuyết minh
- Cho phép người dùng tải lên tài liệu thuyết minh đi kèm của thiết bị (không bắt buộc).
- **Định dạng file cho phép:** `.pdf`, `.docx`
- **Dung lượng tối đa mỗi file:** Tối đa 10 MB.
- **Số lượng file tối đa cho phép tải lên:** Tối đa 3 file.
- **Chế độ hiển thị danh sách file đã tải lên (List Display Mode):** Hiển thị danh sách các file đã upload thành công ngay phía dưới button chọn file, có hiển thị tên file kèm icon định dạng tương ứng, kích thước dung lượng và nút xóa "Thùng rác".
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Chọn file sai định dạng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Định dạng file {Tên file} không hợp lệ! Chỉ cho phép tải lên file .pdf, .docx."` (`"File format {Tên file} is invalid! Only .pdf, .docx files are allowed."`)
  - Tải file quá dung lượng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Dung lượng file {Tên file} vượt quá giới hạn cho phép (10MB)!"` (`"File size of {Tên file} exceeds the limit (10MB)!"`)
  - Vượt quá số lượng file: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Số lượng file tải lên vượt quá giới hạn cho phép (Tối đa 3 file)!"` (`"Number of uploaded files exceeds the limit (Max 3 files)!"`)

---

### 10. UPLOAD IMAGE (TẢI LÊN HÌNH ẢNH)

#### A. Biểu mẫu mô tả chuẩn (Template)
```markdown
##### {Tên trường}
- {Mô tả ngắn gọn hành động tải ảnh của người dùng. Ví dụ: Người dùng bắt buộc tải lên hình ảnh chụp thiết bị...}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  - VI: Chọn {tên trường}
  - EN: Select {tên trường bằng tiếng Anh}
- **Định dạng ảnh cho phép:** Danh sách định dạng đuôi ảnh `{Định dạng}` (Ví dụ: `.jpg, .png, .jpeg`)
- **Dung lượng tối đa mỗi ảnh:** Tối đa {Max Size} MB.
- **Số lượng ảnh tối đa cho phép tải lên:** Tối đa {Max Count} ảnh.
- **Chế độ hiển thị preview (Preview Mode):**
  - [Chọn một trong hai chế độ]:
    + **Dạng Đơn ảnh (Avatar/Single Logo):** Hiển thị trực tiếp ảnh đã tải lên trong khung {Hình tròn/Hình vuông} kích thước {Width}x{Height} px. Khi hover xuất hiện lớp mờ overlay có icon Máy ảnh/Thùng rác để click thay thế hoặc xóa ảnh.
    + **Dạng Nhiều ảnh (Gallery Grid):** Hiển thị dạng lưới (grid) các ảnh thumbnail nhỏ kích thước cố định. Mỗi thumbnail có icon "x" ở góc phải để người dùng click xóa ảnh nhanh. Cho phép click vào thumbnail để phóng to xem ảnh kích thước đầy đủ (Lightbox).
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống (nếu bắt buộc) và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  - Chọn ảnh sai định dạng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Định dạng ảnh {Tên file} không hợp lệ! Chỉ cho phép tải lên ảnh {Định dạng}."` (`"Image format {Tên file} is invalid! Only {Định dạng} images are allowed."`)
  - Tải ảnh quá dung lượng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Dung lượng ảnh {Tên file} vượt quá giới hạn cho phép ({Max Size}MB)!"` (`"Image size of {Tên file} exceeds the limit ({Max Size}MB)!"`)
  - Vượt quá số lượng ảnh: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Số lượng ảnh tải lên vượt quá giới hạn cho phép (Tối đa {Max Count} ảnh)!"` (`"Number of uploaded images exceeds the limit (Max {Max Count} images)!"`)
```

#### B. Ví dụ mẫu áp dụng thực tế (Trường "Ảnh thiết bị")
##### Ảnh thiết bị
- Người dùng bắt buộc tải lên hình ảnh chụp chi tiết của thiết bị.
- **Định dạng ảnh cho phép:** `.jpg`, `.jpeg`, `.png`
- **Dung lượng tối đa mỗi ảnh:** Tối đa 2 MB.
- **Số lượng ảnh tối đa cho phép tải lên:** Tối đa 5 ảnh.
- **Chế độ hiển thị preview (Preview Mode):** Dạng Nhiều ảnh (Gallery Grid), hiển thị các ảnh đã tải dạng thumbnail lưới. Có icon "x" màu đỏ ở góc phải mỗi thumbnail để xóa nhanh. Click vào ảnh sẽ mở popup zoom lớn (Lightbox).
- **Thông báo lỗi tương ứng (Validation & Error Messages):**
  - Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Ảnh thiết bị là bắt buộc!"` (`"Device image is required!"`)
  - Chọn ảnh sai định dạng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Định dạng ảnh {Tên file} không hợp lệ! Chỉ cho phép tải lên ảnh .jpg, .jpeg, .png."` (`"Image format {Tên file} is invalid! Only .jpg, .jpeg, .png images are allowed."`)
  - Tải ảnh quá dung lượng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Dung lượng ảnh {Tên file} vượt quá giới hạn cho phép (2MB)!"` (`"Image size of {Tên file} exceeds the limit (2MB)!"`)
  - Vượt quá số lượng ảnh: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Số lượng ảnh tải lên vượt quá giới hạn cho phép (Tối đa 5 ảnh)!"` (`"Number of uploaded images exceeds the limit (Max 5 images)!"`)

---

### 11. MODAL / POPUP (HỘP THOẠI XÁC NHẬN)

#### A. Biểu mẫu mô tả chuẩn (Template - Cho từng kịch bản cụ thể)

##### KỊCH BẢN XÁC NHẬN XÓA ĐỐI TƯỢNG
- **Tên Modal:** Hộp thoại xác nhận xóa {đối tượng}
- **Tiêu đề (Header):** `"Xác nhận xóa {đối tượng}"` (`"Confirm deletion of {đối tượng}"`)
- **Nội dung thông báo (Body text):** `"Bạn có chắc chắn muốn xóa {đối tượng} này không? Hành động này không thể hoàn tác."` (`"Are you sure you want to delete this {đối tượng}? This action cannot be undone."`)
- **Nút Xác nhận (Confirm Button):**
  - Nhãn nút: `"Xóa"` (`"Delete"`)
  - Hành vi khi nhấn: Hệ thống chuyển nút sang trạng thái Loading, disable toàn bộ các thao tác khác, thực hiện gọi API xóa. Kết quả trả về thành công/thất bại sẽ đóng modal và hiển thị Toast tương ứng.
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`) hoặc nhấn icon `x` ở góc phải trên.
  - Hành vi khi nhấn: Đóng hộp thoại, giữ nguyên dữ liệu hiện tại trên màn hình danh sách, không thực hiện hành động xóa.
- **Hành vi khi click vùng ngoài Modal:** Không đóng hộp thoại (để tránh việc người dùng click nhầm làm mất thao tác xác nhận).

##### KỊCH BẢN CẢNH BÁO DỮ LIỆU CHƯA LƯU KHI THOÁT FORM
- **Tên Modal:** Cảnh báo chưa lưu dữ liệu form {Tên Form}
- **Tiêu đề (Header):** `"Thông tin chưa được lưu"` (`"Unsaved changes"`)
- **Nội dung thông báo (Body text):** `"Thông tin bạn vừa nhập chưa được lưu lại. Bạn có chắc chắn muốn thoát và hủy bỏ các thay đổi này không?"` (`"The changes you made have not been saved. Are you sure you want to exit and discard these changes?"`)
- **Nút Xác nhận thoát (Confirm Button):**
  - Nhãn nút: `"Thoát không lưu"` (`"Exit without saving"`) hoặc `"Đồng ý"` (`"Discard Changes"`)
  - Hành vi khi nhấn: Đóng hộp thoại cảnh báo này, đồng thời đóng toàn bộ popup/form chính đang nhập dở, đưa người dùng trở lại màn hình danh sách trước đó và không lưu lại các thay đổi.
- **Nút Hủy/Giữ lại (Cancel Button):**
  - Nhãn nút: `"Giữ lại"` (`"Keep editing"`) hoặc `"Hủy"` (`"Cancel"`)
  - Hành vi khi nhấn: Đóng hộp thoại cảnh báo này, giữ nguyên trạng thái và toàn bộ dữ liệu đang nhập dở trên popup/form chính để người dùng tiếp tục chỉnh sửa.
- **Hành vi khi click vùng ngoài Modal:** Không đóng hộp thoại cảnh báo.

---

### 12. TOAST MESSAGE (THÔNG BÁO NHANH)

#### A. Biểu mẫu mô tả chuẩn (Template)
- **Loại thông báo:** [Success (Màu xanh lá) / Error (Màu đỏ) / Warning (Màu vàng) / Info (Màu xanh dương)]
- **Thời gian hiển thị (Timeout):** Tự động đóng (biến mất khỏi màn hình) sau 3 giây.
- **Vị trí hiển thị:** Góc trên cùng bên phải màn hình (Top-right).
- **Cấu trúc nội dung thông báo (Wording):**

##### LUỒNG TẠO MỚI (CREATE)
- **Thành công:**
  - VI: `"Thêm {đối tượng} thành công!"`
  - EN: `"{Đối tượng} added successfully!"`
- **Thất bại:**
  - VI: `"Thêm {đối tượng} không thành công!"`
  - EN: `"Failed to add {đối tượng}!"`

##### LUỒNG CẬP NHẬT (UPDATE)
- **Thành công:**
  - VI: `"Cập nhật {đối tượng} thành công!"`
  - EN: `"{Đối tượng} updated successfully!"`
- **Thất bại:**
  - VI: `"Cập nhật {đối tượng} không thành công!"`
  - EN: `"Failed to update {đối tượng}!"`

##### LUỒNG XÓA (DELETE)
- **Thành công:**
  - VI: `"Xóa {đối tượng} thành công!"`
  - EN: `"{Đối tượng} deleted successfully!"`
- **Thất bại:**
  - VI: `"Xóa {đối tượng} không thành công!"`
  - EN: `"Failed to delete {đối tượng}!"`

---

### 13. LABEL (NHÃN HIỂN THỊ / TIÊU ĐỀ)

#### A. Biểu mẫu mô tả chuẩn (Template)
```markdown
##### {Tên trường}
- Tiêu đề màn hình/popup, hiển thị tên mô tả tính năng {Tên tính năng}.
- **Nội dung hiển thị mặc định:** {Nội dung} (Ví dụ: "Add Integration Source")
- **Tính chất hiển thị:** [Tĩnh (Static - không đổi) / Động (Dynamic - thay đổi theo {Trường dữ liệu})]
```

---

## PHẦN 3: LƯU Ý KHI VIẾT ĐẶC TẢ ĐỂ TRÁNH MƠ HỒ (TIPS FOR BA)
1. **Sử dụng nhãn hiển thị (UI Label) trực tiếp làm tên trường**:
   * Thay vì sử dụng các mã trường phức tạp mang tính kỹ thuật (ví dụ: `TXT_DEVICE_NAME`, `CB_INTEGRATION_TYPE`), hãy sử dụng trực tiếp tên hiển thị thân thiện trên giao diện kèm bản dịch nếu có (ví dụ: `Tên thiết bị`, `Integration Type (Loại tích hợp)`). Điều này giúp tài liệu dễ đọc, dễ hiểu hơn cho cả khách hàng, BA, QA và Lập trình viên.
2. **Luôn mô tả kịch bản kích hoạt động (Dynamic Trigger)**:
   * Nếu có trường xuất hiện hoặc biến mất dựa theo lựa chọn khác, bắt buộc chỉ rõ các trường bị ảnh hưởng và hành vi reset giá trị mặc định của chúng khi bị ẩn đi.
3. **Quy định rõ hành vi chặn nhập vs báo lỗi sau**:
   * Chặn nhập (Ví dụ: không cho gõ quá 128 ký tự hoặc chặn ký tự chữ): Giúp giảm thiểu lỗi trước khi submit.
   * Báo lỗi sau (Ví dụ: khi bấm Lưu mới hiển thị lỗi trùng lặp): Dành cho các lỗi cần kiểm tra logic ở Backend hoặc cơ sở dữ liệu.
4. **Nhất quán câu chữ của thông báo lỗi**:
   * Dùng chung một cấu trúc câu thông báo lỗi cho toàn hệ thống để lập trình viên cấu hình tệp đa ngôn ngữ (i18n) dễ dàng và nhất quán.
