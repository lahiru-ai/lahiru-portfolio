import { createClient } from '@supabase/supabase-js';
import * as path from 'path';
import * as fs from 'fs';

// Read .env.local manually without extra dependencies
const envLocalPath = path.resolve(process.cwd(), '.env.local');
const envVars = {};

if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      envVars[key] = val;
    }
  });
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('--- Supabase Connection Diagnostic ---');
console.log('Project URL:', supabaseUrl ? (supabaseUrl.includes('dummy') ? `${supabaseUrl} (Placeholder - Update Needed)` : supabaseUrl) : 'MISSING');
console.log('Anon Key:', supabaseAnonKey ? (supabaseAnonKey.includes('placeholder') ? 'Placeholder detected (Update Needed)' : 'Configured (Masked: ' + supabaseAnonKey.slice(0, 15) + '...)') : 'MISSING');

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('dummy')) {
  console.log('\n[Status]: Real credentials not yet configured in .env.local.');
  console.log('Follow the step-by-step instructions in the response to paste your credentials into .env.local, then re-run:');
  console.log('  node scripts/test-supabase-connection.mjs\n');
  process.exit(0);
}

async function testConnection() {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('\nAttempting connection to Supabase database...');

    const { data, error } = await supabase
      .from('projects')
      .select('id, title, status');

    if (error) {
      console.error('❌ Connection test failed with database error:');
      console.error(error.message);
      process.exit(1);
    }

    console.log('✅ Connection test PASSED!');
    console.log(`Found ${data?.length || 0} projects in the projects table:`);
    data?.forEach((p) => {
      console.log(`  • [${p.status}] ${p.title}`);
    });

    const { data: profile, error: profErr } = await supabase
      .from('profiles')
      .select('name, headline')
      .limit(1)
      .maybeSingle();

    if (!profErr && profile) {
      console.log(`✅ Profile retrieved: ${profile.name} — "${profile.headline}"`);
    }

    console.log('\nAll systems operational: Next.js Admin Studio will synchronize seamlessly with Supabase.');
  } catch (err) {
    console.error('❌ Network / Request error:', err.message);
    process.exit(1);
  }
}

testConnection();
