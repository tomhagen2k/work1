# ÁP DỤNG TỐI ĐA 7 THAM SỐ ĐIỀU KIỆN CHO TẤT CẢ HÀNH ĐỘNG TƯƠNG TÁC NEWSFEED (OSINT V2)

---

## I. BẢNG MA TRẬN ÁP DỤNG TỐI ĐA 7 THAM SỐ CHO TẤT CẢ HÀNH ĐỘNG

Dưới đây là ma trận chứng minh **cả 7 tham số điều kiện** đều có thể được kết hợp trong Prompt của từng hành động:

| Tham số điều kiện (Trong Prompt) | 1. Bày tỏ cảm xúc bài | 2. Xem đầy đủ bài | 3. Chia sẻ bài viết | 4. Bình luận văn bản bài | 5. Bình luận ảnh bài | 6. Tương tác với comment | 7. Báo cáo vi phạm |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **1. Chủ đề (`Category`)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **2. Thực thể (`Entities`)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **3. Sắc thái (`Sentiment`)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **4. Lập trường (`Stance`)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **5. Nguồn tác giả (`Author`)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **6. Mức độ tương tác (`Engagement`)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **7. Mức độ độc hại (`Toxicity`)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## II. PHÂN TÍCH CHI TIẾT CÁCH ÁP DỤNG 7 THAM SỐ VÀO TỪNG HÀNH ĐỘNG

Dưới đây là phân tích chi tiết cho từng hành động: làm rõ **cả 7 tham số đóng vai trò gì trong prompt**, **ví dụ prompt đa chiều bao quát thực tế**, và **các tham số người dùng nhập tay**.

---

### 1. HÀNH ĐỘNG: BÀY TỎ CẢM XÚC BÀI VIẾT (`reaction_post`)

Hành động thả cảm xúc (Like, Love, Care, Haha, Wow, Sad, Angry) lên bài viết.

#### Vai trò của 7 tham số trong Prompt điều kiện:
1. **Chủ đề:** Giới hạn lĩnh vực (Chính trị, Pháp luật, Thể thao, Kinh tế...).
2. **Thực thể:** Nhắc đích danh nhân vật, cơ quan ban ngành, tổ chức mục tiêu.
3. **Sắc thái:** Đánh giá giọng điệu bài viết là khen ngợi (tích cực) hay chê bai (tiêu cực).
4. **Lập trường:** Ủng hộ chủ trương đường lối vs Bôi nhọ, xuyên tạc, chống đối.
5. **Nguồn tác giả:** Chỉ tương tác bài từ Báo chí tích xanh, trang quân đội, hay tránh trang cá nhân lạ.
6. **Mức độ tương tác:** Bài viết đang viral, nhiều tương tác (cần tạo sóng ủng hộ) hoặc bài ít tương tác.
7. **Mức độ độc hại:** Phát hiện bài viết chứa ngôn từ kích động, chống phá để dập tắt bằng phản ứng phẫn nộ.

#### Ví dụ Prompt điều kiện bao quát thực tế:
> - **Mẫu 1 (Ủng hộ chính sách):** *"Bài viết thuộc chủ đề **chính trị**, nhắc đến **Chính phủ hoặc Thủ tướng**, có sắc thái **tích cực ủng hộ**, đăng bởi **trang báo chí tích xanh**, đang có **tương tác cao trên 200 like**."*
> - **Mẫu 2 (Phản đối xuyên tạc):** *"Bài viết thuộc chủ đề **pháp luật/an ninh**, nhắc đến **lực lượng Công an**, có lập trường **bôi nhọ xuyên tạc**, chứa **ngôn từ kích động thù địch**, đăng trên **các hội nhóm công khai**."*

#### Tham số cấu hình bằng tay (Người dùng chọn):
- **Tỷ lệ thực hiện (`%`)**: Ví dụ `90%` hoặc `100%` hoặc **Số lượng tương tác**: Ví dụ từ 2 đến 5 bài. Chỉ cho chọn áp dụng theo Tỷ lệ thực hiện hoặc theo Số lượng tương tác, không cho cấu hình đồng thời cả hai.
- **Cơ chế chọn cảm xúc**: Chỉ cho chọn các biểu tượng cảm xúc trong danh sách
- **Loại cảm xúc**: Checkbox 👍 Like, ❤️ Love, 🥰 Care, 😆 Haha, 😮 Wow, 😢 Sad, 😡 Angry.
- **Thời gian dừng đọc trước khi bấm**: Từ `3s` đến `8s`.

---

### 2. HÀNH ĐỘNG: XEM ĐẦY ĐỦ NỘI DUNG BÀI VIẾT (`view_full_content`)

Hành động tự động nhấn "Xem thêm" (See more) để mở rộng nội dung bài dài, mô phỏng người thật đọc kỹ.

#### Vai trò của 7 tham số trong Prompt điều kiện:
1. **Chủ đề:** Chỉ bấm xem sâu các bài thuộc lĩnh vực quan tâm (Chính trị, Pháp luật, Vụ án nổi bật).
2. **Thực thể:** Bài viết nhắc đến các sự kiện, nhân vật đang được theo dõi đặc biệt.
3. **Sắc thái:** Đọc kỹ bài có sắc thái bức xúc, tranh luận hoặc bài phân tích chính sách sâu sắc.
4. **Lập trường:** Bài viết có quan điểm đa chiều, đối lập hoặc phân tích phản biện.
5. **Nguồn tác giả:** Ưu tiên đọc bài của chuyên gia, phóng viên, trang tin uy tín hoặc group thảo luận lớn.
6. **Mức độ tương tác:** Bài viết đang có thảo luận sôi nổi, nhiều chia sẻ.
7. **Mức độ độc hại:** Không bỏ qua các bài có dấu hiệu vi phạm để bot nạp đầy đủ context trước khi quyết định report.

#### Ví dụ Prompt điều kiện bao quát thực tế:
> *"Bài viết thuộc chủ đề **pháp luật hoặc kinh tế**, nhắc đến **các dự án trọng điểm quốc gia**, có nội dung **phân tích đa chiều**, đăng bởi **các trang tin hoặc diễn đàn lớn**, có **nhiều lượt thảo luận**."*

#### Tham số cấu hình bằng tay (Người dùng chọn):
- **Tỷ lệ thực hiện (`%`)**: Thường để `70% - 85%`.
- **Thời gian dừng đọc sau khi mở**: Từ `5s` đến `15s` (mô phỏng cuộn chuột đọc bài).

---

### 3. HÀNH ĐỘNG: CHIA SẺ LÊN TƯỜNG CÁ NHÂN (`share_post`)

Hành động lan tỏa thông tin tích cực về trang cá nhân của nick ảo.

#### Vai trò của 7 tham số trong Prompt điều kiện:
1. **Chủ đề:** Lựa chọn đúng bài tuyên truyền chính trị, gương người tốt việc tốt, thể thao vinh quang.
2. **Thực thể:** Bài viết ca ngợi Đảng, Bác Hồ, Quân đội, Công an, Đội tuyển Việt Nam.
3. **Sắc thái:** Bắt buộc là tích cực, tự hào, khích lệ (tuyệt đối không share bài tiêu cực lên tường).
4. **Lập trường:** Bắt buộc là lập trường ủng hộ tuyệt đối, bảo vệ chủ quyền biên giới biển đảo.
5. **Nguồn tác giả:** Chỉ share từ các nguồn tin cậy 100%: Cổng TTĐT Chính phủ, Báo Nhân Dân, Quân đội Nhân dân, Page tích xanh.
6. **Mức độ tương tác:** Bài viết đã có uy tín sẵn (đạt trên 100 like) để tường nick clone trông tự nhiên.
7. **Mức độ độc hại:** Phải là bài viết hoàn toàn sạch, `độ độc hại = 0` (tránh bị Facebook quét spam).

#### Ví dụ Prompt điều kiện bao quát thực tế:
> *"Bài viết thuộc chủ đề **chính trị - xã hội**, ca ngợi **thành tựu đất nước hoặc lực lượng vũ trang**, sắc thái **tự hào tích cực**, lập trường **ủng hộ tuyệt đối**, đăng bởi **trang báo chí tích xanh**, có **trên 100 tương tác** và **không có yếu tố tiêu cực**."*

#### Tham số cấu hình bằng tay (Người dùng chọn):
- **Tỷ lệ thực hiện (`%`)**: Khuyến nghị `15% - 30%`.
- **Nơi chia sẻ**: Tường cá nhân, Nhóm (nhập link nhóm).
- **Hình thức**: Chia sẻ ngay HOẶC Chia sẻ kèm caption.
- **Nếu kèm caption**:
  - *Thủ công:* Danh sách câu văn định sẵn (hỗ trợ Spin syntax `{Tuyệt vời|Tự hào quá}`), tùy chọn xóa sau khi dùng.
  - *AI Prompt:* Câu lệnh chỉ đạo AI tóm tắt hoặc viết cảm xúc ngắn (ví dụ: "Viết lời bình ngắn 1 câu bày tỏ niềm tự hào").

---

### 4. HÀNH ĐỘNG: BÌNH LUẬN VĂN BẢN TRÊN BÀI VIẾT (`comment_text_post`)

Hành động nick ảo **tự tạo một bình luận mới** trực tiếp trên bài viết để dẫn dắt dư luận.

#### Vai trò của 7 tham số trong Prompt điều kiện:
1. **Chủ đề:** Xác định chính xác chủ đề cần vào seeding (Kinh tế, Giáo dục, An ninh trật tự...).
2. **Thực thể:** Bài viết nhắc đến lãnh đạo, chính sách mới ban hành, dự án luật mới...
3. **Sắc thái:** Nhận biết bài viết khen để vào phụ họa, hoặc bài viết hoài nghi để vào giải thích.
4. **Lập trường:** Nhận diện bài viết có thông tin lệch lạc để vào bình luận đính chính ngay từ đầu.
5. **Nguồn tác giả:** Chỉ bình luận trên các Page mở, Group đông thành viên, tránh còm vào trang cá nhân riêng tư.
6. **Mức độ tương tác:** Bài viết đang có tương tác vừa phải hoặc cao (để bình luận của nick ảo tiếp cận được nhiều người).
7. **Mức độ độc hại:** Đánh giá mức độ công kích để lựa chọn giọng văn mềm mỏng hay đanh thép.

#### Ví dụ Prompt điều kiện bao quát thực tế:
> *"Bài viết thuộc chủ đề **chính trị - kinh tế**, đưa tin về **chính sách thuế hoặc đất đai mới**, từ **trang báo chí chính thống**, có **dư luận đang băn khoăn thắc mắc**, mức độ độc hại thấp."*

#### Tham số cấu hình bằng tay (Người dùng chọn):
- **Tỷ lệ thực hiện (`%`)** và **Quota số bài comment trong phiên**: Từ `1` đến `2` bài (chống checkpoint tài khoản).
- **Phương thức nội dung:**
  - *Thủ công:* Danh sách câu chuẩn bị trước, kèm chọn ngẫu nhiên/tuần tự, xóa sau khi dùng.
  - *AI Persona Engine:*
    - **Vai diễn (Persona):** Người dân địa phương, Chuyên gia kinh tế, Trí thức, Cổ động viên...
    - **Mục tiêu:** Khen ngợi ủng hộ, Phân tích làm rõ chính sách, Đặt câu hỏi kích thích thảo luận tích cực.
    - **Tông giọng:** Lịch sự chuẩn mực, Chân thành, Đanh thép, Dân dã đời thường.
    - **Độ dài:** Ngắn (1 câu), Vừa (2-3 câu).
- Checkbox `[x] Kèm sticker ngẫu nhiên`.

---

### 5. HÀNH ĐỘNG: BÌNH LUẬN ẢNH TRÊN BÀI VIẾT (`comment_image_post`)

Hành động tải ảnh minh chứng, infographic, văn bản luật, hoặc meme cổ vũ vào bình luận.

#### Vai trò của 7 tham số trong Prompt điều kiện:
1. **Chủ đề:** Bài viết Thể thao (đăng meme), Bài Pháp luật (đăng ảnh trích dẫn luật), Bài Kinh tế (đăng biểu đồ tăng trưởng).
2. **Thực thể:** Khớp đúng đối tượng trong kho ảnh (ảnh đội tuyển bóng đá VN, ảnh công văn của Bộ Công an...).
3. **Sắc thái:** Bài viết không khí vui vẻ (ảnh meme hài hước) hoặc bài viết tranh cãi (ảnh văn bản bác bỏ tin đồn).
4. **Lập trường:** Đăng ảnh dẫn chứng sự thật để bẻ gãy các bài viết bôi nhọ, xuyên tạc.
5. **Nguồn tác giả:** Đăng trên các diễn đàn công khai có lượng người xem lớn để ảnh lan tỏa mạnh.
6. **Mức độ tương tác:** Ưu tiên bài viết đông người theo dõi để bức ảnh tạo sức nặng truyền thông.
7. **Mức độ độc hại:** Nhận diện bài viết có yếu tố tin giả để bình luận ảnh đóng dấu "TIN GIẢ - FAKE NEWS".

#### Ví dụ Prompt điều kiện bao quát thực tế:
> *"Bài viết thuộc chủ đề **an ninh trật tự**, xuất hiện **tin giả sai sự thật** về lãnh đạo hoặc chính sách, có **lập trường xuyên tạc bôi nhọ**, đang **thu hút đông người xem trên các hội nhóm mạng xã hội**."*

#### Tham số cấu hình bằng tay (Người dùng chọn):
- **Tỷ lệ thực hiện (`%`)**.
- **Thư mục ảnh (`imageFolderPath`)**: Đường dẫn kho ảnh tương ứng với chiến dịch.
- **Cơ chế chọn ảnh**: Ngẫu nhiên hoặc Tuần tự.
- **Tự động xóa ảnh đã dùng**: Checkbox `[x] Xóa ảnh sau khi comment thành công` (né thuật toán quét pHash của Facebook).

---

### 6. HÀNH ĐỘNG: TƯƠNG TÁC VỚI BÌNH LUẬN BÀI VIẾT (`comment_interaction`)

Hành động nhắm vào các **bình luận đã có sẵn** bên dưới bài viết (gồm: **Thả cảm xúc bình luận** & **Trả lời bình luận - Reply**).

#### Vai trò của 7 tham số trong Prompt điều kiện:
*(Áp dụng đồng thời cho cả Ngữ cảnh bài viết VÀ Nội dung từng bình luận con)*
1. **Chủ đề:** Giới hạn bài viết nằm trong chủ đề cần tác chiến (Chính trị, Pháp luật, Xã hội...).
2. **Thực thể:** Bình luận con nhắc trực tiếp đến tên lãnh đạo Đảng/Nhà nước, lực lượng công an...
3. **Sắc thái:** Bình luận con mang sắc thái ủng hộ khen ngợi $\to$ Thả tim; Bình luận con chê bai bêu riếu $\to$ Phẫn nộ / Phản bác.
4. **Lập trường:** Bình luận có tính chất chống đối, bôi nhọ, kích động hận thù.
5. **Nguồn tác giả:** Phân biệt bình luận của chính chủ bài viết, bình luận của Top Fan, hay nick lạ.
6. **Mức độ tương tác:** Bình luận đang ở Top Comment (nhiều like nhất) $\to$ Cần ưu tiên nhảy vào phản bác ngay vì có hàng ngàn người đang đọc.
7. **Mức độ độc hại:** Đo lường chỉ số độc hại, thóa mạ của bình luận để chọn chiến thuật reply hoặc report.

#### Ví dụ Prompt điều kiện bao quát thực tế:
> - **Mẫu Thả tim:** *"Bình luận con có sắc thái **tích cực**, lập trường **ủng hộ bảo vệ quan điểm chính thống**, nhắc đến **lực lượng chức năng**, không chứa ngôn từ tiêu cực."*
> - **Mẫu Phản bác (Reply):** *"Bình luận con thuộc bài viết **chính trị**, có **lập trường bôi nhọ xuyên tạc sự thật**, mang sắc thái **công kích gay gắt**, đang là **bình luận nhiều tương tác ở top đầu**, mức độ độc hại cao."*

#### Tham số cấu hình bằng tay (Người dùng chọn):
- **Hạn mức quét & tương tác:** Quét top `10 - 20` comment; Chỉ tương tác tối đa `1 - 2` comment/bài.
- **Khối Bày tỏ cảm xúc bình luận:** Checkbox thả 👍, ❤️, 🥰, 😆, 😡 (tương ứng với loại comment).
- **Khối Trả lời bình luận (Reply):**
  - *Nội dung:* Danh sách câu chuẩn bị trước HOẶC AI tự động phản bác ngữ cảnh.
  - *Chiến thuật AI:*
    - `Dẫn chứng số liệu sự thật (Debunk Facts)`
    - `Viện dẫn quy định pháp luật (Legal Reference)`
    - `Đặt câu hỏi tu từ dồn ép (Rhetorical Question)`
    - `Khuyên nhủ đạo lý, văn minh (Moral Suasion)`
  - *Ràng buộc an toàn:* Bắt buộc bật `[x] Giữ văn phong văn minh, đanh thép, không chửi bới xúc phạm`.

---

### 7. HÀNH ĐỘNG: BÁO CÁO VI PHẠM (`report_content`)

Áp dụng cho việc gửi báo cáo vi phạm tiêu chuẩn cộng đồng (Mass Report) đối với Bài viết hoặc Bình luận con độc hại.

#### Vai trò của 7 tham số trong Prompt điều kiện:
1. **Chủ đề:** Bài viết/bình luận rơi vào các chủ đề nhạy cảm bị lợi dụng chống phá (Chính trị, Tôn giáo, Dân tộc...).
2. **Thực thể:** Nhắm vào các đối tượng cầm đầu phản động, trang tin giả mạo cơ quan nhà nước.
3. **Sắc thái:** Thái độ thù địch, hằn học, chửi bới thô tục, bôi nhọ danh dự.
4. **Lập trường:** Lập trường chống đối cực đoan, kích động biểu tình, kêu gọi lật đổ.
5. **Nguồn tác giả:** Xuất phát từ các tài khoản chống phá cộm cán, tài khoản nặc danh/clone bẩn.
6. **Mức độ tương tác:** Bài viết/bình luận độc hại đang viral, lan truyền nhanh (cần report khẩn cấp để thuật toán gỡ bỏ sớm).
7. **Mức độ độc hại:** **Đây là chỉ số quan trọng nhất** $\to$ Đạt ngưỡng vi phạm nghiêm trọng Tiêu chuẩn cộng đồng (Ngôn từ thù ghét, Tin giả, Kích động bạo lực).

#### Ví dụ Prompt điều kiện bao quát thực tế:
> *"Bài viết hoặc bình luận thuộc chủ đề **chính trị**, nhắc đến **lãnh đạo Đảng, Nhà nước hoặc Quân đội**, có **lập trường chống đối cực đoan**, sắc thái **thù địch thô tục**, mức độ **độc hại và ngôn từ thù ghét nghiêm trọng**, đang có **nhiều lượt chia sẻ lan truyền**."*

#### Tham số cấu hình bằng tay (Người dùng chọn):
- **Tỷ lệ thực hiện báo cáo (`%`)**: `90% - 100%`.
- **Lý do vi phạm Facebook:**
  - `Ngôn từ gây thù ghét (Hate Speech)`
  - `Thông tin giả mạo (False Information)`
  - `Quấy rối / Đe dọa (Harassment)`
  - `Kích động bạo lực (Violence)`
- **Tỷ lệ phân bổ lý do đa chiều (Multi-reason Ratio)**: Cho phép cấu hình phân bổ (ví dụ: 60% Hate Speech, 40% False Information) để dàn bot khi mass-report không bị Facebook coi là tấn công tự động giống hệt nhau.
- **Thời gian dừng xem trước khi gửi report**: Từ `10s` đến `25s`.
