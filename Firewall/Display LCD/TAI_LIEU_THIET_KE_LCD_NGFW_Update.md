# ĐẶC TẢ THIẾT KẾ HỆ THỐNG HIỂN THỊ VÀ ĐIỀU KHIỂN LCD 20x2 CHO THIẾT BỊ NCS - NGFW

> **Phiên bản:** 1.5  
> **Áp dụng cho thiết bị:** Firewall 1U `NCS - NGFW` trên **Lanner NCA-2513** (PSP 4.0.1, driver `lmbiodrv`, Debian 13, appliance-kit). Đã kiểm tra trực tiếp trên `fw_ncss105` (BIOS `FNCA2513A00006V202`, `psp-agent` 0.3.0 báo `lcm=20x2`, LED/SWR/phím/HWM đều có).  
> **Không áp dụng:** board không có LCM (ví dụ NCA-2489A) — `psp-agent` trả `ERR UNSUPPORTED` nên panel tự tắt.  
> **Quy cách phần cứng:** LCM ký tự 20x2, 4 phím (`◀`, `▲`, `▼`, `▶`), một LED trạng thái hai màu, lỗ chọc nút SWR.  
> **Hiện thực:** Panel là một phần của **`psp-agent`** (`../lanner/psp-agent`, C99). Đây là tiến trình duy nhất truy cập `/dev/lmbiodrv` (quyết định A1). Trên máy, agent chạy dưới unit `fwx-psp-agent.service`, binary `/opt/fwx/psp/psp-agent` (nằm trên overlay `/opt/fwx`).  
> **Nguyên tắc độ dài chuỗi:** Tối đa 20 ký tự ASCII mỗi dòng, áp dụng cho **cả hai ngôn ngữ**. Mọi giá trị động đi qua quy tắc định dạng ở [mục 7](#7-quy-tắc-định-dạng-giá-trị-động).  
> **Ngôn ngữ hiển thị:** Tiếng Anh (mặc định) và tiếng Việt **không dấu**, chọn bằng khoá `panel-lang` (mục 10) hoặc trên LCD qua `3. CONTROL` → `4. Language` (mục 6.4). Trong các bảng màn hình, cột **(VI)** là text tiếng Việt; quy tắc viết tiếng Việt không dấu ở [mục 7.1](#71-quy-tắc-text-tiếng-việt-không-dấu).

Các mục đánh dấu **[XÁC MINH]** chỉ kiểm tra được bằng mắt tại máy; danh sách đầy đủ ở [mục 11.2](#112-kiểm-tra-tại-máy-fw_ncss105).

---

## LỊCH SỬ THAY ĐỔI

| Phiên bản | Thay đổi chính |
| :--- | :--- |
| 1.2 | Bản đặc tả ban đầu. |
| 1.3 | Luồng factory reset theo appliance-kit; quy tắc phím; định dạng giá trị; nguồn dữ liệu; cảnh báo; khoá CONTROL. |
| 1.4 | Chốt hiện thực trong `psp-agent` (A1) và `PANEL_CONTROL=yes` (A2). Cập nhật theo phần cứng và mã thực tế:<br>- LCM và phím qua LPT/`lmbiodrv`; LED là SLED hai màu do userspace nháy (không có Linux LED class); có hai watchdog: WDT của Super I/O ≤ 255 giây qua `psp-agent`, và `/dev/watchdog0` (ACPI `wdat_wdt`) mà systemd dùng được.<br>- HWM có 2 nhiệt độ, **1 quạt**, các đường điện áp.<br>- Lỗ chọc là **nút SWR** (giữ 5 giây = factory reset, mục 1.2).<br>- Đèn nền theo chính sách sẵn có của `psp-agent`: tối mặc định, chỉ phím mới đánh thức, chữ không đánh thức.<br>- Mẫu LED thống nhất với chuỗi reset của `psp-agent` (đỏ nháy 200/200).<br>- Factory reset qua menu đi chung chuỗi reset với nút SWR.<br>- Cấu hình chuyển vào `/etc/psp/psp-agent.conf`. Thêm trang Power Rails và cảnh báo nguồn. |
| 1.5 | **Bổ sung text tiếng Việt cho màn hình LCD và bổ sung tính năng đổi ngôn ngữ:**<br>- Thêm cột text tiếng Việt (không dấu, ≤ 20 ký tự) cho mọi bảng màn hình: mục 1.5, 2, 4, 5, 6, 7, 9, 10.<br>- Thêm mục 7.1 quy tắc viết tiếng Việt không dấu (giữ thuật ngữ kỹ thuật tiếng Anh, danh sách từ cấm / dễ hiểu nhầm).<br>- Thêm mục 6.4 **Đổi ngôn ngữ** (mục `4. Language` trong CONTROL, xác nhận 1 bước, về CONTROL sau khi đổi; bị chặn khi đang cập nhật firmware).<br>- Thêm khoá `panel-lang` (mặc định `en`); factory reset đưa ngôn ngữ về mặc định; màn hình initramfs luôn tiếng Anh.<br>- Cập nhật mục 3 (cuộn vòng CONTROL 4 mục), 4, 5.4 (`M_CTRL_4`), 6.0, 10, 11 (giai đoạn H). |

---

## MỤC LỤC
1. [Phần cứng & đèn LED](#1-phần-cứng--đèn-led)
2. [Vòng đời vận hành & Các trạng thái](#2-vòng-đời-vận-hành--các-trạng-thái)
3. [Quy ước điều hướng 4 nút bấm](#3-quy-ước-điều-hướng-4-nút-bấm)
4. [Cây Menu chính](#4-cây-menu-chính)
5. [Đặc tả từng màn hình 20x2](#5-đặc-tả-từng-màn-hình-20x2)
6. [Quy trình xác nhận cho nhóm CONTROL](#6-quy-trình-xác-nhận-cho-nhóm-control)
7. [Quy tắc định dạng giá trị động](#7-quy-tắc-định-dạng-giá-trị-động)
8. [Nguồn dữ liệu](#8-nguồn-dữ-liệu)
9. [Cảnh báo (Alert)](#9-cảnh-báo-alert)
10. [Cấu hình & Bảo mật](#10-cấu-hình--bảo-mật)
11. [Kế hoạch triển khai](#11-kế-hoạch-triển-khai)

---

## 1. PHẦN CỨNG & ĐÈN LED

### 1.1. Thành phần và đường truy cập (NCA-2513)

| Thành phần | Đường truy cập | Ghi chú |
| :--- | :--- | :--- |
| **LCM 20x2** | Cổng song song (LPT) qua `lmbiodrv` (`LCM_USES_LPT`, `ioaccess_lcm_lpt.c`). | - Dòng 2 được ghi bằng cách đặt con trỏ, không dùng `\n`.<br>- **Mỗi dòng ≤ 20 byte, bắt buộc**: `lmbdrv_write` chép vào buffer stack của kernel mà không kiểm tra độ dài, nên `psp-agent` là chốt chặn duy nhất (xem `NCS-BUG-REPORT-lmbdrv-write-overflow.md`).<br>- Chỉ ASCII; trên màn hình các phím viết là `[<]` `[^]` `[v]` `[>]`, nhiệt độ viết `48C`.<br>- Vì chỉ ASCII, bản tiếng Việt hiển thị **không dấu** (mục 7.1). |
| **Đèn nền LCM** | Một bit trong thanh ghi điều khiển LPT. | Không đọc ngược được trạng thái, nên `psp-agent` tự nhớ trạng thái đã đặt. |
| **4 phím** | Thanh ghi trạng thái LPT, cùng khối với LCM (không phải GPIO). Mã K1–K4 xem README `psp-agent`. | - `keys_monitor.c` quét 20 ms, chỉ nhận định danh phím từ mẫu có bit pressed, cần 2 mẫu khớp nhau.<br>- Phần cứng chỉ biểu diễn được **một phím tại một thời điểm**.<br>- Thứ tự vật lý K1–K4 → `◀▲▼▶` **[XÁC MINH]**. |
| **LED trạng thái (SLED)** | GPIO của Super I/O NCT6776 qua `lmbiodrv`. | - Chỉ có Xanh / Đỏ / Tắt.<br>- Nháy do luồng `led-worker` trong `psp-agent` tạo; không có Linux LED class, không có nháy bằng phần cứng.<br>- Đây **không** phải đèn nguồn. |
| **Nút SWR (lỗ chọc)** | GP74, tích cực mức thấp; `psp-agent` đã sửa cực tính (`swr-active-low`). | Xem mục 1.2. |
| **Watchdog** | (1) `/dev/watchdog0` — ACPI `wdat_wdt`, timeout mặc định 30 giây (đã thấy trên `fw_ncss105`).<br>(2) WDT của Super I/O NCT6776, 5..255 giây, qua `lmbiodrv` (`WDT ARM/FEED` của `psp-agent`). | Hai driver này có cùng điều khiển một bộ đếm phần cứng hay không **[XÁC MINH]**. Chỉ được dùng **một** trong hai. |
| **HWM** | NCT6776 qua `lmbiodrv`. | Nhiệt độ `SYS1 Temp` (cảm biến CPU1) và `SYS2 Temp`, ngưỡng nhà sản xuất 70C; quạt `FAN1` (min 1408 RPM); điện áp 12V, 5V, 3.3V, VSB3.3V, VBAT, VCORE, VDIMM (`utils/sdk_hwm/sdk_hwm.c`). |
| **Đèn Nguồn, đèn Ổ đĩa** | Phần cứng. | Phần mềm không điều khiển. |

### 1.2. Lỗ chọc = nút SWR (không phải reset cứng)

PSP chỉ có một nút reset mà phần mềm thấy được: **SWR** (Software Reset, GP74). Đây là nút do phần mềm đọc, không nối vào chân RESET của chipset:

- **Hệ điều hành đang chạy, giữ ≥ 5 giây (`hold-ms`):** `psp-agent` chạy chuỗi **factory reset** (mục 6.3). Nhả sớm thì huỷ.
- **Nhấn ngắn:** chỉ bật đèn nền LCM.
- **Máy treo:** không có tác dụng, vì không còn tiến trình đọc nút. Máy treo được cứu bằng watchdog (mục 1.4) hoặc ngắt nguồn.

Tài liệu vận hành **không được** hướng dẫn "chọc lỗ khi máy treo": giữ quá 5 giây trên máy đang chạy sẽ **xoá cấu hình**. Lỗ chọc trên mặt máy chính là SWR — **[XÁC MINH]** bằng một lần nhìn: nhấn ngắn thì đèn nền sáng.

### 1.3. Đèn LED trạng thái

Mọi mẫu LED do `psp-agent` tạo:

| Mẫu | Ý nghĩa | Hành động |
| :--- | :--- | :--- |
| **Tắt** | Máy tắt, hoặc `psp-agent` chưa chạy (BIOS / GRUB / kernel / đầu userspace). Trạng thái LED ngay sau khi bật nguồn nguội **[XÁC MINH]**. | — |
| **Xanh nháy nhanh 125/125 ms** | `psp-agent` đã chạy, hệ thống đang khởi động (chưa tới `multi-user.target`). | Chờ |
| **Xanh nhịp tim 500/500 ms** | Bình thường. Nhịp được luồng panel duy trì; luồng này dừng thì nhịp dừng. | — |
| **Xanh nháy kép** (2 x 100 ms, nghỉ 800 ms) | Có cảnh báo phần cứng: `TEMP`, `FAN`, `PWR` (mục 9). | Xem LCD |
| **Đỏ nháy 200/200 ms** | **Đang factory reset / nâng cấp firmware** — cả lúc chạy hook lẫn lúc khôi phục trong initramfs. Mẫu này trùng với mẫu reset sẵn có của `psp-agent`. | **Không ngắt điện, không chọc lỗ** |
| **Đỏ đứng** | Factory reset bị từ chối hoặc thất bại (hành vi sẵn có của `psp-agent`). Máy vẫn chạy với dữ liệu cũ. | Xem LCD / log |
| **Đứng yên quá 3 giây khi máy có điện** | Treo: `psp-agent` hoặc kernel. | Chờ watchdog (mục 1.4) |

**Ưu tiên**, từ cao xuống thấp:
1. Chuỗi reset.
2. Lệnh `LED SET` / `LED BLINK` của client qua socket, giữ tới khi client gửi `LED STOP`.
3. Mẫu của panel.

`LED STOP` trả LED về mẫu của panel; `led-default` chỉ còn dùng khi panel bị tắt.

### 1.4. Watchdog — tự khởi động lại khi treo

Máy có `/dev/watchdog0` (ACPI `wdat_wdt`), nên dùng cơ chế chuẩn của systemd:

- `RuntimeWatchdogSec=60s` trong `/etc/systemd/system.conf.d/`: kernel hoặc PID 1 treo → board tự reset sau tối đa 60 giây.
- `fwx-psp-agent.service` có `WatchdogSec=` và luồng panel gửi `sd_notify(WATCHDOG=1)`: chính `psp-agent` treo thì systemd khởi động lại nó. Nút SWR không bao giờ bị chết lâu dài.
- **`wdat_wdt` và WDT Super I/O là hai bộ đếm khác nhau** (V6, đã xác minh 2026-10-05 bằng cách đọc bảng ACPI WDAT trên `fw_ncss105`). Bảng WDAT điều khiển bộ đếm **TCO của PCH Intel**: cổng I/O `0x400`–`0x413` (`TCO_RLD` 0x400, `TCO_TMR` 0x412, bit dừng 11 của `TCO1_CNT` 0x408), nhịp 0,6 giây, đếm 10 bit, tối đa ≈ 613 giây. `WDT ARM` của `psp-agent` dùng NCT6776, LDN 8, thanh ghi F5/F6/F7 qua cổng cấu hình `0x2E`. Hai bộ đếm không che lỗi nhau. Dù vậy vẫn **chỉ để một bên** lo việc "treo thì reset" (systemd), không arm WDT của `psp-agent`, để mỗi lần reset chỉ có một nguyên nhân.
- `fwx-psp-agent.service` chỉ được có `WatchdogSec=` khi `psp-agent` đã gửi `WATCHDOG=1` (B6/C7). Bản 0.3.0 chưa gửi: thêm drop-in lúc này sẽ khiến systemd giết agent sau mỗi chu kỳ. Vì vậy drop-in nằm ở `1-factory-reset/examples/`, chưa cài mặc định; preflight kiểm tra chuỗi `WATCHDOG=1` trong binary.
- **Trước khi bật trên máy xuất xưởng:** thử cho watchdog hết hạn thật trên máy lab. Việc này khởi động lại máy, cần chủ động lên lịch.

### 1.5. Ma trận phối hợp LCD và LED

| Giai đoạn | Đèn Nguồn | LED trạng thái | LCD (đèn nền) | LCD (VI) | Hành động |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Chưa cấp điện / đã tắt** | Tắt / Cam **[XÁC MINH]** | Tắt | Tối | Tối | Kiểm tra nguồn |
| **2. BIOS / GRUB / kernel** | Xanh | Tắt / giữ trạng thái cũ | Nội dung lần ghi trước hoặc mặc định của module **[XÁC MINH]**; khi `lmbiodrv` nạp thì hiện `<-- NCA-2513 -->` | `<-- NCA-2513 -->` (do driver ghi, không đổi theo ngôn ngữ) | Chờ |
| **3. Khởi động userspace** | Xanh | Xanh nháy nhanh | `NCS - NGFW      0:14`<br>`Starting... 12 left` (đèn nền tối, trừ khi có người bấm phím) | `NCS - NGFW      0:14`<br>`Khoi dong: con 12` | Chờ |
| **4. Bình thường** | Xanh | Xanh nhịp tim | Auto-Cycle khi đèn nền sáng | Auto-Cycle (mục 5.1) | — |
| **5. Cảnh báo phần cứng** | Xanh | Xanh nháy kép | Slide cảnh báo ở đầu vòng | Slide cảnh báo (mục 9) | Bấm phím xem LCD |
| **6. Treo** | Xanh | **Đứng yên** | Đứng hình | Đứng hình | Chờ watchdog; nếu không có thì ngắt nguồn |
| **7. Giữ nút SWR** | Xanh | Không đổi | `FACTORY RESET in 3s`<br>`Release to cancel` | `KHOI PHUC GOC SAU 3s`<br>`Buong nut de huy` | Nhả để huỷ |
| **8. Reset / nâng cấp (hook + initramfs)** | Xanh | **Đỏ nháy 200/200** | `DO NOT POWER OFF!` (mục 6.3) | `KHONG DUOC NGAT DIEN` (chỉ giai đoạn hook; initramfs luôn tiếng Anh, mục 6.3) | **Không** ngắt điện |
| **9. Reset bị từ chối / thất bại** | Xanh | **Đỏ đứng** | `Reset refused` / `Reset FAILED` | `Khong the reset` / `Reset FAILED` (initramfs, tiếng Anh) | Báo kỹ sư |
| **10. Tắt máy an toàn** | Tắt / Cam **[XÁC MINH]** | Tắt | `Safe to unplug!` nếu module còn điện **[XÁC MINH]** | `Da co the rut dien` | Rút nguồn |
| **11. Khởi động lại** | Xanh | Đứng yên rồi tắt | `Rebooting...` (giữ tới khi `lmbiodrv` nạp lại) | `Dang khoi dong lai` | Chờ |

---

## 2. VÒNG ĐỜI VẬN HÀNH & CÁC TRẠNG THÁI

**Chính sách đèn nền** (sẵn có trong `psp-agent`, giữ nguyên):
- LCM **tối mặc định** (`lcm-backlight=off`). Chỉ 4 phím và nút SWR làm sáng.
- Tối lại sau `lcm-backlight-timeout-s` giây (mặc định **300**) kể từ lần chạm cuối.
- **Ghi chữ không làm sáng màn hình**; nội dung vẫn được ghi sẵn để ai đó bấm phím là thấy ngay.
- **Cảnh báo cũng không làm sáng màn hình**: một máy tự sáng mỗi khi có trạng thái mới sẽ sáng gần như suốt ngày. Cảnh báo được báo từ xa bằng LED nháy kép.

```
   [BẬT NGUỒN] → BIOS/GRUB/kernel → lmbiodrv nạp: "<-- NCA-2513 -->"
         │
         ▼
   [STATE 0: BOOTING]  psp-agent ghi banner, LED xanh nháy nhanh
         │ tới multi-user.target (hoặc sau 120 giây)
         ▼
   [STATE 1: AUTO-CYCLE] ◄──── 30 giây không bấm phím ───┐
     (vẫn ghi slide dù đèn nền tối)                       │
         │                                               │
   [>] / [^] / [v]                                       │
         ▼                                               │
   [STATE 3: MENU] ──────────────────────────────────────┘
         │ [>] ở tác vụ CONTROL
         ▼
   [STATE 4: XÁC NHẬN / THỰC THI] (mục 6)

   Đèn nền (độc lập với state): phím / SWR → sáng; hết timeout → tối.
   Phím làm sáng một màn hình đang TỐI bị nuốt (không thực thi lệnh).
```

### Chi tiết các trạng thái:

1. **State 0: Booting**
   - Dòng 1: `NCS - NGFW` (`lcm-line1`).
   - Dòng 1: tiêu đề bên trái, số giây từ lúc bật máy (`m:ss`, theo `/proc/uptime`) ở cột cuối, nhảy mỗi giây: N có thể đứng yên hàng chục giây khi chỉ còn một dịch vụ chậm, đồng hồ cho thấy máy không treo.
   - Dòng 2: `Starting... N left` — N là số job systemd còn chờ. Banner tĩnh `lcm-line2` chỉ dùng khi panel bị tắt.
   - Tiếng Việt (`panel-lang=vi`): dòng 1 giữ nguyên `NCS - NGFW      0:14`; dòng 2 `Khoi dong: con N` (N ≤ 3 chữ số, tối đa 18 ký tự).

2. **State 1: Auto-Cycle (`panel-cycle-s`, mặc định 5 giây/slide)**
   - Thứ tự: [S0 cảnh báo] → S1 Thiết bị → S2 WAN → S3 LAN → S4 Sức khoẻ.
   - Khi đèn nền tối, slide vẫn xoay nhưng chỉ ghi LCM lúc nội dung đổi, để không chiếm mutex phần cứng vô ích.
   - Phím:
     - `[ ▶ ]` → Menu.
     - `[ ▲ ]` / `[ ▼ ]` → slide trước / sau, tạm dừng xoay 30 giây.
     - `[ ◀ ]` → không làm gì.

3. **Đèn nền tối (thay "State 2: Sleep" của bản 1.2)**
   - Không còn là một state riêng: panel vẫn ở State 1, chỉ đèn nền tắt.
   - Phím đầu tiên khi màn hình tối chỉ làm sáng và bị nuốt.

4. **State 3: Menu** — `panel-menu-timeout-s` (mặc định 30 giây) không bấm phím → về State 1.

5. **State 4: Xác nhận / Thực thi**
   - Hết giờ ở màn hình xác nhận = huỷ.
   - Khi lệnh đã chạy, mọi phím bị bỏ qua.

### Màn hình khi luồng panel không chạy

| Thời điểm | Ai ghi | Cách ghi | Ngôn ngữ |
| :--- | :--- | :--- | :--- |
| Trong initramfs: factory reset, nâng cấp firmware | Script khôi phục của appliance-kit | Chạy `psp-agent` ở **chế độ một lần**: `psp-agent --oneshot lcm "<l1>" "<l2>"` và `psp-agent --oneshot led blink red 200 200 &`. Hook initramfs copy `psp-agent` và `lmbiodrv.ko` (đúng phiên bản kernel, kể cả kernel recovery trên ESP) khi chúng có trên máy. | **Luôn tiếng Anh** (ngôn ngữ mặc định): lúc này `/etc/psp/psp-agent.conf` nằm trên `data` đang bị xoá / khôi phục nên không đọc được `panel-lang`. |
| Bước cuối khi tắt / khởi động lại | Hook `/usr/lib/systemd/system-shutdown/` | `psp-agent --oneshot lcm ...` | Theo `panel-lang`. Hook chạy sau khi filesystem đã unmount nên không đọc `/etc`: `psp-agent` ghi ngôn ngữ đang dùng ra `/run/psp/panel-lang` lúc khởi động và mỗi lần đổi; hook đọc file này, không đọc được thì dùng tiếng Anh. File `/run` còn đọc được ở bước này hay không **[XÁC MINH]**. |

Chế độ một lần mở `/dev/lmbiodrv` trực tiếp. Chỉ được dùng khi daemon **không** chạy; nếu socket của daemon còn trả lời thì chế độ này từ chối, để không có hai tiến trình cùng ghi phần cứng.

Mọi lời gọi từ initramfs là **best-effort**: lỗi LCD/LED không bao giờ làm dừng quá trình khôi phục và không thay đổi thứ tự các bước. Tiến trình nháy LED chạy nền được script khôi phục kill trước khi `reboot -f` hoặc trước khi trả quyền cho quá trình boot.

---

## 3. QUY ƯỚC ĐIỀU HƯỚNG 4 NÚT BẤM

| Phím | Vai trò | Chức năng |
| :---: | :--- | :--- |
| `[ ▶ ]` | **Enter / Confirm** | Auto-Cycle → Menu; Menu → vào mục con; xác nhận cuối → `YES`. |
| `[ ◀ ]` | **Back / Cancel** | Về cấp trên; ở xác nhận → `NO`. **Giữ ≥ 2 giây:** về State 1. |
| `[ ▲ ]` | **Up** | Mục / trang trước. |
| `[ ▼ ]` | **Down** | Mục / trang sau; **phím bước đệm** ở bước 1 của lệnh nguy hiểm. |

**Quy tắc:**
- **Chống dội:** lấy từ `keys_monitor.c` — hai mẫu 20 ms khớp nhau.
- **`[ ◀ ]`, `[ ▶ ]` tác dụng khi NHẢ phím:**
  - `[ ◀ ]` nhả trước 2 giây là Back; giữ đủ 2 giây là Home (kích hoạt ngay khi đủ).
- **`[ ▲ ]` / `[ ▼ ]` lặp:** giữ 600 ms thì bắt đầu lặp, 200 ms một bước. Không lặp ở màn hình xác nhận.
- **Cuộn vòng** trong Menu chính (SYSTEM → NETWORK → CONTROL → SYSTEM), trong các trang của SYSTEM, NETWORK, CONTROL (yêu cầu người vận hành, 2026-10-08) và giữa hai lựa chọn ở màn hình chọn ngôn ngữ (mục 6.4):
  - Ở mục / trang cuối bấm `[ ▼ ]` → về mục / trang đầu; ở mục / trang đầu bấm `[ ▲ ]` → sang mục / trang cuối.
  - Chỉ khi **bấm từng lần**. Khi **giữ phím** (lặp), danh sách dừng ở đầu / cuối, không quay vòng tiếp, để giữ phím không chạy vòng qua mọi mục.
  - Trong CONTROL (4 mục từ v1.5), từ `1. Reboot System` bấm `[ ▲ ]` sẽ tới `4. Language`, không còn tới thẳng `3. Factory Reset`. Factory Reset vẫn còn hai bước xác nhận (`[ ▼ ]` rồi `YES`).
  - Slide tự xoay (Auto-Cycle) không cuộn vòng bằng phím.
- **Một phím một lúc:** phần cứng không biểu diễn được hai phím cùng lúc, nên không có tổ hợp phím.

---

## 4. CÂY MENU CHÍNH

```
[MAIN MENU]
 ├── 1. SYSTEM   (CPU/nhiệt độ, RAM, đĩa data, quạt, nguồn, uptime, phiên, firmware, serial, reset)
 ├── 2. NETWORK  (các cổng theo cấu hình, gateway, băng thông)
 └── 3. CONTROL  (Reboot, Shutdown, Factory Reset, Language)
```

| Mã màn hình | Dòng 1 | Dòng 2 | Dòng 1 (VI) | Dòng 2 (VI) | Hành vi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `M_MAIN_1` | `--- MAIN MENU ---` | `> 1. SYSTEM` | `--- MENU CHINH ---` | `> 1. HE THONG` | `[ ▶ ]` vào; `[ ▼ ]` xuống. |
| `M_MAIN_2` | `--- MAIN MENU ---` | `> 2. NETWORK` | `--- MENU CHINH ---` | `> 2. MANG` | `[ ▶ ]` vào; `[ ▲ ]` / `[ ▼ ]`. |
| `M_MAIN_3` | `--- MAIN MENU ---` | `> 3. CONTROL` | `--- MENU CHINH ---` | `> 3. DIEU KHIEN` | `[ ▶ ]` vào (hoặc màn hình nhập PIN); `[ ▲ ]` lên. |

`panel-control=no` thì mục 3 bị ẩn (mục 10); khi đó **không đổi được ngôn ngữ trên LCD**, chỉ đổi qua khoá `panel-lang`.

---

## 5. ĐẶC TẢ TỪNG MÀN HÌNH 20x2

> Giá trị trong ví dụ chỉ để minh hoạ. Định dạng theo [mục 7](#7-quy-tắc-định-dạng-giá-trị-động), nguồn theo [mục 8](#8-nguồn-dữ-liệu). Không lấy được giá trị: `?` cho một trường, `NO DATA` cho cả dòng (VI: `?`, `KHONG CO DU LIEU`). Cột **(VI)** là text khi `panel-lang=vi`.

### 5.1. Slide Auto-Cycle

| Slide | Tên | Dòng 1 | Dòng 2 | Dòng 1 (VI) | Dòng 2 (VI) | Ghi chú |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| **S0** | **Cảnh báo** | `[!] CPU Temp 78C` | `Check fans/airflow` | `[!] Nhiet CPU 78C` | `Kiem tra quat gio` | Chỉ khi có cảnh báo; nhiều cảnh báo thì xoay lần lượt. Các cảnh báo khác ở mục 9. |
| **S1** | **Thiết bị** | `NCS - NGFW` | `FW 1.3.260826` | `NCS - NGFW` | `FW 1.3.260826` | |
| **S2** | **WAN** | `Port 1 (WAN): UP` | `118.69.12.34/24` | `Cong 1 (WAN): UP` | `118.69.12.34/24` | Cổng đầu tiên có vai trò WAN; bỏ slide nếu không có. |
| **S3** | **LAN** | `Port 2 (LAN): UP` | `192.168.1.1/24` | `Cong 2 (LAN): UP` | `192.168.1.1/24` | Cổng đầu tiên có vai trò LAN; bỏ slide nếu không có. |
| **S4** | **Sức khoẻ** | `CPU: 14%  Temp: 48C` | `RAM: 2.1G  Up: 14d` | `CPU: 14%  Nhiet: 48C` | `RAM: 2.1G  Up: 14d` | Temp lấy từ `SYS1 Temp` (cảm biến CPU1). VI giữ `Up` / `d`: "365 ngay" làm `999d+` vượt 20 ký tự. |

### 5.2. Nhóm `1. SYSTEM`
> `[ ▲ ]` / `[ ▼ ]` chuyển trang (cuộn vòng khi bấm từng lần, mục 3); `[ ◀ ]` về Menu. Cập nhật mỗi 2 giây.

| STT | Tên | Dòng 1 | Dòng 2 | Dòng 1 (VI) | Dòng 2 (VI) | Ý nghĩa |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1.1** | **CPU & Temp** | `[CPU & Temp]` | `CPU: 14%  Temp: 48C` | `[CPU & Nhiet do]` | `CPU: 14%  Nhiet: 48C` | Tải CPU trung bình 5 giây; nhiệt độ `SYS1 Temp`. |
| **1.2** | **Board Temp** | `[Board Temp]` | `SYS2: 41C` | `[Nhiet do bo mach]` | `SYS2: 41C` | Cảm biến `SYS2 Temp`. |
| **1.3** | **Memory** | `[Memory / RAM]` | `Used: 2.1G / 8.0G` | `[RAM da su dung]` | `2.1G / 8.0G` | Không tính cache. VI đưa "đã sử dụng" lên tiêu đề vì `Da dung: 31.2G / 64.0G` dài 22. |
| **1.4** | **Data disk** | `[Data Disk]` | `Used: 18% of 240G` | `[Dung luong luu tru]` | `Da dung: 18%/240G` | Phân vùng `data`; root filesystem là read-only nên không hiển thị. |
| **1.5** | **Cooling Fan** | `[Cooling Fan]` | `FAN1: 4200 rpm` | `[Quat lam mat]` | `Quat 1: 4200 rpm` | NCA-2513 chỉ giám sát 1 quạt. |
| **1.6** | **Power Rails** | `[Power Rails]` | `12.1V  5.0V  3.3V` | `[Dien ap nguon]` | `12.1V  5.0V  3.3V` | Đường nào ngoài ngưỡng thì thêm `!` (mục 9). |
| **1.7** | **Uptime** | `[System Uptime]` | `Up: 14d 08h 22m` | `[Thoi gian van hanh]` | `14 ngay 08h 22m` | |
| **1.8** | **Firewall Sess** | `[Firewall Sessions]` | `Act:4892  Drop:142` | `[Phien ket noi]` | `Act:4892  Drop:142` | Drop tính từ khi dataplane khởi động. VI giữ `Act` / `Drop`. |
| **1.9** | **Firmware** | `[Firmware Version]` | `1.3.260826-serial1-` | `[Phien ban firmware]` | `1.3.260826-serial1-` | Chuỗi đầy đủ, cuộn ngang. |
| **1.10** | **Serial** | `[Serial Number]` | `NCS2026A00123` | `[So serial]` | `NCS2026A00123` | |
| **1.11** | **Reset Status** | `[Reset Status]` | `Idle` | `[Trang thai reset]` | `Binh thuong` | Một trong các giá trị ở bảng dưới. |

Giá trị của 1.11:

| Tiếng Anh | Tiếng Việt |
| :--- | :--- |
| `Idle` | `Binh thuong` |
| `RESET PENDING` | `DANG DOI RESET` |
| `UPGRADE PENDING` | `DANG DOI NANG CAP` |
| `LAST RESET FAILED` | `RESET TRUOC THAT BAI` |
| `NEEDS SERVICE` | `CAN KY THUAT VIEN` |

### 5.3. Nhóm `2. NETWORK`
> Danh sách cổng theo cấu hình của máy, không cố định "Port 1 = WAN". Sau các trang cổng là Gateway và Traffic.

| Tình huống | Dòng 1 | Dòng 2 | Dòng 1 (VI) | Dòng 2 (VI) |
| :--- | :--- | :--- | :--- | :--- |
| Cổng có IP | `Port 1 (WAN): UP` | `118.69.12.34/24` (nhiều IP thì thêm `+`) | `Cong 1 (WAN): UP` | `118.69.12.34/24` |
| Mất link | `Port 3 (DMZ): DOWN` | `10.10.10.1/24` | `Cong 3 (DMZ): DOWN` | `10.10.10.1/24` |
| Chưa cấu hình | `Port 4 (ETH): DOWN` | `IP NOT ASSIGNED` | `Cong 4 (ETH): DOWN` | `CHUA CO IP` |
| Đang chờ DHCP | `Port 1 (WAN): UP` | `DHCP: waiting` | `Cong 1 (WAN): UP` | `DHCP: dang lay IP` |
| Chỉ có IPv6 | `Port 5 (LAN): UP` | `2001:db8:10::1/64` (cuộn ngang nếu dài) | `Cong 5 (LAN): UP` | `2001:db8:10::1/64` |
| Tắt bởi quản trị | `Port 6 (ETH): OFF` | `Disabled` | `Cong 6 (ETH): OFF` | `Quan tri da tat` |
| Default GW | `[Gateway] Port 1` | `118.69.12.1` | `[Gateway] Cong 1` | `118.69.12.1` |
| Traffic | `[Traffic Rate]` | `In: 85M  Out: 32M` (tổng bit/s trên các cổng WAN, trung bình 5 giây) | `[Luu luong]` | `Vao: 85M  Ra: 32M` |

Trạng thái cổng: `UP`, `DOWN`, `OFF`, `?` — giữ nguyên tiếng Anh ở cả hai ngôn ngữ.

### 5.4. Nhóm `3. CONTROL`

| Mã màn | Dòng 1 | Dòng 2 | Dòng 1 (VI) | Dòng 2 (VI) | Hành vi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `M_CTRL_1` | `--- CONTROL ---` | `> 1. Reboot System` | `--- DIEU KHIEN ---` | `> 1. Khoi dong lai` | `[ ▶ ]` vào; `[ ▼ ]` xuống. |
| `M_CTRL_2` | `--- CONTROL ---` | `> 2. Shutdown` | `--- DIEU KHIEN ---` | `> 2. Tat may` | `[ ▶ ]` vào; `[ ▲ ]` / `[ ▼ ]`. |
| `M_CTRL_3` | `--- CONTROL ---` | `> 3. Factory Reset` | `--- DIEU KHIEN ---` | `> 3. Khoi phuc goc` | `[ ▶ ]` vào; `[ ▲ ]` / `[ ▼ ]`. |
| `M_CTRL_4` | `--- CONTROL ---` | `> 4. Language` | `--- DIEU KHIEN ---` | `> 4. Ngon ngu` | `[ ▶ ]` vào màn hình chọn ngôn ngữ (mục 6.4); `[ ▲ ]` lên. |

---

## 6. QUY TRÌNH XÁC NHẬN CHO NHÓM CONTROL

```
[Chọn tác vụ] ─[>]─▶ [Kiểm tra trước] ─ không được phép ─▶ [Màn hình từ chối] ─▶ menu
                           │ được phép
                           ▼
                   [Bước 1: Cảnh báo]  ─[<]─▶ huỷ
                           │ bắt buộc [v]
                           ▼
                   [Bước 2: Xác nhận]  ─[<] hoặc hết giờ─▶ huỷ
                           │ [>]
                           ▼
                   [THỰC THI] (bỏ qua mọi phím)
```

Luồng 2 bước trên áp dụng cho Reboot, Shutdown, Factory Reset. **Đổi ngôn ngữ (6.4) là ngoại lệ**: không nguy hiểm và đảo ngược được, nên chỉ xác nhận 1 bước (không có bước `[v]`).

Trong các bảng màn hình dưới đây, cột **(VI)** là text khi `panel-lang=vi`. Nhãn xác nhận `[>]YES    [<]NO` ở bản tiếng Việt là `[>]DONG Y  [<]HUY`.

### 6.0. Kiểm tra trước & khoá thao tác

| Điều kiện | Reboot | Shutdown | Factory Reset | Language | Màn hình | Màn hình (VI) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `firmware-install` / `firmware-patch` đang chạy | Từ chối | Từ chối | Từ chối | **Từ chối** | `Update running`<br>`Try again later` | `Dang cap nhat`<br>`Vui long thu lai sau` |
| Đã có reset / nâng cấp đang chờ | **Cảnh báo** (6.1) | Cho phép | Từ chối | Cho phép | `Reset pending`<br>`Reboot to apply` | `Dang doi reset`<br>`Reboot de ap dung` |
| Chuỗi reset của `psp-agent` đang chạy (SWR hoặc API) | Từ chối | Từ chối | Từ chối | Từ chối | `Busy` | `Dang xu ly reset` |

Màn hình từ chối hiển thị 3 giây. Việc phát hiện tiến trình update cần một khoá chung do appliance-kit bổ sung (mục 11, A1).

### 6.1. Reboot

1. **Bước 1:**

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `Reboot Firewall?`<br>`Press [v] to cont.` | `Khoi dong lai may?`<br>`Bam [v] de tiep tuc` |

   Nếu đang có reset / nâng cấp chờ, bước 1 đổi thành cảnh báo dưới đây, vì reboot lúc này sẽ **chạy reset**:

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `RESET IS PENDING!`<br>`Press [v] to cont.` | `DANG DOI RESET!`<br>`Bam [v] de tiep tuc` |

2. **Bước 2:** bấm `[ ▼ ]`

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `Confirm Reboot?`<br>`[>]YES    [<]NO` | `Khoi dong lai ngay?`<br>`[>]DONG Y  [<]HUY` |

3. **Bước 3:** bấm `[ ▶ ]`

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `Rebooting OS...`<br>`Please wait...` | `Dang khoi dong lai`<br>`Vui long doi...` |

   `psp-agent` gọi `systemctl reboot`. Hook shutdown ghi lại màn hình này ở bước cuối (theo ngôn ngữ trong `/run/psp/panel-lang`, mục 2); chữ trên LCM tồn tại qua reboot cho tới khi `lmbiodrv` nạp lại.

### 6.2. Shutdown

1. **Bước 1:**

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `Shutdown Device?`<br>`Press [v] to cont.` | `Tat thiet bi?`<br>`Bam [v] de tiep tuc` |

2. **Bước 2:**

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `Confirm Power Off?`<br>`[>]YES    [<]NO` | `Xac nhan tat may?`<br>`[>]DONG Y  [<]HUY` |

3. **Bước 3:**

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `Shutting down...`<br>`Please wait...` | `Dang tat may...`<br>`Vui long doi...` |

   `psp-agent` gọi `systemctl poweroff`.
4. **Bước 4:** hook `system-shutdown`, sau khi mọi filesystem đã unmount, ghi:

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `System halted`<br>`Safe to unplug!` | `He thong da tat`<br>`Da co the rut dien` |

   Đèn nền được bật lên để màn hình này đọc được. Module LCM có còn điện sau `poweroff` không **[XÁC MINH]**; nếu không, tín hiệu "an toàn" là đèn Nguồn.

### 6.3. Factory Reset
*(Xoá cấu hình, log và dữ liệu trên `data`, khôi phục baseline của nhà máy; serial và định danh máy được giữ. Ngôn ngữ LCD quay về mặc định **tiếng Anh** vì `panel-lang` nằm trong file cấu hình trên `data`.)*

**Một chuỗi duy nhất cho mọi đường.** Menu, nút SWR và lệnh API `RESET RUN` đều đi vào cùng chuỗi reset của `psp-agent`:

1. LED đỏ nháy 200/200.
2. Chạy các hook trong `/etc/psp/factory-reset.d/` theo thứ tự tên; hook cuối là `99-arm-factory-reset.sh`, gọi `factory-reset-trigger --yes --no-reboot` để arm cờ trên ESP.
3. Chờ `grace-ms`.
4. `reboot`.
5. Initramfs khôi phục; cờ chỉ được xoá **sau cùng**.

Bất kỳ hook nào lỗi, hết giờ, hoặc thư mục hook rỗng → **không reboot**, LED đỏ đứng.

**Màn hình:**

1. **Bước 1:**

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `FACTORY RESET?!`<br>`Press [v] to cont.` | `KHOI PHUC GOC?!`<br>`Bam [v] de tiep tuc` |

2. **Bước 2:**

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `ERASE ALL DATA?!`<br>`[>]YES    [<]NO` | `XOA HET DU LIEU?!`<br>`[>]DONG Y  [<]HUY` |

3. **Bước 3:** bấm `[ ▶ ]` → chuỗi reset bắt đầu (LED đỏ nháy):

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `Arming reset...`<br>`Please wait...` | `Dang chuan bi reset`<br>`Vui long doi...` |

   - **Hook thành công:** hiển thị trong `grace-ms`, sau đó reboot:

     | Tiếng Anh | Tiếng Việt (VI) |
     | :--- | :--- |
     | `Reset armed`<br>`Rebooting...` | `Da san sang reset`<br>`Dang khoi dong lai` |

   - **Thất bại:** không reboot, LED đỏ đứng, dữ liệu giữ nguyên. Hiển thị 10 giây rồi về menu:

     | Tiếng Anh | Tiếng Việt (VI) |
     | :--- | :--- |
     | `Reset refused`<br>`No baseline` | `Khong the reset`<br>`Khong co baseline` |

     Dòng 2 lấy theo lý do:

     | Nguyên nhân | Dòng 2 | Dòng 2 (VI) |
     | :--- | :--- | :--- |
     | `NO_HOOKS` (thư mục hook rỗng) | `No reset hook` | `Thieu hook reset` |
     | Hook hết `hook-timeout-s` | `Hook timeout` | `Hook het thoi gian` |
     | Hook `99-arm` thoát với mã của trigger: không có baseline | `No baseline` | `Khong co baseline` |
     | … ESP không ghi được | `ESP not writable` | `Khong ghi duoc ESP` |
     | … recovery boot chưa sẵn sàng | `Recovery not ready` | `Recovery chua OK` |
     | … đã có reset chờ | `Reset pending` | `Dang doi reset` |
     | Khác | `See reset log` | `Xem log reset` |

     Để phân biệt được các lý do, trigger cần mã thoát riêng và hook phải chuyển nguyên mã đó lên (mục 11, A2). Trước khi có thay đổi đó, mọi lỗi hook hiển thị `See reset log` / `Xem log reset`.

4. **Giữ nút SWR** (cùng chuỗi, không qua bước 1–2): trong lúc giữ, `psp-agent` bật đèn nền và đếm ngược:

   | Tiếng Anh | Tiếng Việt (VI) |
   | :--- | :--- |
   | `FACTORY RESET in 3s`<br>`Release to cancel` | `KHOI PHUC GOC SAU 3s`<br>`Buong nut de huy` |

   Nhả trước khi hết giờ → `Reset cancelled` (VI: `Da huy reset`). Hết giờ → tiếp tục như bước 3.

5. **Trong initramfs** (`psp-agent --oneshot`, LED đỏ nháy). **Luôn hiển thị tiếng Anh** (ngôn ngữ mặc định, mục 2). Cột VI là bản dịch dự phòng, chỉ dùng nếu sau này ngôn ngữ được lưu lên ESP:

   | Giai đoạn | Dòng 1 | Dòng 2 | Dòng 1 (VI, dự phòng) | Dòng 2 (VI, dự phòng) |
   | :--- | :--- | :--- | :--- | :--- |
   | Reset chỉ dữ liệu | `Resetting data` | `DO NOT POWER OFF!` | `Dang reset du lieu` | `KHONG DUOC NGAT DIEN` |
   | Reset đầy đủ — root filesystem | `Resetting 1/2: OS` | `DO NOT POWER OFF!` | `Reset 1/2: OS` | `KHONG DUOC NGAT DIEN` |
   | Reset đầy đủ — dữ liệu | `Resetting 2/2: data` | `DO NOT POWER OFF!` | `Reset 2/2: du lieu` | `KHONG DUOC NGAT DIEN` |
   | Nâng cấp firmware | `Upgrading firmware` | `DO NOT POWER OFF!` | `Nang cap firmware` | `KHONG DUOC NGAT DIEN` |

6. **Kết thúc** (do initramfs ghi, **luôn tiếng Anh**; cột VI dự phòng như bước 5):

   | Kết quả | Dòng 1 | Dòng 2 | Dòng 1 (VI, dự phòng) | Dòng 2 (VI, dự phòng) | Sau đó |
   | :--- | :--- | :--- | :--- | :--- | :--- |
   | Thành công, reset chỉ dữ liệu | `Reset complete` | `Starting...` | `Reset hoan tat` | `Dang khoi dong...` | Khởi động tiếp. |
   | Thành công, reset đầy đủ / nâng cấp | `Reset complete` | `Rebooting...` | `Reset hoan tat` | `Dang khoi dong lai` | Initramfs khởi động lại vào firmware vừa khôi phục. |
   | Lỗi, còn lượt thử | `Reset FAILED (1/3)` | `Retry on next boot` | `Reset THAT BAI (1/3)` | `Se thu lai lan sau` | Khởi động tiếp, lần sau thử lại. |
   | Lỗi, hết lượt thử | `Reset FAILED` | `See reset log` | `Reset THAT BAI` | `Xem log reset` | Khởi động tiếp; cảnh báo `RESET` (mục 9). |
   | Reset đầy đủ bỏ cuộc giữa chừng | `RESET INCOMPLETE` | `Service required` | `RESET CHUA XONG` | `Lien he ky thuat` | Dừng ở shell của initramfs, LED đỏ đứng. Cần kỹ sư. |

   `Reset THAT BAI (1/3)` dài đúng 20 ký tự: số lượt thử tối đa phải là 1 chữ số.

### 6.4. Đổi ngôn ngữ (Language)

*(Mới ở v1.5.)* Chuyển ngôn ngữ hiển thị của panel giữa **tiếng Anh** (mặc định) và **tiếng Việt**.

**Vị trí và quyền:** mục `4. Language` / `4. Ngon ngu` trong CONTROL (`M_CTRL_4`, mục 5.4). Do nằm trong CONTROL nên tuân theo `panel-control` (mục 10): `no` → không đổi được trên LCD; `pin` → phải nhập PIN khi vào CONTROL.

**Luồng (xác nhận 1 bước – ngoại lệ của mục 6):**

```
[> 4. Language] ─[>]─▶ [Kiểm tra trước 6.0] ─ bị chặn ─▶ [Màn hình từ chối 3 s] ─▶ CONTROL
                              │ được phép
                              ▼
                       [Chọn ngôn ngữ] ─[<]─▶ CONTROL (mục 4), không đổi
                              │            hết giờ menu ─▶ Auto-Cycle, không đổi
                              │ [^]/[v] chuyển lựa chọn (cuộn vòng)
                              │ [>]
              ┌───────────────┴───────────────┐
     trùng ngôn ngữ đang dùng          ngôn ngữ khác
              │                               ▼
     "Already in use" 1,5 s     [Xác nhận – NGÔN NGỮ HIỆN TẠI ] ─[<] / hết giờ─▶ về Chọn ngôn ngữ
              │                               │ [>]
              ▼                               ▼
     về Chọn ngôn ngữ              [Lưu panel-lang] ── lỗi ──▶ [Lưu thất bại 3 s, giữ ngôn ngữ cũ]
                                              │ thành công                │
                                              ▼                           │
                                   [Đã đổi – 2 s, ngôn ngữ mới]           │
                                              │                           │
                                              ▼                           ▼
                                   CONTROL, con trỏ ở mục 4 (hiển thị theo ngôn ngữ hiện hành)
```

**Quy tắc:**
- Tên hai lựa chọn **dùng chung cho cả hai giao diện**: `English` và `Vietnamese`. Người lỡ chuyển sang ngôn ngữ mình không đọc được vẫn nhận ra `English` để quay lại. Dấu `*` đánh dấu ngôn ngữ đang dùng; con trỏ mặc định đứng ở ngôn ngữ đang dùng.
- Màn hình xác nhận hiển thị **bằng ngôn ngữ hiện tại** (đúng ngôn ngữ người dùng đang thao tác), nhất quán với các màn hình xác nhận khác ở mục 6. Màn hình "đã đổi" hiển thị **bằng ngôn ngữ mới** để người dùng thấy ngay kết quả.
- Phím ở màn hình xác nhận: `[ ▶ ]` = đồng ý, `[ ◀ ]` = huỷ (quay lại màn hình chọn). Hết giờ = huỷ. Không lặp phím (mục 3).
- Khi đổi thành công: `psp-agent` ghi `panel-lang` vào `/etc/psp/psp-agent.conf` (ghi file tạm rồi đổi tên, giữ nguyên các khoá và comment khác), cập nhật `/run/psp/panel-lang` (mục 2), rồi vẽ lại mọi màn hình, kể cả slide Auto-Cycle, bằng ngôn ngữ mới.
- Ghi file lỗi: **không** đổi ngôn ngữ (kể cả tạm trong RAM), báo lỗi bằng ngôn ngữ hiện tại.
- Ngôn ngữ được giữ qua khởi động lại; **factory reset đưa về tiếng Anh**. Màn hình initramfs luôn tiếng Anh (6.3).

**Màn hình:**

| Màn hình | Dòng | Giao diện tiếng Anh | Giao diện tiếng Việt |
| :--- | :---: | :--- | :--- |
| Mục trong CONTROL | 2 | `> 4. Language` | `> 4. Ngon ngu` |
| Chọn ngôn ngữ | 1 | `--- LANGUAGE ---` | `--- NGON NGU ---` |
| | 2 | `> English *` hoặc `> Vietnamese` | `> English` hoặc `> Vietnamese *` |
| Chọn trùng ngôn ngữ đang dùng (1,5 s) | 1 | `Already in use` | `Dang su dung` |
| Lỗi lưu cấu hình (3 s) | 1 / 2 | `Save failed`<br>`Language unchanged` | `Luu that bai`<br>`Ngon ngu khong doi` |
| Bị chặn (3 s) | 1 / 2 | Theo bảng 6.0 | Theo bảng 6.0 |

Xác nhận (ngôn ngữ hiện tại) và kết quả (ngôn ngữ mới):

| Chuyển | Màn hình xác nhận | Đã đổi (2 s) |
| :--- | :--- | :--- |
| Tiếng Anh → Tiếng Việt | `Switch to Vietnamese`<br>`[>]YES    [<]NO` | `Da doi ngon ngu`<br>`Tieng Viet` |
| Tiếng Việt → Tiếng Anh | `Doi sang Tieng Anh?`<br>`[>]DONG Y  [<]HUY` | `Language changed`<br>`English` |

`Switch to Vietnamese` dài đúng 20 ký tự nên không có dấu `?` (thêm `?` là 21); dòng 2 `[>]YES    [<]NO` đã thể hiện đây là câu hỏi.

---

## 7. QUY TẮC ĐỊNH DẠNG GIÁ TRỊ ĐỘNG

Không chuỗi nào vượt 20 ký tự. `psp-agent` đã từ chối dòng dài hơn 20 ký tự (`ERR ARGS`) — panel phải định dạng đúng trước khi gửi, không dựa vào lỗi đó.

| Trường | Định dạng | Ví dụ (dài nhất) | Định dạng (VI) | Ví dụ (VI, dài nhất) |
| :--- | :--- | :--- | :--- | :--- |
| Phiên bản (S1) | `FW ` + phần trước dấu `-` đầu tiên, tối đa 17 ký tự | `FW 1.3.260826` | Giữ nguyên | `FW 1.3.260826` |
| Phiên bản (1.9) | Chuỗi đầy đủ, cuộn ngang | | Giữ nguyên | |
| CPU / nhiệt độ | `CPU:%3d%%  Temp:%3dC` | `CPU:100%  Temp:105C` (19) | `CPU:%3d%%  Nhiet:%3dC` | `CPU:100%  Nhiet:105C` (20) |
| Nhiệt độ board | `SYS2:%3dC` | `SYS2:105C` | Giữ nguyên | `SYS2:105C` |
| RAM + uptime (S4) | `RAM: <x.x>G  Up: <n>d`; dưới 1 ngày dùng `<n>h`; từ 1000 ngày hiển thị `999d+` | `RAM: 15.6G  Up: 365d` (20) | Giữ nguyên | `RAM: 15.6G  Up: 365d` (20) |
| RAM (1.3) | `Used: <x.x>G / <y.y>G`; từ 100G trở lên bỏ phần thập phân | `Used: 31.2G / 64.0G` (19) | `<x.x>G / <y.y>G` | `31.2G / 64.0G` (13) |
| Đĩa data | `Used: <n>% of <size>` | `Used: 100% of 1.9T` (18) | `Da dung: <n>%/<size>` | `Da dung: 100%/1.9T` (18) |
| Quạt | Một quạt: `FAN1: <rpm> rpm`; nhiều quạt: `F1:<rpm>  F2:<rpm>` | `F1:12000  F2:11800` (18) | Một quạt: `Quat 1: <rpm> rpm`; nhiều quạt: giữ nguyên | `Quat 1: 12000 rpm` (17) |
| Điện áp | `%4.1fV  %3.1fV  %3.1fV` (12V, 5V, 3.3V), đường ngoài ngưỡng thêm `!` | `12.1V! 5.0V  3.3V` | Giữ nguyên | `12.1V! 5.0V  3.3V` |
| Uptime (1.7) | `Up: <d>d <hh>h <mm>m` | `Up: 9999d 23h 59m` (17) | `<d> ngay <hh>h <mm>m` | `9999 ngay 23h 59m` (17) |
| Đếm (phiên, drop) | Nguyên nếu < 10 000; lớn hơn dùng hậu tố k/M/G, 1 chữ số thập phân khi < 10 | `Act:1.2M  Drop:94k` | Giữ nguyên | `Act:1.2M  Drop:94k` |
| Băng thông | bit/s, hậu tố k/M/G | `In: 1.2G  Out: 940M` (19) | `Vao: <v>  Ra: <v>` | `Vao: 1.2G  Ra: 940M` (19) |
| Tiêu đề cổng | `Port <n> (<ROLE>): <STATE>`; n tối đa 2 chữ số, ROLE tối đa 4 ký tự | `Port 12 (MGMT): DOWN` (20) | `Cong <n> (<ROLE>): <STATE>` | `Cong 12 (MGMT): DOWN` (20) |
| IPv4 | `a.b.c.d/nn` (tối đa 18), thêm `+` nếu có nhiều IP | `192.168.100.100/24+` (19) | Giữ nguyên | `192.168.100.100/24+` (19) |
| IPv6, serial dài | Cuộn ngang trong trang chi tiết | | Giữ nguyên | |
| Khởi động (State 0) | `Starting... <N> left` | `Starting... 999 left` (20) | `Khoi dong: con <N>` | `Khoi dong: con 999` (18) |
| Cảnh báo nhiệt | `[!] CPU Temp <n>C` | `[!] CPU Temp 105C` (17) | `[!] Nhiet CPU <n>C` | `[!] Nhiet CPU 105C` (18) |
| Cảnh báo nguồn | `[!] Power <rail> low\|high` | `[!] Power VSB3.3V high` (**22**, xem mục 9) | `[!] Nguon <rail> thap\|cao` | `[!] Nguon 3.3V thap` (19); rail `VSB3.3V` xem mục 9 |
| Cảnh báo đĩa | `[!] Data disk <n>%` | `[!] Data disk 100%` (18) | `[!] Dung luong <n>%` | `[!] Dung luong 100%` (19) |
| Cảnh báo boot | `[!] Boot: <n> failed` | `[!] Boot: 999 failed` (20) | `[!] <n> dich vu loi` | `[!] 999 dich vu loi` (19) |

**Cuộn ngang:** dừng 1,5 giây ở đầu, dịch 1 ký tự mỗi 400 ms, dừng 1,5 giây ở cuối. Chỉ dùng trong menu, và chỉ khi đèn nền sáng — mỗi bước cuộn là một lần ghi LCM qua mutex phần cứng dùng chung với luồng đọc phím.

**Kiểm tra khi build:** mọi chuỗi tĩnh của **cả hai ngôn ngữ** là ASCII và ≤ 20 ký tự; bộ định dạng có unit test cho các giá trị biên của cả hai ngôn ngữ (đặc biệt các format chạm đúng 20); chuỗi tiếng Việt không chứa từ trong danh sách cấm ở 7.1. Bộ test hiện có của `psp-agent` (`make test`) được mở rộng.

### 7.1. Quy tắc text tiếng Việt không dấu

**Nguyên tắc:**
1. Viết lại theo nghĩa, không dịch sát; câu ngắn, động từ rõ.
2. **Giữ thuật ngữ kỹ thuật tiếng Anh**: `CPU`, `RAM`, `IP`, `DHCP`, `WAN/LAN/DMZ/MGMT/ETH`, `Gateway`, `firmware`, `reset`, `reboot`, `log`, `hook`, `ESP`, `baseline`, `Dataplane`, `OS`, `Recovery`.
3. Giữ mã trạng thái và đơn vị ngắn: `UP/DOWN/OFF`, `Act`, `Drop`, `Up`, `d`, `h`, `m`, `rpm`, `V`, `C`, hậu tố `k/M/G/T`.
4. Từ đa nghĩa khi bỏ dấu chỉ dùng khi có từ đi kèm làm rõ nghĩa (`2 dich vu loi`, `Tat thiet bi?`, `Cong 1 (WAN)`).
5. Chữ HOA chỉ dùng cho cảnh báo nguy hiểm và mã trạng thái (`KHONG DUOC NGAT DIEN`, `XOA HET DU LIEU?!`).
6. Thuật ngữ thống nhất: *Factory Reset* = `Khoi phuc goc`; *pending* = `Dang doi …`; nhãn xác nhận = `[>]DONG Y  [<]HUY`.
7. Text do driver ghi (`<-- NCA-2513 -->`) và text do initramfs ghi (6.3 bước 5–6) không đổi theo ngôn ngữ.

**Từ cấm / cần tránh** (khi bỏ dấu thành từ tục, gây hoảng hoặc sai nghĩa):

| Từ có dấu | Bỏ dấu | Đọc nhầm thành | Dùng thay |
| :--- | :--- | :--- | :--- |
| chờ | `cho` | *chó* | `doi` (đợi), `dang lay IP` |
| chạy | `chay` | *cháy* | `van hanh`, giữ `Up` |
| cũ | `cu` | từ tục | `truoc`, `khong doi` |
| đủ | `du` (đứng riêng) | từ tục | `toan bo` |
| các | `cac` | từ tục | bỏ từ, hoặc dùng số đếm |
| lớn | `lon` | từ tục | `cao`, `nhieu` |
| ngủ | `ngu` (đứng riêng) | xúc phạm | `man hinh tat` (`Ngon ngu` được phép vì đi đôi) |
| ẩn | `an` | *ăn* | `Khong hien …` |
| chọc lỗ | `choc lo` | nghĩa tục | `nut SWR` |
| nhả | `nha` | *nhà* | `Buong nut` |
| từ chối | `tu choi` | *tự chơi* | `Khong the …` |
| bận | `ban` | *bán / bạn / bẩn* | `Dang xu ly …` |
| đầy | `day` | *dây / đây* | `chiem dung luong` |
| của | `cua` | *cua* | dùng `/` |
| dừng / dùng | `dung` (không có từ đi kèm) | lẫn *dừng / dùng / đúng* | `da tat`, `bi loi`; `Da dung:` được phép |
| lỗi (đứng riêng) | `loi` | *lời / lợi* | `THAT BAI`, hoặc có từ đi kèm (`bi loi`, `dich vu loi`) |
| sắp | `sap` | *sập* | `Dang doi …` |
| FW (cho firewall) | `FW` | *firmware* | `may`; `FW` chỉ dùng cho firmware |

---

## 8. NGUỒN DỮ LIỆU

**Ràng buộc do panel nằm trong `psp-agent` (rủi ro của A1):**
- Luồng panel **không bao giờ** được làm chậm luồng nút SWR, chuỗi reset hay các kết nối socket.
- Mọi lệnh ngoài (`ngfw_cli`, `systemctl`, `factory-reset-trigger`) chạy ở **tiến trình con**, timeout cứng 1 giây (`SIGKILL` cả process group, như cách chạy hook).
- Không giữ mutex phần cứng trong lúc chờ dữ liệu.
- Luồng panel lỗi thì chỉ panel ngừng (LED ngừng nhịp tim); socket và nút SWR vẫn hoạt động.

| Giá trị | Nguồn | Ghi chú |
| :--- | :--- | :--- |
| Phiên bản firmware | `factory-reset.firmware` trên ESP (đường dẫn trong `panel-fw-file`) | Không đọc từ `/etc` (nằm trên `data`, tồn tại qua nâng cấp). |
| Serial | `/identity/serial` | |
| CPU % | `/proc/stat` | |
| Nhiệt độ, quạt, điện áp | HWM NCT6776 qua `lmbiodrv` | **Chưa có trong `psp-agent`** (`hwm` mới chỉ là capability). Cần port từ `utils/sdk_hwm` và thêm lệnh socket `HWM GET`. |
| RAM | `/proc/meminfo` | |
| Đĩa data | `statvfs(/data)` | |
| Uptime | `/proc/uptime` | |
| Cổng, gateway | Cấu hình + dataplane qua `ngfw_cli` | Cổng dataplane có thể không hiện với kernel. |
| Phiên, drop, băng thông | Thống kê cgate qua `ngfw_cli` (`Engine.Op`) | |
| Trạng thái reset | `factory-reset-trigger --status` | |
| Job khởi động | `systemctl list-jobs` | |

---

## 9. CẢNH BÁO (ALERT)

| Mã | Bật | Tắt | Dòng 1 | Dòng 2 | Dòng 1 (VI) | Dòng 2 (VI) | Nháy kép |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| `TEMP` | `SYS1` hoặc `SYS2` ≥ 70C trong 10 giây (ngưỡng nhà sản xuất) | < 65C | `[!] CPU Temp 78C` | `Check fans/airflow` | `[!] Nhiet CPU 78C` | `Kiem tra quat gio` | Có |
| `FAN` | `FAN1` < 1408 RPM trong 10 giây (min nhà sản xuất) | ≥ 1800 RPM | `[!] Fan 1 low/stop` | `Replace fan` | `[!] Quat 1 bi loi` | `Thay quat` | Có |
| `PWR` | 12V / 5V / 3.3V / VSB3.3V ngoài ngưỡng `sdk_hwm` trong 10 giây | Trở lại trong ngưỡng | `[!] Power 12V low` | `Check power supply` | `[!] Nguon 12V thap` | `Kiem tra bo nguon` | Có |
| `DISK` | Đĩa data ≥ 90% | < 85% | `[!] Data disk 93%` | `Logs filling disk` | `[!] Dung luong 93%` | `Log chiem dung luong` | Không |
| `DPLANE` | Dataplane không trả lời trong 15 giây | Trả lời lại | `[!] Dataplane down` | `Traffic affected` | `[!] Dataplane DOWN` | `Anh huong luu luong` | Không |
| `RESET` | ESP có `factory-reset-failed` | `factory-reset-trigger --clear` | `[!] Last reset FAIL` | `See reset log` | `[!] Reset that bai` | `Xem log reset` | Không |
| `BOOT` | Có unit systemd lỗi | Không còn unit lỗi | `[!] Boot: 2 failed` | `Check system log` | `[!] 2 dich vu loi` | `Xem log he thong` | Không |

- Mọi ngưỡng có trễ (hysteresis) và cấu hình được.
- Cảnh báo **không** làm sáng đèn nền (mục 2). Cảnh báo phần cứng được báo từ xa bằng LED nháy kép.
- Nhiều cảnh báo thì xoay lần lượt ở đầu vòng, theo thứ tự trong bảng.
- VBAT thấp **không** phải cảnh báo của panel: pin CMOS yếu không ảnh hưởng vận hành.
- `PWR` khi điện áp cao: `[!] Power 12V high` / `[!] Nguon 12V cao`.
- **[CẦN SỬA]** Rail `VSB3.3V` làm dòng 1 vượt 20 ký tự ở **cả hai ngôn ngữ**: `[!] Power VSB3.3V low` (21), `[!] Power VSB3.3V high` (22), `[!] Nguon VSB3.3V thap` (22). Đề xuất: với rail này bỏ chữ `Power` / `Nguon` → `[!] VSB3.3V low` / `[!] VSB3.3V thap` (dòng 2 đã nói rõ là nguồn). Cần chốt trước khi hiện thực.
- `TEMP` luôn ghi "CPU" kể cả khi `SYS2` (board) là nguồn kích hoạt. Đề xuất tách `[!] Board Temp 78C` / `[!] Nhiet board 78C` — cần chốt.

---

## 10. CẤU HÌNH & BẢO MẬT

Cấu hình panel nằm trong `/etc/psp/psp-agent.conf`, cùng file với các khoá hiện có. Khoá mới có giá trị mặc định dựng sẵn trong mã, nên file cũ vẫn chạy được. Một khoá không hợp lệ chỉ được ghi log và bỏ qua, như khoá lạ hiện nay.

| Khoá | Giá trị | Mặc định | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| `panel` | `on` / `off` | `on` | `off` = hành vi như bản 0.3.0 (chỉ banner tĩnh). Tự tắt trên board không có `lcm`. |
| `panel-control` | `yes` / `no` / `pin` | **`yes`** (A2) | `no` ẩn nhóm CONTROL; `pin` yêu cầu PIN. |
| `panel-pin` | 4 chữ số | (trống) | Bắt buộc khi `pin`; trống thì coi như `no`. |
| `panel-show-ip` | `yes` / `no` | `yes` | `no` hiển thị `IP hidden` (VI: `Khong hien IP`). |
| `panel-lang` | `en` / `vi` | **`en`** | Ngôn ngữ hiển thị (v1.5). Đổi được trên LCD (mục 6.4) hoặc sửa file. Giá trị không hợp lệ → log và dùng `en`. Factory reset → về `en`. |
| `panel-cycle-s` / `panel-menu-timeout-s` | giây | `5` / `30` | |
| `panel-fw-file` | đường dẫn | `/boot/efi/factory-reset.firmware` | |
| `panel-temp-warn-c` / `panel-fan-min-rpm` / `panel-disk-warn-pct` | số | `70` / `1408` / `90` | |
| `lcm-backlight`, `lcm-backlight-timeout-s`, `lcm-line1`, `lcm-line2`, `keys-poll-ms`, `hold-ms`, `grace-ms`, `led-default` | | | Khoá hiện có; giữ nguyên ý nghĩa. |

**Bảo mật:**
- Mặc định `panel-control=yes`: ai đứng trước máy cũng reboot, tắt máy hoặc factory reset được. Đây là chủ ý (A2): nút SWR vốn đã cho phép factory reset vật lý.
- Có thể chuyển sang `pin` hoặc `no` trên golden box trước khi capture.
- **Nhập PIN** (khi `pin`):
  - Màn hình `Enter PIN:` / `> 0 _ _ _` (VI: `Nhap ma PIN:` / `> 0 _ _ _`).
  - Phím: `[ ▲ ]` / `[ ▼ ]` đổi chữ số; `[ ▶ ]` sang chữ số tiếp theo (ở chữ số cuối thì xác nhận); `[ ◀ ]` về chữ số trước (ở chữ số đầu thì huỷ).
  - Sai 3 lần → khoá 5 phút (`Locked` / `Try again in 5m`; VI: `Da khoa` / `Thu lai sau 5 phut`).
- **Đổi ngôn ngữ** nằm trong CONTROL nên chịu cùng mức bảo vệ: `panel-control=pin` thì phải nhập PIN, `no` thì không đổi được trên LCD (chỉ đổi qua file cấu hình).

---

## 11. KẾ HOẠCH TRIỂN KHAI

### 11.1. Hiện trạng

Các phần đã có, panel xây tiếp trên đó, không viết lại:

| Thành phần | Đã có | Vị trí |
| :--- | :--- | :--- |
| `psp-agent` 0.3.0 | - Socket API.<br>- `LCM TEXT` / `CLEAR` / `BACKLIGHT`, đèn nền tối mặc định, banner có retry.<br>- Luồng đọc phím (`EVENT KEY`), luồng nút SWR (giữ → chuỗi reset → hook → reboot).<br>- Luồng nháy LED, WDT theo kết nối, chặn chuỗi LCM > 20 ký tự.<br>- Bộ test host (`make test`), script test vật lý. | `../lanner/psp-agent`. Trên `fw_ncss105`: `fwx-psp-agent.service`, `/opt/fwx/psp/psp-agent`, đóng gói trong deb **fwx-dpi**. |
| Driver | `lmbiodrv.ko` (PSP 4.0.1). | `fw_ncss105`: cài tay vào `/lib/modules/<kver>/extra/`, nạp qua `/etc/modules-load.d/lmbiodrv.conf`. **Không có gói, không DKMS.** |
| appliance-kit | Hook `99-arm-factory-reset.sh`, `factory-reset-trigger`, script khôi phục trong initramfs, `factory-reset-esp` (initrd recovery trên ESP là bản copy nguyên của `/boot/initrd.img-<k>`). | `1-factory-reset/` |

### 11.2. Kiểm tra tại máy `fw_ncss105`

| # | Việc | Cách | Loại |
| :--- | :--- | :--- | :--- |
| V1 | Thứ tự vật lý K1–K4 → `◀▲▼▶` | `tests/physical/keys-test.sh`, bấm từ trái sang phải. | Cần người tại máy |
| V2 | Lỗ chọc là nút SWR | Nhấn ngắn: đèn nền sáng (**không giữ quá 5 giây**). | Cần người tại máy |
| V3 | LCM sau `poweroff`; màn hình khi bật nguồn nguội trước khi `lmbiodrv` nạp | Ghi chữ, `poweroff`, quan sát; bật lại, quan sát. | Cần người tại máy |
| V4 | Đèn Nguồn sau `poweroff`: tắt hay cam | Cùng V3. | Cần người tại máy |
| V5 | SLED sau khi bật nguồn nguội | Cùng V3. | Cần người tại máy |
| V6 | `wdat_wdt` có cùng bộ đếm với WDT Super I/O không | Đọc bảng ACPI WDAT (`acpidump -n WDAT`, `iasl -d`), so địa chỉ thanh ghi với WDT của NCT6776 (`ioaccess_nct6776.c`). | Chỉ đọc, qua SSH. **Xong:** khác bộ đếm (TCO của PCH vs NCT6776 LDN 8), xem 1.4. |

### 11.3. Các gói việc

Ký hiệu repo: **KIT** = appliance-kit, **PSA** = `../lanner/psp-agent`.

#### Giai đoạn A — Tiền đề trong appliance-kit (độc lập, làm ngay được)

| ID | Repo | Việc | Xong khi |
| :--- | :--- | :--- | :--- |
| A1 | KIT | Khoá update: `firmware-install`, `firmware-patch` lấy `flock -n /run/firmware-update.lock`. Lần chạy thứ hai báo lỗi rõ ràng. | Hai lần chạy đồng thời → lần sau bị từ chối. Panel kiểm tra được khoá bằng `flock -n`. |
| A2 | KIT | `factory-reset-trigger`:<br>- Mã thoát riêng: 3 không có baseline, 4 ESP không ghi được, 5 recovery chưa sẵn sàng, 6 đã có reset chờ.<br>- Thêm `--check` (kiểm tra như khi arm nhưng không ghi cờ).<br>- `99-arm-factory-reset.sh` thoát bằng đúng mã của trigger thay vì luôn trả 1. | Mỗi lý do cho đúng mã. Đường nút SWR vẫn chạy như cũ (mã khác 0 vẫn huỷ reset). |
| A3 | KIT | Đóng gói `lmbiodrv`: DKMS, hoặc build kèm firmware bundle cho từng kernel. Preflight cảnh báo nếu không có `lmbiodrv.ko` cho kernel đang chạy. | Nâng kernel không làm mất panel và nút SWR. |

#### Giai đoạn B — Nền tảng trong psp-agent

| ID | Repo | Việc | Xong khi |
| :--- | :--- | :--- | :--- |
| B1 | PSA | `src/fmt.c`: các hàm định dạng thuần (mục 7), không có I/O. Unit test host `tests/fmt_test.c`, chạy trong `make test`. | Mọi ví dụ biên ở mục 7 cho đúng chuỗi và ≤ 20 ký tự. |
| B2 | PSA | `src/hwm.c`: đọc nhiệt độ / quạt / điện áp NCT6776 qua `lmbio` (port từ `utils/sdk_hwm`, `ioaccess_nct6776.c`). Lệnh socket `HWM GET`. | Trên 105, giá trị khớp với `sdk_hwm`. Test host trả `NO_DEVICE`. |
| B3 | PSA | `led.c` chia lớp ưu tiên: reset > client > panel. `LED STOP` trả về lớp panel. | Test host: client ghi đè rồi `STOP` → về mẫu của panel; chuỗi reset luôn thắng. |
| B4 | PSA | Các khoá cấu hình mục 10 trong `cfg_defaults` / `psa_config_load`. Giá trị sai → log và dùng mặc định. | Test: file cũ (không có khoá mới) chạy y như 0.3.0 khi `panel=off`. |
| B5 | PSA | Backend `sim` (build `PSA_SIM`): vẽ LCM 20x2 ra terminal, đọc phím từ bàn phím. Thêm vào `hal.c` như một backend mới. | Chạy được toàn bộ panel trên máy dev, không cần box. |
| B6 | PSA | `sd_notify` tối giản (gửi `READY=1` / `WATCHDOG=1` tới `$NOTIFY_SOCKET`), không phụ thuộc libsystemd. | Chạy được với `Type=notify`. |

#### Giai đoạn C — Panel trong psp-agent

| ID | Repo | Việc | Xong khi |
| :--- | :--- | :--- | :--- |
| C1 | PSA | `src/panel.c`: luồng panel và hàng đợi sự kiện.<br>- Nguồn sự kiện: phím từ `keys_thread`, SWR / reset từ `swr_thread` và `reset.c`, cạnh đèn nền, tick 1 giây.<br>- State machine mục 2; ngữ nghĩa phím mục 3 (tác dụng khi nhả, giữ 2 giây, lặp, nuốt phím đánh thức). | Duyệt toàn bộ cây trên `sim` theo kịch bản. |
| C2 | PSA | `src/screens.c`: slide, các trang SYSTEM / NETWORK / CONTROL, cuộn ngang. Chỉ ghi LCM khi nội dung đổi. | Đúng mọi màn hình ở mục 5 và 6 (so bằng test). |
| C3 | PSA | `src/collect.c`: chạy lệnh ngoài trong tiến trình con, timeout 1 giây, kill cả process group.<br>- Collector: `/proc`, `statvfs`, file firmware trên ESP, `/identity/serial`, `ngfw_cli` (cổng / phiên / băng thông), `systemctl list-jobs` / `--failed`, `factory-reset-trigger --status`.<br>- Có cache; không giữ mutex phần cứng khi chờ. | `ngfw_cli` treo → UI vẫn phản hồi, trường đó hiện `?`. |
| C4 | PSA | `src/alerts.c`: bảng mục 9 với hysteresis. Cảnh báo phần cứng → nháy kép (lớp panel). | Hạ ngưỡng trong cấu hình → cảnh báo bật và tắt đúng. |
| C5 | PSA | CONTROL:<br>- Kiểm tra trước theo 6.0 (khoá A1, `--status` / `--check`, `reset_in_progress()`).<br>- Reboot / poweroff qua `systemctl`.<br>- Factory reset qua `reset_run()` nội bộ (lời gọi từ panel không cần token).<br>- PIN khi `panel-control=pin`. | Mọi nhánh ở mục 6 chạy đúng trên `sim`, với `reboot-on-reset=false`. |
| C6 | PSA | Tích hợp reset:<br>- `reset.c` báo mã lỗi của hook trong sự kiện: `EVENT RESET FAILED HOOK <name> rc=<n>`.<br>- Panel tra lý do theo bảng 6.3.<br>- Màn hình đếm ngược khi giữ SWR, bật đèn nền khi giữ. | Mỗi mã A2 hiện đúng dòng 2. Huỷ giữa chừng hiện `Reset cancelled`. |
| C7 | PSA | Nhịp tim: luồng panel duy trì LED xanh 500/500 và gửi `WATCHDOG=1` mỗi tick. | Luồng panel dừng → LED đứng, systemd khởi động lại agent. |

#### Giai đoạn D — Màn hình ngoài daemon

| ID | Repo | Việc | Xong khi |
| :--- | :--- | :--- | :--- |
| D1 | PSA | Chế độ `psp-agent --oneshot`:<br>- `lcm "<l1>" "<l2>"`, `led solid\|blink\|off ...`, `backlight on\|off`.<br>- Mở `/dev/lmbiodrv` trực tiếp, không cần file cấu hình.<br>- Từ chối nếu socket của daemon còn trả lời. | Chạy được trong initramfs (glibc được `copy_exec` kéo theo). |
| D2 | PSA + KIT | Hook `/usr/lib/systemd/system-shutdown/psp-panel` (`$1` = `reboot` / `poweroff` / `halt`), ghi các màn hình ở 6.1 / 6.2. Cài vào root filesystem (read-only) qua đường cài phần mềm. | Reboot / poweroff hiện đúng màn hình cuối. |

#### Giai đoạn E — Tích hợp appliance-kit

| ID | Repo | Việc | Xong khi |
| :--- | :--- | :--- | :--- |
| E1 | KIT | Hook initramfs:<br>- Copy `psp-agent` (đọc từ lớp dưới của overlay `/opt/fwx` qua một bind mount của `/`, giống cách `prepare-baseline` làm — **không** lấy bản trong upper trên `data`).<br>- `manual_add_modules lmbiodrv`.<br>- Chỉ làm khi cả hai tồn tại; thiếu thì bỏ qua, không lỗi. | `lsinitramfs` thấy cả hai. `factory-reset-esp` copy sang ESP như cũ (initrd recovery là bản copy). |
| E2 | KIT | Script khôi phục:<br>- Hàm `lcd_msg` best-effort (`timeout`, `\|\| true`) gọi ở từng giai đoạn theo bảng 6.3; trước đó `modprobe lmbiodrv`.<br>- Tiến trình nháy đỏ chạy nền, kill trước `reboot -f` và trước khi trả quyền boot.<br>- Màn hình `RESET INCOMPLETE` trước `panic`.<br>- **Không đổi thứ tự** verify → đếm → xoá → khôi phục → sync → xoá cờ. | Rút LCM hoặc thiếu module → khôi phục vẫn chạy y như cũ. |
| E3 | KIT | `99-arm-factory-reset.sh` chuyển mã thoát (thuộc A2). | |
| E4 | KIT | Preflight thêm các kiểm tra:<br>- initramfs có `psp-agent` + `lmbiodrv`.<br>- `RuntimeWatchdogSec` đã đặt.<br>- `panel-control=pin` mà `panel-pin` trống.<br>- Unit `fwx-psp-agent` có `WatchdogSec`. | Mỗi thiếu sót → WARN / FAIL đúng. |
| E5 | KIT | Tài liệu:<br>- `1-factory-reset/README.md`, `CLAUDE.md` (tên unit `fwx-psp-agent`, phụ thuộc initramfs).<br>- `docs/factory-reset-guide.md`, `docs/what-changes-when.md`.<br>- `docs/operator-guide.md`: mục mặt trước máy, cảnh báo "không chọc lỗ khi treo". | |

#### Giai đoạn F — Watchdog

| ID | Repo | Việc | Xong khi |
| :--- | :--- | :--- | :--- |
| F1 | — | V6: `wdat_wdt` có trùng WDT Super I/O không. | Có kết luận ghi vào mục 1.4. |
| F2 | KIT | Drop-in systemd `RuntimeWatchdogSec=60s`. | `systemctl show -p RuntimeWatchdogUSec` = 60s. |
| F3 | KIT | Drop-in cho `fwx-psp-agent.service`: `WatchdogSec=30s`, `NotifyAccess=main` (`Type=notify` chỉ khi agent gửi `READY=1`). Chỉ cài sau B6/C7. | Treo luồng panel (build thử) → systemd khởi động lại agent. |
| F4 | — | Thử watchdog hết hạn thật trên máy lab (phương pháp gây treo chọn khi làm). | Board tự khởi động lại trong ≤ 60 giây. |

#### Giai đoạn G — Phát hành & kiểm thử trên `fw_ncss105`

| ID | Việc |
| :--- | :--- |
| G1 | **Vòng phát triển:**<br>- Build trên host, `scp` vào `/tmp`, dừng `fwx-psp-agent`, chạy bản `/tmp` ở foreground với cùng file cấu hình. Không ghi gì vào root filesystem.<br>- Xong thì `systemctl start fwx-psp-agent` để về bản gốc.<br>- `deploy.sh` hiện nhắm `/usr/local/sbin` trên `fw_ncss17`; cần thêm đích `/opt/fwx/psp` hoặc không dùng cho 105. |
| G2 | **Phát hành:**<br>- `psp-agent` mới vào bản **fwx-dpi** kế tiếp.<br>- Trên 105 cài bằng `firmware-patch` (overlay `/opt/fwx` được unmount, capture root filesystem).<br>- Sau đó `update-initramfs -u` dưới `remount,rw`; `factory-reset-esp` cập nhật ESP. |
| G3 | **Ma trận kiểm thử:**<br>- Từng màn hình; ngữ nghĩa phím; từng lệnh CONTROL.<br>- Mỗi lý do từ chối reset; giữ SWR rồi huỷ; reset đầy đủ với các màn hình initramfs.<br>- **Ngắt điện giữa lúc khôi phục** (màn hình phải hiện lại ở lần thử sau).<br>- Màn hình shutdown; watchdog.<br>- Luồng panel chết → nút SWR vẫn reset được; `ngfw_cli` treo → UI vẫn phản hồi.<br>- Cảnh báo (hạ ngưỡng).<br>- Board không có LCM (`platform=generic`) → panel tự tắt. |

#### Giai đoạn H — Tiếng Việt và đổi ngôn ngữ (v1.5, chưa làm)

| ID | Repo | Việc | Xong khi |
| :--- | :--- | :--- | :--- |
| H1 | PSA | Bảng chuỗi theo ngôn ngữ: gom mọi chuỗi tĩnh của `screens.c` / `panel.c` vào bảng `en` / `vi`; format động trong `fmt.c` tách theo ngôn ngữ (mục 7). | Mọi màn hình ở mục 4–6, 9, 10 đúng text của cả hai ngôn ngữ trên `sim`. |
| H2 | PSA | Kiểm tra khi build cho bộ chuỗi `vi`: ASCII, ≤ 20 ký tự, không chứa từ cấm (mục 7.1); `fmt_test.c` thêm ca biên VI. | `make test` đạt với cả hai bộ chuỗi. |
| H3 | PSA | Khoá `panel-lang` trong `cfg_defaults` / `psa_config_load` (mặc định `en`). Ghi lại file cấu hình an toàn (file tạm + đổi tên, giữ khoá và comment khác). Ghi `/run/psp/panel-lang`. | Đổi ngôn ngữ rồi khởi động lại agent → giữ ngôn ngữ mới; file cấu hình không mất khoá nào. |
| H4 | PSA | Mục 6.4: `M_CTRL_4`, màn hình chọn, xác nhận 1 bước bằng ngôn ngữ hiện tại, kiểm tra trước theo 6.0, về CONTROL mục 4. | Mọi nhánh của 6.4 chạy đúng trên `sim` (kể cả lỗi ghi file, hết giờ, `panel-control=no/pin`). |
| H5 | PSA + KIT | Hook `psp-panel` (D2) đọc `/run/psp/panel-lang` và ghi màn hình 6.1 / 6.2 theo ngôn ngữ. | Reboot / poweroff với `panel-lang=vi` hiện màn hình tiếng Việt **[XÁC MINH]** `/run` còn đọc được. |

### 11.4. Thứ tự và phụ thuộc

```
A1, A2, A3 ───────────────────────────────┐ (làm ngay, độc lập)
B1, B4, B5, B6 ─► C1 ─► C2 ─► C5 ─► C6 ───┤
B2 ─► C4          C3 ─► C2                │
B3 ─► C7                                  ├─► E1, E2, E4 ─► G2 ─► G3
D1 ───────────────────────────────────────┤
D2, F1 ─► F2, F3 ─► F4 ───────────────────┘
V1..V5 (tại máy) ─► trước G3   ;   E5 song song, xong trước G2
B1, C2 ─► H1 ─► H2 ;  B4 ─► H3 ─► H4 (sau C5) ;  D2 + H3 ─► H5   (v1.5)
```

Đường găng: B5 → C1 → C2 → C5 → C6 → E2 → G2 → G3. A và B có thể bắt đầu song song ngay.

### 11.5. Tiến độ phần appliance-kit (2026-10-05, chưa commit)

| ID | Trạng thái | Ở đâu |
| :--- | :--- | :--- |
| A1 | Xong | `firmware-install` (trừ `--status`) và `firmware-patch` (apply) lấy `flock -n /run/firmware-update.lock`. |
| A2 / E3 | Xong | `factory-reset-trigger`: mã 3/4/5/6, `--check`. `99-arm-factory-reset.sh` trả nguyên mã. Arm reset đè lên reset đang chờ vẫn được phép; chỉ `--check` trả 6. |
| A3 | Một phần | Preflight WARN khi kernel đang chạy hoặc kernel mới nhất trong `/boot` thiếu `lmbiodrv.ko`. README trình bày hai cách đóng gói. **Chọn cách nào vẫn chờ Q2.** |
| D2 | Phần KIT xong | `1-factory-reset/usr/lib/systemd/system-shutdown/psp-panel`. Cần `psp-agent --oneshot` (D1) mới có tác dụng; thiếu thì không làm gì. |
| E1 | Xong | Hook initramfs đọc `psp-agent` từ lớp dưới (bind `/` riêng tư trong `unshare -m`), thêm `lmbiodrv`. Thiếu thì in một dòng và bỏ qua. |
| E2 | Xong | Script khôi phục: `lcd` / `blink_start` / `led_final`, màn hình theo 6.3, `RESET INCOMPLETE` trước `panic`. Thứ tự khôi phục không đổi. |
| E4 | Xong | Preflight: initramfs, `RuntimeWatchdogSec`, `panel-pin`, watchdog của agent (có kiểm tra binary), hook shutdown. |
| E5 | Xong | README, `CLAUDE.md`, `factory-reset-guide.md`, `what-changes-when.md`, `operator-guide.md`. |
| F1 | Xong | Xem 1.4. |
| F2 | Xong | `1-factory-reset/etc/systemd/system.conf.d/watchdog.conf` (60s / 10min). Chưa thử hết hạn thật (F4). |
| F3 | Sẵn sàng | `1-factory-reset/examples/fwx-psp-agent-watchdog.conf` (`Type=notify`, `WatchdogSec=30s`, `NotifyAccess=main`). Cài cùng bản fwx-dpi mang `psp-agent` 0.4.0 (G2). Preflight FAIL nếu unit đòi `READY=1` / `WATCHDOG=1` mà binary không gửi. |
| B1–B6, C1–C9, D1 | Xong (host) | `psp-agent` 0.4.0 trong `../lanner/psp-agent`: `src/panel.c` (máy trạng thái), `src/collect.c` (luồng thu thập, timeout cứng), `src/hwm.c`, `src/fmt.c`, `src/oneshot.c`, LED theo lớp, `sd_notify`. `contrib/panel-collect` (script thu thập cho NCS-NGFW, chạy thử trên 105: 0,18 s). `make test`: 42 + 57 + 60 kiểm tra đạt, phần panel chạy trên bản giả lập phần cứng (`psp-agent-sim`). |

| G1 | Xong (2026-10-06) | 0.4.0 chạy tạm từ `/tmp` trên 105 (CONTROL ẩn): `CAPS` đủ phần cứng, HWM đúng (12.19V, 42C, quạt 6818 rpm), LED nhịp tim, collector không lỗi, `--oneshot` trả 3 khi daemon chạy và 0 khi tắt. Dịch vụ 0.3.0 khôi phục. |
| G2 | Xong (2026-10-06), dạng patch | Không build lại fwx-dpi (cây `fw-dpi-package` đã khác 1.3.260915.1 ba tuần). Gói nhỏ `fwx-psp-panel_0.4.0-1` (`../lanner/psp-agent/packaging/build-fwx-psp-panel.sh`): `dpkg-divert` binary của fwx-dpi sang `psp-agent.fwx-dpi`, thêm `panel-collect` và drop-in `/usr/lib/systemd/system/fwx-psp-agent.service.d/panel.conf` (`Type=notify`, `WatchdogSec=30s`). Patch `p261006` ký bằng khoá release, `firmware-patch` thành công. Kit cài lên 105, initramfs có 0.4.0 + `lmbiodrv` (kernel 6.12.94 cũ không có `lmbiodrv`, xem Q2). Preflight: 0 FAIL, 0 WARN. Baseline vàng mới `golden-20261006`, sao lưu `~/fw_ncss105-backup/baseline-golden-20261006/`. Gỡ gói khi fwx-dpi tự mang 0.4.0. |

| F4 | Xong (2026-10-06) | (a) `kill -STOP` agent: systemd báo `Watchdog timeout (limit 30s)`, SIGABRT, khởi động lại sau 4 giây (`NRestarts=1`). (b) `kernel.panic=0` + sysrq `c`: watchdog phần cứng (`wdat_wdt`, TCO, 1 phút) tự reset máy, khoảng 100 giây từ dòng log cuối tới lần boot mới. Mặc định `kernel.panic=0` trên 105: không có watchdog thì máy treo vĩnh viễn. |
| G3 | Một phần (2026-10-06) | `factory-reset-trigger --yes`: ssh mở lại sau 126 giây, log ESP `OK baseline=golden-20261006`, `machine-id` và khoá host mới, 0.4.0 chạy (`Type=notify`, panel bật), mọi dịch vụ chạy, 0 unit lỗi, preflight 0 FAIL / 0 WARN. **Chưa làm:** quan sát màn hình LCD trong lúc khôi phục, reset bằng nút SWR / menu CONTROL, mất điện giữa chừng — cần người tại máy. |
| G4 | Xong (2026-10-06), patch `p261007` | 0.4.0 tốn ~5% một nhân trên 105 (đo 60 giây: tiến trình con `systemctl` mỗi 2 giây và collector mỗi 5 giây chiếm 245 tick, luồng panel vẽ lại LCD 75 tick). 0.4.1: khi màn hình tối, collector và `systemctl` chạy mỗi `panel-collect-idle-s` (60 giây); `systemctl --failed` bỏ qua khi hệ thống `running`; slide chỉ vẽ lại mỗi phút; chỉ ghi dòng đã đổi; lần chạm đầu làm mới ngay; luồng có tên `psa-*`. Đo lại trên 105: tối 0,50%, sáng 4,4% (chỉ trong 5 phút sau lần chạm). Gói `fwx-psp-panel_0.4.1-1`, initramfs và ESP cập nhật, preflight sạch, baseline vàng `golden-20261006b` (quét: không serial, không khoá ssh), sao lưu `~/fw_ncss105-backup/baseline-golden-20261006b/`. |
| G5 | Sửa (2026-10-07), patch `p261007b` | Người vận hành chạy danh sách kiểm tra: 37/42 đạt. Hai lỗi: (1) `lcm_present` tính khoảng 30 giây giữa hai lần dò từ `last_probe_ms = 0`, tức từ lúc boot: tiến trình chạy trong 30 giây đầu không bao giờ dò, mọi `--oneshot lcm` của initramfs trả về NO_DEVICE -- đèn đỏ nháy nhưng không màn hình khôi phục nào hiện (D3/D4/E2/E3); (2) 0.4.1 vẽ lại màn hình khởi động mỗi phút khi tối, nên `Starting... N left` đứng yên (C5). 0.4.2: lần gọi đầu luôn dò, `--oneshot lcm` thử lại ~3 giây sau modprobe, màn hình khởi động không bị giới hạn; restore ghi lần lỗi LCD đầu tiên vào log ESP (`PANEL lcm rc=`). Log ESP cho thấy lần E mất điện **sau** khi khôi phục xong (attempts=1, 77 giây như lần D): chưa thử mất điện giữa chừng. Baseline vàng `golden-20261007`, sao lưu `~/fw_ncss105-backup/baseline-golden-20261007/`. Chờ người vận hành làm Phần F. Trả lời V3/V4: sau poweroff LCD trắng, đèn nền, đèn nguồn, SLED tắt; bật nguội: đèn nền sáng, LCD trắng, rồi chữ driver `<-- NCA-2513 -->`; máy không tự bật khi cắm điện. |
| G6 | Sửa (2026-10-08), patch `p261008` | Lần 2 (07/10 chiều) trên 105: F0, F2–F6 đạt -- màn hình khôi phục hiện, rút điện giữa lúc khôi phục cho `attempts=2` và lần thử sau thành công, không có `PANEL lcm`. F1 không đạt: `Starting... 4 left` đứng yên. Không phải lỗi panel: từ 14 s đến 44.7 s userspace chỉ còn `fwx-tlsproxy-netsetup` chạy (chờ `tap-tls`, cgate tạo ở ~60 s, hết 30 s thì lỗi và Restart= chạy lại thành công ở 61 s) cùng `fwx-tlsproxy`, `multi-user.target`, `graphical.target` chờ nó. 0.4.3: đồng hồ `m:ss` ở cuối dòng 1 màn hình khởi động. Riêng fw-dpi-package (chưa build/triển khai): hai unit tlsproxy `DefaultDependencies=no` để không chặn boot, `WAIT_IFACE_SECS` 90. Baseline `golden-20261008`, sao lưu `~/fw_ncss105-backup/baseline-golden-20261008/`. Chờ người vận hành làm lại F1. Lần 1 ghi máy không tự bật khi cắm điện; lần 2 ghi máy tự bật. |

Còn lại: phần G3 cần người tại máy và V1–V5 (danh sách cho người vận hành: tài liệu "Kiểm tra panel fw_ncss105 tại máy"), Q1–Q5.

### 11.6. Cần xác nhận

| # | Nội dung |
| :--- | :--- |
| Q1 | Các điểm v1.4 khác v1.2/v1.3: đèn nền tối mặc định với timeout 300 giây (spec cũ 60); cảnh báo không làm sáng màn hình; mẫu LED (đỏ nháy 200/200 = đang reset). |
| Q2 | Cách đóng gói `lmbiodrv` (A3): DKMS trên máy, hay build sẵn theo từng kernel trong firmware bundle. |
| Q3 | Ai phát hành bản fwx-dpi chứa `psp-agent` mới, và theo chu kỳ nào (G2). |
| Q4 | Cảnh báo `PWR` với rail `VSB3.3V` vượt 20 ký tự ở cả hai ngôn ngữ: chốt cách rút gọn (mục 9). |
| Q5 | Cảnh báo `TEMP` có tách CPU / board không (mục 9). |
