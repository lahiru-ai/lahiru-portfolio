import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fs from 'fs';

globalThis.self = globalThis;
globalThis.createImageBitmap = async (blob) => {
  return { width: 1024, height: 1024, close: () => {} };
};

const glbBuffer = fs.readFileSync('public/models/lahiru-avatar.glb');

const loader = new GLTFLoader();
loader.parse(
  glbBuffer.buffer,
  '',
  (gltf) => {
    console.log("=== GLB Verification Report ===");
    console.log("Scene name:", gltf.scene.name);
    let meshCount = 0;
    let totalVertices = 0;
    let totalFaces = 0;
    const materialNames = new Set();
    const nodeNames = [];

    gltf.scene.traverse((node) => {
      nodeNames.push(node.name || node.type);
      if (node.isMesh) {
        meshCount++;
        const geo = node.geometry;
        if (geo.attributes.position) {
          totalVertices += geo.attributes.position.count;
        }
        if (geo.index) {
          totalFaces += geo.index.count / 3;
        }
        if (node.material) {
          materialNames.add(node.material.name || node.material.type);
        }
      }
    });

    console.log(`Total Meshes: ${meshCount}`);
    console.log(`Total Vertices: ${totalVertices}`);
    console.log(`Total Triangles: ${totalFaces}`);
    console.log(`Materials (${materialNames.size}):`, Array.from(materialNames));
    console.log(`Articulation Nodes: Head=${nodeNames.includes('Head')}, Neck=${nodeNames.includes('Neck')}, Spine=${nodeNames.includes('Spine')}`);
    console.log("Status: VALID GLB 3D MODEL");
  },
  (err) => {
    console.error("GLB parse failed:", err);
    process.exit(1);
  }
);
