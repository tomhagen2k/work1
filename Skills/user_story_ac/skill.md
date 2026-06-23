# Skill: Viết User Story và Acceptance Criteria (User Story & AC Writer)

**Tên Skill:** `user_story_ac`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) phân tích và phân rã một Yêu cầu tính năng (Feature Requirement) dạng văn bản thô hoặc mô tả ngắn gọn thành các User Story chi tiết, bao gồm cả các Tiêu chí chấp nhận (Acceptance Criteria - AC) được chuẩn hóa theo định dạng BDD (Behavior-Driven Development: Given-When-Then).

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Tên tính năng (Feature Name).
- Mô tả tổng quan về tính năng (Nghiệp vụ thô).
- Các Actor (Vai trò người dùng) tham gia vào tính năng này (Nếu có).

### Xử lý của AI
- Phân tách tính năng lớn thành nhiều phần nhỏ để viết thành các User Story (US) độc lập.
- Xác định rõ Actor, Hành động, và Giá trị mang lại. Viết US hoàn toàn bằng tiếng Việt (Là một [Actor], tôi muốn [Action], để [Value/Reason]).
- Đối với mỗi US, viết đầy đủ tất cả các Acceptance Criteria (AC) cần thiết để bao phủ toàn bộ nghiệp vụ, không giới hạn số lượng, bao gồm:
  - Trường hợp thành công (Happy path).
  - Trường hợp lỗi hoặc luồng thay thế (Unhappy path / Alternative flow).
  - Ràng buộc dữ liệu (Validation rules).
- Viết AC dưới định dạng BDD hoàn toàn bằng tiếng Việt (Cho [Điều kiện trước] - Khi [Hành động] - Thì [Kết quả mong đợi]).

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được AI tự động tạo và lưu thành một file `.md` (Ví dụ: `US_Ten_Tinh_Nang.md`). Nội dung trong file phải định dạng theo dạng danh sách bằng tiếng Việt:
- **US-01:** Là một [Actor], tôi muốn [Action], để [Value/Reason].
  - **AC-01:** [Tiêu đề AC]
    - **Cho:** [Điều kiện trước]
    - **Khi:** [Hành động của người dùng]
    - **Thì:** [Kết quả hệ thống trả về]
  - **AC-02:** ...

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Tính độc lập:** Mỗi User Story phải giải quyết được một nhu cầu cụ thể và có thể test độc lập (đáp ứng tiêu chuẩn INVEST).
- **Độ bao phủ của AC:** AC phải xử lý được cả trường hợp thành công (ví dụ: đăng nhập đúng) và trường hợp lỗi (ví dụ: sai mật khẩu).
- **Tính chính xác của BDD:** Không nhầm lẫn giữa "Cho" (điều kiện có sẵn) và "Khi" (hành động trigger). Ngôn ngữ phải sử dụng câu khẳng định, khách quan.

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu "Viết User Story cho chức năng...", "Chuyển yêu cầu sau thành US và AC...", "Viết AC dạng BDD cho tính năng...".
- Input có cung cấp tên tính năng và một mô tả nghiệp vụ (dù chỉ là 1-2 câu).

## 5. Các lệnh cần tránh (Commands to avoid)
- KHÔNG gộp chung quá nhiều chức năng phức tạp vào trong 1 User Story. Hãy chia nhỏ chúng ra.
- KHÔNG viết AC dưới dạng đoạn văn dài. Bắt buộc phải tách dòng "Given", "When", "Then".
- KHÔNG thêm các yêu cầu về mặt kỹ thuật (Database schema, Code structure) vào User Story trừ khi người dùng yêu cầu rõ ràng đó là Technical Story.

## 6. Kịch bản kiểm thử (Test Scenarios)

**Kịch bản 1: Phân tích tính năng cơ bản**
- *Prompt:* "Hãy viết US và AC cho tính năng 'Đăng nhập vào hệ thống CRM'. Cho 2 vai trò là Nhân viên sale và Quản trị viên. Yêu cầu có tính năng quên mật khẩu."
- *Kết quả mong đợi:* AI tách ra ít nhất 3 US (1 US Đăng nhập cho Nhân viên sale, 1 US Đăng nhập cho Admin, 1 US Quên mật khẩu). Mỗi US có đầy đủ các AC theo cấu trúc Cho-Khi-Thì bằng tiếng Việt và lưu kết quả vào file markdown.

**Kịch bản 2: Phân tích tính năng có validation**
- *Prompt:* "Viết US và AC cho màn hình 'Cập nhật thông tin cá nhân'. Bao gồm Tên (bắt buộc), Số điện thoại (chỉ nhập số), Email (đúng định dạng)."
- *Kết quả mong đợi:* AI sinh ra đầy đủ AC kiểm tra cụ thể các rule Validation (Khi người dùng để trống Tên -> Thì hệ thống báo lỗi...) và tự động lưu kết quả vào file markdown.
