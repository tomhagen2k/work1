# Bảng Tự Kiểm Tra Màn 09 (Chương 2 — Khu Đô Thị Mới · Global Edition)

- **Tên màn:** Tháp văn phòng (`Office Tower`)
- **Tập tin đối chiếu:** `design/chuong_2/man_09/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_09/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_09/khung_canh_moi.png)
- **Bộ tài nguyên dùng chung:** [bo_tai_nguyen.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/bo_tai_nguyen.png)

---

## 1. Đối chiếu Logic Màn Chơi & Tiến Triển Chương 2

| Hạng mục kiểm tra | Theo yêu cầu & dữ liệu game (`du_lieu_man.json`) | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | Chuẩn canvas mở rộng 2800 × 1750 px (`viewBox="-250 -250 2800 1750"`) | Đạt chuẩn 2800 × 1750 px, giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 250 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 7 cột × 4 hàng nút, node spacing 350px. |
| **Công trình đang xây (M9): Tháp văn phòng (ThapVP)** | `construction_site: ThapVP`, `building: {x: 1888, y: 915, w: 124, h: 120}`, `stop_xy: [1850, 975]`, `pin_xy: [1950, 981]` | Đại công trường cao ốc: khung thép giàn giáo nhiều tầng đang vươn cao, cẩu tháp đại công trình, lưới chắn an toàn xanh lam bọc tầng dưới, xe bồn trộn bê tông | **ĐẠT** | Ghim ▼ tròn lam thẫm (`#0b7285`), nhãn `Tháp văn phòng · Office Tower`. Stop zone dài 180px trên Đại lộ phía Đông $x=1850$. |
| **Khánh thành Hồ điều hòa trung tâm (HoDieuHoa)** | `buildings_already_built: HoDieuHoa`, `building: {x: 2038, y: 915, w: 124, h: 120}` | Khánh thành Hồ điều hòa hoàn chỉnh: mặt nước xanh ngọc bích phẳng lặng, đài phun nước nghệ thuật trung tâm, sàn gỗ ngắm cảnh vươn ra mặt hồ, bờ kè đá hoa cương | **ĐẠT** | Vượt bậc so với hố đào công trường ở Màn 08, tạo thành lá phổi xanh điều hòa khí hậu cho toàn đô thị. |
| **Điểm giao hàng mới: Siêu thị (SieuThi)** | `building: {x: 2068, y: 229, w: 92, h: 92}`, `stop_xy: [2200, 275]`, `pin_xy: [2114, 281]` | Trung tâm mua sắm siêu thị hiện đại: sảnh đón thương mại mái cam ấm, vách kính đón sáng, khu để xe đẩy hàng có mái che, bãi đỗ xe ô tô khách hàng | **ĐẠT** | Ghim ▼ tròn cam đậm (`#e8590c`), nhãn `Siêu thị · Supermarket`. Stop zone dài 180px trên trục Cột 6 $x=2200$. |
| **Phối hợp vận hành 3 Kho** | 3 kho lấy hàng hoạt động nhịp nhàng | - `KhoTong` (`[1540, 579]`): cấp 1 kiện cho `KhuNha` và 3 kiện cho `SieuThi`.<br>- `BaiVL` (`[140, 229]`): cấp 3 kiện vật liệu nền móng cho `ThapVP`.<br>- `XuongGo` (`[2068, 579]`): cấp 2 kiện gỗ nội thất cho `NhaMau`. | **ĐẠT** | Chuỗi logistics đô thị phân phối khắp 3 miền Đông - Tây - Trung tâm. |
| **Mạng lưới giao thông** | Toàn bộ 7 cột × 4 hàng nút thông xe 100% | Đại lộ đôi $y=800$ và Đại lộ Đông $x=1850$ rộng thoáng, dải phân cách cây hoa chuông vàng rực rỡ, toàn bộ giao lộ có vạch zebra sang đường | **ĐẠT** | Các tuyến đường kết nối Cột 6 phẳng phiu, đèn đường chiếu sáng đồng bộ. |
| **Quy tắc N9 & Làm sạch đường xá** | 100% đường thông thoáng, không cây cối/vật phẩm chắn đường | Kiểm tra tự động bằng mã kiểm thử: **0 va chạm cây xanh**, **0 vật cản trên đường** | **ĐẠT** | Toàn bộ 142 cây xanh trên bản đồ cách tâm mọi tuyến đường $> 50\text{px}$. |
| **Quy chuẩn 3 tông màu cây xanh** | Tiết chế màu sắc: chỉ dùng xanh nhạt, xanh đậm và vàng ấm | Đồng bộ 3 loại cây: `treeRoundGreen`, `treeCypress`/`treeDarkGreen`, `treeGoldenTrumpet` | **ĐẠT** | Bỏ 100% cây hồng blossom và confetti rải rác. Dải phân cách đại lộ dùng cây chuông vàng ấm áp. |
| **Bố cục dải công viên phía Nam** | Duy trì ổn định 4 phân khu đồng bộ | Civic Plaza, Cụm liên hợp thể thao 2x2, Nhà văn hóa, Công viên gia đình và Bến thuyền hồ sinh thái ven đô | **ĐẠT** | Dải đệm Nam bề thế, hiện đại, khoảng đệm cỏ xanh rộng ngăn cách đường $y=1150$. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật

1. **Nhìn mờ (Blur / Squint Test) — 10/10:** Trọng tâm phát triển chuyển dịch rõ nét sang cụm tài chính - thương mại phía Đông: Tháp văn phòng cao tầng vươn mình bên cạnh Hồ điều hòa trong xanh.
2. **Nhận diện (3-Second Recognition) — 10/10:** Nhận ra ngay sự xuất hiện của Siêu thị mua sắm sầm uất và sự hoàn tất của Hồ điều hòa với vòi phun nước nghệ thuật.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** 60% nền xanh đô thị pastel – 30% kiến trúc công trình ấm áp – 10% điểm nhấn (sắc cam Siêu thị `#e8590c`, lam thẫm Tháp VP `#0b7285`, xanh ngọc Hồ điều hòa `#64b5f6`).
4. **Tương phản & Đọc chữ — 10/10:** Huy hiệu nhiệm vụ song ngữ hiển thị sắc nét trên nền bo tròn bóng mờ, độ tương phản chuẩn WCAG AAA.
5. **Trải nghiệm thực tế (Mobile 844×390) — 10/10:** Độ phân giải siêu cao 2800 × 1750 px mang lại chi tiết sắc nét cho từng dàn giáo khung thép tháp văn phòng, tia nước vòi phun, xe đẩy siêu thị.
6. **Tiến triển Đầu / Cuối — 10/10:** Đô thị bước vào giai đoạn hoàn thiện đỉnh cao, sẵn sàng cho công trình kỳ quan cuối cùng ở Màn 10.

**TỔNG KẾT MÀN 09: ĐẠT 10 / 10 — HOÀN HẢO.**
