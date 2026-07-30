// Generate sprite sheet for white custom arrow
const fs = require('fs');
const path = require('path');

const FRAME_W = 120;
const FRAME_H = 250;
const FRAMES = 24;

const POS_BOTTOM = 130;
const POS_MIDDLE = 70;
const POS_TOP = 15;

const USER_POLYGON = `<polyline fill="rgba(255, 0, 0, 0.95)" points="341.66,0 683.32,222.63 683.32,378.85 341.66,160.56 -0,383.98 -0,223.42 341.66,0 "/>`;

function drawCustomArrow(cx, tipY, isGhost, opacity = 1.0) {
    const transform = `translate(${cx}, ${tipY}) scale(0.035, 0.3) translate(-341.66, 0)`;

    if (isGhost) {
        return `
        <g transform="${transform}" opacity="${opacity}">
            ${USER_POLYGON}
        </g>`;
    } else {
        return `
        <g filter="url(#ds)" transform="${transform}">
            ${USER_POLYGON}
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
const outPath = path.join(outDir, 'hotspot_custom.svg');

fs.writeFileSync(outPath, svg, 'utf8');
console.log(`Created: ${FRAMES} frames, ${totalW}x${FRAME_H}px, frame ${FRAME_W}x${FRAME_H} at ${outPath}`);
