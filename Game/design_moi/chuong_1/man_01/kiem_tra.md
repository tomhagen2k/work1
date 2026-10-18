# Bảng Tự Kiểm Tra Màn 01 (Chương 1 — Làng Ven Sông)

- **Tên màn:** Ngày đầu đi giao (`First Day on the Job`)
- **Tập tin đối chiếu:** `design/chuong_1/man_01/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_1/man_01/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_1/man_01/khung_canh_moi.png)

---

## 1. Đối chiếu Logic Màn Chơi (100% Theo du_lieu_man.json)

| Hạng mục kiểm tra | Theo `du_lieu_man.json` | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | 1950 × 1250 px (vùng chơi), chuẩn canvas mở rộng 2450 × 1750 px (`viewBox="-250 -250 2450 1750"`) | Đạt chuẩn 2450 × 1750 px, vùng chơi game giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 350 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 6 cột × 4 hàng nút, node spacing 350px. |
| **Vùng mở thông xe** | `[3, 2]` (Cột c0..c3, Hàng r0..r2) | Nút mở: i ≤ 3, j ≤ 2 | **ĐẠT** | 12 nút giao thông trong vùng mở, xung quanh là đồng quê thiên nhiên thanh bình. |
| **Số đoạn đường đã thông** | 17 đoạn đường thường đã thông | Đúng 17 đoạn đường đã thông | **ĐẠT** | Rộng 46px, mặt đường bê tông nắng ấm sạch đẹp (`#888f98`), vạch trắng đứt rõ nét, lề cỏ hoa 54px. |
| **Số đoạn chưa thông xe** | 21 đoạn đường chưa thông xe | Đúng 21 đoạn đường đất mộc | **ĐẠT** | Rộng 20px, lối mòn đất vàng phù sa nện chặt uốn lượn nhẹ qua đồng lúa, rào chắn sọc đỏ trắng ngăn ở các đầu nối. |
| **Số đoạn đường lớn (lon)** | 0 đoạn trong vùng mở (mở ở M8) | Nằm ngoài vùng mở | **ĐẠT** | Tuyến đường đê ven sông c5 nằm ở vùng đất tương lai. |
| **Vị trí xuất phát xe** | Đoạn c0r1–c1r1, fraction 0.114 | Đoạn c0r1–c1r1 thông suốt | **ĐẠT** | Mặt đường bằng phẳng, không có bất kỳ vật cản nào (L6, N9). |
| **Kho: Hợp tác xã (HTX)** | `building: {x: 567, y: 490, w: 116, h: 58}`, `stop_xy: [625, 450]`, `pin_xy: [625, 522]`, `pin_color: #1c7ed6` | Nằm trọn trong ô building, ghim ▲ vuông xanh dương đúng tọa độ | **ĐẠT** | Mặt tiền quay ra đoạn c1r1–c2r1 (`on_road`), nhà kho ngói đỏ kết hợp nhà vòm tôn lam ghi, sân phơi thóc vàng ươm. |
| **Điểm giao: Xóm Trên** | `building: {x: 217, y: 12, w: 116, h: 54}`, `stop_xy: [275, 100]`, `pin_xy: [275, 52]`, `pin_color: #7048e8` | Nằm trọn trong ô building, ghim ▼ tròn tím đúng tọa độ | **ĐẠT** | Mặt tiền quay ra phía nam đón đường c0r0–c1r0, nhà ba gian mái ngói đỏ viền trắng, sân gạch Bát Tràng, chum nước vại sành. |
| **Điểm giao: Chợ phiên** | `building: {x: 900, y: 8, w: 150, h: 60}`, `stop_xy: [975, 100]`, `pin_xy: [975, 50]`, `pin_color: #e64980` | Nằm trọn trong ô building, ghim ▼ tròn hồng đậm đúng tọa độ | **ĐẠT** | Mặt tiền quay ra đoạn c2r0–c3r0. |
| **Công trình đang xây** | `construction_site: ChoPhien` ("Lều chợ") | Thể hiện là lều chợ đang dựng | **ĐẠT** | Khung tre giàn giáo, cọc gỗ, chồng ngói đỏ, bạt che và biển "Đang dựng chợ" sinh động. |
| **Công trình đã hoàn thành** | `buildings_already_built: []` (chưa có) | Không có công trình cũ nào | **ĐẠT** | Đúng tiến độ màn đầu tiên của chương. |
| **Quy tắc N9 (Vật cản đường)**| Tuyệt đối không có vật trên mặt đường | 100% lòng đường thông thoáng | **ĐẠT** | Trâu gặm cỏ trong ruộng, rơm ở sân đất, tre ở viền xóm, thuyền neo dưới sông, không đè lên lộ trình xe chạy. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật (Mục 1.2)

1. **Nhìn mờ (Blur / Squint Test) — 9.5/10:** Mạng đường bê tông và hệ thống ghim nhiệm vụ nổi bật rõ rệt trên nền đồng cỏ và ruộng lúa mềm mại. Rào chắn sọc đỏ trắng giúp nhận biết tức thì các nhánh đường chưa thông.
2. **Nhận diện (3-Second Recognition) — 10/10:** Nhìn vào là nhận ra ngay làng quê Bắc Bộ thanh bình với đồng lúa, lũy tre ngà, sân phơi thóc vàng, mái ngói vảy cá đỏ tươi, ao sen nở hoa và dòng sông Hồng êm đềm mép Đông.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** Chuẩn mực 60% nền thiên nhiên (`#8ec255`, `#4ea69c`) – 30% kiến trúc ấm áp (`#c44828`, `#e5997d`, `#6d8291`) – 10% điểm nhấn chơi (`#1c7ed6`, `#e64980`, `#f5c542`).
4. **Tương phản & Đọc chữ — 10/10:** Ghim có bóng đổ mềm mại; nhãn chữ màu `#1e293b` viền trắng dày `4.5px` (`paint-order: stroke fill`) hiển thị cực kỳ sắc nét, đặt ở khoảng trống thoáng đãng không đè lên đường.
5. **Trải nghiệm máy thật (Mobile 844×390) — 9.5/10:** Cảnh quan có chiều sâu hữu cơ, chi tiết tinh xảo từ hàng cau, giàn mướp, chum vại đến rặng tre uốn lượn khi phóng to camera gần.
6. **Tiến triển Đầu / Cuối — 9.5/10:** Màn 1 mở đầu ấn tượng với bối cảnh làng quê thanh bình đang bắt đầu nhộn nhịp chuẩn bị đón phiên chợ đầu tiên.

**TỔNG KẾT MÀN 01: ĐẠT 9.75 / 10 — SẴN SÀNG DUYỆT.**
