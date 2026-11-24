import React from 'react';
import { getVolunteerActivities } from '@/lib/portfolioRepository';
import VolunteerManagerClient from './VolunteerManagerClient';

export const revalidate = 0;

export default async function AdminVolunteerPage() {
  const volunteer = await getVolunteerActivities();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Volunteer Activities
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your community contributions, IEEE student branch initiatives, and leadership roles.
          </p>
        </div>
      </div>

      <VolunteerManagerClient initialActivities={volunteer} />
    </div>
  );
}
