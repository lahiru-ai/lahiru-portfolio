'use client';

import React, { useState } from 'react';
import { AchievementRecord } from '@/types/admin';
import { upsertAchievementAction, deleteAchievementAction } from '@/app/admin/actions/content';
import { useToast } from '@/components/admin/ToastProvider';
import { Plus, Trash2, Edit2, Award, Eye, EyeOff, X } from 'lucide-react';

export default function AchievementsManagerClient({
  initialAchievements,
}: {
  initialAchievements: AchievementRecord[];
}) {
  const [items, setItems] = useState<AchievementRecord[]>(initialAchievements);
  const [editingItem, setEditingItem] = useState<AchievementRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleCreateNew = () => {
    setEditingItem({
      id: `temp-${Date.now()}`,
      title: '',
      category: 'Certification',
      issuer: '',
      date: '2024',
      description: '',
      badge: 'Certified',
      certificate_url: null,
      verification_url: null,
      display_order: items.length + 1,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: AchievementRecord) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (item: AchievementRecord) => {
    const nextStatus = item.status === 'published' ? 'draft' : 'published';
    const updated = { ...item, status: nextStatus as any };

    setItems((prev) => prev.map((e) => (e.id === item.id ? updated : e)));
    const res = await upsertAchievementAction(updated);
    if (res.error) showToast(res.error, 'error');
    else showToast(`Achievement status set to ${nextStatus}`, 'success');
  };

  const handleDelete = async (item: AchievementRecord) => {
    setItems((prev) => prev.filter((e) => e.id !== item.id));
    setDeleteConfirmId(null);
    const res = await deleteAchievementAction(item.id, item.title);
    if (res.error) showToast(res.error, 'error');
    else showToast(`Deleted ${item.title}`, 'success');
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    const res = await upsertAchievementAction(editingItem);
    setSaving(false);

    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast('Achievement saved successfully!', 'success');
      setItems((prev) => {
        const idx = prev.findIndex((e) => e.id === editingItem.id);
        if (idx >= 0) {
          const clone = [...prev];
          clone[idx] = editingItem;
          return clone;
        }
        return [...prev, editingItem];
      });
      setIsModalOpen(false);
      setEditingItem(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Achievement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between gap-4 hover:border-zinc-700 transition-colors shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {item.category}
                </span>
                <span className="text-xs text-zinc-400 font-mono">{item.date}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-zinc-400 font-medium">Issuer: {item.issuer}</p>
              {item.description && (
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
              <button
                onClick={() => handleTogglePublish(item)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors ${
                  item.status === 'published'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                {item.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <span>{item.status === 'published' ? 'Published' : 'Draft'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-800 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                {deleteConfirmId === item.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(item)}
                      className="px-2 py-1 rounded bg-red-600 text-white text-[10px]"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2 py-1 rounded text-zinc-400 text-[10px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-400" />
                {editingItem.id.startsWith('temp-') ? 'Add Achievement' : 'Edit Achievement'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Issuer
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.issuer}
                    onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.date || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    placeholder="2024"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white"
                >
                  {saving ? 'Saving...' : 'Save Achievement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
