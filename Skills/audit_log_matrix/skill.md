# Skill: Định nghĩa Ma trận Audit Log (Audit Log Matrix Generator)

**Tên Skill:** `audit_log_matrix`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) thiết lập bảng định nghĩa tiêu chuẩn cho hệ thống ghi vết nhật ký hoạt động (Audit Log/System Log). Giúp xác định rõ chức năng nào cần lưu log, lưu những thông tin gì để phục vụ tra soát sau này.

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Tên hoặc Danh sách các Chức năng/Module nhạy cảm cần ghi log.
- Quy mô hệ thống hoặc các tiêu chuẩn Compliance (nếu có yêu cầu đặc biệt).

### Xử lý của AI
- Xác định các hành động có tính chất thay đổi trạng thái hoặc dữ liệu (Create, Update, Delete, Approve, Export, Login/Logout). Không ghi log các hành động chỉ xem (View/Read) trừ khi có yêu cầu đặc biệt về bảo mật.
- Tạo một bảng Audit Log Matrix bao gồm các cột thông tin bắt buộc:
  - **Module / Màn hình**
  - **Hành động (Action)**
  - **Người dùng (Username/Actor)**
  - **Mô tả (Description)**: Dữ liệu thay đổi (Old -> New) đối với cấu hình quan trọng, hoặc mô tả ngắn gọn đối với sự kiện đơn giản.
  - **Trạng thái (Status)**: Thành công / Thất bại. (Lưu ý: Luôn tách riêng thành các dòng riêng biệt cho kịch bản Thành công và Thất bại đối với cùng một hành động để làm rõ mô tả và nguyên nhân).
  - **Nguyên nhân thất bại (Failure Reason)**: Bắt buộc ghi nhận với các tác vụ thất bại (Ví dụ: Sai mật khẩu, Lỗi kết nối).

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được lưu thành file `.md` (Ví dụ: `Audit_Log_Matrix.md`).

```markdown
# Ma trận Định nghĩa Audit Log

| Module | Hành động | Người dùng | Mô tả (Dữ liệu thay đổi) | Trạng thái | Nguyên nhân thất bại |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Hệ thống | Đăng nhập | Username | Đăng nhập thành công vào hệ thống từ IP 192.168.1.1 | Thành công | - |
| Hệ thống | Đăng nhập | Username | Đăng nhập vào hệ thống từ IP 192.168.1.1 thất bại | Thất bại | Sai mật khẩu (quá 3 lần) |
| Nhân sự | Update Salary | HR Admin | Cập nhật lương nhân sự (ID: 10) từ 10tr -> 12tr | Thành công | - |
| Nhân sự | Update Salary | HR Admin | Cập nhật lương nhân sự (ID: 10) từ 10tr -> 12tr thất bại | Thất bại | Không đủ quyền |
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- Chỉ bắt các sự kiện có "thay đổi dữ liệu" hoặc "ảnh hưởng bảo mật".
- Ghi rõ cần lưu giá trị Cũ và Mới (Old -> New) đối với hành động Update.

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Thiết kế bảng Audit log...", "Cần ghi log những gì cho chức năng...".

## 5. Các lệnh cần tránh
- KHÔNG yêu cầu ghi log cho mọi thao tác nhỏ nhặt (như click chuột, chuyển tab) vì gây rác hệ thống.
