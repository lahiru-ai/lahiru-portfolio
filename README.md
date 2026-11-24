# R. J. K. Lahiru Madhushan Ranathunga — Premium Developer Portfolio

A production-quality personal developer portfolio website engineered with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

> **Live Preview & Personal Brand**: AI Developer | Web Developer | Undergraduate | IEEE Volunteer  
> **Location**: Sri Lanka 🇱🇰  
> **GitHub**: [github.com/lahiru-ai](https://github.com/lahiru-ai)

---

## 🎨 Design System & Philosophy

Inspired by the design paradigms of **Apple** (typography, whitespace, balanced presentation), **Vercel** (minimal developer-first interface), **Linear** (sophisticated UI and smooth interactions), and **Stripe** (subtle glow, gradients, visual storytelling).

- **Near-Black Palette**: Pure deep background (`#070709`) with radial dark mesh gradients.
- **Selective Glassmorphism**: Tailored backdrop blurs with subtle high-contrast borders.
- **Visual Typography**: Clean hierarchy using standard modern sans with monospace accents.
- **Motion & Micro-interactions**: Smooth transitions and interactive cards.
- **Zero AI-Template Genericness**: Authentic structure highlighting actual undergraduate initiatives, verified projects, and confirmed leadership roles.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons & Custom SVG Social Marks
- **State & Architecture**: React Context (`PortfolioContext`) with typed configuration schemas
- **Deployment Ready**: Optimized for Vercel, GitHub Pages, or any modern edge hosting platform

---

## 📂 Project Architecture

```text
├── src/
│   ├── app/
│   │   ├── globals.css         # Dark theme styling, glassmorphic utilities, custom scrollbars
│   │   ├── layout.tsx          # Root layout with SEO & OpenGraph metadata
│   │   └── page.tsx            # Composition of all portfolio sections
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminPreviewModal.tsx  # Future Admin Studio configuration interface
│   │   ├── icons/
│   │   │   └── SocialIcons.tsx        # High-fidelity SVG vectors for GitHub & LinkedIn
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Floating blur navbar with dynamic status pill & mobile drawer
│   │   │   └── Footer.tsx             # Footer with Sri Lanka local time (GMT+5:30) and links
│   │   ├── sections/
│   │   │   ├── Hero.tsx               # Hero introduction, headline, avatar, CTAs
│   │   │   ├── About.tsx              # Professional biography, approach to tech, career goals
│   │   │   ├── Skills.tsx             # Categorized skills grid with level tags and search
│   │   │   ├── Projects.tsx           # Interactive project cards with live demos & repos
│   │   │   ├── Experience.tsx         # IEEE & ZeroPlastic leadership timeline
│   │   │   ├── Education.tsx          # Wayamba University of Sri Lanka academic profile
│   │   │   ├── Achievements.tsx       # Verified recognitions, workshops, and appointments
│   │   │   └── Contact.tsx            # Validated contact form, quick email copy, location
│   │   └── ui/
│   │       └── BackToTop.tsx          # Scroll-to-top button with circular SVG progress
│   ├── context/
│   │   └── PortfolioContext.tsx       # Centralized state provider with localStorage sync
│   ├── data/
│   │   └── portfolioData.ts           # Centralized configuration data store
│   ├── lib/
│   │   └── utils.ts                   # Tailwind utility helpers
│   └── types/
│       └── portfolio.ts               # Strict TypeScript definitions for all sections
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
└── tailwind.config.ts
```

---

## 🚀 Featured Projects Included

1. **SERENDIP Marketplace** — Modern E-Commerce & Multi-Vendor Digital Marketplace ([GitHub](https://github.com/lahiru-ai))
2. **WUSL Notice Alert System** — Real-time notice distribution & alert platform for university community ([Live Portal](https://wusl-notice-alert.vercel.app/login) | [GitHub](https://github.com/lahiru-ai))
3. **FAS Resource Hub** — Academic resource repository for the Faculty of Applied Sciences ([GitHub Repository](https://github.com/lahiru-ai/fas-resource-hub))
4. **Sri Lankan Herb Website** — Interactive digital catalog of indigenous flora & botanical heritage ([Live Demo](https://lahiru-ai.github.io/sri-lankan-herb-website/) | [GitHub](https://github.com/lahiru-ai))
5. **AI & Automation Experiments** — Exploratory intelligent agent pipelines and research tooling ([GitHub](https://github.com/lahiru-ai))

---

## 🌟 Leadership & Volunteer Activities

- **ZeroPlastic Wayamba**: Deputy Project Head for *Athugala Road Cleanup 2026*.
- **IEEE Student Branch of WUSL**: Organizing Committee Member for *AI IGNITE 2026*.
- **IEEE Student Branch of WUSL**: Organizing Committee Member for *IEEE Day 2026*.
- **IEEE Membership Development Team**: Active volunteer driving student membership and technical workshops.

---

## ⚙️ Future Admin Dashboard Architecture

The application comes pre-architected for a seamless administrative workflow:
- Click the **"Admin Studio"** button in the navbar or footer to open the in-browser live configuration studio.
- Live-edit personal headlines, availability status, and social details with instant visual updates.
- Export the updated data schema as pure JSON with one click, and copy it directly to `src/data/portfolioData.ts` to commit changes through Git.
- Prepared for future backend integration without unnecessary complexity in v1.

---

## 💻 Getting Started Locally

### 1. Prerequisites
- Node.js (v18+ recommended, v24 supported)
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/lahiru-ai/lahiru-portfolio.git
cd lahiru-portfolio

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub (`github.com/lahiru-ai/lahiru-portfolio`).
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository (`lahiru-portfolio`).
4. Framework preset will automatically detect **Next.js**.
5. Click **Deploy**. Vercel will build and deploy the production site within seconds with global CDN caching.

---

## 📄 License
This project is open-source under the MIT License.
