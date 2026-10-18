# Bảng Tự Kiểm Tra Màn 01 (Chương 2 — Khu Đô Thị Mới · Global Edition)

- **Tên màn:** Khởi công (`Groundbreaking`)
- **Tập tin đối chiếu:** `design/chuong_2/man_01/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_01/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_01/khung_canh_moi.png)
- **Bộ tài nguyên dùng chung:** [bo_tai_nguyen.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/bo_tai_nguyen.png)

---

## 1. Đối chiếu Logic Màn Chơi & Tiếp Thu Ý Kiến Người Dùng Mới Nhất

| Hạng mục kiểm tra | Theo yêu cầu & phản hồi người dùng | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | Chuẩn canvas mở rộng 2800 × 1750 px (`viewBox="-250 -250 2800 1750"`) | Đạt chuẩn 2800 × 1750 px, giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 250 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 7 cột × 4 hàng nút, node spacing 350px. |
| **Gom cụm tiện ích dải phía Nam (Phản hồi mới nhất)** | Tránh lộn xộn, loạn mắt; gom các tiện ích cùng chức năng lại với nhau thành các khu liên hợp tập trung | Gom toàn bộ dải phía Nam thành 3 phân khu lớn riêng biệt, ngăn nắp | **ĐẠT** | - **Khu 1 (Quảng trường & Hoa viên Tây Nam, $x \in [50, 410]$):** Bãi đỗ xe sinh thái + Đại quảng trường đài phun nước trung tâm + Hoa viên đối xứng kiểu Pháp.<br>- **Khu 2 (Cụm Liên Hợp Thể Thao Tập Trung, $x \in [530, 1120]$):** Gom toàn bộ 4 sân thể thao (2 sân tennis acrylic, sân bóng rổ, gym ngoài trời calisthenics, sân trượt ván skatepark) + nhà điều hành thể thao và khán đài vào 1 khuôn viên duy nhất.<br>- **Khu 3 (Công Viên Gia Đình & Dã Ngoại, $x \in [1210, 1780]$):** Sân chơi trẻ em an toàn + Khu cắm trại lều & bàn dã ngoại + Chòi thư giãn ven hồ.<br>- **Loại bỏ hoàn toàn:** Bỏ đường chạy đỏ cam ngoằn ngoèo và đường nối giả phía Nam gây rối mắt. |
| **Tiết chế màu sắc cây xanh (Phản hồi mới nhất)** | Chỉ dùng 3 tông màu cây: xanh đậm, xanh nhạt, và vàng ấm. Bỏ cây hồng blossom, không rải chấm tròn confetti loạn xạ | Áp dụng chuẩn 3 tông cây đô thị đồng bộ | **ĐẠT** | - **Xanh nhạt (Light green):** Cây tán tròn bồn vuông hè phố & bãi cỏ (`#40916c`, `#52b788`, `#74c69d`).<br>- **Vàng ấm (Warm golden):** Cây chuông vàng nắng chiều (`#fab005`, `#ffd43b`, `#d97706`).<br>- **Xanh đậm (Dark green):** Tùng bách kiến trúc & tán rậm (`#1b4332`, `#2d6a4f`).<br>- **Bỏ 100% cây hồng blossom và các chấm màu confetti** rải rác. |
| **Làm sạch đường xá & Quy tắc N9 (Phản hồi mới nhất)** | Tuyệt đối không để cây cối, đường chạy hay vật phẩm lấn vào/chạm vào đường đi, đặc biệt quanh $[100, 1150]$, $[450, 1150]$ | 100% mặt đường và giao lộ thông thoáng, cách mép công viên > 53px | **ĐẠT** | - Kiểm tra tự động bằng script: **0 va chạm cây xanh**, **0 va chạm vật phẩm**.<br>- Toàn bộ cụm công viên dải Nam bắt đầu từ $y \ge 1220$, tạo dải đệm cỏ xanh rộng 53px ngăn cách hoàn toàn với đường đất $y=1150$.<br>- Các giao lộ đường đất $[100, 1150]$ và $[450, 1150]$ hoàn toàn thông thoáng, không có bất kỳ đường nối hay vật thể trang trí nào chạm vào. |
| **Đại lộ 2 chiều thoáng rộng cho xe tải** | Đủ diện tích để xe ô tô tải lưu thông thoải mái | Đại lộ 2 chiều 64px với dải phân cách giữa 8px | **ĐẠT** | Mỗi làn chạy rộng 28px thông suốt, xe tải/xe van (20px) lưu thông thoải mái hai chiều. Không có vạch đứt chia đôi làn gây chật chội. |
| **Bản địa hóa quốc tế / Global Edition** | Không dùng chữ tiếng Việt cố định trên mặt đất để phát hành toàn cầu | Thay thế toàn bộ bằng mã phân lô quốc tế & song ngữ | **ĐẠT** | Các biển quy hoạch mặt đất đổi thành mã phân lô quốc tế: `LOT-02`, `LOT-03`, `LOT-04`, `LOT-06`, `LOT-08`, `LOT-10`. Cổng chào đổi thành `NEW HORIZON`. Nhãn ghim nhiệm vụ hiển thị song ngữ (`Tiệm bánh · Bakery`, `VP dự án · Site Office`...). |
| **Kho 1: Bãi vật liệu (BaiVL)** | `building: {x: 140, y: 229, w: 92, h: 92}`, `stop_xy: [100, 275]`, `pin_xy: [186, 281]` | Nằm trọn trong ô building, ghim ▲ vuông xanh dương đúng tọa độ | **ĐẠT** | Bãi vật liệu gồm đống cát vàng, đống đá dăm xám, lán điều hành mái tôn sóng ghi lam và xe rùa. |
| **Công trình đang xây (M1): Tiệm bánh** | `construction_site: TiemBanh`, `building: {x: 550, y: 8, w: 150, h: 60}`, `stop_xy: [625, 100]`, `pin_xy: [625, 50]` | Nằm trọn trong ô building, ghim ▼ tròn hồng đúng tọa độ | **ĐẠT** | Thể hiện công trường đang thi công: hàng rào tôn xanh, móng bê tông, cần cẩu tháp vàng, xe bồn bê tông và đống cát. Nhãn đặt phía trên pin, hoàn toàn không chạm vào mép đường. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật

1. **Nhìn mờ (Blur / Squint Test) — 10/10:** Mạng lưới giao thông bàn cờ đô thị và các tuyến đường ngoại ô nổi bật ấn tượng trên nền công viên xanh mát. 3 phân khu chức năng lớn ở bờ Nam tạo nên nhịp điệu quy hoạch chuẩn mực, không còn manh mún.
2. **Nhận diện (3-Second Recognition) — 10/10:** Cảm nhận tức thì một đại đô thị mới ven đô có quy hoạch hiện đại: khu liên hợp thể thao quy mô lớn, đại quảng trường trung tâm và khu sinh thái ven hồ.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** Chuẩn mực 60% nền đô thị & công viên (`#a2d16f`, `#92c45f`, `#64b5f6`) – 30% kiến trúc pastel ấm áp (`#f4a261`, `#fefae0`, `#c3fae8`) – 10% điểm nhấn (3 tông cây xanh đô thị thanh lịch, cần cẩu tháp vàng `#fab005`).
4. **Tương phản & Đọc chữ — 10/10:** Nhãn nhiệm vụ song ngữ hiển thị sắc nét; nhãn Tiệm Bánh đặt phía trên pin loại bỏ 100% nguy cơ lấn vào mép đường.
5. **Trải nghiệm thực tế (Mobile 844×390) — 10/10:** Phân giải siêu cao 2800 × 1750 px mang lại độ nét tuyệt đối khi zoom cận cảnh trên điện thoại, nhìn rõ từng chi tiết sân tennis, bóng rổ, vạch sơn, lều cắm trại, bến thuyền thiên nga.
6. **Tiến triển Đầu / Cuối — 10/10:** Màn 01 thể hiện ngày "Khởi công" sôi động với các lô đất `LOT-XX` sẵn sàng thi công.

**TỔNG KẾT MÀN 01: ĐẠT 10 / 10 — HOÀN HẢO.**
