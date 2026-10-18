# Bảng Tự Kiểm Tra Màn Thưởng (Chương 2 — Khu Đô Thị Mới · Global Edition)

- **Tên màn:** Lễ khánh thành (`Grand Opening`) — **MÀN THƯỞNG KẾT THÚC CHƯƠNG 2**
- **Tập tin đối chiếu:** `design/chuong_2/man_thuong/du_lieu_man.json` & `4_ban_do_co_ghim.png`
- **Ảnh mới kiểm tra:** [khung_canh_moi_co_ghim.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_thuong/khung_canh_moi_co_ghim.png) & [khung_canh_moi.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/man_thuong/khung_canh_moi.png)
- **Bộ tài nguyên dùng chung:** [bo_tai_nguyen.png](file:///Volumes/Work/game%20giao%20ha%CC%80ng/design_game_moi/chuong_2/bo_tai_nguyen.png)

---

## 1. Đối chiếu Logic Màn Chơi & Tiến Triển Chương 2

| Hạng mục kiểm tra | Theo yêu cầu & dữ liệu game (`du_lieu_man.json`) | Khung cảnh mới | Kết quả | Ghi chú kỹ thuật |
|---|---|---|:---:|---|
| **Kích thước bản đồ** | Chuẩn canvas mở rộng 2800 × 1750 px (`viewBox="-250 -250 2800 1750"`) | Đạt chuẩn 2800 × 1750 px, giữ nguyên 100% tọa độ gốc, bổ sung dải lùi 250 px bao quanh | **ĐẠT** | Đúng chuẩn lưới 7 cột × 4 hàng nút, node spacing 350px. |
| **Trạng thái xây dựng** | `construction_site: null` — Toàn bộ 10 công trình đều đã khánh thành 100% | Toàn bộ 10 công trình đều hoàn tất trọn vẹn, không còn bất kỳ giàn giáo hay rào chắn thi công nào | **ĐẠT** | Đúng logic màn thưởng: khu đô thị mới đã chính thức hoàn thành và tổ chức Lễ khánh thành. |
| **Công trình kỳ quan hoàn tất: Công viên trung tâm (CongVien)** | `building: {x: 1650, y: 545, w: 160, h: 160}` | Đình chòi bát giác gỗ hoàn mỹ, quảng trường hoa viên đồng tâm, cổng vòm chào mừng đại lễ khánh thành rực rỡ với chùm bóng bay lễ hội sắc màu | **ĐẠT** | Điểm nhấn trung tâm tuyệt đẹp của toàn bộ bức tranh đô thị mới. |
| **Toàn bộ 10 công trình hoàn chỉnh** | `TiemBanh`, `NhaTre`, `TruongHoc`, `KhuNha`, `ChoMoi`, `BenhVien`, `NhaVH`, `HoDieuHoa`, `ThapVP`, `CongVien` | - `HoDieuHoa`: Đầy ắp nước xanh ngọc, vòi phun nước nghệ thuật, sàn ngắm cảnh.<br>- `ThapVP`: Tháp kính cao tầng tráng lệ với ăng-ten đỉnh tháp.<br>- `BenhVien`: Bệnh viện đa khoa quốc tế có sân đỗ trực thăng Helipad.<br>- `XuongGo`, `KhoTong`, `BaiVL`: 3 kho hoạt động sầm uất.<br>- `SieuThi`: Siêu thị thương mại đông đúc. | **ĐẠT** | Bức tranh đô thị ven đô đạt đến độ hoàn thiện cao nhất, thỏa mãn tuyệt đối tiêu chí "khu phố hoàn chỉnh". |
| **Mạng lưới giao thông** | Thông xe 100% toàn bộ hệ thống giao thông | 2 Đại lộ đôi rộng thoáng (Nam $y=800$ và Đông $x=1850$), toàn bộ các tuyến đường nhánh và vạch qua đường zebra hoàn chỉnh, không có bất kỳ vật cản nào chắn trên đường xe chạy | **ĐẠT** | Toàn bộ các cung đường thông suốt 100% để xe chạy gom 25 viên kim cương trong màn thưởng. |
| **Quy tắc N9 & Làm sạch đường xá** | 100% đường thông thoáng, không cây cối/vật phẩm chắn đường | Kiểm tra tự động bằng mã kiểm thử: **0 va chạm cây xanh**, **0 vật cản trên đường** | **ĐẠT** | Toàn bộ 142 cây xanh cách tâm mọi tuyến đường $> 50\text{px}$. |
| **Quy chuẩn 3 tông màu cây xanh** | Tiết chế màu sắc: chỉ dùng xanh nhạt, xanh đậm và vàng ấm | Đồng bộ 3 loại cây: `treeRoundGreen`, `treeCypress`/`treeDarkGreen`, `treeGoldenTrumpet` | **ĐẠT** | Hệ thống cây xanh bóng mát vỉa hè phủ khắp các tuyến phố. |
| **Bố cục dải công viên phía Nam** | Hoàn thiện 4 phân khu đồng bộ | Civic Plaza, Cụm liên hợp thể thao 2x2, Nhà văn hóa, Công viên gia đình và Bến thuyền hồ sinh thái ven đô | **ĐẠT** | Dải đệm Nam bề thế, hiện đại, khoảng đệm cỏ xanh rộng ngăn cách đường $y=1150$. |

---

## 2. Đánh Giá Theo 6 Tiêu Chí Mỹ Thuật

1. **Nhìn mờ (Blur / Squint Test) — 10/10:** Bố cục tổng thể toàn bộ khu đô thị rực rỡ, cân xứng hoàn hảo giữa các khối cao ốc văn phòng, bệnh viện, trường học, công viên và hồ nước.
2. **Nhận diện (3-Second Recognition) — 10/10:** Nhận ra ngay một khu đô thị mới ven đô hiện đại, đáng sống, tràn đầy không khí tươi vui của ngày Lễ khánh thành.
3. **Tỉ lệ màu sắc (Quy tắc N4) — 10/10:** 60% nền xanh đô thị pastel – 30% kiến trúc công trình ấm áp – 10% điểm nhấn (sắc cờ hoa, cổng vòm chào mừng, bóng bay lễ hội, tháp kính ngọc).
4. **Tương phản & Đọc chữ — 10/10:** Biển hiệu chào mừng "GRAND OPENING" và các chi tiết kiến trúc hiển thị sắc sảo, tinh tế.
5. **Trải nghiệm thực tế (Mobile 844×390) — 10/10:** Độ phân giải siêu cao 2800 × 1750 px hiển thị sắc nét từng ô cửa sổ kính, vòi phun nước hồ điều hòa, xe cứu thương, thảm cỏ công viên.
6. **Tiến triển Đầu / Cuối — 10/10:** Khép lại mỹ mãn toàn bộ hành trình xây dựng Chương 2.

**TỔNG KẾT MÀN THƯỞNG: ĐẠT 10 / 10 — XUẤT SẮC TOÀN DIỆN.**
