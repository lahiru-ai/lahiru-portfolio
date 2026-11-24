export interface PersonalInfo {
  name: string;
  shortName: string;
  headline: string;
  subheadline: string;
  location: string;
  country: string;
  bio: string[];
  approach: string;
  careerGoals: string;
  availability: {
    status: 'available' | 'busy' | 'selective';
    label: string;
    description: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
}

export interface SkillItem {
  name: string;
  level?: 'Foundational' | 'Intermediate' | 'Proficient' | 'Advanced';
  tag?: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  category: 'programming' | 'frontend' | 'backend' | 'database' | 'tools' | 'ai';
  description: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'All' | 'Web Applications' | 'Full-Stack' | 'AI & Data' | 'Educational';
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
  type: 'Leadership' | 'Volunteer' | 'Professional';
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  status: 'Ongoing' | 'Completed';
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Leadership' | 'Workshop' | 'Community' | 'Certification' | 'Academic';
  issuer: string;
  date: string;
  description: string;
  badge?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
}
