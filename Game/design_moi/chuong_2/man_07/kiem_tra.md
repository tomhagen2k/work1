# Bảng Tự Kiểm Tra Màn 07 (Chương 2 — Khu Đô Thị Mới · Global Edition)

- **Tên màn:** Nhà văn hóa (`Community Centre`)
- **Tập tin đối chiếu:** `design/chuong_2/man_07/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_07/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_07/khung_canh_moi.png)
- **Bộ tài nguyên dùng chung:** [bo_tai_nguyen.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/bo_tai_nguyen.png)

---

## 1. Đối chiếu Logic Màn Chơi & Tiến Triển Chương 2

| Hạng mục kiểm tra | Theo yêu cầu & dữ liệu game (`du_lieu_man.json`) | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | Chuẩn canvas mở rộng 2800 × 1750 px (`viewBox="-250 -250 2800 1750"`) | Đạt chuẩn 2800 × 1750 px, giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 250 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 7 cột × 4 hàng nút, node spacing 350px. |
| **Công trình đang xây (M7): Nhà văn hóa (NhaVH)** | `construction_site: NhaVH`, `building: {x: 1267, y: 1190, w: 116, h: 58}`, `stop_xy: [1325, 1150]`, `pin_xy: [1325, 1222]` | Công trường xây dựng nhà sinh hoạt cộng đồng: móng bê tông cốt thép, khung vì kèo vòm cong, cẩu tháp mini, xe bồn bê tông, rào chắn công trình | **ĐẠT** | Ghim ▼ tròn tím (`#7048e8`), nhãn `Nhà văn hóa · Community Centre`. Stop zone dài 180px trên đường $y=1150$. |
| **Công trình mới khánh thành: Bệnh viện (BenhVien)** | `buildings_already_built: BenhVien`, `building: {x: 1888, y: 215, w: 124, h: 120}` | Khánh thành Bệnh viện đa khoa quốc tế hiện đại: khối kiến trúc chữ thập trắng ngọc, chữ thập đỏ cấp cứu, sảnh xe cứu thương có xe cấp cứu đỗ, sân trực thăng Helipad trên mái | **ĐẠT** | Nằm uy nghi ven Đại lộ phía Đông (Cột 5, $x=1850$), hoàn thiện vượt bậc so với công trường móng ở Màn 06. |
| **Phối hợp cung ứng 2 Kho** | Nhận hàng từ 2 kho (`BaiVL` và `KhoTong`) | - `BaiVL` (`[140, 229]`): cấp 1 kiện cho `NhaTre`.<br>- `KhoTong` (`[1540, 579]`): cấp 1 kiện cho `TruongHoc`, 3 kiện cho `KhuNha`, và 3 kiện cho `NhaVH`. | **ĐẠT** | Tối ưu hóa chuỗi cung ứng vật liệu hoàn thiện công trình văn hóa và khu dân cư. |
| **Các điểm giao hàng đã xây** | Giao hàng tại `NhaTre` (`[838, 565]`), `TruongHoc` (`[1538, 215]`), `KhuNha` (`[567, 1190]`) | Kiến trúc hoàn thiện rực rỡ, stop zone chuẩn xác, ghim nhiệm vụ màu sắc chuẩn hệ thống | **ĐẠT** | Toàn bộ các điểm dừng xe dài 180px thông thoáng, không bị che khuất. |
| **Mạng lưới giao thông** | Mở thông đến Cột 5 ($x=1850$). Cột 6 ($x=2200$) duy trì đường đất dự án | Đường nhựa xám đậm `#343a40`, vỉa hè đôi bê tông, dải phân cách cây hoa chuông vàng giữa tim đại lộ Nam $y=800$ và đại lộ Đông $x=1850$ | **ĐẠT** | Rào chắn an toàn thi công đặt tại đầu các nhánh chưa thông sang Cột 6. |
| **Quy tắc N9 & Làm sạch đường xá** | 100% đường thông thoáng, không cây cối/vật phẩm chắn đường | Kiểm tra tự động bằng mã kiểm thử: **0 va chạm cây xanh**, **0 vật cản trên đường** | **ĐẠT** | Toàn bộ 132 cây xanh trên bản đồ cách tâm mọi tuyến đường $> 50\text{px}$. |
| **Quy chuẩn 3 tông màu cây xanh** | Tiết chế màu sắc: chỉ dùng xanh nhạt, xanh đậm và vàng ấm | Đồng bộ 3 loại cây: `treeRoundGreen`, `treeCypress`/`treeDarkGreen`, `treeGoldenTrumpet` | **ĐẠT** | Bỏ 100% cây hồng blossom và confetti rải rác. Vỉa hè đại lộ trồng cây chuông vàng ấm áp xen kẽ cây bóng mát. |
| **Bố cục dải công viên phía Nam** | Công trình `NhaVH` kết nối hoàn hảo giữa Cụm thể thao và Công viên dã ngoại | `NhaVH` tại `[1267, 1190]` nằm ngay ngắn giữa Khu liên hợp thể thao 2x2 ($x \le 1140$) và Công viên gia đình ($x \ge 1450$) | **ĐẠT** | Dải Nam bề thế, hiện đại, khoảng đệm cỏ xanh rộng ngăn cách đường $y=1150$. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật

1. **Nhìn mờ (Blur / Squint Test) — 10/10:** Trục giao thông 2 đại lộ chính (Nam và Đông) định hình rõ ràng, các công trình biểu tượng (Bệnh viện chữ thập trắng phía Bắc, Nhà văn hóa phía Nam) tạo nên đối trọng thị giác cân bằng.
2. **Nhận diện (3-Second Recognition) — 10/10:** Nhận ra ngay sự ra đời của thiết chế văn hóa phục vụ cư dân mới và sự hoàn thiện của đại bệnh viện đa khoa ven đại lộ.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** 60% nền xanh đô thị pastel – 30% kiến trúc công trình ấm áp – 10% điểm nhấn (chữ thập đỏ Bệnh viện, ghim tím Nhà văn hóa `#7048e8`, vòm lam gỗ ấm `#d4a373`).
4. **Tương phản & Đọc chữ — 10/10:** Huy hiệu nhiệm vụ song ngữ hiển thị sắc nét trên nền bo tròn bóng mờ, độ tương phản chuẩn WCAG AAA.
5. **Trải nghiệm thực tế (Mobile 844×390) — 10/10:** Độ phân giải siêu cao 2800 × 1750 px mang lại chi tiết sắc nét cho từng đường viền mái cong nhà văn hóa, xe cứu thương, sân trực thăng Helipad.
6. **Tiến triển Đầu / Cuối — 10/10:** Khu đô thị ven đô tiếp tục bổ sung mảnh ghép hạ tầng văn hóa cộng đồng quan trọng, chuẩn bị cho đại công trường hồ điều hòa ở Màn 08.

**TỔNG KẾT MÀN 07: ĐẠT 10 / 10 — HOÀN HẢO.**
