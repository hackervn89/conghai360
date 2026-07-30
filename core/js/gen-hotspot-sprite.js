// Generate sprite sheet - CONTINUOUS motion, no pauses
const fs = require('fs');
const path = require('path');

const FRAME_W = 120;
const FRAME_H = 250;
const FRAMES = 24;

// Positions for the top tip of the leading chevron
const POS_BOTTOM = 130;
const POS_MIDDLE = 70;
const POS_TOP = 15;

const USER_POLYGONS = `
   <polygon class="fil5" points="7.34,101.17 -0,107.9 -0,62.78 7.34,56.05 "/>
   <polygon class="fil5" points="19.38,90.13 12.04,96.86 12.04,51.74 19.38,45.01 "/>
   <polygon class="fil5" points="31.42,78.86 24.08,85.59 24.08,40.47 31.42,33.74 "/>
   <polygon class="fil5" points="43.46,67.82 36.12,74.55 36.12,29.43 43.46,22.7 "/>
   <polygon class="fil5" points="55.5,56.77 48.16,63.51 48.16,18.39 55.5,11.65 "/>
   <polygon class="fil5" points="80.92,55.55 88.25,62.29 88.25,18.39 80.92,11.65 "/>
   <polygon class="fil5" points="92.96,66.6 100.3,73.33 100.3,29.43 92.96,22.7 "/>
   <polygon class="fil5" points="105,77.64 112.34,84.38 112.34,40.47 105,33.74 "/>
   <polygon class="fil5" points="117.04,88.69 124.38,95.42 124.38,51.52 117.04,44.79 "/>
   <polygon class="fil5" points="129.08,99.73 136.42,106.46 136.42,62.56 129.08,55.83 "/>
   <polygon class="fil5" points="68.21,45.12 60.61,52.09 60.61,6.97 68.21,0 75.81,6.97 75.81,52.09 "/>
`;

function drawCustomArrow(cx, tipY, isGhost, opacity = 1.0) {
    // scale(0.3, 0.8) provides a sharp width (~40px) and long height (~86px)
    // translate(-68.21, 0) aligns the chóp nhọn of muitendopro.svg
    const transform = `translate(${cx}, ${tipY}) scale(0.3, 0.8) translate(-68.21, 0)`;

    if (isGhost) {
        // Solid faded ghost effect
        return `
        <g transform="${transform}" opacity="${opacity}">
            ${USER_POLYGONS}
        </g>`;
    } else {
        return `
        <g filter="url(#ds)" transform="${transform}">
            ${USER_POLYGONS}
        </g>`;
    }
}

function lerp(a, b, t) { return a + (b - a) * t; }

let frames = [];

for (let i = 0; i < FRAMES; i++) {
    const fx = i * FRAME_W;
    let elements = [];
    const cx = fx + FRAME_W / 2;

    if (i < 14) {
        const t = i / 13;
        const arrowY = lerp(POS_BOTTOM, POS_TOP, t);
        elements.push(drawCustomArrow(cx, arrowY, false));

        if (t > 0.25) {
            const ghostOp = Math.min(0.5, (t - 0.25) * 2);
            elements.push(drawCustomArrow(cx, POS_BOTTOM, true, ghostOp.toFixed(2)));
        }
        if (t > 0.55) {
            const ghostOp = Math.min(0.5, (t - 0.55) * 2.5);
            elements.push(drawCustomArrow(cx, POS_MIDDLE, true, ghostOp.toFixed(2)));
        }
    } else if (i < 17) {
        elements.push(drawCustomArrow(cx, POS_TOP, false));
        elements.push(drawCustomArrow(cx, POS_MIDDLE, true, 0.5));
        elements.push(drawCustomArrow(cx, POS_BOTTOM, true, 0.5));
    } else if (i < 22) {
        const t = (i - 17) / 4;
        const solidFade = lerp(1.0, 0, t);
        const ghostFade = lerp(0.5, 0, t);
        if (solidFade > 0.05) elements.push(drawCustomArrow(cx, POS_TOP, true, solidFade.toFixed(2)));
        if (ghostFade > 0.05) {
            elements.push(drawCustomArrow(cx, POS_MIDDLE, true, ghostFade.toFixed(2)));
            elements.push(drawCustomArrow(cx, POS_BOTTOM, true, ghostFade.toFixed(2)));
        }
    }
    frames.push(elements.join('\n  '));
}

const totalW = FRAMES * FRAME_W;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${FRAME_H}" width="${totalW}" height="${FRAME_H}">
  <defs>
  <style type="text/css">
   <![CDATA[
    .fil5 {fill:url(#id0)}    
   ]]>
  </style>
  <linearGradient id="id0" gradientUnits="userSpaceOnUse" x1="84.58" y1="62.29" x2="84.58" y2="11.65">
   <stop offset="0" style="stop-opacity:1; stop-color:#FACBCC"/>
   <stop offset="0.490196" style="stop-opacity:1; stop-color:#F47D93"/>
   <stop offset="1" style="stop-opacity:1; stop-color:#ED2F5A"/>
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
console.log(`Created: ${FRAMES} frames, ${totalW}x${FRAME_H}px, frame ${FRAME_W}x${FRAME_H} at ${outPath}`);
