import { PortfolioData } from '@/types/portfolio';

export const initialPortfolioData: PortfolioData = {
  personalInfo: {
    name: "R. J. K. Lahiru Madhushan Ranathunga",
    shortName: "Lahiru Ranathunga",
    headline: "AI Developer | Web Developer | Undergraduate | IEEE Volunteer",
    subheadline: "Crafting intelligent, performant digital solutions at the intersection of modern web engineering, artificial intelligence, and open collaborative ecosystems.",
    location: "Kurunegala, Sri Lanka",
    country: "Sri Lanka",
    bio: [
      "I am an enthusiastic undergraduate, AI developer, and modern web developer from Sri Lanka with a steadfast dedication to building software that solves genuine problems.",
      "My journey spans full-stack architecture, machine learning experiments, and community technology leadership. As an active volunteer with the IEEE Student Branch of Wayamba University of Sri Lanka, I thrive in collaborative spaces where technical curiosity meets tangible social impact.",
      "Whether developing responsive cloud-backed web platforms, automating academic workflows, or exploring intelligent reasoning pipelines, I place strong emphasis on clean code, deliberate design, and measurable reliability."
    ],
    approach: "I believe technology is most powerful when it remains transparent, accessible, and purposeful. I prioritize robust fundamentals, maintainable architectures, and intuitive human-centered interfaces over fleeting complexity.",
    careerGoals: "Aspiring to engineer scalable software systems and intelligent data-driven applications that empower communities and modern enterprises on a global stage.",
    availability: {
      status: "available",
      label: "Available for Technical Collaborations & Opportunities",
      description: "Open to software engineering internships, AI/Web projects, and open-source contributions."
    },
    socialLinks: {
      github: "https://github.com/lahiru-ai",
      linkedin: "https://linkedin.com/in/lahiru-ai",
      email: "lahirumadhushan.dev@gmail.com"
    }
  },
  skills: [
    {
      title: "Core Programming",
      category: "programming",
      description: "Robust foundation in object-oriented and functional paradigms.",
      skills: [
        { name: "Java", level: "Intermediate", tag: "OOP & Enterprise Logic" },
        { name: "Python", level: "Proficient", tag: "AI / Data / Scripting" },
        { name: "JavaScript", level: "Proficient", tag: "Modern ES6+ & Async" },
        { name: "TypeScript", level: "Intermediate", tag: "Type-Safe Architecture" }
      ]
    },
    {
      title: "Frontend Development",
      category: "frontend",
      description: "Crafting fluid, responsive, and accessible user interfaces.",
      skills: [
        { name: "React", level: "Proficient", tag: "Component State & Hooks" },
        { name: "Next.js", level: "Intermediate", tag: "App Router & SSR" },
        { name: "Tailwind CSS", level: "Proficient", tag: "Utility-First Styling" },
        { name: "HTML5 & CSS3", level: "Proficient", tag: "Semantic & Responsive" }
      ]
    },
    {
      title: "Backend Engineering",
      category: "backend",
      description: "Developing resilient REST APIs and scalable server applications.",
      skills: [
        { name: "Spring Boot", level: "Foundational", tag: "Java Microservices & APIs" },
        { name: "Node.js", level: "Intermediate", tag: "Express & Serverless" }
      ]
    },
    {
      title: "Databases & Storage",
      category: "database",
      description: "Schema modeling, relational integrity, and modern cloud databases.",
      skills: [
        { name: "PostgreSQL", level: "Intermediate", tag: "Relational Modeling & SQL" },
        { name: "MySQL", level: "Intermediate", tag: "Database Administration" },
        { name: "Supabase", level: "Intermediate", tag: "Auth & Realtime Storage" }
      ]
    },
    {
      title: "Tools & Ecosystem",
      category: "tools",
      description: "Modern developer environment, version control, and containerization.",
      skills: [
        { name: "Git", level: "Proficient", tag: "Distributed Version Control" },
        { name: "GitHub", level: "Proficient", tag: "CI/CD & Collaboration" },
        { name: "Docker", level: "Foundational", tag: "Containerized Services" },
        { name: "VS Code", level: "Proficient", tag: "Customized Productivity" }
      ]
    },
    {
      title: "Artificial Intelligence & ML",
      category: "ai",
      description: "Harnessing ML algorithms and modern AI-assisted engineering tools.",
      skills: [
        { name: "Artificial Intelligence", level: "Intermediate", tag: "Core Concepts & Search" },
        { name: "Machine Learning", level: "Foundational", tag: "Supervised & Data Models" },
        { name: "AI-Assisted Dev", level: "Proficient", tag: "LLMs, Agents & Prompting" }
      ]
    }
  ],
  projects: [
    {
      id: "serendip-marketplace",
      title: "SERENDIP Marketplace",
      tagline: "Modern E-Commerce & Multi-Vendor Digital Marketplace",
      description: "An intuitive e-commerce platform built to streamline the buying and selling journey for digital and artisanal goods. Designed with responsive layouts, modular cart interactions, and structured data handling.",
      category: "Full-Stack",
      technologies: ["React", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL"],
      features: [
        "Product discovery with multi-faceted filtering",
        "Responsive shopping cart and checkout architecture",
        "Secure relational schema for merchants and products",
        "Clean, minimal buyer-centric UI"
      ],
      githubUrl: "https://github.com/lahiru-ai",
      image: "/projects/serendip.webp",
      featured: true
    },
    {
      id: "wusl-notice-alert",
      title: "WUSL Notice Alert System",
      tagline: "Real-Time Notice Distribution & Notification Portal",
      description: "A centralized web platform engineered for the Wayamba University of Sri Lanka community to broadcast critical academic notices, departmental circulars, and instant alerts with role-based access.",
      category: "Web Applications",
      technologies: ["React", "Next.js", "Tailwind CSS", "Vercel", "Supabase"],
      features: [
        "Instant portal authentication and notice feed",
        "Categorized departmental notices and alerts",
        "Vercel cloud deployment with optimized edge delivery",
        "Mobile-first responsive dashboard for students"
      ],
      githubUrl: "https://github.com/lahiru-ai",
      liveUrl: "https://wusl-notice-alert.vercel.app/login",
      image: "/projects/wusl-alert.webp",
      featured: true
    },
    {
      id: "fas-resource-hub",
      title: "FAS Resource Hub",
      tagline: "Academic Resource Repository for Faculty of Applied Sciences",
      description: "A collaborative digital library and study resource management system designed specifically for students of the Faculty of Applied Sciences, organizing lecture modules, past materials, and reference guides.",
      category: "Educational",
      technologies: ["TypeScript", "Next.js", "Tailwind CSS", "PostgreSQL"],
      features: [
        "Structured course taxonomy by academic year and semester",
        "Curated download repository with verified metadata",
        "Open-source collaborative framework for student contributors",
        "Fast client-side indexing and resource search"
      ],
      githubUrl: "https://github.com/lahiru-ai/fas-resource-hub",
      image: "/projects/fas-hub.webp",
      featured: true
    },
    {
      id: "sri-lankan-herb-website",
      title: "Sri Lankan Herb Website",
      tagline: "Interactive Botanical & Indigenous Herbal Heritage Guide",
      description: "An engaging digital catalog documenting Sri Lanka's indigenous flora, traditional Ayurvedic herbs, botanical properties, and cultural remedies through a clean visual explorer.",
      category: "Web Applications",
      technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
      features: [
        "Curated encyclopedia of traditional medicinal plants",
        "Sinhala & scientific botanical naming cross-reference",
        "Lightweight, zero-dependency static web delivery",
        "Accessible plant search and categorical browsing"
      ],
      githubUrl: "https://github.com/lahiru-ai",
      liveUrl: "https://lahiru-ai.github.io/sri-lankan-herb-website/",
      image: "/projects/herb-website.webp",
      featured: true
    },
    {
      id: "ai-automation-experiments",
      title: "AI & Automation Experiments",
      tagline: "Autonomous Agent Pipelines & Intelligent Tooling",
      description: "A collection of research notebooks, intelligent script automations, and LLM-assisted pipelines evaluating prompt engineering, agentic workflows, and automated code review heuristics.",
      category: "AI & Data",
      technologies: ["Python", "Machine Learning", "OpenAI / Gemini APIs", "Git Automation"],
      features: [
        "Intelligent document summarization scripts",
        "Automated data parsing and CSV transformation modules",
        "Experimental agent tool calling harnesses",
        "Reproducible benchmarks and clean reproducible environments"
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
      skills: ["Project Management", "Team Leadership", "Community Outreach", "Crisis & Field Logistics"]
    },
    {
      id: "ieee-ai-ignite-2026",
      role: "Organizing Committee Member — Technical & Operations",
      organization: "AI IGNITE 2026 — IEEE Student Branch of WUSL",
      period: "2026",
      location: "Wayamba University of Sri Lanka",
      type: "Leadership",
      description: [
        "Spearheaded technical session structuring, workshop scheduling, and student hands-on lab preparations focused on Artificial Intelligence and Machine Learning fundamentals.",
        "Collaborated with guest instructors and industry speakers to tailor curriculum content for undergraduate attendees.",
        "Facilitated interactive hackathons and technical Q&A segments to drive AI literacy across student cohorts."
      ],
      skills: ["AI Workshop Delivery", "Technical Event Planning", "Cross-Functional Collaboration"]
    },
    {
      id: "ieee-day-2026",
      role: "Organizing Committee Member",
      organization: "IEEE Day 2026 — IEEE Student Branch of WUSL",
      period: "2026",
      location: "Wayamba University of Sri Lanka",
      type: "Volunteer",
      description: [
        "Co-organized the flagship IEEE Day celebration uniting student members, faculty advisors, and technology enthusiasts.",
        "Managed stage presentations, digital publicity materials, and technical project exhibitions showcasing student innovations.",
        "Fostered member enrollment and celebrated global technological advancements inspired by IEEE standards."
      ],
      skills: ["Event Organization", "Public Relations", "Digital Media Coordination"]
    },
    {
      id: "ieee-membership-team",
      role: "Active Member — Membership Development Team",
      organization: "IEEE Student Branch of Wayamba University of Sri Lanka",
      period: "Ongoing Volunteer",
      location: "Wayamba University of Sri Lanka",
      type: "Volunteer",
      description: [
        "Actively engage with the university student body to articulate the value of IEEE membership, technical societies, and global networking.",
        "Support onboarding workshops for new undergraduates, guiding them through technical competitions and professional development avenues.",
        "Participate in regular technical branch meetings and volunteer initiatives that advance technological education."
      ],
      skills: ["Community Building", "Member Engagement", "Technical Mentorship", "Communication"]
    }
  ],
  education: [
    {
      id: "wusl-undergraduate",
      degree: "Undergraduate Degree in Applied Sciences",
      institution: "Wayamba University of Sri Lanka (WUSL)",
      period: "Present (Ongoing)",
      location: "Kuliyapitiya / Makandura, Sri Lanka",
      status: "Ongoing",
      highlights: [
        "Focus on Computing, Software Engineering concepts, and Mathematical modeling",
        "Active contributor to student technical chapters and departmental innovation initiatives",
        "Collaborating on real-world software platforms addressing campus challenges"
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
      description: "Recognized for exemplary leadership in mobilizing youth and orchestrating large-scale environmental reclamation along the Athugala corridor.",
      badge: "Leadership"
    },
    {
      id: "ach-2",
      title: "AI IGNITE 2026 Organizing Committee Recognition",
      category: "Workshop",
      issuer: "IEEE Student Branch of WUSL",
      date: "2026",
      description: "Commended for dedicated contribution in orchestrating technical programming and artificial intelligence workshops for emerging technologists.",
      badge: "IEEE Recognition"
    },
    {
      id: "ach-3",
      title: "IEEE Day 2026 Organizing Committee Contribution",
      category: "Community",
      issuer: "IEEE Student Branch of WUSL",
      date: "2026",
      description: "Honored for active role in organizing the annual celebration of worldwide technology innovation and student collaboration.",
      badge: "Community"
    },
    {
      id: "ach-4",
      title: "Active Volunteer & Membership Driver",
      category: "Community",
      issuer: "IEEE Student Branch of Wayamba University",
      date: "Ongoing",
      description: "Continuous dedication to advancing engineering excellence, student mentorship, and membership engagement across university departments.",
      badge: "Volunteer"
    }
  ]
};
