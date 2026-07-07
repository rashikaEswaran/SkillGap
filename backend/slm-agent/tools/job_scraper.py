"""
Job Scraper Tool for SLM Agent
Scrapes job postings from various platforms
"""

from typing import List, Dict, Optional
import requests
from bs4 import BeautifulSoup
import random
from datetime import datetime, timedelta


def scrape_linkedin_jobs(
    skill: str,
    location: str = "India",
    limit: int = 10
) -> List[Dict]:
    """
    Scrape LinkedIn job postings for a specific skill

    Note: LinkedIn has anti-scraping measures.
    For production, use LinkedIn Official API or a scraping service.
    This is a demo implementation with realistic mock data.

    Args:
        skill: Skill/role to search for
        location: Job location
        limit: Maximum jobs to return

    Returns:
        List of job postings
    """
    # In production, you would:
    # 1. Use LinkedIn API: https://developer.linkedin.com/
    # 2. Or use a scraping service like ScraperAPI, ZenRows
    # 3. Or use Selenium with proper authentication

    # For demo/prototype, return realistic mock data
    return _generate_mock_jobs(skill, location, limit)


def scrape_naukri_jobs(
    skill: str,
    location: str = "Bangalore",
    experience: str = "0-5",
    limit: int = 10
) -> List[Dict]:
    """
    Scrape Naukri.com job postings

    Note: Naukri requires login for full access.
    This returns structured mock data for demo purposes.
    """
    base_jobs = _generate_mock_jobs(skill, location, limit)

    # Add Naukri-specific fields
    for job in base_jobs:
        job["salary"] = _generate_salary(skill)
        job["experience"] = experience
        job["posted_days_ago"] = random.randint(1, 14)
        job["source"] = "Naukri"

    return base_jobs


def scrape_indeed_jobs(
    skill: str,
    location: str = "India",
    limit: int = 10
) -> List[Dict]:
    """
    Scrape Indeed job postings

    Note: Indeed has API but requires partnership.
    Returns structured mock data for demo.
    """
    base_jobs = _generate_mock_jobs(skill, location, limit)

    for job in base_jobs:
        job["salary"] = _generate_salary(skill)
        job["job_type"] = random.choice(["Full-time", "Contract", "Remote"])
        job["source"] = "Indeed"
        job["urgency"] = random.choice(["urgently hiring", "act immediately", None])

    return base_jobs


def _generate_mock_jobs(skill: str, location: str, limit: int) -> List[Dict]:
    """Generate realistic mock job data"""

    companies = [
        "Microsoft", "Google", "Amazon", "Meta", "Apple",
        "TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra",
        "Accenture", "Deloitte", "PwC", "EY", "KPMG",
        "Flipkart", "Swiggy", "Zomato", "Paytm", "PhonePe",
        "Freshworks", "Zoho", "Razorpay", "CRED", "Byju's"
    ]

    locations = [
        "Bangalore", "Hyderabad", "Pune", "Chennai",
        "Gurgaon", "Noida", "Mumbai", "Delhi", "Remote"
    ]

    job_types = [
        "Software Development Engineer",
        "Senior Engineer",
        "Technical Lead",
        "Data Scientist",
        "ML Engineer",
        "Full Stack Developer",
        "Backend Engineer",
        "Frontend Engineer",
        "DevOps Engineer",
        "Cloud Engineer"
    ]

    jobs = []
    for i in range(limit):
        company = random.choice(companies)
        job_title = f"{skill} {random.choice(job_types)}"

        jobs.append({
            "title": job_title,
            "company": company,
            "location": random.choice(locations),
            "posted": f"{random.randint(1, 7)} days ago",
            "source_url": f"https://www.linkedin.com/jobs/view/{random.randint(1000000, 9999999)}",
            "description": f"We are hiring a {skill} professional with strong skills in {skill}, Python, and problem-solving.",
            "applicants": random.randint(10, 500),
            "source": "LinkedIn"
        })

    return jobs


def _generate_salary(skill: str) -> str:
    """Generate realistic salary range based on skill"""

    skill_salary_map = {
        "AI": (15, 45),
        "Machine Learning": (12, 40),
        "Data Science": (10, 35),
        "Python": (8, 30),
        "Java": (8, 28),
        "Full Stack": (10, 32),
        "DevOps": (12, 35),
        "Cloud": (12, 38),
        "Cybersecurity": (10, 35),
        "Blockchain": (15, 40),
    }

    min_salary, max_salary = skill_salary_map.get(skill, (6, 25))

    # Add some variance
    min_salary += random.randint(-2, 2)
    max_salary += random.randint(-2, 5)

    return f"₹{max(4, min_salary)}-{min(60, max_salary)} LPA"


def aggregate_jobs(
    skill: str,
    platforms: List[str] = None,
    total_limit: int = 20
) -> Dict:
    """
    Aggregate jobs from multiple platforms

    Args:
        skill: Skill to search for
        platforms: List of platforms (linkedin, naukri, indeed)
        total_limit: Total jobs to aggregate

    Returns:
        Aggregated job data with statistics
    """
    if platforms is None:
        platforms = ["linkedin", "naukri", "indeed"]

    all_jobs = []

    per_platform = total_limit // len(platforms)

    for platform in platforms:
        if platform == "linkedin":
            jobs = scrape_linkedin_jobs(skill, limit=per_platform)
        elif platform == "naukri":
            jobs = scrape_naukri_jobs(skill, limit=per_platform)
        elif platform == "indeed":
            jobs = scrape_indeed_jobs(skill, limit=per_platform)
        else:
            jobs = []

        all_jobs.extend(jobs)

    # Calculate statistics
    companies_hiring = {}
    locations_count = {}

    for job in all_jobs:
        company = job.get("company", "Unknown")
        location = job.get("location", "Unknown")

        companies_hiring[company] = companies_hiring.get(company, 0) + 1
        locations_count[location] = locations_count.get(location, 0) + 1

    return {
        "skill": skill,
        "total_jobs": len(all_jobs),
        "jobs": all_jobs[:total_limit],
        "top_companies": sorted(companies_hiring.items(), key=lambda x: x[1], reverse=True)[:5],
        "top_locations": sorted(locations_count.items(), key=lambda x: x[1], reverse=True)[:5],
        "aggregated_at": datetime.now().isoformat()
    }


if __name__ == "__main__":
    # Test the job scraper
    print("=" * 60)
    print("Job Scraper Tool Test")
    print("=" * 60)

    # Test LinkedIn scraping
    skill = "Python Developer"
    print(f"\n📍 Searching for: {skill}\n")

    jobs = scrape_linkedin_jobs(skill, limit=5)

    print(f"Found {len(jobs)} jobs:\n")
    for i, job in enumerate(jobs, 1):
        print(f"{i}. {job['title']} at {job['company']}")
        print(f"   Location: {job['location']}")
        print(f"   Posted: {job['posted']}")
        print(f"   URL: {job['source_url']}\n")

    # Test aggregation
    print("\n" + "=" * 60)
    print("Aggregating from multiple platforms...\n")

    aggregated = aggregate_jobs("Data Scientist", total_limit=10)

    print(f"Total Jobs: {aggregated['total_jobs']}")
    print(f"\nTop Companies Hiring:")
    for company, count in aggregated['top_companies'][:3]:
        print(f"  - {company}: {count} openings")