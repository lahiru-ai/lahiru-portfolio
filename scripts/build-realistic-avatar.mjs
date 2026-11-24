import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Polyfills for Node.js GLTFExporter
globalThis.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
};

globalThis.ImageData = class ImageData {
  constructor(data, width, height) {
    this.data = data;
    this.width = width;
    this.height = height;
  }
};

globalThis.OffscreenCanvas = class OffscreenCanvas {
  constructor(width, height) {
    this.width = width || 1;
    this.height = height || 1;
    this._imageData = null;
  }

  getContext(type) {
    const self = this;
    return {
      translate: () => {},
      scale: () => {},
      drawImage: () => {},
      putImageData: (imgData) => {
        self._imageData = imgData;
      }
    };
  }

  async convertToBlob(options = {}) {
    const mime = options.type || 'image/png';
    const width = this._imageData ? this._imageData.width : this.width;
    const height = this._imageData ? this._imageData.height : this.height;
    const data = this._imageData ? Buffer.from(this._imageData.data.buffer) : Buffer.alloc(width * height * 4);

    let img = sharp(data, {
      raw: { width, height, channels: 4 }
    });

    let buf;
    if (mime === 'image/jpeg') {
      buf = await img.jpeg({ quality: 92 }).toBuffer();
    } else {
      buf = await img.png().toBuffer();
    }

    return new Blob([buf], { type: mime });
  }
};

async function buildModel() {
  console.log("Starting Realistic 3D Avatar Generation...");

  const scene = new THREE.Scene();
  scene.name = 'LahiruAvatarScene';

  // 1. Load and prepare texture from high-res cropped portrait
  const texturePath = path.resolve('public/images/portrait_head_crop.png');
  const { data: texBuffer, info: texInfo } = await sharp(texturePath)
    .resize(1024, 1024, { fit: 'cover' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Loaded face texture: ${texInfo.width}x${texInfo.height}`);

  const faceTexture = new THREE.DataTexture(
    new Uint8Array(texBuffer),
    texInfo.width,
    texInfo.height,
    THREE.RGBAFormat
  );
  faceTexture.needsUpdate = true;
  faceTexture.flipY = false;
  faceTexture.wrapS = THREE.ClampToEdgeWrapping;
  faceTexture.wrapT = THREE.ClampToEdgeWrapping;

  // 2. Materials
  // PBR Skin material using the authentic photograph texture
  const skinMat = new THREE.MeshStandardMaterial({
    map: faceTexture,
    roughness: 0.65,
    metalness: 0.02,
    name: 'LahiruSkinMat'
  });

  // Solid skin material for rear/unexposed sections
  const solidSkinMat = new THREE.MeshStandardMaterial({
    color: 0x9e6840,
    roughness: 0.68,
    metalness: 0.02,
    name: 'SolidSkinMat'
  });

  // Wavy Black Hair Material
  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x131316,
    roughness: 0.65,
    metalness: 0.08,
    name: 'HairMat'
  });

  // Charcoal/Black Business Suit Jacket
  const suitMat = new THREE.MeshStandardMaterial({
    color: 0x161619,
    roughness: 0.82,
    metalness: 0.04,
    name: 'SuitMat'
  });

  // Suit Lapels with subtle sheen contrast
  const lapelMat = new THREE.MeshStandardMaterial({
    color: 0x101013,
    roughness: 0.74,
    metalness: 0.12,
    name: 'LapelMat'
  });

  // Crisp White Dress Shirt
  const shirtMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.55,
    metalness: 0.02,
    name: 'ShirtMat'
  });

  // Royal Blue Tie
  const tieMat = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    roughness: 0.35,
    metalness: 0.15,
    name: 'TieMat'
  });

  // Sleek Black Rectangular Glasses Frame
  const glassesFrameMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.22,
    metalness: 0.5,
    name: 'GlassesFrameMat'
  });

  // Optical Anti-Reflective Glass Lens Material
  const glassLensMat = new THREE.MeshPhysicalMaterial({
    color: 0xdbeafe,
    transparent: true,
    opacity: 0.38,
    roughness: 0.05,
    metalness: 0.05,
    transmission: 0.88,
    ior: 1.52,
    name: 'GlassLensMat'
  });

  // 3. Scene Articulation Hierarchy
  const root = new THREE.Group();
  root.name = 'Root';
  scene.add(root);

  const spine = new THREE.Group();
  spine.name = 'Spine';
  root.add(spine);

  const neck = new THREE.Group();
  neck.name = 'Neck';
  neck.position.set(0, -0.06, 0);
  spine.add(neck);

  const head = new THREE.Group();
  head.name = 'Head';
  head.position.set(0, 0.22, 0);
  neck.add(head);

  // -------------------------------------------------------------
  // 4. Anthropometric 3D Face Geometry with Frontal UV Projection
  // -------------------------------------------------------------
  // Build a sculpted facial surface mesh with vertex displacements
  const faceCols = 40;
  const faceRows = 40;
  const facePositions = [];
  const faceUVs = [];
  const faceIndices = [];

  // Face spans x: [-0.26, 0.26], y: [-0.28, 0.26]
  for (let j = 0; j <= faceRows; j++) {
    const vNorm = j / faceRows;
    const y = 0.26 - vNorm * 0.54; // Top to bottom

    for (let i = 0; i <= faceCols; i++) {
      const uNorm = i / faceCols;
      const x = -0.26 + uNorm * 0.52; // Left to right

      // Base spherical cranium curvature
      const rHead = 0.28;
      const distSq = (x * 1.1) * (x * 1.1) + (y * 0.95) * (y * 0.95);
      let z = Math.sqrt(Math.max(0, rHead * rHead - distSq));

      // Sculpt key anatomical features matching portrait
      // A. Forehead and Brow Ridge
      if (y > 0.08 && y < 0.22) {
        // Forehead curvature
        z += 0.015 * Math.cos((y - 0.15) * 15);
      }

      // B. Brow ridge prominence
      if (y >= 0.08 && y <= 0.14) {
        const browProminence = 0.018 * Math.exp(-((y - 0.11) ** 2) / 0.001);
        z += browProminence;
      }

      // C. Eye socket recess
      const eyeLeftDist = Math.hypot(x - (-0.11), y - 0.05);
      const eyeRightDist = Math.hypot(x - 0.11, y - 0.05);
      if (eyeLeftDist < 0.075) {
        z -= 0.022 * (1 - eyeLeftDist / 0.075);
      }
      if (eyeRightDist < 0.075) {
        z -= 0.022 * (1 - eyeRightDist / 0.075);
      }

      // D. Nose bridge and tip extrusion
      if (Math.abs(x) < 0.065 && y > -0.08 && y < 0.12) {
        const nx = x / 0.065;
        const ny = (y - (-0.02)) / 0.09;
        const noseProfile = Math.max(0, 1 - nx * nx) * Math.max(0, 1 - ny * ny);
        // Bridge starts high and tip projects forward
        z += 0.075 * noseProfile;
      }

      // E. Nostril wings
      if (Math.abs(x) > 0.025 && Math.abs(x) < 0.065 && y > -0.07 && y < -0.01) {
        z += 0.025 * Math.sin((Math.abs(x) - 0.025) * 78);
      }

      // F. Upper & Lower Lips (Mouth)
      if (Math.abs(x) < 0.095 && y > -0.16 && y < -0.08) {
        const mx = x / 0.095;
        const my = (y - (-0.12)) / 0.04;
        const mouthProfile = Math.max(0, 1 - mx * mx) * Math.max(0, 1 - my * my);
        z += 0.028 * mouthProfile;
      }

      // G. Philtrum groove
      if (Math.abs(x) < 0.018 && y > -0.09 && y < -0.05) {
        z -= 0.008 * (1 - Math.abs(x) / 0.018);
      }

      // H. Chin prominence
      if (Math.abs(x) < 0.10 && y > -0.28 && y < -0.16) {
        const cx = x / 0.10;
        const cy = (y - (-0.22)) / 0.06;
        const chinProfile = Math.max(0, 1 - cx * cx) * Math.max(0, 1 - cy * cy);
        z += 0.042 * chinProfile;
      }

      // I. Jawline tapering
      if (y < -0.10) {
        const taper = 1.0 - ((-0.10 - y) / 0.18) * 0.32;
        // x can be adjusted or z curves back smoothly
      }

      facePositions.push(x, y, z);

      // UV Mapping: Aligned with the cropped portrait photograph
      // Image crop: 768x768 centered on face
      // x: -0.26 -> u: 0.18, x: +0.26 -> u: 0.82
      // y: +0.26 (top of forehead) -> v: 0.80, y: -0.28 (chin) -> v: 0.22
      const u = 0.50 + (x / 0.52) * 0.62;
      const v = 0.51 + (y / 0.54) * 0.56;
      faceUVs.push(Math.max(0, Math.min(1, u)), Math.max(0, Math.min(1, v)));
    }
  }

  // Create grid indices (quads split into 2 triangles)
  for (let j = 0; j < faceRows; j++) {
    for (let i = 0; i < faceCols; i++) {
      const a = j * (faceCols + 1) + i;
      const b = j * (faceCols + 1) + i + 1;
      const c = (j + 1) * (faceCols + 1) + i;
      const d = (j + 1) * (faceCols + 1) + i + 1;

      faceIndices.push(a, b, d);
      faceIndices.push(a, d, c);
    }
  }

  const faceGeo = new THREE.BufferGeometry();
  faceGeo.setAttribute('position', new THREE.Float32BufferAttribute(facePositions, 3));
  faceGeo.setAttribute('uv', new THREE.Float32BufferAttribute(faceUVs, 2));
  faceGeo.setIndex(faceIndices);
  faceGeo.computeVertexNormals();

  const faceMesh = new THREE.Mesh(faceGeo, skinMat);
  faceMesh.name = 'FaceSculptMesh';
  faceMesh.castShadow = true;
  faceMesh.receiveShadow = true;
  head.add(faceMesh);

  // Rear Cranium & Temples (solid dome behind the sculpted face)
  const rearCraniumGeo = new THREE.SphereGeometry(0.28, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.82);
  const rearCranium = new THREE.Mesh(rearCraniumGeo, solidSkinMat);
  rearCranium.position.set(0, 0, -0.05);
  rearCranium.scale.set(0.95, 1.04, 1.05);
  rearCranium.castShadow = true;
  head.add(rearCranium);

  // -------------------------------------------------------------
  // 5. Ears (Anatomical Left & Right)
  // -------------------------------------------------------------
  function createEar(isLeft) {
    const earGroup = new THREE.Group();
    const sign = isLeft ? -1 : 1;
    earGroup.position.set(sign * 0.27, 0.02, -0.02);

    const earBase = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), solidSkinMat);
    earBase.scale.set(0.28, 1.0, 0.65);
    earBase.rotation.y = sign * 0.2;
    earBase.rotation.z = -sign * 0.1;
    earGroup.add(earBase);

    const earHelix = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 12, 20, Math.PI * 1.4), solidSkinMat);
    earHelix.rotation.y = sign * Math.PI / 2;
    earHelix.rotation.z = isLeft ? Math.PI / 4 : -Math.PI / 4;
    earHelix.position.set(sign * 0.01, 0.01, 0);
    earGroup.add(earHelix);

    return earGroup;
  }

  head.add(createEar(true));
  head.add(createEar(false));

  // -------------------------------------------------------------
  // 6. Signature Eyeglasses (Black Rectangular Frame & Lenses)
  // -------------------------------------------------------------
  const glasses = new THREE.Group();
  glasses.name = 'Glasses';
  glasses.position.set(0, 0.052, 0.29);

  function createLensRim(xPos) {
    const rimGroup = new THREE.Group();
    rimGroup.position.set(xPos, 0, 0);

    const rimWidth = 0.118;
    const rimHeight = 0.072;
    const thickness = 0.014;
    const border = 0.012;

    // Top bar
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(rimWidth, border, thickness), glassesFrameMat);
    topBar.position.y = rimHeight / 2 - border / 2;
    rimGroup.add(topBar);

    // Bottom bar
    const bottomBar = new THREE.Mesh(new THREE.BoxGeometry(rimWidth, border, thickness), glassesFrameMat);
    bottomBar.position.y = -rimHeight / 2 + border / 2;
    rimGroup.add(bottomBar);

    // Left bar
    const leftBar = new THREE.Mesh(new THREE.BoxGeometry(border, rimHeight, thickness), glassesFrameMat);
    leftBar.position.x = -rimWidth / 2 + border / 2;
    rimGroup.add(leftBar);

    // Right bar
    const rightBar = new THREE.Mesh(new THREE.BoxGeometry(border, rimHeight, thickness), glassesFrameMat);
    rightBar.position.x = rimWidth / 2 - border / 2;
    rimGroup.add(rightBar);

    // Glass lens with reflection
    const lens = new THREE.Mesh(new THREE.PlaneGeometry(rimWidth - border * 2, rimHeight - border * 2), glassLensMat);
    lens.position.z = 0.002;
    rimGroup.add(lens);

    return rimGroup;
  }

  glasses.add(createLensRim(-0.11));
  glasses.add(createLensRim(0.11));

  // Center Bridge
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.012, 0.014), glassesFrameMat);
  bridge.position.set(0, 0.012, 0);
  glasses.add(bridge);

  // Left Temple Arm reaching to ear
  const leftTemple = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.014, 0.28), glassesFrameMat);
  leftTemple.position.set(-0.175, 0.008, -0.14);
  glasses.add(leftTemple);

  // Right Temple Arm reaching to ear
  const rightTemple = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.014, 0.28), glassesFrameMat);
  rightTemple.position.set(0.175, 0.008, -0.14);
  glasses.add(rightTemple);

  head.add(glasses);

  // -------------------------------------------------------------
  // 7. Textured Hairstyle (Voluminous Black Wavy Hair)
  // -------------------------------------------------------------
  const hairGroup = new THREE.Group();
  hairGroup.name = 'WavyHair';

  // Base crown volume
  const hairCrown = new THREE.Mesh(new THREE.SphereGeometry(0.295, 24, 24), hairMat);
  hairCrown.position.set(0, 0.16, -0.04);
  hairCrown.scale.set(0.98, 0.92, 1.08);
  hairCrown.castShadow = true;
  hairGroup.add(hairCrown);

  // Sculpted wavy crests and layers matching Lahiru's haircut
  const waveLayers = [
    // Top crest swept slightly up and to the right
    { pos: [0.03, 0.29, 0.04], scale: [0.18, 0.11, 0.16], rot: [0.22, 0.08, -0.05] },
    { pos: [-0.09, 0.28, 0.06], scale: [0.17, 0.10, 0.15], rot: [0.20, -0.15, 0.15] },
    { pos: [0.13, 0.27, 0.05], scale: [0.16, 0.10, 0.15], rot: [0.22, 0.15, -0.18] },
    // Front wave tufts along hairline
    { pos: [-0.04, 0.27, 0.16], scale: [0.14, 0.08, 0.12], rot: [0.32, 0.12, 0.08] },
    { pos: [0.08, 0.26, 0.15], scale: [0.13, 0.08, 0.12], rot: [0.30, 0.05, -0.12] },
    { pos: [-0.15, 0.24, 0.13], scale: [0.12, 0.08, 0.11], rot: [0.25, -0.18, 0.18] },
    // Lateral side curls / volume above ears
    { pos: [-0.23, 0.16, 0.02], scale: [0.11, 0.13, 0.13], rot: [0.05, 0, 0.28] },
    { pos: [0.23, 0.16, 0.02], scale: [0.11, 0.13, 0.13], rot: [0.05, 0, -0.28] },
    { pos: [-0.21, 0.10, -0.06], scale: [0.10, 0.12, 0.12], rot: [0, 0.1, 0.22] },
    { pos: [0.21, 0.10, -0.06], scale: [0.10, 0.12, 0.12], rot: [0, -0.1, -0.22] },
    // Back and occipital region
    { pos: [0, 0.25, -0.16], scale: [0.22, 0.12, 0.17], rot: [-0.18, 0, 0] },
    { pos: [-0.14, 0.19, -0.17], scale: [0.15, 0.13, 0.15], rot: [-0.18, -0.15, 0] },
    { pos: [0.14, 0.19, -0.17], scale: [0.15, 0.13, 0.15], rot: [-0.18, 0.15, 0] },
    { pos: [0, 0.10, -0.21], scale: [0.18, 0.14, 0.13], rot: [-0.25, 0, 0] }
  ];

  waveLayers.forEach((w) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), hairMat);
    m.position.set(...w.pos);
    m.scale.set(...w.scale);
    m.rotation.set(...w.rot);
    m.castShadow = true;
    hairGroup.add(m);
  });

  head.add(hairGroup);

  // -------------------------------------------------------------
  // 8. Neck & Throat
  // -------------------------------------------------------------
  const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.165, 0.24, 24), solidSkinMat);
  neckMesh.position.y = 0.10;
  neckMesh.castShadow = true;
  neck.add(neckMesh);

  // -------------------------------------------------------------
  // 9. Attire: Tailored Suit Jacket, Shirt & Blue Tie
  // -------------------------------------------------------------
  // Torso / Suit Jacket
  const torsoGeo = new THREE.CylinderGeometry(0.48, 0.42, 0.95, 32);
  const torso = new THREE.Mesh(torsoGeo, suitMat);
  torso.position.y = -0.55;
  torso.scale.set(1.16, 1.0, 0.72);
  torso.castShadow = true;
  torso.receiveShadow = true;
  spine.add(torso);

  // Tailored Shoulders
  const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), suitMat);
  leftShoulder.position.set(-0.55, -0.18, 0);
  leftShoulder.scale.set(1.0, 0.88, 0.82);
  leftShoulder.castShadow = true;
  spine.add(leftShoulder);

  const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), suitMat);
  rightShoulder.position.set(0.55, -0.18, 0);
  rightShoulder.scale.set(1.0, 0.88, 0.82);
  rightShoulder.castShadow = true;
  spine.add(rightShoulder);

  // Upper Sleeve Segments
  const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.135, 0.65, 20), suitMat);
  leftArm.position.set(-0.59, -0.55, 0.02);
  leftArm.rotation.z = 0.12;
  leftArm.castShadow = true;
  spine.add(leftArm);

  const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.135, 0.65, 20), suitMat);
  rightArm.position.set(0.59, -0.55, 0.02);
  rightArm.rotation.z = -0.12;
  rightArm.castShadow = true;
  spine.add(rightArm);

  // Suit Jacket Notched Lapels
  const leftLapel = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.56, 0.065), lapelMat);
  leftLapel.position.set(-0.165, -0.32, 0.28);
  leftLapel.rotation.z = -0.36;
  leftLapel.rotation.y = 0.12;
  leftLapel.castShadow = true;
  spine.add(leftLapel);

  const rightLapel = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.56, 0.065), lapelMat);
  rightLapel.position.set(0.165, -0.32, 0.28);
  rightLapel.rotation.z = 0.36;
  rightLapel.rotation.y = -0.12;
  rightLapel.castShadow = true;
  spine.add(rightLapel);

  // Crisp White Shirt Front & Collar
  const shirtChest = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.44, 0.08), shirtMat);
  shirtChest.position.set(0, -0.32, 0.25);
  spine.add(shirtChest);

  const leftCollar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.05), shirtMat);
  leftCollar.position.set(-0.10, -0.11, 0.26);
  leftCollar.rotation.z = -0.55;
  leftCollar.rotation.x = 0.22;
  spine.add(leftCollar);

  const rightCollar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.05), shirtMat);
  rightCollar.position.set(0.10, -0.11, 0.26);
  rightCollar.rotation.z = 0.55;
  rightCollar.rotation.x = 0.22;
  spine.add(rightCollar);

  // Royal Blue Necktie
  const tieKnot = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.10, 4), tieMat);
  tieKnot.position.set(0, -0.14, 0.285);
  tieKnot.rotation.y = Math.PI / 4;
  tieKnot.rotation.z = Math.PI;
  tieKnot.castShadow = true;
  spine.add(tieKnot);

  const tieBody = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.48, 0.04), tieMat);
  tieBody.position.set(0, -0.40, 0.29);
  tieBody.scale.set(1.0, 1.0, 0.65);
  tieBody.castShadow = true;
  spine.add(tieBody);

  const tieTip = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.08, 4), tieMat);
  tieTip.position.set(0, -0.66, 0.29);
  tieTip.rotation.y = Math.PI / 4;
  tieTip.rotation.z = Math.PI;
  tieTip.castShadow = true;
  spine.add(tieTip);

  // -------------------------------------------------------------
  // 10. Export to public/models/lahiru-avatar.glb
  // -------------------------------------------------------------
  console.log("Exporting Scene to GLB binary...");
  const exporter = new GLTFExporter();
  const glb = await exporter.parseAsync(scene, { binary: true });

  const outDir = 'public/models';
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'lahiru-avatar.glb');
  fs.writeFileSync(outPath, Buffer.from(glb));

  console.log(`GLB generated successfully at: ${outPath} (${glb.byteLength} bytes)`);
}

buildModel().catch((err) => {
  console.error("Model generation failed:", err);
  process.exit(1);
});
