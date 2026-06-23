# Skill: Vẽ Sơ đồ Tuần tự (Sequence Diagram Generator)

**Tên Skill:** `sequence_diagram`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) phân tích sự tương tác giữa các hệ thống, module hoặc giữa người dùng và hệ thống theo trình tự thời gian. Skill này tự động chuyển đổi mô tả luồng tích hợp thành mã **Mermaid Sequence Diagram**.

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Mô tả quy trình giao tiếp, trao đổi dữ liệu giữa các bên.
- Danh sách các thành phần tham gia (Người dùng, Frontend, Backend, Database, API bên thứ 3...).

### Xử lý của AI
- Nhận diện các **Participants** (Bên tham gia) và gán bí danh (alias) ngắn gọn.
- Dịch các bước tương tác thành thông điệp truyền đi (Message) và thông điệp trả về (Return).
- Phân tích và bổ sung các khối logic (Alt/Else, Opt, Loop) nếu luồng có rẽ nhánh hoặc vòng lặp.
  - `alt`: Dùng cho If/Else (Ví dụ: Đúng mật khẩu / Sai mật khẩu).
  - `opt`: Dùng cho bước tùy chọn (Không bắt buộc).
  - `loop`: Dùng cho vòng lặp.
- Sinh mã **Mermaid** dạng `sequenceDiagram`.

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được AI tự động tạo và lưu thành một file `.md` (Ví dụ: `Sequence_Thanh_Toan_Momo.md`).

```markdown
# Sơ đồ Tuần tự (Sequence Diagram): [Tên Quy trình]

**Mô tả:** [Tóm tắt quy trình tích hợp]

**Sơ đồ:**
\`\`\`mermaid
sequenceDiagram
    autonumber
    actor U as Người dùng
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant API as Cổng thanh toán
    
    U->>F: Bấm nút Thanh toán
    F->>B: Gửi yêu cầu thanh toán (Order ID)
    B->>DB: Kiểm tra trạng thái đơn hàng
    DB-->>B: Đơn hàng hợp lệ
    B->>API: Gọi API tạo giao dịch
    API-->>B: Trả về URL thanh toán
    B-->>F: Chuyển hướng URL
    F-->>U: Hiển thị trang thanh toán Cổng thanh toán
    
    alt Thanh toán thành công
        U->>API: Nhập thẻ và xác nhận
        API-->>B: Webhook: Thanh toán thành công
        B->>DB: Cập nhật trạng thái = Đã thanh toán
        B-->>F: Thông báo thành công
    else Thanh toán thất bại
        API-->>B: Webhook: Lỗi thẻ
        B-->>F: Thông báo lỗi cho người dùng
    end
\`\`\`
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Tính chính xác:** Sử dụng đúng loại mũi tên (`->>` cho request, `-->>` cho response).
- **Rõ ràng:** Có sử dụng `autonumber` để đánh số thứ tự tự động giúp dễ theo dõi.
- **Xử lý rẽ nhánh:** Dùng đúng block `alt`, `opt` cho các trường hợp ngoại lệ/thành công.

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Vẽ sequence diagram cho...", "Tạo sơ đồ tuần tự...", "Mô tả luồng gọi API bằng sơ đồ...".

## 5. Các lệnh cần tránh (Commands to avoid)
- KHÔNG tạo sơ đồ sequence cho các chức năng quá đơn giản không có tích hợp hoặc không có tương tác client-server rõ ràng (Ví dụ: Tính tổng 2 số trên UI). Chỉ dùng cho các luồng phức tạp.

## 6. Kịch bản kiểm thử (Test Scenarios)

**Kịch bản 1: Luồng gọi API có If/Else**
- *Prompt:* "Vẽ sequence diagram cho luồng Đăng nhập qua Google. Frontend gọi API Google lấy Token, sau đó gửi Token cho Backend. Backend verify token với Google. Nếu hợp lệ, sinh JWT trả cho Frontend. Nếu không, báo lỗi 401."
- *Kết quả mong đợi:* AI sinh mã sequenceDiagram, có 4 participant (Frontend, Backend, Google API), có khối `alt Token hợp lệ` và `else Token không hợp lệ`. Lưu vào file `Sequence_Login_Google.md`.
