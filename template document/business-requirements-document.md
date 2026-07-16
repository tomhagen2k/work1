# Tài Liệu Yêu Cầu Nghiệp Vụ (Business Requirements Document - BRD)

**Dự án:** [Tên Dự Án]

## Kiểm Soát Tài Liệu (Document Control)

| Thông Tin | Mô Tả |
| :--- | :--- |
| **Được chuẩn bị bởi** | [Tên của người soạn thảo] |
| **Phiên bản** | [Số Phiên Bản #.#] |
| **Ngày** | [Ngày tháng] |
| **Chủ Sở Hữu Dự Án (Project Owner)** | [Tên & Chức Danh] - [Phòng Ban] |
| **Quản Lý Dự Án (Project Manager)** | [Tên] - [Phòng Ban] - [Thông Tin Liên Hệ] |

**Trạng Thái Tài Liệu:**
- [ ] Bản Nháp (Draft)
- [ ] Đang Trình Duyệt (Routing for Document Approval)
- [ ] Đã Phê Duyệt (Approved)
- [ ] Chưa Phê Duyệt (Unapproved)

---

## Lịch Sử Chỉnh Sửa

| Số Phiên Bản | Ngày | Tác Giả | Ghi Chú |
| :--- | :--- | :--- | :--- |
| 1.0 | DD/MM/YYYY | Tên Tác Giả | Khởi tạo tài liệu |

*(Bắt đầu ghi nhận lịch sử chỉnh sửa sau bản phát hành chính thức đầu tiên - không phải bản nháp.)*

> **Mục Đích / Hướng Dẫn:** Mục đích của tài liệu này là trình bày chi tiết các yêu cầu nghiệp vụ một cách đầy đủ để phục vụ cho việc thiết kế và phát triển giải pháp đã được đề ra. **Tài liệu này chỉ đóng vai trò như một hướng dẫn. Các dự án cụ thể có thể yêu cầu cách tiếp cận khác trong việc ghi chép các yêu cầu.** Tuy nhiên, điều quan trọng là các yêu cầu nghiệp vụ phải đủ chi tiết không chỉ để triển khai các thay đổi, mà còn để kiểm thử (test) nhằm đảm bảo mỗi yêu cầu nghiệp vụ đều được đáp ứng. Các hướng dẫn trong tài liệu này là các đoạn văn trong thẻ trích dẫn (quote) và nên được xóa bỏ khi không còn cần thiết.

---

## Mục Lục
- [1. Tóm Tắt Dự Án](#1-tóm-tắt-dự-án)
- [2. Yêu Cầu Chức Năng Của Giải Pháp](#2-yêu-cầu-chức-năng-của-giải-pháp)
- [3. Báo Cáo & Thông Báo](#3-báo-cáo--thông-báo)
- [4. Yêu Cầu Hệ Thống](#4-yêu-cầu-hệ-thống)
- [5. Luồng Quy Trình](#5-luồng-quy-trình)
- [6. Phê Duyệt](#6-phê-duyệt)
- [Phụ Lục A – Các Tài Liệu Liên Quan](#phụ-lục-a--các-tài-liệu-liên-quan)
- [Phụ Lục B – Thuật Ngữ](#phụ-lục-b--thuật-ngữ)

---

## 1. Tóm Tắt Dự Án

> *Hướng dẫn:* Cung cấp cái nhìn tổng quan ngắn gọn về dự án mà tài liệu này quy định các yêu cầu nghiệp vụ. Trả lời câu hỏi: Dự án này là gì và giải quyết vấn đề gì?
> *Ví dụ:* Dự án xây dựng Hệ thống Quản lý Bán hàng nhằm tự động hóa quy trình theo dõi đơn hàng, quản lý kho và xuất hóa đơn. Hệ thống này sẽ thay thế quy trình quản lý bằng Excel thủ công hiện tại, giúp giảm 30% thời gian xử lý đơn hàng.

## 2. Yêu Cầu Chức Năng Của Giải Pháp

> *Hướng dẫn:* Mô tả NHỮNG GÌ người dùng cuối mong đợi từ giải pháp. Hãy càng cụ thể càng tốt và chia nhỏ các yêu cầu thành từng mục hành động riêng biệt. Tuy nhiên, bạn không nhất thiết phải trình bày LÀM THẾ NÀO (how), vì điều đó sẽ được xác định trong giai đoạn Phân Tích & Thiết Kế.

### 2.1 [Quản Lý Đơn Hàng]

#### 2.1.1 [Tạo đơn hàng mới]
> *Hướng dẫn:* Mô tả một yêu cầu cụ thể mà người dùng cần thực hiện.
> *Ví dụ:* Nhân viên bán hàng có thể tạo đơn hàng mới trên hệ thống bằng cách nhập mã khách hàng, chọn danh sách sản phẩm và hệ thống tự động tính tổng tiền.

#### 2.1.2 [Hủy đơn hàng]
> *Ví dụ:* Quản lý cửa hàng có quyền hủy đơn hàng với điều kiện đơn hàng chưa chuyển sang trạng thái "Đang giao". Khi hủy phải bắt buộc nhập lý do hủy.

### 2.2 [Quản Lý Khách Hàng]

#### 2.2.1 [Tra cứu lịch sử mua hàng]
> *Ví dụ:* Hệ thống cho phép nhân viên chăm sóc khách hàng tìm kiếm khách hàng bằng số điện thoại và xem toàn bộ lịch sử mua hàng trong 12 tháng gần nhất.

## 3. Báo Cáo & Thông Báo

> *Hướng dẫn:* Mô tả chi tiết loại báo cáo mà giải pháp cần cung cấp. Đồng thời mô tả bất kỳ thông báo nào mà giải pháp yêu cầu.

### 3.1 Báo cáo doanh thu

#### 3.1.1 [Báo cáo doanh thu ngày]
> *Ví dụ:* Hệ thống cung cấp chức năng xuất báo cáo doanh thu theo từng ngày, lọc theo từng chi nhánh. Báo cáo xuất ra dưới định dạng Excel và PDF.

### 3.2 Thông báo tự động

#### 3.2.1 [Thông báo tồn kho thấp]
> *Ví dụ:* Hệ thống tự động gửi email thông báo cho Thủ kho khi số lượng của bất kỳ sản phẩm nào giảm xuống dưới mức tồn kho tối thiểu (ví dụ: < 10 sản phẩm).

## 4. Yêu Cầu Hệ Thống

### 4.1 Phần Cứng
> *Hướng dẫn:* Nêu rõ các yêu cầu về phần cứng nếu có.
> *Ví dụ:* Máy tính để bàn cho nhân viên thu ngân có cổng USB để cắm máy quét mã vạch và máy in hóa đơn nhiệt.

### 4.2 Phần Mềm
> *Hướng dẫn:* Nêu yêu cầu về môi trường phần mềm (hệ điều hành, trình duyệt, v.v.).
> *Ví dụ:* Ứng dụng phải hoạt động ổn định trên các trình duyệt Chrome (phiên bản 90+) và Safari. Không yêu cầu cài đặt phần mềm client (dạng Web-based).

### 4.3 Tính Sẵn Sàng & Hiệu Suất
> *Hướng dẫn:* Kỳ vọng về tốc độ và thời gian hoạt động của hệ thống.
> *Ví dụ:* Thời gian tải trang hiển thị danh sách sản phẩm không được vượt quá 3 giây với dữ liệu lên tới 10,000 sản phẩm. Hệ thống hoạt động 24/7 với uptime 99.9%.

### 4.4 Bảo Trì & Hỗ Trợ
> *Hướng dẫn:* Yêu cầu về hỗ trợ kỹ thuật và bảo trì.
> *Ví dụ:* Hệ thống cần cho phép backup dữ liệu toàn bộ hằng ngày vào lúc 2:00 sáng mà không làm gián đoạn người dùng.

### 4.5 Bảo Mật & Truy Cập
> *Hướng dẫn:* Yêu cầu về phân quyền và bảo mật dữ liệu.
> *Ví dụ:* Áp dụng xác thực hai yếu tố (2FA) cho tài khoản Quản trị viên. Dữ liệu khách hàng phải được mã hóa tại database.

## 5. Luồng Quy Trình

### 5.1 Luồng Quy Trình Hiện Tại
> *Hướng dẫn:* Tài liệu hóa luồng quy trình hiện tại nếu điều này giúp làm rõ cho luồng quy trình dự kiến. (Có thể dán hình ảnh hoặc mô tả các bước).
> *Ví dụ:* Khách đặt hàng -> Nhân viên ghi vào sổ -> Kế toán nhập vào Excel vào cuối ngày -> Xuất kho thủ công.

### 5.2 Luồng Quy Trình Dự Kiến
> *Hướng dẫn:* Tài liệu hóa luồng quy trình dự kiến ở mức độ tổng quan để cung cấp cái nhìn rõ ràng về trạng thái kỳ vọng sau khi dự án được triển khai.
> *Ví dụ:* Khách đặt hàng -> Nhân viên tạo đơn trên phần mềm -> Kho nhận được notification tự động trên màn hình xuất kho -> Đơn hoàn thành sẽ tự động cập nhật báo cáo kế toán.

## 6. Phê Duyệt

Bằng việc ký tên, các cá nhân có tên dưới đây đã phê duyệt các yêu cầu nghiệp vụ này. Bất kỳ sửa đổi nào đối với các yêu cầu này sau đó đều phải tuân theo quy trình quản lý sự thay đổi (change management process).

| Tên | Chức Danh | Vai Trò | Ngày Phê Duyệt | Chữ Ký |
| :--- | :--- | :--- | :--- | :--- |
| Tên Người 1 | Chức Danh 1 | Chủ Sở Hữu Dự Án | DD/MM/YYYY | |
| Tên Người 2 | Chức Danh 2 | Trưởng Nhóm Phụ Trách Chức Năng | DD/MM/YYYY | |
| Tên Người 3 | Chức Danh 3 | Trưởng Nhóm Phụ Trách Chức Năng | DD/MM/YYYY | |

> *<Đối với phê duyệt nhận được qua phương tiện điện tử, chẳng hạn như email, vui lòng biểu thị bằng cách ghi “Phê Duyệt Điện Tử” vào cột Chữ Ký. Sau đó, vui lòng lưu một bản sao của phê duyệt điện tử trong cùng thư mục dự án.>*

## Phụ Lục A – Các Tài Liệu Liên Quan

> *Hướng dẫn:* Liên kết hoặc vị trí tham chiếu của Biểu Mẫu Yêu Cầu Dự Án / Tóm Tắt Ý Tưởng, Đề Xuất Dự Án, Điều Lệ Dự Án (Project Charter) và bất kỳ tài liệu liên quan nào khác.

| Tên Tệp | Chủ Sở Hữu Tài Liệu | Vị Trí Tài Liệu Hoặc Liên Kết |
| :--- | :--- | :--- |
| Biểu Mẫu Yêu Cầu | Nguyễn Văn A | [Đường dẫn URL] |

## Phụ Lục B – Thuật Ngữ

> *Hướng dẫn:* Liệt kê bất kỳ từ viết tắt hoặc thuật ngữ nào được sử dụng trong tài liệu cùng với ý nghĩa/định nghĩa của chúng.

| Thuật Ngữ / Từ Viết Tắt | Định Nghĩa |
| :--- | :--- |
| BRD | Business Requirements Document - Tài Liệu Yêu Cầu Nghiệp Vụ |
| SRS | Software Requirements Specification - Đặc Tả Yêu Cầu Phần Mềm |