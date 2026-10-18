# Bảng Tự Kiểm Tra Màn 06 — Ao Cá (Little Routes)

| Hạng mục | Theo `du_lieu_man.json` | Ảnh mới (`khung_canh_moi.png` & `khung_canh_moi_co_ghim.png`) | Đánh giá |
| :--- | :--- | :--- | :---: |
| **Kích thước bản đồ** | 1950 × 1250 px (vùng chơi), chuẩn canvas mở rộng 2450 × 1750 px (`viewBox="-250 -250 2450 1750"`) | Đạt chuẩn 2450 × 1750 px, vùng chơi game giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 350 px bao quanh với mương nước Bắc, sông Hồng Đông, đồng lúa Nam | **ĐẠT (10/10)** |
| **Vùng mở rộng** | `open_region_max_col_row: [4, 3]` (lưới cột c0–c4, hàng r0–r3) | 31 đoạn thông xe hoàn toàn sạch sẽ, 7 đoạn phía Đông (đê ven sông c5) chưa thông | **ĐẠT** |
| **Số đoạn đường** | Tổng 38 đoạn: 31 thông (`open: true`), 7 chưa thông (`open: false`) | 31 đoạn nhựa xám phẳng không vật cản; 7 đoạn đường đất viền đê c5 kèm rào chắn đỏ trắng | **ĐẠT** |
| **Độ rộng & vạch kẻ đường** | Đường thường 46 px vạch trắng đứt; đường lớn 64 px vạch vàng đôi; đường đóng 20 px | Đúng quy chuẩn L2 & N1, làn đường lái sạch 100%, vạch sơn trắng đứt phân làn rõ nét | **ĐẠT** |
| **Rào chắn công trình** | 4 rào chắn tại ranh giới mở/đóng $x = 1500$, $y \in \{100, 450, 800, 1150\}$ | 4 rào chắn sọc đỏ trắng ngăn cách sang dải đê ven sông phía Đông | **ĐẠT** |
| **Điểm 1: Hợp tác xã (HTX)** | Kho ▲ `#1c7ed6`<br>Stop: `[625, 450]`<br>Building: `[567, 490, 116, 58]`<br>Pin: `[625, 522]` | Mặt tiền quay ra đường `c1r1-c2r1`, ghim ô vuông ▲ xanh dương đúng tọa độ | **ĐẠT** |
| **Điểm 2: Giếng làng (GiengLang)** | Điểm giao ▼ `#0ca678`<br>Stop: `[100, 625]`<br>Building: `[138, 565, 124, 120]`<br>Pin: `[200, 631]` | Giếng đá tròn cổ kính và rặng tre bao quanh, mặt tiền quay ra `c0r1-c0r2`, ghim tròn ▼ lục | **ĐẠT** |
| **Điểm 3: Xóm Giữa (XomGiua)** | Điểm giao ▼ `#f59f00`<br>Stop: `[1150, 625]`<br>Building: `[1190, 579, 92, 92]`<br>Pin: `[1236, 631]` | Cụm nhà ngói sân gạch ấm áp của xóm giữa, mặt tiền quay ra `c3r1-c3r2`, ghim tròn ▼ hổ phách | **ĐẠT** |
| **Điểm 4: Trường làng (TruongLang)** | Điểm giao ▼ `#f76707`<br>Stop: `[1500, 275]`<br>Building: `[1538, 215, 124, 120]`<br>Pin: `[1600, 281]` | Khuôn viên trường học khang trang, quay ra `c4r0-c4r1`, ghim tròn ▼ cam | **ĐẠT** |
| **Điểm 5: Ao cá (AoCa)** | Điểm giao ▼ `#1098ad`<br>Stop: `[100, 975]`<br>Building: `[138, 915, 124, 120]`<br>Pin: `[200, 981]` | Công trường đang kè đá và nạo vét lòng ao, quay ra `c0r2-c0r3`, ghim tròn ▼ lam/cyan | **ĐẠT** |
| **Công trình đang xây (`construction_site`)** | `AoCa` (Ao cá) | Thể hiện công trường đào ao: hố đất tích nước xanh ngọc, cọc cừ tràm kè bờ ao, xe cút kít, đống đá hộc | **ĐẠT** |
| **Công trình đã hoàn thành (`buildings_already_built`)** | `ChoPhien`, `GiengLang`, `TruongLang`, `XomDong`, `TramYTe` | `TramYTe` (xây ở Màn 05) nay đã hoàn thiện thành trạm xá ngói đỏ với biểu tượng chữ thập đỏ, vườn thuốc nam xanh tốt | **ĐẠT** |
| **Cảnh quan tự nhiên & Sông nước** | Kế thừa trọn vẹn bộ tiêu chuẩn nâng cấp | Đội thuyền đánh cá 7 chiếc trên sông, cối xay gió ngoại vi phía Nam ($x=1680, y=1320$), giàn mướp tre, luống rau xanh, đàn cò trắng và đàn trâu | **ĐẠT** |
| **Quy tắc N9 / L6 (Đường sạch)** | Lòng đường thông suốt, không vật cản hay cành lá xâm lấn | 100% các đoạn đường thông xe đều có vạch sơn trắng đứt rõ nét, hành lang an toàn $> 25\text{ px}$ | **ĐẠT** |
