# Skill: Phân tích Yêu cầu Phi chức năng (Non-Functional Requirements Analyzer)

**Tên Skill:** `nfr_analyzer`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) đề xuất và định nghĩa các **Yêu cầu phi chức năng (Non-Functional Requirements - NFR)** phù hợp cho một tính năng hoặc hệ thống dựa trên bối cảnh và nghiệp vụ của nó. Đảm bảo hệ thống không chỉ chạy đúng (Functional) mà còn chạy tốt, an toàn và dễ bảo trì.

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Mô tả tính năng, hệ thống, hoặc kiến trúc hiện tại.
- (Tùy chọn) Đối tượng người dùng mục tiêu, quy mô dự kiến (số lượng user/ngày).

### Xử lý của AI
- Dựa vào tính chất của nghiệp vụ, AI phân tích và đề xuất các Yêu cầu Phi chức năng thuộc các nhóm tiêu chuẩn:
  - **Performance (Hiệu năng):** Thời gian phản hồi (Response time), Số lượng request đồng thời (Concurrency).
  - **Security (Bảo mật):** Phân quyền, mã hóa dữ liệu, chống tấn công (XSS, SQL Injection).
  - **Usability (Khả năng sử dụng):** Trải nghiệm người dùng, hỗ trợ đa thiết bị (Responsive), hỗ trợ người khuyết tật (Accessibility).
  - **Reliability & Availability (Độ tin cậy và Tính sẵn sàng):** Thời gian uptime, backup dữ liệu, khả năng phục hồi (Disaster Recovery).
  - **Scalability (Khả năng mở rộng):** Khả năng mở rộng server khi lượng user tăng vọt.
- Các yêu cầu NFR phải có thể đo lường được (Measurable).

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được lưu thành file `.md` (Ví dụ: `NFR_He_Thong.md`).

```markdown
# Yêu cầu Phi chức năng (NFR)

| Nhóm NFR | Yêu cầu chi tiết | Tiêu chí đo lường (Metrics) | Mức độ ưu tiên |
| :--- | :--- | :--- | :--- |
| Performance | Thời gian phản hồi của API Đăng nhập | < 2 giây trong 95% trường hợp | Cao |
| Security | Mã hóa mật khẩu người dùng | Sử dụng thuật toán bcrypt / argon2, không lưu plaintext | Rất cao |
| Availability| Thời gian gián đoạn tối đa | Uptime 99.9% (Downtime không quá 43 phút/tháng) | Cao |
| Usability | Khả năng tương thích thiết bị | Giao diện hiển thị tốt trên Mobile (màn hình 375px trở lên) | Trung bình |
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Đo lường được (Measurable):** Hạn chế dùng từ "nhanh", "an toàn", "tốt". Phải có con số cụ thể (ví dụ: "< 2s", "99.9%").
- **Phù hợp bối cảnh:** Không đề xuất NFR quá cao siêu cho những hệ thống nội bộ nhỏ, và không được bỏ sót Security đối với hệ thống Tài chính.

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Phân tích NFR cho tính năng...", "Đề xuất các yêu cầu phi chức năng...".

## 5. Các lệnh cần tránh
- KHÔNG copy paste một danh sách NFR chung chung. Phải tùy chỉnh con số và nội dung cho khớp với Input của hệ thống.
