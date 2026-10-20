# Little Routes mobile — quy tắc làm việc

- Mục tiêu: TypeScript strict + PixiJS/WebGL + DOM/CSS + Capacitor; một core
  chung cho web/Android/iOS. Phạm vi hiện tại: ưu tiên giao diện Chương 1–2;
  tạm hoãn Chương 3–4 theo yêu cầu chủ dự án, giữ nguyên toàn bộ nguồn của chúng.
  Demo là chuẩn hình ảnh và hành vi: tái sử dụng art, bố cục, xe, icon, chuyển cảnh;
  không tự thiết kế lại hoặc dùng hình tạm để đánh dấu hoàn thành. C1L1 mới chuyển
  cảnh/HUD P1a; chủ dự án đã duyệt mẫu C1L1, chưa hoàn tất UI hai chương.
  P1b đã build/chạy APK debug và pass kiểm Android Emulator; chờ nghiệm thu trước mở rộng.
  P0 đã được chủ dự án
  duyệt; inventory/baseline ưu tiên ở [roadmap](../KE_HOACH_TRIEN_KHAI_MOBILE.md)
  mục 13 và `tests/reference/demo-v1.5`; chủ dự án cho làm giao diện Chương 1–2,
  bắt đầu bằng P1 C1L1 rồi áp dụng sang Chương 2. Không đòi hoàn thiện gameplay
  22 màn hoặc thương mại trong task giao diện; báo rõ phần nào còn chưa chuyển.
  Phạm vi/tiến độ mới nhất mục 14–15; kế hoạch mục 12, kiến trúc mục 3–6,
  bằng chứng kỹ thuật cũ mục 11 (không thay test native cho UI mới).
  Không tự refresh baseline để làm test pass. Mỗi phần cần ảnh đối chiếu cùng
  viewport/trạng thái và kiểm hành vi; thay đổi khác demo phải được ghi và duyệt.
  Chỉ đọc nguồn liên quan đến task, không đọc lại mọi tài liệu cho mỗi thay đổi nhỏ.
- Trước sửa: kiểm repository root, Git status/diff và phạm vi. Không sửa `../demo`,
  `../versions`, art hoặc tài liệu gốc ngoài quyền đã duyệt; không reset/discard,
  stage hoặc commit thay đổi người dùng/dự án khác cùng repository `E:\work1`.
- Core chỉ nhận dữ liệu đã validate, commands và fixed ticks; không import DOM,
  PixiJS, Capacitor, system clock, storage hoặc network. Renderer đọc snapshot/event;
  application điều phối và gọi services qua adapter. Chỉ một scheduler gameplay.
- Code: TypeScript strict, typed boundaries, tránh `any`, module nhỏ và tên rõ nghĩa.
  Giữ luật/cân bằng khi refactor. Lint/format theo cấu hình local; không reformat
  ngoài task. Không hardcode đường dẫn công cụ riêng của máy trong source app.
- Content có schema/content version và stable IDs. Không dùng array index hoặc
  tên dịch làm save ID; không sửa trực tiếp output sinh tự động. Màn mới cần
  validation, semantic checks, plan thắng và kiểm art/road alignment. Migration có fixture.
- Chỉ chạy scripts thực sự có trong package.json. Unit/integration/schema test
  kiểm logic/data; web E2E kiểm UI; native/device checks kiểm plugin/lifecycle/FPS.
  Không dùng `passWithNoTests`, suite rỗng hoặc browser pass thay native pass.
- Trước bàn giao: đọc diff theo file, kiểm lockfile/file sinh/permissions/secrets,
  chạy kiểm tra phù hợp và cập nhật roadmap. Không thêm test chỉ để chép implementation.
- Xin xác nhận khi đổi scope/luật/kiến trúc, thay dữ liệu gốc, chọn provider/chi phí,
  mở rộng quyền, giao dịch thật, upload hoặc public release. Quyền đã duyệt trong
  phiên vẫn có hiệu lực: chủ dự án đã cho cài công cụ thiếu và tạo file này ngày 20/10/2026.
  Không hỏi lại thao tác nhỏ thuộc phạm vi đã duyệt; không tự nâng major sau khi khóa version.
- Khi test bắt buộc fail hoặc có quyết định ngoài scope, dừng task phụ thuộc;
  có thể tiếp tục phần độc lập được duyệt và ghi rõ blocker.
- Chỉ complete khi đạt acceptance, diff đã review, kiểm tra bắt buộc pass và có
  bằng chứng. Phân biệt đã test, chưa đủ test, mock, chưa làm, blocked và chưa kiểm
  thiết bị thật. Không đánh dấu toàn mốc chỉ vì một task con hoàn tất.
- Không log/commit token, signing keys hoặc dữ liệu người chơi; không gửi source/save
  ra dịch vụ ngoài nếu chưa được phép. Quyền tối thiểu, không nới sandbox/firewall.
  Xác minh nguồn/phiên bản package; không tự `audit fix --force` hoặc bỏ qua cảnh báo.
- Save có version/transaction/recovery; xóa đúng namespace. Paid flags của demo
  không thành quyền mua thật. Nội dung remote là dữ liệu và phải validate.
  Native save đi qua Preferences adapter, ghi tuần tự và chờ acknowledgement;
  không coi WebView localStorage hoặc trạng thái trong RAM là bằng chứng đã lưu bền vững.
- Subagents chỉ dùng khi được yêu cầu; chia file/task và review kết quả. Không cài
  skill/plugin, tạo automation hay cấp quyền rộng chỉ để thử khả năng.
