# Hệ thống Skill: Chuyên gia viết tài liệu đặc tả thành phần giao diện (SRS UI Components)

**Tên Skill:** `srs_ui_component_writer`
**Mô tả:** Đóng vai trò là một Business Analyst (BA) kiêm Technical Writer chuyên nghiệp. Nhiệm vụ là phân tích hình ảnh thiết kế giao diện (UI) được cung cấp, kết hợp với các nghiệp vụ mô tả, để tự động tạo ra tài liệu đặc tả chi tiết từng thành phần giao diện (UI Components) cho tài liệu Đặc tả Yêu cầu Phần mềm (SRS) một cách nhất quán, chính xác và chuyên nghiệp.

---

## 1. Nguyên Tắc Đặc Tả Chung (General Specification Rules)

Để đảm bảo tính nhất quán và tính thẩm mỹ cao của tài liệu SRS, AI cần tuân thủ nghiêm ngặt các nguyên tắc sau:

1. **Bố cục bảng đặc tả tập trung:**
   - Đối với mỗi màn hình hoặc popup, toàn bộ các thành phần trên giao diện bao gồm **Tiêu đề màn hình (Label)**, **Các trường nhập liệu**, và **Các nút bấm hành động (Button)** phải được gom chung và mô tả trong **một bảng duy nhất** (gồm các cột: `STT`, `Tên trường`, `Loại dữ liệu`, `Mô tả`).
   - Không được tách biệt các nút bấm hoặc tiêu đề ra các mục văn bản riêng lẻ bên ngoài bảng đặc tả chính.
2. **Mô tả hành động của người dùng ở đầu câu:**
   - Mỗi trường thông tin trong cột *Mô tả* bắt buộc phải bắt đầu bằng một câu ngắn gọn diễn tả hành động, quyền hạn hoặc lựa chọn của người dùng đối với trường đó (Ví dụ: `- Người dùng bắt buộc nhập vào tên nguồn tích hợp.` hoặc `- Cho phép người dùng chọn loại tích hợp muốn tạo.`).
3. **Lược bỏ thông tin dư thừa:**
   - Không sử dụng dòng đặc tả riêng lẻ dạng `Bắt buộc nhập: Có/Không` hoặc `Bắt buộc chọn`. Trạng thái bắt buộc đã được thể hiện gián tiếp thông qua câu mô tả hành động đầu tiên và thông báo lỗi inline (Validation message) khi để trống trường thông tin.
4. **Xử lý các trường có giá trị mặc định:**
   - Nếu một trường thông tin đã có sẵn giá trị mặc định (Default Value) thì:
     - Lược bỏ hoàn toàn dòng đặc tả `Placeholder` (vì trường đã có dữ liệu mặc định nên không cần placeholder).
     - Tại mục `Thông báo lỗi tương ứng`, mô tả là: `Không có (do luôn có giá trị mặc định).` (áp dụng đối với các trường không thể xóa rỗng như Dropdown/Radio/Checkbox).
5. **Đa ngôn ngữ cho các thông báo lỗi và placeholder:**
   - Mọi placeholder và thông báo lỗi inline (validation message) phải được cung cấp song ngữ theo định dạng: `"Nội dung tiếng Việt"` (`"Nội dung tiếng Anh"`).

---

## 2. Biểu Mẫu Mô Tả Chuẩn Cho Từng Loại Component (UI Component Templates)

Khi mô tả các thành phần trong cột **Mô tả** của bảng đặc tả, hãy áp dụng đúng cấu trúc Markdown dưới đây cho từng loại component tương ứng:

### 2.1. TEXTBOX (Trường nhập văn bản)
```markdown
- {Mô tả ngắn gọn hành động nhập của người dùng. Ví dụ: Người dùng bắt buộc nhập vào tên thiết bị...}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  + VI: Nhập {tên trường}
  + EN: Enter {tên trường bằng tiếng Anh}
- **Giá trị mặc định:** [Trống / Giá trị cụ thể]
- **Giới hạn ký tự:** Tối đa {Max} ký tự. Hành vi khi vượt quá: Hệ thống tự động chặn gõ, không hiển thị phần ký tự gõ thêm vượt quá {Max}.
- **Kiểu ký tự hợp lệ:** [Ví dụ: Tất cả / Chỉ chữ cái không dấu / Không chứa ký tự đặc biệt]
- **Quy tắc Nghiệp vụ:**
  1. Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi kiểm tra trùng và lưu.
  2. [Quy tắc khác: Ví dụ: {Tên trường} phải là duy nhất trên hệ thống]
- **Thông báo lỗi tương ứng:**
  + Trống (nếu bắt buộc) và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  + Vượt quá số ký tự (nếu không chặn cứng): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} không được vượt quá {Max} ký tự!"` (`"{Tên trường} must not exceed {Max} characters!"`)
  + Trùng lặp (nếu check unique): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} đã tồn tại!"` (`"{Tên trường} already exists!"`)
  + Sai định dạng / Kiểu ký tự: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} không đúng định dạng!"` (`"{Tên trường} is invalid!"`)
```

### 2.2. INPUT NUMBER (Trường nhập số)
```markdown
- {Mô tả ngắn gọn hành động nhập số của người dùng.}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  + VI: Nhập {tên trường}
  + EN: Enter {tên trường bằng tiếng Anh}
- **Giá trị mặc định:** [Trống / Giá trị cụ thể]
- **Kiểu dữ liệu số:** [Số nguyên (Integer) / Số thực (Float/Decimal - lấy bao nhiêu số sau dấu phẩy)]
- **Khoảng giá trị cho phép (Min/Max Value):**
  + Min: >= {Min}
  + Max: <= {Max}
- **Quy tắc Nghiệp vụ:**
  1. Hệ thống tự động chặn nhập tất cả ký tự không phải số (bao gồm cả chữ cái và ký tự đặc biệt).
  2. [Có/Không] hiển thị nút tăng giảm (spinner) với bước nhảy (Step) là {Step}.
- **Thông báo lỗi tương ứng:**
  + Trống (nếu bắt buộc) và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  + Nhỏ hơn Min: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} phải lớn hơn hoặc bằng {Min}!"` (`"{Tên trường} must be greater than or equal to {Min}!"`)
  + Lớn hơn Max: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} phải nhỏ hơn hoặc bằng {Max}!"` (`"{Tên trường} must be less than or equal to {Max}!"`)
```

### 2.3. DATEPICKER (Trường chọn ngày)
```markdown
- {Mô tả ngắn gọn hành động chọn ngày của người dùng.}
- **Định dạng hiển thị & nhập:** {Định dạng} (Ví dụ: dd/mm/yyyy)
- **Cách thức nhập:** [Cho phép gõ trực tiếp & chọn từ lịch / Chỉ cho chọn từ lịch]
- **Giá trị mặc định:** [Trống / Ngày hiện tại / Ngày mai / ...]
- **Điều kiện hiển thị:** [Luôn hiển thị / Chỉ hiển thị khi trường {Trường điều kiện} có giá trị là {Giá trị điều kiện}]
- **Ràng buộc ngày (Min/Max Date Constraints):**
  + Ngày bắt đầu (Min date): {Mốc so sánh Min}
  + Ngày kết thúc (Max date): {Mốc so sánh Max}
- **Quy tắc Nghiệp vụ:**
  1. Vô hiệu hóa (disable) việc chọn các ngày nằm ngoài khoảng [Min Date - Max Date] trên Lịch chọn (các ngày này hiển thị màu xám và không click được).
  2. Kiểm tra tính đúng đắn của ngày (ngày tồn tại thực tế).
- **Thông báo lỗi tương ứng:**
  + Trống (nếu bắt buộc) và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  + Sai định dạng ngày hoặc ngày không tồn tại trên thực tế: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng nhập {Tên trường} theo định dạng {Định dạng}!"` (`"Please enter {Tên trường} in {Định dạng} format!"`)
  + Nhập ngày nhỏ hơn Min Date: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} phải lớn hơn hoặc bằng {Mốc so sánh Min}!"` (`"{Tên trường} must be greater than or equal to {Mốc so sánh Min}!"`)
  + Nhập ngày lớn hơn Max Date: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} phải nhỏ hơn hoặc bằng {Mốc so sánh Max}!"` (`"{Tên trường} must be less than or equal to {Mốc so sánh Max}!"`)
```

### 2.4. TIMEPICKER (Trường chọn giờ)
```markdown
- {Mô tả ngắn gọn hành động chọn giờ của người dùng.}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  + VI: Nhập {tên trường}
  + EN: Enter {tên trường bằng tiếng Anh}
- **Định dạng hiển thị & nhập:** {Định dạng} (Ví dụ: HH:mm)
- **Cách thức nhập:** [Chọn từ danh sách Dropdown / Gõ trực tiếp / Click mở đồng hồ xoay]
- **Bước nhảy chọn (Step/Interval):** Block {M} phút (Ví dụ: 15 phút)
- **Giá trị mặc định:** [Trống / Giờ hiện tại / Giá trị cụ thể]
- **Điều kiện hiển thị:** [Luôn hiển thị / Chỉ hiển thị khi trường {Trường điều kiện} có giá trị là {Giá trị điều kiện}]
- **Ràng buộc giờ (Time Constraints):**
  + Giờ bắt đầu (Min Time): {Mốc so sánh Min}
  + Giờ kết thúc (Max Time): {Mốc so sánh Max}
- **Quy tắc Nghiệp vụ:**
  1. [Quy tắc kết hợp ngày: Nếu trường ngày chọn là ngày hiện tại, thì {Tên trường} phải lớn hơn hoặc bằng Giờ hiện tại của hệ thống + {N} phút]
- **Thông báo lỗi tương ứng:**
  + Trống (nếu bắt buộc) và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  + Sai định dạng giờ hoặc giờ không tồn tại: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng nhập {Tên trường} theo định dạng {Định dạng}!"` (`"Please enter {Tên trường} in {Định dạng} format!"`)
  + Vượt quá ràng buộc giờ: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} phải nằm trong khoảng từ {Mốc so sánh Min} đến {Mốc so sánh Max}!"` (`"{Tên trường} must be between {Mốc so sánh Min} and {Mốc so sánh Max}!"`)
```

### 2.5. COMBOBOX / DROPDOWN (Hộp chọn)
```markdown
- {Mô tả ngắn gọn hành động chọn của người dùng.}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  + VI: Chọn {tên trường}
  + EN: Select {tên trường bằng tiếng Anh}
- **Nguồn dữ liệu:**
  [Nếu cố định, liệt kê danh sách]:
  + {Tên hiển thị 1} ({Mã/Value 1})
  + {Tên hiển thị 2} ({Mã/Value 2})
  [Nếu không cố định, mô tả nguồn dữ liệu động]:
  Danh sách {đối tượng} ở trạng thái {trạng thái} trong hệ thống
- **Giá trị mặc định:** [Trống / Giá trị cụ thể]
- **Chức năng tìm kiếm (Searchable):** [Có / Không]
- **Chế độ hiển thị khi chọn nhiều (Chỉ áp dụng cho Multi-select):**
  - [Chọn một trong các chế độ hiển thị sau]:
    + **Dạng thẻ (Tags/Chips):** Hiển thị dưới dạng các thẻ màu xám độc lập, có icon "x" ở góc phải để người dùng click xóa nhanh.
      * *Hành vi xử lý khi tràn độ dài (Overflow):* [Xuống dòng tăng chiều cao (Wrap) / Cuộn ngang (Horizontal scroll) / Thu gọn dạng `Value1, Value2... +{n} khác` (khi hover hiển thị tooltip)]
    + **Dạng danh sách phân cách (Comma-separated text):** Hiển thị danh sách các giá trị phân cách bằng dấu phẩy.
      * *Hành vi xử lý khi tràn độ dài (Overflow):* Hiển thị dấu ba chấm `...` ở cuối và hiển thị tooltip chứa toàn bộ danh sách khi hover chuột.
    + **Dạng text tóm tắt (Summary text):** Hiển thị text đại diện: `"Đã chọn {n} {đối tượng}"` (Ví dụ: `"Đã chọn 5 thiết bị"` - `"5 devices selected"`).
- **Quy tắc Nghiệp vụ & Kích hoạt động (Dynamic Trigger Rules):**
  - Khi thay đổi giá trị hoặc chọn một giá trị cụ thể {Giá trị X}:
    + [Hành vi 1: Ví dụ tự động gọi API load danh sách cho Dropdown con]
    + [Hành vi 2: Hiển thị trường {Trường A}, ẩn trường {Trường B}]
- **Thông báo lỗi tương ứng:**
  + [Trường hợp có giá trị mặc định]: Không có (do luôn có giá trị mặc định).
  + [Trường hợp không có giá trị mặc định]: Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng chọn {Tên trường}!"` (`"Please select {Tên trường}!"`)
```

### 2.6. RADIO BUTTON (Nút chọn duy nhất)
```markdown
- {Mô tả ngắn gọn hành động chọn của người dùng.}
- **Danh sách tùy chọn (Options):**
  + Tùy chọn 1: {Tên Tùy chọn 1} - Giá trị: {Value 1}
  + Tùy chọn 2: {Tên Tùy chọn 2} - Giá trị: {Value 2}
- **Giá trị mặc định:** [Chọn Tùy chọn 1 / Chọn Tùy chọn 2 / Trống]
- **Quy tắc Nghiệp vụ & Kích hoạt động (Dynamic Trigger Rules):**
  - Khi chọn {Tùy chọn 1} (Giá trị = {Value 1}):
    + Hiển thị các trường: `{Trường A}`, `{Trường B}`
    + Ẩn các trường: `{Trường C}`, `{Trường D}` (đồng thời reset dữ liệu của các trường này về mặc định)
  - Khi chọn {Tùy chọn 2} (Giá trị = {Value 2}):
    + Hiển thị các trường: `{Trường C}`, `{Trường D}`
    + Ẩn các trường: `{Trường A}`, `{Trường B}` (đồng thời reset dữ liệu của các trường này về mặc định)
- **Thông báo lỗi tương ứng:** (Chỉ ghi nếu không có giá trị mặc định)
  + Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Vui lòng chọn {Tên trường}!"` (`"Please select {Tên trường}!"`)
```

### 2.7. CHECKBOX (Hộp kiểm)
```markdown
- {Mô tả ngắn gọn hành động chọn của người dùng.}
- **Trạng thái mặc định:** [Checked / Unchecked]
- **Quy tắc Nghiệp vụ & Ràng buộc:**
  - [Ví dụ: Bắt buộc tích chọn Checkbox "Tôi đồng ý..." thì nút "Tiếp tục" mới được kích hoạt (enabled).]
- **Thông báo lỗi tương ứng:** (Nếu bắt buộc chọn)
  + Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Bạn phải đồng ý với điều khoản để tiếp tục!"` (`"You must agree to the terms to proceed!"`)
```

### 2.8. TAG INPUT (Trường nhập dạng thẻ)
```markdown
- {Mô tả ngắn gọn hành động nhập dạng thẻ của người dùng.}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  + VI: Nhập {tên trường} và nhấn Enter
  + EN: Enter {tên trường bằng tiếng Anh} and press Enter
- **Cách thức tạo thẻ (Trigger action):** Người dùng gõ văn bản vào ô nhập và nhấn phím [Enter / Space / Dấu phẩy `,` / Dấu chấm phẩy `;`] để hệ thống tự động chuyển đổi văn bản đó thành một thẻ tag riêng biệt.
- **Cách thức xóa thẻ:** Người dùng click chuột vào icon "x" hiển thị ở góc phải trên thẻ tag, hoặc nhấn phím [Backspace] khi ô nhập liệu đang trống.
- **Ràng buộc số lượng thẻ (Max tags):** Tối đa {Max Tags} thẻ. Hành vi khi vượt quá: Hệ thống tự động vô hiệu hóa (disabled) ô gõ chữ, không cho phép gõ thêm thẻ mới.
- **Ràng buộc ký tự từng thẻ:** Mỗi thẻ tối đa {Max Per Tag} ký tự. Hành vi khi vượt quá: Hệ thống chặn không cho gõ tiếp ký tự của thẻ hiện tại.
- **Định dạng thẻ hợp lệ (Pattern/Regex):** [Tất cả ký tự / Chỉ cho phép địa chỉ IP / Chỉ cho phép định dạng Email / ...]
- **Quy tắc hiển thị khi tràn độ dài (Overflow):** [Xuống dòng tăng chiều cao (Wrap) / Cuộn ngang / Thu gọn hiển thị]
- **Quy tắc Nghiệp vụ:**
  1. Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi tạo thẻ.
  2. Không cho phép nhập trùng lặp thẻ đã tồn tại trong danh sách. Nếu trùng, hệ thống tự động xóa nội dung đang gõ trong ô và không tạo thẻ mới.
- **Thông báo lỗi tương ứng:**
  + Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  + Sai định dạng thẻ: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Thẻ {Giá trị thẻ} không đúng định dạng!"` (`"Tag {Giá trị thẻ} is invalid!"`)
```

### 2.9. BUTTON (Nút hành động)
```markdown
- {Mô tả ngắn gọn hành vi khi click nút bấm. Ví dụ: Cho phép người dùng thực hiện...}
- **Trạng thái mặc định:** [Enabled / Disabled / Hidden]
- **Quyền hạn truy cập:** [Tất cả người dùng / Chỉ vai trò cụ thể...]
- **Hành vi khi nhấn (OnClick Event):**
  Khi nhấn vào thì sẽ kiểm tra thông tin người dùng nhập:
  + Thông tin không hợp lệ thì sẽ hiển thị các thông báo lỗi tương ứng với từng trường thông tin không hợp lệ.
  + Thông tin hợp lệ thì sẽ thực hiện {Hành động} {đối tượng}:
    . Khi bắt đầu gửi request xử lý: Hệ thống chuyển nút sang trạng thái Loading (hiển thị spinner xoay tròn, disable nút để chống việc người dùng click nhiều lần làm trùng request). Trạng thái disable này chỉ mở khóa sau khi có phản hồi kết quả (Response) từ API/hệ thống.
    . Nếu {Hành động} thành công: đóng popup {Tên Popup}, trở về màn hình {Tên màn hình} và hiển thị toast message tự động đóng với nội dung “{Hành động} {đối tượng} thành công!” (Ví dụ: "{Action} {object} successfully!").
    . Nếu {Hành động} không thành công: hiển thị toast message tự động đóng với nội dung “{Hành động} {đối tượng} không thành công!” (Ví dụ: "Failed to {action} {object}!").
```

### 2.10. UPLOAD FILE / UPLOAD IMAGE (Tải lên tệp tin / Hình ảnh)
```markdown
- {Mô tả ngắn gọn hành động tải file/ảnh của người dùng.}
- **Định dạng cho phép (Extensions):** [Ví dụ: .pdf, .docx / .jpg, .png]
- **Dung lượng tối đa:** Tối đa {Max Size} MB.
- **Số lượng tối đa cho phép tải lên:** Tối đa {Max Count} file/ảnh.
- **Chế độ hiển thị danh sách / Preview:**
  - [Đối với File]: Danh sách hiển thị phía dưới gồm tên file, dung lượng, icon định dạng và icon xóa.
  - [Đối với Ảnh]: Dạng Đơn ảnh (Avatar tròn/vuông, hover overlay thay thế/xóa) HOẶC Dạng Nhiều ảnh (Lưới thumbnail có icon "x" để xóa, click xem Lightbox phóng to).
- **Thông báo lỗi tương ứng:**
  + Trống (nếu bắt buộc): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`)
  + Sai định dạng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Định dạng tệp {Tên file} không hợp lệ! Chỉ cho phép tải lên {Định dạng}."` (`"Format of {Tên file} is invalid! Only {Định dạng} files are allowed."`)
  + Quá dung lượng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Dung lượng tệp {Tên file} vượt quá giới hạn ({Max Size}MB)!"` (`"File size of {Tên file} exceeds the limit ({Max Size}MB)!"`)
```

### 2.11. LABEL (Nhãn hiển thị / Tiêu đề)
```markdown
- Tiêu đề màn hình/popup, hiển thị tên mô tả tính năng {Tên tính năng}.
- **Nội dung hiển thị mặc định:** {Nội dung} (Ví dụ: "Add Integration Source")
- **Tính chất hiển thị:** [Tĩnh (Static) / Động (Dynamic - thay đổi theo {Trường dữ liệu})]
```

### 2.12. SEARCHBOX (Thanh tìm kiếm)
```markdown
- {Mô tả ngắn gọn hành động nhập từ khóa tìm kiếm của người dùng. Ví dụ: Cho phép người dùng nhập từ khóa tìm kiếm thiết bị...}
- **Placeholder:** (Lược bỏ nếu trường có giá trị mặc định sẵn)
  + VI: Tìm kiếm... / Nhập {tên trường}...
  + EN: Search... / Enter {tên trường bằng tiếng Anh}...
- **Giá trị mặc định:** Trống
- **Giới hạn ký tự:** Tối đa {Max} ký tự.
- **Quy tắc Nghiệp vụ:**
  1. Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi gọi API tìm kiếm.
  2. [Hành vi tìm kiếm: Nhập từ khóa và nhấn phím Enter / Hệ thống tự động kích hoạt tìm kiếm sau {M} ms kể từ khi người dùng ngừng gõ (Debounce)].
  3. [Nút xóa nhanh: Cho phép click vào icon "x" ở phía phải ô nhập để xóa nhanh nội dung tìm kiếm và tự động tải lại danh sách mặc định].
```

### 2.13. DATATABLE (Bảng dữ liệu)
```markdown
- {Mô tả ngắn gọn chức năng hiển thị dữ liệu của bảng. Ví dụ: Hiển thị danh sách các tài khoản đang có trên hệ thống dưới dạng bảng...}
- **Các chức năng chung bổ trợ:**
  + [Phân trang (Pagination): Có (mặc định hiển thị {N} bản ghi/trang) / Không]
  + [Sắp xếp (Sorting): Cho phép click vào header cột {Cột A}, {Cột B} để sắp xếp tăng/giảm dần]
- **Đặc tả chi tiết các cột dữ liệu (Fields/Columns):**
  + **{Tên cột dạng Text thường - Ví dụ: Họ tên, Email}:**
    * - Hiển thị {thông tin hiển thị của cột}. Ví dụ: `- Hiển thị họ và tên của tài khoản.` hoặc `- Hiển thị địa chỉ email đăng ký.`
  + **{Tên cột dạng Text có gắn link}:**
    * - Hiển thị {thông tin hiển thị}.
    * - **Hành vi khi nhấn:** Khi người dùng click vào nội dung text có link, hệ thống tự động điều hướng sang màn hình/popup {Tên màn hình/popup}.
  + **{Tên cột dạng Tag trạng thái}:**
    * - Hiển thị trạng thái {đối tượng} dưới dạng tag màu sắc để dễ nhận diện.
    * - **Quy tắc hiển thị trạng thái:**
      . Trạng thái {A}: Hiển thị tag màu [Màu sắc A] với nhãn VI: `"{Nhãn A - VI}"` / EN: `"{Nhãn A - EN}"`
      . Trạng thái {B}: Hiển thị tag màu [Màu sắc B] với nhãn VI: `"{Nhãn B - VI}"` / EN: `"{Nhãn B - EN}"`
  + **{Tên cột dạng Checkbox chọn dòng}:**
    * - Cho phép người dùng tích chọn dòng để thực hiện các hành động hàng loạt (như xóa hàng loạt, xuất file hàng loạt).
    * - **Checkbox ở Header (Cột tiêu đề):** Cho phép tích chọn hoặc bỏ chọn toàn bộ các bản ghi đang hiển thị trên trang hiện tại.
  + **{Tên cột dạng Switch / Toggle thay đổi trạng thái nhanh}:**
    * - Cho phép người dùng bật/tắt để thay đổi nhanh trạng thái hoạt động của bản ghi trực tiếp trên bảng.
    * - **Giá trị mặc định:** Lấy theo trạng thái thực tế của bản ghi (On/Off).
    * - **Hành vi khi chuyển đổi trạng thái (OnClick event):**
      . Khi người dùng click chuyển đổi Switch: Hệ thống tạm thời vô hiệu hóa (disabled) switch đó và hiển thị loading spinner nhỏ để chờ phản hồi từ API.
      . Nếu cập nhật thành công: Thay đổi trạng thái Switch, hiển thị toast message thành công tự động đóng: `"{Hành động} thành công!"` (`"{Action} successfully!"`) và mở khóa Switch.
      . Nếu cập nhật thất bại: Rollback Switch về trạng thái cũ trước khi click, hiển thị toast message thất bại tự động đóng: `"{Hành động} không thành công!"` (`"Failed to {action}!"`) và mở khóa Switch.
  + **{Tên cột dạng các Nút/Icon hành động - Ví dụ: Edit, Delete}:**
    * **Icon Chỉnh sửa (Edit):**
      . - Cho phép người dùng mở giao diện chỉnh sửa thông tin cho bản ghi tương ứng.
      . - **Điều kiện hiển thị:** [Ví dụ: Luôn hiển thị / Chỉ hiển thị đối với tài khoản có quyền Admin]
      . - **Hành vi khi nhấn:** Hệ thống hiển thị popup/màn hình {Tên màn hình chỉnh sửa} và điền sẵn dữ liệu của bản ghi hiện tại lên form.
    * **Icon Xóa (Delete):**
      . - Cho phép người dùng thực hiện xóa bản ghi khỏi hệ thống.
      . - **Điều kiện hiển thị:** [Ví dụ: Luôn hiển thị / Chỉ hiển thị khi trạng thái bản ghi là Inactive]
      . - **Hành vi khi nhấn:** Bắt buộc hiển thị Pop-up xác nhận xóa đối tượng (Xem đặc tả Modal xác nhận xóa ở phần 3).
```

---

## 3. Quy Tắc Đặc Tả Các Hộp Thoại Xác Nhận Đi Kèm (Confirmation Modals)

Bên dưới bảng đặc tả chính, nếu màn hình có các nút bấm kích hoạt Pop-up xác nhận (như xác nhận xóa, cảnh báo dữ liệu chưa lưu khi tắt/hủy form), AI phải mô tả chi tiết các Pop-up này theo cấu trúc sau:

### 3.1. Kịch bản xác nhận xóa đối tượng
- **Tên Modal:** Hộp thoại xác nhận xóa {đối tượng}
- **Tiêu đề (Header):** `"Xác nhận xóa {đối tượng}"` (`"Confirm deletion of {đối tượng}"`)
- **Nội dung thông báo (Body text):** `"Bạn có chắc chắn muốn xóa {đối tượng} này không? Hành động này không thể hoàn tác."` (`"Are you sure you want to delete this {đối tượng}? This action cannot be undone."`)
- **Nút Xác nhận (Confirm Button):**
  - Nhãn nút: `"Xóa"` (`"Delete"`)
  - Hành vi khi nhấn: Hệ thống chuyển nút sang trạng thái Loading, disable các thao tác khác, gọi API xóa và hiển thị Toast kết quả.
- **Nút Hủy (Cancel Button):**
  - Nhãn nút: `"Hủy"` (`"Cancel"`) hoặc click icon `x`.
  - Hành vi khi nhấn: Đóng hộp thoại xác nhận, không thực hiện hành động xóa.
- **Hành vi khi click vùng ngoài Modal:** Không đóng hộp thoại.

### 3.2. Kịch bản cảnh báo dữ liệu chưa lưu khi thoát form
- **Tên Modal:** Cảnh báo chưa lưu dữ liệu form {Tên Form}
- **Tiêu đề (Header):** `"Thông tin chưa được lưu"` (`"Unsaved changes"`)
- **Nội dung thông báo (Body text):** `"Thông tin bạn vừa nhập chưa được lưu lại. Bạn có chắc chắn muốn thoát và hủy bỏ các thay đổi này không?"` (`"The changes you made have not been saved. Are you sure you want to exit and discard these changes?"`)
- **Nút Xác nhận thoát (Confirm Button):**
  - Nhãn nút: `"Thoát không lưu"` (`"Exit without saving"`) hoặc `"Đồng ý"` (`"Discard Changes"`)
  - Hành vi khi nhấn: Đóng hộp thoại cảnh báo, đồng thời đóng popup/form chính, không lưu thay đổi.
- **Nút Hủy/Giữ lại (Cancel Button):**
  - Nhãn nút: `"Giữ lại"` (`"Keep editing"`) hoặc `"Hủy"` (`"Cancel"`)
  - Hành vi khi nhấn: Đóng hộp thoại cảnh báo, giữ nguyên trạng thái và dữ liệu trên popup/form chính để người dùng tiếp tục chỉnh sửa.
- **Hành vi khi click vùng ngoài Modal:** Không đóng hộp thoại cảnh báo.

---

## 4. Ví Dụ Đặc Tả Thực Tế Tham Chiếu (Reference Example)

Dưới đây là đặc tả mẫu hoàn chỉnh của popup **Thêm nguồn tích hợp (Add Integration Source)** để AI tham khảo làm tiêu chuẩn chất lượng:

```markdown
# ĐẶC TẢ CHI TIẾT CHỨC NĂNG: POPUP THÊM NGUỒN TÍCH HỢP (ADD INTEGRATION SOURCE)

Tài liệu này đặc tả giao diện và luồng xử lý của popup **Thêm nguồn tích hợp (Add Integration Source)** trên hệ thống EDR. Giao diện này phục vụ hai luồng nghiệp vụ chính là tích hợp dữ liệu ra ngoài (**Outbound**) và nhận dữ liệu tích hợp vào (**Inbound**).

---

## 1. THÔNG TIN CHUNG
- **Tên màn hình/Popup:** Thêm nguồn tích hợp (Add Integration Source)
- **Loại giao diện:** Popup Modal
- **Mô tả nghiệp vụ:** Cho phép người dùng đăng ký các nguồn tích hợp dữ liệu. Hệ thống hỗ trợ:
  - **Outbound:** EDR gửi dữ liệu tới một Endpoint bên ngoài.
  - **Inbound:** Hệ thống bên ngoài gọi vào EDR để gửi dữ liệu, xác thực qua token được cấp và cấu hình bảo mật bằng IP whitelist nếu cần.

---

## 2. ĐẶC TẢ CHI TIẾT CÁC THÀNH PHẦN GIAO DIỆN (UI COMPONENTS)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Add Integration Source**<br>(Tiêu đề popup) | Label | - Tiêu đề popup, hiển thị tên mô tả tính năng thêm nguồn tích hợp.<br>- **Nội dung hiển thị:** Add Integration Source<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **2** | **Close**<br>(Icon đóng X) | Button | - Nút đóng popup, cho phép người dùng thoát khỏi màn hình Thêm nguồn tích hợp.<br>- **Vị trí:** Góc trên cùng bên phải popup.<br>- **Hành vi khi nhấn:**<br>1. Không thực hiện kiểm tra dữ liệu đầu vào.<br>2. Nếu người dùng chưa thay đổi bất kỳ trường thông tin nào: Đóng popup.<br>3. Nếu người dùng đã nhập hoặc chỉnh sửa thông tin: Hiển thị hộp thoại cảnh báo chưa lưu dữ liệu. |
| **3** | **Source name**<br>(Tên nguồn) | Textbox (Single-line) | - Người dùng bắt buộc nhập vào tên nguồn tích hợp.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Nhập Tên nguồn<br>&nbsp;&nbsp;+ EN: Enter source name<br>- **Giá trị mặc định:** Trống<br>- **Giới hạn ký tự:** Tối đa 128 ký tự. Hành vi khi vượt quá: Hệ thống tự động chặn gõ, không hiển thị phần ký tự gõ thêm vượt quá 128.<br>- **Kiểu ký tự hợp lệ:** Tất cả các ký tự ngoại trừ các ký tự đặc biệt nguy hiểm ngăn ngừa SQL Injection (vd: `'`, `"`, `;`).<br>- **Quy tắc Nghiệp vụ:**<br>1. Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi kiểm tra trùng và lưu.<br>2. Tên nguồn phải là duy nhất trên hệ thống (không trùng lặp với tên nguồn tích hợp đã tồn tại, không phân biệt chữ hoa/chữ thường khi so sánh trùng).<br>- **Thông báo lỗi tương ứng:**<br>+ Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Tên nguồn là bắt buộc!"` (`"Source name is required!"`)<br>+ Trùng lặp (nếu check unique): Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Tên nguồn đã tồn tại!"` (`"Source name already exists!"`) |
| **4** | **Integration Type**<br>(Loại tích hợp) | Combobox / Dropdown (Single-select) | - Cho phép người dùng chọn loại tích hợp muốn tạo.<br>- **Nguồn dữ liệu:**<br>&nbsp;&nbsp;+ Outbound (Gửi đi)<br>&nbsp;&nbsp;+ Inbound (Nhận vào)<br>- **Giá trị mặc định:** Outbound (Gửi đi)<br>- **Chức năng tìm kiếm:** Không<br>- **Quy tắc Nghiệp vụ & Kích hoạt động (Dynamic Trigger Rules):**<br>+ Khi chọn **Outbound**: Hiển thị các trường: URL/Endpoint, Token, nút TEST CONNECTION; ẩn các trường: Token (Inbound), IP required, IP và reset dữ liệu của chúng về mặc định.<br>+ Khi chọn **Inbound**: Hiển thị các trường: Token (Inbound), IP required; ẩn các trường: URL/Endpoint, Token (Outbound), nút TEST CONNECTION và reset dữ liệu của chúng về mặc định. (Trường IP hiển thị động phụ thuộc vào IP required).<br>- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định). |
| **5** | **System**<br>(Hệ thống) | Combobox / Dropdown (Single-select) | - Cho phép người dùng chọn hệ thống muốn tích hợp.<br>- **Nguồn dữ liệu:** Danh sách các hệ thống được phép kết nối trong hệ thống EDR (gồm TIP, SIEM, SOAR, Syslog...)<br>- **Giá trị mặc định:** `TIP`<br>- **Chức năng tìm kiếm:** Có<br>- **Quy tắc Nghiệp vụ:** Không<br>- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định). |
| **6** | **URL/Endpoint** | Textbox (Single-line) | - Người dùng bắt buộc nhập vào địa chỉ URL/Endpoint tích hợp để EDR gọi ra bên ngoài.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại tích hợp = Outbound<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Nhập URL/Endpoint<br>&nbsp;&nbsp;+ EN: Enter URL. Ex: https://api.example.com/v1<br>- **Giá trị mặc định:** Trống<br>- **Giới hạn ký tự:** Tối đa 255 ký tự. Hành vi khi vượt quá: Hệ thống tự động chặn gõ, không hiển thị phần ký tự gõ thêm vượt quá 255.<br>- **Kiểu ký tự hợp lệ:** Chuỗi ký tự chuẩn URL.<br>- **Quy tắc Nghiệp vụ:** Phải nhập đúng định dạng URL bắt đầu bằng `http://` hoặc `https://`.<br>- **Thông báo lỗi tương ứng:**<br>+ Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"URL/Endpoint là bắt buộc!"` (`"URL/Endpoint is required!"`)<br>+ Sai định dạng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"URL/Endpoint không đúng định dạng!"` (`"URL/Endpoint is invalid!"`) |
| **7** | **Token (Outbound)** | Textbox (Single-line) | - Người dùng bắt buộc nhập vào token xác thực của hệ thống bên ngoài.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại tích hợp = Outbound<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Nhập Token<br>&nbsp;&nbsp;+ EN: Enter token<br>- **Giá trị mặc định:** Trống<br>- **Giới hạn ký tự:** Tối đa 255 ký tự.<br>- **Quy tắc Nghiệp vụ:** Tự động trim khoảng trắng đầu/cuối trước khi lưu.<br>- **Thông báo lỗi tương ứng:**<br>+ Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Token là bắt buộc!"` (`"Token is required!"`) |
| **8** | **Token (Inbound)** | Textbox (Single-line) | - Cho phép người dùng sinh token xác thực tự động dùng cho hệ thống bên ngoài gọi vào EDR bằng cách nhấn nút Gen token.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại tích hợp = Inbound<br>- **Giá trị mặc định:** Trống<br>- **Ràng buộc tương tác:** Ô nhập ở trạng thái Read-only. Token chỉ được điền khi người dùng nhấn nút hành động `Gen token` bên phải ô input.<br>- **Nút hành động (Gen token):**<br>&nbsp;&nbsp;+ Nhãn nút: `Gen token` (Nằm phía trong bên phải).<br>&nbsp;&nbsp;+ Hành vi khi nhấn: Hệ thống tự động sinh ra một chuỗi token bảo mật ngẫu nhiên (64 ký tự) và hiển thị trực tiếp vào ô input.<br>- **Thông báo lỗi tương ứng:**<br>+ Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"Token là bắt buộc!"` (`"Token is required!"`) |
| **9** | **IP required** | Radio Button | - Cho phép người dùng lựa chọn cấu hình có bắt buộc lọc địa chỉ IP whitelist hay không.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại tích hợp = Inbound<br>- **Danh sách tùy chọn:**<br>&nbsp;&nbsp;+ Tùy chọn 1: Yes (Có yêu cầu IP) - Giá trị: `true`<br>&nbsp;&nbsp;+ Tùy chọn 2: No (Không yêu cầu IP) - Giá trị: `false`<br>- **Giá trị mặc định:** Yes<br>- **Quy tắc Nghiệp vụ & Kích hoạt động (Dynamic Trigger Rules):**<br>&nbsp;&nbsp;+ Khi chọn **Yes** (Giá trị = `true`): Hiển thị trường IP.<br>&nbsp;&nbsp;+ Khi chọn **No** (Giá trị = `false`): Ẩn trường IP và reset giá trị trường này về trống.<br>- **Thông báo lỗi tương ứng:** Không có. |
| **10** | **IP** | Textbox (Single-line) | - Người dùng bắt buộc nhập vào địa chỉ IP được phép gọi vào hệ thống EDR.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại tích hợp = Inbound và IP required = Yes<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Nhập IP<br>&nbsp;&nbsp;+ EN: Enter IP<br>- **Giá trị mặc định:** Trống<br>- **Giới hạn ký tự:** Tối đa 255 ký tự.<br>- **Quy tắc Nghiệp vụ:**<br>1. Cho phép cấu hình danh sách địa chỉ IP whitelist được phép gọi vào hệ thống EDR.<br>2. Phải nhập đúng định dạng địa chỉ IPv4/IPv6 hợp lệ hoặc định dạng dải IP (CIDR). Hỗ trợ nhập nhiều IP phân tách nhau bằng dấu phẩy `,`.<br>- **Thông báo lỗi tương ứng:**<br>+ Trống và nhấn button Lưu: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"IP là bắt buộc!"` (`"IP is required!"`)<br>+ Sai định dạng: Hiển thị lỗi inline màu đỏ ngay dưới trường thông tin: `"IP không đúng định dạng!"` (`"IP is invalid!"`) |
| **11** | **Status**<br>(Trạng thái) | Radio Button | - Cho phép người dùng lựa chọn trạng thái hoạt động của nguồn tích hợp.<br>- **Danh sách tùy chọn:**<br>&nbsp;&nbsp;+ Tùy chọn 1: Active (Hoạt động) - Giá trị: `true`<br>&nbsp;&nbsp;+ Tùy chọn 2: Inactive (Không hoạt động) - Giá trị: `false`<br>- **Giá trị mặc định:** Active<br>- **Thông báo lỗi tương ứng:** Không có. |
| **12** | **Description**<br>(Mô tả) | Textbox (Multi-line / Textarea) | - Cho phép người dùng nhập mô tả thông tin chi tiết cho nguồn tích hợp (không bắt buộc).<br>- **Placeholder:** Trống<br>- **Giá trị mặc định:** Trống<br>- **Giới hạn ký tự:** Tối đa 500 ký tự. Hành vi khi vượt quá: Hệ thống chặn không cho gõ tiếp ký tự vượt quá 500. |
| **13** | **TEST CONNECTION**<br>(Nút Kết nối thử) | Button | - Cho phép người dùng kiểm tra thử kết nối đến URL/Endpoint đã cấu hình.<br>- **Điều kiện hiển thị:** Chỉ hiển thị khi Loại tích hợp = Outbound<br>- **Trạng thái mặc định:** Enabled<br>- **Quyền hạn truy cập:** Người dùng có quyền thêm mới nguồn tích hợp<br>- **Hành vi khi nhấn (OnClick Event):**<br>1. Hệ thống kiểm tra thông tin nhập tại trường URL/Endpoint và Token. Nếu một trong hai trường bị bỏ trống hoặc sai định dạng, hiển thị lỗi tương ứng và không thực hiện kết nối thử.<br>2. Nếu thông tin hợp lệ:<br>&nbsp;&nbsp;+ Khi bắt đầu gửi request xử lý: Hệ thống chuyển nút sang trạng thái Loading (hiển thị spinner xoay tròn, disable nút TEST CONNECTION). Trạng thái disable này chỉ mở khóa sau khi nhận được phản hồi từ API kiểm tra kết nối.<br>&nbsp;&nbsp;+ Nếu kết nối thử thành công: Hiển thị toast message tự động đóng với nội dung: `"Kết nối thử thành công!"` (`"Connection test successful!"`).<br>&nbsp;&nbsp;+ Nếu kết nối thử thất bại: Hiển thị toast message tự động đóng với nội dung: `"Kết nối thử thất bại!"` (`"Connection test failed!"`). |
| **14** | **CANCEL**<br>(Nút Hủy) | Button | - Cho phép người dùng hủy bỏ thao tác thêm mới và đóng popup.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):**<br>1. Không thực hiện kiểm tra dữ liệu đầu vào.<br>2. Nếu người dùng chưa thay đổi bất kỳ trường thông tin nào: Đóng popup.<br>3. Nếu người dùng đã nhập hoặc chỉnh sửa thông tin: Hiển thị hộp thoại cảnh báo chưa lưu dữ liệu. |
| **15** | **SAVE**<br>(Nút Lưu) | Button | - Cho phép người dùng thực hiện lưu và ghi nhận thông tin nguồn tích hợp mới.<br>- **Trạng thái mặc định:** Enabled<br>- **Quyền hạn truy cập:** Người dùng có quyền thêm mới nguồn tích hợp<br>- **Hành vi khi nhấn (OnClick Event):**<br>Khi nhấn vào thì sẽ kiểm tra thông tin người dùng nhập:<br>+ Thông tin không hợp lệ thì sẽ hiển thị các thông báo lỗi tương ứng với từng trường thông tin không hợp lệ<br>+ Thông tin hợp lệ thì sẽ thực hiện thêm nguồn tích hợp:<br>&nbsp;&nbsp;. Khi bắt đầu gửi request: chuyển nút sang trạng thái Loading (spinner, disable nút SAVE). Trạng thái disable này chỉ mở khóa sau khi nhận phản hồi từ máy chủ.<br>&nbsp;&nbsp;. Nếu thêm nguồn tích hợp thành công thì sẽ đóng popup Thêm nguồn tích hợp, trở về màn hình Danh sách nguồn tích hợp và đồng thời hiển thị toast message tự động đóng với nội dung “Thêm nguồn tích hợp thành công!” ("Integration source added successfully!")<br>&nbsp;&nbsp;. Nếu thêm nguồn tích hợp không thành công thì sẽ hiển thị toast message tự động đóng với nội dung “Thêm nguồn tích hợp không thành công!” ("Failed to add integration source!") |

---

## 3. ĐẶC TẢ HỘP THOẠI XÁC NHẬN (CONFIRMATION MODALS)

### 3.1. Modal Cảnh báo dữ liệu chưa lưu
- **Tiêu đề (Header):** `"Thông tin chưa được lưu"` (`"Unsaved changes"`)
- **Nội dung thông báo (Body text):** `"Thông tin bạn vừa nhập chưa được lưu lại. Bạn có chắc chắn muốn thoát và hủy bỏ các thay đổi này không?"` (`"The changes you made have not been saved. Are you sure you want to exit and discard these changes?"`)
- **Nút Xác nhận thoát (Confirm Button):**
  - Nhãn nút: `"Thoát không lưu"` (`"Exit without saving"`)
  - Hành vi khi nhấn: Đóng modal này và đóng popup Thêm nguồn tích hợp, đưa người dùng trở lại màn hình Danh sách nguồn tích hợp, không lưu thông tin đã gõ.
- **Nút Hủy/Giữ lại (Cancel Button):**
  - Nhãn nút: `"Giữ lại"` (`"Keep editing"`)
  - Hành vi khi nhấn: Đóng modal này, giữ nguyên giao diện nhập liệu đang có để tiếp tục chỉnh sửa.
- **Hành vi khi click vùng ngoài Modal:** Không đóng hộp thoại cảnh báo.
```

---

## 5. Quy Trình Xử Lý Cho AI (AI Workflow Rules)

Khi người dùng yêu cầu: *"Dựa trên hình ảnh giao diện UI và thông tin tính năng sau, hãy đặc tả chi tiết các thành phần giao diện cho SRS"*, AI phải thực hiện các bước sau:

1. **Bước 1: Phân tích kỹ hình ảnh thiết kế UI được cung cấp:**
   - Nhận diện các thành phần tĩnh (Tiêu đề popup/màn hình, nhãn các trường thông tin).
   - Nhận diện các thành phần tương tác (Textbox, Dropdown, Radio, Checkbox, Datepicker, Button, v.v.).
   - Nhận dạng vị trí các nút hành động (nút đóng `x`, nút Hủy, nút Lưu, các nút chức năng khác).
2. **Bước 2: Phân loại chính xác các UI Component:**
   - So khớp từng thành phần tìm thấy ở Bước 1 với danh sách phân loại trong **Mục 2** để chọn đúng biểu mẫu template phù hợp.
3. **Bước 3: Tổng hợp vào bảng đặc tả tập trung:**
   - Tạo bảng đặc tả gồm 4 cột: `STT`, `Tên trường`, `Loại dữ liệu`, `Mô tả`.
   - Tiến hành điền từng thành phần theo thứ tự hiển thị từ trên xuống dưới, từ trái qua phải.
   - Với mỗi thành phần, áp dụng chính xác biểu mẫu mô tả chuẩn ở **Mục 2**:
     - *Lưu ý:* Bắt buộc viết câu mô tả hành động người dùng lên đầu tiên.
     - *Lưu ý:* Không dùng dòng `Bắt buộc nhập: Có/Không`.
     - *Lưu ý:* Nếu có giá trị mặc định, lược bỏ dòng `Placeholder` và ghi chú ở validation error là `Không có (do luôn có giá trị mặc định).` (đối với các trường không thể rỗng).
4. **Bước 4: Định nghĩa các Modal và Toast Message liên quan:**
   - Kiểm tra xem màn hình có các hành động đặc biệt như Xóa, Thoát/Hủy khi đang sửa dữ liệu hay không.
   - Nếu có, hãy viết thêm **Mục 3: Đặc tả hộp thoại xác nhận** và áp dụng đúng cấu trúc tại **Mục 3**.
   - Tự động điền các Toast Message thành công/thất bại tương ứng vào kịch bản nhấn nút hành động (như nút Lưu/Xóa).
5. **Bước 5: Rà soát tính nhất quán và hoàn thiện:**
   - Kiểm tra xem đã trim khoảng trắng chưa, regex đã chuẩn chưa, max length đã được giới hạn chưa.
   - Đảm bảo định dạng markdown hiển thị đẹp mắt, rõ ràng.
