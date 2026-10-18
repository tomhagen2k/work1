# Bảng Tự Kiểm Tra Màn 07 — Đình Làng (Little Routes)

| Hạng mục | Theo `du_lieu_man.json` | Ảnh mới (`khung_canh_moi.png` & `khung_canh_moi_co_ghim.png`) | Đánh giá |
| :--- | :--- | :--- | :---: |
| **Kích thước bản đồ** | 1950 × 1250 px (vùng chơi), chuẩn canvas mở rộng 2450 × 1750 px (`viewBox="-250 -250 2450 1750"`) | Đạt chuẩn vector/raster 2450 × 1750 px, vùng chơi game giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 350 px bao quanh chống cắt cụt khi zoom | **ĐẠT (10/10)** |
| **Vùng mở rộng** | `open_region_max_col_row: [4, 3]` (lưới cột c0–c4, hàng r0–r3) | 31 đoạn thông xe hoàn toàn sạch sẽ, 7 đoạn phía Đông (đê ven sông c5) chưa thông | **ĐẠT** |
| **Số đoạn đường** | Tổng 38 đoạn: 31 thông (`open: true`), 7 chưa thông (`open: false`) | 31 đoạn nhựa xám phẳng không vật cản; 7 đoạn đường đất viền đê c5 kèm rào chắn đỏ trắng | **ĐẠT** |
| **Độ rộng & vạch kẻ đường** | Đường thường 46 px vạch trắng đứt; đường lớn 64 px vạch vàng đôi; đường đóng 20 px | Đúng quy chuẩn L2 & N1, làn đường lái sạch 100%, vạch sơn trắng đứt phân làn sắc nét | **ĐẠT** |
| **Rào chắn công trình** | 4 rào chắn tại ranh giới mở/đóng $x = 1500$, $y \in \{100, 450, 800, 1150\}$ | 4 rào chắn sọc đỏ trắng ngăn cách sang dải đê ven sông phía Đông | **ĐẠT** |
| **Điểm 1: Hợp tác xã (HTX)** | Kho ▲ `#1c7ed6`<br>Stop: `[625, 450]`<br>Building: `[567, 490, 116, 58]`<br>Pin: `[625, 522]` | Mặt tiền quay ra đường `c1r1-c2r1`, ghim ô vuông ▲ xanh dương đúng tọa độ, mái ngói sẫm, sân kho sạch sẽ | **ĐẠT** |
| **Điểm 2: Chợ phiên (ChoPhien)** | Điểm giao ▼ `#e64980`<br>Stop: `[975, 100]`<br>Building: `[900, 8, 150, 60]`<br>Pin: `[975, 50]` | Khu lều chợ truyền thống ven đường Bắc, sạp hàng đủ sắc màu, quay ra `c2r0-c3r0`, ghim tròn ▼ hồng sen | **ĐẠT** |
| **Điểm 3: Giếng làng (GiengLang)** | Điểm giao ▼ `#0ca678`<br>Stop: `[100, 625]`<br>Building: `[138, 565, 124, 120]`<br>Pin: `[200, 631]` | Thành giếng tròn đá ong cổ kính rêu phong, rặng tre bao quanh, quay ra `c0r1-c0r2`, ghim tròn ▼ lục | **ĐẠT** |
| **Điểm 4: Ao cá (AoCa)** | Điểm giao ▼ `#1098ad`<br>Stop: `[100, 975]`<br>Building: `[138, 915, 124, 120]`<br>Pin: `[200, 981]` | Ao làng đã hoàn thiện ở Màn 06 với làn nước trong xanh, hoa súng nở, cầu ao gỗ mộc mạc, ghim tròn ▼ lam cyan | **ĐẠT** |
| **Điểm 5: Đình làng (DinhLang)** | Điểm giao ▼ `#a61e4d`<br>Stop: `[800, 975]`<br>Building: `[838, 915, 124, 120]`<br>Pin: `[900, 981]` | Công trường xây dựng Đại Đình: nền móng đá xanh bề thế, hệ cột gỗ lim dựng đứng, tời cẩu gỗ, các chồng ngói mũi hài cong và đống cát sông, ghim tròn ▼ đỏ sẫm | **ĐẠT** |
| **Công trình đang xây (`construction_site`)** | `DinhLang` (Đình làng) | Thể hiện công trường thi công trang trọng: móng đá, giàn giáo tời gỗ, hàng cọc móng, vật liệu đá xanh và ngói mũi hài | **ĐẠT** |
| **Cây đa cổ thụ Đình làng** | Bố trí tại khuôn viên tâm linh | Đặt tại góc Đông Bắc khuôn viên đình ($x=1010, y=920$), tạo không gian linh thiêng mà hoàn toàn không che khuất công trường đình hay ghim giao hàng `[900, 981]` | **ĐẠT** |
| **Công trình đã hoàn thành (`buildings_already_built`)** | `ChoPhien`, `GiengLang`, `TruongLang`, `XomDong`, `TramYTe`, `AoCa` | Cả 6 công trình đều hiện diện đầy đủ, chính xác vị trí và quy mô hoàn thiện | **ĐẠT** |
| **Cảnh quan tự nhiên & Sông nước** | Kế thừa trọn vẹn bộ tiêu chuẩn nâng cấp | Bờ sông Hồng phía Đông với bãi bồi phù sa, mương thủy lợi phía Bắc, cánh đồng lúa chín vàng phía Nam, đàn cò trắng và đàn trâu thong dong | **ĐẠT** |
| **Quy tắc N9 / L6 (Đường sạch)** | Lòng đường thông suốt, không vật cản hay cành lá xâm lấn | 100% lòng đường lái xe sạch sẽ, an toàn tuyệt đối, cách mép đường $> 25\text{ px}$ | **ĐẠT** |
