# Cẩm nang kỹ thuật (Skill): Xây dựng Giao diện Web (UI Overlay) tùy chỉnh trên nền KrPano

## 1. Vấn đề của UI mặc định KrPano
Khi dùng `MAKE VTOUR (MULTIRES)` của KrPano, hệ thống sinh ra một skin mặc định (thuộc thư mục `skin/vtourskin.xml`). 
Dù có nhiều tính năng nhưng:
- Giao diện cũ kỹ, khó tùy biến CSS, không bắt kịp xu hướng UI/UX hiện đại (như Glassmorphism, Material Design).
- Responsive trên mobile thường bị rối, các nút quá bé hoặc chiếm quá nhiều diện tích.
- Nếu can thiệp quá sâu vào file XML gốc thường làm hỏng logic nội bộ của KrPano (như lỗi mất hotspot, hỏng minimap).

👉 **Giải pháp hoàn hảo**: Tách bạch 2 lớp (Layers). **KrPano chỉ phụ trách lõi render 3D & Hotspot**. Mọi UI/UX (Menu, Navigation, VR Button) sẽ do **HTML/CSS/JS thuần** vẽ đè lên dưới dạng lớp Overlay, rồi giao tiếp với KrPano thông qua Javascript API.

---

## 2. Các bước triển khai Custom UI Overlay

### Bước 1: Ẩn giao diện skin cũ một cách an toàn
Cực kỳ cẩn trọng: Nếu bạn gọi `krpanoObj.call("set(layer[skin_layer].visible, false);");` để ẩn toàn bộ màn hình, bạn sẽ **VÔ TÌNH ẨN LUÔN LAYER HOTSPOT** vì hotspot mặc định phụ thuộc vào tiến trình logic nội bộ của biến `skin_layer`.

**Cách đúng**: Chỉ ẩn đi các layer "nhóm điều khiển" (Control bar) và các nút bấm thừa:

```javascript
function krpanoReady(krpano) {
    krpanoObj = krpano;
    
    // Ẩn thanh công cụ UI mặc định nhưng vẫn giữ an toàn cho logic Hotspot
    const layersToHide = [
        'skin_control_bar', 
        'skin_control_bar_bg', 
        'skin_scroll_window',
        'skin_splitter_bottom',
        'skin_btn_prev_fs',
        'skin_btn_next_fs',
        'skin_title'
    ];
    layersToHide.forEach(layer => krpanoObj.call(`set(layer[${layer}].visible, false);`));
    
    // Lắng nghe sự kiện cực kỳ quan trọng khi chuyển scene (chuyển cảnh)
    krpanoObj.set("events.onnewscene", "js(onSceneChange());");
}
```

### Bước 2: Bố trí lớp HTML phủ ngoài (Overlay)
Tạo HTML nằm chèn lên bộ hiển thị `#pano` bằng `position: absolute` và ngăn event mouse bằng CSS:

```css
#ui-layer {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; /* Rất quan trọng! Xuyên qua UI để chuột vuốt được ảnh 360 */
    z-index: 10;
}

/* Các nút bấm bên trong UI layer cần phải bắt lại pointer-events */
.glass-panel, .nav-btn, .thumb-card {
    pointer-events: auto; 
    /* Áp dụng hiệu ứng Glassmorphism */
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(10px);
}
```

### Bước 3: Javascript API - UI tương tác ngược với KrPano
Chức năng nút bấm Web gọi KrPano thực thi chuyển cảnh, xoay vòng, hoặc WebVR:

- **Chuyển Scene (Vào cảnh khác):**
  Dùng option `MERGE` và `BLEND(0.5)` để mượt mà không bị dựt ảnh.
  ```javascript
  krpanoObj.call(`loadscene('${sceneId}', null, MERGE, BLEND(0.5))`);
  ```

- **Điều hướng cơ bản (Lên/Xuống/Trái/Phải/Zoom):**
  KrPano có biến động lực `moveforce`. Khi nhấn chuột vào thì set bằng `1/-1`, khi nhả chuột thì set bằng `0`.
  ```javascript
  // VD Quay Phải
  btnRight.addEventListener('mousedown', () => krpanoObj.set('hlookat_moveforce', 1));
  btnRight.addEventListener('mouseup', () => krpanoObj.set('hlookat_moveforce', 0));
  ```

- **Chuyển đổi VR Mode:**
  KrPano tích hợp sẵn plugin webvr.
  ```javascript
  krpanoObj.call("webvr.enterVR();"); // hoặc webvr.exitVR();
  ```

- **Chế độ tự xoay (Auto-rotate):**
  ```javascript
  krpanoObj.set('autorotate.enabled', isAutorotate);
  ```

### Bước 4: KrPano giao tiếp ngược với Web (Sync UI)
Thường xảy ra khi người dùng ấn chuyển scene qua Hotspot nội bộ của KrPano. Trang Web cần phải cập nhật lại Title, hoặc Active cái Thumbnail tương ứng.
Phòng trường hợp này ta đã đăng ký hàm `onSceneChange()` ở Bước 1.

```javascript
function onSceneChange() {
    if (!krpanoObj) return;
    
    // Yêu cầu KrPano trả mã nguồn của scene hiện tại
    const currentSceneName = krpanoObj.get("xml.scene"); 
    
    if (currentSceneName) {
        // Cập nhật DOM (CSS đổi màu Thumbs, đổi chữ Header)
        updateUIState(currentSceneName); 
    }
}
```

---

## 3. Tổng kết Lợi Tích
- Source Web Frontend hoàn toàn độc lập, có thể giao cho Web Developer bình thường design lại bằng các Framework React/Vue/Tailwind dễ dàng.
- Đóng gói lõi KrPano, ít sợ bị gãy đứt cấu trúc nội bộ của xml engine.
- Tốc độ mượt, giao diện Web hiện đại, tùy biến thân thiện và tối ưu được mobile UX.
