# Ma trận Phân quyền (RBAC) - Hệ thống Quản lý Phòng Khám

**Ghi chú ký hiệu:**
- **R** (Read): Xem / Truy cập / Xuất báo cáo
- **C** (Create): Thêm mới / Khởi tạo
- **U** (Update): Cập nhật / Chỉnh sửa / Xuất kho / Kiểm kê
- **D** (Delete): Xóa / Hủy
- **A** (Approve): Phê duyệt
- **-** : Không có quyền

**Bảng Ma trận:**

| Module / Chức năng | Bác sĩ (Doctor) | Y tá (Nurse) | Tiếp tân (Receptionist) | Kế toán (Accountant) |
| :--- | :---: | :---: | :---: | :---: |
| Hồ sơ bệnh án | R, C, U | R, U | - | - |
| Lịch hẹn khám | R | R | R, C, U, D | - |
| Hóa đơn & Viện phí | R | - | R, C, U | R |
| Kho dược phẩm | R | R, U | - | R, U |

*Ghi chú thêm về nghiệp vụ:*
- **Hồ sơ bệnh án:** Bác sĩ là người duy nhất có toàn quyền chuyên môn (R, C, U) để khám, kê đơn và chỉnh sửa bệnh án. Y tá được phép xem và cập nhật (R, U) các chỉ số sinh tồn của bệnh nhân. Kế toán bị cấm truy cập (-) vì lý do bảo mật thông tin y tế.
- **Lịch hẹn khám:** Tiếp tân chịu trách nhiệm chính trong việc sắp xếp lịch (R, C, U, D). Bác sĩ và Y tá chỉ được xem (R) lịch hẹn của mình/bệnh nhân.
- **Hóa đơn & Viện phí:** Tiếp tân tạo và xử lý hóa đơn ban đầu (R, C, U). Kế toán chỉ có quyền xem và xuất báo cáo (R). Bác sĩ có thể xem (R) nhưng không được can thiệp vào hóa đơn.
- **Kho dược phẩm:** Y tá được phép tương tác với kho để xuất thuốc theo đơn (R, U). Kế toán có quyền vào kho để kiểm kê tài sản (R, U). Bác sĩ chỉ được xem (R) danh mục thuốc để biết tồn kho mà không được phép can thiệp.
