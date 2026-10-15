# Demo v1.2 — chốt 15/10/2026


Tóm tắt: Sửa theo báo cáo playtest 8 nhân vật — chơi được trên màn hình nhỏ và khi cầm dọc, nút Màn tiếp, bấm rẽ sớm, bảng lấy hàng cố định, hết giờ không ép mua, nút Bản đồ trong tạm dừng.

Tài liệu yêu cầu: v1.11

### Thêm

- Nút **"Màn tiếp ▶"** là nút chính ở màn thắng (Chương 1); phím Enter cũng sang màn tiếp (D-47).
- Nút **Bản đồ** trong popup tạm dừng; đóng bản đồ quay lại tạm dừng (D-51).
- Bước xác nhận trước khi mở cửa hàng từ popup hết giờ ("bán bằng tiền thật… hỏi ý kiến bố mẹ") (D-50).
- Dòng nhắc "Chưa có hàng cho … — lấy ở … trước" khi đi qua điểm giao mà chưa có hàng (D-52).

### Thay đổi

- **Khung hình căn giữa tuyệt đối** — hết lệch/cắt ở 667×375, 740×360, 640×360 (D-46, I-01).
- **Cầm dọc: game tự xoay 90°** thay cho màn "Xoay ngang điện thoại"; mọi thao tác chạm/kéo đổi tọa độ theo hướng xoay (D-46, I-17).
- Thắng xong về Trang chủ → **tự chọn màn kế tiếp** chưa hoàn thành (D-47, I-02).
- **Bấm rẽ sớm** được nhận nếu giao lộ kế tiếp có hướng đó (D-49, I-06a).
- **Bảng lấy hàng giữ cố định vị trí**, đơn đã lấy hết hiện xám; máy cảm ứng ẩn gợi ý phím (D-48).
- Hết giờ khi không có vật phẩm và không đủ kim cương: nút chính **"Thử lại"**, mua kim cương thành liên kết phụ (D-50, I-04).
- Camera lùi được ra ngoài mép bản đồ để giao diện không che xe/điểm (D-53, I-07).
- Bong bóng hướng dẫn Màn 1 tự chọn chỗ không che xe, nút, bảng hỏi (I-13).
- "×3 từ Kho B" → "3 kiện từ Kho B"; chấm "!" trên nút màn chỉ ở màn có cơ chế mới, thẻ màn ghi "! Cơ chế mới" (I-16).
- Màn kết quả rộng hơn để 3 nút nằm một hàng; sao hiện bằng hẹn giờ (nếu hiệu ứng không chạy sao vẫn hiện).
- Bộ lái tự động: chỉ chọn nút lấy hàng còn bấm được. Thời gian đo được không đổi.

### Bỏ

- Màn hình "Xoay ngang điện thoại để chơi".

### Vị trí code

| Tính năng | Hàm / khối chính |
|---|---|
| Khung hình, xoay | `fit`, `STG`, `toStage`, `rectToStage`; CSS `#wrap`, `#stage` |
| Màn tiếp | `nextLevel`, `goHome`, nút `#bNext2` trong `end` |
| Bảng lấy hàng | `choices` (cờ `ok`), `hasWork`, `askChoose`, `renderAsk` |
| Bấm rẽ sớm | `cTurn` (nhánh `!v[dir]`) |
| Hết giờ, cổng mua | `renderTO`, `toAct` (`retry`, `shop`), `#gatev` |
| Bản đồ từ tạm dừng | `pauseMap`, `resume` (`G.mapFromPause`) |
| Nhắc chưa có hàng | `step` (`G.noGoodsZ`) |
| Camera | `render` (`CAM`, lề ngoài bản đồ) |

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
