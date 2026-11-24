import { PortfolioData } from '@/types/portfolio';

export const initialPortfolioData: PortfolioData = {
  personalInfo: {
    name: "R. J. K. Lahiru Madhushan Ranathunga",
    shortName: "Lahiru Ranathunga",
    headline: "AI Developer | Web Developer | IEEE Volunteer",
    subheadline: "I build intelligent digital solutions through artificial intelligence, software engineering and modern web technologies.",
    location: "Kurunegala, Sri Lanka",
    country: "Sri Lanka",
    bio: [
      "I am an undergraduate, AI developer, and modern web developer based in Sri Lanka, passionate about creating high-impact software systems.",
      "My engineering focus bridges modern full-stack development, applied machine learning, and university community initiatives. As an active volunteer with the IEEE Student Branch of Wayamba University of Sri Lanka, I regularly contribute to technical events, workshops, and community projects.",
      "Whether architecting responsive web platforms, automating notice distribution systems, or building exploratory AI pipelines, I prioritize clean architecture, performant code, and intuitive user experiences."
    ],
    approach: "I focus on simplicity, robust fundamentals, and purposeful design. I believe technology should remain human-centric, reliable, and easily maintainable.",
    careerGoals: "Aiming to build scalable intelligent applications and robust distributed systems that solve critical community and organizational challenges.",
    availability: {
      status: "available",
      label: "Available for Technical Projects & Collaborations",
      description: "Open to software engineering roles, technical projects, and open-source collaborations."
    },
    socialLinks: {
      github: "https://github.com/lahiru-ai",
      linkedin: "https://www.linkedin.com/in/lahiru-m-ranathunga",
      email: "lahirumadhushan566@gmail.com"
    }
  },
  skills: [
    {
      title: "Programming Languages",
      category: "programming",
      description: "Core languages for systems, scripting, and enterprise applications.",
      skills: [
        { name: "Java", level: "Intermediate", tag: "Java 21 & OOP Logic" },
        { name: "Python", level: "Proficient", tag: "AI, ML & Automation" },
        { name: "JavaScript", level: "Proficient", tag: "Modern ES6+ & Async" },
        { name: "TypeScript", level: "Intermediate", tag: "Strict Types & Contracts" }
      ]
    },
    {
      title: "Frontend Development",
      category: "frontend",
      description: "Modern component-driven web interfaces with fluid responsive design.",
      skills: [
        { name: "React", level: "Proficient", tag: "Hooks & Component Architecture" },
        { name: "Next.js", level: "Intermediate", tag: "App Router & SSR" },
        { name: "Tailwind CSS", level: "Proficient", tag: "Utility-First Design" },
        { name: "HTML & CSS", level: "Proficient", tag: "Semantic & Accessible Web" }
      ]
    },
    {
      title: "Backend Development",
      category: "backend",
      description: "Robust application backends, microservices, and REST APIs.",
      skills: [
        { name: "Spring Boot", level: "Foundational", tag: "Java Enterprise Backends" },
        { name: "Node.js", level: "Intermediate", tag: "Express & Serverless" }
      ]
    },
    {
      title: "Databases & Storage",
      category: "database",
      description: "Relational modeling, SQL optimization, and cloud databases.",
      skills: [
        { name: "PostgreSQL", level: "Intermediate", tag: "Relational Modeling & Queries" },
        { name: "MySQL", level: "Intermediate", tag: "Database Administration" },
        { name: "Supabase", level: "Intermediate", tag: "Postgres Cloud, Auth & Storage" }
      ]
    },
    {
      title: "AI & Machine Learning",
      category: "ai",
      description: "Applied artificial intelligence, ML workflows, and AI assistants.",
      skills: [
        { name: "Artificial Intelligence", level: "Intermediate", tag: "Search & Algorithmic Heuristics" },
        { name: "Machine Learning", level: "Foundational", tag: "Models & Data Evaluation" },
        { name: "AI Assistants & Dev", level: "Proficient", tag: "LLMs, Prompting & Tooling" }
      ]
    },
    {
      title: "Development Tools",
      category: "tools",
      description: "Developer workflows, version control, and containerization.",
      skills: [
        { name: "Git", level: "Proficient", tag: "Version Control & Branching" },
        { name: "GitHub", level: "Proficient", tag: "Collaboration & Repositories" },
        { name: "Docker", level: "Foundational", tag: "Containerized Environments" },
        { name: "VS Code", level: "Proficient", tag: "Productivity & Debugging" }
      ]
    }
  ],
  projects: [
    {
      id: "serendip-marketplace",
      title: "SERENDIP Marketplace",
      tagline: "Local Producers to International Markets",
      description: "A marketplace platform connecting local producers with international markets. Engineered with structured multi-vendor cataloging, shopping workflows, and relational data persistence.",
      category: "Full-Stack",
      technologies: ["Java 21", "Spring Boot", "React", "TypeScript", "PostgreSQL"],
      features: [
        "Product catalog with multi-vendor showcase",
        "Cart and ordering state management",
        "Structured PostgreSQL schema for products and merchants",
        "Clean, responsive buyer-facing interface"
      ],
      githubUrl: "https://github.com/lahiru-ai",
      image: "/projects/serendip.webp",
      featured: true
    },
    {
      id: "wusl-notice-alert",
      title: "WUSL Notice Alert",
      tagline: "Automated University Notice & Result Notifications",
      description: "Automated university notice and result notification system for Wayamba University of Sri Lanka, delivering updates with edge deployment and cloud database synchronization.",
      category: "Web Applications",
      technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Cheerio"],
      features: [
        "Notice aggregation and parsing with Cheerio",
        "Real-time student portal authentication",
        "Supabase cloud database synchronization",
        "Edge-optimized deployment on Vercel"
      ],
      githubUrl: "https://github.com/lahiru-ai",
      liveUrl: "https://wusl-notice-alert.vercel.app/login",
      image: "/projects/wusl-alert.webp",
      featured: true
    },
    {
      id: "fas-resource-hub",
      title: "FAS Resource Hub",
      tagline: "Academic Resource Platform for Faculty of Applied Sciences",
      description: "Academic resource platform for lecture notes, tutorials, assignments and past papers designed for Faculty of Applied Sciences undergraduates.",
      category: "Educational",
      technologies: ["TypeScript", "Next.js", "Tailwind CSS", "PostgreSQL"],
      features: [
        "Curriculum-indexed lecture note categorization",
        "Organized past paper and tutorial archive",
        "Community repository with open-source collaboration",
        "Fast searchable index of departmental resources"
      ],
      githubUrl: "https://github.com/lahiru-ai/fas-resource-hub",
      image: "/projects/fas-hub.webp",
      featured: true
    },
    {
      id: "sri-lankan-herb-website",
      title: "Sri Lankan Herb Website",
      tagline: "Showcasing Sri Lankan Indigenous Herbs",
      description: "A website showcasing Sri Lankan herbs, featuring traditional medicinal characteristics, botanical classifications, and cultural botanical wisdom.",
      category: "Web Applications",
      technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
      features: [
        "Comprehensive directory of indigenous medicinal herbs",
        "Scientific and local vernacular nomenclature",
        "Fast, zero-overhead static web delivery",
        "Interactive categorical herb browsing"
      ],
      githubUrl: "https://github.com/lahiru-ai",
      liveUrl: "https://lahiru-ai.github.io/sri-lankan-herb-website/",
      image: "/projects/herb-website.webp",
      featured: true
    },
    {
      id: "ai-automation-projects",
      title: "AI and Automation Projects",
      tagline: "Personal Experiments with AI Assistants & Automation",
      description: "Personal experiments involving AI assistants and automation, investigating intelligent agent loops, automated reasoning tasks, and developer productivity workflows.",
      category: "AI & Data",
      technologies: ["Python", "Machine Learning", "AI Assistants", "Automation Pipelines"],
      features: [
        "Automated data parsing and summarization routines",
        "Prompt engineering and agent workflow evaluations",
        "Script-based developer automation utilities",
        "Documented reproducible experiments"
      ],
      githubUrl: "https://github.com/lahiru-ai",
      image: "/projects/ai-experiments.webp",
      featured: false
    }
  ],
  experience: [
    {
      id: "zero-plastic-cleanup-2026",
      role: "Deputy Project Head",
      organization: "ZeroPlastic Wayamba — Athugala Road Cleanup 2026",
      period: "2026",
      location: "Kurunegala, Sri Lanka",
      type: "Leadership",
      description: [
        "Served as Deputy Project Head directing logistics, volunteer teams, and field execution for the prominent Athugala Road environmental cleanup drive.",
        "Mobilized undergraduate and community volunteers to systematically collect, categorize, and responsibly dispatch non-biodegradable waste.",
        "Coordinated with municipal stakeholders and youth environmental chapters to champion grassroots sustainability advocacy."
      ],
      skills: ["Project Management", "Team Leadership", "Community Outreach", "Field Logistics"]
    },
    {
      id: "ieee-ai-ignite-2026",
      role: "Organizing Committee Member",
      organization: "AI IGNITE 2026 — IEEE Student Branch of WUSL",
      period: "2026",
      location: "Wayamba University of Sri Lanka",
      type: "Leadership",
      description: [
        "Coordinated technical sessions, workshop agendas, and undergraduate hands-on lab preparations focused on Artificial Intelligence and Machine Learning fundamentals.",
        "Collaborated with resource persons to structure practical demonstrations for student participants.",
        "Facilitated event day operations, attendee guidance, and interactive tech Q&A segments."
      ],
      skills: ["AI Workshop Coordination", "Technical Operations", "Community Engagement"]
    },
    {
      id: "ieee-day-2026",
      role: "Organizing Committee Member",
      organization: "IEEE Day 2026 — IEEE Student Branch of WUSL",
      period: "2026",
      location: "Wayamba University of Sri Lanka",
      type: "Volunteer",
      description: [
        "Assisted in orchestrating the annual IEEE Day celebrations across the university branch.",
        "Coordinated promotional announcements, technical showcases, and member gathering activities.",
        "Promoted IEEE technological values and international student networking."
      ],
      skills: ["Event Organization", "Publicity Coordination", "Teamwork"]
    },
    {
      id: "ieee-membership-team",
      role: "Active Member",
      organization: "IEEE Membership Team — IEEE Student Branch of WUSL",
      period: "Active Member",
      location: "Wayamba University of Sri Lanka",
      type: "Volunteer",
      description: [
        "Engage with incoming and existing university students to explain IEEE membership benefits and technical society opportunities.",
        "Assist in onboarding sessions and community tech meetups.",
        "Participate actively in regular branch meetings and student initiatives."
      ],
      skills: ["Member Outreach", "Student Mentorship", "Community Building"]
    }
  ],
  education: [
    {
      id: "wusl-undergraduate",
      degree: "Undergraduate Studies in Applied Sciences",
      institution: "Wayamba University of Sri Lanka",
      period: "Ongoing",
      location: "Kuliyapitiya / Makandura, Sri Lanka",
      status: "Ongoing",
      highlights: [
        "Coursework spanning Computing, Software Development fundamentals, and Mathematics",
        "Active member of campus technical chapters and volunteer organizations",
        "Engaged in real-world application development for campus needs"
      ]
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Deputy Project Head — Athugala Road Cleanup 2026",
      category: "Leadership",
      issuer: "ZeroPlastic Wayamba",
      date: "2026",
      description: "Appointed as Deputy Project Head overseeing volunteer coordination, field safety, and environmental reclamation along Athugala Road.",
      badge: "Leadership"
    },
    {
      id: "ach-2",
      title: "AI IGNITE 2026 Organizing Committee Member",
      category: "Workshop",
      issuer: "IEEE Student Branch of WUSL",
      date: "2026",
      description: "Organizing committee member for AI IGNITE 2026, delivering technical AI workshops for university students.",
      badge: "IEEE Organizing"
    },
    {
      id: "ach-3",
      title: "IEEE Day 2026 Organizing Committee Member",
      category: "Community",
      issuer: "IEEE Student Branch of WUSL",
      date: "2026",
      description: "Contributed to planning and executing the IEEE Day 2026 flagship community event at Wayamba University of Sri Lanka.",
      badge: "IEEE Committee"
    },
    {
      id: "ach-4",
      title: "IEEE Membership Team Active Involvement",
      category: "Community",
      issuer: "IEEE Student Branch of WUSL",
      date: "Active",
      description: "Active engagement with the student membership team driving engineering awareness, community growth, and student onboarding.",
      badge: "Volunteer"
    }
  ]
};
