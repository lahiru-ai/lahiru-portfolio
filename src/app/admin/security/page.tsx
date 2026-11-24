import React from 'react';
import { getActivityLogs } from '@/lib/portfolioRepository';
import { ShieldAlert, Lock, CheckCircle2, AlertTriangle, Key } from 'lucide-react';

export const revalidate = 0;

export default async function AdminSecurityPage() {
  const logs = await getActivityLogs();

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Security &amp; Audit Logs
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review administrator logins, CRUD changes, and system access history.
        </p>
      </div>

      {/* Security Health Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
              Auth Guard
            </p>
            <p className="text-sm font-bold text-white">Server-side Session</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
              RLS Policy
            </p>
            <p className="text-sm font-bold text-white">Admins Only Write</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
              Service Role
            </p>
            <p className="text-sm font-bold text-white">Client-Safe Isolation</p>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-blue-400" />
            Audit Trail
          </h2>
          <span className="text-xs text-zinc-400 font-mono">
            {logs.length} logged events
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/60 border-b border-zinc-800 text-[10px] uppercase font-mono tracking-wider text-zinc-400">
              <tr>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-850/40 transition-colors">
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold uppercase ${
                        log.action === 'CREATE'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : log.action === 'DELETE'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : log.action === 'LOGIN'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700/60'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-400 capitalize">
                    {log.entity}
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-300">
                    {log.user_email}
                  </td>
                  <td className="py-3 px-4 text-zinc-200">
                    {log.details || '—'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-zinc-400">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
