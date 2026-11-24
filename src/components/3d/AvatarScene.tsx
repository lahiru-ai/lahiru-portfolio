'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Sparkles } from '@react-three/drei';
import AvatarModel from './AvatarModel';
import AvatarFallback from './AvatarFallback';
import { RotateCcw, Sparkles as SparklesIcon, Maximize2, Shield } from 'lucide-react';

interface AvatarSceneProps {
  className?: string;
}

// Glowing background ring component rendered inside the 3D WebGL scene
function GlowingHaloRing() {
  return (
    <group position={[0, 0.25, -0.45]}>
      {/* Outer ambient glow ring */}
      <mesh>
        <torusGeometry args={[0.9, 0.02, 16, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.65} />
      </mesh>
      {/* Secondary accent ring */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.96, 0.008, 16, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// Error Boundary state component
class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('3D Avatar Model rendering notice:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function AvatarScene({ className = '' }: AvatarSceneProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const controlsRef = useRef<any>(null);

  // Client hydration check & reduced motion preference detection
  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  if (!isClient) {
    return <AvatarFallback message="Loading 3D Workspace Canvas..." />;
  }

  return (
    <div
      className={`relative w-full h-[420px] sm:h-[480px] lg:h-[520px] rounded-3xl bg-[#070709] border border-zinc-800/90 overflow-hidden shadow-2xl shadow-blue-500/5 group ${className}`}
    >
      {/* 2D Ambient Background Glow Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/15 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-1/4 w-52 h-52 bg-purple-600/15 rounded-full blur-[70px]" />
        <div className="absolute bottom-6 left-1/4 w-44 h-44 bg-cyan-500/10 rounded-full blur-[60px]" />
      </div>

      {/* Top UI Overlay / Scene Status Badge */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono text-zinc-300 backdrop-blur-md shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span>WebGL 3D Avatar</span>
          <span className="text-zinc-500">|</span>
          <span className="text-emerald-400">Live</span>
        </div>

        {/* Reset Camera View button */}
        <button
          onClick={handleResetView}
          title="Reset Camera Angle"
          className="pointer-events-auto p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all backdrop-blur-md hover:scale-105 active:scale-95 shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Hint Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="px-3 py-1 rounded-lg bg-black/60 border border-zinc-800/80 text-[10px] font-mono text-zinc-400 backdrop-blur-sm">
          Drag to rotate • Move mouse to track
        </div>

        <div className="text-[10px] font-mono text-zinc-500 hidden sm:block">
          GLB PBR Studio
        </div>
      </div>

      {/* WebGL 3D Canvas */}
      <ModelErrorBoundary fallback={<AvatarFallback message="3D Canvas initialized. Ready for custom GLB model." />}>
        <Suspense fallback={<AvatarFallback message="Streaming 3D Avatar & Shaders..." />}>
          <Canvas
            shadows
            camera={{ position: [0, 0.15, 2.3], fov: 42 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Ambient Lighting with Blue/Violet Tones */}
            <ambientLight intensity={0.8} color="#1e1b4b" />

            {/* Studio Key Light (Front-Right Warm White) */}
            <directionalLight
              position={[3, 4, 3.5]}
              intensity={2.2}
              color="#ffffff"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-bias={-0.0001}
            />

            {/* Studio Fill Light (Front-Left Cyan Tone) */}
            <directionalLight
              position={[-3, 1.5, 2]}
              intensity={1.0}
              color="#06b6d4"
            />

            {/* Studio Rim / Back Light (Back-Left Vibrant Violet) */}
            <directionalLight
              position={[-2.5, 3, -2.5]}
              intensity={2.6}
              color="#a855f7"
            />

            {/* Secondary Accent Light (Back-Right Soft Blue) */}
            <pointLight position={[2, -0.5, -1]} intensity={0.8} color="#3b82f6" />

            {/* Glowing 3D Halo Ring behind character */}
            <GlowingHaloRing />

            {/* Subtle Atmospheric Sparkle Particles */}
            <Sparkles
              count={28}
              scale={3}
              size={1.6}
              speed={0.4}
              color="#60a5fa"
              opacity={0.4}
            />

            {/* The 3D Avatar Character Model */}
            <AvatarModel reducedMotion={reducedMotion} />

            {/* Soft Contact Shadows on Ground */}
            <ContactShadows
              position={[0, -0.95, 0]}
              opacity={0.65}
              scale={3}
              blur={1.8}
              far={1.6}
              color="#030712"
            />

            {/* Restricted Orbit Controls for touch and drag */}
            <OrbitControls
              ref={controlsRef}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2.3}
              maxPolarAngle={Math.PI / 1.85}
              minAzimuthAngle={-Math.PI / 4.5}
              maxAzimuthAngle={Math.PI / 4.5}
              dampingFactor={0.06}
            />
          </Canvas>
        </Suspense>
      </ModelErrorBoundary>
    </div>
  );
}
