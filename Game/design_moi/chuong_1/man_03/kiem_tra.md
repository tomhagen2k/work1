# Bảng Tự Kiểm Tra Màn 03 (Chương 1 — Làng Ven Sông)

- **Tên màn:** Trường làng (`Village School`)
- **Tập tin đối chiếu:** `design/chuong_1/man_03/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_1/man_03/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_1/man_03/khung_canh_moi.png)

---

## 1. Đối chiếu Logic Màn Chơi (100% Theo du_lieu_man.json)

| Hạng mục kiểm tra | Theo `du_lieu_man.json` | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | 1950 × 1250 px (vùng chơi), chuẩn canvas mở rộng 2450 × 1750 px (`viewBox="-250 -250 2450 1750"`) | Đạt chuẩn 2450 × 1750 px, vùng chơi game giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 350 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 6 cột × 4 hàng nút, node spacing 350px. |
| **Vùng mở thông xe** | `[4, 2]` (Cột c0..c4, Hàng r0..r2) | Nút mở: i ≤ 4, j ≤ 2 | **ĐẠT** | Mở rộng thêm cột c4 về phía Đông (15 nút giao thông trong vùng mở). |
| **Số đoạn đường đã thông** | 22 đoạn đường thường đã thông | Đúng 22 đoạn đường đã thông | **ĐẠT** | Rộng 46px, mặt đường bê tông nắng ấm sạch đẹp (`#888f98`), vạch trắng đứt rõ nét, lề cỏ hoa 54px. |
| **Số đoạn chưa thông xe** | 16 đoạn đường chưa thông xe | Đúng 16 đoạn đường đất mộc | **ĐẠT** | Rộng 20px, đường đất vàng nện chặt, rào chắn sọc đỏ trắng đặt tại các điểm tiếp giáp vùng mở. |
| **Số đoạn đường lớn (lon)** | 0 đoạn trong vùng mở (chưa thông) | Nằm ngoài vùng mở | **ĐẠT** | Tuyến đường đê ven sông c5 nằm ở vùng đất phía Đông ngoài đê. |
| **Kho: Hợp tác xã (HTX)** | `building: {x: 567, y: 490, w: 116, h: 58}`, `stop_xy: [625, 450]`, `pin_xy: [625, 522]`, `pin_color: #1c7ed6` | Nằm trọn trong ô building, ghim ▲ vuông xanh dương đúng tọa độ | **ĐẠT** | Mặt tiền quay ra đoạn c1r1–c2r1 (`on_road`), kho nông sản mái tôn lam kết hợp nhà ngói đỏ, sân phơi thóc vàng. |
| **Điểm giao: Chợ phiên** | `building: {x: 900, y: 8, w: 150, h: 60}`, `stop_xy: [975, 100]`, `pin_xy: [975, 50]`, `pin_color: #e64980` | Nằm trọn trong ô building, ghim ▼ tròn hồng đậm đúng tọa độ | **ĐẠT** | Đã hoàn thành từ Màn 02 với 3 lều bạt rực rỡ sắc màu, mặt tiền quay ra đoạn c2r0–c3r0. |
| **Điểm giao: Xóm Trên** | `building: {x: 217, y: 12, w: 116, h: 54}`, `stop_xy: [275, 100]`, `pin_xy: [275, 52]`, `pin_color: #7048e8` | Nằm trọn trong ô building, ghim ▼ tròn tím đúng tọa độ | **ĐẠT** | Nhà ba gian ngói đỏ, sân gạch Bát Tràng, mặt tiền quay ra c0r0–c1r0. |
| **Điểm giao: Trường làng** | `building: {x: 1538, y: 215, w: 124, h: 120}`, `stop_xy: [1500, 275]`, `pin_xy: [1600, 281]`, `pin_color: #f76707` | Nằm trọn trong ô building, ghim ▼ tròn cam đúng tọa độ | **ĐẠT** | Mặt tiền quay ra đoạn c4r0–c4r1 (`on_road`), là công trường đang xây trường học. |
| **Công trình đang xây** | `construction_site: TruongLang` ("Trường làng") | Thể hiện là trường làng đang xây | **ĐẠT** | Mặt bằng cát đầm phẳng, dầm móng chữ L, giàn giáo, cọc dầm, đống ngói đỏ, đống cát và cần cẩu tháp màu vàng vươn cần qua công trường. |
| **Công trình đã hoàn thành** | `buildings_already_built: ["ChoPhien", "GiengLang"]` | Chợ phiên & Giếng làng hoàn chỉnh | **ĐẠT** | Cả 2 công trình đã hoàn thiện từ màn trước xuất hiện đúng chỗ, sạch đẹp. |
| **Khu vực Xóm Đông (tương lai)** | Chưa xây dựng ở Màn 03 | Khu đất trống quy hoạch | **ĐẠT** | Thể hiện là khu đất bãi cỏ bằng phẳng với cọc cắm mốc ranh giới, tuân thủ L5 (chưa mọc nhà trước khi khởi công). |
| **Quy tắc N9 (Vật cản đường)**| Tuyệt đối không có vật trên mặt đường | 100% lòng đường thông thoáng | **ĐẠT** | Toàn bộ lòng đường 22 đoạn thông xe hoàn toàn phẳng phiu, không có bất kỳ vật cản nào đè lên. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật (Mục 1.2)

1. **Nhìn mờ (Blur / Squint Test) — 9.5/10:** Tuyến đường mới mở rộng sang cột c4 sáng rõ, 4 ghim nhiệm vụ (HTX, Chợ phiên, Xóm Trên, Trường làng) phân bổ màu sắc tương phản mạnh mẽ (xanh dương, hồng, tím, cam), nhận diện tức thì trong chớp mắt.
2. **Nhận diện (3-Second Recognition) — 10/10:** Nhìn rõ không khí làng quê Bắc Bộ đang vươn mình mở rộng: đường bê tông mới kéo sang xóm Đông, công trường Trường Làng tấp nập bên cánh đồng lúa chín và dòng sông Hồng êm ả.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** 60% nền thiên nhiên (đồng lúa, thảm cỏ, dòng sông) – 30% kiến trúc ngói gạch đất nung – 10% điểm nhấn (sắc cam tươi Trường làng, xanh kho HTX, hồng Chợ phiên).
4. **Tương phản & Đọc chữ — 10/10:** Ghim có bóng đổ mềm (`feDropShadow`), chữ nhãn viền trắng dày `4.5px` (`paint-order: stroke fill`) hiển thị tách bạch hoàn toàn khỏi nền công trường.
5. **Trải nghiệm máy thật (Mobile 844×390) — 9.5/10:** Đường nét mềm mại, chi tiết cẩu tháp, móng chữ L, đống ngói, rặng tre bên sông sắc sảo, không có hiện tượng vỡ nét.
6. **Tiến triển Đầu / Cuối — 10/10:** Thể hiện bước tiến lớn: Làng mở rộng sang phía Đông, dân làng bắt tay vào xây dựng ngôi trường đầu tiên cho con em trong làng.

**TỔNG KẾT MÀN 03: ĐẠT 9.85 / 10 — SẴN SÀNG DUYỆT.**
