# Danh sách Quy tắc nghiệp vụ (Business Rules)

**Bối cảnh hệ thống:** Thương mại điện tử (E-commerce)
**Tính năng:** Tích điểm và Phân hạng Thành viên

| Mã BR | Loại quy tắc | Mô tả quy tắc (Business Rule Description) | Thông báo lỗi (nếu vi phạm) |
| :--- | :--- | :--- | :--- |
| BR-01 | Công thức tính | Điểm thưởng được cộng = Phần nguyên của (Số tiền chi tiêu / 10.000 VNĐ). Phần tiền lẻ dưới 10.000 VNĐ không được làm tròn để tính điểm. | (Không áp dụng) |
| BR-02 | Ràng buộc logic | Khách hàng được xếp hạng "Vàng" khi tổng điểm tích lũy trong năm lớn hơn hoặc bằng 1.000 điểm. | (Không áp dụng) |
| BR-03 | Ràng buộc logic | Khách hàng được xếp hạng "Bạc" khi tổng điểm tích lũy trong năm lớn hơn hoặc bằng 500 điểm và nhỏ hơn 1.000 điểm. | (Không áp dụng) |
| BR-04 | Ràng buộc logic | Toàn bộ điểm tích lũy của khách hàng phải được tự động thiết lập lại về 0 vào ngày 31/12 hàng năm. | (Không áp dụng) |
| BR-05 | Công thức tính | Số tiền chiết khấu cho đơn hàng của thành viên hạng "Vàng" = Tổng giá trị hóa đơn x 5%. | (Không áp dụng) |
| BR-06 | Ràng buộc logic | Mức chiết khấu tối đa áp dụng cho một đơn hàng của thành viên hạng "Vàng" không được vượt quá 500.000 VNĐ. | "Mức giảm giá đã đạt giới hạn tối đa 500.000 VNĐ." (Hiển thị chú thích cho user) |
| BR-07 | Công thức tính | Số tiền chiết khấu cho đơn hàng của thành viên hạng "Bạc" = Tổng giá trị hóa đơn x 2%. | (Không áp dụng) |
