'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

interface AvatarModelProps {
  reducedMotion?: boolean;
}

export default function AvatarModel({ reducedMotion = false }: AvatarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headBoneRef = useRef<THREE.Object3D | null>(null);
  const neckBoneRef = useRef<THREE.Object3D | null>(null);
  const spineBoneRef = useRef<THREE.Object3D | null>(null);

  // Entrance animation progress (0 -> 1)
  const [entranceProgress, setEntranceProgress] = useState(0);

  // Load the GLB model from public/models/lahiru-avatar.glb
  const { scene } = useGLTF('/models/lahiru-avatar.glb');

  // Traverse the scene on mount to configure shadows and locate key nodes
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Ensure materials properly react to PBR lights
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = Math.max(mat.roughness, 0.2);
          mat.envMapIntensity = 0.9;
        }
      }

      // Locate articulation nodes
      if (child.name === 'Head') headBoneRef.current = child;
      if (child.name === 'Neck') neckBoneRef.current = child;
      if (child.name === 'Spine') spineBoneRef.current = child;
    });
  }, [scene]);

  // Frame animation loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth entrance interpolation
    if (entranceProgress < 1) {
      setEntranceProgress((prev) => Math.min(1, prev + delta * 2.2));
    }

    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // normalized [-1, 1]

    if (reducedMotion) {
      // Static baseline if reduced motion requested
      groupRef.current.position.y = 0;
      groupRef.current.rotation.y = 0;
      return;
    }

    // 1. Natural Idle Breathing Animation (Subtle vertical & spine oscillation)
    const breathOffset = Math.sin(t * 1.8) * 0.015;
    const breathChest = Math.cos(t * 1.8) * 0.008;

    groupRef.current.position.y = -0.3 + breathOffset;

    if (spineBoneRef.current) {
      spineBoneRef.current.rotation.x = THREE.MathUtils.lerp(
        spineBoneRef.current.rotation.x,
        breathChest - pointer.y * 0.05,
        delta * 3
      );
      spineBoneRef.current.rotation.y = THREE.MathUtils.lerp(
        spineBoneRef.current.rotation.y,
        pointer.x * 0.12,
        delta * 3
      );
    }

    // 2. Smooth Head & Neck Cursor Tracking
    const targetHeadYaw = pointer.x * 0.35; // Horizonal look-at
    const targetHeadPitch = -pointer.y * 0.22; // Vertical look-at
    const targetHeadRoll = pointer.x * -0.05; // Natural slight tilt

    if (headBoneRef.current) {
      headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.y,
        targetHeadYaw,
        delta * 4.5
      );
      headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.x,
        targetHeadPitch,
        delta * 4.5
      );
      headBoneRef.current.rotation.z = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.z,
        targetHeadRoll,
        delta * 4.5
      );
    }

    if (neckBoneRef.current) {
      neckBoneRef.current.rotation.y = THREE.MathUtils.lerp(
        neckBoneRef.current.rotation.y,
        targetHeadYaw * 0.3,
        delta * 4
      );
    }

    // 3. Subtle Whole-Avatar Rotation Response
    const targetBodyRotation = pointer.x * 0.18;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetBodyRotation,
      delta * 2.5
    );

    // Entrance scaling ease-out
    const scaleFactor = 1.05 * THREE.MathUtils.smoothstep(entranceProgress, 0, 1);
    groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the GLB model asset
useGLTF.preload('/models/lahiru-avatar.glb');
