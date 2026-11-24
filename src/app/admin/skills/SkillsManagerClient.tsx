'use client';

import React, { useState } from 'react';
import { SkillRecord } from '@/types/admin';
import { upsertSkillAction, deleteSkillAction } from '@/app/admin/actions/content';
import { useToast } from '@/components/admin/ToastProvider';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Cpu,
  Search,
  Filter,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

export default function SkillsManagerClient({
  initialSkills,
}: {
  initialSkills: SkillRecord[];
}) {
  const [skills, setSkills] = useState<SkillRecord[]>(initialSkills);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSkill, setEditingSkill] = useState<SkillRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'programming', label: 'Programming' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Databases' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'tools', label: 'Tools & DevOps' },
  ];

  const filteredSkills = skills.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.tag && s.tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCreateNew = () => {
    setEditingSkill({
      id: `skill-temp-${Date.now()}`,
      name: '',
      category: 'programming',
      level: 'Proficient',
      tag: '',
      icon: '',
      display_order: skills.length + 1,
      is_featured: true,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (skill: SkillRecord) => {
    setEditingSkill({ ...skill });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (skill: SkillRecord) => {
    const nextStatus = skill.status === 'published' ? 'draft' : 'published';
    const updated = { ...skill, status: nextStatus as any };

    setSkills((prev) => prev.map((s) => (s.id === skill.id ? updated : s)));
    const res = await upsertSkillAction(updated);
    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast(`Skill set to ${nextStatus}`, 'success');
    }
  };

  const handleDelete = async (skill: SkillRecord) => {
    setSkills((prev) => prev.filter((s) => s.id !== skill.id));
    setDeleteConfirmId(null);
    const res = await deleteSkillAction(skill.id, skill.name);
    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast(`Deleted skill ${skill.name}`, 'success');
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    setSaving(true);
    const res = await upsertSkillAction(editingSkill);
    setSaving(false);

    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast(`Skill ${editingSkill.name} saved successfully!`, 'success');
      setSkills((prev) => {
        const idx = prev.findIndex((s) => s.id === editingSkill.id);
        if (idx >= 0) {
          const clone = [...prev];
          clone[idx] = editingSkill;
          return clone;
        }
        return [...prev, editingSkill];
      });
      setIsModalOpen(false);
      setEditingSkill(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add Skill Button */}
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 active:scale-95 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Skill</span>
        </button>
      </div>

      {/* Skills Table / Cards */}
      <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/60 border-b border-zinc-800 text-[10px] uppercase font-mono tracking-wider text-zinc-400">
              <tr>
                <th className="py-3 px-4">Skill Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Context Tag</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredSkills.map((skill) => (
                <tr key={skill.id} className="hover:bg-zinc-850/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    <span>{skill.name}</span>
                    {skill.is_featured && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="capitalize px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 text-[11px]">
                      {skill.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-medium ${
                        skill.level === 'Advanced'
                          ? 'text-purple-400'
                          : skill.level === 'Proficient'
                          ? 'text-blue-400'
                          : skill.level === 'Intermediate'
                          ? 'text-emerald-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px]">
                    {skill.tag || '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-zinc-400">
                    {skill.display_order}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(skill)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors ${
                        skill.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                    >
                      {skill.status === 'published' ? (
                        <>
                          <Eye className="w-3 h-3" />
                          Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="Edit Skill"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {deleteConfirmId === skill.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(skill)}
                            className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-500 text-[10px]"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white text-[10px]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(skill.id)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                {editingSkill.id.startsWith('skill-temp-') ? 'Create New Skill' : 'Edit Skill'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  value={editingSkill.name}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, name: e.target.value })
                  }
                  placeholder="e.g. Next.js, Python, PostgreSQL"
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={editingSkill.category}
                    onChange={(e) =>
                      setEditingSkill({
                        ...editingSkill,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="programming">Programming</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="database">Database</option>
                    <option value="ai">AI &amp; ML</option>
                    <option value="tools">Tools &amp; DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Proficiency Level
                  </label>
                  <select
                    value={editingSkill.level}
                    onChange={(e) =>
                      setEditingSkill({
                        ...editingSkill,
                        level: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Foundational">Foundational</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Proficient">Proficient</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Context Tagline
                </label>
                <input
                  type="text"
                  value={editingSkill.tag || ''}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, tag: e.target.value })
                  }
                  placeholder="e.g. Modern ES6+ & Async"
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingSkill.display_order}
                    onChange={(e) =>
                      setEditingSkill({
                        ...editingSkill,
                        display_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingSkill.is_featured}
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          is_featured: e.target.checked,
                        })
                      }
                      className="rounded bg-zinc-900 border-zinc-800 text-blue-600 focus:ring-0"
                    />
                    Featured on Homepage
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/20"
                >
                  {saving ? 'Saving...' : 'Save Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
