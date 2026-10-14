Dùng skill srs-writer để viết tài liệu SRS cho tính năng sau:

- Mã tính năng: ACC_EKYC_01
- Tên tính năng: Xác thực danh tính điện tử (eKYC Identity Verification)
- Mục đích: Cho phép khách hàng tự xác thực danh tính trực tuyến bằng ảnh giấy tờ tùy thân và xác thực khuôn mặt, hệ thống tự động đối chiếu qua nhà cung cấp eKYC; các hồ sơ chưa đủ ngưỡng tin cậy được chuyển cho nhân viên Tuân thủ duyệt thủ công. Tài khoản đã xác thực mới được rút tiền và chuyển khoản trên 10.000.000 VNĐ.
- Tác nhân / vai trò sử dụng:
  + Khách hàng (End-user): gửi hồ sơ KYC của chính mình.
  + Nhân viên Tuân thủ (Compliance Officer): xem danh sách, duyệt / từ chối / yêu cầu bổ sung hồ sơ.
  + Trưởng phòng Tuân thủ (Compliance Manager): như Nhân viên Tuân thủ, thêm quyền xuất file và xem số giấy tờ đầy đủ.
  + Hệ thống: nhà cung cấp eKYC bên ngoài (OCR, so khớp khuôn mặt, kiểm tra người thật) và tác vụ nền nhắc SLA.
- Mockup giao diện: `E:\work1\KYC\kyc_verification_mockup.html` (mỗi màn hình mở bằng hash tương ứng: `#viewSubmit`, `#modalLiveness`, `#viewList`, `#modalReview`)
- File đầu ra: `E:\work1\Docs\SRS_Xac_Thuc_KYC.md`

Nghiệp vụ chi tiết:

1. Màn hình Gửi hồ sơ KYC — Khách hàng (`#viewSubmit`)
   - Ảnh giao diện: `E:\work1\Docs\images_kyc\01_kyc_submit_form.png`
   - Truy cập từ menu "Tài khoản" → "Xác thực danh tính". Đầu màn hình có banner hiển thị trạng thái KYC hiện tại của khách hàng (Chưa xác thực / Đang xử lý / Chờ duyệt / Đã xác thực / Cần bổ sung / Bị từ chối) kèm câu giải thích. Khi trạng thái là Đang xử lý, Chờ duyệt hoặc Đã xác thực thì form chỉ hiển thị ở chế độ xem, không cho gửi lại.
   - Nhóm 1 – Ảnh giấy tờ tùy thân:
     + Loại giấy tờ: Radio "CCCD gắn chip" (mặc định) / "Hộ chiếu". Chọn Hộ chiếu thì ẩn ô Ảnh mặt sau và đổi quy tắc Số giấy tờ.
     + Ảnh mặt trước, Ảnh mặt sau: Upload 1 ảnh mỗi ô, JPG/PNG, tối đa 5 MB, hỗ trợ kéo thả; ảnh nhỏ hơn 600x400 px bị từ chối.
     + Nút "Trích xuất thông tin": chỉ enable khi đã có đủ ảnh theo loại giấy tờ. Gọi OCR của nhà cung cấp eKYC (timeout 10 giây) để tự động điền Nhóm 2; các trường được điền tự động có nền xanh nhạt và khách hàng vẫn được sửa. OCR thất bại thì hiển thị toast lỗi và cho phép khách hàng tự nhập.
   - Nhóm 2 – Thông tin cá nhân:
     + Số giấy tờ: bắt buộc. CCCD đúng 12 chữ số; Hộ chiếu 8–9 ký tự gồm chữ in hoa và số. Một số giấy tờ chỉ được gắn với một tài khoản đã xác thực.
     + Họ và tên: bắt buộc, tối đa 100 ký tự, tự động chuyển in hoa, chỉ cho phép chữ cái (có dấu) và khoảng trắng.
     + Ngày sinh: bắt buộc, khách hàng phải đủ 18 tuổi tính đến ngày gửi.
     + Giới tính: Dropdown Nam / Nữ, bắt buộc.
     + Quốc tịch: Dropdown có tìm kiếm, danh sách quốc gia, mặc định Việt Nam.
     + Ngày cấp: bắt buộc, không lớn hơn ngày hiện tại và phải sau Ngày sinh.
     + Ngày hết hạn: bắt buộc, phải lớn hơn ngày hiện tại. Có checkbox "Không thời hạn" (chỉ hiển thị với CCCD); khi tích thì khóa ô Ngày hết hạn.
     + Nơi cấp: Dropdown có tìm kiếm, không bắt buộc.
     + Địa chỉ thường trú: Textarea bắt buộc, tối đa 255 ký tự, có bộ đếm ký tự.
   - Nhóm 3 – Xác thực khuôn mặt: Nút "Bắt đầu xác thực khuôn mặt" mở popup Liveness. Sau khi hoàn tất, hiển thị ảnh khuôn mặt đã chụp và trạng thái "Đã thực hiện", nút đổi thành "Thực hiện lại".
   - Checkbox đồng ý xử lý dữ liệu cá nhân (có link Chính sách bảo vệ dữ liệu cá nhân): bắt buộc tích mới gửi được.
   - Nút "Hủy": nếu form đã có thay đổi thì hiển thị cảnh báo dữ liệu chưa lưu.
   - Nút "Gửi xác thực": validate toàn bộ, gửi hồ sơ, trạng thái chuyển sang Đang xử lý, hiển thị toast thành công. Mỗi khách hàng gửi tối đa 5 lần/ngày.

2. Popup Xác thực khuôn mặt — Liveness (`#modalLiveness`)
   - Ảnh giao diện: `E:\work1\Docs\images_kyc\02_kyc_liveness_popup.png`
   - Yêu cầu quyền truy cập camera; khách hàng từ chối quyền thì hiển thị hướng dẫn bật camera.
   - Khung camera có viền oval, hướng dẫn lần lượt 4 thao tác ngẫu nhiên thứ tự: Nhìn thẳng, Quay trái, Quay phải, Chớp mắt. Thanh tiến trình 4 bước, đồng hồ đếm ngược tổng 30 giây.
   - Hết thời gian hoặc không phát hiện khuôn mặt: thông báo lỗi, cho phép "Thực hiện lại" (tối đa 3 lần mỗi phiên).
   - Nút "Xác nhận" chỉ enable khi hoàn tất cả 4 thao tác; nút "Hủy" đóng popup, không lưu kết quả.

3. Xử lý tự động sau khi gửi hồ sơ
   - Hệ thống gửi ảnh giấy tờ và ảnh khuôn mặt sang nhà cung cấp eKYC để: so khớp khuôn mặt với ảnh trên giấy tờ (điểm 0–100%), kiểm tra người thật, kiểm tra giấy tờ giả mạo/chỉnh sửa, đối chiếu dữ liệu khai báo với dữ liệu OCR.
   - Quy tắc kết luận tự động:
     + Điểm khớp ≥ 85%, Liveness đạt, không có sai lệch dữ liệu, không nghi giả mạo → Đã xác thực.
     + Điểm khớp từ 60% đến dưới 85%, hoặc có sai lệch dữ liệu giữa khai báo và OCR → Chờ duyệt (duyệt thủ công).
     + Điểm khớp < 60%, Liveness không đạt, hoặc nghi giấy tờ giả mạo → Bị từ chối.
   - Nhà cung cấp eKYC lỗi hoặc timeout: thử lại tối đa 3 lần cách nhau 1 phút; vẫn lỗi thì chuyển hồ sơ sang Chờ duyệt.
   - Mỗi lần thay đổi trạng thái đều gửi thông báo (email + thông báo trong ứng dụng) cho khách hàng và ghi Audit Log.

4. Màn hình Danh sách hồ sơ KYC — Nhân viên Tuân thủ (`#viewList`)
   - Ảnh giao diện: `E:\work1\Docs\images_kyc\03_kyc_review_list.png`
   - Menu "Quản trị" → "Tuân thủ" → "Hồ sơ KYC".
   - Thanh công cụ: Ô tìm kiếm (theo mã hồ sơ, tên khách hàng, số điện thoại; tìm sau 500 ms ngừng gõ), bộ lọc Trạng thái (mặc định Chờ duyệt), bộ lọc Loại giấy tờ, khoảng Ngày gửi (mặc định 7 ngày gần nhất, tối đa 90 ngày), nút "Xóa bộ lọc", nút "Xuất file" (Excel, theo bộ lọc hiện tại, tối đa 10.000 dòng).
   - Bảng: Mã hồ sơ (link mở popup duyệt ở chế độ xem), Khách hàng (tên + số điện thoại che giữa), Loại giấy tờ, Số giấy tờ (che giữa), Khớp khuôn mặt (thanh màu: xanh ≥ 85, cam 60–84, đỏ < 60), Kết quả tự động, Trạng thái (tag màu), Ngày gửi, Người xử lý ("Hệ thống" nếu tự động), Hành động (Xem; Duyệt chỉ hiển thị với hồ sơ Chờ duyệt). Sắp xếp mặc định Ngày gửi cũ nhất lên đầu, phân trang 20 dòng/trang.
   - Có Empty State và Error State.

5. Popup Duyệt hồ sơ KYC (`#modalReview`)
   - Ảnh giao diện: `E:\work1\Docs\images_kyc\04_kyc_review_popup.png`
   - Thẻ tóm tắt: Điểm khớp khuôn mặt (kèm ngưỡng tự duyệt 85%), Kết quả Liveness, Chất lượng ảnh giấy tờ, Thời gian chờ duyệt / SLA 24 giờ (chuyển màu đỏ khi quá SLA).
   - Tab "Thông tin hồ sơ": ảnh mặt trước, mặt sau, ảnh khuôn mặt (click để phóng to); bảng so sánh "Khách hàng khai báo" và "Trích xuất từ ảnh (OCR)", các trường sai lệch tô đỏ. Số giấy tờ hiển thị che giữa, có link "Hiện" để xem đầy đủ (chỉ người có quyền xem dữ liệu nhạy cảm, mỗi lần bấm đều ghi Audit Log).
   - Tab "Lịch sử xử lý": danh sách các lần gửi và các lần thay đổi trạng thái của khách hàng (thời gian, người thực hiện, trạng thái, lý do).
   - Lý do: Dropdown (Ảnh mờ/không rõ, Thông tin không khớp giấy tờ, Giấy tờ hết hạn, Nghi giả mạo, Khuôn mặt không khớp, Khác), bắt buộc khi Từ chối hoặc Yêu cầu bổ sung.
   - Ghi chú gửi khách hàng: Textarea tối đa 500 ký tự, bắt buộc khi Lý do = Khác.
   - Nút "Phê duyệt" → Đã xác thực; "Từ chối" → Bị từ chối; "Yêu cầu bổ sung" → Cần bổ sung (khách hàng được gửi lại). Từ chối và Phê duyệt có hộp thoại xác nhận. Nhân viên không được duyệt hồ sơ của chính tài khoản mình. Khi hai nhân viên mở cùng một hồ sơ, người lưu sau nhận thông báo hồ sơ đã được xử lý.
   - Nút "Đóng": đóng popup.
   - Hồ sơ Chờ duyệt quá 24 giờ: hệ thống gửi email nhắc cho Trưởng phòng Tuân thủ.

6. Vòng đời trạng thái hồ sơ KYC
   - Chưa xác thực → Đang xử lý (khách hàng gửi) → Đã xác thực / Chờ duyệt / Bị từ chối (hệ thống tự động).
   - Chờ duyệt → Đã xác thực / Bị từ chối / Cần bổ sung (nhân viên duyệt).
   - Cần bổ sung → Đang xử lý (khách hàng gửi lại).
   - Bị từ chối → Đang xử lý (khách hàng gửi lại sau 24 giờ).
   - Đã xác thực → Chưa xác thực khi giấy tờ hết hạn (tác vụ nền kiểm tra hằng ngày lúc 00:00, gửi thông báo trước 30 ngày).
