# Báo cáo kiểm thử: Chương 1 dùng khung cảnh mới (D-77)

| Mục | Nội dung |
|---|---|
| Ngày | 18/10/2026 |
| Bản kiểm | `demo/index.html` (v1.4 · đang làm), cảnh lấy từ `demo/canh/c1_*.webp` |
| Nguồn ảnh | `design_moi/chuong_1/man_01 … man_thuong/khung_canh_moi.svg`, khổ 3150×1750 |
| Mở xem | `http://localhost:8765/demo/index.html#lv=1` (1 → 10; `#lv=21` là màn thưởng). Thêm `&play` để vào chơi ngay, `&win` để xem cảnh quay, `&canh=cu` để xem cảnh cũ |

## 1. Kiểm tra ảnh thiết kế trước khi đưa vào

| Kiểm tra | Kết quả |
|---|---|
| Khổ `viewBox` của 11 tệp | ✅ `-600 -250 3150 1750` |
| Đường đã thông, đường lớn, đoạn chưa thông | ✅ Khớp dữ liệu màn ở 11/11 màn |
| Ghim: vị trí, ký hiệu, màu | ✅ 11/11 màn |
| Vật đè lên mặt đường | ✅ Không có |
| Vùng đã duyệt (2450×1750) so với ảnh trước | ✅ Không đổi. Chỉ lệch rất nhẹ ở mép hình do trình duyệt vẽ lại; riêng màn thưởng chữ "HỘI CHỢ VÀNG" khác vài điểm ảnh, mắt không thấy được |
| Lề mới trái và phải ở 11 màn | ✅ **Giống hệt nhau**, nên cảnh quay không bị nháy |

## 2. Kiểm thử trong game

| # | Kiểm tra | Kết quả |
|---|---|---|
| T1 | Logic cả 22 màn (nút, đường, loại đường, vùng thông xe, điểm, nhiệm vụ, thời gian, xuất phát, kim cương, ô công trình) so với bản trước khi sửa | ✅ **Giống hệt từng ký tự** |
| T2 | Mỗi màn dùng đúng ảnh, ảnh tải được | ✅ 11/11 màn, 0 ảnh lỗi |
| T3 | Ghim kiểu B đủ số điểm | ✅ 3, 3, 4, 4, 4, 5, 5, 5, 5, 6 ghim; màn thưởng không có ghim |
| T4 | Bản đồ lớn thu nhỏ hết cỡ | ✅ Hai bên đã có cảnh thật, không còn dải trống. Khung nhìn rộng tới x = −690 (lệch trái do chừa chỗ cho nút giao diện), vượt ảnh 90 px; phần này được soi gương nên liền mạch |
| T5 | Cảnh quay sau màn 1 → 10 | ✅ Cả 10 cảnh: công trình nảy lên, kết thúc đúng ảnh màn sau. Màn 10 kết thúc bằng ảnh màn thưởng |
| T6 | Cảnh kết chương, bưu thiếp, trang chủ | ✅ Dùng ảnh mới theo tiến độ |
| T7 | 4 cỡ máy: iPhone SE, Android, iPhone Pro Max, iPad | ✅ Hiển thị đúng (iPad vẫn có viền như trước, không đổi trong lần này) |
| T8 | Tiếng Anh | ✅ Nhãn ghim: Co-op, Market Square, Upper Hamlet, Village School |
| T9 | Lỗi JavaScript trong suốt quá trình kiểm | ✅ Không có lỗi nào |
| T10 | Hiệu năng (màn 5) | ✅ Lái xe 60 khung/giây; dựng màn 0,4 ms; 32 phần tử vẽ (cảnh cũ khoảng 15.500) |

Ảnh chụp đều nằm trong thư mục này:
- `man_XX_1_chuan_bi.png`, `man_XX_2_dang_lai.png`, `man_XX_3_ban_do_lon_thu_nho.png`
- `canh_quay_man_XX_*.png`
- `trang_chu_*.png`, `buu_thiep.png`
- `may_*.png`, `tieng_anh_man_03.png`

## 3. Còn để ngỏ
- **Bộ nhớ trên điện thoại:** một ảnh 6300×3500 khi mở ra tốn khoảng 88 MB RAM. Trình duyệt máy tính không có vấn đề gì. Khi làm ứng dụng thật nên chia ảnh thành ô hoặc giảm độ nét xuống ×1,6 (xem De_Xuat_Cong_Nghe_Mobile.md).
- **Lỗi cũ của bộ vẽ cảnh Chương 2:** không xóa cảnh của màn trước khi mở màn mới (TH-Q3). Chương 1 đã hết lỗi này vì dùng bộ vẽ mới. Chương 2 sẽ hết khi chuyển sang ảnh.
- **Chương 2:** ảnh đã có, sẽ làm theo đúng cách của Chương 1.
