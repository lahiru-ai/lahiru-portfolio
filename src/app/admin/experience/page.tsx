import React from 'react';
import { getExperience } from '@/lib/portfolioRepository';
import ExperienceManagerClient from './ExperienceManagerClient';

export const revalidate = 0;

export default async function AdminExperiencePage() {
  const experience = await getExperience();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Experience Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your professional roles, organizational positions, leadership, and dates.
          </p>
        </div>
      </div>

      <ExperienceManagerClient initialExperience={experience} />
    </div>
  );
}
