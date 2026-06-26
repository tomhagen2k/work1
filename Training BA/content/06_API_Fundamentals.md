# Bài 6: Kiến thức Nền tảng Kỹ thuật (Giao tiếp Hệ thống - API)

> [!NOTE]
> Trong môi trường công nghệ hiện đại, hiếm có phần mềm nào hoạt động độc lập hoàn toàn. Các hệ thống cần phải "nói chuyện" và trao đổi dữ liệu với nhau (Ví dụ: Ứng dụng mua sắm cần giao tiếp với hệ thống của Ngân hàng để thanh toán). Công cụ để thực hiện quá trình giao tiếp đó chính là **API**. Bài học này sẽ giúp Business Analyst nắm bắt cơ bản cơ chế vận hành của API.

## 1. Giao diện Lập trình Ứng dụng (API) là gì?

### 1.1. Khái niệm cốt lõi và Mô hình Client - Server
**API (Application Programming Interface)** là một tập hợp các quy tắc và giao thức kỹ thuật, cho phép hai hệ thống phần mềm độc lập có thể giao tiếp và trao đổi dữ liệu với nhau một cách an toàn và chuẩn xác.

API hoạt động dựa trên mô hình **Client - Server**:
- **Client (Hệ thống yêu cầu / Máy Khách):** Là hệ thống hoặc thiết bị khởi tạo yêu cầu gửi đi. (Ví dụ: Trình duyệt web hoặc Ứng dụng trên điện thoại di động).
- **Server (Hệ thống cung cấp / Máy Chủ):** Là hệ thống trung tâm lưu trữ dữ liệu và xử lý logic. Server tiếp nhận yêu cầu từ Client, tiến hành xử lý và trả về kết quả.

### 1.2. Ví dụ minh họa (Ẩn dụ Nhà hàng)
Để dễ hình dung cơ chế hoạt động của mô hình trên, chúng ta có thể so sánh API với quy trình phục vụ tại một nhà hàng:
- **Khách hàng (Đóng vai trò là Client):** Là người có nhu cầu và đưa ra yêu cầu gọi món. Khách hàng xem thực đơn và chọn món, nhưng không được phép tự ý xông vào nhà bếp để lấy đồ ăn vì lý do an toàn và quy trình.
- **Nhà bếp (Đóng vai trò là Server):** Là nơi chứa nguyên liệu (Dữ liệu) và thực hiện quá trình chế biến (Xử lý logic).
- **Người bồi bàn (Đóng vai trò là API):** Là cầu nối trung gian. Bồi bàn sẽ tiếp nhận yêu cầu (Order) từ Khách hàng, mang yêu cầu đó truyền đạt lại cho Nhà bếp. Sau khi Bếp nấu xong, Bồi bàn sẽ mang món ăn (Kết quả) trả lại chính xác cho Khách hàng.

---

## 2. Cấu trúc Giao tiếp: Request và Response

Quá trình giao tiếp thông qua API luôn được vận hành theo hai chiều đối lập: **Request (Yêu cầu gửi đi)** và **Response (Phản hồi trả về)**.

### 2.1. Cấu trúc của một Request (Yêu cầu)
Khi Client muốn Server thực hiện một tác vụ, nó phải đóng gói một thông điệp Request bao gồm 4 thành phần kỹ thuật:
1. **Endpoint (Địa chỉ đích):** Là một đường dẫn (URL) trỏ chính xác đến một chức năng cụ thể trên Server.
2. **Method (Phương thức thao tác):** Xác định loại hành động mà Client muốn Server thực hiện. Có 4 phương thức cơ bản:
   - **GET:** Yêu cầu Server cung cấp/đọc dữ liệu.
   - **POST:** Gửi dữ liệu mới lên Server để tạo lập một bản ghi.
   - **PUT / PATCH:** Gửi dữ liệu lên Server để cập nhật/sửa đổi một bản ghi đã tồn tại.
   - **DELETE:** Yêu cầu Server xóa một bản ghi dữ liệu.
3. **Headers (Tiêu đề / Siêu dữ liệu):** Chứa các thông tin kiểm duyệt và cấu hình, quan trọng nhất là mã xác thực danh tính (Authentication Token).
4. **Body (Dữ liệu tải trọng):** Khối dữ liệu thực tế mà Client muốn gửi lên Server để xử lý. (Thường chỉ áp dụng cho phương thức POST và PUT).

### 2.2. Cấu trúc của một Response (Phản hồi)
Sau khi Server tiếp nhận và xử lý xong Request, nó sẽ trả về một thông điệp Response bao gồm 2 thành phần chính:
1. **HTTP Status Code (Mã Trạng thái):** Một dãy số gồm 3 chữ số dùng để thông báo kết quả của quá trình xử lý.
   - **Nhóm 2xx (Thành công):** Yêu cầu đã được xử lý hoàn tất.
   - **Nhóm 4xx (Lỗi từ phía Client):** Yêu cầu bị từ chối do Client gửi sai thông tin hoặc thiếu quyền truy cập.
   - **Nhóm 5xx (Lỗi từ phía Server):** Client gửi yêu cầu đúng, nhưng Server gặp sự cố nội bộ không thể xử lý.
2. **Body (Dữ liệu trả về):** Kết quả dữ liệu mà Server xuất ra để trả lại cho Client (Nếu có).

### 2.3. Ví dụ minh họa (Áp dụng ẩn dụ Nhà hàng)
Để làm rõ các khái niệm kỹ thuật khô khan ở phần 2.1 và 2.2, hãy cùng ánh xạ chúng vào ví dụ Nhà hàng:

**Tạo Request (Khách hàng gọi món):**
- **Endpoint:** Khách hàng chỉ định món "Phở Bò" (Xác định chính xác đối tượng).
- **Method:** Khách hàng dùng phương thức **POST** (Yêu cầu nhà bếp "Tạo ra" một bát phở mới, thay vì chỉ "Đọc" tên món ăn).
- **Headers:** Khách hàng xuất trình "Thẻ Thành viên VIP" (Cung cấp mã xác thực danh tính).
- **Body:** Khách hàng ghi chú thêm "Không hành, nhiều bánh" (Gửi kèm khối dữ liệu chi tiết).

**Nhận Response (Bồi bàn phản hồi):**
- Trạng thái **200 OK**: Nhà bếp nấu xong, Bồi bàn mang bát phở (Body) ra cho Khách.
- Trạng thái **400 Bad Request**: Khách ghi chú món ăn bằng ngôn ngữ lạ, nhà bếp không đọc hiểu được cấu trúc dữ liệu.
- Trạng thái **401 Unauthorized**: Khách chưa xuất trình thẻ VIP nên không được phép gọi món đặc biệt này.
- Trạng thái **404 Not Found**: Khách gọi món "Pizza", nhưng nhà hàng này không hề bán Pizza (Endpoint không tồn tại).
- Trạng thái **500 Internal Server Error**: Khách gọi đúng món "Phở Bò", nhưng nhà bếp đang bị mất điện, không thể nấu được.

---

## 3. Định dạng JSON và Kỹ thuật Ánh xạ dữ liệu (Data Mapping)

### 3.1. Cấu trúc JSON (JavaScript Object Notation)
Trong phần "Body" của Request và Response, các hệ thống phần mềm không gửi cho nhau các tệp văn bản thông thường (như Word hay PDF). Thay vào đó, chúng sử dụng một tiêu chuẩn định dạng dữ liệu quốc tế mang tên **JSON**.
Đặc tính cốt lõi của JSON là tổ chức dữ liệu theo các cặp đối xứng: `"Từ khóa": "Giá trị"`.

**Ví dụ minh họa cấu trúc JSON:**
Dưới đây là một đoạn dữ liệu JSON (Response Body) mà Server trả về khi Client dùng phương thức GET để yêu cầu lấy thông tin thời tiết:

```json
{
  "thanh_pho": "Hà Nội",
  "nhiet_do": 35,
  "don_vi": "Celsius",
  "trang_thai": "Nắng gắt",
  "canh_bao_tia_UV": true
}
```

### 3.2. Ánh xạ dữ liệu (Data Mapping)
Đối với Business Analyst, việc trực tiếp lập trình ra các API là không cần thiết. Kỹ năng cốt lõi của BA là thực hiện **Data Mapping (Ánh xạ dữ liệu)**.
Data Mapping là quá trình BA xác định rõ ràng sự liên kết giữa Dữ liệu thô (từ JSON) và Giao diện người dùng (UI).

**Ví dụ minh họa Data Mapping:**
- Bạn đang thiết kế một màn hình Ứng dụng Thời tiết. Trên bản thiết kế, bạn vẽ một ô hiển thị văn bản mang tên "Nhiệt độ hiện tại".
- Trong tài liệu Đặc tả (SRS), bạn phải thực hiện Data Mapping bằng cách viết rõ yêu cầu cho Đội ngũ Lập trình (Developer): *"Hệ thống cần trích xuất giá trị từ trường `nhiet_do` trong tệp JSON trả về, sau đó hiển thị giá trị này vào ô [Nhiệt độ hiện tại] trên giao diện, đồng thời nối thêm ký tự '°C' ở phía sau"*.

---

## 4. Bài tập & Tự nghiên cứu

> [!IMPORTANT]
> Hiểu rõ API giúp BA đánh giá được tính khả thi của một chức năng tích hợp. Nếu khách hàng yêu cầu phần mềm của bạn hiển thị số dư tài khoản ngân hàng của họ, câu hỏi đầu tiên bạn phải phân tích là: *"Ngân hàng đó có cung cấp API để hệ thống của chúng ta có thể gọi và lấy dữ liệu hay không?"*

### 4.1. Câu hỏi lý thuyết (Tự nghiên cứu)
1. Dựa trên lý thuyết về các Phương thức (Methods), khi người dùng nhấn nút "Thêm vào giỏ hàng" trên ứng dụng mua sắm trực tuyến, ứng dụng nên gửi một API với phương thức nào về Server? Giải thích nguyên nhân.
2. Tại sao quy chuẩn kỹ thuật lại phân tách mã lỗi thành hai nhóm riêng biệt: Nhóm 4xx (Lỗi do Client) và Nhóm 5xx (Lỗi do Server)? Việc phân định ranh giới trách nhiệm này mang lại lợi ích gì trong quá trình vận hành và bảo trì hệ thống?

### 4.2. Bài tập thực hành Phân tích JSON và Data Mapping

**Bối cảnh dự án:**
Bạn đang thiết kế màn hình **Hồ sơ Cá nhân** (User Profile) cho một ứng dụng điện thoại. Giao diện thiết kế (UI) yêu cầu hiển thị 3 vùng thông tin: `Tên hiển thị`, `Tuổi`, và `Trạng thái tài khoản (Đang hoạt động/Đã khóa)`.

Đội ngũ Kỹ thuật phụ trách Server cung cấp cho bạn cấu trúc dữ liệu JSON (Response) sẽ được trả về khi ứng dụng gọi API lấy thông tin người dùng như sau:

```json
{
  "user_id": "U123456",
  "full_name": "Nguyễn Trần Trung Quân",
  "year_of_birth": 2000,
  "is_active": true,
  "last_login_date": "2023-10-25T14:30:00Z"
}
```

**Yêu cầu dành cho học viên:**
1. Hãy lập một bảng **Data Mapping** cơ bản. Cột bên trái liệt kê 3 thông tin cần hiển thị trên Giao diện (UI). Cột bên phải chỉ định chính xác tên trường dữ liệu (Từ khóa) tương ứng trong tệp JSON sẽ được trích xuất để gán vào UI.
2. *Tình huống xử lý nghiệp vụ:* Tệp JSON do Server cung cấp chỉ chứa dữ liệu năm sinh (`year_of_birth`), tuy nhiên giao diện UI lại yêu cầu hiển thị con số "Tuổi". Trong vai trò BA, bạn sẽ mô tả logic xử lý dữ liệu này như thế nào trong tài liệu Đặc tả (SRS) để Đội ngũ Lập trình Giao diện (Frontend Developer) có thể triển khai chính xác?

<!-- GÓC DÀNH CHO MENTOR (XÓA PHẦN NÀY TRƯỚC KHI GỬI CHO HỌC VIÊN) -->
> [!CAUTION]
> **TÀI LIỆU NỘI BỘ DÀNH CHO MENTOR (HƯỚNG DẪN ĐÁNH GIÁ ĐÁP ÁN):**
> 
> **Phần Câu hỏi Lý thuyết (4.1):**
> 1. Hành động "Thêm vào giỏ hàng" bản chất là việc *Tạo ra một bản ghi dữ liệu mới* trong hệ thống giỏ hàng. Do đó, phương thức chuẩn xác bắt buộc phải là **POST**. (Nếu học viên chọn phương thức GET là hiểu sai bản chất vấn đề).
> 
> **Phần Bài tập Thực hành (4.2):**
> 1. **Bảng Data Mapping:**
>    - UI `Tên hiển thị` <--> JSON `full_name`.
>    - UI `Trạng thái tài khoản` <--> JSON `is_active` (BA cần chỉ định thêm điều kiện: Nếu `is_active = true` thì hiển thị văn bản "Đang hoạt động", ngược lại hiển thị "Đã khóa").
>    - UI `Tuổi` <--> Tương tác với JSON `year_of_birth`.
> 2. **Xử lý nghiệp vụ hiển thị Tuổi:**
>    - Học viên cần thể hiện được tư duy chuyển đổi dữ liệu thông qua logic trong tài liệu SRS: *"Hệ thống Frontend cần lấy [Năm hiện tại] trừ đi giá trị của trường [year_of_birth] được trả về từ tệp JSON. Giá trị chênh lệch thu được chính là số Tuổi cần hiển thị ra giao diện"*. Bài tập này nhằm kiểm tra khả năng tư duy bắc cầu giữa dữ liệu thô và yêu cầu nghiệp vụ thực tiễn của BA.
<!-- KẾT THÚC PHẦN CỦA MENTOR -->
