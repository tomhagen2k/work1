# Giao diện chung — mở game, Trang chủ, danh sách chương (để thiết kế lại)

Ảnh chụp từ demo v1.5 (đang làm, 20/10/2026), tiếng Việt, bằng Chrome ẩn. Tạo lại bằng:

```bash
node design_game/00_tong_quan/script_xuat/chup_giao_dien.mjs
```

- Thư mục gốc: khung **844×390** (máy chuẩn), ảnh nét ×2 = 1688×780.
- `khung_nho_667x375/`: cùng các ảnh ở khung nhỏ 667×375 (ảnh 1334×750). Demo thu nhỏ nguyên khung 844×390 cho vừa màn hình, nên có dải đen trên dưới.
- Tiến độ trong ảnh là **giả lập** (thắng 3★ các màn của chương đã chọn). Tên người chơi ngẫu nhiên.

## 01_mo_game — khi mở game

| Ảnh | Màn hình | Khi nào hiện | Hàm trong demo |
|---|---|---|---|
| `1_khoi_dong.png` | Khởi động: logo, tên game, thanh tải, mẹo ngẫu nhiên, câu miễn trừ hư cấu, số phiên bản | Mỗi lần mở game, khoảng 1,5 giây | `boot()` |
| `2_chon_ngon_ngu.png` | Chọn ngôn ngữ (Tiếng Việt / English) | Lần đầu | `openLang()` |
| `3_dong_y_dieu_khoan.png` | Đồng ý Điều khoản và Quyền riêng tư | Lần đầu | `openConsent()` |
| `4_luu_tien_trinh.png` | Liên kết Google Play Games / Game Center để lưu tiến trình (mô phỏng), nút "Để sau" | Lần đầu | `openLink()` |
| `5_khoi_dong_lan_sau.png` | Khởi động ở các lần mở sau, sau đó vào thẳng Trang chủ | Từ lần thứ hai | `boot()` |

Ghi chú: ở ảnh 2–4, phía sau hộp thoại đang là màn chơi Màn 1 làm mờ (đúng như demo hiện tại), chưa phải một nền riêng cho các bước lần đầu.

## 02_trang_chu — Trang chủ

| Ảnh | Trạng thái |
|---|---|
| `1_trang_chu_lan_dau.png` | Vừa qua các bước lần đầu: Chương 1, chưa có sao |
| `2_trang_chu_dang_choi_chuong_3.png` | Đã xong Chương 1–2, đang ở Chương 3 (nền đổi theo khung cảnh chương đang chơi) |
| `3_trang_chu_da_xong_het.png` | Đã xong cả 4 chương, nút chính đổi thành mở danh sách chương |

Thành phần: hồ sơ (tên, tổng sao); ví (kim cương, vật phẩm thêm giờ, nút +); Hộp thư, Cửa hàng, Cài đặt; cột trái Điểm danh, Nhiệm vụ, Thành tựu ("Sắp có"); cột phải Garage, Chương, Sự kiện ("Sắp có"); thẻ chương (sao, chấm 10 màn); nút **CHƠI** vào màn chưa qua đầu tiên. Đặc tả: `Game/Cau_Truc_Giao_Dien.md` (GD-01 → GD-13).

## 03_danh_sach_chuong — bản đồ chương (bấm "Chương" ở Trang chủ)

| Ảnh | Trạng thái |
|---|---|
| `1_chuong_1_chua_choi.png` … `4_chuong_4_chua_choi.png` | Chọn từng chương khi chưa chơi màn nào (nền là khung cảnh chương, đường leo 10 màn, cờ Về đích, hộp quà màn thưởng, thẻ màn bên phải) |
| `5_cuon_danh_sach_xuong_cuoi.png` | Cột chương cuộn xuống cuối để thấy Chương 4 (khung 844×390 chỉ chứa được khoảng 3 thẻ chương) |
| `6_dang_choi_chuong_3.png` | Đã xong Chương 1–2: thẻ chương có thanh tiến độ 30/30, Chương 3 đang chọn |
| `7_chuong_1_da_xong_chon_man_5.png` | Chương đã xong: màn có dấu ✓ và 3 sao, thẻ màn hiện kỷ lục |
| `8_chuong_1_chon_man_thuong.png` | Chọn màn thưởng kim cương (hộp quà sau cờ Về đích) |
| `9_buu_thiep_chuong_1.png` | Bưu thiếp toàn cảnh khi đã xong chương |
