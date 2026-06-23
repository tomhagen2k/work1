# Chương 2: Quản trị Hệ thống (System Administration)

Tài liệu này hướng dẫn chi tiết cách cấu hình và sử dụng các tính năng thuộc nhóm Quản trị Hệ thống, bao gồm Cấu hình chung, Quản lý bản quyền và Quản lý người dùng.

---

## 2.1. Cấu hình chung (General Configuration)
Cho phép quản tị viên thiết lập các tiêu chuẩn an toàn cơ bản và duy trì hoạt động ổn định của toàn bộ hệ thống Firewall. Việc cấu hình sai ở đây có thể dẫn đến rủi ro lộ lọt thông tin quản trị hoặc gây ra lỗi đồng bộ thời gian đối với các bản ghi nhật ký (log). Bạn cần có quyền **Quản trị hệ thống (System Admin)** để thực hiện các thay đổi này.

**Các bước thực hiện:**
1. Truy cập vào menu **Quản trị hệ thống** > **Cấu hình chung**.
2. Thiết lập các thông số sau:
    - **Thời gian duy trì phiên kết nối:** Thời gian tối đa một phiên đăng nhập quản trị được phép duy trì trạng thái không hoạt động trước khi bị hệ thống tự động đăng xuất. Giúp giảm thiểu rủi ro khi quản trị viên quên đăng xuất.
    - **Độ phức tạp của mật khẩu:** Yêu cầu độ phức tạp cho mật khẩu của tất cả người dùng trên hệ thống. 
        - **Mức độ yếu:** Chỉ yêu cầu ký tự cơ bản.
        - **Mức độ trung bình:** Yêu cầu kết hợp chữ và số.
        - **Mức độ mạnh:** Yêu cầu bắt buộc kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt, đảm bảo an toàn tối đa chống lại các cuộc tấn công dò mật khẩu.
    - **Xác thực quản trị:** Phương thức xác thực người dùng khi truy cập trang quản trị.
        - **Đăng nhập truyền thống:** Đăng nhập bằng Tên đăng nhập và Mật khẩu truyền thống.
        - **Chứng chỉ máy khách (mTLS):** Yêu cầu xác thực hai chiều nâng cao bằng chứng chỉ điện tử. Lựa chọn này bắt buộc trình duyệt của quản trị viên phải có chứng chỉ hợp lệ để có thể hiển thị trang đăng nhập.
    - **Thời gian máy chủ:** Cấu hình thời gian của hệ thống. Rất quan trọng để đảm bảo tính chính xác của Audit Log và các luồng kiểm tra chứng chỉ.
        - Chọn **Đặt thời gian tự động** để Firewall tự động đồng bộ thời gian từ các máy chủ NTP trên internet.
        - Chọn **Đặt thời gian thủ công** để thiết lập thủ công nếu thiết bị nằm trong mạng kín không có internet. 
        - Cần thiết lập **Định dạng thời gian** và **Múi giờ** (Múi giờ chuẩn, ví dụ: Asia/Ho_Chi_Minh).
    - **Quản trị truy cập:** Quản lý truy cập quản trị.
        - **IP có quyền kết nối:** Kiểm soát những IP nào được phép truy cập trang quản trị. Chọn **Tất cả** để cho phép tất cả, hoặc **Giới hạn IP** để áp dụng cơ chế Whitelist. Khi chọn giới hạn IP, bạn cần cấu hình danh sách IP hợp lệ tại phần **Dnah sách IP được phép kết nối**.
        - **Giới hạn phiên kết nối:** Giới hạn số lượng phiên kết nối đồng thời từ một IP đến trang quản trị để chống lại các hành vi tấn công DDoS nhắm vào cổng quản trị (Ví dụ: 50).
3. Nhấp vào nút **Áp dụng** ở góc phải màn hình để lưu và áp dụng cấu hình.

> **Lưu ý:** Nếu sử dụng xác thực mTLS, hãy đảm bảo đã cấu hình chứng chỉ hợp lệ và lưu trữ chứng chỉ an toàn trên máy khách để tránh bị khóa hoàn toàn khỏi hệ thống.

---

## 2.2. Quản lý Giấy phép (License)
Cung cấp thông tin chi tiết về bản quyền hiện tại của hệ thống, giúp theo dõi thời hạn và các thông số giới hạn lưu lượng hoạt động.

**Các bước thực hiện:**
1. Truy cập vào menu **Quản trị hệ thống** > **Cấu hình chung**.
2. Xem các thông tin bản quyền bao gồm: 
    - **Tên khách hàng & Tên công ty:** Thông tin của đơn vị đang sở hữu bản quyền.
    - **Tên sản phẩm:** Tên sản phẩm hệ thống.
    - **ID bản quyền:** Mã định danh duy nhất của bản quyền.
    - **Băng thông tối đa:** Băng thông tối đa mà Firewall được phép xử lý theo thỏa thuận cấp phép (Ví dụ: 1Gbps, 10Gbps). Khi vượt quá ngưỡng này, hệ thống có thể bị giới hạn hoặc drop gói tin.
    - **Ngày hết hạn:** Ngày hết hạn của bản quyền. Quản trị viên cần chú ý gia hạn trước ngày này để các chức năng cập nhật và bảo mật (như IPS, ngăn chặn mã độc) tiếp tục hoạt động.

Nếu chưa có bản quyền hoặc thiết bị chưa được kích hoạt, các trường này sẽ hiển thị giá trị "Not set".

---

## 2.3. Quản lý Người dùng (Users)
Dùng để quản lý các tài khoản truy cập hệ thống thông qua các tác vụ xem danh sách, tạo mới, cập nhật và đặt lại mật khẩu. Đảm bảo phân quyền đúng người, đúng việc.

### 2.3.1. Xem danh sách người dùng
Giúp quản trị viên tra cứu và kiểm tra trạng thái của các tài khoản người dùng.

**Các bước thực hiện:**
1. Truy cập vào menu **Quản trị hệ thống** > **Người dùng quản trị**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Tên tài khoản**: Tên đăng nhập dùng để truy cập hệ thống.
    - **Họ và tên**: Họ và tên đầy đủ của người dùng.
    - **Vai trò**: Vai trò của người dùng. Tùy chọn này quyết định người dùng có thể làm gì trên hệ thống (Ví dụ: ROLE_ADMIN, ROLE_MONITOR).
    - **Trạng thái**: Trạng thái hoạt động (**Kích hoạt** hoặc **Không kích hoạt**).
3. Có thể tìm kiếm theo tên tài khoản, họ tên tại thanh tìm kiếm.

---

### 2.3.2. Tạo mới người dùng
Cho phép tạo một tài khoản cá nhân mới truy cập và thao tác trên hệ thống Firewall dựa trên vai trò được phân công. Bạn phải có quyền tạo người dùng và các Nhóm quyền (Roles) phải được định nghĩa sẵn.

**Các bước thực hiện:**
1. Tại màn hình danh sách người dùng, nhấp vào nút **Thêm mới** ở góc phải màn hình.
2. Trên cửa sổ **Thêm mới người dùng**, điền các thông tin:
    - **Tên tài khoản (*):** Tên đăng nhập dùng để truy cập hệ thống.
    - **Mật khẩu / Xác nhận mật khẩu:** Mật khẩu truy cập. Mật khẩu phải thỏa mãn các điều kiện độ phức tạp đã được cấu hình tại phần Cấu hình chung.
    - **Họ và tên (*):** Họ và tên đầy đủ của người dùng để dễ dàng nhận diện.
    - **Email / Số điện thoại:** Thông tin liên hệ, hữu ích cho việc thông báo sự cố hoặc lấy lại mật khẩu.
    - **Định danh chứng chỉ:** SAN URI identity dành riêng cho trường hợp hệ thống yêu cầu xác thực mTLS. Nếu sử dụng mTLS, giá trị này phải khớp với cấu hình trong chứng chỉ của máy khách.
    - **Vai trò:** Vai trò của người dùng. Tùy chọn này quyết định người dùng có thể làm gì trên hệ thống (Ví dụ: ROLE_ADMIN, ROLE_MONITOR).
    - **Trạng thái (*):** 
        - **Kích hoạt:** Tài khoản có thể đăng nhập bình thường.
        - **Không kích hoạt:** Tạm khóa tài khoản, người dùng sẽ không thể đăng nhập cho đến khi được kích hoạt lại.
3. Nhấn **Thêm mới** để hoàn tất.

---

### 2.3.3. Cập nhật thông tin người dùng
Chỉnh sửa thông tin, thay đổi phân quyền hoặc khóa tài khoản của người dùng đã tồn tại.

**Các bước thực hiện:**
1. Tại danh sách người dùng, nhấp vào biểu tượng **Sửa** (hình cây bút) tại cột Thao tác của tài khoản cần chỉnh sửa.
2. Thay đổi các thông tin cần thiết trong cửa sổ **Cập nhật người dùng**.
3. Nhấn **Cập nhật** để lưu thay đổi.

---

### 2.3.4. Reset mật khẩu người dùng
Cấp lại mật khẩu mới cho người dùng trong trường hợp họ quên mật khẩu.

**Các bước thực hiện:**
1. Tại danh sách người dùng, nhấp vào biểu tượng **Đặt lại mật khảu** (hình ổ khóa) tại cột Thao tác của tài khoản cần reset.
2. Hệ thống sẽ sinh mật khẩu ngẫu nhiên tại trường **Mật khẩu mới**.
3. Nhấp vào biểu tượng **Copy** để sao chép mật khẩu gửi cho người dùng.
4. Nhấn **Lưu** để xác nhận.

---

## 2.4. Quản lý Nhóm quyền (Permission Group)
Hệ thống sử dụng mô hình phân quyền dựa trên vai trò (RBAC - Role Based Access Control). Tính năng này cho phép Quản trị viên định nghĩa các nhóm quyền khác nhau (như ROLE_ADMIN, ROLE_USER) để gán cho người dùng, giúp kiểm soát chi tiết các hành động trên từng màn hình chức năng, hạn chế tối đa rủi ro từ người dùng nội bộ.

### 2.4.1. Xem danh sách nhóm quyền
Giúp liệt kê toàn bộ các vai trò hiện có và các quyền hạn tổng quát đi kèm.

**Các bước thực hiện:**
1. Truy cập vào menu **Quản trị hệ thống** > **Nhóm quyền**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Vai trò:** Tên vai trò.
    - **Phân quyền:** Tóm tắt các quyền hạn đã gán.
    - **Trạng thái:** Trạng thái hoạt động (**Kích hoạt** hoặc **Không kích hoạt**).
3. Có thể tìm kiếm theo role name, permissions tại thanh tìm kiếm.

---

### 2.4.2. Cập nhật nhóm quyền (Update role)
Chỉnh sửa tên vai trò hoặc thay đổi chi tiết các quyền hạn trên từng màn hình.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm quyền, nhấp vào biểu tượng **Sửa** (hình cây bút) tại cột Thao tác của nhóm quyền cần sửa.
2. Trong cửa sổ **Chỉnh sửa nhóm quyền**, bạn có thể thay đổi:
    - **Tên vai trò:** Tên định danh của vai trò (Ví dụ: ROLE_NOC_MONITOR).
    - **Quyền:** Tích chọn vào các ô tương ứng với từng màn hình và từng loại hành động:
        - **Xem:** Quyền chỉ xem dữ liệu danh sách/chi tiết.
        - **Xóa:** Quyền xóa bản ghi.
        - **Tạo:** Quyền tạo mới bản ghi.
        - **Sửa:** Quyền chỉnh sửa bản ghi hiện tại.
        - **Xem lịch sử:** Quyền xem lịch sử thay đổi (Audit log, versions).
        - **Áp dụng:** Quyền đẩy cấu hình xuống thiết bị thực. Đây là quyền quan trọng ảnh hưởng trực tiếp đến hoạt động của mạng.
        - **Thay đổi trạng thái:** Quyền bật/tắt (Enable/Disable) trạng thái của đối tượng.
        - Bạn có thể tích chọn ô **Tất cả** ở đầu hàng để cấp toàn quyền cho màn hình đó.
    - **Trạng thái:** Trạng thái hoạt động của nhóm quyền. Nếu chuyển sang **Không kích hoạt**, tất cả người dùng thuộc nhóm này sẽ mất các quyền tương ứng.
3. Nhấn vào nút **Lưu** để hoàn tất.

---

### 2.4.3. Xóa nhóm quyền (Delete role)
Gỡ bỏ một nhóm quyền không còn sử dụng khỏi hệ thống.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm quyền, nhấp vào biểu tượng **Xóa** (hình thùng rác) tại cột Thao tác của nhóm quyền cần xóa.
2. Cửa sổ xác nhận sẽ hiện ra: "Bạn có chắc chắn muốn xóa vai trò [Tên Role]?".
3. Nhấn **Đồng ý** để xác nhận xóa hoặc **Hủy** để hủy.

> **Lưu ý:** Không thể xóa nhóm quyền đã được gán cho người dùng. Nếu muốn xóa, cần phải xóa hoặc thay đổi vai trò của tất cả người dùng thuộc nhóm này trước.

---

## 2.5. Quản lý API Key
Tính năng này dùng để tạo và quản lý các mã khóa định danh (API Keys), cho phép các ứng dụng bên thứ ba hoặc các script tự động hóa kết nối và tương tác với Firewall một cách an toàn mà không cần dùng mật khẩu người dùng thông thường.

### 2.5.1. Xem danh sách API Key
Theo dõi trạng thái hoạt động và thời hạn của các API Key đã cấp.

**Các bước thực hiện:**
1. Truy cập vào menu **Quản trị hệ thống** > **API Keys**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Tên:** Tên định danh của Key.
    - **Chủ sở hữu:** Người sở hữu Key.
    - **Trạng thái:** Trạng thái hoạt động (**Kích hoạt** hoặc **Không kích hoạt**).
    - **Ngày hết hạn:** Ngày hết hạn của Key.
3. Tại cột Thao tác, bạn có thể:
    - Nhấp biểu tượng **Khóa** để thu hồi API Key.
    - Nhấp biểu tượng **Thùng rác** để xóa Key.

---

### 2.5.2. Tạo mới API Key
Cấp một mã khóa mới cho một người dùng cụ thể với thời hạn và phạm vi quyền hạn xác định.

**Các bước thực hiện:**
1. Tại màn hình danh sách API Keys, nhấp vào nút **+ Tạo mới** tại góc trên bên phải màn hình.
2. Trên cửa sổ **Tạo API Key**, điền các thông tin:
    - **Người dùng:** Chọn người dùng sở hữu Key từ danh sách thả xuống. API Key sẽ kế thừa các quyền hạn tối đa dựa trên Role của người dùng này.
    - **Tên:** Đặt tên gợi nhớ cho API Key, thường dựa trên mục đích sử dụng (Ví dụ: Script_Auto_Apply_Policy).
    - **Ngày hết hạn:** Chọn thời hạn hiệu lực cho khóa (**1 Day, 1 Month, 1 Year, Forever** hoặc **Custom** để chọn ngày cụ thể). Nên thiết lập thời hạn ngắn và xoay vòng khóa thường xuyên để đảm bảo an toàn.
    - **Đối tượng & Quyền hạn:** Nhấp nút **+ Thêm đối tượng** để chọn cụ thể các đối tượng và loại hành động mà Key này được phép thao tác. Việc giới hạn quyền ở mức API Key (cho dù user gốc có toàn quyền) là cách tốt nhất để tuân thủ nguyên tắc quyền tối thiểu (Least Privilege).
3. Nhấn **Tạo** để hoàn tất. Hệ thống sẽ hiển thị mã Key, hãy sao chép và lưu trữ cẩn thận vì mã này thường chỉ hiển thị một lần duy nhất.

---

## 2.6. Quản lý Cập nhật (Update management)
Đảm bảo hệ thống Firewall luôn chạy phiên bản mới nhất để cập nhật các bản vá bảo mật và tính năng mới.

**Các bước thực hiện:**
1. Truy cập vào menu **Quản trị hệ thống** > **Cập nhật**.
2. Tại tab **Cập nhật hệ thống**, bạn sẽ thấy:
    - **Phiên bản hiện tại:** Phiên bản hiện tại đang chạy trên thiết bị.
    - **Phiên bản mới nhất:** Phiên bản mới nhất khả dụng trên Server.
3. Nhấp vào nút **Kiểm tra cập nhật** để hệ thống kiểm tra và lấy thông tin phiên bản mới nhất.
4. Nếu có phiên bản mới, hệ thống sẽ hiển thị nút cập nhật. Nhấp vào để bắt đầu quá trình (Lưu ý: Thiết bị có thể khởi động lại trong quá trình này).

**Quản lý Lịch sử và Cấu hình Server:**
- **Tab Lịch sử cập nhật:** Cho phép tra cứu nhật ký các lần cập nhật thành công hoặc thất bại. Thông tin bao gồm: 
    - **Thời gian:** Thời gian cập nhật
    - **Phiên bản:** Phiên bản đã cập nhật
    - **Trạng thái:** Trạng thái thành công/thất bại
    - **Kết quả:** Số lượng file đã được cập nhật
- **Tab Cấu hình Server:** Quản lý danh sách các Server cung cấp bản cập nhật.
    1. Nhấn nút **+ Thêm mới** để thêm Server mới.
    2. Trong cửa sổ **Thêm cấu hình Server**, nhập các thông tin: 
        - **Tên**: Tên gợi nhớ cho cấu hình Server.
        - **URL Server**: Địa chỉ URL chính xác của Server cung cấp bản cập nhật.
        - **Access Token**: Mã truy cập xác thực (nếu Server cập nhật yêu cầu xác thực bảo mật).
    3. Nhấn **Kiểm tra kết nối** để kiểm tra kết nối tới Server trước khi lưu.
    4. Nhấn **Lưu** để hoàn tất cấu hình.

---

## 2.7. Nhật ký hệ thống (Audit logs)
Ghi nhận toàn bộ các thao tác quản trị trên hệ thống, giúp truy vết lại ai đã thực hiện thay đổi cấu hình vào thời điểm nào (Auditing).

**Các bước thực hiện:**
1. Truy cập menu **Quản trị hệ thống** > **Nhật ký hoạt động**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin của từng bản ghi nhật ký:
   - **Hành động:** Hành động hoặc thao tác đã được thực hiện (ví dụ: CREATE_SESSION).
   - **Kết quả:** Kết quả của thao tác (ví dụ: Success).
   - **Tính năng:** Khu vực chức năng bị tác động (ví dụ: SESSIONS_MANAGEMENT).
   - **Người dùng:** Tên tài khoản người dùng đã thực hiện thao tác (ví dụ: admin).
   - **Lý do thất bại:** Lý do thất bại (nếu thao tác không thành công).
   - **Thời gian:** Thời điểm chính xác xảy ra thao tác.
   - **Thao tác:** Các chức năng mở rộng như nút Xóa (biểu tượng thùng rác).
3. Sử dụng các công cụ ở phía trên để hỗ trợ tra cứu:
   - **Ngày bắt đầu / Ngày kết thúc:** Lựa chọn khoảng thời gian cần tra cứu nhật ký.
   - Các biểu tượng bộ lọc (hình phễu) tại tiêu đề cột **Kết quả**, **Tính năng**, **Người dùng** để lọc dữ liệu theo ý muốn.
   - Nút **Xuất:** Cho phép tải dữ liệu nhật ký hệ thống ra file lưu trữ.

---

# Chương 3 - Giám sát (Monitoring)

Chương này hướng dẫn cách quản lý thiết bị, giám sát hiệu năng, tài nguyên và các phiên.

---

## 3.1. Quản lý Thiết bị (Devices)
Đây là trung tâm quản lý toàn bộ các thiết bị Firewall trong hệ thống, cho phép thêm mới, cấu hình chi tiết và thực hiện các tác vụ quản trị.

### 3.1.1. Xem danh sách thiết bị
Tra cứu nhanh trạng thái và phiên bản của tất cả thiết bị.

**Các bước thực hiện:**
1. Truy cập vào menu **Giám sát** > **Thiết bị**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Tên thiết bị**: Tên định danh của thiết bị.
    - **Địa chỉ IP**: Địa chỉ IP của thiết bị.
    - **Trạng thái**: Trạng thái của thiết bị (Hoạt động/Không hoạt động).
    - **Phiên bản**: Model và phiên bản Firmware của thiết bị.
    - **Quy tắc (BL-IP/BL-Domain/IPS)**: Hiển thị phiên bản Blacklist IP, Domain và IPS mà thiết bị đang áp dụng.
    - **Kết nối cuối**: Thời gian kết nối cuối cùng.
3. Người dùng có thể chuyển đổi sang tab **Bảo mật** và **Trạng thái** để xem danh sách thiết bị theo bảo mật và trạng thái.
4. Nhấp vào tên thiết bị (cột Hostname) để xem chi tiết.

---

### 3.1.2. Thêm mới thiết bị
Đăng ký một thiết bị Firewall mới vào hệ thống quản lý tập trung.

**Các bước thực hiện:**
1. Tại màn hình danh sách thiết bị, nhấp vào nút **+ Thêm thiết bị**.
2. Trên cửa sổ **Thêm thiết bị**, điền các thông tin:
    - **Tên thiết bị (*)**: Tên định danh của thiết bị.
    - **Địa chỉ IP (*)**: Địa chỉ IP của thiết bị.
    - **Số sê-ri**: Số serial của thiết bị.
    - **Cổng gRPC (*)**: Cổng gRPC của thiết bị.
    - **Nhóm bảo mật**: Chọn nhóm bảo mật cho thiết bị.

3. Nhấn **Tạo mới** để hoàn tất.

---

### 3.1.3. Xem danh sách giao diện của thiết bị
Hiển thị danh sách và trạng thái các giao diện mạng (Interfaces) của thiết bị.

**Các bước thực hiện:**
1. Tại danh sách thiết bị, nhấp vào tên thiết bị cần xem (cột Hostname).
2. Hệ thống hiển thị màn hình **Giao diện của thiết bị: [Tên thiết bị]** bao gồm các thông tin:
    - **Tên**: Tên giao diện mạng vật lý hoặc ảo.
    - **Trạng thái**: Trạng thái kết nối đường truyền (**Up** hoặc **Down**).
    - **Loại**: Loại giao diện mạng.
    - **Mã Vlan**: ID của VLAN.
    - **Chế độ**: Chế độ hoạt động của giao diện mạng.
        - **Routed:** Cổng hoạt động ở Layer 3, có địa chỉ IP riêng, dùng để định tuyến giữa các dải mạng khác nhau.
        - **Bridge:** Cổng hoạt động ở Layer 2, kết nối các vùng mạng trong cùng một dải IP mà không cần thay đổi cấu hình mạng hiện tại.
    - **Địa chỉ MAC**: Địa chỉ MAC của giao diện mạng.
    - **Địa chỉ IP**: Địa chỉ IP của giao diện mạng.
    - **Vùng bảo mật**: Vùng bảo mật được quy định cho cổng này (Ví dụ: trusted cho mạng LAN nội bộ, untrusted cho đường Internet).
    - **Mô tả**: Mô tả ngắn gọn về cổng.
3. Nhấn **Áp dụng** để áp dụng cấu hình giao diện mạng xuống thiết bị.

---

### 3.1.4. Xem chi tiết thiết bị
Hiển thị các thông tin chi tiết của thiết bị.

**Các bước thực hiện:**
1. Tại danh sách thiết bị, nhấp vào biểu tượng **...** tại cột Thao tác của thiết bị muốn xem chi tiết. Sau đó chọn **Xem chi tiết**.
2. Hệ thống hiển thị màn hình **Chi tiết thiết bị** bao gồm các nhóm thông tin:
    - **Thông số cơ bản:** Các thông tin cơ bản của thiết bị như tên Nhà sản xuất, Mẫu, Dòng sản phẩm, Loại, Phiên bản firmware, Lần cập nhật cuối.
    - **Phần cứng:** Các thông số về phần cứng của thiết bị như CPU, Bộ nhớ, Lưu trữ, Hình thức, Công suất.
    - **Hiệu năng:** Thông tin về hiệu năng của thiết bị như Băng thông tường lửa, Băng thông IPS, Băng thông VPN, Băng thông Ngăn chặn mối đe dọa, Số phiên đồng thời tối đa, Phiên mới mỗi giây.
    - **Bảo mật:** Thông tin về trạng thái Kiểm soát ứng dụng, Tường lửa, IPS, Bộ lọc URL.
    - **Giao diện mạng:** Thông tin về các giao diện mạng của thiết bị.

---

### 3.1.5. Gán hồ sơ bảo vệ
Thực hiện gán hồ sơ bảo vệ cho các thiết bị.

**Các bước thực hiện:**
1. Tại màn hình danh sách thiết bị, nhấn vào nút **Gán hồ sơ**.
2. Tại cửa sổ **Gán hồ sơ bảo vệ**, thực hiện:
    - Chọn các thiết bị muốn áp dụng cấu hình
    - Chọn hồ sơ được áp dụng cho thiết bị được chọn
3. Nhấn **Lưu (chưa áp dụng)** để lưu tạm vào bộ nhớ hoặc **Lưu & Áp dụng** để lưu và áp dụng cấu hình ngay lập tức xuống thiết bị.

---

### 3.1.6. Các tác vụ Quản trị: Cập nhật, Cài đặt sao lưu tự động, Khôi phục cấu hình, Cấp lại NATS
- **Cập nhật:** Tại màn hình danh sách thiết bị, chọn thiết bị và nhấn **Cập nhật** để cập nhật thông tin của thiết bị.
- **Cài đặt sao lưu tự động:** Tại màn hình danh sách thiết bị, chọn thiết bị và nhấn **Cài đặt sao lưu tự động** để thiết lập lịch trình sao lưu tự động cấu hình cho thiết bị.
- **Khôi phục cấu hình:** Tại màn hình danh sách thiết bị, chọn thiết bị và nhấn **Khôi phục cấu hình** để khôi phục lại cấu hình cho thiết bị.
- **Cấp lại NATS:** Tại màn hình danh sách thiết bị, chọn thiết bị và nhấn **Cấp lại NATS** để đẩy cấu hình mới xuống thiết bị thực tế.

---

## 3.2. Giám sát Thiết bị
Cung cấp biểu đồ và số liệu thực tế về tình trạng hoạt động của hệ thống.

### 3.2.1. Màn hình giám sát chung
Xem tổng quan sức khỏe của toàn bộ hạ tầng.

**Các bước thực hiện:**
1. Tại màn hình danh sách thiết bị, nhấn vào nút **Giám sát**.
2. Màn hình **System Dashboard** hiển thị:
    - **Cảnh báo hoạt động:** Danh sách các cảnh báo đang kích hoạt.
    - **Tất cả hệ thống:** Bảng tổng hợp chỉ số của thiết bị, bao gồm:
        - **CPU**: Mức sử dụng bộ xử lý.
        - **Bộ nhớ**: Mức sử dụng bộ nhớ.
        - **Đĩa**: Mức sử dụng dung lượng đĩa.
        - **Tải trung bình**: Tải trung bình của hệ thống.
        - **Mạng**: Lưu lượng mạng.
        - **Nhiệt độ**: Nhiệt độ của thiết bị.
        - **Uptime**: Thời gian hoạt động của thiết bị.
        - **Tác nhân**: Hiển thi phiên bản tác nhân (agent).

---

### 3.2.2. Giám chi tiết cho 1 thiết bị
Theo dõi sâu hiệu năng của một thiết bị cụ thể.

**Các bước thực hiện:**
1. Trên màn hình **System Dashboard**, nhấn vào một bản ghi trong bảng **Tất cả hệ thống**.
2. Hệ thống hiển thị các biểu đồ chi tiết về tài nguyên, lưu lượng và các cảnh báo riêng cho thiết bị đó.

---

## 3.3. Cảnh báo bảo mật (Alerts)

Tính năng này giúp quản trị viên theo dõi và xử lý các cảnh báo bảo mật được sinh ra từ các chính sách đã cấu hình (ví dụ: IPS, ngưỡng lưu lượng bất thường).

### 3.3.1. Xem danh sách cảnh báo
Giúp quản trị viên tra cứu, theo dõi và đánh giá mức độ nghiêm trọng của các sự kiện an ninh mạng xảy ra trên hệ thống.

**Các bước thực hiện:**
1. Truy cập vào menu **Cảnh báo**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
   - **Thiết bị:** Tên hoặc định danh của thiết bị Firewall ghi nhận cảnh báo.
   - **Chính sách khớp:** Chính sách bảo mật đã được áp dụng và gây ra cảnh báo.
   - **Gói tin:** Chi tiết thông tin IP và Port nguồn, đích của gói tin (định dạng `Source IP:Port -> Destination IP:Port`).
   - **Mức độ ảnh hưởng:** Mức độ nghiêm trọng của cảnh báo.
   - **Hành động:** Hành động mà Firewall đã thực thi đối với gói tin này.
   - **Nhóm:** Phân loại cảnh báo.
   - **Lý do khớp:** Lý do hoặc nguyên nhân khớp với chính sách.
   - **Thời gian cảnh báo:** Thời gian chính xác ghi nhận sự kiện cảnh báo.
3. Có thể sử dụng các thanh công cụ ở phía trên để thao tác:
   - **Tìm kiếm:** Nhập từ khóa vào thanh tìm kiếm.
   - **Bộ lọc:** Lọc nhanh theo mức độ nghiêm trọng (All severities), lý do cảnh báo (All matching reasons), hoặc theo khoảng thời gian (Start date, End date).
   - **Export:** Nhấp vào nút Export để xuất dữ liệu cảnh báo ra file.

### 3.3.2. Xem chi tiết cảnh báo
Cho phép người quản trị xem sâu hơn các thông tin chi tiết về một cảnh báo bảo mật cụ thể, bao gồm thông tin luật bị vi phạm và chi tiết gói tin mạng để hỗ trợ điều tra sự cố.

**Các bước thực hiện:**
1. Tại màn hình danh sách cảnh báo, nhấp vào một dòng cảnh báo bất kỳ để mở cửa sổ **Chi tiết cảnh báo**.
2. Tại cửa sổ chi tiết, thông tin được chia làm 3 khu vực chính:
   - **Chi tiết cảnh báo:** Cung cấp thông tin tổng quan như thời gian xảy ra (Alert Time), chính sách khớp (Matched Policy), lý do (Matched Reason), hành động (Action), phân loại (Category), giao thức ứng dụng (Application Protocol) và mức độ nghiêm trọng (Severity).
   - **Chi tiết IP:** Cung cấp thông tin tầng mạng gồm IP/Port nguồn (Source), IP/Port đích (Destination), giao thức (IP Protocol), thông tin Node và phiên bản IP.
   - **Nội dung quy tắc:** Hiển thị phần mô tả text giải thích về cảnh báo.

---

## 3.4. Giám sát Phiên làm việc mạng (Sessions)

Theo dõi các phiên làm việc (sessions) đang diễn ra theo thời gian thực để chẩn đoán các sự cố kết nối hoặc kiểm tra luồng dữ liệu mạng.

### 3.4.1. Xem và tìm kiếm các session mạng
Giúp theo dõi chi tiết các phiên làm việc (sessions) đang hoạt động, qua đó phục vụ mục đích xử lý sự cố kết nối hoặc kiểm tra luồng dữ liệu mạng theo thời gian thực.

**Các bước thực hiện:**
1. Truy cập menu **Giám sát** -> **Phiên làm việc**
2. Tại màn hình danh sách, bạn có thể xem các thông tin của mỗi phiên làm việc:
   - **Phiên:** Hiển thị Địa chỉ IP và cổng của máy khách khởi tạo kết nối đến địa chỉ IP và cổng của máy chủ, ví dụ: `[IP_Source]:[Port_Source]->[IP_Destination]:[Port_Destination]`.
   - **Gói đầu tiên:** Thời gian ghi nhận gói tin đầu tiên.
   - **Gói cuối cùng:** Thời gian ghi nhận gói tin cuối cùng.
   - **Giao thức IP:** Giao thức IP được sử dụng (ví dụ: TCP, UDP).
   - **Dữ liệu:** Tổng lưu lượng dữ liệu truyền tải trong phiên.
   - **Gói:** Tổng số gói tin truyền tải trong phiên.
3. Sử dụng các công cụ tìm kiếm và lọc ở phía trên:
   - **Từ khóa tìm kiếm:** Nhập truy vấn tìm kiếm nâng cao (ví dụ: `source.ip==192.168.1.1&&destination.port==443`).
   - **Phạm vi:** Lọc theo các khoảng thời gian trôi qua định sẵn.
   - **Thời gian bắt đầu / Thời gian kết thúc:** Chọn khoảng thời gian cụ thể bằng lịch để tra cứu session.
   - Nhấn nút **Tìm kiếm** để áp dụng bộ lọc và tìm kiếm. 

---

## 3.5. Giám sát Lưu lượng Ứng dụng (Application Traffic)

Cung cấp cái nhìn tổng quan về việc sử dụng băng thông của các ứng dụng trên toàn mạng, giúp phát hiện sớm các ứng dụng tiêu tốn băng thông bất thường.

### 3.5.1. Xem thống kê lưu lượng ứng dụng
Cung cấp số liệu chi tiết về việc tiêu thụ băng thông của các ứng dụng, giúp phát hiện nhanh các địa chỉ IP hoặc ứng dụng gây nghẽn mạng.

**Các bước thực hiện:**
1. Truy cập menu **Giám sát** > **Thống kê ứng dụng**.
2. Sử dụng thanh công cụ lọc ở phía trên để tìm kiếm theo nhu cầu:
   - **Bộ lọc loại & ứng dụng:** Chọn loại bộ lọc là ứng dụng (ví dụ: Telegram).
   - **Khoảng thời gian / Thời gian bắt đầu / Thời gian kết thúc:** Chọn khoảng thời gian để xem thống kê (ví dụ: 7 ngày).
   - **Sắp xếp theo:** Lựa chọn tiêu chí sắp xếp.
   - Nhấn nút **Tìm kiếm** để hiển thị kết quả.
3. Màn hình sẽ hiển thị 2 phần thông tin chính:
   - **Thống kê tổng quan:** Hiển thị tổng số phiên, tổng dung lượng và tổng số gói tin ứng với ứng dụng đã chọn.
   - **Bảng danh sách chi tiết:** Hiển thị các thiết bị/IP đã sử dụng ứng dụng này, bao gồm:
     - **Địa chỉ IP:** Địa chỉ IP đã truy cập ứng dụng.
     - **ASN:** Số hiệu mạng (Autonomous System Number) tương ứng.
     - **Số Phiên:** Số lượng phiên kết nối do IP này tạo ra.
     - **Dữ liệu:** Dung lượng dữ liệu IP này đã tiêu thụ.
     - **Số gói:** Số lượng gói tin truyền tải.

---

# Chương 4 - Quản lý Đối tượng (Objects)

Chương này hướng dẫn cách quản lý các đối tượng dùng chung trong hệ thống như địa chỉ IP, máy chủ, dịch vụ, ứng dụng và các vùng bảo mật. 

**Tại sao cần Quản lý đối tượng?** Thay vì phải nhập lại cùng một dải IP hay danh sách cổng nhiều lần khi tạo các luật bảo mật (Rule/Policy), bạn định nghĩa chúng một lần tại đây thành các "Đối tượng" (Object). Các đối tượng này đóng vai trò như những "viên gạch" để xây dựng nên các chính sách bảo mật ở Chương 5. Khi có sự thay đổi (ví dụ: máy chủ đổi IP), bạn chỉ cần cập nhật tại Đối tượng, tất cả các luật đang sử dụng đối tượng đó sẽ tự động được cập nhật theo, giúp quản lý tập trung và tránh sai sót.

---

## 4.1. Địa chỉ (Addresses)
Quản lý các nhóm địa chỉ IP, dải mạng (CIDR), tên miền (FQDN) hoặc mã quốc gia để sử dụng làm nguồn hoặc đích trong các luật bảo mật.

### 4.1.1. Xem danh sách địa chỉ
Giúp quản trị viên tra cứu, tìm kiếm và kiểm tra thông tin của các nhóm địa chỉ hiện có trong hệ thống.

**Các bước thực hiện:**
1. Truy cập vào menu **Đối tượng** > **Địa chỉ IP**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Tên nhóm**: Tên của nhóm địa chỉ.
    - **Mô tả**: Mô tả mục đích.
    - **Dải IP & Địa chỉ**: Địa chỉ IP hoặc dải mạng.
3. Sử dụng thanh tìm kiếm ở phía trên để lọc các nhóm địa chỉ theo tên, IP.

### 4.1.2. Tạo mới nhóm địa chỉ
Định nghĩa một tập hợp các địa chỉ mạng mới để sử dụng trong cấu hình chính sách.

**Các bước thực hiện:**
1. Tại màn hình danh sách địa chỉ, nhấn vào nút **+ Thêm nhóm**.
2. Tại cửa sổ **Thêm nhóm IP** hiện ra, điền các thông tin sau:
    - **Tên nhóm (*):** Tên gợi nhớ cho nhóm địa chỉ (Ví dụ: LAN_Ketoan, Blocked_IPs).
    - **CIDR:** Dùng để định nghĩa các địa chỉ IP cụ thể hoặc cả một dải mạng tĩnh (Ví dụ: 192.168.1.0/24 hoặc 10.0.0.5/32). Nhấn Enter để thêm nhiều địa chỉ.
    - **FQDN:** Dùng để định nghĩa địa chỉ theo Tên miền đầy đủ (Fully Qualified Domain Name). Rất hữu ích khi máy chủ đích sử dụng IP động (Ví dụ: google.com).
    - **Mã quốc gia:** Định nghĩa nhóm địa chỉ dựa trên mã quốc gia (Geo-IP) để chặn hoặc cho phép luồng dữ liệu từ một quốc gia cụ thể (Ví dụ: VN, US, CN).
    - **Nhóm con:** Chọn các nhóm địa chỉ con đã có sẵn để tạo thành một nhóm lớn hơn (Nhóm lồng nhóm).
    - **Mô tả:** Mô tả chi tiết mục đích sử dụng.
3. Nhấn **Tạo** để hoàn tất.
*Lưu ý: Phải nhập ít nhất một trong ba trường: CIDR, FQDN hoặc Mã quốc gia.*

### 4.1.3. Cập nhật nhóm địa chỉ
Thay đổi thông tin hoặc bổ sung địa chỉ vào một nhóm đã tồn tại.

**Các bước thực hiện:**
1. Tại màn hình danh sách địa chỉ, tìm nhóm cần sửa và nhấn biểu tượng **Sửa** tại cột Thao tác.
2. Thực hiện thay đổi các thông tin cần thiết tại cửa sổ cập nhật.
3. Nhấn **Cập nhật** để lưu lại các thay đổi.

### 4.1.4. Xóa nhóm địa chỉ
Gỡ bỏ các nhóm địa chỉ không còn sử dụng khỏi hệ thống.

**Các bước thực hiện:**
1. Tại màn hình danh sách địa chỉ, nhấn biểu tượng **Xóa** tại cột Thao tác của nhóm địa chỉ muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Bạn có chắc chắn muốn xóa nhóm IP [Tên nhóm]?"), nhấn **Đồng ý** để hoàn tất việc xóa.

---

## 4.2. Máy chủ (Hosts)
Quản lý thông tin các máy chủ hoặc tài khoản người dùng được định danh, thường được đồng bộ tự động từ hệ thống LDAP/Active Directory.

### 4.2.1. Xem danh sách máy chủ
Theo dõi và kiểm tra trạng thái hoạt động của các máy chủ được quản lý.

**Các bước thực hiện:**
1. Truy cập vào menu **Đối tượng** > **Hosts**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Username**: Tên đăng nhập.
    - **Email**: Địa chỉ email.
    - **Full Name**: Họ tên đầy đủ.
    - **Status**: Trạng thái hoạt động (Active/Inactive).
3. Sử dụng thanh tìm kiếm ở phía trên để lọc các máy chủ theo tên, username hoặc email.

### 4.2.2. Xem chi tiết máy chủ
Xem thông tin định danh đầy đủ và thời điểm cập nhật của máy chủ.

**Các bước thực hiện:**
1. Tại màn hình danh sách máy chủ, nhấn biểu tượng **Xem chi tiết** (hình con mắt) tại cột Actions của máy chủ cần xem.
2. Cửa sổ **LDAP Account Details** sẽ hiển thị các thông tin bao gồm:
    - **Username**: Tên đăng nhập.
    - **Email**: Địa chỉ email.
    - **Full Name**: Họ tên đầy đủ.
    - **Status**: Trạng thái hoạt động (Active/Inactive).
    - **Created At**: Thời gian tạo.
    - **Updated At**: Thời gian cập nhật cuối.

### 4.2.3. Cập nhật máy chủ
Chỉnh sửa thông tin cơ bản hoặc trạng thái hoạt động của máy chủ.

**Các bước thực hiện:**
1. Tại màn hình danh sách máy chủ, nhấn biểu tượng **Sửa** tại cột Actions của máy chủ muốn sửa.
2. Thay đổi thông tin tại cửa sổ cập nhật và nhấn **Update** để hoàn tất.

### 4.2.4. Xóa máy chủ
Xóa bản ghi máy chủ khỏi danh sách quản trị của Firewall.

**Các bước thực hiện:**
1. Tại màn hình danh sách máy chủ, nhấn biểu tượng **Xóa** tại cột Actions của máy chủ muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Are you sure you want to delete user...?"), nhấn **Confirm** để hoàn tất việc xóa.

---

## 4.3. Vùng bảo mật (Security Zones)
Định nghĩa các vùng mạng có mức độ tin cậy khác nhau để áp dụng chính sách lọc lưu lượng giữa các vùng.

### 4.3.1. Xem danh sách vùng bảo mật
Theo dõi các vùng bảo mật đã được định nghĩa và màu sắc nhận diện tương ứng.

**Các bước thực hiện:**
1. Truy cập vào menu **Đối tượng** > **Vùng bảo mật**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **ID**: Số thứ tự.
    - **Tên vùng**: Tên của vùng bảo mật.
    - **Mô tả**: Mô tả mục đích của vùng.
    - **Color**: Màu sắc đại diện.

### 4.3.2. Tạo mới vùng bảo mật
Tạo thêm vùng mạng mới để phân tách lưu lượng.

**Các bước thực hiện:**
1. Tại màn hình danh sách vùng bảo mật, nhấn nút **+ Thêm vùng** ở góc trên bên phải.
2. Tại cửa sổ **Tạo vùng bảo mật**, hiện ra, điền các thông tin sau:
    - **ID vùng**: Số thứ tự.
    - **Tên vùng**: Tên của vùng bảo mật.
    - **Mô tả**: Mô tả mục đích của vùng.
    - **Color**: Màu sắc đại diện.
3. Nhấn **Tạo mới** để hoàn tất.

### 4.3.3. Cập nhật vùng bảo mật
Thay đổi tên, mô tả hoặc màu sắc của vùng bảo mật hiện có.

**Các bước thực hiện:**
1. Tại màn hình danh sách vùng bảo mật, nhấn biểu tượng **Sửa** tại cột Hành động của vùng bảo mật muốn sửa.
2. Cập nhật thông tin và nhấn **Cập nhật** để hoàn tất.

---

## 4.4. Dịch vụ (Services)
Quản lý các giao thức mạng dựa trên Protocol và Cổng (Port).

### 4.4.1. Xem danh sách dịch vụ
Tra cứu các dịch vụ mạng (TCP, UDP, ICMP) đã được định nghĩa.

**Các bước thực hiện:**
1. Truy cập vào menu **Đối tượng** > **Dịch vụ**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Tên dịch vụ**: Hiển thị thông tin tên của dịch vụ.
    - **Loại**: Hiển thị loại dịch vụ.
    - **Giao thức**: Hiển thị giao thức sử dụng.
    - **Cổng đích**: Hiển thị cổng đích của dịch vụ.
    - **Cổng nguồn**: Hiển thị cổng nguồn của dịch vụ.
    - **Mô tả**: Mô tả mục đích của dịch vụ.

### 4.4.2. Tạo mới dịch vụ
Định nghĩa dịch vụ mạng mới theo nhu cầu đặc thù của hệ thống.

**Các bước thực hiện:**
1. Tại màn hình danh sách dịch vụ, nhấn nút **+ Thêm dịch vụ** ở góc trên bên phải.
2. Trên cửa sổ **Tạo dịch vụ**, điền các thông tin:
    - **Tên dịch vụ:** Tên của dịch vụ (Ví dụ: Custom_App_Port).
    - **Nhóm thiết bị:** Chỉ định nhóm thiết bị áp dụng dịch vụ này.
    - **Giao thức:** Chọn giao thức lõi mà dịch vụ sử dụng (TCP, UDP, ICMP, ANY).
    - **Cổng đích:** Cổng đích mà dịch vụ lắng nghe (Ví dụ: 80, 443 hoặc dải cổng 8000-8080).
    - **Cổng nguồn:** Cổng nguồn (thường để trống hoặc nhập dải cổng ngẫu nhiên 1024-65535).
    - **Mô tả:** Mô tả dịch vụ.
3. Nhấn **Tạo mới** để hoàn tất.

### 4.4.3. Chỉnh sửa dịch vụ
Cập nhật lại dải cổng hoặc giao thức cho dịch vụ hiện có.

**Các bước thực hiện:**
1. Tại màn hình danh sách dịch vụ, nhấn biểu tượng **Sửa** tại cột Hành động của dịch vụ muốn cập nhật.
2. Cập nhật thông tin và nhấn **Cập nhật** để hoàn tất.

### 4.4.4. Xóa dịch vụ
Gỡ bỏ các dịch vụ không còn cần thiết.

**Các bước thực hiện:**
1. Tại màn hình danh sách dịch vụ, nhấn biểu tượng **Xóa** tại cột Hành động của dịch vụ muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Bạn có chắc chắn muốn xóa dịch vụ...?"), nhấn **Đồng ý** để hoàn tất việc xóa.

---

## 4.5. Nhóm dịch vụ (Service groups)
Gộp nhiều dịch vụ lại thành một nhóm để tối ưu hóa việc quản lý luật bảo mật.

### 4.5.1. Xem danh sách nhóm dịch vụ
Theo dõi các nhóm dịch vụ và người tạo tương ứng.

**Các bước thực hiện:**
1. Truy cập vào menu **Đối tượng** > **Nhóm dịch vụ**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Tên**: Tên của nhóm dịch vụ.
    - **Mô tả**: Mô tả về nhóm dịch vụ.
    - **Người tạo**: Người tạo nhóm dịch vụ.

### 4.5.2. Tạo mới nhóm dịch vụ
Tập hợp các dịch vụ lẻ vào một nhóm chung để dễ dàng áp dụng policy.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm dịch vụ, nhấn nút **+ Thêm nhóm dịch vụ** ở góc trên bên phải.
2. Tại cửa sổ **Tạo mới nhóm dịch vụ**, điền các thông tin:
    - **Tên:** Tên của nhóm dịch vụ.
    - **Nhóm thiết bị:** Chọn nhóm thiết bị.
    - **Nhóm con:** Chọn nhóm dịch vụ con.
    - **Dịch vụ:** Chọn các dịch vụ thành viên.
    - **Mô tả:** Mô tả về nhóm dịch vụ.
3. Nhấn **Tạo** để hoàn tất.

### 4.5.3. Chỉnh sửa nhóm dịch vụ
Thêm hoặc bớt các dịch vụ thành viên trong nhóm.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm dịch vụ, nhấn biểu tượng **Sửa** tại cột Thao tác của nhóm dịch vụ muốn cập nhật.
2. Tại cửa sổ **Chỉnh sửa nhóm dịch vụ**, cập nhật thông tin và nhấn **Cập nhật** để hoàn tất.

### 4.5.4. Xóa nhóm dịch vụ
Gỡ bỏ nhóm dịch vụ khỏi hệ thống.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm dịch vụ, nhấn biểu tượng **Xóa** tại cột Thao tác của nhóm dịch vụ muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Bạn có chắc chắn muốn xóa nhóm dịch vụ ...?"), nhấn **Đồng ý** để hoàn tất việc xóa.

---

## 4.6. Ứng dụng (Applications)
Định nghĩa các ứng dụng cụ thể (Facebook, Skype...) dựa trên tên miền, IP hoặc chữ ký ứng dụng.

### 4.6.1. Xem danh sách ứng dụng
Tra cứu danh sách hàng ngàn ứng dụng được hệ thống nhận diện.

**Các bước thực hiện:**
1. Truy cập vào menu **Đối tượng** > **Ứng dụng**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Tên**: Tên của ứng dụng.
    - **Domains**: Tên miền của ứng dụng.
    - **CIDRs**: Dải IP của ứng dụng.
    - **ASNs**: Số hiệu hệ thống tự trị của nhà cung cấp dịch vụ.
    - **Mức độ rủi ro**: Mức độ rủi ro của ứng dụng.
    - **Yêu cầu băng thông**: Yêu cầu băng thông của ứng dụng.
    - **Đối tượng người dùng**: Nhóm người dùng được phép sử dụng ứng dụng.

### 4.6.2. Tạo mới ứng dụng
Khai báo ứng dụng mới chưa có trong danh mục nhận diện tự động mặc định của Firewall.

**Các bước thực hiện:**
1. Tại màn hình danh sách ứng dụng, nhấn nút **+ Thêm ứng dụng** ở góc trên bên phải.
2. Trên cửa sổ **Thêm ứng dụng**, điền các thông tin:
    - **Tên ứng dụng**: Tên của ứng dụng (Ví dụ: Hệ thống ERP Nội bộ).
    - **Nhóm ứng dụng**: Chọn nhóm ứng dụng.
    - **Domains**: Tên miền chính xác của ứng dụng. Firewall sẽ dựa vào trường SNI trong gói tin HTTPS hoặc DNS request để nhận diện.
    - **CIDRs**: Dải IP tĩnh của máy chủ ứng dụng.
    - **ASNs**: Số hiệu hệ thống tự trị của nhà cung cấp dịch vụ (dùng khi nhận diện các dịch vụ Cloud).
    - **Mức độ rủi ro**: Đánh giá và gán mức độ rủi ro (Risk Level) cho ứng dụng này (Ví dụ: Low, High, Critical) để dễ theo dõi trên Dashboard.
    - **Yêu cầu băng thông**: Cấu hình yêu cầu băng thông để kết hợp với chính sách QoS (Traffic Control) sau này.
    - **Đối tượng người dùng**: Chỉ định các nhóm người dùng được phép sử dụng ứng dụng này.
3. Nhấn **Tạo** để hoàn tất.

### 4.6.3. Chỉnh sửa ứng dụng
Thay đổi các tham số nhận diện hoặc mức độ ưu tiên của ứng dụng.

**Các bước thực hiện:**
1. Tại màn hình danh sách ứng dụng, nhấn biểu tượng **Sửa** tại cột Thao tác của ứng dụng muốn cập nhật.
2. Tại cửa sổ **Cập nhật ứng dụng**, cập nhật thông tin và nhấn **Cập nhật** để hoàn tất.

### 4.6.4. Xóa ứng dụng
Gỡ bỏ ứng dụng tự định nghĩa khỏi hệ thống.

**Các bước thực hiện:**
1. Tại màn hình danh sách ứng dụng, nhấn biểu tượng **Xóa** tại cột Thao tác của ứng dụng muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Bạn có chắc chắn muốn xóa ứng dụng này? Hành động này không thể hoàn tác."), nhấn **Xóa** để hoàn tất việc xóa.

---

## 4.7. Nhóm ứng dụng (Application Groups)
Gộp các ứng dụng cùng loại để quản lý tập trung.

### 4.7.1. Xem danh sách nhóm ứng dụng
Kiểm tra các nhóm ứng dụng hiện có.

**Các bước thực hiện:**
1. Truy cập vào menu **Đối tượng** > **Nhóm ứng dụng**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Tên nhóm**: Tên của nhóm ứng dụng.
    - **Ứng dụng**: Các ứng dụng trong nhóm.
    - **Mô tả**: Mô tả về nhóm ứng dụng.
    - **Cập nhật lần cuối**: Thời gian cập nhật lần cuối của nhóm ứng dụng.

### 4.7.2. Tạo mới nhóm ứng dụng
Tạo nhóm để quản lý hàng loạt ứng dụng (Ví dụ: Nhóm ứng dụng Chat).

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm ứng dụng, nhấn nút **+ Tạo nhóm ứng dụng** ở góc trên bên phải.
2. Tại cửa sổ **Tạo nhóm ứng dụng**, điền các thông tin:
    - **Tên nhóm**: Tên của nhóm ứng dụng.
    - **Ứng dụng**: Chọn các ứng dụng thành viên.
    - **Mô tả**: Mô tả về nhóm ứng dụng.
3. Nhấn **Tạo mới** để hoàn tất.

### 4.7.3. Chỉnh sửa nhóm ứng dụng
Cập nhật danh sách ứng dụng trong nhóm.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm ứng dụng, nhấn biểu tượng **Sửa** tại cột Thao tác của nhóm ứng dụng muốn cập nhật.
2. Tại cửa sổ **Cập nhật nhóm ứng dụng**, cập nhật thông tin và nhấn **Cập nhật** để hoàn tất.

### 4.7.4. Xóa nhóm ứng dụng
Xóa nhóm ứng dụng không còn sử dụng.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm ứng dụng, nhấn biểu tượng **Xóa** tại cột Thao tác của nhóm ứng dụng muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Bạn có chắc chắn muốn xóa nhóm ứng dụng này không? Hành động này không thể hoàn tác."), nhấn **Xóa** để hoàn tất việc xóa.

---

## 4.8. Nhóm bảo mật (Security Groups)
Tạo các nhóm bảo mật để áp dụng các tập hợp chính sách đặc thù.

### 4.8.1. Xem danh sách nhóm bảo mật
Kiểm tra thông tin các nhóm bảo mật hiện tại.

**Các bước thực hiện:**
1. Truy cập vào menu **Đối tượng** > **Nhóm bảo mật**.
2. Xem thông tin: **Tên**.

### 4.8.2. Tạo mới nhóm bảo mật
Khai báo một nhóm bảo mật mới.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm bảo mật, nhấn nút **+ Thêm nhóm bảo mật** ở góc trên bên phải.
2. Trên cửa sổ **Tạo mới nhóm bảo mật**, điền các thông tin:
    - **Tên**: Tên nhóm bảo mật.
3. Nhấn **Tạo** để hoàn tất.

### 4.8.3. Chỉnh sửa nhóm bảo mật
Thay đổi tên nhóm bảo mật.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm bảo mật, nhấn biểu tượng **Sửa** tại cột Thao tác của nhóm bảo mật muốn cập nhật.
2. Tại cửa sổ **Chỉnh sửa nhóm bảo mật**, cập nhật thông tin và nhấn **Cập nhật** để hoàn tất.

---

## 4.9. Quản lý Phiên bản (Version Management)
Lưu trữ và quản lý lịch sử các thay đổi cấu hình. Mỗi khi người dùng thực hiện thao tác thay đổi các luật bảo mật, danh sách IP, hoặc tập luật IPS và nhấn **Apply**, hệ thống sẽ tự động đóng gói toàn bộ cấu hình tại thời điểm đó thành một "Phiên bản" (Version) mới (Snapshot). Tính năng này rất quan trọng để rollback (khôi phục) cấu hình khi có lỗi xảy ra.

### 4.9.1. Xem danh sách phiên bản
Theo dõi lịch sử thay đổi cấu hình của toàn bộ hệ thống theo thời gian.

**Các bước thực hiện:**
1. Truy cập vào menu **Đối tượng > Quản lý Phiên bản**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Mã hash**: Mã phiên bản.
    - **Thông điệp**: Nội dung thay đổi.
    - **Tác giả**: Người thực hiện.
    - **Ngày**: Thời gian.
3. Người dùng có thể chuyển qua các tab **Chính sách**, **Danh sách trắng**, **Danh sách đen**, **Quy tắc IPS** để xem chi tiết cấu hình, trong đó:
    - **Chính sách**: Danh sách các luật bảo mật.
    - **Danh sách trắng**: Danh sách trắng địa chỉ IP.
    - **Danh sách đen**: Danh sách đen địa chỉ/tên miền.
    - **Quy tắc IPS**: Các bộ luật IPS được kích hoạt.

### 4.9.2. Kiểm tra chi tiết cấu hình theo tab
Xem chi tiết nội dung các chính sách đã cấu hình trong một phiên bản cụ thể.

**Các bước thực hiện:**
1. Tại màn hình danh sách phiên bản, nhấn biểu tượng **Xem** (hình con mắt) tại cột **Thao tác** của phiên bản muốn xem.
2. Hệ thống hiển thị màn hình chi tiết các luật bảo mật trong phiên bản đó.
3. Nhấn dấu **[X]** để đóng cửa sổ kiểm tra.

### 4.9.3. Khôi phục cấu hình (Rollback Version)
Quay trở lại trạng thái cấu hình của một phiên bản trước đó. Thao tác này sẽ ngay lập tức ghi đè toàn bộ cấu hình hiện tại bằng dữ liệu của phiên bản được chọn (kể cả danh sách IP, Luật Firewall, Luật IPS).

**Các bước thực hiện:**
1. Tại màn hình danh sách phiên bản, tìm đến phiên bản bạn muốn khôi phục (thường là phiên bản có ngày giờ cũ hơn).
2. Nhấn biểu tượng **Khôi phục** (hình vòng tròn mũi tên xoay vòng) tại cột Thao tác.
3. Xuất hiện hộp thoại **Xác nhận khôi phục**, hệ thống yêu cầu nhập một nội dung tin nhắn để ghi lại lý do khôi phục.
4. Nhập nội dung tin nhắn và nhấn **Xác nhận**.

## 4.10. Cấu hình Tự động áp dụng (Auto Apply Setting)
Thông thường, sau mỗi thay đổi về chính sách, quản trị viên cần nhấn nút **Áp dụng** thủ công để Firewall cập nhật luật mới. Tính năng **Áp dụng tự động** cho phép hệ thống tự động thực hiện việc này ngay sau khi người dùng nhấn **Lưu** hoặc **Tạo**, giúp tiết kiệm thời gian và đảm bảo tính kịp thời.

**Các bước thực hiện:**
1. Truy cập vào menu **Đối tượng** > **Áp dụng tự động**.
2. Tại màn hình cấu hình, gạt công tắc tại mục **Tự động áp dụng** sang trạng thái bật (màu xanh).
3. Nhấn **Tự động áp dụng** để lưu thiết lập.

> [!IMPORTANT]
> **Lưu ý:** Khi bật tính năng này, mọi sai sót trong quá trình cấu hình sẽ tác động trực tiếp đến mạng ngay lập tức mà không có bước kiểm tra lại (review) cuối cùng. Khuyến cáo chỉ sử dụng khi bạn đã hoàn toàn tự tin vào các thay đổi của mình.

# Chương 5: Chính sách Bảo mật (Security Policies)

Chương này hướng dẫn người quản trị cấu hình và quản lý các chính sách bảo mật để kiểm soát toàn bộ lưu lượng mạng đi qua hệ thống. Đây là nơi tập hợp các quy tắc (Rules) quyết định luồng dữ liệu nào được phép đi qua và luồng dữ liệu nào bị chặn lại dựa trên các tiêu chí bảo mật khắt khe.

**Quy trình quản trị chung:**
1.  **Định nghĩa đối tượng:** Tạo các địa chỉ, ứng dụng, dịch vụ (đã thực hiện ở Chương 4).
2.  **Thiết lập quy tắc:** Xây dựng các Policies, Black List hoặc White List để áp dụng đối tượng vào thực tế.
3.  **Áp dụng cấu hình:** Đẩy các thay đổi xuống thiết bị Firewall thông qua nút **Áp dụng** hoặc sử dụng tính năng **Tự động áp dụng**.

---

## 5.1. Chính sách bảo mật (Policies)
Module Policies là "trái tim" của hệ thống bảo mật, cho phép kiểm soát truy cập dựa trên 7 lớp của mô hình OSI (Layer 7). Bạn có thể tạo các luật linh hoạt kết hợp giữa vùng mạng (Zones), người dùng, ứng dụng và dịch vụ mạng.

### 5.1.1. Xem danh sách chính sách
Màn hình này hiển thị thứ tự ưu tiên của các luật. Hệ thống sẽ kiểm tra gói tin từ trên xuống dưới, luật nào khớp trước sẽ được áp dụng trước.

**Các bước thực hiện:**
1. Truy cập menu **Chính sách an ninh** > **Chính sách**.
2. Tại màn hình danh sách, tra cứu các thông tin:
   - **Tên chinh sách:** Tên gợi nhớ của luật.
   - **Hành động:** Hành động xử lý (ALLOW - Cho phép, DENY - Chặn).
   - **Địa chỉ nguồn:** Địa chỉ IP nguồn.
   - **Địa chỉ đích:** Địa chỉ IP đích.
   - **Tên miền/URL:** Tên miền hoặc URL.
   - **Ứng dụng:** Ứng dụng được áp dụng.
   - **Nhóm ứng dụng:** Nhóm ứng dụng được áp dụng.
   - **Dịch vụ:** Dịch vụ được áp dụng.
   - **Nhóm dịch vụ:** Nhóm dịch vụ được áp dụng.
   - **Mức độ:** Mức độ quan trọng của luật.
   - **Trạng thái:** Trạng thái đang kích hoạt hoặc vô hiệu hóa.
3. Sử dụng thanh tìm kiếm phía trên để lọc nhanh theo tên hoặc tiêu chí cụ thể.

### 5.1.2. Tạo mới chính sách bảo mật
Xây dựng một quy tắc mới để kiểm soát một luồng dữ liệu cụ thể trong mạng.

**Các bước thực hiện:**
1. Tại màn hình danh sách Policies, nhấp vào nút **+ Thêm chính sách**.
2. Trên cửa sổ **Tạo chính sách**, nhập các thông tin:
   - **Tên chính sách (*):** Tên định danh cho luật (Ví dụ: Block_Guest_VLAN_Access).
   - **Mô tả:** Giải thích chi tiết mục đích của luật này.
   - **Vùng nguồn/Vùng đích:** Vùng mạng bắt đầu và vùng mạng đích.
   - **Địa chỉ nguồn/Địa chỉ đích:** Nhóm địa chỉ IP hoặc tên miền tương ứng.
   - **Tên miền/URL:** Các tên miền cụ thể muốn áp dụng luật (Ví dụ: *.xxx.com).
   - **Người dùng:** Người dùng hoặc nhóm người dùng cụ thể.
   - **Ứng dụng/Nhóm ứng dụng:** Ứng dụng hoặc nhóm ứng dụng muốn kiểm soát.
   - **Dịch vụ/Nhóm dịch vụ:** Dịch vụ hoặc nhóm dịch vụ (Port/Protocol).
   - **Hành động (*):** 
     - **Cho phép:** Cho phép dữ liệu đi qua.
     - **Từ chối:** Chặn dữ liệu mà không phản hồi cho nguồn (gói tin bị rơi tự do).
     - **Bác bỏ:** Chặn dữ liệu và gửi thông báo từ chối cho nguồn.
     - **Chỉ ghi log:** Chỉ ghi lại nhật ký mà không can thiệp vào luồng dữ liệu.
   - **Ghi log:** Kích hoạt để hệ thống ghi lại nhật ký mỗi khi luật này được thực thi.
   - **Mức độ:** Gán mức độ quan trọng (LOW, MEDIUM, HIGH, CRITICAL).
   - **Nhóm bảo mật:** Chọn nhóm bảo mật áp dụng.
3. Nhấn **Thêm** để hoàn tất.

### 5.1.3. Cấu hình Ngưỡng cảnh báo (Alert Threshold)
Giúp lọc bớt các cảnh báo rác, chỉ tập cung vào các sự kiện có mức độ nghiêm trọng mà quản trị viên quan tâm.

**Các bước thực hiện:**
1. Tại màn hình danh sách Policies, nhấp vào nút **Ngưỡng cảnh báo**.
2. Tại cửa sổ hiện ra, chọn mức độ rủi ro tối thiểu. Khi đó, các vi phạm chính sách có mức độ thấp hơn mức độ đã chọn sẽ không sinh ra Alert trên Dashboard.
3. Nhấn **Lưu** để áp dụng.

### 5.1.4. Cập nhật chính sách bảo mật
Sửa đổi các thông số của một luật đã tồn tại để phù hợp với tình hình thực tế.

**Các bước thực hiện:**
1. Tại màn hình danh sách Policies, tìm đến chính sách cần sửa.
2. Nhấn vào biểu tượng **Sửa** (hình cây bút) tại cột **Thao tác**.
3. Thay đổi các thông số cần thiết trong cửa sổ **Cập nhật chính sách**.
4. Nhấn **Cập nhật** để lưu lại các thay đổi.

### 5.1.5. Xóa chính sách bảo mật
Loại bỏ các quy tắc không còn sử dụng để làm gọn bộ luật và tối ưu hiệu suất xử lý của Firewall.

**Các bước thực hiện:**
1. Tại màn hình danh sách Policies, nhấn biểu tượng **Xóa** (hình thùng rác) ở cột **Thao tác** của luật đó.
2. Xác nhận **Đồng ý** trên hộp thoại cảnh báo để hoàn tất xóa.

---

## 5.2. Danh sách đen (Black List)
Black List được sử dụng để chặn nhanh các thực thể (IP, Domain) đã được xác nhận là độc hại hoặc không mong muốn trên quy mô toàn hệ thống, thường được ưu tiên xử lý trước cả các Policies chung.

### 5.2.1. Xem danh sách đen
Quản trị viên có thể theo dõi danh sách các "đối tượng xấu" đang bị cấm truy cập.

**Các bước thực hiện:**
1. Truy cập menu **Chính sách an ninh** > **Danh sách đen**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
   - **Loại định dạng:** Loại đối tượng (IP Address, Subnet, Domain/URL).
   - **Giá trị:** Địa chỉ IP hoặc Tên miền.
   - **Danh mục:** Danh mục (ví dụ: C&C, Botnet).
   - **Độ rủi ro:** Điểm số đánh giá mức độ độc hại.
   - **Mức độ:** Mức độ nghiêm trọng của đối tượng.
   - **Hành động:** Hành động được thực hiện.
   - **Hiệu lực:** Thời gian hết hạn của đối tượng.
   - **Mô tả:** Mô tả ngắn gọn về đối tượng.

### 5.2.2. Thêm mới đối tượng vào danh sách đen
Đưa một địa chỉ nghi ngờ hoặc bị cấm vào danh sách đen.

**Các bước thực hiện:**
1. Tại màn hình danh sách, nhấn vào nút **+ Thêm mới**.
2. Trên cửa sổ **Tạo danh sách đen**, điền các thông tin:
   - **Loại định dạng:** Chọn loại (IP Address, Subnet, Domain/URL).
   - **Giá trị:** Nhập giá trị cụ thể (Ví dụ: 103.x.x.x hoặc malicious-site.net).
   - **Danh mục:** Phân loại mục đích chặn (Ví dụ: Malware, C&C).
   - **Hiệu lực:** Chọn thời gian hiệu lực của đối tượng (Never - Không bao giờ, hoặc chọn ngày cụ thể).
   - **Độ rủi ro:** Kéo thanh trượt để xác định mức độ rủi ro của đối tượng (0-100%).
   - **Mức độ:** Thiết lập mức độ nghiêm trọng của đối tượng.
   - **Hành động:** Thiết lập hành động được thực hiện đối với đối tượng.
   - **Ghi log:** Thiết lập mức độ chi tiết của nhật ký ghi lại.
   - **Mô tả:** Mô tả chi tiết lý do chặn.
   - **Nhóm bảo mật:** Chọn nhóm bảo mật áp dụng.
3. Nhấn **Tạo** để hoàn tất.

### 5.2.3. Nhập dữ liệu hàng loạt (Import File)
Hữu ích khi bạn có danh sách hàng ngàn IP độc hại từ các trung tâm an ninh mạng (SOC) khác.

**Các bước thực hiện:**
1. Nhấn nút **Nhập file** ở góc trên bên phải.
2. Chọn file định dạng TXT hoặc CSV chứa danh sách đối tượng.
3. Nhấn **Nhập** để hệ thống nạp dữ liệu.

### 5.2.4. Cập nhật đối tượng trong Danh sách đen
Thay đổi các tham số như thời gian hết hạn hoặc mức độ tin cậy của một đối tượng bị chặn.

**Các bước thực hiện:**
1. Tại màn hình danh sách Danh sách đen, nhấn biểu tượng **Sửa** ở cột **Thao tác** của đối tượng muốn sửa.
2. Cập nhật các thông tin trong cửa sổ **Cập nhật danh sách đen**.
3. Nhấn **Cập nhật** để hoàn tất.

### 5.2.5. Xóa đối tượng khỏi Danh sách đen
Gỡ bỏ lệnh cấm cho một địa chỉ khi nó được xác định là an toàn hoặc hết thời hạn cấm.

**Các bước thực hiện:**
1. Tại màn hình danh sách Danh sách đen, nhấn biểu tượng **Xóa** ở cột **Thao tác** của đối tượng muốn xóa.
2. Xác nhận **Đồng ý** để đối tượng được gỡ bỏ khỏi danh sách chặn.

---

## 5.3. Quản lý Danh sách trắng (White List)
Ngược lại với Black List, White List cho phép các thực thể tin cậy đi qua Firewall mà không bị kiểm tra bởi một số hoặc toàn bộ các module an ninh (IPS, Antivirus...). Điều này giúp giảm độ trễ cho các dịch vụ quan trọng và tránh hiện tượng chặn nhầm (False Positive).

### 5.3.1. Xem danh sách trắng
Màn hình này hiển thị các quy tắc ưu tiên cho lưu lượng tin cậy. Quản trị viên nên thường xuyên rà soát danh sách này để đảm bảo chỉ những luồng dữ liệu thực sự an toàn mới được bỏ qua kiểm tra.

**Các bước thực hiện:**
1. Truy cập menu **Chính sách an ninh** > **Danh sách trắng**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
   - **Tên danh sách trắng**: Tên danh sách trắng.
   - **Địa chỉ nguồn**: Địa chỉ nguồn của đối tượng.
   - **Địa chỉ đích**: Địa chỉ đích của đối tượng.
   - **Tên miền/URL**: Tên miền/URL của đối tượng.
   - **Nhóm ứng dụng**: Nhóm ứng dụng được áp dụng.
   - **Ứng dụng**: Ứng dụng được áp dụng.
   - **Nhóm dịch vụ**: Nhóm dịch vụ được áp dụng.
   - **Dịch vụ**: Dịch vụ được áp dụng.
   - **Trạng thái**: Trạng thái của danh sách trắng.
    

### 5.3.2. Tạo mới danh sách trắng
Xác định một luồng dữ liệu là "an toàn tuyệt đối" để được ưu tiên xử lý.

**Các bước thực hiện:**
1. Tại màn hình danh sách White list, nhấp vào nút **+ Thêm danh sách trắng**.
2. Trên cửa sổ **Tạo danh sách trắng**, điền các thông tin:
   - **Tên danh sách trắng (*)**: Tên danh sách trắng (bắt buộc).
   - **Mô tả**: Mô tả tóm tắt mục đích của danh sách trắng.
   - **Vùng nguồn**: Chọn vùng mạng nguồn.
   - **Địa chỉ nguồn**: Chọn đối tượng địa chỉ nguồn.
   - **Vùng đích**: Chọn vùng mạng đích.
   - **Địa chỉ đích**: Chọn đối tượng địa chỉ đích.
   - **Tên miền/URL**: Chọn tên miền/URL.
   - **Người dùng**: Chọn người dùng.
   - **Nhóm dịch vụ**: Chọn nhóm dịch vụ được áp dụng.
   - **Dịch vụ**: Chọn dịch vụ được áp dụng.
   - **Nhóm ứng dụng**: Chọn nhóm ứng dụng được áp dụng.
   - **Ứng dụng**: Chọn ứng dụng được áp dụng.
   - **Khung thời gian**: Chọn khung thời gian áp dụng.
   - **Ghi log**: Lựa chọn có thực hiện ghi log hay không.
   - **Nhóm bảo mật**: Chọn nhóm bảo mật.
   - **Trạng thái**: Chọn trạng thái.
3. Nhấn **Thêm** để hoàn tất.

### 5.3.3. Cập nhật danh sách trắng
Thay đổi phạm vi ưu tiên hoặc cập nhật các đối tượng trong White List.

**Các bước thực hiện:**
1. Tại màn hình danh sách White List, nhấn biểu tượng **Sửa** ở cột **Hành động** của danh sách trắng muốn sửa.
2. Trên cửa sổ **Cập nhật danh sách trắng**, bạn có thể thay đổi các thông tin sau:
   - **Tên danh sách trắng (*)**: Tên danh sách trắng (bắt buộc).
   - **Mô tả**: Mô tả tóm tắt mục đích của danh sách trắng.
   - **Vùng nguồn**: Chọn vùng mạng nguồn.
   - **Địa chỉ nguồn**: Chọn đối tượng địa chỉ nguồn.
   - **Vùng đích**: Chọn vùng mạng đích.
   - **Địa chỉ đích**: Chọn đối tượng địa chỉ đích.
   - **Tên miền/URL**: Chọn tên miền/URL.
   - **Người dùng**: Chọn người dùng.
   - **Nhóm dịch vụ**: Chọn nhóm dịch vụ được áp dụng.
   - **Dịch vụ**: Chọn dịch vụ được áp dụng.
   - **Nhóm ứng dụng**: Chọn nhóm ứng dụng được áp dụng.
   - **Ứng dụng**: Chọn ứng dụng được áp dụng.
   - **Khung thời gian**: Chọn khung thời gian áp dụng.
   - **Ghi log**: Lựa chọn có thực hiện ghi log hay không.
   - **Nhóm bảo mật**: Chọn nhóm bảo mật.
   - **Trạng thái**: Chọn trạng thái.
3. Nhấn **Cập nhật** để hoàn tất.

### 5.3.4. Xóa danh sách trắng
Hủy bỏ trạng thái ưu tiên cho một luồng dữ liệu khi không còn tin cậy hoặc không còn nhu cầu.

**Các bước thực hiện:**
1. Tại màn hình danh sách White List, nhấn biểu tượng **Xóa** ở cột **Hành động** của danh sách trắng muốn xóa.
2. Xác nhận **Đồng ý** trên hộp thoại xóa để hoàn tất.

---

## 5.4. Tập luật IPS (IPS Rule Sets)
IPS (Intrusion Prevention System) sử dụng các chữ ký (Signatures) để phát hiện các hành vi tấn công dựa trên lỗ hổng phần mềm hoặc hành vi mạng bất thường.

### 5.4.1. Xem danh sách luật IPS
Tra cứu hàng ngàn luật bảo mật đang được engine IPS sử dụng để bảo vệ mạng.

**Các bước thực hiện:**
1. Truy cập menu **Security policies** > **IPS Rule sets**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
   - **SID**: Mã định danh luật.
   - **Thông điệp**: Nội dung cảnh báo.
   - **Nguồn**: Nguồn tạo luật
   - **Mức độ nghiêm trọng**: Mức độ nghiêm trọng của luật.
   - **Hành động**: Hành động của tập luật.
   - **Trạng thái**: Trạng thái của tập luật.

### 5.4.2. Thêm mới luật IPS thủ công
Dành cho người quản trị có kiến thức chuyên sâu để định nghĩa các chữ ký tùy biến.

**Các bước thực hiện:**
1. Tại màn hình danh sách luật IPS, nhấp vào nút **+ Thêm mới**.
2. Trên cửa sổ **Tạo mới tập luật IPS**, nhập các thông tin:
   - **Nội dung (*):** Nội dung cú pháp luật (Ví dụ theo chuẩn Snort/Suricata: `alert tcp any any -> any 80 (msg:"IDS Alert";...)`).
   - **Trạng thái:** Chọn **Kích hoạt** để kích hoạt ngay.
   - **Nhóm bảo mật:** Chọn nhóm bảo mật áp dụng luật này.
3. Nhấn **Tạo** để hoàn tất.

### 5.4.3. Cập nhật tập luật IPS
Thay đổi cách hệ thống phản ứng với một loại tấn công cụ thể.

**Các bước thực hiện:**
1. Tại màn hình danh sách luật IPS, nhấn vào biểu tượng **Sửa** ở cột **Hành động** của luật muốn sửa.
2. Trên cửa sổ **Cập nhật tập luật IPS**, bạn có thể thay đổi các thông tin:
   - **Nội dung (*):** Nội dung cú pháp luật (Ví dụ theo chuẩn Snort/Suricata: `alert tcp any any -> any 80 (msg:"IDS Alert";...)`).
   - **Trạng thái:** Chọn trạng thái của tập luật.
   - **Nhóm bảo mật:** Chọn nhóm bảo mật áp dụng luật này.
3. Nhấn **Cập nhật** để lưu thay đổi.

### 5.4.4. Xem lịch sử thay đổi
Kiểm tra lại toàn bộ quá trình thay đổi luật để phục vụ việc truy vết và xử lý sự cố.

**Các bước thực hiện:**
1. Tại màn hình danh sách luật IPS, nhấn vào biểu tượng **Lịch sử** (hình vòng tròn có mũi tên) ở cột **Hành động** của luật muốn xem.
2. Hệ thống hiển thị bảng liệt kê: Người sửa, thời gian sửa và nội dung sửa.

### 5.4.5. Áp dụng cấu hình (Apply)
Đây là bước bắt buộc để nạp lại các luật đã chỉnh sửa vào bộ nhớ xử lý của engine IPS.

**Các bước thực hiện:**
1. Sau khi hoàn tất các thay đổi, nhấn nút **Áp dụng tập luật** ở bên cạnh thanh tìm kiếm.
2. Chọn các thiết bị được áp dụng và nhập lý do áp dụng.
3. Nhấn **Áp dụng** để hoàn tất.

# Chương 6: Cấu hình mạng (Network Config)
Chương này cho phép người quản trị thiết lập các cấu hình mạng như Cụm HA, Bảng định tuyến, Chính sách NAT, Giải mã TLS
---

## 6.1. Quản lý Cụm thiết bị (HA Clusters)
Cho phép ghép nối nhiều thiết bị Firewall thành một cụm để đảm bảo tính sẵn sàng cao (High Availability - HA), giúp hệ thống hoạt động liên tục ngay cả khi một thiết bị gặp sự cố.

### 6.1.1. Xem danh sách Cluster
Theo dõi trạng thái hoạt động của các cụm thiết bị và các nút (Node) thành viên.

**Các bước thực hiện:**
1. Truy cập vào menu **Cấu hình mạng** > **HA Clusters**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin: 
    - **Tên**: Tên của cụm.
    - **Loại**: Loại cụm HA.
    - **Trạng thái**: Trạng thái (Active/Inactive).
    - Thông tin chi tiết của **Node 1**, **Node 2** (Tên thiết bị và địa chỉ MGMT).
3. Tại cột **Hành động**, có thể nhấn **Dừng** để tạm dừng cụm hoặc **Sửa** để chỉnh sửa.

---

### 6.1.2. Tạo mới Cluster
Thiết lập một cụm HA mới từ các thiết bị đơn lẻ.

**Các bước thực hiện:**
1. Tại màn hình danh sách Clusters, nhấp vào nút **+ Thêm mới**.
2. Trên cửa sổ **Thêm mới cluster**, điền các thông tin:
    - **Tên:** Tên định danh của cụm thiết bị.
    - **Loại:** Chọn kiểu hoạt động của cụm:
        - **Active/Standby:** Cơ chế Active/Standby đảm bảo luôn có một thiết bị dự phòng sẵn sàng thay thế ngay lập tức khi thiết bị chính gặp sự cố mà không làm gián đoạn hệ thống.
        - **Active/Active:** Cơ chế Active/Active đảm bảo luôn có một thiết bị dự phòng sẵn sàng thay thế ngay lập tức khi thiết bị chính gặp sự cố mà không làm gián đoạn hệ thống.
    - **Mô tả:** Mô tả ngắn gọn về cụm.
    - Tùy chọn nâng cao: 
        - **Sử dụng địa chỉ MAC ảo cho cộng giao tiếp:** Sử dụng địa chỉ MAC ảo cho cụm. Khi xảy ra sự cố chuyển đổi (failover), các thiết bị mạng khác không cần cập nhật lại bảng ARP, giúp giảm thời gian gián đoạn mạng.
        - **Quyền ưu tiên:** Bật tính năng quyền ưu tiên. Nếu thiết bị chính bị lỗi rồi khôi phục lại trạng thái bình thường, nó sẽ tự động lấy lại quyền xử lý chính (Active) từ thiết bị Standby.
3. Tại mục **Thiết bị**, nhấp **+ Thêm** để chọn các thiết bị thành viên vào cụm.
4. Nhấn **Lưu** để hoàn tất.

---

## 6.2. Bảng định tuyến (Route Table)
Quản lý các tuyến đường truyền tin (Routes) để điều phối lưu lượng mạng đi qua các cổng giao tiếp và Gateway phù hợp.

### 6.2.1. Xem danh sách định tuyến
Hiển thị toàn bộ các bản ghi định tuyến đang được cấu hình trên từng thiết bị cụ thể.

**Các bước thực hiện:**
1. Truy cập vào menu **Cấu hình mạng** > **Bảng định tuyến**.
2. Chọn thiết bị cần xem từ danh sách thả xuống.
3. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Thiết bị**: Hiển thị tên thiết bị của định tuyến.
    - **Đích**: Địa chỉ IP đích.
    - **Gateway**: Địa chỉ IP của trạm tiếp theo.
    - **Giao diện**: Cổng giao tiếp.
    - **Metric**: Độ ưu tiên của định tuyến.
    - **Kích hoạt**: Trạng thái kích hoạt của định tuyến.  

---

### 6.2.2. Tạo mới định tuyến
Thêm một tuyến đường mới vào bảng định tuyến để chỉ định Gateway cho một dải mạng đích.

**Các bước thực hiện:**
1. Tại màn hình danh sách định tuyến, nhấp vào nút **+ Thêm Route**.
2. Trên cửa sổ **Tạo Route Entry**, điền các thông tin:
    - **Đích (*):** Nhập dải mạng đích mà gói tin muốn đi tới (Ví dụ: 10.0.0.0/8). Dùng 0.0.0.0/0 cho Default Route (tuyến đường mặc định ra Internet).
    - **Gateway:** Nhập địa chỉ IP của trạm tiếp theo (Next-hop) sẽ nhận gói tin (Ví dụ: 192.168.1.1).
    - **Giao diện:** Chọn cổng giao tiếp (card mạng) mà gói tin sẽ được đẩy ra.
    - **Metric:** Nhập chỉ số ưu tiên cho tuyến đường. Khi có nhiều tuyến đường cùng đi đến một đích, Firewall sẽ chọn tuyến đường có Metric nhỏ nhất (ưu tiên cao nhất).
    - **Mô tả:** Ghi chú rõ mục đích của tuyến đường để dễ bảo trì sau này.
    - **Kích hoạt:** Tích chọn để kích hoạt tuyến đường này ngay lập tức.
3. Nhấn **Tạo mới** để hoàn tất.

---

### 6.2.3. Cập nhật định tuyến
Chỉnh sửa thông số Gateway, Interface hoặc Metric của một bản ghi định tuyến đã tồn tại.

**Các bước thực hiện:**
1. Tại màn hình danh sách định tuyến, nhấn biểu tượng **Sửa** tại cột Hành động của tuyến đường cần chỉnh sửa.
2. Thay đổi các thông số cần thiết và nhấn **Cập nhật**.

---

### 6.2.4. Áp dụng định tuyến (Apply)
Đẩy các thay đổi cấu hình trong bảng định tuyến xuống thiết bị để bắt đầu điều phối lưu lượng.

**Các bước thực hiện:**
1. Sau khi hoàn tất thêm/sửa/xóa các bản ghi, nhấp vào nút **Áp dụng** ở thanh công cụ phía trên danh sách.
2. Cửa sổ **Áp dụng bảng định tuyến** xuất hiện, cho biết thiết bị sẽ được áp dụng thay đổi.
3. Nhập mô tả các thay đổi vào ô **Ghi chú thay đổi** (Ví dụ: "Thêm tuyến đường cho dải mạng 10.x.x.x").
4. Nhấn nút **Kiểm tra thay đổi** để hệ thống kiểm tra và thực thi việc áp dụng cấu hình.
5. Cửa sổ **Xem trước thay đổi** hiện ra, nhấn vào **Áp dụng ngay** để xác nhận áp dụng.

---

### 6.2.5. Xóa định tuyến
Xóa bỏ một bản ghi định tuyến không còn cần thiết.

**Các bước thực hiện:**
1. Tại màn hình danh sách định tuyến, nhấn biểu tượng **Xóa** tại cột Hành động của tuyến cần xóa.
2. Nhấn **Xóa** để xác nhận xóa.
3. Thực hiện Áp dụng để lưu thay đổi

---

## 6.3. Chính sách chính sách NAT (NAT Policies)
Cấu hình các luật dịch địa chỉ (Network Address Translation) để chuyển đổi địa chỉ IP nguồn/đích khi đi qua Firewall.

### 6.3.1. Xem danh sách chính sách NAT
Liệt kê các luật dịch địa chỉ đang có hiệu lực, bao gồm cả thứ tự ưu tiên của chúng.

**Các bước thực hiện:**
1. Truy cập vào menu **Quản trị thiết bị** > **Chính sách NAT**.
2. Danh sách hiển thị: **Loại NAT** (SNAT, DYNAT...), **Nguồn**, **Đích**, **Dịch** (Địa chỉ sau khi dịch) và trạng thái **Kích hoạt**.
3. Tại cột Hành động, bạn có thể sử dụng các biểu tượng mũi tên để thay đổi thứ tự ưu tiên của chính sách.

---

### 6.3.2. Tạo mới chính sách NAT
Định nghĩa một luật dịch địa chỉ mới dựa trên các tiêu chí về vùng mạng và địa chỉ IP.

**Các bước thực hiện:**
1. Nhấp vào nút **+ Thêm**.
2. Trên cửa sổ **Tạo chính sách NAT**, điền các thông tin:
    - **Thông tin chung:** 
        - **Tên (*)**: Tên của luật NAT.
        - **Mô tả**: Mô tả mục đích.
        - **Loại NAT (*)**: Chọn loại NAT:
            - **SNAT (Source NAT):** Dịch IP nguồn. Thường dùng để chia sẻ một địa chỉ IP Public cho nhiều máy tính trong mạng LAN truy cập Internet.
            - **DNAT (Destination NAT):** Dịch IP đích. Thường dùng để public một máy chủ nội bộ (như Web, Mail) ra ngoài Internet (Port Forwarding).
            - **Dynamic NAT**: Dịch IP nguồn động. Sử dụng pool IP để dịch địa chỉ IP nguồn của các máy tính trong mạng LAN truy cập Internet.
            - **Masquerade**: Dịch IP nguồn động, sử dụng IP của cổng WAN làm địa chỉ sau khi dịch.
            - **Exclude**: Loại trừ một số địa chỉ IP khỏi việc dịch NAT.
            - **PAT (Port Address Translation):** Dịch IP nguồn động, sử dụng pool IP để dịch địa chỉ IP nguồn của các máy tính trong mạng LAN truy cập Internet.
        - **Kích hoạt, Ghi log**: Bật luật và ghi log hoạt động.
    - **Điều kiện khớp:** Xác định luồng dữ liệu nào sẽ bị áp dụng luật này.
        - **Vùng mạng nguồn/đích:** Chọn vùng mạng nguồn và đích.
        - **Địa chỉ nguồn/đích:** Chọn nhóm địa chỉ nguồn và đích hợp lệ.
        - **Giao thức**: Chọn giao thức (TCP/UDP/ICMP/Any).
        - **Cổng đích**: Chọn cổng đích (Number hoặc Service).
        - **Dịch vụ**: Chọn dịch vụ.
    - **Dịch địa chỉ:**
        - **Pool nguồn:** Chọn dải IP sau khi dịch (đối với SNAT).
        - **Dải cổng nguồn:** Giới hạn dải cổng nguồn sẽ được sử dụng.
3. Nhấn **Tạo** để hoàn tất.

---

### 6.3.3. Cập nhật chính sách NAT
Thay đổi cấu hình hoặc điều chỉnh thứ tự ưu tiên (thứ tự từ trên xuống dưới) của các luật NAT.

**Các bước thực hiện:**
1. Tại màn hình danh sách chính sách NAT, nhấn biểu tượng **Sửa** tại cột Hành động của chính sách cần thay đổi.
2. Cập nhật các thông số và nhấn **Cập nhật** để hoàn tất.

---

### 6.3.4. Áp dụng chính sách NAT
Kích hoạt các thay đổi về chính sách NAT để Firewall bắt đầu thực hiện việc dịch địa chỉ cho lưu lượng mạng.

**Các bước thực hiện:**
1. Kiểm tra kỹ thứ tự các luật NAT (luật nằm trên sẽ được ưu tiên kiểm tra trước).
2. Nhấn nút **Áp dụng** ở thanh menu của tính năng.
3. Cửa sổ **Áp dụng chính sách NAT** hiện ra.
4. Nhập nội dung thay đổi vào ô **Ghi chú thay đổi** để lưu vết quản trị.
5. Nhấn **Kiểm tra thay đổi** để xem trước các thay đổi.
6. Nhấn **Áp dụng ngay** trên cửa sổ **Xem trước thay đổi** để áp dụng cấu hình xuống thiết bị.

---

## 6.4. Giải mã TLS (TLS Decrypt)
Cho phép Firewall đóng vai trò như một Proxy đứng giữa (Man-in-the-Middle) để giải mã lưu lượng được mã hóa TLS. Sau khi giải mã, Firewall có thể kiểm tra nội dung bên trong nhằm phát hiện các mối đe dọa ẩn, sau đó mã hóa lại và gửi đi. Việc này giúp ngăn chặn việc hacker lợi dụng kết nối HTTPS để qua mặt hệ thống bảo vệ.

### 6.4.1. Xem danh sách TLS Decrypt
Theo dõi các chính sách giải mã lưu lượng HTTPS/TLS đang được cấu hình trên hệ thống.

**Các bước thực hiện:**
1. Truy cập vào menu **Cấu hình mạng** > **Giải mã TLS**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
    - **Hành động**: Hành động giải mã hay không giải mã (Decrypt/No Decrypt).
    - **Tên**: Tên của luật giải mã TLS.
    - **Mô tả**: Mô tả mục đích.
    - **Nguồn**: Vùng mạng nguồn.
    - **Đích**: Vùng mạng đích.
    - **Kích hoạt**: Trạng thái bật/tắt.

---

### 6.4.2. Tạo mới TLS Decrypt
Thiết lập luật để xác định loại lưu lượng nào sẽ được giải mã (Decrypt) để kiểm tra sâu.

**Các bước thực hiện:**
1. Trên màn hình danh sách chính sách giải mã TLS, nhấp vào nút **+ Thêm** để tạo mới.
2. Trên cửa sổ **Tạo chính sách giải mã TLS Decrypt**, điền các thông tin:
    - **Thông tin chung:** 
        - **Tên (*):** Tên của chính sách giải mã TLS.
        - **Hành động (*):** Chọn hành động được thực hiện của chính sách.
        - **Mô tả:** Mô tả mục đích của chính sách.
        - **Kích hoạt, Ghi log:** Bật luật và ghi log hoạt động.
    - **Điều kiện khớp:** Xác định luồng dữ liệu nào sẽ bị áp dụng chính sách này.
        - **Vùng mạng nguồn/đích:** Chọn vùng mạng nguồn và đích.
        - **Địa chỉ nguồn/đích:** Chọn nhóm địa chỉ nguồn và đích hợp lệ.
        - **Giao thức:** Chọn giao thức (TCP/UDP/ICMP/Any).
        - **Cổng đích:** Chọn cổng đích (Number hoặc Service).
3. Nhấn **Tạo** để hoàn tất.

---

### 6.4.3. Quản lý Certificates (Chứng chỉ)
Quản lý các chứng chỉ CA (Certificate Authority) dùng để giải mã và mã hóa lại lưu lượng. Để trình duyệt của người dùng nội bộ không cảnh báo bảo mật, bạn cần cài đặt CA của Firewall lên các máy trạm (Trust CA).

**Các bước thực hiện:**
1. Trên màn hình danh sách chính sách giải mã TLS, nhấp vào nút **Quản lý CA**.
2. Danh sách chứng chỉ hiện ra, bạn có thể xem tên, mô tả hoặc nhấn **+ Thêm** để tải lên chứng chỉ mới.

---

### 6.4.4. Quản lý Forged Certificates
Xem danh sách các chứng chỉ giả lập được Firewall tự động sinh ra trong quá trình giải mã kết nối tới các trang web HTTPS.

**Các bước thực hiện:**
1. Trên màn hình danh sách chính sách TLS Decrypt, nhấp vào nút **Chứng chỉ giả mạo**.
2. Hệ thống sẽ liệt kê các chứng chỉ giả lập đang được lưu trữ trên thiết bị.

---

### 6.4.5. Áp dụng cấu hình giải mã TLS
Đẩy chính sách giải mã TLS xuống thiết bị để bắt đầu quá trình kiểm soát lưu lượng mã hóa.

**Các bước thực hiện:**
1. Trên màn hình danh sách chính sách giải mã TLS, nhấp vào nút **Áp dụng**.
2. Tại cửa sổ **Áp dụng chính sách giải mã TLS**, nhập thông tin mô tả thay đổi vào ô **Ghi chú thay đổi**.
3. Nhấn nút **Kiểm tra thay đổi** để hệ thống kiểm tra các thay đổi.
4. Cửa sổ **Xem trước thay đổi** hiện ra, nhấn vào **Áp dụng ngay** để xác nhận áp dụng xuống thiết bị.

---

# Chương 7: Tích hợp hệ thống (Integration)

Chương này hướng dẫn người quản trị cấu hình tích hợp Firewall với các hệ thống giám sát và phân tích an toàn thông tin bên ngoài, bao gồm SIEM (Security Information and Event Management), SOC (Security Operations Center), và nền tảng Threat Intelligence (TI Platform). Việc tích hợp giúp tập trung hóa nhật ký (log) và nâng cao khả năng phát hiện, phản hồi sự cố.

## 7.1. Tích hợp SIEM

Cho phép cấu hình đẩy log hệ thống và log sự kiện bảo mật từ Firewall đến hệ thống quản lý thông tin và sự kiện bảo mật (SIEM) thông qua giao thức Syslog (TCP/UDP) hoặc API.

### 7.1.1. Xem danh sách cấu hình SIEM
Giúp quản trị viên tra cứu và theo dõi trạng thái các kết nối tích hợp đến máy chủ SIEM.

**Các bước thực hiện:**
1. Truy cập vào menu **Tích hợp hệ thống** > **SIEM**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
   - **Trạng thái:** Trạng thái hoạt động của cấu hình.
   - **Tên:** Tên định danh của cấu hình kết nối SIEM.
   - **Nhà cung cấp:** Tên nhà cung cấp hoặc nền tảng SIEM.
   - **Phương thức chuyển tiếp:** Phương thức đẩy dữ liệu.
   - **Nguồn:** Nguồn dữ liệu được gửi đi.
   - **URL:** Đường dẫn hoặc địa chỉ IP của máy chủ SIEM nhận log.
   - **Access Token:** Trạng thái thiết lập mã token truy cập.
   - **Ngày tạo:** Thời gian tạo cấu hình.
   - **Hành động:** Các thao tác có thể thực hiện.
3. Có thể sử dụng thanh tìm kiếm để tra cứu nhanh cấu hình theo tên hoặc địa chỉ URL.

### 7.1.2. Tạo mới cấu hình SIEM
Cho phép quản trị viên thêm một kết nối mới tới hệ thống SIEM để tự động đẩy các log sự kiện.

**Các bước thực hiện:**
1. Tại màn hình danh sách SIEM Configuration, nhấp vào nút **Thêm mới**.
2. Trên cửa sổ tạo mới, điền các thông tin sau:
   - **Tên (*):** Nhập tên định danh cho cấu hình SIEM (bắt buộc).
   - **Nhà cung cấp:** Lựa chọn nhà cung cấp hệ thống SIEM.
   - **URL SIEM (*):** Nhập địa chỉ URL của máy chủ SIEM.
   - **Cổng:** Nhập cổng kết nối. Tích chọn **Sử dụng TLS** nếu sử dụng đường truyền mã hóa.
   - **Phương thức chuyển tiếp:** Lựa chọn phương thức đẩy dữ liệu.
   - **Loại xác thực:** Lựa chọn kiểu xác thực.
   - **Access Token:** Nhập mã Access Token dùng để xác thực. Có thể ấn vào biểu tượng con mắt để xem mã.
   - **Xác thực nguồn gốc:** Lựa chọn chế độ ký số (**Signing Mode**) để định danh nguồn dữ liệu và bảo vệ tính toàn vẹn.
   - **Nguồn chuyển tiếp:** Chọn các nguồn dữ liệu cần đẩy bằng cách tích chọn:
     - **Gửi alerts:** Gửi các cảnh báo bảo mật từ hệ thống.
     - **Gửi events:** Gửi các nhật ký kiểm toán.
   - **Bộ lọc alerts:** Thiết lập các bộ lọc cảnh báo (chỉ hiển thị và áp dụng khi chọn Gửi cảnh báo):
     - **Mức độ alerts:** Chọn các mức độ cảnh báo cần gửi (Low, Medium, High).
     - **Lý do khớp:** Chọn lý do phù hợp hoặc để trống.
     - **Source IP / CIDR:** Nhập danh sách IP hoặc dải IP nguồn (mỗi IP/CIDR một dòng). Để trống nếu cho phép tất cả các IP.
3. Nhấn **Kiểm tra kết nối** để kiểm tra kết nối với máy chủ SIEM.
4. Nhấn **Lưu** để lưu và áp dụng cấu hình.

### 7.1.3. Sửa cấu hình SIEM
Hỗ trợ thay đổi các thông số kết nối của một cấu hình SIEM đã tồn tại khi có sự thay đổi về hạ tầng hoặc yêu cầu hệ thống.

**Các bước thực hiện:**
1. Tại màn hình danh sách, nhấp vào biểu tượng thao tác (**...**) ở cột **Hành động** và chọn sửa cấu hình tương ứng.
2. Cập nhật các thông tin kết nối như URL, cổng (Port), mã xác thực (Access Token), hoặc các bộ lọc cảnh báo cần gửi.
3. Nhấn **Kiểm tra kết nối** để kiểm tra lại nếu cần thiết.
4. Nhấn **Lưu** để lưu các thay đổi.

---

## 7.2. Tích hợp SOC

Tính năng này hỗ trợ tích hợp với hệ thống Security Operations Center (SOC) để phối hợp xử lý sự cố, đẩy cảnh báo (alerts) ở thời gian thực.

### 7.2.1. Xem danh sách cấu hình SOC
Cung cấp cái nhìn tổng quan về các cấu hình kết nối đã thiết lập với hệ thống SOC.

**Các bước thực hiện:**
1. Truy cập menu **Tích hợp hệ thống** > **SOC**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
   - **Trạng thái:** Trạng thái hoạt động của cấu hình.
   - **Tên:** Tên định danh của cấu hình kết nối SOC.
   - **Nhà cung cấp:** Tên nhà cung cấp.
   - **Phương thức gửi:** Phương thức đẩy dữ liệu sang SOC.
   - **Đích gửi:** Địa chỉ đích hoặc đường dẫn URL nhận dữ liệu của hệ thống SOC.
   - **TLS:** Trạng thái mã hóa đường truyền.
   - **Ngày tạo:** Thời gian tạo cấu hình.
   - **Hành động:** Các thao tác có thể thực hiện.
3. Có thể sử dụng thanh tìm kiếm để tra cứu nhanh cấu hình theo tên hoặc địa chỉ đích.

### 7.2.2. Tạo mới cấu hình SOC
Cho phép thiết lập một kênh kết nối mới tới trung tâm điều hành an toàn thông tin (SOC) để đẩy các cảnh báo bảo mật theo thời gian thực.

**Các bước thực hiện:**
1. Tại màn hình danh sách cấu hình SOC, nhấp vào nút **Thêm mới**.
2. Điền các thông tin kết nối SOC:
   - **Tên (*):** Nhập tên cấu hình SOC (bắt buộc).
   - **Nhà cung cấp:** Lựa chọn nhà cung cấp SOC.
   - **Host hoặc URL:** Nhập địa chỉ Host hoặc URL của hệ thống SOC.
   - **Cổng:** Nhập cổng kết nối. Tích chọn **Sử dụng TLS** nếu sử dụng kết nối mã hóa.
   - **Phương thức gửi:** Lựa chọn phương thức gửi dữ liệu.
   - **Giao thức Syslog:** Lựa chọn giao thức truyền tải cho Syslog. Tích chọn **Sử dụng TLS** nếu sử dụng kết nối mã hóa.
   - **Bộ lọc Alerts:** Thiết lập các bộ lọc cho cảnh báo:
     - **Mức độ cảnh báo:** Chọn các mức độ cảnh báo cần gửi. Để trống để gửi tất cả.
     - **Lý do khớp:** Chọn lý do phù hợp.
     - **Source IP/CIDR:** Nhập danh sách IP hoặc dải IP nguồn. Để trống nếu cho phép tất cả các IP.
   - **Ưu tiên gửi cảnh báo:** Tích chọn **Kích hoạt** để thiết lập gửi cảnh báo theo mức độ ưu tiên.
   - **Xác thực nguồn gốc:** Lựa chọn chế độ ký số (**Chế độ ký**) để định danh nguồn dữ liệu.
3. Nhấn nút **Kiểm tra kết nối** để kiểm tra tính hợp lệ và sẵn sàng của kết nối tới SOC.
4. Nhấn **Lưu** để lưu thiết lập.

### 7.2.3. Sửa cấu hình SOC
Cho phép cập nhật lại thông tin kết nối, cấu hình bộ lọc hoặc giao thức truyền tải khi hệ thống SOC có sự thay đổi.

**Các bước thực hiện:**
1. Tại danh sách SOC Configuration, nhấp vào biểu tượng thao tác (**...**) ở cột **Hành động** tương ứng với cấu hình cần thay đổi và chọn sửa.
2. Thay đổi cấu hình như Host/URL, cổng, phương thức gửi hoặc bộ lọc cảnh báo.
3. Nhấn **Kiểm tra kết nối** để kiểm tra lại nếu cần thiết.
4. Nhấn **Lưu** để hoàn tất chỉnh sửa.

---

## 7.3. Tích hợp Threat Intelligence (TI Platform)

Tích hợp với các nền tảng phân tích mã độc và thông tin tình báo mối đe dọa (Threat Intelligence) để hệ thống tự động kiểm tra, đánh giá mức độ rủi ro của các IP, URL, hoặc File đáng ngờ.

### 7.3.1. Xem danh sách nền tảng TI (TI Platforms)
Giúp theo dõi các nền tảng phân tích mã độc và tình báo mối đe dọa đang được hệ thống sử dụng để làm giàu dữ liệu an ninh.

**Các bước thực hiện:**
1. Truy cập menu **Tích hợp hệ thống** > **Nền tảng TI**.
2. Tại màn hình danh sách, bạn có thể xem các thông tin:
   - **Tên:** Tên của nền tảng Threat Intelligence.
   - **Bộ sưu tập:** Các tập dữ liệu được thu thập.
   - **Trạng thái:** Trạng thái hoạt động của cấu hình tích hợp.
   - **Lần đồng bộ cuối:** Trạng thái của lần đồng bộ dữ liệu gần nhất.
   - **Hành động:** Các thao tác có thể thực hiện.
3. Có thể sử dụng thanh tìm kiếm để tra cứu nhanh nền tảng theo tên.

### 7.3.2. Thêm mới nền tảng TI
Thêm một nhà cung cấp dữ liệu Threat Intelligence mới (thông qua giao thức TAXII 2.1) để nâng cao khả năng phát hiện mối đe dọa.

**Các bước thực hiện:**
1. Tại tab **Nền tảng** của màn hình TI Platforms, nhấp vào nút **Thêm nền tảng**.
2. Khai báo các thông số kết nối nền tảng TI:
   - **Tên:** Nhập tên định danh cho nền tảng.
   - **Base URL:** Đường dẫn API gốc (TAXII 2.1 API root URL) của nền tảng cung cấp.
   - **Chế độ bộ sưu tập:** Lựa chọn chế độ thu thập dữ liệu.
   - **Chu kỳ đồng bộ (phút):** Chu kỳ tự động đồng bộ dữ liệu (tính bằng phút).
   - **Mô tả:** Nhập mô tả cho nền tảng.
   - **Kích hoạt:** Tích chọn để kích hoạt tính năng kết nối và đồng bộ dữ liệu.
   - **Loại xác thực:** Lựa chọn phương thức xác thực.
3. Nhấn **Lưu** để lưu thiết lập.

### 7.3.3. Sửa nền tảng TI
Dùng để thay đổi khóa xác thực, cập nhật địa chỉ hoặc thay đổi chu kỳ đồng bộ với nền tảng TI.

**Các bước thực hiện:**
1. Trong danh sách nền tảng TI, nhấp vào biểu tượng thao tác (**...**) ở cột **Hành động** của nền tảng cần sửa và chọn chỉnh sửa.
2. Cập nhật các thông tin như Base URL, chế độ thu thập (Collection Mode), chu kỳ đồng bộ (Poll Interval) hoặc phương thức xác thực (Auth Type).
3. Nhấn **Lưu** để lưu lại các thay đổi.

### 7.3.4. Xem lịch sử yêu cầu (Request history)
Hỗ trợ quản trị viên kiểm tra và theo dõi các truy vấn cụ thể đã được hệ thống Firewall gửi lên nền tảng TI nhằm đánh giá hiệu suất hoặc gỡ lỗi kết nối.

**Các bước thực hiện:**
1. Tại menu quản lý nền tảng TI, chuyển sang tab (hoặc nhấn nút) **Lịch sử yêu cầu**.
2. Tại màn hình lịch sử, bạn có thể xem các thông tin:
   - **Thời gian:** Thời điểm chính xác hệ thống thực hiện truy vấn.
   - **Nền tảng:** Nền tảng Threat Intelligence được truy vấn.
   - **Loại yêu cầu:** Loại yêu cầu.
   - **URL:** Đường dẫn API được truy vấn.
   - **Trạng thái:** Mã trạng thái trả về từ api.
   - **Thời lượng:** Thời gian thực hiện truy vấn.
   - **Kết quả:** Trạng thái truy vấn thành công hay thất bại
3. Có thể dùng thanh tìm kiếm để lọc và tìm lại kết quả truy vấn của một IP hoặc File cụ thể.

---



