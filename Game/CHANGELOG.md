# Nhật ký thay đổi demo

Quy trình: [Quy_Trinh_Phien_Ban.md](Quy_Trinh_Phien_Ban.md) · Danh sách và so sánh: [versions/index.html](versions/index.html) · Chấm điểm: [Danh_Gia_Trai_Nghiem.md](Danh_Gia_Trai_Nghiem.md)

Mỗi mục ứng với một phiên bản. Mục "đang làm" được ghi dần trong lúc làm; khi chốt, script đổi thành "chốt dd/mm/yyyy" và mở mục mới.
Mỗi thay đổi ghi kèm mã quyết định (D-xx, Q-xx) và **vị trí code** để sau này lấy lại được.

## v1.4 · đang làm

Tóm tắt: (chưa có thay đổi)

Tài liệu yêu cầu: (ghi khi chốt)

### Thêm

### Thay đổi

### Bỏ

### Vị trí code

## v1.3 · chốt 15/10/2026

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

## v1.2 · chốt 15/10/2026

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

