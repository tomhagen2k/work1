# Yêu cầu chỉnh ảnh khung cảnh: mở rộng lề trái và phải (GH-Q2)

Dán toàn bộ nội dung dưới đây cho AI hoặc người đang vẽ khung cảnh.

---

## Bối cảnh
Game hiển thị khung cảnh bằng **ảnh xuất từ chính tệp `khung_canh_moi.svg`** của từng màn.

Khi người chơi thu nhỏ bản đồ lớn hết cỡ để xem trọn bản đồ, khung nhìn rất dẹt (khoảng 2,2 : 1, sau này có thể tới 2,33 : 1). Lúc đó game hiện **bề ngang khoảng 3.000 px**, trong khi ảnh hiện tại chỉ rộng 2.450 px (lề 250 px mỗi bên), nên hai bên bị thiếu cảnh.

## Việc cần làm
Sửa **cả 22 tệp `khung_canh_moi.svg`**: Chương 1 và Chương 2, mỗi chương gồm `man_01` → `man_10` và `man_thuong`.
- Mở rộng **lề trái và lề phải lên 600 px**.
- **Giữ lề trên và lề dưới 250 px.**

| Chương | Bản đồ chơi (không đổi) | `viewBox` mới | Khổ mới |
|---|---|---|---|
| 1 · Làng ven sông | 1950 × 1250 | `viewBox="-600 -250 3150 1750"` | 3150 × 1750 |
| 2 · Khu đô thị mới | 2300 × 1250 | `viewBox="-600 -250 3500 1750"` | 3500 × 1750 |

Cập nhật luôn thuộc tính `width` và `height` của thẻ `<svg>` theo khổ mới.

## Luật bắt buộc
1. **Không dịch toạ độ.** Gốc (0, 0) của bản đồ chơi giữ nguyên. Mọi đường, ô công trình và điểm giao vẫn ở đúng toạ độ cũ. Chỉ **vẽ thêm** ở hai dải mới: x từ −600 đến −250, và x từ (rộng bản đồ + 250) đến (rộng bản đồ + 600).
2. **Phần lề chỉ là cảnh nối tiếp**, liền mạch với mép ảnh cũ:
   - Chương 1: ruộng lúa, bờ ruộng, lũy tre, ao, đồi cây; sông phía Đông chảy tiếp và có bờ bên kia.
   - Chương 2: công viên, cây xanh, khu đất trống, mặt nước; đường cao tốc trang trí đi tiếp ra mép.
3. **Không vẽ ở phần lề:** đường giống đường chơi được, rào chắn, ghim, nhãn, công trình nổi bật hay chữ. Người chơi không được tưởng đó là nơi đi tới được.
4. **Phần lề giống hệt nhau ở mọi màn của cùng chương.** Cảnh quay chuyển giữa hai màn liên tiếp, nên lề khác nhau sẽ làm cảnh bị nháy.
5. Mép ngoài cùng của ảnh nên là **mảng màu nền đơn giản** (cỏ, nước), không cắt ngang vật thể. Nếu khung nhìn rộng hơn ảnh, game sẽ soi gương mép ảnh để lấp phần thiếu.
6. **Không cần vẽ ghim và nhãn** trong `khung_canh_moi.svg`. Game tự vẽ ghim 26 px ở góc trên công trình và nhãn chữ 11 px dưới công trình (GH-Q1 = B). Ghim to sẽ che công trình. Tệp `khung_canh_moi_co_ghim.svg` chỉ để xem duyệt.
7. Không thay đổi bất kỳ chi tiết nào bên trong vùng −250 … (rộng + 250) đã được duyệt, trừ khi BA yêu cầu.

## Kiểm tra trước khi giao
- [ ] 22 tệp đều có `viewBox` đúng như bảng trên.
- [ ] Đặt ảnh mới chồng lên ảnh cũ ở cùng toạ độ: vùng −250 … (rộng + 250) **không khác một điểm ảnh nào**.
- [ ] Phần lề của 11 màn trong cùng chương giống hệt nhau.
- [ ] Nhìn toàn ảnh ở cỡ nhỏ, không thấy đường nét đứt hoặc ranh giới giữa phần cũ và phần mới.

## Sau khi giao
BA chép đè các tệp vào `Game/design_moi/chuong_X/man_YY/`, rồi nhờ Claude chạy:

```bash
node tools/xuat_anh_canh.mjs 1 design_moi/thu_nghiem_anh/anh
```

Công cụ này đọc khổ mới từ từng SVG, nên **không phải sửa code game**.
