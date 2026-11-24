'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Search, CheckCircle2, Orbit, LayoutGrid } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

// Dynamic import for the 3D Skills Constellation
const SkillsConstellation3D = dynamic(
  () => import('@/components/3d/SkillsConstellation3D'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] rounded-3xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-zinc-400">Loading 3D Technology Galaxy...</span>
        </div>
      </div>
    ),
  }
);

export default function Skills() {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'programming', label: 'Programming Languages' },
    { id: 'frontend', label: 'Frontend Development' },
    { id: 'backend', label: 'Backend Development' },
    { id: 'database', label: 'Databases' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'tools', label: 'Development Tools' },
  ];

  const filteredCategories = data.skills.filter((cat) => {
    if (activeCategory !== 'all' && cat.category !== activeCategory) {
      return false;
    }
    return true;
  });

  return (
    <section id="skills" className="py-24 relative scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionHeading
            badgeText="02 / TECHNICAL ARSENAL"
            badgeVariant="purple"
            icon={<Cpu className="w-3.5 h-3.5" />}
            title="Skills & Technologies"
            subtitle="An interconnected ecosystem acquired through university coursework, production engineering, and hands-on applied machine learning."
            className="mb-0"
          />

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md self-start md:self-end">
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>3D Constellation</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Matrix Grid</span>
            </button>
          </div>
        </div>

        {/* 3D Constellation View */}
        {viewMode === '3d' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <SkillsConstellation3D skillCategories={data.skills} />
          </motion.div>
        )}

        {/* Filter Pills and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Filter technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const visibleSkills = cat.skills.filter(
              (skill) =>
                skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (skill.tag && skill.tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );

            if (visibleSkills.length === 0) return null;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Card
                  variant="glass"
                  className="p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-zinc-700/80 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                        {cat.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                        {visibleSkills.length} skills
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="space-y-3">
                      {visibleSkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/90 transition-all flex flex-col gap-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-zinc-200">
                              {skill.name}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                skill.level === 'Proficient'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : skill.level === 'Intermediate'
                                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                              }`}
                            >
                              {skill.level}
                            </span>
                          </div>
                          {skill.tag && (
                            <span className="text-[11px] font-mono text-zinc-500">
                              {skill.tag}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
