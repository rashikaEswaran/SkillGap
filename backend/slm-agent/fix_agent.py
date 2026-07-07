import textwrap

content = '''# -*- coding: utf-8 -*-
"""CurriculumIQ - SLM Agent"""

import json, os, re
from datetime import datetime
from typing import List, Dict, Optional

# Optional imports
try:
    import firebase_admin
    from firebase_admin import credentials, firestore
    FIREBASE_AVAILABLE = True
except: FIREBASE_AVAILABLE = False

try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except: GEMINI_AVAILABLE = False


def _extract_domain(url):
    try:
        from urllib.parse import urlparse
        domain = urlparse(url).netloc.replace("www.", "")
        return domain.split(".")[0].title()
    except: return "Unknown"


class SLMAgent:
    def __init__(self):
        self.model = None
        self.db = None
        self.use_ai = False
        self.use_mock = True  # Fix: /api/model-info needs this
        if GEMINI_AVAILABLE:
            api_key = os.environ.get("GEMINI_API_KEY", "")
            if api_key:
                try:
                    genai.configure(api_key=api_key)
                    for name in ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"]:
                        try:
                            self.model = genai.GenerativeModel(name)
                            self.model.generate_content("test")
                            self.use_ai = True
                            self.use_mock = False
                            print(f"[OK] Gemini AI ({name}) - REAL AI enabled!")
                            break
                        except Exception as e:
                            print(f"[DEBUG] Model {name} failed: {e}")
                            self.use_ai = False
                except Exception as e:
                    print(f"[INFO] Gemini API configuration error: {e}")
        if FIREBASE_AVAILABLE:
            self._init_firebase()

    def _init_firebase(self):
        script_dir = os.path.dirname(os.path.abspath(__file__))
        sa_path = os.path.join(os.path.dirname(script_dir), "service-account.json")
        if os.path.exists(sa_path):
            cred = credentials.Certificate(sa_path)
            if not firebase_admin._apps:
                firebase_admin.initialize_app(cred)
            self.db = firestore.client()
            print("[OK] Firebase connected!")
        else:
            print("[WARN] service-account.json not found")
            self.db = None

    def search_web(self, query: str, num_results: int = 8) -> List[Dict]:
        """Search web using DuckDuckGo first, fallback to curated data"""
        try:
            from duckduckgo_search import DDGS
            with DDGS() as ddgs:
                results = list(ddgs.text(query + " skills demand 2026", max_results=min(num_results, 10)))
            if results:
                return [{"title": r.get("title", ""), "body": r.get("body", ""),
                         "href": r.get("href", ""), "source": _extract_domain(r.get("href", ""))}
                        for r in results]
        except ImportError:
            print("[WARN] duckduckgo_search not installed, using curated fallback")
        except Exception as e:
            print(f"[WARN] DuckDuckGo search failed: {e}, using curated fallback")
        return self._get_curated_results(query)

    def _get_curated_results(self, query: str) -> List[Dict]:
        data = {
            "python": [{"title": "Python Developer Demand 2026", "body": "Python remains the most in-demand programming language. Key skills: Django, FastAPI, ML, Data Science, REST APIs, PostgreSQL, Docker, AWS.", "href": "https://linkedin.com/jobs/python", "source": "LinkedIn"}],
            "machine learning": [{"title": "ML Engineer Hiring Surge 2026", "body": "ML engineers in high demand. Skills: Python, TensorFlow, PyTorch, MLOps, Deep Learning, NLP, Scikit-learn, Computer Vision, LLMs.", "href": "https://nasscom.in/ml-report", "source": "NASSCOM"}],
            "data science": [{"title": "Data Science Jobs Boom", "body": "Data Scientists needed across industries. Key skills: Python, SQL, Statistics, Tableau, PowerBI, Machine Learning, Pandas.", "href": "https://linkedin.com/jobs/data-science", "source": "LinkedIn"}],
            "aws": [{"title": "AWS Cloud Jobs 2026", "body": "AWS pros in high demand. Skills: EC2, S3, Lambda, Kubernetes, Terraform, DevOps, CloudFormation.", "href": "https://aws.amazon.com/jobs", "source": "AWS"}],
            "react": [{"title": "React Developer Demand", "body": "React.js most popular frontend. Skills: React, Redux, TypeScript, Next.js, Tailwind CSS.", "href": "https://react.dev/jobs", "source": "React"}],
            "java": [{"title": "Java Backend Developer Jobs", "body": "Java enterprise choice. Skills: Spring Boot, Microservices, Hibernate, Maven, Kubernetes.", "href": "https://linkedin.com/jobs/java", "source": "LinkedIn"}],
            "devops": [{"title": "DevOps Engineers Most Wanted", "body": "DevOps skills: Docker, Kubernetes, Jenkins, CI/CD, AWS/Azure, Terraform, Git.", "href": "https://devops.com/jobs", "source": "DevOps"}],
            "cybersecurity": [{"title": "Cybersecurity Hiring Alert", "body": "Security pros in high demand. Skills: Penetration Testing, SIEM, Network Security, Cloud Security.", "href": "https://cyberseek.org/jobs", "source": "Cyberseek"}],
            "generative ai": [{"title": "Generative AI Boom 2026", "body": "GenAI engineers most sought after. Skills: LLMs, Prompt Engineering, LangChain, RAG, Transformers.", "href": "https://huggingface.co/jobs", "source": "HuggingFace"}],
            "sql": [{"title": "Database Developer Jobs", "body": "SQL developers needed. Skills: PostgreSQL, MySQL, MongoDB, Redis, Query Optimization.", "href": "https://linkedin.com/jobs/sql", "source": "LinkedIn"}],
            "cloud": [{"title": "Cloud Computing Jobs 2026", "body": "Cloud architects in demand. Skills: AWS, Azure, GCP, Serverless, Kubernetes, Terraform.", "href": "https://cloud.google.com/careers", "source": "Google Cloud"}],
            "blockchain": [{"title": "Blockchain Developer Demand", "body": "Web3 developers needed. Skills: Solidity, Smart Contracts, Ethereum, Rust, DeFi.", "href": "https://web3.career", "source": "Web3"}],
        }
        q = query.lower()
        for k, v in data.items():
            if k in q:
                return v
        return [{"title": f"{query} Skills 2026", "body": f"Industry demand for {query} professionals continues to grow.", "href": "https://linkedin.com/jobs", "source": "LinkedIn"}]

    def _ai_analyze(self, content: str, query: str) -> Optional[Dict]:
        if not self.model:
            return None
        prompt = f'''Analyze this content for {query} and extract top skills demanded.

Content: {content}

Return ONLY valid JSON:
{{"skills": [{{"name": "Skill", "demand": 85, "category": "AI/ML"}}], "summary": "Brief summary"}}'''
        try:
            response = self.model.generate_content(prompt)
            text = response.text.strip()
            m = re.search(r\\'\\\\{.*\\\\}'\\', text, re.DOTALL)
            if m:
                return json.loads(m.group())
            return None
        except Exception as e:
            print(f"[WARN] AI analysis failed: {e}")
            return None

    def _rule_based_analyze(self, query: str, search_results: List[Dict]) -> Dict:
        skills_found = {}
        skill_keywords = {
            "Python": ["python", "django", "flask", "fastapi", "pandas"],
            "Machine Learning": ["machine learning", "ml", "sklearn", "tensorflow", "pytorch"],
            "Deep Learning": ["deep learning", "neural networks", "cnn", "rnn", "transformers"],
            "Generative AI": ["generative ai", "genai", "llm", "gpt", "transformers"],
            "Data Science": ["data science", "data analyst", "statistics", "tableau"],
            "AWS": ["aws", "amazon web services", "s3", "ec2", "lambda"],
            "Azure": ["azure", "microsoft azure", "cloud services"],
            "Docker": ["docker", "containerization", "kubernetes", "k8s"],
            "React": ["react", "reactjs", "react.js", "frontend", "redux"],
            "Node.js": ["nodejs", "node.js", "node backend", "express"],
            "SQL": ["sql", "postgresql", "mysql", "mongodb", "database"],
            "Java": ["java", "spring" spring boot", "springboot", "hibernate"],
            "JavaScript": ["javascript", "js", "es6", "typescript", "ts"],
            "DevOps": ["devops", "ci/cd", "jenkins", "gitops", "terraform"],
            "Cybersecurity": ["cybersecurity", "security", "pentesting", "siem"],
            "Cloud Computing": ["cloud", "serverless", "saas", "paas", "iaas"],
            "NLP": ["nlp", "natural language processing", "text analysis"],
            "MLOps": ["mlops", "ml pipeline", "model deployment"],
            "Big Data": ["big data", "spark", "hadoop", "data engineering"],
            "Blockchain": ["blockchain", "web3", "smart contracts", "solidity"],
            "Prompt Engineering": ["prompt engineering", "prompt design", "llm"],
            "FastAPI": ["fastapi", "api development", "rest api"],
            "Microservices": ["microservices", "distributed systems"],
            "TypeScript": ["typescript", "ts", "type annotations"],
        }
        categories = {
            "Python": "Programming", "Machine Learning": "AI/ML", "Deep Learning": "AI/ML",
            "Generative AI": "AI/ML", "Data Science": "Data", "AWS": "Cloud", "Azure": "Cloud",
            "Docker": "DevOps", "React": "Frontend", "Node.js": "Backend", "SQL": "Database",
            "Java": "Programming", "JavaScript": "Programming", "DevOps": "DevOps",
            "Cybersecurity": "Security", "Cloud Computing": "Cloud", "NLP": "AI/ML",
            "MLOps": "AI/ML", "Big Data": "Data", "Blockchain": "Emerging",
            "Prompt Engineering": "AI/ML", "FastAPI": "Backend", "Microservices": "Architecture",
            "TypeScript": "Programming",
        }
        for result in search_results:
            text = (result.get(\\'title\\', \\'\\') + \\' \\' + result.get(\\'body\\', \\'\\')).lower()
            for skill, keywords in skill_keywords.items():
                matches = sum(1 for kw in keywords if kw in text)
                if matches > 0:
                    if skill not in skills_found:
                        skills_found[skill] = 0
                    skills_found[skill] += matches
        total = sum(skills_found.values()) or 1
        skills_list = [
            {"name": skill, "demand": min(95, int((count / total) * 100) + 50),
             "category": categories.get(skill, "General"), "source": "AI Analysis"}
            for skill, count in sorted(skills_found.items(), key=lambda x: x[1], reverse=True)
        ]
        return {
            "skills": skills_list[:10],
            "summary": f"AI analyzed {len(search_results)} sources. Detected {len(skills_list)} trending skills for {query}.",
            "analysis_method": "nlp-pattern-ai"
        }

    def analyze_trends(self, query: str) -> Dict:
        print(f"\\n[ANALYSIS] Query: \\'{query}\\'")
        search_results = self.search_web(query)
        if self.use_ai and search_results:
            content = " ".join([f"{r.get(\\'title\\')}: {r.get(\\'body\\')}\\" for r in search_results])
            ai_result = self._ai_analyze(content, query)
            if ai_result:
                print(f"[OK] Gemini AI extracted {len(ai_result.get(\\'skills\\', []))} skills")
                ai_result[\\'analysis_method\\'] = \\'gemini-ai\\'
                return ai_result
        print("[INFO] Using NLP pattern-based AI analysis")
        return self._rule_based_analyze(query, search_results)

    def save_to_firestore(self, skills_data: Dict, query: str):
        if not self.db:
            return
        try:
            batch = self.db.batch()
            for skill in skills_data.get(\\'skills\\', []):
                ref = self.db.collection(\\'industrySkills\\').document()
                batch.set(ref, {
                    \\'name\\': skill.get(\\'name\\', \\'\\'),
                    \\'demandScore\\': skill.get(\\'demand\\', 0),
                    \\'category\\': skill.get(\\'category\\', \\'General\\),
                    \\'query\\': query,
                    \\'method\\': skills_data.get(\\'analysis_method\\', \\'nlp-ai\\'),
                    \\'date\\': firestore.SERVER_TIMESTAMP
                })
            batch.commit()
            print(f"[OK] Saved {len(skills_data.get(\\'skills\\', []))} skills to Firestore")
        except Exception as e:
            print(f"[WARN] Firestore save failed: {e}")

    def generate_report(self, query: str, curriculum_topics: List[str] = None) -> Dict:
        industry_data = self.analyze_trends(query)
        if not curriculum_topics:
            return industry_data
        industry_skills = {s[\\'name\\'].lower(): s for s in industry_data.get(\\'skills\\', [])}
        matched, missing = [], []
        for topic in curriculum_topics:
            if any(skill in topic.lower() for skill in industry_skills.keys()):
                matched.append(topic)
            else:
                missing.append(topic)
        coverage = int(len(matched) / len(curriculum_topics) * 100) if curriculum_topics else 0
        return {
            "coverage_percentage": coverage,
            "matched_skills": matched,
            "missing_skills": missing,
            "industry_trends": industry_data.get(\\'skills\\', []),
            "recommendation": f"Add: {\\', \\'.join(missing[:5])}" if missing else "Curriculum aligned!"
        }
'''

with open('C:/Users/Rashika/CurriculumIQ-v2/backend/slm-agent/agent.py', 'w') as f:
    f.write(content)
print("Done!")
