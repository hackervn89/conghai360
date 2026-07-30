const fs = require('fs');
const path = require('path');

const srcPath = process.argv[2];
const targetName = process.argv[3];

if (!srcPath || !targetName) {
    console.log("\n❌ LỖI: Thiếu tham số.");
    console.log("👉 Cách dùng: node sync.js <đường_dẫn_file_nháp> <tên_thư_mục_chính>");
    console.log("👉 Ví dụ: node sync.js \"Hồ Sông Trâu\\vtour\\tour.xml\" hoSongTrau\n");
    process.exit(1);
}

const destPath = path.join(__dirname, 'tours', targetName, 'scenes.xml');

if (!fs.existsSync(srcPath)) {
    console.error("❌ Không tìm thấy file nháp: " + srcPath);
    process.exit(1);
}
if (!fs.existsSync(destPath)) {
    console.error("❌ Không tìm thấy file chính: " + destPath);
    process.exit(1);
}

console.log(`⏳ Đang đồng bộ từ: ${srcPath} -> ${destPath}...`);

let srcContent = fs.readFileSync(srcPath, 'utf8');
let destContent = fs.readFileSync(destPath, 'utf8');

// Hàm trích xuất các scene
const sceneRegex = /<scene\s+name="([^"]+)"[^>]*>([\s\S]*?)<\/scene>/g;

let srcScenes = {};
let match;
while ((match = sceneRegex.exec(srcContent)) !== null) {
    srcScenes[match[1]] = match[2];
}

let syncCount = 0;

// Lặp qua file đích để thay thế hotspot
destContent = destContent.replace(/<scene\s+name="([^"]+)"([^>]*)>([\s\S]*?)<\/scene>/g, (fullMatch, sceneName, sceneAttrs, sceneBody) => {
    if (!srcScenes[sceneName]) return fullMatch;

    const srcBody = srcScenes[sceneName];
    
    // 1. Trích xuất tất cả hotspot cũ từ ĐÍCH để lưu trữ toàn bộ thuộc tính
    const hsRegex = /<hotspot\s+([^>]+)\/?>/g;
    let destHotspots = {};
    let hsMatch;
    while ((hsMatch = hsRegex.exec(sceneBody)) !== null) {
        const fullTag = hsMatch[0];
        const attrPart = hsMatch[1];
        const nameMatch = attrPart.match(/name="([^"]+)"/);
        if (nameMatch) {
            const name = nameMatch[1];
            // Lưu lại object chứa tất cả thuộc tính hiện có
            let attrs = {};
            const attrRegex = /([a-z0-9_]+)="([^"]*)"/gi;
            let aMatch;
            while ((aMatch = attrRegex.exec(attrPart)) !== null) {
                attrs[aMatch[1]] = aMatch[2];
            }
            destHotspots[name] = attrs;
        }
    }

    // 2. Trích xuất hotspot từ NHÁP và thực hiện MERGE
    let finalHotspots = [];
    while ((hsMatch = hsRegex.exec(srcBody)) !== null) {
        const attrPart = hsMatch[1];
        const nameMatch = attrPart.match(/name="([^"]+)"/);
        if (!nameMatch) continue;
        
        const name = nameMatch[1];
        
        // Lấy thuộc tính từ NHÁP (chủ yếu lấy ath, atv, linkedscene)
        let srcAttrs = {};
        const attrRegex = /([a-z0-9_]+)="([^"]*)"/gi;
        let aMatch;
        while ((aMatch = attrRegex.exec(attrPart)) !== null) {
            srcAttrs[aMatch[1]] = aMatch[2];
        }

        let mergedAttrs = {};

        if (destHotspots[name]) {
            // Nếu đã tồn tại ở đích: 
            // ƯU TIÊN ĐÍCH cho Style và Metadata, ƯU TIÊN NHÁP cho Vị trí
            mergedAttrs = { ...destHotspots[name] };
            
            // Cập nhật vị trí và đích đến từ nháp
            if (srcAttrs.ath) mergedAttrs.ath = srcAttrs.ath;
            if (srcAttrs.atv) mergedAttrs.atv = srcAttrs.atv;
            if (srcAttrs.linkedscene) mergedAttrs.linkedscene = srcAttrs.linkedscene;
            
            // Xóa style mặc định của krpano nếu đích đang dùng style riêng
            if (mergedAttrs.style && mergedAttrs.style !== 'skin_hotspotstyle' && srcAttrs.style === 'skin_hotspotstyle') {
                // Giữ style của đích
            } else if (srcAttrs.style) {
                mergedAttrs.style = srcAttrs.style;
            }
        } else {
            // Hotspot mới hoàn toàn từ nháp
            mergedAttrs = srcAttrs;
        }

        // Chuyển object thuộc tính thành chuỗi tag
        let attrString = Object.entries(mergedAttrs)
            .map(([k, v]) => `${k}="${v}"`)
            .join(" ");
        
        finalHotspots.push(`\t\t<hotspot ${attrString} />`);
        syncCount++;
    }

    // 3. Tạo body mới cho scene (giữ lại các thẻ không phải hotspot như view, image, v.v.)
    let newSceneBody = sceneBody.replace(/[\t ]*<hotspot\s+[^>]*\/>\n?/g, '').trimEnd();
    if (finalHotspots.length > 0) {
        newSceneBody += "\n" + finalHotspots.join("\n") + "\n\t";
    }

    return `<scene name="${sceneName}"${sceneAttrs}>${newSceneBody}</scene>`;
});

fs.writeFileSync(destPath, destContent, 'utf8');
console.log(`✅ Đã đồng bộ thành công ${syncCount} hotspot! (Vẫn giữ nguyên các style tùy chỉnh của bạn)`);
