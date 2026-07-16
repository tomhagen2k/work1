# Mô tả các tính năng của phần mềm Firewall

Dưới đây là bảng tổng hợp các chức năng của hệ thống Firewall với mức độ mô tả chi tiết từng thao tác và trường dữ liệu.

| STT | Chức năng | Chức năng con | Mô tả chức năng |
|:---:|---|---|---|
| 1 | **Đăng nhập** | Đăng nhập hệ thống | Cho phép quản trị viên đăng nhập vào hệ thống bằng Tên đăng nhập và Mật khẩu truyền thống, hoặc xác thực thông qua Chứng chỉ máy khách (mTLS). |
| 2 | **Cấu hình chung** | Cấu hình tham số chung | Cho phép thiết lập các thông số hệ thống: Thời gian duy trì phiên kết nối, Độ phức tạp của mật khẩu (yếu, trung bình, mạnh), Phương thức xác thực, Thời gian máy chủ (Tự động/Thủ công, Múi giờ). |
| | | Quản trị truy cập | Cho phép giới hạn IP có quyền kết nối vào trang quản trị và giới hạn số lượng phiên kết nối đồng thời. |
| 3 | **Quản lý Bản quyền** | Xem thông tin bản quyền | Cho phép xem các thông tin chi tiết về giấy phép: Tên khách hàng, Tên công ty, Tên sản phẩm, ID bản quyền, Băng thông tối đa và Ngày hết hạn. |
| 4 | **Quản lý người dùng** | Danh sách người dùng | Cho phép xem danh sách người dùng gồm: Tên tài khoản, Họ và tên, Vai trò, Trạng thái (Kích hoạt/Không kích hoạt). |
| | | Tìm kiếm người dùng | Cho phép tìm kiếm tài khoản theo tiêu chí: Tên tài khoản, Họ và tên. |
| | | Tạo mới người dùng | Cho phép tạo tài khoản theo các trường thông tin: Tên tài khoản, Mật khẩu, Họ và tên, Email/Số điện thoại, Định danh chứng chỉ (SAN URI), Vai trò, Trạng thái. |
| | | Cập nhật người dùng | Cho phép sửa thông tin cá nhân, thay đổi vai trò hoặc chuyển trạng thái Kích hoạt/Không kích hoạt của người dùng. |
| | | Đặt lại mật khẩu | Cho phép sinh mật khẩu ngẫu nhiên để cấp lại cho người dùng. |
| 5 | **Quản lý nhóm quyền** | Danh sách nhóm quyền | Cho phép xem danh sách vai trò gồm: Tên vai trò, Phân quyền, Trạng thái. |
| | | Tìm kiếm nhóm quyền | Cho phép tìm kiếm vai trò theo tiêu chí: Tên vai trò, Tên quyền hạn. |
| | | Cập nhật nhóm quyền | Cho phép cấp quyền chi tiết trên từng màn hình (Xem, Xóa, Tạo, Sửa, Xem lịch sử, Áp dụng, Thay đổi trạng thái). Cho phép bật/tắt trạng thái hoạt động của nhóm quyền. |
| | | Xóa nhóm quyền | Cho phép xóa một nhóm quyền không còn được sử dụng khỏi hệ thống. |
| 6 | **Quản lý API Key** | Danh sách API Key | Cho phép xem danh sách API Key gồm: Tên, Chủ sở hữu, Trạng thái, Ngày hết hạn. |
| | | Tạo mới API Key | Cho phép sinh khóa với các trường: Người dùng sở hữu, Tên Key, Ngày hết hạn, Đối tượng và Quyền hạn cụ thể. |
| | | Quản trị API Key | Cho phép Khóa (thu hồi quyền) hoặc Xóa API Key. |
| 7 | **Cập nhật hệ thống** | Cập nhật phiên bản | Cho phép kiểm tra và nâng cấp thiết bị lên phiên bản Firmware mới nhất. |
| | | Lịch sử cập nhật | Cho phép xem lịch sử cập nhật gồm: Thời gian, Phiên bản, Trạng thái, Kết quả. |
| | | Cấu hình Server | Cho phép thêm mới Server cập nhật với: Tên, URL Server, Access Token. |
| 8 | **Nhật ký hệ thống** | Danh sách nhật ký | Cho phép xem lịch sử thao tác gồm: Hành động, Kết quả, Tính năng, Người dùng, Lý do thất bại, Thời gian. |
| | | Tìm kiếm và lọc | Cho phép lọc và xuất dữ liệu nhật ký theo Thời gian bắt đầu/kết thúc, Kết quả, Tính năng, Người dùng. |
| 9 | **Quản lý thiết bị** | Danh sách thiết bị | Cho phép xem danh sách gồm: Tên thiết bị, IP, Trạng thái, Phiên bản, Quy tắc (BL-IP/Domain/IPS), Kết nối cuối. |
| | | Thêm mới thiết bị | Cho phép đăng ký thiết bị theo các trường: Tên thiết bị, IP, Số sê-ri, Cổng gRPC, Nhóm bảo mật. |
| | | Danh sách giao diện | Cho phép xem trạng thái các cổng mạng của thiết bị: Tên, Trạng thái (Up/Down), Loại, Mã Vlan, Chế độ (Routed/Bridge), MAC, IP, Vùng bảo mật. |
| | | Xem chi tiết thiết bị | Cung cấp thông số cơ bản, Phần cứng (CPU, Bộ nhớ, Lưu trữ), Hiệu năng (Băng thông, Số phiên tối đa) và cấu hình Bảo mật. |
| | | Gán hồ sơ bảo vệ | Cho phép chọn thiết bị và gán các cấu hình bảo vệ tương ứng. |
| | | Tác vụ khác | Cho phép thực hiện: Cài đặt sao lưu tự động, Khôi phục cấu hình, Cập nhật thông tin và Cấp lại NATS. |
| 10 | **Giám sát thiết bị** | Giám sát chung | Cho phép xem số liệu sức khỏe toàn hệ thống: Cảnh báo hoạt động, CPU, Bộ nhớ, Đĩa, Tải trung bình, Mạng, Nhiệt độ, Uptime. |
| | | Giám sát chi tiết | Cung cấp các biểu đồ tài nguyên và cảnh báo chuyên sâu đối với một thiết bị cụ thể. |
| 11 | **Cảnh báo bảo mật** | Danh sách cảnh báo | Cho phép xem sự kiện gồm: Thiết bị, Chính sách khớp, Gói tin, Mức độ ảnh hưởng, Hành động, Nhóm, Lý do khớp, Thời gian. |
| | | Tìm kiếm & Bộ lọc | Cho phép tìm kiếm bằng từ khóa, lọc theo Mức độ nghiêm trọng, Lý do cảnh báo, Khoảng thời gian và xuất file. |
| | | Xem chi tiết cảnh báo | Cho phép xem sâu 3 nhóm thông tin: Chi tiết cảnh báo chung, Chi tiết kết nối IP và Nội dung quy tắc giải thích luật vi phạm. |
| 12 | **Giám sát Session** | Danh sách Session | Cho phép xem các phiên làm việc đang diễn ra: Phiên mạng, Gói đầu, Gói cuối, Giao thức, Dữ liệu, Tổng số gói. |
| | | Tìm kiếm nâng cao | Cho phép dùng từ khóa truy vấn nâng cao để lọc phiên kết hợp với bộ lọc thời gian cụ thể. |
| 13 | **Giám sát Kết nối** | Sơ đồ kết nối | Cung cấp giao diện trực quan (Node-link) thể hiện luồng kết nối giữa các IP thực thể mạng, cho phép kéo thả nút và xem chi tiết mũi tên. |
| | | Bộ lọc kết nối | Cho phép vẽ sơ đồ thông qua các tham số: Tìm kiếm biểu thức, Khoảng thời gian, Kích thước tối đa, Tổng kết nối tối thiểu, Trường nguồn/đích. |
| 14 | **Giám sát ứng dụng** | Thống kê tổng quan | Cho phép xem biểu đồ tiêu thụ băng thông: Tổng số phiên, Tổng dung lượng, Tổng số gói tin ứng với ứng dụng đã chọn. |
| | | Bảng danh sách chi tiết | Hiển thị các IP truy cập ứng dụng: Địa chỉ IP, ASN, Số phiên, Dữ liệu, Số gói. Có thể lọc theo thời gian và ứng dụng (VD: Telegram). |
| 15 | **Điều tra (Hunting)** | Tạo tác vụ tìm kiếm | Cho phép thiết lập tham số: Agent, Thời gian chờ, Snippet phiên, Thời gian bắt đầu/kết thúc, Bộ lọc phiên (5-tuple). |
| | | Phương thức tìm kiếm | Cho phép cấu hình Tìm kiếm đơn giản (ASCII, Regex, Hex) hoặc Bộ lọc nâng cao (cây trực quan logic AND/OR, nhập mã JSON, Bản ghi index). |
| | | Lịch sử tìm kiếm | Cho phép theo dõi tiến trình tìm kiếm, xem trạng thái, xem chi tiết kết quả trả về bằng định dạng JSON và chạy lại (Restart) các tác vụ cũ. |
| 16 | **Đối tượng Địa chỉ** | Danh sách nhóm IP | Cho phép xem danh sách địa chỉ: Tên nhóm, Mô tả, Dải IP & Địa chỉ. Tìm kiếm theo tên hoặc IP. |
| | | Tạo nhóm địa chỉ | Cho phép tạo nhóm địa chỉ theo các trường: Tên nhóm, CIDR, FQDN (tên miền), Mã quốc gia, Nhóm con, Mô tả. |
| | | Sửa nhóm địa chỉ | Cho phép thay đổi thông tin hoặc bổ sung thêm địa chỉ vào một nhóm đã tồn tại. |
| | | Xóa nhóm địa chỉ | Cho phép xóa các nhóm địa chỉ không còn sử dụng khỏi hệ thống. |
| 17 | **Đối tượng Máy chủ** | Danh sách máy chủ | Cho phép xem danh sách và tìm kiếm các máy chủ/người dùng: Username, Email, Full Name, Status. |
| | | Xem chi tiết máy chủ | Cung cấp thông tin bổ sung như Thời gian tạo (Created At) và Thời gian cập nhật (Updated At). |
| | | Sửa máy chủ | Cho phép chỉnh sửa thông tin cá nhân và thay đổi trạng thái (Active/Inactive) của máy chủ. |
| | | Xóa máy chủ | Cho phép xóa bỏ bản ghi máy chủ khỏi danh sách quản lý. |
| 18 | **Vùng bảo mật** | Danh sách vùng bảo mật | Cho phép xem và quản lý các vùng mạng: ID, Tên vùng, Mô tả, Color (Màu sắc đại diện). |
| | | Tạo vùng bảo mật | Cho phép thêm vùng mạng mới phục vụ phân tách lưu lượng với các trường: ID, Tên, Mô tả, Color. |
| | | Sửa vùng bảo mật | Cho phép cập nhật thông tin tên, mô tả hoặc thay đổi màu sắc vùng bảo mật. |
| 19 | **Dịch vụ & Nhóm** | Danh sách dịch vụ | Cho phép xem danh sách các giao thức mạng: Tên dịch vụ, Loại, Giao thức, Cổng đích, Cổng nguồn, Mô tả. |
| | | Tạo dịch vụ | Cho phép tạo theo các trường: Tên dịch vụ, Nhóm thiết bị, Giao thức lõi (TCP/UDP/ICMP), Cổng đích, Cổng nguồn, Mô tả. |
| | | Sửa/Xóa dịch vụ | Cho phép chỉnh sửa tham số dải cổng hoặc gỡ bỏ dịch vụ khỏi hệ thống. |
| | | Quản lý Nhóm dịch vụ | Cho phép Tạo, Xem, Sửa danh sách các nhóm dịch vụ để gộp chung nhiều dịch vụ thành viên, phục vụ áp dụng Policy linh hoạt. |
