# TEXT TIẾNG VIỆT CHO LCD 20x2 – NCS - NGFW (BẢN ĐỐI CHIẾU)

> **Tài liệu gốc:** `TAI_LIEU_THIET_KE_LCD_NGFW.md` v1.4.
> **Cách đọc:** mỗi mục dưới đây giữ **đúng số mục và bảng của tài liệu gốc**, chỉ thêm cột text tiếng Việt (không dấu) ngay cạnh cột text tiếng Anh. Luồng, phím, hành vi **không thay đổi**.
> Mục nào trong tài liệu gốc là khối màn hình (code block) thì được trình bày lại thành bảng `Dòng 1 / Dòng 2` để đặt cạnh nhau.
> Mọi text tiếng Việt đã được kiểm tra: chỉ ký tự ASCII, mỗi dòng ≤ 20 ký tự. Chỗ nào chọn cách dịch khác nghĩa đen thì có **Lưu ý** ngay dưới bảng.

---

## 1.5. Ma trận phối hợp LCD và LED

| Giai đoạn | LCD (tiếng Anh) | **LCD (tiếng Việt)** |
| :--- | :--- | :--- |
| **1. Chưa cấp điện / đã tắt** | Tối | Tối |
| **2. BIOS / GRUB / kernel** | `<-- NCA-2513 -->` | `<-- NCA-2513 -->` |
| **3. Khởi động userspace** | `NCS - NGFW      0:14`<br>`Starting... 12 left` | `NCS - NGFW      0:14`<br>`Khoi dong: con 12` |
| **4. Bình thường** | Auto-Cycle | Auto-Cycle (xem 5.1) |
| **5. Cảnh báo phần cứng** | Slide cảnh báo | Slide cảnh báo (xem 9) |
| **6. Treo** | Đứng hình | Đứng hình |
| **7. Giữ nút SWR** | `FACTORY RESET in 3s`<br>`Release to cancel` | `KHOI PHUC GOC SAU 3s`<br>`Buong nut de huy` |
| **8. Reset / nâng cấp** | `DO NOT POWER OFF!` | `KHONG DUOC NGAT DIEN` |
| **9. Reset bị từ chối / thất bại** | `Reset refused` / `Reset FAILED` | `Khong the reset` / `Reset THAT BAI` |
| **10. Tắt máy an toàn** | `Safe to unplug!` | `Da co the rut dien` |
| **11. Khởi động lại** | `Rebooting...` | `Dang khoi dong lai` |

**Lưu ý:**
- `<-- NCA-2513 -->` do driver `lmbiodrv` ghi, panel không đổi được.
- `Release to cancel`: không dùng "Nha nut" vì `Nha` (nhả) dễ đọc thành *nhà*.
- `Reset refused`: không dùng "Reset bi tu choi" vì `tu choi` dễ đọc thành *tự chơi*.

---

## 2. Vòng đời – State 0: Booting

| Dòng | Tiếng Anh | **Tiếng Việt** |
| :--- | :--- | :--- |
| Dòng 1 | `NCS - NGFW      0:14` | `NCS - NGFW      0:14` |
| Dòng 2 | `Starting... N left` | `Khoi dong: con N` |

**Lưu ý:** "Dang khoi dong... con 12" dài 24 ký tự, nên rút gọn.

---

## 4. Cây Menu chính

| Mã màn hình | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** | Hành vi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `M_MAIN_1` | `--- MAIN MENU ---` | `> 1. SYSTEM` | `--- MENU CHINH ---` | `> 1. HE THONG` | `[ ▶ ]` vào; `[ ▼ ]` xuống. |
| `M_MAIN_2` | `--- MAIN MENU ---` | `> 2. NETWORK` | `--- MENU CHINH ---` | `> 2. MANG` | `[ ▶ ]` vào; `[ ▲ ]` / `[ ▼ ]`. |
| `M_MAIN_3` | `--- MAIN MENU ---` | `> 3. CONTROL` | `--- MENU CHINH ---` | `> 3. DIEU KHIEN` | `[ ▶ ]` vào (hoặc màn hình nhập PIN); `[ ▲ ]` lên. |

---

## 5. Đặc tả từng màn hình – giá trị không lấy được

| Trường hợp | Tiếng Anh | **Tiếng Việt** |
| :--- | :--- | :--- |
| Một trường không có giá trị | `?` | `?` |
| Cả dòng không có dữ liệu | `NO DATA` | `KHONG CO DU LIEU` |

---

## 5.1. Slide Auto-Cycle

| Slide | Tên | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **S0** | Cảnh báo | `[!] CPU Temp 78C` | `Check fans/airflow` | `[!] Nhiet CPU 78C` | `Kiem tra quat gio` |
| **S1** | Thiết bị | `NCS - NGFW` | `FW 1.3.260826` | `NCS - NGFW` | `FW 1.3.260826` |
| **S2** | WAN | `Port 1 (WAN): UP` | `118.69.12.34/24` | `Cong 1 (WAN): UP` | `118.69.12.34/24` |
| **S3** | LAN | `Port 2 (LAN): UP` | `192.168.1.1/24` | `Cong 2 (LAN): UP` | `192.168.1.1/24` |
| **S4** | Sức khoẻ | `CPU: 14%  Temp: 48C` | `RAM: 2.1G  Up: 14d` | `CPU: 14%  Nhiet: 48C` | `RAM: 2.1G  Up: 14d` |

**Lưu ý:**
- S0: các cảnh báo khác xem mục 9.
- S4 dòng 2 giữ `Up` / `d`: viết "365 ngay" thì với giá trị lớn nhất `999d+` sẽ vượt 20 ký tự. Không dùng "Chay" (chạy) vì dễ đọc thành *cháy*.
- `UP` / `DOWN` / `OFF` giữ tiếng Anh (`Cong 12 (MGMT): DOWN` đã dài đúng 20).

---

## 5.2. Nhóm `1. SYSTEM`

| STT | Tên | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1.1** | CPU & Temp | `[CPU & Temp]` | `CPU: 14%  Temp: 48C` | `[CPU & Nhiet do]` | `CPU: 14%  Nhiet: 48C` |
| **1.2** | Board Temp | `[Board Temp]` | `SYS2: 41C` | `[Nhiet do bo mach]` | `SYS2: 41C` |
| **1.3** | Memory | `[Memory / RAM]` | `Used: 2.1G / 8.0G` | `[RAM da su dung]` | `2.1G / 8.0G` |
| **1.4** | Data disk | `[Data Disk]` | `Used: 18% of 240G` | `[Dung luong luu tru]` | `Da dung: 18%/240G` |
| **1.5** | Cooling Fan | `[Cooling Fan]` | `FAN1: 4200 rpm` | `[Quat lam mat]` | `Quat 1: 4200 rpm` |
| **1.6** | Power Rails | `[Power Rails]` | `12.1V  5.0V  3.3V` | `[Dien ap nguon]` | `12.1V  5.0V  3.3V` |
| **1.7** | Uptime | `[System Uptime]` | `Up: 14d 08h 22m` | `[Thoi gian van hanh]` | `14 ngay 08h 22m` |
| **1.8** | Firewall Sess | `[Firewall Sessions]` | `Act:4892  Drop:142` | `[Phien ket noi]` | `Act:4892  Drop:142` |
| **1.9** | Firmware | `[Firmware Version]` | `1.3.260826-serial1-` | `[Phien ban firmware]` | `1.3.260826-serial1-` |
| **1.10** | Serial | `[Serial Number]` | `NCS2026A00123` | `[So serial]` | `NCS2026A00123` |
| **1.11** | Reset Status | `[Reset Status]` | `Idle` | `[Trang thai reset]` | `Binh thuong` |

**Giá trị của 1.11 (Reset Status):**

| Tiếng Anh | **Tiếng Việt** |
| :--- | :--- |
| `Idle` | `Binh thuong` |
| `RESET PENDING` | `DANG DOI RESET` |
| `UPGRADE PENDING` | `DANG DOI NANG CAP` |
| `LAST RESET FAILED` | `RESET TRUOC THAT BAI` |
| `NEEDS SERVICE` | `CAN KY THUAT VIEN` |

**Lưu ý:**
- 1.3: "Da dung: 31.2G / 64.0G" dài 22 ký tự, nên chữ "đã sử dụng" được đưa lên dòng tiêu đề.
- 1.4: "O dia data" bị bỏ vì `O` (ổ) đứng một mình khó đọc và lẫn tiếng Anh; dùng "Dung luong luu tru" (đúng 20 ký tự có ngoặc). Dòng 2 không dùng "cua" (của) vì dễ đọc thành *cua*; thay bằng dấu `/`.
- 1.7: "Thoi gian hoat dong" có ngoặc là 21 ký tự; không dùng "chay" (*cháy*).
- 1.8: giữ `Act` / `Drop` (thuật ngữ quen thuộc). Nếu dịch thì "Bo" (bỏ) dễ đọc thành *bò / bố*.
- 1.11: *PENDING* dịch là "DANG DOI" (đang đợi) theo quyết định đã chốt. Không dùng "CHO" (chờ) vì dễ đọc thành *chó*.

---

## 5.3. Nhóm `2. NETWORK`

| Tình huống | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** |
| :--- | :--- | :--- | :--- | :--- |
| Cổng có IP | `Port 1 (WAN): UP` | `118.69.12.34/24` | `Cong 1 (WAN): UP` | `118.69.12.34/24` |
| Mất link | `Port 3 (DMZ): DOWN` | `10.10.10.1/24` | `Cong 3 (DMZ): DOWN` | `10.10.10.1/24` |
| Chưa cấu hình | `Port 4 (ETH): DOWN` | `IP NOT ASSIGNED` | `Cong 4 (ETH): DOWN` | `CHUA CO IP` |
| Đang chờ DHCP | `Port 1 (WAN): UP` | `DHCP: waiting` | `Cong 1 (WAN): UP` | `DHCP: dang lay IP` |
| Chỉ có IPv6 | `Port 5 (LAN): UP` | `2001:db8:10::1/64` | `Cong 5 (LAN): UP` | `2001:db8:10::1/64` |
| Tắt bởi quản trị | `Port 6 (ETH): OFF` | `Disabled` | `Cong 6 (ETH): OFF` | `Quan tri da tat` |
| Default GW | `[Gateway] Port 1` | `118.69.12.1` | `[Gateway] Cong 1` | `118.69.12.1` |
| Traffic | `[Traffic Rate]` | `In: 85M  Out: 32M` | `[Luu luong]` | `Vao: 85M  Ra: 32M` |

Trạng thái cổng: `UP`, `DOWN`, `OFF`, `?` — **giữ nguyên tiếng Anh**.

**Lưu ý:** `DHCP: waiting` không dịch là "dang cho" vì `cho` (chờ) dễ đọc thành *chó*.

---

## 5.4. Nhóm `3. CONTROL`

| Mã màn | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** | Hành vi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `M_CTRL_1` | `--- CONTROL ---` | `> 1. Reboot System` | `--- DIEU KHIEN ---` | `> 1. Khoi dong lai` | `[ ▶ ]` vào; `[ ▼ ]` xuống. |
| `M_CTRL_2` | `--- CONTROL ---` | `> 2. Shutdown` | `--- DIEU KHIEN ---` | `> 2. Tat may` | `[ ▶ ]` vào; `[ ▲ ]` / `[ ▼ ]`. |
| `M_CTRL_3` | `--- CONTROL ---` | `> 3. Factory Reset` | `--- DIEU KHIEN ---` | `> 3. Khoi phuc goc` | `[ ▶ ]` vào; `[ ▲ ]` lên. |

**Lưu ý:** "Khoi phuc cai dat goc" dài 21 ký tự (26 khi có `> 3. `), nên dùng "Khoi phuc goc".

---

## 6.0. Kiểm tra trước & khoá thao tác

| Điều kiện | Màn hình (tiếng Anh) | **Màn hình (tiếng Việt)** |
| :--- | :--- | :--- |
| `firmware-install` / `firmware-patch` đang chạy | `Update running`<br>`Try again later` | `Dang cap nhat`<br>`Vui long thu lai sau` |
| Đã có reset / nâng cấp đang chờ | `Reset pending`<br>`Reboot to apply` | `Dang doi reset`<br>`Reboot de ap dung` |
| Chuỗi reset của `psp-agent` đang chạy | `Busy` | `Dang xu ly reset` |

**Lưu ý:**
- `Busy` không dịch là "Dang ban" vì `ban` có thể là *bận / bán / bạn / bẩn*.
- `Reset pending` dịch là `Dang doi reset` (đã chốt). Dòng 2 giữ chữ `Reboot` vì "Khoi dong lai de ap dung" dài 24 ký tự.

---

## 6.1. Reboot

| Bước | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** |
| :--- | :--- | :--- | :--- | :--- |
| Bước 1 | `Reboot Firewall?` | `Press [v] to cont.` | `Khoi dong lai may?` | `Bam [v] de tiep tuc` |
| Bước 1 (có reset chờ) | `RESET IS PENDING!` | `Press [v] to cont.` | `DANG DOI RESET!` | `Bam [v] de tiep tuc` |
| Bước 2 | `Confirm Reboot?` | `[>]YES    [<]NO` | `Khoi dong lai ngay?` | `[>]DONG Y  [<]HUY` |
| Bước 3 | `Rebooting OS...` | `Please wait...` | `Dang khoi dong lai` | `Vui long doi...` |

**Lưu ý:**
- Không dùng "FW" cho firewall vì dễ nhầm với firmware.
- "Xac nhan khoi dong lai?" dài 23 ký tự.
- "Vui long cho" bị tránh vì `cho` (chờ) dễ đọc thành *chó*.
- `RESET IS PENDING!` dịch là `DANG DOI RESET!` (đã chốt); dùng "doi" (đợi) thay cho "cho" (chờ) vì `cho` dễ đọc thành *chó*. Áp dụng thống nhất cho `Reset pending` ở 6.0 / 6.3 và `RESET PENDING`, `UPGRADE PENDING` ở 1.11.

---

## 6.2. Shutdown

| Bước | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** |
| :--- | :--- | :--- | :--- | :--- |
| Bước 1 | `Shutdown Device?` | `Press [v] to cont.` | `Tat thiet bi?` | `Bam [v] de tiep tuc` |
| Bước 2 | `Confirm Power Off?` | `[>]YES    [<]NO` | `Xac nhan tat may?` | `[>]DONG Y  [<]HUY` |
| Bước 3 | `Shutting down...` | `Please wait...` | `Dang tat may...` | `Vui long doi...` |
| Bước 4 | `System halted` | `Safe to unplug!` | `He thong da tat` | `Da co the rut dien` |

**Lưu ý:** bước 4 không dùng "He thong da dung" vì `dung` có thể là *dừng* hoặc *dùng*.

---

## 6.3. Factory Reset

### Màn hình qua menu (bước 1–3)

| Bước | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** |
| :--- | :--- | :--- | :--- | :--- |
| Bước 1 | `FACTORY RESET?!` | `Press [v] to cont.` | `KHOI PHUC GOC?!` | `Bam [v] de tiep tuc` |
| Bước 2 | `ERASE ALL DATA?!` | `[>]YES    [<]NO` | `XOA HET DU LIEU?!` | `[>]DONG Y  [<]HUY` |
| Bước 3 | `Arming reset...` | `Please wait...` | `Dang chuan bi reset` | `Vui long doi...` |
| Hook thành công | `Reset armed` | `Rebooting...` | `Da san sang reset` | `Dang khoi dong lai` |
| Thất bại | `Reset refused` | `No baseline` *(theo lý do)* | `Khong the reset` | *(theo bảng lý do bên dưới)* |

### Bảng lý do (dòng 2 khi thất bại)

| Nguyên nhân | Dòng 2 | **Dòng 2 (VI)** |
| :--- | :--- | :--- |
| `NO_HOOKS` (thư mục hook rỗng) | `No reset hook` | `Thieu hook reset` |
| Hook hết `hook-timeout-s` | `Hook timeout` | `Hook het thoi gian` |
| Không có baseline | `No baseline` | `Khong co baseline` |
| ESP không ghi được | `ESP not writable` | `Khong ghi duoc ESP` |
| Recovery boot chưa sẵn sàng | `Recovery not ready` | `Recovery chua OK` |
| Đã có reset chờ | `Reset pending` | `Dang doi reset` |
| Khác | `See reset log` | `Xem log reset` |

### Giữ nút SWR (bước 4)

| Tình huống | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** |
| :--- | :--- | :--- | :--- | :--- |
| Đang giữ, đếm ngược | `FACTORY RESET in 3s` | `Release to cancel` | `KHOI PHUC GOC SAU 3s` | `Buong nut de huy` |
| Nhả trước khi hết giờ | `Reset cancelled` | — | `Da huy reset` | — |

### Trong initramfs (bước 5)

| Giai đoạn | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** |
| :--- | :--- | :--- | :--- | :--- |
| Reset chỉ dữ liệu | `Resetting data` | `DO NOT POWER OFF!` | `Dang reset du lieu` | `KHONG DUOC NGAT DIEN` |
| Reset đầy đủ — root filesystem | `Resetting 1/2: OS` | `DO NOT POWER OFF!` | `Reset 1/2: OS` | `KHONG DUOC NGAT DIEN` |
| Reset đầy đủ — dữ liệu | `Resetting 2/2: data` | `DO NOT POWER OFF!` | `Reset 2/2: du lieu` | `KHONG DUOC NGAT DIEN` |
| Nâng cấp firmware | `Upgrading firmware` | `DO NOT POWER OFF!` | `Nang cap firmware` | `KHONG DUOC NGAT DIEN` |

### Kết thúc (bước 6)

| Kết quả | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** |
| :--- | :--- | :--- | :--- | :--- |
| Thành công, reset chỉ dữ liệu | `Reset complete` | `Starting...` | `Reset hoan tat` | `Dang khoi dong...` |
| Thành công, reset đầy đủ / nâng cấp | `Reset complete` | `Rebooting...` | `Reset hoan tat` | `Dang khoi dong lai` |
| Lỗi, còn lượt thử | `Reset FAILED (1/3)` | `Retry on next boot` | `Reset THAT BAI (1/3)` | `Se thu lai lan sau` |
| Lỗi, hết lượt thử | `Reset FAILED` | `See reset log` | `Reset THAT BAI` | `Xem log reset` |
| Reset đầy đủ bỏ cuộc giữa chừng | `RESET INCOMPLETE` | `Service required` | `RESET CHUA XONG` | `Lien he ky thuat` |

**Lưu ý:**
- "Khoi phuc cai dat goc?" dài 22 ký tự; "XOA TOAN BO DU LIEU?!" dài 21 ký tự.
- "Recovery chua san sang" dài 22 ký tự. Phương án khác: `Loi recovery boot`.
- `Reset FAILED` không dịch là "Reset LOI" vì `LOI` có thể là *lỗi / lời / lợi*.
- "Reset đầy đủ" không viết thành "day du", vì `du` (đủ) có thể đọc thành từ tục.
- `Reset THAT BAI (1/3)` dài đúng 20 ký tự: nếu số lượt thử có thể ≥ 10 thì sẽ vượt.
- Các màn hình initramfs được ghi bởi script khôi phục của appliance-kit, không phải bởi `psp-agent`.

---

## 7. Quy tắc định dạng giá trị động

| Trường | Định dạng (EN) | Ví dụ dài nhất (EN) | **Định dạng (VI)** | **Ví dụ dài nhất (VI)** |
| :--- | :--- | :--- | :--- | :--- |
| Phiên bản (S1) | `FW ` + phần trước dấu `-` đầu tiên | `FW 1.3.260826` | Giữ nguyên | `FW 1.3.260826` |
| CPU / nhiệt độ | `CPU:%3d%%  Temp:%3dC` | `CPU:100%  Temp:105C` (19) | `CPU:%3d%%  Nhiet:%3dC` | `CPU:100%  Nhiet:105C` (20) |
| Nhiệt độ board | `SYS2:%3dC` | `SYS2:105C` | Giữ nguyên | `SYS2:105C` |
| RAM + uptime (S4) | `RAM: <x.x>G  Up: <n>d` | `RAM: 15.6G  Up: 365d` (20) | Giữ nguyên | `RAM: 15.6G  Up: 365d` (20) |
| RAM (1.3) | `Used: <x.x>G / <y.y>G` | `Used: 31.2G / 64.0G` (19) | `<x.x>G / <y.y>G` | `31.2G / 64.0G` (13) |
| Đĩa data | `Used: <n>% of <size>` | `Used: 100% of 1.9T` (18) | `Da dung: <n>%/<size>` | `Da dung: 100%/1.9T` (18) |
| Quạt | `FAN1: <rpm> rpm` / `F1:<rpm>  F2:<rpm>` | `F1:12000  F2:11800` (18) | `Quat 1: <rpm> rpm` / giữ `F1 F2` | `Quat 1: 12000 rpm` (17) |
| Điện áp | `%4.1fV  %3.1fV  %3.1fV` | `12.1V! 5.0V  3.3V` | Giữ nguyên | `12.1V! 5.0V  3.3V` |
| Uptime (1.7) | `Up: <d>d <hh>h <mm>m` | `Up: 9999d 23h 59m` (17) | `<d> ngay <hh>h <mm>m` | `9999 ngay 23h 59m` (17) |
| Đếm (phiên, drop) | hậu tố k/M/G | `Act:1.2M  Drop:94k` | Giữ nguyên | `Act:1.2M  Drop:94k` |
| Băng thông | `In: <v>  Out: <v>` | `In: 1.2G  Out: 940M` (19) | `Vao: <v>  Ra: <v>` | `Vao: 1.2G  Ra: 940M` (19) |
| Tiêu đề cổng | `Port <n> (<ROLE>): <STATE>` | `Port 12 (MGMT): DOWN` (20) | `Cong <n> (<ROLE>): <STATE>` | `Cong 12 (MGMT): DOWN` (20) |
| IPv4 / IPv6 / serial | — | `192.168.100.100/24+` (19) | Giữ nguyên | `192.168.100.100/24+` (19) |

---

## 9. Cảnh báo (Alert)

| Mã | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** |
| :--- | :--- | :--- | :--- | :--- |
| `TEMP` | `[!] CPU Temp 78C` | `Check fans/airflow` | `[!] Nhiet CPU 78C` | `Kiem tra quat gio` |
| `FAN` | `[!] Fan 1 low/stop` | `Replace fan` | `[!] Quat 1 bi loi` | `Thay quat` |
| `PWR` | `[!] Power 12V low` | `Check power supply` | `[!] Nguon 12V thap` | `Kiem tra bo nguon` |
| `DISK` | `[!] Data disk 93%` | `Logs filling disk` | `[!] Dung luong 93%` | `Log chiem dung luong` |
| `DPLANE` | `[!] Dataplane down` | `Traffic affected` | `[!] Dataplane DOWN` | `Anh huong luu luong` |
| `RESET` | `[!] Last reset FAIL` | `See reset log` | `[!] Reset that bai` | `Xem log reset` |
| `BOOT` | `[!] Boot: 2 failed` | `Check system log` | `[!] 2 dich vu loi` | `Xem log he thong` |

**Lưu ý:**
- `FAN`: "Quat 1 yeu/dung" bị tránh vì `dung` có thể là *dừng / dùng / đúng*.
- `PWR`: điện áp cao dùng `[!] Nguon 12V cao`. Với đường `VSB3.3V`, `[!] Nguon VSB3.3V thap` dài 22 ký tự; **bản tiếng Anh `[!] Power VSB3.3V low` cũng đã dài 21**, cần sửa ở cả hai bản.
- `DISK`: không dùng "day" (đầy) vì dễ đọc thành *dây / đây*.
- `TEMP`: bản gốc luôn ghi "CPU", kể cả khi cảm biến board (`SYS2`) mới là nguồn kích hoạt — vấn đề có sẵn ở bản tiếng Anh.

---

## 10. Cấu hình & Bảo mật – màn hình liên quan

| Tình huống | Dòng 1 | Dòng 2 | **Dòng 1 (VI)** | **Dòng 2 (VI)** |
| :--- | :--- | :--- | :--- | :--- |
| `panel-show-ip=no` (thay cho IP) | — | `IP hidden` | — | `Khong hien IP` |
| Nhập PIN | `Enter PIN:` | `> 0 _ _ _` | `Nhap ma PIN:` | `> 0 _ _ _` |
| Sai 3 lần | `Locked` | `Try again in 5m` | `Da khoa` | `Thu lai sau 5 phut` |

**Lưu ý:** `IP hidden` không dịch là "IP da an" vì `an` (ẩn) dễ đọc thành *ăn*.

---

## Các điểm đã chốt

| # | Nội dung | Quyết định |
| :---: | :--- | :--- |
| 1 | Thuật ngữ kỹ thuật (CPU, IP, DHCP, reset, log, firmware, UP/DOWN/OFF, Act/Drop, Up/d) | **Giữ tiếng Anh** |
| 2 | Tên gọi Factory Reset | **`Khoi phuc goc`** |
| 3 | Nhãn nút ở bước xác nhận | **`[>]DONG Y  [<]HUY`** (17 ký tự) |
| 4 | Trang 1.4 Data disk | **`[Dung luong luu tru]`**; cảnh báo DISK `[!] Dung luong 93%` |
| 5 | Các thông báo *pending* (`RESET IS PENDING!`, `Reset pending`, `RESET PENDING`, `UPGRADE PENDING`) | Dịch là **"Dang doi …"** (đang đợi): `DANG DOI RESET!`, `Dang doi reset`, `DANG DOI RESET`, `DANG DOI NANG CAP` |
