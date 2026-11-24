import React from 'react';
import { getProjects } from '@/lib/portfolioRepository';
import ProjectsManagerClient from './ProjectsManagerClient';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Projects CMS
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your portfolio projects, tech stacks, links, images, and publishing status.
          </p>
        </div>
      </div>

      <ProjectsManagerClient initialProjects={projects} />
    </div>
  );
}
