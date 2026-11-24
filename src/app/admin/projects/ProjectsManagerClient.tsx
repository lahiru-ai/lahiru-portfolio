'use client';

import React, { useState } from 'react';
import { ProjectRecord } from '@/types/admin';
import { upsertProjectAction, deleteProjectAction } from '@/app/admin/actions/content';
import { useToast } from '@/components/admin/ToastProvider';
import {
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  FolderGit2,
  Search,
  Eye,
  EyeOff,
  Sparkles,
  X,
  Layers,
} from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import Image from 'next/image';

export default function ProjectsManagerClient({
  initialProjects,
}: {
  initialProjects: ProjectRecord[];
}) {
  const [projects, setProjects] = useState<ProjectRecord[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateNew = () => {
    setEditingProject({
      id: `temp-${Date.now()}`,
      slug: `project-${Date.now()}`,
      title: '',
      tagline: '',
      short_description: '',
      full_description: '',
      category: 'Web Applications',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      features: [],
      image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      gallery_urls: [],
      github_url: 'https://github.com/lahiru-ai',
      live_url: '',
      display_order: projects.length + 1,
      is_featured: true,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (proj: ProjectRecord) => {
    setEditingProject({ ...proj });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (proj: ProjectRecord) => {
    const nextStatus = proj.status === 'published' ? 'draft' : 'published';
    const updated = { ...proj, status: nextStatus as any };

    setProjects((prev) => prev.map((p) => (p.id === proj.id ? updated : p)));
    const res = await upsertProjectAction(updated);
    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast(`Project status changed to ${nextStatus}`, 'success');
    }
  };

  const handleDelete = async (proj: ProjectRecord) => {
    setProjects((prev) => prev.filter((p) => p.id !== proj.id));
    setDeleteConfirmId(null);
    const res = await deleteProjectAction(proj.id, proj.title);
    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast(`Deleted project: ${proj.title}`, 'success');
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaving(true);
    const res = await upsertProjectAction(editingProject);
    setSaving(false);

    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast(`Project "${editingProject.title}" saved successfully!`, 'success');
      setProjects((prev) => {
        const idx = prev.findIndex((p) => p.id === editingProject.id);
        if (idx >= 0) {
          const clone = [...prev];
          clone[idx] = editingProject;
          return clone;
        }
        return [...prev, editingProject];
      });
      setIsModalOpen(false);
      setEditingProject(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Search & Create Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search projects by title or stack..."
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
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all shadow-sm"
          >
            {/* Project Image banner */}
            <div className="relative h-44 w-full bg-zinc-950 overflow-hidden">
              <img
                src={proj.image_url}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-zinc-200 border border-white/10">
                  {proj.category}
                </span>
                {proj.is_featured && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    Featured
                  </span>
                )}
              </div>

              <div className="absolute top-3 right-3">
                <button
                  onClick={() => handleTogglePublish(proj)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium backdrop-blur-md border shadow-md transition-colors ${
                    proj.status === 'published'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      : 'bg-zinc-900/80 text-zinc-400 border-zinc-700'
                  }`}
                >
                  {proj.status === 'published' ? (
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
              </div>
            </div>

            {/* Project Meta */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                  {proj.title}
                </h3>
                {proj.tagline && (
                  <p className="text-xs font-medium text-zinc-400 mt-0.5">
                    {proj.tagline}
                  </p>
                )}
                <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                  {proj.short_description || proj.full_description}
                </p>
              </div>

              {/* Technologies tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {proj.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="px-5 py-3.5 border-t border-zinc-800/80 bg-zinc-950/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {proj.github_url && (
                  <a
                    href={proj.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {proj.live_url && (
                  <a
                    href={proj.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEdit(proj)}
                  className="px-3 py-1 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>

                {deleteConfirmId === proj.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(proj)}
                      className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px]"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2 py-1 rounded-lg text-zinc-400 text-[10px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(proj.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Editor Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 shrink-0">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-blue-400" />
                {editingProject.id.startsWith('temp-') ? 'Create Project' : 'Edit Project CMS'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 overflow-y-auto py-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                        slug:
                          editingProject.slug ||
                          e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      })
                    }
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={editingProject.tagline || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, tagline: e.target.value })
                    }
                    placeholder="Brief highlight or motto"
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.short_description || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        short_description: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Full Project Overview
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.full_description || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        full_description: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Banner Image URL
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.image_url}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, image_url: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingProject.technologies.join(', ')}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        technologies: e.target.value
                          .split(',')
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.github_url || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        github_url: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.live_url || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        live_url: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Web Applications">Web Applications</option>
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="AI & Data">AI &amp; Data</option>
                    <option value="Educational">Educational</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Private)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_featured}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        is_featured: e.target.checked,
                      })
                    }
                    className="rounded bg-zinc-900 border-zinc-800 text-blue-600 focus:ring-0"
                  />
                  Feature prominently on Homepage 3D Showcase
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800 shrink-0">
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
                  className="px-6 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/20"
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
