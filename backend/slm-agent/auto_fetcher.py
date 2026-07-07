# -*- coding: utf-8 -*-
"""
Automated SLM Data Fetcher
Runs in background and fetches from AICTE, LinkedIn, Twitter every 30 minutes
Updates Firestore automatically
"""

import os
import sys
import time
from datetime import datetime
import threading

# Add parent directory to path
script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(script_dir, 'slm-agent'))

from agent import SLMAgent
from tools.web_search import search_duckduckgo
from tools.job_scraper import aggregate_jobs

# Firebase
try:
    import firebase_admin
    from firebase_admin import credentials, firestore
    FIREBASE_AVAILABLE = True
except ImportError:
    FIREBASE_AVAILABLE = False
    print("[WARN] firebase_admin not installed")


class AutomatedDataFetcher:
    """
    Background service that fetches data from multiple sources
    and updates Firestore automatically
    """

    def __init__(self):
        self.agent = SLMAgent()
        self.db = None
        self.running = False
        self.interval = 1800  # 30 minutes in seconds

        if FIREBASE_AVAILABLE:
            self._init_firebase()

    def _init_firebase(self):
        """Initialize Firebase Admin"""
        try:
            service_account_path = os.path.join(
                os.path.dirname(script_dir),
                'service-account.json'
            )

            if os.path.exists(service_account_path):
                cred = credentials.Certificate(service_account_path)
                if not firebase_admin._apps:
                    firebase_admin.initialize_app(cred)
                self.db = firestore.client()
                print("[OK] Firebase initialized for auto-fetch!")
            else:
                print("[WARN] service-account.json not found")
        except Exception as e:
            print(f"[ERROR] Firebase init: {e}")

    def fetch_linkedin_data(self):
        """Fetch AI/ML job data from LinkedIn"""
        print("\n" + "="*60)
        print("[LINKEDIN] Fetching AI/ML jobs...")
        print("="*60)

        skills = [
            "Generative AI",
            "Machine Learning",
            "Data Science",
            "Python Developer",
            "MLOps",
            "LLM Engineering"
        ]

        all_jobs = []
        for skill in skills:
            print(f"  Fetching: {skill}")
            job_data = aggregate_jobs(skill, platforms=["linkedin"], total_limit=5)
            all_jobs.extend(job_data.get('jobs', []))

            # Save to Firestore
            if self.db:
                for job in job_data.get('jobs', [])[:3]:
                    self.db.collection('linkedinJobs').add({
                        'title': job.get('title', ''),
                        'company': job.get('company', ''),
                        'location': job.get('location', ''),
                        'skill': skill,
                        'source_url': job.get('source_url', ''),
                        'posted': job.get('posted', ''),
                        'fetched_at': firestore.SERVER_TIMESTAMP
                    })

        print(f"[OK] Fetched {len(all_jobs)} LinkedIn jobs")
        return all_jobs

    def fetch_aicte_data(self):
        """Fetch AICTE curriculum guidelines"""
        print("\n" + "="*60)
        print("[AICTE] Fetching curriculum guidelines...")
        print("="*60)

        aicte_skills = [
            "Programming in C",
            "Data Structures",
            "DBMS",
            "Data Mining",
            "Machine Learning",
            "Cloud Computing",
            "Cybersecurity",
            "Artificial Intelligence"
        ]

        # Use SLM to analyze AICTE trends
        result = self.agent.analyze_trends("AICTE model curriculum B.Tech CSE 2026")

        skills_data = result.get('skills', [])

        # Save to Firestore
        if self.db and skills_data:
            for skill in skills_data:
                self.db.collection('aicteSkills').add({
                    'name': skill.get('name', ''),
                    'demandScore': skill.get('demand', 0),
                    'sourceUrl': skill.get('source', ''),
                    'category': skill.get('category', 'AICTE'),
                    'fetched_at': firestore.SERVER_TIMESTAMP
                })

        print(f"[OK] Fetched {len(skills_data)} AICTE skills")
        return skills_data

    def fetch_twitter_trends(self):
        """Fetch tech trends from Twitter/X via search"""
        print("\n" + "="*60)
        print("[TWITTER] Fetching tech hiring trends...")
        print("="*60)

        queries = [
            "#TechHiring India 2026",
            "#AIJobs hiring now",
            "#DataScience jobs India",
            "#MachineLearning careers"
        ]

        all_results = []
        for query in queries:
            print(f"  Searching: {query}")
            results = search_duckduckgo(query, max_results=5)
            all_results.extend(results)

            # Save to Firestore
            if self.db:
                for result in results[:3]:
                    self.db.collection('twitterTrends').add({
                        'title': result.get('title', ''),
                        'content': result.get('body', '')[:500],
                        'source': result.get('href', ''),
                        'category': 'twitter_trend',
                        'fetched_at': firestore.SERVER_TIMESTAMP
                    })

        print(f"[OK] Fetched {len(all_results)} Twitter trends")
        return all_results

    def fetch_nasscom_data(self):
        """Fetch NASSCOM skills reports"""
        print("\n" + "="*60)
        print("[NASSCOM] Fetching industry reports...")
        print("="*60)

        result = self.agent.analyze_trends("NASSCOM future skills report India 2026")

        skills_data = result.get('skills', [])

        # Save to Firestore
        if self.db and skills_data:
            for skill in skills_data:
                self.db.collection('nasscomSkills').add({
                    'name': skill.get('name', ''),
                    'demandScore': skill.get('demand', 0),
                    'sourceUrl': skill.get('source', ''),
                    'category': skill.get('category', 'NASSCOM'),
                    'fetched_at': firestore.SERVER_TIMESTAMP
                })

        print(f"[OK] Fetched {len(skills_data)} NASSCOM skills")
        return skills_data

    def run_full_fetch(self):
        """Run complete data fetch from ALL sources"""
        print("\n" + "="*60)
        print("[INFO] STARTING FULL DATA FETCH")
        print("[TIME]", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        print("="*60)

        try:
            # Fetch from all sources
            linkedin = self.fetch_linkedin_data()
            aicte = self.fetch_aicte_data()
            twitter = self.fetch_twitter_trends()
            nasscom = self.fetch_nasscom_data()

            # Update master timestamp
            if self.db:
                self.db.collection('system').document('lastFetch').set({
                    'last_successful_fetch': firestore.SERVER_TIMESTAMP,
                    'linkedin_jobs': len(linkedin),
                    'aicte_skills': len(aicte),
                    'twitter_trends': len(twitter),
                    'nasscom_skills': len(nasscom),
                    'total_records': len(linkedin) + len(aicte) + len(twitter) + len(nasscom)
                })

            print("\n" + "="*60)
            print("[OK] FULL FETCH COMPLETED")
            print("="*60)
            print(f"  LinkedIn Jobs:    {len(linkedin)}")
            print(f"  AICTE Skills:     {len(aicte)}")
            print(f"  Twitter Trends:   {len(twitter)}")
            print(f"  NASSCOM Skills:   {len(nasscom)}")
            print(f"  Total Records:    {len(linkedin) + len(aicte) + len(twitter) + len(nasscom)}")
            print("="*60)

            return True

        except Exception as e:
            print(f"[ERROR] Fetch failed: {e}")
            return False

    def start_background_fetch(self):
        """Start background thread for continuous fetching"""
        self.running = True

        def fetch_loop():
            print("\n[FETCHER] Background fetcher started!")
            print(f"[FETCHER] Fetching every {self.interval/60:.0f} minutes")

            while self.running:
                self.run_full_fetch()
                time.sleep(self.interval)

        thread = threading.Thread(target=fetch_loop, daemon=True)
        thread.start()
        return thread

    def stop(self):
        """Stop the background fetcher"""
        self.running = False
        print("[FETCHER] Stopped background fetcher")


# Singleton instance
fetcher_instance = None

def get_fetcher():
    """Get or create fetcher instance"""
    global fetcher_instance
    if fetcher_instance is None:
        fetcher_instance = AutomatedDataFetcher()
    return fetcher_instance


# Flask API for manual trigger
if __name__ == "__main__":
    print("="*60)
    print("Automated SLM Data Fetcher")
    print("="*60)

    fetcher = get_fetcher()

    # Run one full fetch
    fetcher.run_full_fetch()

    print("\n[PROMPT] Start continuous fetching? (y/n)")
    response = input().lower().strip()

    if response == 'y':
        print("\n[FETCHER] Starting continuous fetch (Ctrl+C to stop)...")
        fetcher.start_background_fetch()

        # Keep main thread alive
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            fetcher.stop()
            print("\n[FETCHER] Goodbye!")