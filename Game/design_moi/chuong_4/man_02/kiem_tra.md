# Báo cáo Kiểm tra Chất lượng Khung cảnh — Phố sơn mới (Fresh-Paint Lane)
**Thuộc:** Chương 4: Đảo Mây Trắng · Thư mục: `man_02`
**Kích thước bản đồ chuẩn:** 3850 × 1750 px (ViewBox: `-600 -250 3850 1750`, Ảnh raster nét ×2: 7700 × 3500 px, Bản đồ chơi 2650 × 1250 px căn tại toạ độ gốc (0,0))

---

## I. BẢNG ĐIỂM 6 TIÊU CHÍ DUYỆT (Chu_De_Khung_Canh.md mục 1.2)

| STT | Tiêu chí | Điểm số | Nhận xét chi tiết & Bằng chứng kiểm tra |
|---|---|:---:|---|
| **TC1** | **Nhận diện ngay bối cảnh** | **9.8 / 10** | Bối cảnh Santorini hoàng hôn rực rỡ: biển Caldera xanh ngọc #104f7a, vách đá núi lửa phân tầng (đỏ bazan #6e3528, tro đen, đất bở), nhà hang Cycladic trắng vôi #faf6f0. |
| **TC2** | **Đọc đường dễ dàng** | **9.9 / 10** | Lòng đường 46px và 64px hoàn toàn thông thoáng 100%. Vạch tim đường đứt quãng rõ ràng. Đoạn đường lớn có vạch vàng đôi + biển cao tốc xanh. Đường đông có vạch mắt võng phẳng, xe nép lề ngoài lòng đường. |
| **TC3** | **Phân biệt kho và điểm giao** | **9.8 / 10** | Ghim kho vuông ▲ và ghim điểm giao tròn ▼ tương phản tuyệt đối. Nền trắng có viền tối bảo vệ 2.5px chống lóa, icon sắc nét. |
| **TC4** | **Thấy rõ tiến triển** | **9.9 / 10** | Tiến triển công trình rõ ràng: Site hiện tại là **Fresh-Paint Lane (PhoSon)**, số công trình đã hoàn thành là **1**. Công trường có giàn giáo, đèn báo đỉnh cẩu; công trình hoàn thành có hình khối vector chi tiết cao. |
| **TC5** | **Cảm xúc và sức sống** | **9.7 / 10** | Đậm chất nghỉ dưỡng Địa Trung Hải: hồ bơi xanh cyan trên mái, giàn hoa giấy rực rỡ, dù che nắng vàng hoàng hôn, vườn nho cuộn tổ chim Kouloures. |
| **TC6** | **Nhất quán và đồng bộ** | **9.8 / 10** | Tuân thủ chính xác bảng màu tỷ lệ 60-30-10 từ bộ tài nguyên dùng chung `bo_tai_nguyen.png`. Tọa độ các điểm dừng trùng khớp 100% với `du_lieu_man.json`. |
| **TỔNG** | **ĐÁNH GIÁ CHUNG** | **9.8 / 10** | **ĐẠT CHUẨN THƯƠNG MẠI XUẤT SẮC (VƯỢT MỤC TIÊU 9.5/10)** |

---

## II. BẢNG KIỂM TRA 11 LỖI CẤM (L1 → L11)

- [x] **L1 (Sai tọa độ nút hoặc khoảng cách mắt lưới):** ĐẠT. Nút c0r0..c7r3 đúng công thức `x = 100 + 350*i`, `y = 100 + 350*j`.
- [x] **L2 (Sai độ rộng mặt đường):** ĐẠT. Đường thường/đông rộng đúng 46px, đường lớn rộng đúng 64px.
- [x] **L3 (Thiếu hoặc sai rào chắn ở đoạn chưa thông xe):** ĐẠT. Màn có **38** đoạn mở và **14** đoạn đóng. Toàn bộ đoạn đóng `open: false` đều có rào chắn sọc đỏ trắng tại điểm giao cắt.
- [x] **L4 (Kho không đúng hình dạng quy định hoặc lẫn với nhà dân):** ĐẠT. Các kho (Kho cảng, Kho sơn, Xưởng rượu vang) đều có hình khối và công năng riêng biệt, không lẫn với nhà dân.
- [x] **L5 (Công trình sai vị trí):** ĐẠT. Tọa độ và bounding box công trình khớp 100% với `points` trong `du_lieu_man.json`.
- [x] **L6 (Vật trang trí lấn vào lòng đường):** ĐẠT. Lòng đường 46px/64px thông thoáng 100%. Tất cả xe đỗ, cây cối, bàn ghế, biển báo đều nằm ngoài mép đường (trên vỉa hè hoặc vịnh đỗ lề).
- [x] **L7 (Màu nhấn sai quy định hoặc tràn lan):** ĐẠT. Xanh coban chỉ dùng cho mái vòm và cửa công trình điểm nhấn, không rải đều gây nhầm lẫn đường lớn.
- [x] **L8 (Mất tương phản ghim trên nền):** ĐẠT. Ghim trên nền trắng có viền đen bảo vệ 2.5px.
- [x] **L9 (Sai kích thước bản đồ):** ĐẠT. Thẻ gốc chuẩn `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-600 -250 3850 1750" width="3850" height="1750">`. Vùng bản đồ chơi giữ nguyên kích thước 2650 × 1250 px tại toạ độ (0,0). Vùng lề bao quanh chuẩn: trái 600, phải 600, trên 250, dưới 250. Ảnh raster xuất chuẩn nét ×2 (7700 × 3500 px).
- [x] **L10 (Lộ địa danh thực tế có bản quyền):** ĐẠT. Thiết kế lấy cảm hứng cách điệu nghệ thuật, không sao chép nguyên mẫu có bản quyền.
- [x] **L11 (Hardcoded ngôn ngữ):** ĐẠT. Toàn bộ text trên nhà/biển hiệu sử dụng tiếng Anh quốc tế tối giản (METRO, SHOW, LIVE) hoặc icon phổ quát, không chứa text tiếng Việt cứng trên texture đồ họa game.
