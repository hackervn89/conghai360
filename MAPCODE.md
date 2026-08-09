# PROJECT MAP — Công Hải 360
> Cập nhật: 2026-08-09
> Mục đích: Tham chiếu nhanh khi bắt đầu phiên làm việc mới. KHÔNG CẦN đọc lại toàn bộ code.
> 🌐 **LIVE:** https://360.conghaiso.vn | Server: Ubuntu `/var/www/360.conghaiso.vn/public_html`

---

## 🔴 THƯ MỤC KHÔNG ĐƯỢC ĐỌC (Backup / Build gốc — rất tốn token)
```
❌ Hồ Ba Tri/              ← Backup vtour gốc
❌ Chùa Long Cát/          ← Backup vtour gốc (161KB tour.js + plugins)
❌ Hồ Sông Trâu/           ← Backup vtour gốc
❌ Toàn cảnh/               ← Backup vtour gốc
❌ krpano-1.19-pr15/       ← Bộ cài KrPano gốc (hàng trăm file)
❌ tours/*/panos/           ← Tile ảnh panorama (hàng ngàn file nhỏ)
```

---

## 🟢 CÁC FILE CHÍNH (Chỉ đọc khi cần chỉnh sửa)

### Giao diện Web
| File | Dòng | Vai trò |
|------|------|---------|
| `index.html` | ~238 | Trang chính. Head/SEO (1-52), Loading+Intro, KrPano container, UI Overlay, Scripts |
| `core/css/style.css` | ~1305 | CSS toàn bộ. Xem **bản đồ CSS** bên dưới |
| `core/js/app.js` | ~808 | Logic JS. Xem **bản đồ JS** bên dưới |

### KrPano Engine
| File | Dòng | Vai trò |
|------|------|---------|
| `tour.xml` | ~506 | Master XML. Skin settings, Hotspot styles (muiten/vitri/tructhang/thongtin), VR Menu, Autorotate, Scene includes (5 địa điểm) |
| `tours/toanCanh/scenes.xml` | 72 | 4 scenes toàn cảnh drone: toancanhconghai, trusoDanguy, trusoUBND, cauvuotcaotoc |
| `tours/chuaLongCat/scenes.xml` | 187 | 13 scenes Chùa Long Cát: cong_chinh, san_truoc, sanh_chinh, hoavien, santrai, sanphai... |
| `tours/hoSongTrau/scenes.xml` | 201 | 11 scenes: HoSongTrau1-2, toancanhSongTrau1-2, longho2-7, venho |
| `tours/hoBaTri/scenes.xml` | 100 | 7 scenes: DaptranhoBaTri, HoBaTri1-3, LonghoBaTri1-3 |
| `tours/hoMaTrai/scenes.xml` | 170 | 13 scenes: CauSongTrau1-2, HoMaTrai1-3, DaptranMaTrai1-3, LonghoMaTrai1-5 |

### Tiện ích & Dev Editor
| File / Thư mục | Vai trò |
|------|---------|
| `_dev/` | Trình biên tập Visual Tour Editor & Server Node.js (`npm run editor` → `http://localhost:3636/editor.html`) |
| `tours/locations.json` | Bảng ánh xạ tên hiển thị tiếng Việt cho 5 thư mục Địa điểm |
| `tours/infos.json` | Dữ liệu quản lý các bài viết thuyết minh (Info Modal) |
| `core/data/conghai-boundary.json` | GeoJSON ranh giới xã Công Hải (hiển thị trên minimap) |

---

## 🗺️ BẢN ĐỒ CSS (style.css — ~1305 dòng)

| Dòng | Nội dung |
|------|----------|
| 1-43 | `:root` variables + Reset + Body font |
| 45-103 | Loading Screen (progress bar, phases) |
| 105-497 | **Intro Card** — White theme |
| 498-560 | Logo compact + Scene title |
| 561-610 | Sidebar toggle button |
| 611-780 | **Sidebar** — Accordion groups, thumbnails |
| 781-993 | **Nav Bar** — Bottom center controls |
| 995-1050 | **Map Panel** — Minimap bottom-right |
| 1051-1183 | **Responsive** — Mobile media queries |
| 1185-1305 | **Info Modal** — Popup glassmorphism |

---

## 🗺️ BẢN ĐỒ JS (app.js — ~808 dòng)

| Dòng | Nội dung |
|------|----------|
| 1-65 | `tourData` — 5 nhóm địa điểm: toanCanh(4), chuaLongCat(13), hoSongTrau(6*), hoBaTri(3), hoMaTrai(4) |
| 66-91 | Biến global + `DOMContentLoaded` startup |
| 93-153 | `krpanoReady()` — Hide skin UI, set events, progress bar |
| 155-215 | `onSceneChange()` — Sync sidebar, map, back button |
| 217-238 | `hideLoadingScreen()` + `startTour()` |
| 240-521 | `initUI()` — Event listeners: sidebar, nav, QR, autorotate, VR, fullscreen, back, share, minimap, maximize map, DEV TOOLS |
| 523-633 | `ensureMapInitialized()` + `initMap()` — Leaflet + boundary GeoJSON + markers |
| 636-703 | `renderSidebar()` — Accordion với icon mapping 5 nhóm |
| 705-807 | `infoData` + `initInfoModal()` + `openInfoModal()` + `closeInfoModal()` |

> *hoSongTrau có 11 scene trong XML nhưng chỉ 6 trong tourData — xem BUG #1*

---

## 🏗️ KIẾN TRÚC 3 LỚP

```
┌─────────────────────────────────────────────┐
│  index.html  +  style.css  +  app.js        │  ← Lớp Giao diện Web
│  (UI Overlay, Sidebar, Map, Modal, Intro)   │
├─────────────────────────────────────────────┤
│  tour.xml (Master)                          │  ← Lớp Cấu hình
│  ├── Hotspot styles (muiten, vitri,         │
│  │   tructhang, thongtin)                   │
│  ├── VR Menu (5 hotspot: vr_item_1..5)      │
│  └── includes → scenes.xml (×5 địa điểm)   │
├─────────────────────────────────────────────┤
│  engine/tour.js + plugins/                  │  ← Lớp Engine KrPano
│  (KHÔNG CHỈNH SỬA — binary engine)         │
└─────────────────────────────────────────────┘
```

---

## 🛠️ VISUAL TOUR EDITOR SYSTEM (`_dev/`)

```
┌─────────────────────────────────────────────┐
│  npm run editor  (Chạy server cổng 3636)    │
│  http://localhost:3636/editor.html          │
├─────────────────────────────────────────────┤
│  • Visual Hotspot Creator (Kéo thả trực quan)│
│  • Auto-tile ảnh 360° qua krpanotools64.exe │
│  • Save View, Save Prealign, Save Hotspots  │
│  • Quản lý Locations & Info Manager Modal   │
│  💡 Khi bàn giao: Xóa thư mục _dev/ là xong │
└─────────────────────────────────────────────┘
```

---

## 📋 HOTSPOT STYLES CÓ SẴN (trong tour.xml)
| Style | Icon | Dùng cho |
|-------|------|----------|
| `muiten` | SVG sprite 24 frame | Di chuyển nội bộ trên mặt đất |
| `vitri` | Pin đỏ bounce | Từ drone → rơi xuống mặt đất |
| `tructhang` | Trực thăng + glow | Từ mặt đất → bay lên toàn cảnh |
| `thongtin` | Icon [i] pulse | Mở popup Info Modal |

---

## 📋 TOURDATA HIỆN TẠI (app.js dòng 1-65)
| Key | Label | Scenes trong app.js | Scenes trong XML | Chênh lệch |
|-----|-------|---------------------|------------------|------------|
| `toanCanh` | Toàn cảnh xã Công Hải | 4 | 4 | ✅ |
| `chuaLongCat` | Chùa Long Cát | 13 | 13 | ✅ |
| `hoSongTrau` | Hồ Sông Trâu | 6 | 11 | ⚠️ Thiếu 5 |
| `hoBaTri` | Hồ Ba Tri | 3 | 7 | ⚠️ Thiếu 4 |
| `hoMaTrai` | Hồ Ma Trai | 4 | 13 | ⚠️ Thiếu 9 |

---

## 🔴 BUGS CONFIRMED (đọc trực tiếp từ code — 2026-08-09)

### BUG #1 — CRITICAL: 5 scene lòng hồ thiếu trong `tourData` (app.js:33-44)
Sidebar & Map không hiển thị longhoSongTrau2/3/4/5/7. Hotspot vẫn hoạt động qua XML.

### BUG #2 — CRITICAL: Hotspot nằm sai trong thẻ `<image>` (hoSongTrau/scenes.xml:60-61)
Trong `scene_toancanhSongTrau2`, hotspot `info_hosongtrau` bị đặt BÊN TRONG thẻ `<image>` thay vì sau nó. KrPano có thể bỏ qua hotspot này.

### BUG #6 — MINOR: scene_venho và scene_cauvuotcaotoc lat/lng = 0,0
Map sẽ không hiển thị marker đúng vị trí cho 2 scene này.

---

## ⚠️ LƯU Ý KỸ THUẬT QUAN TRỌNG
1. **Case-Insensitive API Lookup**: Editor đã hỗ trợ so khớp không phân biệt hoa/thường cho tất cả scene.
2. **Hotspot KHÔNG được đặt trong `<image>`** — phải là sibling của `<image>`
3. **Smart preload đã tắt vĩnh viễn**: KrPano 1.19 có bug tự chuyển scene
4. **Leaflet minimap**: lazy init — chỉ load khi người dùng mở panel
5. **Tween Chain**: Mọi animation dùng tween chain thay delayedcall để tránh memory leak
6. **VR Menu**: 5 hotspot thumbnail + labels trong tour.xml
7. **Bàn giao sản phẩm**: Chỉ cần xóa thư mục `_dev/` khi deploy sản phẩm tĩnh lên hosting.

---

## 🚀 DEPLOY INFO
| Mục | Giá trị |
|-----|---------|
| **URL live** | https://360.conghaiso.vn |
| **Server** | Ubuntu, IP: 103.1.236.206 |
| **Web root** | `/var/www/360.conghaiso.vn/public_html` |
| **Upload nhanh** | `scp -r [file] hoangvietadmin@103.1.236.206:/var/www/360.conghaiso.vn/public_html` |
| **SSL** | Certbot / Let's Encrypt |
| **Cache** | 30 ngày cho jpg/png/svg/xml/js/css |

---

## 📌 CẤU HÌNH SEO & DOMAIN (index.html — ĐÃ CẬP NHẬT)
- Canonical: `https://360.conghaiso.vn/` ✅
- OG URL: `https://360.conghaiso.vn/` ✅
- JSON-LD image: `https://360.conghaiso.vn/core/assets/og-preview.png` ✅
- Visual Tour Editor Server: `npm run editor` → Port `3636` ✅
