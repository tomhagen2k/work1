# Báo cáo kiểm thử: Chương 2 dùng khung cảnh mới (D-77)

| Mục | Nội dung |
|---|---|
| Ngày | 18/10/2026 (chạy lại sau khi BA cập nhật ảnh màn 7 → thưởng) |
| Bản kiểm | `demo/index.html` (v1.4 · đang làm), cảnh lấy từ `demo/canh/c2_*.webp` |
| Nguồn ảnh | `design_moi/chuong_2/man_01 … man_thuong/khung_canh_moi.svg`, khổ 3500×1750 |
| Mở xem | `http://localhost:8765/demo/index.html#lv=11` (11 → 20 là màn 1 → 10; `#lv=22` là màn thưởng). Thêm `&play`, `&win`, hoặc `&canh=cu` để xem cảnh cũ |

## 1. Kiểm tra ảnh thiết kế

| Kiểm tra | Kết quả |
|---|---|
| Khổ `viewBox` của 11 tệp | ✅ `-600 -250 3500 1750` |
| Đường đã thông, đại lộ, đoạn chưa thông (rộng 34 px) | ✅ Khớp dữ liệu màn ở 11/11 màn |
| Ghim: vị trí, ký hiệu, màu | ✅ 11/11 màn |
| Vật đè lên mặt đường | ✅ Không có. Dải xanh giữa đại lộ là dải phân cách do thiết kế vẽ |
| Lề trái và lề trên giống nhau ở mọi màn | ✅ |
| Lề dưới và lề phải | ✅ Đã sửa ở bản ảnh cập nhật (màn 7 → thưởng, 18/10 tối): lề phải và lề dưới khớp màn 1–6. Mép hồ phía Đông và vài cây ở dải phía Nam đã chỉnh. Chỉ còn một vệt cao 3 px sát mép Nhà văn hóa (công trình xây ở màn 7), nằm ngay mép bản đồ, mắt không thấy |

## 2. Kiểm thử trong game

| # | Kiểm tra | Kết quả |
|---|---|---|
| T1 | Logic cả 22 màn so với bản trước khi đổi khung cảnh | ✅ **Giống hệt từng ký tự** |
| T2 | Mỗi màn dùng đúng ảnh, ảnh tải được | ✅ 11/11 màn, 0 ảnh lỗi |
| T3 | Ghim kiểu B đủ số điểm | ✅ 5, 5, 5, 6, 6, 5, 6, 7, 7, 8 ghim; màn thưởng không có ghim |
| T4 | Bản đồ lớn thu nhỏ hết cỡ | ✅ Hai bên có cảnh thật. Từ màn 8 khung nhìn vượt mép trái ảnh 11 px; phần này được soi gương nên liền mạch |
| T5 | Cảnh quay sau màn 1 → 10 | ✅ Cả 10 cảnh: công trình nảy lên, kết thúc đúng ảnh màn sau. Màn 10 kết thúc bằng ảnh màn thưởng |
| T6 | Cảnh kết chương, bưu thiếp, trang chủ | ✅ Dùng ảnh mới |
| T7 | 4 cỡ máy | ✅ Hiển thị đúng |
| T8 | Tiếng Anh | ✅ Nhãn ghim: Supply Yard, Main Depot, School, Site Office, Apartments A |
| T9 | Lỗi JavaScript | ✅ Không có lỗi nào |
| T10 | Hiệu năng (màn 5) | ✅ Lái xe 60 khung/giây; dựng màn 0,6 ms; 40 phần tử vẽ (cảnh cũ khoảng 15.200) |

Ảnh chụp từng màn, cảnh quay, trang chủ, bưu thiếp, các cỡ máy và tiếng Anh đều nằm trong thư mục này.

## 3. Ghi chú
- Lỗi cũ "cảnh màn trước không được xóa" của bộ vẽ Chương 2 không còn xảy ra, vì Chương 2 đã dùng bộ vẽ ảnh. Bộ vẽ cũ chỉ chạy khi mở `#canh=cu`.
- Bộ nhớ trên điện thoại: mỗi ảnh 7000×3500 khi mở ra tốn khoảng 98 MB RAM. Trình duyệt máy tính không có vấn đề gì; khi làm ứng dụng thật cần chia ảnh thành ô.
