# BỘ ĐẶC TẢ TEST CASE CHI TIẾT (TEST SPECIFICATION SUITE)
## TÍNH NĂNG: CẤU HÌNH HÀNH ĐỘNG TƯƠNG TÁC NEWSFEED (OSINT V2)
### TÍCH HỢP TRỢ LÝ AI PROMPT-TO-RULE, ĐỒNG BỘ HAI CHIỀU & GIAO DIỆN LIGHT MODE
---

| **Thuộc tính** | **Giá trị** |
|---|---|
| **Dự án** | Hệ thống Quản trị & Tác chiến Nuôi Tài khoản ảo OSINT |
| **Mô-đun** | Cấu hình Hành động Kịch bản: `interact_newsfeed` |
| **Người lập** | Senior QA Engineer / Test Architect |
| **Tiêu chuẩn kiểm thử** | ISTQB Advanced Test Analyst Standard |
| **Môi trường & Giao diện** | **Light Mode (Giao diện sáng cao cấp)**, Độ phân giải 1366x768 đến 1920x1080 |
| **Tổng số Test Case** | **26 Test Cases chuyên sâu** (Bao phủ 100% UI, Business Logic, AI Prompting, Bi-directional Sync, Exception) |

---

## MA TRẬN PHÂN BỔ TEST CASE THEO PHÂN HỆ

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BẢNG PHÂN BỔ 26 TEST CASE CHI TIẾT (TEST DISTRIBUTION MATRIX)                          │
├───────────────────────────────────────────────────────────────────┬─────────┬──────────┤
│ PHÂN HỆ KIỂM THỬ (TEST MODULE)                                    │ SỐ LƯỢNG│ DẢI MÃ TC│
├───────────────────────────────────────────────────────────────────┼─────────┼──────────┤
│ Module 1: Giao diện Light Mode, Bố cục & Công thái học (UI/UX)    │  4 TCs  │ TC-UI-01 │
│ Module 2: Khối Giới hạn chung phiên & Chuyển đổi Chế độ           │  4 TCs  │ TC-GL-01 │
│ Module 3: Quản lý Chủ đề Cột Trái & Fallback toàn cục             │  3 TCs  │ TC-TM-01 │
│ Module 4: Trợ lý AI Prompt-to-Rule: Nhập Text & Gợi ý thiếu       │  5 TCs  │ TC-AI-01 │
│ Module 5: Chế độ hiển thị Dual-View (Preview Phân Cấp vs JSON)    │  3 TCs  │ TC-DV-01 │
│ Module 6: Cơ chế Tinh chỉnh Hai Chiều (Sửa Mô tả vs Sửa Preview)  │  4 TCs  │ TC-BD-01 │
│ Module 7: Lưu tạm Quy tắc, Đồng bộ Cột Trái & Tóm tắt Tổng thể    │  3 TCs  │ TC-SV-01 │
│ Module 8: Kiểm thử Biên, Ngoại lệ & Bảo mật (Negative/Boundary)   │  4 TCs  │ TC-EX-01 │
├───────────────────────────────────────────────────────────────────┴─────────┴──────────┤
│ TỔNG CỘNG: 26 TEST CASES TOÀN DIỆN                                                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## BẢNG TEST CASE CHI TIẾT (TEST SPECIFICATION)

---

### MODULE 1: GIAO DIỆN LIGHT MODE, BỐ CỤC & CÔNG THÁI HỌC (UI/UX)

#### `TC-UI-01`: Kiểm tra tổng thể giao diện Light Mode (Visual Aesthetic & Palette)
- **Mức độ ưu tiên:** High | **Loại test:** UI/Visual
- **Điều kiện tiên quyết:** Mở modal cấu hình hành động Tương tác Newsfeed.
- **Các bước thực hiện:**
  1. Quan sát toàn bộ modal trên nền sáng: Nền chính `#f8fafc` hoặc `#ffffff`, viền thẻ `#e2e8f0`.
  2. Kiểm tra độ tương phản giữa màu chữ (Slate-800/900 `#0f172a`, `#1e293b`) trên nền trắng/xám nhạt (đạt tiêu chuẩn WCAG AAA).
  3. Kiểm tra các màu sắc ngữ nghĩa: Primary Blue (`#2563eb`), Tích cực/Khen Green (`#16a34a`), Tiêu cực/Phẫn nộ Red (`#dc2626`), Cảnh báo/Fallback Amber (`#d97706`).
- **Kết quả kỳ vọng:**
  - Giao diện Light Mode sáng sủa, thanh lịch, chuẩn phong cách SaaS Enterprise (Linear/Notion style).
  - Không có chữ bị chìm màu, không bị lóa mắt, các khối thẻ nổi khối bằng box-shadow nhẹ nhàng.

#### `TC-UI-02`: Kiểm tra tính cố định của Header và Footer khi cuộn (Sticky Layout)
- **Mức độ ưu tiên:** Medium | **Loại test:** Layout/Ergonomics
- **Điều kiện tiên quyết:** Modal đang mở ở chế độ Tương tác theo Chủ đề (có nội dung dài).
- **Các bước thực hiện:**
  1. Dùng chuột cuộn nội dung ở Cột phải và Cột trái xuống hết đáy.
  2. Quan sát vị trí của Thanh Giới hạn chung (Header) và Thanh Nút Lưu/Hủy (Footer).
- **Kết quả kỳ vọng:**
  - Header và Footer luôn ghim cố định ở đỉnh và đáy modal.
  - Cột trái và Cột phải có thanh cuộn độc lập (Independent scroll), không bị trôi mất các nút thao tác.

#### `TC-UI-03`: Kiểm tra độ co giãn Responsive trên các độ phân giải màn hình
- **Mức độ ưu tiên:** High | **Loại test:** Compatibility/Responsiveness
- **Điều kiện tiên quyết:** Trình duyệt ở các kích thước Viewport: `1366x768`, `1600x900`, `1920x1080`.
- **Các bước thực hiện:**
  1. Thu nhỏ cửa sổ trình duyệt về mức tối thiểu 1366x768.
  2. Kiểm tra tỉ lệ chia cột (Cột trái 320px, Cột phải co giãn linh hoạt theo tỷ lệ phần còn lại).
  3. Kiểm tra các nút bấm, ô input, dropdown xem có bị chữ đè chữ hoặc vỡ hàng không.
- **Kết quả kỳ vọng:**
  - Toàn bộ nội dung hiển thị trọn vẹn, không bị tràn viền (overflow-x), không vỡ layout grid.

#### `TC-UI-04`: Hiển thị các Badge, Icon cảm xúc và Trạng thái On/Off Switch
- **Mức độ ưu tiên:** Medium | **Loại test:** Component State
- **Điều kiện tiên quyết:** Đang ở tab Hành động Bài viết.
- **Các bước thực hiện:**
  1. Kiểm tra các icon cảm xúc: Thả Tim ❤️, Phẫn nộ 😡, Haha 😄, Like 👍.
  2. Bật và tắt các Switch Toggle trên từng Thẻ hành động.
- **Kết quả kỳ vọng:**
  - Icon hiển thị sắc nét, badge có màu nền nhẹ (soft-color badge).
  - Switch Toggle chuyển động mượt mà (Animation 0.2s), trạng thái On (Xanh) và Off (Xám) rõ rệt.

---

### MODULE 2: KHỐI GIỚI HẠN CHUNG PHIÊN & CHUYỂN ĐỔI CHẾ ĐỘ

#### `TC-GL-01`: Chuyển đổi giữa 2 chế độ Giới hạn phiên (Mutually Exclusive Radios)
- **Mức độ ưu tiên:** Critical | **Loại test:** Functional Logic
- **Điều kiện tiên quyết:** Modal vừa mở, mặc định chọn "Giới hạn số bài viết".
- **Các bước thực hiện:**
  1. Click vào radio "Giới hạn thời gian tương tác".
  2. Quan sát ô nhập số bài viết và ô nhập thời gian.
  3. Click lại vào radio "Giới hạn số bài viết tương tác".
- **Kết quả kỳ vọng:**
  - Hai radio loại trừ nhau 100%. Khi chọn Giới hạn thời gian, dải bài viết tự động mờ đi (disabled) và dải thời gian được kích hoạt sáng rõ; dòng hint text bên phải thay đổi tương ứng.

#### `TC-GL-02`: Nhập dải số lượng bài viết hợp lệ (`postLimitRange`)
- **Mức độ ưu tiên:** High | **Loại test:** Boundary Value
- **Điều kiện tiên quyết:** Đang chọn radio "Giới hạn số bài viết tương tác".
- **Các bước thực hiện:**
  1. Nhập `Từ: 5` đến `đến: 10` bài viết.
  2. Thử nhập `Từ: 1` đến `đến: 1` bài viết.
- **Kết quả kỳ vọng:**
  - Hệ thống nhận giá trị bình thường, không báo lỗi.

#### `TC-GL-03`: Nhập dải thời gian tương tác hợp lệ (`timeLimitRange`)
- **Mức độ ưu tiên:** High | **Loại test:** Boundary Value
- **Điều kiện tiên quyết:** Đang chọn radio "Giới hạn thời gian tương tác".
- **Các bước thực hiện:**
  1. Nhập `Từ: 120` đến `đến: 300` giây.
- **Kết quả kỳ vọng:**
  - Giá trị được lưu chính xác, đơn vị hiển thị là giây.

#### `TC-GL-04`: Chuyển đổi Chế độ Tương tác Mặc định vs Theo Chủ đề
- **Mức độ ưu tiên:** Critical | **Loại test:** State Switcher
- **Điều kiện tiên quyết:** Đang ở đỉnh modal.
- **Các bước thực hiện:**
  1. Click nút "⚙️ Tương tác Mặc định (Cơ bản)".
  2. Quan sát giao diện modal body.
  3. Click nút "🎯 Tương tác theo Chủ đề (Nâng cao V2)".
- **Kết quả kỳ vọng:**
  - Chế độ Mặc định: Hiện lưới 6 hành vi phẳng đơn giản (không có cột trái và cây chủ đề).
  - Chế độ Chủ đề: Mở ra giao diện 2 cột Master-Detail đầy đủ tính năng phân tích ngữ nghĩa.

---

### MODULE 3: QUẢN LÝ CHỦ ĐỀ CỘT TRÁI & FALLBACK TOÀN CỤC

#### `TC-TM-01`: Chọn và chuyển đổi giữa các Thẻ Chủ đề trong danh sách
- **Mức độ ưu tiên:** High | **Loại test:** Master-Detail Sync
- **Điều kiện tiên quyết:** Có sẵn 3 quy tắc chủ đề (#1 Chính trị, #2 Kinh tế, #3 Thể thao).
- **Các bước thực hiện:**
  1. Click vào Thẻ #2 (Kinh tế).
  2. Quan sát tiêu đề và nội dung hiển thị ở Cột phải.
  3. Click vào Thẻ #1 (Chính trị).
- **Kết quả kỳ vọng:**
  - Thẻ được chọn ở Cột trái có viền xanh Active sáng rõ ràng.
  - Cột phải cập nhật ngay tức thì tiêu đề và các cấu hình hành động của đúng chủ đề đó.

#### `TC-TM-02`: Đổi cơ chế đối chiếu chủ đề (Matching Policy)
- **Mức độ ưu tiên:** Medium | **Loại test:** Business Setting
- **Các bước thực hiện:**
  1. Tại dropdown "Cơ chế đối chiếu" ở đỉnh Cột trái, chuyển từ "Thứ tự ưu tiên (Dừng ở rule đầu tiên)" sang "Đa chủ đề kết hợp".
- **Kết quả kỳ vọng:**
  - Giá trị dropdown cập nhật thành công, lưu vào cấu hình kịch bản.

#### `TC-TM-03`: Cấu hình chiến lược Fallback khi gặp bài viết ngoài danh mục
- **Mức độ ưu tiên:** High | **Loại test:** Fallback Behavior
- **Các bước thực hiện:**
  1. Cuộn xuống đáy Cột trái tại khối "⚠️ Khi gặp bài ngoài danh mục".
  2. Lần lượt chọn 3 tùy chọn: "Chỉ đọc dạo 3s - 5s", "Bỏ qua ngay", "Chạy tương tác mặc định".
- **Kết quả kỳ vọng:**
  - Cho phép chọn đầy đủ cả 3 chiến lược, có ghi chú giải thích rõ ràng cho người dùng.

---

### MODULE 4: TRỢ LÝ AI PROMPT-TO-RULE — NHẬP TEXT & GỢI Ý THIẾU

#### `TC-AI-01`: Mở Popup Trợ lý AI và kiểm tra hiển thị ban đầu
- **Mức độ ưu tiên:** Critical | **Loại test:** UI/Flow
- **Các bước thực hiện:**
  1. Tại Cột trái, click nút `[✨ Thêm Chủ đề bằng AI]`.
  2. Quan sát Popup trợ lý AI vừa bật lên.
- **Kết quả kỳ vọng:**
  - Popup hiển thị ở trung tâm màn hình (nền Light sáng sủa).
  - Có ô nhập Tên chủ đề.
  - Có hàng "Gợi ý thành phần" dạng Chips: `[+ Sắc thái]`, `[+ Thực thể]`, `[+ Cảm xúc]`, `[+ Bình luận ảnh]`, `[+ Phản bác AI]`, `[+ Hạn mức]`.
  - Có 3 nút mẫu kịch bản có sẵn.
  - Khung Preview bên dưới ở trạng thái rỗng kèm placeholder hướng dẫn.

#### `TC-AI-02`: Bấm các Chips Gợi ý thành phần để chèn nhanh vào ô Textarea
- **Mức độ ưu tiên:** Medium | **Loại test:** Interactive Helper
- **Điều kiện tiên quyết:** Đang mở Popup Trợ lý AI, con trỏ đang ở ô Textarea mô tả.
- **Các bước thực hiện:**
  1. Click vào Chip `[+ Sắc thái bài viết]`.
  2. Click vào Chip `[+ Phản bác AI]`.
- **Kết quả kỳ vọng:**
  - Từ khóa mẫu tương ứng tự động được chèn vào vị trí con trỏ chuột trong ô Textarea mà không làm mất nội dung đang gõ.

#### `TC-AI-03`: Chọn Kịch bản Mẫu 1-Click (Prompt Starter Template)
- **Mức độ ưu tiên:** Medium | **Loại test:** Quick Starter
- **Các bước thực hiện:**
  1. Click vào nút mẫu `[Mẫu: Đấu tranh phản bác luận điệu sai trái]`.
- **Kết quả kỳ vọng:**
  - Ô Tên chủ đề tự động điền: *"Chính trị & Đấu tranh phản bác"*.
  - Ô Textarea tự động điền câu lệnh hoàn chỉnh: *"Gặp bài viết khen ngợi Nhà nước thì thả tim, bài viết bôi nhọ thì thả phẫn nộ, AI reply 2 comment tiêu cực bằng dẫn chứng thực tế..."*.

#### `TC-AI-04`: Nhập câu mô tả THIẾU THÔNG TIN ➔ Hiển thị Khung Text Thông báo Thiếu
- **Mức độ ưu tiên:** Critical | **Loại test:** Gap Detection Logic
- **Các bước thực hiện:**
  1. Nhập câu prompt thiếu thông tin: *"Thả tim bài viết và bình luận 1 ảnh"*. (Thiếu: Thư mục ảnh, thiếu sắc thái lọc bài).
  2. Bấm nút `[⚡ Sinh điều kiện từ Mô tả]`.
- **Kết quả kỳ vọng:**
  - Hệ thống **KHÔNG báo lỗi đỏ chặn người dùng**, mà hiển thị một **Khung Text Thông báo Gợi ý (Alert Banner)** màu vàng nhạt ngay dưới ô mô tả:
    *Gợi ý bổ sung: Bạn chưa cung cấp đường dẫn thư mục ảnh, và chưa nêu rõ bài viết thuộc sắc thái nào (Khen ngợi hay bất kỳ).*
  - Người dùng vẫn có thể đọc gợi ý này để biết mình cần bổ sung chữ gì.

#### `TC-AI-05`: Bổ sung thêm chữ vào câu mô tả và Sinh lại thành công
- **Mức độ ưu tiên:** High | **Loại test:** Positive Loop
- **Điều kiện tiên quyết:** Tiếp nối TC-AI-04.
- **Các bước thực hiện:**
  1. Đặt con trỏ chuột vào ô Textarea mô tả, gõ thêm: *"lấy ảnh từ thư mục E:/OSINT/Images, bài khen ngợi thì thả tim"*.
  2. Bấm lại nút `[⚡ Sinh điều kiện từ Mô tả]`.
- **Kết quả kỳ vọng:**
  - Khung cảnh báo thông tin thiếu biến mất.
  - Hệ thống sinh ra Bản Preview và JSON Schema hoàn chỉnh.

---

### MODULE 5: CHẾ ĐỘ HIỂN THỊ DUAL-VIEW (PREVIEW PHÂN CẤP VS JSON SCHEMA)

#### `TC-DV-01`: Kiểm tra cấu trúc Cây Phân Cấp của Bản Preview Ngữ Nghĩa
- **Mức độ ưu tiên:** Critical | **Loại test:** Visual Parsing
- **Điều kiện tiên quyết:** AI đã sinh cấu hình thành công. Đang ở tab "Preview Văn Bản".
- **Các bước thực hiện:**
  1. Kiểm tra cấu trúc phân cấp hiển thị trong ô Preview:
     - Tên chủ đề: `🎯 CHỦ ĐỀ: ...`
     - Cấp Hành động: `- HÀNH ĐỘNG 1: Bày tỏ cảm xúc...`, `- HÀNH ĐỘNG 2: Reply...`
     - Cấp Điều kiện: `+ Bài khen ngợi: Thả Tim ❤️ (Tỷ lệ: 100%, Delay: 5-10s)`
     - Cấp Ngoại lệ: `+ Fallback: Bỏ qua...`
- **Kết quả kỳ vọng:**
  - Cấu trúc cây (Tree structure) hiển thị rõ ràng, rành mạch, thụt lề chuẩn, dễ đọc, không bị dính cục chữ thành một đoạn văn xuôi.

#### `TC-DV-02`: Chuyển đổi sang Chế độ xem Mã JSON Schema (Technical View)
- **Mức độ ưu tiên:** High | **Loại test:** Dual-view Switcher
- **Các bước thực hiện:**
  1. Click vào radio/tab "Mã JSON Kỹ Thuật".
  2. Quan sát khung hiển thị.
- **Kết quả kỳ vọng:**
  - Giao diện chuyển sang màn hình code editor (font JetBrains Mono), có syntax highlighting.
  - Có nút `[📋 Copy JSON]` ở góc trên. Bấm vào hiển thị tooltip "Đã sao chép vào bộ nhớ tạm!".

#### `TC-DV-03`: Kiểm tra tính toàn vẹn của các trường trong JSON sinh ra
- **Mức độ ưu tiên:** Critical | **Loại test:** Data Integrity
- **Các bước thực hiện:**
  1. Kiểm tra payload JSON: Có đầy đủ các trường `ruleName`, `actions`, `conditions`, `target`, `quota`, `delays`, `fallbackStrategy`.
- **Kết quả kỳ vọng:**
  - JSON đúng chuẩn cú pháp (Valid JSON 100%), không có trường bị undefined hoặc NaN.

---

### MODULE 6: CƠ CHẾ TINH CHỈNH HAI CHIỀU (BI-DIRECTIONAL REFINEMENT)

#### `TC-BD-01`: Sửa trực tiếp con số và câu chữ trên ô Textarea Preview
- **Mức độ ưu tiên:** Critical | **Loại test:** Direct Inline Edit
- **Điều kiện tiên quyết:** Đang ở tab "Preview Văn Bản", nội dung đang có dòng:
  `+ Comment bôi nhọ Lãnh đạo: AI Reply (Quota: 2 comment/bài, Delay: 20-40s)`
- **Các bước thực hiện:**
  1. Đặt con trỏ chuột vào số `2` trong chữ `Quota: 2`, xóa đi gõ số `1`.
  2. Đặt con trỏ chuột vào chữ `20-40s`, sửa thành `15-30s`.
  3. Bấm nút `[🔄 Cập nhật JSON từ Preview]`.
- **Kết quả kỳ vọng:**
  - Hệ thống đọc lại đoạn Preview vừa sửa, hiển thị thông báo nhẹ: *"Đã cập nhật JSON từ bản Preview thành công!"*.
  - Chuyển sang tab JSON: Thấy giá trị `quota` đã đổi thành `1`, `delay` đổi thành `15-30`.

#### `TC-BD-02`: Sửa cảm xúc trực tiếp trên ô Textarea Preview
- **Mức độ ưu tiên:** High | **Loại test:** Semantic Parser
- **Điều kiện tiên quyết:** Trong ô Preview có dòng: `+ Bài bôi nhọ: Thả Phẫn nộ 😡 (Tỷ lệ: 100%)`.
- **Các bước thực hiện:**
  1. Sửa chữ `Thả Phẫn nộ 😡` thành `Thả Haha 😄`.
  2. Bấm nút `[🔄 Cập nhật JSON từ Preview]`.
- **Kết quả kỳ vọng:**
  - Trong JSON, trường `reactionTypes` của điều kiện đó tự động chuyển từ `["angry"]` sang `["haha"]`.

#### `TC-BD-03`: Sửa câu mô tả ban đầu và bấm "Sinh lại từ Mô tả"
- **Mức độ ưu tiên:** High | **Loại test:** Forward Regeneration
- **Các bước thực hiện:**
  1. Quay lại ô Textarea mô tả ở Khối 1, gõ thêm: *"bỏ hành động bình luận ảnh, chỉ like và reply comment"*.
  2. Bấm nút `[⚡ Sinh lại từ Mô tả]`.
- **Kết quả kỳ vọng:**
  - Cả ô Preview và JSON đều tự động cập nhật: Hành động bình luận ảnh bị xóa bỏ, chỉ còn hành động cảm xúc và reply.

#### `TC-BD-04`: Thử nghiệm nhập sai cú pháp trong Preview và kiểm tra cảnh báo
- **Mức độ ưu tiên:** Medium | **Loại test:** Error Resilience
- **Các bước thực hiện:**
  1. Trong ô Preview, cố tình xóa sạch cả một khối hành động hoặc gõ lung tung các ký tự vô nghĩa.
  2. Bấm `[🔄 Cập nhật JSON từ Preview]`.
- **Kết quả kỳ vọng:**
  - Hệ thống không bị crash, hiển thị thông báo nhắc nhở: *"Cú pháp dòng Preview chưa chuẩn, vui lòng giữ đúng định dạng hoặc bấm 'Sinh lại từ Mô tả' để khôi phục cấu trúc mẫu."*

---

### MODULE 7: LƯU TẠM QUY TẮC, ĐỒNG BỘ CỘT TRÁI & TÓM TẮT TỔNG THỂ

#### `TC-SV-01`: Bấm "Lưu tạm quy tắc này" ➔ Kiểm tra Rule mới xuất hiện tại Cột trái
- **Mức độ ưu tiên:** Critical | **Loại test:** End-to-End State Sync
- **Điều kiện tiên quyết:** Đã sinh cấu hình thành công cho chủ đề "An ninh mạng & Phòng chống lừa đảo".
- **Các bước thực hiện:**
  1. Bấm nút `[💾 Lưu tạm quy tắc này]` ở Footer của Popup Trợ lý AI.
  2. Quan sát Popup đóng lại và Cột trái của Modal chính.
- **Kết quả kỳ vọng:**
  - Popup AI đóng lại mượt mà.
  - Danh sách Chủ đề ở Cột trái xuất hiện ngay 1 Thẻ mới `#4: An ninh mạng & Phòng chống lừa đảo` với đầy đủ tags và số lượng hành động.
  - Cột phải tự động chọn và mở ra chi tiết của Thẻ #4 vừa tạo.

#### `TC-SV-02`: Mở Modal Xem Tóm Tắt Toàn Bộ Kịch Bản (Global Live Summary)
- **Mức độ ưu tiên:** High | **Loại test:** Global Preview
- **Các bước thực hiện:**
  1. Tại Footer của Modal chính, click nút `[👁️ Xem tóm tắt kịch bản (Preview)]`.
  2. Đọc nội dung bản tóm tắt xuất hiện trong hộp thoại Overlay.
- **Kết quả kỳ vọng:**
  - Bản tóm tắt tổng hợp đầy đủ:
    + Giới hạn phiên: Số bài viết (hoặc Thời gian) đang chọn.
    + Danh sách tất cả các chủ đề đang bật kèm từng hành động chi tiết.
    + Hành vi khi gặp bài viết ngoài danh mục (Fallback).
  - Ngôn từ tự nhiên, mạch lạc, dễ duyệt.

#### `TC-SV-03`: Bấm "Lưu cấu hình hành động" tại Modal chính
- **Mức độ ưu tiên:** Critical | **Loại test:** Final Save
- **Các bước thực hiện:**
  1. Bấm nút `[💾 Lưu cấu hình hành động]`.
- **Kết quả kỳ vọng:**
  - Hệ thống kiểm tra hợp lệ toàn bộ (Validate).
  - Hiển thị thông báo Toast/Alert: *"Lưu thành công toàn bộ cấu hình kịch bản Tương tác Newsfeed V2!"*.
  - Modal đóng lại và cập nhật trạng thái ra luồng kịch bản tổng.

---

### MODULE 8: KIỂM THỬ BIÊN, NGOẠI LỆ & RÀNG BUỘC LOGIC (NEGATIVE / BOUNDARY)

#### `TC-EX-01`: Nhập dải số lượng bài viết bị ngược (`from > to`)
- **Mức độ ưu tiên:** High | **Loại test:** Validation Logic
- **Các bước thực hiện:**
  1. Tại ô Giới hạn số bài viết, nhập `Từ: 10` đến `đến: 5` bài.
- **Kết quả kỳ vọng:**
  - Ô nhập tức thì hiển thị viền đỏ cảnh báo (Inline Error), hiển thị tooltip: *"Giá trị 'Từ' không được lớn hơn 'Đến'"*.
  - Nút Lưu bị vô hiệu hóa hoặc cảnh báo không cho lưu.

#### `TC-EX-02`: Bấm "Sinh điều kiện từ Mô tả" khi để trống Tên chủ đề hoặc Ô mô tả
- **Mức độ ưu tiên:** High | **Loại test:** Required Fields
- **Các bước thực hiện:**
  1. Mở popup AI, để trống cả 2 ô và bấm `[⚡ Sinh điều kiện từ Mô tả]`.
- **Kết quả kỳ vọng:**
  - Ô Tên chủ đề và Ô mô tả nhấp nháy viền đỏ cảnh báo: *"Vui lòng nhập tên chủ đề và mô tả mong muốn tương tác."*

#### `TC-EX-03`: Nhập văn bản mô tả hoàn toàn vô nghĩa hoặc không liên quan
- **Mức độ ưu tiên:** Medium | **Loại test:** Edge Case NLP
- **Các bước thực hiện:**
  1. Nhập vào ô mô tả chuỗi ký tự rác: *"asdjkasd 123891273918237 !@#$%"*.
  2. Bấm `[⚡ Sinh điều kiện từ Mô tả]`.
- **Kết quả kỳ vọng:**
  - Hệ thống không bị treo (freeze), hiển thị thông báo lịch sự: *"AI không nhận diện được hành động tương tác nào từ văn bản trên. Bạn vui lòng xem các gợi ý mẫu bên trên để nhập lại."*

#### `TC-EX-04`: Thử xóa thẻ dòng điều kiện cuối cùng trong Bảng Ma trận
- **Mức độ ưu tiên:** Medium | **Loại test:** Minimum Constraint
- **Các bước thực hiện:**
  1. Trong Bảng Ma trận Cảm xúc, xóa các dòng cho đến khi chỉ còn đúng 1 dòng duy nhất.
  2. Bấm icon thùng rác xóa tiếp dòng cuối cùng này.
- **Kết quả kỳ vọng:**
  - Hệ thống hiển thị cảnh báo: *"Mỗi hành động phải giữ lại ít nhất 1 điều kiện cơ sở!"* và không cho xóa rỗng bảng.

---

## TIÊU CHÍ NGHIỆM THU KIỂM THỬ (TEST ACCEPTANCE CRITERIA)
1. **Tỷ lệ Pass:** Đạt **100% đối với các Test Case mức Critical và High**; không có lỗi Blockers/Critical tồn đọng.
2. **Độ ổn định giao diện:** 
   - 100% chuẩn giao diện **Light Mode** (Tone nền trắng/xám Slate sang trọng, độ tương phản cao, không chói mắt).
   - Không bị xô lệch, không vỡ layout khi chuyển qua lại giữa các tab hoặc khi mở Drawer/Popup.
3. **Cơ chế 2 chiều:** Thao tác sửa trên text Preview và bấm `[🔄 Cập nhật JSON từ Preview]` phản ánh chính xác 100% vào JSON Schema.
