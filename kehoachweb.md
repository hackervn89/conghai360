# KẾ HOẠCH TRIỂN KHAI TỐI ƯU DỰ ÁN WEBSITE DU LỊCH SỐ 360 & THỰC TẾ ẢO (VR)

## 1) MỤC TIÊU DỰ ÁN
Xây dựng một website tham quan thực tế ảo 360 chất lượng cao, hoạt động ổn định trên desktop và mobile, tích hợp engine **KrPano** để xử lý ảnh panorama, đồng thời có giao diện web hiện đại, dễ sử dụng, tối ưu hiệu năng và sẵn sàng triển khai online.

### Mục tiêu sản phẩm
- Trải nghiệm tham quan 360 mượt, trực quan, dễ điều hướng.
- Có hệ thống **scene**, **hotspot**, **minimap/floorplan**, **thumbnail menu**, **info popup**, **fullscreen**, **VR mode**.
- Tối ưu tải trang, hạn chế lag trên thiết bị di động.
- Có cấu trúc source rõ ràng để dễ bảo trì, mở rộng thêm điểm tham quan về sau.

### Công nghệ cốt lõi
- **KrPano**: xử lý virtual tour 360, scene, hotspot, XML config.
- **HTML / CSS / JavaScript**: giao diện web và lớp điều khiển bên ngoài.
- **SVG / CSS Animation / JS**: hotspot animation, minimap, radar, icon tương tác.
- **Hosting + CDN + HTTPS**: triển khai online và tối ưu tốc độ.

---

## 2) PHẠM VI TRIỂN KHAI (SCOPE)

### Bao gồm
- Bộ ảnh panorama 360 đã hậu kỳ.
- Xây dựng virtual tour đa cảnh bằng KrPano.
- Giao diện web phủ ngoài KrPano.
- Điều hướng bằng hotspot + danh sách scene + minimap.
- Popup thông tin cho địa điểm/điểm nhấn.
- Tối ưu cho desktop và mobile.
- Deployment online có HTTPS.

### Không bao gồm mặc định (nếu chưa chốt)
- CMS quản trị nội dung.
- Đa ngôn ngữ.
- Tài khoản người dùng / đăng nhập.
- Tích hợp thanh toán / booking.
- Hệ thống thống kê nâng cao hoặc dashboard quản trị.
- 3D model / photogrammetry / digital twin.

> Khuyến nghị: chốt phạm vi ngay từ đầu để tránh phát sinh sửa giao diện hoặc logic tour ở giai đoạn cuối.

---

## 3) NGUYÊN TẮC TRIỂN KHAI
1. **Ưu tiên hiệu năng trên mobile** vì virtual tour rất nặng tài nguyên.
2. **Tách rõ 3 lớp:** dữ liệu ảnh, lõi KrPano, giao diện web ngoài.
3. **Chuẩn hóa naming convention** ngay từ đầu để tránh lỗi linking scene.
4. **Mọi task đều có đầu ra bàn giao rõ ràng** và tiêu chí nghiệm thu cụ thể.
5. **Làm bản chạy local ổn định trước**, sau đó mới tối ưu và deploy online.

---

## 4) CẤU TRÚC TRIỂN KHAI TỐI ƯU THEO GIAI ĐOẠN

# GIAI ĐOẠN 0: KHỞI ĐỘNG DỰ ÁN & CHỐT YÊU CẦU
**Mục tiêu:** Chốt rõ phạm vi, cấu trúc dữ liệu và tiêu chuẩn triển khai trước khi làm kỹ thuật.
**Nhân sự:** PM / Khách hàng / Technical Lead / Designer

- [ ] **Task 0.1: Chốt danh sách tính năng**
  - Xác định rõ các module sẽ có trong phiên bản đầu tiên:
    - Hotspot chuyển cảnh
    - Minimap/Floorplan
    - Thumbnail menu
    - Info popup
    - Fullscreen
    - VR mode
    - Audio nền (nếu thực sự cần)
  - Phân loại tính năng thành:
    - Bắt buộc
    - Nên có
    - Có thể làm sau

- [ ] **Task 0.2: Chốt cấu trúc nội dung tour**
  - Lập danh sách toàn bộ scene.
  - Đặt **scene ID** theo quy chuẩn cố định.
  - Xác định tên hiển thị, mô tả ngắn, nhóm khu vực cho từng scene.

- [ ] **Task 0.3: Chốt tiêu chuẩn kỹ thuật đầu vào**
  - Độ phân giải panorama nguồn.
  - Chuẩn đặt tên file.
  - Chuẩn thư mục lưu trữ.
  - Chuẩn asset giao diện: icon, font, thumbnail, sơ đồ.

- [ ] **Task 0.4: Chốt tiêu chí nghiệm thu**
  - Thời gian tải ban đầu mục tiêu.
  - Danh sách thiết bị cần test.
  - Mức độ hoàn thiện UI/UX.
  - Tiêu chuẩn hotspot đúng logic và không nhầm scene.

**📦 Bàn giao:** Tài liệu scope, danh sách feature, scene list, naming convention, tiêu chí nghiệm thu.

---

# GIAI ĐOẠN 1: TIỀN KỲ & HẬU KỲ HÌNH ẢNH 360 (USER THỰC HIỆN)
**Mục tiêu:** Chuẩn bị sẵn sàng bộ ảnh panorama 360 hoàn chỉnh và tạo tour cơ bản bằng KrPano.
**Nhân sự:** Khách hàng (User)

- [ ] **Task 1.1: Chụp và hậu kỳ ảnh panorama**
  - Thực hiện chụp ảnh 360 tại thực địa.
  - Xử lý ảnh hậu kỳ: khâu ảnh (stitching), chỉnh màu (retouch), xóa chân máy (nadir patching).
  - Đảm bảo ảnh xuất ra định dạng JPG chất lượng cao, độ phân giải tối ưu.

- [ ] **Task 1.2: Phân loại và tổ chức thư mục ảnh**
  - Gom nhóm các ảnh 360 theo từng địa điểm (Ví dụ: Hồ Sông Trâu, Chùa Long Cát).
  - Đổi tên file ảnh theo chuẩn đã thống nhất ở Giai đoạn 0 (để sau này khi tạo tour, scene ID sẽ được đặt theo tên file).

- [x] **Task 1.3: Khởi tạo tour cơ bản bằng KrPano Droplet**
  - Kéo thả các ảnh đã phân loại của từng địa điểm vào tool `MAKE VTOUR (MULTIRES) droplet.bat` của KrPano để tự động sinh ra thư mục `vtour`.
  - Đổi tên thư mục `vtour` sinh ra thành tên địa điểm chuẩn (ví dụ: `ho-song-trau`, `chua-long-cat`).
  - **Xác nhận từ code hiện tại:** đã có cấu trúc `tours/toanCanh/`, `tours/chuaLongCat/`, `tours/hoSongTrau/` với `scenes.xml` và `panos/` tương ứng.

**📦 Bàn giao:** Các thư mục tour thô (chứa `tour.xml` và thư mục `panos/`) sẵn sàng để đưa vào cấu trúc dự án chính.

---

# GIAI ĐOẠN 2: XỬ LÝ KỸ THUẬT KRPANO (ENGINE BUILD)
**Mục tiêu:** Tạo bộ virtual tour lõi chạy ổn định, scene linking chính xác, dễ tích hợp giao diện ngoài.
**Nhân sự:** KrPano Developer / Kỹ thuật viên 360

- [ ] **Task 2.1: Khởi tạo project từ bộ ảnh panorama**
  - Build tour bằng `MAKE VTOUR (MULTIRES)` để tạo tiles đa độ phân giải.
  - Kiểm tra output của từng scene sau khi build.
  - Tổ chức thư mục output rõ ràng để thuận tiện chỉnh sửa.

- [ ] **Task 2.2: Chuẩn hóa cấu trúc XML**
  - Tách cấu hình thành các phần rõ ràng nếu cần:
    - scene config
    - hotspot config
    - skin/UI config
    - plugin/util config
  - Đặt comment và quy ước dễ bảo trì.

- [ ] **Task 2.3: Thiết lập góc nhìn mặc định cho từng scene**
  - Chỉnh `hlookat`, `vlookat`, `fov` cho mỗi cảnh.
  - Chỉnh `fovmin`, `fovmax` để tránh zoom quá mức.
  - Kiểm tra tính thẩm mỹ của khung nhìn mở đầu.

- [ ] **Task 2.4: Xây dựng hệ thống hotspot chuyển cảnh**
  - Gắn hotspot liên kết giữa các scene theo đúng lộ trình thực tế.
  - Kiểm tra hướng mũi tên / điểm click hợp lý với không gian.
  - Chuẩn hóa tên hotspot để dễ quản lý.

- [x] **Task 2.5: Xây dựng hotspot thông tin**
  - Tách riêng hotspot chuyển cảnh và hotspot thông tin.
  - Thiết kế cấu trúc dữ liệu để mỗi hotspot có thể gọi popup HTML tương ứng.
  - **Xác nhận từ code hiện tại:** style `thongtin` đã có trong `tour.xml`, hỗ trợ `infoid`, gọi `js(openInfoModal(get(infoid)))`.

- [x] **Task 2.6: Cấu hình hành vi nền của tour**
  - Auto-rotate khi idle: đã cấu hình `waittime="5.0" speed="2.0"`, mặc định tắt, bật/tắt qua UI button.
  - ⚠️ **Lỗi đã sửa:** `tofov="120"` gây zoom FOV ra 120° khi autorotate kích hoạt — đã xóa, giữ FOV tự nhiên của scene.
  - Chuyển scene có hiệu ứng mượt: `BLEND(0.5)` đã áp dụng.
  - Gyroscope: `gyro="true"` bật qua skin_settings — tự động kích hoạt trên mobile có cảm biến. Người dùng không có nút tắt gyro thủ công (chấp nhận được cho phiên bản đầu).
  - VR mode: nút VR trong UI gọi `webvr.enterVR()` — hoạt động trên thiết bị hỗ trợ, tự xử lý fallback qua KrPano engine.

- [ ] **Task 2.7: Dọn skin/plugin mặc định không cần thiết**
  - ⚠️ **Lưu ý kỹ thuật:** Rất dễ lỗi mất hotspot nếu ẩn lộn layer. 
  - Cách làm đúng: Chạy Javascript gọi `set(layer[layer_name].visible, false)` để ẩn từng phần một (Control bar, Background, Arrow button), đảm bảo layer chứa dữ liệu Hotspot gốc vẫn được Krpano render đầy đủ.

- [ ] **Task 2.8: Kiểm tra bản lõi chạy độc lập**
  - Mở local và test toàn bộ scene.
  - Test link scene, hotspot, góc nhìn, zoom, preload cơ bản.

**📦 Bàn giao:** Bản tour lõi KrPano chạy local ổn định, scene linking chính xác, XML rõ ràng và dễ mở rộng.

---

# GIAI ĐOẠN 3: THIẾT KẾ UI/UX & PHÁT TRIỂN GIAO DIỆN WEB
**Mục tiêu:** Xây dựng lớp giao diện web trực quan, hiện đại, giao tiếp tốt với KrPano.
**Nhân sự:** UI Designer / Front-end Developer

- [ ] **Task 3.1: Thiết kế wireframe & UI system**
  - Xác định bố cục desktop và mobile.
  - Thiết kế:
    - Header hoặc brand area
    - Nút mở menu
    - Scene list / thumbnail panel
    - Minimap / floorplan
    - Toolbar chức năng
    - Popup thông tin
    - Loading screen
  - Chốt style guide: màu sắc, font, button, icon, spacing.

- [ ] **Task 3.2: Thiết kế luồng UX sử dụng**
  - Người dùng vào trang sẽ thấy gì đầu tiên.
  - Khi nào hiện hướng dẫn kéo xoay / chạm vuốt.
  - Cách mở minimap hoặc danh sách địa điểm.
  - Cách đóng popup mà không che trải nghiệm tour.

- [ ] **Task 3.3: Dựng HTML/CSS giao diện phủ ngoài tour (UI OVERLAY)**
  - Tách bạch rõ 2 layer: Krpano 3D Layer ở dưới dưới lớp DOM, Giao diện Web Layer ở trên cùng.
  - ⚠️ **Lưu ý kỹ thuật:** Tuyên bố `pointer-events: none` cho thư mục Root bọc UI để chuột "chọc thủng" và vuốt được pano ở bên dưới.
  - Chỉ gán lệnh bắt chuột `pointer-events: auto` vào chính xác các component thiết kế (Navigation bar, Button, Thumbnail Panel).
  - Sử dụng **Glassmorphism** (backdrop-filter: blur, background trong suốt) để UI hoà trộn mượt mà với bối cảnh tour.

- [ ] **Task 3.4: Kết nối Javascript API với KrPano**
  - Khai báo file xử lý Logic trung gian (vd: `app.js`). Dùng biến `krpanoObj` truy xuất từ component Krpano (`document.getElementById("krpanoSWFObject")`).
  - Web → Krpano: Xây dựng function gọi `krpanoObj.call('...')` cho tác vụ Loadscene, Toggle Autorotate, WebVR (`webvr.enterVR()`), và Toggle Fullscreen.
  - Krpano → Web: Cắm hook nhận diện chuyển scene `events.onnewscene` để bắn thông tin `xml.scene` ra lại cho DOM HTML để cập nhật thanh Thumbnail.

- [ ] **Task 3.5: Xây dựng minimap/floorplan tương tác**
  - Click điểm trên minimap để chuyển scene.
  - Hiển thị radar / hướng nhìn đồng bộ với `view.hlookat`.
  - Highlight scene hiện tại trên bản đồ.

- [ ] **Task 3.6: Xây dựng scene menu / thumbnail navigation**
  - Danh sách ảnh nhỏ các scene.
  - Có trạng thái active cho scene hiện tại.
  - Hỗ trợ thu gọn/mở rộng để không che màn hình trên mobile.

- [ ] **Task 3.7: Tùy biến hotspot theo phong cách riêng (SVG ANIMATION HOTSPOT)**
  - ⚠️ **Tối kỵ:** Cố gắng inject Node SVG vào cấu hình XML vì lỗi z-index và rasterize của WebGL.
  - Giải pháp tối ưu: Xây dựng **SVG Sprite Sheet** nhiều khung hình (24 khung hình, tịnh tiến liên tục) và dùng thuộc tính `crop` của engine Krpano để thay đổi frame, tạo ảo giác chuyển động.
  - Lưu ý đặt biến nội bộ cho từng nút (vd: `myframe`) và dùng thuộc tính toạ độ 3D `rx` (lật nền đất) nhằm tăng độ trực quan. Trang bị interpolation trơn tru chống giật/nháy chớp khét mắt.

- [x] **Task 3.8: Xây dựng popup thông tin / multimedia**
  - Click info hotspot để mở modal HTML.
  - Hỗ trợ text, ảnh, video nhúng nếu cần.
  - Thiết kế đóng/mở mượt, dễ thao tác trên mobile.
  - **Xác nhận từ code hiện tại:** `index.html` đã có modal overlay; `app.js` đã có `initInfoModal()`, `openInfoModal()`, `closeInfoModal()`; `style.css` đã có khối CSS riêng cho Info Modal.

- [ ] **Task 3.9: Xử lý audio nền một cách có kiểm soát**
  - Chỉ thêm nếu thật sự cần cho trải nghiệm.
  - Có nút bật/tắt rõ ràng.
  - Tuân thủ chính sách autoplay của trình duyệt.

- [ ] **Task 3.10: Hoàn thiện loading & trạng thái hệ thống**
  - Màn hình loading ban đầu.
  - Trạng thái đang chuyển scene.
  - Thông báo fallback nếu thiết bị/browser không hỗ trợ một tính năng nào đó.

**📦 Bàn giao:** Giao diện web hoàn chỉnh tích hợp với lõi KrPano, responsive tốt, thao tác mượt và rõ ràng.

---

# GIAI ĐOẠN 4: TỐI ƯU HIỆU NĂNG, SEO CƠ BẢN & ĐO LƯỜNG
**Mục tiêu:** Tối ưu trải nghiệm thật sự trước khi đưa lên production.
**Nhân sự:** Front-end Developer / Technical Lead / QA

- [x] **Task 4.1: Tối ưu tài nguyên giao diện**
  - Favicon tối ưu: `favicon-32.png` (2.6 KB) thay cho `icon_conghai.png` (2.5 MB).
  - Social preview riêng: `og-preview.png` (207 KB) cho Open Graph / Twitter Card.
  - Loại bỏ preload ảnh nặng 2.5MB, giữ preload JS + FontAwesome.
  - Dev Tools (Crosshair, Copy Coords, Copy View, Context Menu) đã ẩn bằng HTML comment — dễ bật lại khi cần phát triển.
  - Xóa `preconnect` tới Google Fonts (không còn dùng font Outfit).
  - ✅ CSS/JS đã được minify (app.min.js, style.min.css) giúp tối ưu tốc độ tải trang trước khi deploy.

- [x] **Task 4.2: Tối ưu chiến lược tải scene**
  - Scene mở đầu: `scene_toancanhconghai` (toàn cảnh drone ấn tượng nhất).
  - **Smart Preload**: Sau khi scene mới tải xong, tự động preload tối đa 2 scene lân cận (linkedscene từ hotspot) ở chế độ nền.
  - Delay 1.5s trước khi preload để scene hiện tại render xong trước.
  - Giới hạn 2 scene/lần để tránh nghẽn bandwidth trên mobile.
  - Memory cap: `<memory maxmem="350" />` đã có sẵn.

- [x] **Task 4.3: Tối ưu trải nghiệm mobile — Safe Area iOS**
  - `viewport-fit=cover` đã có sẵn trong `index.html` (bắt buộc để env() hoạt động).
  - ⚠️ **Lỗi đã sửa:** CSS chưa dùng `env(safe-area-inset-*)` → các phần tử bị che bởi notch/home bar trên iPhone.
  - **Giải pháp đã áp dụng:** Khai báo 4 biến CSS trong `:root`: `--safe-top`, `--safe-bottom`, `--safe-left`, `--safe-right` dùng `env(safe-area-inset-*, 0px)`. Sau đó cập nhật `top/bottom/left/right` của toàn bộ phần tử absolute: logo, sidebar-wrapper, nav-bar, map-panel — kể cả trong media query mobile.
  - Kết quả: trên iPhone notch/Dynamic Island, các nút không bị che; trên thiết bị thường, fallback 0px không ảnh hưởng giao diện.

- [x] **Task 4.4: SEO cơ bản cho landing page**
  - Title, meta description, Open Graph (og:title, og:description, og:image) đã thiết lập.
  - Twitter Card (summary_large_image) đã cấu hình.
  - Favicon 32x32 + Apple Touch Icon đã gắn.
  - Social preview dùng file riêng `og-preview.png` (207 KB, tối ưu).
  - Nội dung intro card là text thật (SEO-friendly), có heading hierarchy (h1, h2).

- [x] **Task 4.5:** SEO nâng cao (Cập nhật Meta Tags, JSON-LD, tạo robots.txt & sitemap.xml mẫu)
- [x] **Task 4.6:** Đảm bảo tính chính xác địa lý (Sửa Ninh Thuận -> Khánh Hòa toàn bộ dự án)

- [ ] **Task 4.7: Gắn analytics / theo dõi hành vi cơ bản** *(Chờ triển khai sau khi deploy)*
  - **Phương án đã chọn: C** — Kết hợp bộ đếm lượt xem + Google Analytics.
  - **Bộ đếm lượt xem**: Hiển thị trực tiếp trên giao diện. Cách triển khai phụ thuộc loại hosting:
    - Hosting có PHP → file PHP nhỏ (~10 dòng) lưu số vào file text trên server (tối ưu nhất).
    - Static hosting → dùng API bên ngoài (CountAPI hoặc tương đương).
  - **Google Analytics 4**: Gắn script tracking chạy ngầm để theo dõi chi tiết (thiết bị, vùng miền, scene nào xem nhiều).
  - ⏳ **Cần cung cấp**: Loại hosting (PHP/VPS/Static?) + GA Measurement ID (`G-XXXXXXXXXX`).

- [x] **Task 4.8: Các tính năng tối ưu trải nghiệm bổ sung (Hoàn thành Phase 4)**
  - Chuyển cảnh **Little Planet Transition** khi di chuyển giữa mặt đất và flycam.
  - Tích hợp **Nút Quay Lại (Back Button)** điều hướng scene thông minh.
  - Tích hợp **Mã QR Desktop** góc dưới trái để scan trên thiết bị di động.
  - Giao diện **Progress Bar Loading** thay thế cho spinner truyền thống.
  - Gắn **Native Tooltip** cho Thumbnail Sidebar.
  - **Xác nhận từ code hiện tại:** đã thấy đầy đủ trong `tour.xml`, `index.html`, `app.js`.

**📦 Bàn giao:** Bản build đã tối ưu tài nguyên, mobile tốt hơn, có SEO/analytics cơ bản.

---

# GIAI ĐOẠN 5: DEPLOYMENT & CẤU HÌNH HẠ TẦNG
**Mục tiêu:** Đưa sản phẩm online ổn định, tải nhanh, dễ bảo trì.
**Nhân sự:** DevOps / Developer / Technical Lead

- [x] **Task 5.0: Cập nhật URL tuyệt đối (Thay thế placeholder bằng domain thật)**
- [ ] **Task 5.1: Đưa lên Server, cấu hình HTTPS (Bắt buộc cho WebVR & Gyro)**
- [ ] **Task 5.2: Kiểm thử các thiết bị (iOS, Android, Chrome, Safari)**
- [ ] **Task 5.3: Xác minh Google Search Console & Submit Sitemap**
- [ ] **Task 5.4: Cấu hình cache & nén truyền tải**
  - Cache hợp lý cho tiles pano và asset tĩnh.
  - Bật gzip/brotli nếu hạ tầng hỗ trợ.
  - Tránh cache sai với file cần cập nhật thường xuyên.

- [ ] **Task 5.5: Thiết lập backup & versioning**
  - Lưu bản source final.
  - Lưu bản build final.
  - Gắn version theo ngày hoặc release để dễ rollback.

---

## 📌 CẤU HÌNH SEO & DOMAIN (index.html)
| Thành phần | Vị trí (Dòng) | Nội dung cần thay đổi khi có Domain |
|------------|---------------|------------------------------------|
| **Canonical** | ~15 | Mở comment và thay `yourdomain.com` |
| **Open Graph URL** | ~22 | Mở comment và thay `yourdomain.com` |
| **Twitter URL** | ~25 | Mở comment và thay `yourdomain.com` |
| **JSON-LD URL** | ~47 | Thay `https://yourdomain.com` thành URL thật |
| **JSON-LD Image** | ~48 | Thay `https://yourdomain.com` thành URL thật |

---

## 🛠️ QUY TRÌNH THAY ĐỔI HÀNG LOẠT
Khi có domain, dùng lệnh **Replace in Files** (Ctrl + Shift + H):
- **Find:** `https://yourdomain.com`
- **Replace:** `https://tenmien-cua-ban.vn`
- **Files to include:** `index.html, robots.txt, sitemap.xml`

**📦 Bàn giao:** Bản production online có HTTPS, cấu hình cache tốt, có bản backup/version rõ ràng.

---

# GIAI ĐOẠN 6: KIỂM THỬ, NGHIỆM THU & BÀN GIAO
**Mục tiêu:** Đảm bảo sản phẩm ổn định trên nhiều thiết bị và có checklist nghiệm thu rõ ràng.
**Nhân sự:** QA / Developer / Khách hàng

- [ ] **Task 6.1: Kiểm thử chức năng**
  - Toàn bộ scene load đúng.
  - Hotspot chuyển cảnh đúng đích.
  - Minimap hoạt động đúng.
  - Thumbnail scene hoạt động đúng.
  - Popup info hiển thị đúng nội dung.
  - Fullscreen / VR mode / audio hoạt động đúng trong phạm vi hỗ trợ.

- [ ] **Task 6.2: Kiểm thử giao diện & responsive**
  - Desktop độ phân giải lớn.
  - Laptop phổ biến.
  - Tablet.
  - Điện thoại Android.
  - iPhone / Safari.

- [ ] **Task 6.3: Kiểm thử hiệu năng thực tế**
  - Tốc độ tải scene đầu.
  - Độ mượt khi xoay pano.
  - Khả năng phản hồi hotspot.
  - Mức tiêu thụ tài nguyên trên thiết bị di động.

- [ ] **Task 6.4: Kiểm thử trình duyệt**
  - Chrome
  - Safari
  - Edge
  - Trình duyệt mobile phổ biến

- [ ] **Task 6.5: Fix bug chót và nghiệm thu toàn bộ theo Checklist.**
  - Sửa lỗi scene logic.
  - Sửa lỗi hiển thị font/icon.
  - Tinh chỉnh trải nghiệm người dùng ở các điểm còn cấn.

- [ ] **Task 6.6: Nghiệm thu & bàn giao cuối**
  - Bàn giao source.
  - Bàn giao assets.
  - Bàn giao tài liệu cấu trúc scene / hotspot.
  - Bàn giao hướng dẫn cập nhật nội dung cơ bản.

**📦 Bàn giao:** Link live chính thức, source final, bộ assets, tài liệu kỹ thuật ngắn gọn, checklist nghiệm thu đã hoàn thành.

---

## 5) CẤU TRÚC DỮ LIỆU KHUYẾN NGHỊ

### Bảng quản lý Scene nên có
- Scene ID
- Tên hiển thị
- File panorama nguồn
- Thumbnail
- Khu vực
- Góc nhìn mặc định
- Scene liên kết
- Ghi chú hotspot thông tin

### Bảng quản lý Hotspot nên có
- Hotspot ID
- Scene đang chứa hotspot
- Loại hotspot: chuyển cảnh / thông tin
- Tọa độ hoặc mô tả vị trí
- Scene đích hoặc nội dung popup
- Ghi chú thiết kế/icon

> Việc chuẩn hóa 2 bảng này từ đầu sẽ giảm rất nhiều lỗi kỹ thuật khi số scene tăng lên.

---

## 6) TIÊU CHÍ NGHIỆM THU ĐỀ XUẤT
- Tour mở được ổn định trên desktop và mobile.
- Scene đầu tiên tải nhanh, không gây cảm giác chờ quá lâu.
- Tất cả hotspot hoạt động đúng logic.
- Minimap và radar đồng bộ chính xác với hướng nhìn.
- Giao diện không che trải nghiệm pano quá mức.
- Không có lỗi vỡ layout ở các kích thước màn hình chính.
- Không có asset thừa, link hỏng, popup lỗi.
- Bản online chạy HTTPS và dùng được các tính năng được công bố.

---

## 7) RỦI RO CẦN LƯU Ý
1. **Ảnh nguồn quá nặng** → gây tải chậm, nóng máy, lag mobile.
2. **Scene naming không thống nhất** → dễ lỗi linking và khó bảo trì.
3. **Lạm dụng animation/UI overlay** → giảm FPS khi xem tour.
4. **Preload quá nhiều scene** → làm trải nghiệm ban đầu tệ hơn.
5. **Hotspot/XML đặt sai cấp thẻ** → có thể gây lỗi khó phát hiện. (Đã khắc phục lỗi này trong `scene_toancanhSongTrau2`).
5. **Âm thanh autoplay** → dễ bị trình duyệt chặn.
6. **Hosting yếu hoặc không có CDN** → tốc độ truy cập kém.
7. **Thiếu test Safari/iPhone** → dễ lỗi thực tế sau khi bàn giao.

---

## 8) KHUYẾN NGHỊ THỰC THI CHO TEAM KỸ THUẬT
1. **Làm lõi KrPano chạy ổn định trước rồi mới phủ UI đẹp lên sau.**
2. **Không nhồi quá nhiều tính năng ngay phiên bản đầu.** Ưu tiên trải nghiệm tham quan mượt và logic.
3. **Ưu tiên hotspot bằng SVG/HTML/CSS nhẹ** thay vì PNG lớn.
4. **Tách config scene/hotspot khỏi phần giao diện** để dễ mở rộng về sau.
5. **Luôn test trên mobile thật**, không chỉ xem bằng chế độ giả lập.
6. **Quản lý version source rõ ràng** trước mỗi lần chỉnh lớn.

---

## 9) KẾT LUẬN
Đây là phiên bản kế hoạch tối ưu hơn theo hướng **thực thi được, dễ quản lý, dễ nghiệm thu và phù hợp với dự án virtual tour 360 làm bằng KrPano**. So với bản cũ, bản này đã bổ sung các phần còn thiếu quan trọng như:
- chốt scope ngay từ đầu,
- chuẩn hóa scene/hotspot/data,
- phân tách rõ lõi KrPano và giao diện web,
- thêm tiêu chí nghiệm thu,
- thêm SEO/analytics cơ bản,
- thêm deployment/cache/backup/versioning,
- tăng tính thực tế cho QA và bàn giao.

Nếu duyệt theo bản này, bước tiếp theo hợp lý nhất là mình sẽ viết tiếp cho bạn **bản kế hoạch rút gọn dạng checklist thi công thực tế theo ngày hoặc theo tuần**, để đội triển khai bám vào làm ngay.
---

## 10) CẤU TRÚC THƯ MỤC CHÍNH THỨC (QUY HOẠCH PORTAL)
Để quản lý đa địa điểm và dùng chung giao diện, dự án được tổ chức theo cấu trúc:
- **/core/**: Chứa CSS/JS và tài sản UI dùng chung cho toàn bộ website (style.css, app.js).
- **/engine/**: Chứa lõi KrPano (tour.js, plugins) và các Skin/Hotspot dùng chung (hotspot_custom.svg).
- **/tours/**: Mỗi thư mục con là một địa điểm riêng biệt (vd: toan-canh, ho-song-trau, chua-long-cat). Mỗi thư mục con chứa file `scenes.xml` (chỉ chứa các `<scene>`) và folder `panos/` riêng.
- **tour.xml**: File Master XML ở thư mục gốc. Dùng `<include>` để gom tất cả `scenes.xml` từ các địa điểm vào một phiên KrPano duy nhất.
- **index.html**: Trình phát chính, load `tour.xml` Master.

---

## 11) KIẾN TRÚC MASTER XML — LIÊN KẾT HOTSPOT XUYÊN ĐỊA ĐIỂM

### Vấn đề
Dự án có các cảnh toàn cảnh (chụp từ trên cao) cần liên kết hotspot đến các cảnh chi tiết nằm trong thư mục địa điểm khác nhau (ví dụ: Toàn cảnh Công Hải → Chùa Long Cát, Hồ Sông Trâu). KrPano chỉ cho phép `linkedscene` trỏ tới scene nằm trong cùng 1 file XML đang load.

### Giải pháp: Master XML + Include
Tạo một file `tour.xml` ở thư mục gốc dự án, dùng thẻ `<include>` để gộp toàn bộ scene từ mọi địa điểm vào **một phiên KrPano duy nhất**:

```xml
<!-- tour.xml (Master) -->
<krpano version="1.19" title="Công Hải 360">
    <include url="engine/skin/vtourskin.xml" />
    <!-- Cấu hình chung -->
    ...
    <!-- Gom scene từ tất cả địa điểm -->
    <include url="tours/toan-canh/scenes.xml" />
    <include url="tours/ho-song-trau/scenes.xml" />
    <include url="tours/chua-long-cat/scenes.xml" />
</krpano>
```

Mỗi file `scenes.xml` bên trong thư mục địa điểm chỉ chứa các thẻ `<scene>`:
```xml
<!-- tours/toan-canh/scenes.xml -->
<krpano>
    <scene name="toan-canh-cong-hai" title="Toàn cảnh Công Hải">
        ...
        <hotspot ... linkedscene="clc-01" />  <!-- Link xuyên sang Chùa Long Cát -->
        <hotspot ... linkedscene="hst-01" />  <!-- Link xuyên sang Hồ Sông Trâu -->
    </scene>
</krpano>
```

### Tại sao hoạt động
- KrPano khi gặp `<include>` sẽ gộp mọi `<scene>` vào bộ nhớ chung → tất cả scene "nhìn thấy nhau" → `linkedscene` link xuyên địa điểm thoải mái.
- Đường dẫn ảnh (`panos/...`) trong mỗi `scenes.xml` tự động được KrPano tính relative từ vị trí của chính file đó → không bị sai path.

### Quy trình đặt hotspot
- **Hotspot nội bộ** (giữa các scene trong cùng 1 địa điểm): User dùng KrPano Tools Editor mở bản `vtour` gốc (bản đầy đủ chưa tách cấu trúc) để đặt bình thường, sau đó copy nội dung `<scene>` về file `scenes.xml` của dự án.
- **Hotspot xuyên địa điểm** (Toàn cảnh → Chùa, Hồ → Toàn cảnh...): Dev thêm bằng code trực tiếp trong `scenes.xml`, dựa trên tọa độ `ath`/`atv` xác định từ giao diện tour.

> ⚠️ **Lưu ý quan trọng:** Khi đặt tên scene (`name`), phải đảm bảo **không trùng** giữa các địa điểm. Khuyến nghị dùng prefix: `clc-01` (Chùa Long Cát), `hst-01` (Hồ Sông Trâu), `tc-01` (Toàn cảnh).

---

## 12) QUY TRÌNH ĐỒNG BỘ HOTSPOT TỰ ĐỘNG (SYNC SCRIPT)
Để giải quyết bài toán Krpano Tools Editor không hỗ trợ cấu trúc Decoupled (chia nhỏ file XML), dự án sử dụng quy trình **Làm Nháp & Tự Động Đồng Bộ**.

### Thư viện Style Hotspot (có sẵn trong `tour.xml` Master)
Khi thiết kế luồng di chuyển, các hotspot nên được gán style tương ứng để tăng trải nghiệm UX/UI:
- `style="muiten"`: Hotspot mũi tên mặc định, dùng để di chuyển nội bộ khu vực trên mặt đất.
- `style="vitri"`: Hotspot "Pin đỏ" có hiệu ứng nhấp nhô, dùng khi đang ở chế độ Toàn Cảnh (Drone) và muốn ghim vị trí rớt xuống mặt đất.
- `style="tructhang"`: Hotspot "Trực thăng" kèm đế sáng (Glow base) sát mặt đất, dùng khi đang đứng ở mặt đất và muốn bay thẳng lên chế độ Toàn Cảnh.

### Cách thức Đồng bộ tự động
1. **Làm Nháp (Drafting):** Người dùng (User) sử dụng công cụ Krpano Tools Editor mở thư mục gốc `vtour` của một địa điểm (VD: `Hồ Sông Trâu\vtour\tour.xml`). Tiến hành kéo thả và nối điểm hotspot một cách trực quan, sau đó bấm `Save`.
2. **Chạy Script Đồng Bộ (Syncing):**
   Mở Terminal trong VS Code và chạy lệnh Node.js sau:
   ```bash
   node sync.js "Đường_dẫn_file_nháp\tour.xml" "tên_thư_mục_đích"
   ```
   *Ví dụ:* `node sync.js "Hồ Sông Trâu\vtour\tour.xml" hoSongTrau`
3. **Cơ chế hoạt động của `sync.js`:**
   - Tool tự động bóc tách các thẻ `<hotspot>` từ file nháp.
   - Inject chính xác vào file `tours/hoSongTrau/scenes.xml` của dự án chính.
   - **Đặc biệt thông minh:** Tool sẽ so khớp ID của Hotspot. Nếu hotspot đó đã tồn tại trong file chính và đã được gán custom style (như `tructhang`), tool sẽ giữ nguyên style này và chỉ cập nhật lại tọa độ (`ath`, `atv`) và điểm đến (`linkedscene`), bảo vệ hoàn toàn công sức chỉnh sửa thủ công của người dùng.

---

## 13) TÙY BIẾN THÔNG TIN HOTSPOT (CUSTOM TOOLTIP & THUMBNAIL)
Để tăng tính chuyên nghiệp và giúp người xem biết trước điểm đến, dự án hỗ trợ hệ thống Tooltip thông minh, tự động hiển thị khi di chuột (hover) vào Hotspot.

### Cách sử dụng
Bạn có thể thêm trực tiếp 2 thuộc tính sau vào thẻ `<hotspot>` trong bất kỳ file `scenes.xml` nào:
- `custom_title="Tên hiển thị"`: Nội dung chữ muốn hiện lên.
- `custom_thumb="đường/dẫn/ảnh/thumbnail.jpg"`: (Tùy chọn) Ảnh thu nhỏ hiện phía trên chữ.

### Ví dụ thực tế
1. **Chỉ hiện chữ (Dành cho mũi tên `muiten`):**
   ```xml
   <hotspot name="spot1" style="muiten" ... custom_title="Đi tới Sảnh Chính" />
   ```
2. **Hiện cả chữ và ảnh (Dành cho `tructhang` hoặc `vitri`):**
   ```xml
   <hotspot name="tc_spot1" style="vitri" ... 
            custom_title="Chùa Long Cát" 
            custom_thumb="tours/chuaLongCat/panos/1-cong_chinh.tiles/thumb.jpg" />
   ```

### Đặc điểm kỹ thuật
- **Căn giữa tự động:** Chữ luôn được căn vào chính giữa card thông tin và thẳng hàng với ảnh thumbnail.
- **Tự động co giãn:** Nếu không có ảnh (`custom_thumb`), card sẽ tự thu nhỏ lại thành một nhãn chữ gọn gàng. Nếu có ảnh, card sẽ mở rộng chiều cao tương ứng.
- **Hiệu ứng mượt mà:** Tooltip tự động bám theo con trỏ chuột và có hiệu ứng làm mờ (Glassmorphism) đồng bộ với giao diện chung.

---

## 14) HƯỚNG DẪN TẠO VÀ QUẢN LÝ POPUP THÔNG TIN (INFO MODAL)

Hệ thống cung cấp một cơ chế hiển thị Popup thông tin (Modal HTML) cực kỳ linh hoạt và tách biệt hoàn toàn khỏi cấu trúc XML của KrPano. Thay vì nhét các đoạn văn bản dài vào thẻ XML, toàn bộ nội dung được lưu tại một Object Javascript tên là `infoData` bên trong file `core/js/app.js`.

### Cơ chế hoạt động (4 Bước)

1. **"Cuốn từ điển" `infoData` (`app.js`):** 
   Nơi lưu trữ nội dung dưới dạng Key-Value. Mỗi địa điểm cần một ID duy nhất.
2. **Gắn ID ở KrPano XML (`scenes.xml`):** 
   Tạo một hotspot dùng `style="thongtin"` và cung cấp `infoid="[ID_Của_Bạn]"`.
3. **Phát tín hiệu (`tour.xml`):** 
   Khi click, Krpano chạy lệnh `js(openInfoModal(get(infoid)))` đẩy ID ra ngoài trình duyệt.
4. **Hiển thị (`app.js`):** 
   Javascript nhận ID, tra cứu trong `infoData`, lấy Tiêu đề + Nội dung HTML, nhét vào thẻ Div và làm hiện Modal bằng hiệu ứng mờ (Glassmorphism).

### Cách thêm một điểm thông tin mới

**Bước 1: Thêm nội dung vào `app.js`**
Mở file `core/js/app.js`, tìm đến biến `const infoData = { ... };`. Copy và thêm một block mới (nhớ có dấu phẩy `,` ngăn cách các block nếu cần):

```javascript
const infoData = {
    // ... các điểm cũ ...
    "info_hosongtrau": {
        title: "Hồ Sông Trâu",
        content: \`
            <p><strong>Hồ Sông Trâu</strong> là một điểm đến thiên nhiên tuyệt đẹp...</p>
            <ul>
                <li><strong>Diện tích:</strong> Rộng lớn.</li>
                <li><strong>Vị trí:</strong> Nằm tại Công Hải.</li>
            </ul>
        \`
    }
};
```

**Bước 2: Tạo Hotspot bên KrPano (`scenes.xml`)**
Mở file `scenes.xml` của địa điểm tương ứng (ví dụ: `tours/hoSongTrau/scenes.xml`), chèn dòng hotspot sau vào đúng scene bạn muốn hiển thị:

```xml
<hotspot name="spot_info_hst" style="thongtin" ath="12.34" atv="56.78" infoid="info_hosongtrau" custom_title="Khám phá Hồ Sông Trâu" />
```

*Trong đó:*
- `style="thongtin"`: Gọi biểu tượng chữ **[ i ]** nhấp nháy.
- `infoid="info_hosongtrau"`: Phải trùng khớp 100% với cái Key bạn vừa tạo ở Bước 1.
- `custom_title`: Dòng chữ nhỏ hiện ra khi di chuột (hover) vào icon.

Như vậy, hệ thống hoàn toàn decoupled (tách rời). Việc chỉnh sửa màu chữ, in đậm, chèn ảnh bên trong bài viết sẽ do HTML gánh vác, đảm bảo Tour 360 luôn chạy mượt mà và an toàn.

---

## 15) HƯỚNG DẪN CẤU HÌNH KHI CÓ DOMAIN & HOSTING (POST-DEPLOY)

Khi bạn đã có tên miền chính thức (ví dụ: `conghai360.vn`) và hosting, hãy thực hiện các bước sau để tối ưu hóa SEO và tính năng:

### Bước 1: Cập nhật URL tuyệt đối trong `index.html`
Các mạng xã hội (Facebook, Zalo) yêu cầu đường dẫn ảnh phải là tuyệt đối.
1. Tìm và thay thế `https://yourdomain.com` thành tên miền thật của bạn.
2. Mở khóa (uncomment) thẻ `<link rel="canonical" ...>`.
3. Cập nhật thuộc tính `url` và `image` trong đoạn script `JSON-LD`.

### Bước 2: Cập nhật `robots.txt` và `sitemap.xml`
1. Thay thế `https://yourdomain.com` trong file `robots.txt` để chỉ đường tới file sitemap.
2. Thay thế `https://yourdomain.com` trong file `sitemap.xml` cho thẻ `<loc>`.

### Bước 3: Cấu hình HTTPS (SSL)
*   **Bắt buộc:** Virtual Tour cần HTTPS để trình duyệt cho phép truy cập Cảm biến xoay (Gyroscope) và chế độ VR.
*   Nếu dùng Hosting có cPanel/DirectAdmin, hãy bật Let's Encrypt (Miễn phí).

### Bước 4: Thiết lập Google Search Console & Analytics
1. Truy cập [Google Search Console](https://search.google.com/search-console/), thêm trang web và xác minh quyền sở hữu.
2. Gửi file `sitemap.xml` để Google index các cảnh quay nhanh hơn.
3. Lấy mã GA4 (Measurement ID) và gắn vào thẻ `<head>` trong `index.html`.

### Bước 5: Kiểm tra tính năng Chia sẻ (Social Debugger)
Sử dụng [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) để kiểm tra xem ảnh xem trước và mô tả đã hiển thị đúng chưa. Nếu chưa, bấm "Scrape Again" để cập nhật bộ nhớ đệm của Facebook.

---

## 16) HƯỚNG DẪN TRIỂN KHAI CHẠY THỬ TRÊN UBUNTU & NGINX (THÊM / XÓA SUBDOMAIN)

Giải pháp dành cho trường hợp muốn dùng tạm Cloud Server Ubuntu có sẵn để tiết kiệm chi phí mua hosting mới. Đảm bảo cấu hình tách biệt hoàn toàn 100% với Web App đang chạy.

### Phân đoạn 1: Cách tạo Subdomain và cấu hình Nginx

**Bước 1:** Tạo thư mục chứa code
```bash
sudo mkdir -p /var/www/360.conghaiso.vn/public_html
sudo chown -R hoangvietadmin:hoangvietadmin /var/www/360.conghaiso.vn/public_html
```
*(Tiến hành upload toàn bộ nội dung file build vào thư mục `public_html` này)*

**Bước 2:** Tạo một file cấu hình Nginx riêng biệt (tuyệt đối không sửa file cấu hình của web chính)
```bash
sudo nano /etc/nginx/sites-available/360.conghaiso.vn
```

**Bước 3:** Nhập cấu hình tối ưu tải ảnh 360
```nginx
server {
    listen 80;
    server_name 360.conghaiso.vn;
    root /var/www/360.conghaiso.vn/public_html;
    index index.html;

    # Cấu hình lưu đệm ảnh tĩnh để chạy VR mượt, tiết kiệm băng thông
    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(jpg|jpeg|png|svg|xml|js|css)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

**Bước 4:** Kích hoạt cấu hình và tải lại Nginx
```bash
sudo ln -s /etc/nginx/sites-available/360.conghaiso.vn /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Bước 5:** Cài đặt SSL tự động bằng Certbot
```bash
sudo certbot --nginx -d 360.conghaiso.vn
```

### Phân đoạn 2: Cách xóa hoàn toàn khi không sử dụng

Để giải phóng server và dọn dẹp sạch sẽ mà không làm ảnh hưởng Web App chính, chạy 4 lệnh sau:

**1. Xóa thư mục chứa mã nguồn:**
```bash
sudo rm -rf /var/www/360.conghaiso.vn
```

**2. Xóa cấu hình Nginx của riêng subdomain này:**
```bash
sudo rm /etc/nginx/sites-available/360.conghaiso.vn
sudo rm /etc/nginx/sites-enabled/360.conghaiso.vn
```

**3. Báo cho Nginx cập nhật lại hệ thống:**
```bash
sudo systemctl reload nginx
```

**4. (Tùy chọn) Xóa chứng chỉ SSL thừa:**
```bash
sudo certbot delete --cert-name 360.conghaiso.vn
```

---

## 17) QUY TRÌNH CẬP NHẬT/BẢO TRÌ NHANH (KHÔNG CẦN UPLOAD LẠI ẢNH)

Nhờ việc tách biệt hoàn toàn cấu trúc dữ liệu, khi thay đổi các thành phần trên web, bạn **TUYỆT ĐỐI KHÔNG CẦN** tải lại thư mục `panos/` (chứa các file ảnh nặng hàng trăm MB). Quá trình cập nhật chỉ mất vài giây với các file nhẹ vài KB:

| Thay đổi điều gì | File cần upload đè lên Server |
| --- | --- |
| Thêm/Sửa Hotspot chuyển cảnh | `tours/.../scenes.xml` của khu vực tương ứng |
| Sửa góc nhìn ban đầu (`hlookat`) | `tours/.../scenes.xml` của khu vực tương ứng |
| Thay đổi chữ, nội dung bảng thông tin (Popup) | `core/js/app.js` (hoặc `app.min.js`) |
| Đổi màu sắc, chỉnh lại giao diện CSS | `core/css/style.css` (hoặc `style.min.css`) |
| Thêm/sửa thư viện icon hotspot (như Trực thăng) | `tour.xml` (nằm ở thư mục gốc) |
| Cập nhật thẻ SEO, Title, tên website | `index.html` |

Thư mục web 360 trên server: /var/www/360.conghaiso.vn/public_html
lệnh coppy: scp -r [tên file, thư mục] hoangvietadmin@103.1.236.206:/var/www/360.conghaiso.vn/public_html  

**💡 Mẹo nhỏ (Sửa code trực tiếp):**
Thay vì phải sửa ở máy tính rồi đẩy lên qua SFTP, nếu các chỉnh sửa chỉ là dạng text nhỏ (sửa sai chính tả, sửa toạ độ hotspot), bạn có thể dùng WinSCP / MobaXterm / FileZilla để **bấm đúp thẳng vào file đó ngay trên Server**, sửa nội dung và bấm `Ctrl + S`. Mã nguồn sẽ được tự động lưu lên Server ngay lập tức!

## 18) ẨN HIỆN DEV TOOL

XOÁ DISPLAY NONE NÀY đi <div class="dev-crosshair" style="display: none !important;">

---

## 19) QUY TẮC HÀNH VI CHO AI CODING ASSISTANT (KARPATHY GUIDELINES)

> Nguồn gốc: [andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) — 123k ⭐ trên GitHub.
> Dựa trên quan sát của **Andrej Karpathy** (cựu Director of AI tại Tesla) về các lỗi phổ biến mà LLM mắc phải khi viết code.
> Áp dụng cho: Mọi AI assistant (Antigravity, Claude Code, Cursor, Copilot...) khi làm việc với dự án này.

**Nguyên tắc chung:** Các quy tắc dưới đây thiên về **cẩn thận hơn là nhanh**. Với các task đơn giản (sửa typo, one-liner), dùng phán đoán — không cần áp dụng toàn bộ quy trình cho mọi thay đổi.

### Nguyên tắc 1: Suy Nghĩ Trước Khi Code (Think Before Coding)

**Đừng giả định. Đừng giấu sự bối rối. Đưa ra các đánh đổi.**

Trước khi bắt tay vào code:
- **Nêu rõ giả định.** Nếu không chắc chắn → hỏi, đừng đoán.
- **Nếu có nhiều cách hiểu** → trình bày tất cả, không âm thầm chọn một.
- **Nếu có cách đơn giản hơn** → nói ra. Phản biện khi cần thiết.
- **Nếu không rõ** → dừng lại, chỉ ra điểm mơ hồ, và hỏi.

> **Ví dụ trong Conghai360:** Khi được yêu cầu "sửa hotspot", AI phải hỏi: sửa tọa độ, sửa style, sửa linkedscene, hay sửa tooltip? — Không tự ý sửa hết.

### Nguyên tắc 2: Đơn Giản Trước (Simplicity First)

**Code tối thiểu giải quyết vấn đề. Không thêm gì suy đoán.**

- Không thêm tính năng ngoài yêu cầu.
- Không tạo abstraction cho code chỉ dùng 1 lần.
- Không thêm "flexibility" hay "configurability" mà không ai yêu cầu.
- Không xử lý lỗi cho kịch bản bất khả thi.
- Nếu 200 dòng có thể viết 50 dòng → viết lại.

**Phép thử:** "Một senior engineer có nói đây là overcomplicated không?" Nếu có → đơn giản hóa.

> **Ví dụ trong Conghai360:** Khi thêm 1 scene mới, chỉ cần thêm `<scene>` vào `scenes.xml` và entry vào `tourData`. KHÔNG tạo thêm plugin system, config parser, hay dynamic loader.

### Nguyên tắc 3: Thay Đổi Phẫu Thuật (Surgical Changes)

**Chỉ chạm vào thứ cần thiết. Chỉ dọn rác của chính mình.**

Khi sửa code hiện có:
- **KHÔNG** "cải tiến" code lân cận, comment, hoặc formatting.
- **KHÔNG** refactor thứ đang chạy tốt.
- **Giữ nguyên style hiện có**, dù bạn muốn làm khác.
- Dead code không liên quan? **Nhắc** nhưng **đừng xóa**.

Khi thay đổi của bạn tạo ra code thừa (orphan):
- **Xóa** imports/variables/functions mà CHÍNH thay đổi của bạn khiến chúng thừa.
- **KHÔNG xóa** dead code đã có từ trước (trừ khi được yêu cầu).

**Phép thử:** Mọi dòng thay đổi phải truy ngược được trực tiếp về yêu cầu của người dùng.

> **Ví dụ trong Conghai360:** Khi sửa bug CSS sidebar → chỉ sửa đúng các dòng CSS liên quan đến sidebar. KHÔNG format lại toàn bộ `style.css`, KHÔNG thêm type hint, KHÔNG đổi quote style.

### Nguyên tắc 4: Thực Thi Hướng Mục Tiêu (Goal-Driven Execution)

**Định nghĩa tiêu chí thành công. Lặp cho đến khi xác minh.**

Biến yêu cầu mệnh lệnh thành mục tiêu có thể kiểm chứng:

| Thay vì... | Chuyển thành... |
|------------|-----------------|
| "Sửa lỗi chuyển scene" | "Verify: chuyển từ scene A → B → C không lag, không zombie tween" |
| "Thêm hotspot" | "Verify: hotspot hiển thị đúng tọa độ, click chuyển đúng scene, tooltip hiện đúng" |
| "Tối ưu mobile" | "Verify: nav-bar không bị che trên iPhone SE (375px), FPS > 30" |

Với task nhiều bước, nêu kế hoạch ngắn:
```
1. [Bước] → verify: [cách kiểm tra]
2. [Bước] → verify: [cách kiểm tra]
3. [Bước] → verify: [cách kiểm tra]
```

**Chìa khóa:** Tiêu chí thành công mạnh → AI tự xử lý được. Tiêu chí yếu ("làm cho chạy") → cần hỏi liên tục.

### Dấu hiệu các nguyên tắc đang hoạt động

- ✅ Diff ít thay đổi thừa — chỉ có đúng những gì được yêu cầu.
- ✅ Code đơn giản ngay lần đầu — không cần viết lại vì overcomplicated.
- ✅ Câu hỏi làm rõ đến TRƯỚC khi code — không phải sau khi sai.
- ✅ PR/commit sạch — không có "cải tiến tiện thể" hay refactor lạc đề.