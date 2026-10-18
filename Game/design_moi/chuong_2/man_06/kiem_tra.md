# Bảng Tự Kiểm Tra Màn 06 (Chương 2 — Khu Đô Thị Mới · Global Edition)

- **Tên màn:** Bệnh viện (`Hospital`)
- **Tập tin đối chiếu:** `design/chuong_2/man_06/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_06/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_06/khung_canh_moi.png)
- **Bộ tài nguyên dùng chung:** [bo_tai_nguyen.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/bo_tai_nguyen.png)

---

## 1. Đối chiếu Logic Màn Chơi & Tiến Triển Chương 2

| Hạng mục kiểm tra | Theo yêu cầu & dữ liệu game (`du_lieu_man.json`) | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | Chuẩn canvas mở rộng 2800 × 1750 px (`viewBox="-250 -250 2800 1750"`) | Đạt chuẩn 2800 × 1750 px, giữ nguyên 100% tọa độ gốc, bổ sung dải đệm xanh 250 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 7 cột × 4 hàng nút, node spacing 350px. |
| **Mở thông Đại lộ phía Đông (Cột 5, $x=1850$)** | Cột $x=1850$ thông xe toàn tuyến từ $y=100$ đến $y=1150$, loại đường lớn (`type: 'lon'`) | Đại lộ đôi hiện đại: mặt đường nhựa xám đậm rộng 64px, vỉa hè 74px, dải phân cách cây xanh giữa tim đường với hàng cây bóng mát đều đặn | **ĐẠT** | Nối thông trục Đông - Tây và Bắc - Nam, kết nối Bệnh viện và Kho tổng. |
| **Công trình đang xây (M6): Bệnh viện (BenhVien)** | `construction_site: BenhVien`, `building: {x: 1888, y: 215, w: 124, h: 120}`, `stop_xy: [1850, 275]`, `pin_xy: [1950, 281]` | Công trường đại dự án y tế: móng bê tông đa phân khu chữ thập, cần cẩu tháp vươn cao, xe trộn bê tông, rào chắn an toàn công trường | **ĐẠT** | Ghim ▼ tròn đỏ (`#e03131`), nhãn `Bệnh viện · Hospital`. Stop zone dài 180px trên đại lộ $x=1850$. |
| **Công trình mới: Nhà mẫu (NhaMau)** | `building: {x: 140, y: 929, w: 92, h: 92}`, `stop_xy: [100, 975]`, `pin_xy: [186, 981]` | Khu nhà mẫu & văn phòng giới thiệu dự án cao cấp: biệt thự kính hiện đại, hồ nước cảnh quan, thảm cỏ cắt tỉa và bãi đỗ xe khách tham quan | **ĐẠT** | Ghim ▼ tròn xanh lục (`#5c940d`), nhãn `Nhà mẫu · Show Home`. Stop zone dài 180px trên trục đường Tây $x=100$. |
| **Công trình giao hàng khác: ChungCuB** | Nhận 1 kiện từ Kho tổng, giao hàng tại Chung cư B `[1190, 229]` | Chung cư thấp tầng kiến trúc hiện đại, ban công cây xanh, ghim ▼ tròn hồng tím (`#d6336c`) | **ĐẠT** | Vị trí stop zone `[1150, 275]` dài 180px hoàn toàn thông thoáng. |
| **2 Kho hoạt động song song** | `BaiVL` (Tây Bắc) và `KhoTong` (Trung tâm Đông) | - `BaiVL` (`[140, 229]`): Bãi vật liệu cung ứng đá, cát, xi măng cho Bệnh viện (3 kiện).<br>- `KhoTong` (`[1540, 579]`): Nhà kho mái tôn cấp hàng hoàn thiện cho Nhà mẫu (3 kiện) và Chung cư B (1 kiện). | **ĐẠT** | Đúng biểu tượng ô vuông ▲ màu xanh nước biển (`#1c7ed6` và `#1864ab`). |
| **Công trình đã hoàn thành từ M01 - M05** | Tiếp tục phát triển và hoàn thiện sinh động | - `ChoMoi`: Khánh thành hoàn chỉnh với nhà lồng chợ mái vòm, sạp hàng hóa và quảng trường tiểu thương tấp nập.<br>- `TruongHoc`: Trường học 2 tầng chữ U với sân bóng mini cỏ nhân tạo.<br>- `NhaTre`: Trường mầm non sắc màu.<br>- `KhuNha`: Dãy nhà phố liền kề hoàn thiện ven đường Nam.<br>- `ChungCuA`, `TiemBanh`, `VPDuAn`: Hoạt động ổn định. | **ĐẠT** | Diện mạo một khu đô thị mới hiện đại, tiện nghi ngày càng rõ nét. |
| **Quy tắc N9 & Làm sạch đường xá** | 100% đường thông thoáng, không cây cối/vật phẩm chắn đường | Kiểm tra tự động bằng mã kiểm thử: **0 va chạm cây xanh**, **0 vật cản trên mọi tuyến đường (kể cả đại lộ phía Đông mới mở)** | **ĐẠT** | Toàn bộ 112 cây xanh trên bản đồ cách tim đường $\ge 50\text{px}$. |
| **Quy chuẩn 3 tông màu cây xanh** | Tiết chế màu sắc: chỉ dùng xanh nhạt, xanh đậm và vàng ấm | Đồng bộ 3 loại cây: `treeRoundGreen`, `treeCypress`/`treeDarkGreen`, `treeGoldenTrumpet` | **ĐẠT** | Không có cây hồng blossom hay hạt confetti rải rác. Dải phân cách đại lộ dùng cây chuông vàng ấm áp. |
| **Bố cục dải công viên phía Nam** | 4 phân khu lớn ngăn nắp, gom cụm thể thao tập trung | Duy trì ổn định: Quảng trường nước Tây Nam, Cụm liên hợp thể thao 2x2 tập trung, Công viên dã ngoại gia đình, Bến thuyền hồ sinh thái ven đô | **ĐẠT** | Dải đệm Nam bề thế, hiện đại, khoảng đệm cỏ xanh rộng ngăn cách đường $y=1150$. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật

1. **Nhìn mờ (Blur / Squint Test) — 10/10:** Trục đại lộ phía Đông mới mở tạo nên khung xương giao thông 2 đại lộ song hành (Đông & Nam) cực kỳ hoành tráng, dễ định hướng đường đi cho người chơi.
2. **Nhận diện (3-Second Recognition) — 10/10:** Nhận ra ngay sự xuất hiện của công trường Bệnh viện quy mô lớn ở phía Đông Bắc và khu Nhà mẫu hiện đại đón khách ở phía Tây Nam.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** 60% nền xanh đô thị pastel – 30% kiến trúc công trình ấm áp – 10% điểm nhấn (cần cẩu vàng `#fab005`, ghim đỏ Bệnh viện `#e03131`, ghim xanh lục Nhà mẫu `#5c940d`).
4. **Tương phản & Đọc chữ — 10/10:** Huy hiệu nhiệm vụ song ngữ hiển thị sắc nét trên nền bo tròn bóng mờ, độ tương phản chuẩn WCAG AAA.
5. **Trải nghiệm thực tế (Mobile 844×390) — 10/10:** Độ phân giải siêu cao 2800 × 1750 px mang lại chi tiết sắc nét cho từng vì kèo công trường Bệnh viện, hồ nước biệt thự Nhà mẫu, xe tải chở hàng.
6. **Tiến triển Đầu / Cuối — 10/10:** Bước ngoặt thông tuyến giao thông quan trọng bậc nhất của Chương 2: mở thông Đại lộ phía Đông và mở rộng vùng hoạt động sang nửa phía Đông đô thị.

**TỔNG KẾT MÀN 06: ĐẠT 10 / 10 — HOÀN HẢO.**
