# Quy trình quản lý phiên bản demo

| Thông tin | Nội dung |
|---|---|
| Ngày | 15/10/2026 |
| Quyết định | BA chốt PB-Q1 → Q8 (15/10/2026) |
| Áp dụng cho | `demo/index.html` (game demo) |

## 1. Nguyên tắc

| # | Nguyên tắc |
|---|---|
| R1 | **Bản đang làm luôn là `demo/index.html`.** Số phiên bản ghi ở góc trang chủ ("v1.0 · đang làm"). Mọi sửa đổi làm trực tiếp ở đây. |
| R2 | **Chỉ chốt khi BA nói "chốt phiên bản"** (hoặc "lưu bản này, sinh bản mới"). Bản đầu tiên được chốt là **v1.0**. |
| R3 | Chốt bản 1.3 → lưu `versions/v1.3/` (không sửa nữa) → `demo/index.html` thành **1.4 · đang làm**, nội dung y hệt 1.3. Muốn tăng số chính (1.x → 2.0) thì BA nói rõ. |
| R4 | **Bản lưu không sửa.** Ngoại lệ duy nhất do script tự làm: nhãn "bản lưu" và khóa lưu riêng (kỷ lục của bản lưu không lẫn với bản khác). |
| R5 | Trong lúc làm, Claude ghi dần các thay đổi vào mục "đang làm" của [CHANGELOG.md](CHANGELOG.md): Thêm / Thay đổi / Bỏ, mã quyết định D-xx, **vị trí code**. |
| R6 | Bản thử nhiều phương án để ở `mockups/` (vd `proto_trai_nghiem.html`); khi BA chốt thì gộp vào `demo/index.html`, không giữ hai bản chạy song song lâu dài. |
| R7 | Tài liệu yêu cầu vẫn tự đánh số phiên bản như cũ; mỗi bản lưu ghi rõ ứng với tài liệu bản nào và có bản sao tài liệu tại thời điểm chốt. |

## 2. Khi BA nói "chốt phiên bản"

Claude làm:

1. Rà lại mục "đang làm" trong CHANGELOG cho đầy đủ, viết dòng **Tóm tắt**.
2. Chạy:
   ```
   python tools/chot_phien_ban.py
   ```
   Script tự làm:
   - Sao chép `demo/index.html` → `versions/vX.Y/index.html` (đánh dấu bản lưu).
   - Sao chép tài liệu yêu cầu → `versions/vX.Y/tai_lieu/`.
   - Chụp **bộ ảnh chuẩn** (8 màn hình giống nhau ở mọi bản) → `versions/vX.Y/anh/`.
   - Chạy **bộ lái tự động** trên mọi màn → `versions/vX.Y/lai_tu_dong.txt`.
   - Đóng mục CHANGELOG, chép thành `versions/vX.Y/GHI_CHU.md`, mở mục bản mới.
   - Cập nhật danh sách cho trang `versions/index.html`.
   - Commit + gắn nhãn Git `demo-vX.Y`; đổi demo sang bản mới và commit tiếp.
3. Báo BA kết quả; **chỉ đẩy lên GitHub khi BA đồng ý** (`git push origin main --tags`).

Tùy chọn: `--thu` (chỉ in ra sẽ làm gì), `--lon` (tăng số chính), `--khong-git`.

## 3. Xem và so sánh

| Muốn | Mở |
|---|---|
| Danh sách mọi phiên bản, chơi bản bất kỳ | `versions/index.html` |
| Chơi hai bản cạnh nhau, cùng một màn | `versions/so_sanh.html` → chế độ **Chơi trực tiếp**, chọn màn hình (vd "Đang chơi · màn 4") |
| Xem ảnh chuẩn hai bản cạnh nhau | `versions/so_sanh.html` → chế độ **Ảnh chuẩn** |
| Đọc thay đổi của một bản | `versions/vX.Y/GHI_CHU.md` hoặc [CHANGELOG.md](CHANGELOG.md) |
| Chấm điểm trải nghiệm | [Danh_Gia_Trai_Nghiem.md](Danh_Gia_Trai_Nghiem.md) |

## 4. Lấy lại tính năng từ bản cũ

1. Tìm trong CHANGELOG bản nào có (hoặc bỏ) tính năng, và mục **Vị trí code** của bản đó.
2. Claude lấy code từ `versions/vX.Y/index.html` (hoặc nhãn Git `demo-vX.Y`) và gộp vào bản đang làm, ghi vào CHANGELOG mục "Thêm" kèm "lấy lại từ vX.Y".

## 5. Lưu ý

- Thư mục `versions/` mở trực tiếp bằng Chrome, không cần cài gì.
- Bộ ảnh chuẩn dùng các địa chỉ `#lv=…` của demo; nếu sau này đổi cách mở màn thì cập nhật danh sách `SHOTS` trong script và trang so sánh.
- Bộ lái tự động dùng luật chơi hiện tại; khi luật đổi (vd xe chờ xuất phát) cần cập nhật `level_design/autopilot.js`, nếu không file `lai_tu_dong.txt` sẽ báo không đạt hoặc lỗi.
