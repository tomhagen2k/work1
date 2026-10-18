# design_game — Bộ hồ sơ khung cảnh Chương 1 & 2 (Little Routes)

Bản sao để giao cho AI hoặc người thiết kế **phân tích và vẽ lại khung cảnh** cho đẹp hơn mà **không đổi logic màn**.
Tất cả ở đây là bản chụp và bản sao từ `Game/` (demo v1.4, ngày 17/10/2026). Bản gốc trong `Game/` không bị sửa hay xóa.

**Đọc trước:** [PROMPT_cho_AI.md](PROMPT_cho_AI.md) — prompt dán cho AI, kèm luật bắt buộc giữ.
**Vòng 2 (chuyển sang code):** [PROMPT_chuyen_sang_code.md](PROMPT_chuyen_sang_code.md).

## Cấu trúc

```
design_game/
├── README.md                     ← tệp này
├── PROMPT_cho_AI.md              ← prompt giao việc cho AI
├── xem_tat_ca.html               ← mở bằng trình duyệt để lướt toàn bộ ảnh
├── 00_tong_quan/
│   ├── quy_uoc_chung.json        ← loại đường (tên, hệ số tốc độ, màu mini map), xe, khoảng cách nút 350px, khung 844×390
│   ├── tai_lieu/                 ← bản sao tài liệu thiết kế
│   │   ├── Chu_De_Khung_Canh.md      (nguyên tắc N1–N9, cách vẽ 5 loại đường, bảng màu từng chương — QUAN TRỌNG)
│   │   ├── Thiet_Ke_Chuong_1.md, Thiet_Ke_Chuong_2.md   (thiết kế màn, tiến triển công trình)
│   │   ├── Khung_Do_Kho_Chuong_Man.md, Danh_Gia_Hinh_Anh_Tien_Trien_Man.md
│   │   └── Mo_Ta_Yeu_Cau_MVP.md      (tài liệu yêu cầu đầy đủ)
│   └── ma_nguon_demo/index.html  ← bản sao mã demo (hàm vẽ cảnh: drawVillage = Chương 1, drawUrban = Chương 2)
├── chuong_1/  (Làng ven sông — bản đồ 1950×1250 px, lưới 6×4 nút)
│   ├── du_lieu_tat_ca_man.json   ← dữ liệu 11 màn gộp
│   ├── 00_tong_quan_chuong/      ← bản đồ chương lúc bắt đầu, lúc hoàn thành, bưu thiếp toàn cảnh
│   ├── man_01 … man_10/          ← 10 màn chính
│   └── man_thuong/               ← màn thưởng kim cương (bản đồ hoàn thiện)
└── chuong_2/  (Khu đô thị mới — bản đồ 2300×1250 px, lưới 7×4 nút) — cấu trúc như chuong_1
```

## Trong mỗi thư mục màn

| Tệp | Là gì | Kích thước |
|---|---|---|
| `1_man_chuan_bi.png` | Màn chuẩn bị: toàn bản đồ, ghim, tên điểm, nhiệm vụ ghi dưới điểm giao, chú giải loại đường | 1688×780 (khung game 844×390 ×2) |
| `2_dang_choi.png` | Góc nhìn khi lái xe (camera gần, giao diện chơi) | 1688×780 |
| `3_ban_do_lon_khi_choi.png` | Bản đồ lớn mở trong lúc chơi | 1688×780 |
| `4_ban_do_co_ghim.svg` / `.png` | **Bản vẽ gốc của khung cảnh** (vector, đúng tọa độ game), có ghim và nhãn điểm | 1950×1250 (Ch.1) · 2300×1250 (Ch.2) |
| `5_khung_canh_khong_ghim.png` | Cùng bản vẽ, ẩn ghim và nhãn (chỉ cảnh + đường) — nền để vẽ lại | như trên |
| `du_lieu_man.json` | **Logic màn**: nút, đoạn đường (loại, đã thông / chưa thông), điểm kho và điểm giao (tọa độ điểm dừng, ô công trình, ghim), nhiệm vụ, công trình đang xây, công trình đã xây, thời gian | — |

Muốn có SVG không ghim: mở `4_ban_do_co_ghim.svg`, đổi `style="--pin:1"` ở thẻ `<svg>` thành `--pin:0`.

## Cách tạo lại bộ này

Script xuất (đọc demo, không sửa demo): chạy Chrome ẩn, gọi các hàm của game để dựng từng màn, chụp ảnh và trích dữ liệu. Nếu demo thay đổi, nhờ Claude chạy lại để cập nhật.
