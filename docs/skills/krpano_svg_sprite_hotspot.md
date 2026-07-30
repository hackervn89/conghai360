# Cẩm nang kỹ thuật (Skill): Tạo Hotspot Animation mượt mà trong KrPano bằng SVG Sprite Sheet

## 1. Vấn đề của KrPano với Hotspot Animation
Xây dựng giao diện virtual tour, việc tùy biến hotspot (nút di chuyển) rất quan trọng để nâng cao trải nghiệm người dùng (UX). Trong KrPano, chúng ta thường gặp các rào cản:
- **GIF Animation**: Rất nặng, dễ bị vỡ pixel (răng cưa), chất lượng thấp và giật lag trên mobile nếu có nhiều hotspot.
- **CSS Animation / DOM Inject**: KrPano render ảnh/điểm chạm chủ yếu trên **WebGL canvas**. Mọi kỹ thuật cố gắng chèn Node DOM (`<div>`, `<svg>`) xếp chèn (z-index) lên toạ độ của krpano đều rất dễ trượt vị trí khi màn hình quay, hoặc không tương tác mượt mà trong không gian 3D (ví dụ khi kéo/xoay màn hình bằng chuột/cảm ứng).
- **SVG có thẻ `<animate>` (SMIL)**: Khi cấu hình `url="hotspot.svg"`, KrPano sẽ rasterize SVG thành texture ảnh tĩnh (Rasterization) để nhúng vào WebGL, nghĩa là mọi dòng script chuyển động hay tag `<animate>` gắn bên trong file SVG sẽ BỊ BỎ QUA hoàn toàn.

👉 **Giải pháp tối ưu nhất, mượt mà nhất, native 100% engine KrPano**: Kỹ thuật cắt ảnh (Crop) trên một dải khung hình (Sprite Sheet).

---

## 2. Giải Cứu bằng Kỹ thuật Sprite Sheet & Interpolation

Ý tưởng cơ bản là giống như dải phim nhựa: chúng ta gom tất cả các khung hình (frames) chuyển động rải dài trên **MỘT bức ảnh SVG duy nhất**. 
Trong cấu hình hotspot của `tour.xml`, chúng ta gọi biến **`crop`** để hiển thị (cắt) từng "khung hình" một cho khớp thời gian, tạo ra ảo giác chuyển động (animation).

### Bước 1: Tạo SVG Sprite Sheet bằng Script (Node.js)
Viết script tự sinh file vòng lặp giúp animation mượt hơn thay vì tự vẽ thủ công. 
Sau đây là concept cơ bản của script `gen-hotspot-sprite.js`:
- Thiết lập số lượng khung hình: `FRAMES = 24`. Kích thước một khung: `120x200px`. Tổng chiều ngang sprite = `2880px`.
- Tính toán hoán vị, nội suy tuyến tính (Lerp): 
    - Để di chuyển toạ độ điểm theo khung: `Y_hiện_tại = Lerp(Y_bắt_đầu, Y_kết_thúc, tiến_độ_t)`
    - Để tạo cảm giác trơn tru khi khởi động và nhả trớn: Thêm Easing (VD: `easeInOut`).
- Xuất thành chuỗi SVG tag (`<polygon>` hoặc tương tự) với thứ tự tịnh tiến trục X. Mỗi frame chứa trạng thái riêng biệt của Mũi tên Chính / Mũi tên Ảo (Ghost).

*File `gen-hotspot-sprite.js` trong thư mục `vtour-build-test` là một ví dụ mẫu của tool này.*

---

### Bước 2: Tích hợp vào KrPano (`tour.xml`)

Đăng ký style hotspot để tái sử dụng. Các cài đặt quan trọng nhất:
- `url`: Liên kết tới file sprite sheet SVG bạn vừa khởi tạo.
- `crop`: Vị trí cắt ban đầu (Frame số 0).
- `myframe="0"`: Định nghĩa biến "đếm khung hình" cho CHÍNH hotspot đó. (*Không dùng biến global nếu không tất cả hotspot trên scene sẽ share biến khiến animation chạy nhanh gấp N lần số hotspot*).
- `onloaded`: Gọi hàm khởi chạy vòng lặp hình ảnh sau khi hotspot mở.

```xml
<style name="skin_hotspotstyle_sprite"
       url="skin/hotspot_custom.svg"
       crop="0|0|120|200" 
       scale="0.5"
       edge="center"
       distorted="true" 
       rx="60"  <!-- Nghiêng đổ xuống mặt đất không gian 3D -->
       myframe="0"  <!-- Biến đếm local cho từng hotspot độc lập -->
       onclick="skin_hotspotstyle_click();"
       onover="tween(scale,0.6,0.2);"
       onout="tween(scale,0.5,0.2);"
       onloaded="set(myframe,0); delayedcall(calc(Math.random()*2), hotspot_sprite_anim() );"
       />
```

\*Lưu ý nhỏ vô cùng tinh tế: `delayedcall(calc(Math.random()*2), ...)` sẽ tránh tình trạng toàn bộ hotspot trên cảnh nháy đồng loạt (đồng bộ) gây cứng nhắc. Mỗi mũi tên sẽ có offset start lệch nhau ngẫu nhiên.

### Bước 3: Viết Action Loop Animation

Thay vì tự nhảy css, chúng ta yêu cầu KrPano dịch chuyển điểm đầu của toạ độ CROP.

```xml
<!-- Action cycle loop -->
<action name="hotspot_sprite_anim">
    <!-- Nút vặn vòng lặp: Nếu chạm số max (vd: 24 frames), reset = 0 -->
    if(myframe GT 23, set(myframe, 0));
    
    <!-- Tính vị trí điểm bắt đầu cắt X: Tọa độ X bằng số frame nhân với chiều rộng (120px) -->
    mul(hs_cx, myframe, 120);
    
    <!-- Gắn mảng cắt: hs_cx | Y(0) | Width(120) | Height(200) -->
    txtadd(crop, get(hs_cx), '|0|120|200');
    
    <!-- Tăng biến -> frame tiếp theo -->
    inc(myframe);
    
    <!-- Gọi đệ quy sau {N} thời gian. (vd: delay 0.05 giây tương đương xấp xỉ 20 FPS) -->
    delayedcall(0.05, hotspot_sprite_anim() );
</action>
```

---

## 3. Tổng kết

- **Kiến trúc Native:** Đây là cách "KrPano-friendly" nhất. Không CSS bên ngoài, không lag, WebGL nội bộ render cực nhanh. Tối ưu cho mobile tuyệt đối.
- **Tuỳ biến không giới hạn:** Chuyển tải file sprite bằng SVG (Vector) giữ cho bức ảnh luôn siêu sắc nét ở bất kỳ mức độ thiết bị hoặc màn hình (Retina/4K), file lại hoàn toàn siêu nhẹ (chỉ tốn string text polygon) so với ảnh PNG cồng kềnh.
- **UX xuất sắc:** 24 Khung hình (frames), tốc độ dịch chuyển mịn màng với Interpolation (Lerp, EaseIn) + Góc nghiêng phối cảnh thực 3D (rx/ry) khiến mũi tên "thực sự" dán trên nền di tích cổ.
