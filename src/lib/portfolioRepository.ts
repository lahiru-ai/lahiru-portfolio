import { createClient } from '@/lib/supabase/server';
import { initialPortfolioData } from '@/data/portfolioData';
import {
  ProfileRecord,
  SkillRecord,
  ProjectRecord,
  ExperienceRecord,
  EducationRecord,
  AchievementRecord,
  VolunteerActivityRecord,
  SiteSettingsRecord,
  AdminActivityLogRecord,
  MediaAssetRecord,
} from '@/types/admin';

// Fallback in-memory/static cache to ensure high resilience
const fallbackProfile: ProfileRecord = {
  id: 'static-profile-id',
  name: initialPortfolioData.personalInfo.name,
  short_name: initialPortfolioData.personalInfo.shortName,
  headline: initialPortfolioData.personalInfo.headline,
  subheadline: initialPortfolioData.personalInfo.subheadline,
  bio: initialPortfolioData.personalInfo.bio,
  approach: initialPortfolioData.personalInfo.approach,
  career_goals: initialPortfolioData.personalInfo.careerGoals,
  location: initialPortfolioData.personalInfo.location,
  country: initialPortfolioData.personalInfo.country,
  availability_status: initialPortfolioData.personalInfo.availability.status,
  availability_label: initialPortfolioData.personalInfo.availability.label,
  availability_description: initialPortfolioData.personalInfo.availability.description,
  social_github: initialPortfolioData.personalInfo.socialLinks.github,
  social_linkedin: initialPortfolioData.personalInfo.socialLinks.linkedin,
  social_email: initialPortfolioData.personalInfo.socialLinks.email,
  avatar_url: '/avatar-realistic.png',
  resume_url: '#',
};

export async function getProfile(): Promise<ProfileRecord> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('profiles').select('*').limit(1).maybeSingle();
    if (data && !error) return data;
  } catch (err) {
    console.warn('Database offline or unconfigured, using fallback profile', err);
  }
  return fallbackProfile;
}

export async function getSkills(): Promise<SkillRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
    if (data && data.length > 0 && !error) return data;
  } catch (err) {
    console.warn('Using fallback skills', err);
  }

  // Flatten initial skills
  const fallbackSkills: SkillRecord[] = [];
  let order = 1;
  initialPortfolioData.skills.forEach((cat) => {
    cat.skills.forEach((s) => {
      fallbackSkills.push({
        id: `skill-${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: s.name,
        category: cat.category,
        level: s.level || 'Proficient',
        tag: s.tag || null,
        icon: s.icon || null,
        display_order: order++,
        is_featured: true,
        status: 'published',
      });
    });
  });
  return fallbackSkills;
}

export async function getProjects(): Promise<ProjectRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('projects').select('*').order('display_order', { ascending: true });
    if (data && data.length > 0 && !error) return data;
  } catch (err) {
    console.warn('Using fallback projects', err);
  }

  return initialPortfolioData.projects.map((p, idx) => ({
    id: p.id,
    slug: p.id,
    title: p.title,
    tagline: p.tagline,
    short_description: p.description,
    full_description: p.description,
    category: p.category,
    technologies: p.technologies,
    features: p.features || [],
    image_url: p.image,
    gallery_urls: [],
    github_url: p.githubUrl || null,
    live_url: p.liveUrl || null,
    display_order: idx + 1,
    is_featured: !!p.featured,
    status: 'published',
  }));
}

export async function getExperience(): Promise<ExperienceRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('experience').select('*').order('display_order', { ascending: true });
    if (data && data.length > 0 && !error) return data;
  } catch (err) {
    console.warn('Using fallback experience', err);
  }

  return initialPortfolioData.experience.map((exp, idx) => ({
    id: exp.id,
    role: exp.role,
    organization: exp.organization,
    type: exp.type,
    location: exp.location,
    period: exp.period,
    start_date: null,
    end_date: null,
    is_current: exp.period.includes('Present'),
    description: exp.description,
    skills: exp.skills,
    display_order: idx + 1,
    status: 'published',
  }));
}

export async function getEducation(): Promise<EducationRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('education').select('*').order('display_order', { ascending: true });
    if (data && data.length > 0 && !error) return data;
  } catch (err) {
    console.warn('Using fallback education', err);
  }

  return initialPortfolioData.education.map((edu, idx) => ({
    id: edu.id,
    institution: edu.institution,
    degree: edu.degree,
    field_of_study: 'Computing & Information Systems',
    period: edu.period,
    start_date: null,
    end_date: null,
    location: edu.location,
    status: edu.status,
    highlights: edu.highlights,
    display_order: idx + 1,
    publication_status: 'published',
  }));
}

export async function getAchievements(): Promise<AchievementRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('achievements').select('*').order('display_order', { ascending: true });
    if (data && data.length > 0 && !error) return data;
  } catch (err) {
    console.warn('Using fallback achievements', err);
  }

  return initialPortfolioData.achievements.map((ach, idx) => ({
    id: ach.id,
    title: ach.title,
    category: ach.category,
    issuer: ach.issuer,
    date: ach.date,
    description: ach.description,
    badge: ach.badge || null,
    certificate_url: null,
    verification_url: null,
    display_order: idx + 1,
    status: 'published',
  }));
}

export async function getVolunteerActivities(): Promise<VolunteerActivityRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('volunteer_activities').select('*').order('display_order', { ascending: true });
    if (data && data.length > 0 && !error) return data;
  } catch (err) {
    console.warn('Using fallback volunteer activities', err);
  }

  return [
    {
      id: 'vol-1',
      organization: 'IEEE Student Branch Wayamba University',
      role: 'Event Tech Coordinator',
      project_name: 'Annual Technical Workshop Series',
      description: 'Coordinated technical setup, participant registration, and live coding demos for over 150+ student participants.',
      date: '2024',
      event_images: [],
      related_links: ['https://ieee.org'],
      display_order: 1,
      status: 'published',
    },
    {
      id: 'vol-2',
      organization: 'University Open Day Committee',
      role: 'Digital Media & Tech Guide',
      project_name: 'Computing Dept Open Day',
      description: 'Guided school students and prospective undergraduates through software demonstrations, AI tools, and computer lab exhibits.',
      date: '2023',
      event_images: [],
      related_links: [],
      display_order: 2,
      status: 'published',
    },
  ];
}

export async function getMediaAssets(): Promise<MediaAssetRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('media_assets').select('*').order('created_at', { ascending: false });
    if (data && !error) return data;
  } catch (err) {
    console.warn('Using fallback media assets', err);
  }

  return [
    {
      id: 'media-1',
      name: 'avatar-realistic.png',
      file_url: '/avatar-realistic.png',
      file_type: 'image/png',
      file_size: 245000,
      category: 'profile',
      created_at: new Date().toISOString(),
    },
    {
      id: 'media-2',
      name: 'avatar.glb',
      file_url: '/avatar.glb',
      file_type: 'model/gltf-binary',
      file_size: 1540000,
      category: 'project',
      created_at: new Date().toISOString(),
    },
  ];
}

export async function getSiteSettings(): Promise<SiteSettingsRecord> {
  const fallbackSettings: SiteSettingsRecord = {
    id: 'current_settings',
    site_title: 'R. J. K. Lahiru Madhushan Ranathunga | AI & Web Developer',
    meta_description: 'Personal developer portfolio of R. J. K. Lahiru Madhushan Ranathunga — AI Developer, Web Developer, Undergraduate at Wayamba University of Sri Lanka, and IEEE Volunteer.',
    keywords: ['Lahiru Madhushan Ranathunga', 'AI Developer', 'Web Developer', 'Wayamba University'],
    canonical_url: 'https://lahiru-ai.github.io',
    og_image_url: '/avatar-realistic.png',
    twitter_handle: '@lahiru_ai',
    accent_color: '#3b82f6',
    theme_mode: 'dark',
    show_hero: true,
    show_about: true,
    show_skills: true,
    show_projects: true,
    show_experience: true,
    show_education: true,
    show_achievements: true,
    show_contact: true,
    nav_labels: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      education: 'Education',
      achievements: 'Achievements',
      contact: 'Contact',
    },
    footer_text: 'Engineered with Next.js, TypeScript, Tailwind CSS and Three.js.',
  };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('site_settings').select('*').eq('id', 'current_settings').maybeSingle();
    if (data && !error) return data;
  } catch (err) {
    console.warn('Using fallback site settings', err);
  }

  return fallbackSettings;
}

export async function getActivityLogs(): Promise<AdminActivityLogRecord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('admin_activity_logs').select('*').order('created_at', { ascending: false }).limit(20);
    if (data && !error) return data;
  } catch (err) {
    console.warn('Using fallback activity logs', err);
  }

  return [
    {
      id: 'log-1',
      user_email: 'lahirumadhushan566@gmail.com',
      action: 'SYSTEM_BOOT',
      entity: 'admin_studio',
      details: 'Admin Studio initialization and schema verified.',
      created_at: new Date().toISOString(),
    },
    {
      id: 'log-2',
      user_email: 'lahirumadhushan566@gmail.com',
      action: 'LOGIN',
      entity: 'auth',
      details: 'Administrator authenticated into session.',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];
}
