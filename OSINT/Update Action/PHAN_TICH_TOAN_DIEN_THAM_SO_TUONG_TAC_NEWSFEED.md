# TÀI LIỆU PHÂN TÍCH TOÀN DIỆN CÁC THAM SỐ & TÌNH HUỐNG CẤU HÌNH TƯƠNG TÁC NEWSFEED (OSINT V2)

---

| **Thuộc tính** | **Giá trị** |
|---|---|
| **Dự án** | Hệ thống Quản trị & Tác chiến Nuôi Tài khoản ảo OSINT |
| **Mô-đun** | Cấu hình Hành động Kịch bản (Script Actions) — Hành động `interact_newsfeed` |
| **Mục tiêu** | Bảng phân tích toàn diện, bao quát 100% các tình huống tương tác thực tế và tương lai, chuẩn hóa tham số phục vụ thiết kế giao diện & AI Prompt Engine |
| **Trạng thái** | Tài liệu Phân tích Nghiệp vụ & Kỹ thuật Chi tiết |

---

## 1. TỔNG QUAN HỆ THỐNG & TRIẾT LÝ PHÂN RÃ HÀNH ĐỘNG

Khi một tài khoản ảo (avatar/clone) lướt Newsfeed trên mạng xã hội (Facebook, TikTok, X/Twitter...), không gian tương tác được chia thành **2 cấp độ thực thể độc lập**:
1. **Cấp độ 1 — Bài viết (`target: post`)**: Toàn bộ bài đăng đang hiển thị (gồm văn bản, hình ảnh/video, tác giả, số lượt like/share hiện có).
2. **Cấp độ 2 — Bình luận nguồn (`target: source_comment`)**: Các bình luận của cộng đồng người dùng mạng xã hội đã tồn tại bên dưới bài viết đó.

Mỗi hành động của nick ảo đều phải tuân thủ chặt chẽ **Mô hình Ma trận 3 Lớp (3-Layer Action Matrix)**:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ LỚP 1: BỘ LỌC ĐIỀU KIỆN KÍCH HOẠT (Condition Matching Filter)                    │
│ "Khi nào thì làm?" → Lọc theo Chủ đề, Thực thể, Sắc thái, Lập trường, Tác giả... │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ LỚP 2: KIỂM SOÁT THỰC THI & TỶ LỆ (Execution Controls & Probability)             │
│ "Làm bao nhiêu & Xác suất thế nào?" → Tỷ lệ %, Quota số lượng, Delay an toàn    │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ LỚP 3: HÀNH VI & NỘI DUNG CHI TIẾT (Behavior & Content Delivery)                 │
│ "Làm cụ thể điều gì?" → Loại cảm xúc, List thủ công / AI Prompting thông minh... │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. CẤU HÌNH CHUNG TOÀN HÀNH ĐỘNG: TÙY CHỌN GIỚI HẠN TƯƠNG TÁC (GLOBAL INTERACTION LIMITS)

Trước khi đi sâu vào từng quy tắc hay hành vi tương tác cụ thể, hệ thống cung cấp một **khối thiết lập giới hạn chung (Global Interaction Limits)** áp dụng cho **toàn bộ tiến trình lướt Newsfeed** của tài khoản ảo trong phiên chạy đó. 

Khối này đóng vai trò là **Điều kiện dừng phiên (Session Exit Criteria)**, bảo đảm tài khoản không tương tác quá đà, mô phỏng thói quen lướt mạng xã hội tự nhiên của con người và bảo vệ tài khoản khỏi thuật toán truy quét bất thường (Anti-Spam / Behavioral Anomaly Detection) của các nền tảng mạng xã hội.

### 2.1 Bảng phân tích chi tiết Tham số Giới hạn Chung:

| Tên tham số (Code & UI) | Nhóm tham số | Kiểu dữ liệu & Giá trị | Ý nghĩa & Mục đích nghiệp vụ | Tình huống phát sinh & Ứng biến thực tế | Ràng buộc logic & Quy tắc vận hành |
|---|---|---|---|---|---|
| `interactionLimitMode` (Tùy chọn giới hạn tương tác) | Cấu hình chung phiên | `Enum`: <br>1. `post_quantity` (Giới hạn số bài viết tương tác)<br>2. `time_duration` (Giới hạn thời gian tương tác) | Xác định cơ chế mà tài khoản ảo dùng để kết thúc phiên lướt Newsfeed: Dừng theo **Số lượng bài đã tương tác** hay Dừng theo **Thời gian lướt**. | Người dùng lựa chọn theo mục tiêu chiến dịch:<br>- *Cày chỉ tiêu tương tác:* Chọn `post_quantity`.<br>- *Mô phỏng lướt dạo rảnh rỗi:* Chọn `time_duration`. | Bắt buộc chọn 1 trong 2 giá trị độc quyền (Radio button, mutually exclusive). Mặc định: `post_quantity`. |
| `postLimitRange` (Số lượng bài viết tương tác) | Cấu hình chung phiên | `Object`: `{ from: Integer, to: Integer }`<br>*(Đơn vị: bài viết)* | Khoảng số lượng bài viết tối thiểu (`from`) và tối đa (`to`) mà tài khoản ảo sẽ thực hiện tương tác trong suốt phiên lướt. | Khi bắt đầu chạy, bot sẽ **bốc ngẫu nhiên một con số mục tiêu $N \in [from, to]$** (ví dụ: chọn dải từ 5 đến 10 bài $\to$ bot bốc ngẫu nhiên mục tiêu 7 bài). Đúng khi tương tác đủ 7 bài thì phiên dừng.<br>$\to$ Tránh việc 100 tài khoản ảo cùng tương tác đúng một số lượng bài giống hệt nhau. | - Bắt buộc nhập khi chọn `interactionLimitMode = 'post_quantity'`.<br>- Ràng buộc: $from \ge 1$ và $to \ge from$.<br>- **Chỉ tính bài có phát sinh tương tác:** Chỉ những bài viết có hành động cụ thể (thả cảm xúc, bình luận, chia sẻ) mới làm tăng bộ đếm bài tương tác. |
| `timeLimitRange` (Thời gian tương tác) | Cấu hình chung phiên | `Object`: `{ from: Integer, to: Integer }`<br>*(Đơn vị: giây)* | Khoảng thời gian tối thiểu (`from`) và tối đa (`to`) tính bằng giây mà tài khoản ảo được phép duy trì phiên lướt Newsfeed. | Khi bắt đầu chạy, bot sẽ **bốc ngẫu nhiên thời lượng phiên $T \in [from, to]$ giây** (ví dụ: cấu hình từ 120s đến 300s $\to$ bot bốc thời gian phiên là 215s).<br>- Bot tự do lướt, đọc bài, thả cảm xúc, bình luận.<br>- **Khi chạm mốc $T$ giây:** Bot hoàn tất thao tác dở dang trên bài hiện tại (nếu đang gõ phím) rồi kết thúc phiên an toàn, bất kể đã tương tác được bao nhiêu bài.<br>$\to$ Mô phỏng chính xác thói quen người dùng chỉ vào mạng xã hội trong một khoảng thời gian rảnh cố định. | - Bắt buộc nhập khi chọn `interactionLimitMode = 'time_duration'`.<br>- Ràng buộc: $from \ge 10$ giây và $to \ge from$.<br>- Đảm bảo kịch bản tổng thể không bao giờ bị treo vô tận nếu đường truyền mạng lag hoặc bảng tin ít bài mới. |

### 2.2 Sơ đồ Luồng Kiểm Soát Giới Hạn Chung Khi Thực Thi (Execution Flow):

```
                                  [Bắt đầu hành động Lướt Newsfeed]
                                                  │
                   ┌──────────────────────────────┴──────────────────────────────┐
                   ▼                                                             ▼
     [Chế độ: Giới hạn số bài viết]                               [Chế độ: Giới hạn thời gian]
  Bốc ngẫu nhiên N bài mục tiêu ∈ [from, to]                   Bốc ngẫu nhiên T giây mục tiêu ∈ [from, to]
                   │                                                             │
                   │                                                 Khởi động đồng hồ đếm ngược
                   │                                                             │
                   ▼                                                             ▼
         ┌──────────────────┐                                          ┌──────────────────┐
   ┌────►│ Cuộn đến bài mới │                                    ┌────►│ Cuộn đến bài mới │
   │     └────────┬─────────┘                                    │     └────────┬─────────┘
   │              ▼                                              │              ▼
   │     [Kiểm tra & Tương tác]                                  │     [Kiểm tra & Tương tác]
   │              ▼                                              │              ▼
   │     Có tương tác bài này?                                   │     Thời gian trôi qua >= T giây?
   │     ├─ Không ──► Lướt tiếp ──────────┐                      │     ├─ Chưa ───► Lướt tiếp ─────────┐
   │     └─ Có    ──► Đếm bài: Count++    │                      │     └─ Hết giờ ─────────────────────┼──┐
   │                  │                   │                      │                                     │  │
   │                  ▼                   │                      │                                     │  │
   │            Count >= N bài?           │                      │                                     │  │
   │            ├─ Chưa ──────────────────┘                      │                                     │  │
   │            └─ Đã đủ                                         └─────────────────────────────────────┘  │
   │                  │                                                                                   │
   │                  ▼                                                                                   ▼
   └──────────────────┴───────────────────────► [ DỪNG PHIÊN & GHI LOG HOÀN THÀNH ] ◄────────────────────┘
```

> [!IMPORTANT]
> **Điểm phân biệt cốt lõi:**
> - **Giới hạn tương tác chung (`interactionLimitMode`)**: Áp dụng cho **toàn bộ phiên lướt Newsfeed** của tài khoản ảo (Global Scope) để quyết định khi nào đóng trình duyệt/rút khỏi Newsfeed.
> - **Độ trễ từng bài (`delayBeforeAction`)**: Chỉ áp dụng cho **1 bài viết cụ thể** để mô phỏng hành vi dừng mắt đọc bài trước khi click.
> - **Hạn mức từng hành động con (`commentQuotaPerSession`, `maxReactionsPerPost`)**: Chỉ giới hạn số lượng comment/reply của riêng hành động đó trong phiên, độc lập với tổng số bài viết được lướt qua.

---

## 3. DANH MỤC 8 HÀNH ĐỘNG TƯƠNG TÁC NEWSFEED CẦN QUẢN LÝ

| STT | Mã hành động | Tên hành động | Đối tượng (`target`) | Bản chất nghiệp vụ |
|:---:|---|---|:---:|---|
| **1** | `reaction_post` | **Bày tỏ cảm xúc bài viết** | `post` | Thả Like, Love, Care, Haha, Wow, Sad, Angry lên bài viết. |
| **2** | `view_full_content` | **Xem đầy đủ nội dung bài viết** | `post` | Nhấn nút "Xem thêm" (See more) để đọc hết bài viết dài, mô phỏng hành vi đọc thật. |
| **3** | `share_post` | **Chia sẻ bài viết** | `post` | Chia sẻ bài viết về Tường cá nhân, vào Nhóm (Groups), hoặc qua Tin nhắn riêng. |
| **4** | `comment_text_post` | **Bình luận văn bản trên bài viết** | `post` | Nick ảo tạo một **bình luận mới toanh** trực tiếp trên bài viết (Manual list hoặc AI prompt). |
| **5** | `comment_image_post` | **Bình luận ảnh trên bài viết** | `post` | Nick ảo bình luận bằng hình ảnh (meme, infographic, ảnh dẫn chứng). |
| **6** | `reaction_comment` | **Bày tỏ cảm xúc trên bình luận** | `source_comment` | Thả cảm xúc lên các bình luận đã có sẵn bên dưới bài viết. |
| **7** | `reply_comment` | **Trả lời bình luận (Reply)** | `source_comment` | Nick ảo phản hồi trực tiếp vào một bình luận cụ thể (khen, chê, tranh luận, phản bác). |
| **8** | `report_comment` | **Báo cáo bình luận vi phạm** | `source_comment` | Mass-report các bình luận thù địch, chống phá, vi phạm tiêu chuẩn cộng đồng để xóa bỏ. |

---

## 4. BẢNG PHÂN TÍCH CHI TIẾT CÁC THAM SỐ CỦA TỪNG HÀNH ĐỘNG

Dưới đây là bảng phân tích chuyên sâu cho từng hành động, làm rõ: **Tham số**, **Phân nhóm**, **Kiểu dữ liệu**, **Ý nghĩa nghiệp vụ**, **Cách ứng biến khi có tình huống phát sinh**, và **Ràng buộc logic**.

---

### HÀNH ĐỘNG 1: BÀY TỎ CẢM XÚC BÀI VIẾT (`reaction_post`)

Hành động thả cảm xúc lên bài viết để thể hiện thái độ của tài khoản ảo đối với nội dung bài đăng.

| Tên tham số (Code & UI) | Nhóm tham số | Kiểu dữ liệu & Giá trị | Ý nghĩa & Mục đích nghiệp vụ | Tình huống phát sinh & Ứng biến thực tế | Ràng buộc logic |
|---|---|---|---|---|---|
| `categories` (Chủ đề bài viết) | Điều kiện kích hoạt | `Array<String>`: `politics`, `sports`, `law`, `economy`, `entertainment`, `lifestyle`, `all` | Xác định bài viết thuộc nhóm chủ đề nào mới thực hiện thả cảm xúc. | Nếu bài viết đa chủ đề (ví dụ: Vụ án kinh tế vừa là `law` vừa là `economy`), hệ thống hỗ trợ match nhiều tag. | Bắt buộc chọn ít nhất 1 chủ đề (hoặc chọn `all`). |
| `targetEntities` (Thực thể đối tượng) | Điều kiện kích hoạt | `Array<String>`: Tùy biến (VD: `party`, `state`, `general_secretary`, `police`, `ronaldo`, `brand_x`...) | Lọc bài viết có nhắc đến các đối tượng cụ thể mà kịch bản đang nhắm tới. | Bài viết thuộc chủ đề Chính trị nhưng chỉ nói chung chung, không nhắc tới đối tượng mục tiêu $\to$ Bỏ qua không tương tác. | Không bắt buộc; nếu rỗng $\to$ áp dụng cho mọi bài thuộc chủ đề. |
| `sentiments` (Sắc thái bài viết) | Điều kiện kích hoạt | `Array<String>`: `positive`, `negative`, `neutral`, `any` | Phân loại thái độ của bài viết (Khen ngợi/tích cực vs Chê bai/tiêu cực). | **Tình huống thực tế:** Cùng chủ đề Chính trị, bài khen ngợi thì Like, bài công kích thì Phẫn nộ. | Liên kết trực tiếp với việc chọn loại cảm xúc. |
| `stances` (Lập trường bài viết) | Điều kiện kích hoạt | `Array<String>`: `supportive`, `attacks_or_defames`, `skeptical`, `neutral` | Đánh giá quan điểm chính trị/xã hội của bài viết (Ủng hộ chính quyền vs Bôi nhọ, xuyên tạc). | Phát hiện các bài viết bôi nhọ để thả cảm xúc phản đối. | Bổ trợ cho `sentiments`. |
| `authorType` (Loại tác giả bài viết) | Điều kiện kích hoạt | `Enum`: `any`, `verified_page` (tích xanh), `public_group`, `friend`, `stranger` | Chỉ tương tác nếu bài viết được đăng bởi đúng loại đối tượng (tránh tương tác nhầm trang rác). | Tránh thả cảm xúc vào bài viết của các đối tượng phản động cộm cán nếu kịch bản yêu cầu "ẩn mình". | Mặc định là `any`. |
| `selectionMode` (Cơ chế chọn bài) | Kiểm soát thực thi | `Enum`: `all`, `quota`, `percentage` | Quyết định số lượng bài viết thỏa mãn điều kiện sẽ được thả cảm xúc. | Nếu gặp 10 bài thỏa mãn, kịch bản có thể chọn thả cảm xúc 100% hoặc chỉ chọn ngẫu nhiên 3–5 bài để tránh bị quét bot. | Nếu là `quota` thì cần `from/to`; nếu là `percentage` thì cần `%`. |
| `selectionQuota` (Hạn mức số bài) | Kiểm soát thực thi | `Object`: `{ from: Integer, to: Integer }` | Số lượng bài tối thiểu và tối đa được thả cảm xúc trong một phiên chạy. | Giới hạn trần để tài khoản không tương tác quá đà trong một khoảng thời gian ngắn. | Chỉ có hiệu lực khi `selectionMode = quota`. |
| `selectionPercent` (Tỷ lệ thực hiện) | Kiểm soát thực thi | `Integer`: `1 - 100` (%) | Xác suất thực hiện hành động trên các bài viết thỏa mãn. | Giả lập tính ngẫu nhiên của con người (người thật không bao giờ like 100% bài nhìn thấy). | Chỉ có hiệu lực khi `selectionMode = percentage`. |
| `reactionTypeMode` (Chế độ chọn cảm xúc) | Hành vi thực thi | `Enum`: `fixed` (cố định), `random_from` (ngẫu nhiên trong nhóm), `dynamic_ai` (AI tự chọn) | Cách thức quyết định loại icon cảm xúc. | **Tình huống:** Yêu cầu "Like hoặc Tim ngẫu nhiên" $\to$ Dùng `random_from`. | Bắt buộc chọn. |
| `reactionTypes` (Danh sách cảm xúc) | Hành vi thực thi | `Array<Enum>`: `like`, `love`, `care`, `haha`, `wow`, `sad`, `angry` | Danh sách các icon cảm xúc được phép sử dụng. | Tránh trường hợp chọn `random` toàn bộ dẫn đến việc bài buồn tang tóc lại đi thả icon `haha`. | Phải chọn ít nhất 1 cảm xúc. |
| `delayBeforeAction` (Độ trễ trước khi bấm) | Kiểm soát thực thi | `Object`: `{ from: Integer, to: Integer }` (giây) | Thời gian nick ảo dừng lại trên bài viết trước khi bấm thả tim/like. | Mô phỏng người thật dừng lại đọc bài 3s - 8s rồi mới like. Né thuật toán kiểm tra click-rate của Facebook. | `from <= to`. |

---

### HÀNH ĐỘNG 2: XEM ĐẦY ĐỦ NỘI DUNG BÀI VIẾT (`view_full_content`)

Hành động bấm vào chữ "Xem thêm" (See more) để mở rộng toàn bộ bài viết dài.

| Tên tham số (Code & UI) | Nhóm tham số | Kiểu dữ liệu & Giá trị | Ý nghĩa & Mục đích nghiệp vụ | Tình huống phát sinh & Ứng biến thực tế | Ràng buộc logic |
|---|---|---|---|---|---|
| `triggerCondition` (Điều kiện kích hoạt) | Điều kiện kích hoạt | `Enum`: `has_see_more` (khi có nút Xem thêm), `min_text_length` (khi bài dài > N ký tự) | Chỉ thực hiện khi bài viết thực sự có nội dung bị ẩn. | Tránh việc bot cố gắng tìm và click vào phần tử không tồn tại gây lỗi kịch bản (NoSuchElement). | Tự động kiểm tra DOM bài viết trước khi click. |
| `selectionPercent` (Tỷ lệ bấm Xem thêm) | Kiểm soát thực thi | `Integer`: `1 - 100` (%) | Xác suất bấm xem thêm trên các bài viết dài. | Người dùng thật chỉ bấm xem thêm ở khoảng 60% - 80% bài viết gây hứng thú. | Giá trị mặc định đề xuất: 70%. |
| `readingDurationAfterExpand` (Thời gian đọc sau khi mở) | Kiểm soát thực thi | `Object`: `{ from: Integer, to: Integer }` (giây) | Thời gian nick ảo tiếp tục dừng lại ở bài viết sau khi đã nhấn Xem thêm. | Bấm xem thêm mà lướt qua ngay trong 1s là hành vi bot 100%. Cần dừng lại 5s - 15s để cuộn nhẹ mô phỏng việc đọc. | Tính vào tổng thời gian dừng của bài viết. |

---

### HÀNH ĐỘNG 3: CHIA SẺ BÀI VIẾT (`share_post`)

Hành động lan truyền bài viết nhằm khuếch đại thông tin hoặc kéo tương tác về trang cá nhân.

| Tên tham số (Code & UI) | Nhóm tham số | Kiểu dữ liệu & Giá trị | Ý nghĩa & Mục đích nghiệp vụ | Tình huống phát sinh & Ứng biến thực tế | Ràng buộc logic |
|---|---|---|---|---|---|
| `categories` & `targetEntities` | Điều kiện kích hoạt | Tương tự hành động 1 | Chỉ chia sẻ những bài viết thuộc đúng chủ đề và nhân vật mục tiêu. | Tránh chia sẻ bài viết lạc đề hoặc các bài viết rác lên tường nick clone. | Đồng bộ với taxonomy hệ thống. |
| `minPostReactions` (Độ hot tối thiểu) | Điều kiện kích hoạt | `Integer`: `0 - 10000` | Bài viết phải có ít nhất N lượt tương tác mới chia sẻ. | Chỉ khuếch đại các bài viết đã có độ tin cậy và tương tác cao từ trước. | Tránh chia sẻ bài viết chết/spam. |
| `destinations` (Nơi chia sẻ) | Hành vi thực thi | `Object`: `{ wall: Boolean, groups: Array<String>, message: Boolean }` | Vị trí đăng bài chia sẻ: Lên tường cá nhân, chia sẻ vào các Group cụ thể, hoặc gửi cho bạn bè. | **Tình huống tác chiến:** Chia sẻ bài viết tích cực vào các Group cộng đồng địa phương để định hướng dư luận. | Phải chọn ít nhất 1 đích đến. |
| `shareMode` (Hình thức chia sẻ) | Hành vi thực thi | `Enum`: `share_now` (chia sẻ ngay không caption), `with_caption` (chia sẻ kèm lời bình) | Chia sẻ trực tiếp hay viết thêm nhận xét của nick. | Chia sẻ kèm lời bình giúp bài đăng trông tự nhiên hơn và tăng trọng số phân phối thuật toán (edge-rank). | Nếu chọn `with_caption` thì bắt buộc cấu hình nguồn nội dung. |
| `captionSource` (Nguồn caption) | Dữ liệu nội dung | `Enum`: `manual_list` (danh sách có sẵn), `ai_generated` (AI sinh tự động) | Nguồn cung cấp câu nhận xét khi chia sẻ. | Linh hoạt giữa việc dùng mẫu cố định hoặc để AI tự do biến tấu văn phong. | Phụ thuộc vào `shareMode`. |
| `manualCaptionList` (List caption thủ công) | Dữ liệu nội dung | `Array<String>` (ngăn cách bởi dấu gạch đứng `\|`) | Tập hợp các câu caption định sẵn kèm Spin-syntax (ví dụ: `{Cực hay\|Quá ý nghĩa} cả nhà ơi!`). | Quản lý kiểm soát được 100% nội dung đăng, không lo AI nói nhảm. | Hỗ trợ xóa sau khi dùng (`cleanupAfterUse`). |
| `aiCaptionPrompt` (Prompt AI viết caption) | Dữ liệu nội dung | `String` (Textarea hướng dẫn AI) | Câu lệnh chỉ đạo AI sinh ra nhận xét ngắn khi chia sẻ bài. | AI đọc bài viết gốc và tự tóm tắt hoặc bày tỏ quan điểm phù hợp với phong cách của nick. | Cần truyền context bài viết gốc vào prompt. |
| `selectionPercent` (Tỷ lệ chia sẻ) | Kiểm soát thực thi | `Integer`: `1 - 100` (%) | Xác suất chia sẻ bài viết thỏa mãn. | Hành động chia sẻ là hành vi có trọng số cao, người thật rất ít khi chia sẻ liên tục $\to$ Tỷ lệ nên để thấp (10% - 30%). | Nếu để quá cao nick sẽ bị checkpoint spam link. |

---

### HÀNH ĐỘNG 4: BÌNH LUẬN VĂN BẢN TRÊN BÀI VIẾT (`comment_text_post`)

Hành động nick ảo **tự tạo một bình luận mới** trực tiếp trên bài viết để dẫn dắt thảo luận hoặc seeding.

| Tên tham số (Code & UI) | Nhóm tham số | Kiểu dữ liệu & Giá trị | Ý nghĩa & Mục đích nghiệp vụ | Tình huống phát sinh & Ứng biến thực tế | Ràng buộc logic |
|---|---|---|---|---|---|
| `categories`, `sentiments`, `stances` | Điều kiện kích hoạt | Tương tự hành động 1 | Xác định loại bài viết nào thì nick mới vào bình luận. | Chỉ bình luận vào các bài viết có sắc thái cụ thể (ví dụ: chỉ bình luận vào bài tích cực để khen ngợi). | Tránh bình luận lạc quẻ. |
| `commentQuotaPerSession` (Số lượng bài comment) | Kiểm soát thực thi | `Object`: `{ from: Integer, to: Integer }` | Số lượng bài viết tối đa được phép comment trong 1 lượt chạy (ví dụ: chỉ comment từ 1 đến 2 bài). | **Tình huống né Anti-Spam:** Dù lướt qua 20 bài nhưng chỉ được phép comment vào tối đa 2 bài để bảo vệ tài khoản. | Rất quan trọng, bắt buộc cấu hình. |
| `contentMode` (Nguồn nội dung) | Dữ liệu nội dung | `Enum`: `manual_list` (danh sách thủ công), `ai_prompt` (AI tự sinh), `hybrid` (kết hợp) | Lựa chọn giữa nhập danh sách câu có sẵn hay để AI tự tạo nội dung dựa trên ngữ cảnh bài viết. | - *Thủ công:* Dùng cho seeding từ khóa cố định.<br>- *AI:* Dùng cho thảo luận tự nhiên không trùng lặp. | Bắt buộc chọn 1 trong 2. |
| `manualTextList` (Danh sách bình luận có sẵn) | Dữ liệu nội dung | `Array<String>` | Tập hợp các câu bình luận do người dùng tự nhập, hỗ trợ Spin-syntax `{A\|B\|C}`. | Khi người dùng muốn nick nói đúng các luận điểm đã được duyệt sẵn từ trước. | Có tùy chọn xóa câu đã sử dụng để nick khác không nói lại câu đó. |
| `manualPickStrategy` (Cách lấy câu thủ công) | Dữ liệu nội dung | `Enum`: `sequential` (tuần tự từ trên xuống), `random` (ngẫu nhiên 1 câu) | Cách chọn câu trong danh sách thủ công. | Tránh việc 10 nick ảo cùng comment ra câu đầu tiên giống hệt nhau. | Chỉ có hiệu lực khi dùng `manual_list`. |
| `cleanupAfterUse` (Xóa nội dung đã dùng) | Kiểm soát thực thi | `Boolean`: `true / false` | Tự động xóa dòng bình luận khỏi danh sách sau khi đã comment thành công. | Đảm bảo tính độc bản: Mỗi câu bình luận chỉ xuất hiện duy nhất 1 lần trên toàn hệ thống mạng xã hội. | Áp dụng cho cả manual list và caption. |
| **BỘ THAM SỐ ĐIỀU HƯỚNG AI PROMPT CHO COMMENT BÀI VIẾT (RẤT QUAN TRỌNG)** | | | | | |
| ↳ `aiPersonaRole` (Vai diễn của Nick ảo) | AI Prompt Parameter | `String`: Ví dụ: *Người dân địa phương, Chuyên gia kinh tế, Cổ động viên nhiệt thành, Cư dân mạng trẻ tuổi...* | Định hình giọng văn, đại từ nhân xưng và góc nhìn của tài khoản ảo khi phát ngôn. | Nick nam 40 tuổi phát ngôn sẽ khác nick nữ sinh viên 20 tuổi. Tránh việc giọng văn bị đồng nhất giữa các nick clone. | Ghép vào System Prompt của LLM. |
| ↳ `aiCommentObjective` (Mục tiêu bình luận) | AI Prompt Parameter | `Enum/String`: `praise_support` (khen ngợi, cổ vũ), `inquire_ask` (hỏi han tò mò), `counter_argue` (phản bác), `supplement_info` (bổ sung thông tin), `neutral_discussion` | Mục đích mà câu bình luận muốn đạt được. | Định hướng AI: Muốn khen để nâng uy tín bài viết hay muốn đặt câu hỏi để kích thích cộng đồng vào tranh luận. | Quyết định hướng lập luận của AI. |
| ↳ `aiToneOfVoice` (Sắc thái giọng văn) | AI Prompt Parameter | `Enum`: `enthusiastic` (hào hứng), `polite_respectful` (lịch sự, trang trọng), `critical` (đanh thép), `casual` (dân dã, đời thường), `humorous` (hài hước) | Tông giọng của câu chữ (văn phong đời thường, dùng từ lóng hay văn phong báo chí chuẩn mực). | Đảm bảo bình luận tự nhiên, hòa nhập với không khí thảo luận trên mạng xã hội. | Tránh văn phong dịch thuật hoặc văn phong AI sáo rỗng. |
| ↳ `aiLengthConstraint` (Độ dài bình luận) | AI Prompt Parameter | `Enum`: `short` (1 câu ngắn, 5-15 từ), `medium` (2-3 câu, 20-40 từ), `long` (đoạn phân tích sâu) | Giới hạn số lượng câu chữ của bình luận. | Người dùng Facebook thường chỉ comment 1-2 câu ngắn; nếu AI cứ viết một bài văn dài 5 đoạn sẽ bị phát hiện là Bot/ChatGPT ngay lập tức. | Rất quan trọng để duy trì độ tin cậy. |
| ↳ `aiNegativeConstraints` (Ràng buộc tiêu cực) | AI Prompt Parameter | `Array<String>`: Ví dụ: *Không dùng từ thô tục, Không nhắc từ ngữ nhạy cảm, Không bắt đầu bằng 'Bài viết rất hay', Không tự xưng là AI...* | Các điều cấm tuyệt đối mà AI không được vi phạm khi viết comment. | Tránh vi phạm Tiêu chuẩn cộng đồng dẫn đến bay nick hoặc bị lộ dấu vết bot. | Đưa vào khối Negative Prompt. |
| `includeSticker` (Kèm sticker ngẫu nhiên) | Hành vi thực thi | `Boolean`: `true / false` | Đôi khi gửi kèm sticker động của Facebook thay vì chỉ có chữ thuần túy. | Tăng tính đa dạng của hành vi người dùng thật. | Xác suất xuất hiện 10% - 20%. |

---

### HÀNH ĐỘNG 5: BÌNH LUẬN ẢNH TRÊN BÀI VIẾT (`comment_image_post`)

Hành động tải ảnh lên phần bình luận của bài viết.

| Tên tham số (Code & UI) | Nhóm tham số | Kiểu dữ liệu & Giá trị | Ý nghĩa & Mục đích nghiệp vụ | Tình huống phát sinh & Ứng biến thực tế | Ràng buộc logic |
|---|---|---|---|---|---|
| `categories` & `targetEntities` | Điều kiện kích hoạt | Tương tự hành động 1 | Chỉ bình luận ảnh vào bài viết phù hợp. | Ví dụ: Bài viết thể thao thì bình luận ảnh chế (meme) bóng đá; bài viết pháp luật thì bình luận ảnh văn bản trích dẫn. | Tránh đăng ảnh sai ngữ cảnh. |
| `imageFolderPath` (Thư mục chứa ảnh) | Dữ liệu nội dung | `String` (Đường dẫn thư mục hợp lệ) | Đường dẫn trên ổ cứng máy chủ chứa kho ảnh cần bình luận. | Kịch bản sẽ quét các file `.jpg`, `.png` trong thư mục này để chọn ảnh tải lên. | Kiểm tra thư mục phải tồn tại và có ảnh. |
| `imagePickStrategy` (Cách chọn ảnh) | Dữ liệu nội dung | `Enum`: `random` (ngẫu nhiên), `sequential` (theo thứ tự tên file) | Thứ tự lấy ảnh từ kho ảnh. | Giúp phân phối đều kho ảnh cho các nick ảo khác nhau. | Mặc định là `random`. |
| `deleteImageAfterUse` (Xóa ảnh sau khi dùng) | Kiểm soát thực thi | `Boolean`: `true / false` | Tự động xóa file ảnh khỏi thư mục sau khi đã bình luận thành công. | Tránh việc 10 nick clone cùng đăng chung 1 bức ảnh meme lên cùng 1 bài viết $\to$ Facebook sẽ quét mã băm (MD5/pHash) của ảnh và chặn spam. | Rất quan trọng trong tác chiến diện rộng. |
| `selectionPercent` (Tỷ lệ thực hiện) | Kiểm soát thực thi | `Integer`: `1 - 100` (%) | Xác suất thực hiện bình luận ảnh trên bài viết thỏa mãn. | Bình luận ảnh thường ít hơn bình luận văn bản. | Đề xuất để ở mức 30% - 50%. |

---

### HÀNH ĐỘNG 6: BÀY TỎ CẢM XÚC TRÊN BÌNH LUẬN NGUỒN (`reaction_comment`)

Hành động thả cảm xúc (Like, Love, Haha, Wow, Sad, Angry) lên các **bình luận đã có sẵn** của người khác bên dưới bài viết.

| Tên tham số (Code & UI) | Nhóm tham số | Kiểu dữ liệu & Giá trị | Ý nghĩa & Mục đích nghiệp vụ | Tình huống phát sinh & Ứng biến thực tế | Ràng buộc logic |
|---|---|---|---|---|---|
| `sourceCommentScanLimit` (Số comment quét) | Kiểm soát thực thi | `Integer`: `5 - 50` comment | Số lượng bình luận nổi bật tối đa mà bot sẽ cào quét từ bài viết để đưa vào bộ phân tích. | **Tình huống:** Bài viết có 5,000 comment, bot không thể quét hết được mà chỉ quét 20 comment đầu để tối ưu hiệu năng và thời gian chạy. | Giới hạn quét, tách biệt với số lượng thả tim. |
| `commentAuthorFilter` (Lọc tác giả comment) | Điều kiện kích hoạt | `Enum`: `any`, `post_author` (chính chủ bài viết), `top_fan`, `verified_user`, `strangers` | Chỉ tương tác với comment của đối tượng mong muốn. | Ví dụ: Thả tim cho comment của chính chủ bài viết để tạo thiện cảm và tăng độ trust. | Mặc định là `any`. |
| `commentEntities` (Thực thể trong comment) | Điều kiện kích hoạt | `Array<String>`: Tùy biến (VD: `state`, `party`, `general_secretary`, `police`...) | Bình luận phải nhắc đến đối tượng nào thì mới thả cảm xúc. | Lọc ra các comment đang nói về vấn đề mà kịch bản quan tâm. | Khớp từ khóa hoặc ngữ nghĩa. |
| `commentSentiment` (Sắc thái comment) | Điều kiện kích hoạt | `Enum`: `positive` (khen), `negative` (chê), `neutral` | Phân loại thái độ của người viết bình luận. | **Yêu cầu thực tế:** Bình luận khen Đảng/Nhà nước $\to$ Thả tim; Bình luận nói xấu $\to$ Thả phẫn nộ. | Quyết định loại reaction tương ứng. |
| `commentStance` (Lập trường comment) | Điều kiện kích hoạt | `Enum`: `supportive`, `attacks_or_defames`, `skeptical` | Đánh giá quan điểm của bình luận đó đối với chủ đề. | Nhận diện chính xác các bình luận có ý đồ bôi nhọ, xuyên tạc để xử lý. | Bổ trợ cho `commentSentiment`. |
| `commentReactionType` (Loại cảm xúc thả) | Hành vi thực thi | `Enum / Array`: `like`, `love`, `care`, `haha`, `wow`, `sad`, `angry`, `random_from` | Icon cảm xúc cụ thể sẽ được thả vào bình luận đó. | - Bình luận khen $\to$ `love` (Thả tim ❤️).<br>- Bình luận chê/nói xấu $\to$ `angry` (Phẫn nộ 😡). | Ánh xạ trực tiếp từ cặp `sentiment + stance`. |
| `maxReactionsPerPost` (Số comment được react tối đa) | Kiểm soát thực thi | `Integer`: `1 - 10` | Hạn mức số lượng comment được thả cảm xúc trên mỗi bài viết. | Tránh việc 1 nick ảo vào thả like/phẫn nộ hàng loạt 50 comment trong 1 phút khiến tài khoản bị khóa tính năng (Action Blocked). | Rất quan trọng để an toàn cho nick. |

---

### HÀNH ĐỘNG 7: TRẢ LỜI BÌNH LUẬN NGUỒN (`reply_comment`)

Hành động nick ảo **nhấn nút Phản hồi (Reply)** vào một bình luận cụ thể của người khác để tranh luận, phản bác hoặc đồng tình.

| Tên tham số (Code & UI) | Nhóm tham số | Kiểu dữ liệu & Giá trị | Ý nghĩa & Mục đích nghiệp vụ | Tình huống phát sinh & Ứng biến thực tế | Ràng buộc logic |
|---|---|---|---|---|---|
| `commentTargetEntities` & `commentStances` | Điều kiện kích hoạt | Tương tự hành động 6 | Chỉ chọn các comment có lập trường và đối tượng cụ thể để reply. | **Tình huống cốt lõi:** Chỉ tìm các comment *bôi nhọ Tổng Bí thư* hoặc *nói xấu Nhà nước* để nhảy vào phản bác. | Tránh reply lung tung vào các comment không liên quan. |
| `maxRepliesPerPost` (Số reply tối đa/bài) | Kiểm soát thực thi | `Integer`: `1 - 3` comment | Giới hạn số lượng bình luận mà 1 nick ảo được phép nhảy vào cãi/reply trên mỗi bài viết. | **Quy tắc vàng chống Bot-War:** Một nick chỉ vào phản bác 1 đến 2 comment tiêu cực nhất rồi rút, không cãi nhau tay đôi dây dưa kéo dài dễ bị lộ bot và bị report ngược. | Bắt buộc cấu hình (Khuyên dùng: 1 hoặc 2). |
| `delayBetweenReplies` (Giãn cách gõ phím) | Kiểm soát thực thi | `Object`: `{ from: Integer, to: Integer }` (giây: 15s - 45s) | Thời gian nick ảo chờ và mô phỏng gõ phím trước khi gửi câu trả lời. | Con người cần thời gian đọc comment của đối phương, suy nghĩ và gõ phím. Delay 20s - 40s giúp vượt qua 100% thuật toán nhận diện bot của Facebook. | Ngăn chặn việc gửi comment siêu tốc 1s. |
| `replyContentMode` (Nguồn nội dung reply) | Dữ liệu nội dung | `Enum`: `manual_list` (danh sách phản hồi có sẵn), `ai_counter_argument` (AI sinh phản bác ngữ cảnh) | Chọn cách tạo câu trả lời. | - *Thủ công:* Khi đã có sẵn các thông cáo, dẫn chứng chuẩn.<br>- *AI:* Khi cần bám sát từng câu chữ của đối phương để bẻ gãy luận điểm. | Bắt buộc chọn. |
| **BỘ THAM SỐ ĐIỀU HƯỚNG AI PROMPT CHO PHẢN HỒI BÌNH LUẬN (CHUYÊN SÂU)** | | | | | |
| ↳ `inputContextScope` (Phạm vi ngữ cảnh gửi cho AI) | AI Context Feeding | `Object`: `{ includePostText: true, targetCommentText: true, commentAuthor: true }` | Cung cấp dữ liệu đầu vào cho AI để AI hiểu được ngữ cảnh toàn diện. | AI phải đọc cả **Bài viết gốc** VÀ **Nội dung comment tiêu cực** thì mới sinh ra câu phản bác trúng đích, sắc bén. | Nếu thiếu ngữ cảnh bài gốc AI sẽ trả lời ngây ngô hoặc lạc đề. |
| ↳ `replyTactics` (Chiến thuật phản biện) | AI Strategy | `Enum`: `debunk_facts` (dẫn chứng sự thật), `legal_reference` (viện dẫn pháp luật), `rhetorical_question` (dùng câu hỏi tu từ dồn ép), `call_out_fallacy` (chỉ ra ngụy biện), `moral_suasion` (thuyết phục đạo lý) | Phương pháp tranh luận mà AI sẽ áp dụng trong câu trả lời. | Giúp các nick ảo khác nhau có cách tiếp cận khác nhau: Nick thì đưa số liệu kinh tế, nick thì nhắc nhở điều luật, nick thì đặt câu hỏi châm biếm logic đối phương. | Tránh sự rập khuôn giữa các tài khoản ảo. |
| ↳ `aiCivilizedConstraint` (Ràng buộc văn minh) | AI Safety | `Boolean`: `true / false` (Mặc định: `true`) | Yêu cầu AI tuyệt đối giữ thái độ khách quan, lịch sự, đanh thép nhưng không chửi bới, không dùng từ xúc phạm cá nhân. | **Tình huống sống còn:** Nếu nick ảo văng tục hoặc xúc phạm đối phương, đối phương sẽ bấm Báo cáo vi phạm tiêu chuẩn cộng đồng $\to$ Facebook sẽ khóa nick ảo ngay lập tức. | Quy tắc an toàn tối thượng. |
| ↳ `customPromptInstruction` (Chỉ đạo bổ sung của người dùng) | AI Custom Instruction | `String` (Textarea tự do) | Cho phép người dùng nhập thêm các chỉ thị riêng biệt cho từng chủ đề. | Ví dụ: *"Nhấn mạnh vào thành tựu phòng chống dịch và sự hy sinh của các lực lượng tuyến đầu"*. | Linh hoạt mở rộng theo từng chiến dịch truyền thông. |

---

### HÀNH ĐỘNG 8: BÁO CÁO BÌNH LUẬN VI PHẠM (`report_comment`)

Hành động nick ảo gửi báo cáo vi phạm (Mass Report) lên Facebook đối với các bình luận độc hại để thuật toán kiểm duyệt ẩn hoặc xóa bình luận đó.

| Tên tham số (Code & UI) | Nhóm tham số | Kiểu dữ liệu & Giá trị | Ý nghĩa & Mục đích nghiệp vụ | Tình huống phát sinh & Ứng biến thực tế | Ràng buộc logic |
|---|---|---|---|---|---|
| `triggerConditions` (Điều kiện báo cáo) | Điều kiện kích hoạt | `Object`: `{ targetEntities: [...], stances: ['attacks_or_defames'], hateSpeechScore: > 0.85 }` | Chỉ kích hoạt báo cáo khi bình luận có mức độ độc hại hoặc chống phá rất nặng. | Tránh báo cáo bừa bãi các comment trung lập làm loãng độ uy tín báo cáo (Report Trust Score) của tài khoản ảo. | Ngưỡng vi phạm phải đạt độ tin cậy cao. |
| `reportReason` (Lý do báo cáo vi phạm) | Hành vi thực thi | `Enum`: `hate_speech` (ngôn từ thù ghét), `harassment` (quấy rối), `false_information` (tin giả/sai sự thật), `violence` (kích động bạo lực), `terrorism` (khủng bố) | Khớp chính xác với các danh mục Tiêu chuẩn Cộng đồng của Facebook. | Chọn đúng lý do vi phạm giúp tỷ lệ Facebook quét duyệt tự động và gỡ comment đạt tỷ lệ thành công cao nhất (>85%). | Bắt buộc chọn. |
| `reportAllocationRatio` (Tỷ lệ phân bổ lý do đa chiều) | Kiểm soát thực thi | `Object`: `{ primaryReason: 'hate_speech' (60%), secondaryReason: 'false_info' (40%) }` | Phân bổ các nick ảo report cùng 1 comment nhưng với các lý do bổ trợ khác nhau. | **Né Anti-Spam của Facebook:** Nếu 30 nick ảo cùng report 1 comment với 100% cùng 1 lý do giống hệt nhau $\to$ Facebook sẽ coi đây là cuộc tấn công bot và vô hiệu hóa. Phân bổ đa lý do giúp report trông tự nhiên như người dùng thật. | Áp dụng khi phối hợp dàn nick. |
| `delayBeforeReport` (Độ trễ trước khi report) | Kiểm soát thực thi | `Object`: `{ from: Integer, to: Integer }` (giây: 10s - 30s) | Thời gian dừng lại xem comment trước khi nhấn Báo cáo. | Không bấm report ngay tức thì trong 1 giây đầu. | Tránh bị gắn cờ Synchronized Attack. |

---

## 5. BẢNG THAM SỐ XỬ LÝ TRƯỜNG HỢP KHÔNG MATCH ĐIỀU KIỆN (OTHERWISE / FALLBACK SYSTEM)

Trong thực tế lướt Newsfeed của mạng xã hội, **hơn 70% nội dung gặp phải sẽ không rơi vào các điều kiện đặc thù** (ví dụ: bài viết trung lập, tin mua sắm, comment rác, hoặc AI không chắc chắn). 

Hệ thống bắt buộc phải có **Cơ chế 4 Tầng Xử lý Khi Không Match Điều Kiện** để bot không bị kẹt luồng và không tương tác sai lệch:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ TẦNG 1: BÀI VIẾT KHÔNG MATCH CHỦ ĐỀ NÀO (Topic-Level Fallback)                   │
│ "Newsfeed xuất hiện bài Nấu ăn, Thú cưng, Mua sắm... nằm ngoài danh mục cấu hình" │
│ ↳ Tham số: unmatchedTopicStrategy (Bỏ qua / Lướt đọc dạo / Tương tác ngẫu nhiên) │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ TẦNG 2: BÀI VIẾT MATCH CHỦ ĐỀ NHƯNG KHÔNG MATCH ĐIỀU KIỆN HÀNH ĐỘNG              │
│ (Action-Level Otherwise)                                                         │
│ "Bài Chính trị nhưng TRUNG LẬP, thông cáo ngoại giao, không khen cũng không chê" │
│ ↳ Tham số: onReactionUnmatched, onCommentPostUnmatched, onSharePostUnmatched     │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ TẦNG 3: COMMENT NGUỒN KHÔNG MATCH ĐIỀU KIỆN (Comment-Level Otherwise)            │
│ "Comment spam bán hàng, tag tên bạn bè @NguyenVanA, icon không có ý nghĩa"       │
│ ↳ Tham số: onCommentUnmatched & onZeroMatchingComments (Bỏ qua / Chuyển hướng)   │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ TẦNG 4: AI NLP KHÔNG CHẮC CHẮN / NỘI DUNG MƠ HỒ (Ambiguity & Low-Confidence)     │
│ "Nội dung châm biếm ngầm, viết tắt, tiếng lóng AI chấm điểm tin cậy < 75%"       │
│ ↳ Tham số: minConfidenceScore & onLowConfidenceDecision (Bỏ qua an toàn)         │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Bảng chi tiết các tham số Không Khớp (Otherwise Parameters):

| Tầng xử lý | Tên tham số (Code & UI) | Kiểu dữ liệu & Giá trị | Ý nghĩa & Mục đích nghiệp vụ | Tình huống phát sinh & Ứng biến thực tế |
|---|---|---|---|---|
| **Tầng 1: Chủ đề** | `unmatchedTopicStrategy` (Chiến lược khi không khớp chủ đề nào) | `Enum`: <br>1. `skip`<br>2. `read_only`<br>3. `apply_default_behavior` | Hành vi tổng thể khi bài viết nằm ngoài toàn bộ danh mục chủ đề đã cấu hình. | - **`skip` (Bỏ qua hoàn toàn):** Không làm gì, lướt tiếp.<br>- **`read_only` (Chỉ đọc dạo):** Dừng xem 3s - 5s rồi qua (mô phỏng người thật).<br>- **`apply_default_behavior`:** Chạy cấu hình tương tác mặc định (thả like nhẹ 20%). |
| **Tầng 1: Chủ đề** | `unmatchedReadingDuration` (Thời gian dừng đọc bài ngoài danh mục) | `Object`: `{ from: Integer, to: Integer }` (giây: 2s - 6s) | Thời gian dừng lại xem bài trước khi cuộn tiếp. | **Chống bot:** Người thật khi gặp bài không thích vẫn dừng mắt 2s - 3s. Nếu bot nhảy bài trong 0.1s sẽ bị Facebook khóa bot. |
| **Tầng 1: Chủ đề** | `unmatchedCountTowardsLimit` (Tính vào hạn mức bài viết không) | `Boolean`: `true / false` | Bài viết không khớp có được tính vào tổng số bài đã đọc trong phiên không. | - Nếu `false`: Bot tiếp tục lướt đến khi tìm **đủ số bài thuộc chủ đề** mới dừng.<br>- Nếu `true`: Cứ lướt qua $N$ bài bất kỳ là dừng phiên. |
| **Tầng 2: Hành động** | `onReactionUnmatched` (Khi không khớp điều kiện Cảm xúc) | `Enum`: <br>1. `none` (Không làm gì)<br>2. `fallback_like` (Thả Like nhẹ)<br>3. `fallback_random_friendly` | Hành vi khi bài viết thuộc chủ đề nhưng không rơi vào diện khen hay chê (bài trung lập). | Mặc định chọn `none` để an toàn; hoặc chọn `fallback_like` tỷ lệ thấp để nuôi nick tự nhiên. |
| **Tầng 2: Hành động** | `onCommentPostUnmatched` (Khi không khớp điều kiện Bình luận bài) | `Enum`: `skip` (Bắt buộc) | Nếu bài viết không đạt tiêu chí bình luận thì tuyệt đối **KHÔNG tạo bình luận mới**. | Ngăn chặn việc AI nhảy vào bình luận lung tung các bài viết không liên quan, gây lộ tài khoản ảo. |
| **Tầng 2: Hành động** | `onSharePostUnmatched` (Khi không khớp điều kiện Chia sẻ bài) | `Enum`: `skip` (Bắt buộc) | Không chia sẻ bài viết nếu không đạt đủ các điều kiện ủng hộ hoặc độ hot. | Tránh chia sẻ bài viết sai lệch hoặc thông tin trung lập không cần thiết lên tường cá nhân. |
| **Tầng 3: Comment** | `onCommentUnmatched` (Xử lý từng comment rác không khớp) | `Enum`: <br>1. `ignore` (Bỏ qua hoàn toàn)<br>2. `fallback_reaction` | Hành vi đối với các comment spam tag bạn bè, xin link... | **Khuyến nghị 100% chọn `ignore`**: Không tương tác, không reply vào comment rác, giữ tài nguyên cho comment mục tiêu. |
| **Tầng 3: Comment** | `onZeroMatchingComments` (Khi bài viết KHÔNG CÓ comment nào khớp) | `Enum`: <br>1. `do_nothing`<br>2. `fallback_create_post_comment` | Bot quét hết 20 comment mà **không tìm thấy bất kỳ comment nào để reply phản bác** thì làm gì? | - `do_nothing`: Hoàn thành tương tác bài viết và lướt tiếp.<br>- `fallback_create_post_comment`: **Tự động chuyển từ Reply sang Tự tạo 1 bình luận mới trên bài viết** (để đảm bảo quan điểm định hướng vẫn xuất hiện bên dưới bài viết đó). |
| **Tầng 3: Comment** | `onOpponentReplyDeleted` (Khi comment của đối phương đã bị xóa) | `Enum`: `skip_silently` | Khi bot chuẩn bị gửi reply phản bác nhưng comment nguồn vừa bị người dùng/Facebook xóa mất. | Bỏ qua mượt mà, ghi log và chuyển sang comment tiếp theo, không để bot bị treo (crash). |
| **Tầng 4: AI NLP** | `minConfidenceScore` (Ngưỡng tin cậy tối thiểu của AI) | `Float`: `0.0 - 1.0` (Mặc định: `0.75`) | Điểm số tự tin của mô hình AI khi phân loại Sắc thái / Quan điểm bài viết hoặc comment. | Nếu điểm tin cậy $< 0.75 \to$ Đánh giá là nội dung mơ hồ, không an toàn để đưa ra quyết định hành vi. |
| **Tầng 4: AI NLP** | `onLowConfidenceDecision` (Hành vi khi độ tin cậy thấp) | `Enum`: <br>1. `skip_safe` (Bỏ qua an toàn)<br>2. `treat_as_neutral`<br>3. `flag_for_review` | Quyết định hành động khi gặp nội dung nghi ngờ châm biếm ngầm (sarcasm) hoặc chơi chữ. | **Nguyên tắc an toàn:** Thà bỏ qua không like/reply (`skip_safe`) còn hơn là đi thả tim vào một bài viết châm biếm chống phá, tránh bị hớ truyền thông. |

---

## 6. MA TRẬN TÌNH HUỐNG THỰC TẾ & KHẢ NĂNG BAO QUÁT (SCENARIOS & USE CASES)

Bảng ma trận dưới đây chứng minh hệ thống tham số trên bao quát được **100% các tình huống nghiệp vụ thực tế** từ đơn giản đến phức tạp:

| Tình huống thực tế (Scenario) | Mục tiêu nghiệp vụ | Các hành động & Tham số được kích hoạt đồng thời |
|---|---|---|
| **Tình huống 1: Nuôi nick hàng ngày (Lướt dạo tự nhiên)** | Tạo lịch sử hoạt động tự nhiên, tăng độ Trust cho nick clone mới tạo. | - `reaction_post`: Ngẫu nhiên 50% bài gặp, chọn `random_from` [Like, Care, Haha].<br>- `view_full_content`: 70% bài dài dừng đọc 8s.<br>- `unmatchedTopicStrategy`: Chọn `read_only` dừng đọc 3s.<br>- Không comment, không share để giữ an toàn. |
| **Tình huống 2: Tác chiến bài viết Chính trị (Khen thì ủng hộ, Chê thì dập tắt)** | Bảo vệ nền tảng tư tưởng, định hướng dư luận tích cực, phản bác luận điệu sai trái. | - `reaction_post`: Bài khen Đảng $\to$ Like/Love (100%); Bài xấu $\to$ Phẫn nộ (100%).<br>- `onReactionUnmatched`: Chọn `none` cho bài trung lập.<br>- `reaction_comment`: Comment tuyên dương $\to$ Thả tim ❤️.<br>- `reply_comment`: Comment bôi nhọ TBT $\to$ Bật AI Reply với chiến thuật `debunk_facts` + `legal_reference`, quota tối đa 2 comment/bài, delay 25s.<br>- `onZeroMatchingComments`: Chọn `fallback_create_post_comment` nếu không có comment nào để reply.<br>- `report_comment`: Comment xuyên tạc nặng nề $\to$ Report lý do `false_information` / `hate_speech`. |
| **Tình huống 3: Lan tỏa tin tức tích cực / Tuyên truyền chiến dịch** | Đưa thông điệp chính thống phủ sóng rộng rãi trên mạng xã hội. | - `reaction_post`: Thả Like/Love (100%).<br>- `share_post`: Chia sẻ lên tường cá nhân và vào 3 Group cộng đồng, kèm AI caption với giọng văn hào hứng (`enthusiastic`).<br>- `comment_text_post`: Bình luận ủng hộ với AI Prompt mục tiêu `praise_support`. |
| **Tình huống 4: Tương tác bài viết Thể thao / Giải trí** | Xây dựng "vỏ bọc" đời thường cho nick ảo (Persona người thật yêu thể thao, bóng đá). | - `reaction_post`: Chủ đề `sports`, nhắc đến `đội tuyển việt nam` $\to$ Thả Haha, Love (90%).<br>- `comment_text_post`: Quota 1 bài, AI Persona `cổ động viên bóng đá`, giọng văn `dân dã, hào sảng`.<br>- `comment_image_post`: Tải ảnh meme cổ vũ bóng đá từ thư mục ảnh, xóa ảnh sau khi dùng. |
| **Tình huống 5: Xử lý khủng hoảng truyền thông / Tẩy chay thông tin độc hại** | Vô hiệu hóa các bài viết và bình luận vu khống, tin giả gây hoang mang dư luận. | - `reaction_post`: Thả Phẫn nộ (100%).<br>- `comment_text_post`: Bình luận cảnh báo tin giả, trích dẫn văn bản bác bỏ chính thống.<br>- `report_comment`: Mass-report toàn bộ các comment kích động với tỷ lệ phân bổ đa lý do. |

---

## 7. ĐỀ XUẤT KIẾN TRÚC THIẾT KẾ TRÊN GIAO DIỆN FORM MODAL (UI DESIGN PRINCIPLES)

Để người dùng khi nhìn vào giao diện không bị choáng ngợp bởi hàng chục tham số phức tạp, giao diện cần áp dụng nguyên lý **Tiết lộ Tiến trình (Progressive Disclosure)** chia thành các khối rõ ràng:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ KHỐI 0: CẤU HÌNH GIỚI HẠN TƯƠNG TÁC CHUNG (Áp dụng cho toàn bộ phiên lướt)       │
│ Tùy chọn giới hạn:                                                               │
│ (•) Giới hạn số bài viết tương tác: [ from: 5 ] đến [ to: 10 ] bài              │
│ ( ) Giới hạn thời gian tương tác:   [ from: 120 ] đến [ to: 300 ] giây          │
└──────────────────────────────────────────────────────────────────────────────────┘
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│ KHỐI 1: CHỌN CHẾ ĐỘ NỘI DUNG (Content Mode Selector)                             │
│ (•) Tương tác Mặc định (Cơ bản)          ( ) Tương tác theo Chủ đề (Nâng cao V2) │
└──────────────────────────────────────────────────────────────────────────────────┘
```

1. **Khối 0 (Đầu Modal): Thiết lập Giới hạn tương tác chung**
   - Cho phép người dùng chọn 1 trong 2 cơ chế dừng phiên: **Số bài viết tương tác** (`from - to`) hoặc **Thời gian tương tác** (`from - to` giây).
   - Khối này luôn hiển thị cố định ở đầu form và chi phối thời lượng chạy của tài khoản ảo bất kể đang ở chế độ Mặc định hay Theo chủ đề.
2. **Nếu chọn Tương tác Mặc định**:
   - Hiển thị danh sách 6 hành vi cơ bản (tỷ lệ %, checkbox cảm xúc, danh sách text thủ công/AI đơn giản) như màn hình truyền thống.
3. **Nếu chọn Tương tác theo Chủ đề (Semantic V2)**:
   - Hiển thị danh sách các **Thẻ Quy tắc Chủ đề (Topic Rules)** có thể kéo thả ưu tiên.
   - Thêm khối **Cấu hình Khi Không Match (Fallback Settings)**: Dropdown chọn hành vi cho bài viết ngoài danh mục (`unmatchedTopicStrategy`) và hành vi khi không tìm thấy comment để reply (`onZeroMatchingComments`).
   - Mỗi thẻ Rule được thiết kế thành 3 khối gập/mở (Accordion) khoa học:
     - **Khối 1 — Điều kiện nhận diện bài:** Dropdown Chủ đề + Tag chọn nhanh Thực thể.
     - **Khối 2 — Hành động trên Bài viết:** Nút `[+ Thêm hành động bài]` (Bày tỏ cảm xúc, Chia sẻ, Comment bài). Mở ra popup/card con cấu hình Điều kiện sắc thái $\to$ Hành vi $\to$ Quota $\to$ Prompt AI $\to$ Hành vi khi không khớp (`onReactionUnmatched`).
     - **Khối 3 — Hành động trên Bình luận:** Ô `Quét tối đa N comment/bài` + Nút `[+ Thêm hành động comment]` (Thả tim comment khen, Reply phản bác comment xấu, Report comment thù địch).

---

Tài liệu này cung cấp cơ sở dữ liệu và logic trọn vẹn nhất để phục vụ cho việc chuẩn hóa Data Contract, thiết kế giao diện UI Modal và lập trình Worker BOT thực thi trong tương lai.
