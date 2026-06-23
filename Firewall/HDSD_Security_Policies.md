# Chương 5: Chính sách Bảo mật (Security Policies)

Chương này hướng dẫn người quản trị cấu hình và quản lý các chính sách bảo mật (Security Policies) trên hệ thống Firewall. Điều này bao gồm việc thiết lập các luật kiểm soát truy cập (Policies), danh sách đen/trắng (Black/White list), và các tập luật phòng chống xâm nhập (IPS Rule sets) nhằm bảo vệ hệ thống mạng khỏi các mối đe dọa.

## 5.1. Cấu hình tự động áp dụng (Auto apply setting)

Cho phép hệ thống tự động áp dụng (apply) các thay đổi cấu hình về chính sách bảo mật ngay sau khi lưu, thay vì phải người dùng phải nhấn nút Apply thủ công.

**Điều kiện tiên quyết:** Cần có quyền cấu hình hệ thống.

**Các bước thực hiện:**
1. Truy cập vào menu **Security policies** > **Auto apply setting**.
2. Trên màn hình cấu hình, tìm đến tùy chọn **Auto Apply**.
3. Bật công tắc (Toggle) hoặc tích chọn vào ô **Enable auto apply**.
4. Nhấn **[SAVE]** hoặc **[SUBMIT]** để lưu thiết lập.

> **Lưu ý:** Khi bật tính năng này, mọi thay đổi trong các module chính sách bảo mật có thể có tác động ngay lập tức đến lưu lượng mạng. Khuyến cáo chỉ bật khi quản trị viên đã nắm rõ các thay đổi.

---

## 5.2. Chính sách bảo mật chung (Policies)

Cho phép định nghĩa các bộ luật kiểm soát luồng giao thông mạng đi qua Firewall (Access Control Rules), xác định luồng dữ liệu nào được phép (Allow) hoặc bị chặn (Drop/Deny) dựa trên nhiều tiêu chí như IP, Zone, Dịch vụ, Ứng dụng.

### 5.2.1. Xem danh sách Policies
1. Truy cập menu **Security policies** > **Policies**.
2. Màn hình hiển thị danh sách các chính sách đã được tạo. Các thông tin hiển thị bao gồm:
   - **Tên (Name)** và **Mô tả (Description)**.
   - **Nguồn (Source):** Vùng mạng (Zone) và địa chỉ IP nguồn.
   - **Đích (Destination):** Vùng mạng (Zone) và địa chỉ IP đích.
   - **Dịch vụ/Ứng dụng (Services/Applications):** Giao thức hoặc ứng dụng được áp dụng.
   - **Hành động (Action):** Allow (Cho phép) hoặc Drop (Chặn).
   - **Trạng thái (Status):** Enable hoặc Disable.

### 5.2.2. Tạo mới Policy
1. Tại màn hình danh sách Policies, nhấp vào nút **+ ADD NEW** (hoặc **CREATE**).
2. Trên cửa sổ tạo mới, điền các thông tin sau:
   - **Name (*):** Tên chính sách (bắt buộc).
   - **Description:** Mô tả tóm tắt mục đích của chính sách.
   - **Action (*):** Chọn hành động xử lý (**Allow** hoặc **Drop**).
   - **Status:** Trạng thái của rule (**Enable** / **Disable**).
   - **Source:** Chọn vùng mạng nguồn (Source Zone) và Đối tượng địa chỉ nguồn (Source Address).
   - **Destination:** Chọn vùng mạng đích (Destination Zone) và Đối tượng địa chỉ đích (Destination Address).
   - **Service/Application:** Chọn các Dịch vụ (TCP/UDP ports) hoặc Ứng dụng (App-ID) cần kiểm soát.
   - **Security Profiles (tùy chọn):** Đính kèm các profile kiểm tra nâng cao (như IPS, Anti-virus).
   - **Log Traffic:** Bật để ghi lại nhật ký (Log) của các session khớp với luật này.
3. Nhấn **[SUBMIT]** hoặc **[SAVE]** để lưu.

### 5.2.3. Cấu hình ngưỡng cảnh báo (Alert threshold)
Thiết lập ngưỡng kích hoạt cảnh báo khi có một số lượng lưu lượng hoặc sự kiện nhất định vi phạm các chính sách đã thiết lập.
1. Tại màn hình danh sách Policies, nhấp vào nút **Alert threshold** (hoặc biểu tượng chuông cấu hình).
2. Điền các tham số ngưỡng cảnh báo:
   - **Condition:** Lựa chọn điều kiện (ví dụ: Hit count, Byte rate).
   - **Threshold:** Nhập giá trị ngưỡng vượt quá sẽ cảnh báo.
   - **Time window:** Khoảng thời gian theo dõi (ví dụ: trong vòng 1 phút).
3. Nhấn **[SUBMIT]** để lưu.

---

## 5.3. Quản lý Danh sách đen (Black list)

Chức năng này dùng để khóa cứng các đối tượng địa chỉ IP, Domain, hoặc URL độc hại/không mong muốn, ngăn chặn mọi kết nối đến hoặc đi từ các đối tượng này.

### 5.3.1. Xem danh sách Black list
1. Truy cập menu **Security policies** > **Black list**.
2. Màn hình hiển thị danh sách các mục trong Black list gồm: **IP/Domain**, **Loại (Type)**, **Lý do (Reason)**, và **Ngày tạo**.

### 5.3.2. Tạo mới Black list
1. Tại màn hình danh sách Black list, nhấp vào nút **+ ADD NEW**.
2. Trên form tạo mới, điền các thông tin:
   - **Type (*):** Chọn loại đối tượng cần chặn (IP Address, Subnet, hoặc Domain).
   - **Value (*):** Nhập giá trị tương ứng (VD: `192.168.1.100` hoặc `bad-domain.com`).
   - **Reason/Description:** Ghi chú lý do chặn.
   - **Status:** Kích hoạt (Enable) hoặc Không kích hoạt (Disable).
3. Nhấn **[SUBMIT]** để lưu.

### 5.3.3. Chỉnh sửa Black list
1. Tại màn hình danh sách Black list, tìm đối tượng cần sửa, nhấn vào biểu tượng **Sửa (Edit/Pencil)** tương ứng ở cột thao tác.
2. Cập nhật các thông tin cần thiết (Value, Reason, Status).
3. Nhấn **[SAVE]** để cập nhật thay đổi.

### 5.3.4. Import file Black list
Cho phép thêm hàng loạt danh sách đen từ một file chuẩn bị sẵn (TXT hoặc CSV).
1. Tại màn hình danh sách Black list, nhấp vào nút **Import** (hoặc biểu tượng upload).
2. Tải xuống file mẫu (Download Template) nếu chưa rõ định dạng.
3. Nhấp vào khu vực tải lên để chọn file từ máy tính hoặc kéo thả file vào vùng được chỉ định.
4. Nhấn **[IMPORT]** hoặc **[SUBMIT]** để hệ thống đọc và thêm vào danh sách.

---

## 5.4. Quản lý Danh sách trắng (White list)

White list cho phép chỉ định các IP hoặc Domain được tin tưởng tuyệt đối, bỏ qua một số hoặc toàn bộ các kiểm tra an ninh (như IPS, kiểm tra nội dung) nhằm đảm bảo thông suốt cho các ứng dụng quan trọng.

### 5.4.1. Xem danh sách White list
1. Truy cập menu **Security policies** > **White list**.
2. Màn hình hiển thị danh sách các mục trong White list gồm: **IP/Domain**, **Loại (Type)**, **Lý do (Reason)**, và **Modules Bypass** (Các module an ninh được bỏ qua).

### 5.4.2. Tạo mới White list
1. Tại màn hình danh sách White list, nhấp vào nút **+ ADD NEW**.
2. Trên form tạo mới, điền các thông tin:
   - **Type (*):** Chọn loại đối tượng (IP Address, Subnet, Domain).
   - **Value (*):** Nhập giá trị IP hoặc Domain được tin tưởng.
   - **Bypass modules:** Chọn các hệ thống kiểm tra an ninh mà đối tượng này sẽ được bỏ qua (VD: IPS, Web Filter, Anti-Virus).
   - **Description:** Ghi chú mục đích của white list.
3. Nhấn **[SUBMIT]** để lưu.

### 5.4.3. Chỉnh sửa White list
1. Tại màn hình danh sách White list, tìm đối tượng cần sửa, nhấn vào biểu tượng **Sửa (Edit/Pencil)**.
2. Thay đổi các cấu hình (Value, Bypass modules, Description).
3. Nhấn **[SAVE]** để lưu cập nhật.

### 5.4.4. Xóa White list
1. Tại màn hình danh sách White list, chọn một hoặc nhiều mục cần xóa bằng cách tích vào ô kiểm (checkbox) đầu dòng.
2. Nhấn nút **Delete** (hoặc biểu tượng thùng rác).
3. Xác nhận xóa khi hệ thống hiển thị hộp thoại cảnh báo.

---

## 5.5. Tập luật chống xâm nhập (IPS Rule sets)

Quản lý các tập luật (Rule sets) dành cho hệ thống Phát hiện và Ngăn chặn Xâm nhập (IDS/IPS). Một tập luật chứa nhiều dấu hiệu (signatures) dùng để nhận diện và chặn các dạng tấn công mạng đã biết.

### 5.5.1. Xem danh sách tập luật IPS
1. Truy cập menu **Security policies** > **IPS Rule sets**.
2. Màn hình hiển thị danh sách các tập luật hiện có. Bao gồm: **Tên (Name)**, **Mô tả**, **Số lượng Rule**, và **Ngày cập nhật cuối**.

### 5.5.2. Tạo mới tập luật IPS
1. Nhấp vào nút **+ ADD NEW** trên màn hình danh sách IPS Rule sets.
2. Nhập các thông tin cho tập luật mới:
   - **Rule set Name (*):** Tên của tập luật.
   - **Description:** Mô tả tập luật.
   - **Base/Clone from:** Lựa chọn sao chép từ một tập luật mặc định của hệ thống hoặc tạo mới hoàn toàn.
3. Nhấn **[SUBMIT]** để tạo.

### 5.5.3. Chỉnh sửa tập luật IPS
1. Trong danh sách IPS Rule sets, nhấn vào biểu tượng **Sửa (Edit)** của một tập luật.
2. Màn hình chi tiết sẽ hiển thị toàn bộ các Rules bên trong tập luật đó. Tại đây, bạn có thể:
   - Bật/Tắt (Enable/Disable) các rule cụ thể.
   - Thay đổi hành động (Action) của rule: **Alert** (Chỉ cảnh báo), **Drop** (Chặn), hoặc **Pass** (Bỏ qua).
3. Nhấn **[SAVE]** để lưu lại thiết lập.

### 5.5.4. Import file IPS
Cho phép thêm các luật IPS từ nguồn bên ngoài (thường có định dạng `.rules` của Snort/Suricata).
1. Tại màn hình danh sách IPS Rule sets, nhấp vào nút **Import**.
2. Kéo thả hoặc chọn file chứa luật IPS từ máy tính.
3. Hệ thống sẽ tiến hành kiểm tra cú pháp (Syntax check). Nếu thành công, nhấn **[CONFIRM]** hoặc **[SUBMIT]** để thêm luật vào hệ thống.

### 5.5.5. Xem lịch sử thay đổi IPS
1. Tại giao diện quản lý IPS, nhấp vào nút hoặc tab **History** (Lịch sử).
2. Hệ thống hiển thị các bản ghi về việc ai đã chỉnh sửa, thêm mới, hoặc import luật vào thời điểm nào, giúp phục vụ mục đích kiểm toán (audit).

### 5.5.6. Áp dụng cấu hình IPS (Apply)
Sau khi thay đổi hoặc import các luật IPS mới, cấu hình cần được áp dụng xuống engine phân tích.
1. Nhấp vào nút **[APPLY]** ở góc phải màn hình của giao diện IPS Rule sets.
2. Chờ hệ thống tải lại tập luật. Trạng thái của Engine IPS sẽ hiển thị "Applying..." và sau đó chuyển sang "Ready" hoặc "Success" khi hoàn tất.
> **Lưu ý:** Quá trình Apply có thể khiến engine IPS khởi động lại trong thời gian ngắn, tuy nhiên nó thường không làm rớt các kết nối mạng hiện tại nếu hệ thống cấu hình ở chế độ High Availability hoặc Bypass.
