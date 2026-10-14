Tôi có một tính năng mới cần viết tài liệu đặc tả SRS hoàn chỉnh gồm đủ 5 mục:
1. Thông tin chung chức năng
2. Ma trận phân quyền
3. Biểu đồ luồng xử lý
4. Thiết kế UI và đặc tả chi tiết components
5. Quy tắc nghiệp vụ chuyên sâu

THÔNG TIN TÍNH NĂNG:
- Mã tính năng: SOAR_ALERT_AI_FEEDBACK_01
- Tên tính năng: Báo cáo & Phản hồi kết quả đánh giá AI trong Chi tiết Cảnh báo (Report & Feedback AI Alert Verdict)
- Mục đích: Cho phép chuyên viên phân tích an ninh (Security Analyst / SOC Team) phản hồi và báo cáo khi mô hình AI phân loại sai nhãn cảnh báo (Cảnh báo thật / Cảnh báo giả), đồng thời cho phép hủy báo cáo khi cần, ghi vết kiểm toán minh bạch và tích lũy tập dữ liệu gán nhãn thực tế (Ground Truth) phục vụ quy trình đánh giá chất lượng và tái huấn luyện mô hình AI (Model Retraining).

Nghiệp vụ chi tiết:
Tính năng được triển khai trực tiếp tại Drawer xem chi tiết cảnh báo (Alert Detail Drawer) trong phân hệ Quản lý Cảnh báo (SOAR Alerts Management) tại file mockup `E:\work1\SOAR\training\soar_model_management.html`. Chi tiết hành vi nghiệp vụ và giao diện gồm các phần sau:

1. Trạng thái ban đầu của Tag kết quả AI (Chưa báo cáo - Unreported State):
   - Vị trí: Nằm trên thanh Tags Header của Drawer chi tiết cảnh báo, bên cạnh Tag Mức độ nghiêm trọng (Severity), Trạng thái xử lý (Status) và Sự việc liên kết (Case).
   - Hiển thị nhãn kết quả AI: Tag hiển thị biểu tượng hình vuông ■ kèm tỷ lệ % và kết luận đánh giá của AI (ví dụ: ■ 100% Cảnh báo thật màu đỏ crit, hoặc ■ 92% Cảnh báo giả màu xanh lá).
   - Nút hành động "Báo cáo": Nằm liền kề bên trong tag (gồm icon lá cờ/báo cáo và chữ "Báo cáo"), tooltip: "Báo cáo kết quả AI đánh giá chưa đúng".
   - Ràng buộc hiển thị [BR-01]: Nút "Báo cáo" chỉ hiển thị khi cảnh báo đã có kết quả phán định từ AI (kết quả khác "Chưa có kết quả AI").
   - Hành vi khi click: Mở popup modal "Phản hồi kết quả đánh giá AI".
   - Ảnh giao diện tham chiếu: `E:\work1\Docs\images_ai_feedback\01_ai_tag_initial_unreported.png`

2. Popup Modal "Phản hồi kết quả đánh giá AI" (Feedback Modal):
   - Tiêu đề modal: "Phản hồi kết quả đánh giá AI", có nút đóng [✕] ở góc phải trên.
   - Khung đối soát kết quả (Read-only, nền xám mờ bo góc):
     + Dòng 1 - Kết quả AI đánh giá: Hiển thị nhãn chỉ đọc thể hiện kết quả gốc của AI (ví dụ: Cảnh báo thật (100%)).
     + Dòng 2 - Kết quả người dùng đánh giá: Hiển thị nhãn chỉ đọc thể hiện kết luận đúng từ chuyên viên (tự động suy diễn nghịch đảo: nếu AI đánh giá là Cảnh báo thật thì người dùng phản hồi là Cảnh báo giả, và ngược lại).
   - Trường nhập liệu "Lý do" (Reason):
     + Nhãn: "Lý do *" (bắt buộc nhập).
     + Component: Textarea tối đa 500 ký tự, placeholder: "Nhập lý do đánh giá kết quả AI chưa đúng...".
     + Quy tắc xác thực [BR-02]: Tự động trim khoảng trắng đầu/cuối. Nếu để trống hoặc chỉ nhập khoảng trắng khi bấm nút Xác nhận, hiển thị thông báo lỗi inline màu đỏ ngay dưới ô nhập: "Vui lòng nhập lý do phản hồi kết quả AI." ("Please enter the reason for AI feedback.") và focus vào ô nhập liệu.
   - Nút bấm chân modal:
     + Nút "Hủy" (Secondary button): Đóng modal, xóa sạch nội dung đã nhập và thông báo lỗi (nếu có), không lưu bất kỳ thay đổi nào.
     + Nút "Xác nhận" (Primary button): Validate trường Lý do. Nếu hợp lệ, lưu trạng thái phản hồi vào bản ghi cảnh báo (gồm: người báo cáo, thời điểm báo cáo, lý do báo cáo, kết quả đúng), đóng modal, cập nhật giao diện Tag AI sang trạng thái "Đã báo cáo sai", ghi nhận dòng lịch sử vào tab "Nhật ký hệ thống" và hiển thị toast thông báo thành công.
   - Ảnh giao diện tham chiếu: `E:\work1\Docs\images_ai_feedback\02_modal_feedback_ai_verdict.png`

3. Trạng thái của Tag kết quả AI khi Đã báo cáo sai (Reported State):
   - Màu sắc tag: Vẫn hiển thị Màu đỏ cảnh báo (background: rgba(255, 77, 79, 0.12), border: 1px solid rgba(255, 77, 79, 0.35), color: #ff7875).
   - Gạch ngang kết luận gốc [BR-03]: Giữ nguyên biểu tượng hình vuông ■, dòng chữ kết luận ban đầu của AI được gạch ngang (line-through), ví dụ: ■ 100% Cảnh báo thật bị gạch ngang dòng chữ 100% Cảnh báo thật.
   - Nhãn phản hồi: Hiển thị đoạn chữ (Đã báo cáo sai ⚠️).
   - Cơ chế Tooltip tương tác 2 dòng [BR-04]: Khi người dùng rê chuột (hover) vào chữ (Đã báo cáo sai ⚠️), hệ thống hiển thị một Tooltip nổi bật màu tối phía trên với 2 dòng thông tin:
     + Dòng 1: {Tên người báo cáo} - {Thời điểm báo cáo} (ví dụ: tomhagen - 01/10/2026 09:24:37, font màu xanh dương nổi bật, có đường gạch mờ ngăn cách).
     + Dòng 2: Lý do: {Nội dung lý do đã nhập} (ví dụ: Lý do: Phát hiện false positive từ hệ thống scan thử nghiệm nội bộ, chữ màu xám sáng, hỗ trợ tự động xuống hàng nếu văn bản dài).
   - Nút hủy báo cáo (Exit icon): Hiển thị biểu tượng ✕ nhỏ bên cạnh (alert-ai-cancel-btn), tooltip "Hủy báo cáo này". Khi click vào nút này, hệ thống bật popup modal "Xác nhận hủy báo cáo".
   - Ảnh giao diện tham chiếu: `E:\work1\Docs\images_ai_feedback\03_ai_tag_reported_tooltip_hover.png`

4. Popup Modal "Xác nhận hủy báo cáo" (Cancel Confirmation Modal):
   - Tiêu đề modal: "Xác nhận hủy báo cáo", có nút đóng [✕] ở góc phải.
   - Nội dung thông báo:
     + Icon cảnh báo hình tam giác màu cam/đỏ.
     + Tiêu đề câu hỏi: "Bạn có chắc chắn muốn hủy báo cáo này?"
     + Nội dung chi tiết: "Sau khi hủy, trạng thái đánh giá của AI sẽ được khôi phục."
   - Nút bấm hành động:
     + Nút "Hủy" (Default button): Đóng popup xác nhận, giữ nguyên trạng thái đã báo cáo.
     + Nút "Xác nhận hủy" (Danger button, màu đỏ): Khôi phục Tag kết quả AI về nguyên trạng ban đầu (■ 100% Cảnh báo thật kèm nút "Báo cáo"), đồng thời tự động ghi nhận một dòng nhật ký hủy vào tab "Nhật ký hệ thống", đóng modal và hiển thị toast thông báo: "Đã hủy báo cáo kết quả AI".
   - Ảnh giao diện tham chiếu: `E:\work1\Docs\images_ai_feedback\04_modal_confirm_cancel_feedback.png`

5. Ghi nhận Nhật ký hệ thống tự động (System Audit Log) [BR-05]:
   - Toàn bộ hành động Báo cáo và Hủy báo cáo đều phải được lưu vết tự động vào bảng Lịch sử / Nhật ký hệ thống của cảnh báo (Tab "Nhật ký hệ thống"):
     + Cột Thời gian: Ghi nhận thời điểm thực tế (dd/MM/yyyy HH:mm:ss).
     + Cột Người thực hiện: Tên tài khoản chuyên viên đang đăng nhập.
     + Cột Hành động: "Báo cáo kết quả AI" hoặc "Hủy báo cáo kết quả AI".
     + Cột Chi tiết thay đổi:
       * Khi Báo cáo: "Báo cáo AI đánh giá sai từ '[Kết quả AI]' sang '[Kết quả người dùng]'. Lý do: [Nội dung lý do]".
       * Khi Hủy báo cáo: "Khôi phục về trạng thái phán định gốc của AI: [Kết quả gốc của AI]".
   - Ảnh giao diện tham chiếu: `E:\work1\Docs\images_ai_feedback\05_system_audit_logs.png`

YÊU CẦU THỰC HIỆN:
- Áp dụng skill `E:\work1\Skills\srs_feature_overview\skill.md` để viết Mục 1 (bảng 2 cột), Mục 2 (RBAC thuần Việt cho các vai trò Super Admin, SOC Manager, Security Analyst L1/L2) và Mục 3 (Sequence Diagram thể hiện luồng Người dùng - Giao diện SOAR - SOAR Backend API - SOAR CSDL & Audit Log, có đánh số autonumber, phân nhánh alt/else cho việc xác thực form và opt cho luồng hủy báo cáo).
- Áp dụng skill `E:\work1\Skills\srs_ui_spec_writer\skill.md` để viết Mục 4 cho toàn bộ các màn hình và popup modal (Header Tag chi tiết cảnh báo, Popup phản hồi kết quả AI, Tooltip chi tiết khi hover, Popup xác nhận hủy báo cáo, Bảng nhật ký hệ thống), đặc tả đầy đủ theo cấu trúc bảng 4 cột (STT, Tên trường, Loại dữ liệu, Mô tả với validation song ngữ VI/EN, popup modals), đồng thời gắn mã [BR-01], [BR-02], [BR-03], [BR-04], [BR-05] cho các quy tắc ngầm.
- Áp dụng skill `E:\work1\Skills\srs_business_rules_spec\skill.md` để viết Mục 5 giải nghĩa chi tiết các mã [BR-xx] đã gắn ở Mục 4 (ràng buộc hiển thị nút, validation lý do, thuật toán gạch ngang CSS, cơ chế hiển thị tooltip, cơ chế ghi vết kiểm toán Audit Trail và đồng bộ dữ liệu tái huấn luyện AI).
- Xuất toàn bộ nội dung hoàn chỉnh ra file: E:\work1\Docs\SRS_Bao_Cao_Ket_Qua_AI.md
