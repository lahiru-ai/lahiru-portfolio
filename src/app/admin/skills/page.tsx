import React from 'react';
import { getSkills } from '@/lib/portfolioRepository';
import SkillsManagerClient from './SkillsManagerClient';

export const revalidate = 0;

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Skills Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Create, reorder, categorize, and publish technical skills with proficiency levels.
          </p>
        </div>
      </div>

      <SkillsManagerClient initialSkills={skills} />
    </div>
  );
}
