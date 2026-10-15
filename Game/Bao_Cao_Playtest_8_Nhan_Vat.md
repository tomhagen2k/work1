# Báo cáo playtest mô phỏng — 8 nhân vật

**Bản kiểm thử:** `Game/demo/index.html` (tiêu đề trang: "Demo Giao Hàng · v1.1 (đang làm)")
**Ngày:** 15/10/2026
**Bằng chứng ảnh:** thư mục [`playtest_evidence/`](playtest_evidence/) (ảnh được nhắc trong báo cáo theo dạng `[ảnh 01]`)

> **Giới hạn quan trọng:** đây là 8 *persona mô phỏng* do một AI đóng vai, không phải người dùng thật. Kết quả dùng để **phát hiện vấn đề có nguy cơ xảy ra**, không dùng để suy ra tỷ lệ người chơi thật. Mọi con số đều ở dạng "x/8 nhân vật mô phỏng".

---

## Phần A — Tổng quan

### Môi trường
- Mở file qua `file://` trong trình duyệt tích hợp chỉ cho ảnh tĩnh, nên game được phục vụ bằng máy chủ tĩnh cục bộ (`python -m http.server`, cấu hình ở `.claude/launch.json`) tại `http://localhost:8765/demo/index.html`.
- Điều khiển bằng Microsoft Edge headless (Playwright), giả lập **màn hình ngang 844×390** (cỡ điện thoại phổ biến), có cảm ứng. Mỗi nhân vật dùng **một hồ sơ trình duyệt riêng** nên lưu tiến trình (kim cương, sao) bắt đầu từ trống.
- Kiểm thêm: dọc 390×844, ngang nhỏ 667×375 và 740×360. Lỗi ở màn hình nhỏ đã được **kiểm chứng lại bằng một trình duyệt thứ hai** (trình duyệt tích hợp của ứng dụng, không qua công cụ điều khiển).
- **Không** đọc mã nguồn, tài liệu thiết kế, file `Phan_Tich_Playtest.md`, và không dùng console/DevTools để lấy thông tin game. Chỉ có thao tác chạm/phím và ảnh chụp màn hình.

### Số liệu
| Hạng mục | Kết quả |
|---|---|
| Nhân vật đã trải nghiệm | 8/8 |
| Không thể bắt đầu chơi | 1/8 (Nhân vật 6, màn hình nhỏ 667×375: nút "Bắt đầu" nằm ngoài màn hình) |
| Dừng giữa chừng theo ý nhân vật | 4/8 (NV4 ở màn 5, NV5 sau màn 2, NV7 sau màn 3, NV8 ở màn 2) |
| Màn đã chơi thật | Màn 1–5 (Chương 1), Màn 6–7 (Chương 2) |
| Màn chưa chơi | Màn 8–10 (Chương 2); Chương 3, 4 hiện "Sắp có" |

### Tính năng đã kiểm thử
Trang chủ và chọn chương/màn, màn chuẩn bị (xem bản đồ, phóng to/thu nhỏ, kéo bản đồ, chọn xe), lái xe (xuất phát, rẽ, quay đầu), lấy/giao hàng, bảng "Nhiệm vụ", bảng "Cách chơi" (5 tab), tạm dừng (chơi lại có xác nhận), chạm bản đồ nhỏ để mở bản đồ lớn, hướng dẫn màn 1, hạn giao, các loại đường (thường, lớn, đông, gồ ghề, hẻm), hết giờ và vật phẩm +30 giây, màn thắng/thua, mở công trình (Chương 2), thông báo xoay ngang.

### Chưa kiểm thử được
- **Mua kim cương:** chỉ mở cửa hàng để quan sát, **không** bấm mua (giao dịch tiền thật nằm ngoài phạm vi).
- Âm thanh (môi trường headless không phát tiếng), cử chỉ chụm hai ngón, hiệu năng/nhiệt trên máy thật, Chương 3–4, màn 8–10.

### Giới hạn của phương pháp (cần đọc trước khi dùng kết quả)
1. **Rò rỉ kiến thức giữa các nhân vật.** Tất cả nhân vật do cùng một AI đóng vai. Hồ sơ trình duyệt độc lập, nhưng "trí nhớ" thì không: các nhân vật sau đi màn 1 nhanh hơn thực tế. Tôi đã cố cho mỗi nhân vật phản ứng theo hồ sơ, nhưng đây là sai lệch có hệ thống, nghiêng về phía game dễ hơn thực tế.
2. **Thời gian bị dừng khi suy nghĩ.** Để công bằng, đồng hồ trong game bị đóng băng giữa các lượt thao tác của tôi. Vì vậy thời gian suy nghĩ là miễn phí, **khiến màn có hạn giao dễ hơn thực tế**.
3. **Bấm rẽ "mù".** Tôi nhìn ảnh tĩnh rồi hẹn giờ bấm, không theo dõi xe chạy liên tục như người thật. Điều này **làm tăng số lần lỡ ngã rẽ** so với người chơi thật nhìn trực tiếp. Vấn đề "lỡ rẽ" (I-06) vẫn có thật, nhưng tần suất trong báo cáo có thể cao hơn thực tế.
4. Giả lập trình duyệt, không phải điện thoại thật: không có rung, độ trễ chạm thật, tai thỏ/thanh điều hướng hệ thống.

---

## Phần B — Hồ sơ và kết quả từng nhân vật

Thang điểm 1–10. "—" là chưa đủ dữ liệu. Thứ tự tiêu chí: **Hiểu** (dễ hiểu) · **TrQ** (trực quan) · **ĐĐ** (chất lượng câu đố) · **CB** (công bằng) · **ĐK** (điều khiển) · **Nhịp** · **HL** (hài lòng) · **ĐL** (động lực tiếp tục) · **TC** (tiếp cận) · **GC** (giữ chân).

### NV1 — 11 tuổi, ít kinh nghiệm (844×390)
- **Ấn tượng đầu:** nhận ra ngay "game giao hàng", thấy nút "Chơi" xanh to. Không đọc đoạn mô tả màn.
- **Hiểu luật:** học bằng hướng dẫn nhấp nháy ở màn 1, làm theo đúng từng bước. Hiểu "xe tự dừng ở kho, chọn hàng".
- **Màn đã chơi:** M1 ★★★ · M2 ★ (hết giờ khi còn 1 kiện, dùng quà +30s) · M3 thua lần 1 (đi đường cam, xe "bò") → đọc mẹo → thử lại đi đường xanh → **thắng**.
- **Khó khăn:** M2: lấy hàng hai hướng ngược nhau (Đông + Tây) vì "lấy theo thứ tự nút". M3 lần 1: bấm "Xuống" khi xe đã qua ngã tư, **không có phản hồi** nên không biết vì sao xe đi thẳng. Điểm giao phía Tây nằm **ngay dưới cụm nút mũi tên** [ảnh 07].
- **Sự kiện đáng chú ý:** sau khi thua M3, bấm nút cam to "Mua kim cương" thì **cửa hàng hiện giá tiền thật 20.000đ–500.000đ** [ảnh 11]. Nhân vật không mua, đóng lại.
- **Muốn chơi tiếp:** Có. Thắng M3 sau khi thử lại tạo cảm giác "mình giỏi lên".

| Hiểu | TrQ | ĐĐ | CB | ĐK | Nhịp | HL | ĐL | TC | GC |
|---|---|---|---|---|---|---|---|---|---|
| 8 | 7 | 7 | 7 | 6 | 7 | 8 | 8 | 7 | 7 |

Bằng chứng: tự hiểu M1 không cần trợ giúp (Hiểu 8); lỡ rẽ không phản hồi và nút che điểm giao (ĐK 6); thua M3 → đọc mẹo → thắng (CB 7, HL 8).

### NV2 — 13 tuổi, thích thử nghiệm (844×390)
- **Ấn tượng đầu:** bấm thử khắp nơi. Phát hiện **mọi màn và Chương 2 đều mở sẵn**.
- **Thử nghiệm:** phóng to/kéo bản đồ (hoạt động tốt); bấm nút không sáng (không có tác dụng gì); chạy tới Tiệm hoa khi chưa có hàng (xe chạy qua, **không có thông báo nào**), tự suy ra phải lấy hàng trước.
- **Màn đã chơi:** M1 ★★★ · M2 ★★★ (còn 15s, chia chuyến đúng) · M3 ★★★ (còn 10s, xem tab "Loại đường" trước) · M4 **trễ hạn** (lấy 1 kiện Trường thay vì 2, giao 1/2 rồi không kịp quay lại).
- **Lỗi tiến trình:** M1 thắng → "Trang chủ" → "Chơi" lại mở **Màn 1** [ảnh 05].
- **Che khuất:** điểm Phía Bắc bị nút Tạm dừng đè [ảnh 08]; Bệnh viện bị bản đồ nhỏ che [ảnh 09].
- **Muốn chơi tiếp:** Có. Thua M4 nhưng màn thua nói rõ "Đơn Kho B → Trường cần giao trong 1:18 đầu (mới giao 1/2 kiện)".

| Hiểu | TrQ | ĐĐ | CB | ĐK | Nhịp | HL | ĐL | TC | GC |
|---|---|---|---|---|---|---|---|---|---|
| 8 | 6 | 8 | 8 | 6 | 7 | 8 | 8 | — | 8 |

### NV3 — 15 tuổi, chơi game thường xuyên (844×390)
- **Ấn tượng đầu:** bỏ qua hướng dẫn ngay, M1 xong trong 31 giây (còn 66%), vẫn chỉ nhận **3 sao như mọi người**. Nhận xét: "sao không phân biệt chơi giỏi hay vừa đủ".
- **Màn đã chơi:** M1 ★★★ · nhảy thẳng tới **M5 (chọn xe)**: chọn xe tải 6 chỗ "để mỗi kho đi một chuyến" → xe tải bò trên đường đông, dùng +30s vẫn **hết giờ** · M6 ★★★ (còn 64%), xem hoạt cảnh công trình rồi bấm "Màn tiếp" · M7 **hết giờ** (lỡ rẽ nhiều lần trên đường đông).
- **Nhận xét:** "Xe tải chậm bao nhiêu? Mô tả chỉ ghi *Chậm*, không tính được" [ảnh 22]. Nút xuất phát chỉ cho đi theo hướng đầu xe, trong khi kho ở phía sau, nên phải xuất phát rồi quay đầu (M5, M6).
- **Điểm cộng:** M6 có nút "Xem công trình" → "Tiệm bánh đã hoàn thành! Thông xe tuyến mới phía Đông" và nút **"Màn tiếp ▶"** [ảnh 18]. NV3 thích phần này nhất.
- **Muốn chơi tiếp:** Trung bình. Hứng thú với Chương 2, chán vì bị lỡ rẽ.

| Hiểu | TrQ | ĐĐ | CB | ĐK | Nhịp | HL | ĐL | TC | GC |
|---|---|---|---|---|---|---|---|---|---|
| 8 | 6 | 6 | 5 | 5 | 6 | 6 | 6 | — | 6 |

### NV4 — 17 tuổi, thích giải đố (844×390)
- **Cách chơi:** đọc tab "Thời gian" và "Màn này" trước khi chạy. Thử nút Tạm dừng khi bảng lấy hàng đang mở: **không phản hồi** (đồng hồ lúc đó đã tự dừng nên không gây hại).
- **Màn đã chơi:** M1 ★★★ · M4 lần 1 **trễ hạn** (tới Kho B còn 15s hạn) → phân tích → lần 2 đi đường xanh, giao Chợ xong là sang ngay Kho B, tới nơi còn 23s hạn → **thắng ★★★** (còn 12%) · M5 với xe tải: giao xong Kho A rồi tới Kho B chỉ còn 30s → tự dừng phiên.
- **Quan sát quan trọng:** khi lệnh rẽ được nhận, có **mũi tên nhỏ cạnh số kiện** trên xe [ảnh 14]. Nhưng bấm sớm hơn vùng nhận lệnh thì bị bỏ qua, không có tín hiệu gì.
- **Đánh giá câu đố:** M4 là "khó do tư duy" đúng nghĩa: thua vì kế hoạch, thắng nhờ sửa kế hoạch. M5 là "khó do thiếu thông tin": không ước lượng được thời gian của xe tải trên đường đông, chỉ có cách thử.
- **Muốn chơi tiếp:** Có, nếu M5 cho đủ dữ kiện.

| Hiểu | TrQ | ĐĐ | CB | ĐK | Nhịp | HL | ĐL | TC | GC |
|---|---|---|---|---|---|---|---|---|---|
| 9 | 7 | 7 | 6 | 6 | 7 | 7 | 7 | — | 7 |

ĐĐ 7 = M4 rất tốt (9) nhưng M5 thiếu dữ kiện (5).

### NV5 — 23 tuổi, chơi casual (844×390)
- **Ấn tượng đầu:** vào game rất nhanh, xong M1 khoảng 1 phút.
- **Lỗi tiến trình:** "Trang chủ" → "Chơi" lại mở **Màn 1**, dù bản đồ đã sáng vòng ở nút 2 [ảnh 05]. NV5 bối rối, phải tự tìm nút số 2.
- **Bấm nhầm do bảng đổi vị trí:** ở Kho A M2, bấm "Lấy 2 kiện · Phía Tây". Bảng xếp lại nút nên lần bấm tiếp theo vào chỗ "Phía Bắc" cũ lại thành **"Phía Đông"** [ảnh 06].
- **Màn đã chơi:** M1 ★★★ · M2 ★ (dùng +30s). Màn kết quả giải thích rõ: "Đã dùng Thêm giờ nên chỉ tính 1 sao" [ảnh 19].
- **Muốn chơi tiếp:** Thấp–trung bình. Dừng sau ~5 phút, đủ cho "giờ nghỉ" nhưng không có lý do quay lại ngay.

| Hiểu | TrQ | ĐĐ | CB | ĐK | Nhịp | HL | ĐL | TC | GC |
|---|---|---|---|---|---|---|---|---|---|
| 8 | 6 | — | 7 | 5 | 6 | 6 | 5 | 8 | 5 |

### NV6 — 32 tuổi, ít chơi game mobile (cầm dọc, điện thoại nhỏ 667×375)
- **Cầm dọc:** màn đen với dòng "Xoay ngang điện thoại để chơi" [ảnh 04]. Hiểu ngay, nhưng không có hình minh họa. Nếu máy đang khóa xoay thì NV6 sẽ không biết làm gì (suy luận, chưa kiểm).
- **Xoay ngang (667×375):** khung game **lệch phải và bị cắt** [ảnh 01]. Nút "Chơi" chỉ còn một nửa, vẫn bấm được. Vào màn chuẩn bị thì **nút "Bắt đầu" nằm hoàn toàn ngoài màn hình** [ảnh 02]. Vuốt bản đồ không giúp được.
- Để quan sát tiếp, tôi dùng phím Enter (điện thoại thật không có): trong màn chơi **mất nút "Quay đầu"** và nửa bản đồ nhỏ [ảnh 03].
- Kiểm thêm 740×360 (Android phổ biến): cũng lệch, mất góc phải thanh trên cùng. 915×412 hiển thị bình thường.
- **Kết luận:** NV6 **không thể bắt đầu chơi** trên máy cỡ này.

| Hiểu | TrQ | ĐĐ | CB | ĐK | Nhịp | HL | ĐL | TC | GC |
|---|---|---|---|---|---|---|---|---|---|
| — | 2 | — | — | 1 | — | 1 | 1 | 1 | — |

### NV7 — 45 tuổi, ít chơi game (844×390)
- **Cách chơi:** đọc kỹ tab "Lấy & giao". Chữ trong bảng nhỏ nhưng nội dung rõ ("▲ ô vuông: lấy hàng · ▼ hình tròn: giao hàng").
- **Điểm cộng lớn:** trong hướng dẫn M1, **xe và đồng hồ đứng chờ** tới khi người chơi bấm đúng (đã chờ 5 giây, đồng hồ không đổi). NV7 thấy "không bị ép".
- **Màn đã chơi:** M1 ★★★ · M3 ★★★ ngay lần đầu (còn 9s) nhờ đọc chú thích "Đường đông / Đường lớn" ở màn chuẩn bị.
- **Khó hiểu nhỏ:** ký hiệu "×3 từ Kho B" (phải dừng lại nghĩ "nhân 3?"). Chấm "!" cam trên các nút màn không rõ nghĩa.
- **Muốn chơi tiếp:** Có, nhưng muốn màn thắng có nút "Màn tiếp".

| Hiểu | TrQ | ĐĐ | CB | ĐK | Nhịp | HL | ĐL | TC | GC |
|---|---|---|---|---|---|---|---|---|---|
| 8 | 7 | 7 | 8 | 7 | 7 | 8 | 7 | 7 | 7 |

### NV8 — 60 tuổi, mới làm quen điện thoại (844×390)
- **Bắt đầu:** đồng hồ không chạy khi chưa bấm (đã chờ 8 giây). Nhưng lúc đầu **bong bóng hướng dẫn che mất chiếc xe**, NV8 hỏi "xe ở đâu?".
- **Tạm dừng để suy nghĩ:** lớp phủ tạm dừng **che hết bản đồ**, nên không thể vừa dừng vừa nhìn [ảnh 21]. Tình cờ chạm vào bản đồ nhỏ thì mở được **bản đồ lớn, đồng hồ dừng** [ảnh 20]. Tính năng tốt nhưng không có gợi ý nào cho biết.
- **Màn đã chơi:** M1 ★★★ (có hướng dẫn) · M2: giao được Đông + Bắc, rồi **bấm "Xuống" chậm ~1 giây nên xe đi thẳng** [ảnh 13]. Xe dừng ở góc trên trái, **bị đồng hồ và biểu tượng đơn che** [ảnh 10] → hết giờ → dừng chơi.
- **Câu nói mô phỏng:** "Tôi đã bấm xuống rồi mà?" Đây là lỗi do giao diện (nhận lệnh trong khoảng hẹp, không phản hồi khi trễ), không phải do chưa hiểu luật.

| Hiểu | TrQ | ĐĐ | CB | ĐK | Nhịp | HL | ĐL | TC | GC |
|---|---|---|---|---|---|---|---|---|---|
| 7 | 5 | — | 5 | 4 | 5 | 5 | 4 | 5 | 4 |

---

## Phần C — Danh sách vấn đề

| ID | Màn/Tính năng | Mô tả vấn đề | Nhân vật | Bằng chứng | Loại | Mức độ | Đề xuất |
|---|---|---|---|---|---|---|---|
| I-01 | Bố cục, màn hình nhỏ | Ở 667×375 (và 740×360) khung game lệch phải, bị cắt; nút **Bắt đầu** và **Quay đầu** nằm ngoài màn hình | NV6 (kiểm lại ở 2 trình duyệt) | ảnh 01–03 | C | **Nghiêm trọng** | Co giãn khung theo cả chiều rộng lẫn chiều cao, dùng `min(vw/W, vh/H)`; thêm vùng an toàn (safe-area). Thử trên 640×360, 667×375, 740×360, 812×375 |
| I-02 | Trang chủ, tiến trình | Thắng màn → "Trang chủ" → "Chơi" vẫn mở màn vừa thắng, dù bản đồ đã sáng màn kế | NV2, NV5 | ảnh 05 | B/C | **Cao** | Sau khi thắng, tự chọn màn kế tiếp chưa hoàn thành |
| I-03 | Màn thắng | Chương 1 chỉ có "Chơi lại" và "Trang chủ", không có **"Màn tiếp"** (Chương 2 thì có) | NV1, NV2, NV5, NV7 | ảnh 19 | Nhịp độ | **Cao** | Thêm "Màn tiếp ▶" làm nút chính ở mọi màn thắng |
| I-04 | Hết giờ, cửa hàng | Khi hết giờ và không còn vật phẩm, nút **cam to "Mua kim cương"** là lựa chọn chính, to hơn "Chịu thua"; bấm vào thì thấy giá tiền thật 20.000đ–500.000đ | NV1 (11 tuổi), NV3 | ảnh 11, 12 | Đạo đức/khả năng tiếp cận | **Cao** (với đối tượng trẻ em) | Không đặt nút mua làm lựa chọn chính lúc vừa thua; có cổng xác nhận phụ huynh; "Thử lại" là nút chính |
| I-05 | Bảng lấy hàng | Sau một lần lấy hàng, các nút xếp lại vị trí nên lần bấm tiếp dễ trúng nhầm đơn khác | NV5 | ảnh 06 | C | Trung bình | Giữ cố định vị trí từng đơn; đơn đã lấy hết thì để xám thay vì xóa |
| I-06 | Lái xe, rẽ | Bấm hướng sớm hoặc trễ so với vùng nhận lệnh thì bị **bỏ qua, không phản hồi**; xe đi thẳng. Khi được nhận thì có mũi tên nhỏ | NV1, NV3, NV4, NV8 (xem giới hạn 3) | ảnh 13, 14 | C | **Cao** | Cho phép bấm trước (giữ lệnh tới ngã tư hợp lệ kế tiếp); hiện mũi tên chờ to hơn; khi bị bỏ qua thì nút rung/đỏ nhẹ |
| I-07 | Che khuất | Cụm mũi tên che đường/điểm giao ở mép trái; nút Tạm dừng và bản đồ nhỏ che điểm ở mép trên phải; đồng hồ và biểu tượng đơn che xe ở góc trên trái | NV1, NV2, NV8 | ảnh 07–10 | C | Trung bình | Thêm lề cho camera để điểm/xe không lọt vào vùng giao diện; giảm độ đục của giao diện khi xe ở dưới |
| I-08 | Màn 5, chọn xe | Mô tả xe chỉ có chữ định tính (Nhanh / Chậm / Rất chậm) nên không ước lượng được kế hoạch có kịp giờ không. 2/2 nhân vật chọn xe tải đều thua | NV3, NV4 | ảnh 22 | B | Trung bình | Hiện hệ số tốc độ (ví dụ "đường đông ×0,4") hoặc ước tính thời gian tuyến ở màn chuẩn bị |
| I-09 | Sao | Thắng không dùng vật phẩm = 3 sao bất kể còn 66% hay 11% thời gian; chưa thấy mốc 2 sao | NV3 (cả 8 đều thấy) | Kết quả các màn | Động lực | Trung bình | Thêm mốc sao theo thời gian còn lại để có lý do chơi lại |
| I-10 | Tạm dừng | Lớp phủ tạm dừng che bản đồ; bản đồ lớn chỉ mở được bằng cách chạm bản đồ nhỏ, không có gợi ý | NV8 | ảnh 20, 21 | B | Trung bình | Thêm nút "🗺 Bản đồ" vào menu tạm dừng; đặt chữ "chạm để mở" lên bản đồ nhỏ |
| I-11 | Menu tạm dừng, xác nhận | Chỉ có biểu tượng (↻ ▶ ⌂ 🔊, ✕/✓), không có chữ | NV4, NV6, NV7, NV8 (suy luận cho NV6–8) | ảnh 21 | B | Thấp | Thêm nhãn chữ dưới biểu tượng |
| I-12 | Xuất phát | Chỉ được xuất phát theo hướng đầu xe; kho ở phía sau thì phải đi rồi quay đầu (tốn vài giây) | NV3 | M5, M6 | B | Thấp | Cho phép bấm quay đầu trước khi xuất phát |
| I-13 | Hướng dẫn M1 | Bong bóng hướng dẫn che xe lúc đầu và che một phần nút "Lên"; bấm trước khi bong bóng hiện thì bị bỏ qua | NV7, NV8 | ảnh 17 + phiên NV8 | C | Thấp | Đặt bong bóng ở phía không che xe/nút |
| I-14 | Chọn màn | Mọi màn và Chương 2 mở sẵn; người thích khám phá nhảy cóc vào màn khó | NV2, NV3 | Trang chủ | Nhịp độ | Thấp (bản demo) | Khóa theo tiến trình ở bản phát hành |
| I-15 | Giao điểm khi chưa có hàng | Chạy tới điểm giao khi chưa có hàng thì xe đi qua, không có thông báo | NV2 | Phiên NV2 | B | Thấp | Hiện nhắc ngắn "Chưa có hàng cho điểm này" |
| I-16 | Ký hiệu | Không rõ "×3 từ Kho B" và chấm "!" cam trên nút màn; phím tắt "Enter", "1", "2" hiện trên nút ở điện thoại | NV5, NV7 | ảnh 06 | B | Thấp | "3 kiện từ Kho B"; giải thích "!"; ẩn phím tắt khi dùng cảm ứng |
| I-17 | Màn dọc | Chỉ có dòng chữ, không có hình xoay; chưa xử lý trường hợp khóa xoay | NV6 | ảnh 04 | B | Thấp | Thêm hình động xoay máy, kèm "Nếu không xoay được, hãy tắt khóa xoay" |

---

## Phần D — Vấn đề gặp ở nhiều nhân vật

**Gặp ở nhiều hồ sơ (mẫu số 8):**
- I-06 Lỡ rẽ không phản hồi: **4/8** (NV1, NV3, NV4, NV8). Có thể bị phóng đại do giới hạn 3, nhưng xuất hiện ở cả người nhanh lẫn người chậm.
- I-03 Không có "Màn tiếp" ở Chương 1: **4/8** nhận xét trực tiếp, cả 7 người thắng ít nhất một màn đều gặp.
- I-07 Che khuất: **3/8**.
- I-02 "Chơi" mở lại màn đã thắng: **2/8** gặp (NV2, NV5). Ai về Trang chủ rồi bấm "Chơi" đều sẽ gặp.

**Chỉ ở người ít kinh nghiệm hoặc lớn tuổi:** I-10 (tạm dừng che bản đồ), I-11 (biểu tượng không chữ), I-13 (bong bóng che xe). Hậu quả của I-06 nặng nhất với NV8.

**Chỉ ở nhóm trẻ:** I-04 (nút mua nổi bật) rủi ro nhất với NV1 (11 tuổi). I-14 (nhảy cóc màn) ở NV2, NV3.

**Chỉ ở một màn:** I-08 (M5). M4 không có vấn đề về độ rõ ràng.

**Có thể do công cụ mô phỏng:** tần suất I-06 (giới hạn 3); thời gian suy nghĩ miễn phí (giới hạn 2) làm M4 có vẻ dễ hơn thực tế. I-01 **không** do công cụ: đã kiểm lại ở trình duyệt thứ hai.

---

## Phần E — Độ khó và tính công bằng theo màn

| Màn | Kết quả (người chơi) | Nhóm | Giải thích từ hành vi |
|---|---|---|---|
| M1 Làm quen | 7/7 thắng ★★★ (NV6 không bắt đầu được) | Dễ hiểu, thử thách phù hợp (vai trò hướng dẫn) | Hướng dẫn chờ người chơi; không ai cần trợ giúp |
| M2 Chia chuyến | 2 ★★★, 2 ★ (dùng +30s), 1 bỏ cuộc | Khó do tư duy hợp lý (có lẫn thao tác) | NV1, NV5 lấy hàng hai hướng ngược nhau là lỗi kế hoạch thật. NV8 thua do lỡ rẽ (thao tác) |
| M3 Đường lớn & đông | NV1 thua → thắng; NV2, NV7 ★★★ lần đầu | **Dễ hiểu, thử thách phù hợp** | Chú thích màu trên bản đồ + mẹo khi thua tạo vòng học rất tốt |
| M4 Hạn giao | NV2 thua; NV4 thua → thắng | **Khó do tư duy hợp lý** (tốt nhất) | Màn thua nêu rõ đơn nào trễ, yêu cầu gì; NV4 sửa đúng chỗ |
| M5 Chọn xe | 0/2 thắng (đều chọn xe tải) | **Khó do thiếu thông tin** | Không có số liệu tốc độ để kiểm tra kế hoạch trước khi chạy |
| M6 Khởi công | 1/1 ★★★ (còn 64%) | Dễ nhưng hấp dẫn nhờ phần thưởng công trình | Phần mở công trình được NV3 thích nhất |
| M7 Xây trường | 0/1 (hết giờ) | Khó do thao tác (lỡ rẽ trên đường đông) + có thể do tư duy | Chưa đủ dữ liệu để kết luận |

---

## Phần F — Đề xuất theo ưu tiên

### P0 — Cần xử lý trước
**F-1. Bố cục vỡ trên điện thoại nhỏ (I-01)**
- *Bằng chứng:* ảnh 01–03; kiểm lại ở 2 trình duyệt; 740×360 cũng bị.
- *Ảnh hưởng:* mọi người dùng máy có màn ngang nhỏ hơn khoảng 800×380 (nhiều máy Android phổ thông, iPhone SE/8).
- *Giải pháp:* tính tỉ lệ co theo cả hai chiều và căn giữa; ghim các nút quan trọng (Bắt đầu, Quay đầu, mũi tên) theo mép màn hình thật thay vì theo khung thiết kế.
- *Lợi ích:* người chơi bắt đầu được. *Rủi ro với thiết kế:* không có.

### P1 — Nên ưu tiên
**F-2. Luồng sang màn tiếp (I-02, I-03)**
- *Giải pháp:* nút chính ở màn thắng là "Màn tiếp ▶"; Trang chủ tự chọn màn kế. Áp dụng kiểu màn thắng của Chương 2 cho Chương 1.
- *Lợi ích:* giữ nhịp, giảm số người bỏ sau 1–2 màn (NV5). *Rủi ro:* không có.

**F-3. Lệnh rẽ dễ bấm và có phản hồi (I-06)**
- *Giải pháp:* (a) nhận lệnh bấm trước và giữ tới ngã tư hợp lệ kế tiếp; (b) mũi tên chờ to hơn, đặt trên đường phía trước xe; (c) bấm không hợp lệ thì nút rung nhẹ; (d) có thể thêm chế độ "xe chậm lại gần ngã tư" cho người mới.
- *Lợi ích:* thua do kế hoạch, không phải do tay. *Rủi ro:* (d) làm giảm áp lực thời gian, nên chỉ để tùy chọn hoặc chỉ ở Chương 1.

**F-4. Nút mua khi vừa thua (I-04)**
- *Giải pháp:* nút chính là "Thử lại"; "Mua" là nút phụ; mọi thanh toán cần cổng xác nhận phụ huynh; giá tiền thật không hiện ngay sau một lần chạm.
- *Lợi ích:* phù hợp đối tượng từ 10 tuổi, giảm rủi ro khiếu nại. *Rủi ro:* doanh thu ngắn hạn có thể giảm.

**F-5. Dữ kiện cho màn chọn xe (I-08)**
- *Giải pháp:* hiện hệ số tốc độ theo loại đường cho từng xe (bảng "Loại đường" đã có sẵn khung, chỉ cần thêm số), hoặc khi chạm một điểm thì hiện "≈ 25 giây bằng xe tải".
- *Rủi ro:* ước tính quá chính xác thì người chơi tính hết trên giấy. Nên chỉ đưa hệ số, không đưa tổng thời gian tuyến.

### P2 — Cải thiện thêm
- **F-6** Giữ cố định vị trí nút trong bảng lấy hàng (I-05).
- **F-7** Thêm lề cho camera, tránh giao diện che xe hoặc điểm (I-07).
- **F-8** Mốc 2 và 3 sao theo thời gian còn lại (I-09). *Rủi ro:* người chơi chậm thấy ít sao hơn, có thể giữ "hoàn thành = ít nhất 1 sao".
- **F-9** Menu tạm dừng: thêm nút "Bản đồ" và nhãn chữ (I-10, I-11).
- **F-10** Cho quay đầu trước khi xuất phát (I-12); đặt lại bong bóng hướng dẫn (I-13); thông báo "chưa có hàng" (I-15); sửa cách viết ký hiệu (I-16); thêm hình xoay máy (I-17).

---

## Phần G — Khả năng giữ chân (theo quan sát mô phỏng)

- **Đủ dễ hiểu để bắt đầu?** Có, trên màn hình ≥ 844×390: 7/7 nhân vật hiểu mục tiêu và thắng M1 không cần trợ giúp. **Không**, trên màn hình nhỏ (I-01).
- **Giải đố có thú vị?** Có, ở M3 và M4: người chơi thua vì kế hoạch, đọc mẹo, sửa và thắng (NV1 ở M3, NV4 ở M4). M5 thì chưa, vì thiếu dữ kiện.
- **Các màn đầu giới thiệu luật hợp lý?** Có. Mỗi màn thêm đúng một cơ chế (điều khiển → chia chuyến → loại đường → hạn giao → chọn xe), mỗi màn có tab "Màn này · MỚI".
- **Độ khó tăng dần tự nhiên?** M1–M4 có. M5 tăng vọt (0/2 thắng) vì thiếu thông tin.
- **Muốn thử lại khi thua?** Có. Màn thua giải thích nguyên nhân cụ thể kèm mẹo [ảnh 15, 16]. 3/3 nhân vật thử lại sau thua đều làm tốt hơn.
- **Có lý do sang màn tiếp?** Yếu ở Chương 1 (không có "Màn tiếp", sao không phân biệt). Mạnh ở Chương 2 (công trình hoàn thành, thông xe tuyến mới).
- Không thể khẳng định tỷ lệ giữ chân thực tế nếu chưa có dữ liệu người dùng thật.

**Ba vấn đề cần sửa trước:** (1) bố cục vỡ trên màn hình nhỏ; (2) luồng sang màn tiếp (Trang chủ chọn sai màn + không có "Màn tiếp"); (3) lệnh rẽ không phản hồi.
*(Nếu đối tượng chính là trẻ em, đưa vấn đề nút mua khi thua I-04 lên cùng nhóm.)*

**Ba điểm mạnh nên giữ:** (1) màn thua giải thích cụ thể + mẹo đúng; (2) đồng hồ dừng khi đọc hướng dẫn, chọn hàng, xem bản đồ, và hướng dẫn M1 chờ người chơi, rất thân thiện với người chậm; (3) mỗi màn một cơ chế, có bảng "Cách chơi" theo chủ đề và chú thích ngay trên bản đồ; cộng thêm phần thưởng "công trình" ở Chương 2.
