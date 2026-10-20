# Yêu cầu sửa khổ ảnh khung cảnh — phải có lề quanh bản đồ (GH-Q2, D-77)

Dán nguyên phần trong khung dưới đây cho AI đang vẽ khung cảnh. Áp dụng cho mọi chương; bảng khổ ảnh có đủ Chương 1–4.

---

````text
# VẤN ĐỀ CỦA BẢN ĐANG LÀM
Ảnh bạn đang vẽ CHỈ có phần bản đồ chơi (khoảng 2650×1250 hoặc nhỏ hơn) và còn bị thu nhỏ. Trong game, khi người chơi
thu nhỏ bản đồ hết cỡ, hoặc camera đi tới sát mép bản đồ, màn hình dẹt (khoảng 2,2–2,33 : 1) nên lộ ra cả vùng XUNG QUANH
bản đồ. Ảnh thiếu vùng đó thì phần quanh bản đồ trống trơn. Hãy làm lại theo đúng khổ dưới đây.

# KHỔ ẢNH BẮT BUỘC (mỗi màn, cả màn thưởng)
Ảnh = bản đồ chơi + LỀ: trái 600, phải 600, trên 250, dưới 250 (đơn vị = pixel toạ độ game).

| Chương | Bản đồ chơi (giữ nguyên) | viewBox của SVG             | Khổ (đơn vị game) | Ảnh raster nét ×2 |
|---|---|---|---|---|
| 1 · Làng ven sông       | 1950 × 1250 | -600 -250 3150 1750 | 3150 × 1750 | 6300 × 3500 |
| 2 · Khu đô thị mới      | 2300 × 1250 | -600 -250 3500 1750 | 3500 × 1750 | 7000 × 3500 |
| 3 · Thành phố Không Ngủ | 2650 × 1250 | -600 -250 3850 1750 | 3850 × 1750 | 7700 × 3500 |
| 4 · Đảo Mây Trắng       | 2650 × 1250 | -600 -250 3850 1750 | 3850 × 1750 | 7700 × 3500 |

- Thẻ gốc phải đúng như sau (ví dụ Chương 3, 4):
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-600 -250 3850 1750" width="3850" height="1750">
- KHÔNG thu nhỏ, KHÔNG dịch, KHÔNG xoay. 1 đơn vị SVG = 1 px toạ độ game. Gốc (0,0) của bản đồ chơi vẫn là (0,0)
  (trong ảnh raster ×2 nó nằm ở pixel (1200, 500)). Công thức: pixel_raster = (toạ_độ_game + (600, 250)) × 2.
- Mọi toạ độ trong du_lieu_man.json (nodes, stop_xy, building, pin_xy) dùng NGUYÊN như vậy, không quy đổi.
- Nếu bạn vẽ bằng ảnh raster: vẽ ở 7700×3500 (Ch.3, 4), rồi nhúng vào SVG bằng
  <image href="..." x="-600" y="-250" width="3850" height="1750"/> — ảnh phải khớp đúng khung này.
  Kiểm tra: tâm nút c0r0 = toạ độ (100,100) phải rơi đúng pixel (1400, 700) của ảnh ×2.

# TỆP GIAO (mỗi màn: chuong_N/man_XX/, kể cả man_thuong)
- khung_canh_moi.svg        ← BẮT BUỘC: khổ như bảng, KHÔNG có ghim và nhãn (game tự vẽ ghim 26 px và nhãn chữ). Game xuất ảnh từ chính tệp này.
- khung_canh_moi_co_ghim.svg ← cùng khổ, thêm ghim + nhãn, chỉ để duyệt.
- khung_canh_moi.png        ← ảnh xem trước, render từ SVG ở nét ×2 (7700×3500 cho Ch.3, 4).
- Phông chữ (nếu có chữ): Nunito 700–900. Không nhúng ảnh ngoài bằng đường dẫn tuyệt đối; ảnh raster nhúng base64 hoặc để cùng thư mục.

# VẼ GÌ Ở LỀ (vùng ngoài 0…rộng, 0…1250)
Luật chung:
1. Lề chỉ là CẢNH NỐI TIẾP, liền mạch với mép bản đồ. KHÔNG vẽ ở lề: đường trông như đi được, rào chắn, ghim, nhãn,
   chữ, công trình nổi bật. Người chơi không được tưởng đó là nơi lái tới được.
   (Đường "chưa thông xe" và các đoạn đường có trong edges vẫn chỉ nằm trong bản đồ chơi như hiện tại.)
2. Lề GIỐNG HỆT NHAU ở mọi màn của cùng chương (cảnh quay chuyển màn sẽ nháy nếu khác). Riêng các vật dưới đây
   gắn với công trình thì xuất hiện theo tiến độ màn.
3. Mép ngoài cùng của ảnh là mảng màu nền đơn giản (nước, cỏ, mặt tối) — không cắt ngang vật thể; game soi gương mép ảnh nếu khung nhìn rộng hơn.
4. Lề phải đủ "đẹp mà lùi về sau": ít chi tiết hơn bản đồ chơi, không tranh sự chú ý với đường và ghim.

Chương 3 — Thành phố Không Ngủ (đêm):
- Thành phố là một hòn đảo: SÔNG phía Tây, phía Nam (cảng) và phía Đông (mặt nước tối #14233a, gợn sóng nhạt); phía Bắc
  là PHỐ TỐI tiếp diễn (khối nhà mái tối, ít cửa sáng, không neon).
- Bờ bên kia sông ở mép xa có thể thấy dải phố mờ, đèn vàng lác đác.
- Gắn theo tiến độ: CẦU TREO từ ô Cầu treo (tâm x ≈ 2025, ô 1967–2083) chạy thẳng xuống sông phía Nam ra tới mép ảnh — tối khi chưa xây, lên đèn (dây cáp, đèn vàng) từ khi công trình màn 6 xong.
- Tham khảo cách code đang vẽ: hàm drawNight trong 00_tong_quan/ma_nguon_demo/index.html.

Chương 4 — Đảo Mây Trắng (hoàng hôn):
- PHÍA TÂY: vách núi lửa nhiều lớp đá (đỏ nâu, đen, vàng đất) từ mép bản đồ đổ xuống biển caldera (#1b8fc4); nhà hang trắng
  xếp tầng trên vách; ĐẢO NÚI LỬA tối có miệng núi ở khoảng x −520…−170, y 300…720; thuyền buồm, ánh nắng chiều lấp lánh trên mặt biển.
- PHÍA NAM: bãi cát đen dọc mép bản đồ rồi biển.  PHÍA ĐÔNG: vườn nho, ô liu, rồi bờ đá và biển.  PHÍA BẮC: thị trấn trắng bạc màu, đồi.
- Gắn theo tiến độ:
  • BẾN PHÀ (từ màn 3): cầu tàu gỗ từ ô Bến phà (x ≈ 2025) ra biển phía Nam, PHÀ TRẮNG đậu cạnh — phải thấy ngay "có phà đang chờ".
  • CẢNG CŨ (dưới vách, màn 7 trở đi có tàu): bậc thang zíc zắc và cáp treo từ ô Cảng cũ (y ≈ 975) xuống cầu cảng ở khoảng
    x −150…−66, y 1015…1065; TÀU GỖ du lịch đậu ở khoảng x −215…−185, y 955…1030.
  • KHO CẢNG: cáp tời từ kho (y ≈ 625) xuống vách phía Tây.
- Tham khảo: hàm drawSanto trong 00_tong_quan/ma_nguon_demo/index.html.

# KIỂM TRA TRƯỚC KHI GIAO
- [ ] Mọi khung_canh_moi.svg có viewBox, width, height đúng bảng (Ch.3, 4: -600 -250 3850 1750).
- [ ] Chồng 4_ban_do_co_ghim.png (bản đồ 2650×1250) lên ảnh mới tại toạ độ (0,0): đường, giao lộ, ô công trình khớp từng pixel.
- [ ] Vùng lề của mọi màn cùng chương giống nhau (trừ cầu treo / bến phà / cảng cũ theo tiến độ).
- [ ] Không có đường, rào, ghim, chữ ở lề; mép ảnh là màu nền đơn giản.
- [ ] Xem ảnh ở cỡ nhỏ: không thấy đường nối giữa phần bản đồ và phần lề.
````

---

## Sau khi nhận

BA chép các tệp vào `Game/design_moi/chuong_N/man_XX/`, rồi nhờ Claude xuất ảnh vào game:

```bash
node Game/tools/xuat_anh_canh.mjs 3 Game/demo/canh
```

Công cụ đọc khổ từ `viewBox` của từng SVG và ghi vào `Game/demo/canh/manifest.js`, nên không phải sửa code game. Sau đó đổi `CH3.draw` thành `imgDraw(3,o)||drawNight(o)` (Chương 4: `imgDraw(4,o)||drawSanto(o)`).
