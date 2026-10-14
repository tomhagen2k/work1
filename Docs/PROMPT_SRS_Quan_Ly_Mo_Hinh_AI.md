Tôi có một tính năng mới cần viết tài liệu đặc tả SRS hoàn chỉnh gồm đủ 5 mục:
1. Thông tin chung chức năng
2. Ma trận phân quyền
3. Biểu đồ luồng xử lý
4. Thiết kế UI và đặc tả chi tiết components
5. Quy tắc nghiệp vụ chuyên sâu

THÔNG TIN TÍNH NĂNG:
- Mã tính năng: SOAR_AI_MODEL_MGMT_01
- Tên tính năng: Quản lý & Tái huấn luyện Mô hình AI (AI Model Management & Retraining Engine)
- Mục đích: Cung cấp trung tâm quản trị toàn diện vòng đời mô hình học máy (MLOps Lifecycle Management) cho từng khách hàng/tenant trong hệ thống NCS SOAR. Tính năng cho phép theo dõi trạng thái mô hình, quản lý và chuyển đổi/rollback các phiên bản mô hình (Model Registry & Serving Switch), chủ động chọn lọc dữ liệu cảnh báo an ninh đã được chuyên viên thẩm định để tái huấn luyện (Dataset Selection & Retraining), và giám sát trực quan tiến trình thực thi, chỉ số đánh giá của từng phiên huấn luyện (Training Runs & Progress Tracking).

Nghiệp vụ chi tiết:
Tính năng được triển khai tại menu "Quản trị" -> "Mô hình AI" trong file mockup giao diện `E:\work1\SOAR\training\soar_model_management.html`. Hệ thống bao gồm 2 cấp độ màn hình và 3 tab chức năng chi tiết cùng các popup modal/drawer sau:

1. Màn hình Danh sách mô hình AI (Model List View - `#viewModelList`):
   - Thanh công cụ tìm kiếm & lọc:
     + Ô tìm kiếm: Tìm tức thời theo Mã khách hàng, Tên khách hàng, Tên mô hình.
     + Bộ lọc Trạng thái huấn luyện: Dropdown gồm Tất cả, Đang rảnh (IDLE), Đang huấn luyện (RUNNING), Thất bại lần gần nhất (FAILED).
     + Nút "Làm mới": Tải lại dữ liệu danh sách mô hình.
   - Bảng danh sách mô hình:
     + Cột Khách hàng: Hiển thị Avatar viết tắt (vòng tròn màu) kèm Tên khách hàng đầy đủ và Mã Tenant (ví dụ: Học viện Công nghệ Bưu Chính Viễn Thông - PTIT).
     + Cột Tên mô hình: Tên định danh kỹ thuật của mô hình (ví dụ: `PTIT-Alert-Classifier-v2`).
     + Cột Phiên bản áp dụng: Badge màu xanh dương nổi bật thể hiện phiên bản đang phục vụ phân loại cảnh báo (ví dụ: `v2.3`).
     + Cột Trạng thái huấn luyện: Badge thể hiện trạng thái phiên chạy hiện tại (Đang rảnh / Đang huấn luyện nhấp nháy / Thất bại).
     + Cột Cảnh báo chưa học: Badge số lượng cảnh báo mới phát sinh hoặc có phản hồi từ chuyên viên mà phiên bản đang phục vụ chưa từng huấn luyện (ví dụ: `32 cảnh báo`).
     + Cột Lần huấn luyện gần nhất: Thời điểm chạy và tài khoản người kích hoạt.
     + Cột Hành động: Nút "Xem chi tiết" (hoặc click vào bất kỳ vị trí nào trên hàng) để chuyển sang màn hình Chi tiết mô hình của khách hàng đó.
   - Ảnh giao diện tham chiếu: `E:\work1\Docs\images_ai_model\01_ai_model_list_view.png`

2. Màn hình Chi tiết mô hình AI (Model Detail View - `#viewModelDetail`):
   - Thanh Breadcrumbs: `Quản trị / Mô hình AI / [Tên khách hàng]` kèm nút "Quay lại danh sách".
   - Khung thông tin tổng quan (Header Card):
     + Avatar khách hàng, Tên khách hàng, Mã khách hàng (Tenant ID), Tên mô hình, Tổng số cảnh báo đã huấn luyện tích lũy.
     + Tag phiên bản áp dụng hiện tại (Serving Tag): Hiển thị phiên bản mô hình đang phục vụ thời gian thực (ví dụ `v2.3`).
   - Hệ thống 3 Tabs chức năng:
     + Tab 1: Danh sách phiên bản (Model Versions) - Hiển thị badge tổng số phiên bản hiện có (ví dụ: 4).
     + Tab 2: Huấn luyện (Retrain) - Hiển thị badge số lượng cảnh báo chưa học đang chờ (ví dụ: 32 cảnh báo).
     + Tab 3: Lịch sử huấn luyện (Training Runs) - Hiển thị badge tổng số lần chạy huấn luyện (ví dụ: 4).

3. Chi tiết Tab 1: Danh sách phiên bản (Model Versions Tab):
   - Bảng quản lý phiên bản mô hình:
     + Cột Mã phiên bản: Nhãn phiên bản dạng `v2.4`, `v2.3`, `v2.2`, `v2.1`...
     + Cột Phiên bản nền: Mã phiên bản cơ sở mà phiên bản này kế thừa (ví dụ: `v2.3`, `v2.2`, `v2.1`, `Gốc`).
     + Cột Cảnh báo bổ sung: Số lượng cảnh báo mới được nạp thêm trong phiên bản này (ví dụ: `+18 cảnh báo`).
     + Cột Thời điểm tạo & Người khởi tạo: Metadata thời gian và username.
     + Cột Trạng thái sử dụng: Badge phân định trạng thái rõ ràng:
       * "Đang sử dụng" (Serving): Badge màu xanh lá (`#52c41a`), viền mờ bo góc.
       * "Sẵn sàng sử dụng" (Ready): Badge màu xanh dương (`#1677ff`).
     + Cột Hành động:
       * Đối với phiên bản đang sử dụng: Hiển thị text/badge "Đang phục vụ" (không có nút bấm).
       * Đối với phiên bản mới hơn đang ở trạng thái Ready (ví dụ v2.4): Hiển thị nút "Áp dụng", khi click mở Modal xác nhận áp dụng phiên bản (`#modalDeploy`).
       * Đối với phiên bản cũ hơn (ví dụ v2.2, v2.1): Hiển thị nút "Rollback", khi click mở Modal thay đổi phiên bản áp dụng (`#modalRollback`).
   - Modal Xác nhận áp dụng phiên bản (`#modalDeploy`): Hộp thoại xác nhận chuyển đổi phiên bản mô hình sang phiên bản mới được huấn luyện (hiển thị Tên khách hàng, Phiên bản đích v2.4, thông điệp kiểm tra tải), gồm nút "Hủy" và nút "Xác nhận áp dụng".
   - Modal Thay đổi phiên bản áp dụng / Rollback (`#modalRollback`): Hộp thoại cảnh báo khi quay lui về phiên bản cũ (hiển thị phiên bản hiện tại v2.3 và phiên bản quay về v2.2), gồm nút "Hủy" và nút "Xác nhận thay đổi".
   - Ảnh giao diện tham chiếu: `E:\work1\Docs\images_ai_model\02_versions_tab.png` và `E:\work1\Docs\images_ai_model\07_deploy_modal.png`

4. Chi tiết Tab 2: Huấn luyện (Retrain Tab):
   - Thanh công cụ lọc dữ liệu đa chiều & Nút Huấn luyện trên cùng một hàng:
     + Ô tìm kiếm: Tìm kiếm theo Mã cảnh báo, Tên cảnh báo.
     + Bộ lọc Trạng thái huấn luyện: Dropdown gồm Tất cả, Chưa từng huấn luyện, Đã từng huấn luyện.
     + Bộ lọc Kết quả AI: Dropdown gồm Tất cả, Cảnh báo thật, Cảnh báo giả.
     + Bộ lọc Kết quả báo cáo (của chuyên viên): Dropdown gồm Tất cả, Báo cáo Cảnh báo thật, Báo cáo Cảnh báo giả.
     + Bộ lọc Người báo cáo: Dropdown danh sách chuyên viên đã gửi phản hồi (admin1, analyst2...).
     + Bộ lọc Thời điểm báo cáo: Bộ chọn khoảng ngày giờ báo cáo.
     + Nút hành động "Huấn luyện": Nằm ở góc phải cùng hàng toolbar, chỉ kích hoạt (Active) khi người dùng đã tích chọn ít nhất 1 cảnh báo trong bảng (kèm hiển thị số lượng chọn: ví dụ `Huấn luyện (18)`). Khi click, mở Modal Cấu hình huấn luyện mô hình (`#modalRetrainConfig`).
   - Bảng dữ liệu cảnh báo huấn luyện (Training Alerts Table):
     + Cột Checkbox: Checkbox ở tiêu đề cho phép Chọn tất cả / Bỏ chọn tất cả trên trang hiện tại; Checkbox từng dòng để chọn cảnh báo nạp vào tập train.
     + Cột Mã cảnh báo: Mã UUID định danh cảnh báo, hỗ trợ sao chép nhanh.
     + Cột Tên cảnh báo: Tên quy tắc phát hiện / sự cố an ninh.
     + Cột Kết quả AI: Tag hiển thị kết luận AI gốc (`Cảnh báo thật` màu đỏ, `Cảnh báo giả` màu xanh).
     + Cột Báo cáo của chuyên viên (được tách thành 3 cột riêng biệt, tường minh):
       * Cột Kết quả báo cáo: Tag kết luận đúng của chuyên viên (`Cảnh báo giả` / `Cảnh báo thật`).
       * Cột Người báo cáo: Hiển thị 2 dòng: Tên người dùng và Thời điểm gửi báo cáo.
       * Cột Lý do báo cáo: Nội dung lý do chuyên viên nhập khi báo cáo sai nhãn, giới hạn tối đa hiển thị 2 dòng, tự động cắt ngắn dạng tóm tắt `...` nếu vượt quá.
     + Cột Lịch sử huấn luyện: Badge thể hiện cảnh báo này `Chưa từng huấn luyện` (màu vàng cam) hoặc `Đã từng huấn luyện` (màu xám mờ).
   - Phân trang dữ liệu thông minh: Hiển thị tóm tắt có dấu chấm lửng khi số lượng trang lớn (ví dụ: Trang 1, 2, 3 ... 24, 25).
   - Modal Cấu hình huấn luyện mô hình (`#modalRetrainConfig`):
     + Tên khách hàng & Mô hình (Chỉ đọc).
     + Chọn phiên bản nền kế thừa (Base Version): Dropdown cho phép chọn phiên bản nền (mặc định chọn phiên bản đang phục vụ v2.3, hoặc các phiên bản hợp lệ khác).
     + Thông tin cảnh báo bổ sung: Hiển thị số lượng cảnh báo chuyên viên đã tích chọn (ví dụ: `18 cảnh báo`).
     + Tên phiên bản mới dự kiến sinh ra: Tự động tính toán và hiển thị (ví dụ kế thừa v2.3 thì đề xuất `v2.4`, kế thừa v2.4 thì đề xuất `v2.5`).
     + Ghi chú phiên huấn luyện: Textarea cho phép nhập mô tả mục tiêu của đợt huấn luyện này.
     + Nút "Hủy" và nút "Bắt đầu huấn luyện".
   - Ảnh giao diện tham chiếu: `E:\work1\Docs\images_ai_model\03_retrain_tab.png`, `E:\work1\Docs\images_ai_model\04_retrain_selected_alerts.png`, và `E:\work1\Docs\images_ai_model\05_retrain_config_modal.png`

5. Chi tiết Tab 3: Lịch sử huấn luyện & Drawer Chi tiết phiên chạy (Training Runs & Job Detail):
   - Bảng Lịch sử các phiên huấn luyện (Training Runs Table):
     + Cột Mã lần chạy: Mã job định danh (ví dụ `TRAIN-20260920-001`).
     + Cột Người khởi tạo & Thời điểm chạy.
     + Cột Phiên bản nền (Base Version) & Cột Cảnh báo bổ sung (Số lượng cảnh báo nạp thêm).
     + Cột Trạng thái phiên chạy:
       * Hoàn thành (Success): Badge xanh lá.
       * Đang chạy (Running): Badge xanh dương nhấp nháy chuyển động.
       * Thất bại (Failed): Badge đỏ.
       * Đã hủy (Cancelled): Badge xám.
     + Cột Phiên bản kết quả: Mã phiên bản sinh ra sau khi hoàn thành (ví dụ `v2.4`).
     + Cột Thời lượng thực thi (Duration, ví dụ: 4 phút 15 giây).
     + Hành vi khi tương tác: Khi người dùng bấm vào bất kỳ hàng nào trong bảng, hệ thống mở ngay Drawer Chi tiết lịch sử huấn luyện từ cạnh phải màn hình.
   - Drawer Chi tiết phiên huấn luyện (`#runDrawerOverlay` / `#runDrawerPanel`):
     + Header Drawer: Mã lần chạy, Badge trạng thái lớn, Nút đóng [✕].
     + Thông số tổng quan: Phiên bản nền, Số cảnh báo bổ sung, Phiên bản kết quả, Thời gian bắt đầu - kết thúc.
     + Quy trình tiến trình huấn luyện 5 bước (Pipeline Steps Progress):
       * Bước 1: Khởi tạo môi trường & Tải dữ liệu (Data Loading & Preprocessing).
       * Bước 2: Trích xuất đặc trưng & Tiền xử lý (Feature Engineering).
       * Bước 3: Huấn luyện mô hình phân loại (Model Training).
       * Bước 4: Đánh giá độ chính xác & Chỉ số F1-Score (Evaluation & Validation).
       * Bước 5: Đóng gói & Xuất bản phiên bản (Packaging & Model Registry).
       * Mỗi bước có icon trạng thái (Đã xong xanh lá, Đang thực hiện quay tròn, Chờ xử lý xám).
     + Terminal / Nhật ký thực thi thời gian thực (Live Execution Logs): Khung console màu đen hiển thị log dòng lệnh của tiến trình huấn luyện.
     + Các chỉ số hiệu năng (Model Metrics): Accuracy, Precision, Recall, F1-Score, Loss so sánh trước và sau khi học thêm cảnh báo mới.
     + Nút hành động "Hủy tiến trình" (`drawerCancelBtn`): Nằm ở footer drawer, chỉ hiển thị và kích hoạt khi phiên chạy đang ở trạng thái RUNNING. Khi click, mở Popup Modal "Xác nhận hủy tiến trình" (`#modalCancelRun`).
   - Modal Xác nhận hủy tiến trình (`#modalCancelRun`): Hộp thoại cảnh báo với icon đỏ, thông điệp xác nhận dừng khẩn cấp job huấn luyện trên cụm máy chủ tính toán, gồm nút "Không, tiếp tục chạy" và nút "Xác nhận hủy tiến trình".
   - Ảnh giao diện tham chiếu: `E:\work1\Docs\images_ai_model\06_run_detail_drawer.png`

6. Các quy tắc nghiệp vụ chuyên sâu cốt lõi [BR-xx]:
   - [BR-01] Quy tắc quản lý kho cảnh báo khả dụng theo phả hệ phiên bản mô hình (Model Version Lineage & Dataset DAG): Kho cảnh báo chưa huấn luyện hiển thị tương ứng với phiên bản mô hình đang phục vụ (Serving Version). Khi chuyển đổi hoặc rollback phiên bản phục vụ, kho cảnh báo chưa học được tính toán lại chính xác theo tập huấn luyện của phiên bản nền đó.
   - [BR-02] Quy tắc kế thừa và sinh mã định danh phiên bản mới (Base Version Inheritance & Semantic Versioning): Phiên bản mới luôn kế thừa trực tiếp từ một phiên bản nền duy nhất; tên phiên bản mới tự động tăng theo thứ tự phiên bản cao nhất chưa tồn tại.
   - [BR-03] Quy tắc kiểm tra điều kiện dữ liệu tối thiểu trước khi kích hoạt huấn luyện (Training Dataset Constraints): Ràng buộc chọn ít nhất 1 cảnh báo hợp lệ; kiểm tra trạng thái rảnh của GPU/Worker trước khi cấp phát tài nguyên chạy job.
   - [BR-04] Cơ chế chuyển đổi phiên bản phục vụ không gián đoạn (Zero-downtime Serving Switch & Rollback Safety): Đảm bảo các tiến trình phán đoán cảnh báo đang diễn ra không bị đứt đoạn khi chuyển đổi mô hình phục vụ; lưu vết kiểm toán đầy đủ thời điểm chuyển giao.
   - [BR-05] Cơ chế hủy tiến trình huấn luyện an toàn (Graceful Job Cancellation & Resource Cleanup): Khi hủy job đang chạy, hệ thống gửi tín hiệu SIGTERM/SIGKILL đến worker container, giải phóng RAM/GPU, cập nhật trạng thái CANCELLED và ghi nhận nhật ký kiểm toán.

YÊU CẦU THỰC HIỆN:
- Áp dụng skill `E:\work1\Skills\srs_feature_overview\skill.md` để viết Mục 1 (bảng 2 cột), Mục 2 (RBAC thuần Việt cho các vai trò Super Admin, SOC Manager, AI/MLOps Engineer, Security Analyst, Auditor) và Mục 3 (Sequence Diagram thể hiện luồng Người dùng - Giao diện SOAR - SOAR Backend API - MLOps Training Pipeline Worker - Model Registry & CSDL, có đánh số autonumber, phân nhánh alt/else cho việc validate tập train và opt cho luồng hủy job/chuyển đổi phiên bản).
- Áp dụng skill `E:\work1\Skills\srs_ui_spec_writer\skill.md` để viết Mục 4 cho toàn bộ các màn hình, tab, popup modal và drawer chi tiết (Màn hình danh sách mô hình, Header card chi tiết, Tab Danh sách phiên bản, Tab Huấn luyện với bộ lọc phân tách 3 cột báo cáo của chuyên viên, Tab Lịch sử huấn luyện, Modal cấu hình huấn luyện, Modal áp dụng phiên bản, Modal Rollback, Drawer chi tiết phiên chạy, Modal xác nhận hủy tiến trình), đặc tả đầy đủ theo cấu trúc bảng 4 cột (STT, Tên trường, Loại dữ liệu, Mô tả với validation song ngữ VI/EN, popup modals), đồng thời gắn mã [BR-01], [BR-02], [BR-03], [BR-04], [BR-05] cho các quy tắc ngầm.
- Áp dụng skill `E:\work1\Skills\srs_business_rules_spec\skill.md` để viết Mục 5 giải nghĩa chi tiết các mã [BR-xx] đã gắn ở Mục 4.
- Xuất toàn bộ nội dung hoàn chỉnh ra file: E:\work1\SOAR\training\SRS_Quan_Ly_Mo_Hinh_AI.md
