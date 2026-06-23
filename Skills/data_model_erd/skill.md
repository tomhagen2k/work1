# Skill: Phác thảo Cấu trúc Dữ liệu và ERD (Data Model & ERD Generator)

**Tên Skill:** `data_model_erd`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) phân tích yêu cầu nghiệp vụ để bóc tách các thực thể dữ liệu (Entities), các thuộc tính (Attributes) của chúng, và mối quan hệ (Relationships) giữa các thực thể. Skill tự động sinh ra mã vẽ **ER Diagram (ERD)** bằng Mermaid.

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Mô tả nghiệp vụ hoặc yêu cầu tính năng có liên quan đến việc lưu trữ, quản lý dữ liệu.

### Xử lý của AI
- Phân tích danh từ trong mô tả để tìm ra các Thực thể chính (Ví dụ: Khách hàng, Đơn hàng, Sản phẩm).
- Liệt kê các thuộc tính cần thiết cho mỗi thực thể, dự đoán kiểu dữ liệu cơ bản (String, Integer, Date, Boolean...). Luôn tự động thêm trường Khóa chính (Primary Key - PK) như `id`.
- Xác định mối quan hệ giữa các thực thể:
  - 1-1 (One-to-One)
  - 1-N (One-to-Many)
  - N-N (Many-to-Many)
- Viết mã **Mermaid** dạng `erDiagram` để vẽ sơ đồ trực quan.

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được lưu thành file `.md` (Ví dụ: `ERD_Quan_ly_Ban_Hang.md`).

```markdown
# Cấu trúc Dữ liệu và ERD: [Tên Module]

## 1. Danh sách Thực thể và Thuộc tính

**1.1. Thực thể: Khách hàng (Customer)**
- `id` (PK) - Integer: Mã khách hàng duy nhất.
- `name` - String: Tên khách hàng.
- `email` - String: Địa chỉ email.

**1.2. Thực thể: Đơn hàng (Order)**
- `id` (PK) - Integer: Mã đơn hàng.
- `customer_id` (FK) - Integer: Khóa ngoại liên kết tới Khách hàng.
- `status` - String: Trạng thái đơn.

## 2. Sơ đồ Thực thể Liên kết (ERD)

\`\`\`mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : "đặt"
    CUSTOMER {
        int id PK
        string name
        string email
    }
    ORDER {
        int id PK
        int customer_id FK
        string status
    }
\`\`\`
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Tính chuẩn hóa:** Sử dụng đúng chuẩn khóa chính (PK) và khóa ngoại (FK) trong Mermaid.
- **Tính đầy đủ:** Thuộc tính phải bao hàm đủ thông tin nghiệp vụ yêu cầu, kiểu dữ liệu phải logic.
- **Tính chính xác về quan hệ:** Vẽ đúng đường liên kết (Ví dụ `||--o{` cho 1-nhiều).

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Vẽ ERD cho...", "Phân tích cấu trúc dữ liệu...", "Xác định các thực thể...".

## 5. Các lệnh cần tránh
- KHÔNG tạo cấu trúc database quá phức tạp (như index, trigger) vì BA chỉ cần mô hình dữ liệu ở mức độ khái niệm (Conceptual/Logical Data Model).
