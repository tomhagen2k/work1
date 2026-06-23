# Skill: Xây dựng Ma trận phân quyền (RBAC Matrix Generator)

**Tên Skill:** `rbac_matrix`

## 1. Mục tiêu (Goal)
Hỗ trợ Business Analyst (BA) thiết lập bảng Ma trận phân quyền (Role-Based Access Control - RBAC Matrix) cho hệ thống. Skill này giúp ánh xạ tự động và logic giữa các Nhóm người dùng/Vai trò (Roles) với các Chức năng/Màn hình (Features/Modules) thông qua các quyền thao tác cơ bản (Xem, Thêm, Sửa, Xóa, Phê duyệt...).

## 2. Yêu cầu chi tiết (Detailed Requirements)

### Input đầu vào
- Danh sách các Vai trò (Roles/Actors) trong hệ thống.
- Danh sách các Chức năng, Module hoặc Màn hình.
- (Tùy chọn) Mô tả ngắn gọn về quy trình nghiệp vụ để AI hiểu ngữ cảnh phân quyền.

### Xử lý của AI
- Dựa trên danh sách Vai trò và Chức năng, AI tiến hành phân tích và lập luận logic để gán quyền (Quyền CRUD: **C**reate, **R**ead, **U**pdate, **D**elete, và **A**pprove/Duyệt).
- Áp dụng nguyên tắc quyền tối thiểu (Least Privilege): Vai trò nào không có liên quan đến chức năng sẽ không có quyền gì.
- Thiết lập bảng ma trận phân quyền: 
  - **Cột (Columns):** Các Vai trò (Roles).
  - **Hàng (Rows):** Các Chức năng (Features).
  - **Ô (Cells):** Tổ hợp các ký hiệu viết tắt cho quyền hạn.

### Output đầu ra (Lưu thành file Markdown)
Kết quả trả về phải được AI tự động tạo và lưu thành một file `.md` (Ví dụ: `RBAC_Matrix_TenDuAn.md`). Nội dung trong file bao gồm bảng ma trận và ghi chú ký hiệu:

```markdown
# Ma trận Phân quyền (RBAC)

**Ghi chú ký hiệu:**
- **R** (Read): Xem / Truy cập
- **C** (Create): Thêm mới
- **U** (Update): Cập nhật / Chỉnh sửa
- **D** (Delete): Xóa
- **A** (Approve): Phê duyệt / Xác nhận
- **-** : Không có quyền

**Bảng Ma trận:**

| Module / Chức năng | Quản trị viên (Admin) | Quản lý (Manager) | Nhân viên (Staff) | Khách (Guest) |
| :--- | :---: | :---: | :---: | :---: |
| Quản lý Đơn hàng | R, C, U, D, A | R, U, A | R, C | - |
| Cấu hình Hệ thống | R, C, U, D | - | - | - |
| Xem Báo cáo | R | R | - | - |
```

## 3. Tiêu chuẩn đánh giá (Evaluation Criteria)
- **Tính logic về phân quyền:** Tuân thủ logic thực tế (Ví dụ: "Nhân viên" chỉ được tạo đơn hàng, "Quản lý" mới được duyệt đơn hàng; "Khách" chỉ được xem sản phẩm chứ không được xóa).
- **Định dạng bảng chuẩn xác:** Bảng Markdown không bị vỡ cột, nội dung canh lề hợp lý để dễ sao chép vào Excel hoặc Confluence.
- **Tính đầy đủ:** Không bỏ sót bất kỳ tổ hợp Feature/Role nào được cung cấp trong Input.

## 4. Điều kiện kích hoạt (Activation Conditions)
- Người dùng yêu cầu: "Lập ma trận phân quyền cho...", "Tạo bảng RBAC...", "Phân quyền các role sau với các chức năng...".

## 5. Các lệnh cần tránh (Commands to avoid)
- KHÔNG tự bịa ra thêm Role mới nếu không được yêu cầu (tuy nhiên có thể tự bổ sung các Module nhỏ liên quan nếu nó hợp logic với Module lớn được cung cấp).
- KHÔNG để trống các ô trong bảng; bắt buộc phải điền ký hiệu quyền hoặc dấu `-` (gạch ngang) nếu không có quyền.

## 6. Kịch bản kiểm thử (Test Scenarios)

**Kịch bản 1: Lập ma trận cơ bản**
- *Prompt:* "Lập ma trận phân quyền cho hệ thống Blog. Có 4 roles: Super Admin, Editor (Biên tập viên), Writer (Người viết bài), Guest (Khách). Các chức năng: Quản lý bài viết, Quản lý bình luận, Quản lý người dùng."
- *Kết quả mong đợi:* Bảng phân quyền hiển thị Writer chỉ được C,R,U bài viết của mình; Editor được Duyệt (A) bài viết; Guest chỉ được Xem (R) bài viết và Tạo (C) bình luận. Tự động lưu thành file `RBAC_Matrix_Blog.md`.

**Kịch bản 2: Bổ sung logic nghiệp vụ đặc thù**
- *Prompt:* "Tạo ma trận RBAC cho quy trình Xin nghỉ phép. Role: Nhân viên, Quản lý trực tiếp, HR. Chức năng: Đơn nghỉ phép."
- *Kết quả mong đợi:* AI tự phân tách chức năng "Đơn nghỉ phép" thành các thao tác: "Tạo đơn", "Xem đơn", "Duyệt đơn". HR có quyền Xem toàn bộ, Quản lý có quyền Duyệt, Nhân viên có quyền Tạo. Tự động lưu file.
