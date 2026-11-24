'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Mail, Code2, Bot, Award, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/Button';

export default function Hero() {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  const { availability } = personalInfo;
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
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
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
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

            {/* Name & Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                <span className="text-zinc-400 text-base sm:text-lg block font-mono font-normal mb-2">
                  Hello, I am
                </span>
                <span className="text-gradient">
                  {personalInfo.name}
                </span>
              </h1>

              {/* Headline Badge */}
              <div className="inline-block py-1">
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-gradient-vibrant tracking-tight">
                  {personalInfo.headline}
                </p>
              </div>

              {/* Subheadline / Intro */}
              <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed font-normal">
                &ldquo;{personalInfo.subheadline}&rdquo;
              </p>
            </div>

            {/* Quick Location & Info Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Modern Web &amp; Next.js</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                <span>AI &amp; Automation</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>IEEE Volunteer</span>
              </div>
            </div>

            {/* CTA Buttons & Social Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button href="#projects" variant="primary" size="lg" className="group">
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button href="#contact" variant="secondary" size="lg">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Contact Me</span>
              </Button>

              {/* Direct Social Links */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all hover:scale-110 shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-blue-400 transition-all hover:scale-110 shadow-sm"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Portrait Photograph */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] flex items-center justify-center">
              {!imageError ? (
                <Image
                  src="/images/profile.jpg"
                  alt={personalInfo.name}
                  width={1199}
                  height={1312}
                  priority
                  quality={95}
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, (max-width: 1024px) 420px, 460px"
                  className="w-full h-auto object-contain pointer-events-none select-none"
                  style={{
                    maskImage:
                      'radial-gradient(ellipse 100% 105% at 50% 42%, black 78%, rgba(0, 0, 0, 0.85) 90%, transparent 100%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 100% 105% at 50% 42%, black 78%, rgba(0, 0, 0, 0.85) 90%, transparent 100%)',
                  }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full aspect-square flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-6xl font-extrabold font-mono text-gradient-vibrant tracking-tighter">
                    LR
                  </span>
                  <span className="text-sm text-zinc-400 font-mono mt-2 uppercase tracking-widest">
                    {personalInfo.shortName}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
