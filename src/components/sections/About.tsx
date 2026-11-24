'use client';

import React from 'react';
import { User, Target, Lightbulb, Compass, Code, Brain, Globe, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export default function About() {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  const coreInterests = [
    { title: 'Artificial Intelligence', desc: 'Applied machine learning, AI assistants, and automated heuristics', icon: Brain, color: 'text-purple-400' },
    { title: 'Modern Web Engineering', desc: 'Performant, accessible full-stack platforms with Next.js & React', icon: Code, color: 'text-blue-400' },
    { title: 'Data Science & Modeling', desc: 'Structured analysis, relational integrity, and Python scripting', icon: Compass, color: 'text-cyan-400' },
    { title: 'Software Engineering', desc: 'Clean architecture, maintainable contracts, and resilient design', icon: ShieldCheck, color: 'text-emerald-400' },
    { title: 'Open Source & Community', desc: 'IEEE volunteer leadership and grassroots youth engagement', icon: Globe, color: 'text-amber-400' },
  ];

  return (
    <section id="about" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with reusable primitive */}
        <SectionHeading
          badgeText="01 / ABOUT ME"
          badgeVariant="blue"
          icon={<User className="w-3.5 h-3.5" />}
          title="Engineering with Purpose & Precision"
          subtitle="A background combining undergraduate computing studies, modern full-stack web engineering, and active technology community volunteering."
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Biography Card - Spans 7 cols */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-zinc-800/80">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Professional Biography</h3>
                  <p className="text-xs text-zinc-400 font-mono">Academic foundation &amp; practical engineering</p>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {personalInfo.bio.map((paragraph, idx) => (
                  <p key={idx} className="text-zinc-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Quick quote / highlight */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80">
              <blockquote className="text-xs sm:text-sm italic text-zinc-400 border-l-2 border-blue-500 pl-4">
                &ldquo;Building software isn&apos;t just writing syntax—it&apos;s about translating real-world human needs into resilient, elegant, and intelligent systems.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Right Column Cards - Spans 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Philosophy & Approach Card */}
            <Card variant="glass" className="p-6 sm:p-8 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Approach to Technology</h3>
                  <p className="text-xs text-zinc-400 font-mono">Simplicity, resilience &amp; clarity</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {personalInfo.approach}
              </p>
            </Card>

            {/* Career Goals Card */}
            <Card variant="glass" className="p-6 sm:p-8 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Career Objectives</h3>
                  <p className="text-xs text-zinc-400 font-mono">Long-term vision &amp; ambition</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {personalInfo.careerGoals}
              </p>
            </Card>
          </div>

          {/* Bottom Card: Professional Interests Banner - Spans all 12 cols */}
          <div className="lg:col-span-12 glass-panel rounded-3xl p-8">
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-300 mb-6 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Core Technical Interests &amp; Focus Areas
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {coreInterests.map((interest, idx) => {
                const Icon = interest.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700 transition-all group"
                  >
                    <Icon className={`w-5 h-5 ${interest.color} mb-3 group-hover:scale-110 transition-transform`} />
                    <h4 className="text-sm font-medium text-white mb-1 group-hover:text-blue-300 transition-colors">
                      {interest.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-normal">
                      {interest.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
