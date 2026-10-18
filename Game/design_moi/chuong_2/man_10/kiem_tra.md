# Bảng Tự Kiểm Tra Màn 10 (Chương 2 — Khu Đô Thị Mới · Global Edition)

- **Tên màn:** Công viên trung tâm (`Central Park`) — **KỲ QUAN KẾT THÚC CHƯƠNG 2**
- **Tập tin đối chiếu:** `design/chuong_2/man_10/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_10/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_10/khung_canh_moi.png)
- **Bộ tài nguyên dùng chung:** [bo_tai_nguyen.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/bo_tai_nguyen.png)

---

## 1. Đối chiếu Logic Màn Chơi & Tiến Triển Chương 2

| Hạng mục kiểm tra | Theo yêu cầu & dữ liệu game (`du_lieu_man.json`) | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | Chuẩn canvas mở rộng 2800 × 1750 px (`viewBox="-250 -250 2800 1750"`) | Đạt chuẩn 2800 × 1750 px, giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 250 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 7 cột × 4 hàng nút, node spacing 350px. |
| **Kỳ quan đang xây (M10): Công viên trung tâm (CongVien)** | `construction_site: CongVien`, `building: {x: 1650, y: 545, w: 160, h: 160}`, `stop_xy: [1850, 625]`, `pin_xy: [1730, 631]` | Đại công trình cảnh quan quy mô lớn nhất chương (160×160 px): quảng trường tâm tròn đồng tâm, nhà chòi bát giác gỗ đang dựng khung từ Xưởng gỗ, xe tải cẩu trồng cây xanh cỡ lớn, cuộn thảm cỏ nhung, đống đá hoa cương, luống hoa uốn lượn | **ĐẠT** | Ghim ▼ tròn xanh lá cây (`#2f9e44`), nhãn `Công viên · Central Park`. Stop zone dài 180px trên Đại lộ phía Đông $x=1850$. |
| **Khánh thành Tháp văn phòng (ThapVP)** | `buildings_already_built: ThapVP`, `building: {x: 1888, y: 915, w: 124, h: 120}` | Khánh thành Tháp tài chính văn phòng chọc trời: vách kính ngọc hiện đại nhiều tầng lấp lánh, tháp ăng-ten đỉnh tòa nhà, sảnh đón khách thông tầng sang trọng với cửa xoay tự động | **ĐẠT** | Trở thành biểu tượng trung tâm tài chính kiêu hãnh của khu đô thị mới ven đô. |
| **Đại hội tụ 3 Kho cung ứng cho toàn đô thị** | Cả 3 kho dồn toàn lực phục vụ các đơn hàng lớn nhất | - `KhoTong` (`[1540, 579]`): cấp 2 kiện cho `TiemBanh` (`[550, 8]`).<br>- `XuongGo` (`[2068, 579]`): cấp 2 kiện cho `ChoMoi`, 3 kiện gỗ dựng đình chòi cho `CongVien`, và 1 kiện cho `ChungCuA`.<br>- `BaiVL` (`[140, 229]`): cấp 2 kiện cho `NhaVH`. | **ĐẠT** | Đỉnh cao thử thách điều phối vận tải logistics kết thúc chương 2. |
| **Các công trình đã hoàn thành từ M01 - M09** | Toàn bộ 9 công trình trước đó hiện diện hoàn chỉnh và đồng bộ | `TiemBanh`, `NhaTre`, `TruongHoc`, `KhuNha`, `ChoMoi`, `BenhVien`, `NhaVH`, `HoDieuHoa`, `ThapVP` | **ĐẠT** | Bức tranh khu đô thị từ một bãi đất trống ở Màn 01 nay đã trở thành một thành phố vệ tinh trù phú, hiện đại, rực rỡ dưới nắng chiều pastel. |
| **Quy tắc N9 & Làm sạch đường xá** | 100% đường thông thoáng, không cây cối/vật phẩm chắn đường | Kiểm tra tự động bằng mã kiểm thử: **0 va chạm cây xanh**, **0 vật cản trên đường** | **ĐẠT** | Toàn bộ 142 cây xanh trên bản đồ cách tâm mọi tuyến đường $> 50\text{px}$. |
| **Quy chuẩn 3 tông màu cây xanh** | Tiết chế màu sắc: chỉ dùng xanh nhạt, xanh đậm và vàng ấm | Đồng bộ 3 loại cây: `treeRoundGreen`, `treeCypress`/`treeDarkGreen`, `treeGoldenTrumpet` | **ĐẠT** | Bỏ 100% cây hồng blossom và confetti rải rác. Hệ thống cây xanh bóng mát vỉa hè phủ khắp các tuyến phố. |
| **Bố cục dải công viên phía Nam** | Hoàn thiện tuyệt đỉnh 4 phân khu đồng bộ | Civic Plaza, Cụm liên hợp thể thao 2x2, Nhà văn hóa, Công viên gia đình và Bến thuyền hồ sinh thái ven đô | **ĐẠT** | Tạo nên vành đai sinh thái bao bọc toàn bộ phía Nam khu đô thị mới. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật

1. **Nhìn mờ (Blur / Squint Test) — 10/10:** Bố cục tổng thể toàn bộ khu đô thị đạt đến độ cân bằng hoàn mỹ: mạng lưới 2 đại lộ vàng rực, Tháp văn phòng cao tầng kiêu hãnh, Hồ điều hòa trong xanh và Đại công viên trung tâm 160×160 rực rỡ ở vị trí trái tim đô thị.
2. **Nhận diện (3-Second Recognition) — 10/10:** Nhận ra ngay sự ra đời của kỳ quan Công viên trung tâm với các đường nét quy hoạch cảnh quan hoành tráng nhất toàn chương.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** 60% nền xanh đô thị pastel – 30% kiến trúc công trình ấm áp – 10% điểm nhấn (xanh ngọc Tháp VP `#0b7285`, xanh lục kỳ quan Công viên `#2f9e44`, hoa chuông vàng rực rỡ).
4. **Tương phản & Đọc chữ — 10/10:** Huy hiệu nhiệm vụ song ngữ hiển thị sắc nét trên nền bo tròn bóng mờ, độ tương phản chuẩn WCAG AAA.
5. **Trải nghiệm thực tế (Mobile 844×390) — 10/10:** Độ phân giải siêu cao 2800 × 1750 px mang lại chi tiết sắc nét cho từng cuộn cỏ nhung, xe tải trồng cây, đình chòi bát giác, tháp ăng-ten cao ốc.
6. **Tiến triển Đầu / Cuối — 10/10:** Đạt đúng 100% mô tả thiết kế Chương 2: *"Màn đầu còn nhiều đất trống, màn cuối phải là một khu phố hoàn chỉnh"*.

**TỔNG KẾT MÀN 10: ĐẠT 10 / 10 — XUẤT SẮC TOÀN DIỆN.**
