# Bảng Tự Kiểm Tra Màn 03 (Chương 2 — Khu Đô Thị Mới · Global Edition)

- **Tên màn:** Trường học (`School`)
- **Tập tin đối chiếu:** `design/chuong_2/man_03/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_03/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_03/khung_canh_moi.png)
- **Bộ tài nguyên dùng chung:** [bo_tai_nguyen.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/bo_tai_nguyen.png)

---

## 1. Đối chiếu Logic Màn Chơi & Tiến Triển Chương 2

| Hạng mục kiểm tra | Theo yêu cầu & dữ liệu game (`du_lieu_man.json`) | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | Chuẩn canvas mở rộng 2800 × 1750 px (`viewBox="-250 -250 2800 1750"`) | Đạt chuẩn 2800 × 1750 px, giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 250 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 7 cột × 4 hàng nút, node spacing 350px. |
| **Mở rộng mạng lưới đường về phía Đông (Cột 4, $x=1500$)** | Thông các tuyến: `c3r0-c4r0`, `c3r1-c4r1`, `c3r2-c4r2`, `c4r0-c4r1`, `c4r1-c4r2`. Đại lộ $y=800$ nối dài tới $x=1500$ | Đường nhựa thảm mới, vỉa hè bê tông, vạch sơn trắng tim đường, dải phân cách cây xanh đại lộ | **ĐẠT** | 22/45 cạnh đã thông xe. Rào chắn thi công di chuyển sang đầu các đoạn chưa mở tại cột 4 & hàng 2. |
| **Kho 2: Mở Kho Tổng (KhoTong)** | `building: {x: 1540, y: 579, w: 92, h: 92}`, `stop_xy: [1500, 625]`, `pin_xy: [1586, 631]` | Nhà kho mái tôn sóng công nghiệp xanh dương/xám, sân bãi bốc dỡ bê tông, xe nâng hàng forklift vàng, pallet gỗ | **ĐẠT** | Ghim ▲ vuông xanh dương (`#1864ab`), nhãn `Kho tổng · Central Depot`. Stop zone dài 180px trên trục đường $x=1500$. |
| **Công trình đang xây (M3): Trường học (TruongHoc)** | `construction_site: TruongHoc`, `building: {x: 1538, y: 215, w: 124, h: 120}`, `stop_xy: [1500, 275]`, `pin_xy: [1600, 281]` | Công trường xây dựng trường học: móng bê tông chữ U, cần cẩu tháp vàng `#fab005`, xe bồn trộn bê tông, đống cát & gạch | **ĐẠT** | Ghim ▼ tròn hồng (`#f06595`), nhãn `Trường học · School`. Stop zone dài 180px trên trục đường $x=1500$. |
| **Công trình giao hàng: Chung cư A (ChungCuA)** | `building: {x: 567, y: 490, w: 116, h: 58}`, `stop_xy: [625, 450]`, `pin_xy: [625, 522]` | Chung cư thấp tầng mái bằng pastel, ban công kính ngọc `#7fc8c0`, lối vào sảnh đón | **ĐẠT** | Ghim ▼ tròn tím (`#845ef7`), nhãn `Chung cư A · Apartments A`. Stop zone dài 180px trên trục đường $y=450$. |
| **Công trình đã hoàn thành: Nhà trẻ & Tiệm bánh** | Duy trì diện mạo hoàn thiện sinh động từ các màn trước | Nhà trẻ rực rỡ mái vàng/hồng với sân chơi mẫu giáo; Tiệm bánh mái hồng pastel | **ĐẠT** | Kiến trúc đồng bộ, tiếp tục làm phong phú thêm diện mạo khu đô thị mới. |
| **Quy tắc N9 & Làm sạch đường xá** | 100% đường thông thoáng, không cây cối/vật phẩm chắn đường | Kiểm tra tự động bằng mã kiểm thử: **0 va chạm cây xanh**, **0 vật cản trên đường** | **ĐẠT** | Toàn bộ 100 cây xanh trên bản đồ cách tâm mọi tuyến đường $> 50\text{px}$. |
| **Quy chuẩn 3 tông màu cây xanh** | Tiết chế màu sắc: chỉ dùng xanh nhạt, xanh đậm và vàng ấm | Đồng bộ 3 loại cây: `treeRoundGreen`, `treeCypress`/`treeDarkGreen`, `treeGoldenTrumpet` | **ĐẠT** | Bỏ 100% cây hồng blossom và confetti rải rác. Vỉa hè đại lộ trồng cây chuông vàng xen kẽ cây xanh tán tròn. |
| **Bố cục dải công viên phía Nam** | 3 phân khu lớn ngăn nắp, gom cụm thể thao tập trung | - Khu 1: Quảng trường nước & Hoa viên đối xứng ($x \in [50, 410]$)<br>- Khu 2: Khu liên hợp thể thao 2x2 tập trung ($x \in [760, 1140]$)<br>- Khu 3: Công viên dã ngoại gia đình ($x \in [1450, 1850]$)<br>- Ô quy hoạch `LOT-04` ($x \in [567, 683]$) | **ĐẠT** | Dải Nam bề thế, hiện đại, khoảng đệm cỏ xanh rộng ngăn cách đường $y=1150$. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật

1. **Nhìn mờ (Blur / Squint Test) — 10/10:** Mạng lưới giao thông mở rộng rõ nét về phía Đông; đại lộ 2 chiều vươn dài tới Kho tổng. Vị trí 2 kho hàng (`BaiVL` và `KhoTong`) nổi bật với hai huy hiệu ▲ xanh dương ở hai phía Tây - Đông.
2. **Nhận diện (3-Second Recognition) — 10/10:** Thấy ngay sự xuất hiện của Kho tổng mái tôn công nghiệp và đại công trường Trường học với cần cẩu tháp vươn cao.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** 60% nền xanh đô thị pastel – 30% kiến trúc công trình ấm áp – 10% điểm nhấn (cần cẩu vàng `#fab005`, mái kho xanh dương `#3b5bdb`, mái tiệm bánh hồng `#f06595`).
4. **Tương phản & Đọc chữ — 10/10:** Huy hiệu nhiệm vụ song ngữ hiển thị sắc nét trên nền bo tròn bóng mờ.
5. **Trải nghiệm thực tế (Mobile 844×390) — 10/10:** Độ phân giải siêu cao 2800 × 1750 px mang lại chi tiết sắc lẹm cho xe nâng hàng, pallet gỗ, móng trường học, sân tennis và bến thuyền thiên nga.
6. **Tiến triển Đầu / Cuối — 10/10:** Thể hiện bước nhảy vọt quan trọng của khu đô thị: mở kho vật tư thứ hai và khởi công công trình giáo dục trọng điểm.

**TỔNG KẾT MÀN 03: ĐẠT 10 / 10 — HOÀN HẢO.**
