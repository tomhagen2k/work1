# Bảng Tự Kiểm Tra Màn 05 — Trạm Y Tế (Little Routes)

| Hạng mục | Theo `du_lieu_man.json` | Ảnh mới (`khung_canh_moi.png` & `khung_canh_moi_co_ghim.png`) | Đánh giá |
| :--- | :--- | :--- | :---: |
| **Kích thước bản đồ** | 1950 × 1250 px (vùng chơi), chuẩn canvas mở rộng 2450 × 1750 px (`viewBox="-250 -250 2450 1750"`) | Đạt chuẩn 2450 × 1750 px, vùng chơi game giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 350 px bao quanh với mương nước Bắc, sông Hồng Đông, đồng lúa Nam | **ĐẠT (10/10)** |
| **Vùng mở rộng** | `open_region_max_col_row: [4, 3]` (lưới cột c0–c4, hàng r0–r3) | 31 đoạn thông xe hoàn toàn sạch sẽ, 7 đoạn phía Đông (đê ven sông c5) chưa thông | **ĐẠT** |
| **Số đoạn đường** | Tổng 38 đoạn: 31 thông (`open: true`), 7 chưa thông (`open: false`) | 31 đoạn nhựa xám phẳng không vật cản; 7 đoạn đường đất viền đê c5 kèm rào chắn sọc đỏ trắng | **ĐẠT** |
| **Độ rộng & vạch kẻ đường** | Đường thường 46 px vạch trắng đứt; đường lớn 64 px vạch vàng đôi; đường đóng 20 px | Đúng quy chuẩn L2 & N1, làn đường lái sạch 100%, vạch sơn trắng sắc nét liên tục | **ĐẠT** |
| **Rào chắn công trình** | 4 rào chắn tại ranh giới mở/đóng $x = 1500$, $y \in \{100, 450, 800, 1150\}$ | 4 rào chắn sọc đỏ trắng ngăn cách rõ ràng sang dải đê ven sông | **ĐẠT** |
| **Điểm 1: Hợp tác xã (HTX)** | Kho ▲ `#1c7ed6`<br>Stop: `[625, 450]`<br>Building: `[567, 490, 116, 58]`<br>Pin: `[625, 522]` | Mặt tiền quay ra đường `c1r1-c2r1`, ghim ô vuông ▲ màu xanh dương nổi bật đúng tọa độ | **ĐẠT** |
| **Điểm 2: Nhà ông Lý (NhaLy)** | Điểm giao ▼ `#ae3ec9`<br>Stop: `[625, 800]`<br>Building: `[567, 840, 116, 58]`<br>Pin: `[625, 872]` | Dinh cơ 5 gian khang trang của lý trưởng, sân gạch Bát Tràng, chậu cúc vàng, cau trước sân, ghim tròn ▼ tím | **ĐẠT** |
| **Điểm 3: Trường làng (TruongLang)** | Điểm giao ▼ `#f76707`<br>Stop: `[1500, 275]`<br>Building: `[1538, 215, 124, 120]`<br>Pin: `[1600, 281]` | Công trình trường làng đã hoàn thành ở Màn 04, cột cờ cờ đỏ sao vàng, quay ra đường `c4r0-c4r1`, ghim tròn ▼ cam | **ĐẠT** |
| **Điểm 4: Trạm y tế (TramYTe)** | Điểm giao ▼ `#e03131`<br>Stop: `[625, 1150]`<br>Building: `[567, 1190, 116, 58]`<br>Pin: `[625, 1222]` | Công trường đang thi công móng và khung tường trạm xá, gạch cát, tời nâng, ghim tròn ▼ đỏ | **ĐẠT** |
| **Công trình đang xây (`construction_site`)** | `TramYTe` (Trạm y tế) | Thể hiện công trường với giàn giáo, tời nâng, đống gạch cát và dây cảnh báo thi công | **ĐẠT** |
| **Công trình đã hoàn thành (`buildings_already_built`)** | `ChoPhien`, `GiengLang`, `TruongLang`, `XomDong` | Cả 4 công trình đều hiện diện đầy đủ. Đặc biệt Xóm Đông nay đã hoàn thiện thành cụm nhà ngói đỏ tươi sân gạch khang trang | **ĐẠT** |
| **Khu đất Ao cá (chuẩn bị cho Màn 06)** | Chưa xây dựng ở Màn 05 | Khu đất trống tại ô `[138, 915]` có cắm 4 cọc tiêu đo đạc và dây căng chỉ giới chuẩn bị đào ao | **ĐẠT** |
| **Cảnh quan tự nhiên & Sông nước** | Kế thừa trọn vẹn bộ tiêu chuẩn nâng cấp | Đội thuyền đánh cá 7 chiếc trên sông, cối xay gió ngoại vi phía Nam ($x=1680, y=1320$), giàn mướp tre, luống rau xanh, đàn cò trắng và đàn trâu | **ĐẠT** |
| **Quy tắc N9 / L6 (Đường sạch)** | Lòng đường tuyệt đối không có chướng ngại vật hay tán cây lấn chiếm | Toàn bộ cây xanh cách mép đường $> 25\text{ px}$, không một pixel nào xâm lấn lòng đường hay vạch sơn | **ĐẠT** |
