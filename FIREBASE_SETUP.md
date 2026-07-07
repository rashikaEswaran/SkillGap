# Firebase Setup - Complete Step-by-Step Guide

## PART 1: Create Firebase Account & Project

### Step 1: Go to Firebase Console
Open your browser and go to: **https://console.firebase.google.com/**

### Step 2: Sign In
- Click **"Go to console"** or **"Add account"**
- Sign in with your Google account (Gmail)

### Step 3: Create New Project
1. Click **"Add project"** or **"Create a project"**
2. Enter project name: **CurriculumIQ**
3. Click **Continue**
4. (Optional) Disable Google Analytics → Click **Continue**
5. Click **Create project**
6. Wait 30-60 seconds for project creation
7. Click **Continue**

---

## PART 2: Enable Authentication

### Step 4: Enable Email/Password Authentication
1. In Firebase Console, left sidebar → **Build** → **Authentication**
2. Click **"Get started"**
3. Click on **Sign-in method** tab
4. Click **Email/Password**
5. Toggle **Enable** to ON
6. Click **Save**

### Step 5: Enable Google Authentication (Optional but Recommended)
1. Still in Authentication → Sign-in method tab
2. Click **Google**
3. Toggle **Enable** to ON
4. Enter a **Public email address** (your support email)
5. Click **Save**

---

## PART 3: Create Firestore Database

### Step 6: Create Firestore
1. Left sidebar → **Build** → **Firestore Database**
2. Click **"Create database"**
3. Select **Start in test mode** (we'll secure it later)
4. Click **Next**
5. Choose location: Select **asia-south** (Mumbai) or closest to you
6. Click **Enable**
7. Wait 1-2 minutes for database to create

---

## PART 4: Enable Storage (Optional for uploads)

### Step 7: Enable Storage
1. Left sidebar → **Build** → **Storage**
2. Click **"Get started"**
3. Select **Start in test mode**
4. Click **Next**
5. Select same location as Firestore
6. Click **Done**

---

## PART 5: Get Your App Config (IMPORTANT!)

### Step 8: Register Your Web App
1. Left sidebar → **Project Overview** (gear icon ⚙️) → **Project settings**
2. Scroll down to **"Your apps"** section
3. Click the **web icon</>** (or "Add app" → Web)

### Step 9: Register App
1. Enter app nickname: **CurriculumIQ Frontend**
2. ✅ Check "Also set up Firebase Hosting" (optional)
3. Click **Register app**

### Step 10: Copy Your Config
You'll see code like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxx",
  authDomain: "curriculumiq-xxx.firebaseapp.com",
  projectId: "curriculumiq-xxx",
  storageBucket: "curriculumiq-xxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**COPY ALL THESE VALUES** - You need them next!

---

## PART 6: Create Service Account (For Backend)

### Step 11: Generate Service Account Key
1. Project Settings (gear icon ⚙️) → **Service accounts** tab
2. Click **"Generate new private key"**
3. Confirm with your Google password if asked
4. A **JSON file** downloads automatically
5. **IMPORTANT:** Move this file to `backend/service-account.json`
6. **NEVER share or commit this file!**

---

## PART 7: Update Your Code

### Step 12: Create .env.local File

1. Go to: `C:\Users\Rashika\CurriculumIQ-v2\frontend\`
2. Create new file named: `.env.local`
3. Add these lines (replace with YOUR values from Step 10):

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=curriculumiq-xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=curriculumiq-xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=curriculumiq-xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### Step 13: Update frontend/lib/firebase.ts

Replace the config with your actual values:

```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
```

---

## PART 8: Security Rules (Important!)

### Step 14: Update Firestore Rules
1. Go to **Firestore Database** → **Rules** tab
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 12, 31);
    }
  }
}
```
3. Click **Publish**

### Step 15: Update Storage Rules
1. Go to **Storage** → **Rules** tab
2. Keep default (test mode) for now

---

## ✅ SETUP COMPLETE!

You should now be able to:
- Run `npm install` in frontend folder
- Run `npm run dev`
- Create accounts and log in
- Use the app

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't create project | Use a different Google account |
| JSON file not downloading | Check browser downloads folder |
| "Permission denied" error | Check Firestore rules are in test mode |
| Config doesn't work | Copy-paste exactly, no extra spaces |

---

**Need visual help?** Watch: https://www.youtube.com/results?search_query=firebase+create+project+2024