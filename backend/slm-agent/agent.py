"""CurriculumIQ - SLM Agent for curriculum analysis."""
import json, os, re, warnings
warnings.simplefilter("ignore")
from typing import List, Dict, Optional


# Optional deps
try:
    import firebase_admin
    from firebase_admin import credentials, firestore
    FIREBASE_AVAILABLE = True
except ImportError: FIREBASE_AVAILABLE = False

try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError: GEMINI_AVAILABLE = False

def _extract_domain(url):
    try:
        from urllib.parse import urlparse
        return urlparse(url).netloc.replace("www.", "").split(".")[0].title()
    except: return "Unknown"


class SLMAgent:
    def __init__(self):
        self.model = None
        self.db = None
        self.use_ai = False
        self.use_mock = True  # Needed by /api/model-info
        if GEMINI_AVAILABLE:
            api_key = os.environ.get("GEMINI_API_KEY", "")
            if api_key:
                try:
                    genai.configure(api_key=api_key)
                    self.model = genai.GenerativeModel("gemini-1.5-flash")
                    self.use_ai = True
                    self.use_mock = False
                except Exception as e:
                    print(f"[WARN] Gemini model init warning: {e}")
        if FIREBASE_AVAILABLE:
            self._init_firebase()


    def _init_firebase(self):
        sa_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "service-account.json")
        if os.path.exists(sa_path):
            cred = credentials.Certificate(sa_path)
            if not firebase_admin._apps:
                firebase_admin.initialize_app(cred)
            self.db = firestore.client()
            print("[OK] Firebase connected!")
        else:
            self.db = None

    def search_web(self, query: str, num_results: int = 8) -> List[Dict]:
        """Try DuckDuckGo (ddgs) first, fallback to curated data."""
        try:
            from web_search import search_duckduckgo
            results = search_duckduckgo(query + " skills demand 2026", max_results=num_results)
            if results:
                return results
        except Exception as e:
            print(f"[WARN] web search failed: {e}")
        return self._get_curated_results(query)

    def _get_curated_results(self, query: str) -> List[Dict]:
        data = {
            "python": [{"title": "Python Developer Demand 2026", "body": "Python remains the most in-demand programming language.", "href": "https://linkedin.com/jobs/python", "source": "LinkedIn"}],
            "machine learning": [{"title": "ML Engineer Hiring Surge 2026", "body": "ML engineers in high demand.", "href": "https://nasscom.in/ml-report", "source": "NASSCOM"}],
            "data science": [{"title": "Data Science Jobs Boom", "body": "Data Scientists needed across industries.", "href": "https://linkedin.com/jobs/data-science", "source": "LinkedIn"}],
            "aws": [{"title": "AWS Cloud Jobs 2026", "body": "AWS pros in high demand.", "href": "https://aws.amazon.com/jobs", "source": "AWS"}],
            "react": [{"title": "React Developer Demand", "body": "React.js most popular frontend.", "href": "https://react.dev/jobs", "source": "React"}],
            "java": [{"title": "Java Backend Developer Jobs", "body": "Java enterprise choice.", "href": "https://linkedin.com/jobs/java", "source": "LinkedIn"}],
            "devops": [{"title": "DevOps Engineers Most Wanted", "body": "DevOps skills needed.", "href": "https://devops.com/jobs", "source": "DevOps"}],
            "cybersecurity": [{"title": "Cybersecurity Hiring Alert", "body": "Security pros in high demand.", "href": "https://cyberseek.org/jobs", "source": "Cyberseek"}],
            "generative ai": [{"title": "Generative AI Boom 2026", "body": "GenAI engineers most sought after.", "href": "https://huggingface.co/jobs", "source": "HuggingFace"}],
            "sql": [{"title": "Database Developer Jobs", "body": "SQL developers needed.", "href": "https://linkedin.com/jupyters/sql", "source": "LinkedIn"}],
            "cloud": [{"title": "Cloud Computing Jobs 2026", "body": "Cloud architects in demand.", "href": "https://cloud.google.com/careers", "source": "Google Cloud"}],
            "blockchain": [{"title": "Blockchain Developer Demand", "body": "Web3 developers needed.", "href": "https://web3.career", "source": "Web3"}],
        }
        q = query.lower()
        for k, v in data.items():
            if k in q:
                return v
        return [{"title": f"{query} Skills 2026", "body": f"Industry demand for {query} professionals continues to grow.", "href": "https://linkedin.com/jobs", "source": "LinkedIn"}]

    def _ai_analyze(self, content: str, query: str) -> Optional[Dict]:
        if not self.model:
            return None
        p = f"Analyze '{query}' industry content. Extract top skills. Return JSON: {{'skills':[{{'name':'Skill','demand':85}}], 'summary':'text'}} Content: {content[:3000]}"
        try:
            t = self.model.generate_content(p).text.strip()
            m = re.search(r"\{.*\}", t, re.DOTALL)
            return json.loads(m.group()) if m else None
        except:
            return None

    def _rule_based_analyze(self, query: str, search_results: List[Dict]) -> Dict:
        skills_found = {}
        kw = {
            "Python": ["python", "django", "flask", "fastapi", "pandas"],
            "Machine Learning": ["machine learning", "ml", "sklearn", "tensorflow", "pytorch"],
            "Deep Learning": ["deep learning", "neural networks", "cnn", "transformers"],
            "Generative AI": ["generative ai", "genai", "llm", "gpt"],
            "Data Science": ["data science", "data analyst", "statistics", "tableau"],
            "AWS": ["aws", "ec2", "s3", "lambda", "cloud"],
            "Azure": ["azure", "microsoft azure", "cloud services"],
            "Docker": ["docker", "kubernetes", "k8s", "container"],
            "React": ["react", "reactjs", "frontend", "redux"],
            "Node.js": ["nodejs", "node.js", "express"],
            "SQL": ["sql", "postgresql", "mysql", "mongodb"],
            "Java": ["java", "spring boot", "hibernate"],
            "JavaScript": ["javascript", "js", "es6", "typescript"],
            "DevOps": ["devops", "ci/cd", "jenkins", "terraform"],
            "Cybersecurity": ["cybersecurity", "security", "pentesting", "siem"],
            "Cloud Computing": ["cloud", "serverless", "saas"],
            "NLP": ["nlp", "natural language processing"],
            "MLOps": ["mlops", "ml pipeline"],
            "Big Data": ["big data", "spark", "hadoop"],
            "Blockchain": ["blockchain", "web3", "solidity"],
            "Prompt Engineering": ["prompt engineering", "prompt design"],
            "Microservices": ["microservices", "distributed systems"],
            "TypeScript": ["typescript", "ts"],
        }
        cats = {"Python": "Programming", "Machine Learning": "AI/ML", "Deep Learning": "AI/ML",
                "Generative AI": "AI/ML", "Data Science": "Data", "AWS": "Cloud", "Azure": "Cloud",
                "Docker": "DevOps", "React": "Frontend", "Node.js": "Backend", "SQL": "Database",
                "Java": "Programming", "JavaScript": "Programming", "DevOps": "DevOps",
                "Cybersecurity": "Security", "Cloud Computing": "Cloud", "NLP": "AI/ML",
                "MLOps": "AI/ML", "Big Data": "Data", "Blockchain": "Emerging",
                "Prompt Engineering": "AI/ML", "Microservices": "Architecture", "TypeScript": "Programming"}
        for result in search_results:
            text = (result.get("title", "") + " " + result.get("body", "")).lower()
            result_href = result.get("href", "")
            result_source = result.get("source", "Web")
            for skill, keywords in kw.items():
                matches = sum(1 for k in keywords if k in text)
                if matches > 0:
                    if skill not in skills_found:
                        skills_found[skill] = {"count": 0, "href": result_href, "source": result_source}
                    skills_found[skill]["count"] += matches
                    # Keep the first non-empty href/source as the citation
                    if not skills_found[skill]["href"] and result_href:
                        skills_found[skill]["href"] = result_href
                        skills_found[skill]["source"] = result_source
        total = sum(v["count"] for v in skills_found.values()) or 1
        skills = [{"name": s, "demand": min(95, int((v["count"] / total) * 100) + 50),
                   "category": cats.get(s, "General"),
                   "source": v["source"] or "Web",
                   "sourceUrl": v["href"] or ""}
                  for s, v in sorted(skills_found.items(), key=lambda x: x[1]["count"], reverse=True)]
        return {"skills": skills[:10], "summary": f"Analyzed {len(search_results)} sources for {query}.", "analysis_method": "nlp-pattern-ai"}

    def analyze_trends(self, query: str) -> Dict:
        search_results = self.search_web(query)
        if self.use_ai and search_results:
            content = " ".join([f"{r.get('title', '')}: {r.get('body', '')}" for r in search_results])
            ai_result = self._ai_analyze(content, query)
            if ai_result:
                ai_result["analysis_method"] = "gemini-ai"
                return ai_result
        return self._rule_based_analyze(query, search_results)

    def save_to_firestore(self, skills_data: Dict, query: str):
        if not self.db:
            return
        try:
            batch = self.db.batch()
            for skill in skills_data.get("skills", []):
                ref = self.db.collection("industrySkills").document()
                batch.set(ref, {"name": skill.get("name", ""), "demandScore": skill.get("demand", 0),
                                "category": skill.get("category", "General"), "query": query,
                                "method": skills_data.get("analysis_method", "nlp-ai"),
                                "date": firestore.SERVER_TIMESTAMP})
            batch.commit()
        except:
            pass

    def generate_report(self, query: str, curriculum_topics: List[str] = None) -> Dict:
        industry_data = self.analyze_trends(query)
        if not curriculum_topics:
            return industry_data
        industry_skills = {s["name"].lower(): s for s in industry_data.get("skills", [])}
        matched, missing = [], []
        for topic in curriculum_topics:
            if any(skill in topic.lower() for skill in industry_skills.keys()):
                matched.append(topic)
            else:
                missing.append(topic)
        coverage = int(len(matched) / len(curriculum_topics) * 100) if curriculum_topics else 0
        return {"coverage_percentage": coverage, "matched_skills": matched, "missing_skills": missing,
                "industry_trends": industry_data.get("skills", []),
                "recommendation": f"Add: {', '.join(missing[:5])}" if missing else "Curriculum aligned!"}
