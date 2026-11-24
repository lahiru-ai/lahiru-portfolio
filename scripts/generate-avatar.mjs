import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';

// Polyfill FileReader for Node.js
globalThis.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
};

const scene = new THREE.Scene();
scene.name = 'LahiruAvatarScene';

// Realistic PBR Materials based on user photograph (profile.jpg)
// Skin: South Asian warm amber complexion
const skinMat = new THREE.MeshStandardMaterial({
  color: 0x9f693f,
  roughness: 0.65,
  metalness: 0.04,
  name: 'SkinMaterial'
});

// Wavy Black Hair
const hairMat = new THREE.MeshStandardMaterial({
  color: 0x121215,
  roughness: 0.68,
  metalness: 0.1,
  name: 'HairMaterial'
});

// Facial Hair: Mustache & Goatee
const facialHairMat = new THREE.MeshStandardMaterial({
  color: 0x151518,
  roughness: 0.85,
  metalness: 0.05,
  name: 'FacialHairMaterial'
});

// Black Suit
const suitMat = new THREE.MeshStandardMaterial({
  color: 0x141418,
  roughness: 0.82,
  metalness: 0.1,
  name: 'SuitMaterial'
});

// Lapel Material with subtle contrast
const lapelMat = new THREE.MeshStandardMaterial({
  color: 0x0d0d10,
  roughness: 0.72,
  metalness: 0.18,
  name: 'LapelMaterial'
});

// Crisp White Shirt
const shirtMat = new THREE.MeshStandardMaterial({
  color: 0xf8fafc,
  roughness: 0.55,
  metalness: 0.02,
  name: 'ShirtMaterial'
});

// Blue Tie
const tieMat = new THREE.MeshStandardMaterial({
  color: 0x1d4ed8,
  roughness: 0.32,
  metalness: 0.18,
  name: 'TieMaterial'
});

// Black Rectangular Glasses Frames
const glassesMat = new THREE.MeshStandardMaterial({
  color: 0x18181b,
  roughness: 0.25,
  metalness: 0.6,
  name: 'GlassesFrameMaterial'
});

// Glass Lenses with subtle blue tint reflection
const glassLensMat = new THREE.MeshPhysicalMaterial({
  color: 0xdbeafe,
  transparent: true,
  opacity: 0.4,
  roughness: 0.08,
  metalness: 0.1,
  transmission: 0.85,
  name: 'GlassesLensMaterial'
});

const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.15 });
const eyeIrisMat = new THREE.MeshStandardMaterial({ color: 0x3b2213, roughness: 0.25 });
const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x030303 });

// Hierarchy: Root -> Spine -> Neck -> Head
const root = new THREE.Group();
root.name = 'Root';
scene.add(root);

const spine = new THREE.Group();
spine.name = 'Spine';
root.add(spine);

// Torso / Suit Jacket Body
const torsoGeo = new THREE.CylinderGeometry(0.48, 0.42, 0.95, 32);
const torso = new THREE.Mesh(torsoGeo, suitMat);
torso.position.y = -0.55;
torso.scale.set(1.15, 1, 0.72);
torso.castShadow = true;
torso.receiveShadow = true;
torso.name = 'TorsoSuit';
spine.add(torso);

// Shoulders
const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), suitMat);
leftShoulder.position.set(-0.54, -0.18, 0);
leftShoulder.scale.set(1, 0.9, 0.85);
spine.add(leftShoulder);

const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), suitMat);
rightShoulder.position.set(0.54, -0.18, 0);
rightShoulder.scale.set(1, 0.9, 0.85);
spine.add(rightShoulder);

// Arms (upper segments)
const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.65, 20), suitMat);
leftArm.position.set(-0.58, -0.55, 0.02);
leftArm.rotation.z = 0.12;
spine.add(leftArm);

const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.65, 20), suitMat);
rightArm.position.set(0.58, -0.55, 0.02);
rightArm.rotation.z = -0.12;
spine.add(rightArm);

// Suit Lapels
const leftLapel = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.55, 0.06), lapelMat);
leftLapel.position.set(-0.16, -0.32, 0.28);
leftLapel.rotation.z = -0.35;
leftLapel.rotation.y = 0.1;
spine.add(leftLapel);

const rightLapel = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.55, 0.06), lapelMat);
rightLapel.position.set(0.16, -0.32, 0.28);
rightLapel.rotation.z = 0.35;
rightLapel.rotation.y = -0.1;
spine.add(rightLapel);

// Shirt Collar & V-Neck
const shirtChest = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.45, 0.08), shirtMat);
shirtChest.position.set(0, -0.32, 0.25);
spine.add(shirtChest);

const leftCollar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.05), shirtMat);
leftCollar.position.set(-0.1, -0.11, 0.26);
leftCollar.rotation.z = -0.55;
leftCollar.rotation.x = 0.2;
spine.add(leftCollar);

const rightCollar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.05), shirtMat);
rightCollar.position.set(0.1, -0.11, 0.26);
rightCollar.rotation.z = 0.55;
rightCollar.rotation.x = 0.2;
spine.add(rightCollar);

// Blue Tie
const tieKnot = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.1, 4), tieMat);
tieKnot.position.set(0, -0.14, 0.28);
tieKnot.rotation.y = Math.PI / 4;
tieKnot.rotation.z = Math.PI;
spine.add(tieKnot);

const tieBody = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.48, 0.04), tieMat);
tieBody.position.set(0, -0.4, 0.29);
tieBody.scale.set(1, 1, 0.6);
spine.add(tieBody);

const tieTip = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.08, 4), tieMat);
tieTip.position.set(0, -0.66, 0.29);
tieTip.rotation.y = Math.PI / 4;
tieTip.rotation.z = Math.PI;
spine.add(tieTip);

// Neck
const neck = new THREE.Group();
neck.name = 'Neck';
neck.position.set(0, -0.05, 0);
spine.add(neck);

const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.26, 24), skinMat);
neckMesh.position.y = 0.1;
neckMesh.castShadow = true;
neck.add(neckMesh);

// Head
const head = new THREE.Group();
head.name = 'Head';
head.position.set(0, 0.22, 0);
neck.add(head);

// Cranium / Face Base
const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 32), skinMat);
cranium.scale.set(0.92, 1.05, 0.98);
cranium.castShadow = true;
head.add(cranium);

// Jaw & Chin
const jaw = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.28, 24), skinMat);
jaw.position.set(0, -0.12, 0.06);
jaw.scale.set(0.92, 0.9, 0.9);
head.add(jaw);

const chin = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), skinMat);
chin.position.set(0, -0.22, 0.15);
chin.scale.set(1.1, 0.9, 1);
head.add(chin);

// Nose
const noseBridge = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.14, 16), skinMat);
noseBridge.position.set(0, 0.02, 0.28);
noseBridge.rotation.x = -0.28;
head.add(noseBridge);

const noseTip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), skinMat);
noseTip.position.set(0, -0.04, 0.31);
noseTip.scale.set(1.1, 0.9, 1.1);
head.add(noseTip);

// Ears
const leftEar = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), skinMat);
leftEar.position.set(-0.27, 0.02, -0.02);
leftEar.scale.set(0.3, 1, 0.6);
head.add(leftEar);

const rightEar = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), skinMat);
rightEar.position.set(0.27, 0.02, -0.02);
rightEar.scale.set(0.3, 1, 0.6);
head.add(rightEar);

// Eyes
function createEye(x) {
  const eyeGrp = new THREE.Group();
  eyeGrp.position.set(x, 0.05, 0.23);

  const white = new THREE.Mesh(new THREE.SphereGeometry(0.046, 20, 20), eyeWhiteMat);
  white.scale.set(1, 0.7, 0.8);
  eyeGrp.add(white);

  const iris = new THREE.Mesh(new THREE.CircleGeometry(0.022, 24), eyeIrisMat);
  iris.position.set(0, 0, 0.04);
  eyeGrp.add(iris);

  const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.011, 24), eyePupilMat);
  pupil.position.set(0, 0, 0.042);
  eyeGrp.add(pupil);

  return eyeGrp;
}

const leftEye = createEye(-0.11);
leftEye.name = 'LeftEye';
head.add(leftEye);

const rightEye = createEye(0.11);
rightEye.name = 'RightEye';
head.add(rightEye);

// Eyebrows
const leftEyebrow = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.022, 0.03), hairMat);
leftEyebrow.position.set(-0.11, 0.11, 0.26);
leftEyebrow.rotation.z = -0.08;
head.add(leftEyebrow);

const rightEyebrow = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.022, 0.03), hairMat);
rightEyebrow.position.set(0.11, 0.11, 0.26);
rightEyebrow.rotation.z = 0.08;
head.add(rightEyebrow);

// Mustache & Goatee
const leftMustache = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.028, 0.035), facialHairMat);
leftMustache.position.set(-0.045, -0.1, 0.28);
leftMustache.rotation.z = -0.16;
head.add(leftMustache);

const rightMustache = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.028, 0.035), facialHairMat);
rightMustache.position.set(0.045, -0.1, 0.28);
rightMustache.rotation.z = 0.16;
head.add(rightMustache);

// Soul patch and Goatee on chin
const soulPatch = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.03), facialHairMat);
soulPatch.position.set(0, -0.16, 0.26);
head.add(soulPatch);

const goatee = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.075, 0.04), facialHairMat);
goatee.position.set(0, -0.22, 0.21);
goatee.scale.set(1, 1, 0.8);
head.add(goatee);

// Black Rectangular Glasses
const glassesGroup = new THREE.Group();
glassesGroup.name = 'Glasses';
glassesGroup.position.set(0, 0.055, 0.28);

// Left frame
const leftFrame = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.072, 0.015), glassesMat);
leftFrame.position.set(-0.11, 0, 0);
glassesGroup.add(leftFrame);

const leftLens = new THREE.Mesh(new THREE.PlaneGeometry(0.095, 0.055), glassLensMat);
leftLens.position.set(-0.11, 0, 0.01);
glassesGroup.add(leftLens);

// Right frame
const rightFrame = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.072, 0.015), glassesMat);
rightFrame.position.set(0.11, 0, 0);
glassesGroup.add(rightFrame);

const rightLens = new THREE.Mesh(new THREE.PlaneGeometry(0.095, 0.055), glassLensMat);
rightLens.position.set(0.11, 0, 0.01);
glassesGroup.add(rightLens);

// Bridge
const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.014, 0.015), glassesMat);
bridge.position.set(0, 0.01, 0);
glassesGroup.add(bridge);

// Temples (arms going back to ears)
const leftTemple = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.014, 0.26), glassesMat);
leftTemple.position.set(-0.17, 0.01, -0.13);
glassesGroup.add(leftTemple);

const rightTemple = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.014, 0.26), glassesMat);
rightTemple.position.set(0.17, 0.01, -0.13);
glassesGroup.add(rightTemple);

head.add(glassesGroup);

// Black Wavy Hair
const hairGroup = new THREE.Group();
hairGroup.name = 'WavyHair';

// Hair top crown
const hairTop = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 24), hairMat);
hairTop.position.set(0, 0.15, -0.04);
hairTop.scale.set(0.96, 0.85, 1.05);
hairGroup.add(hairTop);

// Hair volume curls / waves
const waveGeos = [
  { pos: [0, 0.27, 0.04], scale: [0.18, 0.1, 0.16], rot: [0.2, 0, 0] },
  { pos: [-0.12, 0.24, 0.08], scale: [0.16, 0.09, 0.15], rot: [0.2, -0.2, 0.2] },
  { pos: [0.12, 0.24, 0.08], scale: [0.16, 0.09, 0.15], rot: [0.2, 0.2, -0.2] },
  { pos: [-0.22, 0.15, 0.02], scale: [0.12, 0.14, 0.14], rot: [0, 0, 0.3] },
  { pos: [0.22, 0.15, 0.02], scale: [0.12, 0.14, 0.14], rot: [0, 0, -0.3] },
  { pos: [0, 0.26, -0.14], scale: [0.22, 0.12, 0.18], rot: [-0.2, 0, 0] },
  { pos: [-0.16, 0.18, -0.16], scale: [0.16, 0.14, 0.16], rot: [-0.2, -0.2, 0] },
  { pos: [0.16, 0.18, -0.16], scale: [0.16, 0.14, 0.16], rot: [-0.2, 0.2, 0] },
  { pos: [-0.04, 0.26, 0.15], scale: [0.12, 0.08, 0.12], rot: [0.3, 0.1, 0.1] }
];

waveGeos.forEach((w) => {
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), hairMat);
  m.position.set(...w.pos);
  m.scale.set(...w.scale);
  m.rotation.set(...w.rot);
  hairGroup.add(m);
});

head.add(hairGroup);

// Export to GLB
const exporter = new GLTFExporter();
try {
  const glb = await exporter.parseAsync(scene, { binary: true });
  fs.mkdirSync('public/models', { recursive: true });
  fs.writeFileSync('public/models/lahiru-avatar.glb', Buffer.from(glb));
  console.log('Successfully generated public/models/lahiru-avatar.glb! Byte length:', glb.byteLength);
} catch (err) {
  console.error('Export failed:', err);
  process.exit(1);
}
