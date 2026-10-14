# Ý tưởng mở rộng — chờ xem xét

> Các mục trong file này **chưa phải yêu cầu**. Chỉ chuyển thành yêu cầu trong [Mo_Ta_Yeu_Cau_MVP.md](Mo_Ta_Yeu_Cau_MVP.md) khi BA chốt.

---

## YT-01. Bản đồ chương được xây dựng dần qua từng màn

| Thông tin | Nội dung |
|---|---|
| Người đề xuất | BA |
| Ngày ghi nhận | 14/10/2026 |
| Trạng thái | **BA chọn phương án B** (14/10/2026); đồng ý 3 nguyên tắc; chơi lại hiện đúng trạng thái lúc mới tới màn; thử nghiệm ở **Chương 2 mới**, giữ nguyên Chương 1. Thiết kế: [level_design/Thiet_Ke_Chuong_2.md](level_design/Thiet_Ke_Chuong_2.md) — chờ duyệt |

### Mô tả (theo BA)
- Mỗi chương có một bản đồ khu vực, **ban đầu sơ sài**.
- Hoàn thành mỗi màn (giao đồ, vận chuyển vật liệu…) → bản đồ có thêm **công trình mới** hoặc công trình **hoàn thiện thêm một bước**.
- Hoàn thành hết các màn của chương → **mở khóa bức tranh hoàn chỉnh** của khu vực đó.
- Mục đích: khích lệ người chơi, tạo động lực chơi tiếp.

### Phân tích tác động tâm lý

| Cơ chế tâm lý | Ý tưởng này kích hoạt thế nào | Mức tác động dự kiến |
|---|---|---|
| **Thấy được tiến bộ** (meta-progression) | Kết quả mỗi màn không biến mất sau màn hình "Hoàn thành" mà để lại dấu vết cố định trên bản đồ | Cao |
| **Ý nghĩa của nhiệm vụ** | Nhiệm vụ "chở vật liệu" gắn trực tiếp với việc công trình mọc lên → giao hàng có mục đích, không còn là bài toán trừu tượng. Ăn khớp chủ đề game | Cao — điểm mạnh nhất, vì ít game giải đố có được sự gắn kết tự nhiên như vậy |
| **Hiệu ứng việc dang dở** (Zeigarnik) | Bức tranh còn trống, công trình xây dở → người chơi muốn "làm cho xong" | Trung bình – cao, mạnh nhất ở 2–3 màn cuối chương |
| **Càng gần đích càng cố** (goal-gradient) | Khi bức tranh gần hoàn thiện, người chơi chấp nhận thử lại màn khó nhiều lần hơn | Trung bình – cao |
| **Cảm giác sở hữu** | "Khu phố này do mình xây" → gắn bó, muốn quay lại ngắm | Trung bình |
| **Phần thưởng mong chờ** | Câu hỏi "màn sau sẽ mọc lên cái gì?" | Trung bình; giảm dần nếu công trình lặp lại hoặc đoán trước được |

### Tác động lên hành vi chơi

| Chỉ số | Dự kiến | Lý do |
|---|---|---|
| Quay lại chơi ngày hôm sau / tuần sau | **Tăng rõ** | Luôn có một mục tiêu dang dở để quay lại |
| Số màn mỗi phiên chơi | Tăng nhẹ | "Thêm một màn nữa để xong tòa nhà" |
| Chấp nhận thử lại khi thua | Tăng | Có động lực ngoài bản thân bài toán |
| Độ dài một phiên chơi | Tăng ít | Mỗi màn vẫn ngắn; ý tưởng này chủ yếu kéo dài **vòng đời** người chơi, không kéo dài từng phiên |

**Đối tượng hưởng lợi nhiều nhất:** người chơi casual (phần đông trên điện thoại). Người thích giải đố thuần thì ít bị tác động, nhưng cũng không bị ảnh hưởng xấu nếu phần này không làm gián đoạn lối chơi.

### Rủi ro và cách tránh

| Rủi ro | Cách tránh |
|---|---|
| Thành "đồ trang trí gắn thêm", không ai để ý | Công trình phải **liên quan tới nhiệm vụ của màn** (màn giao gạch → nhà mọc tường) và **hiện ngay sau khi thắng** (2–5 giây, bỏ qua được) |
| Nhịp thưởng sai: quá chậm thì nản, quá nhanh thì nhàm | Mỗi màn thắng = 1 thay đổi nhìn thấy được; cuối chương có một thay đổi lớn |
| Kẹt ở màn khó thì không thấy tiến bộ → càng nản | Giữ thời gian cho phép hợp lý; cân nhắc gợi ý khi thua nhiều lần (tài liệu gốc mục 12.4) |
| Bị biến thành cơ chế ép trả tiền (như một số game xây thành phố: phải mua tiền để xây) | Chỉ gắn với **việc thắng màn**, không dùng tiền tệ, không bán đẩy nhanh |
| Tốn công làm hình ảnh (mỗi công trình 2–3 giai đoạn) | Phong cách low-poly giúp làm nhanh hơn; dùng lại bộ tòa nhà theo bộ, đổi màu/ghép |
| Màn đã thắng chơi lại thì không có thêm công trình | Giá trị chơi lại vẫn là thời gian tốt nhất (D-05); không nên bắt buộc kỷ lục mới được xây |

### Cách hiện thực có thể chọn

| Cấp độ | Mô tả | Chi phí | Gắn với thiết kế hiện tại |
|---|---|---|---|
| **A. Chỉ trang trí** | Ảnh nền con đường leo ở màn hình danh sách màn (D-29) chính là bức tranh khu vực, lấp đầy dần theo màn đã thắng | Thấp | Khớp ngay với PA3: phần bên phải đang có nhà cây ngẫu nhiên → thay bằng bức tranh chương |
| **B. Trang trí + hiện trong màn chơi** | Các màn sau của chương dùng chung khu vực; công trình đã xây hiện trên bản đồ khi chơi | Trung bình | Cần các màn trong chương dùng chung một bản đồ nền |
| **C. Ảnh hưởng lối chơi** | Công trình xây xong mở thêm đường, cầu, điểm giao mới cho màn sau | Cao | Mạnh nhất về động lực, nhưng làm thiết kế màn phụ thuộc nhau; dễ gây màn không giải được nếu sai |

### Đề xuất của Claude
1. Ý tưởng **có khả năng tăng mức độ quay lại** rõ rệt và **rất khớp chủ đề** (chở vật liệu → công trình mọc lên).
2. Thử ở **cấp độ A** cho Chương 1 trong demo trước (chi phí thấp, gắn luôn vào màn hình danh sách màn), quan sát phản ứng người chơi thử: có nhắc tới bức tranh không, có muốn chơi tiếp "để xem xây xong" không.
3. Nếu phản hồi tốt → nâng lên **B**. Cấp độ **C** chỉ cân nhắc sau MVP.
4. Khi đó cần đổi nội dung nhiệm vụ cho khớp câu chuyện (ví dụ: "Kho vật liệu → Công trường trường học"), không chỉ "Kho A → Chợ".

### Câu hỏi cần BA chốt (khi muốn đưa vào làm)
| ID | Câu hỏi |
|---|---|
| YT-01-Q1 | Có thử cấp độ A trong demo không? |
| YT-01-Q2 | Bức tranh hoàn chỉnh cuối chương có thêm phần thưởng khác không (lưu ảnh, chia sẻ, huy hiệu)? |
| YT-01-Q3 | Có đổi tên/nội dung nhiệm vụ theo câu chuyện xây dựng khu vực không? |
