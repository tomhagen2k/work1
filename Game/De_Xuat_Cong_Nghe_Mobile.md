# Đề xuất hướng làm ứng dụng mobile — Little Routes / Cung Đường Nhỏ

| Thông tin | Nội dung |
|---|---|
| Ngày | 18/10/2026 |
| Trạng thái | **Đề xuất — chờ BA chốt** (CN-Q1 → CN-Q5, mục 7) |
| Căn cứ | Demo v1.4 (`demo/index.html`), [Mo_Ta_Yeu_Cau_MVP.md](Mo_Ta_Yeu_Cau_MVP.md) D-76 (dung lượng), quy mô: 15 chương · 150 màn · skin xe · sự kiện 10–20 màn |

## 1. Đặc điểm game quyết định công nghệ

| # | Đặc điểm | Hệ quả khi chọn công nghệ |
|---|---|---|
| 1 | Game 2D nhìn từ trên xuống, xe chạy trên **lưới đường**, camera bám xe, phóng to và thu nhỏ, mini map | Chỉ cần đồ họa 2D. Không cần vật lý và không cần 3D |
| 2 | **Khung cảnh vẽ bằng code từ dữ liệu màn** (D-76): nhà mọc dần, công trường, cảnh quay hoàn thành | Công nghệ phải **vẽ hình vector bằng code** dễ dàng. Đây là điểm khác biệt lớn nhất so với game thông thường dùng ảnh |
| 3 | Chương 2 đã có 10.000–15.000 hình vẽ, cảnh 15 chương sau còn nặng hơn | Không thể để máy vẽ lại từng hình mỗi khung hình. Cần **vẽ một lần rồi lưu lại thành ảnh trong bộ nhớ** |
| 4 | Nhiều màn hình giao diện: trang chủ, cửa hàng, Garage, cài đặt, bưu thiếp; song ngữ Việt – Anh | Cần công cụ làm giao diện nhanh và dễ dịch |
| 5 | Có mua bằng tiền thật (skin xe, gói kim cương) và sự kiện cập nhật định kỳ | Cần thư viện thanh toán của Apple và Google. **Sự kiện phải tải được từ máy chủ** mà không cần cập nhật ứng dụng |
| 6 | Dung lượng tải về dưới 100 MB (D-76) | Bộ khung công nghệ nên nhẹ |
| 7 | Demo hiện có khoảng 3.000 dòng JavaScript đã chạy đúng: luật chơi, 22 màn, bộ vẽ 2 chương, i18n, cửa hàng, Garage | Dùng lại được càng nhiều càng tiết kiệm công sức và tránh lỗi mới |
| 8 | Cách làm hiện tại: **BA định nghĩa yêu cầu, AI viết code, BA kiểm qua demo** | Nên chọn ngôn ngữ mà AI viết tốt nhất, và vẫn kiểm tra được ngay trên trình duyệt |

## 2. Các phương án

| Tiêu chí | **PA-A: Web đóng gói thành ứng dụng** (Capacitor + PixiJS) | PA-B: Godot 4 | PA-C: Unity | PA-D: Flutter + Flame |
|---|---|---|---|---|
| Dùng lại code demo | **Khoảng 70–80%**: luật chơi, dữ liệu màn, bộ vẽ cảnh, giao diện, i18n | Khoảng 10% (chỉ dữ liệu màn); viết lại bằng GDScript | Khoảng 10%; viết lại bằng C# | Khoảng 10%; viết lại bằng Dart |
| Vẽ vector bằng code | **Giữ nguyên bộ vẽ SVG hiện tại**, máy tự chuyển thành ảnh khi vào màn | Có sẵn các hàm vẽ đường, hình, đa giác; phải viết lại toàn bộ bộ vẽ | Yếu: phải tự sinh lưới hình hoặc dùng gói Vector Graphics | Tốt (Canvas); phải viết lại |
| Hiệu năng máy Android yếu | Khá, nhờ vẽ bằng card đồ họa (WebGL). **Rủi ro chính, cần đo trước** (mục 5) | Tốt | Tốt | Tốt |
| Bộ khung ứng dụng | **Khoảng 5–10 MB** | Khoảng 15–25 MB | Khoảng 20–35 MB | Khoảng 8–12 MB |
| Mua trong ứng dụng, phân tích, báo lỗi | Có, qua plugin (RevenueCat, Firebase) | Có, nhưng plugin còn ít | **Đầy đủ nhất** | Có, khá đầy đủ |
| Sự kiện tải từ máy chủ | Dễ: gói dữ liệu JSON | Được (gói tài nguyên) | Được (Addressables) | Được |
| Làm giao diện | **Nhanh: HTML/CSS đã có sẵn** | Trung bình | Chậm hơn | Nhanh |
| AI viết code và BA kiểm thử | **Tốt nhất**: mở trên trình duyệt là kiểm được, giống cách đang làm | Khá | Khá: phải mở trình biên tập Unity để chạy | Khá |
| Rủi ro lớn nhất | Máy yếu bị giật; âm thanh trên iOS | Viết lại toàn bộ | Viết lại toàn bộ; dung lượng | Viết lại toàn bộ |

Không khuyến nghị **bọc nguyên demo SVG như hiện tại vào ứng dụng**. Lý do: mỗi khung hình trình duyệt phải xử lý lại 10.000–15.000 hình SVG, nên máy Android tầm thấp chắc chắn bị giật.

## 3. Khuyến nghị: PA-A — Web đóng gói thành ứng dụng (Capacitor + PixiJS)

**Lý do:**
- Dùng lại phần lớn công sức đã bỏ ra: 22 màn đã kiểm, bộ vẽ cảnh, cửa hàng, Garage, song ngữ.
- Giữ được cách làm "AI viết code, BA mở trình duyệt kiểm" đang hiệu quả.
- Bộ khung nhẹ nhất, nên dễ đạt dưới 100 MB.

Đổi lại, phải **đo hiệu năng trước** khi làm thật (mục 5). Nếu không đạt thì chuyển sang PA-B, Godot.

### 3.1 Cấu trúc ứng dụng

```
┌──────────────────────────────────────────────────────────────┐
│ Giao diện (HTML/CSS) — trang chủ, cửa hàng, Garage, cài đặt,  │  ← dùng lại từ demo
│ bảng hỏi, kết quả, song ngữ                                   │
├──────────────────────────────────────────────────────────────┤
│ Màn chơi (PixiJS · WebGL)                                     │
│  • Lớp nền tĩnh: bộ vẽ SVG hiện có → chuyển thành ảnh 1 lần   │  ← dùng lại drawVillage / drawUrban
│    khi vào màn (chia ô 1024 px, độ nét ×1,5–2)                │
│  • Lớp động: xe, ghim, cần cẩu, nhà mọc, kim cương, hiệu ứng  │  ← vẽ lại nhẹ
├──────────────────────────────────────────────────────────────┤
│ Lõi luật chơi (JavaScript thuần, không phụ thuộc phần vẽ)     │  ← tách từ demo + kiểm thử tự động
│  lưới đường, di chuyển, nhiệm vụ, thời gian, sao, kim cương   │
├──────────────────────────────────────────────────────────────┤
│ Dữ liệu: màn (JSON), skin (tham số / SVG), chuỗi dịch         │
├──────────────────────────────────────────────────────────────┤
│ Capacitor (lớp ứng dụng iOS / Android)                        │
│  mua trong ứng dụng · lưu trữ · rung · khóa màn hình ngang ·  │
│  vùng tai thỏ · màn chờ · âm thanh                             │
└──────────────────────────────────────────────────────────────┘
          │
          ▼  Máy chủ (Firebase — gói miễn phí đủ cho giai đoạn đầu)
     Remote Config (bật/tắt sự kiện, giá) · Storage (gói sự kiện, chương tải sau)
     Analytics (tỉ lệ qua màn, bỏ màn) · Crashlytics (báo lỗi)
```

**Điểm then chốt:** khung cảnh vẫn **vẽ bằng code** như đã chốt (D-76, cách A), nhưng chỉ vẽ **một lần khi vào màn**. Máy chuyển cảnh thành ảnh rồi giữ trong bộ nhớ, nên khi xe chạy card đồ họa chỉ phải hiển thị một ảnh.
- **Số hình vẽ trong cảnh chỉ ảnh hưởng thời gian tải màn**, không còn làm giật khi chơi.
- Cảnh quay nhà mọc và công trình "nảy" lên: mỗi nhóm nhà mới (`growI`) được chuyển thành một ảnh riêng để phóng to dần. Cách này giữ nguyên hiệu ứng hiện có.
- Ảnh nằm trong bộ nhớ khi chạy, **không nằm trong gói cài**, nên dung lượng tải về vẫn nhỏ.

### 3.2 Các thành phần khác

| Thành phần | Đề xuất | Ghi chú |
|---|---|---|
| Mua bằng tiền thật | RevenueCat (miễn phí đến 2.500 USD doanh thu mỗi tháng) | Tự kiểm biên lai Apple và Google; khôi phục giao dịch đúng như nút đã có trong demo |
| Lưu tiến độ | Lưu trên máy, kèm **sao lưu đám mây** khi đăng nhập ẩn danh qua Firebase [MỞ CN-Q3] | Đổi máy không mất kim cương và skin đã mua |
| Sự kiện | **Gói dữ liệu** (màn JSON, skin dạng tham số, banner, nhạc) tải khi sự kiện mở | Không tải code mới, đúng quy định Apple 2.5.2 nên không cần duyệt lại ứng dụng |
| Chương 4–15 | Đóng gói sẵn **dữ liệu** của cả 15 chương (nhẹ); **nhạc chương** tải khi tới chương | Giữ gói cài dưới 100 MB |
| Âm thanh | Nhạc nén AAC/OGG (D-76), chọn bản nhạc sau; hiệu ứng âm thanh qua Web Audio | iOS phải mở khóa âm thanh ở lần chạm đầu tiên |
| Màn hình | Khóa ngang trong cấu hình ứng dụng (bỏ cách xoay 90° của demo); xử lý vùng tai thỏ; cho nền tràn dải trống trên máy tính bảng | Sửa các điểm đã nêu ở phần kiểm tra thiết bị |
| Cảm giác như ứng dụng gốc | Tắt chọn chữ, tắt cuộn nảy, thêm rung khi chạm, màn chờ | Tránh cảm giác đang dùng trang web |

### 3.3 Dung lượng ước tính theo PA-A

| Phần | Dung lượng |
|---|---|
| Bộ khung Capacitor và WebView | 5–10 MB |
| Code, dữ liệu 15 chương, skin | 1–2 MB |
| Giao diện, icon, phông chữ tiếng Việt | 5–9 MB |
| Nhạc chương 1–3 và trang chủ, nén khoảng 96 kbps | 6–8 MB |
| Hiệu ứng âm thanh | 2–4 MB |
| **Tổng khi tải về** | **≈ 20–35 MB** (chương sau và sự kiện tải thêm, mỗi gói 1–5 MB) |

Vẫn còn dư nhiều so với mục tiêu dưới 100 MB, kể cả nếu đóng gói sẵn nhạc của cả 15 chương (thêm khoảng 20 MB).

## 4. Lộ trình đề xuất

| Giai đoạn | Việc chính | Kết quả để BA kiểm |
|---|---|---|
| **0. Thử kỹ thuật** | Dựng màn thưởng Chương 2 (cảnh nặng nhất) bằng PixiJS theo mục 3.1, đóng gói Capacitor, cài lên máy thật | Số đo theo tiêu chí ở mục 5 → **quyết định tiếp PA-A hay chuyển sang PA-B** |
| 1. Tách lõi luật chơi | Tách luật chơi khỏi phần vẽ; viết kiểm thử tự động cho 22 màn (kế hoạch 3★, các kịch bản thua) | Bộ kiểm thử chạy qua hết; demo vẫn chạy như cũ |
| 2. Màn chơi mới | Hiển thị bằng PixiJS; camera, mini map, cảnh quay, Garage hiển thị trên bản đồ | Chơi được Chương 1–2 trên máy thật |
| 3. Phần ứng dụng | Mua trong ứng dụng, sao lưu, Firebase, khung tải sự kiện, xử lý tai thỏ và máy tính bảng | Mua thử ở môi trường thử của Apple và Google; tải thử một sự kiện mẫu |
| 4. Thử nội bộ | TestFlight (iOS) và Internal testing (Android); đo trên nhiều loại máy | Báo cáo lỗi, số đo hiệu năng |
| 5. Phát hành thử | Phát hành giới hạn tại Việt Nam, theo dõi tỉ lệ qua màn và tỉ lệ bỏ game | Dữ liệu chỉnh độ khó trước khi làm chương 4–15 |

Song song: thiết kế chương 3–15 vẫn tiếp tục trên demo trình duyệt như hiện nay. Bộ vẽ SVG mới (ví dụ kết quả prompt vòng 2) dùng thẳng được trong ứng dụng.

## 5. Tiêu chí đạt của bước thử kỹ thuật (giai đoạn 0)

| Tiêu chí | Máy tầm trung (ví dụ Galaxy A25, iPhone 11) | Máy tầm thấp (Android RAM 3 GB, ví dụ Galaxy A05, Redmi A3) |
|---|---|---|
| Khung hình khi lái xe | ≥ 55 fps | ≥ 30 fps, không khựng khi rẽ hoặc phóng to |
| Thời gian vào màn (gồm chuyển cảnh thành ảnh) | ≤ 1,5 giây | ≤ 3 giây |
| Bộ nhớ dùng | ≤ 250 MB | ≤ 200 MB (giảm độ nét cảnh xuống ×1,25 nếu cần) |
| Cảnh quay nhà mọc | Mượt | Chấp nhận giảm hiệu ứng |
| Âm thanh iOS | Phát đúng sau lần chạm đầu, không trễ | — |

**Không đạt máy tầm thấp → chuyển sang PA-B, Godot 4.** Khi đó dữ liệu màn và thiết kế vẫn dùng lại được; phần code phải viết lại.

## 6. Rủi ro và cách giảm

| Rủi ro | Mức | Cách giảm |
|---|---|---|
| Máy Android yếu bị giật | Cao | Bước thử kỹ thuật trước; vẽ cảnh một lần rồi lưu thành ảnh; tự giảm độ nét theo cấu hình máy |
| Ảnh cảnh lớn tốn bộ nhớ (2300×1250 ×2 ≈ 46 MB) | Trung bình | Chia ô 1024 px; chỉ giữ ô gần camera ở độ nét cao; độ nét ×1,5 trên máy yếu |
| Âm thanh trên iOS (bị chặn đến khi người chơi chạm) | Trung bình | Mở khóa ở lần chạm đầu; dùng plugin âm thanh gốc nếu cần |
| Apple từ chối ứng dụng "chỉ là trang web" (quy định 4.2) | Thấp | Game hoạt động không cần mạng, có mua trong ứng dụng, rung, Game Center |
| Tải code từ máy chủ bị cấm (quy định 2.5.2) | Thấp | Sự kiện chỉ là **dữ liệu**; skin sự kiện mô tả bằng tham số hoặc SVG, không phải code |
| Bản quyền nhạc | Trung bình | Chỉ dùng nhạc có giấy phép thương mại rõ ràng; lưu chứng từ trong `phap_ly/` |

## 7. Câu hỏi cần BA chốt

| ID | Câu hỏi | Đề xuất của Claude |
|---|---|---|
| CN-Q1 | Chọn hướng làm ứng dụng nào? | **PA-A (Capacitor + PixiJS)**, có bước thử kỹ thuật; không đạt thì chuyển sang PA-B (Godot) |
| CN-Q2 | Phát hành nền tảng nào trước? | **Android trước** (đa số người chơi ở Việt Nam, duyệt nhanh), iOS sau 2–4 tuần |
| CN-Q3 | Có sao lưu tiến độ lên đám mây không? | **Có**: đăng nhập ẩn danh tự động, sau đó cho liên kết tài khoản Google hoặc Apple để đổi máy |
| CN-Q4 | Có quảng cáo không (ví dụ xem quảng cáo để nhận Thêm giờ hoặc kim cương)? | **Chưa có ở bản đầu**; quyết định sau khi có số liệu phát hành thử |
| CN-Q5 | Ai làm ứng dụng: tiếp tục AI viết và BA kiểm, hay thuê lập trình viên? | Tiếp tục AI viết. Nên có **1 lập trình viên kiểm tra** ở giai đoạn 3 (thanh toán, phát hành lên cửa hàng) |
