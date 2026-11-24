'use client';

import React, { useState } from 'react';
import { SiteSettingsRecord } from '@/types/admin';
import { updateSiteSettingsAction } from '@/app/admin/actions/content';
import { useToast } from '@/components/admin/ToastProvider';
import { Search, Save, Globe, Share2 } from 'lucide-react';

export default function SeoSettingsClient({
  initialSettings,
}: {
  initialSettings: SiteSettingsRecord;
}) {
  const [settings, setSettings] = useState<SiteSettingsRecord>(initialSettings);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateSiteSettingsAction(settings);
    setSaving(false);

    if (res.error) showToast(res.error, 'error');
    else showToast('SEO settings successfully updated!', 'success');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      {/* General Search Engine Listing */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
          <Search className="w-4 h-4 text-blue-400" />
          Search Engine Metadata
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Website Meta Title
            </label>
            <input
              type="text"
              name="site_title"
              value={settings.site_title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-zinc-400 mt-1">Recommended length: 50-60 characters</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Meta Description
            </label>
            <textarea
              name="meta_description"
              rows={3}
              value={settings.meta_description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-zinc-400 mt-1">Recommended length: 150-160 characters</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Keywords (Comma separated)
            </label>
            <input
              type="text"
              value={settings.keywords.join(', ')}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
                })
              }
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Social Graph Sharing */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
          <Share2 className="w-4 h-4 text-blue-400" />
          Open Graph &amp; Social Sharing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Canonical URL
            </label>
            <input
              type="url"
              name="canonical_url"
              value={settings.canonical_url || ''}
              onChange={handleChange}
              placeholder="https://lahiru-ai.github.io"
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Open Graph Image URL
            </label>
            <input
              type="text"
              name="og_image_url"
              value={settings.og_image_url || ''}
              onChange={handleChange}
              placeholder="/avatar-realistic.png"
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Twitter Creator Handle
            </label>
            <input
              type="text"
              name="twitter_handle"
              value={settings.twitter_handle || ''}
              onChange={handleChange}
              placeholder="@lahiru_ai"
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold transition-all shadow-lg shadow-blue-600/20"
        >
          {saving ? 'Saving...' : <Save className="w-4 h-4" />}
          <span>Save SEO Settings</span>
        </button>
      </div>
    </form>
  );
}
