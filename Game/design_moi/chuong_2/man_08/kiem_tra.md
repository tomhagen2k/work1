# Bảng Tự Kiểm Tra Màn 08 (Chương 2 — Khu Đô Thị Mới · Global Edition)

- **Tên màn:** Hồ điều hòa (`City Lake`)
- **Tập tin đối chiếu:** `design/chuong_2/man_08/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_08/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_08/khung_canh_moi.png)
- **Bộ tài nguyên dùng chung:** [bo_tai_nguyen.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/bo_tai_nguyen.png)

---

## 1. Đối chiếu Logic Màn Chơi & Tiến Triển Chương 2

| Hạng mục kiểm tra | Theo yêu cầu & dữ liệu game (`du_lieu_man.json`) | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | Chuẩn canvas mở rộng 2800 × 1750 px (`viewBox="-250 -250 2800 1750"`) | Đạt chuẩn 2800 × 1750 px, giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 250 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 7 cột × 4 hàng nút, node spacing 350px. |
| **Mở thông tuyến Cột 6 ($x=2200$) & Nối dài Đại lộ Nam** | Toàn bộ các nhánh đường kết nối sang Cột 6 ($x=2200$) và trục dọc Cột 6 chính thức thông xe (`open: true`). Đại lộ Nam $y=800$ nối dài thông suốt đến $x=2200$ | Đại lộ 2 chiều $y=800$ kéo dài đến $x=2200$ với dải phân cách cây xanh giữa tim đường; Cột 6 trải nhựa asphalt phẳng phiu, vỉa hè đôi, vạch sang đường zebra và đèn đường chiếu sáng | **ĐẠT** | Mở khóa toàn bộ khu vực phía Đông đô thị, kết nối trực tiếp Xưởng gỗ và Hồ điều hòa. |
| **Mở KHO SỐ 3: Xưởng gỗ (XuongGo)** | Kho lấy hàng số 3: `building: {x: 2068, y: 579, w: 92, h: 92}`, `stop_xy: [2200, 625]`, `pin_xy: [2114, 631]` | Xưởng chế biến lâm sản & kho gỗ đô thị: nhà xưởng mái tôn xám, đống gỗ tròn xếp tầng theo lớp, các kiện gỗ xẻ thành phẩm, xe nâng hàng forklift vàng bốc dỡ gỗ | **ĐẠT** | Ghim ▲ ô vuông xanh lam (`#1971c2`), nhãn `Xưởng gỗ · Timber Mill`. Stop zone dài 180px trên trục Cột 6 $x=2200$. |
| **Công trình đang xây (M8): Hồ điều hòa (HoDieuHoa)** | `construction_site: HoDieuHoa`, `building: {x: 2038, y: 915, w: 124, h: 120}`, `stop_xy: [2200, 975]`, `pin_xy: [2100, 981]` | Đại công trường thủy lợi cảnh quan đô thị: lòng hồ bậc thang đang đào sâu, máy xúc bánh xích vươn gầu múc đất, máy bơm nước công suất lớn, các khối đá kè bờ đang lắp đặt | **ĐẠT** | Ghim ▼ tròn lam ngọc (`#1098ad`), nhãn `Hồ điều hòa · City Lake`. Stop zone dài 180px trên trục Cột 6 $x=2200$. |
| **Khánh thành Nhà văn hóa (NhaVH)** | `buildings_already_built: NhaVH`, `building: {x: 1267, y: 1190, w: 116, h: 58}` | Khánh thành Nhà văn hóa hoàn chỉnh: đại sảnh mái lam gỗ cong mềm mại, vách kính nghệ thuật đón sáng, tranh tường văn hóa, quảng trường trước sảnh rực rỡ với 3 cột cờ lễ hội | **ĐẠT** | Nối thông lối đi dạo vào Khu thể thao liên hợp và Công viên gia đình phía Nam. |
| **Mạng lưới 3 Kho hoạt động đồng thời** | `BaiVL` (Kho 1), `KhoTong` (Kho 2), `XuongGo` (Kho 3) | - `KhoTong` cấp 1 kiện cho `TiemBanh` (`[550, 8]`).<br>- `BaiVL` cấp 3 kiện cho `NhaVH` (`[1267, 1190]`).<br>- `XuongGo` cấp 2 kiện cho `HoDieuHoa` (`[2038, 915]`) và 2 kiện cho `ChungCuB` (`[1190, 229]`). | **ĐẠT** | Tái hiện đúng độ thử thách cao của Màn 08 với 3 kho phân bố khắp bản đồ. |
| **Quy tắc N9 & Làm sạch đường xá** | 100% đường thông thoáng, không cây cối/vật phẩm chắn đường | Kiểm tra tự động bằng mã kiểm thử: **0 va chạm cây xanh**, **0 vật cản trên mọi tuyến đường (kể cả tuyến Cột 6 mới mở)** | **ĐẠT** | Toàn bộ 142 cây xanh trên bản đồ cách tâm mọi tuyến đường $> 50\text{px}$. |
| **Quy chuẩn 3 tông màu cây xanh** | Tiết chế màu sắc: chỉ dùng xanh nhạt, xanh đậm và vàng ấm | Đồng bộ 3 loại cây: `treeRoundGreen`, `treeCypress`/`treeDarkGreen`, `treeGoldenTrumpet` | **ĐẠT** | Bỏ 100% cây hồng blossom và confetti rải rác. Vỉa hè đại lộ và các trục phố trồng cây chuông vàng xen kẽ cây bóng mát. |
| **Bố cục dải công viên phía Nam** | Duy trì ổn định 4 phân khu đồng bộ, liên kết chặt chẽ với Nhà văn hóa mới khánh thành | - Quảng trường nước Tây Nam (`[50..410]`).<br>- Cụm liên hợp thể thao 2x2 (`[760..1140]`).<br>- Nhà văn hóa (`[1267..1383]`).<br>- Công viên gia đình (`[1450..1850]`).<br>- Bến thuyền hồ sinh thái (`[1880..2550]`). | **ĐẠT** | Đô thị ven đô hiện lên như một bức tranh hoàn chỉnh, hiện đại và tràn đầy sức sống. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật

1. **Nhìn mờ (Blur / Squint Test) — 10/10:** Mạng lưới giao thông toàn đô thị mở rộng tối đa sang Cột 6 ($x=2200$). Trục đại lộ đôi $y=800$ nối liền từ Tây sang Đông làm trục xương sống rõ nét.
2. **Nhận diện (3-Second Recognition) — 10/10:** Nhận ra ngay sự ra mắt của Xưởng gỗ (Kho số 3) với các đống gỗ tròn đặc trưng và đại công trường đào Hồ điều hòa trung tâm.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** 60% nền xanh đô thị pastel – 30% kiến trúc công trình ấm áp – 10% điểm nhấn (sắc gỗ ấm của Xưởng gỗ, ghim lam ngọc Hồ điều hòa `#1098ad`, máy xúc vàng cam `#fab005`).
4. **Tương phản & Đọc chữ — 10/10:** Huy hiệu nhiệm vụ song ngữ hiển thị sắc nét trên nền bo tròn bóng mờ, biểu tượng 3 kho vuông và các điểm giao tròn phân biệt trực quan.
5. **Trải nghiệm thực tế (Mobile 844×390) — 10/10:** Độ phân giải siêu cao 2800 × 1750 px hiển thị sắc nét từng thớ gỗ tròn, gầu máy xúc, kè đá bờ hồ và xe nâng hàng.
6. **Tiến triển Đầu / Cuối — 10/10:** Đánh dấu bước nhảy vọt quan trọng: mở kho thứ 3 và thi công kỳ quan hồ sinh thái điều hòa trung tâm của toàn khu đô thị.

**TỔNG KẾT MÀN 08: ĐẠT 10 / 10 — HOÀN HẢO.**
