'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FolderGit2, ArrowUpRight, CheckCircle2, Globe } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { Project } from '@/types/portfolio';

interface ProjectCard3DProps {
  project: Project;
}

export default function ProjectCard3D({ project }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Normalized mouse coords [-0.5, 0.5]
  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 300,
    damping: 25,
  });

  // Spotlight coordinates in px
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y });

    // Normalized [-0.5, 0.5]
    mouseX.set((x / rect.width) - 0.5);
    mouseY.set((y / rect.height) - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="relative h-full flex flex-col justify-between rounded-3xl bg-zinc-950/80 border border-zinc-800/80 p-6 sm:p-7 backdrop-blur-xl overflow-hidden shadow-xl transition-colors duration-300 hover:border-zinc-700/80 group"
      >
        {/* Dynamic Cursor Spotlight Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(380px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(59, 130, 246, 0.12), transparent 75%)`,
          }}
        />

        {/* Ambient Top Glow Border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card Body with 3D Pop (preserve-3d) */}
        <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
          {/* Interactive Mockup / Terminal Preview Banner */}
          <div className="relative w-full h-44 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 overflow-hidden mb-6 flex flex-col justify-between p-4 group-hover:border-blue-500/30 transition-colors shadow-inner">
            {/* Window Chrome */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                {project.id}.app
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/90 text-zinc-300 border border-zinc-700/60">
                {project.category}
              </span>
            </div>

            {/* Central Graphic Art */}
            <div className="flex flex-col items-center justify-center my-auto py-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2 group-hover:scale-110 group-hover:text-white transition-all shadow-lg shadow-blue-500/10">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-zinc-200 group-hover:text-blue-300 transition-colors text-center px-2">
                {project.title}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono mt-0.5 line-clamp-1">
                {project.tagline}
              </span>
            </div>

            {/* Status Footer */}
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/60">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {project.liveUrl ? 'Live System' : 'Active Repo'}
              </span>
              <span className="text-zinc-400 text-[10px] font-mono bg-zinc-800/60 px-2 py-0.5 rounded">
                {project.technologies[0]}
              </span>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors flex items-center justify-between">
              <span>{project.title}</span>
              {project.featured && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Featured
                </span>
              )}
            </h3>
            <p className="text-xs text-blue-400/90 font-mono font-medium">
              {project.tagline}
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal pt-1">
              {project.description}
            </p>
          </div>

          {/* Key Features Bullet List */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-1.5 pt-4 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                Architectural Highlights
              </span>
              <ul className="space-y-1">
                {project.features.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Card Footer with Tech Stack & Links */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="mt-6 pt-5 border-t border-zinc-800/80 space-y-4"
        >
          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:border-zinc-700 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-1">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-all shadow-sm group/btn"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-all shadow-md shadow-blue-600/20 group/btn"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
