'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-mono text-2xl font-bold mb-6">
        !
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        Something went wrong
      </h1>
      <p className="text-zinc-400 text-sm max-w-md mb-8">
        An unexpected error occurred while rendering this view.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
