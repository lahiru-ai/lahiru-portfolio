'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import CanvasWrapper from './CanvasWrapper';
import { SkillCategory } from '@/types/portfolio';

interface TechNode {
  name: string;
  category: string;
  tag: string;
  level: string;
  pos: [number, number, number];
  color: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  programming: '#818cf8', // Indigo
  frontend: '#38bdf8',    // Cyan / Electric Blue
  backend: '#34d399',     // Emerald
  database: '#22d3ee',    // Sky
  ai: '#c084fc',          // Violet / Purple
  tools: '#fbbf24',       // Amber
};

function ConstellationScene({
  skillCategories,
  activeNode,
  onHoverNode,
  reducedMotion,
}: {
  skillCategories: SkillCategory[];
  activeNode: string | null;
  onHoverNode: (node: TechNode | null) => void;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Layout all skills into a balanced spherical/ellipsoid 3D constellation
  const nodes = useMemo(() => {
    const list: TechNode[] = [];
    const allSkills: { name: string; tag: string; level: string; category: string }[] = [];

    skillCategories.forEach((cat) => {
      cat.skills.forEach((s) => {
        allSkills.push({
          name: s.name,
          tag: s.tag || '',
          level: s.level || 'Intermediate',
          category: cat.category,
        });
      });
    });

    const total = allSkills.length;
    // Golden spiral algorithm for even distribution on a sphere
    for (let i = 0; i < total; i++) {
      const phi = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      const radius = 3.6;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi) * 0.75; // flatten slightly vertically
      const z = radius * Math.cos(phi);

      list.push({
        ...allSkills[i],
        pos: [x, y, z],
        color: CATEGORY_COLORS[allSkills[i].category] || '#60a5fa',
      });
    }

    return list;
  }, [skillCategories]);

  // Generate constellation connection lines between nodes in same or neighboring categories
  const linePositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const d = Math.hypot(
          n1.pos[0] - n2.pos[0],
          n1.pos[1] - n2.pos[1],
          n1.pos[2] - n2.pos[2]
        );

        // Connect if close enough or within the same technical domain
        if (d < 2.5 || (n1.category === n2.category && d < 3.8)) {
          positions.push(...n1.pos);
          positions.push(...n2.pos);
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  // Gentle autonomous orbit
  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.06;
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((node) => {
        const isHovered = activeNode === node.name;
        return (
          <group
            key={node.name}
            position={node.pos}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverNode(node);
            }}
            onPointerOut={() => onHoverNode(null)}
          >
            {/* Glowing sphere node */}
            <mesh scale={isHovered ? 1.6 : 1}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isHovered ? 2.5 : 0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Subtle halo ring when hovered */}
            {isHovered && (
              <mesh>
                <ringGeometry args={[0.26, 0.32, 24]} />
                <meshBasicMaterial
                  color="#ffffff"
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            )}

            {/* Label in 3D space */}
            <Text
              position={[0, 0.35, 0]}
              fontSize={0.24}
              color={isHovered ? '#ffffff' : '#94a3b8'}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.03}
              outlineColor="#070709"
            >
              {node.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export default function SkillsConstellation3D({
  skillCategories,
}: {
  skillCategories: SkillCategory[];
}) {
  const [activeNode, setActiveNode] = useState<TechNode | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] rounded-3xl bg-zinc-950/70 border border-zinc-800/80 overflow-hidden backdrop-blur-xl flex flex-col items-center justify-center group shadow-2xl">
      {/* 3D Scene Controls Guide & Status */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 backdrop-blur-md shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span>Interactive 3D Constellation</span>
        </div>

        <span className="text-[10px] font-mono text-zinc-500 hidden sm:block">
          Drag to rotate • Hover node to inspect
        </span>
      </div>

      {/* R3F Canvas */}
      <CanvasWrapper className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[6, 6, 6]} color="#38bdf8" intensity={1.5} />
          <pointLight position={[-6, -6, 6]} color="#a855f7" intensity={1.5} />

          <ConstellationScene
            skillCategories={skillCategories}
            activeNode={activeNode ? activeNode.name : null}
            onHoverNode={setActiveNode}
            reducedMotion={reducedMotion}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.6}
            dampingFactor={0.05}
          />
        </Canvas>
      </CanvasWrapper>

      {/* Floating Inspector Card for Hovered Node */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-center pointer-events-none">
        <div className="px-5 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 backdrop-blur-md shadow-xl text-center max-w-md transition-all duration-300">
          {activeNode ? (
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: activeNode.color }}
                />
                <span className="text-sm font-bold text-white">
                  {activeNode.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {activeNode.level}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                {activeNode.tag}
              </p>
            </div>
          ) : (
            <p className="text-xs font-mono text-zinc-400">
              Hover over any node in the constellation to view technical competencies
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
