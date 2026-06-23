# Chương 6: Tích hợp hệ thống (System Integration)

Chương này hướng dẫn người quản trị cấu hình tích hợp Firewall với các hệ thống giám sát và phân tích an toàn thông tin bên ngoài, bao gồm SIEM (Security Information and Event Management), SOC (Security Operations Center), và nền tảng Threat Intelligence (TI Platform). Việc tích hợp giúp tập trung hóa nhật ký (log) và nâng cao khả năng phát hiện, phản hồi sự cố.

## 6.1. Tích hợp SIEM

Cho phép cấu hình đẩy log hệ thống và log sự kiện bảo mật từ Firewall đến hệ thống quản lý thông tin và sự kiện bảo mật (SIEM) thông qua giao thức Syslog (TCP/UDP) hoặc API.

### 6.1.1. Xem danh sách cấu hình SIEM
Giúp quản trị viên tra cứu và theo dõi trạng thái các kết nối tích hợp đến máy chủ SIEM.

**Các bước thực hiện:**
1. Truy cập vào menu **System integration** > **SIEM Configuration**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
   - **Status:** Trạng thái hoạt động của cấu hình.
   - **Name:** Tên định danh của cấu hình kết nối SIEM.
   - **Vendor:** Tên nhà cung cấp hoặc nền tảng SIEM.
   - **Forward Method:** Phương thức đẩy dữ liệu.
   - **Sources:** Nguồn dữ liệu được gửi đi.
   - **URL:** Đường dẫn hoặc địa chỉ IP của máy chủ SIEM nhận log.
   - **Access Token:** Trạng thái thiết lập mã token truy cập.
   - **Created At:** Thời gian tạo cấu hình.
   - **Actions:** Các thao tác có thể thực hiện.
3. Có thể sử dụng thanh tìm kiếm để tra cứu nhanh cấu hình theo tên hoặc địa chỉ URL.

### 6.1.2. Tạo mới cấu hình SIEM
Cho phép quản trị viên thêm một kết nối mới tới hệ thống SIEM để tự động đẩy các log sự kiện.

**Các bước thực hiện:**
1. Tại màn hình danh sách SIEM Configuration, nhấp vào nút **Add New**.
2. Trên cửa sổ tạo mới, điền các thông tin sau:
   - **Name (*):** Nhập tên định danh cho cấu hình SIEM (bắt buộc).
   - **Vendor:** Lựa chọn nhà cung cấp hệ thống SIEM.
   - **SIEM URL (*):** Nhập địa chỉ URL của máy chủ SIEM.
   - **Port:** Nhập cổng kết nối. Tích chọn **Use TLS** nếu sử dụng đường truyền mã hóa.
   - **Forward Method:** Lựa chọn phương thức đẩy dữ liệu.
   - **Authentication Type:** Lựa chọn kiểu xác thực.
   - **Access Token:** Nhập mã Access Token dùng để xác thực. Có thể ấn vào biểu tượng con mắt để xem mã.
   - **Origin Authentication:** Lựa chọn chế độ ký số (**Signing Mode**) để định danh nguồn dữ liệu và bảo vệ tính toàn vẹn.
   - **Delivery Sources:** Chọn các nguồn dữ liệu cần đẩy bằng cách tích chọn:
     - **Send Alerts:** Gửi các cảnh báo bảo mật từ hệ thống.
     - **Send Events:** Gửi các nhật ký kiểm toán.
   - **Alert Filters:** Thiết lập các bộ lọc cảnh báo (chỉ hiển thị và áp dụng khi chọn Send Alerts):
     - **Alert Severities:** Chọn các mức độ cảnh báo cần gửi (Low, Medium, High).
     - **Match Reason:** Chọn lý do phù hợp hoặc để trống.
     - **Source IP / CIDR:** Nhập danh sách IP hoặc dải IP nguồn (mỗi IP/CIDR một dòng). Để trống nếu cho phép tất cả các IP.
3. Nhấn **Test Connection** để kiểm tra kết nối với máy chủ SIEM.
4. Nhấn **Save** để lưu và áp dụng cấu hình.

### 6.1.3. Sửa cấu hình SIEM
Hỗ trợ thay đổi các thông số kết nối của một cấu hình SIEM đã tồn tại khi có sự thay đổi về hạ tầng hoặc yêu cầu hệ thống.

**Các bước thực hiện:**
1. Tại màn hình danh sách, nhấp vào biểu tượng thao tác (**...**) ở cột **Actions** và chọn sửa cấu hình tương ứng.
2. Cập nhật các thông tin kết nối như URL, cổng (Port), mã xác thực (Access Token), hoặc các bộ lọc cảnh báo cần gửi.
3. Nhấn **Test Connection** để kiểm tra lại nếu cần thiết.
4. Nhấn **Save** để lưu các thay đổi.

---

## 6.2. Tích hợp SOC

Tính năng này hỗ trợ tích hợp với hệ thống Security Operations Center (SOC) để phối hợp xử lý sự cố, đẩy cảnh báo (alerts) ở thời gian thực.

### 6.2.1. Xem danh sách cấu hình SOC
Cung cấp cái nhìn tổng quan về các cấu hình kết nối đã thiết lập với hệ thống SOC.

**Các bước thực hiện:**
1. Truy cập menu **System integration** > **SOC Configuration**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
   - **Status:** Trạng thái hoạt động của cấu hình.
   - **Name:** Tên định danh của cấu hình kết nối SOC.
   - **Vendor:** Tên nhà cung cấp.
   - **Send Method:** Phương thức đẩy dữ liệu sang SOC.
   - **Destination:** Địa chỉ đích hoặc đường dẫn URL nhận dữ liệu của hệ thống SOC.
   - **TLS:** Trạng thái mã hóa đường truyền.
   - **Created At:** Thời gian tạo cấu hình.
   - **Actions:** Các thao tác có thể thực hiện.
3. Có thể sử dụng thanh tìm kiếm để tra cứu nhanh cấu hình theo tên hoặc địa chỉ đích.

### 6.2.2. Tạo mới cấu hình SOC
Cho phép thiết lập một kênh kết nối mới tới trung tâm điều hành an toàn thông tin (SOC) để đẩy các cảnh báo bảo mật theo thời gian thực.

**Các bước thực hiện:**
1. Tại màn hình danh sách SOC Configuration, nhấp vào nút **Add New**.
2. Điền các thông tin kết nối SOC:
   - **Name (*):** Nhập tên cấu hình SOC (bắt buộc).
   - **Vendor:** Lựa chọn nhà cung cấp SOC.
   - **Host or URL (*):** Nhập địa chỉ Host hoặc URL của hệ thống SOC.
   - **Port:** Nhập cổng kết nối. Tích chọn **Use TLS** nếu sử dụng kết nối mã hóa.
   - **Send Method:** Lựa chọn phương thức gửi dữ liệu.
   - **Syslog Transport:** Lựa chọn giao thức truyền tải cho Syslog. Tích chọn **Use TLS** nếu sử dụng kết nối mã hóa.
   - **Alert Filters:** Thiết lập các bộ lọc cho cảnh báo:
     - **Alert Severities:** Chọn các mức độ cảnh báo cần gửi. Để trống để gửi tất cả.
     - **Match Reason:** Chọn lý do phù hợp.
     - **Source IP / CIDR:** Nhập danh sách IP hoặc dải IP nguồn. Để trống nếu cho phép tất cả các IP.
   - **Priority Delivery:** Tích chọn **Enable prioritized delivery** nếu muốn ưu tiên gửi các cảnh báo ở mức độ cao.
   - **Origin Authentication:** Lựa chọn chế độ ký số (**Signing Mode**) để định danh nguồn dữ liệu.
3. Nhấn nút **Test Connection** để kiểm tra tính hợp lệ và sẵn sàng của kết nối tới SOC.
4. Nhấn **Save** để lưu thiết lập.

### 6.2.3. Sửa cấu hình SOC
Cho phép cập nhật lại thông tin kết nối, cấu hình bộ lọc hoặc giao thức truyền tải khi hệ thống SOC có sự thay đổi.

**Các bước thực hiện:**
1. Tại danh sách SOC Configuration, nhấp vào biểu tượng thao tác (**...**) ở cột **Actions** tương ứng với cấu hình cần thay đổi và chọn sửa.
2. Thay đổi cấu hình như Host/URL, cổng, phương thức gửi hoặc bộ lọc cảnh báo.
3. Nhấn **Test Connection** để kiểm tra lại nếu cần thiết.
4. Nhấn **Save** để hoàn tất chỉnh sửa.

---

## 6.3. Tích hợp Threat Intelligence (TI Platform)

Tích hợp với các nền tảng phân tích mã độc và thông tin tình báo mối đe dọa (Threat Intelligence) để hệ thống tự động kiểm tra, đánh giá mức độ rủi ro của các IP, URL, hoặc File đáng ngờ.

### 6.3.1. Xem danh sách nền tảng TI (TI Platforms)
Giúp theo dõi các nền tảng phân tích mã độc và tình báo mối đe dọa đang được hệ thống sử dụng để làm giàu dữ liệu an ninh.

**Các bước thực hiện:**
1. Truy cập menu **System integration** > **TI Platforms**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
   - **Name:** Tên của nền tảng Threat Intelligence.
   - **Collections:** Các tập dữ liệu được thu thập.
   - **Status:** Trạng thái hoạt động của cấu hình tích hợp.
   - **Last Sync:** Trạng thái của lần đồng bộ dữ liệu gần nhất.
   - **Action:** Các thao tác có thể thực hiện.
3. Có thể sử dụng thanh tìm kiếm để tra cứu nhanh nền tảng theo tên.

### 6.3.2. Thêm mới nền tảng TI
Thêm một nhà cung cấp dữ liệu Threat Intelligence mới (thông qua giao thức TAXII 2.1) để nâng cao khả năng phát hiện mối đe dọa.

**Các bước thực hiện:**
1. Tại tab **Platforms** của màn hình TI Platforms, nhấp vào nút **Add Platform**.
2. Khai báo các thông số kết nối nền tảng TI:
   - **Name (*):** Nhập tên định danh cho nền tảng.
   - **Base URL (*):** Đường dẫn API gốc (TAXII 2.1 API root URL) của nền tảng cung cấp.
   - **Collection Mode:** Lựa chọn chế độ thu thập dữ liệu.
   - **Poll Interval (minutes):** Chu kỳ tự động đồng bộ dữ liệu (tính bằng phút).
   - **Description:** Nhập mô tả cho nền tảng.
   - **Enabled:** Tích chọn để kích hoạt tính năng kết nối và đồng bộ dữ liệu.
   - **Auth Type:** Lựa chọn phương thức xác thực.
3. Nhấn **Save** để lưu thiết lập.

### 6.3.3. Sửa nền tảng TI
Dùng để thay đổi khóa xác thực, cập nhật địa chỉ hoặc thay đổi chu kỳ đồng bộ với nền tảng TI.

**Các bước thực hiện:**
1. Trong danh sách nền tảng TI, nhấp vào biểu tượng thao tác (**...**) ở cột **Action** của nền tảng cần sửa và chọn chỉnh sửa.
2. Cập nhật các thông tin như Base URL, chế độ thu thập (Collection Mode), chu kỳ đồng bộ (Poll Interval) hoặc phương thức xác thực (Auth Type).
3. Nhấn **Save** để lưu lại các thay đổi.

### 6.3.4. Xem lịch sử yêu cầu (Request history)
Hỗ trợ quản trị viên kiểm tra và theo dõi các truy vấn cụ thể đã được hệ thống Firewall gửi lên nền tảng TI nhằm đánh giá hiệu suất hoặc gỡ lỗi kết nối.

**Các bước thực hiện:**
1. Tại menu quản lý TI Platform, chuyển sang tab (hoặc nhấn nút) **Request history**.
2. Tại màn hình lịch sử, bạn có thể xem các thông tin:
   - **Time:** Thời điểm chính xác hệ thống thực hiện truy vấn.
   - **Platform:** Nền tảng Threat Intelligence được truy vấn.
   - **Request Type:** Loại yêu cầu.
   - **URL:** Đường dẫn API được truy vấn.
   - **Status:** Mã trạng thái trả về từ api.
   - **Duration:** Thời gian thực hiện truy vấn.
   - **Result:** Trạng thái truy vấn thành công hay thất bại
3. Có thể dùng thanh tìm kiếm để lọc và tìm lại kết quả truy vấn của một IP hoặc File cụ thể.

---

# Chương 7: Giám sát, Cảnh báo và Nhật ký

Chương này hướng dẫn quản trị viên cách sử dụng các công cụ giám sát trực quan, theo dõi các cảnh báo bảo mật, phân tích phiên làm việc mạng, lưu lượng ứng dụng và kiểm tra nhật ký hệ thống nhằm đảm bảo Firewall hoạt động ổn định và an toàn.

## 7.1. Cảnh báo bảo mật (Alerts)

Tính năng này giúp quản trị viên theo dõi và xử lý các cảnh báo bảo mật được sinh ra từ các chính sách đã cấu hình (ví dụ: IPS, ngưỡng lưu lượng bất thường).

### 7.1.1. Xem danh sách cảnh báo
Giúp quản trị viên tra cứu, theo dõi và đánh giá mức độ nghiêm trọng của các sự kiện an ninh mạng xảy ra trên hệ thống.

**Các bước thực hiện:**
1. Truy cập vào menu **Alerts**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
   - **Node:** Tên hoặc định danh của thiết bị Firewall ghi nhận cảnh báo.
   - **Matched Policy:** Chính sách bảo mật đã được áp dụng và gây ra cảnh báo.
   - **Packets:** Chi tiết thông tin IP và Port nguồn, đích của gói tin (định dạng `Source IP:Port -> Destination IP:Port`).
   - **Severity:** Mức độ nghiêm trọng của cảnh báo.
   - **Action:** Hành động mà Firewall đã thực thi đối với gói tin này.
   - **Category:** Phân loại cảnh báo.
   - **Matched Reason:** Lý do hoặc nguyên nhân khớp với chính sách.
   - **Alert Time:** Thời gian chính xác ghi nhận sự kiện cảnh báo.
3. Có thể sử dụng các thanh công cụ ở phía trên để thao tác:
   - **Tìm kiếm:** Nhập từ khóa vào thanh tìm kiếm.
   - **Bộ lọc:** Lọc nhanh theo mức độ nghiêm trọng (All severities), lý do cảnh báo (All matching reasons), hoặc theo khoảng thời gian (Start date, End date).
   - **Export:** Nhấp vào nút Export để xuất dữ liệu cảnh báo ra file.

### 7.1.2. Xem chi tiết cảnh báo
Cho phép người quản trị xem sâu hơn các thông tin chi tiết về một cảnh báo bảo mật cụ thể, bao gồm thông tin luật bị vi phạm và chi tiết gói tin mạng để hỗ trợ điều tra sự cố.

**Các bước thực hiện:**
1. Tại màn hình danh sách cảnh báo, nhấp vào một dòng cảnh báo bất kỳ để mở cửa sổ **Chi tiết cảnh báo**.
2. Tại cửa sổ chi tiết, thông tin được chia làm 3 khu vực chính:
   - **Alert Detail:** Cung cấp thông tin tổng quan như thời gian xảy ra (Alert Time), chính sách khớp (Matched Policy), lý do (Matched Reason), hành động (Action), phân loại (Category), giao thức ứng dụng (Application Protocol) và mức độ nghiêm trọng (Severity).
   - **IP Detail:** Cung cấp thông tin tầng mạng gồm IP/Port nguồn (Source), IP/Port đích (Destination), giao thức (IP Protocol), thông tin Node và phiên bản IP.
   - **Rule Detail:** Hiển thị phần mô tả text giải thích về cảnh báo.

---

## 7.2. Giám sát Phiên làm việc mạng (Sessions)

Theo dõi các phiên làm việc (sessions) đang diễn ra theo thời gian thực để chẩn đoán các sự cố kết nối hoặc kiểm tra luồng dữ liệu mạng.

### 7.2.1. Xem và tìm kiếm các session mạng
Giúp theo dõi chi tiết các phiên làm việc (sessions) đang hoạt động, qua đó phục vụ mục đích xử lý sự cố kết nối hoặc kiểm tra luồng dữ liệu mạng theo thời gian thực.

**Các bước thực hiện:**
1. Truy cập menu **Sessions**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin của mỗi phiên làm việc:
   - **ID:** Mã định danh duy nhất của phiên.
   - **Node:** Định danh của thiết bị Firewall ghi nhận phiên.
   - **First Packet:** Thời gian ghi nhận gói tin đầu tiên.
   - **Last Packet:** Thời gian ghi nhận gói tin cuối cùng.
   - **IP Protocol:** Giao thức IP được sử dụng (ví dụ: TCP, UDP).
   - **Source IP / Source Port:** Địa chỉ IP và cổng của máy khách khởi tạo kết nối.
   - **Destination IP / Destination Port:** Địa chỉ IP và cổng của máy chủ nhận kết nối.
   - **Data Bytes:** Tổng lưu lượng dữ liệu truyền tải trong phiên.
3. Sử dụng các công cụ tìm kiếm và lọc ở phía trên:
   - **Search Key:** Nhập truy vấn tìm kiếm nâng cao (ví dụ: `source.ip==192.168.1.1&&destination.port==443`).
   - **Range / Bounding / Unit:** Lọc theo các khoảng thời gian trôi qua định sẵn.
   - **Start Time / End Time:** Chọn khoảng thời gian cụ thể bằng lịch để tra cứu session.
   - Nhấn nút **Search** để áp dụng bộ lọc và tìm kiếm.

---

## 7.3. Giám sát Lưu lượng Ứng dụng (Application Traffic)

Cung cấp cái nhìn tổng quan về việc sử dụng băng thông của các ứng dụng trên toàn mạng, giúp phát hiện sớm các ứng dụng tiêu tốn băng thông bất thường.

### 7.3.1. Xem thống kê lưu lượng ứng dụng
Cung cấp số liệu chi tiết về việc tiêu thụ băng thông của các ứng dụng, giúp phát hiện nhanh các địa chỉ IP hoặc ứng dụng gây nghẽn mạng.

**Các bước thực hiện:**
1. Truy cập menu **System administration** > **Application Traffic**.
2. Sử dụng thanh công cụ lọc ở phía trên để tìm kiếm theo nhu cầu:
   - **Filter Type & Application:** Chọn loại bộ lọc là ứng dụng (ví dụ: Telegram).
   - **Duration / Start Time / End Time:** Chọn khoảng thời gian để xem thống kê (ví dụ: 7 days).
   - **Sort By:** Lựa chọn tiêu chí sắp xếp (ví dụ: Total Data).
   - Nhấn nút **Search** để hiển thị kết quả.
3. Màn hình sẽ hiển thị 2 phần thông tin chính:
   - **Thống kê tổng quan:** Hiển thị tổng số phiên (Total Sessions), tổng dung lượng (Total Data) và tổng số gói tin (Total Packets) ứng với ứng dụng đã chọn.
   - **Bảng danh sách chi tiết:** Hiển thị các thiết bị/IP đã sử dụng ứng dụng này, bao gồm:
     - **IP Address:** Địa chỉ IP đã truy cập ứng dụng.
     - **ASN:** Số hiệu mạng (Autonomous System Number) tương ứng.
     - **Sessions:** Số lượng phiên kết nối do IP này tạo ra.
     - **Data:** Dung lượng dữ liệu IP này đã tiêu thụ.
     - **Packets:** Số lượng gói tin truyền tải.

---

## 7.4. Nhật ký hệ thống (Audit logs)

Ghi nhận toàn bộ các thao tác quản trị trên hệ thống, giúp truy vết lại ai đã thực hiện thay đổi cấu hình vào thời điểm nào (Auditing).

### 7.4.1. Tra cứu và xem lịch sử truy cập, thao tác (Audit logs)
Cho phép quản trị viên xem lại lịch sử các thao tác trên hệ thống, hỗ trợ việc giám sát tuân thủ và truy xuất nguồn gốc khi có sự kiện bất thường.

**Các bước thực hiện:**
1. Truy cập menu **System administration** > **Audit logs**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin của từng bản ghi nhật ký:
   - **Action:** Hành động hoặc thao tác đã được thực hiện (ví dụ: CREATE_SESSION).
   - **Result:** Kết quả của thao tác (ví dụ: Success).
   - **Feature:** Khu vực chức năng bị tác động (ví dụ: SESSIONS_MANAGEMENT).
   - **User:** Tên tài khoản người dùng đã thực hiện thao tác (ví dụ: admin).
   - **Failure Reason:** Lý do thất bại (nếu thao tác không thành công).
   - **Created At:** Thời điểm chính xác xảy ra thao tác.
   - **Functions:** Các chức năng mở rộng như nút Xóa (biểu tượng thùng rác).
3. Sử dụng các công cụ ở phía trên để hỗ trợ tra cứu:
   - **Start Date / End Date:** Lựa chọn khoảng thời gian cần tra cứu nhật ký.
   - Các biểu tượng bộ lọc (hình phễu) tại tiêu đề cột **Result**, **Feature**, **User** để lọc dữ liệu theo ý muốn.
   - Nút **ACTIONS:** Chứa các thao tác mở rộng có thể thực hiện trên các bản ghi đang chọn.
   - Nút **EXPORT:** Cho phép tải dữ liệu nhật ký hệ thống ra file lưu trữ.
