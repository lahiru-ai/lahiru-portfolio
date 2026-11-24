import React from 'react';
import { getMediaAssets } from '@/lib/portfolioRepository';
import MediaLibraryClient from './MediaLibraryClient';

export const revalidate = 0;

export default async function AdminMediaPage() {
  const assets = await getMediaAssets();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Media Library
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Upload, preview, organize, and copy direct URLs for images, documents, and 3D assets.
          </p>
        </div>
      </div>

      <MediaLibraryClient initialAssets={assets} />
    </div>
  );
}
