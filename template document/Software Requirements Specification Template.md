# Đặc Tả Yêu Cầu Phần Mềm (Software Requirements Specification - SRS)

**Dự Án:** [Tên Dự Án]

**Phiên bản:** 1.0 (Đã phê duyệt / Bản nháp)

**Được chuẩn bị bởi:** [Tên tác giả] - [Tổ chức]

**Ngày tạo:** [Ngày tháng năm]

---

## Lịch Sử Chỉnh Sửa

| Phiên Bản | Ngày | Tên Tác Giả | Lý Do Thay Đổi |
| :--- | :--- | :--- | :--- |
| 1.0 | DD/MM/YYYY | Nguyễn Văn A | Khởi tạo tài liệu |

---

## Mục Lục
- [1. Giới Thiệu](#1-giới-thiệu)
  - [1.1 Mục Đích](#11-mục-đích)
  - [1.2 Quy Ước Trong Tài Liệu](#12-quy-ước-trong-tài-liệu)
  - [1.3 Phạm Vi Dự Án](#13-phạm-vi-dự-án)
  - [1.4 Tài Liệu Tham Khảo](#14-tài-liệu-tham-khảo)
- [2. Mô Tả Tổng Quan](#2-mô-tả-tổng-quan)
  - [2.1 Góc Nhìn Về Sản Phẩm](#21-góc-nhìn-về-sản-phẩm)
  - [2.2 Các Lớp Người Dùng Và Đặc Điểm](#22-các-lớp-người-dùng-và-đặc-điểm)
  - [2.3 Môi Trường Hoạt Động](#23-môi-trường-hoạt-động)
  - [2.4 Ràng Buộc Về Thiết Kế Và Triển Khai](#24-ràng-buộc-về-thiết-kế-và-triển-khai)
  - [2.5 Giả Định Và Phụ Thuộc](#25-giả-định-và-phụ-thuộc)
- [3. Tính Năng Hệ Thống](#3-tính-năng-hệ-thống)
- [4. Yêu Cầu Về Dữ Liệu](#4-yêu-cầu-về-dữ-liệu)
- [5. Yêu Cầu Về Giao Diện Bên Ngoài](#5-yêu-cầu-về-giao-diện-bên-ngoài)
- [6. Thuộc Tính Chất Lượng](#6-thuộc-tính-chất-lượng)
- [7. Yêu Cầu Về Quốc Tế Hóa Và Bản Địa Hóa](#7-yêu-cầu-về-quốc-tế-hóa-và-bản-địa-hóa)
- [8. Các Yêu Cầu Khác](#8-các-yêu-cầu-khác)
- [Phụ Lục A: Thuật Ngữ](#phụ-lục-a-thuật-ngữ)
- [Phụ Lục B: Các Mô Hình Phân Tích](#phụ-lục-b-các-mô-hình-phân-tích)

---

## 1. Giới Thiệu

> *Hướng dẫn:* Phần giới thiệu cung cấp một cái nhìn tổng quan để giúp người đọc hiểu cách thức tổ chức của SRS và cách sử dụng nó.

### 1.1 Mục Đích 

> *Hướng dẫn:* Xác định sản phẩm có các yêu cầu phần mềm được đặc tả trong tài liệu này, bao gồm cả phiên bản. Mô tả các đối tượng người đọc khác nhau mà tài liệu hướng tới.
> *Ví dụ:* Tài liệu SRS này đặc tả các yêu cầu phần mềm cho Phiên bản 1.0 của Hệ thống Quản lý Thư viện (LMS). Đối tượng đọc tài liệu này bao gồm Đội ngũ lập trình backend, frontend, Tester (QC) và Quản lý dự án để đối chiếu khi bàn giao.

### 1.2 Quy Ước Trong Tài Liệu

> *Hướng dẫn:* Mô tả mọi tiêu chuẩn hoặc quy ước đánh máy được sử dụng, ví dụ như cách đánh mã yêu cầu.
> *Ví dụ:* Mỗi yêu cầu chức năng sẽ được đánh mã tiền tố "REQ-", theo sau là mã module và số thứ tự (Ví dụ: REQ-AUTH-01 cho tính năng đăng nhập). Từ "PHẢI" (MUST) mang ý nghĩa bắt buộc có, từ "NÊN" (SHOULD) là khuyến nghị ưu tiên thấp hơn.

### 1.3 Phạm Vi Dự Án

> *Hướng dẫn:* Cung cấp mô tả ngắn gọn về phần mềm đang được đặc tả và mục đích của nó. Liên kết phần mềm với mục tiêu của người dùng.
> *Ví dụ:* Hệ thống LMS này sẽ cho phép thủ thư số hóa thông tin sách, hỗ trợ sinh viên tra cứu và mượn sách trực tuyến. Phạm vi của Phase 1 chỉ giới hạn trong việc quản lý sách vật lý, chưa hỗ trợ mượn sách điện tử (e-book).

### 1.4 Tài Liệu Tham Khảo

> *Hướng dẫn:* Liệt kê mọi tài liệu hoặc nguồn lực khác mà SRS này tham chiếu tới.
> *Ví dụ:* 1. Tài liệu Yêu cầu Nghiệp vụ (BRD) bản v1.2. 2. Hướng dẫn thiết kế giao diện (UI/UX Guidelines) từ phòng Design.

## 2. Mô Tả Tổng Quan

> *Hướng dẫn:* Trình bày tổng quan cấp cao về sản phẩm và môi trường mà sản phẩm sẽ được sử dụng.

### 2.1 Góc Nhìn Về Sản Phẩm

> *Hướng dẫn:* Mô tả bối cảnh của sản phẩm. Nó là một hệ thống mới, hệ thống nâng cấp, hay thay thế? Nó có liên kết với hệ thống nào khác không?
> *Ví dụ:* LMS là một module mới sẽ được tích hợp vào Cổng thông tin sinh viên hiện có của trường đại học. Nó sẽ giao tiếp với Hệ thống Quản lý Sinh viên (để lấy danh sách sinh viên) qua API Restful.

### 2.2 Các Lớp Người Dùng Và Đặc Điểm

> *Hướng dẫn:* Xác định các lớp người dùng khác nhau sử dụng sản phẩm.
> *Ví dụ:* 
> - **Sinh viên:** Có kỹ năng sử dụng máy tính cơ bản. Cần tra cứu nhanh, giao diện thân thiện trên mobile. Có quyền xem, đặt mượn.
> - **Thủ thư:** Là người dùng chính. Cần giao diện desktop nhập liệu nhanh. Có quyền quản lý mượn trả, thêm sách mới.
> - **Admin:** Kỹ thuật viên IT. Có quyền quản lý phân quyền và sao lưu dữ liệu.

### 2.3 Môi Trường Hoạt Động

> *Hướng dẫn:* Mô tả môi trường mà phần mềm sẽ hoạt động (hệ điều hành, trình duyệt, máy chủ...).
> *Ví dụ:* Phần mềm là ứng dụng Web hoạt động trên máy chủ Linux (Ubuntu 22.04), CSDL PostgreSQL 14. Client truy cập thông qua trình duyệt (Chrome, Safari, Edge) trên PC hoặc thiết bị di động.

### 2.4 Ràng Buộc Về Thiết Kế Và Triển Khai

> *Hướng dẫn:* Mô tả các yếu tố giới hạn tùy chọn của đội dev.
> *Ví dụ:* Phải sử dụng ngôn ngữ Python/Django cho Backend để đồng bộ với công nghệ lõi của trường. Ngôn ngữ giao diện bắt buộc phải hỗ trợ chuẩn tiếng Việt (UTF-8) đầy đủ.

### 2.5 Giả Định Và Phụ Thuộc

> *Hướng dẫn:* Liệt kê các yếu tố giả định hoặc phụ thuộc bên ngoài.
> *Ví dụ:* Giả định rằng Cổng thông tin Sinh viên đã có sẵn tính năng Single Sign-On (SSO) hoạt động ổn định để hệ thống thư viện sử dụng lại. Dự án phụ thuộc vào việc IT cấp phát server đúng hạn vào ngày 15/07.

## 3. Tính Năng Hệ Thống

> *Hướng dẫn:* Liệt kê các nhóm tính năng lớn của hệ thống. 

### 3.1 Quản lý Đăng nhập & Phân quyền (Ví dụ tên tính năng)

#### 3.1.1 Mô Tả
> *Hướng dẫn:* Cung cấp mô tả ngắn gọn về tính năng và mức độ ưu tiên.
> *Ví dụ:* Cho phép người dùng đăng nhập qua SSO và cấp quyền tương ứng (Thủ thư/Sinh viên). Độ ưu tiên: Cao.

#### 3.1.2 Chuỗi Kích Thích/Phản Hồi
> *Hướng dẫn:* Liệt kê các bước thao tác và phản hồi của hệ thống.
> *Ví dụ:* 
> 1. Người dùng bấm "Đăng nhập".
> 2. Hệ thống chuyển hướng sang trang đăng nhập của trường.
> 3. Người dùng nhập tài khoản đúng -> Hệ thống chuyển lại LMS và hiển thị thông tin cá nhân.

#### 3.1.3 Yêu Cầu Chức Năng
> *Hướng dẫn:* Phân tích các yêu cầu chức năng cụ thể liên kết với tính năng này.
> *Ví dụ:* 
> - REQ-AUTH-01: Hệ thống PHẢI tích hợp giao thức OAuth2.0 với hệ thống SSO hiện tại.
> - REQ-AUTH-02: Nếu đăng nhập sai quá 5 lần, tài khoản PHẢI bị khóa tạm thời trong 15 phút.

### 3.2 Quản lý Danh mục Sách (và tương tự)
*(Bổ sung các mô tả tương tự cho các tính năng tiếp theo)*

## 4. Yêu Cầu Về Dữ Liệu

### 4.1 Mô Hình Dữ Liệu Logic
> *Hướng dẫn:* Chỉ định các đối tượng dữ liệu chính (hoặc chèn ảnh sơ đồ ERD).
> *Ví dụ:* Hệ thống lưu trữ các Entity chính: `User` (Người dùng), `Book` (Sách), `Category` (Thể loại), `Loan` (Phiếu mượn). Sơ đồ ERD đính kèm trong Phụ lục B.

### 4.2 Từ Điển Dữ Liệu
> *Hướng dẫn:* Định nghĩa chi tiết các trường quan trọng (độ dài, kiểu dữ liệu).
> *Ví dụ:* `ISBN_Code`: Kiểu String, độ dài 13 ký tự, không được phép null, phải là duy nhất (unique).

### 4.3 Các Báo Cáo
> *Hướng dẫn:* Nêu đặc tả cho các báo cáo đầu ra.
> *Ví dụ:* Báo cáo sách trễ hạn: Phải hiển thị các trường: Tên sinh viên, MSSV, Tên sách, Ngày hết hạn mượn. Hỗ trợ xuất ra Excel.

### 4.4 Thu Thập, Tính Toàn Vẹn, Lưu Trữ Và Hủy Bỏ Dữ Liệu
> *Hướng dẫn:* Yêu cầu về bảo toàn và lưu trữ.
> *Ví dụ:* Dữ liệu về lịch sử mượn sách phải được lưu giữ ít nhất 5 năm sau khi sinh viên ra trường. Sau 5 năm, hệ thống tự động lưu trữ ẩn (archive) sang database khác.

## 5. Yêu Cầu Về Giao Diện Bên Ngoài

### 5.1 Giao Diện Người Dùng
> *Hướng dẫn:* Yêu cầu về chuẩn UI.
> *Ví dụ:* UI phải đáp ứng thiết kế Responsive, hiển thị chuẩn trên màn hình kích thước nhỏ (độ phân giải 360px chiều rộng trở lên). Dùng bộ màu chủ đạo của trường (#0056b3).

### 5.2 Giao Diện Phần Mềm
> *Hướng dẫn:* Mô tả giao tiếp với phần mềm khác (API, Webhook).
> *Ví dụ:* API kết nối với hệ thống Email nội bộ. Đầu vào API là địa chỉ email sinh viên và nội dung thông báo trễ hạn sách. Dữ liệu trao đổi qua JSON.

### 5.3 Giao Diện Phần Cứng
> *Hướng dẫn:* Giao tiếp với thiết bị ngoại vi.
> *Ví dụ:* Hệ thống web phải hỗ trợ nhận diện trực tiếp chuỗi ký tự được quét từ thiết bị Máy quét mã vạch USB khi con trỏ chuột nằm ở ô "Tìm kiếm ISBN".

### 5.4 Giao Diện Truyền Thông
> *Hướng dẫn:* Giao thức mạng, tiêu chuẩn gửi dữ liệu.
> *Ví dụ:* Mọi trao đổi dữ liệu qua Web phải được mã hóa bằng HTTPS/TLS 1.2 trở lên.

## 6. Thuộc Tính Chất Lượng

### 6.1 Tính Dễ Sử Dụng (Usability)
> *Hướng dẫn:* Các tiêu chí về trải nghiệm người dùng.
> *Ví dụ:* Thao tác mượn sách không quá 3 click chuột tính từ trang chủ (cho người dùng đã đăng nhập).

### 6.2 Hiệu Suất (Performance)
> *Hướng dẫn:* Yêu cầu về tốc độ phản hồi, số lượng tải.
> *Ví dụ:* Thời gian tìm kiếm sách khi nhập tên sách phải nhỏ hơn 2 giây, đáp ứng khả năng truy cập đồng thời 500 CCU (người dùng cùng lúc) vào giờ cao điểm.

### 6.3 Bảo Mật (Security)
> *Hướng dẫn:* Yêu cầu bảo mật an toàn thông tin.
> *Ví dụ:* Mật khẩu tài khoản nội bộ (nếu có) phải băm bằng thuật toán bcrypt. Hệ thống phải phòng ngừa được lỗi SQL Injection và XSS theo chuẩn OWASP Top 10.

### 6.4 An Toàn (Safety)
> *Hướng dẫn:* Đảm bảo không làm mất mát hoặc hỏng hóc gây hậu quả nghiêm trọng.
> *Ví dụ:* Bất kỳ thao tác xóa sách khỏi cơ sở dữ liệu đều là Soft Delete (chỉ ẩn đi chứ không xóa khỏi ổ đĩa) để tránh sai sót.

### 6.5 Thuộc tính khác (Tính Khả Mở - Scalability)
> *Ví dụ:* Cấu trúc phần mềm backend thiết kế dưới dạng Docker container để có thể dễ dàng scale up thêm instance khi lượng sinh viên truy cập tăng đột biến vào mùa thi.

## 7. Yêu Cầu Về Quốc Tế Hóa Và Bản Địa Hóa

> *Hướng dẫn:* Yêu cầu về ngôn ngữ, định dạng ngày giờ.
> *Ví dụ:* Giao diện mặc định là Tiếng Việt. Định dạng ngày tháng bắt buộc hiển thị chuẩn VN là DD/MM/YYYY. Tiền tệ (nếu tính phí trễ hạn) là VNĐ (đồng).

## 8. Các Yêu Cầu Khác

> *Hướng dẫn:* Các yêu cầu quy chuẩn pháp lý hoặc nghiệp vụ đặc thù khác.
> *Ví dụ:* Hệ thống phải lưu trữ nhật ký hoạt động (Audit log) của toàn bộ các hành động sửa, xóa dữ liệu từ phía Thủ thư phục vụ mục đích kiểm tra chéo cuối tháng.

## Phụ Lục A: Thuật Ngữ

> *Hướng dẫn:* Định nghĩa mọi thuật ngữ chuyên ngành mà người đọc cần biết.

| Thuật Ngữ / Từ Viết Tắt | Định Nghĩa |
| :--- | :--- |
| SRS | Software Requirements Specification - Đặc Tả Yêu Cầu Phần Mềm |
| SSO | Single Sign-On - Đăng nhập một lần |

## Phụ Lục B: Các Mô Hình Phân Tích

> *Hướng dẫn:* Chèn các sơ đồ phân tích thích hợp như sơ đồ luồng dữ liệu, ERD. (Thêm link ảnh minh họa vào dưới đây).