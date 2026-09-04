# Phân Tích & Đặc Tả Chi Tiết: Ứng Dụng AI Vào Chức Năng Quản Lý Đối Tượng Cần Vô Hiệu Hóa (Target Neutralization)

Tài liệu này phân tích chuyên sâu các điểm tích hợp AI vào tính năng **Quản lý & Cấu hình Vô hiệu hóa Đối tượng** (Báo cáo vi phạm / Mass Report), dựa trên giao diện thực tế của Form Modal và mô hình Trợ lý AI Sidebar.

---

## 1. MỤC TIÊU NGHIỆP VỤ & BÀI TOÁN CẦN GIẢI QUYẾT

1. **Tăng Tỷ Lệ Vô Hiệu Hóa Thành Công (Success Rate)**: Đảm bảo lý do báo cáo trùng khớp với Tiêu chuẩn Cộng đồng của Facebook để được ưu tiên xử lý sập trang/bài.
2. **Chống Phát Hiện Mass-Report Spam (Multi-Reason Allocation)**: Tránh tình trạng 100% tài khoản ảo report chung 1 lý do giống hệt nhau (dễ bị thuật toán Facebook chặn là Spam BOT). Phân bổ thêm các **Lý do bổ trợ (Secondary Reasons)**.
3. **Né Bộ Lọc Thời Gian**: Loại bỏ giãn cách thời gian cố định 3 giây, thay bằng phân phối ngẫu nhiên theo nhịp sinh học người thật.
4. **Giảm Thao Tác Thủ Công Cho Người Vận Hành**: Tự động phân tích bài viết/trang mục tiêu và gợi ý cấu hình tối ưu chỉ bằng 1-Click hoặc câu ra lệnh bằng giọng văn tự nhiên (Natural Prompt).

---

## 2. PHÂN TÍCH ỨNG DỤNG AI TRÊN TỪNG TRƯỜNG DỮ LIỆU CỦA FORM CẤU HÌNH

Dựa trên ảnh chụp thực tế Form Modal **"Cấu hình vô hiệu hóa"**, dưới đây là chi tiết nâng cấp tích hợp AI:

```
+-------------------------------------------------------------------------+
| Cấu hình vô hiệu hóa                                                 (X)|
| ----------------------------------------------------------------------- |
| Lý do report chính:           [ ✨ Tài khoản giả mạo (Chính - 60%)  v ]|
| Lý do bổ trợ 1 & 2:           [ ✨ Ngôn từ thù ghét (25%), Spam (15%) v ]|
| Số lượng report trên mỗi đối tượng: [ 30 report / đối tượng ]            |
| Phân bổ tài khoản ảo:         [ Xoay vòng tài khoản trust cao      v ]|
| Phân bổ thời gian:            [ Theo khoảng thời gian ngẫu nhiên AI  v ]|
| Giãn cách từ:                 [ 45s ] đến [ 180s ] (Né thuật toán FB)   |
| ----------------------------------------------------------------------- |
| Số lượng đối tượng đã chọn: 3         [ Nút ✨ AI Gợi Ý ] [ Hủy ] [ Lưu ]|
+-------------------------------------------------------------------------+
```

---

### 2.1. Trường "Lý Do Report" -> Cơ Chế Phân Bổ Tỷ Lệ Đa Lý Do (Multi-Reason Ratio Engine)

> [!IMPORTANT]
> **Nhận định chiến thuật**: Nếu 30 tài khoản ảo đồng loạt report 1 trang với **100% cùng 1 lý do "Tài khoản giả mạo"**, thuật toán Facebook Security sẽ gắn cờ đây là cuộc tấn công Spam Bot được dàn xếp (Synchronized Attack) và tự động vô hiệu hóa toàn bộ lượt report.

* **Giải pháp AI nâng cấp**:
  1. **AI Cào quét & Đối chiếu vi phạm**: AI cào quét nội dung đối tượng và phát hiện ra danh sách các vi phạm từ cao đến thấp.
  2. **Tự động lập Ma trận Phân bổ Đa Lý do (Multi-Reason Matrix)**:
     * **Lý do Chính (Primary Match - 60% nick ảo)**: Lý do có điểm vi phạm nặng nhất & rõ ràng nhất *(Ví dụ: Tài khoản giả mạo - Match 95%)*.
     * **Lý do Bổ trợ 1 (Secondary Match - 25% nick ảo)**: Lý do vi phạm đi kèm *(Ví dụ: Ngôn từ gây thù ghét / Quấy rối - Match 85%)*.
     * **Lý do Bổ trợ 2 (Secondary Match - 15% nick ảo)**: Lý do vi phạm nhẹ hơn *(Ví dụ: Thông tin sai lệch / Spam - Match 75%)*.
  3. **Kết quả**: Đợt report trông hoàn toàn tự nhiên dưới góc nhìn kiểm duyệt của Facebook (như một nhóm người dùng thật có các góc nhìn báo cáo đa chiều khác nhau), giúp vượt qua bộ lọc anti-spam 100%.

---

### 2.2. Trường "Số Lượng Report Trên Mỗi Đối Tượng" -> AI Dynamic Quota Evaluator

* **Hạn chế của cách làm cũ**: Người dùng nhập con số cứng thủ công *(như `8` report trên ảnh)*.
  * Nhập quá ít (VD 8 report): Không đạt ngưỡng tối thiểu để kích hoạt tiến trình kiểm duyệt thủ công của Admin Facebook.
  * Nhập quá lớn dồn dập (VD 1,000 report): Bị bộ quét Spam chặn ngay lập tức.
* **Ứng dụng AI**:
  * AI đánh giá quy mô của đối tượng mục tiêu (Số lượng Follower, Tốc độ tăng trưởng tương tác, Độ uy tín của Trang).
  * AI đối chiếu với số lượng tài khoản ảo khỏe hiện có trong hệ thống để đưa ra con số **Report Ngưỡng Tối Ưu** (Ví dụ: Trang 20k follower -> Đề xuất 30 report chia theo tỷ lệ Đa Lý Do).

---

### 2.3. Trường "Phân Bổ Thời Gian" & "Giãn Cách Giây" -> AI Anti-Spam Staggering

* **Hạn chế của cách làm cũ**: Màn hình hiện tại hỗ trợ nhập `Giãn cách từ 3s đến 3s`. **3 giây là khoảng cách cố định quá ngắn**, hệ thống phát hiện BOT tự động của Facebook sẽ phát hiện ngay hành vi bất thường và khóa toàn bộ dàn tài khoản ảo.
* **Ứng dụng AI**:
  * AI loại bỏ nhịp chạy chu kỳ cố định, thay bằng **Mô hình Phân phối Chuẩn Gaussian (Giả lập nhịp sinh học con người)**.
  * **Khoảng thời gian ngẫu nhiên AI đề xuất**: Tự động đặt mức an toàn từ **45 giây đến 180 giây** (hoặc rải đều ngẫu nhiên trong 3 - 6 giờ).

---

### 2.4. Trường "Phân Bổ Tài Khoản Ảo" -> AI Account Routing

* **Ứng dụng AI**:
  * AI tự động chọn các tài khoản ảo có độ tin cậy (Trust Score) cao nhất thực hiện báo cáo lý do chính trước để "mở đường", sau đó phân bổ các tài khoản ảo cấp thấp hơn báo cáo các lý do bổ trợ nối tiếp.

---

## 3. ĐẶC TẢ LUỒNG TƯƠNG TÁC QUA WIDGET TRỢ LÝ AI (SIDEBAR ASSISTANT)

### 3.1 Phản Hồi Trực Quan Trợ Lý AI Trên Khung Chat (Đã Nâng Cấp Đa Lý Do)

Khi người dùng nhấn mở Sidebar Chat AI tại màn hình Quản lý đối tượng cần vô hiệu hóa:

> 🛡️ **KẾT QUẢ PHÂN TÍCH & ĐỀ XUẤT CẤU HÌNH VÔ HIỆU HÓA**
> 
> * **Phân tích đối tượng đã chọn (`fb.com/page_target_123`)**:
>   * Status: ✅ Đã phân tích 35 bài viết & Bio đối tượng.
> * **Ma trận Lý do Report Đa chiều (Chống Spam Bot)**:
>   * 🎯 **Lý do CHÍNH (60% nick ảo ~ 18 nick)**: `Tài khoản giả mạo` *(Độ khớp: 96%)*
>   * 🔹 **Lý do BỔ TRỢ 1 (25% nick ảo ~ 8 nick)**: `Ngôn từ gây thù ghét` *(Độ khớp: 85%)*
>   * 🔹 **Lý do BỔ TRỢ 2 (15% nick ảo ~ 4 nick)**: `Thông tin sai lệch` *(Độ khớp: 75%)*
> * **Số lượng report đề xuất**: **30 report / đối tượng** (Tổng 30 nick ảo)
> * **Phân bổ tài khoản**: Phân bổ xoay vòng nick ảo Trust Level 3-5
> * **Thời gian giãn cách**: Ngẫu nhiên theo Gaussian từ **45s đến 180s** (Rải đều trong 3.5 giờ)
> 
> -------------------------------------------------------------
> **[  👉 ÁP DỤNG VÀO FORM CẤU HÌNH  ]**   **[ 🔄 Điều chỉnh tỷ lệ ]**

Khi ấn **`[Áp dụng vào Form]`**, hệ thống tự động điền Lý do chính, các lý do bổ trợ kèm tỷ lệ phân bổ và khoảng thời gian giãn cách 45-180s trực tiếp lên Form Modal!

---

## 4. MA TRẬN SO SÁNH TRẢI NGHIỆM (BEFORE VS AFTER)

| Trường dữ liệu trên Form | Cách làm thủ công (Hiện tại) | Cách làm có AI hỗ trợ (Nâng cấp) |
| :--- | :--- | :--- |
| **Lý do report** | Tự chọn 1 lý do duy nhất bằng tay (Dễ bị lộ Spam Bot nếu số lượng lớn). | AI phân tích & tạo **Ma trận Tỷ lệ Đa lý do** (60% Lý do chính, 25% Bổ trợ 1, 15% Bổ trợ 2). |
| **Số lượng report** | Nhập con số cảm tính (như 8). | AI tính toán theo quy mô đối tượng để đạt ngưỡng xử lý của Facebook. |
| **Giãn cách thời gian** | Cố định 3s (Dễ bị lộ BOT/Spam). | AI rải thời gian ngẫu nhiên 45s - 180s theo nhịp sinh học con người. |
| **Thao tác người dùng** | Chọn 5-6 trường thủ công trên Form. | Bấm nút **[Áp dụng vào Form]** từ Chat AI -> Tự động điền 100% Form! |
