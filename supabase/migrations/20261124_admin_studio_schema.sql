-- ==============================================================================
-- Portfolio Admin Studio Database Schema Migration
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Portfolio Owner Profile)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  headline TEXT NOT NULL,
  subheadline TEXT,
  bio TEXT[] DEFAULT '{}',
  approach TEXT,
  career_goals TEXT,
  location TEXT,
  country TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'selective')),
  availability_label TEXT DEFAULT 'Available for Opportunities',
  availability_description TEXT,
  social_github TEXT,
  social_linkedin TEXT,
  social_email TEXT,
  social_twitter TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('programming', 'frontend', 'backend', 'database', 'tools', 'ai')),
  level TEXT DEFAULT 'Proficient' CHECK (level IN ('Foundational', 'Intermediate', 'Proficient', 'Advanced')),
  tag TEXT,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  short_description TEXT,
  full_description TEXT,
  category TEXT NOT NULL DEFAULT 'Web Applications',
  technologies TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  gallery_urls TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Experience Table
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Professional' CHECK (type IN ('Leadership', 'Volunteer', 'Professional')),
  location TEXT,
  period TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN NOT NULL DEFAULT false,
  description TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Education Table
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  period TEXT,
  start_date DATE,
  end_date DATE,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'Ongoing' CHECK (status IN ('Ongoing', 'Completed')),
  highlights TEXT[] DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  publication_status TEXT NOT NULL DEFAULT 'published' CHECK (publication_status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Academic' CHECK (category IN ('Leadership', 'Workshop', 'Community', 'Certification', 'Academic')),
  issuer TEXT NOT NULL,
  date TEXT,
  description TEXT,
  badge TEXT,
  certificate_url TEXT,
  verification_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Volunteer Activities Table
CREATE TABLE IF NOT EXISTS public.volunteer_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization TEXT NOT NULL,
  role TEXT NOT NULL,
  project_name TEXT NOT NULL,
  description TEXT,
  date TEXT,
  event_images TEXT[] DEFAULT '{}',
  related_links TEXT[] DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Media Library Assets Table
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  category TEXT DEFAULT 'general' CHECK (category IN ('profile', 'project', 'certificate', 'event', 'general')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Site Settings (Appearance, SEO, General)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'current_settings',
  site_title TEXT NOT NULL DEFAULT 'R. J. K. Lahiru Madhushan Ranathunga | AI & Web Developer',
  meta_description TEXT NOT NULL DEFAULT 'Personal developer portfolio of R. J. K. Lahiru Madhushan Ranathunga — AI Developer, Web Developer, Undergraduate at Wayamba University of Sri Lanka, and IEEE Volunteer.',
  keywords TEXT[] DEFAULT '{"Lahiru Madhushan Ranathunga","AI Developer","Web Developer","Wayamba University"}',
  canonical_url TEXT DEFAULT 'https://lahiru-ai.github.io',
  og_image_url TEXT,
  twitter_handle TEXT DEFAULT '@lahiru_ai',
  accent_color TEXT DEFAULT '#3b82f6',
  theme_mode TEXT DEFAULT 'dark',
  show_hero BOOLEAN NOT NULL DEFAULT true,
  show_about BOOLEAN NOT NULL DEFAULT true,
  show_skills BOOLEAN NOT NULL DEFAULT true,
  show_projects BOOLEAN NOT NULL DEFAULT true,
  show_experience BOOLEAN NOT NULL DEFAULT true,
  show_education BOOLEAN NOT NULL DEFAULT true,
  show_achievements BOOLEAN NOT NULL DEFAULT true,
  show_contact BOOLEAN NOT NULL DEFAULT true,
  nav_labels JSONB DEFAULT '{"about":"About","skills":"Skills","projects":"Projects","experience":"Experience","education":"Education","achievements":"Achievements","contact":"Contact"}',
  footer_text TEXT DEFAULT 'Engineered with Next.js, TypeScript, Tailwind CSS and Three.js.',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Admin Activity Logs
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  action TEXT NOT NULL, -- e.g. 'LOGIN', 'CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'UNPUBLISH'
  entity TEXT NOT NULL, -- e.g. 'project', 'skill', 'profile', 'settings'
  entity_id TEXT,
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_skills_status ON public.skills(status, display_order);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status, display_order);
CREATE INDEX IF NOT EXISTS idx_experience_status ON public.experience(status, display_order);
CREATE INDEX IF NOT EXISTS idx_education_status ON public.education(publication_status, display_order);
CREATE INDEX IF NOT EXISTS idx_achievements_status ON public.achievements(status, display_order);
CREATE INDEX IF NOT EXISTS idx_volunteer_status ON public.volunteer_activities(status, display_order);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON public.admin_activity_logs(created_at DESC);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- RLS Policies
-- Public can READ published records
-- Authenticated admins have FULL access
-- -----------------------------------------------------------------------------

-- Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admins have full access to profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Skills
CREATE POLICY "Public skills are viewable when published" ON public.skills FOR SELECT USING (status = 'published');
CREATE POLICY "Admins have full access to skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Projects
CREATE POLICY "Public projects are viewable when published" ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY "Admins have full access to projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Experience
CREATE POLICY "Public experience is viewable when published" ON public.experience FOR SELECT USING (status = 'published');
CREATE POLICY "Admins have full access to experience" ON public.experience FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Education
CREATE POLICY "Public education is viewable when published" ON public.education FOR SELECT USING (publication_status = 'published');
CREATE POLICY "Admins have full access to education" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Achievements
CREATE POLICY "Public achievements are viewable when published" ON public.achievements FOR SELECT USING (status = 'published');
CREATE POLICY "Admins have full access to achievements" ON public.achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Volunteer Activities
CREATE POLICY "Public volunteer activities are viewable when published" ON public.volunteer_activities FOR SELECT USING (status = 'published');
CREATE POLICY "Admins have full access to volunteer activities" ON public.volunteer_activities FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Media Assets
CREATE POLICY "Public media assets are viewable by everyone" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Admins have full access to media assets" ON public.media_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Site Settings
CREATE POLICY "Site settings are viewable by everyone" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins have full access to site settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Admin Activity Logs (Admin only)
CREATE POLICY "Admins can view activity logs" ON public.admin_activity_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert activity logs" ON public.admin_activity_logs FOR INSERT TO authenticated WITH CHECK (true);

-- Storage bucket configuration (Run in Supabase SQL editor)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public media access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');
CREATE POLICY "Admin upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-media');
CREATE POLICY "Admin delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-media');
