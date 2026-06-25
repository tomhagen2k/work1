# Giáo trình Đào tạo Business Analyst Toàn diện
*(Từ Zero -> Kỹ năng cốt lõi -> Kiến thức IT -> Domain Cybersecurity)*

> [!NOTE]
> Đây là bản quy hoạch toàn diện (Mega-Syllabus) bao gồm **toàn bộ** các vòng đời kỹ năng của một BA thực thụ. Những gì thuộc về SDLC hay Viết tài liệu (SRS/User Story) chỉ là bước khởi đầu. Một BA giỏi cần trang bị thêm bộ kỹ năng **Khai thác (Elicitation)**, **Mô hình hóa (Modeling)** và **Nền tảng Kỹ thuật (Tech-Foundation)** trước khi dấn thân vào những domain khó như An ninh mạng.

---

## PHẦN 1: TƯ DUY PHÁT TRIỂN PHẦN MỀM & KỸ NĂNG CỐT LÕI

### Module 1: Vòng đời Phát triển Phần mềm (SDLC) & Phương pháp luận
- **1.1. SDLC là gì?** Các giai đoạn cơ bản: Khảo sát -> Thiết kế -> Lập trình -> Kiểm thử -> Triển khai.
- **1.2. Mô hình Thác nước (Waterfall):** Luồng chạy tuần tự, ưu/nhược điểm. Vai trò của BA ở giai đoạn đầu (chốt 100% scope). Tài liệu đặc trưng (BRD, SRS).
- **1.3. Mô hình Agile (Scrum):** Luồng chạy lặp (Sprint). 3 Vai trò (PO, SM, Dev). 4 Cuộc họp đặc thù (Planning, Daily, Review, Retro). Vai trò proxy-PO của BA. Sự thay đổi trong việc làm tài liệu (Backlog, User Story).

### Module 2: Viết Tài liệu Đặc tả (SRS) và Agile (User Story)
*(Sử dụng Tính năng Đăng nhập làm ví dụ xuyên suốt)*
- **2.1. Tài liệu SRS/FRD:**
  - Cấu trúc: Mục đích, đối tượng, Non-functional, Functional.
  - Kỹ thuật đào sâu luồng ngoại lệ (Edge Cases): Nhập sai, Quên mật khẩu, Khóa tài khoản chống Brute-force.
  - Data Validation: Bắt buộc nhập, kiểm tra định dạng Email/SĐT.
- **2.2. User Story & Acceptance Criteria (AC):**
  - Cấu trúc `As a... I want to... So that...`
  - Tiêu chí chấp nhận (AC) theo chuẩn BDD (Given - When - Then).
  - Quy tắc INVEST trong Agile. Chuyển đổi các case của màn Đăng nhập thành các User Story nhỏ (Chia theo luồng thành công, validate, khóa tài khoản).

### Module 3: Kỹ năng Khai thác và Lấy Yêu cầu (Elicitation Skills)
*(Học cách moi móc thông tin từ Khách hàng trước khi viết tài liệu)*
- **3.1. Kỹ thuật đặt câu hỏi:**
  - Phân biệt giữa "Cái khách hàng muốn" (Want / Giải pháp họ tự nghĩ ra) và "Cái khách hàng thực sự cần" (Need / Vấn đề cốt lõi).
  - Bộ câu hỏi **5W1H** (Who, What, When, Where, Why, How).
  - Kỹ thuật **5 Whys** (Hỏi "Tại sao" 5 lần để tìm ra Root Cause).
- **3.2. Bài tập Thực hành Phỏng vấn (Role-play):**
  - Mentor đóng vai Khách hàng: *"Tôi muốn làm một hệ thống Quản lý nhân sự giống như phần mềm X"*.
  - Yêu cầu BA mới phải liên tục đặt câu hỏi để bóc tách: Tại sao lại cần phần mềm mới? Có bao nhiêu loại nhân viên sử dụng? Quy trình xin nghỉ phép hiện tại diễn ra như thế nào?...

### Module 4: Mô hình hóa Hệ thống (System Modeling)
- **4.1. Biểu đồ Use Case (Use Case Diagram) & Đặc tả Use Case:**
  - Mục đích: Cung cấp cái nhìn tổng quan nhất về hệ thống. Trả lời câu hỏi *"Hệ thống có những chức năng gì?"* và *"Ai (Actor) là người sử dụng chức năng đó?"*.
  - Khái niệm: Actor, Use Case, ranh giới hệ thống (System boundary).
  - Các mối quan hệ (Relationships): `<<include>>` (Bắt buộc) và `<<extend>>` (Mở rộng/Tùy chọn).
  - Đặc tả Use Case (Use Case Specification): Viết tài liệu mô tả chi tiết từng bước tương tác giữa người dùng và hệ thống cho một Use Case cụ thể.
- **4.2. Biểu đồ Hoạt động (Activity Diagram / Flowchart):**
  - Vẽ luồng hành vi của người dùng (User Flow).
  - Thực hành: Vẽ lại luồng Đăng nhập, phải có các rẽ nhánh Decision (Sai pass? Thiếu ký tự?).
- **4.3. Biểu đồ Tuần tự (Sequence Diagram):**
  - Sự khác biệt: Flowchart thể hiện *Hành động*, Sequence thể hiện *Sự tương tác giữa các hệ thống theo thời gian*.
  - Thực hành: Vẽ Sequence Diagram cho luồng Đăng nhập (Tương tác giữa: `Người dùng` -> `Giao diện Web/App` -> `Máy chủ/Backend` -> `Cơ sở dữ liệu/DB`).

---

## PHẦN 2: NỀN TẢNG KỸ THUẬT CHO BA (TECHNICAL FOUNDATION)
*(Đây là cầu nối bắt buộc trước khi làm các dự án khó như Security)*

### Module 5: Kiến trúc Hệ thống & Cơ sở dữ liệu (Database)
- **5.1. Kiến trúc Hệ thống cơ bản:**
  - Mô hình Client - Server. Web, Mobile App giao tiếp với Backend như thế nào.
- **5.2. Cơ sở dữ liệu (Database) là gì?**
  - Khái niệm về CSDL Quan hệ (RDBMS - SQL) và Phi quan hệ (NoSQL).
  - Các khái niệm cốt lõi: Bảng (Table), Cột (Column), Kiểu dữ liệu (Data Type).
  - Mối quan hệ dữ liệu: Khóa chính (Primary Key), Khóa ngoại (Foreign Key). Diagram ERD cơ bản.
- **5.3. Thực hành SQL cơ bản:**
  - BA cần biết đọc và viết các câu lệnh Query cơ bản (SELECT, INSERT, UPDATE, DELETE, JOIN) để tự kiểm tra dữ liệu dưới DB trong quá trình làm hoặc test tính năng.

### Module 6: Giao tiếp Hệ thống (API & Integration)
- **6.1. Khái niệm API:**
  - API là gì? Tại sao các phần mềm cần "nói chuyện" với nhau qua API.
  - Khái niệm RESTful API, Endpoint.
- **6.2. Cấu trúc một API:**
  - Các phương thức (HTTP Methods): GET (Lấy), POST (Tạo mới), PUT (Cập nhật), DELETE (Xóa).
  - Format dữ liệu: JSON (Rất quan trọng), XML.
  - Mã trạng thái (HTTP Status Codes): 200 (OK), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error).
- **6.3. Bài tập Thực hành API:**
  - Sử dụng Postman hoặc đọc Swagger để test thử một API mở miễn phí (Ví dụ: Thời tiết, Thông tin chó mèo).
  - Hiểu khái niệm Data Mapping: Làm sao để hứng trường `temperature` trong cục JSON trả về và nhét nó vào cái khung Text trên giao diện.

---

## PHẦN 3: ÁP DỤNG VÀO DOMAIN AN NINH MẠNG (CYBERSECURITY)

### Module 7: Nhập môn An ninh mạng
- **Khái niệm:** Malware, Ransomware, Phishing, Endpoint, Hash file.
- **Sản phẩm cốt lõi:**
  - AV (Antivirus): Quét dựa trên chữ ký (Signature).
  - EDR: Agent thu thập Telemetry (Log tiến trình, mạng, file) và đẩy về Server phân tích hành vi.
  - SOAR: Nhận cảnh báo (Alert) từ EDR/Firewall, chạy Playbook để tự động hóa xử lý (Block IP, Isolate PC).

### Module 8: Thực hành Kỹ năng BA vào Hệ thống Security
- **Bài tập 1 (Sequence Diagram EDR):** Vẽ biểu đồ tuần tự mô tả quy trình: Agent EDR ở máy con phát hiện mã độc -> Đẩy Log lên Server -> Server phân tích sinh ra Alert -> Đẩy Alert ra giao diện Web Console.
- **Bài tập 2 (API Data Mapping trong SOAR):** Lấy tài liệu API của VirusTotal. Viết tài liệu mô tả: Playbook của SOAR sẽ gọi Endpoint nào, truyền vào tham số gì (IP/File Hash), và lấy trường nào từ cục JSON kết quả để quyết định có Block IP đó không.

### Module 9: Thực chiến dự án (Shadowing & Reverse Engineering)
- Tham gia các buổi họp dự án thật, làm thư ký ghi chép (Meeting Minutes).
- Đọc tài liệu tính năng cũ và vẽ lại luồng (Reverse Engineering) để làm quen logic nghiệp vụ.
- Viết requirement cho các lỗi (Bugs) hoặc yêu cầu cải tiến (Enhancements) nhỏ dưới sự kiểm duyệt của Mentor.
