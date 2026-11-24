import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-mono text-2xl font-bold mb-6">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        Page Not Found
      </h1>
      <p className="text-zinc-400 text-sm max-w-md mb-8">
        The requested resource or page does not exist. Please return to the homepage.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
      >
        Return to Portfolio
      </Link>
    </div>
  );
}
