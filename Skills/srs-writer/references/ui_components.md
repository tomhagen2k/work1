# Mẫu đặc tả UI Components (Phần 3)

## 0. CÁCH DÙNG MẪU

- Tra đúng mẫu theo **loại component** của từng thành phần, viết vào cột **Mô tả** của bảng `STT | Tên trường | Loại dữ liệu | Mô tả`.
- Cột **Loại dữ liệu** ghi tên loại component: `Label`, `Textbox`, `Textarea`, `Input number`, `Datepicker`, `Timepicker`, `Combobox`, `Multi-select`, `Radio`, `Checkbox`, `Checkbox group`, `Toggle`, `Slider`, `Tag input`, `Upload`, `Searchbox`, `Read-only`, `Datatable`, `Dynamic table`, `Button`, `Icon button`.
- Thay mọi `{...}` bằng nội dung thật của trường trong tính năng. Phần trong `[...]` là lựa chọn — chọn đúng một phương án phù hợp, không chép nguyên cả ngoặc.
- **Được bỏ** những dòng không áp dụng (VD: `Điều kiện hiển thị` khi trường luôn hiển thị, `Chức năng tìm kiếm` với dropdown 3 giá trị). **Không được bỏ:** câu hành động đầu tiên, Placeholder (khi không có mặc định), Giá trị mặc định, các ràng buộc, Thông báo lỗi.
- Mẫu bên dưới viết nhiều dòng cho dễ đọc. **Khi đưa vào ô bảng**, nối các dòng bằng `<br>`, dòng cấp 2 dùng `&nbsp;&nbsp;+ `, cấp 3 dùng `&nbsp;&nbsp;&nbsp;&nbsp;. `, escape ký tự `|` thành `\|`. Ví dụ:

```markdown
| 2 | Tên nguồn | Textbox | - Người dùng bắt buộc nhập tên nguồn tích hợp.<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Nhập tên nguồn<br>&nbsp;&nbsp;+ EN: Enter source name<br>- **Giá trị mặc định:** Trống<br>- **Giới hạn ký tự:** Tối đa 128 ký tự. ... |
```

---

## 1. LABEL (Tiêu đề màn hình/popup/nhóm)
```markdown
- Tiêu đề {màn hình/popup/nhóm thông tin}, hiển thị tên {tính năng/nhóm}.
- **Nội dung hiển thị:** "{Nội dung VI}" ("{Nội dung EN}")
- **Tính chất hiển thị:** [Tĩnh / Động – thay đổi theo {trường dữ liệu}, VD: "Chỉnh sửa nguồn: {Tên nguồn}"]
```

## 2. TEXTBOX (Trường nhập văn bản)
```markdown
- {Hành động nhập của người dùng. VD: Người dùng bắt buộc nhập tên thiết bị.}
- **Placeholder:** (bỏ nếu có giá trị mặc định)
  + VI: Nhập {tên trường}
  + EN: Enter {field name}
- **Giá trị mặc định:** [Trống / Giá trị cụ thể]
- **Giới hạn ký tự:** Tối đa {Max} ký tự. Khi gõ vượt quá: hệ thống chặn, không nhận ký tự thứ {Max+1}. Khi dán (paste) chuỗi dài hơn: tự động cắt, chỉ giữ {Max} ký tự đầu.
- **Kiểu ký tự hợp lệ:** [Tất cả / Chỉ chữ cái không dấu và số / Không chứa ký tự đặc biệt / Theo định dạng {Email, URL, IPv4...}]
- **Quy tắc nghiệp vụ:**
  1. Tự động trim khoảng trắng đầu và cuối chuỗi trước khi kiểm tra và lưu.
  2. [Quy tắc khác. VD: {Tên trường} là duy nhất trên hệ thống (Xem [BR-01]).]
- **Thông báo lỗi tương ứng:**
  + Để trống (nếu bắt buộc) và nhấn {Tên nút lưu}: hiển thị lỗi inline màu đỏ ngay dưới trường: "{Tên trường} là bắt buộc!" ("{Field name} is required!")
  + Sai định dạng / kiểu ký tự: "{Tên trường} không đúng định dạng!" ("{Field name} is invalid!")
  + Trùng lặp (nếu kiểm tra duy nhất): "{Tên trường} đã tồn tại!" ("{Field name} already exists!")
```

## 3. TEXTAREA (Trường nhập văn bản nhiều dòng)
```markdown
- {Hành động nhập của người dùng. VD: Cho phép người dùng nhập mô tả chi tiết cho chính sách.}
- **Placeholder:** (bỏ nếu có giá trị mặc định)
  + VI: Nhập {tên trường}
  + EN: Enter {field name}
- **Giá trị mặc định:** [Trống / Giá trị cụ thể]
- **Giới hạn ký tự:** Tối đa {Max} ký tự, hiển thị bộ đếm "{n}/{Max}" ở góc dưới bên phải. Hệ thống chặn gõ/dán vượt quá {Max} ký tự.
- **Kích thước hiển thị:** [Cố định {N} dòng, có thanh cuộn khi vượt / Tự giãn chiều cao đến tối đa {M} dòng rồi hiện thanh cuộn]
- **Quy tắc nghiệp vụ:**
  1. Tự động trim khoảng trắng đầu và cuối, giữ nguyên các dấu xuống dòng bên trong.
- **Thông báo lỗi tương ứng:**
  + [Không bắt buộc]: Không có.
  + [Bắt buộc] Để trống và nhấn {Tên nút lưu}: "{Tên trường} là bắt buộc!" ("{Field name} is required!")
```

## 4. INPUT NUMBER (Trường nhập số)
```markdown
- {Hành động nhập số của người dùng.}
- **Placeholder:** (bỏ nếu có giá trị mặc định)
  + VI: Nhập {tên trường}
  + EN: Enter {field name}
- **Giá trị mặc định:** [Trống / Giá trị cụ thể]
- **Kiểu số:** [Số nguyên / Số thập phân, tối đa {n} chữ số sau dấu phẩy]
- **Đơn vị:** [{Đơn vị hiển thị sau ô nhập: ngày, GB, %, VNĐ} / Không có]
- **Định dạng hiển thị:** [Phân cách hàng nghìn bằng dấu chấm, VD: 1.000.000 / Không định dạng]
- **Khoảng giá trị cho phép:** Min: {Min} – Max: {Max}
- **Quy tắc nghiệp vụ:**
  1. Hệ thống chặn nhập mọi ký tự không phải số [và dấu thập phân].
  2. [Có/Không] hiển thị nút tăng giảm (spinner), bước nhảy {Step}.
  3. [Công thức tính liên quan (Xem [BR-xx])].
- **Thông báo lỗi tương ứng:**
  + Để trống (nếu bắt buộc) và nhấn {Tên nút lưu}: "{Tên trường} là bắt buộc!" ("{Field name} is required!")
  + Nhỏ hơn Min: "{Tên trường} phải lớn hơn hoặc bằng {Min}!" ("{Field name} must be greater than or equal to {Min}!")
  + Lớn hơn Max: "{Tên trường} phải nhỏ hơn hoặc bằng {Max}!" ("{Field name} must be less than or equal to {Max}!")
```

## 5. DATEPICKER (Trường chọn ngày / ngày giờ)
```markdown
- {Hành động chọn ngày của người dùng.}
- **Placeholder:** (bỏ nếu có giá trị mặc định)
  + VI: {Định dạng, VD: dd/mm/yyyy}
  + EN: {Format, VD: dd/mm/yyyy}
- **Định dạng hiển thị & nhập:** {dd/mm/yyyy / dd/mm/yyyy HH:mm}
- **Cách thức nhập:** [Cho phép gõ trực tiếp và chọn từ lịch / Chỉ chọn từ lịch]
- **Giá trị mặc định:** [Trống / Ngày hiện tại / ...]
- **Điều kiện hiển thị:** [Chỉ hiển thị khi {Trường điều kiện} = {Giá trị}]
- **Ràng buộc ngày:**
  + Min date: {Mốc, VD: Ngày hiện tại}
  + Max date: {Mốc, VD: Ngày hiện tại + 1 năm / Không giới hạn}
- **Quy tắc nghiệp vụ:**
  1. Các ngày ngoài khoảng [Min date – Max date] hiển thị màu xám và không chọn được trên lịch.
  2. Kiểm tra ngày tồn tại thực tế khi gõ trực tiếp.
  3. [Ràng buộc với trường khác, VD: Đến ngày ≥ Từ ngày (Xem [BR-xx])].
- **Thông báo lỗi tương ứng:**
  + Để trống (nếu bắt buộc) và nhấn {Tên nút lưu}: "{Tên trường} là bắt buộc!" ("{Field name} is required!")
  + Sai định dạng / ngày không tồn tại: "Vui lòng nhập {Tên trường} theo định dạng {Định dạng}!" ("Please enter {Field name} in {Format} format!")
  + Nhỏ hơn Min date: "{Tên trường} phải lớn hơn hoặc bằng {Mốc Min}!" ("{Field name} must be on or after {Min}!")
  + Lớn hơn Max date: "{Tên trường} phải nhỏ hơn hoặc bằng {Mốc Max}!" ("{Field name} must be on or before {Max}!")
```

## 6. TIMEPICKER (Trường chọn giờ)
```markdown
- {Hành động chọn giờ của người dùng.}
- **Placeholder:** (bỏ nếu có giá trị mặc định)
  + VI: {HH:mm}
  + EN: {HH:mm}
- **Định dạng hiển thị & nhập:** {HH:mm, 24 giờ}
- **Cách thức nhập:** [Chọn từ danh sách / Gõ trực tiếp / Cả hai]
- **Bước nhảy:** {M} phút
- **Giá trị mặc định:** [Trống / Giá trị cụ thể]
- **Điều kiện hiển thị:** [Chỉ hiển thị khi {Trường điều kiện} = {Giá trị}]
- **Ràng buộc giờ:** Từ {Min} đến {Max}
- **Quy tắc nghiệp vụ:**
  1. [VD: Nếu ngày chọn là ngày hiện tại thì giờ phải ≥ giờ hiện tại + {N} phút.]
- **Thông báo lỗi tương ứng:**
  + Để trống (nếu bắt buộc) và nhấn {Tên nút lưu}: "{Tên trường} là bắt buộc!" ("{Field name} is required!")
  + Sai định dạng: "Vui lòng nhập {Tên trường} theo định dạng {Định dạng}!" ("Please enter {Field name} in {Format} format!")
  + Ngoài ràng buộc: "{Tên trường} phải nằm trong khoảng từ {Min} đến {Max}!" ("{Field name} must be between {Min} and {Max}!")
```

## 7. COMBOBOX / DROPDOWN / MULTI-SELECT (Hộp chọn)
```markdown
- {Hành động chọn của người dùng.}
- **Placeholder:** (bỏ nếu có giá trị mặc định)
  + VI: Chọn {tên trường}
  + EN: Select {field name}
- **Nguồn dữ liệu:**
  [Cố định – liệt kê]:
  + {Tên hiển thị VI} / {Tên hiển thị EN} – Giá trị: {Value}
  [Động]: Danh sách {đối tượng} ở trạng thái {trạng thái}, sắp xếp theo {tiêu chí}.
- **Giá trị mặc định:** [Trống / Giá trị cụ thể]
- **Chế độ chọn:** [Chọn một / Chọn nhiều, tối đa {n} giá trị]
- **Chức năng tìm kiếm:** [Có – lọc theo từ khóa khi gõ / Không]
- **Hiển thị khi chọn nhiều:** (chỉ với Multi-select)
  + [Dạng thẻ (Tags): mỗi giá trị là một thẻ có icon "x" để bỏ chọn. Khi tràn: [Xuống dòng / Thu gọn "Giá trị 1, Giá trị 2 +{n}", hover hiển thị tooltip toàn bộ]]
  + [Dạng text tóm tắt: "Đã chọn {n} {đối tượng}" ("{n} {objects} selected")]
- **Quy tắc nghiệp vụ & kích hoạt động:**
  - Khi chọn {Giá trị X}: [hiển thị trường {A}, ẩn trường {B} và reset dữ liệu trường {B} / tải lại danh sách của trường {C}]
- **Thông báo lỗi tương ứng:**
  + [Có giá trị mặc định]: Không có (do luôn có giá trị mặc định).
  + [Không có mặc định, bắt buộc] Để trống và nhấn {Tên nút lưu}: "Vui lòng chọn {Tên trường}!" ("Please select {Field name}!")
```

## 8. RADIO BUTTON (Chọn một trong nhiều)
```markdown
- {Hành động chọn của người dùng.}
- **Danh sách tùy chọn:**
  + {Tên VI} ({Tên EN}) – Giá trị: {Value 1}
  + {Tên VI} ({Tên EN}) – Giá trị: {Value 2}
- **Giá trị mặc định:** {Tùy chọn mặc định}
- **Quy tắc nghiệp vụ & kích hoạt động:**
  - Khi chọn {Tùy chọn 1}: hiển thị {Trường A, B}; ẩn {Trường C, D} và reset dữ liệu của chúng về mặc định.
  - Khi chọn {Tùy chọn 2}: hiển thị {Trường C, D}; ẩn {Trường A, B} và reset dữ liệu của chúng về mặc định.
- **Thông báo lỗi tương ứng:** [Không có (do luôn có giá trị mặc định). / Để trống và nhấn {Tên nút lưu}: "Vui lòng chọn {Tên trường}!" ("Please select {Field name}!")]
```

## 9. CHECKBOX (Hộp kiểm đơn)
```markdown
- {Hành động chọn của người dùng.}
- **Nhãn:** "{Nhãn VI}" ("{Nhãn EN}")
- **Trạng thái mặc định:** [Checked / Unchecked]
- **Quy tắc nghiệp vụ & ràng buộc:**
  - [VD: Khi được chọn, hệ thống tự động cập nhật chữ ký Antivirus trước mỗi lần quét.]
  - [VD: Phải tích chọn thì nút "{Tên nút}" mới được kích hoạt.]
- **Thông báo lỗi tương ứng:** [Không có. / (Nếu bắt buộc chọn) "{Thông báo VI}" ("{Thông báo EN}")]
```

## 10. CHECKBOX GROUP (Nhóm hộp kiểm – chọn nhiều)
```markdown
- {Hành động chọn của người dùng. VD: Cho phép người dùng chọn các ngày trong tuần thực hiện quét.}
- **Danh sách tùy chọn:** {Tùy chọn 1 VI/EN – Value}, {Tùy chọn 2 VI/EN – Value}, ...
- **Bố cục:** [Hàng ngang / Dạng lưới {n} cột / Dọc]
- **Giá trị mặc định:** [Không chọn / Chọn sẵn {các tùy chọn}]
- **Số lượng chọn:** Tối thiểu {Min}, tối đa {Max / Không giới hạn}
- **Tùy chọn "Chọn tất cả":** [Có – tích để chọn/bỏ chọn toàn bộ; tự động tích khi tất cả đã được chọn / Không]
- **Điều kiện hiển thị:** [Chỉ hiển thị khi {Trường điều kiện} = {Giá trị}]
- **Thông báo lỗi tương ứng:**
  + Chọn ít hơn {Min} và nhấn {Tên nút lưu}: "Vui lòng chọn ít nhất {Min} {đối tượng}!" ("Please select at least {Min} {objects}!")
```

## 11. TOGGLE / SWITCH (Công tắc bật/tắt trong form)
Giá trị chỉ được lưu khi nhấn nút lưu của form. Toggle đổi trạng thái **ngay lập tức** trên bảng danh sách → dùng mẫu cột Switch trong mục 16 (Datatable).
```markdown
- {Hành động bật/tắt của người dùng. VD: Cho phép người dùng bật/tắt việc gửi cảnh báo tới SIEM/SOAR.}
- **Giá trị:** Bật – "{Nhãn VI}" ("{Nhãn EN}") – Giá trị: {Value On}; Tắt – "{Nhãn VI}" ("{Nhãn EN}") – Giá trị: {Value Off}
- **Giá trị mặc định:** [Bật / Tắt]
- **Khả năng thay đổi:** [Người dùng được thay đổi / Cố định ở trạng thái {Bật}, hiển thị mờ (disabled), hover hiển thị tooltip "{Lý do VI}" ("{Lý do EN}")]
- **Quy tắc nghiệp vụ & kích hoạt động:**
  - [Khi bật: hiển thị {Trường A}. Khi tắt: ẩn {Trường A} và reset về mặc định.]
- **Thông báo lỗi tương ứng:** Không có (do luôn có giá trị mặc định).
```

## 12. SLIDER (Thanh trượt chọn giá trị)
```markdown
- {Hành động kéo chọn giá trị của người dùng. VD: Cho phép người dùng giới hạn mức chiếm dụng CPU khi quét.}
- **Khoảng giá trị:** Min {Min}{đơn vị} – Max {Max}{đơn vị}, bước nhảy {Step}{đơn vị}
- **Giá trị mặc định:** {Giá trị}
- **Hiển thị giá trị hiện tại:** [Nhãn số phía trên núm kéo / Ô nhập số bên cạnh, cho phép gõ trực tiếp và đồng bộ hai chiều với thanh trượt]
- **Thao tác bàn phím:** Phím mũi tên trái/phải giảm/tăng một bước {Step}.
- **Thông báo lỗi tương ứng:**
  + [Chỉ có thanh trượt]: Không có (giá trị luôn nằm trong khoảng cho phép).
  + [Có ô nhập số đi kèm]: Áp dụng thông báo lỗi Min/Max như mục 4 (Input number).
```

## 13. TAG INPUT (Nhập nhiều giá trị dạng thẻ)
```markdown
- {Hành động nhập dạng thẻ của người dùng.}
- **Placeholder:** (bỏ nếu có giá trị mặc định)
  + VI: Nhập {tên trường} và nhấn Enter
  + EN: Enter {field name} and press Enter
- **Cách tạo thẻ:** Gõ nội dung và nhấn [Enter / dấu phẩy `,` / dấu chấm phẩy `;`]; dán (paste) chuỗi có dấu phân cách sẽ tự tách thành nhiều thẻ.
- **Cách xóa thẻ:** Click icon "x" trên thẻ, hoặc nhấn Backspace khi ô nhập đang trống.
- **Số lượng thẻ tối đa:** {Max} thẻ. Khi đủ {Max}: ô nhập bị vô hiệu hóa, hiển thị gợi ý "Đã đạt tối đa {Max} {đối tượng}" ("Maximum of {Max} {objects} reached").
- **Độ dài mỗi thẻ:** Tối đa {Max Per Tag} ký tự.
- **Định dạng thẻ hợp lệ:** [Tất cả / IPv4 hoặc CIDR / Email / Đường dẫn, cho phép ký tự đại diện `*`]
- **Hiển thị khi tràn:** [Xuống dòng tăng chiều cao / Thu gọn "+{n}"]
- **Quy tắc nghiệp vụ:**
  1. Tự động trim khoảng trắng trước khi tạo thẻ.
  2. Không tạo thẻ trùng với thẻ đã có (so sánh không phân biệt hoa/thường); nếu trùng, xóa nội dung đang gõ và không tạo thẻ mới.
- **Thông báo lỗi tương ứng:**
  + Để trống (nếu bắt buộc) và nhấn {Tên nút lưu}: "{Tên trường} là bắt buộc!" ("{Field name} is required!")
  + Thẻ sai định dạng (thẻ hiển thị viền đỏ): "Giá trị {Giá trị thẻ} không đúng định dạng!" ("Value {tag value} is invalid!")
```

## 14. UPLOAD FILE / IMAGE (Tải lên tệp/ảnh)
```markdown
- {Hành động tải lên của người dùng.}
- **Cách thức tải lên:** [Nhấn nút "Chọn tệp" / Kéo thả vào vùng tải lên / Cả hai]
- **Định dạng cho phép:** {.pdf, .docx / .jpg, .png}
- **Dung lượng tối đa:** {Max Size} MB mỗi tệp
- **Số lượng tối đa:** {Max Count} tệp
- **Hiển thị sau khi tải lên:**
  + [Tệp: danh sách tên tệp, dung lượng, icon định dạng, icon xóa]
  + [Ảnh đơn: khung ảnh preview, hover hiển thị Thay thế / Xóa]
  + [Nhiều ảnh: lưới thumbnail có icon "x", click để xem phóng to]
- **Thông báo lỗi tương ứng:**
  + Để trống (nếu bắt buộc): "{Tên trường} là bắt buộc!" ("{Field name} is required!")
  + Sai định dạng: "Định dạng tệp {Tên tệp} không hợp lệ! Chỉ cho phép {Định dạng}." ("File {file name} has an invalid format! Only {formats} are allowed.")
  + Quá dung lượng: "Tệp {Tên tệp} vượt quá dung lượng cho phép ({Max Size} MB)!" ("File {file name} exceeds the size limit ({Max Size} MB)!")
  + Quá số lượng: "Chỉ được tải lên tối đa {Max Count} tệp!" ("You can upload up to {Max Count} files!")
```

## 15. SEARCHBOX (Ô tìm kiếm)
```markdown
- {Hành động tìm kiếm của người dùng. VD: Cho phép người dùng tìm kiếm nguồn tích hợp theo tên hoặc URL.}
- **Placeholder:**
  + VI: Tìm kiếm theo {tiêu chí}
  + EN: Search by {criteria}
- **Phạm vi tìm kiếm:** Các trường {A, B}; tìm kiếm gần đúng (chứa từ khóa), không phân biệt hoa/thường [và không phân biệt dấu].
- **Giới hạn ký tự:** Tối đa {Max} ký tự.
- **Cách kích hoạt:** [Nhấn Enter / Tự động sau {M} ms kể từ khi ngừng gõ]
- **Quy tắc nghiệp vụ:**
  1. Tự động trim khoảng trắng đầu và cuối trước khi tìm kiếm.
  2. Icon "x" ở bên phải ô nhập để xóa nhanh từ khóa và tải lại danh sách mặc định.
  3. Khi tìm kiếm, danh sách quay về trang 1. Không có kết quả → hiển thị Empty State tìm kiếm (mục 20.1).
```

## 16. DATATABLE (Bảng dữ liệu danh sách)
```markdown
- {Chức năng hiển thị của bảng. VD: Hiển thị danh sách các nguồn tích hợp trên hệ thống.}
- **Sắp xếp mặc định:** {Cột} {giảm dần / tăng dần}
- **Phân trang:** [Có – mặc định {N} bản ghi/trang, cho phép chọn {10/20/50/100} / Không – cuộn tải thêm]
- **Sắp xếp theo cột:** Cho phép click header các cột {A, B} để sắp xếp tăng/giảm dần.
- **Đặc tả các cột:**
  + **{Cột text}:** Hiển thị {thông tin}. Nội dung quá dài hiển thị "..." và tooltip đầy đủ khi hover.
  + **{Cột text có link}:** Hiển thị {thông tin}. Click mở {màn hình/popup chi tiết}.
  + **{Cột ngày giờ}:** Hiển thị {thông tin} theo định dạng {dd/mm/yyyy HH:mm}.
  + **{Cột tag trạng thái}:** Hiển thị trạng thái dạng tag màu:
    . {Trạng thái A}: tag màu {màu} – "{Nhãn VI}" ("{Nhãn EN}")
    . {Trạng thái B}: tag màu {màu} – "{Nhãn VI}" ("{Nhãn EN}")
  + **{Cột checkbox chọn dòng}:** Tích chọn dòng để thực hiện hành động hàng loạt. Checkbox ở header chọn/bỏ chọn toàn bộ dòng ở trang hiện tại.
  + **{Cột Switch đổi trạng thái nhanh}:**
    . Giá trị theo trạng thái thực tế của bản ghi. Hiển thị khi người dùng có **{Quyền sửa}** (xem mục 1.2); không có quyền thì chỉ hiển thị dạng tag trạng thái.
    . Khi click: switch bị vô hiệu hóa và hiển thị spinner nhỏ chờ API.
    . Thành công: đổi trạng thái switch, toast "{Hành động} thành công!" ("{Action} successfully!").
    . Thất bại: trả switch về trạng thái cũ, toast "{Hành động} không thành công!" ("Failed to {action}!").
  + **{Cột Hành động}:**
    . Icon Sửa: hiển thị khi người dùng có **Quyền sửa** (xem mục 1.2) [và bản ghi ở trạng thái {X}]. Click mở {màn hình/popup chỉnh sửa} với dữ liệu điền sẵn.
    . Icon Xóa: hiển thị khi người dùng có **Quyền xóa** (xem mục 1.2) [và bản ghi ở trạng thái {X}]. Click mở hộp thoại xác nhận xóa (mục 19.1).
```

## 17. DYNAMIC TABLE (Bảng nhập liệu thêm/xóa dòng)
```markdown
- {Hành động của người dùng. VD: Cho phép người dùng thiết lập các cấp duyệt theo bậc thang hạn mức.}
- **Số dòng:** Mặc định {N} dòng; tối thiểu {Min} dòng; tối đa {Max / Không giới hạn} dòng.
- **Nút "+ {Thêm dòng}":** Nằm {dưới bảng}. Click thêm một dòng mới vào cuối bảng với giá trị mặc định {...}. Vô hiệu hóa khi đạt {Max} dòng.
- **Đặc tả các cột:** (mỗi cột mô tả ngắn theo mẫu của loại component tương ứng: loại, mặc định, ràng buộc, lỗi)
  + **{Cột 1 – Read-only}:** {VD: Số thứ tự cấp, tự động tăng: Cấp 1, Cấp 2...}
  + **{Cột 2 – Input number}:** {Ràng buộc, lỗi VI/EN}
  + **{Cột 3 – Combobox}:** {Nguồn dữ liệu, mặc định, lỗi VI/EN}
- **Icon Xóa dòng:**
  + Điều kiện hiển thị: [Mọi dòng / Không hiển thị ở dòng {1} vì bắt buộc]
  + Khi click: [Xóa ngay / Hiển thị xác nhận] ; sau khi xóa: đánh lại số thứ tự và tính lại các giá trị phụ thuộc giữa các dòng.
- **Ràng buộc giữa các dòng:** {VD: Hạn mức các cấp liên tục, không chồng lấn (Xem [BR-xx])}
- **Thông báo lỗi tương ứng:**
  + Lỗi của một ô: hiển thị inline màu đỏ ngay dưới ô vi phạm trong dòng đó.
  + Lỗi của cả bảng (VD: thiếu dòng tối thiểu, các dòng chồng lấn): hiển thị phía trên bảng: "{Thông báo VI}" ("{Thông báo EN}")
```

## 18. READ-ONLY FIELD & BUTTON

### 18.1. READ-ONLY (Trường chỉ đọc / giá trị tự tính)
```markdown
- Hiển thị {thông tin}, người dùng không thể chỉnh sửa.
- **Nguồn giá trị:** [Cố định "{giá trị}" / Lấy từ {dữ liệu hệ thống} / Tự tính theo công thức (Xem [BR-xx])]
- **Định dạng hiển thị:** {VD: Số tiền phân cách hàng nghìn kèm "VNĐ" / dd/mm/yyyy HH:mm}
- **Thời điểm cập nhật:** [Khi mở màn hình / Ngay khi trường {X} thay đổi]
```

### 18.2. BUTTON / ICON BUTTON (Nút hành động)
```markdown
- {Hành vi khi nhấn. VD: Cho phép người dùng lưu thông tin nguồn tích hợp.}
- **Nhãn:** "{Nhãn VI}" ("{Nhãn EN}") [/ Icon {tên icon}, hover hiển thị tooltip "{VI}" ("{EN}")]
- **Trạng thái mặc định:** [Enabled / Disabled cho đến khi {điều kiện}]
- **Quyền hạn truy cập:** Hiển thị khi người dùng có **{Tên quyền}** (xem mục 1.2). [/ Luôn hiển thị]
- **Hành vi khi nhấn:**
  [Nút gửi dữ liệu (Lưu/Tạo/Gửi):]
  + Kiểm tra toàn bộ thông tin người dùng nhập. Thông tin không hợp lệ → hiển thị thông báo lỗi tương ứng dưới từng trường vi phạm, không gửi request.
  + Thông tin hợp lệ → {hành động} {đối tượng}:
    . Khi gửi request: nút chuyển sang Loading (spinner, vô hiệu hóa) để chống gửi trùng; chỉ mở lại khi có phản hồi.
    . Thành công: đóng {popup/màn hình}, quay về {màn hình}, [tải lại danh sách,] hiển thị toast tự đóng "{Hành động} {đối tượng} thành công!" ("{Action} {object} successfully!").
    . Thất bại do lỗi nghiệp vụ (VD: trùng dữ liệu): giữ nguyên form và dữ liệu, hiển thị lỗi inline tại trường liên quan.
    . Thất bại do lỗi hệ thống: giữ nguyên form, hiển thị toast "{Hành động} {đối tượng} không thành công!" ("Failed to {action} {object}!").
  [Nút Hủy/Đóng:]
  + Form chưa có thay đổi → đóng ngay.
  + Form đã có thay đổi → hiển thị hộp thoại cảnh báo dữ liệu chưa lưu (mục 19.2).
  [Nút điều hướng/mở popup:]
  + Mở {màn hình/popup} {Tên}.
```

---

## 19. HỘP THOẠI XÁC NHẬN (đặt ngay sau bảng đặc tả của màn hình)

### 19.1. Xác nhận xóa
- **Tên hộp thoại:** Xác nhận xóa {đối tượng}
- **Tiêu đề:** "Xác nhận xóa {đối tượng}" ("Delete {object}")
- **Nội dung:** "Bạn có chắc chắn muốn xóa {đối tượng} {Tên bản ghi}? Hành động này không thể hoàn tác." ("Are you sure you want to delete {object} {name}? This action cannot be undone.")
- **Nút Xóa:** "Xóa" ("Delete") — màu đỏ. Khi nhấn: chuyển Loading, gọi API xóa; thành công → đóng hộp thoại, tải lại danh sách, toast "Xóa {đối tượng} thành công!" ("{Object} deleted successfully!"); thất bại → toast "Xóa {đối tượng} không thành công!" ("Failed to delete {object}!"). [Ràng buộc khi xóa (Xem [BR-xx])]
- **Nút Hủy:** "Hủy" ("Cancel") hoặc icon "x" — đóng hộp thoại, không xóa.
- **Click ra ngoài hộp thoại:** Không đóng.

### 19.2. Cảnh báo dữ liệu chưa lưu
- **Tên hộp thoại:** Cảnh báo dữ liệu chưa lưu – {Tên form}
- **Tiêu đề:** "Thông tin chưa được lưu" ("Unsaved changes")
- **Nội dung:** "Thông tin bạn vừa nhập chưa được lưu. Bạn có chắc chắn muốn thoát và hủy bỏ các thay đổi?" ("Your changes have not been saved. Are you sure you want to leave and discard them?")
- **Nút Thoát không lưu:** "Thoát không lưu" ("Discard changes") — đóng hộp thoại và đóng form, không lưu.
- **Nút Ở lại:** "Tiếp tục chỉnh sửa" ("Keep editing") — đóng hộp thoại, giữ nguyên dữ liệu trên form.
- **Click ra ngoài hộp thoại:** Không đóng.

---

## 20. TRẠNG THÁI MÀN HÌNH (với màn hình danh sách/nội dung, đặt sau hộp thoại)

### 20.1. Trạng thái trống (Empty State)
- **Chưa có dữ liệu:** icon hộp rỗng; tiêu đề "Chưa có {đối tượng} nào" ("No {objects} yet"); mô tả "Bắt đầu bằng cách tạo {đối tượng} đầu tiên." ("Get started by creating your first {object}."); nút "Tạo mới" ("Create") — chỉ hiển thị khi người dùng có **Quyền tạo** (xem mục 1.2).
- **Tìm kiếm/lọc không có kết quả:** icon kính lúp; "Không tìm thấy kết quả phù hợp" ("No matching results"); nút "Xóa bộ lọc" ("Clear filters").

### 20.2. Trạng thái lỗi tải dữ liệu (Error / Offline State)
- **Điều kiện:** API trả lỗi 5xx, timeout hoặc mất kết nối mạng.
- **Nội dung:** "Không thể tải danh sách {đối tượng}. Vui lòng thử lại." ("Failed to load {objects}. Please try again.")
- **Nút:** "Tải lại" ("Retry") — gọi lại API.
