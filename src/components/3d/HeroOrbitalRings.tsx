'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Helper to compute exact (x, y) coordinates on a rotated ellipse
function getRotatedEllipsePoint(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  deg: number,
  angleRad: number
) {
  const phi = (deg * Math.PI) / 180;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosA = Math.cos(angleRad);
  const sinA = Math.sin(angleRad);

  const x = cx + rx * cosA * cosPhi - ry * sinA * sinPhi;
  const y = cy + rx * cosA * sinPhi + ry * sinA * cosPhi;
  return { x, y };
}

export default function HeroOrbitalRings() {
  const [reducedMotion, setReducedMotion] = useState(false);

  // Exact real-time coordinates of glowing satellites on each orbital path
  const [dot1, setDot1] = useState({ x: 533, y: 224 }); // Large Cyan Ellipse
  const [dot2, setDot2] = useState({ x: 499, y: 425 }); // Purple Ellipse
  const [dot3, setDot3] = useState({ x: 445, y: 260 }); // Smaller Thin Cyan Circle

  // Mouse tilt tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), {
    stiffness: 150,
    damping: 20,
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // High-precision smooth animation loop for orbital satellites
    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000; // in seconds

      if (!mq.matches) {
        // Dot 1: Moves along Large Cyan Ellipse (245 x 145, rotated -18 deg, period 22s)
        const angle1 = (elapsed * (2 * Math.PI)) / 22;
        const p1 = getRotatedEllipsePoint(300, 300, 245, 145, -18, angle1);
        setDot1(p1);

        // Dot 2: Moves along Purple Elliptical Orbit (235 x 140, rotated 32 deg, counter-clockwise, period 19s)
        const angle2 = -(elapsed * (2 * Math.PI)) / 19 + 1.2;
        const p2 = getRotatedEllipsePoint(300, 300, 235, 140, 32, angle2);
        setDot2(p2);

        // Dot 3: Moves along Smaller Thin Cyan Circle (radius 145, cy=260, period 15s)
        const angle3 = (elapsed * (2 * Math.PI)) / 15 + 2.4;
        const p3 = {
          x: 300 + 145 * Math.cos(angle3),
          y: 260 + 145 * Math.sin(angle3),
        };
        setDot3(p3);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      style={{ perspective: 1200 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible"
    >
      <motion.div
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] lg:w-[580px] lg:h-[580px] flex items-center justify-center overflow-visible"
      >
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subtle glow filters */}
            <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="purpleGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient definition for Large Cyan Ellipse */}
            <linearGradient id="largeCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>

            {/* Gradient definition for Thin Cyan Circle */}
            <linearGradient id="thinCyanGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.8" />
            </linearGradient>

            {/* Gradient definition for Purple Ellipse */}
            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* ============================================================== */}
          {/* ORBIT 1: ONE LARGE CYAN ELLIPSE                                */}
          {/* Complete path, centered at (300, 300), rx=245, ry=145, rot -18  */}
          {/* ============================================================== */}
          <g>
            <ellipse
              cx="300"
              cy="300"
              rx="245"
              ry="145"
              transform="rotate(-18 300 300)"
              stroke="url(#largeCyanGrad)"
              strokeWidth="1.8"
              filter="url(#cyanGlow)"
              className="opacity-80"
            />

            {/* Glowing dot 1: Exactly rides the Large Cyan Ellipse stroke */}
            <circle
              cx={dot1.x}
              cy={dot1.y}
              r="4.5"
              fill="#67e8f9"
              filter="url(#cyanGlow)"
              className="opacity-95"
            />
          </g>

          {/* ============================================================== */}
          {/* ORBIT 2: ONE PURPLE ELLIPTICAL ORBIT                           */}
          {/* Complete path, centered at (300, 300), rx=235, ry=140, rot 32   */}
          {/* ============================================================== */}
          <g>
            <ellipse
              cx="300"
              cy="300"
              rx="235"
              ry="140"
              transform="rotate(32 300 300)"
              stroke="url(#purpleGrad)"
              strokeWidth="1.6"
              filter="url(#purpleGlow)"
              className="opacity-75"
            />

            {/* Glowing dot 2: Exactly rides the Purple Ellipse stroke */}
            <circle
              cx={dot2.x}
              cy={dot2.y}
              r="4"
              fill="#e9d5ff"
              filter="url(#purpleGlow)"
              className="opacity-95"
            />
          </g>

          {/* ============================================================== */}
          {/* ORBIT 3: ONE SMALLER THIN CYAN CIRCLE                          */}
          {/* Complete circle, centered at (300, 260), radius r=145           */}
          {/* Encircles behind upper silhouette like a celestial halo        */}
          {/* ============================================================== */}
          <g>
            <circle
              cx="300"
              cy="260"
              r="145"
              stroke="url(#thinCyanGrad)"
              strokeWidth="1.1"
              strokeDasharray="6 4"
              filter="url(#softGlow)"
              className="opacity-70"
            />

            {/* Glowing dot 3: Exactly rides the Thin Cyan Circle stroke */}
            <circle
              cx={dot3.x}
              cy={dot3.y}
              r="3.5"
              fill="#a5f3fc"
              filter="url(#softGlow)"
              className="opacity-90"
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
