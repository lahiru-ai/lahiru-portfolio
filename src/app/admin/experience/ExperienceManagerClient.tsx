'use client';

import React, { useState } from 'react';
import { ExperienceRecord } from '@/types/admin';
import { upsertExperienceAction, deleteExperienceAction } from '@/app/admin/actions/content';
import { useToast } from '@/components/admin/ToastProvider';
import {
  Plus,
  Trash2,
  Edit2,
  Briefcase,
  Search,
  Eye,
  EyeOff,
  Sparkles,
  X,
  MapPin,
  Calendar,
} from 'lucide-react';

export default function ExperienceManagerClient({
  initialExperience,
}: {
  initialExperience: ExperienceRecord[];
}) {
  const [experiences, setExperiences] = useState<ExperienceRecord[]>(initialExperience);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingExp, setEditingExp] = useState<ExperienceRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const filtered = experiences.filter(
    (e) =>
      e.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = () => {
    setEditingExp({
      id: `temp-${Date.now()}`,
      role: '',
      organization: '',
      type: 'Professional',
      location: 'Sri Lanka',
      period: '2024 - Present',
      start_date: null,
      end_date: null,
      is_current: true,
      description: [''],
      skills: ['React', 'TypeScript'],
      display_order: experiences.length + 1,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (exp: ExperienceRecord) => {
    setEditingExp({ ...exp });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (exp: ExperienceRecord) => {
    const nextStatus = exp.status === 'published' ? 'draft' : 'published';
    const updated = { ...exp, status: nextStatus as any };

    setExperiences((prev) => prev.map((e) => (e.id === exp.id ? updated : e)));
    const res = await upsertExperienceAction(updated);
    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast(`Experience set to ${nextStatus}`, 'success');
    }
  };

  const handleDelete = async (exp: ExperienceRecord) => {
    setExperiences((prev) => prev.filter((e) => e.id !== exp.id));
    setDeleteConfirmId(null);
    const res = await deleteExperienceAction(exp.id, exp.role);
    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast(`Deleted ${exp.role}`, 'success');
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    setSaving(true);
    const res = await upsertExperienceAction(editingExp);
    setSaving(false);

    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast('Experience saved successfully!', 'success');
      setExperiences((prev) => {
        const idx = prev.findIndex((e) => e.id === editingExp.id);
        if (idx >= 0) {
          const clone = [...prev];
          clone[idx] = editingExp;
          return clone;
        }
        return [...prev, editingExp];
      });
      setIsModalOpen(false);
      setEditingExp(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search roles or organizations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {filtered.map((exp) => (
          <div
            key={exp.id}
            className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-700 transition-colors shadow-sm"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-white">{exp.role}</span>
                <span className="text-xs text-blue-400 font-medium">@ {exp.organization}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                  {exp.type}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  {exp.period}
                </span>
                {exp.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {exp.location}
                  </span>
                )}
              </div>

              <div className="text-xs text-zinc-400 space-y-1 pt-1">
                {exp.description.map((d, i) => (
                  <p key={i}>• {d}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-400 font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800">
              <button
                onClick={() => handleTogglePublish(exp)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  exp.status === 'published'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                {exp.status === 'published' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{exp.status === 'published' ? 'Published' : 'Draft'}</span>
              </button>

              <button
                onClick={() => handleEdit(exp)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                title="Edit"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              {deleteConfirmId === exp.id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(exp)}
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
                  onClick={() => setDeleteConfirmId(exp.id)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                {editingExp.id.startsWith('temp-') ? 'Add Experience' : 'Edit Experience'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Role / Position
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.role}
                    onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.organization}
                    onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Period String
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.period || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                    placeholder="2023 - Present"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Type
                  </label>
                  <select
                    value={editingExp.type}
                    onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="Leadership">Leadership</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Description Bullet Points (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={editingExp.description.join('\n')}
                    onChange={(e) =>
                      setEditingExp({
                        ...editingExp,
                        description: e.target.value.split('\n').filter(Boolean),
                      })
                    }
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Skills Associated (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingExp.skills.join(', ')}
                    onChange={(e) =>
                      setEditingExp({
                        ...editingExp,
                        skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
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
                  {saving ? 'Saving...' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
