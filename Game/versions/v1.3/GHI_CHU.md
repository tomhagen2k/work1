# Demo v1.3 — chốt 15/10/2026


Tóm tắt: Chương 2 cho thấy khung cảnh tiến triển — cảnh quay mới, đoạn mở màn, địa danh riêng, cụm nhà mọc, cần cẩu, cảnh kết chương và bưu thiếp; sửa lỗi nút không phản hồi

Tài liệu yêu cầu: v1.14

### Thêm
- **Đoạn mở màn Chương 2** (D-55, T-03): camera đi từ đường vừa thông → công trình vừa xây (màn đầu: công trường) → xe; chỉ lần đầu vào màn, không chạy khi Thử lại; chạm / phím để bỏ qua; đồng hồ chưa chạy.
- **Cảnh quay mới** (D-54, T-01): camera phóng 1,3 vào công trình, công trình nảy lên; camera lướt tới đường vừa thông, rào chắn mờ dần, vạch vàng chạy; khung cuối là đoạn đường mới.
- **Công trường có cần cẩu cao, cần quay chậm, móc và đống vật liệu** (D-57, T-05); giao diện đè lên công trường mờ còn 30%.
- Câu thông báo riêng cho Chợ mới và Công viên (D-56, T-07).
- **5 địa danh có hình khối riêng**, lớn hơn nhà thường: Tiệm bánh (mái hiên sọc, biển bánh), Trường học (chữ L, sân, cột cờ), Chợ mới (3 dãy quầy), Bệnh viện (chữ thập lớn, xe cứu thương), Công viên lớn nhất bản đồ (hồ, đài phun nước) (D-59, T-02).
- **Cụm nhà mới mọc lần lượt** quanh công trình, có sân và hàng rào trắng — trong cảnh quay và đoạn mở màn màn sau (D-60, T-06).
- **Cảnh kết chương** sau Màn 10: toàn cảnh, trời tối dần, 5 công trình sáng lần lượt, đèn ngã tư bật (≤ 6 giây) (D-62, T-08).
- **Bưu thiếp** ở Trang chủ khi hoàn thành cả chương (D-62, T-08).
- Trang chủ: công trình vừa xây nhấp nháy ở lần về đầu tiên (D-61, T-09).

### Thay đổi
- **Sửa lỗi (phát sinh trong v1.3):** nút Trang chủ trong popup tạm dừng và nút "Màn tiếp ▶" sau cảnh quay không phản hồi — chú thích code chèn nhầm làm mất dòng gán sự kiện.
- **Sửa lỗi (có từ v1.2):** dấu "!" cơ chế mới trên nút màn ở Trang chủ mất nền tròn cam (cùng nguyên nhân).
- **Sửa lỗi:** cảnh quay lộ vùng cỏ ngoài bản đồ do dùng chung giới hạn camera lái xe của v1.2 (I-07) — cảnh quay và đoạn mở màn dùng camera riêng nằm trong bản đồ (D-54).
- Hộp thoại hoàn thành công trình chuyển xuống **dải đáy**; giao diện lái xe ẩn suốt cảnh; cảnh cuối chương vẫn ở giữa (D-54).
- Ô phố chứa công trình đã xây thành khu dân cư dù ngoài vùng thông xe — Màn 9 khác Màn 8 (D-56, T-07 a). Không đổi mạng đường.
- Lô phát triển: bỏ cơ chế bỏ ngẫu nhiên 50%, lấy mọi lô trong bán kính 330 quanh công trình (D-60).
- Trang chủ Chương 2: lớp phủ trắng 28% → 10% (D-61).
- Nhãn màn chuẩn bị: hạn giao tách dòng riêng "⏱ hạn m:ss"; xếp nhãn thử 8 chỗ, hở tối thiểu 4px (D-58, T-10).
- `level_design/autopilot.js` gọi `startGame(true)` để bỏ qua đoạn mở màn. Autopilot: 14 tuyến giữ nguyên thời gian.

### Bỏ

### Vị trí code
- Camera điện ảnh: `camFit`, `camPlay`, `camFrame`, `camAt`, `cineCam`; `render()` dùng `cineCam()||camPlay()` (`demo/index.html`).
- Cảnh quay: `newRoads`, `startCut`, `cutDraw`, `cutReveal`, `cutRoads`, `stepCut`, `cutFx`, `finishCut`; CSS `#cutv`, `#cutv.big`.
- Đoạn mở màn: `startGame(noIntro)`, `INTRO_LV`, `introKeys`, `endIntro`; trạng thái `intro` trong `loop`; `openLevel` đặt lại `INTRO_LV`.
- Đô thị hoá / công trường: `drawChapter` (`urbanB`, nhánh `st==='build'`, `opts.pop` / `opts.siteR`), `CSITE` trong `buildLevel`, làm mờ `#hud .abs.fade` trong `render()`.
- Nhãn: `buildMarks` (dòng hạn), `v.layout` trong `makeViewer`.
- Địa danh: `ch2Rect` (khung công trình dùng chung; `buildingRect`, `siteCenter` gọi tới), `landmark`.
- Cụm nhà mọc: nhánh lô phát triển trong `drawChapter` (`opts.grow` → `opts.growI`), `growSet`, `GROW_I`; `introKeys` (`growT`).
- Cảnh kết / bưu thiếp: `FIN_T`, `finFx`, nhánh `fin` trong `startCut`; `postReady`, `openPost`, `#bPost`, `#postv`.
- Trang chủ: `HOME_FLASH` (đặt trong `end`, xóa trong `openLevel`), `drawHomeMap`.
- Hash kiểm thử: `#lv=7&play&intro` để xem đoạn mở màn (mặc định `#…&play` bỏ qua).

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
