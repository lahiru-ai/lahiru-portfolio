export type ContentStatus = 'draft' | 'published' | 'archived';

export interface ProfileRecord {
  id: string;
  user_id?: string | null;
  name: string;
  short_name: string;
  headline: string;
  subheadline?: string | null;
  bio: string[];
  approach?: string | null;
  career_goals?: string | null;
  location?: string | null;
  country?: string | null;
  avatar_url?: string | null;
  resume_url?: string | null;
  availability_status: 'available' | 'busy' | 'selective';
  availability_label?: string | null;
  availability_description?: string | null;
  social_github?: string | null;
  social_linkedin?: string | null;
  social_email?: string | null;
  social_twitter?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SkillRecord {
  id: string;
  name: string;
  category: 'programming' | 'frontend' | 'backend' | 'database' | 'tools' | 'ai';
  level: 'Foundational' | 'Intermediate' | 'Proficient' | 'Advanced';
  tag?: string | null;
  icon?: string | null;
  display_order: number;
  is_featured: boolean;
  status: ContentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  tagline?: string | null;
  short_description?: string | null;
  full_description?: string | null;
  category: string;
  technologies: string[];
  features: string[];
  image_url: string;
  gallery_urls: string[];
  github_url?: string | null;
  live_url?: string | null;
  display_order: number;
  is_featured: boolean;
  status: ContentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface ExperienceRecord {
  id: string;
  role: string;
  organization: string;
  type: 'Leadership' | 'Volunteer' | 'Professional';
  location?: string | null;
  period?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  is_current: boolean;
  description: string[];
  skills: string[];
  display_order: number;
  status: ContentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface EducationRecord {
  id: string;
  institution: string;
  degree: string;
  field_of_study?: string | null;
  period?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  location?: string | null;
  status: 'Ongoing' | 'Completed';
  highlights: string[];
  display_order: number;
  publication_status: ContentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface AchievementRecord {
  id: string;
  title: string;
  category: 'Leadership' | 'Workshop' | 'Community' | 'Certification' | 'Academic';
  issuer: string;
  date?: string | null;
  description?: string | null;
  badge?: string | null;
  certificate_url?: string | null;
  verification_url?: string | null;
  display_order: number;
  status: ContentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface VolunteerActivityRecord {
  id: string;
  organization: string;
  role: string;
  project_name: string;
  description?: string | null;
  date?: string | null;
  event_images: string[];
  related_links: string[];
  display_order: number;
  status: ContentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface MediaAssetRecord {
  id: string;
  name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category: 'profile' | 'project' | 'certificate' | 'event' | 'general';
  created_at: string;
}

export interface SiteSettingsRecord {
  id: string;
  site_title: string;
  meta_description: string;
  keywords: string[];
  canonical_url?: string | null;
  og_image_url?: string | null;
  twitter_handle?: string | null;
  accent_color: string;
  theme_mode: string;
  show_hero: boolean;
  show_about: boolean;
  show_skills: boolean;
  show_projects: boolean;
  show_experience: boolean;
  show_education: boolean;
  show_achievements: boolean;
  show_contact: boolean;
  nav_labels: Record<string, string>;
  footer_text: string;
  created_at?: string;
  updated_at?: string;
}

export interface AdminActivityLogRecord {
  id: string;
  user_email: string;
  action: string;
  entity: string;
  entity_id?: string | null;
  details?: string | null;
  created_at: string;
}
