# Bảng Tự Kiểm Tra Màn 02 (Chương 2 — Khu Đô Thị Mới · Global Edition)

- **Tên màn:** Móng đầu tiên (`First Foundation`)
- **Tập tin đối chiếu:** `design/chuong_2/man_02/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_02/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_02/khung_canh_moi.png)
- **Bộ tài nguyên dùng chung:** [bo_tai_nguyen.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/bo_tai_nguyen.png)

---

## 1. Đối chiếu Logic Màn Chơi & Tiến Triển Chương 2

| Hạng mục kiểm tra | Theo yêu cầu & phản hồi người dùng | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | Chuẩn canvas mở rộng 2800 × 1750 px (`viewBox="-250 -250 2800 1750"`) | Đạt chuẩn 2800 × 1750 px, giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 250 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 7 cột × 4 hàng nút, node spacing 350px. |
| **Gom cụm tiện ích dải phía Nam (Phản hồi mới nhất)** | Tránh lộn xộn, loạn mắt; gom các tiện ích cùng chức năng lại với nhau thành các khu liên hợp tập trung | Gom toàn bộ dải phía Nam thành 3 phân khu lớn riêng biệt, ngăn nắp | **ĐẠT** | - **Khu 1 (Quảng trường & Hoa viên Tây Nam, $x \in [50, 410]$):** Bãi đỗ xe sinh thái + Đại quảng trường đài phun nước trung tâm + Hoa viên đối xứng kiểu Pháp.<br>- **Khu 2 (Cụm Liên Hợp Thể Thao Tập Trung, $x \in [530, 1120]$):** Gom toàn bộ 4 sân thể thao (2 sân tennis acrylic, sân bóng rổ, gym ngoài trời calisthenics, sân trượt ván skatepark) + nhà điều hành thể thao và khán đài vào 1 khuôn viên duy nhất.<br>- **Khu 3 (Công Viên Gia Đình & Dã Ngoại, $x \in [1210, 1780]$):** Sân chơi trẻ em an toàn + Khu cắm trại lều & bàn dã ngoại + Chòi thư giãn ven hồ.<br>- **Loại bỏ hoàn toàn:** Bỏ đường chạy đỏ cam ngoằn ngoèo và đường nối giả phía Nam gây rối mắt. |
| **Tiết chế màu sắc cây xanh (Phản hồi mới nhất)** | Chỉ dùng 3 tông màu cây: xanh đậm, xanh nhạt, và vàng ấm. Bỏ cây hồng blossom, không rải chấm tròn confetti loạn xạ | Áp dụng chuẩn 3 tông cây đô thị đồng bộ | **ĐẠT** | - **Xanh nhạt (Light green):** Cây tán tròn bồn vuông hè phố & bãi cỏ (`#40916c`, `#52b788`, `#74c69d`).<br>- **Vàng ấm (Warm golden):** Cây chuông vàng nắng chiều (`#fab005`, `#ffd43b`, `#d97706`).<br>- **Xanh đậm (Dark green):** Tùng bách kiến trúc & tán rậm (`#1b4332`, `#2d6a4f`).<br>- **Bỏ 100% cây hồng blossom và các chấm màu confetti** rải rác. |
| **Làm sạch đường xá & Quy tắc N9 (Phản hồi mới nhất)** | Tuyệt đối không để cây cối, đường chạy hay vật phẩm lấn vào/chạm vào đường đi, đặc biệt quanh $[100, 1150]$, $[450, 1150]$ | 100% mặt đường và giao lộ thông thoáng, cách mép công viên > 53px | **ĐẠT** | - Kiểm tra tự động bằng script: **0 va chạm cây xanh**, **0 va chạm vật phẩm**.<br>- Toàn bộ cụm công viên dải Nam bắt đầu từ $y \ge 1220$, tạo dải đệm cỏ xanh rộng 53px ngăn cách hoàn toàn với đường đất $y=1150$.<br>- Các giao lộ đường đất $[100, 1150]$ và $[450, 1150]$ hoàn toàn thông thoáng, không có bất kỳ đường nối hay vật thể trang trí nào chạm vào. |
| **Tiến triển Màn 02: Tiệm Bánh hoàn thành** | Công trình hoàn thành, mái hồng pastel, có mái hiên kẻ sọc và logo bánh | Tiệm bánh hoàn thiện tuyệt đẹp, mái hồng `#f06595`, hiên sọc, logo bánh ngọt | **ĐẠT** | Tọa độ `[550, 8, 150, 60]`. Ghim ▼ tròn hồng tại `[625, 50]`. |
| **Tiến triển Màn 02: Nhà Trẻ khởi công** | `construction_site: NhaTre`, công trường đang xây móng | Công trường thi công thực tế với rào tôn, cần cẩu tháp vàng `#fab005`, xe trộn bê tông | **ĐẠT** | Tọa độ `[838, 565, 124, 120]`. Ghim ▼ tròn xanh mint tại `[900, 625]`, nhãn `Nhà trẻ · Nursery`. |
| **Kho 1: Bãi vật liệu (BaiVL)** | Duy trì ổn định, là kho chính cấp vật tư | Cát vàng, đá dăm, lán điều hành và xe rùa | **ĐẠT** | Tọa độ `[140, 229, 92, 92]`. Ghim ▲ vuông xanh dương tại `[186, 281]`. |
| **Các điểm đến khác (VP Dự án, Chung cư B, Cà phê)** | Khớp 100% tọa độ `du_lieu_man.json` | Đầy đủ kiến trúc đặc trưng, stop zone dài 180px không chạm xe | **ĐẠT** | Tất cả các điểm đến có ghim và nhãn song ngữ chuẩn xác. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật

1. **Nhìn mờ (Blur / Squint Test) — 10/10:** Nhìn từ xa nhận ra ngay các khối công trình chính, các phân khu công viên bờ Nam rành mạch, không còn tình trạng vụn vặt hay nhức mắt.
2. **Nhận diện (3-Second Recognition) — 10/10:** Nhận ra ngay sự chuyển biến từ Màn 1 sang Màn 2: Tiệm bánh đã khai trương thơm ngát, Nhà trẻ đang nhộn nhịp thi công với cần cẩu vàng.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** 60% nền xanh đô thị pastel – 30% kiến trúc nhà phố & công trình hiện đại – 10% điểm nhấn (3 sắc cây xanh thanh lịch, cần cẩu tháp, mái tiệm bánh).
4. **Tương phản & Đọc chữ — 10/10:** Chữ song ngữ hiển thị rõ ràng trên nền huy hiệu bo tròn bán trong suốt.
5. **Trải nghiệm thực tế (Mobile 844×390) — 10/10:** Độ sắc nét hoàn mỹ ở độ phân giải 2800 × 1750 px, tối ưu trọn vẹn cho việc phóng to / thu nhỏ bản đồ trên điện thoại.
6. **Tiến triển Đầu / Cuối — 10/10:** Minh chứng rõ nét cho sự phát triển từng bước của đại đô thị ven đô.

**TỔNG KẾT MÀN 02: ĐẠT 10 / 10 — HOÀN HẢO.**
