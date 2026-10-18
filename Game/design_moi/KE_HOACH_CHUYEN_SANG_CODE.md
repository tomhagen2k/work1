# Kế hoạch đưa thiết kế mới Chương 1 – 2 vào game

| Mục | Nội dung |
|---|---|
| Ngày | 18/10/2026 |
| Trạng thái | **Chờ BA chốt KH-Q1 → KH-Q6** (mục 6), sau đó mới bắt đầu làm |
| Nguồn thiết kế | `design_moi/chuong_1/` và `chuong_2/`: mỗi chương 11 màn (man_01 → man_10, man_thuong), mỗi màn có `khung_canh_moi.svg/.png` (không ghim) và `khung_canh_moi_co_ghim.svg/.png` |
| Phạm vi | **Chỉ thay phần hình ảnh khung cảnh** của Chương 1 và 2 trong `demo/index.html`. **Không đổi logic màn**: nút, đoạn đường, loại đường, đoạn chưa thông, kho và điểm giao, nhiệm vụ, thời gian, vị trí xuất phát, sao, kim cương |

## 1. Kết quả khảo sát bộ thiết kế (đã chạy)

| Hạng mục | Chương 1 | Chương 2 |
|---|---|---|
| Khổ bản vẽ | 2450×1750 (bản đồ 1950×1250 + lề 250 px mỗi phía) | 2800×1750 (bản đồ 2300×1250 + lề 250 px) |
| Đường đã thông, đường lớn, đoạn chưa thông | ✅ **Khớp 100% ở 11/11 màn** | ✅ **Khớp 100% ở 11/11 màn** (đoạn chưa thông vẽ rộng 34 px) |
| Ghim: vị trí, ký hiệu kho ▲ / điểm giao ▼, màu | ✅ 11/11 màn | ✅ 11/11 màn |
| Vật đè lên mặt đường | ✅ Không có | ✅ Không có. Dải xanh giữa đường lớn là **dải phân cách** do thiết kế vẽ, không phải vật cản |
| Số hình vẽ mỗi màn | 3.530 → 3.830 | 1.640 → 2.460 |
| Hiệu ứng bóng đổ (filter) | 66 → 76 chỗ mỗi màn | 47 → 58 chỗ mỗi màn |
| Phần giống nhau giữa hai màn liên tiếp | Rất cao: mỗi màn chỉ thêm hoặc bớt 2–36 nhóm hình | Thêm hoặc bớt 0–121 nhóm hình |
| Chữ trong cảnh | Không có | Có vài biển: "LOT-09", "NEW HORIZON EXPWY", "CITY LAKE"… |
| Phông chữ | Nunito (game đã tải sẵn) | Nunito |

Ghi chú:
- Cối xay gió ở Chương 1 nằm ở tọa độ y = 1320, thuộc **phần lề ngoài bản đồ**, nên hiện tại người chơi không nhìn thấy.
- Chương 2 có cầu và đường cao tốc vẽ ra ngoài mép bản đồ. Đây là trang trí, không nối vào lưới đường của game.

**Kết luận:** logic trong thiết kế đã khớp với game, nên có thể đưa vào nguyên vẹn.

## 2. Cách làm đề xuất: chuyển SVG thiết kế thành dữ liệu cảnh, gồm nền chung và phần thay đổi theo từng màn

Game hiện vẽ cảnh bằng hàm `drawVillage` (Chương 1) và `drawUrban` (Chương 2), tự sinh hình từ dữ liệu màn. Viết lại hai hàm này để vẽ "gần giống" ảnh mới sẽ **không bao giờ giống hệt từng chi tiết**. Vì vậy đề xuất **dùng chính hình vẽ trong SVG thiết kế làm nguồn**:

1. **Công cụ chuyển đổi** đọc 22 tệp `khung_canh_moi.svg`. Với mỗi chương, công cụ tách:
   - **phần nền chung** cho mọi màn;
   - **phần thay đổi theo màn**: nhóm hình thêm vào và nhóm hình bỏ đi so với màn trước.
2. **Bộ vẽ cảnh mới** `drawDesign(chương, màn)` thay cho `drawVillage` và `drawUrban`, ghép nền chung với phần thay đổi để ra **đúng từng hình** của màn đó.
3. **Cảnh quay hoàn thành công trình vẫn giữ.** Sau khi thắng màn N:
   - nhóm hình **có ở màn N+1 mà màn N chưa có** (công trình mới, nhà mọc, đường mới thông) sẽ "mọc" hoặc "nảy" lên;
   - nhóm hình **bị bỏ** (công trường cũ) sẽ mờ dần.
4. **Trang chủ, bưu thiếp và bản đồ chương** dùng cảnh của màn tương ứng với tiến độ người chơi; khi hết chương thì dùng cảnh màn thưởng.
5. **Không xóa code cũ.** `drawVillage` và `drawUrban` vẫn giữ lại; thêm `#canh=cu` vào địa chỉ để mở lại cảnh cũ khi cần so sánh hoặc quay lại.

| Phương án | Giống ảnh | Giữ cảnh quay | Dung lượng thêm vào demo | Đánh giá |
|---|---|---|---|---|
| **P1. Nền chung + phần thay đổi (đề xuất)** | **Giống hệt** (cùng hình vẽ) | **Có** | Khoảng 0,6–0,9 MB chưa nén, khoảng 0,15 MB khi nén | ✅ Khuyến nghị |
| P2. Viết lại `drawVillage` / `drawUrban` theo phong cách mới | Chỉ gần giống | Có | Nhỏ | ❌ Không đạt yêu cầu "giống hệt" |
| P3. Nhúng nguyên 22 tệp SVG | Giống hệt | **Mất** hiệu ứng mọc hoặc nảy từng công trình | Khoảng 5 MB | ❌ |

Phần vẫn do engine vẽ, đặt **trên** cảnh và không đổi logic:
- xe;
- ghim và nhãn nhiệm vụ (thay đổi theo tiến độ và ngôn ngữ, xem KH-Q2);
- kim cương ở màn thưởng;
- mũi tên hướng dẫn;
- mini map.

Engine hiện **tự vẽ lại đường**. Với hai chương này, đường sẽ lấy từ thiết kế (đã kiểm tra khớp 100%), và engine **chỉ tắt phần vẽ đường của nó**. Dữ liệu đường dùng cho việc lái xe không đổi.

## 3. Các bước thực hiện

| Bước | Việc | Kết quả |
|---|---|---|
| **B0. Chụp mốc trước khi sửa** | Lưu phiên bản demo hiện tại bằng `tools/chot_phien_ban.py`. Trích **dữ liệu logic của 22 màn** (nút, đường, điểm, nhiệm vụ, thời gian, xuất phát) thành tệp mốc. Chạy `level_design/solver.py` và `autopilot.js` để lưu kết quả mốc | Có mốc để so sánh logic sau khi sửa |
| **B1. Công cụ chuyển đổi** | `tools/chuyen_design.py`: đọc SVG; đổi tên mã nội bộ (`soft-shadow` → `c1-soft-shadow`…) để không trùng với game; bỏ lớp ghim và nhãn; tách nền chung và phần thay đổi theo màn; xuất `CANH_C1`, `CANH_C2` | **Kiểm tự động:** ghép lại từng màn phải ra **đúng từng ký tự** hình vẽ trong SVG gốc |
| **B2. Đưa vào game** | Thêm `drawDesign` vào `CC.draw` của 2 chương; trả `siteR`, `growI`, `popG` cho cảnh quay; tắt phần vẽ đường của engine với 2 chương này; làm ghim theo KH-Q2 và lề theo KH-Q3 | Mở `#lv=1` → `#lv=22` thấy cảnh mới |
| **B3. Kiểm thử** | Theo mục 4 | Báo cáo từng màn |
| **B4. Hoàn tất** | Sửa lỗi phát hiện; ghi CHANGELOG; tăng phiên bản; viết `BAO_CAO_KIEM_THU_CANH_MOI.md` | Chờ BA duyệt, rồi commit khi BA yêu cầu |

## 4. Kiểm thử: làm cho từng màn trong 22 màn

| # | Kiểm tra | Cách làm | Tiêu chí đạt |
|---|---|---|---|
| T1 | **Logic không đổi** | So dữ liệu logic sau khi sửa với tệp mốc ở B0 | **Giống hệt từng byte** |
| T2 | **Màn vẫn thắng được như cũ** | Chạy solver và autopilot: mỗi màn lái theo kế hoạch 3★ đến khi thắng | Kết quả và thời gian giống mốc |
| T3 | **Cảnh giống hệt ảnh thiết kế** | Xuất lớp cảnh từ game (ẩn xe, ghim, giao diện). Chụp bằng cùng một trình duyệt, cùng kích thước 2450×1750 (Ch.1) hoặc 2800×1750 (Ch.2), đặt cạnh ảnh chụp từ `khung_canh_moi.svg` của bạn, rồi **so từng điểm ảnh** | **0 điểm ảnh khác biệt**. Nếu có khác biệt, xuất ảnh đánh dấu chỗ khác để xem |
| T4 | So thêm với ảnh PNG bạn gửi | So từng điểm ảnh với `khung_canh_moi.png` | Chỉ để tham khảo: PNG của bạn có thể xuất bằng công cụ khác, nên mép hình có thể lệch rất nhỏ |
| T5 | Ghim và nhãn | So vùng ghim với `khung_canh_moi_co_ghim.png` | Theo KH-Q2 |
| T6 | Màn hình khi chơi | Chụp 4 màn hình (chuẩn bị, đang lái, bản đồ lớn, kết quả) trên 4 kích thước máy: 667×375, 800×360, 932×430, 1024×768 | Không vỡ hình, không có vùng trống lạ, chữ đọc được |
| T7 | Cảnh quay sau khi thắng | Thắng từng màn N → khung hình cuối cảnh quay phải **giống hệt cảnh màn N+1** (T3); xem các khung giữa | Mượt, không chớp, không có hình thừa |
| T8 | Trang chủ, bưu thiếp, bản đồ chương | Mở theo từng mốc tiến độ | Đúng cảnh của màn tương ứng |
| T9 | Hiệu năng | Số hình vẽ, thời gian dựng màn; tốc độ khung hình khi lái, giả lập máy yếu (CPU chậm 4 lần) | Dựng màn ≤ 30 ms; lái ≥ 50 khung hình/giây trên máy tính, ≥ 30 khi giả lập máy yếu. Ghi số đo chi tiết, đặc biệt ảnh hưởng của 47–76 hiệu ứng bóng đổ |
| T10 | Song ngữ, Garage, cửa hàng | Đổi ngôn ngữ, đổi skin xe, mở các màn hình khác | Không lỗi |

**Báo cáo** sẽ có bảng 22 dòng (mỗi màn một dòng × T1–T10). Màn nào khác ảnh sẽ có ảnh đánh dấu chỗ khác.

## 5. Rủi ro

| Rủi ro | Cách xử lý |
|---|---|
| 47–76 hiệu ứng bóng đổ mỗi màn làm máy yếu bị chậm | Đo ở T9. Bản demo trên trình duyệt chịu được. Ở bản ứng dụng thật (De_Xuat_Cong_Nghe_Mobile.md), cảnh chỉ vẽ một lần khi vào màn nên không ảnh hưởng lúc lái. **Không bỏ bóng đổ** vì phải giống hệt |
| Mã nội bộ trong SVG trùng với game | Đổi tên tự động ở B1 |
| Cảnh quay chọn sai nhóm hình để "mọc" | Gom các nhóm hình thêm vào theo vị trí. Kiểm ở T7 |
| Bạn sửa ảnh sau này | Chạy lại `tools/chuyen_design.py` rồi chạy lại T1–T10. Không phải sửa tay |

## 6. Câu hỏi cần BA chốt

| ID | Câu hỏi | Đề xuất của Claude |
|---|---|---|
| KH-Q1 | Cách làm | **P1: nền chung + phần thay đổi theo màn** (giống hệt, giữ cảnh quay) |
| KH-Q2 | Ghim và nhãn: thiết kế vẽ ghim **cố định**, nhãn ghi sẵn song ngữ "Tiệm bánh · Bakery". Trong game, nhãn **thay đổi** (nhiệm vụ còn lại, ✓ xám khi giao xong, theo ngôn ngữ đang chọn) | **Đổi kiểu ghim và nhãn của game cho giống thiết kế** (hình, màu, viền, bóng, phông chữ), nhưng **nội dung vẫn thay đổi theo game**: tên theo ngôn ngữ đang chọn, có dòng nhiệm vụ |
| KH-Q3 | Lề 250 px quanh bản đồ: hiện camera không cho nhìn ra ngoài bản đồ, nên phần lề không bao giờ hiện | **Giữ camera như cũ** (không đổi cách chơi). Chỉ dùng lề để lấp dải trống khi màn hình rộng hơn bản đồ (bản đồ lớn, máy tính bảng) |
| KH-Q4 | Chữ trong cảnh Chương 2 ("LOT-09", "NEW HORIZON EXPWY", "CITY LAKE") hiện chỉ có tiếng Anh | **Giữ nguyên như thiết kế** (coi là biển hiệu) |
| KH-Q5 | Game hiện có vài chuyển động trong cảnh (cần cẩu quay, công trình nảy lên). Thiết kế là ảnh tĩnh | **Giữ cảnh tĩnh đúng như ảnh.** Chỉ có chuyển động trong cảnh quay hoàn thành công trình. Nếu muốn thêm chuyển động nhẹ (nước, cờ) thì làm sau |
| KH-Q6 | Thế nào là "giống hệt" | **0 điểm ảnh khác** khi cùng trình duyệt vẽ cùng tệp. So với PNG bạn xuất bằng công cụ khác thì chỉ báo cáo để tham khảo (T4) |
