'use client';

import React, { useState } from 'react';
import { MediaAssetRecord } from '@/types/admin';
import { registerMediaAssetAction, deleteMediaAssetAction } from '@/app/admin/actions/content';
import { useToast } from '@/components/admin/ToastProvider';
import {
  Upload,
  Copy,
  Check,
  Trash2,
  Image as ImageIcon,
  FileText,
  Search,
  ExternalLink,
  FolderOpen,
} from 'lucide-react';

export default function MediaLibraryClient({
  initialAssets,
}: {
  initialAssets: MediaAssetRecord[];
}) {
  const [assets, setAssets] = useState<MediaAssetRecord[]>(initialAssets);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadCategory, setUploadCategory] = useState<'profile' | 'project' | 'certificate' | 'event' | 'general'>('general');
  const [newAssetUrl, setNewAssetUrl] = useState('');
  const [newAssetName, setNewAssetName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { showToast } = useToast();

  const filteredAssets = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyUrl = (asset: MediaAssetRecord) => {
    navigator.clipboard.writeText(asset.file_url);
    setCopiedId(asset.id);
    showToast(`Copied URL for ${asset.name}`, 'info');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (asset: MediaAssetRecord) => {
    setAssets((prev) => prev.filter((a) => a.id !== asset.id));
    const res = await deleteMediaAssetAction(asset.id, asset.name);
    if (res.error) showToast(res.error, 'error');
    else showToast(`Removed ${asset.name}`, 'success');
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetUrl || !newAssetName) return;

    setIsUploading(true);
    const newAsset = {
      name: newAssetName,
      file_url: newAssetUrl,
      file_type: newAssetUrl.endsWith('.pdf') ? 'application/pdf' : 'image/webp',
      file_size: 102400,
      category: uploadCategory,
    };

    const res = await registerMediaAssetAction(newAsset);
    setIsUploading(false);

    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast('Media registered into library!', 'success');
      setAssets((prev) => [
        {
          ...newAsset,
          id: `media-${Date.now()}`,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setNewAssetName('');
      setNewAssetUrl('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Add / Register Media Box */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-blue-400" />
          Add Media to Library (Supabase / URL / CDN)
        </h2>

        <form onSubmit={handleAddMedia} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              File Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. project-preview.png"
              value={newAssetName}
              onChange={(e) => setNewAssetName(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Direct File / Storage URL
            </label>
            <input
              type="text"
              required
              placeholder="https://... or /avatar-realistic.png"
              value={newAssetUrl}
              onChange={(e) => setNewAssetUrl(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 mb-2"
            >
              <option value="general">General</option>
              <option value="profile">Profile</option>
              <option value="project">Project</option>
              <option value="certificate">Certificate</option>
              <option value="event">Event</option>
            </select>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-600/20 active:scale-95"
            >
              {isUploading ? 'Registering...' : 'Add Media'}
            </button>
          </div>
        </form>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAssets.map((asset) => {
          const isImage = asset.file_type.includes('image') || asset.file_url.match(/\.(png|jpg|jpeg|webp|gif|svg)$/i);

          return (
            <div
              key={asset.id}
              className="rounded-2xl bg-zinc-900/40 border border-zinc-800 overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all shadow-sm"
            >
              {/* Preview Thumbnail */}
              <div className="relative h-36 w-full bg-zinc-950 flex items-center justify-center overflow-hidden">
                {isImage ? (
                  <img
                    src={asset.file_url}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-zinc-500 gap-1">
                    <FileText className="w-8 h-8 text-blue-400" />
                    <span className="text-[10px] font-mono uppercase">{asset.file_type}</span>
                  </div>
                )}

                <div className="absolute top-2 left-2">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 border border-white/10 uppercase">
                    {asset.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <p className="text-xs font-semibold text-white truncate" title={asset.name}>
                    {asset.name}
                  </p>
                  <p className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                    {asset.file_url}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs">
                  <button
                    onClick={() => handleCopyUrl(asset)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <a
                      href={asset.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded-lg text-zinc-400 hover:text-white"
                      title="Open file"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleDelete(asset)}
                      className="p-1 rounded-lg text-zinc-400 hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
