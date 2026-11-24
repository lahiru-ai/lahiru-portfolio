'use client';

import React, { useState } from 'react';
import { Cpu, Search, Layers, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Skills() {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'programming', label: 'Programming' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Databases' },
    { id: 'tools', label: 'Tools & DevOps' },
    { id: 'ai', label: 'Artificial Intelligence' },
  ];

  const filteredCategories = data.skills.filter((cat) => {
    if (activeCategory !== 'all' && cat.category !== activeCategory) {
      return false;
    }
    return true;
  });

  return (
    <section id="skills" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>02 / TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Skills &amp; Technologies
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Pragmatic proficiencies acquired through undergraduate coursework, open-source development, and real-world implementations.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search skill (e.g. Next.js, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const visibleSkills = cat.skills.filter((skill) =>
              skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (skill.tag && skill.tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );

            if (visibleSkills.length === 0) return null;

            return (
              <div
                key={cat.category}
                className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-white tracking-tight">
                      {cat.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                      {visibleSkills.length} skills
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="space-y-3">
                    {visibleSkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors group flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-zinc-200 group-hover:text-white transition-colors">
                              {skill.name}
                            </span>
                            {skill.level && (
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                                  skill.level === 'Proficient'
                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                    : skill.level === 'Intermediate'
                                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700/50'
                                }`}
                              >
                                {skill.level}
                              </span>
                            )}
                          </div>
                          {skill.tag && (
                            <p className="text-[11px] text-zinc-400">
                              {skill.tag}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Practical Implementation
                  </span>
                  <span className="font-mono text-[10px] uppercase text-zinc-400">
                    {cat.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Growth Mindset Note */}
        <div className="mt-12 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 text-center max-w-2xl mx-auto">
          <p className="text-xs text-zinc-400">
            <span className="text-blue-400 font-mono font-medium">Note:</span> Proficiencies reflect real-world university coursework, personal implementations, and active exploration. Configurable levels avoid inflated &apos;expert&apos; claims in favor of verifiable technical ability.
          </p>
        </div>
      </div>
    </section>
  );
}
