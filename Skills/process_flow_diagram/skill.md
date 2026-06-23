# Skill: Vẽ Sơ đồ Luồng Quy trình nghiệp vụ (Process Flow Diagram)

**Tên Skill:** `process_flow_diagram`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) chuyển đổi các mô tả quy trình nghiệp vụ bằng lời văn thành sơ đồ trực quan (Process Flow / Flowchart) sử dụng cú pháp **Mermaid.js**. Sơ đồ này giúp người dùng, Dev và QA dễ dàng hình dung toàn bộ các bước, các điểm rẽ nhánh (Decision) và các vai trò tham gia trong quy trình.

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Nội dung mô tả quy trình nghiệp vụ dạng văn bản.
- Danh sách các vai trò (Actor/Role) tham gia vào quy trình (nếu quy trình có nhiều bên tham gia, cần thể hiện qua Swimlane hoặc Subgraph).

### Xử lý của AI
- Xác định các thành phần chính của quy trình:
  - **Start/End:** Điểm bắt đầu và kết thúc của quy trình.
  - **Process (Bước xử lý):** Các hành động cụ thể do Actor hoặc Hệ thống thực hiện.
  - **Decision (Rẽ nhánh):** Các câu hỏi Có/Không hoặc các lựa chọn rẽ nhánh (Ví dụ: "Hợp lệ?", "Thanh toán thành công?").
- Viết mã **Mermaid** dạng `flowchart TD` (Từ trên xuống dưới) hoặc `flowchart LR` (Từ trái sang phải).
- Áp dụng các hình khối chuẩn: `()` hoặc `([])` cho Start/End, `[]` cho Hành động, `{}` cho Rẽ nhánh.
- Nếu có nhiều vai trò, sử dụng `subgraph` để mô phỏng các luồng công việc (Swimlanes) cho từng vai trò.

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được AI tự động tạo và lưu thành một file `.md` (Ví dụ: `Process_Quy_Trinh_Mua_Hang.md`). Nội dung file bao gồm mã Mermaid được bọc trong block code:

```markdown
# Sơ đồ Quy trình: [Tên Quy trình]

**Mô tả ngắn gọn:** [Tóm tắt 1-2 câu về quy trình]

**Sơ đồ (Mermaid):**
\`\`\`mermaid
flowchart TD
    Start([Bắt đầu]) --> Step1[Khách hàng chọn sản phẩm]
    Step1 --> Step2[Khách hàng thanh toán]
    Step2 --> Decision{Thanh toán thành công?}
    
    Decision -- Có --> Step3[Hệ thống tạo đơn hàng]
    Step3 --> End([Kết thúc])
    
    Decision -- Không --> Step4[Hệ thống báo lỗi]
    Step4 --> Step2
\`\`\`
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Tính chính xác cú pháp:** Mã Mermaid phải hợp lệ, không chứa các ký tự đặc biệt làm lỗi render biểu đồ (Ví dụ: dùng dấu ngoặc kép `" "` nếu label có chứa ký tự đặc biệt).
- **Tính trực quan:** Có đầy đủ các mũi tên và nhãn (label) trên các nhánh rẽ (Ví dụ: "Đúng/Sai", "Yes/No").
- **Tính đầy đủ:** Cover hết toàn bộ luồng quy trình được mô tả trong Input.

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Vẽ sơ đồ quy trình cho...", "Tạo flowchart cho đoạn mô tả sau...", "Chuyển text sau thành sơ đồ Mermaid...".

## 5. Các lệnh cần tránh (Commands to avoid)
- KHÔNG tạo các sơ đồ quá phức tạp đan chéo nhau gây khó nhìn. Hãy cố gắng sắp xếp logic một chiều (Top-Down hoặc Left-Right).
- KHÔNG sử dụng các syntax Mermaid quá cũ hoặc bị deprecate.

## 6. Kịch bản kiểm thử (Test Scenarios)

**Kịch bản 1: Sơ đồ cơ bản có rẽ nhánh**
- *Prompt:* "Vẽ sơ đồ quy trình đăng nhập: Bắt đầu -> Nhập email, pass -> Kiểm tra DB. Nếu sai pass -> Báo lỗi và quay lại Nhập. Nếu đúng -> Chuyển đến Trang chủ -> Kết thúc."
- *Kết quả mong đợi:* AI sinh ra mã `flowchart TD`, có node Decision `{Kiểm tra DB?}`, nhánh `Sai` vòng ngược lên node `Nhập`, nhánh `Đúng` đi xuống kết thúc. Lưu vào file `.md`.

**Kịch bản 2: Sơ đồ có Swimlane (Nhiều Actor)**
- *Prompt:* "Vẽ sơ đồ duyệt bài: Writer viết bài -> Gửi duyệt. Editor nhận bài -> Review. Nếu Đạt -> Xuất bản. Nếu Không đạt -> Trả về cho Writer sửa lại."
- *Kết quả mong đợi:* AI sử dụng 2 `subgraph Writer` và `subgraph Editor` để nhóm các bước tương ứng, thể hiện rõ luồng công việc giữa 2 vai trò.
