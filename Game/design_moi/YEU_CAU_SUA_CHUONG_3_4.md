# Yêu cầu sửa khung cảnh Chương 3 và Chương 4 (sau rà soát 20/10/2026)

Dán toàn bộ phần trong khung dưới đây cho AI hoặc người đang vẽ khung cảnh. Gửi kèm `design_game/00_tong_quan/` và `design_game/chuong_3/`, `chuong_4/` như lần trước.

---

````text
# BỐI CẢNH
Bạn đã giao 22 màn khung cảnh (Chương 3 "Thành phố Không Ngủ" và Chương 4 "Đảo Mây Trắng", mỗi chương man_01 → man_10 và man_thuong).
BA đã rà soát bằng script (đọc SVG, so với du_lieu_man.json, so điểm ảnh giữa các màn) và xem ảnh trực tiếp.

# PHẦN ĐÃ ĐẠT — GIỮ NGUYÊN, KHÔNG SỬA
- Thẻ <svg>: viewBox="-600 -250 3850 1750" width="3850" height="1750" ở cả 22 tệp. PNG 7700×3500.
- Mạng đường: 52/52 đoạn ở mọi màn đúng toạ độ nút, đúng loại, đúng độ rộng (thường và đông 46 px, lớn 64 px). Không có đường thừa.
- Đoạn chưa thông: màu khác hẳn đường đã thông; đoạn nào cũng có rào chắn.
- Kho và điểm giao nằm trong ô "building"; công trình đang xây và đã xây đúng danh sách từng màn.
- Không có chữ ở lề. Lề giống nhau giữa man_01 → man_10 (trừ cầu treo, bến phà, cảng cũ theo tiến độ — đúng yêu cầu).
- du_lieu_man.json không bị đổi.
Khi sửa: KHÔNG dịch toạ độ, KHÔNG đổi đường, KHÔNG đổi viewBox.

# LỖI PHẢI SỬA

## S1. Ảnh xem trước hỏng — Chương 3 man_01
chuong_3/man_01/khung_canh_moi.png trắng trơn (toàn bộ điểm ảnh màu trắng). SVG vẫn đúng.
→ Xuất lại PNG từ SVG ở nét ×2 (7700×3500). Sau khi xuất, mở từng PNG kiểm tra không có tệp trắng hoặc tệp nhỏ bất thường.

## S2. Đường đông sai luật L2 — cả hai chương, mọi màn có đường đông
Hiện trạng:
- Lòng đường đông để trống. Xe đỗ ở vỉa hè, ngoài lòng đường (Ch.3: 2 taxi mỗi đoạn; Ch.4: 1 xe mỗi đoạn).
- Biển báo là hình thoi màu cam, không phải biển tam giác 2 xe.
- Ch.4: phố chợ thiếu mái hiên sọc hai bên vỉa hè.
Vì vậy người chơi không nhận ra đâu là đường đông (đi chậm).

Luật (Chu_De_Khung_Canh.md mục 1.1, cố định ở mọi chương): đường đông = XE ĐỨNG KÍN HAI LÀN + BIỂN TAM GIÁC 2 XE.
Xe của đường đông là dấu hiệu nhận diện loại đường, KHÔNG phải chướng ngại. Luật L6/N9 không áp dụng cho xe này.
L6 vẫn áp dụng cho mọi vật khác (taxi đỗ, xe hot dog, lừa, cây…) và cho mọi loại đường khác.

Cách vẽ (giống hàm drawNight trong ma_nguon_demo/index.html):
- Xe nằm TRONG lòng đường 46 px: mỗi làn một hàng, tâm xe lệch khoảng ±11 px so với tim đường.
  Xe nối đuôi nhau, cách 34–48 px. Xe quay theo chiều làn: hai làn ngược chiều nhau.
  Chừa khoảng 40 px ở mỗi đầu đoạn, sát nút giao, để giao lộ thoáng.
- Biển tam giác 2 xe: mỗi dải đường đông liền nhau đặt 1 biển, cạnh đường (ngoài lòng đường), cỡ như biển vuông xanh của đường lớn.
- Ch.3: khoảng 80% là taxi vàng #f7c517, còn lại xe đỏ, trắng, xám. Neon hồng #ff4fa3 và xanh dọc hai bên vỉa hè (giữ như hiện có).
- Ch.4 (phố chợ): xe buýt nhỏ, ATV, xe máy xen nhau. Thêm mái hiên sọc trắng – hồng (1–2 màu) dọc hai bên vỉa hè.
- Áp dụng cho mọi đoạn có "type": "dong" và "open": true trong du_lieu_man.json của từng màn.
  Ch.3 có đường đông thông từ màn 3; Ch.4 có từ màn 1.
  Đoạn đường đông chưa thông thì vẽ như các đoạn chưa thông khác (không có xe).

## S3. Chương 4 — lề phía Đông và phía Nam sai, có hình hỏng (cả 11 màn)
Hiện trạng:
- Mép Đông (khoảng x 2850 → 3250, toàn chiều cao): một dải màu be trống, một dải xám sát mép,
  và một hình tam giác xanh bị cắt ở góc dưới phải (khoảng x 2850 → 3250, y 1320 → 1500). Trông như hình vẽ lỗi.
  Thiếu vườn nho, ô liu, bờ đá và biển như YEU_CAU_KHO_ANH.md yêu cầu.
- Phía Nam (y 1270 → 1500): bãi cát đen kéo tới tận mép ảnh, KHÔNG có biển, nên phà ở Bến phà đang đậu trên cát.
  Dải tối có vạch trắng chạy dài và hàng đèn đều nhau, trông như một con đường đi được.
  Luật lề cấm vẽ đường giống đường chơi được.
Yêu cầu:
- Phía Nam: dải cát đen hẹp (khoảng 60–100 px) dọc mép bản đồ, rồi BIỂN #1b8fc4 ra tới mép ảnh.
  Cầu tàu và phà trắng nằm trên mặt nước. Bỏ vạch trắng chạy dài và hàng đèn đều.
  Có thể thêm bọt sóng nhạt dọc bờ cát.
- Phía Đông: vườn nho cuộn tròn sát đất, ô liu xám bạc, rồi bờ đá và biển ra tới mép ảnh.
  Mép ngoài cùng là mảng nước đơn giản. Xoá dải xám và tam giác bị cắt.
- Lề phải giống hệt nhau ở 11 màn; chỉ bến phà và cảng cũ thay đổi theo tiến độ, như hiện tại.
- Xem lại hai đường mảnh chạy ngang ở lề trên (khoảng y −120 và y −40): nếu trông giống lối đi thì bỏ.

## S4. Màn thưởng có lề khác màn 10 — cả hai chương
man_thuong vẽ thêm pháo hoa ở lề (Ch.3 và Ch.4, mỗi chương 8 vùng trở lên: trên, dưới, trái, phải),
nên lề màn thưởng khác màn 10. Cảnh quay chuyển màn sẽ bị nháy.
→ Bỏ pháo hoa khỏi cả khung_canh_moi.svg và khung_canh_moi_co_ghim.svg của man_thuong.
Hiệu ứng mừng (pháo hoa, đèn) sẽ do game vẽ động. Phần trong bản đồ của màn thưởng giữ như hiện tại.

## S5. Không thấy tiến triển ở vùng chưa mở (L5) — cả hai chương
Hiện trạng: giữa hai màn liên tiếp, ảnh chỉ khác ở ô công trình. Ngoài vùng mở ("open_region_max_col_row"), nhà cửa giống hệt màn thưởng; chỉ có mặt đường là tối hơn.
Theo câu chuyện từng chương:
- Ch.3 "thắp sáng thành phố": màn đầu khu phía Đông còn TỐI và nhiều lô "sắp xây"; màn cuối cả thành phố lên đèn.
  Khối nhà ngoài vùng mở: cửa sổ tắt hoặc rất ít đèn, không neon, có vài lô trống có rào tôn hoặc giàn giáo.
  Khi vùng mở rộng thì khu đó lên đèn.
- Ch.4 "chuẩn bị mùa du lịch": nhà ngoài vùng mở còn BẠC MÀU (vôi xám ngả vàng, cửa sơn bong, không hoa).
  Nhà trong vùng mở đã quét vôi trắng. Quanh công trình đã xong: cửa xanh, hoa giấy, bể bơi trên mái.
Vùng mở theo màn (cột tối đa; hàng luôn tới 3):
- Ch.3: màn 1–2 → cột 4; màn 3–4 → cột 5; màn 5–6 → cột 6; màn 7 → 10 và màn thưởng → cột 7.
- Ch.4: màn 1–2 → cột 5; màn 3–6 → cột 6; màn 7 → 10 và màn thưởng → cột 7.
Cột i nằm quanh x = 100 + 350·i. Ô phố nằm giữa cột cuối của vùng mở và cột kế tiếp là ranh giới, chọn cách chuyển cho tự nhiên.
Vẫn giữ luật lề giống hệt nhau (S4): phần thay đổi chỉ nằm trong bản đồ chơi.

## S6. Hình ảnh chưa đạt mục tiêu 9,5/10 (TC1, TC5, L8, L11)
Chương 3:
- Khối phố lặp lại kiểu "đóng dấu": khoảng 6 mẫu ô lặp khắp bản đồ.
- Nhiều nhà thường có biểu tượng H (sân trực thăng) và chữ thập đỏ (bệnh viện). Các biểu tượng này giống ghim hoặc điểm giao, làm rối mắt (L7).
- Chưa ra New York: thiếu dãy brownstone 4–5 tầng, tòa chọc trời lùi tầng, tháp nước gỗ trên mái, ống hơi bốc khói.
→ Giảm lặp: mỗi hàng phố phải có nhịp khác nhau. Bỏ biểu tượng H và chữ thập trên nhà thường.
   Dùng kiến trúc mô tả trong PROMPT_cho_AI.md (Chương 3). Mái tối, viền sáng ánh trăng.
Chương 4:
- Phần lớn nhà là hộp trắng giống nhau, có chấm tròn và chữ nhật xanh coban.
  Coban đang xuất hiện trên hầu hết nhà thường, trái luật "XANH COBAN #1f5fae CHỈ ở công trình".
- Thiếu chất Santorini: mái vòm thùng, sân thượng, bậc thang và lối lát trắng trong ô phố, hoa giấy, nhà hang trên vách.
→ Bỏ coban khỏi nhà thường (cửa nhà thường dùng gỗ, xám xanh nhạt hoặc đất nung).
   Đa dạng khối nhà; thêm sân thượng, mái vòm thùng, hoa giấy theo S5.
Cả hai chương: kỳ quan cuối chương (Ch.3 Tượng cầm đuốc; Ch.4 Nhà thờ ba mái vòm xanh) còn nhỏ, chưa nổi bật.
→ Lấp đầy ô công trình. Ch.3: đặt tượng trên đảo nhỏ có mặt nước bao quanh, trong ô công trình, theo Thiet_Ke_Chuong_3.md.

## S7. Chữ trên nhà không phải điểm giao, và tên gần thương hiệu thật — Chương 3
- Có nhiều nhãn "BAKERY", "SKY BAR", "LIBRARY", "CINEMA"… trên nhà thường không phải điểm giao, lặp lại nhiều chỗ.
  Người chơi sẽ tưởng đó là nơi giao hàng.
  → Bỏ chữ trên mọi nhà không phải kho, điểm giao hay công trình. Nếu cần gợi công năng thì dùng hình (mái hiên, biểu tượng nhỏ, không phải ghim).
- "DAILY NEWS" trùng tên một tờ báo có thật; "TIMES" gợi thương hiệu thật (L10).
  → Đổi sang chữ hư cấu hoặc bỏ.

## S8. Rào chắn đoạn chưa thông (nhỏ)
Hiện rào đặt ở GIỮA mỗi đoạn và chỉ dài 36 px, nên không chắn hết bề ngang đường 46 hoặc 64 px.
→ Đặt rào ở ĐẦU đoạn phía tiếp giáp vùng mở, cách nút khoảng 40 px, chắn hết bề ngang đường.
   Ví dụ: dài 44 px cho đường 46 px, dài 60 px cho đường 64 px.
   Đoạn có cả hai đầu nằm ngoài vùng mở thì không cần rào (giống game hiện tại).

## S9. Bảng tự kiểm (kiem_tra.md)
Một số dòng trong kiem_tra.md không khớp với ảnh. Ví dụ: ghi "rào chắn tại điểm giao cắt" trong khi rào nằm giữa đoạn; ghi đạt luật đường đông trong khi lòng đường trống.
→ Viết lại kiem_tra.md theo đúng bảng trong PROMPT_cho_AI.md. Mỗi dòng ghi số đo thật (số đoạn, số xe, toạ độ), không tự chấm điểm cảm tính.

# KIỂM TRA TRƯỚC KHI GIAO
- [ ] 22 PNG mở được, không tệp nào trắng, đúng 7700×3500 (S1).
- [ ] Mọi đoạn đường đông đã thông có xe kín hai làn TRONG lòng đường và có biển tam giác 2 xe. Ch.4 có mái hiên sọc (S2).
- [ ] Ch.4: phía Nam có biển ra tới mép ảnh, phà nằm trên nước. Phía Đông có vườn nho, bờ đá, biển. Không còn dải xám hay tam giác bị cắt (S3).
- [ ] Lề của man_01 → man_10 và man_thuong giống hệt nhau, trừ cầu treo, bến phà, cảng cũ theo tiến độ. Không có pháo hoa (S4).
- [ ] So man_01 với man_thuong: khu ngoài vùng mở khác rõ (Ch.3 tối, Ch.4 bạc màu) và đổi dần theo vùng mở (S5).
- [ ] Ch.3 không còn biểu tượng H, chữ thập hay chữ trên nhà thường. Ch.4 coban chỉ ở công trình (S6, S7).
- [ ] Rào chắn ở đầu đoạn giáp vùng mở, chắn hết bề ngang (S8).
- [ ] Không đổi: viewBox, toạ độ, mạng đường, ô công trình, du_lieu_man.json (mục "PHẦN ĐÃ ĐẠT").
- [ ] khung_canh_moi.svg không có ghim và nhãn. khung_canh_moi_co_ghim.svg cùng khổ, có ghim để duyệt.
````

---

## Sau khi nhận

BA chép đè các tệp vào `Game/design_moi/chuong_3/` và `chuong_4/`, rồi nhờ Claude chạy lại rà soát: kiểm khổ ảnh, đối chiếu đường với `du_lieu_man.json`, so lề giữa các màn, kiểm đường đông và xem ảnh.
