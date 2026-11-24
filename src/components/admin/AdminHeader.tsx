'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/admin/actions/auth';
import {
  Menu,
  Bell,
  ExternalLink,
  LogOut,
  User,
  ChevronRight,
  Shield,
  CheckCircle2,
} from 'lucide-react';

export default function AdminHeader({
  onToggleSidebar,
  userEmail,
}: {
  onToggleSidebar: () => void;
  userEmail?: string;
}) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Compute breadcrumbs
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const title =
      segment === 'admin'
        ? 'Dashboard'
        : segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
    return { title, href };
  });

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#070709]/80 backdrop-blur-xl border-b border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 lg:hidden transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center gap-1.5 text-xs text-zinc-400">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.href}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />}
              {idx === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-white tracking-wide">
                  {crumb.title}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-zinc-200 transition-colors"
                >
                  {crumb.title}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Public Website Preview Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all shadow-sm"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
        </Link>

        {/* Notifications Indicator */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#070709]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-4 text-xs z-50">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
                <span className="font-semibold text-white">System Alerts</span>
                <span className="text-[10px] text-zinc-400">All Systems Normal</span>
              </div>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-zinc-200">Supabase Connected</p>
                    <p className="text-[11px] text-zinc-400">
                      Database migrations ready. Synchronized with Next.js App Router.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 transition-all text-xs"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              L
            </div>
            <span className="hidden md:inline font-medium text-zinc-200 max-w-[120px] truncate">
              {userEmail || 'Administrator'}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-2 text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-zinc-800/80 mb-1">
                <p className="font-medium text-white truncate">
                  {userEmail || 'Administrator'}
                </p>
                <p className="text-[10px] text-blue-400 font-mono">
                  Super Admin
                </p>
              </div>

              <Link
                href="/admin/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
              >
                <User className="w-4 h-4 text-zinc-400" />
                <span>Profile Settings</span>
              </Link>

              <Link
                href="/admin/security"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
              >
                <Shield className="w-4 h-4 text-zinc-400" />
                <span>Security &amp; Logs</span>
              </Link>

              <div className="my-1 border-t border-zinc-800/80" />

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
