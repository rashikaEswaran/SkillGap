# SLM Auto-Fetcher Setup Guide

## Overview
The SLM Auto-Fetcher automatically fetches data from multiple sources (AICTE, LinkedIn, Twitter, NASSCOM) every 30 minutes and updates Firestore database. This makes your CurriculumIQ dashboard display **live, real-time data**.

## Features

### Automated Data Collection
- **LinkedIn Jobs**: Fetches AI/ML job postings with demand scores
- **AICTE Curriculum**: Analyzes model curriculum guidelines
- **Twitter Trends**: Searches tech hiring trends
- **NASSCOM Reports**: Industry skills reports

### Robot Mascot UI
- Mini robot in bottom-right corner shows SLM status
- **Idle** (blue): Waiting for next fetch
- **Fetching** (green, spinning): Currently collecting data
- **Success** (yellow): Data updated successfully
- Click robot to trigger manual fetch

## Setup

### 1. Start the SLM API Server
```bash
cd C:\Users\Rashika\CurriculumIQ-v2\backend
python slm-server.py
```

Server runs on: `http://localhost:5000`

### 2. Start the Frontend
```bash
cd C:\Users\Rashika\CurriculumIQ-v2\frontend
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 3. Verify Auto-Fetch Status
The robot mascot in the dashboard will show:
- Last fetch time
- Next fetch countdown
- Total records in database

## API Endpoints

### Trigger Manual Fetch
```bash
POST http://localhost:5000/api/auto-fetch
```

### Get Fetch Status
```bash
GET http://localhost:5000/api/fetch-status
```

Response:
```json
{
  "is_fetching": false,
  "last_fetch": "2026-06-20T12:30:00Z",
  "total_records": 156,
  "interval_minutes": 30
}
```

## Firestore Collections

Data is saved to these collections:
- `linkedinJobs` - Job postings
- `aicteSkills` - AICTE curriculum skills
- `twitterTrends` - Tech trends from Twitter
- `nasscomSkills` - NASSCOM industry skills
- `system/lastFetch` - Master timestamp and stats

## Robot Mascot States

| State | Color | Animation | Meaning |
|-------|-------|-----------|---------|
| Idle | Blue | Pulsing antenna | Ready, waiting |
| Thinking | Purple | Thought bubbles | Processing |
| Fetching | Green | Spinning antenna, data waves | Collecting data |
| Success | Yellow | Star burst, arms up | Data updated |

## Customization

### Change Fetch Interval
Edit `backend/slm-agent/auto_fetcher.py`:
```python
self.interval = 1800  # 30 minutes (in seconds)
```

### Add More Data Sources
Add new fetch methods in `auto_fetcher.py` and update `run_full_fetch()`.

## Troubleshooting

### Robot shows "SLM offline"
- Check if Flask server is running on port 5000
- Verify `service-account.json` exists in backend folder

### No data in dashboard
- Trigger manual fetch via robot click
- Check Firestore collections in Firebase Console
- Verify API endpoints respond: `GET http://localhost:5000/health`

## Files Added/Modified

- `backend/slm-agent/auto_fetcher.py` - Auto-fetch logic
- `backend/slm-server.py` - Added auto-fetch API endpoints
- `frontend/components/robot-mascot.tsx` - Robot mascot component
- `frontend/app/dashboard/page.tsx` - Added robot mascot to dashboard