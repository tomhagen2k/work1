# Bản thử: đưa thiết kế mới vào game bằng code — Chương 1, màn 1–4

| Mục | Nội dung |
|---|---|
| Ngày | 18/10/2026 |
| Mở bản thử | `design_moi/thu_nghiem_code/index.html#lv=1` (đổi số 1 → 4). Thêm `&canh=cu` để xem cảnh cũ so sánh. Màn 5 trở đi vẫn dùng cảnh cũ |
| Bản gốc | `demo/index.html` **không bị sửa** |
| Tệp | `canh_c1.js` (dữ liệu cảnh, 338 KB, nén 43 KB) · `tao_ban_thu.py` (tạo bản thử từ demo) · `../../tools/chuyen_design.py` (chuyển SVG → dữ liệu) · `kiem_thu/` (ảnh chụp) |

## 1. Cách làm
1. `tools/chuyen_design.py` đọc `khung_canh_moi.svg` của 4 màn và gộp thành **một danh sách 298 nhóm hình**. Mỗi nhóm ghi lại nó có mặt ở màn nào. Màn 1 và màn 4 dùng chung 255 nhóm.
2. Bộ vẽ mới `dsnDraw` ghép đúng các nhóm của màn đang chơi. Ghim và nhãn được vẽ đúng kiểu thiết kế, nhưng tên điểm vẫn theo ngôn ngữ đang chọn.
3. **Cảnh quay sau khi thắng:**
   - nhóm hình mới nằm trong ô công trình vừa xây sẽ **nảy** lên;
   - nhóm hình mới ở chỗ khác sẽ **mọc** lên;
   - đường mới thông xuất hiện ở bước "thông đường".

## 2. Kết quả kiểm thử

| # | Kiểm tra | Kết quả |
|---|---|---|
| T1 | Logic: nút, đường, điểm, nhiệm vụ, thời gian, vùng thông xe, ô công trình, vị trí ghim. So màn 1–4, màn thưởng và toàn bộ 22 màn với bản gốc | ✅ **Giống hệt từng ký tự** |
| — | Ghép lại từng màn từ dữ liệu so với SVG thiết kế | ✅ Khớp 100% từng ký tự (công cụ tự kiểm) |
| T3 | **Điểm ảnh:** cảnh trong game so với SVG thiết kế, cùng trình duyệt vẽ, khổ 2450×1750 | ✅ **Phần bản đồ người chơi nhìn thấy (1950×1250): 0 điểm ảnh khác ở cả 4 màn.** Chỉ có 14–34 điểm lệch 1–5/255 độ sáng, đều nằm ở **lề ngoài bản đồ** mà camera không tới. Mắt không nhận ra được |
| T5 | Ghim và nhãn so với `khung_canh_moi_co_ghim.svg` | ✅ 0 điểm ảnh khác thêm. Hình, màu, viền, bóng, chữ của ghim và nhãn trùng với thiết kế |
| T7 | Cảnh quay thắng màn 1→2, 2→3, 3→4: khung cuối so với thiết kế màn sau | ✅ 0 điểm ảnh khác trong bản đồ. Ảnh các khung giữa: `kiem_thu/canh_quay_man_0X_t*.png` |
| T6 | Màn chuẩn bị, đang lái, bản đồ lớn; 4 cỡ máy (iPhone SE, Android, iPhone Pro Max, iPad) | ✅ Hiển thị đúng, không vỡ hình (`kiem_thu/`) |
| T9 | Thời gian dựng màn | ✅ 5–6 ms (cảnh cũ: 5 ms) |
| T9 | **Độ mượt khi lái** (trình duyệt máy tính, không có card đồ họa) | ⚠️ **Cảnh mới khoảng 40 khung/giây, cảnh cũ 60.** Nguyên nhân: mỗi màn có **67 hiệu ứng bóng đổ** (filter), trình duyệt phải vẽ lại mỗi khi camera di chuyển |
| T9 | Thử chụp cảnh thành ảnh khi vào màn | ✅ **60 khung/giây**, vào màn chậm thêm 0,1–0,3 giây, nhìn vẫn như cũ |

## 3. Phát hiện thêm
- **Lỗi có sẵn trong demo:** bộ vẽ cảnh cũ (Chương 1 và 2) **không xóa cảnh của màn trước** khi mở màn mới. Cảnh cũ chồng bên dưới nên số hình vẽ tăng dần trong một phiên chơi (đo được 13.000–23.000 hình). Bộ vẽ mới đã tự xóa. Nên sửa cả trong demo; chỉ cần sửa 1 dòng.
- Chú giải "Chưa thông xe" ở màn chuẩn bị vẫn dùng màu đường đất cũ. Nên đổi sang màu đường đất của thiết kế (`#d4b486`).
- Mini map và ký hiệu trên bản đồ lớn vẫn là ký hiệu của game, cỡ cố định. Đây là chủ ý thiết kế cũ (D-33), không thuộc khung cảnh.

## 4. Câu hỏi cần BA chốt

| ID | Câu hỏi | Đề xuất |
|---|---|---|
| TH-Q1 | Cách đưa thiết kế vào game như bản thử có đạt yêu cầu không? | Đạt: giống từng điểm ảnh, giữ logic, giữ cảnh quay |
| TH-Q2 | Xử lý độ mượt (67 bóng đổ mỗi màn) | **Chụp cảnh thành ảnh khi vào màn** (60 khung/giây, nhìn như cũ). Cảnh quay vẫn dùng hình vẽ trực tiếp để nhà mọc và công trình nảy. Không bỏ bóng đổ |
| TH-Q3 | Sửa lỗi cảnh cũ không được xóa khi mở màn mới trong demo | Sửa |
| TH-Q4 | Làm tiếp màn 5–10 và màn thưởng Chương 1, rồi Chương 2 | Làm theo đúng cách này, kèm kiểm thử T1–T10 cho từng màn |
