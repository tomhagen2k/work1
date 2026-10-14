Dùng skill srs-writer để viết tài liệu SRS cho tính năng sau:

- Mã tính năng: MKT_VCH_01
- Tên tính năng: Quản lý mã giảm giá (Voucher Management)
- Mục đích: Cho phép bộ phận Marketing tạo, cấu hình, theo dõi và kiểm soát vòng đời các mã giảm giá áp dụng trên Website, Ứng dụng di động và Cửa hàng (POS): giảm theo phần trăm có chặn trần hoặc giảm số tiền cố định, giới hạn phạm vi sản phẩm, kênh bán, đối tượng khách hàng, số lượt sử dụng và khung giờ áp dụng. Hệ thống tự động chuyển trạng thái mã theo thời gian hiệu lực và số lượt đã dùng.
- Tác nhân / vai trò sử dụng:
  + Nhân viên Marketing (Marketing Executive): xem danh sách, xem chi tiết, tạo mới (chỉ lưu nháp), sao chép, chỉnh sửa mã giảm giá.
  + Trưởng phòng Marketing (Marketing Manager): như Nhân viên Marketing, thêm quyền kích hoạt / tạm dừng mã, xóa mã và xuất file.
  + Hệ thống: tác vụ nền chuyển trạng thái theo thời gian hiệu lực; dịch vụ Đơn hàng (Order Service) gửi sự kiện khi mã được dùng hoặc khi đơn hàng bị hủy để cập nhật số lượt.
- Mockup giao diện: `E:\work1\Voucher\voucher_management_mockup.html` (mỗi màn hình mở bằng hash tương ứng: `#viewList`, `#modalCreate`, `#modalEdit`, `#viewDetail`, `#modalDelete`)
- File đầu ra: `E:\work1\Docs\SRS_Quan_Ly_Ma_Giam_Gia.md`
- Chế độ tài liệu: Tự động

Nghiệp vụ chi tiết:

1. Màn hình Danh sách mã giảm giá (`#viewList`)
   - Ảnh giao diện: `E:\work1\Docs\images_voucher\01_voucher_list.png`
   - Truy cập từ menu "Marketing" → "Khuyến mãi" → "Mã giảm giá".
   - Góc phải tiêu đề: nút "Xuất file" (Excel, theo bộ lọc hiện tại, tối đa 50.000 dòng) và nút "Tạo mới" (mở popup Thêm mới).
   - Thanh công cụ:
     - Ô tìm kiếm theo mã giảm giá hoặc tên chương trình, tìm sau 500 ms ngừng gõ.
     - Bộ lọc Trạng thái: chọn nhiều (Nháp, Sắp diễn ra, Đang hoạt động, Tạm dừng, Đã kết thúc), mặc định Tất cả.
     - Bộ lọc Loại giảm giá: Tất cả / Phần trăm / Số tiền.
     - Bộ lọc Thời gian hiệu lực (khoảng ngày): lấy các mã có thời gian hiệu lực giao với khoảng đã chọn.
     - Nút "Xóa bộ lọc".
   - Khi tích chọn một hoặc nhiều dòng: hiển thị thanh thao tác hàng loạt "Đã chọn {n} mã" với nút "Xóa" và nút "Bỏ chọn".
   - Bảng gồm các cột: Checkbox chọn dòng; Mã giảm giá (link mở màn hình Chi tiết); Tên chương trình; Loại giảm (Phần trăm / Số tiền); Giá trị giảm (VD "10%" kèm dòng phụ "Tối đa 50.000đ", hoặc "50.000đ"); Thời gian hiệu lực (bắt đầu → kết thúc); Lượt sử dụng (thanh tiến độ + "đã dùng / tổng", ký hiệu "∞" khi không giới hạn); Trạng thái (tag màu: Nháp – tím, Sắp diễn ra – xanh dương, Đang hoạt động – xanh lá, Tạm dừng – cam, Đã kết thúc – xám); Kích hoạt (switch); Hành động (icon Sửa, Sao chép, Xóa).
   - Switch Kích hoạt chỉ hiển thị với mã Sắp diễn ra, Đang hoạt động, Tạm dừng. Tắt switch → hộp thoại xác nhận tạm dừng; bật switch → kích hoạt lại ngay (không xác nhận).
   - Icon Sửa ẩn với mã Đã kết thúc. Icon Xóa chỉ hiển thị với mã Nháp hoặc Sắp diễn ra chưa có lượt sử dụng. Icon Sao chép mở popup Thêm mới với dữ liệu điền sẵn từ mã gốc, trừ Mã giảm giá và Thời gian hiệu lực để trống.
   - Sắp xếp mặc định theo ngày tạo mới nhất; cho phép sắp xếp theo Thời gian hiệu lực và Lượt sử dụng. Phân trang 20 dòng/trang.
   - Có Empty State và Error State.

2. Popup Thêm mới mã giảm giá (`#modalCreate`)
   - Ảnh giao diện: `E:\work1\Docs\images_voucher\02_voucher_create.png`
   - Popup chia 4 nhóm bên trái và khung "Xem trước" bên phải.
   - Nhóm 1 – Thông tin chung:
     - Mã giảm giá: bắt buộc, 4–20 ký tự, chỉ chữ in hoa A–Z và số (tự chuyển in hoa khi gõ), duy nhất trên toàn hệ thống. Nút "Sinh mã" tạo ngẫu nhiên mã 8 ký tự, không dùng các ký tự dễ nhầm (0, O, 1, I) và đảm bảo không trùng.
     - Tên chương trình: bắt buộc, tối đa 150 ký tự.
     - Mô tả: không bắt buộc, tối đa 500 ký tự, có bộ đếm ký tự; nội dung hiển thị cho khách hàng.
   - Nhóm 2 – Giá trị giảm:
     - Loại giảm giá: Radio "Giảm theo phần trăm" (mặc định) / "Giảm số tiền cố định". Chọn số tiền cố định thì ẩn ô Giảm tối đa và đổi đơn vị Giá trị giảm sang VNĐ.
     - Giá trị giảm: bắt buộc. Phần trăm: số nguyên 1–100. Số tiền: 1.000 – 10.000.000 VNĐ, là bội số của 1.000, hiển thị phân cách hàng nghìn.
     - Giảm tối đa: bắt buộc khi giảm theo phần trăm, 1.000 – 10.000.000 VNĐ.
     - Giá trị đơn hàng tối thiểu: mặc định 0; với giảm số tiền cố định phải lớn hơn hoặc bằng Giá trị giảm.
   - Nhóm 3 – Phạm vi áp dụng:
     - Sản phẩm áp dụng: Radio Tất cả sản phẩm (mặc định) / Theo danh mục / Sản phẩm cụ thể.
     - Danh mục: chỉ hiển thị khi chọn Theo danh mục; chọn nhiều, có tìm kiếm, tối đa 50 danh mục, bắt buộc.
     - Sản phẩm: chỉ hiển thị khi chọn Sản phẩm cụ thể; chọn nhiều, tìm theo SKU hoặc tên, chỉ sản phẩm đang kinh doanh, tối đa 200 sản phẩm, bắt buộc.
     - Kênh bán áp dụng: Checkbox Website, Ứng dụng di động, Cửa hàng (POS); mặc định chọn Website và Ứng dụng di động; phải chọn ít nhất 1.
     - Đối tượng khách hàng: Dropdown Tất cả khách hàng (mặc định) / Khách hàng mới (chưa có đơn hàng hoàn thành) / Theo hạng thành viên. Chọn Theo hạng thành viên thì hiện thêm ô chọn nhiều Hạng (Bạc, Vàng, Kim cương), bắt buộc.
   - Nhóm 4 – Thời gian & giới hạn sử dụng:
     - Thời gian hiệu lực: khoảng ngày giờ (dd/mm/yyyy HH:mm), bắt buộc. Thời gian kết thúc phải sau thời gian bắt đầu, tổng thời lượng không quá 365 ngày. Khi Lưu & kích hoạt thì thời gian kết thúc phải lớn hơn thời điểm hiện tại.
     - Tổng số lượt sử dụng: bắt buộc, 1 – 1.000.000. Checkbox "Không giới hạn": khi tích thì khóa và xóa ô nhập.
     - Số lượt tối đa / khách hàng: bắt buộc, mặc định 1, từ 1 đến 100 và không lớn hơn Tổng số lượt sử dụng.
     - Dùng chung với khuyến mãi khác: Toggle, mặc định Tắt ("Không cho phép").
     - Toggle "Chỉ áp dụng trong khung giờ": mặc định Tắt. Bật thì hiển thị bảng khung giờ: mỗi dòng gồm Ngày trong tuần (chọn nhiều Thứ 2 – Chủ nhật), Từ giờ, Đến giờ (bước 15 phút), icon xóa dòng; nút "+ Thêm khung giờ"; tối thiểu 1 dòng, tối đa 5 dòng; Đến giờ phải sau Từ giờ; các khung giờ của cùng một ngày không được chồng lấn.
   - Khung Xem trước: cập nhật ngay khi người dùng nhập, hiển thị tên chương trình, nội dung giảm (VD "Giảm 10%" / "Tối đa 50.000đ · Đơn từ 200.000đ"), mã giảm giá và hạn sử dụng như khách hàng thấy trên ứng dụng.
   - Nút "Hủy": nếu form đã có thay đổi thì hiển thị cảnh báo dữ liệu chưa lưu.
   - Nút "Lưu nháp": chỉ bắt buộc Mã giảm giá và Tên chương trình (các trường khác nếu đã nhập vẫn phải đúng định dạng); lưu với trạng thái Nháp.
   - Nút "Lưu & kích hoạt": chỉ hiển thị với người có quyền kích hoạt; kiểm tra toàn bộ; lưu với trạng thái Sắp diễn ra nếu thời gian bắt đầu ở tương lai, ngược lại Đang hoạt động.
   - Mỗi lần tạo / sửa / đổi trạng thái / xóa đều ghi Audit Log.

3. Popup Chỉnh sửa mã giảm giá (`#modalEdit`)
   - Ảnh giao diện: `E:\work1\Docs\images_voucher\03_voucher_edit.png`
   - Mở từ icon Sửa trên danh sách hoặc nút "Sửa" ở màn hình Chi tiết. Tiêu đề hiển thị mã và tag trạng thái hiện tại.
   - Bố cục và quy tắc giống popup Thêm mới, dữ liệu điền sẵn. Khác biệt theo trạng thái:
     - Nháp: được sửa tất cả các trường; footer có "Hủy", "Lưu nháp", "Lưu & kích hoạt".
     - Sắp diễn ra (chưa có lượt sử dụng): được sửa tất cả trừ Mã giảm giá; footer có "Hủy", "Lưu thay đổi".
     - Đang hoạt động / Tạm dừng (đã có lượt sử dụng): hiển thị cảnh báo "Mã giảm giá đã có {n} lượt sử dụng..."; khóa (biểu tượng ổ khóa) Mã giảm giá, Loại giảm giá, Giá trị giảm, Giảm tối đa, Giá trị đơn hàng tối thiểu, Thời gian bắt đầu, Số lượt tối đa / khách hàng. Thời gian kết thúc chỉ được kéo dài; Tổng số lượt sử dụng chỉ được tăng; ô Tổng số lượt hiển thị gợi ý "Đã dùng {n} lượt".
     - Đã kết thúc: không cho chỉnh sửa.
   - Nút "Lưu thay đổi" chỉ enable khi form có thay đổi.
   - Hai người cùng sửa một mã: người lưu sau nhận thông báo dữ liệu đã được người khác cập nhật và phải tải lại.

4. Màn hình Chi tiết mã giảm giá (`#viewDetail`)
   - Ảnh giao diện: `E:\work1\Docs\images_voucher\04_voucher_detail.png`
   - Mở bằng cách click Mã giảm giá trên danh sách. Mũi tên "←" quay lại danh sách và giữ nguyên bộ lọc.
   - Tiêu đề: "{Mã} · {Tên chương trình}" kèm tag trạng thái. Nút góc phải: "Sao chép"; "Tạm dừng" (khi Sắp diễn ra / Đang hoạt động) hoặc "Kích hoạt" (khi Tạm dừng / Nháp); "Sửa" (ẩn khi Đã kết thúc).
   - 4 thẻ số liệu: Lượt đã sử dụng (kèm "/ tổng (tỷ lệ %)"), Tổng tiền đã giảm, Doanh thu đơn hàng áp mã (chỉ tính đơn không bị hủy), Thời gian còn lại (với Sắp diễn ra hiển thị "Bắt đầu sau {n} ngày"; với Đã kết thúc hiển thị "Đã kết thúc").
   - Tab "Thông tin": toàn bộ cấu hình của mã ở dạng chỉ đọc, kèm Người tạo và Cập nhật gần nhất (tài khoản · thời gian).
   - Tab "Lịch sử sử dụng ({n})": bảng Mã đơn hàng (link sang đơn hàng), Khách hàng (tên + số điện thoại che giữa), Kênh, Giá trị đơn, Số tiền giảm, Thời gian sử dụng, Trạng thái đơn; đơn bị hủy hiển thị tag "Đã hủy · hoàn lượt". Tìm theo mã đơn hàng, lọc theo kênh, phân trang 20 dòng/trang, mới nhất lên đầu. (Trong ảnh mockup bảng này hiển thị phía dưới để minh họa nội dung tab.)
   - Tab "Lịch sử thay đổi ({n})": thời gian, người thực hiện, hành động (Tạo, Sửa, Kích hoạt, Tạm dừng, Tự động kết thúc...), chi tiết các trường thay đổi (giá trị cũ → giá trị mới).

5. Hộp thoại Xóa mã giảm giá (`#modalDelete`)
   - Ảnh giao diện: `E:\work1\Docs\images_voucher\05_voucher_delete.png`
   - Mở từ icon Xóa trên một dòng hoặc nút "Xóa" trên thanh thao tác hàng loạt.
   - Hiển thị số mã đã chọn và bảng kiểm tra từng mã: Mã giảm giá, Trạng thái, Kết quả kiểm tra ("Có thể xóa" / "Không thể xóa: đã có lượt sử dụng" / "Không thể xóa: trạng thái {Trạng thái}"). Chỉ mã Nháp hoặc Sắp diễn ra chưa có lượt sử dụng được xóa; mã không đủ điều kiện bị bỏ qua. Không có mã nào đủ điều kiện thì nút "Xóa" bị vô hiệu hóa.
   - Xóa là xóa mềm: mã không còn hiển thị trên danh sách, nhưng mã giảm giá đã xóa không được tái sử dụng trong 90 ngày.
   - Sau khi xóa: toast "Đã xóa {n} mã giảm giá" và tải lại danh sách.

6. Vòng đời trạng thái mã giảm giá
   - Lưu nháp → Nháp.
   - Nháp → Sắp diễn ra / Đang hoạt động khi kích hoạt (tùy thời gian bắt đầu so với hiện tại).
   - Sắp diễn ra → Đang hoạt động khi đến thời gian bắt đầu (tác vụ nền chạy mỗi 1 phút).
   - Sắp diễn ra / Đang hoạt động → Tạm dừng (Trưởng phòng tạm dừng). Tạm dừng → Sắp diễn ra / Đang hoạt động khi kích hoạt lại; nếu thời gian kết thúc đã qua thì không cho kích hoạt lại, yêu cầu sửa thời gian.
   - Đang hoạt động / Tạm dừng → Đã kết thúc khi qua thời gian kết thúc (tác vụ nền) hoặc khi lượt sử dụng đạt Tổng số lượt (ngay khi nhận sự kiện từ dịch vụ Đơn hàng).
   - Đã kết thúc do hết lượt → Đang hoạt động nếu một đơn hàng dùng mã bị hủy (hoàn lại 1 lượt) và mã vẫn còn trong thời gian hiệu lực.
   - Nháp / Sắp diễn ra (chưa có lượt sử dụng) → bị xóa (xóa mềm).
   - Mã Đang hoạt động / Tạm dừng / Đã kết thúc không thể xóa, chỉ có thể tạm dừng hoặc để tự kết thúc.
