# USER STORY VÀ ACCEPTANCE CRITERIA: CHỨC NĂNG QUẢN LÝ KỊCH BẢN (PHẦN 1)

> **Hệ thống:** OSINT AI Automation  
> **Tính năng:** Quản Lý Kịch Bản (Scenario Management)  
> **Tài liệu chuẩn hóa theo Skill:** `user_story_ac`  

---

- **US-01:** Là một Quản trị viên, tôi muốn xem danh sách kịch bản và lọc theo loại hoặc tìm kiếm theo tên, để dễ dàng tìm kiếm và quản lý kho kịch bản nuôi nick.
  - **AC-01:** Hiển thị danh sách kịch bản mặc định (Happy path)
    - **Cho:** Quản trị viên đang ở màn hình "Quản lý kịch bản".
    - **Khi:** Hệ thống tải dữ liệu xong.
    - **Thì:** Danh sách kịch bản ở Cột 1 hiển thị đầy đủ các kịch bản với thông tin: Tên kịch bản, Badge AI (nếu tạo bằng AI), Tag Loại kịch bản (`🔄 Kịch bản đơn` hoặc `📅 Lộ trình (N ngày)`), tổng số bước hành động và tổng số lượng kịch bản.
  - **AC-02:** Tìm kiếm kịch bản theo tên
    - **Cho:** Quản trị viên đang ở Cột 1 danh sách kịch bản và có danh sách nhiều kịch bản.
    - **Khi:** Quản trị viên nhập từ khóa tìm kiếm vào ô "Tìm kiếm theo Tên kịch bản".
    - **Thì:** Danh sách kịch bản tự động lọc và chỉ hiển thị các kịch bản có tên chứa từ khóa tìm kiếm (không phân biệt hoa thường).
  - **AC-03:** Lọc kịch bản theo Tab Loại kịch bản
    - **Cho:** Quản trị viên đang ở màn hình Quản lý kịch bản.
    - **Khi:** Quản trị viên chuyển đổi giữa các Tab bộ lọc ("Tất cả", "Kịch bản đơn", "Lộ trình").
    - **Thì:** Danh sách kịch bản lập tức cập nhật chỉ hiển thị các kịch bản thuộc đúng Loại đã chọn.
  - **AC-04:** Trường hợp tìm kiếm không có kết quả
    - **Cho:** Quản trị viên đang tìm kiếm kịch bản.
    - **Khi:** Quản trị viên nhập từ khóa không khớp với bất kỳ kịch bản nào.
    - **Thì:** Danh sách hiển thị trống và số lượng kịch bản hiển thị là 0.

---

- **US-02:** Là một Quản trị viên, tôi muốn tạo mới kịch bản với tên, kênh nền tảng và loại kịch bản ở dạng Combobox, để xây dựng quy trình nuôi nick phù hợp.
  - **AC-01:** Tạo mới Kịch bản đơn thành công (Happy path)
    - **Cho:** Quản trị viên mở Modal "Tạo mới kịch bản".
    - **Khi:** Quản trị viên chọn Kênh nền tảng (VD: Facebook), nhập Tên kịch bản hợp lệ, chọn Loại kịch bản là "🔄 Kịch bản đơn" từ Combobox và nhấn nút "Lưu kịch bản".
    - **Thì:** Hệ thống khởi tạo kịch bản đơn mới, đóng Modal, thêm kịch bản vừa tạo lên đầu danh sách Cột 1, tự động chọn kịch bản này và mở không gian làm việc thêm hành động ở Cột 3.
  - **AC-02:** Tạo mới Kịch bản lộ trình thành công (Happy path)
    - **Cho:** Quản trị viên mở Modal "Tạo mới kịch bản".
    - **Khi:** Quản trị viên chọn Kênh nền tảng, nhập Tên kịch bản hợp lệ, chọn Loại kịch bản là "📅 Kịch bản lộ trình" từ Combobox và nhấn nút "Lưu kịch bản".
    - **Thì:** Hệ thống khởi tạo kịch bản lộ trình mới kèm "Ngày 1" mặc định (có giờ chạy tự động), hiển thị Cột 2 Sub-menu danh sách Ngày và mở không gian làm việc Ngày 1 ở Cột 3.
  - **AC-03:** Cảnh báo khi để trống Tên kịch bản (Validation rule)
    - **Cho:** Quản trị viên đang ở Modal "Tạo mới kịch bản".
    - **Khi:** Quản trị viên để trống ô "Tên kịch bản" và nhấn "Lưu kịch bản".
    - **Thì:** Hệ thống hiển thị thông báo lỗi "Vui lòng nhập tên kịch bản!" và giữ nguyên Modal để người dùng bổ sung.

---

- **US-03:** Là một Quản trị viên, tôi muốn chỉnh sửa Tên và Kênh nền tảng của kịch bản đã tạo (và bị khóa Loại kịch bản), để cập nhật thông tin kịch bản mà không ảnh hưởng đến cấu hình cốt lõi.
  - **AC-01:** Mở Popup Chỉnh sửa kịch bản thành công
    - **Cho:** Quản trị viên rê chuột vào thẻ kịch bản ở Cột 1.
    - **Khi:** Quản trị viên nhấn vào nút biểu tượng "✏️ Chỉnh sửa kịch bản".
    - **Thì:** Modal mở ra với tiêu đề "Chỉnh sửa kịch bản [Tên kịch bản]", tự động điền Tên kịch bản và Kênh nền tảng hiện tại, đồng thời Combobox "Loại kịch bản" ở trạng thái bị Khóa (Disabled).
  - **AC-02:** Lưu thông tin Chỉnh sửa kịch bản (Happy path)
    - **Cho:** Quản trị viên đang ở Modal Chỉnh sửa kịch bản.
    - **Khi:** Quản trị viên thay đổi Tên kịch bản hoặc Kênh nền tảng hợp lệ và nhấn nút "Lưu kịch bản".
    - **Thì:** Hệ thống cập nhật thông tin kịch bản trong kho dữ liệu, đóng Modal và cập nhật tên kịch bản mới trên giao diện Cột 1 và Cột 3.
  - **AC-03:** Không cho phép thay đổi Loại kịch bản khi sửa
    - **Cho:** Quản trị viên đang ở Modal Chỉnh sửa kịch bản.
    - **Khi:** Quản trị viên thao tác vào ô Combobox "Loại kịch bản".
    - **Thì:** Ô chọn không phản hồi và giữ nguyên Loại kịch bản ban đầu.

---

- **US-04:** Là một Quản trị viên, tôi muốn quản lý danh sách Ngày trong Kịch bản Lộ trình (Thêm Ngày, Xóa Ngày), để điều chỉnh độ dài lộ trình nuôi nick.
  - **AC-01:** Thêm Ngày mới vào Kịch bản lộ trình chưa gán (Happy path)
    - **Cho:** Quản trị viên đang xem một Kịch bản lộ trình chưa được gán cho bất kỳ tài khoản ảo nào.
    - **Khi:** Quản trị viên nhấn vào nút "+ Thêm Ngày mới" ở chân Cột 2 (Sub-menu).
    - **Thì:** Hệ thống khởi tạo Ngày N+1 mới với giờ chạy được sinh ngẫu nhiên thông minh, tự động chọn Ngày N+1 và cập nhật danh sách Ngày ở Cột 2.
  - **AC-02:** Xóa Ngày khỏi Kịch bản lộ trình chưa gán (Happy path)
    - **Cho:** Quản trị viên rê chuột vào nút Ngày ở Cột 2 của một kịch bản chưa được gán.
    - **Khi:** Quản trị viên nhấn vào biểu tượng "🗑️ Xóa Ngày" và xác nhận trong Dialog hỏi lại.
    - **Thì:** Hệ thống loại bỏ Ngày đó khỏi lộ trình, tự động đánh lại số thứ tự các Ngày còn lại (Ngày 1, Ngày 2...) và cập nhật lại giao diện.
  - **AC-03:** Cảnh báo chặn Thêm/Xóa Ngày đối với Kịch bản lộ trình ĐÃ GÁN (Business constraint)
    - **Cho:** Quản trị viên đang xem một Kịch bản lộ trình ĐÃ ĐƯỢC GÁN cho ít nhất 1 tài khoản ảo.
    - **Khi:** Quản trị viên nhấn vào nút "+ Thêm Ngày mới" hoặc biểu tượng "🗑️ Xóa Ngày".
    - **Thì:** Hệ thống ngăn chặn hành động và hiển thị cảnh báo: "⚠️ RÀNG BUỘC SẢN PHẨM: Kịch bản lộ trình này đang được gán cho tài khoản ảo. Bạn không thể thêm mới hoặc xóa bớt ngày của kịch bản đã gán!".

---

- **US-05:** Là một Quản trị viên, tôi muốn hệ thống tự động sinh giờ ngẫu nhiên trong khung giờ hoạt động cao và cho phép tôi tùy chỉnh giờ chạy cho từng Ngày, để giả lập hành vi người dùng thật.
  - **AC-01:** Sinh giờ ngẫu nhiên thông minh khi thêm Ngày mới
    - **Cho:** Quản trị viên nhấn thêm Ngày mới vào kịch bản lộ trình.
    - **Khi:** Hệ thống khởi tạo Ngày mới.
    - **Thì:** Giờ thực hiện của Ngày mới được tự động sinh ngẫu nhiên thuộc 1 trong 3 khung giờ vàng tương tác: Sáng (08:00 - 11:59), Chiều (13:00 - 16:59), Tối (19:00 - 22:59) (VD: `08:42`, `14:15`, `20:38`).
  - **AC-02:** Mở Popup Tùy chỉnh giờ chạy cho Ngày
    - **Cho:** Quản trị viên ở Cột 2 (Sub-menu) hoặc Cột 3 (Header detail).
    - **Khi:** Quản trị viên nhấn vào nút "✏️ Sửa giờ" trên thẻ Ngày hoặc bấm vào Badge "⏰ Giờ chạy: HH:mm".
    - **Thì:** Popup "Thiết lập thời gian cho [Ngày X]" xuất hiện với ô chọn giờ `HH:mm` chứa thời gian hiện tại của Ngày đó.
  - **AC-03:** Lưu giờ chạy mới thành công
    - **Cho:** Quản trị viên đang ở Popup Thiết lập thời gian cho Ngày.
    - **Khi:** Quản trị viên thay đổi mốc giờ mới (VD: `15:30`) và nhấn nút "Lưu thay đổi".
    - **Thì:** Hệ thống cập nhật giờ chạy mới cho Ngày đó, hiển thị giờ mới trên thẻ Sub-menu Cột 2 và Badge Header Cột 3.
