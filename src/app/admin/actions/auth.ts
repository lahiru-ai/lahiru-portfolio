'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function logAdminActivity(action: string, entity: string, entityId?: string, details?: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('admin_activity_logs').insert({
      user_email: user.email || 'unknown',
      action,
      entity,
      entity_id: entityId,
      details,
    });
  } catch (error) {
    console.error('Failed to log admin activity:', error);
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please enter both email and password.' };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  const allowedEmails = (process.env.ADMIN_ALLOWED_EMAILS || 'lahirumadhushan566@gmail.com')
    .split(',')
    .map((e) => e.trim().toLowerCase());

  if (data.user?.email && allowedEmails.length > 0 && !allowedEmails.includes(data.user.email.toLowerCase())) {
    await supabase.auth.signOut();
    return { error: 'Access denied: You are not authorized to access Admin Studio.' };
  }

  await logAdminActivity('LOGIN', 'auth', data.user?.id, `Admin signed in: ${data.user?.email}`);

  redirect('/admin');
}

export async function logoutAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await logAdminActivity('LOGOUT', 'auth', user.id, `Admin logged out: ${user.email}`);
  }

  await supabase.auth.signOut();
  redirect('/admin/login');
}
