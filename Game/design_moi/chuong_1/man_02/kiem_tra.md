# Bảng Tự Kiểm Tra Màn 02 (Chương 1 — Làng Ven Sông)

- **Tên màn:** Nước giếng trong lành (`Fresh Spring Well`)
- **Tập tin đối chiếu:** `design/chuong_1/man_02/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_1/man_02/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_1/man_02/khung_canh_moi.png)

---

## 1. Đối chiếu Logic Màn Chơi (100% Theo du_lieu_man.json)

| Hạng mục kiểm tra | Theo `du_lieu_man.json` | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | 1950 × 1250 px (vùng chơi), chuẩn canvas mở rộng 2450 × 1750 px (`viewBox="-250 -250 2450 1750"`) | Đạt chuẩn 2450 × 1750 px, vùng chơi game giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 350 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 6 cột × 4 hàng nút, node spacing 350px. |
| **Vùng mở thông xe** | `[3, 2]` (Cột c0..c3, Hàng r0..r2) | Nút mở: i ≤ 3, j ≤ 2 | **ĐẠT** | 12 nút giao thông trong vùng mở, giữ nguyên cấu trúc mạng đường của làng. |
| **Số đoạn đường đã thông** | 17 đoạn đường thường đã thông | Đúng 17 đoạn đường đã thông | **ĐẠT** | Rộng 46px, mặt đường bê tông sạch đẹp, vạch trắng đứt rõ nét, lề cỏ hoa 54px. |
| **Số đoạn chưa thông xe** | 21 đoạn đường chưa thông xe | Đúng 21 đoạn đường đất mộc | **ĐẠT** | Lối mòn đất vàng phù sa nện chặt uốn lượn nhẹ qua đồng lúa, rào chắn sọc đỏ trắng ngăn ở các đầu nối. |
| **Số đoạn đường lớn (lon)** | 0 đoạn trong vùng mở | Nằm ngoài vùng mở | **ĐẠT** | Tuyến đường đê ven sông c5 nằm ở vùng đất tương lai. |
| **Kho: Hợp tác xã (HTX)** | `building: {x: 567, y: 490, w: 116, h: 58}`, `stop_xy: [625, 450]`, `pin_xy: [625, 522]`, `pin_color: #1c7ed6` | Nằm trọn trong ô building, ghim ▲ vuông xanh dương đúng tọa độ | **ĐẠT** | Mặt tiền quay ra đoạn c1r1–c2r1 (`on_road`), kho nông sản mái tôn xám, sân phơi thóc vàng ươm. |
| **Điểm giao: Chợ phiên** | `building: {x: 900, y: 8, w: 150, h: 60}`, `stop_xy: [975, 100]`, `pin_xy: [975, 50]`, `pin_color: #e64980` | Nằm trọn trong ô building, ghim ▼ tròn hồng đậm đúng tọa độ | **ĐẠT** | Mặt tiền quay ra đoạn c2r0–c3r0. **Đã hoàn thành xây dựng** với 3 mái lều bạt rực rỡ sắc màu (đỏ sọc trắng, vàng tươi, xanh ngọc). |
| **Điểm giao: Giếng làng** | `building: {x: 138, y: 565, w: 124, h: 120}`, `stop_xy: [100, 625]`, `pin_xy: [200, 631]`, `pin_color: #0ca678` | Nằm trọn trong ô building, ghim ▼ tròn xanh lục đúng tọa độ | **ĐẠT** | Mặt tiền quay ra phía tây đón đường c0r1–c0r2 (`on_road`). |
| **Công trình đang xây** | `construction_site: GiengLang` ("Giếng làng") | Thể hiện là giếng làng đang sửa | **ĐẠT** | Thành giếng đá ong đang tu bổ, giá cẩu gỗ 3 chân, xô vữa, khối đá ong xếp chồng và biển "Đang sửa giếng". |
| **Công trình đã hoàn thành** | `buildings_already_built: ["ChoPhien"]` | Chợ phiên hoàn thiện rực rỡ | **ĐẠT** | Hoàn thành từ Màn 01, chuyển từ công trường sang khu chợ khang trang sầm uất. |
| **Quy tắc N9 (Vật cản đường)**| Tuyệt đối không có vật trên mặt đường | 100% lòng đường thông thoáng | **ĐẠT** | Mọi sinh hoạt, trâu bò, rơm rạ, cây cối đều bố trí ven lề hoặc trong sân vườn. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật (Mục 1.2)

1. **Nhìn mờ (Blur / Squint Test) — 9.5/10:** Mạng đường sáng rõ, 3 điểm ghim (HTX, Chợ phiên, Giếng làng) nổi bật rực rỡ với màu xanh dương, hồng và xanh lục tách biệt hoàn toàn.
2. **Nhận diện (3-Second Recognition) — 10/10:** Cảnh quan thuần khiết làng quê sông nước Bắc Bộ: lều chợ sắc màu, giếng cổ rêu phong, ao sen nở thắm, lũy tre uốn quanh xóm nhỏ.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** Bảng màu ấm áp, hài hòa, không lạm dụng tương phản gắt. 60% nền đồng ruộng – 30% mái ngói đỏ au và sân gạch Bát Tràng – 10% sắc màu rực rỡ từ lều chợ và ghim nhiệm vụ.
4. **Tương phản & Đọc chữ — 10/10:** Nhãn chữ màu `#1e293b` viền trắng dày `4.5px` (`paint-order: stroke fill`) hiển thị cực kỳ sắc nét trên mọi bề mặt.
5. **Trải nghiệm máy thật (Mobile 844×390) — 9.5/10:** Độ chi tiết và độ mềm mại cao, cảm giác chơi êm đềm, thư thái đúng tinh thần game puzzle ấm cúng.
6. **Tiến triển Đầu / Cuối — 10/10:** Thể hiện rõ nét sự phát triển: Chợ phiên từ công trường dang dở ở màn 1 đã khánh thành rực rỡ ở màn 2; dân làng tiếp tục bắt tay vào tôn tạo Giếng làng.

**TỔNG KẾT MÀN 02: ĐẠT 9.8 / 10 — SẴN SÀNG DUYỆT.**
