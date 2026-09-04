# Bộ Prompt Mẫu & Hướng Dẫn Tự Động Hóa Đặc Tả SRS (SRS Master Prompts)

**Tên Thư Mục:** `srs_master_prompt`  
**Mô tả:** Nơi lưu trữ bộ khung Prompt chuẩn (Master Prompt) và các mẫu prompt thực chiến đã được tối ưu hóa để kích hoạt chuỗi 3 Skill (`srs_feature_overview`, `srs_ui_spec_writer`, `srs_business_rules_spec`) viết tài liệu đặc tả SRS hoàn chỉnh 5 mục trong **01 prompt duy nhất**.

---

## 1. KHUNG PROMPT CHUẨN DÙNG CHO MỌI TÍNH NĂNG MỚI (MASTER TEMPLATE)

Khi có bất kỳ tính năng mới nào cần viết tài liệu SRS, bạn chỉ cần copy đoạn khung dưới đây, điền các thông tin trong ngoặc vuông `[...]` và gửi cho AI:

```markdown
Tôi có một tính năng mới cần viết tài liệu đặc tả SRS hoàn chỉnh gồm đủ 5 mục:
1. Thông tin chung chức năng
2. Ma trận phân quyền
3. Biểu đồ luồng xử lý
4. Thiết kế UI và đặc tả chi tiết components
5. Quy tắc nghiệp vụ chuyên sâu

THÔNG TIN TÍNH NĂNG:
- Mã tính năng: [Ví dụ: EDR_POL_SCAN_01 / FIN_APPR_01 / MKT_VOUCHER_03...]
- Tên tính năng: [Tên tính năng ngắn gọn, rõ ràng]
- Mục đích: [1-2 câu mô tả mục đích và giá trị mang lại cho người dùng/hệ thống]

Nghiệp vụ chi tiết:
[Mô tả các nhóm thông tin trên màn hình, các trường nhập liệu, nút bấm, hành vi nghiệp vụ, ràng buộc...]
(Đính kèm ảnh thiết kế giao diện UI nếu có)

YÊU CẦU THỰC HIỆN:
- Áp dụng skill `E:\work1\Skills\srs_feature_overview\skill.md` để viết Mục 1 (bảng 2 cột), Mục 2 (RBAC thuần Việt) và Mục 3 (Sequence Diagram có autonumber và opt, alt/else).
- Áp dụng skill `E:\work1\Skills\srs_ui_spec_writer\skill.md` để viết Mục 4 cho toàn bộ các trường (song ngữ VI/EN, popup modals, empty/error state), đồng thời gắn mã [BR-01], [BR-02]... cho các quy tắc ngầm.
- Áp dụng skill `E:\work1\Skills\srs_business_rules_spec\skill.md` để viết Mục 5 giải nghĩa chi tiết các mã [BR-xx] đã gắn ở Mục 4.
- Xuất toàn bộ nội dung hoàn chỉnh ra file: E:\work1\Docs\SRS_[Ten_Tinh_Nang].md
```

---

## 2. CÁC PROMPT MẪU THỰC CHIẾN ĐÃ HOÀN THIỆN (READY-TO-USE SAMPLES)

Dưới đây là 3 bộ prompt mẫu tương ứng với 3 file mockup HTML có sẵn trong thư mục `E:\work1\`:

---

### MẪU 1: AN NINH MẠNG (EDR) - CHÍNH SÁCH QUÉT MÃ ĐỘC NÂNG CAO
*Giao diện tham chiếu:* [`E:\work1\edr_scan_policy_mockup.html`](file:///E:/work1/edr_scan_policy_mockup.html)

```markdown
Tôi có một tính năng mới cần viết tài liệu đặc tả SRS hoàn chỉnh gồm đủ 5 mục:
1. Thông tin chung chức năng
2. Ma trận phân quyền
3. Biểu đồ luồng xử lý
4. Thiết kế UI và đặc tả chi tiết components
5. Quy tắc nghiệp vụ chuyên sâu

THÔNG TIN TÍNH NĂNG:
- Mã tính năng: EDR_POL_SCAN_01
- Tên tính năng: Thêm mới chính sách quét mã độc nâng cao (Add Advanced Threat Scan Policy).
- Mục đích: Cho phép quản trị viên an ninh (Security Admin/SOC Manager) tạo chính sách quét tự động hoặc thủ công áp dụng cho các máy trạm/máy chủ trong mạng, tự động xử lý khi phát hiện tệp nhiễm và kiểm soát tài nguyên CPU không gây nghẽn hệ thống.

Nghiệp vụ chi tiết:
1. Thông tin chung:
   - Tên chính sách: Textbox bắt buộc, tối đa 128 ký tự, phải là duy nhất trên hệ thống (không phân biệt hoa/thường).
   - Mô tả: Textarea tối đa 500 ký tự (không bắt buộc).
   - Mức độ ưu tiên: Dropdown gồm 4 mức: Thấp (Low), Trung bình (Medium), Cao (High), Khẩn cấp (Critical). Mặc định là High.
   - Trạng thái: Toggle bật/tắt (Active / Inactive). Mặc định là Active.

2. Phạm vi & Mục tiêu áp dụng:
   - Loại mục tiêu: Radio gồm 3 tùy chọn: Tất cả máy trạm (All), Theo nhóm máy (Groups), Theo dải mạng (Subnets/IP). Mặc định chọn Theo nhóm máy.
   - Khi chọn "Theo nhóm máy": Hiển thị trường chọn nhóm (Multi-select Tag). Bắt buộc chọn ít nhất 1 nhóm máy.
   - Khi chọn "Theo dải mạng": Hiển thị ô nhập IP/CIDR. Hỗ trợ nhiều dải phân cách bằng dấu phẩy. Validate chuẩn format IPv4/CIDR.
   - Đường dẫn loại trừ (Path Exclusions): Tag input cho phép nhập tối đa 20 đường dẫn file/thư mục cần bỏ qua (hỗ trợ ký tự đại diện *).

3. Cấu hình lịch quét & Hiệu năng:
   - Chế độ kích hoạt: Radio chọn Quét thủ công (Manual) hoặc Quét tự động theo lịch (Scheduled). Mặc định là Scheduled.
   - Khi chọn Scheduled:
     + Tần suất: Dropdown (Hàng ngày / Hàng tuần / Hàng tháng).
     + Giờ bắt đầu quét: Timepicker (định dạng HH:mm).
     + Ngày trong tuần (khi chọn Hàng tuần): Checkbox cho phép chọn các thứ trong tuần (T2 đến CN).
     + Tự động cập nhật chữ ký Antivirus trước khi quét: Checkbox mặc định checked.
   - Giới hạn mức chiếm dụng CPU: Range Slider từ 10% đến 90%, bước nhảy 5%, mặc định 50%.

4. Hành động tự động khi phát hiện mã độc:
   - Hành vi xử lý: Dropdown gồm: Cách ly (Quarantine - mặc định), Diệt mã độc (Disinfect), Xóa vĩnh viễn (Delete), Chỉ cảnh báo (Alert Only).
   - Thời gian lưu trữ cách ly: Input number từ 1 đến 365 ngày, mặc định 30 ngày.
   - Dung lượng tối đa vùng cách ly: Input number từ 1 đến 100 GB, mặc định 10 GB.
   - Gửi cảnh báo tới SIEM/SOAR: Toggle switch mặc định bật.

5. Nút bấm hành động:
   - Nút Hủy bỏ (Cancel): Nếu form có thay đổi thì hiển thị Modal cảnh báo dữ liệu chưa lưu.
   - Nút Lưu chính sách (Save): Validate toàn bộ dữ liệu, hiển thị loading spinner, gửi request lên Backend ghi CSDL và lưu Audit Log, hiển thị toast message thành công.

YÊU CẦU THỰC HIỆN:
- Áp dụng skill `E:\work1\Skills\srs_feature_overview\skill.md` để viết Mục 1 (bảng 2 cột), Mục 2 (RBAC thuần Việt) và Mục 3 (Sequence Diagram).
- Áp dụng skill `E:\work1\Skills\srs_ui_spec_writer\skill.md` để viết Mục 4 cho toàn bộ các trường trên (giữ nguyên đầy đủ quy chuẩn validation song ngữ VI/EN, popup modals, empty/error state), đồng thời gắn mã [BR-01], [BR-02]... cho các quy tắc ngầm.
- Áp dụng skill `E:\work1\Skills\srs_business_rules_spec\skill.md` để viết Mục 5 giải nghĩa chi tiết các mã [BR-xx].
- Xuất toàn bộ nội dung hoàn chỉnh ra file: E:\work1\Docs\SRS_Chinh_Sach_Quet_Ma_Doc.md
```

---

### MẪU 2: TÀI CHÍNH / ERP - MA TRẬN PHÊ DUYỆT HẠN MỨC ĐA CẤP
*Giao diện tham chiếu:* [`E:\work1\approval_matrix_mockup.html`](file:///E:/work1/approval_matrix_mockup.html)

```markdown
Tôi có một tính năng mới cần viết tài liệu đặc tả SRS hoàn chỉnh gồm đủ 5 mục:
1. Thông tin chung chức năng
2. Ma trận phân quyền
3. Biểu đồ luồng xử lý
4. Thiết kế UI và đặc tả chi tiết components
5. Quy tắc nghiệp vụ chuyên sâu

THÔNG TIN TÍNH NĂNG:
- Mã tính năng: FIN_APPR_MATRIX_02
- Tên tính năng: Thiết lập ma trận phê duyệt hạn mức đa cấp (Configure Multi-level Approval Matrix).
- Mục đích: Cho phép Giám đốc Tài chính (CFO) hoặc Admin cấu hình ma trận phê duyệt đơn mua sắm/thanh toán tự động theo các bậc thang hạn mức số tiền, phòng ban và thời hạn SLA cam kết.

Nghiệp vụ chi tiết:
1. Thông tin quy trình áp dụng:
   - Tên ma trận phê duyệt: Textbox bắt buộc, tối đa 128 ký tự, duy nhất trong cùng loại chi phí.
   - Loại chi phí/Ngân sách: Dropdown gồm CAPEX (Tài sản cố định), OPEX (Vận hành thường xuyên), Tạm ứng dự án, Phúc lợi & Công tác phí.
   - Phòng ban áp dụng: Multi-select Tag chọn một hoặc nhiều khối/phòng ban.
   - Đơn vị tiền tệ: VNĐ (Chỉ đọc).

2. Bảng thiết lập bậc thang cấp duyệt (Dynamic Tiers Table):
   - Cho phép bấm nút "+ Thêm cấp duyệt" để thêm dòng bậc thang mới.
   - Mỗi dòng gồm:
     + Số thứ tự cấp: Tự động tăng (Cấp 1, Cấp 2, Cấp 3...).
     + Hạn mức từ (VNĐ): Read-only, tự động bằng [Hạn mức đến của cấp trước + 1 VNĐ] (Cấp 1 bắt đầu từ 0 VNĐ).
     + Hạn mức đến (VNĐ): Textbox nhập số tiền (Cấp cuối cùng có thể để Không giới hạn/Max). Bắt buộc phải lớn hơn Hạn mức từ.
     + Thẩm quyền phê duyệt: Dropdown chọn vai trò (Trưởng phòng, Giám đốc khối, CFO, CEO, Hội đồng quản trị).
     + SLA duyệt: Input number số giờ tối đa cho phép duyệt (mặc định 24h, 48h, 72h).
     + Hành động khi quá hạn SLA: Dropdown (Chuyển cấp trên Escalate, Chỉ gửi email cảnh báo, Tự động từ chối).
     + Nút Xóa dòng (Cấp 1 là bắt buộc, không được xóa).

3. Cơ chế ủy quyền & Ràng buộc kiểm soát:
   - Cho phép ủy quyền phê duyệt khi vắng mặt (Delegation of Authority): Toggle bật/tắt.
   - Bắt buộc đính kèm tối thiểu 3 báo giá cạnh tranh từ Cấp 2 (> 50 triệu): Toggle bật/tắt.
   - Cấm tự phê duyệt đơn của chính mình (Separation of Duties): Toggle luôn bật cố định.

4. Nút bấm hành động:
   - Hủy bỏ: Bật modal cảnh báo nếu form đã có chỉnh sửa.
   - Lưu ma trận: Validate không chồng lấn hạn mức, kiểm tra logic bậc thang liên tục, loading spinner, lưu CSDL và ghi Audit Log.

YÊU CẦU THỰC HIỆN:
- Áp dụng skill `E:\work1\Skills\srs_feature_overview\skill.md` để viết Mục 1 (bảng 2 cột), Mục 2 (RBAC thuần Việt) và Mục 3 (Sequence Diagram).
- Áp dụng skill `E:\work1\Skills\srs_ui_spec_writer\skill.md` để viết Mục 4 cho toàn bộ các trường và bảng động (song ngữ VI/EN, popup modals, empty/error state), đồng thời gắn mã [BR-01], [BR-02]... cho các quy tắc ngầm.
- Áp dụng skill `E:\work1\Skills\srs_business_rules_spec\skill.md` để viết Mục 5 giải nghĩa chi tiết các mã [BR-xx].
- Xuất toàn bộ nội dung hoàn chỉnh ra file: E:\work1\Docs\SRS_Ma_Tran_Phe_Duyet_Da_Cap.md
```

---

### MẪU 3: E-COMMERCE / BÁN LẺ - MÃ KHUYẾN MÃI & GIẢM GIÁ NÂNG CAO
*Giao diện tham chiếu:* [`E:\work1\promotion_engine_mockup.html`](file:///E:/work1/promotion_engine_mockup.html)

```markdown
Tôi có một tính năng mới cần viết tài liệu đặc tả SRS hoàn chỉnh gồm đủ 5 mục:
1. Thông tin chung chức năng
2. Ma trận phân quyền
3. Biểu đồ luồng xử lý
4. Thiết kế UI và đặc tả chi tiết components
5. Quy tắc nghiệp vụ chuyên sâu

THÔNG TIN TÍNH NĂNG:
- Mã tính năng: MKT_VOUCHER_03
- Tên tính năng: Tạo mã khuyến mãi & giảm giá nâng cao (Advanced Promotion & Voucher Engine).
- Mục đích: Cho phép bộ phận Marketing tạo mã giảm giá chiết khấu theo % có chặn mức trần, khung giờ vàng Flash Sale, giới hạn lượt dùng và phân khúc khách hàng VIP.

Nghiệp vụ chi tiết:
1. Thông tin cơ bản:
   - Tên chương trình: Textbox bắt buộc, tối đa 128 ký tự.
   - Mã Voucher: Textbox in hoa tối đa 16 ký tự, duy nhất trên hệ thống, có nút "Tạo tự động" để sinh chuỗi ngẫu nhiên.
   - Mô tả điều khoản: Textarea tối đa 300 ký tự.
   - Kênh bán hàng áp dụng: Dropdown (Tất cả, Web, Mobile App, POS).

2. Loại chiết khấu & Giá trị giảm:
   - Loại chiết khấu: Radio (Giảm theo %, Giảm số tiền cố định VNĐ, Miễn phí vận chuyển).
   - Khi chọn "Giảm theo %":
     + Mức giảm (%): Input number từ 1% đến 100%.
     + Mức giảm tối đa (Capped at): Input number số tiền VNĐ tối đa được giảm (tránh thất thoát ngân sách).
   - Giá trị đơn hàng tối thiểu (Min Spend): Input number số tiền tối thiểu để được áp mã.

3. Thời gian & Khung giờ Flash Sale:
   - Thời gian áp dụng: Hai ô Datetime picker (Từ ngày - Đến ngày). Bắt buộc Ngày kết thúc >= Ngày bắt đầu.
   - Khung giờ vàng Flash Sale: Toggle bật/tắt.
     + Khi bật: Hiển thị 2 khung giờ trong ngày (Buổi trưa 12:00 - 14:00, Buổi tối 20:00 - 22:00). Mã chỉ được áp dụng trong các khung giờ này.

4. Giới hạn lượt dùng & Đối tượng:
   - Tổng lượt dùng tối đa: Input number nguyên dương. Khi hết lượt hệ thống tự động khóa mã.
   - Lượt dùng tối đa mỗi khách hàng: Input number (mặc định 1 lượt/người, đối soát theo SĐT và User ID).
   - Phân khúc khách hàng: Dropdown (Tất cả, Khách hàng mới đơn đầu tiên, Thành viên VIP Vàng/Bạch Kim).

5. Nút bấm hành động:
   - Hủy bỏ: Bật modal xác nhận hủy.
   - Kích hoạt khuyến mãi (Save & Launch): Validate toàn bộ điều kiện, kiểm tra ngân sách, hiển thị loading spinner, ghi CSDL và sinh mã Audit Log.

YÊU CẦU THỰC HIỆN:
- Áp dụng skill `E:\work1\Skills\srs_feature_overview\skill.md` để viết Mục 1 (bảng 2 cột), Mục 2 (RBAC thuần Việt) và Mục 3 (Sequence Diagram).
- Áp dụng skill `E:\work1\Skills\srs_ui_spec_writer\skill.md` để viết Mục 4 cho toàn bộ các trường (song ngữ VI/EN, popup modals, empty/error state), đồng thời gắn mã [BR-01], [BR-02]... cho các quy tắc ngầm.
- Áp dụng skill `E:\work1\Skills\srs_business_rules_spec\skill.md` để viết Mục 5 giải nghĩa chi tiết các mã [BR-xx].
- Xuất toàn bộ nội dung hoàn chỉnh ra file: E:\work1\Docs\SRS_Ma_Khuyen_Mai_Nang_Cao.md
```

---

## 3. QUY TRÌNH 4 BƯỚC SỬ DỤNG NHANH CHO BA (QUICK START GUIDE)

1. **Bước 1 (Chuẩn bị):**
   - Phác thảo nhanh các trường thông tin hoặc mở file mockup HTML chụp lại ảnh màn hình (`Win + Shift + S`).
2. **Bước 2 (Điền thông tin):**
   - Copy mẫu **Master Template** ở Mục 1, điền mã tính năng, tên tính năng và mô tả các trường nghiệp vụ.
3. **Bước 3 (Thực thi với Antigravity):**
   - Dán prompt vào khung chat và đính kèm ảnh UI (nếu có).
4. **Bước 4 (Review & Bàn giao):**
   - AI tự động đọc 3 skill và xuất ra file hoàn chỉnh tại thư mục `E:\work1\Docs\SRS_[Ten_Tinh_Nang].md`.
   - Bạn mở file markdown lên kiểm tra, review nhanh và sẵn sàng chuyển giao cho DEV/Tester!
