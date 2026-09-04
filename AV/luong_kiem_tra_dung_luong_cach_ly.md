```mermaid
sequenceDiagram
    autonumber
    actor User as Người dùng
    participant OS as Hệ điều hành / Windows
    participant Scheduler as AV Scheduler (Bộ lập lịch)
    participant Core as AV Core Service
    participant Disk as File System / Ổ đĩa C:
    participant UI as AV UI (Toast / Quả chuông)

    %% TRƯỜNG HỢP 1: LỊCH ĐỊNH KỲ (SCHEDULED JOB)
    rect rgb(235, 245, 255)
        note over Scheduler, Core: TRƯỜNG HỢP 1: Kiểm tra định kỳ (Lịch cố định)
        Scheduler->>Core: Lịch kiểm tra mỗi ngày! Trigger Job
        
        activate Core
        Core->>Disk: Lấy dung lượng thư mục Quarantine
        Disk-->>Core: Trả về QuarantinedSize
        
        Core->>Disk: Lấy tổng dung lượng & dung lượng trống ổ C:
        Disk-->>Core: Trả về TotalDiskSize, FreeDiskSize
        
        Core->>Core: Đánh giá điều kiện: FreeDiskSize < 10% AND QuarantinedSize > max(5GB, 5% TotalDiskSize)
        
        alt Thỏa mãn điều kiện (Cần dọn dẹp)
            Core->>UI: Hiển thị Toast Notification & lưu thông báo vào Quả chuông
            UI-->>User: Cảnh báo: "Khu vực cách ly chiếm dung lượng lớn"
        else Không vi phạm điều kiện
            Core->>Core: Bỏ qua, không phát thông báo
        end
        
        Core->>Core: Lưu thời điểm kiểm tra: LastQuarantineCheckTime = Time.Now
        deactivate Core
    end

    %% TRƯỜNG HỢP 2: CATCH-UP JOB KHI KHỞI ĐỘNG TẮT/MỞ MÁY
    rect rgb(255, 245, 235)
        note over OS, Core: TRƯỜNG HỢP 2: Kiểm tra bù sau khi Khởi động thiết bị
        OS->>Core: Máy tính bật / Boot Windows (Khởi động AV Core Service)
        
        activate Core
        Core->>Core: Đợi 5 phút (Delay để ổn định hiệu năng Boot)
        
        Core->>Core: Đọc bản ghi LastQuarantineCheckTime
        Core->>Core: Tính khoảng cách: TimeDiff = Time.Now - LastQuarantineCheckTime
        
        alt TimeDiff >= 24 giờ (Trong vòng 24 giờ chưa kiểm tra)
            Core->>Disk: Lấy dung lượng thư mục Quarantine
            Disk-->>Core: Trả về QuarantinedSize
            
            Core->>Disk: Lấy tổng dung lượng & dung lượng trống ổ C:
            Disk-->>Core: Trả về TotalDiskSize, FreeDiskSize
            
            Core->>Core: Đánh giá lại điều kiện dung lượng
            
            alt Thỏa mãn điều kiện
                Core->>UI: Hiển thị Toast Notification & lưu vào Quả chuông
                UI-->>User: Cảnh báo: "Khu vực cách ly chiếm dung lượng lớn"
            else Không vi phạm
                Core->>Core: Bỏ qua, không phát thông báo
            end
            
            Core->>Core: Cập nhật lại: LastQuarantineCheckTime = Time.Now

        else TimeDiff < 24 giờ (Đã kiểm tra trong 24 giờ gần nhất)
            Core->>Core: Bỏ qua, kết thúc Job
        end
        deactivate Core
    end

    %% TƯƠNG TÁC NGƯỜI DÙNG TỪ THÔNG BÁO
    rect rgb(240, 255, 240)
        note over User, UI: Tương tác mở rộng
        opt Người dùng click vào thông báo
            User->>UI: Click vào Toast hoặc Thông báo ở Quả chuông
            UI->>Core: Mở màn hình Khu vực cách ly (Quarantine Management)
            UI-->>User: Hiển thị danh sách tệp cách ly
        end
    end
```

# 1. Trường hợp 1: Kiểm tra Định kỳ (Scheduled Job)

* **Thời điểm kích hoạt:** Lịch kiểm tra **mỗi ngày**, bộ lập lịch (AV Scheduler) sẽ gửi lệnh yêu cầu dịch vụ ngầm (AV Core Service) thực hiện kiểm tra.
* **Các bước xử lý:**
    1. **Thu thập dữ liệu:** Hệ thống truy vấn ổ đĩa để lấy các thông số:
        * Dung lượng thư mục cách ly ($QuarantinedSize$).
        * Tổng dung lượng ổ C: ($TotalDiskSize$).
        * Dung lượng trống còn lại của ổ C: ($FreeDiskSize$).
    2. **Đánh giá điều kiện:** Hệ thống đối chiếu dữ liệu với điều kiện cảnh báo:
        * Dung lượng trống ổ C < 10% **VÀ** Dung lượng cách ly > max(5 GB, 5% tổng dung lượng ổ C).
    3. **Phát cảnh báo & Ghi nhận:**
        * **Nếu vi phạm điều kiện:** Đẩy thông báo Toast góc màn hình và lưu thông báo vào Quả chuông.
        * **Nếu không vi phạm:** Không phát thông báo.
        * **Luôn thực hiện:** Cập nhật lại thời điểm kiểm tra gần nhất (`LastQuarantineCheckTime` = Thời gian hiện tại).

# 2. Trường hợp 2: Kiểm tra Bù khi Khởi động thiết bị

* **Thời điểm kích hoạt:** Ngay khi máy tính bật/khởi động lại và dịch vụ AV khởi động cùng Windows.
* **Các bước xử lý:**
    1. **Trì hoãn (Delay):** Hệ thống tạm dừng **5 phút** sau khi boot để tránh gây giật/lag máy tính.
    2. **Tính toán thời gian trôi qua:**
       Thời gian trôi qua ($TimeDiff$) = Thời gian hiện tại - Thời gian kiểm tra gần nhất (`LastQuarantineCheckTime`).
    3. **Phân nhánh xử lý:**
        * **Nếu $TimeDiff \ge 24$ giờ** (Tức là trong vòng 24 giờ qua chưa thực hiện kiểm tra):
            * Hệ thống tự động kích hoạt lượt kiểm tra bù.
            * Đọc thông số ổ đĩa $\rightarrow$ Đánh giá điều kiện dung lượng $\rightarrow$ Đẩy thông báo (nếu vi phạm).
            * Cập nhật thời điểm kiểm tra mới (`LastQuarantineCheckTime` = Thời gian hiện tại).
        * **Nếu $TimeDiff < 24$ giờ** (Tức là trong vòng 24 giờ qua đã thực hiện kiểm tra):
            * Bỏ qua, kết thúc tiến trình ngầm.

# 3. Tương tác từ phía Người dùng

* Khi nhận được thông báo Toast hoặc bấm vào thông báo trong Quả chuông:
    1. Người dùng click vào thông báo: "Khu vực cách ly chiếm dung lượng lớn".
    2. Phần mềm lập tức chuyển hướng người dùng đến màn hình **Khu vực Cách ly**.
