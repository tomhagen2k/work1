# Skill: Xây dựng Ma trận và Sơ đồ Trạng thái (State Machine Generator)

**Tên Skill:** `state_machine`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) phân tích vòng đời của một đối tượng nghiệp vụ (ví dụ: Đơn hàng, Hợp đồng, Giao dịch) và tự động tạo ra **Ma trận trạng thái (State Matrix)** cùng **Sơ đồ trạng thái (State Diagram)** bằng Mermaid.

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Tên đối tượng cần quản lý trạng thái (Ví dụ: "Đơn hàng").
- Mô tả vòng đời hoặc các bước thay đổi trạng thái của đối tượng đó.
- Các hành động (Actions) kích hoạt sự thay đổi trạng thái.

### Xử lý của AI
- Xác định tất cả các trạng thái có thể có của đối tượng (Draft, Pending, Approved, Rejected, Canceled, Completed...).
- Lập bảng Ma trận trạng thái (State Matrix) để chỉ rõ: 
  - Trạng thái hiện tại (Current State).
  - Hành động tác động (Action/Trigger).
  - Trạng thái tiếp theo (Next State).
- Sinh mã **Mermaid** dạng `stateDiagram-v2` để trực quan hóa vòng đời này.

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được AI tự động tạo và lưu thành một file `.md` (Ví dụ: `State_Machine_Don_Hang.md`). Nội dung file bao gồm:

```markdown
# Vòng đời trạng thái: [Tên Đối tượng]

## 1. Ma trận Trạng thái (State Matrix)

| Trạng thái hiện tại | Hành động (Trigger) | Trạng thái tiếp theo | Người thực hiện (Actor) |
| :--- | :--- | :--- | :--- |
| [*] (Bắt đầu) | Khởi tạo đơn hàng | Mới tạo (New) | Khách hàng |
| Mới tạo (New) | Thanh toán | Đang xử lý (Processing) | Hệ thống |
| Đang xử lý | Giao hàng | Đang giao (Shipping) | Nhân viên kho |
| ... | ... | ... | ... |

## 2. Sơ đồ Trạng thái (Mermaid State Diagram)

\`\`\`mermaid
stateDiagram-v2
    [*] --> New : Khởi tạo đơn hàng
    New --> Processing : Thanh toán
    Processing --> Shipping : Giao hàng
    Shipping --> Completed : Khách nhận hàng
    New --> Canceled : Khách hủy đơn
    Completed --> [*]
    Canceled --> [*]
\`\`\`
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Tính trọn vẹn:** Có điểm bắt đầu `[*]` và điểm kết thúc `[*]`. Không có trạng thái "mồ côi" (không thể đến được hoặc không thể thoát ra).
- **Tính logic:** Các chuyển đổi phải có ý nghĩa thực tế (Ví dụ: Đơn hàng đã "Hoàn thành" thì không thể "Hủy").
- **Cú pháp Mermaid chuẩn xác:** Không dùng ký tự lạ làm hỏng render của `stateDiagram-v2`.

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Tạo state matrix cho...", "Vẽ sơ đồ trạng thái của vòng đời...", "Phân tích các trạng thái của đối tượng...".

## 5. Các lệnh cần tránh (Commands to avoid)
- KHÔNG tạo các trạng thái thừa thãi không mang ý nghĩa quản lý dữ liệu (Ví dụ: "Đang click nút lưu"). Trạng thái phải là trạng thái của Dữ liệu/Đối tượng.

## 6. Kịch bản kiểm thử (Test Scenarios)

**Kịch bản 1: Vòng đời Đơn xin nghỉ phép**
- *Prompt:* "Tạo sơ đồ trạng thái cho Đơn xin nghỉ phép. Nhân viên tạo đơn (Draft), Gửi duyệt (Pending). Quản lý có thể Duyệt (Approved) hoặc Từ chối (Rejected). Nếu Từ chối, nhân viên có thể sửa lại thành Draft. Nếu Duyệt, sau ngày nghỉ đơn chuyển thành Completed."
- *Kết quả mong đợi:* AI sinh ra Ma trận với các hành động tương ứng, và sơ đồ Mermaid có đường vòng từ Rejected về Draft. Tự động lưu thành file `State_Machine_Nghi_Phep.md`.
