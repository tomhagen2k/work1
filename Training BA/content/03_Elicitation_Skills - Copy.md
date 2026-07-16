# Bài 3: Kỹ năng Khai thác và Lấy Yêu cầu (Elicitation Skills)

> Kỹ năng soạn thảo tài liệu (SRS/User Story) là bước hệ thống hóa thông tin. Tuy nhiên, để xây dựng được hệ thống tài liệu chính xác, Business Analyst cần trang bị kỹ năng khai thác và thu thập yêu cầu từ phía khách hàng. Bài học này tập trung vào các phương pháp tiếp cận và kỹ thuật đặt câu hỏi chuyên sâu, giúp BA xác định chính xác nhu cầu thực tế của doanh nghiệp thay vì chỉ tiếp nhận thông tin thụ động.

## 1. Tư duy cốt lõi trong Phân tích yêu cầu

Nhiệm vụ trọng tâm của BA trong quá trình thu thập yêu cầu là phân định rõ ràng giữa hai khái niệm:
- **Want (Điều khách hàng muốn / Giải pháp bề mặt):** Đây thường là giải pháp do khách hàng tự đề xuất dựa trên góc nhìn chủ quan, đôi khi chưa tối ưu về mặt hệ thống hoặc phi thực tế. *(Ví dụ: "Tôi muốn một nút bấm màu đỏ nhấp nháy liên tục trên màn hình để báo động").*
- **Need (Điều hệ thống thực sự cần / Vấn đề gốc rễ):** Là nguyên nhân thực sự hoặc nhu cầu cốt lõi dẫn đến yêu cầu trên. *(Ví dụ: Phân tích nguyên nhân cho thấy nhân viên thường xuyên bỏ lỡ các thông báo quan trọng. Việc tạo nút nhấp nháy chỉ là giải pháp bề mặt; BA có thể đề xuất giải pháp tối ưu hơn như "Gửi thông báo đẩy - Push Notification trực tiếp đến thiết bị di động").*

**Nguyên tắc chuyên môn:** BA cần ghi nhận các "Want" của khách hàng với thái độ tôn trọng, nhưng không được trực tiếp chuyển hóa chúng thành tài liệu kỹ thuật ngay lập tức. BA phải thực hiện quy trình phân tích và đặt câu hỏi để tìm ra "Need" thực sự.

---

## 2. Các kỹ thuật Khai thác yêu cầu phổ biến (Elicitation Techniques)

Tùy thuộc vào đặc thù dự án, BA nên linh hoạt kết hợp các kỹ thuật sau để tối ưu hóa quá trình thu thập thông tin:
1. **Phỏng vấn trực tiếp (Interviews):** Trao đổi 1-1 hoặc theo nhóm với người dùng hệ thống (End-user) và các bên liên quan (Stakeholder). Kỹ thuật này mang lại lượng thông tin chi tiết nhất nhưng đòi hỏi kỹ năng giao tiếp và điều phối tốt.
2. **Quan sát thực địa (Observation/Job Shadowing):** Quan sát trực tiếp cách người dùng thực hiện các nghiệp vụ hàng ngày. Phương pháp này đặc biệt hiệu quả đối với các quy trình phức tạp mà khách hàng khó có thể diễn đạt đầy đủ bằng lời nói.
3. **Phân tích tài liệu (Document Analysis):** Nghiên cứu các biểu mẫu, quy trình tiêu chuẩn (SOP), tài liệu ISO hoặc hệ thống báo cáo hiện tại của tổ chức trước khi tiến hành phỏng vấn, giúp BA nắm bắt bối cảnh nghiệp vụ một cách tổng quan.

---

## 3. Các Phương pháp Đặt câu hỏi Chuyên sâu

Để đảm bảo thu thập thông tin đầy đủ và đa chiều, BA nên ứng dụng các khung tư duy sau trong quá trình phỏng vấn.

### 3.1. Khung tư duy 5W1H (Khai thác bức tranh tổng thể)
Áp dụng 5W1H giúp BA định hình rõ ràng ranh giới và đặc tính của một tính năng mới:
- **Who:** Những nhóm người dùng nào sẽ thao tác với tính năng này? Ai nắm quyền phê duyệt cuối cùng?
- **What:** Chức năng cụ thể của hệ thống là gì? Dữ liệu đầu vào (Input) và dữ liệu đầu ra (Output) gồm những gì?
- **When:** Hệ thống sẽ kích hoạt tính năng này vào thời điểm nào? (Thao tác thủ công hay quy trình chạy ngầm định kỳ?).
- **Where:** Tính năng này được bố trí ở phân hệ nào? Trên nền tảng Web hay Mobile App?
- **Why:** Tại sao doanh nghiệp cần tính năng này? Giá trị nghiệp vụ mang lại là gì? (Câu hỏi then chốt để xác định "Need").
- **How:** Luồng thao tác cụ thể diễn ra như thế nào? Cách hệ thống xử lý các trường hợp ngoại lệ (Edge cases) ra sao?

### 3.2. Kỹ thuật "5 Whys" (Xác định nguyên nhân gốc rễ - Root Cause)
Khi tiếp nhận một vấn đề, BA cần liên tục đặt câu hỏi "Tại sao?" (thường khoảng 5 lần) để bóc tách các tầng thông tin bề mặt và tìm ra nguyên nhân cốt lõi.
*Ví dụ thực tế:*
- *Khách hàng:* "Tôi yêu cầu hệ thống tự động xuất báo cáo lỗi dưới định dạng Excel định kỳ 60 phút một lần." *(Want)*
- *BA (Why 1):* "Tại sao bộ phận vận hành lại cần cập nhật báo cáo với tần suất cao như vậy?"
- *Khách hàng:* "Vì dạo này máy chủ (server) thường xuyên gặp sự cố mất kết nối, chúng tôi cần kiểm tra liên tục."
- *BA (Why 2):* "Tại sao khi máy chủ gặp sự cố, nhân sự lại phải mở file Excel ra để kiểm tra thay vì nhận thông báo trực tiếp?"
- *Khách hàng:* "Vì chúng tôi không có hệ thống cảnh báo tức thời, phải mở Excel ra mới thấy danh sách lỗi được hệ thống ghi nhận lại."
- *BA (Giải pháp cốt lõi - Need):* "Như vậy, vấn đề trọng tâm là bộ phận vận hành cần hệ thống Cảnh báo tức thời (Real-time Alert). Thay vì xây dựng tính năng xuất Excel định kỳ, tôi đề xuất thiết lập hệ thống tự động gửi cảnh báo sự cố qua kênh Telegram hoặc Email cho nhóm vận hành ngay khi phát sinh lỗi. Giải pháp này có đáp ứng đúng nhu cầu của bộ phận không?" -> *Khách hàng đồng ý.*

---

## 4. Case Study Thực tế: Kịch bản Phỏng vấn nghiệp vụ

Ví dụ dưới đây phân tích sự khác biệt trong cách tiếp cận yêu cầu của một BA thiếu kinh nghiệm và một BA chuyên nghiệp khi nhận dự án: **"Xây dựng phân hệ Quản lý nghỉ phép"**.

**Kịch bản 1: BA Thiếu kinh nghiệm (Tiếp nhận thông tin thụ động)**
- *Khách hàng:* "Quy trình xin nghỉ phép bằng giấy tờ hiện tại rất tốn thời gian. Chúng tôi cần một màn hình để nhân viên chọn ngày nghỉ, nhập lý do và bấm nút Gửi để quản lý duyệt."
- *BA Thiếu kinh nghiệm:* "Vâng, hệ thống sẽ thiết kế màn hình bao gồm ô chọn ngày, lý do và nút Gửi. Sau khi nhân viên thao tác, hệ thống sẽ gửi thông báo đến cấp quản lý để phê duyệt."
- *Khách hàng:* "Đúng như vậy, bạn tiến hành thiết kế đi."
*(Hệ quả: Tài liệu phân tích thiếu hụt trầm trọng các luồng nghiệp vụ thực tế. Khi đưa vào vận hành, hệ thống gặp sự cố do không có luồng tính toán số ngày phép còn lại, không hỗ trợ chế độ nghỉ nửa ngày, và thiếu quy trình từ chối đơn.)*

**Kịch bản 2: BA Chuyên nghiệp (Áp dụng 5W1H và Khai thác luồng ngoại lệ)**
- *Khách hàng:* "Quy trình xin nghỉ phép bằng giấy tờ hiện tại rất tốn thời gian. Chúng tôi cần một màn hình..."
- *BA Chuyên nghiệp:* "Tôi đã hiểu yêu cầu. Việc số hóa quy trình này sẽ giúp tối ưu hóa thời gian xử lý. Để đảm bảo phần mềm vận hành sát với quy định hiện hành của công ty, anh/chị vui lòng làm rõ thêm một số khía cạnh sau:
  1. **(Who / Luồng phê duyệt):** Theo quy trình hiện tại, ngoài Giám đốc phê duyệt cuối cùng, Quản lý trực tiếp (Line Manager) có cần tham gia vào luồng duyệt cấp 1 không? Trong trường hợp Line Manager vắng mặt, hệ thống sẽ ủy quyền phê duyệt cho ai?
  2. **(What / Ràng buộc dữ liệu):** Hạn mức ngày phép tiêu chuẩn của một nhân viên trong năm là bao nhiêu? Nếu nhân viên có nhu cầu nghỉ nửa ngày, hệ thống nên thiết kế theo block (Sáng/Chiều) hay tính theo tổng số giờ?
  3. **(How / Luồng ngoại lệ):** Khi cấp quản lý thao tác "Từ chối" đơn nghỉ phép, quy trình có bắt buộc nhập lý do từ chối để phản hồi lại cho nhân viên không?
  4. **(When / Xử lý dữ liệu):** Ngay sau khi đơn được phê duyệt thành công, hệ thống có tiến hành trừ quỹ ngày phép của nhân viên ngay lập tức hay đợi đến kỳ chốt công cuối tháng?
- *Khách hàng:* "Đó là những điểm rất chính xác. Theo quy định thì Line Manager bắt buộc phải duyệt trước..."
*(Kết quả: Yêu cầu nghiệp vụ được làm rõ toàn diện, các luồng ngoại lệ (Edge Cases) được kiểm soát chặt chẽ ngay từ khâu phỏng vấn ban đầu.)*

---

## 5. Bài tập & Tự nghiên cứu

> Giao tiếp và kỹ năng khai thác thông tin yêu cầu quá trình thực hành liên tục. Việc áp dụng các khung tư duy phân tích vào tình huống thực tế là cơ sở để hoàn thiện năng lực chuyên môn của BA.

### 5.1. Câu hỏi lý thuyết (Tự nghiên cứu)
1. Trong phương pháp **Phân tích tài liệu (Document Analysis)**, nếu khách hàng cung cấp một biểu mẫu Excel đang được sử dụng trong vận hành thực tế, trong đó có một cột dữ liệu tên là "Ghi chú khác", bạn sẽ có phương án xử lý trường dữ liệu này như thế nào khi chuyển đổi quy trình lên phần mềm để đảm bảo tính chuẩn hóa dữ liệu?
2. Hãy tìm hiểu khái niệm **"Các bên liên quan" (Stakeholders)**. Trong quá trình thu thập yêu cầu, nếu hai Stakeholder đưa ra hai yêu cầu trái ngược nhau (Conflict of Interest) đối với cùng một tính năng hệ thống, BA nên thực hiện các bước nào để giải quyết xung đột này?

### 5.2. Bài tập tình huống thực hành (Role-play)

**Bối cảnh dự án:**
Bạn đảm nhiệm vai trò BA cho dự án phát triển Hệ thống **"Quản lý Tài sản & Thiết bị IT"** nội bộ. Đại diện bộ phận Hành chính đưa ra yêu cầu sơ bộ như sau:
*"Hiện tại quy trình cấp phát thiết bị của công ty đang quản lý thủ công qua các file Excel rời rạc. Chúng tôi cần một phân hệ để nhân viên có thể tạo yêu cầu xin cấp phát thiết bị (như laptop, màn hình, chuột) trong trường hợp thiết bị cũ bị hỏng hoặc khi có nhân sự mới gia nhập (Onboarding). Hệ thống cần cho phép quản lý theo dõi được thiết bị nào đang giao cho ai, và số lượng thiết bị tồn kho hiện tại còn bao nhiêu."*

**Yêu cầu dành cho học viên:**
Bạn cần chuẩn bị **Bộ câu hỏi phỏng vấn** chi tiết để trao đổi với bộ phận Hành chính, nhằm làm rõ toàn bộ quy trình và logic của phân hệ này trước khi tiến hành viết tài liệu đặc tả.
1. Hãy liệt kê ít nhất **5 câu hỏi chuyên sâu** (Áp dụng khung 5W1H) mà bạn dự định sẽ trao đổi với khách hàng. *(Gợi ý: Cần làm rõ quy trình phê duyệt nhiều cấp, quy trình kiểm tra tồn kho, và luồng thu hồi thiết bị hỏng).*
2. Chỉ ra **ít nhất 2 luồng ngoại lệ (Edge Cases)** có thể phát sinh trong quá trình vận hành thực tế đối với quy trình cấp phát thiết bị này.
3. *Thực hành mô phỏng (Role-play):* Hãy sử dụng bộ câu hỏi vừa chuẩn bị để thực hiện phỏng vấn giả lập với Mentor của bạn (Mentor sẽ đóng vai đại diện bộ phận Hành chính).

