// Generate Panoee-style sprite sheet with Perspective Scaling and STATIC GHOSTS
const fs = require('fs');
const path = require('path');

const FRAME_W = 120;
const FRAME_H = 250;
const FRAMES = 24;

// Travel path
const POS_BOTTOM = 130;
const POS_TOP = 20;
const POS_MIDDLE = 85;

// Perspective Scale
const SCALE_CLOSE = 1.1;
const SCALE_FAR = 0.65;

// Chevron geometry (Wide & Sleek)
const CHEVRON_POINTS = "50,0 100,25 85,35 50,15 15,35 0,25 50,0";

function drawPanoeeArrow(cx, tipY, isGhost, opacity = 1.0, currentScale = 1.0) {
  // sx=0.7 (Sharper), sy=2.6 (Longer)
  const sx = currentScale * 0.7;
  const sy = currentScale * 2.6;
  const transform = `translate(${cx}, ${tipY}) scale(${sx}, ${sy}) translate(-50, 0)`;

  if (isGhost) {
    return `
        <polyline points="${CHEVRON_POINTS}" fill="none" stroke="#ED2F5A" stroke-width="3" 
                  filter="url(#ds)" transform="${transform}" opacity="${opacity}" />`;
  } else {
    return `
        <polygon points="${CHEVRON_POINTS}" fill="url(#id0)" filter="url(#ds)" 
                 transform="${transform}" opacity="${opacity}" />`;
  }
}

function lerp(a, b, t) { return a + (b - a) * t; }

let frames = [];

for (let i = 0; i < FRAMES; i++) {
  const fx = i * FRAME_W;
  const cx = fx + FRAME_W / 2;
  let elements = [];

  // Animation cycle
  if (i <= 18) {
    // 1. GLIDE PHASE (0-18)
    const t = i / 18;
    const arrowY = lerp(POS_BOTTOM, POS_TOP, t);
    const arrowScale = lerp(SCALE_CLOSE, SCALE_FAR, t);

    // Ghost 1: Starts fading at frame 12
    if (i > 2) {
      let g1Op = 0.8;
      if (i >= 12) g1Op = (0.8 * (1 - (i - 12) / 10)).toFixed(2); // Fades 12-22
      elements.push(drawPanoeeArrow(cx, POS_BOTTOM, true, g1Op, SCALE_CLOSE));
    }

    // Ghost 2: Appears from frame 10, starts fading at frame 18
    if (i > 10) {
      let g2Op = 0.65;
      if (i >= 18) g2Op = (0.65 * (1 - (i - 18) / 4)).toFixed(2); // Fades 18-22
      elements.push(drawPanoeeArrow(cx, POS_TOP + 45, true, g2Op, lerp(SCALE_CLOSE, SCALE_FAR, 0.6)));
    }

    // Main Arrow (ON TOP)
    elements.push(drawPanoeeArrow(cx, arrowY, false, 1.0, arrowScale));
  } else if (i <= 22) {
    // 2. PAUSE PHASE (19-22) - Stay at top for 4 frames
    const g1Op = (0.8 * (1 - (i - 12) / 10)).toFixed(2);
    const g2Op = (0.65 * (1 - (i - 18) / 4)).toFixed(2);

    if (g1Op > 0) elements.push(drawPanoeeArrow(cx, POS_BOTTOM, true, g1Op, SCALE_CLOSE));
    if (g2Op > 0) elements.push(drawPanoeeArrow(cx, POS_TOP + 45, true, g2Op, lerp(SCALE_CLOSE, SCALE_FAR, 0.6)));

    // Main Arrow stays solid at Top
    elements.push(drawPanoeeArrow(cx, POS_TOP, false, 1.0, SCALE_FAR));
  } else {
    // 3. REST PHASE (23) - Only one frame of rest
  }

  frames.push(elements.join('\n  '));
}

const totalW = FRAMES * FRAME_W;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${FRAME_H}" width="${totalW}" height="${FRAME_H}">
  <defs>
    <linearGradient id="id0" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ED2F5A" />
      <stop offset="50%" stop-color="#F47D93" />
      <stop offset="100%" stop-color="#FACBCC" />
    </linearGradient>
    <filter id="ds">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
      <feOffset in="blur" dx="0" dy="2" result="offsetBlur"/>
      <feMerge><feMergeNode in="offsetBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  ${frames.join('\n  ')}
</svg>`;

const outDir = path.join(__dirname, '../../engine/skin');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, { recursive: true }); }
const outPath = path.join(outDir, 'hotspot_pro.svg');

fs.writeFileSync(outPath, svg, 'utf8');
console.log(`Created Panoee Style (Static Trail): ${FRAMES} frames, ${totalW}x${FRAME_H}px at ${outPath}`);
