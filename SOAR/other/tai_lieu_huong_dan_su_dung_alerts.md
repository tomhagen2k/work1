# HƯỚNG DẪN SỬ DỤNG TÍNH NĂNG CẢNH BÁO (ALERTS) - HỆ THỐNG SOAR

Tài liệu này hướng dẫn người dùng thực hiện các thao tác quản lý, phân loại và xử lý danh sách cảnh báo (Alerts) trên giao diện hệ thống SOAR, bao gồm các tính năng: xem danh sách, xem chi tiết cảnh báo, tùy chỉnh cột hiển thị, tạo sự việc, gán vào sự việc, hủy gán khỏi sự việc, đánh dấu cảnh báo giả và gỡ đánh dấu cảnh báo giả.

---

## 1. Xem danh sách cảnh báo

### Mô tả chung
Tính năng này giúp người dùng theo dõi toàn bộ các cảnh báo an ninh được ghi nhận trong hệ thống. Người dùng có thể tìm kiếm, lọc và phân loại các cảnh báo theo nhiều tiêu chí khác nhau (Mức độ, Nguồn, Trạng thái,...) để nhanh chóng nắm bắt tình hình an ninh.

### Các bước thực hiện
*   **Bước 1:** Trên thanh điều hướng chính của hệ thống ở thanh menu phía trên, nhấn chọn mục **CẢNH BÁO**.
*   **Bước 2:** Hệ thống hiển thị danh sách các cảnh báo dưới dạng bảng với các thông tin chi tiết bao gồm: *Mã Cảnh báo*, *Thời gian*, *Mức độ*, *Nguồn*, *Nội dung*, *IP nguồn*, *Mã sự việc*, *Số sự kiện*, *Trạng thái*, và *Cảnh báo giả*.
*   **Bước 3:** (Tùy chọn) Sử dụng thanh tìm kiếm nâng cao hoặc các bộ lọc nhanh ở đầu trang để tìm kiếm cảnh báo:
    *   *Ô tìm kiếm*: Tìm kiếm theo Mức độ, Nguồn, Nội dung, IP nguồn, IP đích, tenant...
    *   *Bộ lọc Nguồn*: Chọn nguồn phát sinh cảnh báo (ví dụ: `camunda3`,...).
    *   *Bộ lọc Trạng thái*: Chọn trạng thái xử lý của cảnh báo (ví dụ: `Mới`,...).
    *   *Bộ lọc Mức độ*: Chọn mức độ cảnh báo (ví dụ: `Critical`, `High`,...).

---

## 2. Xem chi tiết cảnh báo

### Mô tả chung
Tính năng này giúp người dùng kiểm tra toàn bộ thông tin chi tiết của một cảnh báo cụ thể. Các thông tin được phân loại rõ ràng qua các tab chức năng nhằm hỗ trợ đội ngũ phân tích tìm hiểu sâu nguồn gốc và các thuộc tính của cảnh báo.

### Các bước thực hiện
*   **Bước 1:** Tại bảng danh sách cảnh báo, click chọn trực tiếp vào dòng bản ghi cảnh báo muốn xem chi tiết (hoặc click vào mã cảnh báo).
*   **Bước 2:** Hệ thống hiển thị một bảng thông tin chi tiết dạng panel trượt từ bên phải màn hình sang.
*   **Bước 3:** Click qua lại giữa các tab thông tin để xem chi tiết cảnh báo:
    *   **Key-Value:** Hiển thị dữ liệu được chuẩn hóa dưới dạng các cặp Thuộc tính - Giá trị (như *Alert ID*, *Case ID*, *Tenancy ID*, *Source*, *Severity*, *Status*, *Is False Positive*, *Raw Data*...).
    *   **JSON:** Hiển thị cấu trúc dữ liệu JSON thô (Raw JSON) của cảnh báo phục vụ việc tra cứu nhanh.
    *   **Nhật ký hệ thống:** Lưu trữ và hiển thị lịch sử thay đổi trạng thái, tác động của các tài khoản đối với cảnh báo này.
    *   **Sự kiện:** Liệt kê danh sách các sự kiện (events) liên quan trực tiếp hoặc cấu thành nên cảnh báo đó.

---

## 3. Chọn các cột hiển thị trên giao diện

### Mô tả chung
Tính năng này cho phép người dùng tùy biến ẩn hoặc hiện các cột thông tin trong bảng danh sách cảnh báo, giúp tối ưu hóa không gian hiển thị và tập trung vào các trường thông tin quan trọng theo nhu cầu cá nhân.

### Các bước thực hiện
*   **Bước 1:** Tại màn hình danh sách cảnh báo, nhấn chọn nút **Cột** (nút có biểu tượng bánh răng kèm số lượng cột đang hiển thị, ví dụ: `Cột (4/9)`) nằm ở phía trên bên phải của bảng dữ liệu.
*   **Bước 2:** Một danh sách các cột thông tin sẽ hiển thị. Tích chọn vào các cột muốn hiển thị trên giao diện hoặc bỏ tích chọn đối với các cột muốn ẩn đi.
*   **Bước 3:** Hệ thống sẽ ngay lập tức cập nhật bảng hiển thị theo cấu hình cột vừa chọn.

---

## 4. Tính năng Tạo sự việc từ cảnh báo

### Mô tả chung
Tính năng này giúp người dùng nhanh chóng chuyển đổi một hoặc nhiều cảnh báo an ninh có độ tin cậy cao hoặc có dấu hiệu nguy hại thành một Sự việc (Incident) mới để đưa vào quy trình điều tra, xử lý chuyên sâu.

### Các bước thực hiện
*   **Bước 1:** Trên bảng danh sách cảnh báo, tích chọn vào ô vuông (checkbox) ở đầu dòng tương ứng với các cảnh báo muốn dùng để tạo sự việc.
*   **Bước 2:** Nhấn nút **Tạo sự việc** xuất hiện trên thanh thao tác nhanh vừa hiển thị ở phía trên bảng.
*   **Bước 3:** Hệ thống hiển thị cửa sổ nhập thông tin **Tạo sự việc**. Người dùng thực hiện điền/chọn các thông tin sau:
    *   **Trạng thái xử lý** (Bắt buộc): Chọn `Chưa xử lý` hoặc `Đã xử lý`.
    *   **Phân loại** (Bắt buộc): Chọn `Nội bộ xử lý` hoặc `Gửi hỗ trợ`.
    *   **Tên sự việc** (Bắt buộc): Nhập tên mô tả ngắn gọn nhưng rõ ràng cho sự việc.
    *   **Mã** (Bắt buộc): Hệ thống tự sinh mã định danh duy nhất (có thể tùy chỉnh nếu cần).
    *   **Loại sự việc** (Bắt buộc): Chọn phân loại sự việc từ danh sách thả xuống.
    *   **Khách hàng** (Bắt buộc): Chọn khách hàng hoặc tổ chức chịu ảnh hưởng.
    *   **Đơn vị xử lý** (Bắt buộc): Chọn đơn vị chịu trách nhiệm xử lý sự việc.
    *   **Người thực hiện**: Chọn nhân viên hoặc quản trị viên phụ trách chính.
    *   **Mức độ nguy hiểm** (Bắt buộc): Chọn mức độ nghiêm trọng (ví dụ: `Cao`, `Trung bình`, `Thấp`).
    *   **Độ ưu tiên** (Bắt buộc): Chọn độ ưu tiên xử lý.
    *   **SLA** (Bắt buộc): Chọn cam kết thời gian hoàn thành xử lý.
    *   **Thời gian xử lý** & **Thời gian phát hiện**: Chọn mốc thời gian ghi nhận và xử lý.
    *   **Mô tả**: Nhập thông tin chi tiết về sự việc (hỗ trợ định dạng văn bản Markdown).
*   **Bước 4:** Nhấn nút **TẠO MỚI** để lưu thông tin và khởi tạo sự việc, hoặc nhấn **HỦY** để đóng cửa sổ mà không tạo sự việc.

---

## 5. Tính năng Gán cảnh báo vào sự việc

### Mô tả chung
Tính năng này cho phép người dùng liên kết thêm các cảnh báo mới phát hiện có cùng hành vi, cùng nguồn tấn công hoặc có liên quan vào một Sự việc (Incident) đã tồn tại trên hệ thống để tập trung xử lý và phân tích log.

### Các bước thực hiện
*   **Bước 1:** Trên bảng danh sách cảnh báo, tích chọn vào các cảnh báo cần đưa vào sự việc đã có.
*   **Bước 2:** Nhấn chọn nút **Gán vào sự việc** trên thanh thao tác nhanh ở phía đầu bảng.
*   **Bước 3:** Cửa sổ **Gán Cảnh báo vào Sự việc** hiển thị:
    *   Phần trên hiển thị *Danh sách cảnh báo đã chọn* để người dùng kiểm tra lại thông tin.
    *   Tại ô *Tìm kiếm sự việc theo tên hoặc mã...*, nhập từ khóa hoặc mã sự việc để tìm kiếm sự việc mong muốn.
    *   Từ *Danh sách sự việc* lọc được ở bên dưới, nhấp chuột để chọn sự việc cần liên kết.
*   **Bước 4:** Nhấn nút **GÁN VÀO SỰ VIỆC** để hoàn thành liên kết, hoặc nhấn **HỦY** để hủy bỏ thao tác.

---

## 6. Tính năng Hủy gán cảnh báo khỏi sự việc

### Mô tả chung
Cho phép người dùng gỡ bỏ liên kết giữa cảnh báo và sự việc hiện tại trong trường hợp liên kết sai hoặc cảnh báo không còn thuộc phạm vi xử lý của sự việc đó.

### Các bước thực hiện
*   **Bước 1:** Tại bảng danh sách cảnh báo, di chuyển chuột đến cột **Mã sự việc** của cảnh báo cần hủy liên kết.
*   **Bước 2:** Click vào biểu tượng ghim gỡ (biểu tượng hủy liên kết bên cạnh mã sự việc đang gán), hệ thống sẽ hiển thị tooltip **Hủy gán khỏi sự việc**.
*   **Bước 3:** Hệ thống hiển thị hộp thoại xác nhận **Hủy gán cảnh báo khỏi sự việc** với thông báo: *"Cảnh báo sẽ bị gỡ khỏi sự việc hiện tại. Bạn có chắc chắn muốn tiếp tục không?"* đi kèm thông tin chi tiết sự việc hiện tại.
*   **Bước 4:** Nhấn nút **HỦY GÁN** để xác nhận gỡ bỏ liên kết, hoặc nhấn **HỦY** để giữ nguyên liên kết.

---

## 7. Tính năng Đánh dấu cảnh báo giả (False Positive)

### Mô tả chung
Tính năng này dùng để gắn nhãn giả (False Positive) cho các cảnh báo vô hại, cảnh báo do hoạt động kiểm thử, bảo trì hệ thống hoặc do các hành vi hợp lệ khác. Việc này giúp làm sạch danh sách giám sát và tránh gây phân tâm cho đội ngũ vận hành.

### Các bước thực hiện
*   **Bước 1:** Tích chọn các cảnh báo được xác định là cảnh báo giả trong bảng danh sách cảnh báo.
*   **Bước 2:** Nhấn nút **Đánh dấu giả** trên thanh thao tác nhanh ở phía đầu bảng.
*   **Bước 3:** Cửa sổ **Đánh dấu Cảnh báo giả (False Positive)** hiện lên, thực hiện cung cấp lý do:
    *   *Chọn lý do nhanh* (Bắt buộc): Nhấp chọn một trong các nút lý do hệ thống gợi ý sẵn: `Kiểm thử hệ thống`, `Hoạt động bảo trì`, `Cấu hình mạng IP nội bộ`, hoặc `Hành vi người dùng hợp lệ`.
    *   *Nhập chi tiết*: Nhập thêm chi tiết giải trình cụ thể vào ô văn bản dưới phần *"Hoặc nhập lý do chi tiết..."*.
*   **Bước 4:** Nhấn nút **XÁC NHẬN** để áp dụng nhãn cảnh báo giả và cập nhật trạng thái, hoặc nhấn **HỦY** để quay lại màn hình danh sách cảnh báo.

---

## 8. Tính năng Gỡ đánh dấu cảnh báo giả

### Mô tả chung
Khi một cảnh báo được xác nhận lại là mối đe dọa thực sự (hoặc do gán nhãn nhầm), người dùng có thể thực hiện gỡ bỏ đánh dấu cảnh báo giả để chuyển cảnh báo đó quay lại trạng thái xử lý bình thường.

### Các bước thực hiện
*   **Bước 1:** Tại cột **Cảnh báo giả** của dòng cảnh báo đã đánh dấu giả, nhấn vào nút **Gỡ** nằm ở bên cạnh nhãn lý do (ví dụ: cạnh nhãn `Cấu hình mạng...`).
*   **Bước 2:** Cửa sổ xác nhận **Gỡ đánh dấu Cảnh báo giả** hiển thị thông báo với nội dung xác nhận cảnh báo này sẽ được chuyển trở lại trạng thái xử lý bình thường.
*   **Bước 3:** Nhấn nút **GỠ ĐÁNH DẤU** để hoàn thành, hoặc nhấn **HỦY** để quay lại danh sách cảnh báo mà không thay đổi.
