'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#070709] text-white flex min-h-screen items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-xl font-bold mb-4">Application Encountered an Error</h2>
          <button
            onClick={() => reset()}
            className="px-5 py-2 bg-blue-600 rounded-xl text-xs font-semibold text-white"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
