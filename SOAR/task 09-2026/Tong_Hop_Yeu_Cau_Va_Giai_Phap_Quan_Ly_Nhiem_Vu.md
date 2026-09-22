# BẢN ĐẶC TẢ CHI TIẾT CẬP NHẬT TÍNH NĂNG QUẢN LÝ NHIỆM VỤ TRONG TÌNH HUỐNG (INCIDENT TASK MANAGEMENT)
> **Phân hệ:** SOAR - Quản lý Sự việc & Điều phối Ứng cứu sự cố (Incident Response Lifecycle)  
> **Phiên bản:** 2.0 (Cập nhật chuẩn hóa: Sử dụng SLA làm thời hạn hoàn thành)  
> **Ngày cập nhật:** 10/09/2026  
> **Môi trường rà soát:** Hệ thống SOAR thực tế (`http://192.168.111.168:30332`)  
> **Tài liệu tham chiếu:** Tiêu chuẩn NIST SP 800-61 Rev 2, SANS PICERL Framework.

---

## MỤC LỤC
1. [TỔNG QUAN YÊU CẦU & THỐNG NHẤT THIẾT KẾ](#1-tổng-quan-yêu-cầu--thống-nhất-thiết-kế)
2. [PHẦN I: THAY ĐỔI TẠI MÀN HÌNH "SỰ VIỆC" (`/case`) - TAB "CÔNG VIỆC"](#2-phần-i-thay-đổi-tại-màn-hình-sự-việc-case---tab-công-việc)
3. [PHẦN II: THAY ĐỔI TẠI MÀN HÌNH "CÔNG VIỆC" (`/task`) & MODAL TẠO/SỬA TASK](#3-phần-ii-thay-đổi-tại-màn-hình-công-việc-task--modal-tạosửa-task)
4. [PHẦN III: BỔ SUNG TÍNH NĂNG "QUẢN LÝ MẪU NHIỆM VỤ" (TASK TEMPLATES)](#4-phần-iii-bổ-sung-tính-năng-quản-lý-mẫu-nhiệm-vụ-task-templates)
5. [PHẦN IV: CƠ CHẾ ÁP DỤNG MẪU & VẬN HÀNH QUAN HỆ PHỤ THUỘC (DEPENDENCY LIFECYCLE)](#5-phần-iv-cơ-chế-áp-dụng-mẫu--vận-hành-quan-hệ-phụ-thuộc-dependency-lifecycle)
6. [ĐẶC TẢ CƠ SỞ DỮ LIỆU & API PHỤC VỤ CÁC PHẦN](#6-đặc-tả-cơ-sở-dữ-liệu--api-phục-vụ-các-phần)
7. [BẢNG TỔNG HỢP KIỂM THỬ VÀ NGHIỆM THU (TESTING CHECKLIST)](#7-bảng-tổng-hợp-kiểm-thử-và-nghiệm-thu-testing-checklist)

---

# 1. TỔNG QUAN YÊU CẦU & THỐNG NHẤT THIẾT KẾ

### 1.1. Các yêu cầu cốt lõi
1. **Yêu cầu (a) - CRUD nhiệm vụ:** Cho phép Tạo, Sửa, **Xóa** nhiệm vụ trong sự việc; chuẩn hóa các trường: *Tên, Mô tả, Người thực hiện, Thời hạn (SLA), Trạng thái, Kết quả thực hiện, Giai đoạn ứng cứu*.
2. **Yêu cầu (b) - Phân nhóm 6 Giai đoạn chuẩn NIST:** Chuẩn bị, Phát hiện & Phân tích, Ngăn chặn, Loại bỏ, Khôi phục, Tổng kết rút kinh nghiệm.
3. **Yêu cầu (c) - Mẫu danh sách nhiệm vụ (Task Templates):** Cho phép định nghĩa mẫu checklist công việc theo Loại sự cố (Ransomware, Phishing, DDoS...) và áp dụng tự động/thủ công vào Sự việc.
4. **Yêu cầu (d) - Quan hệ phụ thuộc (Task Dependencies):** Ràng buộc thứ tự Finish-to-Start giữa các nhiệm vụ, kiểm soát khóa và tự động mở khóa khi nhiệm vụ trước hoàn thành.

### 1.2. Thống nhất phương án kỹ thuật đã chốt
* **Về Thời hạn hoàn thành:** **Sử dụng trực tiếp trường `SLA`** (quy tắc thời gian, đếm ngược thời gian còn lại / cảnh báo trễ hạn) hiện có của hệ thống SOAR, không cần thêm trường DateTime Picker riêng biệt nhằm tránh trùng lặp dữ liệu và tận dụng cơ chế giám sát SLA tự động sẵn có.
* **Về Quan hệ phụ thuộc:** 
  * Cho phép chọn phụ thuộc khi tạo thủ công (trường Tùy chọn - Optional).
  * Tự động cấu hình sẵn phụ thuộc khi sinh task từ Template.
* **Về Thứ tự 6 Giai đoạn ứng cứu:**
  * **Hiển thị (Visual):** Cố định chuẩn 1 ➔ 6 từ trên xuống dưới.
  * **Thực thi (Execution):** Linh hoạt cho phép chạy song song hoặc lặp vòng; chỉ chặn thực hiện khi có quan hệ phụ thuộc cụ thể giữa 2 task.

---

# 2. PHẦN I: THAY ĐỔI TẠI MÀN HÌNH "SỰ VIỆC" (`/case`) - TAB "CÔNG VIỆC"

### 2.1. Hiện trạng trên màn hình `/case`
- Trong chi tiết của 1 Case, khi bấm tab `CÔNG VIỆC`, giao diện chỉ hiển thị dòng tiêu đề: `Công việc 1` kèm icon refresh, sort, filter, nút `+` và link `Danh sách công việc`.
- Danh sách các công việc hiển thị dạng danh sách phẳng (Flat list), chỉ có mã task, tên task, SLA, ngày tạo và dropdown trạng thái. Không có phân nhóm giai đoạn, không có thông tin kết quả và không có liên kết phụ thuộc.

### 2.2. Giao diện & Tính năng mới của Tab "CÔNG VIỆC" trong Case

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CÔNG VIỆC (Tổng: 12 • Hoàn thành: 7/12 • Tiến độ: 58%)         [📋 Áp dụng mẫu]   [+ Tạo công việc]     │
│ [████████████████████████████████░░░░░░░░░░░░░░░░░░░░] 58%     [Bộ lọc: Tất cả | Của tôi | Chờ...]     │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ▼ GIAI ĐOẠN 1: CHUẨN BỊ (Preparation)  •  2/2 Hoàn thành (100%)                  [+ Thêm vào GĐ này]  │
│   ├── TA01: Xác định đội ngũ ứng cứu & phân công kênh liên lạc  [SLA: A05-Đạt] [✓ Hoàn thành] [👁️ Xem KQ] │
│   └── TA02: Chuẩn bị môi trường & tài nguyên điều tra          [SLA: A05-Đạt] [✓ Hoàn thành] [👁️ Xem KQ] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ▼ GIAI ĐOẠN 2: PHÁT HIỆN & PHÂN TÍCH (Detection & Analysis) • 2/3 Hoàn thành     [+ Thêm vào GĐ này]  │
│   ├── TA03: Thu thập và trích xuất IoC từ Firewall & EDR       [SLA: A05-Đạt] [✓ Hoàn thành] [👁️ Xem KQ] │
│   ├── TA04: Phân tích mã hash mẫu độc hại trên Sandbox         [SLA: A05-Đạt] [✓ Hoàn thành] [👁️ Xem KQ] │
│   └── TA05: Rà quét phạm vi ảnh hưởng trên toàn mạng nội bộ    [SLA: Còn 15m] [⏳ Đang xử lý]  [✏️] [🗑️]   │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ▼ GIAI ĐOẠN 3: NGĂN CHẶN (Containment) • 1/3 Hoàn thành                          [+ Thêm vào GĐ này]  │
│   ├── TA06: Chặn toàn bộ IP/Domain C2 trên Edge Firewall       [SLA: A05-Đạt] [✓ Hoàn thành] [👁️ Xem KQ] │
│   ├── TA07: Cô lập mạng máy chủ Database bị nghi ngờ           [SLA: Còn 45m] [⏳ Đang xử lý]  [✏️] [🗑️]   │
│   └── TA08: Vô hiệu hóa tài khoản quản trị bị lộ lọt           [🔒 Chờ TA07]   [⛔ Bị khóa]     [✏️] [🗑️]   │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ▼ GIAI ĐOẠN 4: LOẠI BỎ (Eradication) • 1/2 Hoàn thành                            [+ Thêm vào GĐ này]  │
│   ├── TA09: Quét và diệt triệt để backdoor trên máy trạm       [SLA: A05-Đạt] [✓ Hoàn thành] [👁️ Xem KQ] │
│   └── TA10: Vá lỗ hổng dịch vụ RDP trên các máy chủ liên quan  [🔒 Chờ TA08]   [⛔ Bị khóa]     [✏️] [🗑️]   │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ▼ GIAI ĐOẠN 5: KHÔI PHỤC (Recovery) • 1/1 Hoàn thành                             [+ Thêm vào GĐ này]  │
│   └── TA11: Khôi phục máy chủ từ Clean Backup & Đưa Online     [SLA: A05-Đạt] [✓ Hoàn thành] [👁️ Xem KQ] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ▼ GIAI ĐOẠN 6: TỔNG KẾT RÚT KINH NGHIỆM (Lessons Learned) • 0/1 (0%)              [+ Thêm vào GĐ này]  │
│   └── TA12: Họp mổ xẻ sự cố (Post-mortem) & Lập Báo cáo Sự việc[SLA: test]    [Mới]           [✏️] [🗑️]   │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Chi tiết các thành phần giao diện mới:
1. **Header Tab Công việc:**
   - Chỉ số tổng hợp tiến độ: Hiển thị tổng số task, số task đã hoàn thành và phần trăm tiến độ tổng.
   - Nút **`[📋 Áp dụng mẫu nhiệm vụ]`**: Mở modal chọn mẫu template theo loại sự cố.
   - Nút **`[+ Tạo công việc]`**: Mở modal tạo công việc thủ công.
   - Bộ lọc nhanh: Lọc task theo trạng thái (`Tất cả`, `Của tôi`, `Chờ xử lý`, `Hoàn thành`).
2. **Cấu trúc Accordion 6 Giai đoạn chuẩn:**
   - 6 khối giai đoạn cố định theo đúng thứ tự NIST:
     * `Giai đoạn 1: Chuẩn bị (Preparation)`
     * `Giai đoạn 2: Phát hiện và phân tích (Detection & Analysis)`
     * `Giai đoạn 3: Ngăn chặn (Containment)`
     * `Giai đoạn 4: Loại bỏ (Eradication)`
     * `Giai đoạn 5: Khôi phục (Recovery)`
     * `Giai đoạn 6: Tổng kết rút kinh nghiệm (Post-Incident / Lessons Learned)`
   - Cho phép bấm thu gọn / mở rộng từng khối giai đoạn.
   - Trên thanh header của từng giai đoạn hiển thị:
     * Tên giai đoạn + Badge tỷ lệ hoàn thành (ví dụ: `2/3 Hoàn thành - 67%`).
     * Mini progress bar riêng của giai đoạn.
     * Nút **`[+ Thêm vào GĐ này]`**: Bấm vào tự động mở modal tạo task với trường Giai đoạn đã được chọn sẵn.
3. **Thẻ Task (Row Item) trong từng giai đoạn:**
   - **Tên & Mã Task:** Click vào mở drawer/modal xem chi tiết.
   - **Badge Phụ thuộc:**
     * Nếu bị khóa: Hiển thị `🔒 Chờ [Mã task tiền nhiệm]` (màu vàng cam viền đỏ), tooltip hiển thị tên task tiền nhiệm đang chặn nó.
     * Nếu đã mở khóa: Hiển thị `🔗 Tiền nhiệm: [Mã task]` (màu xám nhạt).
   - **Badge SLA:** Hiển thị trạng thái SLA hiện có (`⏱️ Còn 15m`, `⚠️ Trễ 02h`, `✓ Đạt SLA`).
   - **Trạng thái:** Dropdown chuyển trạng thái nhanh:
     * Nếu đang ở trạng thái `Bị khóa (Blocked)`: Dropdown bị disable, không cho phép đổi sang Đang xử lý / Hoàn thành.
     * Khi chọn `Hoàn thành`: Tự động mở Modal Ghi nhận kết quả xử lý.
   - **Cụm thao tác:**
     * Nút **Xem kết quả (icon con mắt 👁️)**: Chỉ hiển thị khi task đã Hoàn thành, bấm vào xem nhanh kết quả và file bằng chứng.
     * Nút **Chỉnh sửa (icon bút chì ✏️)**: Mở modal sửa task.
     * Nút **Xóa (icon thùng rác 🗑️)**: Cho phép xóa task (có kiểm tra ràng buộc không cho xóa nếu có task khác phụ thuộc vào nó).

---

# 3. PHẦN II: THAY ĐỔI TẠI MÀN HÌNH "CÔNG VIỆC" (`/task`) & MODAL TẠO/SỬA TASK

### 3.1. Thay đổi trên Màn hình Danh sách Công việc (`/task`)
1. **Tại cột Danh sách (Cột bên trái):**
   - Trên mỗi thẻ công việc (Task Card), bổ sung:
     * Badge **Giai đoạn ứng cứu** (ví dụ: `[GĐ 3: Ngăn chặn]` màu xanh tím).
     * Badge cảnh báo `🔒 Chờ phụ thuộc` nếu task đang bị khóa bởi task khác.
2. **Tại cột Chi tiết Công việc (Cột bên phải):**
   - Bổ sung trường hiển thị **Giai đoạn ứng cứu**: Hiển thị tên giai đoạn và số thứ tự (ví dụ: *Giai đoạn 3: Ngăn chặn*).
   - Bổ sung khối **Nhiệm vụ phụ thuộc (Dependencies)**:
     * Hiển thị danh sách các task tiền nhiệm (nhiệm vụ phải chờ) kèm trạng thái hiện tại của các task đó.
     * Hiển thị danh sách các task kế nhiệm (nhiệm vụ đang chờ task này hoàn thành).
   - Bổ sung khối **Kết quả thực hiện (Resolution Result)**:
     * Hiển thị nội dung kết quả, đánh giá kết quả (*Thành công / Thất bại / Một phần*), người hoàn thành và thời gian hoàn thành.
   - Bổ sung nút **`XÓA CÔNG VIỆC`** màu đỏ cạnh nút `CHỈNH SỬA CÔNG VIỆC`.

---

### 3.2. Form Tạo mới / Chỉnh sửa Công việc (Modal)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ Tạo công việc mới                                                            [X] │
├──────────────────────────────────────────────────────────────────────────────────┤
│ Thuộc sự việc *                                  Loại công việc *                │
│ [CA01346751: Sự cố Ransomware Server DB       ▼] [Thủ công                    ▼] │
│                                                                                  │
│ Giai đoạn ứng cứu *                              Mức độ ưu tiên *                │
│ [Giai đoạn 3: Ngăn chặn (Containment)         ▼] [Cao                         ▼] │
│                                                                                  │
│ Tên công việc *                                  Mã công việc *                  │
│ [Cô lập máy chủ Database khỏi cụm mạng LAN     ] [TA76782850                  X] │
│                                                                                  │
│ Đơn vị xử lý *                                   Người thực hiện *               │
│ [NCS                                          ▼] [tomhagen                    ▼] │
│                                                                                  │
│ SLA áp dụng * (Thời hạn hoàn thành)              Nhiệm vụ phụ thuộc              │
│ [A05 (Xử lý trong 02 giờ)                   ▼] [+] [Chọn nhiệm vụ trong Case ▼] │
│                                                  (TA03: Thu thập IoC EDR        X)
│ Mô tả công việc                                                                  │
│ [Đăng nhập Switch Core VLAN 10, cấu hình shutdown port gi1/0/24 hoặc đặt quarantine...]
│                                                                                  │
│ File đính kèm                                                                    │
│ [ ⬆️ Kéo thả hoặc bấm để tải lên file hướng dẫn/kịch bản (tối đa 50MB)        ] │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                        [ HỦY ]   [ TẠO MỚI ]     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

#### Quy tắc các trường trên Form:
1. **Thuộc sự việc (*):** Chọn Case liên kết (tự động khóa nếu tạo từ Case).
2. **Giai đoạn ứng cứu (*):** Dropdown chọn 1 trong 6 giai đoạn chuẩn NIST (tự động điền nếu tạo từ header giai đoạn).
3. **Tên công việc (*):** Input văn bản.
4. **Mã công việc (*):** Hệ thống tự sinh (cho phép sửa).
5. **Đơn vị xử lý (*)** & **Người thực hiện (*).**
6. **SLA áp dụng (*):** Dropdown chọn gói SLA để xác định thời hạn hoàn thành (ví dụ: `A05 - 2 giờ`, `SLA2HCCV - 4 giờ`...). Tận dụng trường SLA làm thước đo thời hạn.
7. **Nhiệm vụ phụ thuộc (Tùy chọn - Optional):**
   - Dropdown đa chọn danh sách các nhiệm vụ đang có trong cùng Case.
   - Hệ thống tự động loại trừ chính task hiện tại và các task sẽ gây vòng lặp phụ thuộc (Cycle detection).
8. **Mô tả & File đính kèm.**

---

### 3.3. Modal Xác nhận Hoàn thành & Ghi nhận Kết quả (Complete Task Modal)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ Xác nhận hoàn thành nhiệm vụ: TA76782850                                      [X] │
├──────────────────────────────────────────────────────────────────────────────────┤
│ Bạn đang chuyển trạng thái nhiệm vụ sang HOÀN THÀNH. Vui lòng ghi nhận kết quả: │
│                                                                                  │
│ Đánh giá kết quả thực hiện *                                                     │
│ (•) Thành công          ( ) Thành công một phần          ( ) Thất bại/Không khả thi│
│                                                                                  │
│ Nội dung kết quả xử lý *                                                         │
│ [Đã ngắt kết nối card mạng máy chủ 192.168.1.50 trên vCenter thành công.       ] │
│ [Mã độc không còn khả năng phát tán sang các máy chủ khác trong cùng VLAN.      ] │
│                                                                                  │
│ File đính kèm bằng chứng (Log/Ảnh chụp/Report)                                   │
│ [ ⬆️ Tải lên file log cô lập mạng, ảnh chụp xác nhận (tối đa 50MB)            ] │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                    [ HỦY ]   [ LƯU & HOÀN THÀNH ]│
└──────────────────────────────────────────────────────────────────────────────────┘
```

- **Ràng buộc:** Bắt buộc phải chọn `Đánh giá kết quả` và nhập `Nội dung kết quả xử lý` mới cho phép bấm nút `LƯU & HOÀN THÀNH`.
- **Hành vi hệ thống sau khi lưu:**
  - Lưu nội dung kết quả vào task.
  - Ghi nhận Audit Log vào Case: *"User [Tên] đã hoàn thành nhiệm vụ TA... với kết quả: [Tóm tắt]"*.
  - Tự động kích hoạt kiểm tra và mở khóa cho các nhiệm vụ phụ thuộc phía sau.

---

### 3.4. Thao tác Xóa nhiệm vụ & Ràng buộc an toàn
- Khi bấm nút `XÓA CÔNG VIỆC` (hoặc icon thùng rác):
  - **Trường hợp 1 (Có nhiệm vụ khác đang phụ thuộc vào nó):**
    - Hệ thống **CHẶN XÓA** và hiển thị popup cảnh báo lỗi:
      > *"⛔ KHÔNG THỂ XÓA NHIỆM VỤ NÀY:  
      Nhiệm vụ [TA76782850: Cô lập máy chủ Database] đang là điều kiện tiền nhiệm của các nhiệm vụ sau:  
      • TA10: Vá lỗ hổng dịch vụ RDP  
      • TA11: Khôi phục dữ liệu  
      Vui lòng gỡ bỏ liên kết phụ thuộc tại các nhiệm vụ trên trước khi thực hiện xóa!"*
  - **Trường hợp 2 (Không có nhiệm vụ nào phụ thuộc):**
    - Hiển thị modal xác nhận xóa thông thường: *"Bạn có chắc chắn muốn xóa vĩnh viễn nhiệm vụ này?"* ➔ Bấm xác nhận để xóa.

---

# 4. PHẦN III: BỔ SUNG TÍNH NĂNG "QUẢN LÝ MẪU NHIỆM VỤ" (TASK TEMPLATES)

### 4.1. Vị trí Menu và Bố cục Màn hình Danh sách Mẫu
- **Vị trí đề xuất:** Thêm mục mới tại menu **QUY TRÌNH** ➔ **"Mẫu nhiệm vụ sự cố"** (hoặc trong phân hệ Cài đặt / Quản trị).
- **Màn hình Danh sách Mẫu (Template List):**
  - Thanh tìm kiếm theo Tên mẫu, Bộ lọc theo Loại sự cố (Ransomware, Phishing, DDoS, Data Leak...).
  - Nút **`+ Thêm mẫu nhiệm vụ mới`**.
  - Bảng danh sách:
    * *Mã mẫu:* `TPL_RANSOMWARE_01`, `TPL_PHISHING_01`...
    * *Tên mẫu:* `Quy trình checklist ứng cứu sự cố Ransomware`.
    * *Loại sự cố áp dụng:* Badge `Mã độc tống tiền (Ransomware)`.
    * *Số lượng nhiệm vụ:* `12 nhiệm vụ (đủ 6 giai đoạn)`.
    * *Trạng thái:* Công tắc Bật/Tắt (Active/Inactive).
    * *Thao tác:* Icon Sửa, Icon Xóa, Icon Nhân bản (Clone template).

---

### 4.2. Màn hình Tạo / Cấu hình Chi tiết Mẫu (Template Builder)

Giao diện trực quan chia thành 2 phần:

#### 1. Thông tin chung của Mẫu:
- **Tên mẫu (*):** Ví dụ: *Checklist xử lý sự cố Ransomware chuẩn nội bộ*.
- **Mã mẫu (*):** Tự sinh dạng `TPL_...`.
- **Loại sự cố áp dụng (*):** Dropdown liên kết trực tiếp với danh mục `Loại sự việc` của SOAR.
- **Mô tả kịch bản:** Tóm tắt phạm vi áp dụng quy trình.

#### 2. Khu vực Cấu hình Nhiệm vụ theo 6 Giai đoạn:
Hiển thị sẵn 6 khối tương ứng 6 giai đoạn NIST:
- Dưới mỗi giai đoạn có nút **`+ Thêm nhiệm vụ mẫu`**:
  * **Tên nhiệm vụ mẫu (*):** Ví dụ: *Cô lập máy tính nghi ngờ nhiễm mã độc*.
  * **Mô tả / SOP hướng dẫn (*):** Điền sẵn các bước kỹ thuật chuẩn để kỹ sư làm theo.
  * **SLA áp dụng mặc định (*):** Dropdown chọn SLA chuẩn (ví dụ: `A05 - 2 giờ`).
  * **Vai trò phụ trách gợi ý:** Dropdown chọn vai trò tiếp nhận (ví dụ: `Tier 1 Analyst`, `Tier 2 Analyst`, `Incident Commander`).
  * **Thiết lập quan hệ phụ thuộc trong Mẫu (Pre-defined Dependencies):**
    - Dropdown chọn các nhiệm vụ mẫu khác đã tạo trong cùng template này (ví dụ: quy định sẵn Task *Diệt mã độc* phụ thuộc Task *Cô lập mạng*).

---

# 5. PHẦN IV: CƠ CHẾ ÁP DỤNG MẪU & VẬN HÀNH QUAN HỆ PHỤ THUỘC (DEPENDENCY LIFECYCLE)

### 5.1. Cơ chế Tự động sinh Nhiệm vụ theo Mẫu khi Khởi tạo Sự việc (Case Creation Auto Provisioning)

> [!IMPORTANT]
> **Quy tắc cốt lõi về Mẫu nhiệm vụ:**
> - Với mỗi Loại sự cố (ví dụ: *Ransomware, Phishing, DDoS...*) tại một thời điểm, chỉ có **duy nhất 1 Mẫu nhiệm vụ ở trạng thái ĐANG HOẠT ĐỘNG (ACTIVE)** làm quy chuẩn mặc định.
> - Khi có bất kỳ Sự việc (Case) nào được sinh ra trong hệ thống (dù tạo thủ công hay tự động chuyển từ Cảnh báo/Alert Escalation), máy chủ SOAR sẽ **tự động kích hoạt Mẫu Active tương ứng của Loại sự việc đó để sinh ra toàn bộ danh sách nhiệm vụ** gắn vào Sự việc mà không cần kỹ sư phải thao tác áp dụng thủ công.

```mermaid
sequenceDiagram
    autonumber
    actor User as 👨‍💻 Người dùng / Hệ thống Cảnh báo
    participant API as ⚙️ SOAR Backend API
    participant Engine as 🤖 Auto Provisioning & DAG Engine
    participant DB as 🗄️ Cơ sở dữ liệu
    participant CaseUI as 🖥️ Tab Công việc trong Case

    User->>API: Tạo Sự việc mới POST /api/v1/cases {title, incident_type: 'Ransomware'}
    API->>DB: INSERT INTO soar_cases (Lưu Sự việc)
    API->>Engine: Bắn sự kiện CaseCreatedEvent(case_id, incident_type='Ransomware')
    Engine->>DB: Truy vấn Mẫu Active duy nhất: SELECT * FROM soar_task_templates WHERE incident_type='Ransomware' AND status='ACTIVE'
    DB-->>Engine: Trả về Mẫu quy chuẩn (12 nhiệm vụ theo 6 giai đoạn NIST)
    Engine->>DB: Bulk insert 12 nhiệm vụ vào bảng soar_tasks theo case_id
    Engine->>Engine: Phân giải đồ thị DAG, ánh xạ ID phụ thuộc thực tế
    Engine->>DB: Đánh dấu is_blocked=TRUE cho các task kế nhiệm (GĐ 3, 4, 5)
    DB-->>API: Hoàn tất transaction tạo Case & sinh Nhiệm vụ
    User->>CaseUI: Mở chi tiết Sự việc -> Chuyển sang Tab 'CÔNG VIỆC'
    CaseUI->>API: GET /api/v1/cases/{case_id}/tasks
    API-->>CaseUI: Trả về cây dữ liệu 12 nhiệm vụ đã phân nhóm sẵn 6 giai đoạn
    CaseUI-->>User: Render 6 giai đoạn: GĐ 1, 2 mở khóa (Mới); GĐ 3, 4, 5 tự động mang trạng thái [🔒 Bị khóa]
```

1. **Khởi tạo thông minh tự động:**
   - Các task **không có phụ thuộc** (thường ở Giai đoạn 1: Chuẩn bị, Giai đoạn 2: Phân tích) sẽ ngay lập tức ở trạng thái **`Mới (Sẵn sàng xử lý)`**.
   - Các task **có phụ thuộc vào task khác** sẽ tự động ở trạng thái **`Chờ nhiệm vụ trước (Blocked)`** kèm icon ổ khóa 🔒.
   - Khi kỹ sư truy cập Tab Công việc, danh sách nhiệm vụ và SOP đã sẵn sàng hiển thị đầy đủ, giúp triển khai ứng phó tức thì.

---

### 5.2. Vòng đời Tự động Mở khóa (Auto-Unblock Lifecycle)

```
[Nhiệm vụ A] (Đang xử lý)
     │
     ▼ (Kỹ sư hoàn thành & nhập kết quả)
[Nhiệm vụ A] ➔ [Hoàn thành]
     │
     ├─ Trực tiếp kích hoạt Event: TaskCompleted(A)
     │
     ▼
[Kiểm tra Task B] (Đang phụ thuộc vào A)
     │
     ├─ Task B còn phụ thuộc task nào khác chưa xong không?
     │    ├── CÓ  ➔ Giữ nguyên trạng thái [🔒 Bị khóa]
     │    └── KHÔNG ➔ CHUYỂN TRẠNG THÁI SANG [Mới (Sẵn sàng làm)]
     │
     ▼
[Gửi Thông báo Khẩn cấp]
     └─ Bắn Notification (In-app / Telegram) cho Người thực hiện Task B:
        "🔔 Nhiệm vụ [Tên A] đã hoàn thành. Bạn có thể bắt đầu xử lý nhiệm vụ [Tên B]!"
```

---

# 6. ĐẶC TẢ CƠ SỞ DỮ LIỆU & API PHỤC VỤ CÁC PHẦN

### 6.1. Cập nhật Bảng CSDL hiện tại: `soar_tasks`
Giữ nguyên trường `sla_id` làm thời hạn hoàn thành, chỉ thêm các cột phục vụ Giai đoạn, Kết quả và Phụ thuộc:

```sql
ALTER TABLE soar_tasks
  ADD COLUMN phase INT NOT NULL DEFAULT 1 COMMENT '1: Chuẩn bị, 2: Phân tích, 3: Ngăn chặn, 4: Loại bỏ, 5: Khôi phục, 6: Tổng kết',
  ADD COLUMN result TEXT NULL COMMENT 'Nội dung kết quả xử lý thực tế',
  ADD COLUMN result_status VARCHAR(50) NULL COMMENT 'SUCCESS (Thành công), PARTIAL (Một phần), FAILED (Thất bại)',
  ADD COLUMN completed_at DATETIME NULL COMMENT 'Thời điểm hoàn thành thực tế',
  ADD COLUMN completed_by VARCHAR(100) NULL COMMENT 'Username người xác nhận hoàn thành',
  ADD COLUMN depends_on_ids JSON NULL COMMENT 'Mảng chứa các ID task phụ thuộc trong cùng Case: ["TA01", "TA02"]',
  ADD COLUMN is_blocked BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'TRUE nếu có ít nhất 1 task tiền nhiệm chưa hoàn thành';

-- Index tăng tốc truy vấn phân nhóm theo Case và Giai đoạn
CREATE INDEX idx_tasks_case_phase ON soar_tasks(case_id, phase);
CREATE INDEX idx_tasks_blocked ON soar_tasks(case_id, is_blocked);
```

### 6.2. Tạo 2 Bảng Quản lý Mẫu nhiệm vụ: `soar_task_templates` & `soar_task_template_items`

```sql
-- Bảng Mẫu nhiệm vụ
CREATE TABLE soar_task_templates (
  id VARCHAR(64) PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  incident_type VARCHAR(100) NOT NULL COMMENT 'Loại sự việc: Ransomware, Phishing, DDoS...',
  description TEXT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_by VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng chi tiết từng nhiệm vụ mẫu trong template
CREATE TABLE soar_task_template_items (
  id VARCHAR(64) PRIMARY KEY,
  template_id VARCHAR(64) NOT NULL,
  phase INT NOT NULL COMMENT '1 đến 6',
  item_code VARCHAR(50) NOT NULL COMMENT 'Mã định danh item trong mẫu (ví dụ: T1_01, T2_01)',
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  default_role VARCHAR(100) NULL COMMENT 'Vai trò gợi ý tiếp nhận',
  sla_id VARCHAR(64) NULL COMMENT 'Gói SLA áp dụng mặc định',
  depends_on_item_codes JSON NULL COMMENT 'Mảng mã item tiền nhiệm trong mẫu: ["T1_01"]',
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (template_id) REFERENCES soar_task_templates(id) ON DELETE CASCADE
);
```

### 6.3. Danh mục API Endpoints

| Phương thức | Endpoint API | Chức năng thực hiện |
| :--- | :--- | :--- |
| `GET` | `/api/v1/cases/{case_id}/tasks/grouped` | Lấy cây danh sách nhiệm vụ của Case gom nhóm theo 6 giai đoạn kèm tiến độ %. |
| `POST` | `/api/v1/cases/{case_id}/tasks` | Tạo mới nhiệm vụ thủ công trong Case (chọn giai đoạn, SLA, task phụ thuộc). |
| `PUT` | `/api/v1/tasks/{task_id}` | Chỉnh sửa thông tin nhiệm vụ (kiểm tra chống vòng lặp phụ thuộc). |
| `POST` | `/api/v1/tasks/{task_id}/complete` | Ghi nhận kết quả xử lý, hoàn thành task và kích hoạt auto-unblock task sau. |
| `DELETE`| `/api/v1/tasks/{task_id}` | Xóa nhiệm vụ (chặn xóa nếu có task khác phụ thuộc). |
| `GET` | `/api/v1/task-templates` | Lấy danh sách các Mẫu nhiệm vụ theo loại sự cố. |
| `POST` | `/api/v1/task-templates` | Tạo mới / cập nhật Mẫu nhiệm vụ và các task con theo 6 giai đoạn. |
| `POST` | `/api/v1/cases/{case_id}/apply-template` | Áp dụng template vào Case (sinh tự động hàng loạt task và map chuỗi phụ thuộc). |

---

# 7. BẢNG TỔNG HỢP KIỂM THỬ VÀ NGHIỆM THU (TESTING CHECKLIST)

| STT | Kịch bản kiểm thử (Test Scenario) | Kết quả mong đợi (Expected Result) |
| :---: | :--- | :--- |
| **TC-01** | Tạo task thủ công trong Case chọn Giai đoạn 2 và chọn SLA `A05`. | Task hiển thị đúng trong khối Accordion `Giai đoạn 2: Phát hiện & Phân tích` với badge SLA tương ứng. |
| **TC-02** | Tạo Task B chọn phụ thuộc vào Task A (Task A đang `Mới`). | Task B tự động ở trạng thái `Chờ nhiệm vụ trước (Blocked)` kèm icon ổ khóa 🔒; dropdown trạng thái của B bị vô hiệu hóa. |
| **TC-03** | Thử chuyển Task B bị khóa sang `Đang xử lý` hoặc `Hoàn thành`. | Hệ thống chặn thao tác và hiển thị cảnh báo: *"Cần hoàn thành Task A trước"*. |
| **TC-04** | Chuyển Task A sang `Hoàn thành` nhưng để trống ô Kết quả xử lý. | Hệ thống chặn lưu và yêu cầu bắt buộc nhập *Đánh giá kết quả* và *Nội dung kết quả xử lý*. |
| **TC-05** | Hoàn thành Task A với đầy đủ kết quả. | Task A chuyển `Hoàn thành`, hiển thị icon xem kết quả; Task B tự động được mở khóa sang `Mới`, bắn thông báo cho người làm Task B. |
| **TC-06** | Thử xóa Task A trong khi Task B đang phụ thuộc vào Task A. | Hệ thống chặn xóa và hiển thị thông báo yêu cầu gỡ liên kết phụ thuộc tại Task B trước. |
| **TC-07** | Thử tạo vòng lặp: A phụ thuộc B, B phụ thuộc C, sửa C phụ thuộc A. | Hệ thống chặn lưu và thông báo: *"Phát hiện vòng lặp phụ thuộc không hợp lệ"*. |
| **TC-08** | Bấm nút `[📋 Áp dụng mẫu nhiệm vụ]` chọn Mẫu Ransomware. | Hệ thống sinh toàn bộ 12 task phân bổ chính xác vào 6 giai đoạn, các task phụ thuộc tự động khóa đúng thiết kế. |
