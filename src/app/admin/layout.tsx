import React from 'react';
import { createClient } from '@/lib/supabase/server';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail = 'admin@portfolio.local';

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      userEmail = user.email;
    }
  } catch {
    // Fallback when client fails or offline
  }

  return (
    <AdminLayoutClient userEmail={userEmail}>
      {children}
    </AdminLayoutClient>
  );
}
