'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { data } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { availability } = data.personalInfo;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#070709]/80 backdrop-blur-xl border-b border-zinc-800/60 shadow-2xl shadow-black/40'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <Link
              href="#"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-blue-500/10 group-hover:shadow-blue-500/25 transition-all">
                <div className="w-full h-full bg-[#09090d] rounded-xl flex items-center justify-center">
                  <span className="font-mono text-sm font-bold text-white tracking-wider group-hover:text-blue-400 transition-colors">
                    LR
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors tracking-tight">
                  {data.personalInfo.shortName}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      availability.status === 'available'
                        ? 'bg-emerald-400 animate-pulse'
                        : availability.status === 'busy'
                        ? 'bg-amber-400'
                        : 'bg-blue-400'
                    }`}
                  />
                  {availability.status === 'available' ? 'Available' : 'Engaged'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/10 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Contact Me CTA */}
              <Link
                href="#contact"
                className="relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-medium text-white transition-all bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 active:scale-95"
              >
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-300 hover:text-white rounded-lg bg-zinc-900/80 border border-zinc-800"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/80 backdrop-blur-2xl pt-20 px-6 pb-8 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="flex flex-col gap-2 mt-4">
            <div className="px-3 py-2 mb-2 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-400">Status</span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {availability.label}
              </span>
            </div>

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-xl transition-colors border border-transparent hover:border-zinc-800"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-zinc-800/80">
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block py-3 text-center text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-600/20"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
