# Bảng Tự Kiểm Tra Màn 04 (Chương 2 — Khu Đô Thị Mới · Global Edition)

- **Tên màn:** Khu nhà ở (`Housing Estate`)
- **Tập tin đối chiếu:** `design/chuong_2/man_04/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_04/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_04/khung_canh_moi.png)
- **Bộ tài nguyên dùng chung:** [bo_tai_nguyen.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/bo_tai_nguyen.png)

---

## 1. Đối chiếu Logic Màn Chơi & Tiến Triển Chương 2

| Hạng mục kiểm tra | Theo yêu cầu & dữ liệu game (`du_lieu_man.json`) | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | Chuẩn canvas mở rộng 2800 × 1750 px (`viewBox="-250 -250 2800 1750"`) | Đạt chuẩn 2800 × 1750 px, giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 250 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 7 cột × 4 hàng nút, node spacing 350px. |
| **Mở rộng tuyến đường phía Nam (Hàng 3, $y=1150$)** | Thông xe toàn bộ tuyến đường $y=1150$ từ Cột 0 ($x=100$) đến Cột 4 ($x=1500$) và các trục dọc nối xuống | Tuyến đường đất trước đây được thảm nhựa hoàn thiện, có vỉa hè bê tông, vạch sơn trắng tim đường | **ĐẠT** | 31/45 cạnh đã thông xe. Mạng lưới đường phía Nam kết nối trơn tru, liền mạch với toàn khu đô thị. |
| **Công trình đang xây (M4): Khu nhà ở (KhuNha)** | `construction_site: KhuNha`, `building: {x: 567, y: 1190, w: 116, h: 58}`, `stop_xy: [625, 1150]`, `pin_xy: [625, 1222]` | Công trường xây dựng dãy nhà phố liền kề: móng cọc bê tông, cần cẩu tháp mini, xe bồn bê tông, đống gạch đỏ & cát | **ĐẠT** | Ghim ▼ tròn xanh lá (`#51cf66`), nhãn `Khu nhà ở · Housing Estate`. Stop zone dài 180px trên tuyến đường mới mở $y=1150$. |
| **Công trình hoàn thành: Trường học (TruongHoc)** | Hoàn thiện công trình sau Màn 3 đang thi công | Trường học khánh thành tuyệt đẹp: khối nhà 2 tầng chữ U mái ngói đỏ pastel `#e76f51`, sân trường cột cờ đỏ, sân bóng mini cỏ nhân tạo | **ĐẠT** | Ghim ▼ tròn cam (`#ff922b`), nhãn `Trường học · School`. Stop zone dài 180px trên trục đường $x=1500$. |
| **Công trình giao hàng: Nhà trẻ (NhaTre)** | `building: {x: 838, y: 565, w: 124, h: 120}`, `stop_xy: [800, 625]`, `pin_xy: [900, 631]` | Trường mầm non rực rỡ sắc màu, sân chơi cát, cầu trượt, xích đu | **ĐẠT** | Ghim ▼ tròn xanh mint (`#20c997`), nhãn `Nhà trẻ · Nursery`. Stop zone dài 180px trên trục đường $x=800$. |
| **Hoạt động 2 kho: Bãi vật liệu & Kho tổng** | Cả `BaiVL` và `KhoTong` cùng cấp hàng trong màn 4 | Cả 2 kho đều hoạt động nhộn nhịp, đầy đủ xe nâng, vật tư, pallet | **ĐẠT** | `BaiVL` cấp vật tư cho Nhà trẻ; `KhoTong` cấp vật tư cho Trường học, Khu nhà ở và VP dự án. |
| **Quy tắc N9 & Làm sạch đường xá** | 100% đường thông thoáng, không cây cối/vật phẩm chắn đường | Kiểm tra tự động bằng mã kiểm thử: **0 va chạm cây xanh**, **0 vật cản trên đường** | **ĐẠT** | Tuyến đường mới mở $y=1150$ hoàn toàn thông suốt, stop zone của Khu nhà ở nằm sát mép đường đúng quy chuẩn. |
| **Quy chuẩn 3 tông màu cây xanh** | Tiết chế màu sắc: chỉ dùng xanh nhạt, xanh đậm và vàng ấm | Đồng bộ 3 loại cây: `treeRoundGreen`, `treeCypress`/`treeDarkGreen`, `treeGoldenTrumpet` | **ĐẠT** | Vỉa hè tuyến đường mới mở $y=1150$ có hàng cây xanh mát, xen kẽ cây chuông vàng ấm áp. |
| **Bố cục dải công viên phía Nam** | 3 phân khu lớn ngăn nắp, gom cụm thể thao tập trung | - Khu 1: Quảng trường nước & Hoa viên đối xứng ($x \in [50, 410]$)<br>- Công trường Khu nhà ở ($x \in [567, 683]$)<br>- Khu 2: Khu liên hợp thể thao 2x2 tập trung ($x \in [760, 1140]$)<br>- Khu 3: Công viên dã ngoại gia đình ($x \in [1450, 1850]$) | **ĐẠT** | Khung cảnh dải Nam kết hợp hài hòa giữa đô thị hiện đại và cụm tiện ích thể thao bề thế. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật

1. **Nhìn mờ (Blur / Squint Test) — 10/10:** Tuyến đường phía Nam $y=1150$ mở thông tạo nên một mạng lưới ô bàn cờ hoàn chỉnh, bề thế. Mọi công trình và ghim nhiệm vụ phân bổ cân đối trên toàn bản đồ.
2. **Nhận diện (3-Second Recognition) — 10/10:** Thấy rõ bước chuyển mình ngoạn mục của đô thị: Trường học đã khánh thành với sân bóng cỏ xanh mướt, dãy nhà phố Nam đang khẩn trương thi công móng.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** 60% nền xanh đô thị pastel – 30% kiến trúc công trình hiện đại – 10% điểm nhấn (sân bóng đá mini xanh ngọc `#2f9e44`, mái trường đỏ `#e76f51`, cần cẩu vàng `#fab005`).
4. **Tương phản & Đọc chữ — 10/10:** Nhãn ghim song ngữ rõ ràng, nhãn `Khu nhà ở · Housing Estate` đặt dưới pin nổi bật trên nền cỏ xanh.
5. **Trải nghiệm thực tế (Mobile 844×390) — 10/10:** Zoom cận cảnh nhìn rõ vạch sân bóng đá mini, cột cờ trường học, từng khối móng nhà liền kề, xe nâng hàng kho tổng.
6. **Tiến triển Đầu / Cuối — 10/10:** Màn 04 chứng minh sự hoàn thiện vượt bậc: từ một khu đất trống ven đô ở Màn 1 nay đã hình thành một cộng đồng dân cư khang trang với đầy đủ trường học, nhà trẻ, kho vận và đại lộ.

**TỔNG KẾT MÀN 04: ĐẠT 10 / 10 — HOÀN HẢO.**
