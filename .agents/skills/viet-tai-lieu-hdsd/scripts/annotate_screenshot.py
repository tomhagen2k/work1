"""
Tiện ích tự động vẽ bounding box và numbered badges cho ảnh chụp giao diện HDSD.
Quy chuẩn: Viền đỏ #ff4d4f độ dày 1.5px - 2px, huy hiệu số tròn đường kính 26px.
"""
import sys
from PIL import Image, ImageDraw, ImageFont

def draw_annotations(image_path, output_path, annotations):
    img = Image.open(image_path)
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("arialbd.ttf", 15)
    except IOError:
        font = ImageFont.truetype("segoeuib.ttf", 15)

    stroke_color = "#ff4d4f"
    stroke_width = 2   # Chuẩn 1.5px - 2px
    badge_radius = 13  # Đường kính 26px

    for ann in annotations:
        num = str(ann['number'])
        x, y, w, h = ann['rect']
        pad = 4
        x0, y0 = max(0, x - pad), max(0, y - pad)
        x1, y1 = min(img.width - 1, x + w + pad), min(img.height - 1, y + h + pad)

        # 1. Bounding box bo góc viền thanh mảnh 2px
        draw.rounded_rectangle([x0, y0, x1, y1], radius=6, outline=stroke_color, width=stroke_width)

        # 2. Vị trí badge tròn
        pos = ann.get('badge_pos', 'top-left')
        bx = (x0 + 12) if pos == 'top-left' else (x1 - 12)
        by = y0

        # 3. Badge tròn đỏ viền trắng
        draw.ellipse([bx - badge_radius, by - badge_radius, bx + badge_radius, by + badge_radius],
                     fill=stroke_color, outline="#ffffff", width=2)

        # 4. Số thứ tự trắng
        bbox = font.getbbox(num)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        draw.text((bx - tw / 2, by - th / 2 - 1), num, fill="#ffffff", font=font)

    img.save(output_path)
    print(f"Đã xuất ảnh có chú thích: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python annotate_screenshot.py <input_img> <output_img>")
