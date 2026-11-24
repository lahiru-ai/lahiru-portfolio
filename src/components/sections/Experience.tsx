'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export default function Experience() {
  const { data } = usePortfolio();
  const { experience } = data;

  return (
    <section id="experience" className="py-24 relative scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeading
          badgeText="04 / LEADERSHIP & VOLUNTEERING"
          badgeVariant="purple"
          icon={<Briefcase className="w-3.5 h-3.5" />}
          title="Experience & Leadership"
          subtitle="Verified responsibilities spanning IEEE technical societies, undergraduate organizing committees, and grassroots environmental advocacy."
        />

        {/* Timeline Layout */}
        <div className="relative border-l border-zinc-800/90 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experience.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-zinc-950 border-2 border-blue-500/80 group-hover:border-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all">
                <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
              </div>

              {/* Experience Card */}
              <Card
                variant="glass"
                className="p-6 sm:p-8 space-y-4 hover:border-zinc-700/80 transition-colors"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${
                          item.type === 'Leadership'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                      >
                        {item.type}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        {item.period}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {item.role}
                    </h3>

                    <p className="text-xs sm:text-sm font-medium text-blue-400/90">
                      {item.organization}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 self-start sm:self-center font-mono bg-zinc-900/60 px-3 py-1 rounded-lg border border-zinc-800">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Description bullet points */}
                <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  {item.description.map((desc, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{desc}</span>
                    </div>
                  ))}
                </div>

                {/* Competency Badges */}
                {item.skills && item.skills.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
