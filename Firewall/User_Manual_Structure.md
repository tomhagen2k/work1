# Cấu trúc Tài liệu Hướng dẫn sử dụng Firewall (Chi tiết)

## Chương 1: Tổng quan và Bắt đầu nhanh
1.1. Giới thiệu hệ thống Firewall/NGFW
1.2. Đăng nhập hệ thống
1.3. Bảng điều khiển (Dashboard) - Xem tổng quan trạng thái, sự kiện và hiệu năng

## Chương 2: Quản trị hệ thống (System Administration)
2.1. Cấu hình chung (General Configuration)
2.2. Quản lý Bản quyền (License)
2.3. Quản lý Người dùng (Users)
    - Xem danh sách người dùng
    - Tạo mới người dùng
    - Cập nhật thông tin người dùng
    - Reset mật khẩu người dùng
2.4. Quản lý Nhóm quyền / Vai trò (Permission Group)
    - Xem danh sách nhóm quyền
    - Cập nhật nhóm quyền (Update role)
    - Xóa nhóm quyền (Delete role)
2.5. Quản lý API Key
    - Xem danh sách API Key
    - Tạo mới API Key
2.6. Quản lý Cập nhật hệ thống (Update management)

## Chương 3: Quản trị Thiết bị và Hạ tầng Mạng (Devices)
3.1. Quản lý Cụm thiết bị (Clusters)
    - Xem danh sách Cluster
    - Tạo mới Cluster
    - Chỉnh sửa Cluster
3.2. Quản lý Thiết bị (Devices)
    - Xem danh sách thiết bị
    - Thêm mới thiết bị
    - Xem chi tiết thiết bị (View detail)
    - Cấu hình thiết bị nâng cao: Advanced Filter, Security features, Traffic control
    - Cập nhật thiết bị (Update)
    - Sao lưu thiết bị (Backup)
    - Áp dụng cấu hình (Apply)
    - Xem thông tin tài sản thiết bị (Assets)
3.3. Giám sát Thiết bị (Monitor)
    - Màn hình Monitor chung
    - Monitor chi tiết cho 1 thiết bị
3.4. Quản lý Nhóm & Group Policy
    - Xem danh sách Group
    - Xem chi tiết Group policy
3.5. Bảng định tuyến (Route Table)
    - Xem danh sách định tuyến
    - Tạo mới định tuyến
    - Cập nhật định tuyến
    - Áp dụng định tuyến (Apply)
3.6. Chính sách Dịch địa chỉ (NAT Policies)
    - Xem danh sách chính sách NAT
    - Tạo mới chính sách NAT
    - Cập nhật chính sách NAT
    - Áp dụng chính sách NAT (Apply)
3.7. Giải mã TLS (TLS Decrypt)
    - Xem danh sách TLS Decrypt
    - Tạo mới TLS Decrypt
    - Cập nhật TLS Decrypt
    - Quản lý Certificates (Chứng chỉ)
    - Quản lý Forged Certificates
    - Áp dụng cấu hình TLS Decrypt (Apply)

## Chương 4: Quản lý Đối tượng (Policy Objects)
4.1. Đối tượng Địa chỉ (Addresses)
    - Xem danh sách địa chỉ
    - Tạo mới địa chỉ
    - Cập nhật địa chỉ
    - Xóa địa chỉ
4.2. Đối tượng Máy chủ (Hosts)
    - Xem danh sách máy chủ
    - Xem chi tiết máy chủ
    - Cập nhật máy chủ
    - Xóa máy chủ
4.3. Đối tượng Vùng bảo mật (Security Zones)
    - Xem danh sách vùng bảo mật
    - Tạo mới vùng bảo mật
    - Chỉnh sửa vùng bảo mật
4.4. Đối tượng Dịch vụ & Nhóm dịch vụ (Services & Service Groups)
    - Dịch vụ: Xem danh sách, Tạo mới, Sửa, Xóa
    - Nhóm dịch vụ: Xem danh sách, Tạo mới, Chỉnh sửa, Xóa
4.5. Đối tượng Ứng dụng & Nhóm ứng dụng (Applications & Application Groups)
    - Ứng dụng: Xem danh sách, Tạo mới, Chỉnh sửa, Xóa
    - Nhóm ứng dụng: Xem danh sách, Tạo mới, Chỉnh sửa, Xóa
4.6. Đối tượng Nhóm bảo mật (Security Groups)
    - Xem danh sách nhóm bảo mật
    - Tạo mới nhóm bảo mật
    - Chỉnh sửa nhóm bảo mật
4.7. Quản lý Phiên bản cấu hình (Version Management)
    - Xem chi tiết Version policies
    - Kiểm tra cấu hình theo tab (Black list, White list, IPS rules, Policies) theo từng version

## Chương 5: Chính sách Bảo mật (Security Policies)
5.1. Cấu hình tự động áp dụng (Auto apply setting)
5.2. Chính sách bảo mật chung (Policies)
    - Xem danh sách Policies
    - Tạo mới Policy
    - Cấu hình ngưỡng cảnh báo (Alert threshold)
5.3. Quản lý Danh sách đen (Black list)
    - Xem danh sách Black list
    - Tạo mới Black list
    - Chỉnh sửa Black list
    - Import file Black list
5.4. Quản lý Danh sách trắng (White list)
    - Xem danh sách White list
    - Tạo mới White list
    - Chỉnh sửa White list
    - Xóa White list
5.5. Tập luật chống xâm nhập (IPS Rule sets)
    - Xem danh sách tập luật IPS
    - Tạo mới tập luật IPS
    - Chỉnh sửa tập luật IPS
    - Import file IPS
    - Xem lịch sử thay đổi IPS
    - Áp dụng cấu hình IPS (Apply)

## Chương 6: Tích hợp hệ thống (System Integration)
6.1. Tích hợp SIEM
    - Xem danh sách cấu hình SIEM
    - Tạo mới cấu hình SIEM
    - Sửa cấu hình SIEM
6.2. Tích hợp SOC
    - Xem danh sách cấu hình SOC
    - Tạo mới cấu hình SOC
    - Sửa cấu hình SOC
6.3. Tích hợp Threat Intelligence (TI Platform)
    - Xem danh sách TI Platform
    - Tạo mới cấu hình TI Platform
    - Sửa cấu hình TI Platform
    - Xem lịch sử yêu cầu (Request history)

## Chương 7: Giám sát, Cảnh báo và Nhật ký
7.1. Cảnh báo bảo mật (Alerts)
    - Xem danh sách cảnh báo
7.2. Giám sát Phiên làm việc mạng (Sessions)
    - Xem và tìm kiếm các session mạng
7.3. Giám sát Lưu lượng Ứng dụng (Application Traffic)
    - Xem thống kê lưu lượng ứng dụng
7.4. Nhật ký hệ thống (Audit log)
    - Tra cứu và xem lịch sử truy cập, thao tác (Audit logs)
