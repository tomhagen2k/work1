# Bài 5: Kiến thức Nền tảng Kỹ thuật (Cơ sở Dữ liệu - Database)

> [!NOTE]
> Khái niệm Cơ sở dữ liệu (Database) là nền tảng kỹ thuật trọng yếu đối với Business Analyst. Việc hình dung Database như một hệ thống bảng tính điện tử liên kết chặt chẽ sẽ giúp quá trình tiếp cận trở nên logic và dễ dàng hơn. Bài học này cung cấp kiến thức nền tảng về cấu trúc dữ liệu, phục vụ trực tiếp cho việc phân tích và thiết kế hệ thống phần mềm.

## 1. Cơ sở dữ liệu Quan hệ (Relational Database) là gì?

Cơ sở dữ liệu quan hệ (Ví dụ: MySQL, SQL Server, Oracle) lưu trữ thông tin dưới dạng các **Bảng (Tables)** có cấu trúc. Phương pháp lưu trữ này tương đồng với cách tổ chức dữ liệu trên các trang tính (Sheet) của phần mềm Excel, trong đó hệ thống bao gồm nhiều bảng liên kết với nhau (Ví dụ: Bảng Người dùng, Bảng Hóa đơn, Bảng Sản phẩm).

### 1.1. Bảng (Table), Cột (Column) và Bản ghi (Row/Record)

Để làm rõ cấu trúc, chúng ta xem xét ví dụ về một "Bảng" quản lý thông tin Người dùng:

| (Cột 1) <br> **UserID** | (Cột 2) <br> **Họ và Tên** | (Cột 3) <br> **Giới Tính** | (Cột 4) <br> **Ngày Sinh** | (Cột 5) <br> **Số Điện Thoại** |
| :--- | :--- | :--- | :--- | :--- |
| **001** | Nguyễn Văn A | Nam | 01/01/1990 | 0901234567 | *(Bản ghi số 1)* |
| **002** | Trần Thị B | Nữ | 05/05/1995 | 0987654321 | *(Bản ghi số 2)* |
| **003** | Nguyễn Văn A | Nam | 01/01/1990 | 0999888777 | *(Bản ghi số 3)* |

Dựa trên minh họa trên, các định nghĩa cốt lõi bao gồm:
- **Table (Bảng):** Tập hợp dữ liệu về một đối tượng cụ thể. Ở ví dụ trên, toàn bộ khung lưới được gọi là Bảng `NguoiDung`, dùng để lưu trữ dữ liệu tập trung về đối tượng người dùng.
- **Column (Cột / Trường dữ liệu):** Đại diện cho các **thuộc tính** của đối tượng (Cột 1 đến Cột 5). Trong cơ sở dữ liệu quan hệ, cấu trúc các cột (như `Họ và Tên`, `Giới Tính`) bắt buộc phải được khai báo trước khi hệ thống tiếp nhận dữ liệu.
- **Row (Hàng / Bản ghi - Record):** Mỗi hàng ngang chứa thông tin chi tiết của **một thực thể duy nhất**. Nếu hệ thống ghi nhận 10,000 khách hàng, Bảng `NguoiDung` sẽ tự động mở rộng thành 10,000 bản ghi tương ứng.

### 1.2. Khóa chính (Primary Key - PK)

> *Vấn đề thực tiễn:* Trong bảng minh họa trên, Bản ghi số 1 và Bản ghi số 3 đều có chung `Họ và Tên`, `Giới Tính` và `Ngày Sinh`. Nếu yêu cầu hệ thống "Xóa dữ liệu của Nguyễn Văn A sinh năm 1990", hệ thống sẽ không thể xác định chính xác đối tượng cần thao tác, dẫn đến rủi ro sai sót dữ liệu.

Để giải quyết vấn đề định danh, mỗi bảng **bắt buộc phải thiết lập một Khóa chính**.
- **Định nghĩa:** Khóa chính là một trường dữ liệu (hoặc tập hợp các trường) mang giá trị **Duy nhất (Unique)** trên toàn bộ bảng và **Tuyệt đối không được rỗng (Not Null)**.
- *Ví dụ thực tế:* Tương tự như **Số Căn cước công dân (CCCD)** hoặc **Mã số Sinh viên**. Đây là yếu tố định danh duy nhất giúp hệ thống phân biệt một cá nhân với hàng triệu người khác, bất chấp sự trùng lặp về họ tên hay ngày sinh.
- *Ứng dụng trong Database:* Cột `UserID` trong bảng trên đóng vai trò Khóa chính. Khi cần cập nhật thông tin, hệ thống chỉ cần dựa vào truy vấn *"Xóa UserID = 003"*, đảm bảo độ chính xác tuyệt đối.

### 1.3. Khóa ngoại (Foreign Key - FK)

- **Định nghĩa:** Khóa ngoại là một trường dữ liệu trong Bảng A, chứa giá trị tham chiếu trực tiếp đến Khóa chính của Bảng B. Khóa ngoại được sử dụng để thiết lập **Mối quan hệ (Relationship)** giữa các bảng.
- *Ví dụ minh họa:* 
  Khi xây dựng Bảng `DonHang` (Orders), việc sao chép lại toàn bộ họ tên, ngày sinh của khách hàng sẽ gây ra sự dư thừa dữ liệu và tăng rủi ro sai lệch. Thay vào đó, chúng ta chỉ cần thiết lập trường `UserID` (Khóa ngoại) trong Bảng `DonHang`. 
  Khi cần truy xuất thông tin, hệ thống sẽ sử dụng giá trị `UserID = 001` tại Bảng `DonHang` để tham chiếu đối chiếu với Khóa chính `001` tại Bảng `NguoiDung`, từ đó lấy ra thông tin đầy đủ của khách hàng.

---

## 2. Các loại Quan hệ Dữ liệu (Relationships)

Năng lực xác định mối quan hệ giữa các thực thể dữ liệu là yếu tố then chốt để BA tham gia thiết kế kiến trúc thông tin. Có 3 chuẩn quan hệ cơ bản:

### 2.1. Quan hệ 1 - 1 (One-to-One)
- **Định nghĩa:** Một bản ghi tại Bảng A liên kết với **duy nhất một** bản ghi tại Bảng B, và ngược lại.
- **Ví dụ minh họa:** Mối quan hệ giữa **Công dân** và **Hộ chiếu**. Theo quy định pháp luật, một công dân chỉ được sở hữu một hộ chiếu phổ thông hiện hành, và một cuốn hộ chiếu cụ thể chỉ được cấp cho đúng một công dân.

### 2.2. Quan hệ 1 - N (One-to-Many)
- **Định nghĩa:** Một bản ghi tại Bảng A có thể tham chiếu đến **nhiều** bản ghi tại Bảng B, nhưng một bản ghi tại Bảng B chỉ trực thuộc **duy nhất một** bản ghi tại Bảng A. Đây là mô hình quan hệ phổ biến nhất.
- **Ví dụ minh họa:** Mối quan hệ giữa **Phòng ban** và **Nhân viên**. Một Phòng ban có thể quản lý nhiều Nhân viên (1 - N), nhưng một Nhân viên tại một thời điểm chỉ biên chế tại một Phòng ban duy nhất.
- *Ví dụ trong hệ thống:* Mối quan hệ giữa **Khách hàng** và **Đơn hàng**. Khách hàng có thể thực hiện nhiều giao dịch, nhưng mỗi mã Đơn hàng chỉ ghi nhận cho một tài khoản khách hàng duy nhất.

### 2.3. Quan hệ N - N (Many-to-Many)
- **Định nghĩa:** Một bản ghi tại Bảng A liên kết với **nhiều** bản ghi tại Bảng B, và đồng thời một bản ghi tại Bảng B cũng liên kết với **nhiều** bản ghi tại Bảng A.
- **Ví dụ minh họa:** Mối quan hệ giữa **Sinh viên** và **Môn học**. Một Sinh viên có thể đăng ký nhiều Môn học khác nhau, và một Môn học cũng tiếp nhận nhiều Sinh viên tham gia.
- **Phương pháp xử lý:** Các hệ quản trị cơ sở dữ liệu không hỗ trợ lưu trữ trực tiếp quan hệ N - N. Giải pháp kỹ thuật bắt buộc là thiết lập một **Bảng trung gian (Junction Table)**. Trong ví dụ trên, bảng trung gian `DangKyMonHoc` sẽ được tạo ra, chứa ít nhất hai Khóa ngoại là `Mã_SinhVien` và `Mã_MonHoc` để chuẩn hóa mối liên kết.

---

## 3. Cơ sở dữ liệu Phi quan hệ (NoSQL) và Ứng dụng trong An ninh mạng

### 3.1. Đặc tính của Cơ sở dữ liệu Phi quan hệ (NoSQL)

Khác với sự khắt khe về cấu trúc của hệ SQL (yêu cầu khai báo cột dữ liệu trước khi nhập), hệ quản trị **NoSQL (Ví dụ: MongoDB, Elasticsearch)** mang tính linh hoạt cao. Dữ liệu được lưu trữ dưới dạng các **Tài liệu (Document)** độc lập, thông thường sử dụng định dạng JSON.

**Ví dụ minh họa cấu trúc NoSQL:**
Dưới đây là 2 "Tài liệu" lưu trữ thông tin của 2 đối tượng trong cùng một hệ thống NoSQL:

```json
// Tài liệu số 1 (Dữ liệu của Người dùng A):
{
  "ho_ten": "Nguyễn Văn A",
  "tuoi": 20
}
```

```json
// Tài liệu số 2 (Dữ liệu của Người dùng B - Cấu trúc mở rộng độc lập):
{
  "ho_ten": "Trần Thị B",
  "so_thich": ["Đọc sách", "Nghe nhạc"],
  "dia_chi_ip": "192.168.1.15",
  "thiet_bi": "iPhone 15"
}
```
*Phân tích:* Tài liệu số 2 chứa nhiều trường thông tin bổ sung so với Tài liệu số 1. Hệ thống NoSQL vẫn tiếp nhận và ghi nhận chuẩn xác mà không phát sinh lỗi ràng buộc cấu trúc. Tính năng này cho phép ứng dụng mở rộng dữ liệu mà không cần thiết lập trước cấu trúc bảng.

### 3.2. Tính ứng dụng trong lĩnh vực Cybersecurity (AV, EDR, SOAR)

Trong vận hành An ninh mạng, máy chủ trung tâm phải xử lý hàng triệu **Cảnh báo bảo mật (Logs/Alerts)** theo thời gian thực.
- **Hạn chế của SQL:** Các bản ghi Log từ Firewall, phần mềm Diệt Virus (AV), và Máy trạm (Endpoint) có cấu trúc trường dữ liệu khác biệt hoàn toàn (Firewall tập trung vào `IP`, trong khi AV tập trung vào `File Path` và `Malware Signature`). Hệ SQL sẽ gặp tình trạng thắt cổ chai hiệu năng khi xử lý cấu trúc dữ liệu không đồng nhất này.
- **Ưu điểm của NoSQL:** NoSQL là giải pháp lưu trữ tối ưu, có khả năng tiếp nhận ngay lập tức mọi cảnh báo bảo mật bất chấp sự sai biệt về định dạng cấu trúc. Khả năng xử lý Dữ liệu lớn (Big Data) với độ trễ thấp giúp các hệ thống bảo mật như EDR và SOAR duy trì năng lực phân tích theo thời gian thực (Real-time Analysis).

---

## 4. Bài tập & Tự nghiên cứu

> [!IMPORTANT]
> Việc am hiểu về cấu trúc dữ liệu giúp BA truyền đạt chính xác yêu cầu nghiệp vụ đến Đội ngũ Kỹ thuật. Hãy hoàn thành các bài tập sau để củng cố tư duy thiết kế dữ liệu.

### 4.1. Câu hỏi lý thuyết (Tự nghiên cứu)
1. Hãy tìm hiểu khái niệm **Cột tự tăng (Auto-increment)** trong Cơ sở dữ liệu. Dựa trên khía cạnh quản trị dữ liệu, tại sao Khóa chính (Primary Key) thường được cấu hình tự động tăng thay vì cho phép người dùng can thiệp thủ công?
2. Khái niệm **ERD (Entity Relationship Diagram - Biểu đồ Thực thể Liên kết)** là gì? Mô hình này đóng vai trò thế nào trong bộ tài liệu Đặc tả hệ thống (SRS)?
3. Phân tích sự khác biệt về mặt kỹ thuật và mức độ ảnh hưởng giữa hai câu lệnh cơ bản: **DELETE** (Xóa bản ghi) và **DROP** (Xóa bảng) trong hệ quản trị SQL.
4. Dựa trên đặc tính của SQL và NoSQL, hãy đề xuất 01 kịch bản dự án nên ưu tiên sử dụng SQL, và 01 kịch bản dự án bắt buộc phải sử dụng NoSQL. Giải thích ngắn gọn lập luận của bạn.

### 4.2. Bài tập thực hành Phân tích Quan hệ dữ liệu

**Bài tập 1: Hệ thống Quản lý Bán lẻ**
Bạn đang thiết kế hệ thống CSDL cho một chuỗi siêu thị với 3 thực thể: `Nhân viên Thu ngân`, `Hóa đơn Mua hàng`, và `Sản phẩm`.
- **Yêu cầu:** 
  1. Xác định mối quan hệ giữa bảng `Nhân viên Thu ngân` và `Hóa đơn Mua hàng`. Giải thích logic.
  2. Xác định mối quan hệ giữa bảng `Hóa đơn Mua hàng` và `Sản phẩm`. Nếu cần thiết lập Bảng trung gian, hãy đặt tên và liệt kê tối thiểu 3 trường dữ liệu bắt buộc (Khóa chính, Khóa ngoại) cho bảng đó.

**Bài tập 2: Hệ thống Quản lý Thư viện (Mức độ Nâng cao)**
Một thư viện điện tử cần hệ thống hóa việc cho mượn sách. Các thực thể chính bao gồm: `Độc giả`, `Đầu sách` (Ví dụ: Sách Đắc Nhân Tâm), và `Phiếu Mượn`.
- **Yêu cầu:**
  1. Một `Độc giả` có thể mượn nhiều `Đầu sách`, và một `Đầu sách` có thể được mượn bởi nhiều `Độc giả` khác nhau ở các thời điểm khác nhau. Hãy xác định mô hình liên kết dữ liệu tổng thể cho quy trình này.
  2. Bảng `Phiếu Mượn` trong trường hợp này đóng vai trò gì? Liệt kê các Khóa ngoại cần thiết lập trong bảng `Phiếu Mượn` để liên kết thông tin.

<!-- GÓC DÀNH CHO MENTOR (XÓA PHẦN NÀY TRƯỚC KHI GỬI CHO HỌC VIÊN) -->
> [!CAUTION]
> **TÀI LIỆU NỘI BỘ DÀNH CHO MENTOR (HƯỚNG DẪN ĐÁNH GIÁ ĐÁP ÁN):**
> 
> **Phần Bài tập 1:**
> - Nhân viên & Hóa đơn: Quan hệ **1 - N** (Một nhân viên xuất nhiều hóa đơn, một hóa đơn chỉ do một nhân viên xuất).
> - Hóa đơn & Sản phẩm: Quan hệ **N - N** (Một hóa đơn có nhiều sản phẩm, một sản phẩm nằm trong nhiều hóa đơn).
> - Bảng trung gian: `ChiTietHoaDon` (Order Details). Cần có: `Mã_HoaDon` (FK), `Mã_SanPham` (FK), và `SoLuong_Mua` (Để ghi nhận số lượng mặt hàng).
> 
> **Phần Bài tập 2:**
> - Quan hệ tổng thể giữa Độc giả và Đầu sách là **N - N**.
> - Bảng `Phiếu Mượn` chính là **Bảng trung gian (Junction Table)** được sinh ra để giải quyết quan hệ N - N này.
> - Cấu trúc bảng `Phiếu Mượn`: Bắt buộc phải chứa `Ma_DocGia` (FK trỏ về bảng Độc giả) và `Ma_Sach` (FK trỏ về bảng Đầu sách). Các trường phụ có thể là `NgayMuon`, `NgayTra`.
<!-- KẾT THÚC PHẦN CỦA MENTOR -->
