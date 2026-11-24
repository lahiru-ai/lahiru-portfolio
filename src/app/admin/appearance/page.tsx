import React from 'react';
import { getSiteSettings } from '@/lib/portfolioRepository';
import AppearanceClient from './AppearanceClient';

export const revalidate = 0;

export default async function AdminAppearancePage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Appearance &amp; Layout Settings
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Customize section visibility, accent colors, theme preferences, and navigational labels.
          </p>
        </div>
      </div>

      <AppearanceClient initialSettings={settings} />
    </div>
  );
}
