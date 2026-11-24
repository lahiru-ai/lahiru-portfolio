'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import CanvasWrapper from './CanvasWrapper';

// Clean, elegant orbital rings that encircle the portrait from behind
function OrbitalHalo({
  pointer,
  reducedMotion,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const haloGroup = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const satellite1 = useRef<THREE.Mesh>(null);
  const satellite2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!haloGroup.current) return;

    if (!reducedMotion) {
      const t = state.clock.getElapsedTime();

      // Gentle continuous rotation of individual rings
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z = t * 0.12;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.z = -t * 0.15;
      }
      if (ring3Ref.current) {
        ring3Ref.current.rotation.z = t * 0.08;
      }

      // Orbiting micro-satellites
      if (satellite1.current) {
        const angle1 = t * 0.4;
        satellite1.current.position.x = Math.cos(angle1) * 2.5;
        satellite1.current.position.y = Math.sin(angle1) * 2.5;
      }
      if (satellite2.current) {
        const angle2 = -t * 0.35 + 1.5;
        satellite2.current.position.x = Math.cos(angle2) * 2.85;
        satellite2.current.position.y = Math.sin(angle2) * 2.85;
      }

      // Smooth mouse parallax with controlled bounds (firmly behind foreground)
      const targetRotX = -pointer.current.y * 0.18;
      const targetRotY = pointer.current.x * 0.22;

      haloGroup.current.rotation.x = THREE.MathUtils.lerp(
        haloGroup.current.rotation.x,
        targetRotX,
        delta * 3
      );
      haloGroup.current.rotation.y = THREE.MathUtils.lerp(
        haloGroup.current.rotation.y,
        targetRotY,
        delta * 3
      );
    }
  });

  return (
    // Placed slightly behind z=0 so it surrounds the portrait in perspective
    <group ref={haloGroup} position={[0, 0.1, -0.6]}>
      {/* Ring 1 - Electric Blue Primary Halo */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3.4, 0.2, 0]}>
        <torusGeometry args={[2.5, 0.012, 16, 120]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
        {/* Glowing micro satellite */}
        <mesh ref={satellite1}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#60a5fa" />
        </mesh>
      </mesh>

      {/* Ring 2 - Violet Secondary Orbital */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3.8, -0.25, 0.4]}>
        <torusGeometry args={[2.85, 0.01, 16, 120]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
        {/* Violet micro satellite */}
        <mesh ref={satellite2}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#c084fc" />
        </mesh>
      </mesh>

      {/* Ring 3 - Subtle Inner Cyan Accent */}
      <mesh ref={ring3Ref} rotation={[0.2, 0.15, -0.3]}>
        <torusGeometry args={[2.2, 0.007, 16, 100]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Scene Root with studio lighting & subtle sparkles
function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;

    if (!reducedMotion) {
      // Very gentle camera float
      state.camera.position.x = THREE.MathUtils.lerp(
        state.camera.position.x,
        state.pointer.x * 0.25,
        0.04
      );
      state.camera.position.y = THREE.MathUtils.lerp(
        state.camera.position.y,
        state.pointer.y * 0.2,
        0.04
      );
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      {/* Ambient Lighting */}
      <ambientLight intensity={0.5} />

      {/* Electric Blue Key Light */}
      <pointLight position={[3.5, 3, 2]} color="#38bdf8" intensity={1.8} distance={12} />

      {/* Violet Fill Light */}
      <pointLight position={[-3.5, -2, 1.5]} color="#a855f7" intensity={1.5} distance={12} />

      {/* Rim light */}
      <directionalLight position={[0, 4, -2]} color="#60a5fa" intensity={0.9} />

      {/* Controlled subtle floating particles */}
      <Sparkles
        count={35}
        scale={7}
        size={2.0}
        speed={0.4}
        color="#38bdf8"
        opacity={0.5}
      />

      {/* Orbital Halo System surrounding portrait */}
      <OrbitalHalo pointer={pointer} reducedMotion={reducedMotion} />
    </>
  );
}

export default function HeroProcedural3D({ className = '' }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  return (
    <CanvasWrapper className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <HeroScene reducedMotion={reducedMotion} />
      </Canvas>
    </CanvasWrapper>
  );
}
