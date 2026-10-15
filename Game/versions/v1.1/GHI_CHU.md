# Demo v1.1 — chốt 15/10/2026


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
