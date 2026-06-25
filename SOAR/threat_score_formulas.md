# Mô hình Tính điểm Threat Score cho Các Thực thể trên TIP (Thang 0-100)

## 1. Nguyên lý Thiết kế (Design Principles)

> **Thang điểm tham chiếu (0-100):**
> - **0 - 25**: Thấp (Low/Benign) - Chỉ mang tính chất theo dõi.
> - **26 - 50**: Trung bình (Medium) - Cần chú ý.
> - **51 - 75**: Cao (High) - Cần hành động phòng ngừa.
> - **76 - 100**: Nghiêm trọng (Critical) - Cần chặn/xử lý ngay lập tức.

---

## 2. Đề xuất Công thức Chi tiết từng Thực thể

### 2.1. Indicator (Chỉ báo Thỏa hiệp - IoC)

**Công thức:**
```text
Score = MIN(100, Base_Type_Score * (Confidence / 100) * Decay_Factor * Severity_Multiplier)
```

* **Base_Type_Score** (Dựa trên `indicator_types`):
  * `Malicious-Activity`: `85` (Hành vi độc hại rõ ràng)
  * `Compromised`: `70` (Đã bị thỏa hiệp - vd: server bị hack để host mã độc)
  * `Anomalous-Activity`: `60` (Hành vi bất thường, có rủi ro nhưng chưa chắc là mã độc)
  * `Anonymization`: `50` (Dịch vụ ẩn danh như Tor, VPN, Proxy)
  * `Attribution`: `50` (Dùng để quy kết nhóm tấn công, mang tính định danh)
  * `Domain` / `Ipv4-Addr` / `Url`: `40` (Thực thể mạng chung chung)
  * `Unknown`: `20` (Không xác định)
  * `Benign`: `0` (An toàn, hợp lệ)
* **Severity_Multiplier** (Tùy chọn - Nếu hệ thống/feed có gắn nhãn hoặc trường `severity` cho Indicator):
  * `Critical`: `1.2` (Tăng cường 20% điểm)
  * `High` / `Unknown`: `1.0` (Giữ nguyên mức độ nguy hiểm của Type)
  * `Medium`: `0.7` (Giảm 30%)
  * `Low`: `0.4` (Giảm 60%)
* **Decay_Factor** (Dựa trên `valid_until`):
  * Nếu hiện tại <= `valid_until` (hoặc không có deadline): `1.0`
  * Nếu đã hết hạn (`valid_until` ở quá khứ): `0.2` (Chỉ mang giá trị dò tìm lịch sử).

---

### 2.2. Vulnerability (Lỗ hổng bảo mật)

**Công thức:**
```text
Score = CVSS_Score * 10
```
*(Trường hợp lỗ hổng mới chưa được NVD đánh giá CVSS Score, hệ thống sẽ sử dụng bảng quy đổi dự phòng từ trường **Severity**)*

* **CVSS_Score**: Điểm CVSS sẵn có trên hệ thống (0.0 đến 10.0).
* **Bảng quy đổi dự phòng theo Severity** (Chỉ dùng khi `CVSS_Score` bị trống hoặc bằng `0`):
  * `Critical`: `95`
  * `High`: `80`
  * `Medium`: `50`
  * `Low`: `20`
  * `Unknown` / `None`: `10`

---

### 2.3. Malware (Mã độc)

**Công thức:**
```text
Score = MIN(100, (Base_Malware_Score + Family_Bonus) * Severity_Multiplier)
```

* **Base_Malware_Score** (Dựa trên `malware_types` từ hệ thống):
  * **Nhóm Phá hủy (Destructive)**: `Ransomware`, `Wiper` -> `95`
  * **Nhóm Kiểm soát/Ẩn nấp (Control/Persistence)**: `Backdoor`, `Remote-Access-Trojan`, `Webshell`, `Rootkit`, `Bootkit` -> `90`
  * **Nhóm Tấn công/Gián điệp (Attack/Spyware)**: `Bot`, `Exploit-Kit`, `Keylogger`, `Spyware`, `Trojan`, `Virus`, `Ddos`, `Dropper`, `Downloader`, `Worm` -> `75`
  * **Nhóm Khai thác/Quảng cáo (Resource/Adware)**: `Resource-Exploitation`, `Rogue-Security-Software`, `Screen-Capture`, `Adware` -> `40`
  * **Nhóm Chưa rõ (Generic)**: `Malware`, `Unknown` -> `55`
* **Family_Bonus** (Dựa trên trường `Is family`):
  * Nếu là `True` (Đại diện cho cả một họ/dòng mã độc lớn như Cobalt Strike, Emotet): `+10`
  * Nếu là `False` (Một mẫu/hash mã độc đơn lẻ): `0`
* **Severity_Multiplier** (Mức độ nghiêm trọng của Malware):
  * `Critical`: `1.2`
  * `High`: `1.0`
  * `Medium`: `0.7`
  * `Low`: `0.4`
  * `Unknown` / `None`: `1.0`

---

### 2.4. Threat Actor (Tác nhân Đe dọa)

**Công thức:**
```text
Score = MIN(100, Type_Score * (0.6 * Sophistication_Score + 0.4 * Resource_Score) * Severity_Multiplier)
```

* **Type_Score** (Dựa trên `threat_actor_types` từ hệ thống của bạn):
  * `Nation-State`: `100` (Tác nhân nhà nước, có tài trợ và mục tiêu chính trị)
  * `Spy`: `95` (Gián điệp công nghiệp/quân sự)
  * `Terrorist`: `90` (Khủng bố mạng phá hủy)
  * `Crime-Syndicate`: `85` (Băng nhóm tội phạm tài chính quy mô lớn)
  * `Insider-Disgruntled`: `80` (Người trong cuộc bất mãn, chủ động phá hoại)
  * `Competitor`: `70` (Đối thủ cạnh tranh kinh doanh)
  * `Criminal`: `65` (Tội phạm mạng nhỏ lẻ)
  * `Hacker`: `60` (Hacker tự do, quấy nhiễu)
  * `Activist`: `50` (Nhóm hacktivist phản kháng chính trị/xã hội)
  * `Sensationalist`: `40` (Tấn công để lấy tiếng vang)
  * `Insider-Accidental`: `25` (Nhân viên vô tình gây ra rủi ro)
  * `Unknown`: `30` (Chưa xác định)
* **Sophistication_Score** (Mức độ tinh vi từ hệ thống của bạn):
  * `Innovator` (Tự phát minh exploit mới, kỹ thuật chưa từng có): `1.0`
  * `Strategic` (Khả năng lập kế hoạch chiến lược, chiến dịch APT phức tạp): `0.95`
  * `Advanced` (Năng lực kỹ thuật cao, bypass các phòng thủ tiêu chuẩn): `0.9`
  * `Expert` (Sử dụng công cụ chuyên gia cực kỳ thành thạo): `0.85`
  * `Intermediate` (Năng lực trung cấp): `0.7`
  * `Minimal` (Biết sử dụng script có sẵn, chuẩn bị tối thiểu): `0.4`
  * `None` (Không có năng lực kỹ thuật đặc biệt): `0.2`
* **Resource_Score** (Nguồn lực từ hệ thống của bạn):
  * `State/Government` (Chính phủ hỗ trợ toàn diện): `1.0`
  * `Structured Organization` (Tổ chức có phân cấp cấu trúc vững mạnh): `0.9`
  * `Organized Team` (Nhóm phối hợp có tổ chức): `0.8`
  * `Informal Group` (Nhóm tự phát lỏng lẻo): `0.6`
  * `Ephemeral Groupment` (Nhóm lập ra ngắn hạn cho 1 mục tiêu): `0.4`
  * `Individual/Independant` (Cá nhân độc lập tự túc): `0.3`
* **Severity_Multiplier** (Dựa trên trường `Severity` của Threat Actor):
  * `Critical`: `1.2`
  * `High`: `1.0`
  * `Medium`: `0.7`
  * `Low`: `0.4`
  * `Unknown` / `None`: `1.0`

---

### 2.5. Campaign (Chiến dịch)

**Công thức:**
```text
Score = MIN(100, (Base_Severity_Score * Decay_Factor) + Incident_Bonus)
```

* **Base_Severity_Score** (Lấy từ trường `Severity` của Campaign):
  * `Critical`: `95`
  * `High`: `80`
  * `Medium`: `50`
  * `Low`: `20`
  * `Unknown` / `None`: `40`
* **Decay_Factor** (Hệ số suy giảm theo thời gian dựa trên `Last seen` hoặc `Last modified`):
  * Lần cuối ghi nhận <= 180 ngày trước (hoặc chưa có Last seen - chiến dịch đang diễn ra): `1.0`
  * Lần cuối ghi nhận từ 180 - 365 ngày trước: `0.7`
  * Lần cuối ghi nhận > 365 ngày trước (chiến dịch cũ/ngừng hoạt động): `0.4`
* **Incident_Bonus** (Điểm cộng thêm dựa trên số lượng sự cố liên kết): Mỗi `Incident` có quan hệ liên kết với Campaign này được cộng `+2` điểm (Tối đa cộng `15` điểm). Việc này phản ánh quy mô ảnh hưởng thực tế của chiến dịch.

---

### 2.6. Incident (Sự cố)

**Công thức:**
```text
Score = MIN(100, Base_Type_Score * Severity_Multiplier * Status_Multiplier)
```

* **Base_Type_Score** (Dựa trên trường `Incident type` của Incident):
  * **Nhóm Nguy hiểm nhất (Critical)**: `Ransomware`, `Data-Leak`, `Compromise` -> `95` (Tấn công mã hóa phá hoại, rò rỉ dữ liệu hoặc hệ thống bị chiếm quyền điều khiển)
  * **Nhóm Nguy cơ cao (High)**: `Information-System-Disruption`, `Cybercrime` -> `80` (Gây gián đoạn dịch vụ hệ thống CNTT hoặc hành vi tội phạm tài chính)
  * **Nhóm Trung bình (Medium)**: `Phishing`, `Incident` -> `65` (Các vụ phishing thông thường hoặc sự cố chung chưa được phân loại chi tiết)
  * **Nhóm Nguy cơ thấp (Low)**: `Alert`, `Reputation-Damage`, `Typosquatting` -> `40` (Cảnh báo thô từ sensor, giả mạo tên miền hoặc ảnh hưởng danh tiếng nhẹ)
* **Severity_Multiplier** (Dựa trên trường `Severity` của Incident):
  * `Critical`: `1.2`
  * `High` (như trong ảnh): `1.0`
  * `Medium`: `0.7`
  * `Low`: `0.4`
  * `Unknown` / `None`: `1.0`
* **Status_Multiplier** (Dựa trên trường `Status` của Incident):
  * Các trạng thái đang hoạt động (Ví dụ: `NEW`, `IN_PROGRESS`): `1.0`
  * Trạng thái đã đóng/giải quyết (như `CLOSED` trong ảnh): `0.5` (Hạ điểm xuống để phản ánh mối đe dọa đã được khắc phục/cô lập thành công).

---

### 2.7. Report (Báo cáo)

**Công thức:**
```text
Score = Base_Report_Type_Score * (Confidence_Level / 100) * Reliability_Factor * Time_Decay
```

* **Base_Report_Type_Score** (Dựa trên trường `Report types` của Report):
  * `Threat-Report`: `85` (Báo cáo tình báo mối đe dọa từ bên ngoài)
  * `Internal-Report`: `60` (Báo cáo phân tích nội bộ)
  * Các loại khác / Trống: `50`
* **Confidence_Level** (Dựa trên trường `Confidence level` của Report):
  * Giá trị thực tế của thanh trượt (ví dụ: `100` trong ảnh).
* **Reliability_Factor** (Hệ số tin cậy của nguồn tin dựa trên trường `Reliability` của Report):
  * `A - Completely Reliable`: `1.0`
  * `B - Usually Reliable`: `0.9`
  * `C - Fairly Reliable`: `0.7`
  * `D - Not Usually Reliable`: `0.5`
  * `E - Unreliable`: `0.3`
  * `F - Reliability Cannot Be Judged`: `0.5`
* **Time_Decay** (Hệ số suy giảm theo thời gian dựa trên trường `Publication date` của Report):
  * Mới xuất bản <= 30 ngày trước: `1.0`
  * Xuất bản từ 30 - 90 ngày trước: `0.85`
  * Xuất bản từ 90 - 180 ngày trước: `0.7`
  * Xuất bản > 180 ngày trước: `0.5` (Tin tức cũ).
