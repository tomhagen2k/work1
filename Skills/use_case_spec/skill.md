# Skill: Đặc tả chi tiết Use Case (Use Case Specification Writer)

**Tên Skill:** `use_case_spec`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) tự động hóa việc viết tài liệu **Đặc tả Use Case (Use Case Specification)** chi tiết. Chuyển đổi từ mô tả nghiệp vụ cơ bản thành một tài liệu cấu trúc chuẩn mực bao gồm Điều kiện tiên quyết (Pre-condition), Luồng cơ bản (Basic Flow), Luồng thay thế (Alternative Flow), Luồng ngoại lệ (Exception Flow) và Điều kiện sau (Post-condition).

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- **Tên Use Case** (Use Case Name).
- **Mô tả ngắn gọn** (Brief Description) về nghiệp vụ hoặc tính năng.
- **Tác nhân chính** (Primary Actor) và Tác nhân phụ (Secondary Actor - nếu có).

### Xử lý của AI
- Phân tích nghiệp vụ thô và bổ sung thêm các bước logic hợp lý dựa trên best practices của BA.
- Viết đặc tả dưới ngôn ngữ chuyên nghiệp, chia thành các bước (Step 1, Step 2...) rõ ràng. Tách biệt hành động của **Tác nhân** (Người dùng) và phản hồi của **Hệ thống**.
- Suy luận đầy đủ:
  - **Pre-condition:** Trạng thái hệ thống cần có để Use Case có thể bắt đầu.
  - **Post-condition:** Trạng thái của hệ thống sau khi Use Case kết thúc thành công.
  - **Basic Flow:** Luồng đường thẳng (Happy path) từ đầu đến cuối mà không có lỗi.
  - **Alternative Flow:** Các cách khác hoặc lựa chọn rẽ nhánh mà tác nhân có thể chọn để hoàn thành Use Case.
  - **Exception Flow:** Các lỗi hệ thống, validate dữ liệu, hoặc điều kiện không thỏa mãn khiến Use Case bị hủy bỏ hoặc phải nhập lại dữ liệu.

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được AI tự động tạo và lưu thành một file `.md` (Ví dụ: `UC_Ten_Use_Case.md`). Nội dung trong file phải định dạng theo mẫu bằng tiếng Việt:

```markdown
# Đặc tả Use Case: [Tên Use Case]

**1. Tác nhân (Actors):** 
- Chính: [Primary Actor]
- Phụ: [Secondary Actor]

**2. Mô tả (Brief Description):** 
[Mô tả ngắn gọn về mục đích của Use Case]

**3. Điều kiện tiên quyết (Pre-conditions):**
- [Điều kiện 1]

**4. Điều kiện sau (Post-conditions):**
- [Điều kiện thành công]

**5. Luồng cơ bản (Basic Flow):**
- Bước 1: [Actor] thực hiện...
- Bước 2: Hệ thống phản hồi...

**6. Luồng thay thế (Alternative Flows):**
- **6.1. [Tên luồng thay thế 1] (Bắt đầu từ bước X của luồng cơ bản)**
  - Bước 1: ...
  - Bước 2: ... (Quay lại bước Y của luồng cơ bản)

**7. Luồng ngoại lệ (Exception Flows):**
- **7.1. [Tên ngoại lệ 1] (Bắt đầu từ bước Z của luồng cơ bản)**
  - Bước 1: Hệ thống hiển thị thông báo lỗi...
  - Bước 2: Use case kết thúc.
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Tính trọn vẹn:** Có đầy đủ cả Alternative Flow (nếu logic nghiệp vụ cho phép rẽ nhánh) và Exception Flow (các lỗi thường gặp, validation).
- **Tính mạch lạc:** Sự luân phiên rõ ràng giữa Hành động của Actor và Phản hồi của Hệ thống (Actor request -> System response).
- **Tính tái sử dụng:** Dễ dàng nhúng nội dung này vào tài liệu SRS hoặc gửi trực tiếp cho đội Dev/Test.

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Viết Use case spec cho chức năng...", "Đặc tả Use Case cho nghiệp vụ...", "Viết luồng xử lý chi tiết cho UC...".

## 5. Các lệnh cần tránh (Commands to avoid)
- KHÔNG gộp Alternative Flow và Exception Flow vào trong Basic Flow. Luồng cơ bản phải sạch sẽ và là luồng thành công.
- KHÔNG viết các bước quá chung chung (Ví dụ: "Hệ thống xử lý dữ liệu"). Phải viết rõ hệ thống lưu vào cơ sở dữ liệu, gọi API, hay hiển thị giao diện nào.

## 6. Kịch bản kiểm thử (Test Scenarios)

**Kịch bản 1: Viết đặc tả Use Case có luồng thay thế**
- *Prompt:* "Viết đặc tả Use Case cho chức năng 'Thanh toán giỏ hàng'. Actor là Khách hàng. Khách hàng có thể thanh toán bằng Thẻ tín dụng (luồng cơ bản) hoặc chuyển khoản ngân hàng (luồng thay thế). Nếu thẻ hết tiền thì báo lỗi."
- *Kết quả mong đợi:* AI sinh ra đầy đủ 7 mục, trong đó mục 6 (Alternative Flow) ghi rõ các bước chọn thanh toán chuyển khoản, mục 7 (Exception Flow) xử lý lỗi thẻ bị từ chối/hết tiền. Lưu tự động vào file `UC_Thanh_Toan_Gio_Hang.md`.

**Kịch bản 2: Bổ sung logic ngoại lệ tự động**
- *Prompt:* "Đặc tả Use Case 'Quên mật khẩu'. Người dùng nhập email để nhận link reset."
- *Kết quả mong đợi:* Dù prompt rất ngắn, AI phải tự suy luận ra các Exception Flow như: "Email không tồn tại trong hệ thống", "Email bị khóa do nhập sai nhiều lần", "Hệ thống lỗi gửi email". Lưu vào file `UC_Quen_Mat_Khau.md`.
