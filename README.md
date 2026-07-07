# CurriculumIQ v2 - AI-Powered Curriculum Intelligence Platform

## 🚀 Overview
CurriculumIQ analyzes university curriculum/syllabus documents and compares them with real industry data from LinkedIn, AICTE, NASSCOM, and Microsoft to identify skill gaps with **PROOF** and **CITATIONS**.

---

## ✨ Features

### For Students
- 📊 See exactly what skills your curriculum teaches
- 🔍 Get proof-backed industry recommendations (with links to sources)
- 📈 Career readiness score (0-100)
- 🎯 Learning paths with sources
- 📰 Real-time industry news and trends

### For Faculty
- 📋 Upload syllabus (PDF, DOCX, Excel)
- 📊 Gap analysis with **government/industry proof**
- 🏆 Recommendations backed by AICTE, LinkedIn, NASSCOM data
- 📈 Track curriculum vs industry trends

### For Department Heads
- 📊 Program-wide analytics
- 📰 Industry hiring trends
- 💼 Job market predictions (2025-2028)
- 📋 Faculty development suggestions

---

## 🎨 Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 16 + React 19 + TypeScript |
| Backend | Firebase (Auth + Firestore) |
| Styling | Tailwind CSS + Radix UI |
| Animations | Framer Motion |
| Charts/Analytics | Recharts |
| Web Scraping | Python + BeautifulSoup + Selenium |
| Hosting | Firebase Hosting |

---

## 📁 Project Structure

```
CurriculumIQ-v2/
├── frontend/              (Next.js Application)
│   ├── app/
│   │   ├── page.tsx       (Landing Page - Animated)
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/     (User Dashboard)
│   │   └── analysis/      (Gap Analysis with Proof)
│   ├── components/        (Reusable UI Components)
│   ├── lib/
│   │   └── firebase.ts    (Firebase Config)
│   └── services/          (API/Firebase Services)
│
├── backend/               (Firebase & Web Scraping)
│   ├── firebase-config/
│   │   └── firebase.js    (Firebase Setup)
│   └── scraper/           (Web Scraping Scripts)
│       ├── linkedin.js
│       ├── twitter.js
│       └── aicte.js
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Firebase account
- Python 3.10+ (for web scraping)

### Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:3000

### Setup Backend
```bash
cd backend
npm install
firebase login
firebase init
```

### Web Scraping Setup
```bash
pip install beautifulsoup4 selenium requests pandas
```

---

## 🔐 Firebase Setup

1. Go to https://console.firebase.google.com/
2. Create new project: "CurriculumIQ"
3. Enable:
   - **Authentication** (Email/Password, Google)
   - **Firestore Database**
   - **Hosting**
4. Copy config to `frontend/lib/firebase.ts`

---

## 📊 Firestore Collections

| Collection | Fields | Purpose |
|------------|--------|---------|
| users | email, name, role, collegeId | User profiles |
| colleges | name, code,departments[] | Multi-tenancy |
| departments | name, code, collegeId, programs[] | Academic depts |
| programs | name, code, curriculumSkills[] | Degree programs |
| syllabi | title, content, skills[], uploadedBy | Syllabus uploads |
| industrySkills | name, source, demandScore, sourceUrl, date | Skills with proof |
| jobRoles | name, description, requiredSkills[], demandLevel | Job positions |
| gapAnalyses | syllabusId, coverage%, missingSkills[], proof[] | Analysis results |
| recommendations | type, priority, description, proof, sourceUrl | Suggestions |
| webScrapedData | source, content, date, url | Raw scraped data |
| industryNews | title, source, content, url, date, category | News posts |

---

## 🕷️ Web Scraping Sources

### LinkedIn
- **What**: Job postings, skill recommendations, industry trends
- **How**: Use scraping + manual data entry
- **Format**: Skills with demand scores

### Twitter/X
- **What**: Tech hiring announcements, skill trends
- **How**: Twitter API or scraping
- **Format**: Real-time news posts

### AICTE Portal
- **What**: Government skill recommendations
- **How**: Manual data entry from reports
- **Format**: Official curriculum guidelines

### Microsoft/NASSCOM Reports
- **What**: Future skills predictions (2025-2028)
- **How**: Manual data entry from published reports
- **Format**: Trend forecasts with citations

---

## 📱 Features Showcase

### 1. Landing Page
- Animated hero section
- Feature highlights
- Statistics (powered by real data)
- CTA buttons

### 2. Authentication
- Beautiful login/register
- Google sign-in
- Email verification
- Password reset

### 3. Dashboard
- Personalized stats
- Recent activities
- Quick actions
- Industry news feed

### 4. Gap Analysis
- Upload syllabus
- View coverage percentage
- **See PROOF for each recommendation**
- Download report with citations

### 5. Industry Intelligence
- Real-time trending skills
- Job market analytics
- Source citations
- Future predictions

---

## 🎯 Coming Soon

- PDF syllabus parser (AI-powered)
- Automated web scraping (scheduled)
- Email notifications
- Multi-language support
- Mobile app

---

## 📝 License
MIT License - Educational use encouraged

---

Built with ❤️ for the education community