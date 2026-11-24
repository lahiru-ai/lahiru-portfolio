'use client';

import React, { useState } from 'react';
import { X, Sliders, Save, RotateCcw, Copy, Check, Info, Shield, Sparkles } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AdminPreviewModal() {
  const { data, updatePersonalInfo, updateAvailability, resetToDefault, isAdminOpen, setIsAdminOpen } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'profile' | 'availability' | 'contact' | 'export'>('profile');
  const [copiedJson, setCopiedJson] = useState(false);

  if (!isAdminOpen) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Admin Studio &amp; Architecture</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  v1.0 Preview
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Live configure personal information, availability, and export changes to Git.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/30 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'availability'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Availability &amp; Status
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Contact &amp; Links
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'export'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Export JSON Schema
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-zinc-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Edits made here reflect immediately on the live portfolio view behind this window.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Full Name</label>
                <input
                  type="text"
                  value={data.personalInfo.name}
                  onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Short Name</label>
                <input
                  type="text"
                  value={data.personalInfo.shortName}
                  onChange={(e) => updatePersonalInfo({ shortName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Headline</label>
                <input
                  type="text"
                  value={data.personalInfo.headline}
                  onChange={(e) => updatePersonalInfo({ headline: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Subheadline &amp; Introduction</label>
                <textarea
                  rows={3}
                  value={data.personalInfo.subheadline}
                  onChange={(e) => updatePersonalInfo({ subheadline: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Location</label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Availability Status</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['available', 'selective', 'busy'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() =>
                        updateAvailability(
                          st,
                          st === 'available'
                            ? 'Available for Technical Collaborations & Opportunities'
                            : st === 'selective'
                            ? 'Selectively Considering High-Impact Roles'
                            : 'Currently Engaged in Project Deliverables'
                        )
                      }
                      className={`p-3 rounded-xl border text-xs font-medium capitalize flex items-center justify-center gap-2 transition-all ${
                        data.personalInfo.availability.status === st
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          st === 'available'
                            ? 'bg-emerald-400'
                            : st === 'selective'
                            ? 'bg-blue-400'
                            : 'bg-amber-400'
                        }`}
                      />
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Custom Status Label</label>
                <input
                  type="text"
                  value={data.personalInfo.availability.label}
                  onChange={(e) =>
                    updateAvailability(data.personalInfo.availability.status, e.target.value)
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-[11px] font-mono text-zinc-400">Live Status Preview:</span>
                <div className="flex items-center gap-2 text-xs font-medium text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{data.personalInfo.availability.label}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Email Address</label>
                <input
                  type="email"
                  value={data.personalInfo.socialLinks.email}
                  onChange={(e) =>
                    updatePersonalInfo({
                      socialLinks: { ...data.personalInfo.socialLinks, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">GitHub Profile URL</label>
                <input
                  type="url"
                  value={data.personalInfo.socialLinks.github}
                  onChange={(e) =>
                    updatePersonalInfo({
                      socialLinks: { ...data.personalInfo.socialLinks, github: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={data.personalInfo.socialLinks.linkedin}
                  onChange={(e) =>
                    updatePersonalInfo({
                      socialLinks: { ...data.personalInfo.socialLinks, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-zinc-300 space-y-1">
                <span className="font-semibold text-purple-300">Future Dashboard Architecture:</span>
                <p>
                  Copy this generated JSON to replace the contents in <code className="text-white bg-black/40 px-1 py-0.5 rounded font-mono">src/data/portfolioData.ts</code> whenever you want to commit your edits to Git and Vercel.
                </p>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-xl bg-black/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 max-h-64 overflow-y-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
                <button
                  onClick={handleCopyJson}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white flex items-center gap-1.5 border border-zinc-700 transition-colors"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full JSON</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Original Defaults</span>
          </button>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-md"
          >
            Apply &amp; Close Studio
          </button>
        </div>
      </div>
    </div>
  );
}
