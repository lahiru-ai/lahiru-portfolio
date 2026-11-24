'use client';

import React, { useState } from 'react';
import { EducationRecord } from '@/types/admin';
import { upsertEducationAction, deleteEducationAction } from '@/app/admin/actions/content';
import { useToast } from '@/components/admin/ToastProvider';
import { Plus, Trash2, Edit2, GraduationCap, Eye, EyeOff, X } from 'lucide-react';

export default function EducationManagerClient({
  initialEducation,
}: {
  initialEducation: EducationRecord[];
}) {
  const [items, setItems] = useState<EducationRecord[]>(initialEducation);
  const [editingItem, setEditingItem] = useState<EducationRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleCreateNew = () => {
    setEditingItem({
      id: `temp-${Date.now()}`,
      institution: '',
      degree: '',
      field_of_study: 'Computing & Information Systems',
      period: '2022 - Present',
      location: 'Sri Lanka',
      status: 'Ongoing',
      highlights: [''],
      display_order: items.length + 1,
      publication_status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: EducationRecord) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (item: EducationRecord) => {
    const nextStatus = item.publication_status === 'published' ? 'draft' : 'published';
    const updated = { ...item, publication_status: nextStatus as any };

    setItems((prev) => prev.map((e) => (e.id === item.id ? updated : e)));
    const res = await upsertEducationAction(updated);
    if (res.error) showToast(res.error, 'error');
    else showToast(`Education status changed to ${nextStatus}`, 'success');
  };

  const handleDelete = async (item: EducationRecord) => {
    setItems((prev) => prev.filter((e) => e.id !== item.id));
    setDeleteConfirmId(null);
    const res = await deleteEducationAction(item.id, item.degree);
    if (res.error) showToast(res.error, 'error');
    else showToast(`Deleted ${item.degree}`, 'success');
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    const res = await upsertEducationAction(editingItem);
    setSaving(false);

    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast('Education saved successfully!', 'success');
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
          <span>New Education</span>
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
                <span className="text-sm font-bold text-white">{item.degree}</span>
                <span className="text-xs text-blue-400 font-medium">@ {item.institution}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {item.period} {item.location ? `• ${item.location}` : ''}
              </p>
              <div className="text-xs text-zinc-400 space-y-1 pt-1">
                {item.highlights.map((h, i) => (
                  <p key={i}>• {h}</p>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleTogglePublish(item)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  item.publication_status === 'published'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                {item.publication_status === 'published' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{item.publication_status === 'published' ? 'Published' : 'Draft'}</span>
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
                <GraduationCap className="w-4 h-4 text-blue-400" />
                {editingItem.id.startsWith('temp-') ? 'Add Education' : 'Edit Education'}
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
                  Institution Name
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.institution}
                  onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Degree / Qualification
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.degree}
                  onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Period String
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.period || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.highlights.join('\n')}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      highlights: e.target.value.split('\n').filter(Boolean),
                    })
                  }
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
                  {saving ? 'Saving...' : 'Save Education'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
