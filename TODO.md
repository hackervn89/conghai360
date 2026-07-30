# BẢNG THEO DÕI TIẾN ĐỘ DỰ ÁN (CHECKLIST)
> Cập nhật: 2026-05-12 | Live: https://360.conghaiso.vn

---

## ✅ GIAI ĐOẠN 0: KHỞI ĐỘNG — HOÀN THÀNH
- [x] Task 0.1–0.4: Chốt tính năng, cấu trúc, tiêu chuẩn, nghiệm thu

## ✅ GIAI ĐOẠN 1: HÌNH ẢNH 360
- [x] Task 1.1: Chụp & hậu kỳ (Toàn cảnh, Chùa Long Cát, Hồ Sông Trâu, Hồ Ba Tri, Hồ Ma Trai)
- [x] Task 1.2: Phân loại & đổi tên file chuẩn
- [x] Task 1.3: Build vtour bằng KrPano droplet → 5 địa điểm

## ✅ GIAI ĐOẠN 2: KRPANO ENGINE — HOÀN THÀNH
- [x] Task 2.1–2.8: Kiến trúc Decoupled, 5 hotspot styles, GPS, góc nhìn, VR/Gyro

## ✅ GIAI ĐOẠN 3: UI/UX — HOÀN THÀNH 100%
- [x] Task 3.1–3.10: Glassmorphism, app.js, Minimap, Sidebar 5 nhóm, Info Modal, Loading 2 pha
- [x] VR Menu 3D đã có
- [x] Share Button, Back Button, QR Code desktop, Maximize Map
- [x] **BUG #2**: Fix hotspot `info_hosongtrau` đặt sai trong `<image>` tag (hoSongTrau/scenes.xml:60-61)
- [x] **BUG #3**: Fix VR Menu scene name: `scene_clc_01` → `scene_1-cong_chinh`, `scene_hst_01` → `scene_toancanhSongTrau1` (tour.xml:349-350)

## ✅ GIAI ĐOẠN 4: TỐI ƯU — HOÀN THÀNH 100%
- [x] Task 4.0: Memory management (tween chain, maxmem=350)
- [x] Task 4.1: Minify CSS/JS (app.min.js, style.min.css — cần verify tồn tại)
- [x] Task 4.2: Preload strategy (đã tắt smart preload, lazy map init)
- [x] Task 4.3: Safe Area iOS (env() đầy đủ)
- [x] Task 4.4: Dev Tools ẩn (HTML comment)
- [x] Task 4.5: SEO nâng cao (Meta, JSON-LD, robots.txt, sitemap.xml)
- [x] Task 4.6: Domain URL cập nhật (canonical, OG, JSON-LD → 360.conghaiso.vn)
- [x] Task 4.8: Little Planet Transition, Back Button, QR Code, Progress Bar
- [x] Task 4.7: Google Analytics 4 (G-JVLBS3PE4V) — tracking: tour_start, scene_view
- [x] **BUG #6**: Thêm tọa độ GPS thật cho scene_venho và scene_cauvuotcaotoc (hiện lat/lng=0,0)
- [x] **BUG #7**: Sửa text "Ninh Thuận" → "Khánh Hòa" trong info_chualongcat (app.js:710)
- [x] OG image: đổi sang absolute URL `https://360.conghaiso.vn/core/assets/og-preview.png`

## 🟡 GIAI ĐOẠN 5: DEPLOYMENT — ~70%
- [x] Task 5.0: URL tuyệt đối đã cập nhật (360.conghaiso.vn)
- [x] Task 5.1: Server Ubuntu + HTTPS (Certbot) — **LIVE tại 360.conghaiso.vn**
- [x] Task 5.2: Kiểm thử cross-device (iOS Safari, Android Chrome, Desktop)
- [x] Task 5.3: Google Search Console + Submit Sitemap
- [x] Task 5.4: Verify cache headers (30d cho static assets)

## 🔴 GIAI ĐOẠN 6: KIỂM THỬ & NGHIỆM THU — 0%
- [ ] Task 6.1–6.6: Kiểm thử chức năng, responsive, hiệu năng, cross-browser, nghiệm thu

---