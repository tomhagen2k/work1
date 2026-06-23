# Skill: Kịch bản Nghiệm thu Người dùng (UAT Script Writer)

**Tên Skill:** `uat_script`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) viết các **Kịch bản Nghiệm thu Người dùng (User Acceptance Testing - UAT Script)**. Đây là tài liệu hướng tới khách hàng (Business Users / End-users) để họ tự thao tác trên hệ thống và xác nhận tính năng đã đáp ứng đúng nghiệp vụ thực tế hay chưa.

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Yêu cầu nghiệp vụ hoặc luồng xử lý chính của tính năng.
- Mục tiêu nghiệp vụ (Business Value) mà tính năng này giải quyết.

### Xử lý của AI
- Chuyển đổi ngôn ngữ kỹ thuật sang **ngôn ngữ người dùng (Business language)**. Bỏ qua các từ ngữ như Database, API, JSON.
- Xây dựng một kịch bản UAT theo định dạng Step-by-Step, có chỗ để người dùng đánh dấu Pass/Fail.
- Tập trung vào việc mô phỏng một quy trình làm việc thực tế (Real-world workflow) từ đầu đến cuối thay vì test từng ô nhập liệu riêng lẻ.

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được lưu thành file `.md` (Ví dụ: `UAT_Script_Quy_Trinh_Duyet.md`).

```markdown
# Kịch bản Nghiệm thu (UAT Script): [Tên Tính năng/Quy trình]

**Người thực hiện:** [Role Khách hàng]
**Mục tiêu:** Đảm bảo luồng duyệt đơn hàng chạy đúng theo thực tế công ty.

| STT | Hành động của bạn (Thao tác) | Bạn kỳ vọng nhìn thấy gì? (Kết quả) | Đạt (Pass/Fail) | Ghi chú của khách hàng |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Truy cập vào menu "Danh sách Đơn hàng chờ duyệt". | Hiển thị danh sách các đơn hàng ở trạng thái "Chờ duyệt", có hiển thị tên người tạo đơn. | [  ] | |
| 2 | Chọn một đơn hàng và nhấn "Từ chối", nhập lý do "Sai giá". | Đơn hàng biến mất khỏi danh sách chờ, có thông báo "Đã từ chối đơn hàng". | [  ] | |
| 3 | Đăng nhập bằng tài khoản người tạo đơn. | Thấy đơn hàng ở trạng thái "Bị từ chối" cùng lý do "Sai giá". | [  ] | |
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Tính thân thiện:** Không có yếu tố kỹ thuật. Dễ đọc, dễ hiểu đối với một người dùng bình thường không biết IT.
- **Tính thực tế:** Các bước phải liên kết với nhau thành một câu chuyện nghiệp vụ (Business Workflow) thay vì các thao tác rời rạc.

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Viết kịch bản UAT cho...", "Tạo file nghiệm thu chức năng...", "Làm kịch bản cho khách test...".

## 5. Các lệnh cần tránh
- KHÔNG hướng dẫn khách hàng test các trường hợp mã lỗi hệ thống (như 404, 500) hoặc các kiểm thử biên quá sâu, đó là việc của QC/QA.
