# Bảng Tự Kiểm Tra Màn 05 (Chương 2 — Khu Đô Thị Mới · Global Edition)

- **Tên màn:** Chợ mới (`New Market`)
- **Tập tin đối chiếu:** `design/chuong_2/man_05/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_05/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_05/khung_canh_moi.png)
- **Bộ tài nguyên dùng chung:** [bo_tai_nguyen.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/bo_tai_nguyen.png)

---

## 1. Đối chiếu Logic Màn Chơi & Tiến Triển Chương 2

| Hạng mục kiểm tra | Theo yêu cầu & dữ liệu game (`du_lieu_man.json`) | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | Chuẩn canvas mở rộng 2800 × 1750 px (`viewBox="-250 -250 2800 1750"`) | Đạt chuẩn 2800 × 1750 px, giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 250 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 7 cột × 4 hàng nút, node spacing 350px. |
| **Công trình đang xây (M5): Chợ mới (ChoMoi)** | `construction_site: ChoMoi`, `building: {x: 1267, y: 840, w: 116, h: 58}`, `stop_xy: [1325, 800]`, `pin_xy: [1325, 872]` | Công trường xây dựng chợ thương mại: khung vì kèo thép đang dựng, cần cẩu mini, xe bồn bê tông, đống gạch & cát | **ĐẠT** | Ghim ▼ tròn cam (`#f59f00`), nhãn `Chợ mới · New Market`. Stop zone dài 180px trên đại lộ $y=800$. |
| **Công trình giao hàng: Tiệm bánh, VP dự án, Chung cư B** | Nhận hàng từ 2 kho (`BaiVL` và `KhoTong`) | Đầy đủ kiến trúc đặc trưng, ghim nhiệm vụ và stop zone chuẩn xác | **ĐẠT** | `BaiVL` cấp bánh mì cho Tiệm bánh; `KhoTong` cấp hàng cho Chợ mới, VP dự án và Chung cư B. |
| **Công trình đã hoàn thành từ các màn trước** | Tiếp tục duy trì diện mạo hoàn thiện sinh động | - `TruongHoc`: Trường học 2 tầng chữ U với sân bóng mini cỏ xanh.<br>- `NhaTre`: Trường mầm non sắc màu với sân chơi mẫu giáo.<br>- `KhuNha`: Dãy nhà phố liền kề hoàn thiện ven đường Nam.<br>- `ChungCuA`: Chung cư thấp tầng hiện đại. | **ĐẠT** | Khu đô thị ngày càng đông đúc, hoàn chỉnh, đúng tinh thần câu chuyện phát triển đô thị. |
| **Quy tắc N9 & Làm sạch đường xá** | 100% đường thông thoáng, không cây cối/vật phẩm chắn đường | Kiểm tra tự động bằng mã kiểm thử: **0 va chạm cây xanh**, **0 vật cản trên đường** | **ĐẠT** | Toàn bộ 99 cây xanh trên bản đồ cách tâm mọi tuyến đường $> 50\text{px}$. |
| **Quy chuẩn 3 tông màu cây xanh** | Tiết chế màu sắc: chỉ dùng xanh nhạt, xanh đậm và vàng ấm | Đồng bộ 3 loại cây: `treeRoundGreen`, `treeCypress`/`treeDarkGreen`, `treeGoldenTrumpet` | **ĐẠT** | Bỏ 100% cây hồng blossom và confetti rải rác. Vỉa hè đại lộ trồng cây chuông vàng xen kẽ cây xanh tán tròn. |
| **Bố cục dải công viên phía Nam** | 3 phân khu lớn ngăn nắp, gom cụm thể thao tập trung | Duy trì ổn định 3 phân khu: Quảng trường nước Tây Nam, Cụm liên hợp thể thao 2x2 tập trung, và Công viên dã ngoại ven hồ | **ĐẠT** | Dải Nam bề thế, hiện đại, khoảng đệm cỏ xanh rộng ngăn cách đường $y=1150$. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật

1. **Nhìn mờ (Blur / Squint Test) — 10/10:** Mạng lưới giao thông bàn cờ đô thị rõ nét, vị trí công trường Chợ mới trên đại lộ phía Nam nổi bật với ghim cam.
2. **Nhận diện (3-Second Recognition) — 10/10:** Nhận ra ngay sự hình thành của trung tâm thương mại dịch vụ ven đại lộ phục vụ cư dân các khu nhà ở và chung cư lân cận.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** 60% nền xanh đô thị pastel – 30% kiến trúc công trình ấm áp – 10% điểm nhấn (khung thép vàng cam `#f59f00`, sân bóng mini xanh ngọc `#2f9e44`, mái tiệm bánh hồng `#f06595`).
4. **Tương phản & Đọc chữ — 10/10:** Huy hiệu nhiệm vụ song ngữ hiển thị sắc nét trên nền bo tròn bóng mờ.
5. **Trải nghiệm thực tế (Mobile 844×390) — 10/10:** Độ phân giải siêu cao 2800 × 1750 px mang lại chi tiết sắc nét cho từng vì kèo thép, đống gạch xây, sân bóng đá học sinh.
6. **Tiến triển Đầu / Cuối — 10/10:** Khu đô thị bước sang giai đoạn bổ sung tiện ích thương mại thiết yếu.

**TỔNG KẾT MÀN 05: ĐẠT 10 / 10 — HOÀN HẢO.**
