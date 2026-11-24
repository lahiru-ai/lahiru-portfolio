'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  HeartHandshake,
  Image as ImageIcon,
  Palette,
  Search,
  Settings,
  ShieldAlert,
  UserCheck,
  MessageSquare,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
}

const navSections: { section: string; items: SidebarItem[] }[] = [
  {
    section: 'MAIN',
    items: [
      { title: 'Overview', href: '/admin', icon: LayoutDashboard },
      { title: 'Profile & About', href: '/admin/profile', icon: User },
    ],
  },
  {
    section: 'CONTENT CMS',
    items: [
      { title: 'Skills', href: '/admin/skills', icon: Cpu },
      { title: 'Projects', href: '/admin/projects', icon: FolderGit2 },
      { title: 'Experience', href: '/admin/experience', icon: Briefcase },
      { title: 'Education', href: '/admin/education', icon: GraduationCap },
      { title: 'Achievements', href: '/admin/achievements', icon: Award },
      { title: 'Volunteer Activities', href: '/admin/volunteer', icon: HeartHandshake },
      { title: 'Media Library', href: '/admin/media', icon: ImageIcon },
    ],
  },
  {
    section: 'COMMUNICATION',
    items: [
      {
        title: 'Contact Messages',
        href: '#',
        icon: MessageSquare,
        badge: 'Coming Soon',
        disabled: true,
      },
    ],
  },
  {
    section: 'PREFERENCES & SEO',
    items: [
      { title: 'Appearance', href: '/admin/appearance', icon: Palette },
      { title: 'SEO Settings', href: '/admin/seo', icon: Search },
      { title: 'General Settings', href: '/admin/settings', icon: Settings },
      { title: 'Security & Logs', href: '/admin/security', icon: ShieldAlert },
      { title: 'Admin Profile', href: '/admin/account', icon: UserCheck },
    ],
  },
];

export default function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#09090c] border-r border-zinc-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Workspace Brand / Header */}
        <div className="h-16 px-6 border-b border-zinc-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              LR
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                Admin Studio
              </span>
              <span className="block text-[10px] text-zinc-400 font-medium">
                Lahiru Ranathunga
              </span>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            title="Live Preview Website"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800">
          {navSections.map((group) => (
            <div key={group.section}>
              <div className="px-3 mb-2 text-[10px] font-mono font-semibold tracking-wider text-zinc-400 uppercase">
                {group.section}
              </div>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = !item.disabled && (pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href)));

                  if (item.disabled) {
                    return (
                      <div
                        key={item.title}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 cursor-not-allowed select-none bg-zinc-900/20"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-zinc-400" />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600/15 text-blue-400 border border-blue-500/25 font-semibold shadow-sm'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-blue-400' : 'text-zinc-400'
                          }`}
                        />
                        <span>{item.title}</span>
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/40">
          <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="font-semibold text-white">System Status</span>
              <span className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Supabase connected • v2.1 Admin
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
