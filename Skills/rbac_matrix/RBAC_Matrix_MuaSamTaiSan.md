# Ma trận Phân quyền (RBAC) - Quy trình Phê duyệt Đơn mua sắm tài sản

**Ghi chú ký hiệu:**
- **R** (Read): Xem / Truy cập
- **C** (Create): Thêm mới
- **U** (Update): Cập nhật / Chỉnh sửa
- **D** (Delete): Xóa
- **A** (Approve): Phê duyệt / Xác nhận
- **-** : Không có quyền

**Bảng Ma trận:**

| Module / Chức năng | Nhân viên (Staff) | Trưởng phòng (Line Manager) | Giám đốc tài chính (CFO) | Quản trị viên (Admin) |
| :--- | :---: | :---: | :---: | :---: |
| Đơn mua sắm (< 50 triệu) | R, C, U* | R, A | R | - |
| Đơn mua sắm (>= 50 triệu) | R, C, U* | R, A | R, A | - |
| Danh mục Nhà cung cấp | R | R | R, C, U, D | - |
| Cấu hình hạn mức ngân sách | - | R | R | R, C, U, D |

*Ghi chú thêm về nghiệp vụ:*
- **Đơn mua sắm:** (*) Nhân viên chỉ có quyền R, C, U trên các đơn do chính mình tạo (có thể cập nhật khi đơn chưa được duyệt). Trưởng phòng được duyệt (A) các đơn < 50 triệu và đóng vai trò duyệt cấp 1 cho các đơn >= 50 triệu. CFO là người duyệt cuối (A) cho các đơn >= 50 triệu. Admin không tham gia vào quy trình mua sắm.
- **Danh mục Nhà cung cấp:** Chỉ CFO có toàn quyền quản lý (Thêm/Sửa/Xóa). Nhân viên và Trưởng phòng chỉ được quyền xem (R) để chọn nhà cung cấp trong quá trình tạo đơn. Admin không có quyền tham gia quản lý danh mục này.
- **Cấu hình hạn mức ngân sách:** Admin là người duy nhất có quyền quản trị (C, R, U, D) thiết lập hạn mức các phòng ban. Trưởng phòng và CFO có thể xem (R) ngân sách để theo dõi hạn mức hiện tại.
