'use client';

import React, { useState } from 'react';
import { SiteSettingsRecord } from '@/types/admin';
import { updateSiteSettingsAction } from '@/app/admin/actions/content';
import { useToast } from '@/components/admin/ToastProvider';
import { Palette, Eye, Layout, Save, Check } from 'lucide-react';

export default function AppearanceClient({
  initialSettings,
}: {
  initialSettings: SiteSettingsRecord;
}) {
  const [settings, setSettings] = useState<SiteSettingsRecord>(initialSettings);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleToggle = (key: keyof SiteSettingsRecord) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateSiteSettingsAction(settings);
    setSaving(false);

    if (res.error) showToast(res.error, 'error');
    else showToast('Appearance settings saved and applied!', 'success');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      {/* Theme & Brand Accent */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
          <Palette className="w-4 h-4 text-blue-400" />
          Color Theme &amp; Accent
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Primary Accent Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.accent_color}
                onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={settings.accent_color}
                onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Theme Mode
            </label>
            <select
              value={settings.theme_mode}
              onChange={(e) => setSettings({ ...settings, theme_mode: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="dark">Deep Space Dark (Default)</option>
              <option value="cyber">Cyberpunk Midnight</option>
            </select>
          </div>
        </div>
      </div>

      {/* Homepage Section Visibility */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
          <Eye className="w-4 h-4 text-blue-400" />
          Homepage Section Visibility
        </h2>
        <p className="text-xs text-zinc-400">
          Toggle which sections appear on the live portfolio homepage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: 'show_hero', label: 'Hero 3D Avatar & Header' },
            { key: 'show_about', label: 'About & Career Narrative' },
            { key: 'show_skills', label: 'Technical Skills Matrix' },
            { key: 'show_projects', label: 'Featured Projects CMS' },
            { key: 'show_experience', label: 'Professional Experience' },
            { key: 'show_education', label: 'Education & Academics' },
            { key: 'show_achievements', label: 'Achievements & Honors' },
            { key: 'show_contact', label: 'Contact Section' },
          ].map(({ key, label }) => {
            const isVisible = (settings as any)[key] ?? true;
            return (
              <label
                key={key}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors"
              >
                <span className="text-xs font-medium text-zinc-200">{label}</span>
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => handleToggle(key as any)}
                  className="rounded bg-zinc-900 border-zinc-800 text-blue-600 focus:ring-0"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Footer text */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Layout className="w-4 h-4 text-blue-400" />
          Footer Information
        </h2>
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
            Footer Copyright / Subtext
          </label>
          <input
            type="text"
            value={settings.footer_text}
            onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold transition-all shadow-lg shadow-blue-600/20"
        >
          {saving ? 'Saving...' : <Save className="w-4 h-4" />}
          <span>Save Appearance Settings</span>
        </button>
      </div>
    </form>
  );
}
