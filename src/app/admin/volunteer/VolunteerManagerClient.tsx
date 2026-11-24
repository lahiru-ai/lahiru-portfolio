'use client';

import React, { useState } from 'react';
import { VolunteerActivityRecord } from '@/types/admin';
import { upsertVolunteerActivityAction, deleteVolunteerActivityAction } from '@/app/admin/actions/content';
import { useToast } from '@/components/admin/ToastProvider';
import { Plus, Trash2, Edit2, HeartHandshake, Eye, EyeOff, X } from 'lucide-react';

export default function VolunteerManagerClient({
  initialActivities,
}: {
  initialActivities: VolunteerActivityRecord[];
}) {
  const [items, setItems] = useState<VolunteerActivityRecord[]>(initialActivities);
  const [editingItem, setEditingItem] = useState<VolunteerActivityRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleCreateNew = () => {
    setEditingItem({
      id: `temp-${Date.now()}`,
      organization: 'IEEE Student Branch',
      role: 'Tech Contributor',
      project_name: '',
      description: '',
      date: '2024',
      event_images: [],
      related_links: [],
      display_order: items.length + 1,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: VolunteerActivityRecord) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (item: VolunteerActivityRecord) => {
    const nextStatus = item.status === 'published' ? 'draft' : 'published';
    const updated = { ...item, status: nextStatus as any };

    setItems((prev) => prev.map((e) => (e.id === item.id ? updated : e)));
    const res = await upsertVolunteerActivityAction(updated);
    if (res.error) showToast(res.error, 'error');
    else showToast(`Volunteer activity status set to ${nextStatus}`, 'success');
  };

  const handleDelete = async (item: VolunteerActivityRecord) => {
    setItems((prev) => prev.filter((e) => e.id !== item.id));
    setDeleteConfirmId(null);
    const res = await deleteVolunteerActivityAction(item.id, item.project_name);
    if (res.error) showToast(res.error, 'error');
    else showToast(`Deleted ${item.project_name}`, 'success');
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    const res = await upsertVolunteerActivityAction(editingItem);
    setSaving(false);

    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast('Volunteer activity saved successfully!', 'success');
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
          <span>New Activity</span>
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-700 transition-colors shadow-sm"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-white">{item.project_name}</span>
                <span className="text-xs text-blue-400 font-medium">@ {item.organization}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                  {item.role}
                </span>
                <span className="text-xs text-zinc-400 font-mono">• {item.date}</span>
              </div>
              {item.description && (
                <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleTogglePublish(item)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  item.status === 'published'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                {item.status === 'published' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{item.status === 'published' ? 'Published' : 'Draft'}</span>
              </button>

              <button
                onClick={() => handleEdit(item)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              {deleteConfirmId === item.id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(item)}
                    className="px-2.5 py-1.5 rounded-lg bg-red-600 text-white text-xs"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-2.5 py-1.5 rounded-lg text-zinc-400 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-blue-400" />
                {editingItem.id.startsWith('temp-') ? 'Add Activity' : 'Edit Activity'}
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
                  Activity or Project Name
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.project_name}
                  onChange={(e) => setEditingItem({ ...editingItem, project_name: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.organization}
                    onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Date / Year
                </label>
                <input
                  type="text"
                  value={editingItem.date || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
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
                  {saving ? 'Saving...' : 'Save Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
