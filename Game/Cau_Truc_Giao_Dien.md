# Cấu trúc giao diện game — đề xuất

| Thông tin | Nội dung |
|---|---|
| Phiên bản | 0.3 — đợt 1 đã dựng vào demo v1.4; 0.2 — thêm giữ tiến trình khi cài lại (mục 8A), văn bản pháp lý (mục 11); quảng cáo sau mỗi 5 lượt; ngoại hình hiện trong màn chơi |
| Ngày | 17/10/2026 |
| Căn cứ | Phản hồi BA 16–17/10/2026; [Mo_Ta_Yeu_Cau_MVP.md](Mo_Ta_Yeu_Cau_MVP.md) v1.26; demo v1.4 |
| Bản vẽ khung | [mockups/khung_giao_dien.html](mockups/khung_giao_dien.html) — 12 màn hình + sơ đồ đi lại (mức phác thảo, chưa phải thiết kế hình ảnh) |
| Trạng thái | **Chưa phải yêu cầu.** Chỉ đưa vào Mô tả yêu cầu khi BA chốt mục 10 |

---

## 1. Quyết định đã có

| ID | Quyết định | Ngày |
|---|---|---|
| GD-01 | Giai đoạn này chỉ làm **bản offline** (không máy chủ, không tài khoản riêng của game) | 16/10 |
| GD-02 | Hỗ trợ **tiếng Việt và tiếng Anh** | 16/10 |
| GD-03 | Ngoại hình xe **chỉ thay hình dáng, không thay chỉ số** — giữ cân bằng cho mọi người chơi | 16/10 |
| GD-04 | **Có quảng cáo**, lúc đầu ít | 16/10 |
| GD-05 | Ngoại hình xe đã trang bị **hiển thị trong màn chơi** | 17/10 |
| GD-06 | Quảng cáo **tự chạy sau mỗi 5 lượt chơi**, tính cả thắng và thua. **Không có quảng cáo đổi thưởng** (không xem quảng cáo để nhân đôi kim cương hay thêm giờ) | 17/10 |
| GD-07 | **Mời liên kết tài khoản nền tảng ngay lần đầu** (Google Play Games / Game Center + iCloud) để giữ tiến trình khi cài lại — chi tiết mục 8B | 18/10 |
| GD-08 | **Độ tuổi tối thiểu 10.** Chỉ thu thập dữ liệu trò chơi. Nội dung trò chơi là **hư cấu** (có điều khoản miễn trừ trùng hợp) | 18/10 |
| GD-09 | Quảng cáo: thoát giữa màn **không** tính lượt (QC-Q1); **không** miễn cho người mới (QC-Q2); **có gói Bỏ quảng cáo** (QC-Q3); màn thưởng **không** tính lượt (QC-Q4) | 18/10 |
| GD-10 | Bố cục Trang chủ theo bản vẽ ④ (GD-Q1); đợt 1 như đề xuất + **thiết kế logo** (GD-Q2); điểm danh C1 + C2 + C5, quà/nhiệm vụ Claude soạn, cho đổi tên, sao lưu SL-01 → SL-06 (GD-Q6 → Q9) | 18/10 |
| GD-11 | Nhà phát hành (tạm): **cá nhân Tom Hagen**, Hà Nội, tiepdv00@gmail.com | 18/10 |
| GD-12 | Quảng cáo **không cá nhân hóa cho tất cả** (PL-Q1); phát hành **toàn cầu** (PL-Q4); logo theo **phương án D** — icon không chữ, tên tiếng Anh là tên chính, bản tên tiếng Việt khi chọn tiếng Việt | 18/10 |
| GD-13 | **Tên game: Little Routes** (tiếng Việt: **Cung Đường Nhỏ**); logo phương án D. **Đợt 1 đã dựng vào demo v1.4** (xem CHANGELOG) | 18/10 |

## 2. Nguyên tắc chung

| # | Nguyên tắc |
|---|---|
| N1 | **Trang chủ là trung tâm**: mọi màn hình phụ mở từ Trang chủ và quay về đúng nơi vừa mở (nút ←). |
| N2 | Từ Trang chủ tới màn chơi tiếp theo chỉ **1 chạm** (nút CHƠI). Người chơi quen không phải đi qua nhiều lớp. |
| N3 | **Màn hình** cho nội dung lớn (Garage, Bản đồ chương, Hồ sơ); **popup** cho việc nhanh (Cài đặt, Điểm danh, Nhiệm vụ, Cửa hàng) — popup phủ tối nền như popup tạm dừng đã có. |
| N4 | **Chấm đỏ** trên nút = có quà chưa nhận / việc chưa xem. Không dùng số đếm lớn gây áp lực. |
| N5 | Thanh trên giống nhau ở mọi màn hình ngoài màn chơi: trái = quay lại / hồ sơ, phải = ví 💎 và các nút nhanh. |
| N6 | Giữ chuẩn đã chốt: khung ngang 844×390, chữ ≥ 12px, nút ≥ 44px (UI-14). |
| N7 | **Mọi chữ hiển thị nằm trong bảng ngôn ngữ** (không viết thẳng trong code) để đổi Việt ⇄ Anh. |

## 3. Sơ đồ màn hình

```
Khởi động ─► (lần đầu) Chọn ngôn ngữ ─► Đồng ý điều khoản & chính sách ─► Lưu tiến trình (Liên kết / Để sau) ─► TRANG CHỦ
TRANG CHỦ ─► CHƠI ─► Chuẩn bị ─► Chơi ─► Kết quả ─► (mỗi 5 lượt: quảng cáo) ─► Màn tiếp / Trang chủ
          ─► Bản đồ chương (chọn màn bất kỳ, chơi lại, màn thưởng)
          ─► Garage (xe · ngoại hình · kho đồ)      ─► Cửa hàng
          ─► Điểm danh 7 ngày   ─► Nhiệm vụ ngày & Thành tựu
          ─► Hồ sơ (thống kê · bưu thiếp)          ─► Hộp thư
          ─► Cài đặt (cũng mở từ Bản đồ chương và popup tạm dừng)
```

## 4. Mô tả từng màn hình

| # | Màn hình | Loại | Mục đích | Thành phần chính | Trạng thái | Mới / có |
|---|---|---|---|---|---|---|
| 1 | Khởi động | Màn hình | Tải dữ liệu | Logo, thanh tải, mẹo chơi ngẫu nhiên, phiên bản | Lần đầu cài lại: hỏi chọn bản lưu (mục 8A) | MỚI |
| 2 | Chọn ngôn ngữ | Popup | Chọn Việt/Anh lần đầu | 2 nút lớn, gợi ý sẵn theo ngôn ngữ máy | Chỉ lần đầu | MỚI |
| 3 | Đồng ý | Popup | Pháp lý | Câu ngắn (có quảng cáo, mua hàng), 2 liên kết chính sách, nút "Đồng ý và chơi" | Lần đầu; khi chính sách đổi | MỚI |
| 4 | **Trang chủ** | Màn hình | Trung tâm, lối vào nhanh nhất | Hồ sơ; ví 💎 + ⏱; Hộp thư, Cửa hàng, Cài đặt; cột trái Điểm danh · Nhiệm vụ · Thành tựu; nền khung cảnh chương đang chơi + xe với ngoại hình đang dùng; thẻ chương (sao, 10 màn); **nút CHƠI → màn chưa qua đầu tiên**; cột phải Garage · Chương · Sự kiện (sau) | Chấm đỏ; đã qua hết chương → CHƠI mở chương sau | MỚI |
| 5 | Bản đồ chương | Màn hình | Chọn màn, chơi lại, màn thưởng | Như demo; góc trái thành "← Trang chủ"; nút âm thanh chuyển vào Cài đặt | — | ĐÃ CÓ |
| 6 | Cài đặt | Popup | Tùy chọn | 4 nhóm: **Chung** (ngôn ngữ, rung, chất lượng hình, thông báo, xem lại hướng dẫn) · **Âm thanh** (nhạc nền, hiệu ứng) · **Dữ liệu & mua hàng** (trạng thái sao lưu, khôi phục mua hàng, mã người chơi, xóa dữ liệu) · **Hỗ trợ & pháp lý** (câu hỏi thường gặp, gửi phản hồi, điều khoản, quyền riêng tư, hoàn tiền, quảng cáo, giấy phép); phiên bản | Mở trong màn chơi → thời gian dừng | MỚI |
| 7 | Garage | Màn hình | Sưu tập, chọn ngoại hình | Danh sách loại xe (+ chỉ số, khóa); xe xem trước; thẻ chi tiết (Trang bị / Mua 💎 / Mua tiền / điều kiện mở); hàng ngoại hình; **Kho đồ** (vật phẩm) | Đang dùng / đã có / mua được / khóa | MỚI |
| 8 | Điểm danh 7 ngày | Popup | Lý do quay lại mỗi ngày | 6 ô ngày + ô ngày 7 lớn (ngoại hình), nút Nhận | Tự mở 1 lần/ngày | MỚI |
| 9 | Nhiệm vụ & Thành tựu | Popup 2 tab | Mục tiêu ngắn hạn, dài hạn | 3 nhiệm vụ/ngày (tiến độ, quà, Nhận) + thưởng khi xong cả 3; thành tựu cột mốc → ngoại hình, huy hiệu | Đồng hồ làm mới | MỚI |
| 10 | Cửa hàng | Popup | Mua | Tab Kim cương · Vật phẩm (đã có) + **Ngoại hình** + **Ưu đãi**; gói Bỏ quảng cáo (nếu chốt QC-Q3); khôi phục mua hàng | — | ĐÃ CÓ, mở rộng |
| 11 | Hồ sơ & Hộp thư | Màn hình | Khoe tiến độ, nhận thư | Hình đại diện, tên, thống kê, huy hiệu; bộ sưu tập bưu thiếp chương; hộp thư (bản offline: thư kèm bản cập nhật) | — | MỚI |
| 12 | Kết quả + quảng cáo | Popup | Kết thúc màn | Như demo; **quảng cáo toàn màn hình** khi rời màn kết quả của lượt thứ 5 (mục 7). Không có nút xem quảng cáo đổi thưởng | Có/không mạng | ĐÃ CÓ + MỚI |
| — | Trang chính sách | Màn hình chữ | Đọc điều khoản | Tiêu đề, nội dung cuộn, nút ← | Theo ngôn ngữ | MỚI |

## 5. Garage — quy tắc ngoại hình (GD-03, GD-05)

| # | Quy tắc |
|---|---|
| G1 | Mỗi **loại xe** có bộ ngoại hình riêng; trang bị **1 ngoại hình cho mỗi loại xe**. |
| G2 | Ngoại hình **không đổi chỉ số** (tốc độ, sức chứa, đường được đi). |
| G3 | Nguồn nhận: mua kim cương, mua tiền, điểm danh ngày 7, thành tựu, sự kiện theo mùa (sau). |
| G4 | Ngoại hình **mua bằng tiền** là hàng không tiêu hao → khôi phục được khi cài lại qua nút "Khôi phục mua hàng". |
| G5 | Ngoại hình đang trang bị hiện ở **mọi nơi có xe**: màn chơi, màn chuẩn bị, trang chủ, cảnh quay công trình, Garage. Mini map và bản đồ lớn vẫn dùng ký hiệu xe chung để dễ đọc. |
| G6 | Trong màn chơi, ngoại hình phải giữ **đúng kích thước và dáng tổng thể** của loại xe (xe tải vẫn nhìn ra là xe tải); nhãn sức chứa (vd 2/3), mũi tên chọn hướng, thanh tiến trình vẫn hiện như cũ. Chỉ đổi màu, họa tiết, chi tiết trang trí. |
| G7 | Màn chọn xe có nhiều xe (màn chuẩn bị) hiện mỗi xe với ngoại hình đang trang bị của loại đó. |

**Quyết định Garage (17/10/2026):** GA-Q1 bố cục **B — bộ sưu tập dạng lưới** · GA-Q2 bộ 19 ngoại hình (Van 7, Xe máy 6, Xe tải 6 — bỏ Van Đèn Lồng, Xe Thùng Giao Hàng, Rồng Vàng; thêm Van Cắm Trại, Van Hoàng Hôn, Van Hoa Anh Đào, Xe Ong Vàng, Xe Lá Xanh, Xe Dải Ngân Hà, Xe Tải Trái Cây, Xe Tải Rạp Xiếc — **chờ duyệt lại các mẫu mới**) · GA-Q3 giữ 1 ngoại hình bán bằng tiền (Vespa Bạc Hà 49.000đ) · GA-Q4 thưởng chương khi thắng màn 10 · GA-Q5 giá 300/400/500 💎 · GA-Q6 xe chưa dùng vẫn sưu tập được, ghi "Dùng từ chương…" · GA-Q7 ngoại hình sự kiện quay lại năm sau, không bán bằng tiền. Hình: [mockups/garage_de_xuat.html](mockups/garage_de_xuat.html).

## 6. Ngôn ngữ (GD-02)

| # | Nội dung |
|---|---|
| L1 | Lần đầu: gợi ý theo ngôn ngữ của máy; đổi lại trong Cài đặt, áp dụng ngay. |
| L2 | Phải dịch: giao diện, hướng dẫn, tên chương/màn/địa danh/công trình, câu thông báo, chính sách. Tên chương hư cấu (CĐ-Q2) cần bản tiếng Anh riêng. |
| L3 | Định dạng theo ngôn ngữ: số (3.500 / 3,500), giá tiền theo cửa hàng ứng dụng, thời gian m:ss giữ nguyên. |
| L4 | Thiết kế chừa chỗ cho chữ dài hơn (tiếng Anh thường dài hơn ~20–30% ở nút, nhãn). |

## 7. Quảng cáo (GD-04, GD-06)

| # | Quy tắc | Nguồn |
|---|---|---|
| QC-01 | **Quảng cáo toàn màn hình tự chạy sau mỗi 5 lượt chơi.** Một lượt = một lần chơi màn **kết thúc ở màn kết quả** (thắng hoặc thua, kể cả thua sau khi chọn "Chịu thua" ở popup hết giờ). | [XN] GD-06 |
| QC-02 | Hiện **khi người chơi rời màn kết quả** của lượt thứ 5 (bấm Màn tiếp / Chơi lại / Trang chủ). Không chen vào lúc đang chơi, không che màn kết quả. | [GĐ] |
| QC-03 | Bộ đếm lượt lưu trên máy, **không về 0 khi tắt game** (tránh né quảng cáo bằng cách tắt mở lại). Hiện quảng cáo xong → đếm lại từ 0. | [GĐ] |
| QC-04 | **Không có quảng cáo đổi thưởng**: không xem quảng cáo để nhân đôi kim cương, thêm giờ hay nhận vật phẩm. | [XN] GD-06 |
| QC-05 | Không có mạng / quảng cáo không tải được → bỏ qua lần đó, đếm lại từ 0, không dồn sang lượt sau. | [GĐ] |
| QC-06 | Nút đóng quảng cáo theo quy định của mạng quảng cáo (thường vài giây). | [SL] |

**✅ Đã chốt 18/10 (GD-09):** QC-Q1 không tính · QC-Q2 không miễn · QC-Q3 có gói Bỏ quảng cáo · QC-Q4 không tính. Bảng dưới giữ để tra cứu:

| ID | Câu hỏi | Đề xuất của Claude |
|---|---|---|
| QC-Q1 | Thoát giữa màn (Trang chủ / Chơi lại từ popup tạm dừng) có tính là 1 lượt không? | **Không** — chỉ tính lượt có kết quả. Nếu tính, người chơi chơi lại liên tục ở màn khó sẽ gặp quảng cáo rất dày |
| QC-Q2 | Có miễn quảng cáo cho người mới không? | Có — miễn **10 lượt đầu tiên** sau khi cài game, để người mới làm quen Chương 1 |
| QC-Q3 | Có gói **Bỏ quảng cáo** (mua một lần) không? | Có — món người chơi sẵn sàng trả tiền nhiều nhất, không ảnh hưởng cân bằng |
| QC-Q4 | Màn thưởng kim cương có tính là lượt không? | Không |

Kéo theo: chính sách quyền riêng tư phải nêu đối tác quảng cáo; iOS hỏi quyền theo dõi (ATT); phát hành ở EU cần màn đồng ý riêng.

## 8A. Giữ tiến trình khi xóa game và cài lại — không cần tài khoản riêng của game

### Vì sao mất dữ liệu
Game offline lưu dữ liệu trong bộ nhớ của ứng dụng; **xóa game là xóa luôn dữ liệu đó**. Cửa hàng ứng dụng chỉ khôi phục được hàng **không tiêu hao** (gói Bỏ quảng cáo, ngoại hình mua bằng tiền). **Kim cương và vật phẩm Thêm giờ là hàng tiêu hao — cửa hàng không khôi phục.** Vậy cần một nơi cất dữ liệu nằm ngoài máy.

### Các cách không cần tài khoản riêng của game

| Cách | Nền tảng | Người chơi phải làm gì | Khôi phục khi cài lại | Hạn chế |
|---|---|---|---|---|
| **A. Sao lưu tự động của hệ điều hành** (Auto Backup) | Android | Không — mặc định khi máy bật sao lưu Google | Tự khôi phục khi cài lại; lưu trong Google Drive riêng của ứng dụng, tối đa 25 MB, không trừ dung lượng Drive của người chơi | Sao lưu chạy định kỳ (thường khi máy sạc, có Wi-Fi) → **có thể mất phần chơi gần nhất**; chỉ giữ bản mới nhất; người chơi có thể tắt sao lưu |
| **B. iCloud (key-value store / CloudKit)** | iOS | Không — chỉ cần máy đăng nhập Apple ID, bật iCloud | Tự đồng bộ lại khi cài lại và sang máy iOS khác cùng Apple ID | Không sang được Android; người chơi tắt iCloud thì không có |
| **C. Google Play Games — Lưu đám mây** (đăng nhập Play Games bản 2) | Android | Gần như không — bản 2 **tự đăng nhập** khi mở game | Khôi phục ngay, kể cả đổi máy Android | Người chơi từ chối đăng nhập Play Games thì không có. Google yêu cầu: người chơi đã đăng nhập thì tiến trình phải được sao lưu và khôi phục |
| **D. Mã chuyển dữ liệu** (game cấp mã để người chơi tự ghi lại) | Cả hai | Tự ghi mã, nhập lại khi cài | Có, kể cả đổi iOS ⇄ Android | **Cần máy chủ** cất dữ liệu → không còn hoàn toàn offline |

### Các game trên thị trường làm thế nào
- **Game giải đố casual lớn** (Royal Match, Homescapes…): tiến trình gắn với tài khoản Facebook, Apple hoặc Google Play Games mà người chơi **liên kết tùy chọn** — không bắt tạo tài khoản riêng của game. Không liên kết thì chỉ có bản trên máy; trang hỗ trợ khuyên người chơi chụp lại **mã người chơi** để nhờ khôi phục thủ công.
- **Game offline / trả tiền một lần**: dựa vào iCloud (iOS) và Google Play Games / sao lưu hệ thống (Android), không có tài khoản riêng.

### Đề xuất cho game này — vẫn offline, không bắt tạo tài khoản

| # | Nội dung |
|---|---|
| SL-01 | **Android:** bật Auto Backup (lưới an toàn, không cần làm gì) **và** Lưu đám mây Google Play Games (lưu ngay sau mỗi màn). |
| SL-02 | **iOS:** iCloud key-value store — dữ liệu game nhỏ (ví, ngoại hình, tiến độ, cài đặt, vài KB), đồng bộ tự động. |
| SL-03 | **Hàng mua bằng tiền:** hàng không tiêu hao (Bỏ quảng cáo, ngoại hình) khôi phục qua "Khôi phục mua hàng" trong Cài đặt; kim cương đi theo bản lưu đám mây SL-01, SL-02. |
| SL-04 | **Khi cài lại có cả bản trên máy và bản đám mây khác nhau → hỏi người chơi chọn bản nào**, hiện tóm tắt mỗi bản (sao, kim cương, ngày lưu). Không tự ghi đè (Google khuyến nghị). |
| SL-05 | Cài đặt → "Dữ liệu & mua hàng" hiện **trạng thái sao lưu** (đã lưu lúc nào, đang tắt) để người chơi biết. |
| SL-06 | Chính sách ghi rõ: tắt sao lưu / không đăng nhập Google Play Games / tắt iCloud thì xóa game sẽ mất dữ liệu. |
| SL-07 | Chưa làm được: chuyển dữ liệu **giữa iOS và Android** — cần máy chủ (để sau). |

Nguồn tham khảo: [Android — Auto Backup](https://developer.android.com/identity/data/autobackup) · [Play Games — đăng nhập bản 2](https://d.android.com/games/pgs/signin) · [Play Games — Lưu đám mây](https://developer.android.com/games/pgs/savedgames) · [Play Games — yêu cầu tính liên tục](https://developer.android.com/games/playgames/continuity-requirements) · [Diễn đàn Apple — giữ dữ liệu sau khi xóa ứng dụng](https://developer.apple.com/forums/thread/730924) · [Diễn đàn Apple — khôi phục mua hàng tiêu hao](https://developer.apple.com/forums/thread/121296) · [Hỗ trợ game casual — lưu tiến trình](https://support.awem.com/hc/en-gb/articles/115002189485)

## 8B. Liên kết tài khoản ngay lần đầu (GD-07)

| # | Quy tắc | Nguồn |
|---|---|---|
| TK-01 | Lần đầu mở game, sau bước Đồng ý: màn **"Lưu tiến trình của bạn"** — nút chính **Liên kết** (Android: Google Play Games; iOS: Game Center, dữ liệu lưu qua iCloud), nút phụ **"Để sau"**. | [XN] GD-07 / [SL] |
| TK-02 | **Không ép liên kết.** Quy định duyệt app của Apple không cho bắt đăng nhập khi app không cần tài khoản để chạy; Google Play Games bản 2 vốn tự đăng nhập, người chơi có quyền từ chối. Chọn "Để sau" vẫn chơi được, dữ liệu chỉ lưu trên máy (+ sao lưu tự động của Android). | [SL] chính sách cửa hàng |
| TK-03 | Chưa liên kết → nhắc lại nhẹ ở 3 thời điểm: sau khi thắng màn 3, **ngay sau khi mua hàng bằng tiền**, và trong Cài đặt (dòng "Chưa liên kết — dữ liệu có thể mất khi xóa game"). Không nhắc mỗi lần mở game. | [GĐ] |
| TK-04 | **Chỉ dùng tài khoản của nền tảng** (Google Play Games, Game Center). Không thêm đăng nhập Google/Facebook trên iOS — nếu có, Apple bắt buộc thêm "Đăng nhập bằng Apple". | [SL] |
| TK-05 | Đã liên kết: mã người chơi (Player ID của nền tảng) dùng làm khóa của bản lưu đám mây; cài lại hoặc đổi máy cùng nền tảng → tự nhận ra, hỏi chọn bản lưu nếu khác nhau (SL-04). | [SL] |
| TK-06 | Trẻ dưới 13 tuổi dùng tài khoản do cha mẹ quản lý (Family Link, Chia sẻ trong gia đình) — một số tính năng của nền tảng có thể bị hạn chế; game vẫn chơi được với "Để sau". | [SL] |

## 8C. Hệ quả của độ tuổi tối thiểu 10 (GD-08)

| # | Nội dung | Cần làm |
|---|---|---|
| T1 | Khác quyết định **D-40** (12+) | Sửa D-40 trong Mô tả yêu cầu khi đưa phần này vào |
| T2 | Đối tượng gồm trẻ **dưới 13 tuổi** → Google Play coi là app có đối tượng trẻ em (chính sách Gia đình): chỉ dùng **mạng quảng cáo được chứng nhận cho trẻ em**, quảng cáo phải phù hợp lứa tuổi, không quảng cáo cá nhân hóa cho trẻ em | Chọn mạng quảng cáo phù hợp (mục 3 của BA "phân tích sau") |
| T3 | Luật Mỹ COPPA (nếu phát hành ở Mỹ), GDPR (EU, dưới 13–16 tuổi tùy nước) | Bản nháp chính sách đã viết theo hướng an toàn: **quảng cáo không cá nhân hóa** cho người chơi dưới 13 |
| T4 | Câu hỏi: hỏi tuổi người chơi lần đầu (chọn năm sinh) để bật quảng cáo cá nhân hóa cho người lớn, **hay dùng quảng cáo không cá nhân hóa cho tất cả**? | **PL-Q1** — đề xuất: không cá nhân hóa cho tất cả (đơn giản, an toàn; doanh thu quảng cáo thấp hơn) |
| T5 | Mua hàng của người chưa thành niên cần cha mẹ đồng ý; cửa hàng có công cụ kiểm soát | Đã đưa vào chính sách mua hàng |

## 8. Điểm danh khi offline — chính sách chống chỉnh giờ máy

Không có máy chủ thì **không chặn tuyệt đối** được. Hướng xử lý là kết hợp để gian lận **khó và không đáng**:

| # | Biện pháp | Cách làm | Hiệu quả |
|---|---|---|---|
| C1 | **Nhận theo lượt, không theo lịch** | Mỗi lần sang ngày mới (theo giờ máy) được mở **ô kế tiếp**; bỏ lỡ ngày **không mất chuỗi** | Không ai cần chỉnh giờ để "cứu chuỗi" — bỏ đi động cơ phổ biến nhất |
| C2 | **Chặn lùi giờ** | Lưu mốc thời gian lớn nhất từng thấy; giờ máy nhỏ hơn mốc → khóa điểm danh và nhiệm vụ ngày tới khi giờ vượt mốc | Chặn kiểu "tua tới nhận rồi lùi lại" |
| C3 | **Một lần nhận mỗi ngày thực** | Giữa 2 lần nhận phải có ≥ 20 giờ **thời gian máy đang chạy** (bộ đếm hệ thống, không bị đổi khi chỉnh giờ); máy khởi động lại thì dựa vào C2 | Tua giờ nhanh không nhận dồn liên tiếp được |
| C4 | **Đối chiếu giờ mạng khi có mạng** | Khi có mạng (thường có, vì quảng cáo cần mạng) lấy giờ chuẩn từ một dịch vụ giờ công khai; lệch nhiều → bỏ lượt nhận vừa rồi | Không cần máy chủ riêng; bắt được phần lớn trường hợp |
| C5 | **Phần thưởng vừa phải** | Ô ngày là kim cương nhỏ, vật phẩm; quà lớn (ngoại hình) chỉ ở ngày 7; **không có ngoại hình độc quyền chỉ lấy qua điểm danh** | Gian lận được cũng chỉ lợi ít — không ảnh hưởng người khác vì game offline, không bảng xếp hạng |

**Đề xuất:** dùng C1 + C2 + C5 ngay (đơn giản, chạy hoàn toàn offline); thêm C3, C4 nếu thấy gian lận nhiều. Nhiệm vụ hằng ngày dùng chung cơ chế.

## 9. Những phần cần làm thêm ngoài màn hình

| # | Nội dung | Ghi chú |
|---|---|---|
| K1 | Bảng ngôn ngữ, bộ chuyển ngôn ngữ | Nên làm sớm nhất — càng nhiều chữ càng tốn công tách |
| K2 | Lưu dữ liệu tập trung (ví, ngoại hình, điểm danh, nhiệm vụ, cài đặt, bộ đếm quảng cáo), có phiên bản dữ liệu để cập nhật game không mất tiến trình | Demo hiện lưu rải rác nhiều khóa; cần gom lại thì mới sao lưu đám mây được (mục 8A) |
| K3 | Tích hợp quảng cáo, thanh toán, sao lưu đám mây (demo: mô phỏng) | |
| K4 | Thống kê hành vi, báo lỗi | Cần nêu trong chính sách quyền riêng tư |
| K5 | Văn bản pháp lý | Mục 11 |

## 10. Câu hỏi cần BA chốt

| ID | Câu hỏi | Đề xuất của Claude |
|---|---|---|
| GD-Q1 | Bố cục Trang chủ theo bản vẽ ④ có ổn không? | Có — nút CHƠI to ở giữa, việc hằng ngày bên trái, sưu tập bên phải |
| GD-Q2 | Màn hình nào làm ở đợt 1? | Đợt 1: Khởi động, Ngôn ngữ, Đồng ý, **Trang chủ**, **Cài đặt**, trang chính sách, quảng cáo sau 5 lượt. Đợt 2: Garage, Điểm danh, Nhiệm vụ & Thành tựu, Hồ sơ & Hộp thư, Cửa hàng mở rộng |
| GD-Q3 | ~~Quy tắc quảng cáo~~ | ✅ Đã chốt: sau mỗi 5 lượt, không đổi thưởng (GD-06). Còn QC-Q1 → Q4 (mục 7) |
| GD-Q6 | Chính sách điểm danh (mục 8) | C1 + C2 + C5 |
| GD-Q7 | Quà 7 ngày, nội dung nhiệm vụ ngày, danh sách thành tựu | Claude soạn bản đầu theo kinh tế hiện có (5 💎/màn, Thêm giờ 20 💎) để BA duyệt |
| GD-Q8 | Hình đại diện, tên người chơi: có cho đổi tên không? | Có, chỉ lưu trên máy (bản offline) |
| GD-Q9 | Giữ tiến trình khi cài lại (mục 8A) | SL-01 → SL-06: Android dùng Auto Backup + Lưu đám mây Play Games; iOS dùng iCloud; hỏi người chơi khi có 2 bản lưu |
| GD-Q10 | Soạn văn bản pháp lý (mục 11) | Claude soạn bản nháp Việt + Anh khi BA cung cấp thông tin mục 11.2 |

## 11. Văn bản pháp lý

### 11.1. Bộ văn bản cần có

| # | Văn bản | Vì sao cần |
|---|---|---|
| PL-1 | Điều khoản sử dụng | Quyền và nghĩa vụ; tài sản ảo (kim cương không quy đổi ra tiền, không chuyển nhượng); hành vi bị cấm (gian lận, chỉnh sửa dữ liệu); giới hạn trách nhiệm; luật áp dụng, giải quyết tranh chấp |
| PL-2 | Chính sách quyền riêng tư | App Store và Google Play bắt buộc. Nêu dữ liệu thu thập (mã quảng cáo, thống kê, báo lỗi, bản sao lưu qua iCloud / Google), đối tác quảng cáo, quyền của người chơi (xem, xóa dữ liệu), lưu giữ bao lâu |
| PL-3 | Chính sách mua hàng & hoàn tiền | Hàng tiêu hao / không tiêu hao; hoàn tiền theo quy trình của Apple / Google; mất dữ liệu khi tắt sao lưu (SL-06) |
| PL-4 | Thông báo quảng cáo & lựa chọn của người chơi | Tần suất (mỗi 5 lượt), quyền theo dõi quảng cáo (ATT trên iOS), đồng ý theo vùng |
| PL-5 | Độ tuổi & người chưa thành niên | Đối tượng 12+ (D-40); mua hàng của người chưa thành niên cần cha mẹ đồng ý; công cụ kiểm soát của cha mẹ trên cửa hàng |
| PL-6 | Thông tin nhà phát hành, liên hệ hỗ trợ | Cửa hàng ứng dụng yêu cầu |
| PL-7 | Giấy phép mã nguồn mở, ghi công tài nguyên | Thư viện, phông chữ (vd Nunito — giấy phép SIL OFL) |
| PL-8 | Tuân thủ quy định Việt Nam về trò chơi điện tử có thanh toán | Cần luật sư xác định giấy phép, phân loại độ tuổi, cảnh báo sức khỏe |

### 11.2. Thông tin BA cần cung cấp để soạn

1. Tên pháp nhân hoặc cá nhân phát hành, địa chỉ, email hỗ trợ.
2. Thị trường phát hành (chỉ Việt Nam hay toàn cầu — ảnh hưởng tới quy định EU, Mỹ…).
3. Mạng quảng cáo, công cụ thống kê, công cụ báo lỗi dự kiến dùng.
4. Có thu thập dữ liệu nào khác không (vd email khi người chơi gửi phản hồi).
5. Độ tuổi tối thiểu chính thức.
6. Ngày có hiệu lực.

> Claude soạn được bản nháp đầy đủ bằng tiếng Việt và tiếng Anh, nhưng **không thay được luật sư** — bản cuối cần người có chuyên môn pháp lý tại thị trường phát hành rà soát trước khi đăng.
