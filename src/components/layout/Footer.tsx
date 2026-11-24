'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Heart, Globe, ArrowUpRight, Sliders } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Footer() {
  const { data, setIsAdminOpen } = usePortfolio();
  const [sriLankaTime, setSriLankaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Colombo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setSriLankaTime(timeStr);
      } catch {
        setSriLankaTime('GMT+5:30');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative border-t border-zinc-800/80 bg-[#060608] text-zinc-400 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Identity Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-mono text-xs font-bold text-white">
                LR
              </div>
              <span className="text-base font-semibold text-white tracking-tight">
                {data.personalInfo.name}
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              {data.personalInfo.headline}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Sri Lanka (GMT+5:30)</span>
                <span className="font-mono text-zinc-400 pl-1 border-l border-zinc-700">
                  {sriLankaTime || 'Loading...'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#skills" className="hover:text-white transition-colors">
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-white transition-colors">
                  Experience & Leadership
                </Link>
              </li>
              <li>
                <Link href="#education" className="hover:text-white transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Studio */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Connect & Architecture
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a
                href={data.personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <GithubIcon className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                <span>github.com/lahiru-ai</span>
                <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a
                href={data.personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a
                href={`mailto:${data.personalInfo.socialLinks.email}`}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="truncate">{data.personalInfo.socialLinks.email}</span>
              </a>

              <button
                onClick={() => setIsAdminOpen(true)}
                className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-blue-400 hover:text-blue-300 hover:border-zinc-700 transition-all text-left"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Future Admin Dashboard Studio</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} R. J. K. Lahiru Madhushan Ranathunga. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              Engineered with Next.js, TypeScript & Tailwind CSS
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-zinc-400">Sri Lanka 🇱🇰</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
