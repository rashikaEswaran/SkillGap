# CURRICULUMIQ V2 - FULL RECONSTRUCTION PROMPT

A single, comprehensive prompt that any AI can use to completely rebuild the CurriculumIQ v2 web application from scratch. Every file, every component, every API, every design decision is documented here.

---

## 1. PROJECT OVERVIEW

**Name:** CurriculumIQ v2  
**Tagline:** "Know Your Industry Readiness Before Companies Do"  
**Purpose:** AI-driven workforce intelligence platform. Analyzes university/institute curriculum gaps against real-time industry demand using AI/ML. Helps students and institutions understand what skills are actually needed in the job market.

**Core Value Proposition:**  
- Analyzes curriculum against industry requirements (LinkedIn, AICTE, NASSCOM, Microsoft data)
- Provides explainable AI recommendations — no black box
- Real-time industry trend analysis
- Skill gap identification with actionable improvements

**Target Users:** Students, university administrators, hiring managers, career counselors.

---

## 2. TECH STACK

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.0.0 | React framework with App Router |
| React | 18.3.1 | UI library |
| React DOM | 18.3.1 | DOM rendering |
| TypeScript | 5.3.0 | Type safety |
| Tailwind CSS | 3.4.0 | Utility-first CSS |
| tailwindcss-animate | 1.0.7 | Animation utilities plugin |
| Framer Motion | 10.18.0 | React animations & gestures |
| GSAP | 3.15.0 | Advanced animations |
| Three mantle (three) | 0.184.0 | 3D rendering |
| @react-three/fiber | 8.17.10 | React Three.js integration |
| @react-three/drei | 9.115.0 | R3F helpers (OrbitControls, etc.) |
| Firebase (auth, firestore, storage) | ^10.14.0 | Auth + database + file storage |
| Lucide React | ^0.400.0 | Icon library |
| Recharts | ^2.10.0 | Charts & data visualization |
| Chart.js | ^4.5.1 | Charts |
| react-chartjs-2 | ^5.3.1 | React Chart.js wrapper |
| Lenis | ^1.3.23 | Smooth scrolling |
| class-variance-authority | ^0.7.0 | Component variant management |
| clsx | ^2.1.0 | Conditional classnames |
| tailwind-merge | ^2.2.0 | Merge Tailwind classes |
| zod | ^3.22.0 | Schema validation |
| date-fns | ^3.0.0 | Date utilities |
| maath | ^0.10.8 | Math utilities for 3D |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Python | 3.10+ | Server language |
| Flask | latest | Web server framework |
| Flask-CORS | latest | Cross-origin support |
| google-generativeai (Gemini) | latest | AI analysis |
| firebase-admin | latest | Firestore admin SDK |
| ddgs (DuckDuckGo Search) | latest | Web search (free, no API key) |
| requests | latest | HTTP client |
| beautifulsoup4 | latest | HTML parsing |

### Infrastructure / Services
| Service | Purpose |
|---------|---------|
| Firebase Authentication | Email/password + OAuth (Google, GitHub) |
| Firebase Firestore | NoSQL database for skills, users, reports |
| Firebase Storage | User profile images, report uploads |
| Google Gemini AI | AI analysis, skill extraction, trend summaries |
| DuckDuckGo Search (via ddgs) | Free web search for real-time industry data |
| Vercel | Frontend hosting (Next.js) |
| Python server | Backend SLM agent (runs on localhost:5000) |

---

## 3. DESIGN SYSTEM

### Color Palette (Dark Theme)
| Token | Hex | Usage |
|-------|-----|-------|
| --bg-background | #0A0A0A | Page background |
| --bg-surface | #111118 | Card/component backgrounds |
| --bg-surface2 | #1A1A24 | Elevated surfaces |
| --text-primary | #FFFFFF | Primary text |
| --text-secondary | rgba(255,255,255,0.7) | Secondary text |
| --text-tertiary | rgba(255,255,255,0.5) | Tertiary/muted text |
| primary (red) | #FF0033 | Primary accent, CTAs, brand color |
| primary-600 | #E6002E | Hover states |
| secondary (pink) | #FF3366 | Secondary accent |
| secondary-400 | #FF6699 | Subtle highlights |
| danger | #FF6B6B | Errors |
| success | #00E676 | Success states |
| warning | #FFD600 | Warnings |
| --border-color | rgba(255,255,255,0.1) | Subtle borders |
| --border-light | rgba(255,255,255,0.05) | Very subtle borders |
| --card-bg | rgba(255,255,255,0.03) | Glass card background |

### Typography
| Font | Weight | Variable | Usage |
|------|--------|----------|-------|
| Inter | 300-700 | --font-inter | Body text (body) |
| Space Grotesk | 400-700 | --font-space-grotesk | Display headings |
| JetBrains Mono | 400 | --font-jetbrains-mono | Code/data/mono |
| Playfair Display | 400-600 (italic) | (inline) | Hero/highlight text on landing |

### Sizing & Spacing Scale
- Border radius: sm=6px, md=8px, lg=12px, xl=16px, 2xl=24px
- Container max: 1400px
- Page padding: 2rem (base)
- Font sizes: xs=12px, sm=14px, base=16px, lg=20px, xl=24px, 2xl=32px, 3xl=48px, 4xl=64px

### Effects
- **Glassmorphism:** `bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10`
- **Neon glow red:** `box-shadow: 0 0 35px rgba(255, 0, 51, 0.45)`
- **Text glow:** `text-shadow: 0 0 25px rgba(255, 51, 102, 0.7)`
- **Gradients:** `linear-gradient(135deg, #FF0033, #FF3366)` — primary | `linear-gradient(180deg, #0A0A0F, #111118)` — dark surface
- **Animations:** fade-in, fade-in-up, slide-in-left, slide-in-right, scale-in, pulse-glow, float, count-up (all defined in tailwind.config)

### Lucide Icons Used Throughout
- Navigation: `BarChart3`, `TrendingUp`, `FileText`, `Activity`, `Briefcase`, `Calendar`, `Settings`
- UI: `X`, `Search`, `ArrowRight`, `ChevronRight`, `Eye`, `EyeOff`, `Lock`, `Mail`
- Features: `Brain`, `Zap`, `Shield`, `Target`, `Cpu`, `Network`, `Globe`, `MapPin`
- Industry: `Linkedin`, `School`, `Building2`, `ExternalLink`, `Bell`

---

## 4. PROJECT STRUCTURE

```
curriculumiq-v2/
├── frontend/                          # Next.js App
│   ├── app/
│   │   ├── page.tsx                   # HOME PAGE — 3D Landing with brain animation
│   │   ├── page-old.tsx               # (kept for reference)
│   │   ├── layout.tsx                 # Root layout — Google Fonts + dark theme
│   │   ├── globals.css                # Global styles + CSS variables
│   │   ├── login/page.tsx             # Login page
│   │   ├── register/page.tsx          # Registration page
│   │   ├── signup/page.tsx            # Signup page
│   │   ├── dashboard/page.tsx         # Overview dashboard (main app entry)
│   │   ├── industry/page.tsx          # Industry news & hiring feed
│   │   ├── analysis/page.tsx          # Detailed skill analysis
│   │   ├── gap-analysis/page.tsx      # Curriculum vs industry gap analysis
│   │   ├── demand/page.tsx            # Current job demand data
│   │   ├── performance/page.tsx       # Student performance tracking
│   │   ├── forecast/page.tsx          # Future skill demand forecast
│   │   ├── reports/page.tsx           # Generated reports
│   │   ├── settings/page.tsx          # User settings
│   │   ├── bloom/page.tsx             # (Bonus page)
│   │   ├── halo/page.tsx              # (Bonus page)
│   │   ├── live-analysis/page.tsx     # Real-time analysis page
│   │   └── api/
│   │       ├── slm/analyze/route.ts   # API proxy → SLM server /api/analyze
│   │       ├── slm/jobs/route.ts      # API proxy → SLM server /api/jobs
│   │       ├── slm/gap-analysis/route.ts # API proxy → SLM server /api/gap-analysis
│   │       └── analyze/route.ts       # Direct analysis endpoint
│   ├── components/
│   │   ├── ai-chat-assistant.tsx      # Floating AI chat (Gemini sparkle icon)
│   │   ├── ui/                        # shadcn/ui components (card, button, badge)
│   │   ├── layout/
│   │   │   ├── dashboard-layout.tsx   # Main layout wrapper with sidebar
│   │   │   ├── top-nav.tsx            # Top navigation with user info
│   │   │   └── sidebar.tsx            # Bottom dock-style navigation bar
│   │   ├── 3d/
│   │   │   └── Scene3D.tsx            # 3D scene component (Three.js)
│   │   ├── effects/
│   │   │   └── CursorFollower.tsx     # Custom cursor effect
│   │   ├── theme/
│   │   │   ├── theme-provider.tsx     # Next.js ThemeProvider wrapper
│   │   │   └── theme-toggle.tsx       # Light/dark mode toggle
│   │   └── robot-mascot.tsx           # Robot mascot component (unused)
│   ├── lib/
│   │   ├── firebase.ts                # Firebase client initialization (auth, db, storage)
│   │   ├── utils.ts                   # cn() helper and other utilities
│   │   └── motion-presets.ts          # Framer Motion animation presets
│   ├── services/
│   │   └── auth.ts                    # Firebase auth operations (signUp, logIn, logOut)
│   ├── public/
│   │   └── (images, fonts, assets)
│   ├── package.json                   # Dependencies listed in section 2
│   ├── tailwind.config.ts             # Full Tailwind configuration with design system
│   ├── next.config.js                 # next.config with remotePatterns for images
│   └── ...
│
└── backend/
    ├── slm-server.py                  # Flask API server (localhost:5000)
    ├── slm-agent/
    │   ├── agent.py                   # SLMAgent class (main analysis engine)
    │   ├── auto_fetcher.py            # Auto-fetcher for periodic updates
    │   ├── test_slm.py                # Test scripts
    │   └── tools/
    │       ├── web_search.py          # DuckDuckGo search implementation
    │       ├── job_scraper.py         # Job scraping utilities
    │       └── __init__.py
    ├── scraper/
    │   ├── linkedin_scraper.py        # LinkedIn data scraping
    │   ├── twitter_scraper.py         # Twitter/X data scraping
    │   └── aicte_scraper.py           # AICTE curriculum scraping
    └── requirements.txt               # Python dependencies
```

---

## 5. PAGES: FULL DESCRIPTION

### 5.1 Homepage (`/`)
**Purpose:** Dramatic marketing landing page with 3D brain visualization. Converts visitors to sign up.

**Layout:**
- Full-screen `<canvas>` background with 3D brain particle animation (`Cinematic3DCanvas`)
- Navigation bar (sticky, transparent → blur on scroll)
- Hero section: Large headline "AI Workforce Intelligence Platform" with subheading
- Features grid: 4 feature cards with icons
- Stats section: Animated counters (Students, Universities, Companies, Skills)
- How it Works: 3-step process
- CTA section: "Get Started" button → `/register`
- Footer: Links, social icons, copyright

**Key Component: Cinematic3DCanvas**
- Uses HTML5 Canvas with `requestAnimationFrame`
- Renders 2000 brain particles shaped like a brain (gyri effect via sin(theta*6) * cos(phi*6))
- Particle rings orbiting in X, Y, Z axes (3 rings, 420 particles total)
- 3 floating orbs with independent bobbing animation
- Mouse parallax: Camera shifts based on mouse position (lerp smoothing)
- Scroll parallax: Canvas moves with scroll offset
- Color scheme for particles: `#ff3366` (65%), `#ff0033` (35%), `#ff6699` (rare)
- Particle sizes: 1.3-4.1px for brain, 0.9-3.1px for rings
- Z-depth sorting and perspective projection (FOV = 800)
- Canvas dimensions: `window.innerWidth` × `window.innerHeight`

---

### 5.2 Login Page (`/login`)
**Purpose:** User authentication

**Layout:**
- Full-screen page with animated particle canvas background (rotating particles around center)
- Left side: Brand logo, tagline, animated brain particles
- Right side: Login form
  - Email input (with Mail icon)
  - Password input (with Lock icon, Eye/EyeOff toggle)
  - "Remember me" checkbox
  - "Sign In" button (red, full-width)
  - "Forgot password?" link
  - Divider: "or continue with"
  - Social login buttons: Google, GitHub
  - "Don't have an account? Register" link
- All inputs: dark glassmorphism style (`bg-white/5 border border-white/10 rounded-xl`)
- Error states: red border + error message

**Auth Flow:**
- Calls `logIn(email, password)` from `services/auth.ts`
- On success: stores user in state, redirects to `/dashboard`
- On error: displays Firebase auth error message
- Uses `onAuthStateChanged` to auto-redirect logged-in users

---

### 5.3 Register Page (`/register`)
**Purpose:** New user registration

**Layout:**
- Same animated background as login
- Form fields: Full Name, Email, Password, Confirm Password
- "Create Account" button
- "Already have an account? Login" link
- Social registration: Google, GitHub
- Optional: Role selection (Student / University / Industry)

---

### 5.4 Dashboard (`/dashboard`) — Main App
**Purpose:** Central hub. Shows overview of industry skills, trends, and key metrics.

**Uses:** `DashboardLayout` wrapper (sidebar + top nav + content area)

**Layout:**
- **Top section:** Welcome message ("Welcome back, {name}")
- **Stats row:** 4 stat cards with animated counters:
  - Total Skills Tracked
  - In-Demand Skills
  - Your Skill Score
  - Industry Readiness
- **Skills Section:** "Trending Skills" cards in a grid
  - Each card: skill name, demand score (0-100), category badge, company logo, Picsum photo
  - Cards hover: scale up, shadow glow, show "View Details" button
- **Industry News Feed:** Scrollable list of news cards with real-time data
  - Categories: Hiring, Skill Demand, News, Reports
  - Each card: title, source, date, excerpt, "Read more" link
  - Filter tabs: All, Hiring, Skill Demand, News
- **Quick Actions:** Buttons to navigate to Analysis, Gap Analysis, Reports

**Data Sources:**
- Firestore `industrySkills` collection (ordered by date, limit 20)
- Falls back to SLM API if Firestore data is sparse (<6 items)
- SLM API queries: "AI", "Data Science", "Cloud", "DevOps" → fetches real-time skills

**Skill Card Design:**
- `picsum.photos/seed/{hash}/400/200` for deterministic real photos
- `border border-white/10 rounded-xl overflow-hidden`
- `hover:scale-[1.02] hover:shadow-xl transition-all`
- Inside: gradient overlay at bottom, skill title (white, large), demand score badge, category badge

---

### 5.5 Industry (`/industry`)
**Purpose:** Industry news and hiring feed

**Layout:**
- Tabbed filter: All / Hiring / Skill Demand / News / Reports国产
- News cards with: title, source (LinkedIn, AICTE, NASSCOM, Microsoft), date, content preview, external link
- Hiring cards include: company, location, openings, required skills
- All cards have Picsum photos via `getUniqueImageUrl()`

**Data:** Firestore `industryNews` collection or SLM API fallback

---

### 5.6 Analysis (`/analysis`)
**Purpose:** Detailed skill analysis with charts

**Layout:**
- Pie chart: Skill category distribution (Programming, AI/ML, Data, Cloud, DevOps, Security)
- Bar chart: Top 10 in-demand skills by score
- Skills table: Name, demand score, category, source, trend direction
- Filter by category tabs

**Uses:** Recharts for charts, animated with `framer-motion`

---

### 5.7 Gap Analysis (`/gap-analysis`)
**Purpose:** Compare your curriculum against industry requirements

**Layout:**
- Curriculum upload: "Upload your syllabus" (PDF/text)
- Analysis result sections:
  - Coverage percentage (matched vs missing skills)
  - Matched skills (green checkmarks)
  - Missing skills (red X marks) with recommendation to add
  - Industry trends list
- Action items: "Update curriculum" button

**Backend:** SLM Agent analyzes uploaded curriculum vs industry data

---

### 5.8 Demand (`/demand`)
**Purpose:** Current job market demand by skill

**Layout:**
- Search bar: "Enter a skill to analyze demand"
- Results card: Skill name, demand score (0-100), trend direction, job openings, top companies hiring
- Related skills section
- Location filter: Bangalore, Hyderabad, Chennai, etc.

**Backend:** `POST /api/slm/analyze` with query parameter

---

### 5.9 Performance (`/performance`)
**Purpose:** Track student learning progress

**Layout:**
- Progress bars for each skill domain
- Time-series line chart: skill score over time
- Streak counter (consecutive days of activity)
- Certificates/achievements earned
- AI recommendations based on performance gaps

---

### 5.10 Forecast (`/forecast`)
**Purpose:** Predict future skill demand trends

**Layout:**
- Line chart: Skill demand projection (next 6-12 months)
- Confidence intervals (shaded area)
- Emerging skills carousel
- Industry-specific forecasts

---

### 5.11 Reports (`/reports`)
**Purpose:** Generated analysis reports

**Layout:**
- Report list: date, type, preview
- Download as PDF button
- Share report button
- Report preview modal

---

### 5.12 Settings (`/settings`)
**Purpose:** User profile and preferences

**Layout:**
- Profile section: Avatar upload, name, email, role
- Notification preferences: toggles
- Theme: Dark mode (only option — no light mode in v2)
- Data privacy: Download data, delete account

---

## 6. SHARED COMPONENTS

### 6.1 AI Chat Assistant (`components/ai-chat-assistant.tsx`)
**Purpose:** Floating AI assistant for navigation help

**Design:**
- Floating button: Bottom-right, fixed, circular, `bg-gradient-to-br from-blue-500 to-purple-600`
- Button icon: Sparkles (Lucide) — Gemini-style
- On click: Opens chat panel (bottom-right, 400×500px)
- Panel: Dark bg (#0A0A0A), border border-white/10, rounded-2xl
- Header: "AI Assistant" with subtitle "Explaining navigation"
- Messages: User (right, red bg), Assistant (left, white/10 bg)
- Navigation actions buttons: When user asks about a Sections, show labeled buttons (e.g. "Go to Industry News")
- Loading: 3 bouncing dots animation
- Input: text field + send button
- Footer: "Powered by Explainable AI — no hidden decisions"

**Behavior:**
- `generateLocalResponse()` — keyword-matching (no AI API calls)
- Matches: "news" → Industry, "dashboard" → Dashboard, "gap" → Gap Analysis, "demand" → Demand
- Navigation actions generated from `PAGE_MAP` constant
- Uses `useRouter()` for page navigation
- Messages stored in React state (not persistent)
- Enter key sends message

### 6.2 Dashboard Layout (`components/layout/dashboard-layout.tsx`)
**Purpose:** Wraps all dashboard pages

**Layout:**
- TopNav: Logo, search bar, notification bell, user avatar, logout button
- Main content area: `mt-32 p-8 pb-24` (leaves space for top nav + bottom sidebar)
- Bottom Sidebar: Horizontal dock at bottom of screen
  - Fixed bottom-4, centered, glassmorphism
  - Items: Overview, Industry, Skill Gap, Analysis, Current Demand, Performance, Forecast, Settings
  - Active item: red bg with border + red text
  - Hover: scale up, bg highlight
  - Width: full, items evenly spaced
- `ThemeProvider` wraps everything

### 6.3 TopNav (`components/layout/top-nav.tsx`)
**Purpose:** Top navigation bar

**Layout:**
- Fixed top, full width, height ~80px
- Left: Logo (brain icon), "CurriculumIQ" text
- Center: Search bar with Search icon
- Right: Notification bell (with badge), user avatar dropdown
- Glassmorphism: `bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-xl`

### 6.4 Sidebar (`components/layout/sidebar.tsx`)
**Purpose:** Bottom dock navigation (mobile + desktop)

**Layout:**
- Fixed bottom, centered, `bottom-4 leftwap-full`
- Glassmorphism: `bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-2xl border border-white/10`
- Horizontal nav items with icon + label stacked
- Active: `bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl`
- Inactive: `text-gray-400 hover:text-white hover:bg-white/5`
- Icon size: 24px (w-6 h-6)
- 8 navigation items total

### 6.5 Card (`components/ui/card.tsx`)
**Design:** Glass card — `bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm`
- CardHeader: Title + optional action
- CardContent: Body content
- Used throughout dashboard for stats, skills, news

### 6.6 Badge (`components/ui/badge.tsx`)
**Variants:**
- Default: `bg-white/10 text-white
- Primary: `bg-red-500/20 text-red-400 border border-red-500/30`
- Secondary: `bg-secondary-500/20 text-secondary-400`
- Success: `bg-success-500/20 text-success-500`
- Warning: `bg-warning-500/20 text-warning-500`
- Danger: `bg-danger-500/20 text-danger-500`

### 6.7 Button (`components/ui/button.tsx`)
**Variants:**
- Primary: `bg-primary text-white hover:bg-primary-600`
- Secondary: `bg-secondary text-white`
- Outline: `border border-white/10 bg-transparent hover:bg-white/5`
- Ghost: `hover:bg-white/5`
- Loading state: Disabled with spinner
- Sizes: sm, md, lg
- Rounded: `rounded-lg` (default), `rounded-full` (pills)

### 6.8 Theme Provider (`components/theme/theme-provider.tsx`)
**Purpose:** Wraps app, forces dark mode
- `data-theme="night"` on `<html>`
- `className="dark"` on `<html>`
- No light mode toggle in v2 (dark only)

---

## 7. BACKEND — FLASK API SERVER

### Server: `backend/slm-server.py`
**Framework:** Flask with CORS  
**Port:** 5000 (default)  
**Base URL:** `http://localhost:5000`

**Endpoints:**

#### `GET /health`
Returns server status, SLM readiness, timestamp.

#### `POST /api/analyze`
**Request:**
```json
{
  "query": "Artificial Intelligence",
  "save_to_firestore": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "skills": [
      {
        "name": "Python",
        "demand": 95,
        "category": "Programming",
        "source": "AI Analysis"
      }
    ],
    "summary": "Analyzed 8 sources for Artificial Intelligence.",
    "analysis_method": "nlp-pattern-ai",
    "query": "Artificial Intelligence"
  }
}
```

**Logic:**
1. Gets SLMAgent instance (singleton)
2. Calls `agent.analyze_trends(query)`
3. If `save_to_firestore`: saves results to Firestore `industrySkills`
4. Returns structured JSON

**Fallback chain:**
1. Try DuckDuckGo search (ddgs) for real-time data → `search_web()`
2. If fails, use curated fallback data → `_get_curated_results()`
3. Extract skills via NLP pattern matching → `_rule_based_analyze()`
4. If Gemini available, use AI analysis → `_ai_analyze()`

#### `POST /api/jobs`
**Request:** `{ "query": "Python developer", "location": "Bangalore" }`
**Response:** `{ "jobs": [...], "total": 42 }`

#### `POST /api/gap-analysis`
**Request:** `{ "curriculum": [...], "industry_query": "AI" }`
**Response:** `{ "coverage_percentage": 65, "matched_skills": [...], "missing_skills": [...] }`

---

### Agent: `backend/slm-agent/agent.py`
**Class:** `SLMAgent`

**Initialization:**
- Checks for Gemini models: `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-flash`, `gemini-pro`
- Configures with `GEMINI_API_KEY` env variable
- Initializes Firebase Firestore (optional)
- Sets `use_mock = True` (exposed via `/api/model-info`)

**Methods:**
- `search_web(query)`: DuckDuckGo search with fallback to curated data
- `_ai_analyze(content, query)`: Uses Gemini to extract skills from text
- `_rule_based_analyze(query, results)`: NLP pattern matching on search results
  - Keyword dictionary: 24 skill categories (Python, ML, Deep Learning, GenAI, Data Science, AWS, Azure, Docker, React, Node.js, SQL, Java, JavaScript, DevOps, Cybersecurity, Cloud, NLP, MLOps, Big Data, Blockchain, Prompt Engineering, Microservices, TypeScript)
  - Categories mapped to: AI/ML, Data, Cloud, DevOps, Security, Programming, Architecture, Emerging
- `analyze_trends(query)`: Orchestrates search → AI or rule-based analysis
- `save_to_firestore(skills_data, query)`: Saves to `industrySkills` collection
- `generate_report(query, curriculum_topics)`: Curriculum coverage analysis

---

### Web Search: `backend/slm-agent/tools/web_search.py`
**Function:** `search_duckduckgo(query, max_results=10)`
- Tries `ddgs` Python package (DuckDuckGo Search)
- Falls back to Google News RSS scraping
- Final fallback: `_get_curated_fallback()` — curated data for 17 common queries

**Curated fallback data includes:** Python, ML, Data Science, AWS, React, Java, DevOps, Cybersecurity, GenAI, SQL, Cloud, Blockchain, AI, Frontend, Backend, Full Stack, Mobile

---

## 8. DATA MODELS

### Firestore Collections

#### `users`
```ts
{
  uid: string,
  displayName: string,
  email: string,
  photoURL: string,
  role: "student" | "university" | "industry",
  createdAt: Timestamp,
  lastLogin: Timestamp,
  preferences: {
    notifications: boolean,
    theme: "dark", // always dark in v2
  }
}
```

#### `industrySkills`
```ts
{
  name: string,           // e.g., "Python"
  demandScore: number,    // 0-100
  category: string,       // "Programming", "AI/ML", "Data", etc.
  source: string,         // "LinkedIn", "NASSCOM", "AICTE"
  sourceUrl: string,
  date: Timestamp,
  location: string,       // Optional: "Bangalore", "Remote"
  description: string,
  company: string,
  imageUrl: string,       // picsum.photos URL
  openings: number,
  topCompanies: string[],
  query: string,          // Original search query
  method: string,         // "nlp-pattern-ai", "gemini-ai"
}
```

#### `industryNews`
```ts
{
  title: string,
  source: string,         // Upload source
  content: string,
  url: string,
  category: "hiring" | "skill" | "news" | "report",
  company: string,
  location: string,
  skills: string[],
  date: Timestamp,
  imageUrl: string,
  ceoImage: string,
  ceoName: string,
  ceoQuote: string,
}
```

#### `reports`
```ts
{
  userId: string,
  type: "gap-analysis" | "trend-analysis" | "performance",
  title: string,
  content: object,        // JSON report data
  createdAt: Timestamp,
  downloadUrl: string,    // PDF download URL
}
```

---

## 9. AUTHENTICATION FLOW

### Registration (`/register`)
1. User fills form (name, email, password, confirm, role)
2. `signUp(email, password)` → Firebase Authentication
3. On success: `updateProfile()` to set displayName
4. Create user doc in Firestore `users` collection
5. Redirect to `/dashboard`

### Login (`/login`)
1. User enters email + password
2. `logIn(email, password)` → Firebase Authentication
3. On success: store user in global context, redirect to `/dashboard`
4. `onAuthStateChanged` in `dashboard-layout.tsx` guards all protected routes

### Social Auth
- Google OAuth (via Firebase popup)
- GitHub OAuth (via Firebase popup)
- Both create/update user doc in Firestore

### Logout
- `signOut(auth)` from Firebase
- Redirects to `/login`

---

## 10. KEY FEATURES SUMMARY

### 10.1 3D Brain Visualization (Hero Section)
- **Tech:** HTML5 Canvas 2D (not Three.js for this specific section — Three.js used elsewhere)
- **Particles:** 2000 brain-shaped particles + 420 orbital ring particles + 3 floating orbs
- **Colors:** Red/pink palette (#FF0033, #FF3366, #FF6699)
- **Interaction:** Mouse parallax (camera shifts with mouse), scroll parallax
- **Performance:** 60 FPS via `requestAnimationFrame`, Z-depth sorted

### 10.2 AI Chat Assistant
- **Icon:** Sparkles (not robot — Gemini-style)
- **Behavior:** Local keyword matching, no external AI calls
- **Purpose:** Platform navigation help only
- **Pages linked:** Dashboard, Industry, Gap Analysis, Demand, Analysis
- **Message limit:** No hard limit, but not persistent (refresh clears)

### 10.3 Explainable AI
- **Tag:** "Powered by Explainable AI — no hidden decisions"
- **Method:** Rule-based NLP with optional Gemini enhancement
- **Transparency:** Shows which method was used ("nlp-pattern-ai" or "gemini-ai")
- **Fallback chain:** When AI fails, always falls back to deterministic rule-based analysis with clear scoring

### 10.4 Real-Time Data
- **Source:** DuckDuckGo search (free, no API key)
- **Fallback:** Curated industry data for common queries
- **Update frequency:** On-demand per user query
- **Storage:** Results cached in Firestore with timestamps

### 10.5 Skill Cards with Real Images
- **Source:** `picsum.photos/seed/{hash}/400/200`
- **Deterministic:** Same skill always gets the same image
- **Hash:** FNV-1a hash of skill name
- **Size:** 400×200px, displayed at full card width
- **Effect:** Slight zoom on hover, gradient overlay at bottom for text legibility

---

## 11. ANIMATIONS

| Animation | Technology | Trigger | Details |
|-----------|------------|---------|---------|
| Page entrance | Framer Motion | Mount | Staggered children fade-in |
| Hero 3D canvas | Raw Canvas API | Continuous | 60fps particle system |
| Card hover | Tailwind + Framer | Hover | scale-[1.02], shadow-glow |
| Button hover | Tailwind | Hover | bg shift, scale 1.05 |
| Sidebar active | Tailwind | Click | bg highlight, border, text color |
| Chat open/close | Framer Motion | Toggle | Slide up with spring physics |
| Counter | Custom hook | In-view | Number counting animation |
| Scroll reveal | GSAP | Scroll | Elements fade in as they enter viewport |
| Cursor follower | Custom | Mouse move | Smooth lerp trailing dot |
| Particle orbits | Canvas | Continuous | Sin/cos based orbital motion |

---

## 12. ENVIRONMENT VARIABLES

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
SLM_API_URL=http://localhost:5000
```

### Backend (`backend/.env`)
```
GEMINI_API_KEY=
FIREBASE_SERVICE_ACCOUNT_PATH=./service-account.json
```

---

## 13. BUILD & DEPLOYMENT

### Development
```bash
# Frontend
cd frontend
npm install
npm run dev  # localhost:3000

# Backend
cd backend
pip install -r requirements.txt
python slm-server.py  # localhost:5000
```

### Production Build
- Next.js static export: `npm run build`
- Serve static files or deploy to Vercel
- Backend: Any Python hosting (Heroku, AWS, GCP, DigitalOcean)

---

## 14. UNIQUE IDENTIFIERS & SPECIAL NOTES

### Branding
- **Logo:** Brain icon (from Lucide `Brain` component)
- **Colors:** Red (#FF0033) + Pink (#FF3366) on pure black (#0A0A0A)
- **No light mode:** Application is permanently dark-themed
- **Ever theme for overrides:** `<html data-theme="night" className="dark">`

### Special Components
- **3D Scene3D (Three.js):** Located in `components/3d/Scene3D.tsx` — used on bonus pages (bloom, halo)
- **CursorFollower:** Custom animated cursor — `cursor: none` with trailing gradient dot
- **Robot Mascot:** Unused in v2 (replaced by sparkle icon)
- **Page-old:** `/app/page-old.tsx` — kept for reference, do not use
- **AI Chat:** Floating, not full-screen. Fixed bottom-right. Width 400px, height 500px.

### Data Integrity
- Firestore stores timestamps, not raw dates
- Skills deduplicated by name (case-insensitive)
- API results merged with Firestore data, preferring real-time API over stale cache
- Graceful degradation: If API fails, falls back to curated static data

### Security
- All routes under `/dashboard` and sub-pages (industry, analysis, etc.) are protected
- `onAuthStateChanged` guards all protected routes — unauthenticated users redirected to `/login`
- API routes validate Firebase auth token (in a production setup)
- CORS enabled only for frontend origin

---

## END OF PROMPT

**Reconstruction Checklist:**
- [ ] Set up Next.js 16 project with TypeScript + Tailwind
- [ ] Install all dependencies from package.json (section 2)
- [ ] Configure Tailwind with the exact design system (section 3)
- [ ] Configure Google Fonts (Inter, Space Grotesk, JetBrains Mono) in layout.tsx
- [ ] Implement all 12 pages with exact layouts described (section 5)
- [ ] Implement all shared components (section 6)
- [ ] Set up Flask backend with all endpoints (section 7)
- [ ] Configure Firebase (auth + Firestore)
- [ ] Set up DuckDuckGo search and Gemini (section 8)
- [ ] Add environment variables (section 12)
- [ ] Test build and deployment (section 13)
