import React from 'react';
import { getEducation } from '@/lib/portfolioRepository';
import EducationManagerClient from './EducationManagerClient';

export const revalidate = 0;

export default async function AdminEducationPage() {
  const education = await getEducation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Education Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your degrees, academic institutions, status, and scholarly highlights.
          </p>
        </div>
      </div>

      <EducationManagerClient initialEducation={education} />
    </div>
  );
}
