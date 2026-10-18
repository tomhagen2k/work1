# Bản thử DÙNG ẢNH — Chương 1, đủ 11 màn

| Mục | Nội dung |
|---|---|
| Ngày | 18/10/2026 |
| Mở | `http://localhost:8765/design_moi/thu_nghiem_anh/index.html#lv=1` (đổi số 1 → 10; `#lv=21` là màn thưởng). Thêm `&anh=goc` để dùng nguyên PNG bạn gửi; thêm `&canh=cu` để xem cảnh cũ |
| Bản gốc | `demo/index.html` **không bị sửa** |
| Ảnh | `anh/c1_man_01.webp` → `c1_man_thuong.webp`: xuất từ `khung_canh_moi.svg` của bạn, **nét gấp đôi (4900×3500)**, WebP chất lượng 90 |

## 1. Cách làm
- **Mỗi màn dùng 1 ảnh toàn bản đồ**, gồm cả lề 250 px. Game chỉ vẽ thêm phần thay đổi theo lúc chơi: xe, ghim, nhãn, nhiệm vụ, mini map.
- **Ghim và nhãn** do game vẽ theo đúng kiểu trong thiết kế (vì nhãn phải thay đổi theo nhiệm vụ và ngôn ngữ).
- **Cảnh quay sau khi thắng:** nền là ảnh màn vừa chơi; **mảnh cắt từ ảnh màn sau, đúng ô công trình**, nảy lên; sau đó cả ảnh màn sau hiện ra, gồm đường mới thông.
- Trang chủ, bưu thiếp và bản đồ chương dùng ảnh của màn tương ứng với tiến độ.

## 2. Kết quả

| Kiểm tra | Kết quả |
|---|---|
| Logic 22 màn (đường, điểm, nhiệm vụ, thời gian, vùng thông xe, ô công trình) so với bản gốc | ✅ Giống hệt |
| Hình cảnh | ✅ Chính là ảnh xuất từ thiết kế của bạn |
| Cảnh quay màn 1→2, 2→3, 7→8, kết chương | ✅ (`kiem_thu/canh_quay_*.png`) |
| Độ mượt khi lái | ✅ **60 khung/giây** (bản code: khoảng 40; cảnh cũ: 60) |
| Dựng màn | ✅ 2 ms (chỉ có 31 phần tử vẽ) |
| **Dung lượng** | **0,43–0,47 MB mỗi màn**, cả Chương 1 là 4,9 MB. Ước tính 15 chương × 11 màn là khoảng **75 MB** |

## 3. Lưu ý khi đưa lên điện thoại
- **Bộ nhớ:** một ảnh 4900×3500 khi giải nén tốn khoảng **69 MB RAM**. Trong cảnh quay có 2 ảnh cùng lúc, tức khoảng 140 MB. Trên điện thoại nên giảm xuống ×1,8 (4410×3150, khoảng 56 MB) hoặc chia ảnh thành ô (xem đề xuất công nghệ).
- **Phóng to quá ×2 sẽ hơi mềm.** Camera của game hiện chưa phóng tới mức đó.
- **Mỗi lần sửa thiết kế phải xuất lại ảnh.** Có thể làm tự động bằng script.
- **Cảnh quay kém sinh động hơn bản code:** chỉ công trình nảy lên, phần còn lại hiện dần cả mảng. Bản code cho từng nhóm (cây, nhà) mọc riêng.

## 4. Quyết định ngày 18/10 và đã làm

| ID | Quyết định | Đã làm trong bản thử |
|---|---|---|
| GH-Q1 | **B**: ghim nhỏ cùng kiểu thiết kế | Ghim 26 px đặt ở góc trên bên phải công trình; nhãn chữ 11 px viền trắng, không hộp, nằm dưới công trình. Công trình không còn bị che |
| GH-Q2 | **Cách 1**: mở rộng lề trái và phải của ảnh lên 600 px | Gửi yêu cầu vẽ: [../YEU_CAU_MO_RONG_LE.md](../YEU_CAU_MO_RONG_LE.md). Game đọc khổ ảnh từng màn từ `anh/manifest.js`, do `tools/xuat_anh_canh.mjs` sinh ra khi xuất ảnh, nên ảnh mới chỉ cần chạy lại công cụ, không phải sửa code. Dự phòng: ngoài mép ảnh, game soi gương ảnh ra cả 4 phía, thay cho màu nền phẳng trước đây |
