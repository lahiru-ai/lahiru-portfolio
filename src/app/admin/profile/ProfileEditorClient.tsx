'use client';

import React, { useState } from 'react';
import { ProfileRecord } from '@/types/admin';
import { updateProfileAction } from '@/app/admin/actions/content';
import { useToast } from '@/components/admin/ToastProvider';
import {
  Save,
  User,
  Globe,
  Mail,
  MapPin,
  Briefcase,
  Sparkles,
  RotateCcw,
  Upload,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import Image from 'next/image';

export default function ProfileEditorClient({
  initialProfile,
}: {
  initialProfile: ProfileRecord;
}) {
  const [formData, setFormData] = useState<ProfileRecord>(initialProfile);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBioChange = (idx: number, val: string) => {
    const newBio = [...formData.bio];
    newBio[idx] = val;
    setFormData((prev) => ({ ...prev, bio: newBio }));
  };

  const addBioParagraph = () => {
    setFormData((prev) => ({ ...prev, bio: [...prev.bio, ''] }));
  };

  const removeBioParagraph = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      bio: prev.bio.filter((_, i) => i !== idx),
    }));
  };

  const handleReset = () => {
    setFormData(initialProfile);
    showToast('Changes discarded', 'info');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await updateProfileAction(formData);
    setSaving(false);

    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast('Profile updated and synchronized successfully!', 'success');
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl">
      {/* Identity & Basic Info Card */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
          <User className="w-4 h-4 text-blue-400" />
          Personal Identity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Full Legal Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Short Display Name
            </label>
            <input
              type="text"
              name="short_name"
              value={formData.short_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Professional Headline
            </label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Hero Subheadline
            </label>
            <textarea
              name="subheadline"
              rows={2}
              value={formData.subheadline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              City / Province
            </label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Avatar & Documents */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
          <Upload className="w-4 h-4 text-blue-400" />
          Profile Photographs &amp; Resume
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Avatar Image URL
            </label>
            <input
              type="text"
              name="avatar_url"
              value={formData.avatar_url || ''}
              onChange={handleChange}
              placeholder="/avatar-realistic.png or Supabase storage URL"
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
            <p className="text-[11px] text-zinc-400 mt-1.5">
              Enter a relative path, uploaded Media Library URL, or remote CDN link.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              CV / Resume Document URL
            </label>
            <input
              type="text"
              name="resume_url"
              value={formData.resume_url || ''}
              onChange={handleChange}
              placeholder="/documents/Lahiru_Ranathunga_CV.pdf"
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* About Description & Methodology */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Biography &amp; Narrative
          </h2>
          <button
            type="button"
            onClick={addBioParagraph}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium"
          >
            + Add Bio Paragraph
          </button>
        </div>

        <div className="space-y-3">
          {formData.bio.map((para, idx) => (
            <div key={idx} className="flex gap-2">
              <textarea
                rows={3}
                value={para}
                onChange={(e) => handleBioChange(idx, e.target.value)}
                placeholder={`Paragraph ${idx + 1}`}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
              />
              {formData.bio.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBioParagraph(idx)}
                  className="px-3 py-1 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 text-xs transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/60">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Engineering Approach
            </label>
            <textarea
              name="approach"
              rows={3}
              value={formData.approach || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Career Goals &amp; Aspirations
            </label>
            <textarea
              name="career_goals"
              rows={3}
              value={formData.career_goals || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Availability Status */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
          <Briefcase className="w-4 h-4 text-blue-400" />
          Availability &amp; Work Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Status Indicator
            </label>
            <select
              name="availability_status"
              value={formData.availability_status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="available">Available (Green)</option>
              <option value="selective">Selective (Amber)</option>
              <option value="busy">Busy (Red)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Status Badge Label
            </label>
            <input
              type="text"
              name="availability_label"
              value={formData.availability_label || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Availability Description
            </label>
            <input
              type="text"
              name="availability_description"
              value={formData.availability_description || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
          <Globe className="w-4 h-4 text-blue-400" />
          Social &amp; Professional Links
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />
              GitHub Profile URL
            </label>
            <input
              type="url"
              name="social_github"
              value={formData.social_github || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <LinkedinIcon className="w-3.5 h-3.5 text-zinc-400" />
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              name="social_linkedin"
              value={formData.social_linkedin || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              Public Contact Email
            </label>
            <input
              type="email"
              name="social_email"
              value={formData.social_email || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TwitterIcon className="w-3.5 h-3.5 text-zinc-400" />
              Twitter / X Handle
            </label>
            <input
              type="text"
              name="social_twitter"
              value={formData.social_twitter || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 backdrop-blur-xl flex items-center justify-between shadow-2xl">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Cancel &amp; Reset</span>
        </button>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
}
