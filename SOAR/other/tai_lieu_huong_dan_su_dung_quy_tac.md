# HƯỚNG DẪN SỬ DỤNG TÍNH NĂNG QUẢN LÝ QUY TẮC (CORRELATION RULES) - HỆ THỐNG SOAR

Tài liệu này hướng dẫn người dùng sử dụng và cấu hình phân hệ **Quản lý Quy tắc (Correlation Rules)** trên hệ thống SOAR. Phân hệ này cho phép thiết lập các luật tương quan nhằm tự động phát hiện, gom nhóm các cảnh báo (Alerts) riêng lẻ và chuyển đổi chúng thành các Sự việc (Incidents) để xử lý một cách tập trung, tự động.

---

## 1. Xem danh sách quy tắc

### Mô tả chung
Giao diện danh sách quy tắc cung cấp cái nhìn tổng quan về tất cả các luật tương quan đang có trên hệ thống, trạng thái hoạt động, mức độ ưu tiên, điều kiện lọc tóm tắt, số lượng sự việc đã tạo từ quy tắc đó, thông tin người cập nhật và thời gian chỉnh sửa cuối cùng.

### Các bước thực hiện
*   **Bước 1:** Trên thanh điều hướng chính của hệ thống, chọn menu **QUẢN TRỊ**, sau đó chọn mục **Quy tắc** ở thanh menu dọc bên trái (dưới mục cấu hình hệ thống).
*   **Bước 2:** Giao diện hiển thị **Danh sách quy tắc** dưới dạng bảng với các cột thông tin:
    *   *STT:* Số thứ tự.
    *   *Tên quy tắc:* Tên và mô tả ngắn của quy tắc.
    *   *Độ ưu tiên:* Nhãn mức độ ưu tiên của quy tắc (`Nghiêm trọng`, `Cao`, `Trung bình`, `Thấp`).
    *   *Điều kiện lọc:* Biểu thức logic tóm tắt để lọc cảnh báo (ví dụ: `tenant == vnd`, `severity == 1`).
    *   *Trạng thái:* Nút gạt bật/tắt hoạt động của quy tắc (`Hoạt động` / `Không hoạt động`).
    *   *Cập nhật lần cuối:* Thời gian cập nhật và tên tài khoản thực hiện chỉnh sửa gần nhất.
    *   *Thao tác:* Các nút chức năng nhanh gồm Sửa (biểu tượng hình cây bút chì) và Xóa (biểu tượng hình thùng rác).
*   **Bước 3:** (Tùy chọn) Tìm kiếm và lọc danh sách quy tắc bằng thanh công cụ phía trên:
    *   *Ô tìm kiếm:* Nhập từ khóa để tìm kiếm theo tên quy tắc.
    *   *Bộ lọc Trạng thái:* Lọc theo trạng thái hoạt động (Tất cả, Hoạt động, Không hoạt động).
    *   *Bộ lọc Độ ưu tiên:* Lọc theo độ ưu tiên thiết lập của quy tắc.
    *   *Bộ lọc Cập nhật lần cuối:* Chọn khoảng thời gian (Ngày bắt đầu $\rightarrow$ Ngày kết thúc) để lọc các quy tắc được chỉnh sửa trong khoảng thời gian đó.

---

## 2. Tạo mới quy tắc tương quan (Correlation Rule)

### Mô tả chung
Tính năng này cho phép người dùng xây dựng một quy tắc tương quan mới qua quy trình 3 bước (Wizard) nhằm định nghĩa điều kiện lọc cảnh báo đầu vào và cách thức hệ thống tự động gộp/tạo sự việc khi có cảnh báo khớp điều kiện.

### Các bước thực hiện

#### **Bước 1: Thiết lập điều kiện lọc (Filtering Conditions)**
Tại màn hình danh sách quy tắc, nhấn nút **+ TẠO QUY TẮC** ở góc trên bên phải. Hệ thống sẽ hiển thị cửa sổ cấu hình bước 1:

1.  **Cấu hình THÔNG TIN CƠ BẢN:**
    *   **Tên quy tắc** *(Bắt buộc)*: Nhập tên ngắn gọn, thể hiện rõ loại hành vi cần tương quan (Ví dụ: *Brute Force SSH Detection*, *Lateral Movement*,...).
    *   **Mô tả**: Nhập diễn giải chi tiết về mục đích của quy tắc để hỗ trợ quản trị viên khác hiểu rõ nghiệp vụ lọc.
    *   **Trạng thái**: Sử dụng nút gạt để đặt trạng thái ban đầu của quy tắc là `Hoạt động` (áp dụng lọc ngay lập tức) hoặc `Không hoạt động`.
    *   **Độ ưu tiên**: Chọn độ ưu tiên của quy tắc từ danh sách thả xuống (`Nghiêm trọng`, `Cao`, `Trung bình`, `Thấp`).
2.  **Cấu hình ĐIỀU KIỆN LỌC CẢNH BÁO:**
    *   Thiết lập bộ lọc đầu vào (**Input Filter**): Xác định cảnh báo nào sẽ bị quét bởi quy tắc này.
    *   Cấu trúc điều kiện: `Khi [Chọn trường...] [Toán tử] [Nhập giá trị...]`.
        *   *Chọn trường*: Chọn thuộc tính của cảnh báo như *Mức độ (severity)*, *Nguồn (source)*, *Nội dung (content)*, *IP nguồn (srcAddr)*, *IP đích (dstAddr)*, *Khách hàng (tenant)*,...
        *   *Toán tử*: Chọn phép toán tương ứng (`== (equals)` - bằng, `!=` - khác, `contains` - chứa cụm từ, `startsWith` - bắt đầu bằng, `endsWith` - kết thúc bằng).
        *   *Nhập giá trị*: Điền giá trị cần so khớp trực tiếp hoặc chọn từ danh sách.
    *   **Nút + Thêm điều kiện AND**: Nhấp để thêm điều kiện ràng buộc trong cùng một nhóm. Cảnh báo bắt buộc phải thỏa mãn *tất cả* các dòng điều kiện nối nhau bằng logic `AND` thì nhóm đó mới được tính là khớp.
    *   **Nút + Thêm nhóm điều kiện (OR)**: Nhấp để tạo thêm một nhóm điều kiện độc lập mới nằm phía dưới nhóm cũ. Hai nhóm được nối với nhau bằng logic `OR`. Nghĩa là cảnh báo chỉ cần thỏa mãn *ít nhất một trong các nhóm* (Nhóm 1 HOẶC Nhóm 2) là sẽ được chọn để gộp.
3.  **Cấu hình Tùy chọn nâng cao (Tần suất và giới hạn):**
    *   **Giới hạn số lượng cảnh báo**: Nhập số lượng cảnh báo tối đa được gom vào một sự việc (Ví dụ: `5` cảnh báo/sự việc). Khi vượt quá số lượng này, cảnh báo tiếp theo thỏa mãn điều kiện sẽ được đẩy sang một sự việc mới. Nhập `0` nếu không muốn giới hạn số lượng gộp.
    *   **Khoảng thời gian gom nhóm**: Thời gian tối đa (tính bằng phút, tối thiểu `1` phút) tính từ cảnh báo đầu tiên để gom tất cả cảnh báo thỏa mãn điều kiện xuất hiện sau đó vào cùng một sự việc (Ví dụ: gom trong vòng `15` phút).
4.  Sau khi hoàn tất cấu hình Bước 1, nhấn **TIẾP TỤC**.

#### **Bước 2: Cấu hình thông tin xử lý (Handling Information)**
Bước này định nghĩa hành động xử lý của hệ thống khi có cảnh báo khớp với điều kiện lọc ở Bước 1. Người dùng có 2 lựa chọn cấu hình chính:

##### **Trường hợp A: Tạo sự việc tự động mới (Không tích chọn "Gộp vào sự việc đang có sẵn")**
Hệ thống sẽ tự động tạo một Sự việc (Incident) hoàn toàn mới khi có cảnh báo khớp điều kiện:
*   **Tiêu đề sự việc** *(Bắt buộc)*: Nhập tiêu đề mẫu cho sự việc tự động. Hệ thống hỗ trợ chèn các biến động lấy từ thông tin cảnh báo bằng cú pháp `{{tên_biến}}`.
    *   *Ví dụ:* `[Auto] Tấn công từ {{srcAddr}}` hoặc `Cảnh báo {{severity}} từ nguồn {{source}}`.
    *   *Các biến hỗ trợ hiển thị sẵn:* `{{severity}}`, `{{source}}`, `{{content}}`, `{{srcAddr}}`, `{{dstAddr}}`, `{{tenant}}`.
*   **Cấu hình sự việc tự động tạo:**
    *   **Loại sự việc** *(Bắt buộc)*: Phân loại nghiệp vụ sự cố (ví dụ: Sự cố dò quét cổng, Brute Force, tấn công Web,...).
    *   **Khách hàng** *(Bắt buộc)*: Chọn khách hàng/tổ chức liên đới.
    *   **Đơn vị xử lý** *(Bắt buộc)*: Bộ phận nội bộ chịu trách nhiệm xử lý chính sự việc này (ví dụ: SOC L1, SOC L2, Network Team,...).
    *   **Người thực hiện (tùy chọn)**: Giao trực tiếp cho một nhân sự cụ thể thuộc đơn vị xử lý.
    *   **Mức độ nghiêm trọng** *(Bắt buộc)*: Đánh giá mức độ nguy hại của sự việc.
    *   **Chính sách SLA** *(Bắt buộc)*: Chọn chính sách cam kết thời gian hoàn thành xử lý sự cố.

##### **Trường hợp B: Gộp cảnh báo vào sự việc có sẵn (Tích chọn "Gộp vào sự việc đang có sẵn")**
Hệ thống sẽ quét tìm sự việc tương ứng đang tồn tại trên hệ thống để gộp cảnh báo mới vào thay vị tạo sự việc mới. Khi chọn tùy chọn này, người dùng cần cấu hình:
*   **Trạng thái sự việc áp dụng:**
    *   **Sự việc đang mở (MẶC ĐỊNH)**: Luôn tìm các sự việc có cùng điều kiện lọc đang ở trạng thái mở (như Mới, Đang xử lý) để gộp vào.
        *   *Chỉ gộp vào sự việc mở còn hạn SLA*: Nếu tích chọn, hệ thống sẽ bỏ qua các sự việc đang mở nhưng đã quá hạn xử lý SLA (nhằm tránh gộp thêm cảnh báo làm nhiễu hoặc kéo dài thời gian xử lý sự cố cũ đã quá hạn).
    *   **Sự việc đã đóng**: Cho phép tự động mở lại sự việc đã đóng gần đây để gộp cảnh báo mới vào.
        *   *Khoảng thời gian tìm case đã đóng*: Nhập số lượng và chọn đơn vị thời gian (Phút, Giờ, Ngày) để hệ thống quét ngược về quá khứ tìm sự việc đã đóng (ví dụ: tìm trong vòng `24 Giờ` gần nhất tính từ hiện tại).
        *   *Chính sách SLA khi mở lại*: Chọn cách thức tính thời gian xử lý khi case được mở lại:
            *   `Đặt lại SLA`: Hệ thống sẽ thiết lập lại mốc thời gian tính SLA từ đầu kể từ thời điểm mở lại và gộp cảnh báo mới.
            *   `Giữ SLA cũ`: Tiếp tục áp dụng thời hạn SLA cũ của sự việc trước khi đóng.
*   Sau khi hoàn tất cấu hình Bước 2, nhấn **TIẾP TỤC** (hoặc quay lại bước trước bằng nút **QUAY LẠI**).

#### **Bước 3: Xác nhận cấu hình (Configuration Confirmation)**
Tại bước này, hệ thống sẽ tổng hợp lại toàn bộ các thông tin đã thiết lập để người dùng rà soát lần cuối trước khi lưu chính thức:
*   **Các thông tin hiển thị kiểm tra:**
    *   **Thông tin chung**: Kiểm tra lại *Tên quy tắc*, *Mô tả*, *Trạng thái* (ví dụ: `Hoạt động`), và *Độ ưu tiên* (ví dụ: `Cao`).
    *   **Điều kiện lọc & Threshold**: 
        *   *Filter*: Hiển thị logic lọc đã tạo (Ví dụ: `IP nguồn == "10.32.4.2"`).
        *   *Threshold*: Hiển thị ngưỡng gom nhóm tương ứng với Tùy chọn nâng cao ở Bước 1 (Ví dụ: `> 5 sự việc trong khoảng 15 phút`).
    *   **Action & Case Template**:
        *   Hiển thị chi tiết bản mẫu sự việc sẽ tự động tạo hoặc gộp: *Tiêu đề sự việc*, *Loại sự việc*, *Khách hàng*, *Đơn vị xử lý*, *Người thực hiện*, *Mức độ nghiêm trọng*, *Chính sách SLA*, và trạng thái của *Cấu hình gộp sự việc* (`Bật`/`Tắt` hoặc `Tất cả`).
*   **Thao tác kết thúc:**
    *   Nhấn nút **LƯU QUY TẮC** ở góc dưới bên phải để hoàn tất quá trình thiết lập và lưu quy tắc tương quan vào hệ thống.
    *   Nhấn nút **QUAY LẠI** nếu phát hiện thông tin chưa chính xác và cần điều chỉnh lại ở các bước trước.

---

## 3. Xem chi tiết / Chỉnh sửa quy tắc (Edit Rule)

### Mô tả chung
Tính năng này giúp người dùng kiểm tra cấu hình chi tiết của một quy tắc đang chạy hoặc thay đổi điều kiện lọc, phương thức gộp sự việc khi nghiệp vụ giám sát an ninh có sự thay đổi.

### Các bước thực hiện
*   **Bước 1:** Tại màn hình danh sách quy tắc, di chuyển đến dòng quy tắc cần chỉnh sửa.
*   **Bước 2:** Tại cột **Thao tác**, nhấn vào nút **Sửa** (biểu tượng hình cây bút chì).
*   **Bước 3:** Hệ thống hiển thị giao diện 3 bước tương tự như màn hình tạo mới, nhưng đã được điền sẵn toàn bộ dữ liệu cấu hình hiện tại của quy tắc.
*   **Bước 4:** Thực hiện thay đổi các thông tin cần thiết tại các bước, nhấn **TIẾP TỤC** để chuyển bước.
*   **Bước 5:** Tại bước 3 (Xác nhận cấu hình), kiểm tra lại các thay đổi và nhấn **LƯU QUY TẮC** để áp dụng cấu hình mới.

---

## 4. Xóa quy tắc tương quan (Delete Rule)

### Mô tả chung
Gỡ bỏ hoàn toàn một quy tắc tương quan khỏi hệ thống khi quy tắc đó đã lỗi thời hoặc không còn phù hợp với chính sách giám sát an ninh.

> [!IMPORTANT]
> Để tránh gây gián đoạn luồng xử lý hoặc lỗi hệ thống, hệ thống SOAR quy định: **Chỉ cho phép xóa các quy tắc đang ở trạng thái "Không hoạt động"**. Nút Xóa sẽ bị vô hiệu hóa (disabled) nếu quy tắc đang bật gạt "Hoạt động".

### Các bước thực hiện
*   **Bước 1:** Tìm quy tắc muốn xóa trong danh sách quy tắc.
*   **Bước 2:** Nếu quy tắc đang ở trạng thái **Hoạt động**, nhấn vào nút gạt ở cột **Trạng thái** để chuyển quy tắc sang trạng thái **Không hoạt động** (Hoạt động $\rightarrow$ Không hoạt động).
*   **Bước 3:** Khi quy tắc đã tắt hoạt động, nút **Xóa** (biểu tượng hình thùng rác màu đỏ) tại cột **Thao tác** sẽ khả dụng. Nhấp chọn nút **Xóa**.
*   **Bước 4:** Hệ thống hiển thị một hộp thoại cảnh báo xác nhận **Xóa quy tắc**:
    *   Nội dung cảnh báo: *"Bạn có chắc chắn muốn xóa quy tắc "[Tên quy tắc]" không? Hành động này không thể hoàn tác."*
*   **Bước 5:** Nhấn nút **XÓA** (màu xanh) để xác nhận xóa vĩnh viễn quy tắc khỏi hệ thống, hoặc nhấn **HỦY** để hủy thao tác và đóng hộp thoại.
