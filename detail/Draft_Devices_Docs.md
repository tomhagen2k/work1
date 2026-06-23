# Hướng dẫn sử dụng: Chương 3 - Quản trị Thiết bị và Hạ tầng Mạng (Devices)

Chương này hướng dẫn cách quản lý cụm thiết bị, quản lý chi tiết từng thiết bị, giám sát hiệu năng và quản lý nhóm chính sách.

---

## 3.1. Quản lý Cụm thiết bị (Clusters)
Cho phép ghép nối nhiều thiết bị Firewall thành một cụm để đảm bảo tính sẵn sàng cao (High Availability - HA), giúp hệ thống hoạt động liên tục ngay cả khi một thiết bị gặp sự cố.

### 3.1.1. Xem danh sách Cluster
Theo dõi trạng thái hoạt động của các cụm thiết bị và các nút (Node) thành viên.

**Các bước thực hiện:**
1. Truy cập vào menu **Devices** > **Clusters**.
2. Kiểm tra các thông tin: **Name**, **Type**, **State** (Active/Inactive) và thông tin chi tiết của **Node 1**, **Node 2** (Tên thiết bị và địa chỉ MGMT).
3. Tại cột Actions, có thể nhấn **Stop** để tạm dừng cụm hoặc **Edit** để chỉnh sửa.

---

### 3.1.2. Tạo mới Cluster
Thiết lập một cụm HA mới từ các thiết bị đơn lẻ.

**Các bước thực hiện:**
1. Tại màn hình Clusters, nhấp vào nút **+ Add cluster**.
2. Điền các thông tin trong cửa sổ **New cluster**:
    - **Name (*):** Tên cụm thiết bị.
    - **Type:** Chọn kiểu cụm (Ví dụ: Active/Standby).
    - **Description:** Mô tả ngắn gọn.
    - Tùy chọn: **Use virtual MAC address** (Sử dụng MAC ảo) hoặc **Preemption** (Chiếm quyền điều khiển).
3. Tại mục **Devices**, nhấp **+ Add** để chọn các thiết bị thành viên vào cụm.
4. Nhấn **Save** để hoàn tất.

---

## 3.2. Quản lý Thiết bị (Devices)
Đây là trung tâm quản lý toàn bộ các thiết bị Firewall trong hệ thống, cho phép thêm mới, cấu hình chi tiết và thực hiện các tác vụ quản trị.

### 3.2.1. Xem danh sách thiết bị
Tra cứu nhanh trạng thái và phiên bản của tất cả thiết bị.

**Các bước thực hiện:**
1. Truy cập vào menu **Devices** > **Devices**.
2. Theo dõi các cột: **Hostname**, **Status** (Active/Inactive), các phiên bản cập nhật (**Blacklist, IPS Rule**) và thời gian kết nối cuối cùng (**Last Heartbeat**).
3. Nhấp vào tên thiết bị (cột Hostname) để xem chi tiết.

---

### 3.2.2. Thêm mới thiết bị
Đăng ký một thiết bị Firewall mới vào hệ thống quản lý tập trung.

**Các bước thực hiện:**
1. Tại màn hình Devices, nhấp vào nút **+ ADD DEVICE**.
2. Nhập các thông tin định danh và kết nối cho thiết bị mới.
3. Nhấn **Save** để hoàn tất.

---

### 3.2.3. Xem chi tiết thiết bị (View detail)
Hiển thị danh sách và trạng thái các giao diện mạng (Interfaces) của thiết bị.

**Các bước thực hiện:**
1. Tại danh sách thiết bị, nhấp vào tên thiết bị cần xem (cột Hostname).
2. Hệ thống hiển thị màn hình **Interfaces for Device: [Tên thiết bị]** bao gồm các thông tin:
    - **Name:** Tên giao diện (Ví dụ: eth0, eth1).
    - **State:** Trạng thái kết nối (**Up** hoặc **Down**).
    - **Mode:** Chế độ hoạt động (Ví dụ: bridge).
    - **Security Zone:** Vùng bảo mật (Ví dụ: trusted, untrusted).
    - Các thông tin khác: **MAC Address, IP Address, VLAN ID, Description**.
3. Bạn có thể sử dụng thanh tìm kiếm để tìm nhanh giao diện theo tên hoặc nhấn **Apply** để áp dụng cấu hình giao diện mạng.

---

### 3.2.4. Cấu hình thiết bị nâng cao
Thiết lập các tính năng bảo mật và kiểm soát lưu lượng chuyên sâu cho từng thiết bị.

**Các bước thực hiện:**
1. Tại cột **Actions** của thiết bị, nhấn vào biểu tượng **Options** (hình 3 dấu chấm ngang) và chọn **Configuration**.
2. Tại cửa sổ **Device Settings**, thực hiện cấu hình tại các tab:
    - **Security Features:** Bật/Tắt các tính năng **Application Control, IPS, URL Filtering, DNS Filtering**.
    - **Traffic Control:** Cấu hình giới hạn băng thông và ưu tiên lưu lượng.
    - **Advanced Filter:** Thiết lập các bộ lọc nâng cao.
3. Nhấn **SAVE** để lưu hoặc **SAVE & APPLY** để lưu và áp dụng ngay lập tức.

---

### 3.2.5. Các tác vụ Quản trị: Update, Backup, Apply, Assets
- **Update:** Tại màn hình Devices, chọn thiết bị và nhấn **Update** để cập nhật các bộ luật (Signatures) hoặc Firmware.
- **Backup:** Nhấn nút **BACKUP** ở góc trên để tạo bản sao lưu cấu hình cho thiết bị, phòng trường hợp cần khôi phục.
- **Apply:** Sau khi thay đổi cấu hình, nhấn nút **APPLY** (ở header hoặc bên cạnh thiết bị) để đẩy cấu hình mới xuống thiết bị thực tế.
- **Assets:** Xem danh sách các tài sản, linh kiện phần cứng đi kèm thiết bị tại mục **Assets**.

---

## 3.3. Giám sát Thiết bị (Monitor)
Cung cấp biểu đồ và số liệu thực tế về tình trạng hoạt động của hệ thống.

### 3.3.1. Màn hình Monitor chung
Xem tổng quan sức khỏe của toàn bộ hạ tầng.

**Các bước thực hiện:**
1. Nhấn vào nút **MONITOR** tại màn hình danh sách thiết bị.
2. Màn hình **System Dashboard** hiển thị:
    - **Active Alerts:** Danh sách các cảnh báo đang kích hoạt (Ví dụ: Cảnh báo sử dụng bộ nhớ cao).
    - **All Systems:** Bảng tổng hợp chỉ số **CPU, Memory, Disk, Load Avg, Network, Temp** của tất cả thiết bị.

---

### 3.3.2. Monitor chi tiết cho 1 thiết bị
Theo dõi sâu hiệu năng của một thiết bị cụ thể.

**Các bước thực hiện:**
1. Tại bảng **All Systems**, nhấn vào tên thiết bị hoặc nút **View**.
2. Hệ thống hiển thị các biểu đồ chi tiết về lưu lượng, tài nguyên và các sự kiện bảo mật riêng cho thiết bị đó.

---

## 3.4. Quản lý Nhóm & Group Policy
Giúp quản lý thiết bị theo nhóm và áp dụng các chính sách chung cho toàn bộ thành viên trong nhóm.

### 3.4.1. Xem danh sách Group
**Các bước thực hiện:**
1. Truy cập vào menu **Devices** > **Groups**.
2. Xem danh sách các nhóm cùng số lượng thành viên (**Member Count**).

---

### 3.4.2. Xem danh sách thành viên nhóm
Cho phép xem danh sách các tài khoản người dùng thuộc về một nhóm cụ thể.

**Các bước thực hiện:**
1. Tại danh sách Group, nhấn vào biểu tượng **View detail** (hình con mắt) tại cột Actions.
2. Cửa sổ hiện ra hiển thị thông tin **Group Name**, **Member Count** (Tổng số thành viên) và bảng danh sách các **Username** thành viên.

---

## 3.5. Bảng định tuyến (Route Table)
Quản lý các tuyến đường truyền tin (Routes) để điều phối lưu lượng mạng đi qua các cổng giao tiếp và Gateway phù hợp.

### 3.5.1. Xem danh sách định tuyến
Hiển thị toàn bộ các bản ghi định tuyến đang được cấu hình trên từng thiết bị cụ thể.

**Các bước thực hiện:**
1. Truy cập vào menu **Devices** > **Route Table**.
2. Chọn thiết bị cần xem từ danh sách thả xuống.
3. Kiểm tra các thông tin: **Destination** (Đích đến), **Gateway**, **Interface** (Cổng ra), **Metric** (Độ ưu tiên) và trạng thái **Enabled**.

---

### 3.5.2. Tạo mới định tuyến
Thêm một tuyến đường mới vào bảng định tuyến để chỉ định Gateway cho một dải mạng đích.

**Các bước thực hiện:**
1. Tại màn hình Route Table, nhấp vào nút **+ ADD ROUTE**.
2. Điền các thông tin trong cửa sổ **Create Route Entry**:
    - **Destination (*):** Nhập dải mạng đích (Ví dụ: 10.0.0.0/8).
    - **Gateway:** Nhập địa chỉ Gateway (Ví dụ: 192.168.1.1).
    - **Interface:** Chọn cổng giao tiếp từ danh sách thả xuống.
    - **Metric:** Nhập chỉ số ưu tiên (số càng nhỏ ưu tiên càng cao).
    - **Description:** Mô tả tuyến đường.
    - **Enabled:** Tích chọn để kích hoạt ngay.
3. Nhấn **CREATE** để hoàn tất.

---

### 3.5.3. Cập nhật định tuyến
Chỉnh sửa thông số Gateway, Interface hoặc Metric của một bản ghi định tuyến đã tồn tại.

**Các bước thực hiện:**
1. Tại danh sách định tuyến, nhấn biểu tượng **Sửa** tại cột Actions của tuyến đường cần chỉnh sửa.
2. Thay đổi các thông số cần thiết và nhấn **Update**.

---

### 3.5.4. Áp dụng định tuyến (Apply)
Đẩy các thay đổi cấu hình trong bảng định tuyến xuống thiết bị để bắt đầu điều phối lưu lượng.

**Các bước thực hiện:**
1. Sau khi hoàn tất thêm/sửa/xóa các bản ghi, nhấp vào nút **APPLY** ở thanh công cụ phía trên danh sách.
2. Cửa sổ **Apply Route Table** xuất hiện, cho biết thiết bị sẽ được áp dụng thay đổi.
3. Nhập mô tả các thay đổi vào ô **Change message** (Ví dụ: "Thêm tuyến đường cho dải mạng 10.x.x.x").
4. Nhấn nút **Check Changes** để hệ thống kiểm tra và thực thi việc áp dụng cấu hình.
5. Kiểm tra lại cột **Enabled** để đảm bảo tuyến đường đã ở trạng thái hoạt động.

---

## 3.6. Chính sách Dịch địa chỉ (NAT Policies)
Cấu hình các luật dịch địa chỉ (Network Address Translation) để chuyển đổi địa chỉ IP nguồn/đích khi đi qua Firewall.

### 3.6.1. Xem danh sách chính sách NAT
Liệt kê các luật dịch địa chỉ đang có hiệu lực, bao gồm cả thứ tự ưu tiên của chúng.

**Các bước thực hiện:**
1. Truy cập vào menu **Devices** > **NAT policies**.
2. Danh sách hiển thị: **NAT Type** (SNAT, DYNAT...), **Source**, **Destination**, **Translation** (Địa chỉ sau khi dịch) và trạng thái **Enabled**.
3. Tại cột Actions, bạn có thể sử dụng các biểu tượng mũi tên để thay đổi thứ tự ưu tiên của chính sách.

---

### 3.6.2. Tạo mới chính sách NAT
Định nghĩa một luật dịch địa chỉ mới dựa trên các tiêu chí về vùng mạng và địa chỉ IP.

**Các bước thực hiện:**
1. Nhấp vào nút **+ Add**.
2. Tại cửa sổ **Create NAT Policy**, thiết lập các mục:
    - **General:** Nhập **Name***, **Description**, chọn **NAT Type*** và bật/tắt **Enabled**, **Log**.
    - **Match Criteria:** Chọn **Source/Destination zone**, **Source/Destination address**, **Protocol**, **Destination port** và **Service** (Dịch vụ) tương ứng.
    - **Translation:** Nhập thông tin **Source pool** (Dải IP nguồn sau khi dịch) và **Source port range** (Dải cổng nguồn) nếu cần thiết.
3. Nhấn **Create** để hoàn tất.

---

### 3.6.3. Cập nhật chính sách NAT
Thay đổi cấu hình hoặc điều chỉnh thứ tự ưu tiên (thứ tự từ trên xuống dưới) của các luật NAT.

**Các bước thực hiện:**
1. Nhấn biểu tượng **Sửa** tại cột Actions của chính sách cần thay đổi.
2. Cập nhật các thông số và nhấn **Update**.

---

### 3.6.4. Áp dụng chính sách NAT (Apply)
Kích hoạt các thay đổi về chính sách NAT để Firewall bắt đầu thực hiện việc dịch địa chỉ cho lưu lượng mạng.

**Các bước thực hiện:**
1. Kiểm tra kỹ thứ tự các luật NAT (luật nằm trên sẽ được ưu tiên kiểm tra trước).
2. Nhấn nút **Apply** ở thanh menu phụ hoặc nút **APPLY** tổng ở góc phải màn hình.
3. Cửa sổ **Apply NAT Policies** hiện ra.
4. Nhập nội dung thay đổi vào ô **Change message** để lưu vết quản trị.
5. Nhấn **Check Changes** để áp dụng cấu hình xuống thiết bị.

---

## 3.7. Giải mã TLS (TLS Decrypt)
Cho phép Firewall giải mã lưu lượng được mã hóa TLS để kiểm tra nội dung bên trong, giúp phát hiện các mối đe dọa ẩn trong các kết nối HTTPS.

### 3.7.1. Xem danh sách TLS Decrypt
Theo dõi các chính sách giải mã lưu lượng HTTPS/TLS đang được cấu hình trên hệ thống.

**Các bước thực hiện:**
1. Truy cập vào menu **Devices** > **TLS Decrypt**.
2. Xem các luật giải mã đã cấu hình với các thông tin: **Action** (Decrypt/No Decrypt), **Source**, **Destination**, **Enabled**.

---

### 3.7.2. Tạo mới/Cập nhật TLS Decrypt
Thiết lập luật để xác định loại lưu lượng nào sẽ được giải mã (Decrypt) để kiểm tra sâu.

**Các bước thực hiện:**
1. Nhấp vào nút **+ Add** (để tạo mới) hoặc biểu tượng **Sửa** (để cập nhật).
2. Thiết lập các thông số tương tự như NAT Policy (Name, Action, Match Criteria).
3. Nhấn **Create** để hoàn tất.

---

### 3.7.3. Quản lý Certificates (Chứng chỉ)
Quản lý các chứng chỉ CA dùng để giải mã và mã hóa lại lưu lượng.

**Các bước thực hiện:**
1. Nhấp vào nút **Manage CA** (hoặc Manage Certificates).
2. Danh sách chứng chỉ hiện ra, bạn có thể xem tên, mô tả hoặc nhấn **+ Add** để tải lên chứng chỉ mới.

---

### 3.7.4. Quản lý Forged Certificates
Xem danh sách các chứng chỉ giả lập được Firewall sinh ra trong quá trình giải mã.

**Các bước thực hiện:**
1. Nhấp vào nút **Forged Certs**.
2. Hệ thống sẽ liệt kê các chứng chỉ giả lập đang được lưu trữ trên thiết bị.

---

### 3.7.5. Áp dụng cấu hình TLS Decrypt (Apply)
Đẩy chính sách giải mã TLS xuống thiết bị để bắt đầu quá trình kiểm soát lưu lượng mã hóa.

**Các bước thực hiện:**
1. Nhấp vào nút **Apply** tại màn hình TLS Decrypt.
2. Tại cửa sổ **Apply TLS Decrypt Policies**, nhập thông tin mô tả cấu hình vào ô **Change message**.
3. Nhấn **Check Changes** để bắt đầu áp dụng.
4. Đợi hệ thống xác nhận cấu hình đã được nạp thành công; lưu ý kiểm tra hiệu năng CPU sau khi giải mã TLS được kích hoạt.
