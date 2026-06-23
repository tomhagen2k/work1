# Hướng dẫn sử dụng: Chương 4 - Quản lý Đối tượng (Policy Objects)

Chương này hướng dẫn cách quản lý các đối tượng dùng chung trong hệ thống như địa chỉ IP, máy chủ, dịch vụ, ứng dụng và các vùng bảo mật. Các đối tượng này sau khi được định nghĩa sẽ được sử dụng để xây dựng các chính sách bảo mật (Security Policies).

---

## 4.1. Đối tượng Địa chỉ (Addresses)
Quản lý các nhóm địa chỉ IP, dải mạng (CIDR), tên miền (FQDN) hoặc mã quốc gia để sử dụng làm nguồn hoặc đích trong các luật bảo mật.

### 4.1.1. Xem danh sách địa chỉ
Giúp quản trị viên tra cứu, tìm kiếm và kiểm tra thông tin của các nhóm địa chỉ hiện có trong hệ thống.

**Các bước thực hiện:**
1. Truy cập vào menu **Policy Objects** > **Addresses**.
2. Danh sách hiển thị các thông tin: **Group Name**, **Description**, **CIDR & Address**.
3. Sử dụng thanh tìm kiếm ở phía trên để lọc các nhóm địa chỉ theo tên.

### 4.1.2. Tạo mới nhóm địa chỉ
Định nghĩa một tập hợp các địa chỉ mạng mới để sử dụng trong cấu hình chính sách.

**Các bước thực hiện:**
1. Tại màn hình danh sách địa chỉ, nhấn vào nút **+ ADD GROUP** ở góc trên bên phải.
2. Tại cửa sổ **Create Address Group** hiện ra, điền các thông tin sau:
    - **Group Name (*):** Tên gợi nhớ cho nhóm địa chỉ.
    - **CIDR Address:** Nhập địa chỉ IP hoặc dải mạng (Ví dụ: 192.168.1.0/24). Nhấn Enter để thêm nhiều địa chỉ.
    - **FQDN Address:** Nhập tên miền (Ví dụ: google.com).
    - **Country Codes:** Nhập mã quốc gia (Ví dụ: VN, US).
    - **Subgroups:** Chọn các nhóm địa chỉ con đã có sẵn.
    - **Description:** Mô tả chi tiết cho nhóm.
3. Nhấn **CREATE** để hoàn tất.
*Lưu ý: Phải nhập ít nhất một trong ba trường: CIDR, FQDN hoặc Country Code.*

### 4.1.3. Cập nhật nhóm địa chỉ
Thay đổi thông tin hoặc bổ sung địa chỉ vào một nhóm đã tồn tại.

**Các bước thực hiện:**
1. Tại màn hình danh sách địa chỉ, tìm nhóm cần sửa và nhấn biểu tượng **Sửa** tại cột Actions.
2. Thực hiện thay đổi các thông tin cần thiết tại cửa sổ cập nhật.
3. Nhấn **UPDATE** để lưu lại các thay đổi.

### 4.1.4. Xóa nhóm địa chỉ
Gỡ bỏ các nhóm địa chỉ không còn sử dụng khỏi hệ thống.

**Các bước thực hiện:**
1. Tại màn hình danh sách địa chỉ, nhấn biểu tượng **Xóa** tại cột Actions của nhóm địa chỉ muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Are you sure you want to delete IP group...?"), nhấn **CONFIRM** để hoàn tất việc xóa.

---

## 4.2. Đối tượng Máy chủ (Hosts)
Quản lý thông tin các máy chủ hoặc tài khoản người dùng được định danh, thường được đồng bộ tự động từ hệ thống LDAP/Active Directory.

### 4.2.1. Xem danh sách máy chủ
Theo dõi và kiểm tra trạng thái hoạt động của các máy chủ được quản lý.

**Các bước thực hiện:**
1. Truy cập vào menu **Policy Objects** > **Hosts**.
2. Xem danh sách các máy chủ với thông tin: **Username**, **Email**, **Full Name**, **Status** (Active/Inactive).

### 4.2.2. Xem chi tiết máy chủ
Xem thông tin định danh đầy đủ và thời điểm cập nhật của máy chủ.

**Các bước thực hiện:**
1. Tại màn hình danh sách máy chủ, nhấn biểu tượng **Xem** tại cột Actions của máy chủ cần xem.
2. Cửa sổ **LDAP Account Details** sẽ hiển thị các thông tin bao gồm thời gian tạo (**Created At**) và thời gian cập nhật cuối (**Updated At**).

### 4.2.3. Cập nhật máy chủ
Chỉnh sửa thông tin cơ bản hoặc trạng thái hoạt động của máy chủ.

**Các bước thực hiện:**
1. Tại màn hình danh sách máy chủ, nhấn biểu tượng **Sửa** tại cột Actions của máy chủ muốn sửa.
2. Thay đổi thông tin tại cửa sổ cập nhật và nhấn **UPDATE** để hoàn tất.

### 4.2.4. Xóa máy chủ
Xóa bản ghi máy chủ khỏi danh sách quản trị của Firewall.

**Các bước thực hiện:**
1. Tại màn hình danh sách máy chủ, nhấn biểu tượng **Xóa** tại cột Actions của máy chủ muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Are you sure you want to delete user...?"), nhấn **CONFIRM** để hoàn tất việc xóa.

---

## 4.3. Đối tượng Vùng bảo mật (Security Zones)
Định nghĩa các vùng mạng có mức độ tin cậy khác nhau để áp dụng chính sách lọc lưu lượng giữa các vùng.

### 4.3.1. Xem danh sách vùng bảo mật
Theo dõi các vùng bảo mật đã được định nghĩa và màu sắc nhận diện tương ứng.

**Các bước thực hiện:**
1. Truy cập vào menu **Policy Objects** > **Security Zones**.
2. Theo dõi danh sách gồm: **ID**, **Zone Name**, **Description** và **Color** (Màu sắc đại diện).

### 4.3.2. Tạo mới vùng bảo mật
Tạo thêm vùng mạng mới để phân tách lưu lượng.

**Các bước thực hiện:**
1. Tại màn hình danh sách vùng bảo mật, nhấn nút **+ ADD ZONE** ở góc trên bên phải.
2. Tại cửa sổ **Create Security Zone**, hiện ra, điền các thông tin sau:
    - **Zone Name (*):** Tên vùng.
    - **Description:** Mô tả.
    - **Color:** Chọn màu đại diện.
3. Nhấn **CREATE** để hoàn tất.

### 4.3.3. Chỉnh sửa vùng bảo mật
Thay đổi tên, mô tả hoặc màu sắc của vùng bảo mật hiện có.

**Các bước thực hiện:**
1. Tại màn hình danh sách vùng bảo mật, nhấn biểu tượng **Sửa** tại cột Actions của vùng bảo mật muốn sửa.
2. Cập nhật thông tin và nhấn **UPDATE** để hoàn tất.

---

## 4.4. Đối tượng Dịch vụ (Services)
Quản lý các giao thức mạng dựa trên Protocol và Cổng (Port).

### 4.4.1. Xem danh sách dịch vụ
Tra cứu các dịch vụ mạng (TCP, UDP, ICMP) đã được định nghĩa.

**Các bước thực hiện:**
1. Truy cập vào menu **Policy Objects** > **Services**.
2. Xem thông tin: **Service Name**, **Type**, **Protocol**, **Destination Port**, **Source Port**, **Description**.

### 4.4.2. Tạo mới dịch vụ
Định nghĩa dịch vụ mạng mới theo nhu cầu đặc thù của hệ thống.

**Các bước thực hiện:**
1. Tại màn hình danh sách dịch vụ, nhấn nút **+ ADD SERVICE** ở góc trên bên phải.
2. Tại cửa sổ **Create Service**, hiện ra, điền các thông tin sau:
    - **Service Name:** Tên dịch vụ.
    - **Device Groups:** Chọn nhóm thiết bị.
    - **Protocol:** Chọn giao thức.
    - **Destination Port:** Chọn cổng đích hoặc dải cổng.
    - **Source Port:** Chọn cổng nguồn hoặc dải cổng.
    - **Description:** Mô tả.
3. Nhấn **CREATE** để hoàn tất.

### 4.4.3. Chỉnh sửa dịch vụ
Cập nhật lại dải cổng hoặc giao thức cho dịch vụ hiện có.

**Các bước thực hiện:**
1. Tại màn hình danh sách dịch vụ, nhấn biểu tượng **Sửa** tại cột Actions của dịch vụ muốn cập nhật.
2. Cập nhật thông tin và nhấn **UPDATE** để hoàn tất.

### 4.4.4. Xóa dịch vụ
Gỡ bỏ các dịch vụ không còn cần thiết.

**Các bước thực hiện:**
1. Tại màn hình danh sách dịch vụ, nhấn biểu tượng **Xóa** tại cột Actions của dịch vụ muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Are you sure you want to delete service...?"), nhấn **CONFIRM** để hoàn tất việc xóa.

---

## 4.5. Đối tượng Nhóm dịch vụ (Service groups)
Gộp nhiều dịch vụ lại thành một nhóm để tối ưu hóa việc quản lý luật bảo mật.

### 4.5.1. Xem danh sách nhóm dịch vụ
Theo dõi các nhóm dịch vụ và người tạo tương ứng.

**Các bước thực hiện:**
1. Truy cập vào menu **Policy Objects** > **Service groups**.
2. Xem các thông tin: **Name**, **Description**, **Created By**.

### 4.5.2. Tạo mới nhóm dịch vụ
Tập hợp các dịch vụ lẻ vào một nhóm chung để dễ dàng áp dụng policy.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm dịch vụ, nhấn nút **+ ADD SERVICE GROUP** ở góc trên bên phải.
2. Tại cửa sổ **Create Service Group** hiện ra, điền các thông tin sau:
    - **Name:** Tên nhóm dịch vụ.
    - **Device Groups:** Chọn nhóm thiết bị.
    - **Sub Groups:** Chọn nhóm dịch vụ con.
    - **Services:** Chọn các dịch vụ thành viên.
    - **Description:** Mô tả về nhóm dịch vụ.
3. Nhấn **CREATE** để hoàn tất.

### 4.5.3. Chỉnh sửa nhóm dịch vụ
Thêm hoặc bớt các dịch vụ thành viên trong nhóm.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm dịch vụ, nhấn biểu tượng **Sửa** tại cột Actions của nhóm dịch vụ muốn cập nhật.
2. Tại cửa sổ **Update Service Group**, cập nhật thông tin và nhấn **UPDATE** để hoàn tất.

### 4.5.4. Xóa nhóm dịch vụ
Gỡ bỏ nhóm dịch vụ khỏi hệ thống.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm dịch vụ, nhấn biểu tượng **Xóa** tại cột Actions của nhóm dịch vụ muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Are you sure you want to delete service group ...?"), nhấn **CONFIRM** để hoàn tất việc xóa.

---

## 4.6. Đối tượng Ứng dụng (Applications)
Định nghĩa các ứng dụng cụ thể (Facebook, Skype...) dựa trên tên miền, IP hoặc chữ ký ứng dụng.

### 4.6.1. Xem danh sách ứng dụng
Tra cứu danh sách hàng ngàn ứng dụng được hệ thống nhận diện.

**Các bước thực hiện:**
1. Truy cập vào menu **Policy Objects** > **Applications**.
2. Xem các thông tin: **Name**, **Domains**, **CIDRs**, **ASNs**, **Security Risk**, **Bandwidth Requirement**, **Allowed User Groups**.

### 4.6.2. Tạo mới ứng dụng
Khai báo ứng dụng mới chưa có trong danh mục mặc định của Firewall.

**Các bước thực hiện:**
1. Tại màn hình danh sách ứng dụng, nhấn nút **+ Add Application** ở góc trên bên phải.
2. Tại cửa sổ **Create Application** hiện ra, điền các thông tin sau:
    - **Name**: Tên ứng dụng
    - **Domains**: Tên miền
    - **CIDRs**: Dải IP
    - **ASNs**: Số hiệu hệ thống
    - **Security Risk**: Mức độ rủi ro
    - **Bandwidth Requirement**: Yêu cầu băng thông
    **Allowed User Groups**: Nhóm người dùng được phép
3. Nhấn **CREATE** để hoàn tất.

### 4.6.3. Chỉnh sửa ứng dụng
Thay đổi các tham số nhận diện hoặc mức độ ưu tiên của ứng dụng.

**Các bước thực hiện:**
1. Tại màn hình danh sách ứng dụng, nhấn biểu tượng **Sửa** tại cột Actions của ứng dụng muốn cập nhật.
2. Tại cửa sổ **Update Application**, cập nhật thông tin và nhấn **UPDATE** để hoàn tất.

### 4.6.4. Xóa ứng dụng
Gỡ bỏ ứng dụng tự định nghĩa khỏi hệ thống.

**Các bước thực hiện:**
1. Tại màn hình danh sách ứng dụng, nhấn biểu tượng **Xóa** tại cột Actions của ứng dụng muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Are you sure you want to delete this application...?"), nhấn **DELETE** để hoàn tất việc xóa.

---

## 4.7. Đối tượng Nhóm ứng dụng (Application Groups)
Gộp các ứng dụng cùng loại để quản lý tập trung.

### 4.7.1. Xem danh sách nhóm ứng dụng
Kiểm tra các nhóm ứng dụng hiện có.

**Các bước thực hiện:**
1. Truy cập vào menu **Policy Objects** > **Application Groups**.
2. Xem thông tin: **Group Name**, **Applications** **Description**, **Updated At**.

### 4.7.2. Tạo mới nhóm ứng dụng
Tạo nhóm để quản lý hàng loạt ứng dụng (Ví dụ: Nhóm ứng dụng Chat).

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm ứng dụng, nhấn nút **+ ADD APPLICATION GROUP** ở góc trên bên phải.
2. Tại cửa sổ **Create Application Group** hiện ra, điền các thông tin sau:
    - **Group Name:** Tên nhóm.
    - **Applications:** Chọn các ứng dụng thành viên.
    - **Description:** Mô tả.
3. Nhấn **CREATE** để hoàn tất.

### 4.7.3. Chỉnh sửa nhóm ứng dụng
Cập nhật danh sách ứng dụng trong nhóm.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm ứng dụng, nhấn biểu tượng **Sửa** tại cột Actions của nhóm ứng dụng muốn cập nhật.
2. Tại cửa sổ **Update Application Group**, cập nhật thông tin và nhấn **UPDATE** để hoàn tất.

### 4.7.4. Xóa nhóm ứng dụng
Xóa nhóm ứng dụng không còn sử dụng.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm ứng dụng, nhấn biểu tượng **Xóa** tại cột Actions của nhóm ứng dụng muốn xóa.
2. Khi hộp thoại xác nhận xuất hiện ("Are you sure you want to delete this application group ...?"), nhấn **DELETE** để hoàn tất việc xóa.

---

## 4.8. Đối tượng Nhóm bảo mật (Security Groups)
Tạo các nhóm bảo mật để áp dụng các tập hợp chính sách đặc thù.

### 4.8.1. Xem danh sách nhóm bảo mật
Kiểm tra thông tin các nhóm bảo mật hiện tại.

**Các bước thực hiện:**
1. Truy cập vào menu **Policy Objects** > **Security Groups**.
2. Xem thông tin: **Name**.

### 4.8.2. Tạo mới nhóm bảo mật
Khai báo một nhóm bảo mật mới.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm bảo mật, nhấn nút **+ ADD SECURITY GROUP** ở góc trên bên phải.
2. Tại cửa sổ **Create Security Group** hiện ra, điền các thông tin sau:
    - **Name:** Tên nhóm.
3. Nhấn **CREATE** để hoàn tất.

### 4.8.3. Chỉnh sửa nhóm bảo mật
Thay đổi tên nhóm bảo mật.

**Các bước thực hiện:**
1. Tại màn hình danh sách nhóm bảo mật, nhấn biểu tượng **Sửa** tại cột Actions của nhóm bảo mật muốn cập nhật.
2. Tại cửa sổ **Update Security Group**, cập nhật thông tin và nhấn **UPDATE** để hoàn tất.

---

## 4.9. Quản lý Phiên bản cấu hình (Version Management)
Lưu trữ và quản lý lịch sử các thay đổi cấu hình, cho phép kiểm tra chi tiết từng phiên bản.

### 4.9.1. Xem danh sách phiên bản
Theo dõi lịch sử thay đổi cấu hình của toàn bộ hệ thống theo thời gian.

**Các bước thực hiện:**
1. Truy cập vào menu **Policy Objects** > **Version Management**.
2. Danh sách hiển thị thông tin: **Hash** (Mã phiên bản), **Message** (Nội dung thay đổi), **Author** (Người thực hiện) và **Date** (Thời gian).
3. Người dùng có thể chuyển qua các tab **Policies**, **White List**, **Black List**, **IPS Rules** để xem chi tiết cấu hình, trong đó:
    - **Policies:** Danh sách các luật bảo mật.
    - **White List:** Danh sách trắng địa chỉ IP.
    - **Black List:** Danh sách đen địa chỉ/tên miền.
    - **IPS Rules:** Các bộ luật IPS được kích hoạt.

### 4.9.2. Kiểm tra chi tiết cấu hình theo tab
Xem chi tiết nội dung các chính sách đã cấu hình trong một phiên bản cụ thể.

**Các bước thực hiện:**
1. Tại màn hình danh sách phiên bản, nhấn biểu tượng **Xem** của một phiên bản.
2. Hệ thống hiển thị màn hình chi tiết các luật bảo mật trong phiên bản đó.
3. Nhấn dấu **[X]** để đóng cửa sổ kiểm tra.

