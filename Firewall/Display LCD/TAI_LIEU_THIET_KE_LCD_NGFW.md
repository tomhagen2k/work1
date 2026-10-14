# ĐẶC TẢ THIẾT KẾ HỆ THỐNG HIỂN THỊ VÀ ĐIỀU KHIỂN LCD 20x2 CHO THIẾT BỊ NCS - NGFW

> **Phiên bản:** 1.2  
> **Áp dụng cho thiết bị:** Firewall / Thiết bị mạng 1U Rackmount `NCS - NGFW`  
> **Quy cách phần cứng:** Màn hình LCD ký tự 20x2 (20 cột x 2 dòng), 4 phím bấm hàng ngang (`◀`, `▲`, `▼`, `▶`), cụm đèn LED trạng thái và lỗ chọc Reset.  
> **Nguyên tắc độ dài chuỗi:** Tối đa 20 ký tự mỗi dòng (Độ dài $\le 20$). Nội dung hiển thị tự nhiên, ngắn gọn, chỉ tận dụng tối đa 20 ký tự cho các trường dữ liệu dài cần thiết (như địa chỉ IP, kết hợp tải & nhiệt độ).

---

## MỤC LỤC
1. [Đặc tả phần cứng & Kịch bản hiển thị đèn LED](#1-đặc-tả-phần-cứng--kịch-bản-hiển-thị-đèn-led)
2. [Vòng đời vận hành & Các trạng thái nghỉ](#2-vòng-đời-vận-hành--các-trạng-thái-nghỉ)
3. [Quy ước điều hướng 4 nút bấm](#3-quy-ước-điều-hướng-4-nút-bấm)
4. [Cấu trúc cây Menu chính (3 nhóm cốt lõi)](#4-cấu-trúc-cây-menu-chính-3-nhóm-cốt-lõi)
5. [Bảng đặc tả chi tiết từng màn hình hiển thị 20x2](#5-bảng-đặc-tả-chi-tiết-từng-màn-hình-hiển-thị-20x2)
6. [Quy trình xác nhận an toàn cho nhóm 3. CONTROL](#6-quy-trình-xác-nhận-an-toàn-cho-nhóm-3-control)

---

## 1. ĐẶC TẢ PHẦN CỨNG & KỊCH BẢN HIỂN THỊ ĐÈN LED

Dựa trên thiết bị `NCS - NGFW` thực tế:

1. **Màn hình LCD 20x2:**
   - Số cột: 20 ký tự trên mỗi dòng.
   - Số dòng: 2 dòng hiển thị độc lập.
   - Đèn nền LED xanh lục (Green Backlight).

2. **Cụm 4 phím bấm mặt trước (bố trí hàng ngang bên dưới LCD):**
   - Nút 1: `[ ◀ ]` (Mũi tên trái)
   - Nút 2: `[ ▲ ]` (Mũi tên lên)
   - Nút 3: `[ ▼ ]` (Mũi tên xuống)
   - Nút 4: `[ ▶ ]` (Mũi tên phải)

3. **Cụm đèn LED và lỗ Reset ở góc phải:**
   - **Đèn biểu tượng Nguồn (⏻):** Báo trạng thái nguồn điện cấp cho bo mạch.
   - **Đèn biểu tượng Nhịp tim (Heartbeat / Pulse):** Báo trạng thái hoạt động của hệ điều hành và tiến trình lõi (Kernel/Daemon Status).
   - **Đèn biểu tượng Ổ đĩa (Disk Activity):** Báo trạng thái đọc/ghi của ổ cứng / SSD lưu trữ.
   - **Lỗ kim chọc RESET (Hardware Reset Pinhole):** Nút reset phần cứng khẩn cấp, dùng que chọc khi hệ thống bị treo cứng không phản hồi nút bấm mặt trước.

### 1.1. Kịch bản chi tiết hiển thị các đèn LED

#### A. Đèn biểu tượng Nguồn (Power LED - ⏻)
* **Tắt (Off):** Thiết bị chưa cắm nguồn điện hoặc công tắc nguồn phía sau tắt.
* **Sáng Xanh đứng (Solid Green):** Thiết bị đã bật nguồn thành công, bo mạch chủ và các đường nguồn (12V, 5V, 3.3V) hoạt động ổn định.
* **Sáng Cam / Nhấp nháy Cam (Amber / Blinking Amber):** Nguồn điện cấp bị lỗi sụt áp hoặc máy đang ở chế độ chờ (Standby / Soft-off).

#### B. Đèn biểu tượng Nhịp tim (Heartbeat / Status LED)
Đây là đèn quan trọng nhất để kỹ thuật viên nhận biết máy có đang xử lý gói tin hay bị "treo mềm":
* **Tắt (Off):** Hệ thống đang tắt nguồn hoặc giai đoạn BIOS/Bootloader sơ khai chưa nạp Kernel.
* **Nhấp nháy nhanh (Fast Blink - 4 lần/giây, chu kỳ 250ms):** 
  * *Ý nghĩa:* Hệ điều hành đang trong giai đoạn nạp Kernel, nạp driver mạng hoặc đang thực hiện tác vụ đặc biệt (khôi phục cài đặt gốc, ghi firmware vào ROM).
* **Nhấp nháy nhịp tim (Heartbeat Blink - 1 lần/giây: sáng 0.5s, tắt 0.5s):** 
  * *Ý nghĩa:* Hệ thống hoạt động bình thường (Healthy). Service daemon chạy ngầm liên tục gửi tín hiệu "đập nhịp tim" ra GPIO của đèn để chứng minh CPU và OS không bị deadlock.
* **Sáng đứng liên tục hoặc Tắt lịm trong khi máy vẫn bật nguồn (Solid ON / Freeze OFF > 3 giây):** 
  * *Ý nghĩa:* **Hệ điều hành bị treo cứng (Kernel Panic / CPU Lockup / Deadlock)**. Dịch vụ daemon không còn gửi xung nhịp tim được nữa. Kỹ sư phòng máy chỉ cần nhìn đèn này đứng yên là biết ngay mạng đã tê liệt mà không cần cắm màn hình.
* **Nhấp nháy bất thường 2 nhịp nhanh 1 nhịp chậm (Double Blink):**
  * *Ý nghĩa:* Cảnh báo phần cứng (Hardware Warning) như nhiệt độ CPU vượt ngưỡng 75°C hoặc 1 trong 2 quạt tản nhiệt bị kẹt/ngừng quay.

#### C. Đèn biểu tượng Ổ đĩa (Disk Activity LED)
* **Tắt (Off):** Không có hoạt động đọc/ghi dữ liệu lên ổ SSD/eMMC.
* **Nhấp nháy ngắt quãng không đều (Blinking):** Hệ thống đang đọc/ghi cơ sở dữ liệu luật firewall, nạp file cấu hình, ghi log lưu lượng hoặc đồng bộ dữ liệu.
* **Sáng đứng liên tục kéo dài:** Ổ đĩa đang chịu tải I/O cực cao (quá trình ghi log đột biến hoặc phân vùng ổ cứng đang bị check lỗi `fsck`).

---

### 1.2. Ma trận phối hợp trạng thái giữa Màn hình LCD và 3 Đèn LED

| Giai đoạn vận hành | Đèn Nguồn (⏻) | Đèn Nhịp tim (Heartbeat) | Đèn Ổ đĩa (Disk) | Màn hình LCD 20x2 | Hành động kỹ thuật viên |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Cấp điện chưa bật máy** | Sáng Cam / Tắt | Tắt | Tắt | Màn hình đen | Kiểm tra nguồn điện |
| **2. Đang Boot (0 - 45s)** | Sáng Xanh | Nhấp nháy nhanh (4Hz) | Nháy liên tục | Sáng đèn: `Loading OS... 45%` | Đang khởi động, chờ đợi |
| **3. Sẵn sàng / Bình thường** | Sáng Xanh | Nháy nhịp tim (1Hz) | Nháy ngắt quãng | Sáng đèn: Chế độ Auto-Cycle | Hệ thống hoạt động tối ưu |
| **4. Trạng thái nghỉ (Sleep)** | Sáng Xanh | Nháy nhịp tim (1Hz) | Nháy ngắt quãng | Tắt đèn nền (Màn hình đen) | Máy đang chạy tốt, tiết kiệm điện |
| **5. Cảnh báo Quá nhiệt/Quạt**| Sáng Xanh | Nháy kép (Double Blink) | Nháy bình thường | Hiện cảnh báo: `[CPU Temp] 78C!` | Kiểm tra vệ sinh quạt, phòng máy |
| **6. Treo hệ thống (Panic)** | Sáng Xanh | **Đứng yên / Không chớp** | Tắt hoặc đứng | Màn hình treo đơ hoặc đứng | Dùng que chọc lỗ **RESET** |
| **7. Đang Factory Reset** | Sáng Xanh | Nhấp nháy nhanh (4Hz) | Nháy dày đặc | `DO NOT POWER OFF!` | Tuyệt đối **không** rút điện |
| **8. Tắt máy an toàn (Halt)** | Sáng Xanh | **Tắt hẳn** | Tắt hẳn | `Safe to unplug!` | An tâm rút dây nguồn |
| **9. Khởi động lại (Reboot)** | Sáng Xanh | Tắt tạm thời 2s rồi nháy nhanh | Nháy khởi động | `Rebooting OS...` | Chờ máy khởi động lại |

---

## 2. VÒNG ĐỜI VẬN HÀNH & CÁC TRẠNG THÁI NGHỈ

```
               [BẬT NGUỒN / CẤP ĐIỆN]
                         │
                         ▼
             [STATE 0: SYSTEM BOOTING]
             - Sáng đèn nền 100%
             - Hiển thị tiến trình nạp OS
                         │ (Khởi động xong các service mạng)
                         ▼
             [STATE 1: IDLE AUTO-CYCLE]  ◄───────────────────────────┐
             - Tự động xoay vòng 4 Slide                            │
             - Mỗi Slide hiển thị đúng 5 giây                        │ (Hết 30s
                         │                                           │  không bấm
                         ├───── (Sau 60s không chạm nút) ─────┐      │  menu)
                         │                                    │      │
                         ▼ (Bấm [ ▶ ] để vào menu)            ▼      │
             [STATE 3: MENU ĐIỀU HƯỚNG]            [STATE 2: SLEEP]  │
             - Duyệt 3 nhóm chính                 - Tắt đèn nền LCD  │
             - Duyệt thông số chi tiết            - Màn hình đen     │
                         │                                    │      │
                         └────────────────────────────────────┴──────┘
                                  (Bấm phím bất kỳ để đánh thức)
```

### Chi tiết các trạng thái:

1. **State 0: Booting (Khởi động):**
   - Đèn nền LCD bật sáng.
   - Dòng 1: Hiển thị nhận diện thương hiệu `NCS - NGFW`.
   - Dòng 2: Hiển thị tiến trình nạp hệ thống.

2. **State 1: Idle Auto-Cycle (Chế độ chờ xoay vòng - 5 giây/Slide):**
   - Áp dụng khi hệ thống hoạt động ổn định và không có người bấm phím.
   - Cứ mỗi **5 giây**, màn hình tự động chuyển sang slide tiếp theo theo thứ tự:
     - *Slide 1 (Nhận diện thiết bị & Phiên bản)*
     - *Slide 2 (Thông tin cổng WAN)*
     - *Slide 3 (Thông tin cổng LAN)*
     - *Slide 4 (Hiệu năng CPU, Nhiệt độ & Thời gian chạy)*
   - Khi đang ở Auto-Cycle, người dùng bấm `[ ▶ ]` sẽ chuyển ngay sang **State 3 (Menu điều hướng)**.

3. **State 2: Backlight Sleep (Trạng thái ngủ tắt đèn nền):**
   - Nếu ở State 1 đủ **60 giây** mà không có bất kỳ ai bấm nút, hệ thống gọi lệnh ngắt đèn nền LCD (`Backlight = OFF`).
   - Màn hình tắt đen hoàn toàn giúp chống lão hóa tấm nền LCD và giảm tiêu thụ điện.
   - **Cơ chế đánh thức (Wake-up):** Nhấn **bất kỳ phím nào trong 4 phím** $\rightarrow$ Đèn nền bật sáng ngay lập tức và đưa về Slide 1 của State 1 (phím bấm đầu tiên này bị triệt tiêu, không kích hoạt lệnh bên trong để tránh bấm nhầm).

4. **State 3: Menu Timeout (Tự động thoát khi bỏ quên):**
   - Khi người dùng đang đứng ở bất kỳ menu con hoặc màn hình xác nhận nào, nếu **sau 30 giây không bấm thêm phím nào**, hệ thống tự động hủy tác vụ đang dở và quay về State 1 (Auto-Cycle).

---

## 3. QUY ƯỚC ĐIỀU HƯỚNG 4 NÚT BẤM

| Phím bấm | Vai trò chính | Chức năng trong các ngữ cảnh |
| :---: | :--- | :--- |
| `[ ▶ ]` | **Enter / Forward / Confirm** | - Ở màn hình chờ: Vào Menu chính.<br>- Ở Menu: Vào cấp menu con / Xem chi tiết.<br>- Ở màn hình xác nhận: Thực thi lệnh (`YES / Confirm`). |
| `[ ◀ ]` | **Back / Escape / Cancel** | - Ở Menu con: Quay lại cấp menu trước.<br>- Ở màn hình xác nhận: Hủy bỏ lệnh (`NO / Cancel`).<br>- **Nhấn giữ 2 giây:** Thoát ngay lập tức về màn hình chờ (Home Shortcut). |
| `[ ▲ ]` | **Up / Previous** | - Cuộn lên mục menu phía trên.<br>- Di chuyển qua trang thông số trước đó. |
| `[ ▼ ]` | **Down / Next** | - Cuộn xuống mục menu phía dưới.<br>- Di chuyển qua trang thông số tiếp theo.<br>- Dùng làm **phím bước đệm** để xác nhận lệnh nhạy cảm (`Press [v] to cont.`). |

---

## 4. CẤU TRÚC CÂY MENU CHÍNH (3 NHÓM CỐT LÕI)

Toàn bộ tính năng được gom lại thành **đúng 3 nhóm chính**:

```
[MAIN MENU]
 ├── 1. SYSTEM   (Giám sát tải hệ thống, RAM, SSD, Nhiệt độ, Quạt, Phiên Firewall)
 ├── 2. NETWORK  (Cổng WAN/LAN/DMZ, Trạng thái Link Up/Down, Gateway, Băng thông)
 └── 3. CONTROL  (Khởi động lại máy, Tắt máy an toàn, Khôi phục cài đặt gốc)
```

### Màn hình duyệt Menu chính (Cấp 1):

| Mã màn hình | Dòng 1 (Tiêu đề menu) | Dòng 2 (Danh mục chọn) | Mockup hiển thị (20x2) | Hành vi phím bấm |
| :--- | :--- | :--- | :--- | :--- |
| `M_MAIN_1` | `--- MAIN MENU ---` | `> 1. SYSTEM` | `--- MAIN MENU ---`<br>`> 1. SYSTEM` | Bấm `[ ▶ ]` vào nhóm System.<br>Bấm `[ ▼ ]` xuống mục 2. |
| `M_MAIN_2` | `--- MAIN MENU ---` | `> 2. NETWORK` | `--- MAIN MENU ---`<br>`> 2. NETWORK` | Bấm `[ ▶ ]` vào nhóm Network.<br>Bấm `[ ▼ ]` xuống mục 3; `[ ▲ ]` lên mục 1. |
| `M_MAIN_3` | `--- MAIN MENU ---` | `> 3. CONTROL` | `--- MAIN MENU ---`<br>`> 3. CONTROL` | Bấm `[ ▶ ]` vào nhóm Control.<br>Bấm `[ ▲ ]` lên mục 2. |

---

## 5. BẢNG ĐẶC TẢ CHI TIẾT TỪNG MÀN HÌNH HIỂN THỊ 20x2

> **Nguyên tắc độ dài:** Mọi dòng hiển thị đều có độ dài $\le 20$ ký tự, nội dung tự nhiên, không chèn khoảng trắng vô ích.

### 5.1. Các Slide của Chế độ chờ Auto-Cycle (State 1)

| Slide | Tên Slide | Dòng 1 ($\le 20$ ký tự) | Dòng 2 ($\le 20$ ký tự) | Mockup hiển thị (20x2) | Ghi chú vận hành |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **S1** | **Device Info** | `NCS - NGFW` | `Version: 1.3 - 2026` | `NCS - NGFW`<br>`Version: 1.3 - 2026` | Hiển thị 5 giây (Đúng ảnh thực tế) |
| **S2** | **WAN Info** | `Port 1 (WAN): UP` | `118.69.12.34/24` | `Port 1 (WAN): UP`<br>`118.69.12.34/24` | Hiển thị 5 giây (Báo DOWN nếu ngắt cáp) |
| **S3** | **LAN Info** | `Port 2 (LAN): UP` | `192.168.1.1/24` | `Port 2 (LAN): UP`<br>`192.168.1.1/24` | Hiển thị 5 giây |
| **S4** | **System Health**| `CPU: 14%  Temp: 48C` | `RAM: 2.1G  Up: 14d` | `CPU: 14%  Temp: 48C`<br>`RAM: 2.1G  Up: 14d` | Hiển thị 5 giây |

---

### 5.2. Chi tiết Nhóm 1: `1. SYSTEM` (Giám sát toàn diện)
> Dùng `[ ▲ ]` / `[ ▼ ]` để cuộn xem lần lượt các trang; bấm `[ ◀ ]` để quay về Menu chính.

| STT | Tên thông số | Dòng 1 ($\le 20$ ký tự) | Dòng 2 ($\le 20$ ký tự) | Mockup hiển thị (20x2) | Ý nghĩa kỹ thuật |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1.1** | **CPU & Temp** | `[CPU & Temp]` | `CPU: 14%  Temp: 48C` | `[CPU & Temp]`<br>`CPU: 14%  Temp: 48C` | Xem đồng thời tải xử lý và nhiệt độ CPU |
| **1.2** | **Memory (RAM)** | `[Memory / RAM]` | `Used: 2.1G / 8.0G` | `[Memory / RAM]`<br>`Used: 2.1G / 8.0G` | Giám sát dung lượng RAM sử dụng và tổng dung lượng |
| **1.3** | **Storage SSD** | `[Storage / SSD]` | `Used: 18% (48GB)` | `[Storage / SSD]`<br>`Used: 18% (48GB)` | Kiểm soát dung lượng để tránh tràn ổ đĩa log |
| **1.4** | **Cooling Fans** | `[Cooling Fans]` | `Fan1:4200  Fan2:4150` | `[Cooling Fans]`<br>`Fan1:4200  Fan2:4150` | Giám sát tốc độ vòng quay (RPM) của 2 quạt làm mát |
| **1.5** | **System Uptime**| `[System Uptime]` | `Up: 14d 08h 22m` | `[System Uptime]`<br>`Up: 14d 08h 22m` | Thời gian thiết bị hoạt động liên tục |
| **1.6** | **Firewall Sess**| `[Firewall Sessions]` | `Active:4892 Drop:142` | `[Firewall Sessions]`<br>`Active:4892 Drop:142` | Số lượng phiên kết nối NAT và số gói tin bị drop |
| **1.7** | **Firmware Ver** | `[Firmware Version]` | `NCS-NGFW v1.3 - 2026` | `[Firmware Version]`<br>`NCS-NGFW v1.3 - 2026` | Phiên bản hệ điều hành nạp trong máy |

---

### 5.3. Chi tiết Nhóm 2: `2. NETWORK` (Mạng & Kết nối Cổng)
> Dùng `[ ▲ ]` / `[ ▼ ]` để cuộn xem danh sách cổng và thông số định tuyến; bấm `[ ◀ ]` để quay về Menu chính.

| STT | Tên thông số | Dòng 1 ($\le 20$ ký tự) | Dòng 2 ($\le 20$ ký tự) | Mockup hiển thị (20x2) | Ý nghĩa kỹ thuật |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **2.1** | **Port 1 (WAN)** | `Port 1 (WAN): UP` | `118.69.12.34/24` | `Port 1 (WAN): UP`<br>`118.69.12.34/24` | IP công cộng kết nối Internet |
| **2.2** | **Port 2 (LAN)** | `Port 2 (LAN): UP` | `192.168.1.1/24` | `Port 2 (LAN): UP`<br>`192.168.1.1/24` | IP cổng mạng nội bộ của tổ chức |
| **2.3** | **Port 3 (DMZ)** | `Port 3 (DMZ): DOWN` | `10.10.10.1/24` | `Port 3 (DMZ): DOWN`<br>`10.10.10.1/24` | Báo rõ trạng thái `DOWN` nếu chưa cắm cáp |
| **2.4** | **Ports 4..8** | `Port 4 (ETH): DOWN` | `IP NOT ASSIGNED` | `Port 4 (ETH): DOWN`<br>`IP NOT ASSIGNED` | Thông báo chuẩn cho cổng vật lý chưa cấu hình |
| **2.5** | **Default GW** | `[Default Gateway]` | `118.69.12.1 (Port 1)` | `[Default Gateway]`<br>`118.69.12.1 (Port 1)` | Địa chỉ gateway trỏ ra ngoài và cổng kết nối |
| **2.6** | **Traffic Rate** | `[Traffic Rate]` | `In: 85M   Out: 32M` | `[Traffic Rate]`<br>`In: 85M   Out: 32M` | Băng thông thời gian thực truyền qua firewall |

---

### 5.4. Chi tiết Nhóm 3: `3. CONTROL` (Điều khiển máy)
Khi người dùng vào `3. CONTROL`, màn hình hiển thị danh sách 3 tác vụ chính:
- `> 1. Reboot System`
- `> 2. Shutdown`
- `> 3. Factory Reset`

| Mã màn | Dòng 1 (Tiêu đề nhóm) | Dòng 2 (Tác vụ chọn) | Mockup hiển thị (20x2) | Hành vi phím bấm |
| :--- | :--- | :--- | :--- | :--- |
| `M_CTRL_1` | `--- CONTROL ---` | `> 1. Reboot System` | `--- CONTROL ---`<br>`> 1. Reboot System` | Bấm `[ ▶ ]` vào luồng Reboot.<br>Bấm `[ ▼ ]` xuống mục 2. |
| `M_CTRL_2` | `--- CONTROL ---` | `> 2. Shutdown` | `--- CONTROL ---`<br>`> 2. Shutdown` | Bấm `[ ▶ ]` vào luồng Shutdown.<br>Bấm `[ ▼ ]` xuống mục 3; `[ ▲ ]` lên mục 1. |
| `M_CTRL_3` | `--- CONTROL ---` | `> 3. Factory Reset` | `--- CONTROL ---`<br>`> 3. Factory Reset` | Bấm `[ ▶ ]` vào luồng Factory Reset.<br>Bấm `[ ▲ ]` lên mục 2. |

---

## 6. QUY TRÌNH XÁC NHẬN AN TOÀN CHO NHÓM 3. CONTROL

Tất cả các tác vụ trong nhóm này đều là các lệnh thay đổi trạng thái hoạt động của hệ điều hành. Do đó, hệ thống áp dụng **cơ chế xác thực phím chéo 2 bước** để loại bỏ hoàn toàn khả năng bấm nhầm.

```
[Chọn tác vụ] ──▶ (Bấm [ ▶ ]) ──▶ [Bước 1: Cảnh báo bước đệm]
                                         │
                                         ▼ (Bắt buộc bấm [ ▼ ] để tiếp tục)
                                    [Bước 2: Xác nhận lần cuối]
                                         │
                                         ▼ (Bấm [ ▶ ] để thi hành / [ ◀ ] để hủy)
                                    [THỰC THI HỆ THỐNG]
```

---

### 6.1. Tác vụ 1: Khởi động lại hệ thống (Reboot System)

1. **Bước 1 (Kích hoạt lệnh):** Ở `3. CONTROL`, chọn `> 1. Reboot System` rồi bấm `[ ▶ ]`:
   ```text
   Reboot Firewall?
   Press [v] to cont.
   ```
   *(Nếu bấm `[ ◀ ]` $\rightarrow$ Hủy bỏ, trở lại menu).*

2. **Bước 2 (Xác nhận lần cuối):** Người dùng bấm phím `[ ▼ ]`:
   ```text
   Confirm Reboot?
   [>]YES    [<]NO
   ```

3. **Bước 3 (Thực thi):** Người dùng bấm `[ ▶ ]`:
   ```text
   Rebooting OS...
   Please wait...
   ```
   *Hành vi phần mềm:* Hệ thống gọi `systemctl reboot`. Đèn Heartbeat ngừng chớp và thiết bị bắt đầu chu trình nạp lại.

---

### 6.2. Tác vụ 2: Tắt máy an toàn (Shutdown)

1. **Bước 1 (Kích hoạt lệnh):** Ở `3. CONTROL`, chọn `> 2. Shutdown` rồi bấm `[ ▶ ]`:
   ```text
   Shutdown Device?
   Press [v] to cont.
   ```

2. **Bước 2 (Xác nhận lần cuối):** Người dùng bấm phím `[ ▼ ]`:
   ```text
   Confirm Power Off?
   [>]YES    [<]NO
   ```

3. **Bước 3 (Thực thi):** Người dùng bấm `[ ▶ ]`:
   ```text
   Halting System...
   Safe to unplug!
   ```
   *Hành vi phần mềm:* Hệ thống gọi `poweroff`. Dừng toàn bộ ổ cứng/SSD và tiến trình an toàn, tắt đèn nền LCD. Kỹ thuật viên có thể an tâm rút dây nguồn mà không lo hỏng dữ liệu.

---

### 6.3. Tác vụ 3: Khôi phục cài đặt gốc (Factory Reset)
*(Tác vụ nhạy cảm: xóa sạch toàn bộ cấu hình, logs, database quy tắc bảo mật)*

1. **Bước 1 (Cảnh báo ban đầu):** Ở `3. CONTROL`, chọn `> 3. Factory Reset` rồi bấm `[ ▶ ]`:
   ```text
   FACTORY RESET?!
   Press [v] to cont.
   ```

2. **Bước 2 (Cảnh báo mất dữ liệu hoàn toàn):** Người dùng bấm phím `[ ▼ ]`:
   ```text
   ERASE ALL DATA?!
   [>]YES    [<]NO
   ```

3. **Bước 3 (Tiến hành định dạng & khôi phục):** Người dùng bấm `[ ▶ ]`:
   ```text
   Resetting System...
   DO NOT POWER OFF!
   ```

4. **Bước 4 (Hoàn tất):**
   ```text
   Reset Completed!
   Rebooting now...
   ```
   *Hành vi phần mềm:* Xóa file cấu hình người dùng, khôi phục phân vùng `/etc` mặc định, sau đó tự khởi động lại về cài đặt ban đầu.
