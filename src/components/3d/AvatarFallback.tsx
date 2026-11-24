'use client';

import React from 'react';
import { Loader2, Box, Sparkles } from 'lucide-react';

interface AvatarFallbackProps {
  message?: string;
}

export default function AvatarFallback({ message = 'Loading 3D Experience...' }: AvatarFallbackProps) {
  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] rounded-3xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden backdrop-blur-xl">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-purple-600/10 pointer-events-none" />

      {/* Animated 3D Wireframe Icon */}
      <div className="relative mb-5">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-xl shadow-blue-500/10">
          <Box className="w-8 h-8 animate-pulse text-blue-400" />
        </div>
        <div className="absolute -top-1 -right-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
          </span>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-white tracking-tight mb-1 flex items-center gap-2">
        <span>Interactive 3D Avatar</span>
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
      </h3>

      <p className="text-xs text-zinc-400 max-w-xs leading-relaxed mb-4">
        {message}
      </p>

      {/* Progress pill */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
        <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />
        <span>Initializing WebGL Shader Pipeline</span>
      </div>
    </div>
  );
}
