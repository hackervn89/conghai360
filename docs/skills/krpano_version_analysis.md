# Cẩm nang kỹ thuật (Skill): Phân tích phiên bản KrPano (1.19-pr15 vs Hiện tại)

## 1. So sánh KrPano 1.19-pr15 với Phiên bản hiện tại (1.23.x)

Theo thông tin từ trang chủ chính thức của KrPano (krpano.com/news), phiên bản mà dự án chúng ta đang sử dụng là **1.19-pr15** (phát hành tháng 3/2018). Trong khi đó, phiên bản mới nhất hiện nay đã lên tới **1.23.x** (phát hành năm 2024-2025).

Dưới đây là sự khác biệt cốt lõi giữa hai thế hệ:

### KrPano 1.19-pr15 (Phiên bản dự án đang dùng)
- **Công nghệ lõi:** Chuyển dịch hoàn toàn sang HTML5 / WebGL (bỏ rơi Flash).
- **Tính năng nổi bật:** Hỗ trợ tốt WebVR (Thực tế ảo trên trình duyệt), Gyroscope (Cảm biến con quay hồi chuyển trên điện thoại), và Hotspot hiển thị bằng WebGL.
- **Hệ thống Scripting:** Sử dụng XML kết hợp Action Script truyền thống của Krpano (gọi hàm `call()`, `set()`, `get()`).
- **Mức độ ổn định:** Rất cao. Đây là phiên bản được coi là "huyền thoại" cho các dự án Virtual Tour 360 cổ điển vì tính nhẹ nhàng và ít lỗi vặt trên các trình duyệt cũ.

### KrPano 1.20 - 1.23.x (Các phiên bản hiện tại)
Các phiên bản mới tập trung mạnh vào không gian 3D thực thụ và trải nghiệm thực tế ảo sâu hơn (6DoF):
- **Bản 1.20:** Đột phá với **Depthmap Support (Bản đồ chiều sâu)** cho phép người dùng di chuyển tiến/lùi trong không gian 360 (6-Degrees-of-Freedom), hỗ trợ Render 3D Model (.obj). Thêm các hiệu ứng Post-processing (Blur, Sharpen).
- **Bản 1.22:** Giới thiệu **Reactive Programming** (Lập trình phản ứng) cho XML, hệ thống Đa ngôn ngữ (Translation), và tích hợp sức mạnh đồ họa của **Three.js**.
- **Bản 1.23:** Hỗ trợ công nghệ tối tân **3D Gaussian Splatting** để render không gian thực tế với chất lượng như thật.

### 💡 Đánh giá cho dự án Conghai360
Mặc dù 1.19-pr15 đã khá cũ, nhưng **quyết định sử dụng nó cho dự án này là hợp lý và an toàn**, bởi vì:
1. Dự án của chúng ta là ảnh panorama 360 tiêu chuẩn, không sử dụng 3D Depthmap, 3D Model hay Gaussian Splatting.
2. Chúng ta đã quy hoạch **Tách lớp giao diện (Decoupled Architecture)**: KrPano chỉ dùng để xoay ảnh và gắn hotspot, toàn bộ UI/UX hiện đại (Menu, Minimap, Popup) được xử lý bằng HTML/CSS/JS bên ngoài. Do đó, ta không cần đến các tính năng thiết kế giao diện nội bộ mới nhất của KrPano 1.22+.

---

## 2. Nắm vững cơ chế hoạt động của KrPano 1.19-pr15

Để làm chủ hoàn toàn bản 1.19-pr15 cho dự án, chúng ta cần hiểu rõ các thành phần cấu trúc và cơ chế nạp dữ liệu của nó.

### 2.1. Cấu trúc XML Cốt lõi
Mọi cấu hình của Krpano đều xoay quanh thẻ `<krpano>`. Các element quan trọng nhất bao gồm:
- `<include url="..." />`: Nạp các file XML khác vào (giống import trong JS). Rất hữu ích để chia nhỏ code (ví dụ tách file `hotspots.xml`, `ui.xml`).
- `<view>`: Định nghĩa góc nhìn. Các thuộc tính quan trọng: `hlookat` (góc xoay ngang), `vlookat` (góc xoay dọc), `fov` (độ thu phóng), `fovmin`/`fovmax` (giới hạn zoom).
- `<image>`: Nơi chứa dữ liệu ảnh. Với ảnh Multiresolution (như ta đang dùng), nó sẽ chứa các thẻ `<cube>` hoặc `<sphere>` với đường dẫn url sử dụng biến giữ chỗ như `%s` (side), `%l` (level), `%v`, `%h`.
- `<scene>`: Mỗi `<scene>` là một không gian (một căn phòng, một địa điểm). Khi gọi `loadscene('tên_scene')`, KrPano sẽ dọn sạch bộ nhớ của scene cũ và nạp `<image>`, `<view>`, và `<hotspot>` của scene mới.
- `<hotspot>`: Điểm tương tác 3D trên màn hình. Thuộc tính `ath` và `atv` quyết định tọa độ trong không gian không gian cầu (Spherical coordinates).

### 2.2. Cơ chế truyền biến (Variable Scope) & Action
- **Biến (Variables):** Trong KrPano, mọi thứ đều là biến toàn cục (Global) trừ khi được định nghĩa trong block `def()`. Bạn có thể truy xuất mọi thuộc tính thông qua đường dẫn. Ví dụ: `view.hlookat` hay `hotspot[spot1].visible`.
- **Action (Hàm):** Khai báo bằng `<action name="tên_hàm">`. Phiên bản 1.19 hỗ trợ cú pháp giống Javascript (gọi là *krpano Action Script*).
  *Ví dụ:* `if(view.fov LT 90, tween(view.fov, 90));`
- **Tweening:** KrPano cực kỳ mạnh về hiệu ứng nội suy. Hàm `tween(variable, value, time, tweentype)` là vũ khí chính để tạo cảm giác xoay chuyển mượt mà (ví dụ khi click hotspot chuyển cảnh, dùng tween để zoom nhẹ vào điểm đó trước khi load scene mới).

### 2.3. Giao tiếp Javascript API (JS Interface)
Tính năng quan trọng nhất cho dự án của chúng ta:
1. **Khởi tạo:** KrPano được nhúng vào HTML qua script `embedpano()`.
2. **Web gọi Krpano:** Lấy đối tượng KrPano thông qua `document.getElementById('krpanoSWFObject')`. Sử dụng phương thức `krpano.call("tên_hàm_xml();")` hoặc `krpano.set("biến", "giá_trị")` để điều khiển không gian 3D.
3. **Krpano gọi Web:** Trong XML, dùng `js( tên_hàm_JS() )` để gọi ngược ra ngoài. Ví dụ, gắn vào event `<events onnewscene="js( updateWebUI() );" />` để mỗi lần KrPano đổi scene, giao diện HTML bên ngoài sẽ biết để đổi màu Thumbnail tương ứng.

### 2.4. Device Checking (Kiểm tra thiết bị)
Bản 1.19-pr15 có hệ thống lọc thiết bị cực kỳ thông minh gắn ngay trên thuộc tính XML (Attribute devicechecks).
*Ví dụ:* `<layer name="btn" scale="1.0" scale.mobile="0.5" />`
Điều này có nghĩa là trên Desktop nút bấm to 100%, nhưng trên mobile tự động thu lại 50% mà không cần viết lệnh IF.

---

## 3. Ứng dụng thành Skill cho dự án
Với kiến thức trên, chúng ta rút ra các nguyên tắc phát triển (Skill) cho dự án:
1. **Chỉ dùng XML cho Dữ liệu không gian:** File `tour.xml` chỉ nên chứa `<scene>`, `<image>`, `<view>` và `<hotspot>`. Tuyệt đối không dùng `<layer>` để vẽ giao diện (Menu, Nút bấm) vì ta sẽ vẽ bằng HTML bên ngoài.
2. **Chuẩn hóa Hotspot bằng `<style>`:** Tạo một `<style name="hotspot_chuyen_canh">` định nghĩa trước thiết kế SVG Sprite, sau đó các điểm hotspot thực tế chỉ cần gọi `style="hotspot_chuyen_canh"` và truyền `ath`, `atv`, `linkedscene` vào để mã nguồn ngắn gọn, tối ưu bộ nhớ.
3. **Luôn sử dụng `MERGE` khi loadscene:** Khi chuyển scene bằng API, luôn dùng lệnh `loadscene(scene_id, null, MERGE, BLEND(0.5));` để giữ nguyên các config dùng chung và tạo hiệu ứng mờ chồng (cross-fade) mượt mà thay vì chuyển cảnh giật cục.
