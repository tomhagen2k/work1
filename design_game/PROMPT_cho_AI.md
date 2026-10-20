# Prompt giao việc cho AI thiết kế

> Cách dùng: đưa cho AI **cả thư mục `design_game/`** (hoặc tải lên các tệp của chương cần làm), rồi dán nguyên phần trong khung dưới đây.
> Nếu AI giới hạn số tệp, làm **từng chương**: gửi `00_tong_quan/` + `chuong_1/`, xong mới gửi `chuong_2/`, rồi `chuong_3/`, `chuong_4/`.
> Chỉ làm một chương (vd Chương 4): gửi `00_tong_quan/` + `chuong_4/`, và trong prompt sửa mục NHIỆM VỤ thành "chỉ Chương 4".
> **Khổ ảnh:** ảnh khung cảnh phải có lề quanh bản đồ (trái/phải 600, trên/dưới 250). Nếu AI đã vẽ khổ nhỏ, dán thêm [YEU_CAU_KHO_ANH.md](YEU_CAU_KHO_ANH.md).
> Nếu AI chỉ xem được ảnh, không đọc được JSON/SVG: tối thiểu gửi `1_man_chuan_bi.png`, `5_khung_canh_khong_ghim.png`, `du_lieu_man.json` (dán dạng văn bản) của từng màn.

---

````text
# VAI TRÒ
Bạn là art director và họa sĩ môi trường cho game di động 2D nhìn từ trên xuống (top-down), phong cách phẳng, dễ thương, sạch.
Game: "Little Routes" (tiếng Việt: "Cung Đường Nhỏ") — giải đố giao hàng. Người chơi lái xe trên mạng đường dạng lưới,
lấy hàng ở KHO (ghim ô vuông ▲) và giao tới ĐIỂM GIAO (ghim hình tròn ▼) trước khi hết giờ. Màn hình ngang 844×390, người chơi 10+ tuổi, phát hành toàn cầu.

# NHIỆM VỤ
Phân tích rồi thiết kế lại KHUNG CẢNH của toàn bộ các màn Chương 1 (Làng ven sông Việt Nam, 10 màn + màn thưởng),
Chương 2 (Khu đô thị mới ven đô, 10 màn + màn thưởng), Chương 3 (Thành phố Không Ngủ — New York về đêm, 10 màn + màn thưởng)
và Chương 4 (Đảo Mây Trắng — Santorini hoàng hôn, 10 màn + màn thưởng)
cho ĐẸP HƠN (mục tiêu 9,5–10/10). Chương 3 và 4 hiện chỉ là bản vẽ bằng code (drawNight, drawSanto) chờ ảnh thiết kế — cần vẽ mới hoàn chỉnh,
nhưng GIỮ NGUYÊN 100% LOGIC MÀN: mạng đường, loại đường, đoạn chưa thông xe, vị trí kho/điểm giao, công trình theo tiến độ.
Chỉ đổi phần "nền": mặt đất, nhà cửa, cây, sông hồ, vật trang trí, chất liệu, ánh sáng, bảng màu.

# CHỦ ĐỀ TỪNG CHƯƠNG (tóm tắt — chi tiết ở Chu_De_Khung_Canh.md mục 3.1 → 3.4)
Chương 1 — "Làng ven sông" (Riverside Village): làng quê Việt Nam buổi sáng, yên bình, tông lạnh xanh lá – mặt nước.
  Ruộng lúa ô bàn cờ có bờ đất, lũy tre quanh xóm, nhà ba gian mái ngói đỏ có sân gạch, ao cá, sông dọc mép Đông có bến đò.
  Đường lớn = đường đê ven sông. Kho duy nhất: Hợp tác xã (nhà kho mái tôn + sân phơi lúa). Câu chuyện: dựng dần đến phiên chợ đầu tiên dưới gốc đa.

Chương 2 — "Khu đô thị mới" (New Town): một khu đô thị mới đang mọc lên ở ven thành phố, nhìn trong nắng chiều.
  • Cảm giác: mới mẻ, sạch sẽ, đang lớn lên từng ngày; khác hẳn Chương 1 — dày đặc, có quy hoạch, nhà phố đồng bộ thay cho ruộng và lũy tre.
  • Tông màu: ẤM, PASTEL, nắng chiều. Nền cỏ mới trồng #9ccc65 và đất công trường #c8a77e; nhà màu kem #f3e6c8, hồng nhạt #f2c4b8,
    mái xám xanh #9aa8b5; điểm nhấn vàng cần cẩu #f2b705 và xanh ngọc của kính #7fc8c0.
  • Nhà cửa (nhìn từ trên): dãy nhà liền kề mái bằng đồng bộ, chung cư thấp tầng, nhà mẫu; lô đất trống có rào tôn chờ xây; công trường có cần cẩu.
  • Cảnh quan: đường mới trồng hàng cây non, bãi cỏ chưa xây, hồ điều hòa, công viên nhỏ. Đường lớn = đại lộ có dải phân cách trồng cây
    (một đại lộ ngang phía Nam có từ màn 1, một đại lộ dọc phía Đông thông ở màn 6).
  • 3 kho, mỗi kho một hình dạng riêng để nhận ra từ trên cao: Bãi vật liệu (đống cát, đá, lán — góc Tây Bắc, có từ màn 1),
    Kho tổng (nhà kho mái tôn lớn + kiện hàng — mở ở màn 3), Xưởng gỗ (đống gỗ xếp — phía Đông, mở ở màn 8).
  • Câu chuyện tiến triển: mỗi màn thắng xong một công trình mới và khu đất mở rộng dần về phía Đông và Nam:
    Tiệm bánh (mái hồng, hiên sọc) → Nhà trẻ (mái nhiều màu, cầu trượt) → Trường học (chữ L, sân bóng, cột cờ) → Khu nhà ở → Chợ mới (dãy quầy nhiều màu)
    → Bệnh viện (mái trắng, chữ thập đỏ) → Nhà văn hóa → Hồ điều hòa (hồ, đường dạo) → Tháp văn phòng → Công viên trung tâm (kỳ quan cuối chương:
    hồ, đài phun nước, vòng cây; nên thêm tháp đồng hồ). Màn đầu còn nhiều đất trống và công trường; màn cuối phải thấy rõ một khu phố hoàn chỉnh, đông vui.
  • Vật trang trí: xe trộn bê tông đỗ trong lô, đống gạch, biển dự án (không chữ thật), ghế đá, bồn hoa.
  • Tránh: giống Chương 1 (cùng vùng miền) — Chương 2 phải dày, đô thị, pastel, buổi chiều; Chương 1 thưa, xanh, buổi sáng.

Chương 3 — "Thành phố Không Ngủ" (City That Never Sleeps, lấy cảm hứng New York về đêm): thành phố lúc ~21 giờ, hiện đại, sôi động, lấp lánh.
  • Thành phố là một hòn đảo: sông phía Tây, phía Nam (cảng) và phía Đông; phía Bắc là phố tối ngoài bản đồ.
  • Tông màu: ĐÊM, LẠNH. Nền nhựa đêm #23262d, vỉa hè xám xanh #3a4250; mái xám than #4b5058, nâu brownstone #5b4a42,
    cửa sổ sáng vàng ấm #ffd479; nhấn taxi vàng #f7c517 và neon hồng #ff4fa3 (CHỈ ở khu đường đông).
  • Độ đọc ban đêm (Chu_De_Khung_Canh.md mục 8.2 — bắt buộc): mạng đường là phần SÁNG NHẤT bản đồ (mặt đường sáng hơn nền một bậc);
    quầng đèn đường chỉ rơi trên mặt đường; mái nhà tối, viền sáng ánh trăng; ghim và biển báo có quầng sáng; mini map giữ bảng màu ngày.
  • Nhà cửa (nhìn từ trên): tòa chọc trời mái bằng lùi tầng bậc thang; mái có tháp nước gỗ hình trụ; dãy brownstone 4–5 tầng.
  • Cảnh quan: ít cây, cây trong hố vuông; công viên trung tâm khối xanh chữ nhật có hồ; sông ở rìa, cầu treo trụ đá; ống hơi nước sọc trắng bốc khói.
  • Đường lớn = đại lộ ven sông (hàng 0 phía Bắc và hàng 3 phía Nam). ĐƯỜNG ĐÔNG (mới, từ màn 3) = phố dọc cột 5 + hai phố ngang hàng 1, 2
    từ cột 4 sang Đông: quảng trường màn hình LED, taxi vàng kín hai làn. Đường đông là nhân vật chính: neon và taxi chỉ ở đó, phần còn lại tối và yên.
  • 3 kho, mỗi kho hình dạng riêng: Bến cảng (container, cẩu bờ — phía Tây), Kho ga hàng (nhà kho + đường ray — phía Bắc),
    Trung tâm phân phối (mái lớn, cửa xuất hàng sáng đèn, xe tải — phía Đông, mở ở màn 7).
  • Câu chuyện tiến triển "thắp sáng thành phố": mỗi màn thêm một khu lên đèn: Ga tàu điện (lan can, đèn cầu xanh) → Dãy brownstone → Quảng trường LED
    → Nhà hát (biển đèn viền bóng) → Tháp nước sân thượng (vườn trên mái) → Cầu treo (dây cáp lên đèn) → Tòa Art Deco (chóp bạc) → Chợ đêm (dây đèn)
    → Sân băng trong công viên → Tượng cầm đuốc (kỳ quan cuối chương, trên đảo nhỏ giữa vũng cảng, NẰM TRONG ô công trình).
    Màn đầu khu phía Đông còn tối và nhiều lô "sắp xây"; màn cuối cả thành phố lên đèn.
  • Vật trang trí: taxi đỗ (trong ô phố, không trên mặt đường), xe hot dog, vòi cứu hỏa đỏ, quầng sáng đèn đường.
  • Tránh: tòa nhà có thật nhận diện được (vẽ "lấy cảm hứng"); neon tràn ra khắp nơi làm lẫn đường đông; nền quá tối làm mất đường và ghim.

Chương 4 — "Đảo Mây Trắng" (White Cloud Island, lấy cảm hứng Santorini): đảo núi lửa lúc hoàng hôn, nghỉ dưỡng, biển.
  • Địa hình: vách núi lửa nhiều lớp đá (đỏ nâu, đen, vàng đất) đổ xuống biển caldera ở PHÍA TÂY, có đảo núi lửa ngoài khơi và nhà hang trắng xếp tầng trên vách;
    bãi cát đen phía Nam; vườn nho cuộn tròn sát đất, ô liu xám bạc, cối xay gió, hải đăng phía Đông.
  • Tông màu: ẤM, HOÀNG HÔN. Biển #1b8fc4, đất núi lửa #a08a74; nhà trắng vôi #fbf8f3 (ánh hồng chiều), đất nung #c97b5a;
    XANH COBAN #1f5fae CHỈ ở công trình (mái vòm, cửa) — không rải đều (gần màu đường lớn trên mini map); nhấn hoa giấy #c2187f, vàng nắng chiều #f2c14e.
  • Độ đọc trên nền trắng (mục 8.2 — bắt buộc): mặt đường đá núi lửa sẫm, vỉa hè xám nhạt, bóng đổ xanh lam, ghim có viền tối.
  • Nhà cửa (nhìn từ trên): khối hộp trắng mái bằng hoặc mái vòm thùng, sân thượng, bể bơi trên mái; lối đi lát trắng / bậc thang chỉ là lối đi bộ trong ô phố.
  • Đường lớn = đường ven vách (cột 0) + đường ven biển phía Nam (hàng 3). ĐƯỜNG ĐÔNG = phố chợ (hàng 1 cột 2→5 + cột 4), có từ màn 1:
    mái hiên sọc 1–2 màu hai bên vỉa hè, xe buýt nhỏ, ATV, xe máy kín hai làn.
  • HẠN GIAO (yếu tố mới, từ màn 3 — "deadline_s" trong du_lieu_man.json): hàng phải kịp chuyến phà ở BẾN PHÀ (phía Nam, phà đậu sẵn),
    kịp tiệc ở QUÁN HOÀNG HÔN (trên vách, màn 6), kịp tàu ở CẢNG CŨ (dưới vách, bậc thang zíc zắc + cáp treo, tàu gỗ — màn 7). Ba nơi này phải nhìn ra ngay là "có tàu / tiệc đang chờ".
  • Câu chuyện tiến triển "chuẩn bị mùa du lịch": nhà ngoài vùng còn bạc màu; trong vùng đã quét vôi; quanh công trình xong được sơn mới (cửa xanh, hoa giấy, bể bơi).
    Công trình: Quán taverna (giàn hoa giấy, bàn ghế xanh trắng) → Phố sơn mới → Bến phà → Tháp chuông (vòm treo chuông, mái vòm xanh nhỏ) → Khách sạn bể bơi
    → Quán hoàng hôn (dù vàng) → Cảng cũ → Cối xay gió (tháp tròn trắng, mái nón, cánh buồm) → Hải đăng → NHÀ THỜ BA MÁI VÒM XANH (kỳ quan cuối chương, khối lớn sát vách).
  • Vật trang trí: lừa (chỉ trong ô phố — N9), chậu hoa giấy, thuyền buồm, phà trên biển.
  • Tránh: trắng chói làm mất đường và ghim; mái vòm xanh rải khắp nơi; nhà thờ có thật nhận diện được (vẽ "lấy cảm hứng").

# DỮ LIỆU BẠN CÓ (thư mục design_game/)
- 00_tong_quan/tai_lieu/Chu_De_Khung_Canh.md — ĐỌC KỸ mục 1 (nguyên tắc N1–N9, mục 1.1 cách vẽ 5 loại đường, mục 1.2 thước đo duyệt)
  và mục 3.1 (Chương 1), 3.2 (Chương 2), 3.3 (Chương 3), 3.4 (Chương 4) + 8.2 (độ đọc ban đêm, nền trắng): bảng màu, kiến trúc nhìn từ trên, cảnh quan, vật trang trí, kỳ quan cuối chương.
- 00_tong_quan/tai_lieu/Thiet_Ke_Chuong_1.md … Thiet_Ke_Chuong_4.md — thiết kế màn và tiến triển công trình (Chương 3, 4: mục 2 bản đồ, mục 4 khung cảnh từng màn).
- 00_tong_quan/quy_uoc_chung.json — loại đường, xe, khoảng cách nút.
- 00_tong_quan/ma_nguon_demo/index.html — mã vẽ hiện tại (drawVillage = Chương 1, drawUrban = Chương 2, drawNight = Chương 3, drawSanto = Chương 4) nếu bạn làm bằng code.
- chuong_N/00_tong_quan_chuong/ — bản đồ chương lúc bắt đầu, lúc hoàn thành, bưu thiếp toàn cảnh.
- chuong_N/man_XX/ (mỗi màn):
  • 1_man_chuan_bi.png — toàn cảnh + ghim + nhiệm vụ (đây là màn hình người chơi xem để lên kế hoạch)
  • 2_dang_choi.png — góc nhìn khi lái (camera gần ~1:1)
  • 3_ban_do_lon_khi_choi.png — bản đồ lớn lúc chơi
  • 4_ban_do_co_ghim.svg/.png — BẢN VẼ GỐC đúng tọa độ game (có ghim, nhãn)
  • 5_khung_canh_khong_ghim.png — cùng bản vẽ, không ghim (nền để bạn vẽ lại)
  • du_lieu_man.json — LOGIC MÀN (nguồn sự thật, ưu tiên hơn ảnh nếu có khác biệt)

# HỆ TỌA ĐỘ (dùng để căn chỉnh chính xác)
- Bản đồ CHƠI: Chương 1 = 1950×1250 px (lưới 6 cột × 4 hàng nút); Chương 2 = 2300×1250 px (7 × 4); Chương 3, 4 = 2650×1250 px (8 × 4). Gốc (0,0) ở góc trên trái.
- ẢNH KHUNG CẢNH phải LỚN HƠN bản đồ chơi: thêm lề trái 600, phải 600, trên 250, dưới 250 → viewBox "-600 -250 (rộng+1200) 1750":
  Ch.1 = 3150×1750, Ch.2 = 3500×1750, Ch.3, 4 = 3850×1750 (raster nét ×2: 6300×3500, 7000×3500, 7700×3500). Không thu nhỏ, không dịch toạ độ.
  Chi tiết và cách vẽ lề từng chương: YEU_CAU_KHO_ANH.md.
- Nút "c{i}r{j}" nằm tại x = 100 + 350·i, y = 100 + 350·j (có sẵn trong "nodes").
- "edges": mỗi đoạn đường nối 2 nút kề nhau; "type" = loại đường; "open" = true (đã thông, xe đi được) / false (chưa thông xe).
- "points": mỗi kho / điểm giao có "stop_xy" (chỗ xe dừng trên đường), "building" {x,y,w,h} = ô công trình của điểm đó
  (nhà/kho/công trình phải nằm trong ô này), "pin_xy" = vị trí ghim, "pin_color" = màu ghim.
- "open_region_max_col_row" [cMax, rMax]: vùng đã thông xe gồm các nút có i ≤ cMax và j ≤ rMax; ngoài vùng là đất chưa phát triển.
- "construction_site": công trình đang xây ở màn này (vẽ là công trường: cần cẩu, giàn giáo, vật liệu).
  "buildings_already_built": công trình đã hoàn thành từ các màn trước (phải xuất hiện, đúng chỗ, đã hoàn thiện).

# LUẬT BẮT BUỘC GIỮ (vi phạm = sai)
L1. Mạng đường: không thêm, bớt, dời, uốn đoạn nào. Tâm đường đi qua đúng tọa độ nút. Giao lộ giữ nguyên.
L2. Loại đường nhận ra ngay, nhất quán mọi màn (N1, mục 1.1):
    - thuong (đường thường): rộng 46 px, vạch giữa trắng đứt.
    - lon (đường lớn — Ch.1 là đường đê ven sông, Ch.2 là đại lộ): rộng 64 px, vạch vàng đôi, biển vuông xanh (biểu tượng đường cao tốc) đặt cạnh đường.
    - dong (đường đông — có từ Chương 3): xe đứng kín hai làn (Ch.3: taxi vàng; Ch.4: xe buýt nhỏ, ATV, xe máy ở phố chợ), biển tam giác 2 xe; màu nhận diện cam trên mini map.
    - gogh / hem (gồ ghề / hẻm) chưa có ở Chương 1–4 nhưng phong cách mới phải có chỗ cho chúng (mục 1.1).
    Bạn được đổi chất liệu (màu nhựa, vỉa hè, hàng cây hai bên) nhưng KHÔNG đổi độ rộng, vạch, biển.
L3. Đoạn "open": false = "chưa thông xe": phải nhìn khác hẳn đường đã thông (hiện tại: đường đất nâu + rào chắn sọc đỏ trắng ở đầu đoạn tiếp giáp vùng mở). Người chơi phải thấy ngay "không đi được".
L4. Kho và điểm giao: công trình đặt đúng trong "building" rect, mặt tiền quay ra đoạn đường "on_road"; ghim giữ nguyên ký hiệu (▲ ô vuông = kho, ▼ hình tròn = điểm giao), màu "pin_color", vị trí "pin_xy". Mỗi kho ở Chương 2 có hình dạng riêng (bãi vật liệu: cát đá; kho tổng: nhà kho mái tôn; xưởng gỗ: đống gỗ); Chương 3 cũng vậy (bến cảng: container + cẩu bờ; kho ga hàng: nhà kho + đường ray; trung tâm phân phối: mái lớn + cửa xuất hàng); Chương 4 (kho cảng: thùng hàng + cáp tời; kho sơn: xô vôi, sơn xanh, ngói; xưởng rượu vang: thùng gỗ tròn).
L5. Tiến triển theo màn: màn sau "đầy đủ" hơn màn trước — công trình đã xây ở đúng chỗ, công trình đang xây là công trường, vùng thông xe mở rộng đúng "open_region". Màn thưởng = bản đồ hoàn thiện nhất.
L6. Không vật gì trên mặt đường có thể bị hiểu là chướng ngại (N9): trâu, xe đỗ, người, cây… chỉ ở vỉa hè hoặc trong ô phố.
L7. Đọc được (N5): đường và ghim luôn nổi nhất; khung cảnh lùi về sau. Kiểm tra "nheo mắt": vẫn thấy rõ mạng đường và ghim.
    Nhãn chữ (tên điểm, nhiệm vụ) do game vẽ đè lên — chừa chỗ sáng/đơn giản quanh ghim để chữ dễ đọc.
L8. Màu theo N4 (60% nền – 30% kiến trúc tối đa 3 màu – 10% nhấn tối đa 2 màu) và bảng màu từng chương trong Chu_De_Khung_Canh.md.
L9. Đúng góc nhìn từ trên xuống (N2): đặc trưng ở mái, mặt bằng, bóng đổ — không vẽ phối cảnh nghiêng.
L10. Nội dung hư cấu: không dùng thương hiệu, logo, chữ viết thật, công trình có thật nhận diện được.
L11. Cùng một chương = cùng một ngôi làng/khu phố lớn dần: bố cục nền (sông, ruộng, cụm nhà cố định) giống nhau giữa các màn; chỉ phần phát triển thay đổi.

# ĐƯỢC TỰ DO THAY ĐỔI
Mặt đất, ruộng, vườn, cây, lũy tre, sông, ao, hồ; kiểu nhà, mái, sân; vật trang trí; chất liệu đường (giữ L2); vỉa hè; bóng đổ; ánh sáng; chi tiết công trình (giữ L4); hiệu ứng nhẹ ở viền bản đồ.

# CÁCH LÀM (theo thứ tự, báo cáo sau mỗi bước)
B1. Phân tích hiện trạng: mỗi chương chấm điểm 1–10 theo 6 tiêu chí ở mục 1.2 (nhìn mờ, nhận diện, màu, tương phản, máy thật, đầu/cuối chương);
    liệt kê vấn đề cụ thể kèm tên tệp ảnh (ví dụ "chuong_2/man_05 — kho tổng lẫn vào nhà dân").
B2. Đề xuất hướng hình ảnh cho từng chương: 2–3 phương án (moodboard bằng lời + bảng màu hex + 1 ảnh mẫu một khu 700×350 px), nêu phương án đề xuất.
    DỪNG lại chờ tôi chọn trước khi làm tiếp.
B3. Bộ tài nguyên dùng chung của chương: nhà (3–5 kiểu), cây, mặt đất, mặt nước, từng công trình (đã xây + công trường), 5 loại đường, vật trang trí — vẽ trên một tấm tổng hợp.
B4. Vẽ lại từng màn theo đúng du_lieu_man.json, ĐÚNG KHỔ ẢNH CÓ LỀ (viewBox -600 -250 3150/3500/3850 1750 — xem HỆ TOẠ ĐỘ và YEU_CAU_KHO_ANH.md;
    bản đồ chơi giữ đúng toạ độ, vẽ thêm cảnh nối tiếp ở lề), 2 bản: không ghim và có ghim (ghim + nhãn như ảnh 4_*).
B5. Tự kiểm tra từng màn bằng bảng (xem mục KẾT QUẢ) và chồng ảnh mới lên 4_ban_do_co_ghim.png để đối chiếu đường/ghim.

# KẾT QUẢ CẦN TRẢ (giữ cấu trúc thư mục)
design_game_moi/
├── 00_phan_tich.md            ← B1, B2 (điểm số, vấn đề, phương án, lựa chọn)
├── chuong_N/bo_tai_nguyen.png ← B3
└── chuong_N/man_XX/
    ├── khung_canh_moi.svg      ← BẮT BUỘC, không ghim, khổ CÓ LỀ (vd Ch.3, 4: viewBox="-600 -250 3850 1750" width="3850" height="1750") — game xuất ảnh từ tệp này
    ├── khung_canh_moi_co_ghim.svg ← cùng khổ, có ghim + nhãn để duyệt
    ├── khung_canh_moi.png      ← xem trước, render từ SVG nét ×2 (Ch.3, 4: 7700×3500)
    ├── khung_canh_moi_co_ghim.png
    ├── (nếu làm bằng code) đoạn mã thay drawVillage/drawUrban/drawNight/drawSanto
    └── kiem_tra.md             ← bảng tự kiểm:
        | Hạng mục | Theo du_lieu_man.json | Ảnh mới | Đạt? |
        - Số đoạn đường đã thông / chưa thông, đoạn đường lớn
        - Từng điểm (id): đúng ô building, mặt tiền ra on_road, ghim đúng ký hiệu và màu
        - Công trình đang xây / đã xây đúng danh sách
        - Không có vật trên mặt đường
        - Điểm theo 6 tiêu chí mục 1.2

# LƯU Ý
- Nếu ảnh và JSON lệch nhau, theo JSON và ghi lại chỗ lệch.
- Nếu thấy một luật cản trở việc làm đẹp, đừng tự phá luật: ghi vào 00_phan_tich.md mục "Đề xuất đổi luật" kèm lý do để tôi quyết định.
- Trả lời bằng tiếng Việt.
````

---

## Gợi ý chọn AI

| Loại AI | Cách giao | Lưu ý |
|---|---|---|
| AI tạo ảnh (vẽ bằng hình) | Dùng `5_khung_canh_khong_ghim.png` làm ảnh tham chiếu bố cục; yêu cầu giữ đúng vị trí đường | Ảnh tạo ra thường lệch vài pixel — cần bước B5 chồng ảnh kiểm tra; khó giữ đúng 100% |
| AI viết code (Claude, …) | Đưa `ma_nguon_demo/index.html` + JSON; yêu cầu viết lại hàm vẽ cảnh | **Giữ logic chắc chắn nhất** vì vẽ từ cùng dữ liệu; đổi được cho mọi màn cùng lúc |
| Họa sĩ người | Đưa SVG `4_ban_do_co_ghim.svg` mở bằng Figma/Illustrator | Vẽ đè lên lớp đường gốc, mở rộng artboard theo khổ có lề (YEU_CAU_KHO_ANH.md) rồi lưu SVG |
