# TÀI LIỆU ĐẶC TẢ CHI TIẾT YÊU CẦU GIAO DIỆN VÀ NGHIỆP VỤ (SRS SPECIFICATION)
## HỆ THỐNG QUẢN LÝ DANH SÁCH LOẠI TRỪ (WHITELISTS CONTROL PANEL)

Tài liệu này đặc tả chi tiết giao diện (UI), luồng tương tác (UX) và các quy tắc nghiệp vụ (Business Rules) của phân hệ quản lý Whitelist trên hệ thống EDR, bao gồm các màn hình danh sách, các popup thêm/sửa/xóa và các tính năng Nhập (Import) / Xuất (Export) tệp tin.

---

# PHẦN 1: MÀN HÌNH CHI TIẾT ĐỐI TƯỢNG WHITELIST (WHITELIST DETAILS TABLE)

## 1. THÔNG TIN CHUNG
- **Tên màn hình:** Chi tiết đối tượng Whitelist (Whitelist Category Details)
- **Loại giao diện:** Vùng nội dung thuộc Tab Whitelist chính (hoặc hiển thị dạng panel chi tiết)
- **Mô tả nghiệp vụ:** Hiển thị danh sách các bản ghi (entities) và các Correlation Rules liên kết của một đối tượng Whitelist được chọn (ví dụ: `Common_whitelist_value`, `IP_whitelist`...).

## 2. ĐẶC TẢ CHI TIẾT CÁC THÀNH PHẦN GIAO DIỆN (UI COMPONENTS)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Table Name Header**<br>(Tên đối tượng) | Label | - Tiêu đề màn hình hiển thị tên của đối tượng Whitelist đang chọn.<br>- **Nội dung hiển thị:** Động theo tên Whitelist chọn (ví dụ: `Common_whitelist_value` hoặc `IP_whitelist`).<br>- **Tính chất hiển thị:** Động (Dynamic). |
| **2** | **Close**<br>(Icon đóng X) | Button | - Nút đóng màn hình chi tiết đối tượng Whitelist để quay về màn hình danh sách nhóm chính.<br>- **Hành vi khi nhấn:** Hệ thống ẩn màn hình chi tiết, giải phóng bộ nhớ tạm và hiển thị lại danh sách thẻ Whitelist chính. |
| **3** | **Description**<br>(Mô tả đối tượng) | Label | - Mô tả ý nghĩa, chức năng loại trừ của nhóm Whitelist đang xem.<br>- **Nội dung hiển thị:** Động theo cấu trúc trường `description` của đối tượng trong cơ sở dữ liệu.<br>- **Tính chất hiển thị:** Động. |
| **4** | **ROWS / CORRELATION RULES**<br>(Thanh tab trong popup) | Tab Navigation | - Cho phép người dùng chuyển đổi xem giữa danh sách các bản ghi và danh sách quy tắc phát hiện liên quan.<br>- **Danh sách Tab:**<br>&nbsp;&nbsp;+ ROWS (Danh sách bản ghi)<br>&nbsp;&nbsp;+ CORRELATION RULES (Quy tắc liên quan)<br>- **Giá trị mặc định:** ROWS |
| **5** | **Delete selected**<br>(Xóa nhiều bản ghi) | Button | - Cho phép người dùng thực hiện xóa đồng thời nhiều bản ghi đã tích chọn trong bảng dữ liệu.<br>- **Trạng thái mặc định:** Disabled. Chỉ chuyển sang trạng thái Enabled khi có ít nhất một Checkbox chọn dòng trong bảng dữ liệu được tích chọn.<br>- **Hành vi khi nhấn:** Hiển thị Hộp thoại xác nhận xóa nhiều dòng (Confirm Deletion). |
| **6** | **Add new row**<br>(Thêm bản ghi) | Button | - Cho phép người dùng mở popup Thêm bản ghi mới vào bảng Whitelist hiện tại.<br>- **Hành vi khi nhấn:** Hiển thị popup **Add New Row** và truyền thông tin tên bảng hiện tại vào form. |
| **7** | **Import**<br>(Nạp bản ghi vào bảng) | Button | - Cho phép người dùng nạp thêm nhiều bản ghi mới vào bảng Whitelist hiện tại từ tệp tin JSON.<br>- **Hành vi khi nhấn:** Hiển thị popup **Import Rows Into A Table**. |
| **8** | **Export**<br>(Xuất bản ghi của bảng) | Button | - Cho phép người dùng tải toàn bộ bản ghi hiện tại của bảng Whitelist đang chọn xuống máy tính dưới dạng tệp tin JSON.<br>- **Hành vi khi nhấn:** Hệ thống tạo và tự động tải xuống tệp tin cấu hình Whitelist của riêng bảng đó theo quy chuẩn tại **PHẦN 4**. |
| **9** | **Checkbox ở Header**<br>(Chọn tất cả) | Checkbox | - Cho phép người dùng tích chọn hoặc bỏ chọn toàn bộ các bản ghi đang hiển thị trên trang hiện tại của bảng.<br>- **Trạng thái mặc định:** Unchecked. |
| **10** | **Checkbox chọn dòng** | Checkbox | - Cho phép người dùng tích chọn từng bản ghi riêng lẻ để thực hiện hành động xóa hàng loạt.<br>- **Trạng thái mặc định:** Unchecked. |
| **11** | **Bảng danh sách bản ghi**<br>(Rows Datatable) | Datatable | - Hiển thị danh sách các bản ghi loại trừ hiện tại của bảng dưới dạng lưới.<br>- **Cột dữ liệu:** Biến động (Dynamic) theo cấu trúc thực tế của đối tượng. Ví dụ:<br>&nbsp;&nbsp;+ `Common_whitelist_value`: `_id`, `_last_changed`, `Rule`, `Host`, `User_id`, `Specific_value`, `User_name`, `User_domain`.<br>&nbsp;&nbsp;+ `IP_whitelist`: `rule`, `specific_value`, `description`.<br>- **Chức năng bổ trợ:** Phân trang (Pagination) và Sắp xếp (Sorting) theo cột. |
| **12** | **Icon Chỉnh sửa**<br>(Hình bút chì) | Button | - Cho phép người dùng chỉnh sửa thông tin bản ghi tương ứng.<br>- **Vị trí:** Cột hành động cuối cùng của từng dòng.<br>- **Hành vi khi nhấn:** Hiển thị popup **Edit Row** và điền sẵn thông tin dữ liệu của dòng hiện tại lên form nhập liệu. |
| **13** | **Icon Xóa**<br>(Hình thùng rác) | Button | - Cho phép người dùng thực hiện xóa bản ghi hiện tại khỏi bảng.<br>- **Vị trí:** Cột hành động cuối cùng của từng dòng.<br>- **Hành vi khi nhấn:** Hiển thị Hộp thoại xác nhận xóa 1 bản ghi (Confirm Deletion). |
| **14** | **Rows per page**<br>(Số dòng trên trang) | Combobox / Dropdown (Single-select) | - Cho phép người dùng cấu hình số lượng dòng dữ liệu tối đa hiển thị trên một trang bảng.<br>- **Nguồn dữ liệu cố định:** 5, 10, 20, 50 dòng.<br>- **Giá trị mặc định:** 20 |

---

# PHẦN 2: POPUP THÊM MỚI / CHỈNH SỬA BẢN GHI (ADD NEW ROW / EDIT ROW)

## 1. THÔNG TIN CHUNG
- **Tên màn hình/Popup:** Thêm bản ghi mới (Add New Row) / Chỉnh sửa bản ghi (Edit Row)
- **Loại giao diện:** Popup Modal
- **Mô tả nghiệp vụ:** Cho phép người dùng thêm thủ công một bản ghi mới hoặc điều chỉnh dữ liệu một bản ghi hiện tại của bảng Whitelist được chỉ định.

## 2. ĐẶC TẢ CHI TIẾT CÁC THÀNH PHẦN GIAO DIỆN (UI COMPONENTS)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Add New Row / Edit Row**<br>(Tiêu đề popup) | Label | - Tiêu đề popup hiển thị tên tính năng thêm mới hoặc chỉnh sửa bản ghi.<br>- **Nội dung hiển thị:** Add New Row (khi thêm) hoặc Edit Row (khi sửa).<br>- **Tính chất hiển thị:** Tĩnh. |
| **2** | **Close**<br>(Icon đóng X) | Button | - Nút đóng popup, cho phép người dùng hủy bỏ thao tác nhập liệu.<br>- **Hành vi khi nhấn:** Đóng popup ngay lập tức (hiển thị cảnh báo chưa lưu nếu người dùng đã thay đổi dữ liệu trên form). |
| **3** | **Table name**<br>(Tên bảng) | Textbox (Single-line) | - Hiển thị tên của bảng Whitelist hiện tại đang được thêm hoặc sửa đổi.<br>- **Giá trị mặc định:** Lấy tự động từ tên bảng Whitelist đang hoạt động (ví dụ: `IP_whitelist` hoặc `Common_whitelist_value`).<br>- **Ràng buộc tương tác:** Ở trạng thái chỉ đọc (Read-only/Disabled). Người dùng không thể nhập hoặc chỉnh sửa trường này.<br>- **Thông báo lỗi tương ứng:** Không có (do trường bị khóa gõ). |
| **4** | **Các trường dữ liệu động**<br>(Value 1, Value 2, Value 3...) | Textbox (Single-line) | - Người dùng bắt buộc phải nhập dữ liệu cho các thuộc tính tương ứng của bản ghi Whitelist.<br>- **Cột hiển thị:** Sinh động theo cấu trúc trường của bảng đang thêm/sửa (Ví dụ đối với `IP_whitelist` sẽ hiển thị: `rule *`, `specific_value *`, `description *`).<br>- **Placeholder:**<br>&nbsp;&nbsp;+ VI: Nhập {tên trường}<br>&nbsp;&nbsp;+ EN: Enter {tên trường bằng tiếng Anh}<br>- **Giá trị mặc định:** Trống (khi thêm mới) hoặc điền sẵn giá trị cũ của bản ghi (khi sửa).<br>- **Giới hạn ký tự:** Tối đa 128 ký tự cho mỗi trường. Hành vi khi vượt quá: Hệ thống tự động chặn gõ cứng, không hiển thị phần ký tự gõ thêm vượt quá 128.<br>- **Kiểu ký tự hợp lệ:** Tất cả các ký tự ngoại trừ ký tự đặc biệt nguy hại (nhằm phòng ngừa SQL/Command injection).<br>- **Quy tắc Nghiệp vụ:** Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi lưu.<br>- **Thông báo lỗi tương ứng:**<br>+ Trống (để trống trường bắt buộc) và nhấn SAVE: Hiển thị lỗi inline màu đỏ dưới trường thông tin: `"{Tên trường} là bắt buộc!"` (`"{Tên trường} is required!"`) |
| **5** | **CANCEL**<br>(Nút Hủy) | Button | - Cho phép người dùng hủy bỏ thao tác và đóng popup.<br>- **Hành vi khi nhấn:** Đóng popup (hiển thị cảnh báo dữ liệu chưa lưu nếu form đã bị chỉnh sửa). |
| **6** | **SAVE**<br>(Nút Lưu) | Button | - Cho phép người dùng lưu dữ liệu bản ghi mới/chỉnh sửa vào DB.<br>- **Trạng thái mặc định:** Disabled. Chỉ chuyển sang trạng thái Enabled khi **tất cả các trường dữ liệu bắt buộc trên form đã được người dùng nhập đầy đủ dữ liệu (không để trống)**.<br>- **Hành vi khi nhấn (OnClick Event):**<br>Khi nhấn sẽ tiến hành kiểm tra nghiệp vụ và lưu:<br>1. Hệ thống hiển thị Spinner Loading trên nút SAVE, chuyển nút SAVE sang trạng thái Disabled.<br>2. Gửi request lưu dữ liệu bản ghi vào bảng tương ứng.<br>3. Nếu API phản hồi thành công: Đóng popup, làm mới lại danh sách dòng dữ liệu của bảng, hiển thị Toast Message: `"Row saved successfully!"`<br>4. Nếu API phản hồi thất bại: Hiển thị Toast Message màu đỏ tiếng Anh: `"Failed to save row!"` và mở khóa nút SAVE. |

---

# PHẦN 3: POPUP NHẬP BẢN GHI VÀO BẢNG (IMPORT ROWS INTO A TABLE)

## 1. THÔNG TIN CHUNG
- **Tên màn hình/Popup:** Nhập bản ghi vào bảng (Import Rows Into A Table)
- **Loại giao diện:** Popup Modal
- **Mô tả nghiệp vụ:** Cho phép người dùng nạp thêm danh sách bản ghi loại trừ mới vào riêng bảng Whitelist hiện tại từ tệp tin cấu hình JSON.

## 2. ĐẶC TẢ CHI TIẾT CÁC THÀNH PHẦN GIAO DIỆN (UI COMPONENTS)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Import Rows Into A Table**<br>(Tiêu đề popup) | Label | - Tiêu đề popup mô tả tính năng nhập bản ghi vào bảng Whitelist.<br>- **Nội dung hiển thị:** Import Rows Into A Table<br>- **Tính chất hiển thị:** Tĩnh. |
| **2** | **Close**<br>(Icon đóng X) | Button | - Nút đóng popup, cho phép người dùng hủy bỏ thao tác.<br>- **Hành vi khi nhấn:** Đóng popup (hiển thị cảnh báo dữ liệu chưa lưu nếu đã tải file lên thành công). |
| **3** | **Table name**<br>(Tên bảng) | Textbox (Single-line) | - Hiển thị tên của bảng Whitelist đang thực hiện nạp bản ghi.<br>- **Giá trị mặc định:** Lấy tự động theo tên bảng Whitelist hiện tại (ví dụ: `IP_whitelist`).<br>- **Ràng buộc tương tác:** Ở trạng thái chỉ đọc (Read-only/Disabled).<br>- **Thông báo lỗi tương ứng:** Không có. |
| **4** | **File**<br>(Nhãn chọn file) | Label | - Nhãn cho vùng tải tệp lên, đánh dấu bắt buộc bằng dấu sao màu đỏ (`*`).<br>- **Nội dung hiển thị:** File * |
| **5** | **Upload Area**<br>(Vùng kéo thả/chọn tệp) | Upload File | - Người dùng bắt buộc kéo thả tệp tin hoặc click chọn vùng này để tải tệp bản ghi lên hệ thống.<br>- **Định dạng cho phép:** `.json`<br>- **Dung lượng tối đa:** Tối đa 50 MB.<br>- **Số lượng tối đa cho phép tải lên:** Tối đa 1 file.<br>- **Hướng dẫn hiển thị phía dưới:** Choose a .json file<br>- **Chế độ hiển thị danh sách / Preview:** Khi tải lên thành công, vùng kéo thả ẩn icon mặc định và hiển thị tên tệp tin đã nạp kèm dung lượng và nút xóa tệp dạng dấu nhân `x` ở góc phải.<br>- **Thông báo lỗi tương ứng:**<br>+ Trống và nhấn button SAVE: Hiển thị lỗi inline màu đỏ: `"Tệp tin whitelist là bắt buộc!"` (`"Whitelist file is required!"`)<br>+ Sai định dạng: Hiển thị lỗi inline màu đỏ: `"Định dạng tệp {Tên file} không hợp lệ! Chỉ cho phép tải lên tệp .json."` (`"Format of {Tên file} is invalid! Only .json files are allowed."`)<br>+ Quá dung lượng (> 50MB): Hiển thị lỗi inline màu đỏ: `"Dung lượng tệp {Tên file} vượt quá giới hạn (50MB)!"` (`"File size of {Tên file} exceeds the limit (50MB)!"`) |
| **6** | **CANCEL**<br>(Nút Hủy) | Button | - Cho phép người dùng hủy bỏ thao tác và đóng popup.<br>- **Hành vi khi nhấn:** Đóng popup (hiển thị cảnh báo dữ liệu chưa lưu nếu file đã được tải lên). |
| **7** | **SAVE**<br>(Nút Lưu) | Button | - Cho phép người dùng lưu dữ liệu các bản ghi trong file vào cơ sở dữ liệu của bảng hiện tại.<br>- **Trạng thái mặc định:** Disabled. Chỉ chuyển sang trạng thái Enabled sau khi tệp tin JSON được tải lên thành công.<br>- **Hành vi khi nhấn (OnClick Event):**<br>Hệ thống phân tích cú pháp dữ liệu tệp tin JSON tải lên đối chiếu cấu trúc dữ liệu theo quy định ở mục 3:<br>**1. Nếu kiểm tra nội dung thất bại** (Lỗi cú pháp JSON, hoặc cấu trúc tệp tin không khớp cấu hình chuẩn dành riêng cho bảng):<br>- Hiển thị Toast Message màu đỏ tự động đóng bằng tiếng Anh: `"Failed to import rows!"`<br>- Không đóng popup.<br>**2. Nếu kiểm tra nội dung thành công:**<br>- Hiển thị Spinner Loading trên nút SAVE, chuyển nút SAVE sang trạng thái Disabled.<br>- Gọi API nạp thêm danh sách bản ghi vào bảng DB.<br>- Nếu API phản hồi thành công: Đóng popup, cập nhật lại bảng danh sách bản ghi, hiển thị Toast Message màu xanh lá: `"Import rows successfully!"`<br>- Nếu API phản hồi thất bại: Hiển thị Toast Message màu đỏ tiếng Anh: `"Failed to import rows!"` và mở khóa nút SAVE. |

## 3. QUY TẮC NGHIỆP VỤ XÁC THỰC CẤU TRÚC JSON KHI IMPORT VÀO BẢNG
Khi nhấn **SAVE** tại popup Import Rows, hệ thống bắt buộc kiểm tra nội dung file JSON theo quy chuẩn sau để đảm bảo dữ liệu nạp tương thích hoàn toàn:
1. **Root Key bắt buộc:** Tệp tin JSON bắt buộc phải là một Object có duy nhất một Key cấp cao nhất khớp chính xác với **Tên bảng hiện tại** (được hiển thị tại trường `Table name`). 
   - Ví dụ khi nạp vào bảng `IP_whitelist`, Root Key phải là `"IP_whitelist"`.
2. **Category Object cấu trúc:**
   - Phải chứa một mảng `"entries"` đại diện cho danh sách các bản ghi loại trừ.
   - Cấu trúc ví dụ chuẩn:
     ```json
     {
       "IP_whitelist": {
         "entries": [
           {
             "rule": "INTERNAL_NETWORK", 
             "specific_value": "192.168.1.0/24",
             "description": "Internal corporate network"
           }
         ]
       }
     }
     ```
3. **Xác thực cấu trúc bản ghi (Entries):** Mỗi bản ghi trong mảng `entries` phải có đầy đủ các thuộc tính bắt buộc của bảng hiện tại. Các thuộc tính này không được để trống và mỗi thuộc tính có giới hạn tối đa là **128 ký tự**. Nếu phát hiện bất kỳ trường nào vượt quá 128 ký tự hoặc thiếu trường bắt buộc, hệ thống từ chối nạp file và báo lỗi `"Failed to import rows!"`.

---

# PHẦN 4: HÀNH ĐỘNG XUẤT FILE BẢN GHI BẢNG (EXPORT TABLE)

## 1. QUY TẮC ĐẶT TÊN FILE KHI XUẤT BẢN GHI
Khi người dùng bấm vào nút **Export** trên màn hình chi tiết đối tượng Whitelist, hệ thống thực hiện kết xuất dữ liệu và tải xuống tệp tin cấu hình tự động:
- **Quy tắc đặt tên file:** `{Tên_Bảng}.json`
  - Ví dụ đối với bảng `IP_whitelist` tên file tải xuống là: `IP_whitelist.json`
  - Ví dụ đối với bảng `Common_whitelist_value` tên file tải xuống là: `Common_whitelist_value.json`

## 2. QUY CHUẨN CẤU TRÚC NỘI DUNG TỆP TIN XUẤT RA
Nội dung của tệp tin JSON xuất ra phải khớp chính xác với định dạng cấu trúc tệp tin yêu cầu ở phần Import tại **Mục 3 của PHẦN 3** để đảm bảo tính đồng bộ hai chiều (file xuất ra có thể dùng để import lại vào hệ thống mà không lỗi).
Cấu trúc mẫu xuất ra:
```json
{
  "{Tên_Bảng}": {
    "entries": [
      {
        "rule": "{Tên_Rule}",
        "specific_value": "{Giá_trị}",
        "description": "{Mô_tả}"
      }
    ]
  }
}
```
*(Ghi chú: Loại bỏ các ID tạm thời hoặc các trường hệ thống không cần thiết khi kết xuất để giữ tệp tin cấu hình sạch sẽ).*

---

# PHẦN 5: ĐẶC TẢ CÁC HỘP THOẠI XÁC NHẬN ĐI KỀM (CONFIRMATION MODALS)

## 1. KỊCH BẢN XÁC NHẬN XÓA 1 BẢN GHI
- **Tên Modal:** Hộp thoại xác nhận xóa 1 dòng dữ liệu
- **Tiêu đề (Header):** `"Confirm Deletion"`
- **Nội dung thông báo (Body text):** `"Are you sure you want to delete this row?"`
- **Nút Xác nhận (YES Button):**
  - Nhãn nút: `"YES"` (Nút dạng filled blue)
  - Hành vi khi nhấn: Hệ thống đóng modal, hiển thị loading spinner nhỏ trên dòng dữ liệu bảng, gọi API xóa bản ghi và hiển thị Toast kết quả.
- **Nút Hủy (CANCEL Button):**
  - Nhãn nút: `"CANCEL"` (Nút dạng outline)
  - Hành vi khi nhấn: Đóng modal xác nhận, giữ nguyên bản ghi trên bảng.
- **Hành vi khi click vùng ngoài Modal:** Không đóng hộp thoại.

## 2. KỊCH BẢN XÁC NHẬN XÓA NHIỀU BẢN GHI (DELETE SELECTED)
- **Tên Modal:** Hộp thoại xác nhận xóa nhiều dòng dữ liệu hàng loạt
- **Tiêu đề (Header):** `"Confirm Deletion"`
- **Nội dung thông báo (Body text):** `"Are you sure you want to delete {n} rows?"` (trong đó `{n}` là số lượng bản ghi thực tế mà người dùng đã tích chọn Checkbox).
- **Nút Xác nhận (YES Button):**
  - Nhãn nút: `"YES"` (Nút dạng filled blue)
  - Hành vi khi nhấn: Hệ thống đóng modal này, hiển thị trạng thái loading spinner trên bảng, gọi API xóa hàng loạt danh sách ID đã chọn, bỏ tích chọn tất cả checkbox sau khi xóa và hiển thị Toast kết quả.
- **Hủy (CANCEL Button):**
  - Nhãn nút: `"CANCEL"` (Nút dạng outline)
  - Hành vi khi nhấn: Đóng modal xác nhận, giữ nguyên trạng thái tích chọn các checkbox trên bảng.
- **Hành vi khi click vùng ngoài Modal:** Không đóng hộp thoại.
