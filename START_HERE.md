# START HERE - Step by Step Guide

## STEP 1: Install Frontend Packages
Open PowerShell and run:
```powershell
cd C:\Users\Rashika\CurriculumIQ-v2\frontend
npm install
```
Wait for it to finish (takes 2-3 minutes).

---

## STEP 2: Set Up Firebase (Required)

1. Go to https://console.firebase.google.com/
2. Click **"Add project"**
3. Name it **"CurriculumIQ"**
4. Click **"Continue"** until project is created

### Enable Services:
1. Left menu → **Authentication** → Get Started → Enable → **Email/Password** → Save
2. Left menu → **Firestore Database** → Create Database → Start in **Test Mode** → Next → Choose location → Enable
3. Left menu → **Storage** → Get Started → Start in **Test Mode** → Done

### Get Your Config:
1. Left side gear icon (⚙️) → Project Settings
2. Scroll down to **"Your apps"** section
3. Click the **web icon `</>`**
4. Register app name: "CurriculumIQ Frontend"
5. Copy the **firebaseConfig** object - you'll need this

---

## STEP 3: Create .env.local File

1. In `C:\Users\Rashika\CurriculumIQ-v2\frontend\` folder
2. Create a new file named `.env.local` (not `.env.local.txt`)
3. Paste this and replace with YOUR Firebase values:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...your_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

---

## STEP 4: Run the App

```powershell
npm run dev
```

Open http://localhost:3000 in your browser.

---

## STEP 5: Create Your First Account

1. Click **"Get Started"** on the homepage
2. Fill in: Name, Email, Password
3. Click **"Create Account"**
4. You're in!

---

## Troubleshooting

**Problem:** `npm install` fails
**Fix:** Make sure Node.js 18+ is installed. Run `node --version`

**Problem:** Firebase error
**Fix:** Double-check your `.env.local` values match your Firebase project exactly

**Problem:** Page not loading
**Fix:** Check browser console (F12) for errors

---

## What You'll See

- **Homepage:** Registration and demo button
- **Login:** Sign in with email/password
- **Dashboard:** Your analytics and stats
- **Analysis:** Upload syllabus and see gap analysis

---

**Need help?** Run STEP 1 first and tell me if you see any errors!