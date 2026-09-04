# Hệ thống Skill: Đặc tả Quy tắc nghiệp vụ chuyên sâu (SRS Business Rules Specification)

**Tên Skill:** `srs_business_rules_spec`  
**Mô tả:** Đóng vai trò là Lead Business Analyst (BA) kiêm Solution Architect. Skill này tiếp nhận danh sách các mã tham chiếu `[BR-xx]` phát sinh từ Mục 4 (Bảng đặc tả UI) kết hợp với các logic ngầm của Backend, thuật toán, công thức tính toán và bảo mật của tính năng để chuẩn hóa thành **Mục 5: Quy tắc nghiệp vụ chuyên sâu** cho tài liệu SRS.

---

## 1. NGUYÊN TẮC VÀ MỤC TIÊU CỦA MỤC 5

1. **Phục vụ tối đa cho Backend DEV và QA/Tester:**
   - Trong khi Bảng UI (Mục 4) tập trung vào giao diện và validation đơn lẻ phía Frontend, thì Mục 5 là **"linh hồn nghiệp vụ"** của hệ thống. Đây là nơi Backend DEV dùng để viết code xử lý logic, transaction CSDL, API service, và QA dùng để viết Test Case tích hợp.
2. **Tính độc lập của logic (Domain Independence):**
   - Các quy tắc ở Mục 5 phải mang tính độc lập với giao diện: Dù người dùng thực hiện qua Web UI, Mobile App, Import file Excel hay Hệ thống bên ngoài gọi qua API thì các quy tắc này **vẫn luôn bắt buộc phải thỏa mãn**.
3. **Liên kết chặt chẽ với các mã `[BR-xx]`:**
   - Mọi mã `[BR-xx]` đã được đánh dấu trong Bảng đặc tả UI (Mục 4) bắt buộc phải xuất hiện và được giải nghĩa chi tiết tại Mục 5.
   - Ngược lại, nếu trong quá trình phân tích phát hiện thêm các logic Backend ngầm (như cơ chế mã hóa, retry, rollback CSDL), AI chủ động bổ sung thêm các mã `[BR-xx]` tiếp theo.

---

## 2. PHÂN LOẠI QUY TẮC NGHIỆP VỤ (RULE TAXONOMY)

Mỗi quy tắc nghiệp vụ phải được phân vào 1 trong 5 nhóm sau:

| Nhóm quy tắc | Ý nghĩa | Ví dụ điển hình |
| :--- | :--- | :--- |
| **1. Ràng buộc dữ liệu & Thuật toán (Data & Algorithm)** | Kiểm tra tính hợp lệ sâu, đối soát trùng lặp, logic bóc tách chuỗi | Kiểm tra trùng lặp không phân biệt hoa/thường; Đối soát dải IP CIDR hợp lệ. |
| **2. Bảo mật & Sinh dữ liệu (Security & Generation)** | Thuật toán sinh mã/token, cơ chế mã hóa (Encryption/Hash), che dấu dữ liệu (Masking) | Token ngẫu nhiên 64 ký tự; Mã hóa SHA-256 khi lưu DB; Che token dạng `sk_***`. |
| **3. Quy trình & Vòng đời trạng thái (Process & State)** | Điều kiện chuyển trạng thái đối tượng, thứ tự duyệt, rollback dữ liệu | Khi xóa nguồn thì các tiến trình quét đang chạy liên quan sẽ tự động bị hủy. |
| **4. Công thức tính toán (Calculation & Formulas)** | Thuật toán tính số tiền, làm tròn, quy đổi đơn vị, tính điểm rủi ro | Điểm rủi ro = (Mức độ nghiêm trọng x Hệ số ảnh hưởng) làm tròn 1 chữ số thập phân. |
| **5. Tích hợp & Thử lại (Integration & Retry Policy)** | Ràng buộc kết nối hệ thống bên ngoài, timeout, cơ chế retry khi lỗi | Timeout kết nối thử là 5 giây; Khi gửi webhook thất bại thì thử lại tối đa 3 lần. |

---

## 3. CẤU TRÚC BIỂU MẪU ĐẶC TẢ TỪNG QUY TẮC `[BR-xx]`

Mỗi quy tắc nghiệp vụ trong Mục 5 phải tuân theo cấu trúc sau:

```markdown
### [BR-xx] {Tên quy tắc nghiệp vụ}
- **Phân loại:** [Ràng buộc dữ liệu / Bảo mật & Sinh dữ liệu / Quy trình & Trạng thái / Công thức tính / Tích hợp & Thử lại]
- **Phạm vi áp dụng:** [Toàn bộ hệ thống / Theo Tenant / Áp dụng cho cả UI & API]
- **Điều kiện kích hoạt (Trigger):** [Khi người dùng bấm Lưu / Khi có request API gọi vào / Khi cronjob chạy]
- **Logic xử lý chi tiết (Detailed Logic):**
  1. {Bước 1: Kiểm tra điều kiện đầu vào...}
  2. {Bước 2: Thuật toán so khớp / Công thức tính toán...}
  3. {Bước 3: Ghi nhận CSDL / Thay đổi trạng thái...}
- **Hành vi khi vi phạm / Ngoại lệ (Violation Behavior):**
  - {Hệ thống từ chối request, rollback transaction CSDL, trả về mã lỗi HTTP 400/409 kèm thông báo: "..."}
```

---

## 4. VÍ DỤ ĐẶC TẢ MẪU THAM CHIẾU (REFERENCE EXAMPLE)

Dưới đây là mẫu hoàn chỉnh của Mục 5 cho tính năng **Thêm nguồn tích hợp (Add Integration Source)**, kế thừa trực tiếp từ các mã đã đánh ở Mục 4:

```markdown
# 5. QUY TẮC NGHIỆP VỤ CHUYÊN SÂU (BUSINESS RULES)

### Bảng tổng hợp quy tắc nghiệp vụ:
| Mã BR | Tên quy tắc nghiệp vụ | Phân loại | Mức độ ưu tiên |
| :--- | :--- | :--- | :---: |
| **[BR-01]** | Quy tắc kiểm tra tính duy nhất của Tên nguồn tích hợp | Ràng buộc dữ liệu | Bắt buộc |
| **[BR-02]** | Quy tắc sinh và mã hóa Token bảo mật (Inbound) | Bảo mật & Sinh dữ liệu | Bắt buộc |
| **[BR-03]** | Quy tắc kiểm tra tính hợp lệ của Danh sách IP Whitelist | Ràng buộc dữ liệu & Thuật toán | Bắt buộc |
| **[BR-04]** | Cơ chế kiểm tra kết nối thử và Timeout (Outbound) | Tích hợp & Thử lại | Bắt buộc |

---

### Chi tiết từng quy tắc:

### [BR-01] Quy tắc kiểm tra tính duy nhất của Tên nguồn tích hợp
- **Phân loại:** Ràng buộc dữ liệu & Thuật toán
- **Phạm vi áp dụng:** Toàn bộ hệ thống trong cùng một Không gian làm việc (Tenant-level). Áp dụng cho cả luồng tạo qua UI và qua API.
- **Điều kiện kích hoạt:** Khi người dùng bấm nút `SAVE` hoặc gửi request API `POST /api/v1/integration-sources`.
- **Logic xử lý chi tiết:**
  1. Hệ thống tự động trim toàn bộ khoảng trắng ở đầu và cuối chuỗi của trường `source_name`.
  2. Chuẩn hóa chuỗi về dạng chữ thường (Lowercase) trước khi so sánh trùng lặp trong CSDL để đảm bảo không phân biệt chữ hoa/chữ thường (Case-insensitive).
  3. Ví dụ: Nếu đã tồn tại tên `"Splunk SIEM"` thì các tên `"splunk siem"`, `"  Splunk SIEM  "`, `"SPLUNK SIEM"` đều bị coi là trùng lặp.
- **Hành vi khi vi phạm:**
  - Hệ thống hủy bỏ transaction ghi DB, trả về mã lỗi `409 Conflict`.
  - Trên UI: Hiển thị lỗi inline màu đỏ dưới trường Tên nguồn: `"Tên nguồn đã tồn tại!"` (`"Source name already exists!"`).

---

### [BR-02] Quy tắc sinh và mã hóa Token bảo mật (Inbound)
- **Phân loại:** Bảo mật & Sinh dữ liệu
- **Phạm vi áp dụng:** Luồng tích hợp Inbound.
- **Điều kiện kích hoạt:** Khi người dùng bấm nút `Gen token` trên form hoặc khi hệ thống khởi tạo nguồn Inbound mới.
- **Logic xử lý chi tiết:**
  1. Hệ thống sử dụng bộ sinh số ngẫu nhiên an toàn (Cryptographically Secure Pseudo-Random Number Generator - CSPRNG) để sinh chuỗi ngẫu nhiên 48 bytes, sau đó encode sang định dạng Base64 URL-safe (đạt độ dài chuẩn 64 ký tự).
  2. **Hiển thị:** Chuỗi token hoàn chỉnh được hiển thị đầy đủ lên ô nhập một lần duy nhất lúc tạo để người dùng sao chép.
  3. **Lưu trữ DB:** Hệ thống tuyệt đối KHÔNG lưu token dạng văn bản rõ (Plain-text) vào CSDL. Token bắt buộc phải được băm (Hash) bằng thuật toán `HMAC-SHA256` kết hợp Salt bí mật trước khi lưu vào cột `access_token_hash`.
- **Hành vi khi vi phạm:** Nếu quá trình sinh token thất bại, hệ thống báo lỗi `"Không thể sinh mã Token bảo mật. Vui lòng thử lại!"`.

---

### [BR-03] Quy tắc kiểm tra tính hợp lệ của Danh sách IP Whitelist
- **Phân loại:** Ràng buộc dữ liệu & Thuật toán
- **Phạm vi áp dụng:** Luồng Inbound khi trường `IP required = Yes`.
- **Điều kiện kích hoạt:** Khi người dùng bấm nút `SAVE`.
- **Logic xử lý chi tiết:**
  1. Người dùng có thể nhập một hoặc nhiều địa chỉ IP, phân cách bằng dấu phẩy `,`.
  2. Hệ thống duyệt qua từng phần tử sau khi tách chuỗi:
     - Tự động trim khoảng trắng từng phần tử.
     - Kiểm tra từng phần tử phải thỏa mãn một trong hai định dạng:
       * Địa chỉ IPv4 chuẩn (ví dụ: `192.168.1.1`).
       * Dải mạng CIDR hợp lệ (ví dụ: `10.0.0.0/24`).
     - Tự động loại bỏ các IP trùng lặp trong cùng một danh sách nhập.
- **Hành vi khi vi phạm:**
  - Nếu có bất kỳ phần tử nào không đúng định dạng IP/CIDR: Dừng lưu, hiển thị lỗi inline đỏ: `"Danh sách IP chứa địa chỉ không hợp lệ: {Địa chỉ sai}!"` (`"IP list contains invalid address: {Invalid IP}!"`).

---

### [BR-04] Cơ chế kiểm tra kết nối thử và Timeout (Outbound)
- **Phân loại:** Tích hợp & Thử lại
- **Phạm vi áp dụng:** Nút `TEST CONNECTION` đối với luồng Outbound.
- **Điều kiện kích hoạt:** Khi người dùng bấm nút `TEST CONNECTION`.
- **Logic xử lý chi tiết:**
  1. Backend gửi request HTTP `POST` hoặc `GET` (tùy giao thức cấu hình) kèm header `Authorization: Bearer <Token>` tới địa chỉ `URL/Endpoint`.
  2. **Cấu hình Timeout:** Thời gian chờ phản hồi tối đa là **5 giây**.
  3. **Xác định thành công:** Nếu Endpoint trả về mã trạng thái HTTP thuộc dải `2xx` (200, 201, 204), coi như kết nối thành công.
  4. **Xác định thất bại:** Nếu hết 5 giây mà không có phản hồi, hoặc Endpoint trả về mã `4xx`, `5xx`, hoặc gặp lỗi SSL Handshake/Connection Refused.
- **Hành vi khi vi phạm / Thất bại:**
  - Backend trả về mã lỗi và nguyên nhân chi tiết (ví dụ: `Connection Timeout`, `Unauthorized 401`, `Host Not Found 404`).
  - Trên UI hiển thị Toast thất bại kèm nguyên nhân ngắn gọn.
```

---

## 5. QUY TRÌNH XỬ LÝ CỦA AI (AI WORKFLOW)

1. **Bước 1: Thu thập tất cả các mã `[BR-xx]` từ Mục 4 (UI Spec):** Đảm bảo không bỏ sót bất kỳ mã nào.
2. **Bước 2: Phân tích bổ sung các logic Backend ngầm:**
   - Cơ chế mã hóa mật khẩu/token.
   - Quy tắc kiểm tra phân quyền dữ liệu (Row-level data scope).
   - Cơ chế transaction CSDL (Rollback khi lỗi).
   - Cơ chế Timeout và Retry khi gọi dịch vụ ngoài.
3. **Bước 3: Lập bảng tổng hợp BR:** Đánh số thứ tự từ `[BR-01]` liên tục, phân loại rõ ràng.
4. **Bước 4: Mô tả chi tiết từng BR:** Điền đủ 5 trường (Tên, Phân loại, Phạm vi, Trigger, Chi tiết logic, Vi phạm) bằng ngôn ngữ kỹ thuật chuẩn mực.
