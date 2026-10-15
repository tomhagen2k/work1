# Nhật ký thay đổi demo

Quy trình: [Quy_Trinh_Phien_Ban.md](Quy_Trinh_Phien_Ban.md) · Danh sách và so sánh: [versions/index.html](versions/index.html) · Chấm điểm: [Danh_Gia_Trai_Nghiem.md](Danh_Gia_Trai_Nghiem.md)

Mỗi mục ứng với một phiên bản. Mục "đang làm" được ghi dần trong lúc làm; khi chốt, script đổi thành "chốt dd/mm/yyyy" và mở mục mới.
Mỗi thay đổi ghi kèm mã quyết định (D-xx, Q-xx) và **vị trí code** để sau này lấy lại được.

## v1.2 · đang làm

Tóm tắt: (chưa có thay đổi)

Tài liệu yêu cầu: (ghi khi chốt)

### Thêm

### Thay đổi

### Bỏ

### Vị trí code

## v1.1 · chốt 15/10/2026

Tóm tắt: Cải thiện từ báo cáo playtest — chờ xuất phát, popup Nhiệm vụ/Hướng dẫn, kim cương và Thêm giờ (gộp từ bản thử), xếp hạng 3 sao, âm thanh, hướng dẫn tương tác Màn 1, màn chuẩn bị rõ ràng hơn, D-pad nhận hướng theo góc.

Tài liệu yêu cầu: v1.10

### Thêm

- **Chờ xuất phát:** vào màn xe đứng yên, nút cùng hướng đầu xe nhấp nháy; nhấn mới chạy, đồng hồ tính từ lúc này; quay đầu khi chờ không tính giờ; bong bóng "Nhấn để xe chạy" ở Màn 1–3 (D-44, Q-65 → Q-67). Gộp từ `mockups/proto_trai_nghiem.html`.
- **Popup Nhiệm vụ** (danh sách, PA1) và **Hướng dẫn** (thẻ chủ đề, PA-C) ở góc trên trái; chấm "!" khi màn có cơ chế mới; chạm cụm vòng nhiệm vụ cũng mở (D-44, Q-68 → Q-71). Gộp từ bản thử.
- **Kim cương & vật phẩm Thêm giờ:** hết giờ → gợi ý +30 giây (tối đa 2 lần), cửa hàng 4 gói, thanh toán mô phỏng, +5 kim cương lần đầu thắng (D-35 → D-39). Gộp từ bản thử.
- **Xếp hạng 3 sao** theo thời gian còn lại; dùng Thêm giờ chỉ 1 sao; hiện ở màn kết quả, trang chủ, thẻ màn, tổng sao chương (D-41).
- **Âm thanh** tổng hợp + nút tắt/bật ở trang chủ và popup tạm dừng (D-42).
- **Hướng dẫn tương tác Màn 1** lần đầu chơi: xe dừng hẳn ở ngã tư cần rẽ, khoanh đúng nút, có "Bỏ qua hướng dẫn" (D-45).
- Màn chuẩn bị: nhãn "Xem bản đồ, lên kế hoạch · xe chưa chạy", nút Bắt đầu nhấp nháy, chạm bản đồ → bong bóng chỉ nút Bắt đầu (D-43).

### Thay đổi

- D-pad nhận hướng theo góc chạm so với tâm cụm nút, vùng bấm rộng hơn 10px, khe giữa nút 3px → 8px (D-43).
- Màn kết quả khi chưa đạt: "Hết giờ rồi!" / "Trễ hạn mất rồi!", thanh "Đã giao x/y kiện", mẹo theo nguyên nhân, nút "Thử lại" (D-43).
- Chỉ báo dừng giờ thống nhất dạng "⏸ mm:ss" ở bảng hỏi, bản đồ lớn, tạm dừng (Q-72).
- Lý do trễ hạn ghi "cần giao trong mm:ss đầu" (thay "đã quá hạn mm:ss").
- Sửa lỗi khi gộp bản thử: khối màn kết quả bị chèn hai lần (bản thừa không hiển thị nhưng trùng mã nút).
- Bộ lái tự động (`level_design/autopilot.js`): bỏ qua bước chờ xuất phát và hướng dẫn Màn 1. Thời gian đo được không đổi so với v1.0.

### Bỏ

- Câu "Đã tạm dừng · còn mm:ss" và tag "Thời gian đang dừng" (thay bằng "⏸ mm:ss").

### Vị trí code

| Tính năng | Hàm / khối chính |
|---|---|
| Chờ xuất phát | `startGame` (state `wait`), `cTurn`, `cUturn`, `render` (lớp `.go`, `#goHint`), `GO_HINT_LEVELS` |
| Popup Nhiệm vụ / Hướng dẫn | `openInfo`, `closeInfo`, `renderInfo`, `misList`, `helpTabs`, `HSEC`, `roadTable`, `newMech`, `helpSeen` |
| Kim cương, Thêm giờ, cửa hàng | `T0`, `timeUp`, `renderTO`, `toAct`, `winReward`, `openShop`, `renderShop`, `WAL`, `PACKS`, hằng `ITEM_PRICE`, `ITEM_SEC`, `MAX_EXT`, `WIN_KC` |
| Sao | `starsFor`, `STAR_CUT`, `getStars`, `end`, `drawHomeMap`, `renderHome` |
| Âm thanh | `SND`, `tone`, `SFX`, `sfx`, `setSound`, `renderSoundBtns` |
| Hướng dẫn Màn 1 | `tutStart`, `tutUpdate`, `tutBest`, `tutCost`, `tutEnd`, `#tutRing`, `#tutTip` |
| Màn chuẩn bị | `#pBanner`, `startHint`, `vPrep.onTap` (trong `makeViewer`: nhận chạm không kéo) |
| D-pad | khối `.dpad` `pointerdown` (tính góc), CSS `.dpad` |

## v1.0 · chốt 15/10/2026

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

