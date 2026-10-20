# Little Routes mobile

Vertical slice C1L1 “Ngày đầu đi giao”: bản đồ/xe PixiJS, luật TypeScript thuần,
input cảm ứng/bàn phím, HUD và dialogs DOM/CSS. Chỉ chuyển một màn, chưa phải toàn game.
Kiến trúc, nguồn đối chiếu, kết quả và known issues: [roadmap, mục 11](../KE_HOACH_TRIEN_KHAI_MOBILE.md).

Chạy từ thư mục này bằng Node 24/npm 11:

```powershell
npm ci --ignore-scripts
npm run dev
npm run lint
npm run format:check
npm run typecheck
npm run test:tools
npm run test:unit
npm run test:integration
npm run validate:levels
npm run test:e2e
npm run test:built
npm run build
npm run audit:dependencies
```

- `test:tools` kiểm hợp đồng thư viện; `test:unit` kiểm core và schema thật;
  `test:integration` kiểm simulation/session/save/fixed clock.
- `test:e2e` cần Chromium của Playwright; lần cài đầu dùng CLI local
  `node_modules\.bin\playwright.cmd install chromium`.
- Ảnh và báo cáo test ở `test-results/`, không commit.
- Browser E2E lái xe bằng buttons/bàn phím tới thắng, kiểm restart/save, timer,
  pause/rotation, thêm giờ và thua. Clock của browser được điều khiển qua Playwright;
  core vẫn chạy đủ fixed ticks, không có test hook gán thắng hoặc bơm hàng.
- `test:built` build rồi mở Vite preview 4173, kiểm assets dist/render/input và
  chạy khi đã chặn network sau tải. Đây là smoke bản đóng gói web, chưa phải test
  cold start offline của APK hoặc PWA. Không cần tự bật server cho script này.
- Có Capacitor config và Android project cho ID debug đã duyệt `dev.littleroutes.slice`,
  tên Little Routes Dev, version 0.1.0/code 1. Không dùng ID/signing debug để phát hành.
- Audit hiện còn cảnh báo mức moderate trong chuỗi tooling iOS
  `@capacitor/cli → xcode → uuid`; xem đánh giá ở roadmap. Không tự audit fix/force.
- Gitleaks, JDK và Android SDK là công cụ máy, không phải npm dependencies.
- Cài thêm dependency bằng exact version, review lockfile và lifecycle scripts.
  Bộ hiện tại được cài bằng `--ignore-scripts`; không bật lifecycle scripts hàng loạt.

Các công cụ máy đã cài: Android Studio 2026.2.1.8, Temurin JDK 21,
SDK API 36, emulator, Gitleaks và GitHub CLI. SDK ở `E:\Android\Sdk`,
AVD `LittleRoutes_API36` ở `E:\Android\Avd`; Studio dùng JBR riêng của IDE.
Mở terminal mới để nhận user PATH/JAVA_HOME/ANDROID_HOME vừa cấu hình:

```powershell
java -version
adb version
emulator -list-avds
emulator -avd LittleRoutes_API36
gitleaks dir . --redact --no-banner --config .gitleaks.toml
gh --version
```

### Xem game khi phát triển

Trong PowerShell tại `E:\work1\Game\mobile-app`, chạy `npm run dev`.
Vite bind **http://127.0.0.1:5173/**, strict port: nếu cổng bận sẽ báo lỗi,
không tự chuyển sang URL khác. Mở URL trên bằng Chrome/Edge; sửa source có HMR.
Log nằm ngay terminal đang chạy. **Ctrl+C** tại terminal đó để dừng.
E2E tự tạo/tắt server riêng, nên dừng server thủ công trước `npm run test:e2e`.

Trong phiên triển khai này Codex đã mở một server nền tại URL trên. Log của server
nền nằm ở `.cache/dev-server.out.log` và `.cache/dev-server.err.log`; PID nằm ở
`.cache/dev-server.pid`. Xem log bằng `Get-Content .cache/dev-server.out.log -Wait`.
Để dừng đúng process Vite của workspace này trong PowerShell:

```powershell
$littleRoutesServerId = [int](Get-Content .cache/dev-server.pid)
$littleRoutesServer = Get-CimInstance Win32_Process -Filter "ProcessId=$littleRoutesServerId"
if ($littleRoutesServer.CommandLine -like '*E:\work1\Game\mobile-app\node_modules\vite\bin\vite.js*') {
  Stop-Process -Id $littleRoutesServerId
}
```

Sau đó dùng `npm run dev` ở terminal để xem log trực tiếp và dừng bằng Ctrl+C.
Trên Mac, chạy foreground và dừng Ctrl+C; không dùng lệnh PowerShell dừng process ở trên.

Điều khiển: bấm → để xuất phát; mũi tên/WASD chọn hướng ở giao lộ kế tiếp,
bấm lại để hủy; U hoặc ↶ quay đầu; Esc/nút Ⅱ pause. Xe tự dừng tại kho hỏi hàng,
tự giao khi có đúng hàng và tự chạy tiếp sau service. Có thể hẹn quay đầu ở bảng kho.
Không có nút Stop/Go. Portrait yêu cầu xoay ngang và tiếp tục rõ ràng.

Lộ trình nghiệm thu: → xuất phát, lấy hai đơn tại K; chọn ↑ trước giao lộ bên phải kho,
sau khi xe rẽ lên chọn → để tới Chợ Phiên. Chờ giao 2 kiện xong, ↶ quay đầu rồi đi
thẳng về bên trái tới Xóm Trên; 1 kiện còn lại tự giao. Đây là thao tác chơi thật,
không phải đường tự động được vẽ/chạy sẵn.

Trên **Mac**: dùng chính checkout `mobile-app` này trong thư mục code đã duyệt,
Node 24/npm 11, `npm ci --ignore-scripts` khi chưa có dependencies, rồi `npm run dev`.
URL cũng là http://127.0.0.1:5173/ trên máy Mac đó, dừng Ctrl+C và xem log tại terminal.
Host phiên hiện tại là Windows, chưa kiểm chạy lệnh hoặc Safari trên Mac.
Không dùng thư mục tài liệu nguồn làm nơi tạo thêm app.

### Android và iOS

Android debug đã build/install/chơi thắng trên AVD `LittleRoutes_API36`, API 36.
JDK 21 dùng cho Gradle (khác JBR của IDE); compile/target SDK 36, min 24;
build-tools 35.0.0 được AGP 8.13.0 tự bổ sung, bộ 36.0.0 vẫn có. Gradle 8.14.3
được pin checksum. APK ở `android/app/build/outputs/apk/debug/app-debug.apk`.

Từ thư mục app, dùng terminal mới có JAVA_HOME/ANDROID_HOME/ANDROID_AVD_HOME:

```powershell
emulator -avd LittleRoutes_API36
# Ở terminal khác, sau khi emulator đã boot:
npm run android:targets
npm run android:run -- --target emulator-5580
```

`emulator-5580` là serial đợt kiểm này; lấy serial thực từ `android:targets` của
emulator đang chạy để truyền `--target`, không giả định lần mở GUI cũng dùng 5580.
`android:run` đã kiểm thực: build web → sync assets/plugins → assembleDebug → install/launch.
`npm run cap:sync` chỉ build web và sync Android, không tự compile APK.
`npm run android:open` mở Android Studio; script có thật nhưng chưa kiểm thao tác GUI IDE.
Log native: `adb -s <serial> logcat --pid=$(adb -s <serial> shell pidof dev.littleroutes.slice)`
trên Mac; trên PowerShell lấy PID bằng lệnh `adb -s <serial> shell pidof dev.littleroutes.slice`
rồi truyền số đó cho `adb -s <serial> logcat --pid=<pid>`.

Để build + lint thủ công trên Windows:

```powershell
cd android
.\gradlew.bat assembleDebug lintDebug --no-daemon --max-workers=2 --console=plain
```

Trên Mac, dùng `cd android` rồi `./gradlew assembleDebug lintDebug --no-daemon`.
Nếu checkout từ Windows chưa có executable bit, `chmod +x android/gradlew` ở thư mục app
trước khi chạy. Đây là hướng dẫn Mac, chưa chạy trên host phiên này.

Automation native (đã kiểm trên AVD, không phải Chromium browser):

```powershell
$env:LITTLE_ROUTES_ANDROID_SERIAL = 'emulator-5580'
npm run test:android
```

Cần SDK qua ANDROID_HOME và APK debug đã cài. Script chỉ nhận serial emulator và kiểm
ro.kernel.qemu, không chạy trên thiết bị thật. Dùng chạm ADB thực, đọc WebView qua CDP
noDefaults, force-stop đúng debug app, tắt rồi khôi phục Wi-Fi/data; không clear app data.
Kiểm cold start offline, Home/background/resume, lấy/giao thắng, restart và đọc best từ
SharedPreferences sau process restart. JSON/ảnh toàn màn hình ở `test-results/android`.
Lệnh `adb -s <serial> emu kill` dừng emulator; không dùng kill-device cho máy thật.

iOS cần Mac/Xcode và Simulator. Chưa có project iOS, signing hoặc Simulator được kiểm.
Khi thiết lập trên Mac: tạo platform trong app hiện có, khai báo landscape trong target,
build web/sync rồi chạy Simulator; browser preview không kiểm chứng WKWebView/plugin.
Các lệnh điều kiện trên Mac, **chưa thực thi** trong phiên này:

```sh
npx --no-install cap add ios
npm run build
npx --no-install cap sync ios
npx --no-install cap open ios
```

Chọn Simulator trong Xcode rồi Run; @capacitor/ios 8.5.3 hiện khai báo iOS tối thiểu 15.0.
Trước build/phát hành iOS cần PrivacyInfo.xcprivacy cho Preferences/UserDefaults,
reason CA92.1 theo tài liệu plugin; chưa tạo hoặc xác minh manifest iOS trên Windows.

Ưu tiên Vite browser để sửa UI nhanh. Native Live Reload chỉ dùng cho debug sau khi
workflow đóng gói local pass; không bật `server.url`, cleartext, mixed content hoặc
LAN binding trong cấu hình chuẩn. APK nghiệm thu offline phải nạp assets trong gói,
không phụ thuộc dev server. Không dùng Live Reload làm bằng chứng offline/cold start.
Manifest Android hiện không xin INTERNET; nếu cần Live Reload native sau này phải có
cấu hình mạng riêng cho debug, không nới quyền/cấu hình chuẩn của bản nghiệm thu offline.

### Ranh giới và lưu dữ liệu

- `src/core`: map/road, vehicle factors, orders, timer/state/game; nhận commands và ticks,
  không đọc DOM, clock thật, Pixi hoặc SDK. `src/content`: JSON versioned/stable IDs,
  validate schema và semantics trước tạo Game.
- `src/application`: một scheduler 60 ticks/s và Session điều phối SaveService;
  `src/rendering`: một scene Pixi, ticker dừng, camera fit, pins/xe giữ kích thước màn hình;
  `src/input`/`src/ui`: input và DOM/CSS. Dispose ticker/listeners/scene khi HMR/teardown.
- Save dùng namespace `little-routes.mobile.save.v1`, backup riêng; chỉ best/stars và
  vật phẩm thời gian. Không đọc/ghi key demo. Save lỗi/future được giữ nguyên và báo;
  backup đọc được thì phục hồi chỉ đọc. Lỗi/quota không làm mất bản cũ.
- Browser dùng localStorage; native dùng adapter @capacitor/preferences 8.0.1, nạp cache
  trước mở game, ghi tuần tự và chờ acknowledgement. UI báo đang lưu/lỗi lưu và khóa
  nút restart ở kết quả trong lúc đang ghi. Đã kiểm SharedPreferences tồn tại qua
  force-stop/restart Android; không xem localStorage WebView là lưu native bền vững.
  Chỉ đọc fallback key mobile prototype khi native chưa có; không xóa key cũ hoặc ví demo.
- Ra nền giữ phiên trong RAM và pause; chưa checkpoint/khôi phục chuyến dở sau process kill,
  chưa migrate ví/quyền mua giả từ demo. Chưa có dịch vụ commerce/production/analytics.
- Đợt UI hiện tại ưu tiên Chương 1–2, tạm hoãn Chương 3–4. C1L1 đã dùng WebP gốc,
  van trắng, camera/làn xe và HUD trên bản đồ theo demo; chưa hoàn tất toàn bộ UI
  hai chương, prep/tutorial D72/cutscene và các màn khác. Một số popup mới ở mức
  chức năng cơ bản, chưa đạt đối chiếu đầy đủ với demo; xem roadmap mục 14.
  Vòng đời Android đã kiểm trên một AVD; hiệu năng máy yếu, safe areas trên máy thật,
  các kiểu tai thỏ/camera/Dynamic Island và toàn bộ iOS vẫn cần thiết bị phù hợp.

Browser E2E phát triển dùng server riêng **5180** để không dừng preview 5173 của
chủ dự án; smoke bản build dùng 4173. `npm run dev` vẫn là 5173. Font Nunito đóng
gói local kèm OFL trong `public/assets/fonts`; app không gọi Google Fonts khi chạy.
P1b đã build/sync và cài lại APK chứa UI C1L1 mới: `android/app/build/outputs/apk/debug/app-debug.apk`
(0.1.0/code 1, `dev.littleroutes.slice`, debug). SHA-256:
`87d9310f141bbb626f7d06d14f93d872a4225f32eac1a1a9bf00533e252bcd9d`.
Đã pass 8 native checks trên API 36/WebView 133, gồm cold start offline, OS touch chơi
thắng, pause/resume, restart, native save và hai display sizes của cùng AVD. Xem
[ảnh gốc Android, đối chiếu demo/web và báo cáo](tests/reference/reviews/p1b-android/index.html),
hoặc preview `http://127.0.0.1:5173/tests/reference/reviews/p1b-android/index.html`.
Nguồn WebP 6300×3500 được chia texture runtime theo GPU limit; không thay ảnh nguồn.
Chưa kiểm iOS/điện thoại thật/hiệu năng máy yếu; popup và các màn khác vẫn chưa chuyển đầy đủ.
Có thể đặt `LITTLE_ROUTES_ANDROID_RUN_ID` (slug chữ/số/gạch nối) trước `npm run test:android`
để giữ báo cáo từng lượt trong `test-results/<run-id>`; lượt bàn giao là `android-p1b-run5`.
