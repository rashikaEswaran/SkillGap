# CurriculumIQ v2 Project

## Setup Instructions

### 1. Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local and add your Firebase credentials
npm run dev
```

### 2. Backend Setup

```bash
cd backend
npm install
firebase login
firebase init
```

### 3. Python Scraping Setup

```bash
pip install beautifulsoup4 selenium requests pandas firebase-admin
```

## Project Structure

```
CurriculumIQ-v2/
├── frontend/           (Next.js app)
├── backend/            (Firebase + scrapers)
│   ├── firebase-config/
│   └── scraper/
└── README.md
```

## Environment Variables

### Frontend (.env.local)
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID

### Backend
- FIREBASE_PROJECT_ID
- FIREBASE_PRIVATE_KEY_ID
- FIREBASE_PRIVATE_KEY
- FIREBASE_CLIENT_EMAIL
- FIREBASE_CLIENT_ID
- FIREBASE_CLIENT_CERT_URL

## Development

- Frontend: http://localhost:3000
- Backend (Firebase Emulators): http://localhost:4000

## License

MIT - Educational use encouraged