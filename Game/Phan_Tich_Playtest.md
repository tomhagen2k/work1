# Phân tích báo cáo playtest (15/10/2026)

| Thông tin | Nội dung |
|---|---|
| Nguồn | `game_playtest_report.md` (BA cung cấp) — AI đóng vai 5 nhóm tuổi chơi demo v1.0 |
| Kết quả | BA chốt PT-Q1 → Q7; thay đổi đưa vào D-40 → D-45 trong [Mo_Ta_Yeu_Cau_MVP.md](Mo_Ta_Yeu_Cau_MVP.md); đã làm trong demo v1.1 |

## 1. Độ tin cậy của báo cáo

- Điểm số theo tuổi do AI tự suy ra, **không phải dữ liệu người thật** → dùng như giả thuyết.
- AI điều khiển qua DevTools có độ trễ vài giây mỗi thao tác trong khi đồng hồ game vẫn chạy → các kết luận về phản xạ ("không kịp rẽ", "90 giây quá chặt") nhiều khả năng bị phóng đại. Màn 1 đi tối ưu 31 giây / 90 giây.
- Vài chi tiết không khớp game (gọi là "Canvas", nhãn "+2 Siêu thị", thao tác Shift của DevTools).

## 2. Phân loại và quyết định

| Nhóm | Mục | Quyết định |
|---|---|---|
| A | A1 Màn chuẩn bị dễ nhầm với màn chơi | **Làm** — D-43 (1) |
| A | A2 D-pad sát nhau, bấm nhầm | **Làm** — D-43 (2) |
| A | A3 Nút Quay đầu dễ bấm nhầm | Chưa làm — chờ thử với người thật |
| A | A4 "Không đạt" gây cảm giác bị phạt | **Làm** — D-43 (3) |
| A | A5 Không có âm thanh | **Làm** — D-42 |
| B | Xe phóng đi ngay (báo cáo đề xuất đếm ngược 3-2-1) | **Chờ xuất phát** thay cho đếm ngược — D-44 |
| B | Người mới không biết luật | Popup Hướng dẫn / Nhiệm vụ — D-44 |
| B | Hết giờ là thua ngay | Thêm giờ (D-36) — đã gộp vào demo |
| C | C1 Màn 1 nới thời gian | **Giữ 90 giây** + C2 — D-45 |
| C | C2 Hướng dẫn tương tác Màn 1 | **Làm** — D-45 |
| C | C3 Chế độ hỗ trợ trẻ nhỏ | **Không** — đối tượng chính 12+ (D-40) |
| C | C4 Vuốt để rẽ | Để sau đợt thử với người thật (PT-Q6) |
| D | Xếp hạng 3 sao | **Làm theo công thức của BA** — D-41 |
| D | Nút tăng tốc (Nitro) | Không làm — phá cân bằng thời gian, trái mục 21 |
| D | Vệt GPS chỉ đường | Không làm — trái D-01 |
| D | Chế độ Zen | Không làm |

## 3. Xếp hạng sao trên các màn hiện tại

Bộ lái tự động đi theo lời giải tối ưu (gần mức người chơi giỏi nhất). 3 sao cần về đích khi còn dư > 10% thời gian của màn.

| Màn · xe | Tối ưu (giây) | Giới hạn | Còn dư | Sao khi đi tối ưu | 3 sao cần về trước | Khoảng dư cho 3 sao |
|---|---|---|---|---|---|---|
| 1 · van | 30,9 | 90 | 66% | 3 | 81,0 | 50 giây |
| 2 · van | 50,0 | 65 | 23% | 3 | 58,5 | 8,5 giây |
| 3 · van | 58,1 | 75 | 23% | 3 | 67,5 | 9,4 giây |
| 4 · van | 90,9 | 112 | 19% | 3 | 100,8 | 9,9 giây |
| 5 · van | 83,5 | 102 | 18% | 3 | 91,8 | 8,3 giây |
| 5 · tải | 94,4 | 102 | 7,5% | **2** | 91,8 | không đạt được |
| 6 · van | 24,6 | 90 | 73% | 3 | 81,0 | 56 giây |
| 7 · van | 49,4 | 64 | 23% | 3 | 57,6 | 8,2 giây |
| 8 · van | 55,3 | 66 | 16% | 3 | 59,4 | **4,1 giây** |
| 9 · van | 96,6 | 118 | 18% | 3 | 106,2 | 9,6 giây |
| 10 · van | 128,8 | 150 | 14% | 3 | 135,0 | 6,2 giây |
| 10 · tải | 116,7 | 150 | 22% | 3 | 135,0 | 18 giây |

Nhận xét:
- Màn 1 và 6 (màn làm quen của mỗi chương) rất dễ có 3 sao — hợp với vai trò màn mở đầu.
- **Màn 8** chỉ dư 4,1 giây cho 3 sao — 3 sao gần như đòi đúng lời giải tối ưu. Nếu muốn mềm hơn, có thể tăng giới hạn màn 8 lên khoảng 68–70 giây (cần kiểm tra lại người đi theo cảm tính vẫn thua).
- **Màn 5 xe tải** tối đa 2 sao: hợp với ý "chọn xe" (xe van tốt hơn ở màn này).
