'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export default function Education() {
  const { data } = usePortfolio();
  const { education } = data;

  return (
    <section id="education" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeading
          badgeText="05 / ACADEMIC BACKGROUND"
          badgeVariant="cyan"
          icon={<GraduationCap className="w-3.5 h-3.5" />}
          title="Education"
          subtitle="Confirmed undergraduate studies and computing coursework at Wayamba University of Sri Lanka."
        />

        {/* Education Timeline Cards */}
        <div className="space-y-6 max-w-4xl">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card
                variant="glass"
                className="p-6 sm:p-8 space-y-4 hover:border-zinc-700/80 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {item.status}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        {item.period}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.degree}
                    </h3>

                    <p className="text-sm font-medium text-cyan-400">
                      {item.institution}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800 self-start sm:self-center">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  <p className="text-xs font-mono text-zinc-400 font-medium">Academic Emphasis &amp; Engagement:</p>
                  {item.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
