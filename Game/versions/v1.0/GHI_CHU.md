# Demo v1.0 — chốt 15/10/2026


Tóm tắt: Bản gốc khi bắt đầu quản lý phiên bản — 10 màn trong 2 chương, điều khiển 4 hướng, xe tự dừng và bảng hỏi ở điểm, Chương 2 xây dựng dần, bản đồ lớn phóng to/thu nhỏ, màn chuẩn bị ghi nhiệm vụ trên bản đồ.

Tài liệu yêu cầu: v1.9

### Thêm

Đây là bản đầu tiên nên liệt kê toàn bộ nội dung đang có:

- Trang chủ: cột chương bên trái, con đường leo theo màn (D-29); 4 chương, 2 chương chơi được.
- Màn chuẩn bị theo PA2: nhiệm vụ ghi ngay dưới điểm giao trên bản đồ, nhãn tự tránh chồng nhau; cột phải: thời gian, xe, Bắt đầu (D-34).
- Điều khiển: 4 nút hướng theo màn hình, vùng chọn hướng 2 giây trước giao lộ, bấm lại để hủy (D-19); Quay đầu bất kỳ lúc nào (Q-49).
- Xe tự dừng ở điểm có việc: tự giao hàng, hỏi lấy hàng qua bảng hỏi, đồng hồ dừng khi hỏi (D-23).
- 5 loại đường: thường, lớn, đông, gồ ghề, hẻm; ảnh hưởng tốc độ theo loại xe (D-26); 3 xe: máy, van, tải.
- Mini map toàn bản đồ, ký hiệu ▲ kho / ● điểm giao, vòng vàng = đang chở tới, xám ✓ = xong (D-20, D-28).
- Bản đồ lớn: kéo, chụm 2 ngón, con lăn, nút ＋/−/⤢; thu nhỏ tối đa = toàn bộ bản đồ, phóng to tối đa = gấp 2 lần lúc lái xe; mỗi lần mở về toàn cảnh (D-33, Q-61, Q-62).
- Popup tạm dừng nhỏ, 3 nút biểu tượng, hỏi xác nhận khi bỏ lượt (D-31).
- Chương 2 "Khu đô thị mới": vùng mở rộng dần, công trình hoàn thành sau mỗi màn thắng, cảnh quay sau khi thắng (D-32).
- Lưu thời gian tốt nhất mỗi màn trên máy.
- Số phiên bản ở góc trang chủ; bản lưu dùng khóa lưu riêng.

Chưa gồm (đang ở bản thử riêng [mockups/proto_trai_nghiem.html](mockups/proto_trai_nghiem.html)): chờ xuất phát, popup Nhiệm vụ / Hướng dẫn, kim cương và vật phẩm Thêm giờ (D-35 → D-39).

### Thay đổi

### Bỏ

### Vị trí code

Trong `demo/index.html`:

| Tính năng | Hàm / khối chính |
|---|---|
| Dữ liệu màn | `LEVELS`, `CH2`, `CHAPTERS` |
| Vẽ bản đồ | `drawStatic` (Chương 1), `drawChapter` (Chương 2), `buildMinimap` |
| Mô phỏng, điểm nhiệm vụ | `step`, `zoneProcess`, `choices`, `askChoose`, `askSkip` |
| Điều khiển | `cTurn`, `cUturn`, `validDirs` |
| Trang chủ | `renderHome`, `drawHomeMap` |
| Màn chuẩn bị | `renderPrep`, `prepView`, `vehHTML`, `legendHTML` |
| Bản đồ lớn | `makeViewer` (phóng/kéo/xếp nhãn), `buildMarks` |
| Tạm dừng, kết quả, cảnh quay | `pauseGame`, `askConfirm`, `end`, `startCut`, `finishCut` |

## Bộ lái tự động

```
Màn 1 · Xe van: Đạt 30.9 s (giới hạn 90 s · lời giải tối ưu theo solver 31.8 s)
Màn 2 · Xe van: Đạt 50 s (giới hạn 65 s · lời giải tối ưu theo solver 50.9 s)
Màn 3 · Xe van: Đạt 58.1 s (giới hạn 75 s · lời giải tối ưu theo solver 62.6 s)
Màn 4 · Xe van: Đạt 90.9 s (giới hạn 112 s · lời giải tối ưu theo solver 98.4 s)
Màn 5 · Xe máy: Không đạt 102 s (giới hạn 102 s · lời giải tối ưu theo solver 142.2 s)
Màn 5 · Xe van: Đạt 83.5 s (giới hạn 102 s · lời giải tối ưu theo solver 92.8 s)
Màn 5 · Xe tải: Đạt 94.4 s (giới hạn 102 s · lời giải tối ưu theo solver 100.2 s)
Màn 6 · Xe van: Đạt 24.6 s (giới hạn 90 s · lời giải tối ưu theo solver 29.4 s)
Màn 7 · Xe van: Đạt 49.4 s (giới hạn 64 s · lời giải tối ưu theo solver 54.8 s)
Màn 8 · Xe van: Đạt 55.3 s (giới hạn 66 s · lời giải tối ưu theo solver 56.3 s)
Màn 9 · Xe van: Đạt 96.6 s (giới hạn 118 s · lời giải tối ưu theo solver 105.3 s)
Màn 10 · Xe máy: Không đạt 150 s (giới hạn 150 s · lời giải tối ưu theo solver 212.4 s)
Màn 10 · Xe van: Đạt 128.8 s (giới hạn 150 s · lời giải tối ưu theo solver 136.5 s)
Màn 10 · Xe tải: Đạt 116.7 s (giới hạn 150 s · lời giải tối ưu theo solver 117.5 s)
```
