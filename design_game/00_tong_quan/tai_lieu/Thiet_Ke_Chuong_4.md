# Thiết kế Chương 4 — Đảo Mây Trắng

| Thông tin | Nội dung |
|---|---|
| Phiên bản | 1.0 — dựng theo khung độ khó: bản đồ chung 8×4, 10 màn, số đo, khung cảnh từng màn, mẹo hạn giao, màn thưởng |
| Ngày | 19/10/2026 |
| Căn cứ | [Khung_Do_Kho_Chuong_Man.md](Khung_Do_Kho_Chuong_Man.md) (bản 0.5) · [Chu_De_Khung_Canh.md](../Chu_De_Khung_Canh.md) mục 3.4, 5, 8, 9 · mẫu [Thiet_Ke_Chuong_3.md](Thiet_Ke_Chuong_3.md) · BA chốt 19/10: tên **Đảo Mây Trắng**, hạn ở **bến + tiệc hoàng hôn**, hạn **rộng — dư ≥ 15 giây**, **có mẹo hạn giao** ở màn 3 |
| Dữ liệu | [levels_ch4.py](levels_ch4.py) (bộ giải) · `CH4` trong [demo/index.html](../demo/index.html) · [ket_qua_ch4.json](ket_qua_ch4.json) · ảnh kiểm chứng [playtest_evidence/chuong4_v15/](../playtest_evidence/chuong4_v15/) |

---

## 1. Tóm tắt

| Hạng mục | Nội dung |
|---|---|
| Yếu tố mới | **Hạn giao** (từ màn 3): đơn có ⏱ hạn phải giao xong trong số giây đầu, **tính từ lúc xe xuất phát** (D-44); trễ là thua ngay, Thêm giờ không cứu được (F-02, VP-06). Cơ chế đã có sẵn trong demo — chương này chỉ thêm màn, cảnh và mẹo |
| Thể hiện hạn trong cảnh | Hàng phải **kịp chuyến phà** (Bến phà, từ màn 3), **kịp tiệc hoàng hôn** (Quán hoàng hôn, từ màn 6), **kịp tàu du lịch** (Cảng cũ dưới vách, từ màn 7). Phà / tàu đậu sẵn ở bến từ khi bến thông xe. Mọi đơn có hạn đều tới một trong ba nơi này |
| Có trong chương | Đường thường, **đường lớn** (đường ven vách + đường ven biển phía Nam), **đường đông** (phố chợ) · nhiều điểm giao · chia chuyến · nhiều kho (2 kho màn 1–6, 3 kho từ màn 7) · **hạn giao** · xe van |
| ĐK | 16 → 25 (CT-01) |
| Kiểu tiến triển | **Chuẩn bị mùa du lịch**: nhà trong vùng thông xe đã quét vôi, nhà ngoài vùng còn bạc màu; mỗi màn thắng xong một công trình và phố quanh nó được sơn mới (cửa xanh, hoa giấy, bể bơi trên mái); màn 10 nhà thờ ba mái vòm xanh (kỳ quan), cảnh kết, bưu thiếp; sau đó mở màn thưởng |
| Bảng màu | Hoàng hôn, tông ấm (Chu_De_Khung_Canh mục 3.4): biển caldera `#1b8fc4`, đất núi lửa `#a08a74` / `#8c7663`, nền ô phố `#e6dacb`; nhà trắng vôi `#fbf8f3`, đất nung `#c97b5a`, vàng đất `#e3c18f`; **xanh coban `#1f5fae` chỉ ở công trình** (mái vòm, cửa — gần màu đường lớn trên mini map); nhấn hoa giấy `#c2187f` và vàng nắng chiều `#f2c14e`. Không dùng cam, xanh dương đậm cho trang trí (K10) |
| Độ đọc (mục 8.2) | Mặt đường đá núi lửa sẫm `#5b4f48`, vỉa hè xám nhạt, bóng đổ xanh lam, **ghim có viền tối** (nền trắng chói) |
| Số đo | 10 màn đều **đúng ĐK** (CT-05, CT-06, CT-07). Lời giải chuẩn còn **dư hạn 18–36 giây** ở mọi đơn có hạn. Bộ lái tự động: **40/40 màn đạt** (Chương 1–3 không đổi) |

## 2. Bản đồ chung

| Thành phần | Nội dung |
|---|---|
| Lưới | 8×4 (như Chương 3 — khung mục 6: Chương 3–4 từ 6×4 tới 8×5; giữ 8×4 để màn chuẩn bị không thu nhỏ quá) |
| Xuất phát | Đoạn c0r1–c1r1, hướng sang phải (cạnh Kho cảng) |
| Đường lớn | **Đường ven vách** (cột 0, mép vách núi lửa) và **đường ven biển phía Nam** (hàng 3), nối dài theo vùng |
| Đường đông | **Phố chợ**: hàng 1 từ cột 2 sang cột 5 + phố dọc cột 4 (hàng 1 → 3). Có ngay từ màn 1 (ôn yếu tố Chương 3 — NC-01) |
| Vùng theo màn | M1–2: 6×4 (cột 0–5) · M3–6: 7×4 (thêm cột 6 có **Bến phà** — NC-03) · M7–10: 8×4 (thêm Xưởng rượu vang) |
| Địa hình | Vách núi lửa đổ xuống biển caldera ở phía Tây (đảo núi lửa ngoài khơi, nhà xếp tầng trên vách, bậc thang zíc zắc xuống Cảng cũ); bãi cát đen phía Nam; vườn nho, cối xay, hải đăng phía Đông |

Cách đặt đường đông được chọn sau khi so 4 phương án (A: phố chợ hàng 1 cột 1→5; B: phố dọc cột 2 + hàng 2; **C: hàng 1 cột 2→5 + cột 4**; D: đường lớn hàng 0 + phố đông hàng 2), mỗi phương án tìm 300 giây cho màn 1, 6, 10. Phương án C cho nhiều màn ứng viên nhất mà **cả đường đông lẫn đường lớn đều có tác dụng** (màn 1: 27/42 ứng viên, A: 10/53, B: 1/29, D: 4/34).

| Điểm | Đoạn | Vai trò |
|---|---|---|
| **Kho cảng** | c0r1–c0r2 | Kho 1 (nhà kho, thùng hàng, cáp tời xuống cảng) |
| **Kho sơn** | c4r0–c4r1 | Kho 2 (xô vôi trắng, sơn xanh, ngói đất nung) |
| **Xưởng rượu vang** | c7r1–c7r2 | Kho 3 — mở ở màn 7 (thùng gỗ tròn, vườn nho) |
| Quán taverna · Phố sơn mới · **Bến phà** · Tháp chuông · Khách sạn bể bơi | c1r0–c1r1 · c2r2–c3r2 · c5r3–c6r3 · c3r0–c3r1 · c4r2–c4r3 | Công trình màn 1 → 5 |
| **Quán hoàng hôn** · **Cảng cũ** · Cối xay gió · Hải đăng · Nhà thờ ba mái vòm xanh | c0r0–c0r1 · c0r2–c0r3 · c6r0–c6r1 · c7r2–c7r3 · c1r1–c1r2 (khối lớn) | Công trình màn 6 → 10 |
| Nhà hàng cá, Tiệm gốm, Nhà nghỉ hang, Đồ lưu niệm, Hiệu bánh, Phòng tranh, Tiệm kem, Nhà trọ, Vườn nho, Quán bãi biển, Xóm vôi trắng, Tiệm hoa, Cà phê ven vách, Làng phía Đông | — | Điểm giao (không phải công trình). **Đồ lưu niệm, Phòng tranh, Khách sạn bể bơi** nằm trên phố đông |

Mã điểm `BenPhaDao`, `KSBeBoi`, `CafeVach` khác Chương 2–3 (`BenPha`, `KhachSan`, `QuanCafe`) vì `PLACE`/`PCOL` dùng chung cho mọi chương.

## 3. Mười màn — logic chơi và số đo

**T_opt** đo bằng bộ lái tự động trong demo theo **lời giải chuẩn** = lời giải tốt nhất trong các lời giải **còn dư ≥ 15 giây ở mọi hạn** (ở cả 10 màn trùng lời giải nhanh nhất). Cách chơi không tính toán (bỏ qua loại đường **và bỏ qua hạn**) và số kế hoạch tính bằng bộ giải, quy đổi theo **tỉ lệ demo/bộ giải của từng màn** (0,92 – 0,97, ghi ở `TI_LE` trong levels_ch4.py). Kế hoạch đếm theo kế hoạch chuẩn nhiều kho và **phải kịp mọi hạn**. Cột "Đông" = thời gian thêm vào lời giải chuẩn do đường đông; "Lớn" = thời gian mất nếu không có đường lớn.

| Màn | ĐK | Tên | Nội dung (khung) | Nhiệm vụ | Kho · điểm · kiện | T_opt | Biên | T0 | Không tính toán | Kế hoạch đạt | Đạt 3★ | Đông | Lớn |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 16 | Quán taverna | Ôn: 2 kho, phố chợ đông | Kho cảng → **Quán taverna** 1, Đồ lưu niệm 3, Quán bãi biển 3 · Kho sơn → Phòng tranh 1 | 2 · 4 · 8 | 88,3 | 27,5% | 115 | thua (≈ 160,0) | 17 | 4 | 8,8 | 14,4 |
| 2 | 17 | Phố sơn mới | Ôn: đường lớn ven vách, ven biển | Kho sơn → **Phố sơn mới** 3 · Kho cảng → Tiệm kem 2, Phòng tranh 2 | 2 · 3 · 7 | 89,6 | 27% | 115 | thua (≈ 128,2) | 10 | 7 | 11,1 | 6,1 |
| 3 | 18 | Bến phà | **Mới: hạn giao** | Kho sơn → **Bến phà** 3 (⏱ 1:20) · Kho cảng → Vườn nho 2, Xóm vôi trắng 3 | 2 · 3 · 8 | 97,9 | 36,5% | 135 | thua — trễ hạn | 13 | 8 | 7,1 | 12,2 |
| 4 | 19 | Tháp chuông | Đơn có hạn và đơn thường chung một kho | Kho sơn → **Tháp chuông** 2, Bến phà 2 (⏱ 1:00) · Kho cảng → Vườn nho 3 | 2 · 3 · 7 | 115,5 | 26% | 150 | thua — trễ hạn | 17 | 16 | 31,4 | 6,8 |
| 5 | 20 | Khách sạn bể bơi | Hạn + chia chuyến | Kho sơn → **KS bể bơi** 3, Bến phà 3 (⏱ 1:15), Hiệu bánh 3 · Kho cảng → Quán taverna 1 | 2 · 4 · 10 | 125,2 | 25,5% | 160 | thua — trễ hạn | 13 | 9 | 25,8 | 4,2 |
| 6 | 21 | Quán hoàng hôn | Hạn ở nơi thứ hai (tiệc hoàng hôn) | Kho sơn → **Quán hoàng hôn** 2 (⏱ 1:25), KS bể bơi 2 · Kho cảng → Tiệm hoa 3, Vườn nho 3 | 2 · 4 · 10 | 126,2 | 25% | 160 | thua — trễ hạn | 16 | 4 | 16,2 | 5,0 |
| 7 | 22 | Cảng cũ | Thêm kho thứ 3 + hai hạn | Xưởng rượu → **Cảng cũ** 2 (⏱ 1:55), Bến phà 3 (⏱ 1:05) · Kho sơn → Quán bãi biển 2 · Kho cảng → Hiệu bánh 3 | 3 · 4 · 10 | 130,9 | 24,5% | 165 | thua — trễ hạn | 14 | 6 | 16,0 | 25,4 |
| 8 | 23 | Cối xay gió | Hai hạn cùng một kho, hai nơi bên vách | Xưởng rượu → **Cối xay gió** 3 · Kho sơn → Cảng cũ 3 (⏱ 1:50), Quán hoàng hôn 3 (⏱ 1:10) · Kho cảng → Hiệu bánh 2 | 3 · 4 · 11 | 133,5 | 24% | 170 | thua — trễ hạn | 10 | 9 | 10,3 | 15,2 |
| 9 | 24 | Hải đăng | Hai hạn ở hai đầu đảo, 3 kho | Kho sơn → **Hải đăng** 2 · Xưởng rượu → Bến phà 2 (⏱ 1:20) · Kho cảng → Quán hoàng hôn 2 (⏱ 1:35), Tiệm hoa 3, Phòng tranh 3 | 3 · 5 · 12 | 141,2 | 23,5% | 175 | thua — trễ hạn | 11 | 4 | 11,4 | 14,8 |
| 10 | 25 | Nhà thờ mái vòm xanh | **Trùm:** 3 kho, 3 hạn (phà, tàu, tiệc) | Kho sơn → **Nhà thờ** 3, Quán hoàng hôn 3 (⏱ 1:30) · Xưởng rượu → Bến phà 2 (⏱ 2:15), Làng phía Đông 2 · Kho cảng → Cảng cũ 2 (⏱ 0:45) | 3 · 5 · 12 | 150,3 | 23% | 185 | thua — trễ hạn | 36 | **13** | 13,4 | 11,8 |

### 3.1. Hạn giao — độ dư và tác dụng

Quy tắc (BA chốt 19/10 "hạn rộng"): **lời giải chuẩn còn dư ≥ 15 giây** ở mọi hạn. Để hạn không chỉ là trang trí, thêm hai điều kiện khi tìm màn: (1) **hạn đầu tiên của màn "có tác dụng"** — nếu bỏ hạn đó, lời giải nhanh nhất sẽ giao trễ hơn hạn, nghĩa là người chơi phải đổi thứ tự so với cách nhanh nhất "tự nhiên"; (2) mỗi hạn **loại được ít nhất một kế hoạch** kịp T0.

| Màn | Đơn có hạn | Hạn | Lời giải chuẩn giao lúc (demo) | Dư | Bỏ hạn này thì lời giải nhanh nhất giao lúc | Kế hoạch kịp T0 nhưng trễ hạn |
|---|---|---|---|---|---|---|
| 3 | Bến phà | 1:20 | 50,9 | 29,1 | 93,5 (trễ) | 9 |
| 4 | Bến phà | 1:00 | 42,1 | 17,9 | 87,5 (trễ) | 16 |
| 5 | Bến phà | 1:15 | 50,9 | 24,1 | 82,2 (trễ) | 11 |
| 6 | Quán hoàng hôn | 1:25 | 62,3 | 22,7 | 95,6 (trễ) | 24 |
| 7 | Bến phà · Cảng cũ | 1:05 · 1:55 | 46,8 · 85,0 | 18,2 · 30,0 | 69,9 · 129,5 (cả hai trễ) | 111 |
| 8 | Quán hoàng hôn · Cảng cũ | 1:10 · 1:50 | 42,1 · 88,2 | 27,9 · 21,8 | 125,4 · 122,6 (cả hai trễ) | 18 |
| 9 | Bến phà · Quán hoàng hôn | 1:20 · 1:35 | 52,8 · 77,1 | 27,2 · 17,9 | 95,7 (trễ) · 74,9 (kịp — hạn "lỏng") | 69 |
| 10 | Cảng cũ · Quán hoàng hôn · Bến phà | 0:45 · 1:30 · 2:15 | 8,7 · 54,8 · 109,3 | 36,3 · 35,2 · 25,7 | 50,9 · 97,8 · 149,3 (cả ba trễ) | 287 |

Thời điểm giao đo bằng nhật ký bộ lái tự động (lúc rời điểm giao, sau khi giao). Cách chơi không tính toán thua **vì trễ hạn** ở cả 8 màn có hạn.

### 3.2. Đối chiếu ba điều kiện "đúng ĐK"

| Điều kiện | Kết quả |
|---|---|
| CT-05 (T0 theo công thức) | Đạt cả 10 màn — T0 tính lại từ thời gian đo trong demo (màn 3 có thêm 10% biên) |
| CT-07 (không tính toán thua) | Đạt cả 10 màn. Màn 1–2 thua vì hết giờ (≈ 160,0 / 115 và ≈ 128,2 / 115). Màn 3–10 thua vì **trễ hạn**; ở màn 3, 4, 5, 6 cách chơi này về đích còn kịp T0 (≈ 130,0 / 135, 126,6 / 150, 141,7 / 160, 156,9 / 160) — bẫy của các màn này chính là hạn |
| CT-06 (số kế hoạch) | Màn 1–9: 10 – 17, trong khoảng 5–20. Màn 10 trùm: đánh giá bằng **số kế hoạch đạt 3★ = 13** (Chương 2: 24, Chương 3: 21) |

Đường đông có mặt trong lời giải chuẩn (làm chậm 7,1 – 31,4 giây) và đường lớn giúp nhanh hơn 4,2 – 25,4 giây ở **cả 10 màn** — mọi màn đều ôn hai loại đường của Chương 1–3.

**Độ khó tăng dần (CM-02):** đo bằng CT-06 như khung quy định. T0: 115 · 115 · 135 · 150 · 160 · 160 · 165 · 170 · 175 · 185 (màn 3 có thêm 10% biên để học yếu tố mới). T_opt đo được lệch bảng mục 5 khung độ khó trong khoảng −8% → +5% (bản đồ 8×4).

**Cách tìm màn:** tìm ngẫu nhiên nhiệm vụ trong vùng của từng màn (điểm giao, số kiện, kho), đặt hạn theo quy tắc mục 3.1 (hạn bội 5 giây), lọc theo T_opt (−20% → +12% so với bảng), CT-06, CT-07, dư hạn; chọn ứng viên ôn đủ đường đông + đường lớn, cách chơi không tính toán thua vì trễ hạn. Màn 2 thay ứng viên đầu tiên (không tính toán chỉ thua sát 0,6%) bằng ứng viên thua rõ (≈ 11%).

## 4. Khung cảnh từng màn

Vẽ bằng code (`drawSanto`, như Chương 3 — "code trước, ảnh sau"). Khi có ảnh thiết kế theo D-77 thì đổi `CH4.draw` thành `imgDraw(4,o)||drawSanto(o)` như Chương 1–2.

| Màn | Vùng mới | Công trình hoàn thành (hình khối riêng — K4) | Câu thông báo |
|---|---|---|---|
| 1 | Thị trấn trên vách 6×4 (cột 0–5) | **Quán taverna** (nhà trắng, giàn gỗ hoa giấy, bàn ghế xanh trắng) | Quán taverna mở cửa — giàn hoa giấy đã nở, mùa du lịch bắt đầu. |
| 2 | — | **Phố sơn mới** (dãy nhà trắng cửa xanh, xô vôi) | Phố sơn mới trắng tinh, cửa xanh — đường xuống Bến phà phía Nam đã thông. |
| 3 | + cột 6: Bến phà, vườn nho | **Bến phà** (nhà chờ, cầu tàu gỗ; phà trắng đậu sẵn từ màn 3) | Bến phà đón chuyến phà đầu mùa — hàng lên tàu kịp giờ! |
| 4 | — | **Tháp chuông** (tháp trắng, vòm treo chuông, mái vòm xanh nhỏ, sân lát đá) | Tháp chuông vang tiếng — phố quanh tháp được quét vôi mới. |
| 5 | — | **Khách sạn bể bơi** (phòng hang trắng, bể bơi xanh ngọc, ghế nằm) | Khách sạn bể bơi mở cửa — làn nước xanh nhìn ra biển. |
| 6 | — | **Quán hoàng hôn** trên vách (dù vàng nắng chiều, dây đèn) | Quán hoàng hôn khai trương đúng lúc mặt trời lặn. Đường sang Xưởng rượu vang phía Đông đã thông. |
| 7 | + cột 7: Xưởng rượu vang | **Cảng cũ** (trạm lừa, ga cáp treo; bậc thang zíc zắc và cáp xuống cầu cảng, tàu gỗ đậu) | Cảng cũ đón tàu du lịch — bậc thang và cáp treo xuống vách đã sửa xong. |
| 8 | — | **Cối xay gió** (3 tháp tròn trắng, mái nón, cánh buồm quay chậm) | Cối xay gió quay cánh trở lại trên đồi. |
| 9 | — | **Hải đăng** trên mũi đất (tháp tròn, đèn vàng quét) | Hải đăng sáng trên mũi đất — sẵn sàng cho ngày khai mùa. |
| 10 | — | **Nhà thờ ba mái vòm xanh** (kỳ quan, khối lớn 160×160 sát vách: thân hình chữ thập, 3 mái vòm coban, tháp chuông, hoa giấy 4 góc) → cảnh kết toàn cảnh, bưu thiếp | Nhà thờ ba mái vòm xanh hoàn tất — Đảo Mây Trắng sẵn sàng đón khách. |

- Nhà trong vùng thông xe: tường đã quét vôi; nhà ngoài vùng: bạc màu. Nhà trong bán kính 300 px quanh công trình đã xong: **sơn mới** (trắng sáng, cửa coban, hoa giấy, đôi khi có bể bơi trên mái) — dùng hiệu ứng "mọc" của cảnh quay (K8).
- Phố chợ đông: mái hiên sọc trắng – hồng hai bên vỉa hè, xe buýt nhỏ trắng sọc xanh ngọc, xe ATV đỏ, xe máy vàng kín hai làn (N1: loại xe đổi theo chủ đề).
- Lừa chỉ đứng trong ô phố (N9). Lối bậc thang là lối đi bộ lát trắng trong ô phố và trên vách (hẻm chưa học).
- Mọi hình "lấy cảm hứng", không dùng tên thật (mục 4). Nhà thờ đặt **trong ô phố** sát vách (N7: chiếm trọn một ô).

## 5. Mẹo hạn giao ở màn 3 (D-83)

| Hạng mục | Nội dung |
|---|---|
| Khi nào | Lần đầu mở **Màn 33 (màn 3 Chương 4)**; khóa lưu `demo_han_tip` |
| Bước 1 | Khoanh điểm giao có hạn + dòng "⏱ hạn" trên bản đồ chuẩn bị: "Đơn tới **Bến phà** có **⏱ hạn 1:20**: phải giao xong trong 1:20 đầu, tính từ lúc xe xuất phát. **Trễ hạn là thua ngay.**" |
| Bước 2 | Khoanh kho của đơn đó: "Hàng của đơn này lấy ở **Kho sơn**. Giao đơn có hạn trước rồi mới gom các đơn khác — **Thêm giờ không cứu được** đơn trễ hạn." |
| Khác đề xuất ban đầu | Đề xuất hỏi BA là bước 2 khoanh "đơn trong danh sách nhiệm vụ", nhưng màn chuẩn bị không có danh sách nhiệm vụ (nhiệm vụ ghi trên bản đồ — D-34) → khoanh kho của đơn có hạn |
| Cơ chế | Dùng lại lớp khoanh của luật chơi Màn 1 (`pcRing`, `pcTip`) như mẹo đường đông (D-80); chạm để tiếp, có nút Bỏ qua. Xem lại ở nút ? tab "Màn này" (văn bản cơ chế "Hạn giao" viết lại: tính từ lúc xe xuất phát, Thêm giờ không cứu) |

## 6. Màn thưởng — "Lễ hội hoàng hôn" (D-73)

| Hạng mục | Nội dung |
|---|---|
| Mở | Sau khi thắng màn 10; nút hộp quà sau cờ Về đích |
| Kim cương | 25, thành 7 cụm: c0r0–c1r0 (4), **phố chợ** c2r1–c3r1 (3), **phố đông** c4r1–c4r2 (4), c6r0–c7r0 (3), đường ven biển c5r3–c6r3 (4), c1r2–c1r3 (3), c7r1–c7r2 (4) |
| Thời gian | Vòng nhặt hết nhanh nhất ≈ 83,4 giây theo bộ giải (≈ 78 giây demo, ước) → T0 = 120 giây (+50%) |
| Quy tắc | MT-1 → MT-8 |

## 7. Điểm còn mở

| # | Nội dung | Đề xuất |
|---|---|---|
| C4-1 | **Hạn "lỏng" ở màn 9:** hạn Quán hoàng hôn (1:35) không buộc đổi thứ tự (lời giải nhanh nhất vẫn kịp), chỉ loại các kế hoạch giao muộn. Các màn có 2–3 hạn khác đều có tác dụng | Giữ — hạn rộng theo BA; nếu muốn chặt hơn thì chỉ cần tìm lại màn 9 |
| C4-2 | Thời gian màn thưởng là ước theo bộ giải, chưa đo bằng bộ lái tự động (như C3-2) | Đo khi làm bộ lái cho màn thưởng |
| C4-3 | ~~Cần bộ hồ sơ `design_game/chuong_4` để người/AI thiết kế vẽ ảnh (D-77)~~ | **Đã xuất 19/10** bằng `export_design.mjs 4`: 10 màn + màn thưởng + tổng quan chương; README và PROMPT_cho_AI có mục Chương 4. Còn chờ ảnh thiết kế rồi đổi `CH4.draw` thành `imgDraw(4,o)\|\|drawSanto(o)` |
| C4-4 | Phà chưa "rời bến" khi tới hạn (cảnh tĩnh) | Có thể thêm hoạt cảnh phà nhổ neo đúng giờ hạn — cần BA quyết có làm không |
