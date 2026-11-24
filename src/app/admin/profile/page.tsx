import React from 'react';
import { getProfile } from '@/lib/portfolioRepository';
import ProfileEditorClient from './ProfileEditorClient';

export const revalidate = 0;

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Profile &amp; About Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Update your identity, biography, career focus, availability, and social links.
          </p>
        </div>
      </div>

      <ProfileEditorClient initialProfile={profile} />
    </div>
  );
}
