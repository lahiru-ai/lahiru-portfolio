'use client';

import React, { useState } from 'react';
import { FolderGit2, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export default function Projects() {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Web Applications', 'Full-Stack', 'AI & Data', 'Educational'];

  const filteredProjects = data.projects.filter((project) => {
    if (selectedCategory === 'All') return true;
    return project.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            badgeText="03 / FEATURED WORK"
            badgeVariant="emerald"
            icon={<FolderGit2 className="w-3.5 h-3.5" />}
            title="Featured Projects"
            subtitle="Software systems, academic platforms, and intelligent automation experiments with confirmed code repositories and active deployments."
            className="mb-0"
          />

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              variant="glass"
              className="p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Mockup / Terminal Preview Banner */}
                <div className="relative w-full h-44 rounded-2xl bg-zinc-950 border border-zinc-800/90 overflow-hidden mb-6 group-hover:border-blue-500/30 transition-colors flex flex-col justify-between p-4">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {project.id}.app
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Art / Graphic */}
                  <div className="flex flex-col items-center justify-center my-auto py-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2 group-hover:scale-110 group-hover:text-white transition-all">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-200 group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </span>
                  </div>

                  {/* Quick Status Pill */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-900">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {project.liveUrl ? 'Live Demo' : 'Repository Active'}
                    </span>
                    <span className="text-zinc-500">{project.technologies[0]}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs font-mono text-blue-400 font-medium">
                    {project.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Feature Highlights */}
                  {project.features && project.features.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <p className="text-[11px] font-mono text-zinc-300 font-medium">Highlights:</p>
                      {project.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-zinc-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Technologies & Links Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 space-y-4">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow-sm"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
