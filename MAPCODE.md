# PROJECT MAP — Công Hải 360
> Cập nhật: 2026-05-12
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
| `tour.xml` | ~382 | Master XML. Skin settings, Hotspot styles (muiten/vitri/tructhang/thongtin), VR Menu, Autorotate, Scene includes (5 địa điểm) |
| `tours/toanCanh/scenes.xml` | 64 | 4 scenes toàn cảnh drone: toancanhconghai, trusoDanguy, trusoUBND, cauvuotcaotoc |
| `tours/chuaLongCat/scenes.xml` | - | 13 scenes Chùa Long Cát |
| `tours/hoSongTrau/scenes.xml` | 202 | 11 scenes: HoSongTrau1-2, toancanhSongTrau1-2, longho2-7, venho |
| `tours/hoBaTri/scenes.xml` | - | 3 scenes: DaptranhoBaTri, HoBaTri1, LonghoBaTri1 |
| `tours/hoMaTrai/scenes.xml` | - | 4 scenes: CauSongTrau1, DaptranMaTrai1, HoMaTrai1, LonghoMaTrai1 |

### Tiện ích
| File | Vai trò |
|------|---------|
| `sync.js` | Script đồng bộ hotspot từ bản nháp → dự án chính |
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
│  ├── VR Menu (3 hotspot: vr_item_1/2/3)     │
│  └── includes → scenes.xml (×5 địa điểm)   │
├─────────────────────────────────────────────┤
│  engine/tour.js + plugins/                  │  ← Lớp Engine KrPano
│  (KHÔNG CHỈNH SỬA — binary engine)         │
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
| `toanCanh` | Toàn cảnh Công Hải | 4 | 4 | ✅ |
| `chuaLongCat` | Chùa Long Cát | 13 | 13 | ✅ |
| `hoSongTrau` | Hồ Sông Trâu | 6 | 11 | ⚠️ Thiếu 5 |
| `hoBaTri` | Hồ Ba Tri | 3 | 3 | ✅ |
| `hoMaTrai` | Hồ Ma Trai | 4 | 4 | ✅ |


---

## 🔴 BUGS CONFIRMED (đọc trực tiếp từ code — 2026-05-12)

### BUG #1 — CRITICAL: 5 scene lòng hồ thiếu trong `tourData` (app.js:33-44)
Sidebar & Map không hiển thị longhoSongTrau2/3/4/5/7. Hotspot vẫn hoạt động qua XML.

### BUG #2 — CRITICAL: Hotspot nằm sai trong thẻ `<image>` (hoSongTrau/scenes.xml:60-61)
Trong `scene_toancanhSongTrau2`, hotspot `info_hosongtrau` bị đặt BÊN TRONG thẻ `<image>` thay vì sau nó. KrPano có thể bỏ qua hotspot này.
```xml
<!-- SAI: -->
<image type="CUBE" ...>
    ...
    <hotspot name="info_hosongtrau" ... />  ← Nằm trong <image>!
</image>
```


### BUG #6 — MINOR: scene_venho và scene_cauvuotcaotoc lat/lng = 0,0
Map sẽ không hiển thị marker đúng vị trí cho 2 scene này.

### BUG #7 — MINOR: Nội dung text không nhất quán (app.js:710, 756-757)
- `info_chualongcat` vẫn ghi "tỉnh Ninh Thuận" (chưa cập nhật)
- `info_hosongtrau` line 756: "tỉnh Khánh Hoà" nhưng line 740 vẫn dùng ngữ cảnh Ninh Thuận

---

## ⚠️ LƯU Ý KỸ THUẬT QUAN TRỌNG
1. **Scene name CASE-SENSITIVE**: `scene_toancanhconghai` ≠ `scene_toancanhCongHai`
2. **Hotspot KHÔNG được đặt trong `<image>`** — phải là sibling của `<image>`
3. **Smart preload đã tắt vĩnh viễn**: KrPano 1.19 có bug tự chuyển scene
4. **Leaflet minimap**: lazy init — chỉ load khi người dùng mở panel
5. **Tween Chain**: Mọi animation dùng tween chain thay delayedcall để tránh memory leak
6. **VR Menu**: 3 hotspot keep="true" trong tour.xml, cần scene name chính xác

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

**Khi deploy, chỉ upload file thay đổi — KHÔNG cần upload lại `panos/`**

---

## 📌 CẤU HÌNH SEO & DOMAIN (index.html — ĐÃ CẬP NHẬT)
- Canonical: `https://360.conghaiso.vn/` ✅
- OG URL: `https://360.conghaiso.vn/` ✅
- JSON-LD image: `https://360.conghaiso.vn/core/assets/og-preview.png` ✅
- OG image: còn dùng relative path `core/assets/og-preview.png` → nên là absolute URL
