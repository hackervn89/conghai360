# KẾ HOẠCH NÂNG CẤP DỰ ÁN CÔNG HẢI 360
**Giai đoạn 2: Tích hợp Không gian Bảo tàng/Triển lãm 3D (Micro-Metaverse)**
> Cập nhật: 2026-05-15 | Phiên bản v2 — đã bổ sung phân tích UX và content strategy

---

## 1. MỤC TIÊU DỰ ÁN

- **Vượt qua giới hạn 360:** Chuyển từ "Tham quan ảnh 360°" (3 DOF) sang "Đi lại tự do trong không gian 3D" (6 DOF).
- **Tăng chiều sâu văn hóa:** Trưng bày lịch sử, văn hoá Raglai, di sản lãnh đạo, và sản phẩm OCOP mà không bị giới hạn không gian vật lý.
- **Ưu tiên UX liền mạch:** Chuyển đổi từ KrPano sang WebGL phải mượt mà, đồng bộ phong cách (Glassmorphism trắng, font Verdana, primary #d35656).
- **Kết nối thương mại:** Phòng OCOP là mục tiêu chiến lược — liên kết trực tiếp đến Shopee, Lazada, Tiki.

---

## 2. KIẾN TRÚC HỆ THỐNG KÉP (DUAL-ENGINE)

| Engine | Phạm vi | Công nghệ |
|--------|---------|-----------|
| **KrPano** | Môi trường ngoài trời, panorama 360° | KrPano 1.19 |
| **A-Frame / Three.js** | Không gian 3D phòng bảo tàng | A-Frame 1.4.2 + aframe-extras 7.0 |

**Luồng chuyển đổi:**
- **Vào bảo tàng:** Đứng tại `scene_trusoUBND` → click hotspot style `museum` tại cửa chính → Fade to black (0.6s) → load `museum.html` → Fade in.
- **Ra ngoài:** Bấm nút "Quay lại Tour" → Fade to black → `index.html?startscene=scene_trusoUBND` → Fade in.

**Fallback thiết bị yếu:** Nếu A-Frame WebGL không khởi tạo trong 5s, hiển thị trang thay thế (ảnh 360 panorama tĩnh của bảo tàng + link back to tour).

---

## 3. CẤU TRÚC 3 PHÒNG

### Sảnh Lịch Sử (Trung tâm) — Phòng 1
Không gian trưng bày văn hóa dân tộc Raglai tại Công Hải.

**Hiện vật (GLB Models):**
| Vật phẩm | File GLB | Trạng thái |
|----------|----------|------------|
| Tượng Nữ Raglai | `core/data/nu_raglay.glb` | ✅ Có sẵn |
| Đàn Chapi | `core/data/danchapi.glb` | ✅ Có sẵn |
| Bộ Mã La | `core/data/mala.glb` | ⏳ Đang chuẩn bị |
| Cung Nỏ Raglai | `core/data/cungno.glb` | ⏳ Đang chuẩn bị |
| Trang phục thêu thổ cẩm | `core/data/thocam.glb` | ⏳ Có thể thêm sau |

**Tường:** Tranh ảnh 2D lịch sử văn hóa Raglai (6+ khung).
**Ánh sáng:** Spotlight amber ấm (#ffe8c0), vòng glow đỏ (#d35656) tại chân bục.

### Phòng Truyền Thống (Bên trái) — Phòng 2
Lưu giữ hành trình lãnh đạo và thành tích xã Công Hải qua các thời kỳ.

**Nội dung cần bổ sung:**
- [ ] Ảnh chân dung lãnh đạo xã qua từng nhiệm kỳ (PNG/JPG)
- [ ] Thông tin tên, chức vụ, nhiệm kỳ từng người
- [ ] Ảnh Bằng khen, danh hiệu thi đua
- [ ] Dòng thời gian lịch sử xã (text + ảnh)

**Ánh sáng:** Điểm sáng xanh (#aabbff).

### Phòng Sản phẩm OCOP (Bên phải) — Phòng 3 ⭐ Ưu tiên cao
Trưng bày và kết nối thương mại điện tử sản phẩm đặc thù địa phương.

**Sản phẩm cần bổ sung:**
- [ ] Nho xanh Công Hải (đã có info, cần link Shopee/Lazada thật)
- [ ] Tỏi Công Hải (cần ảnh, thông tin, link)
- [ ] Các sản phẩm OCOP khác (danh sách do địa phương cung cấp)
- [ ] QR Code thật để quét mua hàng
- [ ] Logo chứng nhận OCOP chính thức

**Ánh sáng:** Điểm sáng xanh lá (#ccffdd).

---

## 4. THIẾT KẾ UX/UI

### 4.1 Điều khiển (Adaptive Locomotion)
| Thiết bị | Di chuyển | Xoay | Teleport |
|----------|-----------|------|----------|
| Desktop | W A S D | Kéo chuột | Nút phòng góc phải |
| Mobile | Joystick ảo (aframe-extras) | Vuốt | Chạm vào sàn |

### 4.2 Đồng bộ Design System với Tour Chính
- Font: `Verdana, Arial, Helvetica, sans-serif`
- Primary: `#d35656`
- Glass: `rgba(255,255,255,0.65)` + `backdrop-filter: blur(14px)`
- Radius pill: `30px` | Radius card: `16px`
- Tất cả nút, modal, badge đều dùng Glassmorphism trắng

### 4.3 Onboarding (BẮT BUỘC — đã triển khai)
Tutorial overlay xuất hiện khi vào, tự biến mất sau 9 giây. Hướng dẫn cả PC lẫn mobile.

### 4.4 Room Indicator + Room Nav (đã triển khai)
- Badge tên phòng hiện tại ở trên cùng giữa màn hình
- 3 nút teleport phòng ở góc dưới phải
- Viền sàn màu (đỏ/xanh/lá) phân biệt 3 khu vực

### 4.5 Click to Info Modal (đã triển khai)
Click vào bất kỳ hiện vật → Modal Glassmorphism hiện thông tin + nút mua hàng (Room 3).

### 4.6 Anti Motion Sickness
- Speed di chuyển thấp (`0.07`) để không gây chóng mặt
- Không dùng smooth rotation tự động
- Teleport phòng instant (không animation bay qua không gian)

---

## 5. LỘ TRÌNH THỰC THI

### ✅ BƯỚC 0: Khung cơ bản (HOÀN THÀNH — 2026-05-15)
- [x] `museum.html`: 3 phòng, kiến trúc tường, ánh sáng 3 màu
- [x] 2 GLB model thật: `nu_raglay.glb` + `danchapi.glb`
- [x] 2 placeholder shape: Mã La (torus đồng) + Cung nỏ (box)
- [x] UI đồng bộ tour chính: nút quay lại, room badge, tutorial, room nav
- [x] Info Modal đầy đủ thông tin cho mọi hiện vật
- [x] Fade in/out chuyển đổi

### 🔲 BƯỚC 1: Kết nối từ Tour KrPano (Tuần tới)
- [ ] Thêm hotspot `museum_entry` vào `scene_trusoUBND` (style: icon cửa bảo tàng)
- [ ] Tạo hotspot style mới `style="museum"` trong `tour.xml`
- [ ] Test chuyển đổi seamless KrPano → A-Frame → KrPano

### 🔲 BƯỚC 2: Nội dung thật (Chờ tài sản từ địa phương)
- [ ] **Phòng 1:** Thay placeholder bằng GLB thật: Mã La, Cung Nỏ
- [ ] **Phòng 1:** Thêm ảnh thật lên khung tường (scan/chụp hiện vật)
- [ ] **Phòng 2:** Upload ảnh lãnh đạo thật + thông tin nhiệm kỳ vào `infoData`
- [ ] **Phòng 3:** Cập nhật link Shopee/Lazada thật cho Nho xanh, Tỏi
- [ ] **Phòng 3:** Tích hợp QR Code thật (tạo bằng API QR Code)

### 🔲 BƯỚC 3: Tối ưu kỹ thuật
- [ ] Tối ưu GLB (Draco compression): mỗi file < 2MB
- [ ] Bake texture căn phòng → export `.glb` từ Blender nếu cần chi tiết hơn
- [ ] Test Memory Leak: vào/ra museum.html 10 lần liên tiếp → kiểm tra RAM/GPU
- [ ] Test FPS: PC target 60fps, Mobile target 30fps
- [ ] Test iOS Safari (WebGL quirks)

### 🔲 BƯỚC 4: Tính năng nâng cao (Phase 2)
- [ ] **Spatial Audio:** Tiếng nhạc Chapi nhẹ khi đến gần đàn Chapi
- [ ] **Guided Tour Mode:** Camera tự di chuyển qua từng hiện vật có audio thuyết minh
- [ ] **Deep Link:** `museum.html?room=1&exhibit=raglay_statue`
- [ ] **Screenshot/Share:** Chụp màn hình 3D chia sẻ Facebook/Zalo
- [ ] **Sa bàn Công Hải:** Mô hình 3D quy hoạch tương lai xã

---

## 6. CẤU TRÚC FILE

```
museum.html              ← File chính, tự chứa toàn bộ CSS + JS
core/data/
  nu_raglay.glb          ← ✅ Tượng Nữ Raglai
  danchapi.glb           ← ✅ Đàn Chapi
  mala.glb               ← ⏳ Bộ Mã La (chờ)
  cungno.glb             ← ⏳ Cung Nỏ (chờ)
core/assets/
  museum-floor.jpg       ← (Tùy chọn) Texture sàn đá cẩm thạch
  museum-wall.jpg        ← (Tùy chọn) Texture tường gạch cũ
```

---

## 7. QUY TẮC BỔ SUNG NỘI DUNG (Content Update)

### Thêm hiện vật mới (Phòng 1):
1. Copy file `.glb` vào `core/data/`
2. Khai báo asset trong `<a-assets>`: `<a-asset-item id="mdl-xxx" src="core/data/xxx.glb">`
3. Thêm `<a-gltf-model src="#mdl-xxx" ...>` thay thế placeholder tương ứng
4. Thêm entry vào `INFO` object trong JS: `xxx: { title: '...', html: '...' }`

### Thêm ảnh lãnh đạo (Phòng 2):
1. Upload ảnh vào `core/assets/` (kích thước khuyến nghị: 400×500px, JPG)
2. Cập nhật `material="src: core/assets/ten-anh.jpg"` trong `<a-plane>` khung tương ứng
3. Cập nhật text tên/chức vụ trong `<a-text>`

### Thêm sản phẩm OCOP (Phòng 3):
1. Cập nhật link href trong `modal-content` của `INFO.ocop_nho`, `INFO.ocop_toi`...
2. Thêm entry mới vào `INFO` và `<a-entity class="exhibit"...>` tương ứng

---

## 8. RỦI RO CẦN LƯU Ý

| Rủi ro | Giải pháp |
|--------|-----------|
| GLB quá nặng → load chậm | Dùng Blender + Draco, mỗi file < 2MB |
| Mobile GPU yếu → lag | Giảm số spotlight, dùng baked lighting |
| iOS Safari WebGL quirk | Test trực tiếp trên iPhone; tránh tính năng WebGL2-only |
| Memory leak khi ra/vào | Gọi `renderer.dispose()`, clear Three.js objects khi rời scene |
| Sai tên scene khi back | Dùng `scene_trusoUBND` (đã xác nhận đúng trong XML) |
| Nội dung lạc hậu | Thiết kế `infoData` JS tách biệt → cập nhật nhanh không cần chạm HTML |

---

*Bản kế hoạch này định hình tầm nhìn vượt trội cho dự án. Nếu triển khai thành công, Công Hải 360 sẽ là sản phẩm công nghệ văn hóa số tiên phong cấp tỉnh — kết hợp du lịch ảo, bảo tàng số và thương mại điện tử OCOP trong một nền tảng.*
