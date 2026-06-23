# Skill: Tạo Kịch bản Kiểm thử từ Yêu cầu (Test Scenario Generator)

**Tên Skill:** `test_scenario_gen`

## 1. Mục tiêu (Goal)
Hỗ trợ BA hoặc QA đọc tài liệu yêu cầu (SRS, Use Case, User Story) và tự động sinh ra danh sách các **Kịch bản kiểm thử (Test Scenarios)** mức độ High-level. Skill giúp kiểm tra chéo (Cross-check) xem tài liệu yêu cầu đã đủ chặt chẽ chưa và hỗ trợ team QA lên kế hoạch test.

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Nội dung User Story, Use Case hoặc tài liệu SRS mô tả chức năng.
- (Tùy chọn) Danh sách các Business Rules.

### Xử lý của AI
- Quét tài liệu để trích xuất các luồng (Basic, Alternative, Exception) và các điều kiện ràng buộc.
- Xây dựng danh sách Test Scenario bao gồm 3 nhóm chính:
  - **Positive Testing:** Kịch bản kiểm tra luồng đi thành công (Valid inputs).
  - **Negative Testing:** Kịch bản kiểm tra lỗi, nhập sai dữ liệu, vượt quá giới hạn (Invalid inputs).
  - **Boundary/Edge Cases:** Kịch bản ở vùng biên (Ví dụ: Nhập đúng tối đa 255 ký tự, nhập 256 ký tự).
- Không cần viết chi tiết các bước (Steps) của Test Case, chỉ cần ghi rõ Tên kịch bản (Scenario) và Kết quả mong đợi (Expected Result).

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được lưu thành file `.md` (Ví dụ: `Test_Scenarios_Dang_Ky.md`).

```markdown
# Danh sách Kịch bản Kiểm thử (Test Scenarios)

## 1. Positive Testing (Kiểm thử luồng đúng)
- **TS-P-01:** Đăng ký tài khoản thành công với email và mật khẩu hợp lệ.
  - *Kết quả mong đợi:* Hệ thống gửi email kích hoạt và chuyển hướng đến trang Đăng nhập thành công.
- **TS-P-02:** ...

## 2. Negative Testing (Kiểm thử luồng lỗi)
- **TS-N-01:** Đăng ký tài khoản với email đã tồn tại trong hệ thống.
  - *Kết quả mong đợi:* Hệ thống báo lỗi "Email đã được sử dụng" và không lưu dữ liệu.
- **TS-N-02:** Bỏ trống trường Mật khẩu bắt buộc.
  - *Kết quả mong đợi:* Hệ thống báo lỗi "Vui lòng nhập mật khẩu" tại trường input.

## 3. Boundary / Edge Cases (Kiểm thử biên)
- **TS-B-01:** Nhập mật khẩu đúng biên dưới (chính xác 8 ký tự).
  - *Kết quả mong đợi:* Đăng ký thành công.
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Bao phủ (Coverage):** Phải vét cạn được các luồng rẽ nhánh và các rule validation có trong yêu cầu đầu vào.
- **Tính khả thi:** Kịch bản test phải mô tả rõ được Input là gì và Hành vi kỳ vọng (Expected result) là gì.

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Viết Test Scenario cho...", "Liệt kê các trường hợp cần test của...", "Tạo kịch bản test...".

## 5. Các lệnh cần tránh
- KHÔNG đi quá sâu vào việc viết từng bước test (Ví dụ: Bước 1 mở web, Bước 2 click chuột...). Việc này dành cho file Test Case chi tiết. BA/AI chỉ dừng ở mức Scenario.
