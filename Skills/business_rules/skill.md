# Skill: Liệt kê và chuẩn hóa Quy tắc nghiệp vụ (Business Rules Extractor)

**Tên Skill:** `business_rules`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) đọc hiểu mô tả nghiệp vụ thô và tự động trích xuất, phân loại, và chuẩn hóa thành một danh sách các **Quy tắc nghiệp vụ (Business Rules)**. Skill này giúp đảm bảo không bỏ sót các ràng buộc quan trọng (validation, logic tính toán, điều kiện rẽ nhánh) trước khi bàn giao cho đội ngũ Phát triển (Dev/QA).

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Nội dung mô tả nghiệp vụ thô, yêu cầu của khách hàng, hoặc tài liệu quy trình hiện tại.
- (Tùy chọn) Bối cảnh của hệ thống để AI hiểu các ràng buộc mặc định (ví dụ: hệ thống ngân hàng, thương mại điện tử).

### Xử lý của AI
- Quét toàn bộ nội dung để tìm kiếm các câu mang tính bắt buộc, điều kiện tiên quyết, công thức hoặc giới hạn (ví dụ: "phải lớn hơn", "chỉ được phép", "tính bằng cách").
- Phân loại các quy tắc tìm được thành các nhóm:
  - **Ràng buộc dữ liệu (Data Validation):** Kiểu dữ liệu, độ dài, định dạng (VD: Email phải đúng định dạng).
  - **Ràng buộc quy trình/Logic (Process/Logic Rule):** Các điều kiện để chuyển bước (VD: Chỉ được duyệt đơn khi đã thanh toán).
  - **Công thức tính toán (Calculation/Formula):** (VD: Tổng tiền = Đơn giá x Số lượng - Chiết khấu).
  - **Ràng buộc quyền hạn (Access/Security Rule):** (VD: Chỉ Admin mới được xóa).
- Đánh mã định danh tự động cho mỗi quy tắc (Ví dụ: `BR-01`, `BR-02`).

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được AI tự động tạo và lưu thành một file `.md` (Ví dụ: `Business_Rules_TenTinhNang.md`). Nội dung trong file trình bày dưới dạng bảng bằng tiếng Việt:

```markdown
# Danh sách Quy tắc nghiệp vụ (Business Rules)

| Mã BR | Loại quy tắc | Mô tả quy tắc (Business Rule Description) | Thông báo lỗi (nếu vi phạm) |
| :--- | :--- | :--- | :--- |
| BR-01 | Ràng buộc dữ liệu | Mật khẩu phải có tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số. | "Mật khẩu không đạt yêu cầu bảo mật." |
| BR-02 | Ràng buộc logic | Không thể hủy đơn hàng nếu trạng thái đang là "Đang giao". | "Đơn hàng đang giao không thể hủy." |
| BR-03 | Công thức tính | Phí vận chuyển = 30.000 VNĐ nếu Khoảng cách < 5km, ngược lại là 50.000 VNĐ. | (Không áp dụng) |
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Tính độc lập (Atomic):** Mỗi rule chỉ giải quyết một vấn đề. Không gộp chung (Ví dụ: "Tuổi > 18 và phải có CMND" nên tách thành 2 rules).
- **Tính rõ ràng (Unambiguous):** Ngôn từ sử dụng phải dứt khoát, không dùng từ ngữ mơ hồ ("có thể", "thỉnh thoảng").
- **Tính đầy đủ:** Phân tích bao quát được cả Validation, Logic và Calculation (nếu có).

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Liệt kê các quy tắc nghiệp vụ cho...", "Trích xuất Business rules từ yêu cầu sau...", "Chuẩn hóa các rule...".

## 5. Các lệnh cần tránh (Commands to avoid)
- KHÔNG viết quy tắc quá thiên về mặt kỹ thuật (Ví dụ: "Lưu vào bảng User trong Database"). Cần giữ ngôn ngữ ở mức độ nghiệp vụ (Business level).
- KHÔNG tự bịa ra các quy tắc không có cơ sở, ngoại trừ các quy tắc cơ bản bắt buộc (VD: Email phải đúng định dạng) dựa trên Best Practices.

## 6. Kịch bản kiểm thử (Test Scenarios)

**Kịch bản 1: Phân tích nghiệp vụ vay vốn ngân hàng**
- *Prompt:* "Trích xuất BR cho chức năng Đăng ký thẻ tín dụng. Yêu cầu: Khách hàng phải đủ 18 tuổi. Thu nhập tối thiểu 10 triệu/tháng. Hạn mức thẻ = Thu nhập x 3, nhưng tối đa không quá 100 triệu. Không có nợ xấu."
- *Kết quả mong đợi:* AI trích xuất được ít nhất 4 quy tắc. Tách rõ `BR-01` (Tuổi >= 18), `BR-02` (Thu nhập >= 10tr), `BR-03` (Nợ xấu = Không), `BR-04` (Công thức Hạn mức). Tự động lưu thành file `Business_Rules_The_Tin_Dung.md`.
