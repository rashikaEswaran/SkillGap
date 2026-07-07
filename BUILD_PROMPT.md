# CURRICULUMIQ V2 — FULL TECHNICAL BUILD PROMPT

## PROJECT OVERVIEW

Build "CurriculumIQ" — an AI-powered curriculum intelligence platform for educational institutions. It analyzes university/college syllabus documents and compares them against real industry demand data to identify skill gaps with proof, citations, and actionable recommendations.

**Target users:**
- **Students:** See what skills their curriculum teaches, get industry-backed recommendations, career readiness score (0-100), learning paths
- **Faculty:** Upload syllabus (PDF/DOCX/Excel), view gap analysis with government/industry proof, get AICTE/LinkedIn-backed recommendations
- **Department Heads:** Program-wide analytics, hiring trends, job market predictions, faculty development suggestions

---

## TECH STACK

### Frontend
- **Framework:** Next.js 16 with App Router (TypeScript)
- **Styling:** Tailwind CSS 3.4 with custom dark theme (bg: #0A0A0F, cards: #13131C, primary: #6366F1 indigo, accent: #ff0033 red for special pages)
- **UI Components:** Custom Radix UI-based component library (shadcn/ui pattern) in `components/ui/`
- **Animations:** Framer Motion (motion, AnimatePresence, whileHover variants)
- **Charts:** Recharts (BarChart, AreaChart, PieChart, LineChart) + Chart.js via react-chartjs-2 (Doughnut, Radar)
- **3D Effects:** Three.js + @react-three/fiber + @react-three/drei + maath for 3D landing page
- **Icons:** lucide-react
- **Utilities:** clsx, tailwind-merge, class-variance-authority (CVA), zod
- **Other:** gsap for advanced animations, date-fns for date handling

### Backend
- **Firebase (BaaS):** Firebase Auth (Email/Password + Google + Apple Sign-In), Cloud Firestore (NoSQL), Firebase Storage
- **Python Backend** (separate service on port 5000):
  - FastAPI or Flask
  - SLM integration using Google Generative AI (Gemini)
  - Web scraping: BeautifulSoup4 + Selenium
  - DuckDuckGo web search
  - Job scraping from LinkedIn, Naukri, Indeed

### Key Libraries
- PDF parsing: pdfjs-dist (client-side) or send to Python backend
- Date handling: date-fns
- Form handling: native React state

---

## ALL FEATURES

### Feature 1: Animated Landing Page
- 3D particle background using Three.js (5000+ animated particles with connecting lines)
- Floating decorative elements (Brain icon, Sparkles, Zap, Shield icons with float animation)
- Fixed top navbar with logo + navigation links
- Hero section with large heading, subtitle, gradient text accents, CTA buttons
- Features showcase (3 feature cards: AI-Powered Analysis, Real-Time Data, Explainable AI)
- Stats counter section (50K+ Students, 120+ Universities, 500+ Companies, 98% Accuracy)
- Bottom CTA section and Footer
- Smooth scroll-triggered animations with FadeIn components

### Feature 2: Login Page
- Centered auth card with dark glass morphism background
- Email + password input fields with icons (Mail, Lock)
- Password visibility toggle (show/hide eye icon)
- "Forgot password?" link
- Sign In button with loading spinner
- Divider with "or" text
- Social login buttons: Google (with SVG logo), Apple (with SVG logo)
- "Don't have an account? Sign up" link
- Auth guard: if already logged in, redirect to /dashboard
- Particle background canvas animation on signup

### Feature 3: Signup Page (with Animated Background)
- Full-screen animated canvas background (150+ floating particles with connecting lines, gradient overlay)
- Floating decorative elements with glass morphism (Brain, Sparkles, Zap, Shield icons)
- Grid pattern overlay
- Animated background glow (pulsing gradient)
- Centered signup form with glass card
- Full Name, Email, Password, Confirm Password fields
- Password show/hide toggle for both password fields
- Submit button with gradient (red-600 → pink-600), shimmer hover effect, scale on tap
- Feature highlights: Secure, Free, AI Powered
- Social signup: Google + Apple buttons with spring animation
- Error message display with animation
- "Already have an account? Sign In" link
- Loading spinner while checking auth state

### Feature 4: Register Page
- Clean centered card layout with dark background
- Full Name, Email, Password, Confirm Password fields
- Role selection dropdown: Student, Faculty, Admin
- Password match validation (min 6 chars)
- Create Account button with loading state
- Error/success message display
- "Already have an account? Sign in here" link
- Firebase createUserWithEmailAndPassword + save profile to Firestore

### Feature 5: Dashboard Layout (Sidebar Navigation)
- Left sidebar (collapsible on mobile with hamburger menu):
  - Logo: Brain icon + "CurriculumIQ"
  - Navigation links with icons:
    - LayoutDashboard → /dashboard
    - BarChart3 → /gap-analysis
    - Sparkles → /live-analysis
    - Briefcase → /industry
    - TrendingUp → /demand
    - LineChart → /forecast
    - Activity → /performance
    - FileText → /reports
    - Settings → /settings
    - GraduationCap → /bloom (special page)
    - Award → /halo (special page)
  - Active link: bg-primary/20, text-primary, left border indicator
  - Hover: bg-white/5 with smooth transition
  - User profile section at bottom
- Top navbar with notifications bell, search bar, user avatar
- Main content area with glass morphism card styling
- AiChatAssistant floating in bottom-right corner

### Feature 6: Dashboard Home Page
- Auth guard redirect to /login
- Welcome header with user's first name
- 4 Stat cards in a responsive grid:
  - Skills Tracked (count with Target icon)
  - High Demand (count with Briefcase icon, clickable → /demand)
  - Open Positions (sum of all openings with Activity icon)
  - Trending (medium demand count with TrendingUp icon, clickable → /analysis)
- Each stat card has: icon, value, label, sublabel, hover effect with ArrowUpRight
- Trending Skills section (max 8 skills displayed):
  - Each skill card with gradient colored background (based on skill name hash)
  - Demand score badge (percentage)
  - Location and job openings count
  - Progress bar showing demand level
  - Hover scale transition effect
- 3-column bottom analytics:
  - **Demand Distribution:** High (80%+), Medium (60-79%), Low (<60%) with colored progress bars
  - **Top Locations:** Ranked list (Bangalore, Hyderabad, Chennai, Gurgaon, Pune) with percentage scores
  - **Top Companies:** Microsoft, Google, Amazon, TCS, Infosys with "Hiring" badges
- Loading skeleton states for all sections
- Error state with animated dismiss (AnimatePresence)
- Data source: Firestore industrySkills → fallback to /api/slm/analyze (queries: "AI", "Data Science", "Cloud", "DevOps") with enriched mock data (companies, locations, demand scores)

### Feature 7: Skill Gap Analysis Page (gap-analysis)
- File upload section with 6 upload cards:
  - Resume, Syllabus/Curriculum, Projects, Certificates, Experience Letters, Achievements
  - Each card: upload icon when empty, checkmark + filename + file size when uploaded
  - Supported formats: PDF, DOCX, DOC, XLSX, ZIP, PNG, JPG
  - Click or drag-and-drop style label
- Target role selection dropdown (16 roles):
  - AI Engineer, Machine Learning Engineer, Data Scientist, Data Engineer, Cloud Engineer, Full Stack Developer, MLOps Engineer, AI Research Scientist, Cybersecurity Analyst, DevOps Engineer, Software Development Engineer, Backend Developer, Frontend Developer, Platform Engineer, Research Scientist
- "Analyze Now" button with gradient styling and loading spinner
- Results displayed after analysis:
  - **Readiness Score:** Large circular SVG gauge, color-coded (green ≥70%, yellow ≥50%, red <50%), matched/missing skill counts
  - **Strong Skills:** Success badges for matched skills in a flex wrap layout
  - **Critical Skill Gaps:** List showing skill name, priority badge (CRITICAL/HIGH/MEDIUM/LOW color-coded), source attribution, demand percentage, proof hyperlink
  - **Company-wise Readiness:** Per-company card with:
    - Company name + readiness percentage
    - Missing skills as danger badges (max 3 shown)
    - Proof panel with source, description text, and "View Original" link
  - **AI Career Roadmap:** Recommended skills to learn with "why" explanation, impact statement, and resource links (Course, Practice, Video, Cert types with icons)
  - Action buttons: "Download PDF Report" (primary), "Analyze Another" (secondary)
- Data saved to Firestore gapAnalyses collection

### Feature 8: Detailed Analysis Page (analysis)
- GitHub URL input field with GitHub icon
- LeetCode URL input field with Code icon
- Target role dropdown
- File upload area (drag & drop, multiple files, badge display of uploaded files)
- "Run Analysis" button with gradient glow effect
- After analysis, displays 10 comprehensive sections:
  1. **Summary:** Role title, readiness level badge (Industry Ready / Almost Ready / Developing / Beginner), 3 stat boxes (Matched, Missing, Total), large circular SVG readiness gauge with match percentage
  2. **GitHub Analysis** (conditional): Repositories count, top programming languages
  3. **Score Breakdown** (conditional if GitHub/LeetCode provided): Side-by-side comparison cards
  4. **Skill Coverage:** Dual SVG donut chart (emerald = matched, red = missing) + skill badges in flex wrap
  5. **Skills Lists:** Technical skills breakdown grid with success badges
  6. **Gap Insights:** Per-skill cards explaining why skill matters, why it matters for the role, impact on employability, learning path steps, priority level
  7. **Roadmap:** Phase-based learning path (3 phases) with skills, estimated duration, description in glass cards
  8. **Projects:** Recommended project ideas with difficulty badge, skills gained, estimated duration, description
  9. **Courses:** Course recommendations from platforms (Coursera, Udemy, Educative, Pluralsight) with platform name, difficulty, skill covered, duration, star rating
  10. **Export:** PDF download button, Save button, New Analysis reset button
- Custom SVG **SkillRadarChart** component:
  - 6-axis radar comparing user score vs industry benchmark
  - Animated polygons with gradient fills (green for user, amber for industry)
  - Hover tooltips showing exact scores
  - Center average score display
  - Glow filter effect on data points
  - Below chart: detailed comparison table with gap/overlap indicators
- Color-coded readiness badges and progress bars throughout
- All results with staggered Framer Motion entrance animations

### Feature 9: Live Analysis Page (live-analysis)
- Large centered search box with Sparkles icon
- Quick query buttons: Generative AI, Data Science, Cloud Computing, Cybersecurity, MLOps, Full Stack Development
- SLM backend status indicator (green dot = connected, red dot = offline, tracked via GET /api/slm/analyze health check)
- "Analyze" button with glow effect and loading state
- During analysis: Animated spinning loader with "SLM Agent is analyzing..." text and "Searching the web • Extracting insights • Generating report" substatus
- Results display:
  - **Summary Card:** Analysis query title, AI-generated summary text, skills count badge, method badge
  - **Skills Grid:** Each skill card is:
    - Clickable (opens source URL in new tab)
    - Shows demand percentage with color-coded badge (red ≥85%, yellow ≥70%, green <70%)
    - Category and source URL displayed
    - Animated demand bar at bottom (red/yellow/green based on level)
    - Hover scale + lift effect (whileHover)
  - **Fetch Live Jobs button:** Calls /api/slm/jobs endpoint, displays job cards in 2-column grid:
    - Job title, company name, location, posted date
    - Clickable to open source URL
    - Purple hover border effect
  - **Feature cards** (shown when no results): Live Web Search, SLM Analysis, Gap Detection with icons and descriptions
- All animations use stagger effects via containerVariants

### Feature 10: Industry Insights Page (industry)
- Gradient header banner with background image (tech office photo)
- 4 stat cards in header: 43K+ Active Openings, 340% GenAI Demand Growth, 15+ Companies Tracking, 12 Latest Updates
- Fixed-position search bar with red gradient glow (appears below header)
- Tab navigation: All | Hiring | Skill Demand | News | Reports
- Industry news feed posts, each post card:
  - **Square thumbnail image** (256×256) with overlay badges (hiring = green, skill = red, news = yellow, report = secondary)
  - Source icon + name overlay on image (LinkedIn/AICTE/NASSCOM/Globe)
  - Post title (hover → red)
  - Full content text
  - **CEO Quote section** (conditional): CEO photo, quote text, CEO name — displayed in gradient quote card
  - Meta info grid: Company, Location, Openings count, Date
  - Required Skills as badges (secondary variant with red-500 border)
- Comprehensive mock data: 12 real-world inspired posts (Microsoft hiring, NASSCOM report, Google SWE Intern, TCS Digital, OpenAI o3-mini, Zoho expansion, AWS certifications, Meta Reality Labs, NVIDIA CUDA, Infosys 40K hires, Apple Silicon, etc.)
- Each post links to external URL when clicked
- Fade-in + slide-up staggered animations for all cards

### Feature 11: Skill Demand Page (demand)
- Header: "Current Skill Demand" with subtitle
- Filter bar with:
  - Search input (search by skill name)
  - Location filter dropdown (All, Bangalore, Chennai, Hyderabad, Pune, Gurgaon, Mumbai)
- 4 Recharts visualizations in a 2×2 grid:
  - **Skills Demand Score:** Horizontal bar chart (8 skills, red bars, demand scores 0-100)
  - **Growth Trends (%):** Area chart with gradient fill (green), showing percentage change
  - **Job Postings Comparison:** Vertical bar chart (6 skills, blue bars)
  - **Demand Distribution:** Pie chart with color-coded cells (red ≥80%, yellow ≥60%, green <60%)
- **Top Skills by Demand Score** list:
  - Each skill row with: name, animated progress bar (color-coded by score), demand number, trend icon + percentage change
  - Expandable hover details: job count (in K), top locations, average salary, top company badges
- **Regional Demand Heatmap:** 3-column grid of city cards (Bangalore, Chennai, Hyderabad, Pune, Gurgaon, Mumbai):
  - City name + demand score badge
  - Top Skill, Open Jobs, Growth stats
  - Glass card hover effect with primary border
- **Trending Skills This Week:** 4-column grid showing hot skills with spike percentage and source (o3-mini Integration +180%, Agentic AI +145%, AI Governance +92%, Multimodal AI +88%)

### Feature 12: Future Workforce Forecast Page (forecast)
- Header with year selector tabs (2026, 2027, 2028, 2029, 2030) — click to change selected year
- **Skill Demand Growth Projection chart:**
  - Horizontal bar showing current demand (grey) vs projected demand (gradient indigo)
  - Each skill row: name, dual-layer progress bar, growth percentage (red bold), projected future percentage badge
  - 8 skills tracked: Agentic AI (+340%), MLOps (+280%), AI Security (+220%), LLM Fine-tuning (+250%), Prompt Engineering (+190%), Data Engineering (+175%), Cloud Architecture (+160%), AI Ethics & Governance (+140%)
- **Emerging Roles by 2030 grid (3 columns):**
  - AI Governance Engineer (Microsoft, Google, Government Agencies)
  - Agentic Systems Architect (OpenAI, Anthropic, Startups)
  - AI Security Specialist (NVIDIA, CrowdStrike, Palantir)
  - Multimodal AI Engineer (Meta, Apple, Adobe)
  - AI Infrastructure Engineer (AWS, Google Cloud, Azure)
  - Synthetic Data Engineer (Tesla, Waymo, Healthcare AI)
  - Each card: icon, title, source attribution, description, required skills badges, expected hiring company badges
- **Skill Heatmap table (2026–2030):** HTML table with rows for each skill, columns for each year, color-coded cells (danger/warning/primary/surface based on percentage)
- **Key Insights section** (2-column grid):
  - 50% of workers need reskilling (OECD Skills Outlook)
  - AI creates more jobs than it displaces — 97M new roles (WEF 2025)
  - Tech skills half-life is 2.5 years (LinkedIn Learning)
  - India to be top AI talent hub — 30% of global AI workforce (NASSCOM)

### Feature 13: Performance Page
- **Overview Stats** (4 cards in grid):
  - Readiness Score: 72% with +27% from start (green, TrendingUp icon)
  - Skills Completed: 12 with 5 in progress (primary, CheckCircle)
  - Gap Reduction: -29% (warning, Target icon)
  - Milestones Achieved: 3/5 (secondary, Award icon)
- **Readiness Score Over Time:** Bar chart showing monthly progress (Jan–Jun) with animated growing bars
- **Skills Progress:** Progress bars for each skill:
  - Completed (green, 100%), In-progress (amber, show percentage), Not-started (grey, 0%)
  - Labels: Python (completed), Data Structures (completed), SQL (completed), Machine Learning (75%), Cloud AWS (40%), GenAI (0%)
- **Company Readiness Improvement:** Before → After bars for Microsoft (52→68%), Google (48→62%), Amazon (55→71%), Infosys (62→78%) with +% improvement badge
- **Learning Activity Heatmap:** 52-week grid (like GitHub contribution graph) with 5 intensity levels of indigo/primary color
- **Milestones & Achievements:** 5 milestone cards in grid:
  - First Analysis Complete (achieved)
  - Gap Reduced by 10% (achieved)
  - 5 Skills Learned (achieved)
  - Microsoft Ready 70%+ (in progress)
  - All Core Skills Mastered (in progress)
  - Achieved cards: green border glow, with date; Unachieved: greyed out with "In Progress" label

### Feature 14: Reports Page
- **Stats header** (3 cards): Total Reports count, Well Covered (≥70%), Needs Improvement (<70%)
- **Reports List:** Each report card:
  - Syllabus title + creation date + skills analyzed count
  - Coverage percentage badge (color-coded: green ≥80%, yellow ≥60%, red <60%)
  - Taught Skills (green badges, max 5 + "more" indicator)
  - Missing Skills (red badges with demand %)
  - Action buttons: "View Details" (outline), "Download PDF" (primary)
- **Empty state:** When no reports exist — shows BarChart3 icon, "No Reports Yet" message, and link to /analysis
- Data fetched from Firestore gapAnalyses collection, ordered by date desc

### Feature 15: Settings Page
- **Sticky top navbar** with back arrow, CurriculumIQ logo, "Settings" label
- **Profile sidebar** (1/3 width):
  - Circular gradient avatar (red-600 to pink-600) with User icon
  - User display name + email
  - Role badge (student/faculty/admin)
  - Quick stats: Skills count, Tracked count
- **Profile Settings card:**
  - Full Name input field
  - Email address (disabled, shows "Email cannot be changed")
  - Role dropdown (Student, Faculty, Admin)
  - "Save Changes" button (gradient red-pink)
- **Change Password card:**
  - Current Password, New Password, Confirm New Password fields
  - "Change Password" button
  - Validation: min 6 chars, passwords must match
- **Notifications card:**
  - Toggle switches for: Email Alerts, Skill Updates, News Updates, Weekly Report
  - Custom toggle switch component (gradient on/off)
- **Danger Zone:**
  - "Delete Account" button (red gradient, destructive style)
  - Warning text about irreversible deletion

### Feature 16: Bloom's Taxonomy Page (bloom)
- Full-screen video background with poster + autoplay loop
- Liquid glass morphism UI (custom CSS classes: liquid-glass, liquid-glass-strong)
- Left panel (52% width on desktop):
  - Glass overlay panel
  - Center logo + "bloom" text brand
  - Large heading: "Innovating the spirit of bloom AI" with serif italic text
  - CTA button "Explore Now" with liquid glass styling
  - Feature pills: Artistic Gallery (🎨), AI Generation (✨), 3D Structures (🌿)
  - Quote section with vision text
  - Animated fade-in-up entrance
- Right panel (48% width, desktop only):
  - Social links row (Twitter, LinkedIn, Instagram)
  - Account button with Sparkles icon
  - Community card ("Enter our ecosystem", 50K+ designers)
  - Feature cards grid: Processing (AI transformations), Growth Archive (historical data)
  - Bottom card with thumbnail + "Advanced Plant Sculpting" description + add button
- Mobile bottom navigation: Home, Create, Gallery, New (with icons)
- Custom fonts: Poppins (sans-serif) + Source Serif 4 (serif italic)
- Custom CSS: liquid-glass backdrop-filter, inset box shadows, mask-composite borders, pulse animations

### Feature 17: Halo Effect Page (halo)
- Full-viewport video background hero
- Navbar with logo ("Halo" with custom SVG icon), nav links (Network, Ecosystem, Rewards, Help, News), "Open Wallet" CTA
- Hero section: "Your Wealth Works" heading, description about USD Halo stablecoin
- Brand marquee animation (Stripe, Coinbase, Uniswap, Aave, Compound, MakerDAO, Chainlink)
- Backers marquee animation (Fundamental Labs, KUCOIN, NGC, NxGen, Matter Labs, DEXTools, NGRAVE, Polychain)
- "Meet USD Halo" section: 2-column text + "Discover it" button
- 3 feature cards in grid (2+1 layout):
  - Savings that bloom (image bg)
  - Always fluid, always pegged
  - Fully automated
- "Start earning with USD Halo" CTA card with Sign Up + Log In buttons
- Footer with logo, copyright, social links
- Custom fonts: TT Norms Pro
- CSS animations: infinite marquee, backers-marquee

### Feature 18: AI Chat Assistant
- Floating chat widget in bottom-right corner
- **Page-aware navigation** via PAGE_MAP:
  - Industry → /industry (Newspaper icon)
  - Demand → /demand (TrendingUp icon)
  - Skills → /live-analysis (BarChart3 icon)
  - Reports → /reports (FileText icon)
  - Gap Analysis → /gap-analysis (Target icon)
  - Jobs → /live-analysis (Briefcase icon)
- Suggestions with "Sparkles" icon (Suggested for you)
- Quick actions with ArrowRight and send icons
- User/Assistant message interface with chat bubble styling
- Contextual quick-reply suggestions based on keywords

### Feature 19: Theme Provider
- Dark/light theme support via React context
- ThemeProvider wraps the application
- Theme toggle button component (sun/moon icons)
- Default to dark theme
- localStorage persistence

### Feature 20: Custom 3D Scene (Three.js)
- Three.js scene with configurable particle count (default 5000)
- 3D shapes rendered with @react-three/fiber
- Configurable intensity: low/medium/high
- React Three Drei helpers for cameras, controls
- Animated particle system

### Feature 21: Custom Cursor Follower
- Custom cursor effect component
- Smooth following animation
- Applied on landing/3D pages

### Feature 22: Error Boundary
- React error boundary wrapper component
- Catches and displays errors gracefully
- Fallback UI with retry option

### Feature 23: Robot Mascot
- Animated robot mascot component
- UI states: is_fetching (loading animation), last_fetch timestamp, total_records count
- Animation states (expandable states)
- Tooltip display on hover
- Visibility toggle

---

## ALL COMPONENTS

### components/ui/ui.tsx
- Central export file for all UI components
- Exports: Card, CardHeader, CardTitle, CardContent, Button, Badge, Skeleton, Toast, EmptyState
- Conditional exports for specialized variants

### components/ui/card.tsx
- Variants: "default", "glass", "glass-pro"
- Glass: #13131C/80% bg + backdrop-blur-xl + border border-white/5
- Glass-pro: #0f0f0f/80% bg + backdrop-blur-xl + border border-white/10 + optional glow shadow
- Children render pattern
- CVA (class-variance-authority) for variant composability

### components/ui/button.tsx
- Variants: "primary" (bg-indigo hover:indigo-600), "secondary" (bg-white/5 border), "outline" (border only), "ghost" (transparent), "destructive" (red)
- Sizes: "sm", "md", "lg"
- Props: disabled, loading (spinner), glow (shadow effect), rightIcon, leftIcon, onClick, className
- Gradient support (bg-gradient-to-r)
- Hover scale effects

### components/ui/badge.tsx
- Variants: "default" (white/10 bg), "success" (green), "danger" (red), "warning" (amber), "info" (blue), "secondary" (white/5), "outline" (border only)
- Sizes: "sm", "md", "default"
- Color-coded for demand scores, priorities, readiness levels

### components/ui/skeleton.tsx
- Animated pulse loading placeholders
- Shapes: "circle", "rect", "text"
- Props: className, variant, width, height
- Used for: stat card skeletons, skill card skeletons, loading states

### components/ui/toast.tsx
- Top-right positioned notifications
- Types: success (green), error (red), warning (amber), info (blue)
- Auto-dismiss after 4 seconds
- Animated enter/exit with Framer Motion

### components/ui/empty-state.tsx
- Icon display area
- Title + description text
- Optional action button (e.g., "Explore Analysis")
- Centered layout with glass card styling

### components/layout/dashboard-layout.tsx
- Full-page wrapper for all authenticated routes
- Integrates Sidebar + TopNav
- Main content area with padding and max-width
- AiChatAssistant floating component
- Auth guard integration

### components/layout/sidebar.tsx
- Fixed left sidebar
- Logo section (Brain icon + "CurriculumIQ")
- Navigation section with icon + text links
- Active route highlighting (indigo bg + left border)
- Hover effects
- User profile section at bottom (avatar, name, role)
- Collapsible on mobile (hidden → hamburger toggle)

### components/layout/top-nav.tsx
- Sticky top navigation bar
- Notification bell icon
- Search input
- User avatar display
- Glass morphism background with backdrop-blur

### components/theme/theme-provider.tsx
- React Context provider for theme state
- localStorage persistence for theme choice
- Wraps entire application in root layout

### components/theme/theme-toggle.tsx
- Sun/Moon icon toggle button
- Click to switch between dark/light themes
- Smooth icon transition animation

### components/3d/Scene3D.tsx
- Three.js scene initialization
- Particle system (5000+ particles, configurable count)
- 3D shapes/meshes (configurable via showShapes prop)
- Configurable intensity (low/medium/high)
- React Three Fiber canvas renderer
- Animated particles with motion

### components/effects/CursorFollower.tsx
- Custom cursor element
- Smooth easing follow animation
- Applied globally or per-section
- CSS transition for smooth movement

### components/ai-chat-assistant.tsx
- Floating AI chat widget
- Page-aware navigation suggestions
- Chat message interface (user/assistant)
- Quick action buttons with icons
- Keyword detection for contextual suggestions
- Multiple suggestion chips (Industry News, Skills in Demand, Reports, Gap Analysis, Jobs, etc.)

### components/robot-mascot.tsx
- Animated robot character
- Fetch status display (is_fetching, last_fetch, total_records)
- Animation state machine
- Tooltip on hover
- Visibility toggle
- Used as a companion/helper UI element

### components/error-boundary.tsx
- Class component error boundary
- Catches JavaScript errors in child component tree
- Displays fallback UI with error message
- "Try Again" reset button
- Logs error details

---

## FIRESTORE SECURITY RULES

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // Public read for industry data, auth required for write
    match /industrySkills/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /jobRoles/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Users can read their own analyses
    match /gapAnalyses/{docId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    // Auth check for all other collections
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

---

## ENVIRONMENT VARIABLES

**Frontend (.env.local):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<project>.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<project>.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<app-id>
```

**Backend (.env):**
```
FIREBASE_DATABASE_URL=https://<project-id>.default.firebaseio.com
SLM_API_URL=http://localhost:5000
GEMINI_API_KEY=<gemini-key>
GOOGLE_API_KEY=<google-search-key>
```

---

## TAILWIND THEME CONFIG

**Colors:**
- Background: #0A0A0F (darkest), #13131C (card bg), #1C1C2A (hover/elevated)
- Primary: #6366F1 (indigo-500), #4F46E5 (indigo-600 hover)
- Accent (special pages): #ff0033 (red-500), #ff3366 (red-400)
- Success: #10B981 (emerald-500)
- Danger: #EF4444 (red-500)
- Warning: #F59E0B (amber-500)
- Info: #3B82F6 (blue-500)
- Text: white (primary), white/70 (secondary), white/50 (tertiary), white/30 (quaternary)
- Borders: white/10 (subtle), white/20 (medium)

**Glass effects:**
- Glass card: `bg-[#13131C]/80 backdrop-blur-xl border border-white/5`
- Glass pro: `bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10` with optional shadow glow
- Liquid glass: custom CSS with backdrop-filter, inset box-shadows, mask-composite borders (for bloom page)
- Gradient accents: `from-red-600/20 to-pink-600/20`

---

## KEY IMPLEMENTATION NOTES

1. **Authentication flow:** Firebase Auth with `onAuthStateChanged` listener on all protected pages. Redirect unauthenticated users to /login. Supports Email/Password, Google Sign-In, Apple Sign-In.

2. **PDF handling:** Implement basic text extraction using pdfjs-dist. The file content metadata is sent to the analysis API. Full PDF parsing can be enhanced later.

3. **Fallback data:** If Firestore has no industrySkills data, the dashboard should call /api/slm/analyze with queries: "AI", "Data Science", "Cloud", "DevOps", merge results, enrich with mock companies/locations/demand scores, and render.

4. **Animations:** Use Framer Motion throughout — initial page load: fadeIn + slideUp, cards: hover scale/shadow effects, skills grid: staggered entrance, loading: skeleton screens with pulse animation.

5. **Responsive design:** Mobile-first with Tailwind breakpoints: sm: 640px, md: 768px, lg: 1024px, xl: 1280px. Sidebar: hidden on mobile with hamburger toggle. All grids should collapse proportionally.

6. **Error handling:** All API calls should have try/catch. Show user-friendly error messages. Fallback to demo/mock data when backend is unavailable.

7. **Loading states:** Every data-fetching section should show loading skeletons or spinners, never blank screens.

8. **Type safety:** All components, props, and API responses should have TypeScript interfaces.

9. **The dark theme is MANDATORY** — all backgrounds dark, white text, indigo accent. The bloom and halo pages are the only exceptions with light/branded styling (they are standalone landing-style pages within the app).

10. **Glass morphism** — cards should use semi-transparent dark backgrounds with blur and subtle borders for depth.

---

## INITIAL SETUP COMMANDS

**Frontend:**
```bash
cd frontend
npm install
cp .env.local.example .env.local    # Fill in Firebase config
npm run dev                         # Runs on http://localhost:3000
```

**Backend (Python SLM):**
```bash
cd backend/slm-agent
pip install -r requirements.txt
python agent.py                     # Runs on http://localhost:5000
```

---

## WHAT NOT TO CHANGE

- Keep the existing directory structure and file names
- Preserve all existing Firebase collection names and field structures
- Maintain the dark theme color scheme exactly (except bloom/halo which have their own branded design)
- Keep the sidebar navigation items and routes as-is
- Preserve the Card/Button/Badge component API signatures
- Maintain the API route paths (/api/analyze, /api/slm/*)
- Preserve the 17 existing pages and their routes
