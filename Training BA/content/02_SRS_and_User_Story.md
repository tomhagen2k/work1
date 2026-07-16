# Bài 2: Viết Tài Liệu Phân Tích Đặc Tả (SRS) và Chuyển Đổi Agile (User Story)

> [!NOTE]
> Khả năng truyền đạt yêu cầu rõ ràng, không gây hiểu lầm là kỹ năng sống còn của một Business Analyst. Bài học này sẽ hướng dẫn bạn cách phân tích một tính năng từ bức tranh tổng thể cho đến từng ngóc ngách ngoại lệ (Edge Cases), và cách trình bày chúng dưới dạng Tài liệu Đặc tả (SRS) của Waterfall hoặc Câu chuyện Người dùng (User Story) của Agile.

## 1. Tổng quan về Tài liệu Đặc tả Yêu cầu Hệ thống (SRS/FRD)

Tài liệu Đặc tả Yêu cầu Hệ thống (Software Requirements Specification - SRS) hoặc Đặc tả Chức năng (Functional Requirements Document - FRD) là bản thiết kế chi tiết về mặt nghiệp vụ của phần mềm. Đây là cơ sở pháp lý và tài liệu tham chiếu duy nhất để Đội ngũ Lập trình (Developer) tiến hành viết mã và Đội ngũ Kiểm thử (QA/Tester) xây dựng kịch bản kiểm tra (Test case).

### 1.1. Cấu trúc tiêu chuẩn của một tài liệu SRS
Dù định dạng có thể khác nhau tùy công ty, một tài liệu SRS tiêu chuẩn thường bao gồm 3 phần chính:
1. **Thông tin chung (Overview):** Mục đích của tính năng, đối tượng người dùng (User/Actor) là ai.
2. **Yêu cầu Phi chức năng (Non-functional Requirements):** Các yêu cầu về hiệu năng (tốc độ tải trang), bảo mật, khả năng mở rộng, khả năng tương thích trình duyệt.
3. **Yêu cầu Chức năng (Functional Requirements):** Cốt lõi của tài liệu. Mô tả chi tiết từng luồng thao tác mà hệ thống phải thực hiện.

### 1.2. Kỹ thuật phân tích chi tiết một Chức năng (Feature)
Khi phân tích bất kỳ tính năng nào, BA không được phép chỉ nhìn vào trường hợp thành công. Một luồng phân tích hoàn chỉnh phải có đủ 3 yếu tố:
- **Điều kiện tiên quyết (Pre-condition):** Người dùng phải đáp ứng điều kiện gì trước khi thực hiện chức năng này? (Ví dụ: Phải có kết nối Internet, phải đang không bị khóa tài khoản).
- **Luồng chính (Happy Path):** Kịch bản lý tưởng nhất khi người dùng thao tác đúng mọi thứ và hệ thống xử lý thành công.
- **Luồng ngoại lệ / Rẽ nhánh (Alternative / Edge Cases):** Mọi trường hợp sai sót có thể xảy ra (nhập sai dữ liệu, mất mạng, hệ thống thứ 3 bị lỗi). Đây là nơi thể hiện đẳng cấp của một BA.

---

## 2. Case Study: Phân tích chuyên sâu Tính năng Đăng nhập (Login)

Chúng ta sẽ lấy một tính năng quen thuộc nhất - **Đăng nhập hệ thống** - để tiến hành phân tích sâu theo cấu trúc SRS.

### 2.1. Phân tích Luồng chức năng
- **Pre-condition:** Người dùng đã truy cập vào trang chủ và chọn nút "Đăng nhập".
- **Luồng chính (Happy Path):** 
  1. Người dùng nhập tên đăng nhập (Username) và Mật khẩu (Password) chính xác. 
  2. Bấm nút "Đăng nhập". 
  3. Hệ thống xác thực thành công và điều hướng người dùng vào trang Dashboard (Bảng điều khiển).
- **Khai thác Luồng ngoại lệ (Edge Cases):** BA cần phải đặt ra hàng loạt câu hỏi "Nếu... thì sao?"
  - *Sai thông tin:* Nếu nhập sai mật khẩu thì hệ thống báo lỗi gì? (Quy tắc bảo mật: Chỉ thông báo chung chung "Tên đăng nhập hoặc mật khẩu không chính xác" để tránh việc kẻ gian biết tài khoản này có tồn tại hay không).
  - *Chống tấn công dò mật khẩu (Brute-force):* Nếu nhập sai mật khẩu liên tục 5 lần thì sao? (Hệ thống cần khóa tài khoản tạm thời trong 15 phút, hoặc yêu cầu xác thực CAPTCHA).
  - *Trạng thái tài khoản:* Nếu tài khoản đã bị Quản trị viên (Admin) vô hiệu hóa (Inactive) thì sao?
  - *Quên mật khẩu:* Người dùng không nhớ mật khẩu thì luồng cấp lại hoạt động như thế nào? (Gửi mã OTP qua Email hay SMS?).

### 2.2. Kiểm soát Tính hợp lệ dữ liệu (Data Validation)
Bên cạnh luồng logic, BA phải đặc tả các quy tắc kiểm tra dữ liệu đầu vào (Validation Rules) để lập trình viên xử lý trên giao diện (Frontend).
- **Bắt buộc nhập (Required fields):** Không được để trống Username và Password. Nếu bỏ trống và bấm Đăng nhập, hệ thống phải focus (đặt con trỏ chuột) vào ô còn thiếu, viền ô chuyển màu đỏ và hiển thị dòng chữ thông báo lỗi bên dưới.
- **Định dạng dữ liệu (Format):** Nếu Username yêu cầu là Email, hệ thống phải tự động kiểm tra định dạng chứa ký tự `@` và dấu `.` (Ví dụ: `user@domain.com`). Nếu nhập sai định dạng, cần báo lỗi ngay khi con trỏ chuột rời khỏi ô nhập liệu (sự kiện onBlur).

---

## 3. Chuyển đổi sang Agile: User Story & Acceptance Criteria

Trong mô hình Agile, việc viết tài liệu SRS dài hàng chục trang được thay thế bằng các đơn vị yêu cầu nhỏ, linh hoạt hơn gọi là **User Story**.

### 3.1. Khái niệm User Story
User Story (Câu chuyện người dùng) là một mô tả ngắn gọn về một tính năng từ góc nhìn của người dùng cuối. 
- **Cấu trúc chuẩn:** `Là một [Đối tượng người dùng], tôi muốn [Hành động], để tôi có thể [Giá trị nhận được]`.
- *Ví dụ:* "Là một khách hàng, tôi muốn lưu lại thông tin thẻ tín dụng, để tôi thanh toán nhanh hơn ở lần mua sau."
- *Mục đích:* Cấu trúc này ép buộc BA phải luôn làm rõ **Giá trị (Value)** mang lại cho khách hàng. Nếu một tính năng không mang lại giá trị gì, nó không nên được ưu tiên làm.

### 3.2. Tiêu chí chấp nhận (Acceptance Criteria - AC)
User Story chỉ là tóm tắt mong muốn. Để lập trình viên biết code thế nào và Tester biết test ra sao, mỗi User Story bắt buộc phải có Tiêu chí chấp nhận (AC). AC xác định ranh giới "Thế nào là hoàn thành" (Definition of Done).
- Phương pháp viết AC phổ biến nhất là BDD (Behavior-Driven Development) theo định dạng **Given - When - Then**:
  - **Given (Trong bối cảnh):** Điều kiện ban đầu.
  - **When (Khi):** Hành động xảy ra.
  - **Then (Thì):** Kết quả mong đợi từ hệ thống.

### 3.3. Thực hành: Phân rã tính năng Đăng nhập thành User Stories
Dựa trên phân tích ở Phần 2, tính năng Đăng nhập quá lớn để đưa vào một thẻ công việc (Task). Trong Agile, chúng ta cần phân rã nó (Breakdown) thành các User Story độc lập.

**User Story 1: Xác thực tài khoản cơ bản**
> **Mô tả:** Là một người dùng hợp lệ, tôi muốn đăng nhập vào hệ thống bằng Email và Mật khẩu, để tôi có thể truy cập vào dữ liệu cá nhân của mình.
> 
> **Tiêu chí chấp nhận (AC):**
> - *AC1 (Happy Path):* Given người dùng đang ở trang Đăng nhập, When họ nhập đúng Email và Password và bấm "Submit", Then hệ thống điều hướng họ tới trang Dashboard.
> - *AC2 (Lỗi thông tin):* Given người dùng đang ở trang Đăng nhập, When họ nhập sai Password, Then hệ thống giữ nguyên trang và hiển thị thông báo lỗi màu đỏ: "Email hoặc mật khẩu không chính xác".

**User Story 2: Kiểm tra dữ liệu đầu vào (Validation)**
> **Mô tả:** Là người dùng, tôi muốn hệ thống báo lỗi ngay khi tôi nhập sai định dạng Email, để tôi nhận ra lỗi sai trước khi bấm Đăng nhập.
>
> **Tiêu chí chấp nhận (AC):**
> - *AC1 (Bắt buộc nhập):* Given ô Email đang bị bỏ trống, When người dùng bấm Đăng nhập, Then hệ thống bôi đỏ ô Email và yêu cầu nhập thông tin.
> - *AC2 (Sai định dạng):* Given người dùng đang nhập Email, When người dùng gõ thiếu ký tự "@" và chuyển sang ô khác, Then hệ thống cảnh báo "Email không đúng định dạng".

**User Story 3: Cơ chế chống dò mật khẩu (Security/Brute-force)**
> **Mô tả:** Là Quản trị viên hệ thống, tôi muốn tài khoản bị khóa tạm thời nếu nhập sai mật khẩu quá nhiều lần, để bảo vệ hệ thống khỏi các cuộc tấn công dò mật khẩu.
> 
> **Tiêu chí chấp nhận (AC):**
> - *AC1 (Khóa tài khoản):* Given tài khoản chưa bị khóa, When người dùng nhập sai mật khẩu lần thứ 5 liên tiếp, Then hệ thống thông báo "Tài khoản tạm khóa trong 15 phút do nhập sai quá số lần quy định" và vô hiệu hóa nút Đăng nhập.

---

## 4. Bài tập & Tự nghiên cứu

> [!IMPORTANT]
> Việc thực hành viết tài liệu là cách duy nhất để nâng cao kỹ năng tư duy phân tích (Analytical Thinking) và tư duy logic.

### 4.1. Câu hỏi lý thuyết (Tự nghiên cứu)
1. Trong Agile, một User Story tốt thường được đánh giá qua tiêu chuẩn **INVEST**. Hãy tìm hiểu và giải thích ngắn gọn 6 chữ cái trong tiêu chuẩn INVEST đại diện cho những tiêu chí gì?
2. Khi viết Acceptance Criteria, ngoài định dạng `Given-When-Then`, còn có những định dạng (format) nào khác thường được các công ty áp dụng? (Gợi ý: Tìm hiểu về Checklist Format hoặc Rule-oriented Format).

### 4.2. Bài tập thực hành phân tích (Case Study)

**Bài tập 1: Đăng ký tài khoản (Mức độ: Cơ bản)**
Tính năng Đăng nhập thường đi liền với tính năng Đăng ký. Hãy áp dụng kỹ thuật phân tích đã học để viết đặc tả cho màn hình **Đăng ký tài khoản dành cho Khách hàng cá nhân**. 

*Thông tin Form nhập liệu yêu cầu (Inputs):*
- Họ và Tên (Bắt buộc).
- Email (Bắt buộc, dùng làm Tên đăng nhập).
- Số điện thoại (Tùy chọn).
- Mật khẩu và Xác nhận lại mật khẩu (Bắt buộc).

**Yêu cầu:** Bạn cần trình bày bài tập này dưới 2 định dạng tài liệu độc lập:
1. **Dạng tài liệu SRS (Đặc tả chi tiết):**
   - Phân tích và trình bày rõ **Luồng chính (Happy Path)**.
   - Phân tích và liệt kê chi tiết ít nhất **3 Luồng ngoại lệ (Edge Cases)**. *(Gợi ý: Email đã tồn tại trong hệ thống; Email kích hoạt gửi đi bị lỗi timeout từ phía máy chủ; Người dùng nhập Mật khẩu và Xác nhận mật khẩu không khớp nhau).*
   - Viết Đặc tả quy tắc Validation bảo mật cho trường Mật khẩu (Ví dụ: Độ dài tối thiểu, yêu cầu có ký tự đặc biệt và chữ in hoa).
2. **Dạng tài liệu Agile (User Story):**
   - Lựa chọn 1 Luồng ngoại lệ bất kỳ ở phần trên và chuyển đổi nó thành **User Story** độc lập.
   - Viết kèm các **Tiêu chí chấp nhận (AC)** theo định dạng `Given-When-Then` cho User Story đó.

**Bài tập 2: Thêm vào Giỏ hàng (Mức độ: Nâng cao)**
Đây là một tính năng cực kỳ phổ biến trên các hệ thống Thương mại điện tử (E-commerce) hoặc Ứng dụng đặt đồ ăn. Khách hàng đang ở trang Chi tiết sản phẩm và bấm chọn nút "Thêm vào giỏ hàng".

**Yêu cầu:** Tương tự, bạn cần trình bày dưới 2 định dạng tài liệu:
1. **Dạng tài liệu SRS (Đặc tả chi tiết):**
   - Tự suy luận và trình bày cấu trúc rõ ràng cho ít nhất **4 Luồng ngoại lệ (Edge Cases)** có thể xảy ra khi người dùng thao tác chức năng này. 
   *(Gợi ý để suy luận tư duy logic: Chuyện gì xảy ra nếu sản phẩm đó vừa hết hàng tồn kho ở đúng 1 giây trước? Nếu khách hàng chọn số lượng là 0 hoặc số âm? Nếu sản phẩm bắt buộc chọn "Size" và "Màu sắc" nhưng khách chưa chọn mà đã bấm nút? Nếu giỏ hàng đã đạt giới hạn tối đa 50 món cho một đơn?)*
2. **Dạng tài liệu Agile (User Story):**
   - Viết **01 User Story** riêng biệt tập trung xử lý riêng cho luồng ngoại lệ: *"Khách hàng thêm sản phẩm vượt quá số lượng tồn kho tối đa cho phép"*. 
   - Viết kèm theo bộ Tiêu chí chấp nhận (AC) chi tiết cho Story này.

<!-- GÓC DÀNH CHO MENTOR (XÓA PHẦN NÀY TRƯỚC KHI GỬI CHO HỌC VIÊN) -->
> [!CAUTION]
> **TÀI LIỆU NỘI BỘ DÀNH CHO MENTOR (HƯỚNG DẪN ĐÁNH GIÁ ĐÁP ÁN):**
> 
> **Phần 4.1: Câu hỏi lý thuyết**
> 1. **Tiêu chuẩn INVEST:** 
>    - **I (Independent - Độc lập):** Story này có thể phát triển riêng rẽ, ít phụ thuộc vào Story khác.
>    - **N (Negotiable - Thương lượng được):** Không phải là hợp đồng kỹ thuật cứng nhắc, có thể thảo luận điều chỉnh cách làm với Team Dev.
>    - **V (Valuable - Mang lại giá trị):** Phải tạo ra giá trị nghiệp vụ rõ ràng cho khách hàng hoặc doanh nghiệp.
>    - **E (Estimable - Ước lượng được):** Đội ngũ Lập trình phải có khả năng hiểu và ước lượng được thời gian hoàn thành.
>    - **S (Small - Nhỏ):** Khối lượng công việc được chia nhỏ, vừa đủ để hoàn thành trong 1 Sprint.
>    - **T (Testable - Kiểm thử được):** Phải có Tiêu chí chấp nhận rõ ràng để kiểm tra tính đúng đắn.
> 2. **Các định dạng AC khác:** Thường gặp nhất là *Checklist Format* (Liệt kê gạch đầu dòng các quy tắc kiểm tra trực tiếp mà không dùng cấu trúc Given-When-Then) hoặc *Rule-oriented Format* (Định dạng tập trung vào luật nghiệp vụ).
> 
> **Phần 4.2: Bài tập thực hành phân tích**
> 
> **Bài tập 1: Đăng ký tài khoản**
> *1. Dạng SRS:* 
> - **Happy Path:** Khách điền đủ 4 trường hợp lệ -> Bấm Đăng ký -> Hệ thống gửi Email kích hoạt -> Khách click link -> Thành công.
> - **Edge Cases (Đánh giá sự nhạy bén của học viên):** Email đã tồn tại; Nhập Password và Confirm Password không khớp; Bỏ trống thông tin bắt buộc; Email gửi đi nhưng server Mail bị gián đoạn.
> - **Validation Mật khẩu:** Rất nhiều quy tắc (VD: Độ dài > 8, có chữ hoa, chữ thường, số, ký tự đặc biệt).
> *2. Dạng User Story (Ví dụ lấy Edge Case Mật khẩu không khớp):*
> - **Mô tả:** Là người dùng, tôi muốn hệ thống báo lỗi khi nhập lại mật khẩu xác nhận không khớp, để đảm bảo tôi ghi nhớ đúng mật khẩu vừa tạo.
> - **AC1:** Given người dùng đang ở trang Đăng ký, When họ nhập giá trị ở ô Mật khẩu và Xác nhận mật khẩu khác nhau, Then hệ thống bôi đỏ ô Xác nhận và cảnh báo "Mật khẩu không trùng khớp".
> 
> **Bài tập 2: Thêm vào Giỏ hàng**
> *1. Dạng SRS (Các luồng ngoại lệ khó):*
> - (1) Sản phẩm hết hàng ngay tích tắc người dùng bấm nút (Xử lý đồng thời).
> - (2) Người dùng nhập tay số lượng là số âm (VD: -5) hoặc chèn ký tự đặc biệt.
> - (3) Sản phẩm yêu cầu bắt buộc chọn Phân loại (Size/Màu) nhưng khách chưa chọn mà đã bấm Thêm vào giỏ.
> - (4) Giỏ hàng đã đạt giới hạn dung lượng tối đa (VD: Giỏ chỉ cho phép chứa 50 món).
> *2. Dạng User Story (Luồng vượt tồn kho):*
> - **Mô tả:** Là người dùng, tôi muốn được thông báo khi số lượng mua vượt quá số lượng tồn kho hiện tại, để tôi điều chỉnh lại số lượng giỏ hàng cho hợp lệ.
> - **AC1:** Given sản phẩm áo thun đang còn 5 chiếc trong kho, When người dùng nhập số lượng mua là 6 và bấm nút "Thêm vào giỏ hàng", Then hệ thống chặn hành động này và hiển thị cảnh báo: "Số lượng sản phẩm vượt quá tồn kho (Còn lại: 5)".
<!-- KẾT THÚC PHẦN CỦA MENTOR -->
