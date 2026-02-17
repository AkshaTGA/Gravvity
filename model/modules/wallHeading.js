import * as THREE from 'three';

/**
 * Creates a styled "Gravity — Metaverse Wing" heading with the logo,
 * rendered onto a canvas texture and placed on the front wall above the paintings.
 */
export function createWallHeading(scene, textureLoader) {
    const logoPath = '/gravity-logo.ico';

    textureLoader.load(logoPath, (logoTex) => {
        const logoImg = logoTex.image;

        /* ── Canvas setup (stacked two-line layout) ── */
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const centerX = cw / 2;

        /* ── Background: transparent ── */
        ctx.clearRect(0, 0, cw, ch);

        /* ── Horizontal accent lines (top and bottom) ── */
        const lineGrad = ctx.createLinearGradient(0, 0, cw, 0);
        lineGrad.addColorStop(0, 'rgba(120, 90, 40, 0)');
        lineGrad.addColorStop(0.15, 'rgba(140, 100, 50, 0.55)');
        lineGrad.addColorStop(0.5, 'rgba(170, 130, 60, 0.8)');
        lineGrad.addColorStop(0.85, 'rgba(140, 100, 50, 0.55)');
        lineGrad.addColorStop(1, 'rgba(120, 90, 40, 0)');

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(80, 35);
        ctx.lineTo(cw - 80, 35);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(80, ch - 35);
        ctx.lineTo(cw - 80, ch - 35);
        ctx.stroke();

        /* ── Decorative dots on accent lines ── */
        const dotPositions = [cw * 0.18, cw * 0.5, cw * 0.82];
        ctx.fillStyle = 'rgba(140, 100, 50, 0.65)';
        for (const dx of dotPositions) {
            ctx.beginPath();
            ctx.arc(dx, 35, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(dx, ch - 35, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        /* ═══════════════════════════════════════════
         *  LINE 1:  [Logo]  GRAVITY
         * ═══════════════════════════════════════════ */

        const line1Y = ch * 0.36;

        /* ── Measure "GRAVITY" to centre logo+text together ── */
        ctx.font = '800 100px sans-serif';
        const gravityWidth = ctx.measureText('GRAVITY').width;

        const logoSize = 90;
        const gap = 28;                              // space between logo and text
        const totalLine1W = logoSize + gap + gravityWidth;
        const logoX = centerX - totalLine1W / 2;
        const logoY = line1Y - logoSize / 2;

        /* ── Draw logo (rounded-rect clip) ── */
        ctx.save();
        const logoR = 16;
        ctx.beginPath();
        ctx.moveTo(logoX + logoR, logoY);
        ctx.lineTo(logoX + logoSize - logoR, logoY);
        ctx.quadraticCurveTo(logoX + logoSize, logoY, logoX + logoSize, logoY + logoR);
        ctx.lineTo(logoX + logoSize, logoY + logoSize - logoR);
        ctx.quadraticCurveTo(logoX + logoSize, logoY + logoSize, logoX + logoSize - logoR, logoY + logoSize);
        ctx.lineTo(logoX + logoR, logoY + logoSize);
        ctx.quadraticCurveTo(logoX, logoY + logoSize, logoX, logoY + logoSize - logoR);
        ctx.lineTo(logoX, logoY + logoR);
        ctx.quadraticCurveTo(logoX, logoY, logoX + logoR, logoY);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
        ctx.restore();

        /* ── Subtle purple glow behind logo ── */
        const glowGrad = ctx.createRadialGradient(
            logoX + logoSize / 2, logoY + logoSize / 2, logoSize * 0.2,
            logoX + logoSize / 2, logoY + logoSize / 2, logoSize * 0.9
        );
        glowGrad.addColorStop(0, 'rgba(138, 92, 246, 0.1)');
        glowGrad.addColorStop(1, 'rgba(138, 92, 246, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(logoX - 40, logoY - 40, logoSize + 80, logoSize + 80);

        /* ── "GRAVITY" text (dark charcoal) ── */
        const textX = logoX + logoSize + gap;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1a1a1a';
        ctx.font = '800 100px sans-serif';
        ctx.fillText('GRAVITY', textX, line1Y);

        /* ═══════════════════════════════════════════
         *  Thin gold separator line between the rows
         * ═══════════════════════════════════════════ */
        const sepY = ch * 0.55;
        const sepGrad = ctx.createLinearGradient(centerX - 180, 0, centerX + 180, 0);
        sepGrad.addColorStop(0, 'rgba(170, 130, 60, 0)');
        sepGrad.addColorStop(0.2, 'rgba(170, 130, 60, 0.5)');
        sepGrad.addColorStop(0.5, 'rgba(190, 150, 70, 0.7)');
        sepGrad.addColorStop(0.8, 'rgba(170, 130, 60, 0.5)');
        sepGrad.addColorStop(1, 'rgba(170, 130, 60, 0)');
        ctx.strokeStyle = sepGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX - 180, sepY);
        ctx.lineTo(centerX + 180, sepY);
        ctx.stroke();

        /* ═══════════════════════════════════════════
         *  LINE 2:  Metaverse Wing
         * ═══════════════════════════════════════════ */
        const line2Y = ch * 0.72;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#7a5a10';
        ctx.font = '500 56px sans-serif';
        ctx.fillText('Metaverse Wing', centerX, line2Y);

        /* ── Create 3D texture and mesh ── */
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;

        const aspect = cw / ch;
        const meshHeight = 5.5;
        const meshWidth = meshHeight * aspect;
        const geometry = new THREE.PlaneGeometry(meshWidth, meshHeight);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            side: THREE.FrontSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 4.0, -19.4);

        scene.add(mesh);
    });
}
