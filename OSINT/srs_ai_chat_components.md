# ĐẶC TẢ CHI TIẾT CHỨC NĂNG: GIAO DIỆN TRỢ LÝ AI (AI ASSISTANT CHAT)

Tài liệu này đặc tả chi tiết giao diện và luồng xử lý của tính năng **Chat với AI** trên hai màn hình **Quản lý Kịch bản** và **Quản lý Tài khoản Ảo**.

---

## 1. THÔNG TIN CHUNG (FUNCTIONAL INFO)

### 1. Tên chức năng
Chat với Trợ lý AI (AI Assistant)

### 2. Mô tả
Tính năng Chat với Trợ lý AI được tích hợp dưới dạng cửa sổ trượt (Right Sidebar), hỗ trợ người dùng tương tác bằng ngôn ngữ tự nhiên để thực hiện các thao tác quản lý tự động. Tại màn hình "Quản lý Kịch bản", AI hỗ trợ phân tích yêu cầu và tạo nhanh cấu trúc kịch bản tương tác Facebook. Tại màn hình "Quản lý Tài khoản Ảo", AI giúp người dùng điều hướng gán kịch bản (có sẵn hoặc tạo mới) vào các tài khoản mục tiêu và thiết lập lịch chạy lặp lại định kỳ trong tuần.

### 3. Tác nhân
Người dùng

### 4. Điều kiện trước
- Hệ thống backend AI phải đang hoạt động và kết nối mạng ổn định.
- Người dùng đang truy cập vào tính năng "Quản lý Kịch bản" hoặc "Quản lý Tài khoản Ảo" trên hệ thống.

### 5. Điều kiện sau
- Các kịch bản được tạo mới bởi AI sẽ tự động được lưu vào hệ thống và được gán nhãn `[AI Generated]`.
- Khi AI thực hiện gán kịch bản thành công cho tài khoản ảo, cột "Gán lịch bởi AI" trên bảng dữ liệu tài khoản sẽ tự động cập nhật thời gian thực thi.
- Lịch sử hội thoại được lưu giữ tạm thời trên UI, cho phép người dùng đóng/mở cửa sổ AI mà không bị mất tin nhắn.

### 6. Ngoại lệ
- Lỗi mất kết nối mạng hoặc backend AI không phản hồi: Hệ thống báo lỗi toast message và giữ nguyên tin nhắn người dùng nhập.
- Người dùng đưa ra các yêu cầu ngoài lề (không liên quan đến nghiệp vụ tạo kịch bản/gán tài khoản): AI sẽ từ chối khéo léo, nhắc lại vai trò và không thực thi bất kỳ thao tác nào lên hệ thống.

### 7. Các yêu cầu đặc biệt
- Giao diện phải phản hồi mượt mà: Tự động cuộn xuống tin nhắn mới nhất, vô hiệu hóa ô gõ (disable) khi chờ phản hồi, và hiển thị trạng thái `AI đang gõ...` (Typing indicator).
- Các tin nhắn đề xuất thay đổi dữ liệu từ AI (Proposal) bắt buộc phải hiển thị rõ hai nút hành động `[Execute]` và `[Từ chối]` để đảm bảo người dùng kiểm soát thao tác (User-in-the-loop).

---

## 2. ĐẶC TẢ CHI TIẾT CÁC THÀNH PHẦN GIAO DIỆN (UI COMPONENTS)

| STT | Tên trường | Loại dữ liệu | Mô tả |
| :--- | :--- | :--- | :--- |
| **1** | **Trợ lý AI**<br>(Tiêu đề cửa sổ) | Label | - Tiêu đề cửa sổ, hiển thị tên của tính năng trợ lý AI.<br>- **Nội dung hiển thị mặc định:** Trợ lý AI<br>- **Tính chất hiển thị:** Tĩnh (Static). |
| **2** | **Icon Đóng**<br>(Dấu X) | Button | - Cho phép người dùng thu gọn/đóng cửa sổ trượt Chat với AI.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):**<br>  Hệ thống thực hiện đóng cửa sổ trượt (ẩn sang góc phải màn hình). Nội dung đoạn chat hiện tại vẫn được lưu giữ tạm thời để nếu người dùng click mở lại thì vẫn có thể xem tiếp cuộc hội thoại. |
| **3** | **Xóa cuộc hội thoại**<br>(Icon thùng rác/Reset) | Button | - Cho phép người dùng xóa toàn bộ nội dung đoạn chat hiện tại để bắt đầu một cuộc hội thoại mới với AI.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):**<br>  Hệ thống xóa sạch toàn bộ lịch sử tin nhắn trên khung chat, đồng thời hiển thị lại Khối hướng dẫn nhập liệu (Guide Text) và Khối Gợi ý Prompt mẫu như lúc mới vào. |
| **4** | **Khung hiển thị hội thoại** | Datatable / Area | - Hiển thị toàn bộ lịch sử tin nhắn giữa người dùng và AI theo thứ tự thời gian.<br>- **Quy tắc hiển thị:**<br>  + Tin nhắn của người dùng: Hiển thị nền màu xanh/xám, căn lề phải.<br>  + Tin nhắn của AI: Hiển thị nền màu sáng/trắng, căn lề trái.<br>  + Tự động cuộn màn hình xuống tin nhắn mới nhất mỗi khi có tin nhắn mới được gửi hoặc nhận.<br>  + Các luồng phản hồi từ AI tuân thủ chặt chẽ theo tài liệu BA Analysis (Xử lý từ chối ngoài lề, bổ sung thông tin, hỏi thêm tùy theo màn hình). |
| **5** | **Khối hướng dẫn nhập liệu**<br>(Guide Text) | Label | - Hiển thị văn bản hướng dẫn giúp người dùng định hình cách gõ prompt hiệu quả (Chỉ hiển thị ở giữa màn hình khi chưa có đoạn chat nào).<br>- **Nội dung hiển thị mặc định:**<br>  + **Tại màn hình Quản lý Kịch bản:** `"Hãy mô tả mục tiêu nuôi tài khoản của bạn. Ví dụ: Những hành động nào cần thực hiện (Like, Share, Comment), số lượng tối đa mỗi ngày, và khung giờ được phép hoạt động."`<br>  + **Tại màn hình Quản lý Tài khoản Ảo:** `"Bạn muốn gán kịch bản nào cho các tài khoản? Vui lòng mô tả số lượng tài khoản mục tiêu, tên kịch bản (hoặc mô tả hành động để tạo mới), và lịch trình chạy lặp lại trong tuần (Ví dụ: Thứ 2, Thứ 6 lúc 10h00)."`<br>- **Tính chất hiển thị:** Động (Dynamic - text hiển thị thay đổi tùy thuộc người dùng đang mở tính năng AI từ màn hình nào). |
| **6** | **Khối Gợi ý Prompt mẫu** | Tag Input / Button | - Cung cấp sẵn một danh sách các câu lệnh mẫu thường dùng để người dùng có thể click chọn nhanh.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn:** Khi người dùng click vào một thẻ prompt mẫu, hệ thống sẽ tự động sao chép toàn bộ văn bản của câu lệnh đó điền vào **Thanh gõ tin nhắn** để người dùng có thể tinh chỉnh lại trước khi bấm nút Gửi. |
| **7** | **Nhập yêu cầu...**<br>(Thanh gõ tin nhắn) | Textbox (Multi-line) | - Người dùng bắt buộc nhập vào yêu cầu (prompt) để tương tác với AI.<br>- **Placeholder:**<br>  + VI: Nhập yêu cầu của bạn...<br>  + EN: Enter your request...<br>- **Giá trị mặc định:** Trống<br>- **Giới hạn ký tự:** Tối đa 2000 ký tự.<br>- **Quy tắc Nghiệp vụ:**<br>  1. Tự động trim khoảng trắng ở đầu và cuối chuỗi trước khi gửi.<br>  2. Hỗ trợ thao tác phím: Nhấn `Enter` để gửi tin nhắn ngay lập tức, nhấn `Shift + Enter` để xuống dòng trong ô text.<br>- **Thông báo lỗi tương ứng:**<br>  + Trống và nhấn button Gửi (hoặc phím Enter): Không thực hiện gửi, giữ nguyên trạng thái ô nhập và vô hiệu hóa nút gửi. |
| **8** | **Nút Gửi**<br>(Send Icon) | Button | - Cho phép người dùng gửi tin nhắn (prompt) lên hệ thống AI.<br>- **Trạng thái mặc định:** Disabled (khi ô nhập liệu rỗng) / Enabled (khi ô nhập liệu có văn bản).<br>- **Hành vi khi nhấn (OnClick Event):**<br>  Khi nhấn vào sẽ kiểm tra nội dung text:<br>  + Nếu ô nhập trống: Không thực thi.<br>  + Nếu hợp lệ: Đẩy tin nhắn của người dùng lên màn hình hội thoại, xóa trắng thanh gõ tin nhắn, hiển thị trạng thái `AI đang gõ...` (Typing indicator) để chờ phản hồi.<br>  + Khi có phản hồi: Ẩn `AI đang gõ...` và hiển thị tin nhắn trả về của AI trên khung hội thoại. |
| **9** | **Nút [Execute]**<br>(Trong phản hồi AI) | Button | - Cho phép người dùng xác nhận đồng ý thực thi đề xuất do AI đưa ra (như tạo kịch bản mới, lưu lịch gán tài khoản). Chỉ hiển thị đính kèm dưới các tin nhắn đề xuất (Proposal) của AI.<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):**<br>  1. Chuyển nút sang trạng thái Loading (hiển thị spinner nhỏ, disable cả nút Execute và Từ chối).<br>  2. Gọi API để thực thi lưu dữ liệu tương ứng.<br>  3. Nếu thành công: Ẩn ngay lập tức cả hai nút [Execute] và [Từ chối] khỏi tin nhắn đó. AI sinh ra một tin nhắn mới phản hồi xác nhận thành công. Giao diện danh sách bên ngoài đồng thời được cập nhật dữ liệu mới.<br>  4. Nếu thất bại: Giữ nguyên các nút, hiển thị toast message màu đỏ `"Thực thi không thành công!"` (`"Execution failed!"`). |
| **10** | **Nút [Từ chối]**<br>(Trong phản hồi AI) | Button | - Cho phép người dùng từ chối đề xuất của AI nếu thấy thông tin chưa chính xác. Chỉ hiển thị đính kèm dưới các tin nhắn đề xuất (Proposal) của AI (cạnh nút Execute).<br>- **Trạng thái mặc định:** Enabled<br>- **Hành vi khi nhấn (OnClick Event):**<br>  1. Không gọi API xử lý hệ thống.<br>  2. Ẩn ngay lập tức cả hai nút [Execute] và [Từ chối] khỏi tin nhắn đó.<br>  3. Đẩy lên một tin nhắn mới của người dùng hiển thị nội dung: "Từ chối".<br>  4. AI phản hồi lại: `"Đã hủy bỏ hành động. Bạn cần tôi hỗ trợ điều chỉnh gì không?"`. |

---

## 3. PHÂN TÍCH CÁC TRƯỜNG HỢP PROMPT (USER INTENTS)

Phần này phân tích chi tiết các trường hợp khi người dùng tương tác với AI Agent. Mục tiêu là đảm bảo AI luôn phản hồi chính xác, điều hướng người dùng nhập đủ thông tin và từ chối các yêu cầu ngoài luồng.

### 3.1. Tại Màn hình Quản lý Kịch bản (Scenarios Agent)

**Mục tiêu của AI:** Hỗ trợ người dùng tạo ra các kịch bản hành động (cho Facebook) dựa trên ngôn ngữ tự nhiên. 

| STT | Tình huống / Intent người dùng | Ví dụ Prompt | Phản hồi / Xử lý của AI |
| :--- | :--- | :--- | :--- |
| **1.1** | **Tạo kịch bản đầy đủ thông tin** (Hành động, tần suất, giới hạn) | *"Tạo cho tôi kịch bản nuôi nick mới 7 ngày, mỗi ngày like 3 bài, share 1 bài, không hoạt động sau 22h"* | - **Đề xuất kịch bản:** AI phân tích và đưa ra bản Preview kịch bản (các hành động cụ thể từng loại).<br>- Kèm thông điệp: *"Tôi đã tạo xong kịch bản dựa trên yêu cầu của bạn. Bạn hãy xem qua các hành động bên dưới, nếu đồng ý vui lòng bấm Execute để lưu lại."* |
| **1.2** | **Tạo kịch bản nhưng thiếu/mơ hồ thông tin hành động** | *"Tạo kịch bản tương tác group cho tôi"* hoặc *"Làm sao để nick Facebook trust cao?"* | - **Hỏi thêm để làm rõ:** AI sẽ đưa ra các câu hỏi trắc nghiệm hoặc gợi ý để người dùng bổ sung.<br>- Ví dụ: *"Để tạo kịch bản tương tác Group hiệu quả, bạn muốn nick thực hiện các hành động nào sau đây: (1) Đăng bài vào group, (2) Bình luận dạo, hay (3) Cảm xúc bài viết? Mỗi ngày nên giới hạn bao nhiêu hành động để tránh bị khóa?"* |
| **1.3** | **Yêu cầu tạo kịch bản cho nền tảng khác (Không phải Facebook)** | *"Tạo kịch bản buff view Tiktok"* hoặc *"Nuôi 10 nick Zalo"* | - **Từ chối và điều hướng:** *"Hiện tại hệ thống chỉ đang hỗ trợ xây dựng kịch bản cho nền tảng Facebook. Bạn có muốn tôi giúp bạn tạo một kịch bản tương tác Facebook thay thế không?"* |
| **1.4** | **Yêu cầu ngoài lề (Out of scope) hoặc nhầm tính năng** | *"Gán kịch bản này cho 50 nick đi"* hoặc *"Thời tiết Hà Nội hôm nay sao?"* | - **Nhắc lại vai trò:** *"Tôi là Trợ lý AI hỗ trợ tạo kịch bản tương tác tài khoản mạng xã hội. Rất tiếc tôi không thể trả lời câu hỏi này hoặc thực hiện gán kịch bản. Bạn cần tôi hỗ trợ tạo kịch bản nào hôm nay?"* |

### 3.2. Tại Màn hình Quản lý Tài khoản Ảo (Accounts Agent)

**Mục tiêu của AI:** Hỗ trợ người dùng gán kịch bản (đã có hoặc tạo mới) cho một tập tài khoản mục tiêu, đồng thời thiết lập lịch chạy định kỳ theo các ngày trong tuần.
*Lưu ý cốt lõi:* Hệ thống hiện chỉ hỗ trợ lên lịch chạy lặp lại vô tận theo một thời điểm cố định của ngày trong tuần (VD: thứ 2, thứ 4, thứ 6 lúc 10h30), KHÔNG hỗ trợ giới hạn theo số ngày.

| STT | Tình huống / Intent người dùng | Ví dụ Prompt | Phản hồi / Xử lý của AI |
| :--- | :--- | :--- | :--- |
| **2.1** | **Yêu cầu gán kịch bản ĐÃ CÓ, đầy đủ thông tin** (Số lượng tài khoản, Tên kịch bản, Lịch chạy hợp lệ) | *"Gán kịch bản 'Seeding Group' cho 50 tài khoản, chạy lúc 8h sáng thứ 3 và thứ 5 hàng tuần."* | - **Xác nhận & Đề xuất Execute:** AI tóm tắt lại cấu hình gán.<br>- Thông điệp: *"Tôi đã chuẩn bị lệnh gán kịch bản 'Seeding Group' cho 50 tài khoản ảo, lịch chạy định kỳ vào 08:00 sáng Thứ 3, Thứ 5. Bạn vui lòng kiểm tra và bấm Execute để tiến hành."* |
| **2.2** | **Yêu cầu gán nhưng KHÔNG CHỈ ĐỊNH kịch bản nào** | *"Cho 100 nick đi comment dạo đi"* hoặc *"Nuôi 50 tài khoản giúp tôi"* | - **Hỏi thăm dò (Tạo mới hay Dùng cũ):** *"Bạn có muốn chỉ định một kịch bản cụ thể nào đã có trong hệ thống không? Hoặc nếu chưa có, bạn có thể mô tả chi tiết hơn các hành động để tôi tự động tạo kịch bản mới và gán cho 50 tài khoản này nhé."* |
| **2.3** | **Yêu cầu TẠO MỚI kịch bản VÀ GÁN LUÔN, đầy đủ thông tin** | *"Tạo cho tôi kịch bản đi like 3 bài mỗi ngày, không làm sau 23h. Gán kịch bản này cho 50 nick, chạy vào thứ 2, thứ 4 lúc 9h sáng."* | - **Đề xuất 2 bước (Tạo + Gán):** AI sinh ra cấu trúc kịch bản mới (gắn tag [AI Generated]) và cấu hình gán lịch.<br>- Thông điệp: *"Tôi đã thiết kế kịch bản mới theo yêu cầu của bạn. Kịch bản này sẽ được tạo mới và tự động gán cho 50 tài khoản vào 09:00 Thứ 2, Thứ 4 hàng tuần. Vui lòng xem trước cấu hình bên dưới và bấm Execute."* |
| **2.4** | **Yêu cầu thiết lập sai quy tắc Lịch chạy** (Chạy theo số ngày nhất định) | *"Gán kịch bản seeding cho 10 nick, chạy liên tục trong 10 ngày tới"* | - **Giải thích luật & Yêu cầu chọn lại ngày:** *"Hệ thống hiện tại chỉ hỗ trợ gán lịch chạy lặp lại liên tục theo các ngày trong tuần (Ví dụ: Thứ 2, Thứ 3, Thứ 4...). Bạn vui lòng chỉ định cụ thể bạn muốn kịch bản chạy vào các thứ mấy trong tuần và vào lúc mấy giờ nhé?"* |
| **2.5** | **Yêu cầu thiếu số lượng/đối tượng tài khoản** | *"Gán kịch bản seeding, chạy thứ 2, 4, 6"* | - **Yêu cầu bổ sung tài khoản mục tiêu:** *"Bạn muốn gán kịch bản này cho bao nhiêu tài khoản (hoặc nhóm tài khoản nào)? Vui lòng cung cấp thêm số lượng nhé."* |
| **2.6** | **Yêu cầu ngoài lề (Out of scope)** | *"Làm sao để kháng tài khoản bị khóa?"* | - **Nhắc lại vai trò:** *"Tôi là Trợ lý AI hỗ trợ phân bổ và gán lịch kịch bản cho các tài khoản ảo trên hệ thống. Rất tiếc tôi không thể trả lời câu hỏi này. Bạn có muốn tiến hành gán kịch bản cho tài khoản nào không?"* |
