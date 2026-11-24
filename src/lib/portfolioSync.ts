import {
  getProfile,
  getSkills,
  getProjects,
  getExperience,
  getEducation,
  getAchievements,
} from '@/lib/portfolioRepository';
import { PortfolioData, SkillCategory } from '@/types/portfolio';

export async function getSynchronizedPortfolioData(): Promise<PortfolioData> {
  const [profile, skills, projects, experience, education, achievements] = await Promise.all([
    getProfile(),
    getSkills(),
    getProjects(),
    getExperience(),
    getEducation(),
    getAchievements(),
  ]);

  // Group published skills into SkillCategories
  const publishedSkills = skills.filter((s) => s.status === 'published');
  const catMap: Record<string, SkillCategory> = {
    programming: {
      title: 'Programming Languages',
      category: 'programming',
      description: 'Core languages for systems, scripting, and enterprise applications.',
      skills: [],
    },
    frontend: {
      title: 'Frontend Development',
      category: 'frontend',
      description: 'Modern component-driven web interfaces with fluid responsive design.',
      skills: [],
    },
    backend: {
      title: 'Backend Development',
      category: 'backend',
      description: 'Robust application backends, microservices, and REST APIs.',
      skills: [],
    },
    database: {
      title: 'Databases & Storage',
      category: 'database',
      description: 'Relational modeling, SQL optimization, and cloud databases.',
      skills: [],
    },
    ai: {
      title: 'AI & Machine Learning',
      category: 'ai',
      description: 'Applied artificial intelligence, ML workflows, and AI assistants.',
      skills: [],
    },
    tools: {
      title: 'Development Tools',
      category: 'tools',
      description: 'Developer workflows, version control, and containerization.',
      skills: [],
    },
  };

  publishedSkills.forEach((s) => {
    if (catMap[s.category]) {
      catMap[s.category].skills.push({
        name: s.name,
        level: s.level,
        tag: s.tag || undefined,
        icon: s.icon || undefined,
      });
    }
  });

  const skillCategories = Object.values(catMap).filter((c) => c.skills.length > 0);

  // Filter published projects
  const publishedProjects = projects
    .filter((p) => p.status === 'published')
    .map((p) => ({
      id: p.slug,
      title: p.title,
      tagline: p.tagline || '',
      description: p.short_description || p.full_description || '',
      category: p.category as any,
      technologies: p.technologies,
      features: p.features,
      githubUrl: p.github_url || undefined,
      liveUrl: p.live_url || undefined,
      image: p.image_url,
      featured: p.is_featured,
    }));

  // Filter published experience
  const publishedExperience = experience
    .filter((e) => e.status === 'published')
    .map((e) => ({
      id: e.id,
      role: e.role,
      organization: e.organization,
      period: e.period || '2023 - Present',
      location: e.location || 'Sri Lanka',
      description: e.description,
      skills: e.skills,
      type: e.type,
    }));

  // Filter published education
  const publishedEducation = education
    .filter((ed) => ed.publication_status === 'published')
    .map((ed) => ({
      id: ed.id,
      degree: ed.degree,
      institution: ed.institution,
      period: ed.period || '2022 - Present',
      location: ed.location || 'Sri Lanka',
      status: ed.status,
      highlights: ed.highlights,
    }));

  // Filter published achievements
  const publishedAchievements = achievements
    .filter((a) => a.status === 'published')
    .map((a) => ({
      id: a.id,
      title: a.title,
      category: a.category,
      issuer: a.issuer,
      date: a.date || '2024',
      description: a.description || '',
      badge: a.badge || undefined,
    }));

  return {
    personalInfo: {
      name: profile.name,
      shortName: profile.short_name,
      headline: profile.headline,
      subheadline: profile.subheadline || '',
      location: profile.location || 'Sri Lanka',
      country: profile.country || 'Sri Lanka',
      bio: profile.bio,
      approach: profile.approach || '',
      careerGoals: profile.career_goals || '',
      availability: {
        status: profile.availability_status,
        label: profile.availability_label || 'Available for Collaborations',
        description: profile.availability_description || '',
      },
      socialLinks: {
        github: profile.social_github || 'https://github.com/lahiru-ai',
        linkedin: profile.social_linkedin || 'https://www.linkedin.com/in/lahiru-m-ranathunga',
        email: profile.social_email || 'lahirumadhushan566@gmail.com',
        twitter: profile.social_twitter || undefined,
      },
    },
    skills: skillCategories,
    projects: publishedProjects,
    experience: publishedExperience,
    education: publishedEducation,
    achievements: publishedAchievements,
  };
}
