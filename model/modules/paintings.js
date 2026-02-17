import * as THREE from 'three';

import { getPaintingData } from './paintingData.js';

/* ─── helpers ─── */

// Procedural carved-relief bump map (tiny repeating floral / scroll motif)
function generateCarvingBumpCanvas(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Dark base
  ctx.fillStyle = '#6b5c3e';
  ctx.fillRect(0, 0, size, size);

  const cell = size / 16; // 16 repeating cells
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const cx = x * cell + cell / 2;
      const cy = y * cell + cell / 2;
      // Tiny rosette / dot pattern
      ctx.beginPath();
      ctx.arc(cx, cy, cell * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = '#8b7a54';
      ctx.fill();
      // Inner highlight dot
      ctx.beginPath();
      ctx.arc(cx, cy, cell * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = '#c4a94f';
      ctx.fill();
      // Tiny connecting lines (scroll motif)
      ctx.strokeStyle = '#8b7a54';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + cell * 0.28, cy);
      ctx.lineTo(cx + cell * 0.5, cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy + cell * 0.28);
      ctx.lineTo(cx, cy + cell * 0.5);
      ctx.stroke();
    }
  }
  return canvas;
}

// Egg-and-dart / bead border bump pattern
function generateBeadBorderCanvas(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 4;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = '#7a6940';
  ctx.fillRect(0, 0, w, h);

  const beadCount = 32;
  const spacing = w / beadCount;
  for (let i = 0; i < beadCount; i++) {
    const bx = i * spacing + spacing / 2;
    // Alternating egg and dart
    if (i % 2 === 0) {
      // Egg (ellipse)
      ctx.beginPath();
      ctx.ellipse(bx, h / 2, spacing * 0.3, h * 0.35, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#c8ab50';
      ctx.fill();
      ctx.strokeStyle = '#a08030';
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      // Dart (diamond)
      ctx.beginPath();
      ctx.moveTo(bx, h * 0.15);
      ctx.lineTo(bx + spacing * 0.15, h / 2);
      ctx.lineTo(bx, h * 0.85);
      ctx.lineTo(bx - spacing * 0.15, h / 2);
      ctx.closePath();
      ctx.fillStyle = '#b09840';
      ctx.fill();
    }
  }
  return canvas;
}

/* ─── materials ─── */

function buildFrameMaterials() {
  // Outer ornate molding — deep antique gold
  const carvingBump = new THREE.CanvasTexture(generateCarvingBumpCanvas(512));
  carvingBump.wrapS = THREE.RepeatWrapping;
  carvingBump.wrapT = THREE.RepeatWrapping;
  carvingBump.repeat.set(4, 1);

  const outerMolding = new THREE.MeshStandardMaterial({
    color: 0xb8942e,
    metalness: 0.75,
    roughness: 0.3,
    bumpMap: carvingBump,
    bumpScale: 0.06,
  });

  // Carved relief strip — darker, very detailed
  const reliefBump = new THREE.CanvasTexture(generateCarvingBumpCanvas(256));
  reliefBump.wrapS = THREE.RepeatWrapping;
  reliefBump.wrapT = THREE.RepeatWrapping;
  reliefBump.repeat.set(8, 1);

  const reliefStrip = new THREE.MeshStandardMaterial({
    color: 0x8b6f34,
    metalness: 0.6,
    roughness: 0.4,
    bumpMap: reliefBump,
    bumpScale: 0.08,
  });

  // Inner beaded edge — thin detail row
  const beadTex = new THREE.CanvasTexture(generateBeadBorderCanvas(512));
  beadTex.wrapS = THREE.RepeatWrapping;
  beadTex.wrapT = THREE.RepeatWrapping;
  beadTex.repeat.set(6, 1);

  const beadEdge = new THREE.MeshStandardMaterial({
    color: 0xd4b44a,
    metalness: 0.8,
    roughness: 0.2,
    bumpMap: beadTex,
    bumpScale: 0.04,
  });

  // Velvet liner — the fabric-like strip closest to the art
  const linerMat = new THREE.MeshStandardMaterial({
    color: 0x2a1a0e,
    metalness: 0.0,
    roughness: 0.95,
  });

  // Backing behind the canvas
  const backingMat = new THREE.MeshStandardMaterial({
    color: 0x1e140b,
    metalness: 0.1,
    roughness: 0.9,
  });

  // Corner rosette accent — bright gold
  const rosetteMat = new THREE.MeshStandardMaterial({
    color: 0xe2c35a,
    metalness: 0.85,
    roughness: 0.15,
  });

  return { outerMolding, reliefStrip, beadEdge, linerMat, backingMat, rosetteMat };
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (ch) => ch.toUpperCase());
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function createLabelMesh(info, width) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const name = info?.title || 'Member';
  const role = toTitleCase(info?.artist || 'Member');
  const wing = toTitleCase(info?.year || 'Metaverse');

  const cw = canvas.width;
  const ch = canvas.height;
  const pad = 10;
  const bx = pad;
  const by = pad;
  const bw = cw - pad * 2;
  const bh = ch - pad * 2;
  const br = 12;

  /* ── Background ── */
  ctx.fillStyle = 'rgba(16, 13, 10, 0.94)';
  roundRect(ctx, bx, by, bw, bh, br);
  ctx.fill();

  /* ── Gold border ── */
  ctx.strokeStyle = 'rgba(210, 175, 100, 0.7)';
  ctx.lineWidth = 2.5;
  roundRect(ctx, bx, by, bw, bh, br);
  ctx.stroke();

  const centerX = cw / 2;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  /* ── 1. Person Name (top, largest, white) ── */
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 40px sans-serif';
  ctx.fillText(name, centerX, 52);

  /* ── Thin gold separator ── */
  const sepY = 85;
  ctx.strokeStyle = 'rgba(210, 175, 100, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX - 120, sepY);
  ctx.lineTo(centerX + 120, sepY);
  ctx.stroke();

  /* ── 2. Position / Role (middle, gold) ── */
  ctx.fillStyle = '#f0c890';
  ctx.font = '600 28px sans-serif';
  ctx.fillText(role, centerX, 115);

  /* ── 3. Wing badge (bottom, subtle) ── */
  ctx.font = '500 22px sans-serif';
  const wingW = ctx.measureText(wing).width;
  const badgePadX = 16;
  const badgeW = wingW + badgePadX * 2;
  const badgeH = 28;
  const badgeX = centerX - badgeW / 2;
  const badgeY = 143;
  const badgeR = 8;

  ctx.fillStyle = 'rgba(180, 150, 80, 0.15)';
  ctx.strokeStyle = 'rgba(200, 170, 100, 0.35)';
  ctx.lineWidth = 1;
  roundRect(ctx, badgeX, badgeY, badgeW, badgeH, badgeR);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#c8a86a';
  ctx.fillText(wing, centerX, badgeY + badgeH / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const aspect = cw / ch;
  const labelWidth = width + 0.3;
  const labelHeight = labelWidth / aspect;
  const geom = new THREE.PlaneGeometry(labelWidth, labelHeight);
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: true,
  });
  const mesh = new THREE.Mesh(geom, mat);
  return mesh;
}

/* ─── frame builder ─── */

function addFrameStrip(group, mat, w, h, thickness, depth, zOffset) {
  // Four sides of a rectangular border strip
  const top = new THREE.Mesh(new THREE.BoxGeometry(w + thickness * 2, thickness, depth), mat);
  top.position.set(0, h / 2 + thickness / 2, zOffset);

  const bot = new THREE.Mesh(new THREE.BoxGeometry(w + thickness * 2, thickness, depth), mat);
  bot.position.set(0, -(h / 2 + thickness / 2), zOffset);

  const left = new THREE.Mesh(new THREE.BoxGeometry(thickness, h, depth), mat);
  left.position.set(-(w / 2 + thickness / 2), 0, zOffset);

  const right = new THREE.Mesh(new THREE.BoxGeometry(thickness, h, depth), mat);
  right.position.set(w / 2 + thickness / 2, 0, zOffset);

  [top, bot, left, right].forEach((m) => {
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);
  });

  // Return the new total extent so the next layer can stack outside
  return { totalW: w + thickness * 2, totalH: h + thickness * 2 };
}

function addCornerRosettes(group, mat, halfW, halfH, zOffset) {
  // Small cylinder rosette at each corner
  const rGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
  const positions = [
    [halfW, halfH],
    [-halfW, halfH],
    [halfW, -halfH],
    [-halfW, -halfH],
  ];
  positions.forEach(([x, y]) => {
    const r = new THREE.Mesh(rGeo, mat);
    r.rotation.x = Math.PI / 2; // Face forward
    r.position.set(x, y, zOffset + 0.05);
    r.castShadow = true;
    r.receiveShadow = true;
    group.add(r);

    // Tiny inner dot highlight
    const dot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.04, 12),
      new THREE.MeshStandardMaterial({ color: 0xfff0b0, metalness: 0.9, roughness: 0.1 })
    );
    dot.rotation.x = Math.PI / 2;
    dot.position.set(x, y, zOffset + 0.1);
    group.add(dot);
  });
}

/* ─── main export ─── */

function loadTextureAsync(textureLoader, src) {
  return new Promise((resolve, reject) => {
    textureLoader.load(src, resolve, undefined, reject);
  });
}

function watercolorizeTexture(texture) {
  const image = texture?.image;
  if (!image?.width || !image?.height) {
    return texture;
  }

  const maxSide = 1024;
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const sourceCanvas = document.createElement('canvas');
  sourceCanvas.width = width;
  sourceCanvas.height = height;
  const sourceCtx = sourceCanvas.getContext('2d');

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width;
  outputCanvas.height = height;
  const outputCtx = outputCanvas.getContext('2d');

  const lowResCanvas = document.createElement('canvas');
  lowResCanvas.width = Math.max(40, Math.round(width / 8));
  lowResCanvas.height = Math.max(40, Math.round(height / 8));
  const lowResCtx = lowResCanvas.getContext('2d');

  if (!sourceCtx || !outputCtx || !lowResCtx) {
    return texture;
  }

  sourceCtx.drawImage(image, 0, 0, width, height);

  lowResCtx.imageSmoothingEnabled = true;
  lowResCtx.drawImage(sourceCanvas, 0, 0, lowResCanvas.width, lowResCanvas.height);

  outputCtx.fillStyle = '#f2ecde';
  outputCtx.fillRect(0, 0, width, height);

  outputCtx.imageSmoothingEnabled = true;
  // Increase clarity: reduced blur, higher saturation, keep high frequency details
  outputCtx.globalAlpha = 0.95;
  outputCtx.filter = 'saturate(200%) contrast(125%) blur(0.2px)';
  outputCtx.drawImage(lowResCanvas, 0, 0, width, height);

  // Overlay sharper original to bring back face details
  outputCtx.globalAlpha = 0.60;
  outputCtx.filter = 'saturate(180%) contrast(120%)';
  outputCtx.drawImage(sourceCanvas, 0, 0, width, height);

  outputCtx.filter = 'none';

  let imageData;
  try {
    imageData = outputCtx.getImageData(0, 0, width, height);
  } catch {
    return texture;
  }

  const data = imageData.data;
  const colorStep = 18;
  const edgeThreshold = 32;

  for (let offset = 0; offset < data.length; offset += 4) {
    const px = (offset / 4) % width;
    const py = Math.floor(offset / 4 / width);

    data[offset] = Math.round(data[offset] / colorStep) * colorStep;
    data[offset + 1] = Math.round(data[offset + 1] / colorStep) * colorStep;
    data[offset + 2] = Math.round(data[offset + 2] / colorStep) * colorStep;

    const grain = (Math.random() - 0.5) * 10;
    data[offset] = Math.max(0, Math.min(255, data[offset] + grain));
    data[offset + 1] = Math.max(0, Math.min(255, data[offset + 1] + grain));
    data[offset + 2] = Math.max(0, Math.min(255, data[offset + 2] + grain));

    if (px > 0 && py > 0 && px < width - 1 && py < height - 1) {
      const left = offset - 4;
      const right = offset + 4;
      const up = offset - width * 4;
      const down = offset + width * 4;

      const gx =
        Math.abs(data[right] - data[left]) +
        Math.abs(data[right + 1] - data[left + 1]) +
        Math.abs(data[right + 2] - data[left + 2]);
      const gy =
        Math.abs(data[down] - data[up]) +
        Math.abs(data[down + 1] - data[up + 1]) +
        Math.abs(data[down + 2] - data[up + 2]);

      if (gx + gy > edgeThreshold * 3) {
        data[offset] = Math.max(0, data[offset] - 18);
        data[offset + 1] = Math.max(0, data[offset + 1] - 14);
        data[offset + 2] = Math.max(0, data[offset + 2] - 10);
      }
    }
  }

  outputCtx.putImageData(imageData, 0, 0);

  const paperTexture = outputCtx.createImageData(width, height);
  const paperData = paperTexture.data;
  for (let offset = 0; offset < paperData.length; offset += 4) {
    const noise = 230 + Math.floor(Math.random() * 25);
    paperData[offset] = noise;
    paperData[offset + 1] = noise - 4;
    paperData[offset + 2] = noise - 9;
    paperData[offset + 3] = 255;
  }

  const paperCanvas = document.createElement('canvas');
  paperCanvas.width = width;
  paperCanvas.height = height;
  const paperCtx = paperCanvas.getContext('2d');
  if (paperCtx) {
    paperCtx.putImageData(paperTexture, 0, 0);
    outputCtx.globalAlpha = 0.05;
    outputCtx.filter = 'blur(0.35px)';
    outputCtx.drawImage(paperCanvas, 0, 0);
    outputCtx.filter = 'none';
  }

  outputCtx.globalAlpha = 0.04;
  outputCtx.fillStyle = '#f7f0de';
  outputCtx.fillRect(0, 0, width, height);

  const vignette = outputCtx.createRadialGradient(
    width * 0.5,
    height * 0.5,
    width * 0.1,
    width * 0.5,
    height * 0.5,
    width * 0.78
  );
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(80,55,25,0.12)');
  outputCtx.globalAlpha = 1;
  outputCtx.fillStyle = vignette;
  outputCtx.fillRect(0, 0, width, height);

  outputCtx.globalAlpha = 1;

  const watercolorTexture = new THREE.CanvasTexture(outputCanvas);
  watercolorTexture.colorSpace = THREE.SRGBColorSpace;
  watercolorTexture.anisotropy = 4;
  watercolorTexture.needsUpdate = true;

  texture.dispose();
  return watercolorTexture;
}

async function resolvePaintingTexture(textureLoader, primarySrc, fallbackSrc) {
  try {
    return await loadTextureAsync(textureLoader, primarySrc);
  } catch {
    return await loadTextureAsync(textureLoader, fallbackSrc);
  }
}

export async function createPaintings(scene, textureLoader) {
  let paintings = [];
  const mats = buildFrameMaterials();
  const paintingData = await getPaintingData();

  if (!paintingData.length) {
    return paintings;
  }

  textureLoader.setCrossOrigin('anonymous');

  for (const [index, data] of paintingData.entries()) {
    const baseTexture = await resolvePaintingTexture(
      textureLoader,
      data.imgSrc,
      `artworks/${(index % 16) + 1}.jpg`
    );
    const texture = watercolorizeTexture(baseTexture);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;

    const paintingGroup = new THREE.Group();

    /* ── backing panel ── */
    const backing = new THREE.Mesh(
      new THREE.PlaneGeometry(data.width + 1.2, data.height + 1.2),
      mats.backingMat
    );
    backing.position.z = -0.06;
    paintingGroup.add(backing);

    /* ── painting canvas ── */
    const painting = new THREE.Mesh(
      new THREE.PlaneGeometry(data.width, data.height),
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.6,
        metalness: 0.05,
      })
    );
    painting.position.z = 0.07;
    painting.castShadow = true;
    painting.receiveShadow = true;
    paintingGroup.add(painting);

    /* ── Layer 1: Velvet liner (closest to art) ── */
    let cur = addFrameStrip(
      paintingGroup, mats.linerMat,
      data.width, data.height,
      0.08, 0.14, 0.02
    );

    /* ── Layer 2: Inner bead / egg-and-dart border ── */
    cur = addFrameStrip(
      paintingGroup, mats.beadEdge,
      cur.totalW, cur.totalH,
      0.06, 0.16, 0.01
    );

    /* ── Layer 3: Carved relief strip ── */
    cur = addFrameStrip(
      paintingGroup, mats.reliefStrip,
      cur.totalW, cur.totalH,
      0.14, 0.22, -0.01
    );

    /* ── Layer 4: Outer ornate molding ── */
    cur = addFrameStrip(
      paintingGroup, mats.outerMolding,
      cur.totalW, cur.totalH,
      0.18, 0.28, -0.03
    );

    /* ── Corner rosettes ── */
    addCornerRosettes(
      paintingGroup, mats.rosetteMat,
      cur.totalW / 2, cur.totalH / 2,
      -0.03
    );

    /* ── position & orient ── */
    paintingGroup.position.set(data.position.x, data.position.y, data.position.z);
    paintingGroup.rotation.y = data.rotationY;

    paintingGroup.userData = {
      type: 'painting',
      info: data.info,
      url: data.info.link,
      dimensions: { width: data.width, height: data.height },
    };
    painting.userData = paintingGroup.userData;

    const label = createLabelMesh(data.info, data.width);
    if (label) {
      label.position.set(0, -(data.height / 2) - 1.35, 0.06);
      paintingGroup.add(label);
    }

    paintings.push(paintingGroup);
  }

  return paintings;
}
