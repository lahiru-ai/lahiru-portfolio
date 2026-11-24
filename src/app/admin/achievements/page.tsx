import React from 'react';
import { getAchievements } from '@/lib/portfolioRepository';
import AchievementsManagerClient from './AchievementsManagerClient';

export const revalidate = 0;

export default async function AdminAchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Achievements &amp; Honors
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your certifications, awards, hackathons, and institutional recognition.
          </p>
        </div>
      </div>

      <AchievementsManagerClient initialAchievements={achievements} />
    </div>
  );
}
