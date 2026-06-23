# Danh sách Quy tắc nghiệp vụ (Business Rules)

**Bối cảnh hệ thống:** Đặt vé máy bay trực tuyến (OTA System)
**Tính năng:** Định giá Vé máy bay và Hoàn/Hủy vé

| Mã BR | Loại quy tắc | Mô tả quy tắc (Business Rule Description) | Thông báo lỗi (nếu vi phạm) |
| :--- | :--- | :--- | :--- |
| BR-01 | Công thức tính | Giá vé hiển thị cho người dùng = Giá vé Net + Thuế sân bay + Phí dịch vụ hệ thống. | (Không áp dụng) |
| BR-02 | Ràng buộc logic | Thuế sân bay là khoản phí bắt buộc và được ấn định cố định ở mức 120.000 VNĐ/vé đối với hành khách từ 2 tuổi trở lên. | (Không áp dụng) |
| BR-03 | Công thức tính | Phí dịch vụ hệ thống = 50.000 VNĐ/vé nếu thời điểm đặt vé cách ngày khởi hành lớn hơn 7 ngày. | (Không áp dụng) |
| BR-04 | Công thức tính | Phí dịch vụ hệ thống = 90.000 VNĐ/vé nếu thời điểm đặt vé cách ngày khởi hành nhỏ hơn hoặc bằng 7 ngày (đặt cận ngày). | (Không áp dụng) |
| BR-05 | Ràng buộc logic | Vé hạng Thương gia (Business) được phép hoàn/hủy vé miễn phí nếu yêu cầu được thực hiện trước giờ khởi hành tối thiểu 24 tiếng. | "Đã quá thời hạn hoàn/hủy vé miễn phí." |
| BR-06 | Công thức tính | Phí hoàn/hủy vé hạng Thương gia (Business) = 20% x Giá vé Net, áp dụng nếu yêu cầu hủy được thực hiện trong vòng 24 tiếng trước giờ khởi hành. | (Không áp dụng) |
| BR-07 | Ràng buộc logic | Vé hạng Phổ thông (Economy) tuyệt đối không được phép hoàn/hủy vé dưới mọi hình thức. | "Vé hạng Phổ thông không hỗ trợ hoàn/hủy vé." |
| BR-08 | Ràng buộc logic | Vé hạng Phổ thông (Economy) chỉ được phép đổi ngày bay nếu yêu cầu được thực hiện trước giờ khởi hành tối thiểu 12 tiếng. | "Đã quá thời hạn cho phép đổi ngày bay (phải trước 12 tiếng)." |
| BR-09 | Công thức tính | Tổng phí đổi ngày bay đối với vé hạng Phổ thông (Economy) = 350.000 VNĐ + Chênh lệch giá vé mới (nếu có). | (Không áp dụng) |
| BR-10 | Ràng buộc logic | Trẻ em dưới 2 tuổi không được tính ghế ngồi riêng trên chuyến bay. | (Không áp dụng) |
| BR-11 | Công thức tính | Giá vé Net áp dụng cho trẻ em dưới 2 tuổi = 10% x Giá vé Net của người lớn. | (Không áp dụng) |
| BR-12 | Ràng buộc logic | Hành khách là trẻ em dưới 2 tuổi được miễn phí toàn bộ Thuế sân bay (Thuế sân bay = 0). | (Không áp dụng) |
