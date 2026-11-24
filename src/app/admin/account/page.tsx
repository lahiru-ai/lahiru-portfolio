import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { UserCheck, Shield, Key, Mail, Calendar } from 'lucide-react';

export const revalidate = 0;

export default async function AdminAccountPage() {
  let userEmail = 'lahirumadhushan566@gmail.com';
  let userId = 'system-admin-uuid';
  let createdAt = new Date().toISOString();

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      userEmail = user.email || userEmail;
      userId = user.id;
      createdAt = user.created_at || createdAt;
    }
  } catch {}

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Admin Profile &amp; Credentials
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review authenticated administrator account and role privileges.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              {userEmail}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Super Admin
              </span>
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Role: System Administrator &amp; CMS Owner
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/80 text-xs">
          <div>
            <span className="text-zinc-400 block mb-1">User Identifier (UUID)</span>
            <span className="font-mono text-zinc-300 select-all">{userId}</span>
          </div>

          <div>
            <span className="text-zinc-400 block mb-1">Authentication Method</span>
            <span className="text-zinc-300">Supabase Auth (Email &amp; Password)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
