import React from 'react';
import Link from 'next/link';
import {
  getProfile,
  getSkills,
  getProjects,
  getExperience,
  getEducation,
  getAchievements,
  getVolunteerActivities,
  getActivityLogs,
} from '@/lib/portfolioRepository';
import {
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  HeartHandshake,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Plus,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const [
    profile,
    skills,
    projects,
    experience,
    education,
    achievements,
    volunteer,
    logs,
  ] = await Promise.all([
    getProfile(),
    getSkills(),
    getProjects(),
    getExperience(),
    getEducation(),
    getAchievements(),
    getVolunteerActivities(),
    getActivityLogs(),
  ]);

  // Aggregate stats
  const publishedProjects = projects.filter((p) => p.status === 'published').length;
  const draftProjects = projects.filter((p) => p.status === 'draft').length;

  const publishedSkills = skills.filter((s) => s.status === 'published').length;
  const draftSkills = skills.filter((s) => s.status === 'draft').length;

  const totalContentEntries =
    projects.length +
    skills.length +
    experience.length +
    education.length +
    achievements.length +
    volunteer.length;

  const totalPublished =
    publishedProjects +
    publishedSkills +
    experience.filter((e) => e.status === 'published').length +
    education.filter((ed) => ed.publication_status === 'published').length +
    achievements.filter((a) => a.status === 'published').length +
    volunteer.filter((v) => v.status === 'published').length;

  const totalDrafts = totalContentEntries - totalPublished;

  const statCards = [
    {
      title: 'Published Projects',
      value: publishedProjects,
      total: projects.length,
      icon: FolderGit2,
      href: '/admin/projects',
      color: 'from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30',
    },
    {
      title: 'Technical Skills',
      value: publishedSkills,
      total: skills.length,
      icon: Cpu,
      href: '/admin/skills',
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    },
    {
      title: 'Experience Items',
      value: experience.length,
      total: experience.length,
      icon: Briefcase,
      href: '/admin/experience',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      title: 'Education & Honors',
      value: education.length,
      total: education.length,
      icon: GraduationCap,
      href: '/admin/education',
      color: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30',
    },
    {
      title: 'Achievements',
      value: achievements.length,
      total: achievements.length,
      icon: Award,
      href: '/admin/achievements',
      color: 'from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30',
    },
    {
      title: 'Volunteer Activities',
      value: volunteer.length,
      total: volunteer.length,
      icon: HeartHandshake,
      href: '/admin/volunteer',
      color: 'from-rose-500/20 to-pink-500/10 text-rose-400 border-rose-500/30',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Welcome */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admin Studio v2.1 • Production Ready</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {profile.short_name || 'Lahiru'}
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Manage personal projects, skills, education, and site configurations in real-time. Changes sync directly to the PostgreSQL database and public portfolio.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>
          <Link
            href="/admin/skills"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700/80 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white text-xs font-medium border border-zinc-800 transition-all"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/80 transition-all duration-200 flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  {card.title}
                </span>
                <div
                  className={`p-2.5 rounded-xl bg-gradient-to-br border ${card.color} group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {card.value}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1 group-hover:text-zinc-200 transition-colors">
                  <span>Manage</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Content Publishing Health & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution */}
        <div className="lg:col-span-1 p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Content Publishing Status
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Published records are visible to public visitors. Drafts remain securely private.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Published ({totalPublished})
                  </span>
                  <span className="text-zinc-400">
                    {totalContentEntries > 0
                      ? Math.round((totalPublished / totalContentEntries) * 100)
                      : 100}
                    %
                  </span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: `${
                        totalContentEntries > 0
                          ? (totalPublished / totalContentEntries) * 100
                          : 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Drafts &amp; Staging ({totalDrafts})
                  </span>
                  <span className="text-zinc-400">
                    {totalContentEntries > 0
                      ? Math.round((totalDrafts / totalContentEntries) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{
                      width: `${
                        totalContentEntries > 0
                          ? (totalDrafts / totalContentEntries) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400 flex items-center justify-between">
            <span>Total Records in CMS</span>
            <span className="font-bold text-white">{totalContentEntries}</span>
          </div>
        </div>

        {/* Recent Admin Activity Log */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Recent Administrator Activity
            </h3>
            <Link
              href="/admin/security"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              View Full Audit Log →
            </Link>
          </div>

          <div className="divide-y divide-zinc-800/60 overflow-hidden">
            {logs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="py-3 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold uppercase ${
                      log.action === 'CREATE'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : log.action === 'DELETE'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : log.action === 'LOGIN'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-zinc-800 text-zinc-300 border border-zinc-700/60'
                    }`}
                  >
                    {log.action}
                  </span>
                  <p className="text-zinc-300 truncate">
                    {log.details || `${log.action} on ${log.entity}`}
                  </p>
                </div>
                <span className="text-zinc-400 shrink-0 font-mono text-[11px]">
                  {new Date(log.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
            <span>Portfolio Database Host: Supabase Cloud</span>
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Synchronized
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
