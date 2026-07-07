# CurriculumIQ v2 - Quick Start Guide

## Prerequisites Checklist
- [ ] Node.js 18+ installed
- [ ] Firebase account created
- [ ] Python 3.10+ installed (for scrapers)

## Firebase Setup (5 minutes)

1. Go to https://console.firebase.google.com/
2. Click "Add project" → Name it "CurriculumIQ"
3. Enable these services:
   - Authentication (Email/Password + Google)
   - Firestore Database
   - Storage
   - Hosting

4. Get your config:
   - Project Settings → General → Your apps → Web app
   - Copy the config values

5. Create service account:
   - Project Settings → Service Accounts → Generate new private key
   - Save the JSON file securely

## Quick Start Commands

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your Firebase config
npm run dev
```

### Backend
```bash
cd backend
npm install
firebase login
firebase init firestore
firebase init storage
```

## First Run

1. Start frontend: `npm run dev` (http://localhost:3000)
2. Sign up for an account
3. Upload a sample syllabus
4. View the gap analysis results

## Next Steps

- Configure your own Firebase project
- Add custom scrapers for your data sources
- Deploy to Firebase Hosting

Need help? Check SETUP.md for detailed instructions.