# Chủ đề khung cảnh theo chương — 10 đề xuất

| Thông tin | Nội dung |
|---|---|
| Phiên bản | 0.3 — BA đã chốt CĐ-Q1 → Q6 (mục 7); mockup vòng 1 cho 3 chủ đề (mục 8) |
| Ngày | 14/10/2026 |
| Trạng thái | **Ý tưởng, chưa phải yêu cầu** (YT-02 trong [Y_Tuong_Mo_Rong.md](Y_Tuong_Mo_Rong.md)). BA đã chọn 5 chủ đề, chưa đưa vào yêu cầu MVP |
| Căn cứ | Phản hồi BA: mỗi chương một vùng/chủ đề riêng (vd New York ban đêm, Brazil với kỳ quan, sa mạc…); bài học từ mockup ô phố v1 → v3 ([mockups/khung_pho_v3.html](mockups/khung_pho_v3.html)) |

---

## 1. Nguyên tắc chung cho mọi chủ đề

Rút ra từ 3 vòng mockup ô phố: cảnh đẹp khi **ít màu, có quy hoạch, chi tiết làm nền**; rối khi mọi thứ nổi ngang nhau.

| # | Nguyên tắc | Lý do |
|---|---|---|
| N1 | **Giữ cố định "ngôn ngữ chơi" ở mọi chương:** độ rộng đường theo loại, biển báo loại đường, ghim nhiệm vụ (▲ vuông / ● tròn), màu loại đường trên mini map. Chủ đề chỉ đổi **vật liệu bề mặt**, không đổi hình dáng nhận diện. | Người chơi học luật đường ở chương đầu; đổi ký hiệu ở chương sau là bắt học lại. Game không giải thích khi rẽ không được (D-15), nên biển báo phải nhất quán (BD-04). |
| N2 | **Nhìn từ trên xuống, đặc trưng nằm ở mái và mặt bằng**, không nằm ở mặt tiền. Chọn chi tiết "đọc được từ trên cao": hình mái, vật trên mái, màu mặt đất, loại cây, mặt nước, bóng đổ. | Mặt tiền đẹp (cửa sổ, ban công) gần như không thấy ở góc nhìn này. |
| N3 | **Biểu tượng chọn theo hình nhìn từ trên.** Ưu tiên công trình có mặt bằng đặc trưng (kim tự tháp, vườn đối xứng Taj Mahal, tượng hình chữ thập, dãy cổng torii) hơn công trình chỉ đặc trưng nhờ chiều cao. | Nhìn thẳng từ trên, tháp cao chỉ còn một chấm; mặt bằng đặc trưng thì nhận ra ngay. |
| N4 | **Tỉ lệ màu 60–30–10:** nền mặt đất ~60%, kiến trúc ~30% (**tối đa 3 màu**), điểm nhấn ~10% (**tối đa 2 màu**, chỉ ở khu đặc trưng hoặc công trình chính). | Bài học v2 → v3: nhiều màu là nguyên nhân chính gây rối mắt. |
| N5 | **Ghim nhiệm vụ và đường luôn nổi nhất.** Mỗi chủ đề phải qua kiểm tra tương phản; nền quá sáng (tuyết, cát, nhà trắng) hoặc quá tối (đêm) thì chỉnh viền ghim, màu vỉa hè, độ đậm mặt đường. | Đây là thông tin chơi; cảnh chỉ là nền. |
| N6 | **Quy hoạch trước, vẽ sau:** mỗi bản đồ chia khu (trung tâm, dân cư, ven đô, khu đặc trưng), mặt tiền quay ra đường, cảnh hai bên một loại đường giống nhau. | Bài học v1 → v2: ghép từng ô riêng lẻ thì nhìn rời rạc. |
| N7 | **Kỳ quan đặt ở rìa bản đồ hoặc chiếm trọn một ô phố**, không nằm trên đường, không đổi mạng đường. Có thể làm **phần thưởng cuối chương** (lộ dần như công trình ở Chương 2). | Giữ thiết kế màn độc lập với cảnh (nguyên tắc 1 của Chương 2). |
| N8 | **Ban đêm là biến thể ánh sáng, dùng tiết chế** (1–2 chương). Mini map và bản đồ lớn vẫn dùng bảng màu dễ đọc. | Ban đêm giảm tương phản, là chủ đề khó làm đẹp và dễ đọc nhất. |
| N9 | **Vật trang trí không được trông giống chướng ngại.** Bò, lạc đà, người tuyết… chỉ đứng trên vỉa hè hoặc trong ô phố, không đứng trên mặt đường. | MVP không có chướng ngại (D-04); người chơi không được hiểu nhầm. |

### 1.1. Cách thể hiện 5 loại đường trong một chủ đề

Mỗi chủ đề phải mô tả đủ 5 loại đường, giữ **độ rộng, vạch kẻ, biển báo** như hiện tại; chỉ đổi chất liệu và cảnh hai bên:

| Loại đường | Phần cố định ở mọi chương | Phần đổi theo chủ đề |
|---|---|---|
| Thường | Độ rộng 46, vạch giữa đứt | Màu nhựa, cảnh hai bên |
| Lớn | Rộng 64, vạch vàng đôi, biển xanh vuông | Hàng cây, nhà cao hai bên |
| Đông | Xe đứng kín hai làn, biển tam giác 2 xe | **Loại xe trên đường** (taxi vàng, tuk-tuk, xe đạp…), cửa hàng hai bên |
| Gồ ghề | Mặt nâu, ổ gà, biển tam giác mấp mô | **Chất liệu** (đá cuội, cát, tuyết lún, đường đất) |
| Hẻm | Hẹp 24, biển tròn cấm ô tô | Kiểu ngõ (ngõ phố cổ, bậc thang, lối xe đạp…) |

### 1.2. Thước đo khi duyệt một chủ đề

> Mục tiêu (BA, 14/10/2026): **càng đẹp càng tốt** — không dừng ở 8 điểm, hướng tới 9,5–10.

| Kiểm tra | Đạt khi |
|---|---|
| Nhìn mờ (nheo mắt / thu nhỏ ảnh) | Vẫn thấy rõ mạng đường và ghim; cảnh lùi về sau |
| Nhận diện | Người chưa biết, xem toàn cảnh 3 giây, đoán đúng vùng/chủ đề |
| Màu | Kiến trúc ≤ 3 màu, nhấn ≤ 2 màu (N4) |
| Tương phản | Ghim và chữ nổi trên nền ở mọi khu (chữ ≥ 12px theo UI-14) |
| Máy thật | Xem trên khung 844×390, cả lúc lái xe và toàn cảnh |
| Đầu chương / cuối chương | Cả hai đều đẹp, cuối chương phải "đầy đủ" rõ rệt hơn đầu chương |

---

## 2. Tổng quan 10 chủ đề

Chọn để **khác nhau rõ** về châu lục, khí hậu, thời điểm trong ngày, tông màu và mật độ, để hai chương liền nhau không bị giống nhau.

| # | Chủ đề | Thời điểm | Tông màu | Biểu tượng chính (nhìn từ trên) | Loại đường nổi bật | Gắn cơ chế (gợi ý) | Khó đọc bản đồ | Chi phí hình |
|---|---|---|---|---|---|---|---|---|
| 1 | **Phố cổ Hà Nội** | Sáng | Ấm: vàng, ngói đỏ | Hồ Gươm + Tháp Rùa + cầu Thê Húc | Hẻm, đông | Xe máy vào hẻm | Thấp | Thấp |
| 2 | **New York về đêm** | Đêm | Tối, đèn vàng, neon | Tháp nước trên mái, Central Park, tượng Nữ thần Tự do | Lớn, đông | **Taxi chở khách** | **Cao** | Cao |
| 3 | **Rio de Janeiro** | Chiều nắng | Rực: biển xanh, nhà nhiều màu | Tượng Chúa Cứu Thế hình chữ thập, vỉa hè sóng Copacabana | Hẻm dốc, gồ ghề | Xe máy lên đồi | Trung bình | Trung bình – cao |
| 4 | **Ai Cập – sa mạc sông Nile** | Hoàng hôn | Vàng cát, nâu đất, lam ngọc | Kim tự tháp + Nhân sư | **Gồ ghề (đường cát)** | Chọn xe trên cát | Trung bình | Trung bình |
| 5 | **Paris** | Xuân | Dịu: kem, xám xanh | Khối nhà Haussmann sân trong, tháp Eiffel | Lớn (đại lộ), **gồ ghề (đá cuội)** | Cầu qua sông Seine | Thấp | Trung bình |
| 6 | **Amsterdam – kênh đào** | Ngày dịu | Gạch nâu, nước xanh xám | Vành đai kênh, cầu kéo, cối xay gió | Cầu, hẻm xe đạp | **Cầu đóng/mở theo giờ** | Trung bình | Trung bình – cao |
| 7 | **Kyoto mùa hoa anh đào** | Xuân | Xám, gỗ, hồng anh đào | Dãy cổng torii đỏ, chùa Vàng bên hồ | Hẻm đá | Xe máy vào hẻm | Trung bình | Trung bình |
| 8 | **Santorini (Hy Lạp)** | Hoàng hôn | Trắng, xanh coban | Mái vòm xanh, vách núi lửa ra biển | **Hẻm bậc thang** | Xe máy | Trung bình | Thấp – trung bình |
| 9 | **Làng tuyết Bắc Âu (Lapland)** | Chạng vạng | Trắng tuyết, gỗ đỏ, đèn vàng | Lều băng, rừng thông tuyết | Gồ ghề (tuyết lún) | Chương sự kiện mùa đông | **Cao** | Trung bình |
| 10 | **Ấn Độ – Jaipur & Agra** | Nắng ấm | Hồng đất, trắng ngà | Taj Mahal + vườn chia 4, giếng bậc thang | Đông (chợ), hẻm | Đường đông | Trung bình – cao | Trung bình – cao |

**Dự phòng** (nếu muốn đổi): Dubai (sa mạc hiện đại, đảo hình cây cọ), London (xe buýt đỏ, sông Thames), Bangkok (chợ nổi, chùa vàng), thảo nguyên Kenya, Thượng Hải về đêm, thành phố tương lai.

---

## 3. Chi tiết từng chủ đề

Mã màu là **giá trị gợi ý**; sẽ chỉnh khi làm mockup.

### 3.1. Phố cổ Hà Nội

| Hạng mục | Nội dung |
|---|---|
| Cảm giác | Nhộn nhịp, ấm áp, hoài cổ. Nắng sáng vàng nhạt, bóng đổ mềm. |
| Bảng màu | Nền: cỏ xanh vừa + sân gạch `#b9634a`. Kiến trúc: tường vàng Hà Nội `#e8c872`, ngói đỏ nâu cũ `#a0583a`, mái bằng xám be `#d6cfc0`. Cây `#4f8f3a`. Nhấn: đỏ cờ/đèn lồng `#d6332e`, mặt hồ xanh ngọc `#6aa68a`. |
| Kiến trúc (từ trên) | **Nhà ống** rất hẹp và sâu (tỉ lệ khoảng 1:5), liền kề không khe hở; mái ngói âm dương xen **sân thượng mái bằng có bồn nước inox tròn**; giếng trời nhỏ (ô tối giữa mái). Khu phố Tây: biệt thự Pháp tường vàng mái ngói đỏ, có vườn. |
| Cảnh quan | **Hàng cây sấu, cây bàng tán tròn lớn** phủ dọc phố; Hồ Gươm làm khoảng thở giữa bản đồ; sông Hồng ở rìa. Không vẽ dây điện (rối mắt). |
| 5 loại đường | Thường: phố nhỏ có cây. Lớn: đại lộ hàng cây (Tràng Tiền, Điện Biên Phủ). Đông: **phố hàng** (Hàng Đào, Hàng Ngang), xe máy kín. Gồ ghề: ngõ đang lát lại. Hẻm: **ngõ nhỏ chỉ xe máy** (rất thật). |
| Vật trang trí | Xe máy đỗ vỉa hè, gánh hàng rong đội nón lá (từ trên là chấm tròn sáng), ghế nhựa thấp quán trà đá, ô dù quán cà phê. |
| Biểu tượng | **Hồ Gươm + Tháp Rùa + cầu Thê Húc đỏ cong** (mặt bằng rất đặc trưng); Nhà hát Lớn; chợ Đồng Xuân; cầu Long Biên ở rìa. |
| Gắn cơ chế | Hẻm + xe máy là chủ đề tự nhiên nhất; đường đông = phố hàng. |
| Rủi ro & xử lý | Phố hàng dễ rối → ô dù/mái hiên **1–2 màu**, chỉ ở đường đông. |
| Chi phí | **Thấp** — gần với bộ hình hiện tại (v3 đã có mái ngói, hàng cây). Phù hợp Chương 1 hoặc chương "quê nhà". |

### 3.2. New York về đêm

| Hạng mục | Nội dung |
|---|---|
| Cảm giác | Hiện đại, sôi động, lấp lánh. Khoảng 21 giờ: đèn đường vàng cam, cửa sổ sáng, neon ở khu trung tâm. |
| Bảng màu | Nền: nhựa đêm `#23262d`, vỉa hè xám xanh `#3a4250`. Kiến trúc: mái xám than `#4b5058`, nâu brownstone `#5b4a42`, cửa sổ sáng vàng ấm `#ffd479`. Nhấn: **taxi vàng** `#f7c517`, neon hồng `#ff4fa3` / xanh `#33d1ff` (chỉ ở khu Times Square). |
| Kiến trúc (từ trên) | Tòa chọc trời mái bằng **lùi tầng kiểu bậc thang**, bóng đổ dài; mái có **tháp nước bằng gỗ hình trụ** (biểu tượng mái nhà NY); khu dân cư là dãy brownstone 4–5 tầng, mép thấy cầu thang thoát hiểm. Ô phố dài kiểu Manhattan (có thể gợi bằng ngõ giữa ô). |
| Cảnh quan | Ít cây, cây trồng trong hố vuông dọc vỉa hè; **Central Park** là khối xanh chữ nhật lớn có hồ; sông ở rìa với cầu treo trụ đá; **ống hơi nước sọc cam trắng** bốc khói trên đường. |
| 5 loại đường | Thường: phố có đèn đường. Lớn: Avenue nhiều làn, vạch qua đường sọc trắng. Đông: **Times Square**, màn hình LED, taxi vàng kẹt cứng. Gồ ghề: đường đang sửa, rào cam, tấm thép phủ. Hẻm: ngõ sau có thùng rác, thang thoát hiểm. |
| Vật trang trí | Taxi vàng đỗ, xe bán hot dog, vòi cứu hỏa đỏ, biển tên phố xanh lá ở góc, vòng sáng đèn đường trên mặt đường. |
| Biểu tượng | Tượng Nữ thần Tự do (trên đảo ngoài khơi, rìa bản đồ); tòa tháp chóp nhọn kiểu Art Deco; cầu treo trụ đá; Times Square. |
| Gắn cơ chế | **Taxi chở khách** → rất khớp Chương 3 "Trung tâm: chở khách, đổi xe" đang ghi "Sắp có". |
| Rủi ro & xử lý | Ban đêm giảm tương phản → mặt đường sáng hơn nền một bậc, vạch kẻ sáng, **ghim và biển báo có quầng sáng**; neon chỉ ở một khu; mini map và bản đồ lớn giữ bảng màu ngày (N8). Một số tòa nhà nổi tiếng có đăng ký nhãn hiệu hình ảnh → vẽ "lấy cảm hứng" (mục 4). |
| Chi phí | **Cao** — cần bộ ánh sáng đêm (đèn, cửa sổ, quầng sáng). |

### 3.3. Rio de Janeiro

| Hạng mục | Nội dung |
|---|---|
| Cảm giác | Nhiệt đới, lễ hội, núi gặp biển. Nắng chiều rực. |
| Bảng màu | Nền: cỏ nhiệt đới đậm, cát `#f2dca4`, biển xanh ngọc `#2bb3c0`. Kiến trúc: trắng kem `#f4efe4` (khu ven biển), ngói đỏ `#b8563a`; **favela giới hạn 3 màu**: vàng `#f2c94c`, xanh lá `#6fcf97`, hồng san hô `#f28b82`. Nhấn: vàng – xanh lá cờ Brazil. |
| Kiến trúc (từ trên) | **Favela trên sườn đồi**: khối hộp gạch nhỏ chồng xếp, mái bằng có **bồn nước nhựa xanh dương** (rất đặc trưng); khu Copacabana: tòa căn hộ trắng mái bằng có bể bơi; khu Santa Teresa: nhà thuộc địa mái ngói. |
| Cảnh quan | **Vỉa hè sóng đen trắng Copacabana** dọc bờ biển (họa tiết rõ từ trên cao); cọ cao (tán hình sao); bãi biển có dù; đồi rừng nhiệt đới ở rìa. |
| 5 loại đường | Thường: phố ngói đỏ. Lớn: đại lộ ven biển có vỉa hè sóng. Đông: phố trung tâm. Gồ ghề: đường đất lên đồi. Hẻm: **ngõ dốc favela** (xe ôm "mototáxi"). |
| Vật trang trí | Dù bãi biển, xe bán nước dừa, cáp treo, cầu thang gạch men nhiều màu (một điểm). |
| Biểu tượng | **Tượng Chúa Cứu Thế** trên đỉnh núi (từ trên thấy **hình chữ thập** rất rõ, đặt ở rìa); núi Sugarloaf + cáp treo; sân vận động hình tròn. |
| Gắn cơ chế | Hẻm dốc + xe máy; đường gồ ghề lên đồi. |
| Rủi ro & xử lý | Nhiều màu → **favela chỉ ở một khu đồi**, phần còn lại trắng kem. Địa hình đồi chỉ là trang trí rìa (đường chơi vẫn phẳng). Có thông tin tượng Chúa Cứu Thế bị đòi quyền hình ảnh → cần kiểm tra (mục 4). |
| Chi phí | **Trung bình – cao** (biển, đồi, vỉa hè hoa văn). |

### 3.4. Ai Cập – sa mạc sông Nile

| Hạng mục | Nội dung |
|---|---|
| Cảm giác | Nóng khô, cổ kính, huyền bí. Ánh hoàng hôn cam, bóng đổ dài. |
| Bảng màu | Nền: **cát** `#e6c88f` thay cỏ. Kiến trúc: gạch bùn/đất nung `#c9955c`, đá vôi kem `#efe2c4`. Cây cọ và dải ruộng ven sông `#3f8f4a`, sông Nile `#2f8f83`. Nhấn: lam ngọc mái vòm `#2a9d8f`, vàng kim. |
| Kiến trúc (từ trên) | Nhà **mái bằng khối hộp màu đất**, nhiều nhà xây dở còn **cột thép nhô trên mái**, chảo vệ tinh; **mái vòm + tháp minaret** (vòm tròn + tháp tròn nhỏ); nhà có sân trong. |
| Cảnh quan | Không có cỏ; **cọ chà là theo cụm**; **sông Nile có dải ruộng xanh hai bên** (tương phản mạnh với sa mạc); thuyền buồm trắng; cồn cát ở rìa. |
| 5 loại đường | Thường: phố đất nện. Lớn: đại lộ ven sông Nile. Đông: chợ Khan el-Khalili có **mái vải che**. Gồ ghề: **đường cát** (cát phủ mặt đường). Hẻm: ngõ chợ. |
| Vật trang trí | Lạc đà (đứng ngoài đường), xe lừa, tuk-tuk, thảm phơi trên mái, chum gốm. |
| Biểu tượng | **Kim tự tháp Giza + tượng Nhân sư** ở rìa sa mạc (từ trên: hình vuông chia 4 tam giác — cực rõ); đền cổ hàng cột. |
| Gắn cơ chế | Đường gồ ghề là nhân vật chính; chọn xe (xe tải chậm trên cát). |
| Rủi ro & xử lý | Mọi thứ cùng tông vàng nâu → **mặt đường nhựa tối rõ, vỉa hè đá sáng**, nhà sáng hoặc tối hơn nền một bậc, dùng xanh (cây, sông) để tách. Ghim cam/vàng có thể lẫn với nền cát → kiểm tra, có thể thêm viền tối. |
| Chi phí | **Trung bình.** |

### 3.5. Paris

| Hạng mục | Nội dung |
|---|---|
| Cảm giác | Lãng mạn, thanh lịch, cổ điển. Mùa xuân, nắng dịu. |
| Bảng màu | Nền: cỏ xanh dịu, sỏi vườn `#d9cfb8`. Kiến trúc: **đá vôi kem** `#e9dfc8`, **mái kẽm xám xanh** `#7d8b99`, ống khói đất nung `#c67b5c`. Cây dẻ ngựa `#6aa84f`. Nhấn: mái hiên café đỏ đô `#9b2335`, vàng đồng (mái vòm mạ vàng). |
| Kiến trúc (từ trên) | **Khối nhà Haussmann chiếm trọn ô, có sân trong** (khớp đúng cấu trúc ô phố v3); mái Mansard kẽm với **hàng ống khói đất nung nhỏ đều nhau**; **góc nhà vát chéo** ở giao lộ — dấu hiệu Paris rất rõ từ trên. |
| Cảnh quan | Đại lộ hai hàng cây thẳng tắp; vườn kiểu Pháp đối xứng (lối sỏi, cây xén hình học); sông Seine với cầu đá và thuyền. |
| 5 loại đường | Thường: phố đá kem. Lớn: đại lộ hai hàng cây (kiểu Champs-Élysées). Đông: phố café. Gồ ghề: **đường đá cuội** (rất hợp nghĩa "xe rung, chậm"). Hẻm: passage lát đá. |
| Vật trang trí | Bàn café tròn, ki-ốt báo xanh, cột quảng cáo tròn, cửa metro kiểu Art Nouveau, xe đạp. |
| Biểu tượng | **Tháp Eiffel** (từ trên: hình vuông 4 chân hội tụ — rõ), Khải Hoàn Môn, nhà thờ Đức Bà. Đèn chiếu sáng ban đêm của tháp Eiffel được cho là có bản quyền → chỉ dùng cảnh ngày (mục 4). |
| Gắn cơ chế | Gồ ghề = đá cuội; cầu qua sông. |
| Rủi ro & xử lý | Thấp — bảng màu dịu, dễ đẹp. Quảng trường hình sao (Étoile) không hợp lưới ô vuông → chỉ làm trang trí trong ô. |
| Chi phí | **Trung bình.** |

### 3.6. Amsterdam – kênh đào

| Hạng mục | Nội dung |
|---|---|
| Cảm giác | Thanh bình, xe đạp, sông nước. Trời Bắc Âu sáng dịu. |
| Bảng màu | Nền: cỏ xanh, **nước kênh xanh xám** `#5f8fa3`. Kiến trúc: gạch nâu đỏ `#8a4a3a`, gạch nâu đậm `#4d3a33`, viền trắng. Nhấn: **tulip đỏ/vàng** (chỉ ở cánh đồng ngoại ô), cam Hà Lan. |
| Kiến trúc (từ trên) | **Nhà kênh hẹp, mái dốc nhọn** (đầu hồi bậc thang, hình chuông) xếp sát nhau dọc kênh, mái vuông góc với kênh; móc cẩu trên đỉnh mái; nhà thuyền đậu dọc kênh. |
| Cảnh quan | **Vành đai kênh** đi song song với một số tuyến đường (kênh không thay đường, chỉ chạy giữa các ô); hàng cây ven kênh; **cối xay gió + đồng tulip sọc màu** ở ngoại ô. |
| 5 loại đường | Thường: đường ven kênh lát gạch. Lớn: đại lộ có tàu điện. Đông: phố mua sắm. Gồ ghề: đường gạch lát cũ. Hẻm: **lối xe đạp/ngõ hẹp**. Giao cắt với kênh là **cầu vòm nhỏ**. |
| Vật trang trí | Bãi xe đạp dày đặc, thuyền, tàu điện, chậu hoa. |
| Biểu tượng | Cối xay gió, **cầu kéo gỗ trắng**, nhà ga trung tâm, bảo tàng gạch đỏ. |
| Gắn cơ chế | **Cầu đóng/mở theo giờ (K5)** — cầu kéo nâng cho thuyền qua → rất khớp Chương 4 "Cảng: cầu đóng/mở theo giờ" đang ghi "Sắp có". |
| Rủi ro & xử lý | Kênh không được trông giống đường: nước xanh có gợn, bờ kè đá, không có vạch. |
| Chi phí | **Trung bình – cao** (nước, cầu, cầu kéo động). |

### 3.7. Kyoto mùa hoa anh đào

| Hạng mục | Nội dung |
|---|---|
| Cảm giác | Tĩnh lặng, tinh tế, truyền thống. Mùa xuân, trời trong. |
| Bảng màu | Nền: rêu xanh `#7aa35a`, **sỏi trắng** `#e7e3d8`. Kiến trúc: mái ngói kawara xám có ánh xanh `#5d6470`, gỗ nâu `#7a5134`, tường trắng. Nhấn: **hồng anh đào** `#f7b6c8`, đỏ son cổng torii `#d1382c`. |
| Kiến trúc (từ trên) | Nhà gỗ machiya mặt tiền hẹp, mái ngói xám; **đền chùa mái cong rộng** với sân sỏi; **tháp 5 tầng** (từ trên: các ô vuông lồng nhau). |
| Cảnh quan | **Cây anh đào tán hồng thay cây xanh** (đổi màu cây là đổi cả không khí); vườn thiền sỏi cào gợn sóng; ao cá koi; rừng trúc (dải sọc xanh). |
| 5 loại đường | Thường: phố gỗ. Lớn: đại lộ ven sông Kamo. Đông: phố mua sắm có mái che. Gồ ghề: đường núi. Hẻm: **ngõ đá Gion**. |
| Vật trang trí | Đèn lồng đá, xe kéo, máy bán hàng tự động, xe đạp. |
| Biểu tượng | **Dãy cổng torii đỏ nối nhau** (Fushimi Inari — từ trên là chuỗi vạch đỏ song song, cực đặc trưng); **chùa Vàng bên hồ**; tháp Yasaka. |
| Gắn cơ chế | Hẻm + xe máy; đường núi gồ ghề. |
| Rủi ro & xử lý | Mái xám dễ trùng màu đường → mái ánh xanh hoặc đường sáng hơn. Cánh hoa rơi chỉ là hiệu ứng nhẹ, thưa. |
| Chi phí | **Trung bình.** |

### 3.8. Santorini (Hy Lạp)

| Hạng mục | Nội dung |
|---|---|
| Cảm giác | Trong trẻo, nghỉ dưỡng, biển xanh. Nắng trắng, hoàng hôn cam hồng. |
| Bảng màu | Nền: đá núi lửa nâu xám, **biển Aegean** `#1b8fc4`. Kiến trúc: **trắng vôi** `#f7f7f2`, **xanh coban** `#1f5fae` (mái vòm, cửa). Nhấn: hoa giấy hồng tím `#c2187f`, vàng cam (một số nhà ở Oia). |
| Kiến trúc (từ trên) | Khối hộp trắng mái bằng hoặc **mái vòm thùng** (chữ nhật có bóng cong); **mái vòm xanh nhà thờ**; nhà xếp tầng trên vách đá; bể bơi xanh trên sân thượng. |
| Cảnh quan | **Vách núi lửa đổ ra biển** ở rìa bản đồ; cối xay gió trắng; vườn nho **cuộn thành vòng tròn** sát đất (họa tiết đẹp từ trên cao); cây ô liu xám bạc; ít cây. |
| 5 loại đường | Thường: phố lát đá xám. Lớn: đường ven vách. Đông: phố chợ trung tâm. Gồ ghề: đường đá núi lửa. Hẻm: **lối bậc thang** (chỉ xe máy, lừa). |
| Vật trang trí | Lừa, bàn ghế xanh trắng, chậu hoa giấy, thuyền buồm. |
| Biểu tượng | **Nhà thờ 3 mái vòm xanh**, cối xay gió, núi lửa giữa vịnh. |
| Gắn cơ chế | Hẻm mạnh nhất trong 10 chủ đề. |
| Rủi ro & xử lý | Trắng chói: vỉa hè trắng lẫn với nhà trắng → **mặt đường đá tối**, nhà có bóng đổ rõ, ghim viền tối. Bù lại bảng màu đơn giản nhất nên **dễ đạt mức đẹp**. |
| Chi phí | **Thấp – trung bình.** |

### 3.9. Làng tuyết Bắc Âu (Lapland)

| Hạng mục | Nội dung |
|---|---|
| Cảm giác | Ấm áp giữa giá lạnh, cổ tích, lễ hội cuối năm. Chạng vạng xanh tím, đèn vàng ấm. |
| Bảng màu | Nền: **tuyết trắng xanh** `#eef4fa`, bóng tuyết `#c5d6e8`. Kiến trúc: **gỗ đỏ** `#8e2c22`, gỗ vàng đất `#c99a3e`. Rừng thông `#2f5141`. Nhấn: đèn vàng ấm `#ffcf6b`, cực quang xanh lục – tím (chỉ ở rìa hoặc màn kết quả). |
| Kiến trúc (từ trên) | Nhà gỗ sơn đỏ, **mái dốc phủ tuyết** (mái trắng, mép gỗ lộ), ống khói bốc khói; **lều băng** (vòng tròn); lều kính ngắm cực quang (vòm kính). |
| Cảnh quan | Rừng thông phủ tuyết (tam giác tối điểm trắng); hồ đóng băng; đường mòn xe trượt. |
| 5 loại đường | Thường: **đường đã cào tuyết, hai bên là bờ tuyết** (thay vỉa hè). Lớn: đường chính có cột đèn. Đông: phố chợ Giáng sinh. Gồ ghề: **tuyết lún**. Hẻm: đường xe trượt tuyết. |
| Vật trang trí | Tuần lộc, xe trượt, người tuyết, đèn dây, cây thông trang trí. |
| Biểu tượng | Làng Ông già Noel trên vòng Bắc Cực, nhà thờ gỗ, lều băng. |
| Gắn cơ chế | Hợp làm **chương sự kiện theo mùa** (cuối năm). |
| Rủi ro & xử lý | Nền trắng: vỉa hè trắng biến mất, viền trắng của ghim mất → đường tối, bờ tuyết có bóng xanh, **ghim viền tối**. Chạng vạng gặp vấn đề tương phản giống ban đêm (N8). |
| Chi phí | **Trung bình.** |

### 3.10. Ấn Độ – Jaipur & Agra

| Hạng mục | Nội dung |
|---|---|
| Cảm giác | Rực rỡ, cung điện, lễ hội. Nắng ấm vàng. |
| Bảng màu | Nền: cỏ khô, sân đá đỏ `#b5653e`. Kiến trúc: **hồng đất "Pink City"** `#d98b74`, **trắng ngà cẩm thạch** `#f4efe6`. Vườn `#5f9e4b`. Nhấn: cam vạn thọ `#f39c12`, xanh ngọc `#16a085`. |
| Kiến trúc (từ trên) | Nhà mái bằng có sân thượng, **đình nhỏ mái vòm (chhatri) ở góc mái**; tường thành hồng có răng cưa; nhà có sân trong (haveli). |
| Cảnh quan | **Vườn đối xứng chia 4 có kênh nước** (charbagh); **giếng bậc thang** (từ trên: hình vuông bậc lồng nhau — rất đẹp); cây đa tán rộng; hồ nước. |
| 5 loại đường | Thường: phố hồng. Lớn: đại lộ. Đông: **chợ Johari Bazaar**, mái che nhiều màu. Gồ ghề: đường đất làng. Hẻm: ngõ chợ. |
| Vật trang trí | Xe tuk-tuk xanh vàng, xe bò, **bò nằm trên vỉa hè** (không lên đường — N9), sạp hoa vạn thọ, voi (ở cung điện). |
| Biểu tượng | **Taj Mahal + vườn chia 4 + hồ phản chiếu** (mặt bằng cực đặc trưng); cung điện Hawa Mahal; đài thiên văn Jantar Mantar; giếng bậc thang. |
| Gắn cơ chế | Đường đông (chợ) + hẻm. |
| Rủi ro & xử lý | Rất nhiều màu → nền chỉ 2 tông hồng + trắng ngà; **màu rực chỉ ở khu chợ**. |
| Chi phí | **Trung bình – cao.** |

---

## 4. Rủi ro pháp lý khi dùng kỳ quan, công trình nổi tiếng

> Không phải tư vấn pháp lý — cần bộ phận pháp lý kiểm tra trước khi làm hình chính thức.

| Tình huống | Ví dụ (cần kiểm tra lại) | Cách giảm rủi ro |
|---|---|---|
| Công trình có đăng ký nhãn hiệu hình ảnh | Một số tòa nhà ở New York (vd Empire State Building) | Vẽ "lấy cảm hứng": giữ tinh thần, đổi chi tiết, không dùng tên thật |
| Chủ sở hữu đòi quyền hình ảnh | Có thông tin Tổng giáo phận Rio đòi cấp phép khi dùng hình tượng Chúa Cứu Thế cho mục đích thương mại | Tượng cách điệu chung chung, hoặc xin phép |
| Ánh sáng/thiết kế còn bản quyền | Hệ thống đèn đêm tháp Eiffel; công trình hiện đại ở Pháp (vd kim tự tháp kính Louvre); Pháp chỉ cho phép tự do chụp, vẽ công trình nơi công cộng với mục đích phi thương mại | Chỉ dùng cảnh ngày; tránh công trình hiện đại còn bản quyền |
| Công trình cổ | Kim tự tháp, Taj Mahal, Tháp Rùa, chùa Kyoto | Thường an toàn hơn, vẫn nên kiểm tra quy định từng nước |

**Đề xuất:** đặt **tên chương hư cấu, gợi vùng** (vd "Thành phố không ngủ", "Thành phố biển và núi") và dùng **kỳ quan cách điệu**. Vừa giảm rủi ro, vừa tự do thiết kế hơn.

---

## 5. Gợi ý thứ tự chương

| Chương | Chủ đề | Lý do |
|---|---|---|
| 1 | Phố cổ Hà Nội | Gần gũi, chi phí thấp, hợp màn làm quen; có hẻm cho màn chọn xe |
| 2 | Khu đô thị mới (giữ như hiện tại, phong cách Việt Nam ven đô) | Đang thử cơ chế xây dựng dần |
| 3 | New York về đêm | Taxi chở khách — khớp "Trung tâm: chở khách, đổi xe" |
| 4 | Amsterdam | Cầu kéo — khớp "Cảng: cầu đóng/mở theo giờ" |
| 5 | Paris | Đổi không khí sau 2 chương khó; đá cuội |
| 6 | Ai Cập | Đường cát, nóng, tương phản với Paris |
| 7 | Kyoto | Mùa xuân, hẻm |
| 8 | Rio | Nhiều màu, đồi dốc |
| 9 | Santorini | Bảng màu trắng xanh, hẻm bậc thang |
| 10 | Jaipur & Agra | Rực rỡ, Taj Mahal làm kỳ quan lớn |
| Sự kiện | Làng tuyết Bắc Âu | Theo mùa cuối năm |

Thứ tự đảm bảo **hai chương liền nhau khác nhau** về tông màu (ấm/lạnh), thời điểm (ngày/đêm) và mật độ (đông/thưa).

---

## 6. Ảnh hưởng tới cách làm

| Hạng mục | Nội dung |
|---|---|
| Dữ liệu | Mỗi chương có một **cấu hình chủ đề**: bảng màu, bộ khối nhà (mái, kích thước), bộ vật trang trí, chất liệu 5 loại đường, kỳ quan, ánh sáng. Bộ sinh cảnh trong [mockups/khung_pho_v3.html](mockups/khung_pho_v3.html) đã tách quy hoạch khu / kiểu mặt tiền / bảng màu, có thể mở rộng thành cấu hình theo chủ đề. |
| Hình 3D low-poly | Mỗi chủ đề ước lượng: 8–12 mẫu nhà (dùng chung khối, đổi mái/vật liệu), 10–15 vật trang trí, 1–2 kỳ quan, 1 bộ mặt đất + 5 chất liệu đường, 1 thiết lập ánh sáng. |
| Không đổi | Mạng đường, ký hiệu, biển báo, ghim, giao diện điều khiển, mini map (N1). |

---

## 7. Quyết định đã chốt (14/10/2026)

| ID | Quyết định |
|---|---|
| CĐ-Q1 | Dùng 5 chủ đề: **Phố cổ Hà Nội, New York về đêm, Ai Cập, Jaipur & Agra, Santorini**. Paris, Amsterdam, Kyoto, Rio, Làng tuyết để dự phòng |
| CĐ-Q2 | Dùng **tên chương hư cấu** (gợi vùng) |
| CĐ-Q3 | Gắn cơ chế khi khớp tự nhiên với các chương "Sắp có"; **không tạo cơ chế mới chỉ vì cảnh** |
| CĐ-Q4 | Có chương ban đêm (New York), nhưng **làm mockup kiểm tra độ đọc trước** |
| CĐ-Q5 | Kỳ quan **lộ dần** qua các màn của chương |
| CĐ-Q6 | Mockup trước: **New York về đêm, Ai Cập, Santorini** |

### 7.1. Hệ quả cần lưu ý

| # | Nội dung | Tình trạng |
|---|---|---|
| H1 | Amsterdam không được chọn → cơ chế **cầu đóng/mở theo giờ** (chương "Cảng" đang ghi "Sắp có") chưa có chủ đề khớp tự nhiên. Có thể gắn với cầu qua sông ở chủ đề Ai Cập, hoặc giữ chương Cảng riêng | Chờ BA |
| H2 | Thứ tự chương mục 5 cần sắp lại theo 5 chủ đề đã chọn | Chờ BA |

---

## 8. Mockup vòng 1 — New York về đêm, Ai Cập, Santorini

| Thông tin | Nội dung |
|---|---|
| File | [mockups/chu_de_canh.html](mockups/chu_de_canh.html) — chọn chủ đề, chọn tiến độ chương (màn 1 → hoàn thành) |
| Ảnh | [newyork_dau](mockups/chu_de_newyork_dau.jpg) · [newyork_cuoi](mockups/chu_de_newyork_cuoi.jpg) · [aicap_dau](mockups/chu_de_aicap_dau.jpg) · [aicap_cuoi](mockups/chu_de_aicap_cuoi.jpg) · [santorini_dau](mockups/chu_de_santorini_dau.jpg) · [santorini_cuoi](mockups/chu_de_santorini_cuoi.jpg) |
| Cách dựng | Nhìn từ trên, camera **nghiêng nhẹ** như ảnh tham chiếu (thấy mái + mặt tiền hướng nam, bóng đổ mềm). Khung lái xe đúng tỉ lệ demo 844×390, có giao diện điều khiển |
| Tên chương (đề xuất, chờ BA duyệt) | **Thành phố Không Ngủ** (New York về đêm) · **Ốc đảo Sông Vàng** (Ai Cập) · **Đảo Mây Trắng** (Santorini) |

### 8.1. Kỳ quan lộ dần (CĐ-Q5) — mỗi màn thắng lộ thêm một phần

| Chủ đề | Màn 1 → 5 |
|---|---|
| New York về đêm | Tượng nữ thần cầm đuốc → cầu treo lên đèn → tháp Art Deco (đang có cần cẩu) → biển LED quảng trường → sân băng công viên |
| Ai Cập | Câu chuyện **khai quật**: gò cát có rào → tượng Nhân sư → kim tự tháp nhỏ → giữa → lớn → đền cổ & cột tháp đá |
| Santorini | Nhà thờ ba mái vòm xanh (đang giàn giáo) → dãy cối xay gió → tháp chuông → cảng cũ dưới vách → hải đăng |

### 8.2. Kiểm tra độ đọc (CĐ-Q4 và nền sáng)

| Chủ đề | Kết quả | Cách đã xử lý |
|---|---|---|
| New York về đêm | **Đọc tốt.** Mạng đường là phần sáng nhất bản đồ; ghim có quầng sáng; biển báo rõ | Quầng đèn đường **chỉ rơi trên mặt đường**; mái nhà tối, viền sáng ánh trăng; neon chỉ ở phố đường đông |
| Ai Cập (nền cát) | Đọc tốt; ghim cam gần màu cát | Mặt đường nhựa tối, vỉa hè đá sáng; **ghim thêm viền tối**; đường gồ ghề thành đường cát |
| Santorini (nền trắng) | Đọc tốt; vỉa hè dễ lẫn với tường trắng | Mặt đường đá núi lửa sẫm, vỉa hè xám nhạt; bóng đổ xanh lam; ghim viền tối; hẻm vẽ thành bậc thang |

### 8.3. Tự đánh giá vòng 1 (Claude)

| Chủ đề | Điểm | Còn thiếu để lên 9,5+ |
|---|---|---|
| New York về đêm | ~8 | Chiều sâu ánh sáng thật (bloom, phản chiếu), mái nhà còn hơi đều |
| Ai Cập | ~8 | Lòng ô phố cổ còn hơi dày; thiếu hiệu ứng nắng chiều trên mặt nước |
| Santorini | ~7,5 | Thị trấn nằm trên mặt bằng phẳng nên chưa có cảm giác "bám vách"; nhà trắng còn đơn điệu |

> Giới hạn: đây là mockup 2D (SVG) để chốt **bố cục, bảng màu, kỳ quan và quy tắc độ đọc**. Mức 9,5–10 cần đồ họa 3D low-poly thật với ánh sáng, vật liệu và chuyển động (nước, khói, đèn nhấp nháy) trong engine.
