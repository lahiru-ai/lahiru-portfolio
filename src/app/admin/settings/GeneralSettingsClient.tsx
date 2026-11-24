'use client';

import React, { useState } from 'react';
import { ProfileRecord, SiteSettingsRecord } from '@/types/admin';
import { updateSiteSettingsAction, updateProfileAction } from '@/app/admin/actions/content';
import { useToast } from '@/components/admin/ToastProvider';
import { Settings, Save, Mail, User, Shield } from 'lucide-react';

export default function GeneralSettingsClient({
  profile,
  settings,
}: {
  profile: ProfileRecord;
  settings: SiteSettingsRecord;
}) {
  const [profileData, setProfileData] = useState<ProfileRecord>(profile);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateProfileAction(profileData);
    setSaving(false);

    if (res.error) showToast(res.error, 'error');
    else showToast('General settings updated!', 'success');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
          <User className="w-4 h-4 text-blue-400" />
          Portfolio Owner &amp; Contact Channel
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Owner Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Primary Contact Email
            </label>
            <input
              type="email"
              value={profileData.social_email || ''}
              onChange={(e) => setProfileData({ ...profileData, social_email: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Primary Location
            </label>
            <input
              type="text"
              value={profileData.location || ''}
              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Country
            </label>
            <input
              type="text"
              value={profileData.country || ''}
              onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
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
          <span>Save General Settings</span>
        </button>
      </div>
    </form>
  );
}
