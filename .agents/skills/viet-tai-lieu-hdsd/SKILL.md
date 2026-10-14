---
name: viet-tai-lieu-hdsd
description: >-
  Quy chuẩn và phương pháp luận toàn diện để biên soạn tài liệu Hướng dẫn sử dụng (HDSD / User Manual)
  chuyên nghiệp xuất bản dưới định dạng Microsoft Word (.docx) từ tài liệu đặc tả (SRS/BRD) và
  giao diện thực tế (HTML/Web UI/App). Bao gồm quy trình chụp ảnh giao diện có ngữ cảnh, tự động
  đóng khung highlight viền thanh mảnh (1.5px - 2px) và đánh số thứ tự (numbered badges),
  viết tài liệu thao tác chuẩn mực ánh xạ 1-1 với ảnh, tập trung vào trải nghiệm người dùng,
  kết quả mong đợi, hộp cảnh báo và xử lý sự cố (loại bỏ hoàn toàn bảng ma trận phân quyền RBAC).
---

# KỸ NĂNG: BIÊN SOẠN TÀI LIỆU HƯỚNG DẪN SỬ DỤNG (USER GUIDE / MANUAL) CHUYÊN NGHIỆP DẠNG WORD (.DOCX)

Tài liệu Hướng dẫn sử dụng (HDSD) là ấn phẩm bàn giao chính thức cho người dùng cuối và khách hàng. Một tài liệu HDSD xuất sắc phải đảm bảo nguyên tắc: **Người dùng không cần đọc hết văn bản vẫn có thể nhìn ảnh và thao tác được ngay lập tức, và khi gặp sự cố thì tự tìm thấy cách khắc phục nhanh nhất.**

### Các nguyên tắc cốt lõi:
* **Định dạng đầu ra bắt buộc:** File **Microsoft Word (.docx)** được format chuẩn mực (trang in A4, font chữ Segoe UI/Arial thanh lịch, chèn ảnh sắc nét, bảng biểu và hộp lưu ý có màu nhận diện). *File Markdown chỉ đóng vai trò bản nháp phụ trợ.*
* **Bỏ hoàn toàn Bảng ma trận phân quyền (RBAC Matrix):** Không đưa bảng phân quyền kỹ thuật vào HDSD gây rối mắt người dùng.
* **Không đưa chi tiết kỹ thuật sâu:** Bỏ qua kiến trúc CSDL, API endpoint hoặc mã nguồn backend.
* **Tập trung 100% vào trải nghiệm người dùng:** Người dùng muốn làm gì (Goal) -> Đi theo đường dẫn menu nào -> Thao tác theo thứ tự [1], [2], [3] -> Kết quả hiển thị ra sao -> Cần lưu ý gì -> Xử lý lỗi thường gặp (Troubleshooting).

---

## 1. QUY TRÌNH 5 BƯỚC BIÊN SOẠN TÀI LIỆU HDSD

```
[Bước 1: Rà soát SRS & UI] ──> [Bước 2: Chụp ảnh các trạng thái] ──> [Bước 3: Đóng khung 1.5-2px & Đánh số]
                                                                                     │
[Bước 5: Xuất bản Word .docx] <── [Bước 4: Soạn nội dung ánh xạ 1-1] <───────────────┘
```

### Bước 1: Rà soát tài liệu đặc tả (SRS) và Kiểm tra Giao diện thực tế
1. Đọc SRS để nắm:
   * Mục tiêu nghiệp vụ của từng tính năng con (Feature Goals).
   * Các quy tắc nghiệp vụ quan trọng ảnh hưởng trực tiếp đến người dùng (ví dụ: điều kiện nút bấm sáng/mờ, cảnh báo dữ liệu thiếu, xung đột dữ liệu).
2. Mở giao diện thực tế (HTML / Web app / Prototype):
   * Xác định chính xác đường dẫn điều hướng trên menu (ví dụ: `Quản trị` > `Mô hình AI`).
   * Rà soát các tương tác động: mở Tab, đóng/mở Drawer bên phải, mở Modal Popup, trạng thái hover/click.

### Bước 2: Chụp ảnh màn hình có ngữ cảnh (Contextual Screenshots)
1. **Độ phân giải chuẩn:** Viewport khuyến nghị `1560x880` hoặc `1600x900` tỉ lệ 16:9 sắc nét, không bị méo tỉ lệ.
2. **Bắt đúng trạng thái tương tác:** Chụp ảnh khi giao diện đang ở đúng ngữ cảnh người dùng đang thao tác (ví dụ: khi popup mở lên, khi drawer trượt ra, hoặc khi checkbox đã được tích chọn).
3. **Ngữ cảnh (Context) vs Tập trung (Focus):** Giữ thanh điều hướng (Navbar/Sidebar) ở các bước đầu để người dùng định vị được vị trí trang; với modal hoặc drawer, giữ ngữ cảnh mờ phía sau để người dùng nhận biết đây là lớp giao diện nổi.

### Bước 3: Đóng khung viền thanh mảnh (1.5px - 2px) và Đánh số thứ tự trên ảnh
*Đây là tiêu chuẩn vàng (Industry Standard) trong Technical Writing:*
1. **Khung viền nổi bật (Highlight Box):**
   * **Độ dày viền (Stroke width):** Trong khoảng **`1.5px – 2px`** (bo góc nhẹ `radius: 4px – 6px`). Viền thanh thoát, tinh tế, không làm che lấp chữ hoặc chi tiết giao diện bên trong.
   * **Màu viền:** Đỏ `#ff4d4f` hoặc `#ff3333` (độ tương phản cao trên cả nền sáng và nền tối dark-mode).
   * Khung bao quanh vừa vặn nút bấm, ô nhập liệu, bảng dữ liệu hoặc dropdown.
2. **Huy hiệu số thứ tự tròn (Numbered Badges: ①, ②, ③...):**
   * Hình tròn nền đỏ đặc `#ff4d4f`, viền trắng mỏng `1.5px – 2px`.
   * Đường kính: `24px – 26px`.
   * Chữ số bên trong: Màu trắng `#ffffff`, font chữ in đậm (Bold Arial hoặc Segoe UI Bold), căn chính giữa tâm.
   * Vị trí đặt badge: Góc trên bên trái hoặc góc trên bên phải của khung viền, đảm bảo không che mất nhãn nút bấm hay nội dung người dùng cần đọc.

### Bước 4: Soạn thảo nội dung hướng dẫn từng bước (Ánh xạ 1-1 với ảnh)
1. **Cấu trúc mỗi quy trình:**
   * **Tiêu đề quy trình:** Đặt theo mục tiêu hành động của người dùng (Ví dụ: `2.3. Chọn lọc kho cảnh báo để Tái huấn luyện`, thay vì `Màn hình tab Retrain`).
   * **Mục đích:** 1 câu giải thích ngắn gọn người dùng làm bước này để giải quyết việc gì.
   * **Ảnh minh họa:** Đặt ngay phía trên phần mô tả bước, căn giữa trang.
   * **Danh sách các bước (Step-by-step):**
     * Đánh số khớp 1-1 với số trên ảnh: `• Bước [1] (Tên bước): ...`, `• Bước [2] (Tên bước): ...`
     * Luôn bắt đầu câu bằng **động từ hành động (Action Verbs)**: *Nhấp vào*, *Chọn*, *Nhập*, *Tích chọn*, *Kéo thả*, *Quan sát*.
     * **Quy chuẩn định dạng chữ:**
       * Nút bấm hành động: In đậm kèm ngoặc vuông, ví dụ: **[Huấn luyện]**, **[Áp dụng bản này]**.
       * Tên trường / Menu / Dropdown: In đậm, ví dụ: menu **Quản trị**, dropdown **Trạng thái huấn luyện**.
       * Trạng thái / Nhãn tag: In nghiêng hoặc có màu nổi bật, ví dụ: tag *Phát sinh*, badge **● Đang áp dụng**.
     * **Kết quả mong đợi (Expected Outcome):** Nêu rõ sau khi bấm thì hệ thống sẽ hiển thị cái gì tiếp theo (ví dụ: *Hộp thoại xác nhận sẽ hiển thị...*).
2. **Khối Lưu ý / Cảnh báo (Callout Notes):**
   * Làm nổi bật các quy tắc nghiệp vụ đặc thù (ví dụ: cơ chế chuyển đổi zero-downtime, điều kiện nút bấm sáng/mờ, cảnh báo dữ liệu cũ bị thiếu) bằng khung Callout có màu viền và nền riêng biệt.

### Bước 5: Bảng Xử lý sự cố & Xuất bản tệp Microsoft Word (.docx)
1. **Bảng Xử lý sự cố thường gặp (Troubleshooting Guide):**
   * Bảng gồm 3 cột: **Vấn đề thường gặp | Nguyên nhân khả dĩ | Hướng dẫn khắc phục**.
   * Tập trung vào 4 - 6 tình huống thực tế người dùng hay vướng mắc nhất.
2. **Xuất bản tệp Word (.docx):**
   * Sử dụng thư viện `python-docx` để dựng file `.docx` chuyên nghiệp với:
     - Lề trang chuẩn (Top/Bottom/Left/Right: 1 inch).
     - Tiêu đề văn bản lớn 19pt Bold màu thương hiệu (Deep Blue `#003eb3`).
     - Bảng thông tin thuộc tính tài liệu (Metadata Box).
     - Nhúng ảnh minh họa độ phân giải cao, căn giữa với chiều rộng `6.2 - 6.3 inches` (vừa vặn trang in không bị tràn lề).
     - Hộp Callout lưu ý có viền trái màu xanh/vàng 3pt và màu nền nhạt sang trọng (`#F0F5FF`).
     - Bảng Troubleshooting có header nền màu xanh đậm chữ trắng, các dòng xen kẽ zebra shading.

---

## 2. QUY CHUẨN ĐỊNH DẠNG TÀI LIỆU WORD (.DOCX)

| Thành phần Word | Quy cách thiết kế |
| :--- | :--- |
| **Font chữ** | `Segoe UI` hoặc `Arial` (Body: 10.5pt, khoảng cách dòng 1.2 - 1.25). |
| **Tiêu đề chính** | 19pt Bold, màu Deep Blue `#003eb3`, căn giữa. |
| **Heading 1** | 14pt Bold, màu `#003eb3`, có đường viền kẻ chân mỏng 1.5pt. |
| **Heading 2** | 12pt Bold, màu `#141414`, khoảng cách trước 14pt, sau 6pt. |
| **Ảnh minh họa** | Căn giữa, width `6.2 - 6.3 inches`, chú thích in nghiêng 9pt màu xám `#595959`. |
| **Khung Callout** | Table 1 cell, viền trái 3pt màu `#1677FF`, nền `#F0F5FF`, đệm ô lề trong 10pt. |
| **Bảng biểu** | Header nền `#003eb3` chữ trắng bold, ô xen kẽ `#FAFAFA` và `#FFFFFF`. |
| **Phân quyền** | **Tuyệt đối KHÔNG đưa bảng ma trận phân quyền kỹ thuật RBAC vào tài liệu.** |

---

## 3. MÃ PYTHON MẪU: TỰ ĐỘNG HÓA TỪ CHỤP ẢNH ĐẾN XUẤT BẢN WORD

### Script 1: Chụp ảnh & Chú thích viền mảnh (1.5px - 2px)
```python
from PIL import Image, ImageDraw, ImageFont

def annotate_image(image_path, output_path, annotations):
    img = Image.open(image_path)
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype("arialbd.ttf", 15)
    
    stroke_color = "#ff4d4f"  # Đỏ nổi bật
    stroke_width = 2          # Chuẩn 1.5px - 2px thanh mảnh
    badge_radius = 13         # Đường kính badge 26px
    
    for ann in annotations:
        num = str(ann['number'])
        x, y, w, h = ann['rect']
        pad = 4
        x0, y0 = max(0, x - pad), max(0, y - pad)
        x1, y1 = min(img.width - 1, x + w + pad), min(img.height - 1, y + h + pad)
        
        # Vẽ viền bo góc độ dày 2px
        draw.rounded_rectangle([x0, y0, x1, y1], radius=6, outline=stroke_color, width=stroke_width)
        
        # Định vị huy hiệu tròn
        pos = ann.get('badge_pos', 'top-left')
        bx = (x0 + 12) if pos == 'top-left' else (x1 - 12)
        by = y0
        
        # Vẽ hình tròn nền đỏ viền trắng
        draw.ellipse([bx - badge_radius, by - badge_radius, bx + badge_radius, by + badge_radius],
                     fill=stroke_color, outline="#ffffff", width=2)
        
        # Vẽ số thứ tự
        bbox = font.getbbox(num)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        draw.text((bx - tw / 2, by - th / 2 - 1), num, fill="#ffffff", font=font)
        
    img.save(output_path)
```

### Script 2: Tạo tệp Word (.docx) chuyên nghiệp bằng `python-docx`
```python
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

doc = Document()

# 1. Cấu hình lề 1 inch
for s in doc.sections:
    s.top_margin = s.bottom_margin = s.left_margin = s.right_margin = Inches(1.0)

# 2. Tiêu đề tài liệu
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("TÀI LIỆU HƯỚNG DẪN SỬ DỤNG")
run.font.size = Pt(19)
run.font.bold = True
run.font.color.rgb = RGBColor(0x00, 0x3e, 0xb3)

# 3. Chèn ảnh minh họa căn giữa
def add_step_image(img_path, caption):
    p_img = doc.add_paragraph()
    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_img.add_run().add_picture(img_path, width=Inches(6.3))
    
    p_cap = doc.add_paragraph()
    p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_cap = p_cap.add_run(f"Hình minh họa: {caption}")
    r_cap.font.size = Pt(9)
    r_cap.font.italic = True

# 4. Lưu tệp Word
doc.save("HDSD_Tinh_Nang.docx")
```

---

## 4. CHECKLIST ĐÁNH GIÁ TÀI LIỆU HDSD ĐẠT CHUẨN

Trước khi bàn giao tài liệu HDSD cho khách hàng, kiểm tra danh sách tiêu chí sau:

- [ ] **Định dạng bàn giao:** Đầu ra chính thức là tệp Microsoft Word (`.docx`).
- [ ] **Đường dẫn menu rõ ràng:** Ghi rõ đường dẫn menu phân cấp (Ví dụ: `Quản trị` > `Mô hình AI`) ngay ở phần đầu.
- [ ] **Ảnh minh họa chuẩn mực:** Mỗi quy trình có ảnh chụp thực tế được chèn vừa vặn trong văn bản Word.
- [ ] **Độ dày viền chuẩn:** Khung highlight trên ảnh có độ dày viền trong khoảng **1.5px - 2px**, thanh thoát, không che khuất chữ.
- [ ] **Huy hiệu số thứ tự tròn:** Có các badge số tròn đỏ (①, ②, ③...) nổi bật, sắc nét.
- [ ] **Ánh xạ 1-1:** Số thứ tự bước trong mô tả (`Bước [1]`, `Bước [2]...`) trùng khớp 100% với số trên ảnh.
- [ ] **Định dạng hành động:** Nút bấm được in đậm trong ngoặc vuông `**[Tên nút]**`, tên trường in đậm `**Tên trường**`.
- [ ] **Kết quả mong đợi:** Mô tả rõ sau mỗi thao tác thì màn hình hiển thị kết quả gì.
- [ ] **Loại bỏ phân quyền:** Đã loại bỏ hoàn toàn Bảng ma trận phân quyền RBAC và các chi tiết kỹ thuật sâu.
- [ ] **Bảng Xử lý sự cố:** Có bảng Troubleshooting rõ ràng ở cuối tài liệu.
