import React from 'react';
import { getProfile, getSiteSettings } from '@/lib/portfolioRepository';
import GeneralSettingsClient from './GeneralSettingsClient';

export const revalidate = 0;

export default async function AdminGeneralSettingsPage() {
  const [profile, settings] = await Promise.all([
    getProfile(),
    getSiteSettings(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            General Website Settings
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Global portfolio configurations, contact channels, and system defaults.
          </p>
        </div>
      </div>

      <GeneralSettingsClient profile={profile} settings={settings} />
    </div>
  );
}
