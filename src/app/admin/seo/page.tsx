import React from 'react';
import { getSiteSettings } from '@/lib/portfolioRepository';
import SeoSettingsClient from './SeoSettingsClient';

export const revalidate = 0;

export default async function AdminSeoPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            SEO &amp; Metadata Settings
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure site title, meta description, keywords, Open Graph image, and social cards.
          </p>
        </div>
      </div>

      <SeoSettingsClient initialSettings={settings} />
    </div>
  );
}
