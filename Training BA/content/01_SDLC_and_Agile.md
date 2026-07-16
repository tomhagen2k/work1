# Bài 1: Vòng Đời Phát Triển Phần Mềm (SDLC) & Phương Pháp Luận

> [!NOTE]
> Bài học đầu tiên cung cấp cái nhìn tổng quan về quy trình phát triển phần mềm. Việc hiểu rõ quy trình giúp định hình cách thức các bộ phận (BA, Developer, Tester) phối hợp làm việc, đồng thời xác định rõ vị trí, vai trò và trách nhiệm của Business Analyst (BA) trong từng giai đoạn.

## 1. SDLC (Software Development Life Cycle) là gì?
Vòng đời phát triển phần mềm (SDLC) là quy trình tiêu chuẩn được các tổ chức công nghệ áp dụng để thiết kế, phát triển và kiểm thử phần mềm chất lượng cao. Bất kể sử dụng phương pháp luận nào, một quy trình phát triển phần mềm nhìn chung đều trải qua 5 giai đoạn cốt lõi:

1. **Khảo sát & Phân tích yêu cầu (Requirement Analysis):** Tìm hiểu vấn đề của khách hàng và xác định hệ thống cần những chức năng gì để giải quyết vấn đề đó. (Đây là giai đoạn trọng tâm của BA).
2. **Thiết kế (Design):** Thiết kế giao diện người dùng (UI/UX), kiến trúc hệ thống và cơ sở dữ liệu.
3. **Lập trình (Coding/Implementation):** Đội ngũ phát triển (Developer) viết mã nguồn để xây dựng các chức năng theo tài liệu thiết kế.
4. **Kiểm thử (Testing):** Đội ngũ Đảm bảo chất lượng (QA/Tester) kiểm tra hệ thống để phát hiện lỗi (Bug) và đối chiếu tính đúng đắn so với yêu cầu ban đầu.
5. **Triển khai & Bảo trì (Deployment & Maintenance):** Đưa phần mềm vào môi trường thực tế cho người dùng và tiến hành bảo trì, cập nhật khi cần thiết.

Hiện nay, có 2 mô hình quản lý dự án phổ biến nhất là **Thác nước (Waterfall)** và **Agile (Nổi bật nhất là Scrum)**. 

---

## 2. Mô hình Thác nước (Waterfall)

### 2.1. Khái niệm và Cách vận hành
Mô hình Thác nước hoạt động theo nguyên tắc tuần tự nghiêm ngặt. Mỗi giai đoạn trong quy trình SDLC phải được hoàn thành và nghiệm thu 100% trước khi chuyển sang giai đoạn tiếp theo. Đặc điểm cốt lõi của mô hình này là hạn chế tối đa việc quay lại các giai đoạn trước đó để chỉnh sửa.

### 2.2. Phân tích Ưu điểm và Nhược điểm
- **Ưu điểm:**
  - Kế hoạch rõ ràng, dễ quản lý: Do toàn bộ yêu cầu được xác định và phê duyệt ngay từ đầu, dự án dễ dàng ước lượng được chi phí, nguồn lực và thời gian hoàn thành.
  - Tài liệu đầy đủ: Hệ thống tài liệu phân tích và thiết kế được soạn thảo cực kỳ chi tiết, giúp dự án ít bị ảnh hưởng khi có sự biến động về nhân sự.
- **Nhược điểm:**
  - **Hạn chế trong việc tiếp nhận thay đổi:** Việc thay đổi yêu cầu ở giai đoạn muộn (như khi đang lập trình hoặc kiểm thử) sẽ làm gián đoạn quy trình, tiêu tốn rất nhiều thời gian và chi phí để thực hiện lại các bước phân tích, thiết kế.
  - **Phát hiện lỗi muộn:** Do giai đoạn kiểm thử nằm ở cuối chu kỳ, các lỗi liên quan đến logic hệ thống hoặc kiến trúc cốt lõi thường được phát hiện rất muộn, gây rủi ro lớn cho tiến độ.

### 2.3. Ví dụ thực tế & Vai trò chi tiết của BA
*📌 **Ví dụ:** Dự án xây dựng Hệ thống Quản lý Bệnh viện (Dự án dài hạn).*

- **Giai đoạn 1 (Phân tích yêu cầu):** 
  - *Công việc của BA:* Đây là giai đoạn BA tập trung cao độ nhất. BA tiến hành phỏng vấn Ban Giám đốc, Bác sĩ, Y tá để thu thập toàn bộ quy trình khám chữa bệnh. 
  - *Kết quả:* BA hoàn thiện cuốn tài liệu Đặc tả Yêu cầu Hệ thống (SRS/FRD) dài hàng trăm trang. Sau khi tài liệu này được các bên ký duyệt, phạm vi dự án (Scope) sẽ được đóng băng.
- **Giai đoạn 2 (Thiết kế):**
  - *Công việc của BA:* BA bàn giao tài liệu SRS cho bộ phận Thiết kế và Kiến trúc hệ thống, đồng thời hỗ trợ giải thích các luồng nghiệp vụ phức tạp nếu bộ phận thiết kế có thắc mắc.
- **Giai đoạn 3 (Lập trình):**
  - *Công việc của BA:* Đội ngũ Developer dựa hoàn toàn vào tài liệu SRS để lập trình. Vai trò của BA lúc này chuyển sang giám sát tiến độ và giải đáp các câu hỏi làm rõ logic. Nếu phát sinh yêu cầu thay đổi từ khách hàng, BA phải thực hiện quy trình Kiểm soát thay đổi (Change Request) phức tạp và phải được phê duyệt trước khi Dev tiến hành sửa code.
- **Giai đoạn 4 (Kiểm thử):**
  - *Công việc của BA:* BA tham gia cùng Tester trong quá trình Nghiệm thu người dùng (UAT). Nếu phát hiện yêu cầu phân tích sai từ Giai đoạn 1, việc khắc phục ở thời điểm này sẽ gây ảnh hưởng nghiêm trọng đến ngân sách và thời hạn dự án.

---

## 3. Mô hình Agile (Đặc thù là Scrum)

### 3.1. Khái niệm và Cách vận hành
Agile là phương pháp tiếp cận linh hoạt, tập trung vào việc chuyển giao giá trị liên tục cho khách hàng. Thay vì xây dựng toàn bộ dự án trong thời gian dài, Agile chia nhỏ dự án thành các phân hệ chức năng và phát triển lặp đi lặp lại qua các chu kỳ ngắn (từ 1 đến 4 tuần) – gọi là các **Sprint**. Kết thúc mỗi Sprint, một phần của sản phẩm (có khả năng hoạt động được) sẽ được chuyển giao để thu thập phản hồi.

### 3.2. Phân tích Ưu điểm và Nhược điểm
- **Ưu điểm:**
  - Vòng lặp phản hồi ngắn: Khách hàng được trải nghiệm sản phẩm sớm và liên tục, giúp định hướng sản phẩm bám sát nhu cầu thực tế.
  - Khả năng thích ứng cao: Dễ dàng tiếp nhận các yêu cầu thay đổi hoặc bổ sung tính năng mới ở các Sprint tiếp theo.
- **Nhược điểm:**
  - Khó xác định tổng chi phí và thời gian chính xác ngay từ đầu do phạm vi công việc có thể thay đổi liên tục.
  - Rủi ro trượt phạm vi dự án (Scope creep) rất cao nếu tính năng không được quản lý và sắp xếp mức độ ưu tiên chặt chẽ.

### 3.3. Các đặc điểm cốt lõi của Scrum
Scrum là một khung làm việc (Framework) phổ biến nhất của Agile, bao gồm 3 Vai trò và 4 Cuộc họp tiêu chuẩn:

**👥 3 Vai trò (Roles):**
1. **Product Owner (PO):** Người đại diện cho tiếng nói của khách hàng và doanh nghiệp. Trách nhiệm chính là tối ưu hóa giá trị sản phẩm và quyết định thứ tự ưu tiên của các tính năng cần phát triển (Quản lý Product Backlog).
2. **Scrum Master (SM):** Người điều phối, đảm bảo nhóm làm việc tuân thủ các nguyên tắc của Scrum. SM có nhiệm vụ loại bỏ các trở ngại (blockers) để đội ngũ phát triển làm việc hiệu quả.
3. **Development Team:** Nhóm phát triển tự quản lý (bao gồm Developer, Tester, Designer). Họ cùng nhau ước lượng khối lượng công việc và thực hiện chuyển đổi yêu cầu thành phần mềm thực tế.

**🗣️ 4 Cuộc họp tiêu chuẩn (Ceremonies):**
> *Lưu ý: Các cuộc họp trong Scrum đều có khung thời gian cố định (Time-box) để đảm bảo tính hiệu quả.*

1. **Sprint Planning (Họp Lập kế hoạch Sprint):**
  - *Thời gian:* Đầu mỗi Sprint. 
  - *Mục đích:* PO trình bày các tính năng có độ ưu tiên cao nhất. Development Team đánh giá năng lực và chọn ra các tính năng họ cam kết hoàn thành trong Sprint, từ đó thống nhất Mục tiêu của Sprint (Sprint Goal).
2. **Daily Standup (Họp giao ban hàng ngày):**
  - *Thời gian:* Cố định mỗi ngày, tối đa 15 phút.
  - *Mục đích:* Đồng bộ tiến độ làm việc trong nhóm. Mỗi thành viên lần lượt trả lời 3 câu hỏi: (1) Hôm qua đã hoàn thành việc gì? (2) Hôm nay sẽ làm việc gì? (3) Có đang gặp trở ngại nào không?
3. **Sprint Review (Họp Sơ kết Sprint):**
  - *Thời gian:* Cuối Sprint.
  - *Mục đích:* Đội ngũ trình bày và trình diễn (Demo) các tính năng đã hoàn thành trong Sprint cho PO và các bên liên quan. Khách hàng sử dụng thử và đưa ra các phản hồi trực tiếp để hoàn thiện sản phẩm.
4. **Sprint Retrospective (Họp Rút kinh nghiệm):**
  - *Thời gian:* Sau buổi Sprint Review, chỉ diễn ra trong nội bộ nhóm Scrum.
  - *Mục đích:* Đánh giá lại quá trình làm việc trong Sprint vừa qua. Phân tích các điểm làm tốt, các điểm cần cải thiện (về quy trình, giao tiếp, kỹ thuật) và đề xuất hành động khắc phục cụ thể cho Sprint tiếp theo.

### 3.4. Ví dụ thực tế & Vai trò chi tiết của BA
*(Trong khung làm việc Scrum tiêu chuẩn không có chức danh BA. Tuy nhiên trong thực tế, BA thường đảm nhiệm vai trò Proxy-PO (Hỗ trợ PO) hoặc là một thành viên phân tích nghiệp vụ nằm trong Development Team).*

*📌 **Ví dụ:** Dự án xây dựng Ứng dụng Giao đồ ăn (Food Delivery App).*

- **Giai đoạn Khởi tạo:** 
  - *Công việc của BA:* Thay vì soạn thảo một tài liệu SRS khổng lồ, BA phối hợp cùng PO xây dựng **Product Backlog** (Danh sách tính năng sản phẩm). Các yêu cầu được viết ngắn gọn dưới dạng **User Story** (Câu chuyện người dùng), ví dụ: *"Đăng nhập", "Hiển thị thực đơn", "Đặt hàng"*.
- **Quá trình Làm mịn yêu cầu (Backlog Refinement/Grooming):** 
  - *Công việc của BA:* Trước thềm Sprint Planning, BA tổ chức các buổi trao đổi với Development Team để làm rõ nghiệp vụ cho từng User Story. BA liệt kê chi tiết các Tiêu chí chấp nhận (Acceptance Criteria) để Dev hiểu rõ cần lập trình những gì.
- **Trong quá trình diễn ra Sprint (Ví dụ Sprint 1 tập trung làm tính năng Đăng nhập):**
  - *Công việc của BA:* Tương tác và làm việc trực tiếp với đội ngũ Lập trình và Kiểm thử mỗi ngày. Khi Developer có thắc mắc về logic xử lý ngoại lệ (như sai mật khẩu, tài khoản bị khóa), BA có trách nhiệm giải đáp và đưa ra quyết định nhanh chóng.
- **Tại buổi Sprint Review:**
  - *Công việc của BA:* BA ghi nhận phản hồi của người dùng cuối (ví dụ: Tài xế giao hàng) khi họ sử dụng thử ứng dụng.
  - *Xử lý tình huống:* Tài xế phàn nàn rằng nút "Nhận đơn" có màu sắc độ tương phản kém, khó nhìn thấy khi hoạt động ngoài trời nắng. Nhờ tính linh hoạt của Agile, BA ngay lập tức ghi nhận phản hồi này, tạo một User Story mới: *"Thay đổi màu sắc nút Nhận đơn để tăng độ tương phản"*, và đề xuất đưa vào Backlog để ưu tiên xử lý ngay trong Sprint 2.

---

## 4. Bài tập & Tự nghiên cứu

> [!IMPORTANT]
> Phần nội dung dưới đây yêu cầu bạn phải sử dụng kiến thức vừa học, kết hợp với việc tự tra cứu tài liệu (Google, AI) để rèn luyện tư duy tự học - kỹ năng sống còn của một BA.

### 4.1. Câu hỏi tự nghiên cứu (Research)
1. Trong lý thuyết quản lý dự án, sự khác biệt cốt lõi giữa **Agile** và **Scrum** là gì? *(Gợi ý: Tìm hiểu khái niệm "Tư duy/Triết lý" so với "Khung làm việc").*
2. Ngoài Scrum, phương pháp Agile còn có những khung làm việc (Framework) nào khác phổ biến? Hãy tìm hiểu về **Kanban** và chỉ ra 2 điểm khác biệt lớn nhất giữa Kanban và Scrum.
3. **Xử lý tình huống:** Giả sử đội ngũ Phát triển đang ở ngày thứ 5 của một Sprint kéo dài 2 tuần. Đột nhiên khách hàng yêu cầu Product Owner (PO) phải bổ sung ngay lập tức một tính năng thanh toán khẩn cấp vào Sprint hiện tại. Theo nguyên tắc chuẩn của Scrum, PO và Scrum Master nên xử lý tình huống này như thế nào?

### 4.2. Bài tập phân tích tình huống (Case Study)
Công ty của bạn vừa trúng thầu dự án xây dựng hệ thống **"Chấm công nhận diện khuôn mặt kết hợp AI"** cho một tập đoàn sản xuất có quy mô 50.000 công nhân. 

Qua buổi làm việc ban đầu, bạn thu thập được các thông tin sau:
- Khách hàng yêu cầu bắt buộc phải hoàn thành và triển khai toàn bộ hệ thống trong đúng **6 tháng**, không được trễ hẹn.
- Ngân sách dự án bị giới hạn nghiêm ngặt, tuyệt đối không được phép vượt chi.
- Tuy nhiên, khách hàng hiện tại chưa có quy trình chấm công AI chuẩn xác. Họ muốn "vừa làm vừa điều chỉnh quy trình" dựa trên thực tế chạy thử nghiệm tại một vài phân xưởng.

**Yêu cầu:**
Đứng ở vai trò là một BA Tư vấn (Consultant), bạn sẽ đề xuất công ty sử dụng mô hình **Waterfall** hay **Agile (Scrum)** cho dự án này? Hãy lập luận chi tiết để bảo vệ quan điểm của bạn, đồng thời chỉ ra những rủi ro có thể gặp phải với mô hình bạn đã chọn và cách phòng tránh.

<!-- GÓC DÀNH CHO MENTOR (XÓA PHẦN NÀY TRƯỚC KHI GỬI CHO HỌC VIÊN) -->
> [!CAUTION]
> **TÀI LIỆU NỘI BỘ DÀNH CHO MENTOR (HƯỚNG DẪN ĐÁNH GIÁ ĐÁP ÁN):**
> 
> **Phần 4.1: Câu hỏi lý thuyết**
> 1. **Agile vs Scrum:** Agile là một *Tư duy/Triết lý* (Mindset/Philosophy) cốt lõi dựa trên các tuyên ngôn định hướng. Scrum là một *Khung làm việc thực thi cụ thể* (Framework) cung cấp các quy tắc, vai trò (PO, SM, Dev) và quy trình (Sprint) để hiện thực hóa triết lý Agile.
> 2. **Kanban:** Cũng là một khung làm việc Agile. Khác biệt lớn nhất: (1) Scrum đóng gói công việc theo các phân đoạn thời gian cố định (Sprint 1-4 tuần), Kanban xử lý theo luồng công việc liên tục không ngắt quãng (Continuous Flow). (2) Scrum có quy định chặt chẽ về chức danh (PO, SM), Kanban không bắt buộc thay đổi chức danh hiện hành của tổ chức.
> 3. **Xử lý tình huống Sprint bị can thiệp:** Theo nguyên tắc Scrum tiêu chuẩn, không được phép thay đổi Mục tiêu (Sprint Goal) khi Sprint đang diễn ra. Do đó, Scrum Master phải đứng ra bảo vệ Development Team. PO có trách nhiệm đàm phán với khách hàng, thuyết phục họ đưa tính năng khẩn cấp đó lên vị trí ưu tiên cao nhất trong **Sprint Backlog của Sprint TIẾP THEO**, thay vì nhồi nhét phá vỡ cấu trúc Sprint hiện hành. (Chỉ hủy Sprint hiện tại nếu Mục tiêu Sprint đã hoàn toàn vô giá trị).
> 
> **Phần 4.2: Bài tập phân tích tình huống (Case Study)**
> *Lưu ý: Không có đáp án đúng/sai tuyệt đối, Mentor chấm điểm dựa trên sự logic trong lập luận của học viên.*
> - **Đề xuất tối ưu:** Lựa chọn **Agile (Scrum)** hoặc mô hình lai (Hybrid).
> - **Lập luận bảo vệ:** Dù dự án bị khóa cứng ngân sách và thời hạn 6 tháng (thường là môi trường ưu tiên Waterfall), nhưng yêu cầu cốt lõi về AI lại biến động cao: *"chưa có quy trình chuẩn, vừa làm vừa điều chỉnh"*. Nếu dùng Waterfall, toàn bộ hệ thống sẽ đóng băng thiết kế, dẫn đến rủi ro sụp đổ ở khâu Nghiệm thu (UAT) do hệ thống không khớp với thực tế vận hành xưởng. Agile cho phép triển khai sớm một phiên bản thử nghiệm tại 1 phân xưởng để tinh chỉnh model AI kịp thời.
> - **Rủi ro & Phòng tránh:** Nhược điểm chí mạng của Agile trong dự án fix ngân sách/thời gian là Tràn phạm vi (Scope Creep). Cách phòng tránh: PO phải cực kỳ cứng rắn áp dụng quy tắc Time-box và Budget-box, sẵn sàng hi sinh các tính năng "Nice-to-have" để đảm bảo các tính năng "Must-have" (chấm công khuôn mặt) lên sóng thành công đúng ngày hạn định.
<!-- KẾT THÚC PHẦN CỦA MENTOR -->
