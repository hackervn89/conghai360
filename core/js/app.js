// ── Scene Data Registry ──────────────────────────────────────
// Grouped by location for the location switcher & thumbnail panel
const tourData = {
    toanCanh: {
        label: 'Toàn cảnh Công Hải',
        firstScene: 'scene_toancanhconghai',
        scenes: [
            { id: 'scene_toancanhconghai', title: 'Toàn cảnh Công Hải', thumb: 'tours/toanCanh/panos/toancanhconghai.tiles/thumb.jpg', lat: 11.781682, lng: 109.073644 },
            { id: 'scene_toancanhtrusoDanguy', title: 'Trụ sở Đảng uỷ', thumb: 'tours/toanCanh/panos/toancanhtrusoDanguy.tiles/thumb.jpg', lat: 11.836559, lng: 109.051182 },
            { id: 'scene_toancanhtrusoUBND', title: 'Trụ sở UBND', thumb: 'tours/toanCanh/panos/toancanhtrusoUBND.tiles/thumb.jpg', lat: 11.781356, lng: 109.072723 },
            { id: 'scene_cauvuotcaotoc', title: 'Cầu vượt Cao tốc', thumb: 'tours/toanCanh/panos/cauvuotcaotoc.tiles/thumb.jpg', lat: 11.790169158500257, lng: 109.06946122409393 },
        ]
    },
    chuaLongCat: {
        label: 'Chùa Long Cát',
        firstScene: 'scene_1-cong_chinh',
        scenes: [
            { id: 'scene_1-cong_chinh', title: 'Cổng chính', mapTitle: 'Chùa Long Cát', thumb: 'tours/chuaLongCat/panos/1-cong_chinh.tiles/thumb.jpg', lat: 11.777472, lng: 109.079204 },
            { id: 'scene_2-san_truoc', title: 'Sân trước', thumb: 'tours/chuaLongCat/panos/2-san_truoc.tiles/thumb.jpg' },
            { id: 'scene_3-san_truoc_2', title: 'Sân trước 2', thumb: 'tours/chuaLongCat/panos/3-san_truoc_2.tiles/thumb.jpg' },
            { id: 'scene_4-sanh_chinh', title: 'Sảnh chính', thumb: 'tours/chuaLongCat/panos/4-sanh_chinh.tiles/thumb.jpg' },
            { id: 'scene_5-sanh_chinh_trai', title: 'Sảnh chính trái', thumb: 'tours/chuaLongCat/panos/5-sanh_chinh_trai.tiles/thumb.jpg' },
            { id: 'scene_6-sanh_chinh_phai', title: 'Sảnh chính phải', thumb: 'tours/chuaLongCat/panos/6-sanh_chinh_phai.tiles/thumb.jpg' },
            { id: 'scene_7-santrai1', title: 'Sân trái', thumb: 'tours/chuaLongCat/panos/7-santrai1.tiles/thumb.jpg' },
            { id: 'scene_8-santrai2', title: 'Sân trái', thumb: 'tours/chuaLongCat/panos/8-santrai2.tiles/thumb.jpg' },
            { id: 'scene_9-hoavien1', title: 'Hoa viên', thumb: 'tours/chuaLongCat/panos/9-hoavien1.tiles/thumb.jpg' },
            { id: 'scene_10-hoavien2', title: 'Hoa viên', thumb: 'tours/chuaLongCat/panos/10-hoavien2.tiles/thumb.jpg' },
            { id: 'scene_11-sanhgiua', title: 'Sảnh giữa', thumb: 'tours/chuaLongCat/panos/11-sanhgiua.tiles/thumb.jpg' },
            { id: 'scene_12-sanphai1', title: 'Sân phải', thumb: 'tours/chuaLongCat/panos/12-sanphai1.tiles/thumb.jpg' },
            { id: 'scene_13-sanphai2', title: 'Sân phải', thumb: 'tours/chuaLongCat/panos/13-sanphai2.tiles/thumb.jpg' },
        ]
    },
    hoSongTrau: {
        label: 'Hồ Sông Trâu',
        firstScene: 'scene_toancanhSongTrau1',
        scenes: [
            { id: 'scene_toancanhSongTrau1', title: 'Toàn cảnh 1', mapTitle: 'Hồ Sông Trâu', thumb: 'tours/hoSongTrau/panos/toancanhSongTrau1.tiles/thumb.jpg', lat: 11.802333, lng: 109.067580 },
            { id: 'scene_toancanhSongTrau2', title: 'Toàn cảnh 2', mapTitle: 'Hồ Sông Trâu', thumb: 'tours/hoSongTrau/panos/toancanhSongTrau2.tiles/thumb.jpg', lat: 11.803806, lng: 109.069399 },
            { id: 'scene_HoSongTrau1', title: 'Hồ Sông Trâu', thumb: 'tours/hoSongTrau/panos/HoSongTrau1.tiles/thumb.jpg', lat: 11.803151, lng: 109.067367 },
            { id: 'scene_HoSongTrau2', title: 'Hồ Sông Trâu', thumb: 'tours/hoSongTrau/panos/HoSongTrau2.tiles/thumb.jpg', lat: 11.803151, lng: 109.067367 },
            { id: 'scene_longhoSongTrau6', title: 'Lòng hồ', mapTitle: 'Lòng hồ Sông Trâu', thumb: 'tours/hoSongTrau/panos/longhoSongTrau6.tiles/thumb.jpg', lat: 11.803305314467947, lng: 109.05795134393111 },
            { id: 'scene_venho', title: 'Ven hồ', thumb: 'tours/hoSongTrau/panos/venho.tiles/thumb.jpg', lat: 11.808347501061142, lng: 109.05587385980773 },

        ]
    },
    hoBaTri: {
        label: 'Hồ Ba Tri',
        firstScene: 'scene_HoBaTri1',
        scenes: [
            { id: 'scene_DaptranhoBaTri', title: 'Đập tràn', mapTitle: 'Đập tràn hồ Ba Tri', thumb: 'tours/hoBaTri/panos/DaptranhoBaTri.tiles/thumb.jpg', lat: 11.841424444857031, lng: 109.0472350732504 },
            { id: 'scene_HoBaTri1', title: 'Hồ Ba Tri', mapTitle: 'Hồ Ba Tri', thumb: 'tours/hoBaTri/panos/HoBaTri1.tiles/thumb.jpg', lat: 11.838482767445305, lng: 109.04671500410828 },
            { id: 'scene_LonghoBaTri1', title: 'Lòng hồ', mapTitle: 'Lòng hồ Ba Tri', thumb: 'tours/hoBaTri/panos/LonghoBaTri1.tiles/thumb.jpg', lat: 11.838225356843077, lng: 109.0464215692916 }
        ]
    },
    hoMaTrai: {
        label: 'Hồ Ma Trai',
        firstScene: 'scene_HoMaTrai1',
        scenes: [
            { id: 'scene_CauSongTrau1', title: 'Cầu tràn Đầu suối B', mapTitle: 'Cầu tràn Đầu suối B', thumb: 'tours/hoMaTrai/panos/CauSongTrau1.tiles/thumb.jpg', lat: 11.837734, lng: 109.056176 },
            { id: 'scene_DaptranMaTrai1', title: 'Đập tràn Hồ Ma Trai', mapTitle: 'Đập tràn Hồ Ma Trai', thumb: 'tours/hoMaTrai/panos/DaptranMaTrai1.tiles/thumb.jpg', lat: 11.830175, lng: 109.077935 },
            { id: 'scene_HoMaTrai1', title: 'Hồ Ma Trai', mapTitle: 'Hồ Ma Trai', thumb: 'tours/hoMaTrai/panos/HoMaTrai1.tiles/thumb.jpg', lat: 11.829506, lng: 109.074906 },
            { id: 'scene_LonghoMaTrai1', title: 'Lòng hồ 1', mapTitle: 'Lòng hồ Ma Trai', thumb: 'tours/hoMaTrai/panos/LonghoMaTrai1.tiles/thumb.jpg', lat: 11.830227, lng: 109.074498 },
        ]
    }
};

let currentTourKey = 'chuaLongCat';
let leafMap = null;
let radarMarker = null;
let mapMarkers = [];
let isMapInitializing = false;
let boundaryLayer = null;

// ── Chuyển sang Bảo Tàng 3D ──────────────────────────────────
function enterMuseum() {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:#0a0f1e;opacity:0;transition:opacity 0.6s;z-index:99999;pointer-events:none';
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = '1'; });
    setTimeout(() => { window.location.href = 'museum.html'; }, 650);
}

// History for Back Button
let sceneHistory = [];
let isBackNavigating = false;

// ── Startup ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    embedpano({
        swf: "engine/tour.swf",
        xml: "tour.xml",
        target: "pano",
        html5: "auto",
        mobilescale: 1.0,
        passQueryParameters: true,
        onready: krpanoReady
    });

    initUI();
});

// ── KrPano Ready ─────────────────────────────────────────────
function krpanoReady(krpano) {
    krpanoObj = krpano;

    // Loading Progress Check
    const progressInterval = setInterval(() => {
        if (!krpanoObj) return;
        const p = Number(krpanoObj.get("progress.progress")) || 0;
        const pPercent = Math.round(p * 100);

        const bar = document.getElementById('loading-progress');
        const text = document.getElementById('loading-text-percent');
        if (bar) bar.style.width = pPercent + '%';
        if (text) text.textContent = pPercent + '%';

        if (p >= 1.0) {
            clearInterval(progressInterval);
        }
    }, 50);

    // Hide KrPano's default skin UI (keep hotspots)
    const hideLayers = [
        'skin_control_bar', 'skin_control_bar_bg',
        'skin_scroll_window', 'skin_splitter_bottom',
        'skin_btn_prev_fs', 'skin_btn_next_fs', 'skin_title'
    ];
    hideLayers.forEach(name => {
        krpanoObj.call(`set(layer[${name}].visible, false);`);
    });

    // Hook: when scene changes, update Web UI
    krpanoObj.set("events.onnewscene", "js(onSceneChange());");

    // Hide loading screen: use onnewscene (fires when first scene is ready)
    // plus a safety timeout in case something goes wrong
    krpanoObj.set("events.onloadcomplete", "js(hideLoadingScreen());");
    setTimeout(hideLoadingScreen, 5000); // Safety fallback

    // Initial UI sync
    setTimeout(onSceneChange, 500);

    // ── DEV TOOL: Update live coordinates in UI ──
    setInterval(() => {
        if (krpanoObj) {
            let ath = Number(krpanoObj.get("view.hlookat"));
            let atv = Number(krpanoObj.get("view.vlookat"));

            // Normalize ath to -180...180 range
            ath = ((ath + 180) % 360 + 360) % 360 - 180;

            const el = document.getElementById('dev-live-coords');
            if (el) el.textContent = `ath: ${ath.toFixed(3)}, atv: ${atv.toFixed(3)}`;

            // Sync Radar rotation
            if (radarMarker) {
                const radarEl = document.querySelector('.map-radar');
                if (radarEl) radarEl.style.transform = `rotate(${ath}deg)`;
            }
        }
    }, 100);
}

// ── Scene Change Handler ─────────────────────────────────────
function onSceneChange() {
    if (!krpanoObj) return;

    const sceneId = krpanoObj.get("xml.scene");
    if (!sceneId) return;

    // Handle History for Back Button
    if (!isBackNavigating) {
        if (sceneHistory.length === 0 || sceneHistory[sceneHistory.length - 1] !== sceneId) {
            sceneHistory.push(sceneId);
        }
    }
    isBackNavigating = false;

    // GA4
    if (typeof gtag === 'function') {
        let sceneLabel = sceneId;
        for (const data of Object.values(tourData)) {
            const found = data.scenes.find(s => s.id === sceneId);
            if (found) { sceneLabel = `${data.label} - ${found.title}`; break; }
        }
        gtag('event', 'xem_canh', {
            event_category: 'dieu_huong',
            event_label: sceneLabel,
            scene_id: sceneId
        });
    }

    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
        btnBack.style.display = sceneHistory.length > 1 ? 'flex' : 'none';
    }

    // Update thumbnail active state
    document.querySelectorAll('.sidebar-thumb').forEach(card => {
        const isActive = card.dataset.scene === sceneId;
        card.classList.toggle('active', isActive);
        if (isActive) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });

    // Update accordion active state and Location Subtitle
    let activeSceneData = null;
    const titleEl = document.getElementById('current-scene-title');
    for (const [key, data] of Object.entries(tourData)) {
        const found = data.scenes.find(s => s.id === sceneId);
        if (found) {
            activeSceneData = found;
            if (currentTourKey !== key) {
                currentTourKey = key;
            }

            if (titleEl) titleEl.textContent = data.label;
            break;
        }
    }

    // Update Map
    if (leafMap && activeSceneData && activeSceneData.lat) {
        const pos = [activeSceneData.lat, activeSceneData.lng];
        leafMap.setView(pos, 16);
        if (radarMarker) radarMarker.setLatLng(pos);
    }

    // Auto-hide the sidebar when transitioning to a new scene
    const sidebar = document.getElementById('sidebar');
    const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    if (sidebar && !sidebar.classList.contains('hidden')) {
        // Delay slightly for a smoother transition feel
        setTimeout(() => {
            sidebar.classList.add('hidden');
            if (btnToggleSidebar) btnToggleSidebar.classList.remove('active');
        }, 150);
    }
}

// ── Loading → Intro → Tour Flow ─────────────────────────────
function hideLoadingScreen() {
    // Phase 1 → Phase 2: Hide spinner, show intro card
    const loadingScreen = document.getElementById('loading-screen');
    const loaderPhase = document.getElementById('loader-phase');
    const introPhase = document.getElementById('intro-phase');

    if (loaderPhase) loaderPhase.style.display = 'none';
    if (introPhase) introPhase.classList.remove('hidden');
    // Reveal panorama behind as blurred background
    if (loadingScreen) loadingScreen.classList.add('show-intro');
}

function startTour() {
    // Phase 2 → Tour: Fade out entire loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.classList.add('fade-out');

    // GA4
    if (typeof gtag === 'function') {
        gtag('event', 'bat_dau_tham_quan', { event_category: 'tuong_tac' });
    }

    // Scene preloading is intentionally disabled.
    // In KrPano 1.19, loadscene(..., PRELOAD) can still trigger an unwanted scene switch
    // in this project structure, so user-controlled navigation must take priority.
}

// ── Init UI ──────────────────────────────────────────────────
function initUI() {
    // Render Sidebar
    renderSidebar();
    initInfoModal();

    // Intro Screen: "Bắt đầu khám phá" button
    const btnStart = document.getElementById('btn-start-tour');
    if (btnStart) {
        btnStart.addEventListener('click', startTour);
    }

    // Sidebar menu toggle
    const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    if (btnToggleSidebar && sidebar) {
        btnToggleSidebar.addEventListener('click', function () {
            this.classList.toggle('active');
            sidebar.classList.toggle('hidden');
            const isOpening = !sidebar.classList.contains('hidden');
            if (isOpening && typeof gtag === 'function') {
                gtag('event', 'mo_danh_sach_canh', { event_category: 'tuong_tac' });
            }
        });
    }

    // Toggle nav bar
    const btnToggleNav = document.getElementById('btn-toggle-nav');
    if (btnToggleNav) {
        btnToggleNav.addEventListener('click', function () {
            this.classList.toggle('active');
            document.getElementById('nav-controls').classList.toggle('hidden');
        });
    }

    // QR Code for Desktop
    const qrEl = document.getElementById('desktop-qr');
    const qrImg = document.getElementById('qr-img');
    if (qrEl && qrImg && window.innerWidth > 1024) {
        const currentUrl = encodeURIComponent(window.location.href.split('#')[0]); // ignore hash
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currentUrl}`;
        qrEl.style.display = 'block';
    }

    // Autorotate
    let isAutorotate = false;
    const btnAuto = document.getElementById('btn-autorotate');
    if (btnAuto) {
        btnAuto.addEventListener('click', function () {
            if (!krpanoObj) return;
            isAutorotate = !isAutorotate;
            krpanoObj.set('autorotate.enabled', isAutorotate);
            this.classList.toggle('active', isAutorotate);
        });
    }

    // VR
    document.getElementById('btn-vr')?.addEventListener('click', () => {
        if (krpanoObj) krpanoObj.call("webvr.enterVR();");
        if (typeof gtag === 'function') gtag('event', 'vao_che_do_vr', { event_category: 'tinh_nang' });
    });

    // Fullscreen
    document.getElementById('btn-fullscreen')?.addEventListener('click', () => {
        if (krpanoObj) krpanoObj.call("switch(fullscreen);");
    });

    // Back Button logic
    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            if (sceneHistory.length > 1) {
                sceneHistory.pop();
                const prevScene = sceneHistory[sceneHistory.length - 1];
                isBackNavigating = true;
                krpanoObj.call(`skin_hidetooltips(); loadscene(${prevScene}, null, MERGE, BLEND(0.5));`);
                if (typeof gtag === 'function') gtag('event', 'quay_lai_canh_truoc', { event_category: 'dieu_huong' });
            }
        });
    }

    // Share Button
    document.getElementById('btn-share')?.addEventListener('click', () => {
        const url = window.location.href;
        if (typeof gtag === 'function') gtag('event', 'chia_se', { event_category: 'tuong_tac' });
        if (navigator.share) {
            navigator.share({
                title: 'Công Hải 360 - Du lịch Thực tế ảo',
                text: 'Khám phá vẻ đẹp xã Công Hải qua trải nghiệm 360 độ.',
                url: url
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url).then(() => {
                alert('Đã copy đường dẫn để chia sẻ!');
            });
        }
    });

    // Minimap Toggle — lazy init to keep intro/first pano smooth
    const btnToggleMap = document.getElementById('btn-toggle-map');
    const mapPanel = document.getElementById('map-panel');
    const mapHeader = document.getElementById('map-header');
    if (btnToggleMap && mapPanel) {
        // Start collapsed on all devices so Leaflet/map tiles don't compete with intro and first pano.
        mapPanel.classList.add('collapsed');

        const toggleMap = (event) => {
            // Ngăn chặn đóng/mở nếu bấm vào các nút chức năng bên trong header
            if (event && event.target.closest('button')) return;

            if (window.innerWidth <= 1024) {
                // Trên mobile, bấm vào header là phóng to luôn
                toggleMaximize();
            } else {
                mapPanel.classList.toggle('collapsed');
                if (!mapPanel.classList.contains('collapsed')) {
                    ensureMapInitialized();
                }
            }
        };

        btnToggleMap.addEventListener('click', (event) => {
            event.stopPropagation();
            mapPanel.classList.toggle('collapsed');
            if (!mapPanel.classList.contains('collapsed')) {
                ensureMapInitialized();
                if (typeof gtag === 'function') gtag('event', 'mo_ban_do', { event_category: 'tuong_tac' });
            }
        });

        if (mapHeader) {
            mapHeader.addEventListener('click', toggleMap);
        }

        // Maximize Map Logic
        const btnMaximize = document.getElementById('btn-maximize-map');
        const mapOverlay = document.getElementById('map-maximized-overlay');

        const toggleMaximize = (forceClose = false) => {
            if (forceClose) {
                mapPanel.classList.remove('maximized');
                mapPanel.classList.add('collapsed'); // Đồng thời ẩn luôn
            } else {
                const wasMaximized = mapPanel.classList.contains('maximized');
                mapPanel.classList.toggle('maximized');

                // Nếu đang từ to chuyển về nhỏ -> ẩn luôn bản đồ
                if (wasMaximized) {
                    mapPanel.classList.add('collapsed');
                } else {
                    mapPanel.classList.remove('collapsed');
                }
            }

            const isMaximized = mapPanel.classList.contains('maximized');

            // Toggle Overlay
            if (mapOverlay) {
                mapOverlay.style.display = isMaximized ? 'block' : 'none';
            }

            if (btnMaximize) {
                btnMaximize.innerHTML = isMaximized
                    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" /></svg>`
                    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>`;
                btnMaximize.title = isMaximized ? "Thu nhỏ bản đồ" : "Phóng to bản đồ";
            }

            ensureMapInitialized();

            setTimeout(() => {
                if (leafMap) {
                    leafMap.invalidateSize({ pan: true });

                    // Sử dụng setView để cố định vị trí và độ phóng đại theo ý muốn
                    if (isMaximized) {
                        // Tọa độ [Vĩ độ, Kinh độ], Mức Zoom (Số càng lớn càng to)
                        leafMap.setView([11.7946, 109.0919], 13, {
                            animate: true
                        });
                    }
                }
            }, 550);
        };

        if (btnMaximize) {
            btnMaximize.addEventListener('click', (event) => {
                event.stopPropagation();
                toggleMaximize();
            });
        }

        if (mapOverlay) {
            mapOverlay.addEventListener('click', () => toggleMaximize(true));
        }

        // Close map when clicking outside (Desktop & Mobile)
        document.addEventListener('mousedown', (event) => {
            // Nếu bản đồ đang mở (không collapsed) hoặc đang phóng to (maximized)
            const isMaximized = mapPanel.classList.contains('maximized');
            const isExpanded = !mapPanel.classList.contains('collapsed');

            if (isMaximized || isExpanded) {
                // Kiểm tra nếu click không nằm trong mapPanel và không nằm trong các nút điều khiển quan trọng
                if (!mapPanel.contains(event.target) && !event.target.closest('.icon-btn') && !event.target.closest('.sidebar-wrapper')) {
                    if (isMaximized) {
                        toggleMaximize(true);
                    } else {
                        mapPanel.classList.add('collapsed');
                    }
                }
            }
        });
    }


    // ── DEV TOOL: Copy coordinates via Button ────────────────────────
    const btnDevCoords = document.getElementById('btn-dev-coords');
    if (btnDevCoords) {
        btnDevCoords.addEventListener('click', () => {
            if (!krpanoObj) return;

            // Native view coordinates ARE the screen center
            let ath = Number(krpanoObj.get("view.hlookat"));
            let atv = Number(krpanoObj.get("view.vlookat"));

            // Normalize ath to -180...180 range
            ath = ((ath + 180) % 360 + 360) % 360 - 180;

            const copyText = `ath="${ath.toFixed(3)}" atv="${atv.toFixed(3)}"`;
            console.log(`[Dev Tool] ${copyText}`);

            // Success handler for UI feedback
            const showSuccess = () => {
                const originalText = btnDevCoords.innerHTML;
                btnDevCoords.style.background = "#48bb78"; // Green feedback
                btnDevCoords.innerHTML = "✅ Đã copy tọa độ!";
                setTimeout(() => {
                    btnDevCoords.style.background = "";
                    btnDevCoords.innerHTML = originalText;
                }, 1500);
            };

            // Modern Clipboard API (Requires HTTPS or localhost)
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(copyText).then(showSuccess).catch(err => {
                    fallbackCopyText(copyText, showSuccess);
                });
            } else {
                // Fallback for HTTP / IP addresses
                fallbackCopyText(copyText, showSuccess);
            }
        });
    }

    // ── DEV TOOL: Copy View via Button ──────────────────────────────
    const btnDevView = document.getElementById('btn-dev-view');
    if (btnDevView) {
        btnDevView.addEventListener('click', () => {
            if (!krpanoObj) return;

            let hlookat = Number(krpanoObj.get("view.hlookat")).toFixed(3);
            let vlookat = Number(krpanoObj.get("view.vlookat")).toFixed(3);
            let fov = Number(krpanoObj.get("view.fov")).toFixed(3);

            const copyText = `hlookat="${hlookat}" vlookat="${vlookat}" fov="${fov}"`;
            console.log(`[Dev Tool] Copy View: ${copyText}`);

            const showSuccess = () => {
                const originalText = btnDevView.innerHTML;
                btnDevView.style.background = "#fff";
                btnDevView.innerHTML = "✅ Đã copy view!";
                setTimeout(() => {
                    btnDevView.style.background = "";
                    btnDevView.innerHTML = originalText;
                }, 1500);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(copyText).then(showSuccess).catch(() => {
                    fallbackCopyText(copyText, showSuccess);
                });
            } else {
                fallbackCopyText(copyText, showSuccess);
            }
        });
    }

    /**
     * Fallback copy method for insecure contexts (HTTP over IP)
     */
    function fallbackCopyText(text, callback) {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Ensure the textarea is not visible but part of the DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful && callback) callback();
        } catch (err) {
            alert(`Lỗi: Không thể tự động copy. Tọa độ của bạn là:\n${text}`);
        }

        document.body.removeChild(textArea);
    }
}

// ── Map Logic ────────────────────────────────────────────────
function ensureMapInitialized() {
    if (leafMap || isMapInitializing) return;

    isMapInitializing = true;

    // Leaflet is loaded with defer/non-critical priority. If the user opens the
    // map before it is ready, retry briefly instead of blocking initial load.
    if (!window.L) {
        setTimeout(() => {
            isMapInitializing = false;
            ensureMapInitialized();
        }, 200);
        return;
    }

    initMap();
    isMapInitializing = false;
    setTimeout(() => leafMap.invalidateSize(), 50);
    onSceneChange();
}

function initMap() {
    // Default center (UBND Công Hải)
    leafMap = L.map('map-container', {
        zoomControl: false,
        attributionControl: false
    }).setView([11.7818, 109.0738], 15);

    // Premium Satellite Imagery (Esri World Imagery)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19
    }).addTo(leafMap);

    // Optional labels overlay
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
        opacity: 0.6
    }).addTo(leafMap);

    // Load Administrative Boundary (Commune)
    fetch('core/data/conghai-boundary.json')
        .then(response => response.json())
        .then(data => {
            boundaryLayer = L.geoJSON(data, {
                style: {
                    color: '#FFD700', // Vàng Gold
                    weight: 2,        // Thanh mảnh hơn
                    opacity: 0.8,
                    fillColor: '#FFD700',
                    fillOpacity: 0.08, // Trong suốt hơn
                    dashArray: '8, 8',
                    lineJoin: 'round'
                }
            }).addTo(leafMap);
        })
        .catch(err => console.error('Error loading boundary GeoJSON:', err));

    // Radar Marker
    const radarIcon = L.divIcon({
        className: 'map-radar-wrapper',
        html: '<div class="map-radar"></div>',
        iconSize: [0, 0]
    });
    radarMarker = L.marker([11.7818, 109.0738], { icon: radarIcon }).addTo(leafMap);

    // Add Markers for all scenes that have coordinates
    const glowingIcon = L.divIcon({
        className: 'glowing-marker-wrapper',
        html: '<div class="glowing-marker"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    Object.values(tourData).forEach(group => {
        group.scenes.forEach(scene => {
            if (scene.lat) {
                const marker = L.marker([scene.lat, scene.lng], { icon: glowingIcon }).addTo(leafMap);

                // Thêm nhãn tên vị trí khi di chuột vào (Ưu tiên mapTitle nếu có)
                marker.bindTooltip(scene.mapTitle || scene.title, {
                    direction: 'top',
                    offset: [0, -10],
                    className: 'custom-map-tooltip'
                });

                marker.on('click', (e) => {
                    if (krpanoObj) {
                        krpanoObj.call(`loadscene('${scene.id}', null, MERGE, BLEND(0.5))`);

                        // Tự động đóng bản đồ khi đã chọn xong địa điểm
                        const mapPanel = document.getElementById('map-panel');
                        const mapOverlay = document.getElementById('map-maximized-overlay');
                        const btnMaximize = document.getElementById('btn-maximize-map');

                        if (mapPanel) {
                            mapPanel.classList.add('collapsed');
                            mapPanel.classList.remove('maximized');
                        }
                        if (mapOverlay) mapOverlay.style.display = 'none';

                        // Cập nhật lại icon nút phóng to nếu cần
                        if (btnMaximize) {
                            btnMaximize.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>`;
                        }
                    }
                });

                mapMarkers.push({ id: scene.id, marker });
            }
        });
    });
}

// ── Render Sidebar ───────────────────────────────────────────
function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.innerHTML = '';

    for (const [key, data] of Object.entries(tourData)) {
        const group = document.createElement('div');
        // By default, collapse all
        const isCollapsed = 'collapsed';
        group.className = `tour-group ${isCollapsed}`;
        group.id = `group-${key}`;

        const title = document.createElement('div');
        title.className = 'tour-title';

        // Icon mapping based on group key
        const iconMap = {
            'toanCanh': 'fa-solid fa-map-location-dot',
            'chuaLongCat': 'fa-solid fa-vihara',
            'hoSongTrau': 'fa-solid fa-mountain-sun',
            'hoBaTri': 'fa-solid fa-water',
            'hoMaTrai': 'fa-solid fa-water'
        };
        const iconClass = iconMap[key] || 'fa-solid fa-location-dot';

        title.innerHTML = `
            <div class="title-icon"><i class="${iconClass}"></i></div>
            <div class="title-text">${data.label}</div>
        `;

        title.addEventListener('click', () => {
            const isCurrentlyCollapsed = group.classList.contains('collapsed');
            // Đóng tất cả các nhóm
            document.querySelectorAll('.tour-group').forEach(g => {
                g.classList.add('collapsed');
            });
            // Mở nhóm được click nếu ban đầu nó đang đóng
            if (isCurrentlyCollapsed) {
                group.classList.remove('collapsed');
            }
        });

        const scenesContainer = document.createElement('div');
        scenesContainer.className = 'tour-scenes';

        data.scenes.forEach(scene => {
            const thumb = document.createElement('div');
            thumb.className = 'sidebar-thumb';
            thumb.dataset.scene = scene.id;
            thumb.title = scene.title;
            thumb.innerHTML = `
                <img src="${scene.thumb}" alt="${scene.title}" loading="lazy">
                <div class="thumb-label">${scene.title}</div>
            `;
            thumb.addEventListener('click', () => {
                if (krpanoObj) {
                    krpanoObj.call(`loadscene('${scene.id}', null, MERGE, BLEND(0.5))`);
                }
            });
            scenesContainer.appendChild(thumb);
        });

        group.appendChild(title);
        group.appendChild(scenesContainer);
        sidebar.appendChild(group);
    }
}

// ── Info Modal Logic ───────────────────────────────────────────
const infoData = {
    "info_chualongcat": {
        title: "Chùa Long Cát",
        content: `
            <p><strong>Chùa Long Cát</strong> là một trung tâm văn hóa tâm linh và thiện nguyện tiêu biểu tại xã Công Hải, tỉnh Khánh Hoà. Sau đợt đại trùng tu kéo dài 5 năm, ngôi chùa hiện nay đã có diện mạo khang trang, đáp ứng tốt hơn nhu cầu tu học của chư Ni và Phật tử địa phương.</p>
            
            <h3>1. Lịch sử hình thành và phát triển</h3>
            <ul>
                <li><strong>Niên đại:</strong> Ngôi chùa được chư Tổ khai sơn cách đây gần 100 năm.</li>
                <li><strong>Trùng tu:</strong> Trải qua 3 lần trùng tu trong lịch sử nhưng do tác động của thời gian, chùa từng bị xuống cấp nghiêm trọng. Ngày 20/03/2018, chùa đã tổ chức lễ đặt đá tái thiết.</li>
                Sau hơn 5 năm xây dựng, vào ngày 07/07/2024 (nhằm ngày 2/6 Giáp Thìn), chùa đã long trọng tổ chức Đại lễ khánh tạ Tam bảo và Húy nhật Tổ sư khai sơn lần thứ 65.</li>
                <li><strong>Chủ trì:</strong> Sư cô Thích Nữ Đức Thịnh.</li>
            </ul>

            <h3>2. Điểm sáng về Giáo dục: Lớp học tình thương</h3>
            <p>Đây là hoạt động nhân văn tiêu biểu nhất của chùa, được duy trì bền bỉ từ năm 2002 nhằm giúp trẻ em nghèo, đặc biệt là con em đồng bào dân tộc Raglai xóa mù chữ.</p>
            <ul>
                <li><strong>Quy mô:</strong> Thu hút từ 150 đến gần 200 học sinh theo học mỗi năm.</li>
                <li><strong>Nội dung hỗ trợ:</strong> Giảng dạy chương trình giáo dục tiểu học quốc gia với sự hỗ trợ của các giáo viên thiện nguyện từ Trường Tiểu học xã Công Hải. Nhà chùa cung cấp miễn phí sách vở, bút mực, quần áo, giày dép và phục vụ ăn uống tại chỗ cho các em.</li>
                <li><strong>Thời gian học:</strong> Thường diễn ra từ 17:30 đến 19:30 vào các tối thứ Hai, thứ Ba và thứ Năm hàng tuần.</li>
            </ul>

            <h3>3. Hoạt động An sinh xã hội khác</h3>
            <p>Bên cạnh giáo dục, chùa Long Cát còn thực hiện nhiều công tác từ thiện thiết thực:</p>
            <ul>
                <li><strong>Xây dựng nhà tình thương:</strong> Phối hợp cùng chính quyền địa phương và các nhà hảo tâm xây dựng ít nhất 7 ngôi nhà tình nghĩa cho hộ nghèo (tính đến năm 2022).</li>
                <li><strong>Chăm sóc sức khỏe:</strong> Từng duy trì phòng thuốc từ thiện để hỗ trợ bà con nghèo trong vùng.</li>
                <li><strong>Gắn kết cộng đồng:</strong> Là nơi tổ chức các đại lễ lớn như Vu Lan Báo Hiếu, thu hút đông đảo bà con dân tộc và Phật tử tham dự, góp phần củng cố khối đại đoàn kết tôn giáo và dân tộc.</li>
            </ul>
        `
    },
    "info_hosongtrau": {
        title: "Hồ Sông Trâu — Viên ngọc giữa núi rừng Công Hải",
        content: `
            <p><strong>Hồ Sông Trâu</strong> là một trong những hồ chứa nước ngọt lớn nhất tỉnh Ninh Thuận, nằm tại xã Công Hải, huyện Thuận Bắc — cách trung tâm Phan Rang khoảng 32 km về phía Bắc. Với <strong>tổng dung tích thiết kế khoảng 31–32 triệu m³</strong>, hồ đóng vai trò sống còn trong việc trữ nước, điều tiết nguồn nước tưới tiêu nông nghiệp và cung cấp nước sinh hoạt cho cư dân toàn vùng.</p>

            <h3>🏞️ Vẻ đẹp thiên nhiên</h3>
            <p>Lòng hồ rộng mênh mông, được bao bọc bởi những dãy núi xanh trùng điệp, tạo nên một bức tranh phong cảnh vừa <strong>hùng vĩ</strong> vừa <strong>thơ mộng</strong>. Đến đây vào sáng sớm hay chiều muộn, du khách sẽ bắt gặp những khoảnh khắc mặt hồ phẳng lặng phản chiếu bầu trời — đẹp đến nao lòng.</p>

            <h3>🎯 Trải nghiệm không thể bỏ lỡ</h3>
            <ul>
                <li>🏕️ <strong>Cắm trại qua đêm</strong> — Dựng lều bên bờ hồ, đốt lửa trại dưới bầu trời đầy sao.</li>
                <li>🥾 <strong>Trekking</strong> — Khám phá các cung đường mòn ven hồ xuyên qua rừng tự nhiên.</li>
                <li>🎣 <strong>Câu cá</strong> — Thư giãn bên mặt nước yên bình, tận hưởng nhịp sống chậm rãi.</li>
                <li>☕ <strong>Thưởng cà phê giữa thiên nhiên</strong> — Tìm một góc yên tĩnh, pha ly cà phê nóng, nghe nhạc và hoà mình vào không gian tĩnh lặng.</li>
            </ul>

            <h3>💡 Thông tin hữu ích</h3>
            <ul>
                <li><strong>Vị trí:</strong> Xã Công Hải, tỉnh Khánh Hoà.</li>
                <li><strong>Khoảng cách:</strong> ~32 km từ Phường Phan Rang, tỉnh Khánh Hoà</li>
                <li><strong>Chức năng chính:</strong> Trữ nước, điều tiết nguồn nước, tưới tiêu nông nghiệp và sinh hoạt.</li>
                <li><strong>Dung tích:</strong> 31–32 triệu m³.</li>
            </ul>

            <p><em>Dù bạn là người yêu thiên nhiên, thích phiêu lưu hay chỉ đơn giản muốn tìm một nơi yên bình để nghỉ ngơi — Hồ Sông Trâu sẽ là một kỷ niệm đáng nhớ trong hành trình khám phá vùng đất Công Hải.</em></p>
        `
    }
};

function initInfoModal() {
    const overlay = document.getElementById('info-modal-overlay');
    const btnClose = document.getElementById('btn-close-modal');

    if (btnClose) {
        btnClose.addEventListener('click', closeInfoModal);
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeInfoModal();
            }
        });
    }
}

// Global function to be called from KrPano
window.openInfoModal = function (infoId) {
    const overlay = document.getElementById('info-modal-overlay');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');

    if (!overlay || !titleEl || !bodyEl) return;

    const data = infoData[infoId];
    if (data) {
        titleEl.innerHTML = data.title;
        bodyEl.innerHTML = data.content;
        overlay.classList.remove('hidden');
        if (typeof gtag === 'function') {
            gtag('event', 'mo_thong_tin', {
                event_category: 'noi_dung',
                event_label: data.title,
                info_id: infoId
            });
        }
    } else {
        console.warn('Info data not found for id:', infoId);
    }
};

function closeInfoModal() {
    const overlay = document.getElementById('info-modal-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

