'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Code2, Bot, Award, MapPin, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import HeroOrbitalRings from '@/components/3d/HeroOrbitalRings';

export default function Hero() {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  const { availability } = personalInfo;
  const [imageError, setImageError] = useState(false);

  // Animated technical interests rotator
  const technicalInterests = [
    'AI & Automation Developer',
    'Modern Full-Stack Architect',
    'Undergraduate at WUSL',
    'IEEE Student Branch Volunteer',
    'Applied ML & Python Engineer',
  ];
  const [interestIndex, setInterestIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setInterestIndex((prev) => (prev + 1) % technicalInterests.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [technicalInterests.length]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Layer 1: Background ambient lighting - subtle and non-competing */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/[0.08] blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[350px] bg-purple-600/[0.07] blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Extremely subtle grid pattern - whisper quiet */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_50%,transparent_100%)] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Introduction & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
          >
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    availability.status === 'available'
                      ? 'bg-emerald-400'
                      : availability.status === 'busy'
                      ? 'bg-amber-400'
                      : 'bg-blue-400'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    availability.status === 'available'
                      ? 'bg-emerald-500'
                      : availability.status === 'busy'
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                />
              </span>
              <span className="font-medium">{availability.label}</span>
            </div>

            {/* Name & Headline with balanced typography and clean wrapping */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-zinc-400 font-mono text-xs sm:text-sm tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>Hello, I am</span>
              </div>

              <h1 className="cyber-glitch-group group/glitch relative text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] cursor-default select-text">
                <span
                  className="cyber-glitch-token text-zinc-400 font-normal mr-2"
                  data-text="R. J. K."
                >
                  R. J. K.
                </span>
                <span
                  className="cyber-glitch-token text-gradient"
                  data-text="Lahiru Madhushan Ranathunga"
                >
                  Lahiru Madhushan Ranathunga
                </span>
              </h1>

              {/* Animated Technical Interests Heading */}
              <div className="h-8 sm:h-9 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={interestIndex}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-medium text-gradient-vibrant tracking-tight"
                  >
                    <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{technicalInterests[interestIndex]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Subheadline / Intro */}
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed font-normal pt-1">
                &ldquo;{personalInfo.subheadline}&rdquo;
              </p>
            </div>

            {/* Quick Location & Info Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs text-zinc-300 backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs text-zinc-300 backdrop-blur-sm">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Next.js &amp; Modern Web</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs text-zinc-300 backdrop-blur-sm">
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                <span>AI &amp; Automation</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs text-zinc-300 backdrop-blur-sm">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>IEEE Volunteer</span>
              </div>
            </div>

            {/* CTA Buttons & Social Links */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <MagneticButton>
                <Button href="#projects" variant="primary" size="lg" className="group shadow-lg shadow-blue-600/20">
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button href="#contact" variant="secondary" size="lg">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Contact Me</span>
                </Button>
              </MagneticButton>

              {/* Direct Social Links */}
              <div className="flex items-center gap-2 pl-1">
                <MagneticButton strength={0.35}>
                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all shadow-sm flex items-center justify-center cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </MagneticButton>

                <MagneticButton strength={0.35}>
                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-blue-400 transition-all shadow-sm flex items-center justify-center cursor-pointer"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Layer 2 (All 3 Orbital Rings) & Layer 3 (Foreground Portrait) */}
          <div className="lg:col-span-5 relative flex justify-center items-center min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] overflow-visible">
            {/* Layer 2: All 3 Orbital Rings (Strictly BEHIND portrait) */}
            <HeroOrbitalRings />

            {/* Layer 3: Portrait Cutout in the foreground (Strictly ABOVE orbital rings) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] flex items-center justify-center pointer-events-none"
            >
              {!imageError ? (
                <Image
                  src="/images/profile-transparent.webp"
                  alt={personalInfo.name}
                  width={1199}
                  height={1312}
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 380px"
                  className="w-full h-auto object-contain select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  style={{
                    // Gentle soft transition only at the very bottom edge of torso
                    maskImage: 'linear-gradient(to bottom, black 94%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 94%, transparent 100%)',
                  }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full aspect-square flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-5xl font-extrabold font-mono text-gradient-vibrant tracking-tighter">
                    LR
                  </span>
                  <span className="text-xs text-zinc-400 font-mono mt-2 uppercase tracking-widest">
                    {personalInfo.shortName}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
