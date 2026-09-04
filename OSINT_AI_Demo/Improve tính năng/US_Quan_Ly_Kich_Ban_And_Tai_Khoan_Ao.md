# BỘ USER STORY VÀ ACCEPTANCE CRITERIA TỔNG HỢP: TÍNH NĂNG QUẢN LÝ KỊCH BẢN & GÁN KỊCH BẢN TÀI KHOẢN ẢO

> **Hệ thống:** OSINT AI Automation  
> **Module:** Quản Lý Kịch Bản (Scenario Management) & Quản Lý Tài Khoản Ảo (Virtual Account Assignment)  
> **Tài liệu chuẩn hóa theo Skill:** `user_story_ac` (Định dạng BDD: Cho - Khi - Thì)  
> **Cập nhật:** Đã bao gồm các nâng cấp nghiệp vụ mới nhất (Nhiều lượt chạy trong ngày cách 30p, Validation lỗi inline màu đỏ, Khóa thông tin khi sửa, Kích hoạt lại lộ trình dở...).

---

## 📦 PHẦN 1: MODULE QUẢN LÝ KỊCH BẢN (SCENARIO MANAGEMENT)

---

### **US-01: Xem, Tìm kiếm và Lọc Danh sách Kịch bản**
**Là một** Quản trị viên,  
**tôi muốn** xem danh sách kịch bản, tìm kiếm theo tên và lọc theo loại kịch bản (*Kịch bản đơn*, *Kịch bản lộ trình*),  
**để** dễ dàng quản lý, tra cứu và kiểm soát kho kịch bản nuôi nick.

*   **AC-01: Hiển thị danh sách kịch bản mặc định (Happy path)**
    *   **Cho:** Quản trị viên đang ở màn hình "Quản lý kịch bản".
    *   **Khi:** Hệ thống tải dữ liệu kịch bản hoàn tất.
    *   **Thì:** Danh sách kịch bản ở Cột 1 hiển thị đầy đủ các kịch bản với thông tin: Tên kịch bản, Badge AI (nếu được tạo bởi AI), Tag loại kịch bản (`🔄 Kịch bản đơn` hoặc `📅 Lộ trình (N ngày)`), tổng số lượng hành động (Ví dụ: `5 hành động`) và 2 nút công cụ (`✏️ Chỉnh sửa kịch bản`, `🗑️ Xóa kịch bản`).
*   **AC-02: Tìm kiếm kịch bản theo tên**
    *   **Cho:** Quản trị viên đang xem danh sách kịch bản ở Cột 1.
    *   **Khi:** Quản trị viên nhập từ khóa vào ô "Tìm kiếm tên kịch bản...".
    *   **Thì:** Danh sách lập tức tự động lọc và chỉ hiển thị các kịch bản có tên chứa từ khóa tìm kiếm (không phân biệt hoa thường).
*   **AC-03: Lọc kịch bản theo Tab loại kịch bản**
    *   **Cho:** Quản trị viên đang ở Cột 1 danh sách kịch bản.
    *   **Khi:** Quản trị viên chuyển đổi giữa các Tab bộ lọc ("Tất cả", "Kịch bản đơn", "Lộ trình").
    *   **Thì:** Danh sách kịch bản lập tức cập nhật chỉ hiển thị các kịch bản thuộc loại tương ứng với Tab đã chọn.

---

### **US-02: Tạo mới Kịch bản**
**Là một** Quản trị viên,  
**tôi muốn** tạo mới kịch bản với Tên, Kênh nền tảng và chọn Loại kịch bản từ Combobox,  
**để** xây dựng các kịch bản tương tác theo phiên hoặc kịch bản lộ trình đa ngày.

*   **AC-01: Tạo mới Kịch bản đơn thành công (Happy path)**
    *   **Cho:** Quản trị viên nhấn nút "+" ở đầu Cột 1 để mở Popup "Tạo mới kịch bản".
    *   **Khi:** Quản trị viên nhập Tên kịch bản hợp lệ, chọn Kênh nền tảng (Facebook), chọn Loại kịch bản là "🔄 Kịch bản đơn" từ Combobox và nhấn "Lưu kịch bản".
    *   **Thì:** Hệ thống tạo kịch bản đơn mới, đóng Popup, đưa kịch bản lên đầu danh sách Cột 1, mở không gian làm việc thêm hành động ở Cột 3.
*   **AC-02: Tạo mới Kịch bản lộ trình thành công (Happy path)**
    *   **Cho:** Quản trị viên đang ở Popup "Tạo mới kịch bản".
    *   **Khi:** Quản trị viên nhập Tên kịch bản hợp lệ, chọn Kênh nền tảng, chọn Loại kịch bản là "📅 Kịch bản lộ trình" từ Combobox và nhấn "Lưu kịch bản".
    *   **Thì:** Hệ thống tạo kịch bản lộ trình mới kèm "Ngày 1" mặc định (chứa Lượt 1 lúc `08:30`), hiển thị Sub-menu danh sách Ngày ở Cột 2 và hiển thị thẻ Lượt chạy ở Cột 3.
*   **AC-03: Validation để trống Tên kịch bản**
    *   **Cho:** Quản trị viên đang ở Popup "Tạo mới kịch bản".
    *   **Khi:** Quản trị viên để trống ô "Tên kịch bản" và bấm "Lưu kịch bản".
    *   **Thì:** Hệ thống hiển thị cảnh báo "Vui lòng nhập tên kịch bản!" và giữ nguyên Popup để người dùng bổ sung.

---

### **US-03: Chỉnh sửa thông tin Kịch bản & Khóa dữ liệu cốt lõi**
**Là một** Quản trị viên,  
**tôi muốn** chỉnh sửa Tên kịch bản và bị khóa tính năng sửa Loại kịch bản cũng như Kênh nền tảng,  
**để** cập nhật tên kịch bản mà không làm hỏng hoặc xung đột cấu hình dữ liệu cốt lõi.

*   **AC-01: Mở Popup Chỉnh sửa kịch bản thành công**
    *   **Cho:** Quản trị viên rê chuột vào thẻ kịch bản ở Cột 1.
    *   **Khi:** Quản trị viên nhấn nút biểu tượng "✏️ Chỉnh sửa kịch bản".
    *   **Thì:** Popup mở ra với tiêu đề "Chỉnh sửa kịch bản [Tên kịch bản]", tự động điền Tên kịch bản hiện tại. Ô chọn "Kênh nền tảng" (mặc định Facebook) và ô chọn "Loại kịch bản" ở trạng thái Khóa (Disabled).
*   **AC-02: Lưu thay đổi Tên kịch bản (Happy path)**
    *   **Cho:** Quản trị viên đang ở Popup Chỉnh sửa kịch bản.
    *   **Khi:** Quản trị viên nhập Tên kịch bản mới hợp lệ và nhấn "Lưu kịch bản".
    *   **Thì:** Hệ thống cập nhật tên kịch bản trong cơ sở dữ liệu, đóng Popup và cập nhật tên kịch bản mới ở Cột 1 và Cột 3.
*   **AC-03: Không cho phép sửa Kênh nền tảng và Loại kịch bản**
    *   **Cho:** Quản trị viên đang ở Popup Chỉnh sửa kịch bản.
    *   **Khi:** Quản trị viên thao tác vào ô "Kênh nền tảng" hoặc ô "Loại kịch bản".
    *   **Thì:** Trường không phản hồi thao tác và giữ nguyên giá trị đã chọn ban đầu.

---

### **US-04: Quản lý Danh sách Ngày trong Kịch bản Lộ trình**
**Là một** Quản trị viên,  
**tôi muốn** thêm mới Ngày hoặc xóa Ngày trong Kịch bản lộ trình (áp dụng cho kịch bản chưa gán),  
**để** tùy chỉnh độ dài tiến trình nuôi nick.

*   **AC-01: Thêm Ngày mới vào kịch bản chưa gán (Happy path)**
    *   **Cho:** Quản trị viên đang xem một Kịch bản lộ trình chưa được gán cho bất kỳ tài khoản ảo nào.
    *   **Khi:** Quản trị viên nhấn nút "+ Thêm Ngày mới" ở chân Cột 2 (Sub-menu).
    *   **Thì:** Hệ thống khởi tạo Ngày N+1 mới chứa Lượt 1 mặc định (`08:30`), tự động chọn Ngày N+1 và cập nhật danh sách ở Cột 2.
*   **AC-02: Xóa Ngày khỏi kịch bản chưa gán (Happy path)**
    *   **Cho:** Quản trị viên rê chuột vào thẻ Ngày ở Cột 2 của kịch bản chưa gán.
    *   **Khi:** Quản trị viên nhấn biểu tượng "🗑️ Xóa Ngày" và xác nhận trong Dialog hỏi lại.
    *   **Thì:** Hệ thống loại bỏ Ngày đó khỏi lộ trình, tự động đánh lại số thứ tự các Ngày còn lại (Ngày 1, Ngày 2...) và cập nhật lại giao diện.
*   **AC-03: Chặn Thêm/Xóa Ngày đối với Kịch bản lộ trình ĐÃ GÁN (Business constraint)**
    *   **Cho:** Quản trị viên đang xem một Kịch bản lộ trình ĐÃ ĐƯỢC GÁN cho ít nhất 1 tài khoản ảo.
    *   **Khi:** Quản trị viên nhấn nút "+ Thêm Ngày mới" hoặc biểu tượng "🗑️ Xóa Ngày".
    *   **Thì:** Hệ thống ngăn chặn hành động và hiển thị cảnh báo: "⚠️ RÀNG BUỘC SẢN PHẨM: Kịch bản lộ trình này đang được gán cho tài khoản ảo. Bạn không thể thêm mới hoặc xóa bớt ngày của kịch bản đã gán!".

---

### **US-05: Quản lý Khung giờ / Lượt chạy trong Ngày & Validation 30 phút**
**Là một** Quản trị viên,  
**tôi muốn** cấu hình nhiều Lượt chạy trong một Ngày và cài đặt thời điểm chạy cho từng Lượt cách nhau tối thiểu 30 phút,  
**để** phân bổ lịch nuôi nick tự nhiên theo nhiều khung giờ trong ngày (Sáng, Chiều, Tối).

*   **AC-01: Thêm Lượt chạy mới trong Ngày (Happy path)**
    *   **Cho:** Quản trị viên đang xem chi tiết một Ngày của Kịch bản lộ trình ở Cột 3.
    *   **Khi:** Quản trị viên nhấn nút "⏰ + Thêm lượt chạy" ở Header Cột 3, chọn mốc giờ `HH:mm` hợp lệ (cách các lượt khác ≥ 30 phút) và nhấn "Lưu lượt chạy".
    *   **Thì:** Hệ thống khởi tạo Thẻ Lượt chạy mới (Lượt K), sắp xếp các Lượt chạy theo thứ tự thời gian tăng dần và hiển thị Thẻ Lượt chạy mới trên giao diện Cột 3.
*   **AC-02: Validation các Lượt chạy phải cách nhau tối thiểu 30 phút (Inline error)**
    *   **Cho:** Quản trị viên đang ở Popup "Thêm lượt chạy mới" hoặc "Sửa giờ lượt chạy".
    *   **Khi:** Quản trị viên chọn mốc thời gian `HH:mm` cách một Lượt chạy khác trong cùng Ngày nhỏ hơn 30 phút (VD: Lượt 1 là 09:00, chọn Lượt 2 là 09:15) và nhấn "Lưu lượt chạy".
    *   **Thì:** Hệ thống không đóng Popup và hiển thị dòng thông báo lỗi màu đỏ trực tiếp dưới ô chọn giờ: `⚠️ Thời điểm giữa các lượt chạy trong cùng một ngày phải cách nhau tối thiểu 30 phút! Vui lòng chọn mốc giờ khác.`.
*   **AC-03: Sửa mốc giờ chạy của Lượt**
    *   **Cho:** Quản trị viên ở Cột 3 bấm vào biểu tượng "✏️ Sửa giờ lượt chạy" trên tiêu đề Thẻ Lượt chạy.
    *   **Khi:** Quản trị viên thay đổi mốc giờ hợp lệ và nhấn "Lưu lượt chạy".
    *   **Thì:** Hệ thống cập nhật mốc giờ mới, tự động sắp xếp lại vị trí các Thẻ Lượt chạy và cập nhật thông tin mốc giờ ở Cột 2 Sub-menu.
*   **AC-04: Xóa Lượt chạy trong Ngày**
    *   **Cho:** Quản trị viên bấm nút biểu tượng "🗑️ Xóa lượt chạy" trên Thẻ Lượt chạy (ngày đó đang có từ 2 lượt chạy trở lên).
    *   **Khi:** Quản trị viên xác nhận xóa.
    *   **Thì:** Hệ thống xóa Lượt chạy đó và cập nhật lại số thứ tự Lượt (Lượt 1, Lượt 2...). Nếu Ngày chỉ còn 1 Lượt duy nhất, hệ thống sẽ cảnh báo không cho xóa.

---

### **US-06: Quản lý danh sách Hành động trong Kịch bản và trong Lượt chạy**
**Là một** Quản trị viên,  
**tôi muốn** thêm, chỉnh sửa hoặc xóa các hành động tương tác vào Kịch bản đơn hoặc vào từng Lượt chạy của Kịch bản lộ trình,  
**để** định nghĩa chi tiết công việc bot sẽ thực thi.

*   **AC-01: Thêm hành động vào Kịch bản đơn hoặc Lượt chạy (Happy path)**
    *   **Cho:** Quản trị viên bấm nút "+ Thêm hành động" tại Kịch bản đơn hoặc trên một Thẻ Lượt chạy cụ thể.
    *   **Khi:** Quản trị viên chọn một hành động từ Modal danh mục hành động (VD: Đọc thông báo, Tương tác Newsfeed...).
    *   **Thì:** Hành động được thêm trực tiếp vào danh sách bảng của Kịch bản đơn hoặc của đúng Lượt chạy đó.
*   **AC-02: Hiển thị icon Sửa (✏️) và Xóa (🗑️) cho từng hành động**
    *   **Cho:** Danh sách hành động hiển thị trong bảng dữ liệu ở Cột 3.
    *   **Khi:** Quản trị viên xem cột "Chức năng" của từng dòng hành động.
    *   **Thì:** Cột Chức năng hiển thị đầy đủ 2 nút công cụ: biểu tượng **`✏️`** (Chỉnh sửa hành động) và biểu tượng **`🗑️`** (Xóa hành động).
*   **AC-03: Xóa hành động khỏi Lượt hoặc Kịch bản đơn**
    *   **Cho:** Quản trị viên nhấn nút "🗑️ Xóa hành động" tại một dòng trong bảng.
    *   **Khi:** Hành động được trigger xóa.
    *   **Thì:** Hệ thống lập tức loại bỏ dòng hành động đó khỏi bảng và cập nhật lại tổng số hành động của kịch bản.

---

## 📦 PHẦN 2: MODULE QUẢN LÝ TÀI KHOẢN ẢO & GÁN KỊCH BẢN (VIRTUAL ACCOUNT ASSIGNMENT)

---

### **US-07: Xem Danh sách Tài khoản ảo & Kịch bản đã gán**
**Là một** Quản trị viên,  
**tôi muốn** tích chọn các tài khoản ảo và mở danh sách kịch bản đang gán cho tài khoản,  
**để** theo dõi tiến trình nuôi nick và quản lý lịch chạy kịch bản của từng nick.

*   **AC-01: Hiển thị danh sách Tài khoản ảo & Số kịch bản gán (Happy path)**
    *   **Cho:** Quản trị viên ở màn hình "Quản lý tài khoản ảo".
    *   **Khi:** Bảng dữ liệu hiển thị.
    *   **Thì:** Danh sách tài khoản ảo hiển thị UID, Email, Proxy, Trạng thái và cột "Số KB Đã Gán" (VD: `2 kịch bản`).
*   **AC-02: Mở Popup Danh sách kịch bản đã gán cho tài khoản**
    *   **Cho:** Quản trị viên tích chọn ít nhất 1 tài khoản ảo trên Datatable.
    *   **Khi:** Quản trị viên bấm nút "⚡ Hành động ▾" và chọn "🎬 Gán kịch bản cho tài khoản".
    *   **Thì:** Popup mở ra hiển thị tiêu đề "Danh sách chạy kịch bản cho tài khoản [Email]", danh sách các kịch bản đang được gán kèm ngày bắt đầu, tiến trình hiện tại (`Ngày X/Y`), công tắc Bật/Tắt và các nút Chỉnh sửa/Xóa.

---

### **US-08: Gán Kịch bản đơn cho Tài khoản ảo & Inline Validation**
**Là một** Quản trị viên,  
**tôi muốn** gán Kịch bản đơn cho tài khoản ảo và thiết lập lịch lặp lại hàng tuần với các thông báo lỗi hiển thị dạng dòng chữ màu đỏ trực tiếp dưới ô nhập,  
**để** tự động hóa các tác vụ lặp định kỳ và nhận diện lỗi chính xác khi nhập liệu.

*   **AC-01: Gán Kịch bản đơn thành công (Happy path)**
    *   **Cho:** Quản trị viên ở Popup Cấu hình kịch bản chạy mới.
    *   **Khi:** Quản trị viên chọn Loại kịch bản là "🔄 Kịch bản đơn", chọn kịch bản khả dụng, thiết lập ít nhất 1 Khung giờ lặp lại (chọn giờ `HH:mm` và tích chọn ít nhất 1 ngày trong tuần T2-CN) và nhấn "Lưu cấu hình".
    *   **Thì:** Hệ thống lưu cấu hình gán, đóng Popup cấu hình và cập nhật kịch bản đơn mới vào danh sách kịch bản gán của tài khoản.
*   **AC-02: Inline Validation chưa chọn kịch bản cần chạy**
    *   **Cho:** Quản trị viên chọn Loại kịch bản nhưng để trống ô "Kịch bản cần chạy *".
    *   **Khi:** Quản trị viên nhấn "Lưu cấu hình".
    *   **Thì:** Hệ thống không đóng Popup và hiển thị dòng chữ màu đỏ ngay bên dưới ô chọn kịch bản: `Vui lòng chọn kịch bản cần chạy!`.
*   **AC-03: Inline Validation kịch bản đơn chưa có khung giờ chạy**
    *   **Cho:** Quản trị viên chọn Kịch bản đơn nhưng xóa hết các khung giờ lặp (hoặc không tích chọn ngày nào trong tuần).
    *   **Khi:** Quản trị viên nhấn "Lưu cấu hình".
    *   **Thì:** Hệ thống không đóng Popup và hiển thị dòng chữ màu đỏ ngay bên dưới phần thiết lập lịch: `Vui lòng thêm ít nhất 1 khung giờ chạy cho kịch bản!` (hoặc `Vui lòng chọn ít nhất 1 ngày trong tuần cho khung giờ chạy!`).

---

### **US-09: Gán Kịch bản lộ trình cho Tài khoản ảo & Cảnh báo gán lần đầu**
**Là một** Quản trị viên,  
**tôi muốn** gán Kịch bản lộ trình cho tài khoản ảo, chọn Ngày bắt đầu chạy và Hành vi khi hết lộ trình,  
**để** triển khai chiến dịch nuôi nick AI đa ngày theo đúng tiến trình.

*   **AC-01: Gán Kịch bản lộ trình thành công (Happy path)**
    *   **Cho:** Quản trị viên ở Popup Cấu hình kịch bản chạy mới.
    *   **Khi:** Quản trị viên chọn "📅 Kịch bản lộ trình", chọn kịch bản khả dụng, chọn Ngày bắt đầu chạy (≥ Ngày hiện tại), chọn Hành vi khi chạy hết lộ trình (*Dừng lại* hoặc *Lặp lại chu kỳ từ đầu*) và bấm "Lưu cấu hình".
    *   **Thì:** Hệ thống tạo cấu hình gán lộ trình mới bắt đầu từ Ngày 1 và đóng Popup.
*   **AC-02: Inline Validation ngày bắt đầu nhỏ hơn ngày hiện tại**
    *   **Cho:** Quản trị viên chọn Ngày bắt đầu chạy trong quá khứ (nhỏ hơn Ngày hiện tại theo mốc ngày địa phương trình duyệt).
    *   **Khi:** Quản trị viên bấm "Lưu cấu hình".
    *   **Thì:** Hệ thống hiển thị dòng chữ màu đỏ trực tiếp bên dưới ô chọn ngày: `Ngày bắt đầu chạy không được nhỏ hơn ngày hiện tại!`.
*   **AC-03: Cảnh báo xác nhận khi gán Kịch bản lộ trình lần đầu**
    *   **Cho:** Quản trị viên chọn một Kịch bản lộ trình chưa từng được gán cho bất kỳ tài khoản ảo nào.
    *   **Khi:** Quản trị viên nhấn "Lưu cấu hình".
    *   **Thì:** Hệ thống hiển thị Dialog cảnh báo: *"📢 XÁC NHẬN GÁN KỊCH BẢN LỘ TRÌNH: Sau khi gán kịch bản lộ trình này cho tài khoản ảo, hệ thống sẽ KHÓA tính năng điều chỉnh thêm/xóa bớt ngày cho kịch bản ở màn Quản lý kịch bản. Bạn có chắc chắn muốn tiếp tục gán không?"*. Nếu đồng ý mới tiến hành lưu.

---

### **US-10: Tạm dừng / Bật lại Kịch bản lộ trình & Xử lý kích hoạt lại (Resume / Restart)**
**Là một** Quản trị viên,  
**tôi muốn** gạt bật/tắt trạng thái hoạt động của kịch bản đã gán, và khi bật lại kịch bản lộ trình dở dang thì được chọn tiếp tục chạy ngày dở hoặc chạy lại từ Ngày 1,  
**để** linh hoạt kiểm soát tiến trình chạy của bot.

*   **AC-01: Tắt trạng thái hoạt động của kịch bản đã gán**
    *   **Cho:** Quản trị viên ở Popup Danh sách kịch bản gán của tài khoản.
    *   **Khi:** Quản trị viên gạt công tắc Toggle từ BẬT ➔ TẮT.
    *   **Thì:** Trạng thái kịch bản chuyển sang tạm dừng (`active = false`) và cập nhật biểu tượng trạng thái.
*   **AC-02: Bật lại Kịch bản lộ trình dở dang & Hiển thị Popup lựa chọn (Happy path)**
    *   **Cho:** Một kịch bản lộ trình đã gán đang ở trạng thái TẮT và đã chạy dở đến `Ngày N` (với N > 1).
    *   **Khi:** Quản trị viên gạt công tắc Toggle từ TẮT ➔ BẬT.
    *   **Thì:** Hệ thống lập tức hiển thị Popup **`⚙️ Kích hoạt lại Kịch bản lộ trình`** với thông báo: *"Kịch bản này trước đó đã chạy đến Ngày N. Bạn muốn hệ thống xử lý tiếp tục như thế nào?"* kèm 2 lựa chọn Radio.
*   **AC-03: Xác nhận Tiếp tục chạy tiếp Ngày đang dở**
    *   **Cho:** Quản trị viên chọn Radio "▶️ Tiếp tục chạy tiếp Ngày đang dở".
    *   **Khi:** Quản trị viên bấm "Xác nhận kích hoạt".
    *   **Thì:** Kịch bản chuyển sang trạng thái BẬT (`active = true`) và giữ nguyên tiến trình tiếp tục chạy Ngày N.
*   **AC-04: Xác nhận Chạy lại từ Ngày 1**
    *   **Cho:** Quản trị viên chọn Radio "🔄 Chạy lại từ Ngày 1".
    *   **Khi:** Quản trị viên bấm "Xác nhận kích hoạt".
    *   **Thì:** Kịch bản chuyển sang trạng thái BẬT, đặt lại tiến trình về `Ngày 1` và cập nhật ngày bắt đầu chạy thành Ngày hiện tại.
*   **AC-05: Hủy kích hoạt lại**
    *   **Cho:** Quản trị viên đang ở Popup Kích hoạt lại Kịch bản lộ trình.
    *   **Khi:** Quản trị viên bấm "Hủy" hoặc nút đóng "✕".
    *   **Thì:** Popup đóng lại và công tắc Toggle giữ nguyên trạng thái TẮT.

---

### **US-11: Gỡ Kịch bản khỏi Tài khoản ảo & Lọc Kịch bản khả dụng**
**Là một** Quản trị viên,  
**tôi muốn** gỡ kịch bản ra khỏi tài khoản ảo và tự động lọc bỏ các kịch bản đã gán khỏi danh sách lựa chọn khi thêm mới,  
**để** thay đổi chiến dịch nuôi nick và ngăn ngừa việc gán trùng kịch bản trên cùng một tài khoản.

*   **AC-01: Gỡ kịch bản khỏi tài khoản ảo (Happy path)**
    *   **Cho:** Quản trị viên ở Popup Danh sách kịch bản gán của tài khoản.
    *   **Khi:** Quản trị viên bấm nút biểu tượng "🗑️" tại một dòng kịch bản và xác nhận gỡ.
    *   **Thì:** Hệ thống loại bỏ kịch bản đó khỏi tài khoản và cập nhật lại tổng số kịch bản gán ở Datatable.
*   **AC-02: Tự động loại bỏ Kịch bản đã gán khỏi Combobox lựa chọn**
    *   **Cho:** Quản trị viên mở Popup Thêm kịch bản chạy mới cho tài khoản.
    *   **Khi:** Quản trị viên chọn Loại kịch bản (*Kịch bản đơn* hoặc *Kịch bản lộ trình*).
    *   **Thì:** Combobox "Kịch bản cần chạy" chỉ danh sách hiển thị các kịch bản CHƯA ĐƯỢC GÁN cho tài khoản đó (tự động ẩn các kịch bản đã được gán trước đó).
