'use client';

import React, { useState } from 'react';
import { Award, Trophy, Users, BookOpen, CheckCircle, Sparkles, Filter } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Achievements() {
  const { data } = usePortfolio();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Leadership', 'Workshop', 'Community'];

  const filteredAchievements = data.achievements.filter((item) => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  return (
    <section id="achievements" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400">
              <Award className="w-3.5 h-3.5" />
              <span>06 / RECOGNITIONS &amp; ENGAGEMENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Achievements &amp; Activities
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Authentic leadership appointments, organizing committee contributions, and community honors.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900/80 border border-zinc-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-200 ${
                  filter === cat
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between group hover:border-zinc-700/80 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs font-mono text-zinc-400">
                  Issued by: <span className="text-zinc-200">{item.issuer}</span>
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Engagement</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-800">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
