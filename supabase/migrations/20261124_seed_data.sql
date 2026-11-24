-- ==============================================================================
-- Portfolio Admin Studio Seed Data (Based on existing Lahiru Ranathunga portfolio)
-- ==============================================================================

-- 1. Seed Profile
INSERT INTO public.profiles (
  name, short_name, headline, subheadline, bio, approach, career_goals, location, country,
  availability_status, availability_label, availability_description,
  social_github, social_linkedin, social_email
) VALUES (
  'R. J. K. Lahiru Madhushan Ranathunga',
  'Lahiru Ranathunga',
  'AI Developer | Web Developer | IEEE Volunteer',
  'I build intelligent digital solutions through artificial intelligence, software engineering and modern web technologies.',
  ARRAY[
    'I am an undergraduate, AI developer, and modern web developer based in Sri Lanka, passionate about creating high-impact software systems.',
    'My engineering focus bridges modern full-stack development, applied machine learning, and university community initiatives. As an active volunteer with the IEEE Student Branch of Wayamba University of Sri Lanka, I regularly contribute to technical events, workshops, and community projects.',
    'Whether architecting responsive web platforms, automating notice distribution systems, or building exploratory AI pipelines, I prioritize clean architecture, performant code, and intuitive user experiences.'
  ],
  'I focus on simplicity, robust fundamentals, and purposeful design. I believe technology should remain human-centric, reliable, and easily maintainable.',
  'Aiming to build scalable intelligent applications and robust distributed systems that solve critical community and organizational challenges.',
  'Kurunegala, Sri Lanka',
  'Sri Lanka',
  'available',
  'Available for Technical Projects & Collaborations',
  'Open to software engineering roles, technical projects, and open-source collaborations.',
  'https://github.com/lahiru-ai',
  'https://www.linkedin.com/in/lahiru-m-ranathunga',
  'lahirumadhushan566@gmail.com'
) ON CONFLICT DO NOTHING;

-- 2. Seed Skills
INSERT INTO public.skills (name, category, level, tag, display_order, status, is_featured) VALUES
('Java', 'programming', 'Intermediate', 'Java 21 & OOP Logic', 1, 'published', true),
('Python', 'programming', 'Proficient', 'AI, ML & Automation', 2, 'published', true),
('JavaScript', 'programming', 'Proficient', 'Modern ES6+ & Async', 3, 'published', true),
('TypeScript', 'programming', 'Intermediate', 'Strict Types & Contracts', 4, 'published', true),
('React', 'frontend', 'Proficient', 'Hooks & Component Architecture', 5, 'published', true),
('Next.js', 'frontend', 'Intermediate', 'App Router & SSR', 6, 'published', true),
('Tailwind CSS', 'frontend', 'Proficient', 'Utility-First Design', 7, 'published', true),
('HTML & CSS', 'frontend', 'Proficient', 'Semantic & Accessible Web', 8, 'published', false),
('Spring Boot', 'backend', 'Foundational', 'Java Enterprise Backends', 9, 'published', true),
('Node.js', 'backend', 'Intermediate', 'Express & Serverless', 10, 'published', true),
('PostgreSQL', 'database', 'Intermediate', 'Relational Modeling & Queries', 11, 'published', true),
('MySQL', 'database', 'Intermediate', 'Database Administration', 12, 'published', false),
('Supabase', 'database', 'Intermediate', 'Postgres Cloud, Auth & Storage', 13, 'published', true),
('Artificial Intelligence', 'ai', 'Intermediate', 'Search & Algorithmic Heuristics', 14, 'published', true),
('Machine Learning', 'ai', 'Foundational', 'Models & Data Evaluation', 15, 'published', true),
('AI Assistants & Dev', 'ai', 'Proficient', 'LLMs, Prompting & Tooling', 16, 'published', true),
('Git', 'tools', 'Proficient', 'Version Control & Branching', 17, 'published', true),
('GitHub', 'tools', 'Proficient', 'Collaboration & Repositories', 18, 'published', true),
('Docker', 'tools', 'Foundational', 'Containerized Environments', 19, 'published', false),
('VS Code', 'tools', 'Proficient', 'Productivity & Debugging', 20, 'published', false)
ON CONFLICT DO NOTHING;

-- 3. Seed Projects
INSERT INTO public.projects (
  slug, title, tagline, short_description, full_description, category, technologies, features, image_url, github_url, live_url, display_order, is_featured, status
) VALUES 
(
  'serendip-marketplace',
  'SERENDIP Marketplace',
  'Local Producers to International Markets',
  'A marketplace platform connecting local producers with international markets. Engineered with structured multi-vendor cataloging, shopping workflows, and relational data persistence.',
  'SERENDIP Marketplace empowers regional artisan and agricultural producers by connecting them directly to cross-border buyers. Built with robust Spring Boot backend architecture and dynamic Next.js frontend.',
  'Full-Stack',
  ARRAY['Java 21', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL'],
  ARRAY['Multi-vendor product showcase', 'Dynamic filtering & category sorting', 'Enterprise REST API backend', 'Relational PostgreSQL persistence'],
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
  'https://github.com/lahiru-ai/serendip-marketplace',
  'https://serendip-market.example.com',
  1, true, 'published'
),
(
  'auto-notice',
  'AutoNotice Scraper & Bot',
  'Automated University Notice Distribution',
  'Automated scraper and Telegram delivery bot that extracts, analyzes, and dispatches university circulars to student cohorts with near-zero latency.',
  'AutoNotice monitors academic noticeboards, classifies urgent broadcasts using automated parsing, and pushes formatted digests straight into university student channels.',
  'AI & Data',
  ARRAY['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Cheerio'],
  ARRAY['Targeted DOM scraping pipelines', 'Automated Telegram broadcast integration', 'Supabase cloud database synchronization', 'Instant notice deduplication engine'],
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'https://github.com/lahiru-ai/autonotice',
  'https://autonotice.example.com',
  2, true, 'published'
),
(
  'interactive-developer-portfolio',
  'Interactive 3D Portfolio',
  'Next-Generation Developer Portfolio',
  'A high-performance modern developer portfolio featuring real-time Three.js 3D avatars, particle physics, smooth Framer Motion animations, and SaaS Admin Studio.',
  'The portfolio highlights technical projects, skills, education, and volunteer leadership with high visual craft and interactive 3D rendering.',
  'Web Applications',
  ARRAY['Next.js', 'React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
  ARRAY['WebGL 3D Avatar & Interactive Starfield', 'Dynamic SaaS Admin Studio', 'Responsive across mobile, tablet, desktop', 'Zero layout shift architecture'],
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  'https://github.com/lahiru-ai/lahiru-portfolio',
  'https://lahiru-ai.github.io',
  3, true, 'published'
) ON CONFLICT DO NOTHING;

-- 4. Seed Experience
INSERT INTO public.experience (
  role, organization, type, location, period, is_current, description, skills, display_order, status
) VALUES
(
  'Student Volunteer & Tech Contributor',
  'IEEE Student Branch of Wayamba University of Sri Lanka',
  'Volunteer',
  'Kuliyapitiya, Sri Lanka',
  '2023 - Present',
  true,
  ARRAY[
    'Active volunteer supporting technical initiatives, web presence, and technology event logistics.',
    'Contributed to hackathon coordination, campus workshops, and technical knowledge-sharing platforms.'
  ],
  ARRAY['Team Leadership', 'Technical Event Planning', 'Community Outreach', 'Documentation'],
  1, 'published'
),
(
  'Independent Software & Web Developer',
  'Self-Employed / Projects',
  'Professional',
  'Remote / Sri Lanka',
  '2023 - Present',
  true,
  ARRAY[
    'Design and build full-stack web applications, automation bots, and modern portfolio interfaces.',
    'Experiment with AI integrations, scraping tools, and performant user interface patterns.'
  ],
  ARRAY['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  2, 'published'
) ON CONFLICT DO NOTHING;

-- 5. Seed Education
INSERT INTO public.education (
  institution, degree, field_of_study, period, location, status, highlights, display_order, publication_status
) VALUES
(
  'Wayamba University of Sri Lanka',
  'Bachelor of Science (Undergraduate)',
  'Computing & Information Systems / Technology',
  '2022 - Present',
  'Kuliyapitiya, Sri Lanka',
  'Ongoing',
  ARRAY[
    'Pursuing core foundations in data structures, algorithms, database systems, and software engineering.',
    'Active participant in university technical events, coding circles, and student branch activities.'
  ],
  1, 'published'
) ON CONFLICT DO NOTHING;

-- 6. Seed Achievements
INSERT INTO public.achievements (
  title, category, issuer, date, description, badge, display_order, status
) VALUES
(
  'IEEE Student Member & Active Volunteer',
  'Leadership',
  'IEEE Student Branch — Wayamba University',
  '2023 - Present',
  'Recognized for ongoing volunteer contributions, workshop support, and active campus technology leadership.',
  'Volunteer Badge',
  1, 'published'
),
(
  'Technical Project Demonstrations',
  'Academic',
  'Faculty Technical Showcase',
  '2024',
  'Demonstrated full-stack project implementations and automation solutions to peers and academic supervisors.',
  'Showcase Award',
  2, 'published'
) ON CONFLICT DO NOTHING;

-- 7. Seed Volunteer Activities
INSERT INTO public.volunteer_activities (
  organization, role, project_name, description, date, display_order, status
) VALUES
(
  'IEEE Student Branch Wayamba University',
  'Event Tech Coordinator',
  'Annual Technical Workshop Series',
  'Coordinated technical setup, participant registration, and live coding demos for over 150+ student participants.',
  '2024',
  1, 'published'
),
(
  'University Open Day Committee',
  'Digital Media & Tech Guide',
  'Computing Dept Open Day',
  'Guided school students and prospective undergraduates through software demonstrations, AI tools, and computer lab exhibits.',
  '2023',
  2, 'published'
) ON CONFLICT DO NOTHING;

-- 8. Seed Site Settings
INSERT INTO public.site_settings (
  id, site_title, meta_description, canonical_url, twitter_handle, accent_color, theme_mode,
  show_hero, show_about, show_skills, show_projects, show_experience, show_education, show_achievements, show_contact
) VALUES (
  'current_settings',
  'R. J. K. Lahiru Madhushan Ranathunga | AI & Web Developer',
  'Personal developer portfolio of R. J. K. Lahiru Madhushan Ranathunga — AI Developer, Web Developer, Undergraduate at Wayamba University of Sri Lanka, and IEEE Volunteer.',
  'https://lahiru-ai.github.io',
  '@lahiru_ai',
  '#3b82f6',
  'dark',
  true, true, true, true, true, true, true, true
) ON CONFLICT (id) DO NOTHING;
