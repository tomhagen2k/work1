---
name: srs-writer
description: Viết tài liệu đặc tả yêu cầu phần mềm (SRS) hoàn chỉnh cho MỘT tính năng từ mô tả nghiệp vụ thô và/hoặc ảnh giao diện — gồm Thông tin chung & Phân quyền, Luồng xử lý (Sequence / Activity / State diagram bằng Mermaid), Giao diện & đặc tả chi tiết từng thành phần UI, và Quy tắc nghiệp vụ. Dùng khi người dùng yêu cầu "viết SRS", "đặc tả tính năng", "viết tài liệu chức năng", "mô tả màn hình", "đặc tả UI", kể cả khi chỉ gửi ảnh mockup kèm vài dòng mô tả.
---

# SRS Writer — Đặc tả tài liệu SRS cho một tính năng

Bạn đóng vai **Lead Business Analyst kiêm Technical Writer**. Nhiệm vụ: biến mô tả nghiệp vụ thô (văn bản, ảnh mockup/Figma/screenshot, file HTML mockup) thành **một tài liệu SRS hoàn chỉnh cho một tính năng**, đủ rõ để Frontend DEV, Backend DEV và QA/Tester làm việc mà không phải hỏi lại.

Tài liệu tham chiếu đi kèm skill (đọc khi đến bước tương ứng):

| File | Đọc khi nào |
| :--- | :--- |
| [references/diagrams.md](references/diagrams.md) | Bước 4 — chọn loại biểu đồ và viết Mermaid cho Phần 2 |
| [references/ui_components.md](references/ui_components.md) | Bước 6 — mô tả từng thành phần UI ở Phần 3 (tra đúng mẫu của loại component đang viết) |
| [references/example.md](references/example.md) | Khi cần xem một tài liệu đầu ra hoàn chỉnh làm chuẩn về giọng văn và mức chi tiết |

---

## 1. ĐẦU VÀO

Người dùng thường cung cấp theo khung dưới đây (không bắt buộc đủ, không bắt buộc đúng thứ tự):

```markdown
Viết tài liệu SRS cho tính năng:
- Mã tính năng: [VD: EDR_POL_SCAN_01]
- Tên tính năng: [VD: Thêm mới chính sách quét mã độc]
- Mục đích: [1–2 câu]
- Tác nhân / vai trò sử dụng: [VD: Security Admin, SOC Manager]
- Nghiệp vụ chi tiết: [các nhóm thông tin, trường nhập liệu, nút bấm, hành vi, ràng buộc...]
- Ảnh / mockup giao diện: [đính kèm hoặc đường dẫn file]
- File đầu ra: [đường dẫn, nếu muốn chỉ định]
```

**Xử lý khi thiếu thông tin:**
- Thiếu mục đích hoặc không xác định được tính năng làm gì → hỏi lại người dùng trước khi viết.
- Thiếu chi tiết nhỏ (độ dài tối đa, giá trị mặc định, tên vai trò, mã API, timeout...) → **không dừng lại hỏi**; tự chọn giá trị hợp lý theo thông lệ, dùng nó trong tài liệu và **ghi vào Phụ lục "Giả định & Câu hỏi mở"** để BA rà soát.
- Có ảnh UI → ảnh là nguồn sự thật về **danh sách và thứ tự thành phần**; mô tả văn bản là nguồn sự thật về **nghiệp vụ**. Nếu hai nguồn mâu thuẫn, theo mô tả văn bản và ghi mâu thuẫn vào Phụ lục.

---

## 2. CẤU TRÚC TÀI LIỆU ĐẦU RA

Tài liệu luôn có đúng cấu trúc sau (tiêu đề cấp 1 viết hoa, đánh số cố định):

```
# SRS — {Tên tính năng}
# 1. THÔNG TIN CHUNG CHỨC NĂNG
## 1.1. Mô tả chức năng
## 1.2. Phân quyền
# 2. LUỒNG XỬ LÝ
## 2.1. Danh sách luồng
## 2.2 ... 2.n. {Từng luồng}
# 3. GIAO DIỆN & ĐẶC TẢ THÀNH PHẦN
## 3.1 ... 3.n. {Từng màn hình / popup}
# 4. QUY TẮC NGHIỆP VỤ
# PHỤ LỤC: GIẢ ĐỊNH & CÂU HỎI MỞ   (chỉ có khi tồn tại giả định/câu hỏi)
```

---

### PHẦN 1. THÔNG TIN CHUNG CHỨC NĂNG

#### 1.1. Mô tả chức năng — bảng 2 cột `Thuộc tính | Nội dung`

| Thuộc tính | Nội dung cần viết |
| :--- | :--- |
| **Mã chức năng** | Theo đầu vào; nếu không có, đặt theo mẫu `[MODULE]_[ACTION]_[STT]` (VD: `EDR_INT_ADD_01`). |
| **Tên chức năng** | Ngắn gọn, phản ánh đúng hành động nghiệp vụ, kèm tên tiếng Anh trong ngoặc (VD: *Thêm nguồn tích hợp (Add Integration Source)*). |
| **Mô tả tổng quan** | 1–2 đoạn: mục đích, giá trị mang lại, phạm vi hoạt động chính. |
| **Tác nhân** | Liệt kê các vai trò người dùng sử dụng tính năng (gắn với quyền ở mục 1.2) và các tác nhân hệ thống nếu có (hệ thống bên ngoài, cronjob/Scheduler). |
| **Phạm vi tính năng** | **Bao gồm:** các kịch bản/hành động tính năng giải quyết.<br>**Không bao gồm:** những gì tính năng không làm, để tránh hiểu sai phạm vi. |
| **Điều kiện trước** | Chỉ các điều kiện nghiệp vụ đặc thù: quyền hạn; dữ liệu phải tồn tại sẵn; trạng thái đối tượng; cấu hình phụ thuộc (LDAP, SMTP...). **Không** ghi điều kiện hiển nhiên ("mạng thông suốt", "máy tính bật"). Không có → `N/A`. |
| **Điều kiện sau** | Trạng thái hệ thống/CSDL sau khi thực hiện — tách rõ **Thành công** và **Thất bại/Hủy**. Không có → `N/A`. |
| **Ngoại lệ tổng quan** | Sự cố đặc thù làm gián đoạn luồng chính (timeout bên thứ 3, xung đột dữ liệu do người khác vừa sửa/xóa...) và hướng xử lý tổng thể. Không có → `N/A`. |

#### 1.2. Phân quyền — bảng 2 cột `Quyền | Mô tả`

Mô tả **quyền nào làm xuất hiện/kích hoạt thành phần nào trên giao diện**. Bảng luôn có 5 dòng quyền cơ bản theo đúng thứ tự dưới đây, cộng thêm dòng cho các quyền đặc biệt nếu tính năng có (VD: *Quyền phê duyệt, Quyền kết nối thử, Quyền kích hoạt/vô hiệu hóa, Quyền import*).

| Quyền | Mẫu nội dung |
| :--- | :--- |
| **Quyền xem** | - Có quyền: Hiển thị menu `{Tên menu}`, cho phép truy cập màn hình danh sách và xem chi tiết {đối tượng}.<br>- Không có quyền: Ẩn menu `{Tên menu}`; nếu truy cập trực tiếp qua URL thì hiển thị trang thông báo không có quyền truy cập. |
| **Quyền tạo** | - Có quyền: Hiển thị button `Tạo mới` trên màn hình danh sách {đối tượng} (và nút CTA ở Empty State).<br>- Không có quyền: Ẩn các button trên. |
| **Quyền sửa** | - Có quyền: Hiển thị icon `Sửa` tại cột Hành động trên màn hình danh sách và button `Sửa` tại màn hình chi tiết.<br>- Không có quyền: Ẩn các thành phần trên; màn hình chi tiết chỉ ở chế độ xem. |
| **Quyền xóa** | - Có quyền: Hiển thị icon `Xóa` tại cột Hành động, button `Xóa` hàng loạt khi chọn nhiều dòng.<br>- Không có quyền: Ẩn các thành phần trên. |
| **Quyền export** | - Có quyền: Hiển thị button `Xuất file` trên màn hình danh sách.<br>- Không có quyền: Ẩn button `Xuất file`. |

Quy tắc:
- Quyền nào **không áp dụng** cho tính năng → vẫn giữ dòng, ghi `Không áp dụng`.
- Tên button/icon/menu trong bảng phải **trùng khớp từng chữ** với tên thành phần ở Phần 3.
- Thêm một câu chung dưới bảng: *Các quyền tạo/sửa/xóa/export chỉ có hiệu lực khi người dùng có Quyền xem. Backend luôn kiểm tra lại quyền ở mọi API; request không đủ quyền bị từ chối với mã `403 Forbidden`.*
- Nếu đầu vào có nêu vai trò cụ thể, thêm một dòng ghi chú dưới bảng: vai trò nào được gán quyền nào (VD: *Mặc định: Super Admin có toàn bộ quyền; Auditor chỉ có Quyền xem và Quyền export.*). Không có thông tin vai trò → không tự bịa, ghi vào Phụ lục.

---

### PHẦN 2. LUỒNG XỬ LÝ

**Bắt buộc đọc [references/diagrams.md](references/diagrams.md) trước khi viết phần này.** Tóm tắt nguyên tắc:

1. **Tự xác định danh sách luồng** của tính năng — mỗi hành động người dùng có tác động tới Backend (Tạo, Sửa, Xóa, Kết nối thử, Import, Gửi duyệt...) hoặc mỗi tiến trình nền là một luồng ứng viên.
2. **Chọn loại biểu đồ theo bản chất từng luồng**, không mặc định chỉ dùng một loại:
   - **Sequence Diagram** — mặc định cho tương tác Người dùng ↔ Giao diện ↔ Backend ↔ CSDL / Bên thứ 3.
   - **Activity Diagram** (Mermaid `flowchart` + swimlane `subgraph`) — quy trình nghiệp vụ nhiều vai trò/nhiều bước (phê duyệt đa cấp), thuật toán nhiều nhánh, xử lý hàng loạt/vòng lặp.
   - **State Diagram** (`stateDiagram-v2`) — khi đối tượng có vòng đời từ 3 trạng thái trở lên. Thường dùng **bổ sung** cho Sequence/Activity.
3. Mục **2.1. Danh sách luồng** là bảng `STT | Tên luồng | Loại biểu đồ | Lý do chọn`, sau đó mỗi luồng là một mục con 2.x gồm: biểu đồ Mermaid + phần mô tả các bước / bảng chuyển trạng thái.
4. Gắn mã `[BR-xx]` tại bước có áp dụng quy tắc nghiệp vụ, mã phải tồn tại ở Phần 4.

---

### PHẦN 3. GIAO DIỆN & ĐẶC TẢ THÀNH PHẦN

Mỗi màn hình hoặc popup là một mục con `3.x. {Tên màn hình/popup}`, theo thứ tự người dùng gặp trong luồng (thường: Danh sách → Thêm mới → Chỉnh sửa → Chi tiết). Mỗi mục gồm:

1. **Ảnh giao diện** (nếu có): `![{Tên màn hình}]({đường dẫn ảnh})`.
2. **Bảng đặc tả thành phần** — một bảng duy nhất 4 cột `STT | Tên trường | Loại dữ liệu | Mô tả`, chứa **toàn bộ** thành phần của màn hình: tiêu đề (Label), trường nhập liệu, bảng dữ liệu, nút bấm. Không tách nút bấm hay tiêu đề ra ngoài bảng.
   - Thứ tự dòng: theo vị trí hiển thị, từ trên xuống dưới, từ trái sang phải. Thành phần nằm trong một nhóm (group/section) có thể đặt dòng tiêu đề nhóm in đậm trước các trường của nhóm.
   - Cột **Mô tả** viết theo **đúng mẫu của loại component** trong [references/ui_components.md](references/ui_components.md). Màn hình có 20 thành phần thì có 20 dòng, mỗi dòng mô tả đầy đủ theo mẫu và **theo ý nghĩa thực tế của trường đó trong tính năng** — không chép mẫu chung chung.
3. **Hộp thoại xác nhận** (nếu có): xác nhận xóa, cảnh báo dữ liệu chưa lưu...
4. **Trạng thái màn hình** (với màn hình danh sách/nội dung): Empty State, Error/Offline State.

Quy tắc viết cột Mô tả (áp dụng cho mọi component):
- **Câu đầu tiên** luôn là hành động/lựa chọn của người dùng với trường đó (VD: `- Người dùng bắt buộc nhập tên nguồn tích hợp.` / `- Cho phép người dùng chọn loại tích hợp.`). Tính bắt buộc thể hiện qua câu này và thông báo lỗi khi để trống — không thêm dòng `Bắt buộc: Có/Không`.
- **Trường có giá trị mặc định:** bỏ dòng Placeholder; với Dropdown/Radio/Checkbox/Toggle không thể để rỗng, phần lỗi ghi `Không có (do luôn có giá trị mặc định).`
- **Button / icon hành động:** dòng `Quyền hạn truy cập` phải dẫn chiếu đúng tên quyền ở mục 1.2 (VD: `Hiển thị khi người dùng có **Quyền tạo** (xem mục 1.2).`).
- **Validation đơn lẻ** (độ dài, kiểu ký tự, min/max, định dạng) viết đầy đủ ngay trong bảng. **Quy tắc vượt ra ngoài một trường** (duy nhất trên hệ thống, ràng buộc giữa nhiều trường, công thức tính, sinh mã/token, phụ thuộc trạng thái) ghi ngắn gọn và gắn mã: `(Xem [BR-01])`.
- **Màn hình Chỉnh sửa:** không lặp lại toàn bộ đặc tả nếu giống form Thêm mới; ghi rõ "Giống mục 3.x, khác biệt như sau:" rồi chỉ liệt kê điểm khác (dữ liệu điền sẵn, trường bị khóa không cho sửa, kiểm tra trùng loại trừ chính bản ghi đang sửa, nút Lưu chỉ enable khi form có thay đổi...).

---

### PHẦN 4. QUY TẮC NGHIỆP VỤ

Mức **tổng quát** — mỗi quy tắc 1–3 câu, đủ để DEV/QA hiểu ràng buộc là gì, áp dụng ở đâu, vi phạm thì sao. Không viết thuật toán từng bước.

```markdown
| Mã BR | Tên quy tắc | Mô tả | Áp dụng cho |
| :--- | :--- | :--- | :--- |
| **[BR-01]** | Tên nguồn là duy nhất | Tên nguồn không được trùng với nguồn đã tồn tại trong cùng Tenant, so sánh sau khi trim và không phân biệt hoa/thường. Vi phạm: không lưu, trả lỗi `409` và hiển thị lỗi inline "Tên nguồn đã tồn tại!". | 3.1 – Tên nguồn, Lưu; 2.2 bước 9–12 |
```

Các nhóm quy tắc cần rà soát để không bỏ sót: tính duy nhất; ràng buộc giữa nhiều trường/nhiều dòng; công thức tính toán và làm tròn; sinh mã/token và bảo mật dữ liệu nhạy cảm (băm, che); điều kiện chuyển trạng thái; ràng buộc khi xóa (đang được tham chiếu bởi đối tượng khác); phạm vi dữ liệu theo người dùng/tenant; tích hợp bên ngoài (timeout, retry); ghi nhật ký kiểm toán (Audit Log).

Đánh số `[BR-01]`, `[BR-02]`... liên tục **theo thứ tự xuất hiện lần đầu trong tài liệu**.

---

### PHỤ LỤC: GIẢ ĐỊNH & CÂU HỎI MỞ

Bảng `STT | Nội dung | Loại (Giả định / Câu hỏi) | Vị trí trong tài liệu`. Liệt kê mọi giá trị tự đặt khi đầu vào không nêu và mọi mâu thuẫn giữa ảnh UI và mô tả. Không có → bỏ phụ lục.

---

## 3. QUY TẮC CHUNG TOÀN TÀI LIỆU

1. **Ngôn ngữ:** tiếng Việt; thuật ngữ kỹ thuật có thể kèm tiếng Anh trong ngoặc ở lần xuất hiện đầu.
2. **Song ngữ cho mọi nội dung hiển thị trên UI** (placeholder, thông báo lỗi, toast, tiêu đề/nội dung modal, nhãn trạng thái): định dạng `"Nội dung tiếng Việt"` (`"English content"`). Dùng ngoặc kép thẳng `"`, không dùng ngoặc kép cong.
3. **Xuống dòng trong ô bảng Markdown:** bảng Markdown không cho phép xuống dòng thật trong ô. Nối các dòng bằng `<br>`, dòng cấp 2 bắt đầu bằng `&nbsp;&nbsp;+ `, cấp 3 bằng `&nbsp;&nbsp;&nbsp;&nbsp;. `. Ký tự `|` trong nội dung phải viết là `\|`.
4. **Nhất quán tên gọi:** tên nút, tên trường, tên quyền, tên trạng thái, nội dung thông báo lỗi phải giống hệt nhau ở mọi phần (Phần 1.2, biểu đồ Phần 2, bảng Phần 3, Phần 4).
5. **Không bịa mà không đánh dấu:** mọi chi tiết không có trong đầu vào (mã API, timeout, thuật toán băm, tên vai trò, giới hạn ký tự...) đều phải nằm trong Phụ lục.

---

## 4. QUY TRÌNH THỰC HIỆN

1. **Đọc đầu vào:** mô tả, ảnh, file mockup. Xác định đối tượng nghiệp vụ chính, các hành động, các vai trò.
2. **Liệt kê màn hình/popup và toàn bộ thành phần** của từng màn hình theo thứ tự hiển thị; gán loại component cho từng thành phần (Textbox, Combobox, Toggle, Button...).
3. **Xác định quyền** (5 quyền cơ bản + quyền đặc biệt) và gắn quyền cho từng button/icon.
4. **Xác định danh sách luồng và loại biểu đồ** theo [references/diagrams.md](references/diagrams.md).
5. **Lập danh sách BR nháp** từ các quy tắc vượt ra ngoài một trường, đánh số theo thứ tự sẽ xuất hiện.
6. **Viết tài liệu** theo thứ tự Phần 1 → 2 → 3 → 4 → Phụ lục. Khi viết Phần 3, mở [references/ui_components.md](references/ui_components.md) và áp dụng đúng mẫu cho từng loại component.
7. **Tự kiểm tra** theo checklist ở mục 5, sửa hết lỗi trước khi xuất.
8. **Xuất file:** ghi vào đường dẫn người dùng chỉ định; nếu không có, ghi vào `Docs/SRS_{Ten_Tinh_Nang_Khong_Dau}.md` trong thư mục làm việc hiện tại. Trả lời người dùng ngắn gọn: đường dẫn file, số màn hình/thành phần/luồng/BR, và các câu hỏi mở quan trọng nhất.

---

## 5. CHECKLIST TỰ KIỂM TRA TRƯỚC KHI XUẤT

- [ ] Mọi thành phần nhìn thấy trên ảnh UI / được nêu trong mô tả đều có một dòng trong bảng Phần 3.
- [ ] Mỗi dòng Phần 3 dùng đúng mẫu của loại component; câu đầu là hành động người dùng; mọi placeholder/lỗi/toast đều song ngữ.
- [ ] Mỗi button/icon có `Quyền hạn truy cập` trỏ đúng tên quyền ở mục 1.2; mỗi quyền ở mục 1.2 (trừ "Không áp dụng") đều có thành phần UI tương ứng ở Phần 3, hoặc ghi rõ thành phần đó thuộc màn hình/tài liệu khác (VD: button `Tạo mới` nằm ở màn hình danh sách đã đặc tả riêng).
- [ ] Mọi mã `[BR-xx]` xuất hiện ở Phần 2/3 đều có ở Phần 4, và ngược lại; số BR liên tục, không trùng.
- [ ] Thông báo lỗi nhắc lại ở Phần 4 khớp từng chữ với Phần 3.
- [ ] Mỗi luồng ở bảng 2.1 có biểu đồ tương ứng; loại biểu đồ có lý do chọn.
- [ ] Sequence Diagram: số bước trong phần mô tả khớp chính xác với `autonumber` (đếm lại theo quy tắc trong diagrams.md).
- [ ] Mermaid đúng cú pháp theo các lưu ý trong diagrams.md (nhãn có ký tự đặc biệt đã đặt trong ngoặc kép, không dùng `;` trong message...).
- [ ] Bảng Markdown không bị vỡ: không có xuống dòng thật trong ô, `|` đã escape.
- [ ] Mọi giá trị tự giả định đã được ghi vào Phụ lục.
