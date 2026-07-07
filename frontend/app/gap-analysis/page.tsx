"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, FileText, CheckCircle, XCircle, AlertCircle, TrendingUp, Briefcase,
  Award, Target, ArrowRight, Download, ExternalLink, Github, Code,
  FileUp, Link2, PieChart, RefreshCw, Share2, Save, ChevronDown, ChevronUp,
  Star, Clock, Calendar, BookOpen, PlayCircle, Check, Zap, Lightbulb,
  Users, Rocket, Trophy, BarChart3, Layers, Map, MessageSquare
} from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-chartjs-2").then(m => m.Doughnut), { ssr: false });
const RadarChart = dynamic(() => import("react-chartjs-2").then(m => m.Radar), { ssr: false });

// ==================== TYPES ====================

interface AnalysisResult {
  readinessScore: number;
  matchPercentage: number;
  gapPercentage: number;
  totalSkillsDetected: number;
  readinessLevel: "Beginner" | "Developing" | "Almost Ready" | "Industry Ready";
  skillCoverage: { matched: string[]; missing: string[] };
  skillRadar: { category: string; userScore: number; industryBenchmark: number }[];
  skillsBreakdown: { technical: string[]; soft: string[]; projects: string[]; certifications: string[] };
  gapInsights: { skill: string; whyItMatters: string; industryDemand: string; impactOnEmployability: string; learningPath: string[]; priority: string }[];
  roadmap: { phase: number; name: string; skills: string[]; estimatedDuration: string; description: string }[];
  projectRecommendations: { title: string; difficulty: string; skillsGained: string[]; estimatedDuration: string; description: string }[];
  courseRecommendations: { title: string; platform: string; difficulty: string; skillCovered: string; duration: string; rating: number }[];
  careerRecommendations: { category: string; assessment: string; suggestions: string[] };
  githubAnalysis?: { repositories: number; topLanguages: string[]; commitActivity: string; projectQuality: string };
  leetcodeAnalysis?: { problemsSolved: number; contestRating: string; strengths: string[]; weaknesses: string[] };
}

const TARGET_ROLES = [
  "AI Engineer", "Machine Learning Engineer", "Data Scientist", "Data Engineer",
  "Cloud Engineer", "Full Stack Developer", "MLOps Engineer", "Cybersecurity Analyst",
  "DevOps Engineer", "Software Development Engineer", "Backend Developer",
  "Frontend Developer", "Platform Engineer",
];

// ==================== SKILL RADAR CHART COMPONENT ====================
const SkillRadarChart = ({ data }: { data: { category: string; userScore: number; industryBenchmark: number }[] }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationProgress(1), 100);
    return () => clearTimeout(timer);
  }, []);

  const centerX = 150, centerY = 150, radius = 120;

  const getPoint = (index: number, score: number, progress: number = 1) => {
    const angle = (index * 60 - 90) * (Math.PI / 180);
    const x = centerX + (score * progress / 100) * radius * Math.cos(angle);
    const y = centerY + (score * progress / 100) * radius * Math.sin(angle);
    return `${x},${y}`;
  };

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 300 300" className="w-full max-w-[300px] h-auto mx-auto">
        <defs>
          <linearGradient id="userGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="industryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <circle cx="150" cy="150" r="140" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.1">
          <animate attributeName="r" values="120;140;120" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.05;0.2" dur="3s" repeatCount="indefinite" />
        </circle>
        {[20, 40, 60, 80, 100].map((scale, idx) => {
          const size = (scale / 100) * radius;
          const pts = [];
          for (let i = 0; i < 6; i++) {
            const angle = (i * 60 - 90) * (Math.PI / 180);
            pts.push(`${centerX + size * Math.cos(angle)},${centerY + size * Math.sin(angle)}`);
          }
          return <polygon key={idx} points={pts.join(" ")} fill="none" stroke="#334155" strokeWidth="1" strokeDasharray={idx === 4 ? "none" : "4,4"} opacity={idx === 4 ? 0.8 : 0.4} />;
        })}
        {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
          const rad = (angle - 90) * (Math.PI / 180);
          return <line key={idx} x1={centerX} y1={centerY} x2={centerX + radius * Math.cos(rad)} y2={centerY + radius * Math.sin(rad)} stroke="#475569" strokeWidth="1.5"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" begin={`${idx * 0.3}s`} repeatCount="indefinite" /></line>;
        })}
        <polygon points={data.map((r, i) => getPoint(i, r.industryBenchmark, animationProgress)).join(" ")} fill="url(#industryGrad)" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" filter="url(#glow)" opacity="0.7"><animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" /></polygon>
        <polygon points={data.map((r, i) => getPoint(i, r.userScore, animationProgress)).join(" ")} fill="url(#userGrad)" stroke="#10b981" strokeWidth="3" strokeLinejoin="round" filter="url(#glow)" />
        {data.map((r, i) => { const angle = (i * 60 - 90) * (Math.PI / 180); return <text key={`l-${i}`} x={centerX + (radius + 20) * Math.cos(angle)} y={centerY + (radius + 20) * Math.sin(angle)} textAnchor={Math.cos(angle) > 0.5 ? 'start' : Math.cos(angle) < -0.5 ? 'end' : 'middle'} className="fill-white font-bold" style={{ fontSize: '10px' }}>{r.category}</text>; })}
        {data.map((r, i) => { const [cx, cy] = getPoint(i, r.industryBenchmark, animationProgress).split(',').map(Number); return <circle key={`ind-${i}`} cx={cx} cy={cy} r="6" fill="#f59e0b" stroke="#0f172a" strokeWidth="2"><animate attributeName="r" values="5;7;5" dur="1.5s" begin={`${i * 0.2}s`} repeatCount="indefinite" /></circle>; })}
        {data.map((r, i) => {
          const [cx, cy] = getPoint(i, r.userScore, animationProgress).split(',').map(Number);
          const isHovered = hoveredPoint === i;
          return (
            <g key={`usr-${i}`} onMouseEnter={() => setHoveredPoint(i)} onMouseLeave={() => setHoveredPoint(null)} className="cursor-pointer">
              <circle cx={cx} cy={cy} r={isHovered ? 12 : 8} fill="none" stroke="#10b981" strokeWidth="2" opacity={isHovered ? 0.6 : 0} />
              <circle cx={cx} cy={cy} r={isHovered ? 7 : 5} fill="#10b981" stroke="#0f172a" strokeWidth="2" filter="url(#glow)" />
              {isHovered && <g><rect x={cx - 40} y={cy - 35} width="80" height="28" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1" /><text x={cx} y={cy - 17} textAnchor="middle" className="fill-white text-xs font-bold">{r.userScore}</text><text x={cx} y={cy - 5} textAnchor="middle" className="fill-amber-400 text-[9px]">vs {r.industryBenchmark}</text></g>}
            </g>
          );
        })}
        <g><circle cx="150" cy="150" r="20" fill="#0f172a" stroke="#475569" strokeWidth="1" /><text x="150" y="145" textAnchor="middle" className="fill-white text-xs font-bold">{Math.round(data.reduce((a, b) => a + b.userScore, 0) / 6)}</text><text x="150" y="158" textAnchor="middle" className="fill-slate-400 text-[8px]">AVG</text></g>
      </svg>
      <div className="pt-4 border-t border-border/50">
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" /><span className="text-white font-medium">Your Score</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" /><span className="text-white font-medium">Industry Benchmark</span></div>
        </div>
        <div className="space-y-1.5">
          {data.map((r, i) => { const gap = r.userScore - r.industryBenchmark; return (
            <div key={i} className={`flex items-center justify-between text-sm py-2 px-2 rounded transition-all cursor-pointer ${hoveredPoint === i ? 'bg-surface/80' : 'hover:bg-surface/50'}`} onMouseEnter={() => setHoveredPoint(i)} onMouseLeave={() => setHoveredPoint(null)}>
              <span className="text-white font-medium">{r.category}</span>
              <div className="flex items-center gap-3">
                <span className={`text-emerald-400 font-bold w-10 text-right ${hoveredPoint === i ? 'scale-110' : ''} transition-transform`}>{r.userScore}</span>
                <span className="text-slate-600">vs</span>
                <span className={`text-amber-400 font-bold w-10 ${hoveredPoint === i ? 'scale-110' : ''} transition-transform`}>{r.industryBenchmark}</span>
                <span className={`text-xs font-bold w-14 text-right px-2 py-0.5 rounded ${gap >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{gap >= 0 ? '+' : ''}{gap}</span>
              </div>
            </div>
          ); })}
        </div>
      </div>
    </div>
  );
};

export default function GapAnalysisPageV2() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [leetcodeUrl, setLeetcodeUrl] = useState("");
  const [pastedText, setPastedText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) { router.push("/login"); return; }
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // ==================== MOCK DATA FOR DEMO ====================
  const generateMockResult = (): AnalysisResult => ({
    readinessScore: 78,
    matchPercentage: 80,
    gapPercentage: 20,
    totalSkillsDetected: 15,
    readinessLevel: "Almost Ready",
    skillCoverage: {
      matched: ["Python", "JavaScript", "React", "Node.js", "SQL", "Git", "Docker", "AWS"],
      missing: ["TypeScript", "Kubernetes", "System Design"],
    },
    skillRadar: [
      { category: "Frontend", userScore: 85, industryBenchmark: 90 },
      { category: "Backend", userScore: 80, industryBenchmark: 85 },
      { category: "Database", userScore: 75, industryBenchmark: 80 },
      { category: "DevOps", userScore: 60, industryBenchmark: 75 },
      { category: "System Design", userScore: 50, industryBenchmark: 80 },
      { category: "Problem Solving", userScore: 90, industryBenchmark: 85 },
    ],
    skillsBreakdown: {
      technical: ["Python", "JavaScript", "React", "Node.js", "SQL", "MongoDB", "Docker", "AWS"],
      soft: ["Communication", "Team Leadership", "Problem Solving", "Agile"],
      projects: ["E-commerce Platform", "AI Chatbot", "Portfolio Website"],
      certifications: ["AWS Cloud Practitioner", "React Developer"],
    },
    gapInsights: [
      {
        skill: "TypeScript",
        whyItMatters: "Type-safe JavaScript is industry standard for large codebases",
        industryDemand: "High",
        impactOnEmployability: "Missing TypeScript reduces job opportunities by 40%",
        learningPath: ["Basic Types", "Interfaces", "Generics", "Advanced Types"],
        priority: "high",
      },
      {
        skill: "Kubernetes",
        whyItMatters: "Container orchestration is essential for cloud-native apps",
        industryDemand: "High",
        impactOnEmployability: "K8s skills increase salary potential by 25%",
        learningPath: ["Pods & Deployments", "Services", "ConfigMaps", "Helm"],
        priority: "medium",
      },
      {
        skill: "System Design",
        whyItMatters: "Critical for senior roles and scalable architectures",
        industryDemand: "High",
        impactOnEmployability: "System design is key for FAANG interviews",
        learningPath: ["Load Balancing", "Caching", "Database Sharding", "Microservices"],
        priority: "critical",
      },
    ],
    roadmap: [
      { phase: 1, name: "Foundation", skills: ["TypeScript Basics", "Advanced React"], estimatedDuration: "4 weeks", description: "Master type-safe development" },
      { phase: 2, name: "Intermediate", skills: ["System Design Basics", "API Design"], estimatedDuration: "6 weeks", description: "Learn architecture patterns" },
      { phase: 3, name: "Advanced", skills: ["Kubernetes", "Cloud Architecture"], estimatedDuration: "8 weeks", description: "Production-ready skills" },
    ],
    projectRecommendations: [
      { title: "Full-Stack TypeScript App", difficulty: "Intermediate", skillsGained: ["TypeScript", "Next.js", "Prisma"], estimatedDuration: "3 weeks", description: "Build a type-safe full-stack application" },
      { title: "Kubernetes Deployment Pipeline", difficulty: "Advanced", skillsGained: ["K8s", "Docker", "CI/CD"], estimatedDuration: "4 weeks", description: "Deploy microservices to K8s" },
      { title: "System Design Clone", difficulty: "Advanced", skillsGained: ["System Design", "Scalability"], estimatedDuration: "4 weeks", description: "Recreate Twitter/Uber architecture" },
    ],
    courseRecommendations: [
      { title: "Understanding TypeScript", platform: "Udemy", difficulty: "Intermediate", skillCovered: "TypeScript", duration: "6 hours", rating: 4.8 },
      { title: "System Design Interview Prep", platform: "Educative", difficulty: "Advanced", skillCovered: "System Design", duration: "20 hours", rating: 4.9 },
      { title: "Kubernetes for Developers", platform: "Pluralsight", difficulty: "Advanced", skillCovered: "Kubernetes", duration: "8 hours", rating: 4.7 },
    ],
    careerRecommendations: {
      category: "Full Stack Developer",
      assessment: "You're 78% ready for mid-level positions. Focus on TypeScript and System Design.",
      suggestions: [
        "Complete 2-3 TypeScript projects",
        "Practice system design problems daily",
        "Contribute to open-source projects",
        "Build a portfolio showcasing full-stack work",
      ],
    },
    githubAnalysis: { repositories: 12, topLanguages: ["TypeScript", "JavaScript", "Python"], commitActivity: "Active (50+ commits/month)", projectQuality: "Good" },
    leetcodeAnalysis: { problemsSolved: 250, contestRating: "1650", strengths: ["Arrays", "Dynamic Programming"], weaknesses: ["Graphs", "Segment Trees"] },
  });

  // ==================== MAP REAL API DATA ====================
  function mapApiToAnalysisResult(apiData: any, role: string): AnalysisResult {
    const industry = apiData.industry_trends || [];
    const matched = apiData.matched_skills || [];
    const missing = apiData.missing_skills || [];
    const coverage = apiData.coverage_percentage || 50;
    const total = matched.length + missing.length;

    // Derive readiness from coverage
    const readiness = coverage;
    const level: AnalysisResult["readinessLevel"] =
      readiness >= 80 ? "Industry Ready" :
      readiness >= 60 ? "Almost Ready" :
      readiness >= 40 ? "Developing" : "Beginner";

    // Build skill radar from industry trends
    const radarData: AnalysisResult["skillRadar"] = (industry.slice(0, 6) as any[]).map((t: any) => ({
      category: t.category || "General",
      userScore: matched.includes(t.name) ? Math.min(t.demand || 70, 90) : Math.max((t.demand || 70) - 30, 20),
      industryBenchmark: t.demand || 70,
    }));
    // Pad to 6 items for the radar
    while (radarData.length < 6) {
      radarData.push({ category: `Skill ${radarData.length + 1}`, userScore: 40, industryBenchmark: 70 });
    }

    // Build gap insights from missing skills
    const gapInsights: AnalysisResult["gapInsights"] = missing.map((skill: string) => ({
      skill,
      whyItMatters: `${skill} is critical for ${role} roles based on 2026 industry demand.`,
      industryDemand: "High",
      impactOnEmployability: `Missing ${skill} significantly reduces your readiness for ${role} positions.`,
      learningPath: [`Basics of ${skill}`, `Intermediate ${skill}`, `Advanced ${skill}`, "Practical projects"],
      priority: skill.toLowerCase().includes("python") || skill.toLowerCase().includes("java") ? "critical" : "high",
    }));

    // Build technical skills from matched industry skills
    const technical = industry.map((t: any) => t.name || "").filter(Boolean);
    const soft = ["Communication", "Problem Solving", "Teamwork", "Agile"];
    const projects = ["Portfolio Website", "Open Source Contribution", `${role} Demo Project`];
    const certs = ["AWS Cloud Practitioner"];

    return {
      readinessScore: readiness,
      matchPercentage: coverage,
      gapPercentage: 100 - coverage,
      totalSkillsDetected: total,
      readinessLevel: level,
      skillCoverage: { matched, missing },
      skillRadar: radarData,
      skillsBreakdown: { technical, soft, projects, certifications: certs },
      gapInsights,
      roadmap: [
        { phase: 1, name: "Foundation", skills: missing.slice(0, 2), estimatedDuration: "4 weeks", description: `Build core ${role} fundamentals` },
        { phase: 2, name: "Intermediate", skills: missing.slice(2, 4), estimatedDuration: "6 weeks", description: `Develop intermediate ${role} skills` },
        { phase: 3, name: "Advanced", skills: missing.slice(4), estimatedDuration: "8 weeks", description: `Master advanced ${role} concepts` },
      ],
      projectRecommendations: [
        { title: `${role} Demo App`, difficulty: "Intermediate", skillsGained: technical.slice(0, 3), estimatedDuration: "3 weeks", description: `Build a real-world ${role} application` },
        { title: "Code Review Bot", difficulty: "Advanced", skillsGained: [...technical.slice(0, 2), "DevOps"], estimatedDuration: "4 weeks", description: "Automated code review with AI" },
      ],
      courseRecommendations: [
        { title: `${role} Mastery`, platform: "Coursera", difficulty: "Intermediate", skillCovered: technical[0] || "Core Skills", duration: "40 hours", rating: 4.6 },
        { title: `${role} Interview Prep`, platform: "Udemy", difficulty: "Advanced", skillCovered: "Interview Prep", duration: "20 hours", rating: 4.8 },
        { title: "System Design", platform: "Educative", difficulty: "Advanced", skillCovered: "System Design", duration: "10 hours", rating: 4.9 },
      ],
      careerRecommendations: {
        category: role,
        assessment: `Your readiness for ${role} roles is ${readiness}%. Focus on ${missing.slice(0, 3).join(", ")} to improve.`,
        suggestions: [
          `Complete hands可可 to learn ${missing[0] || "core skills"}`,
          "Build a portfolio showcasing relevant projects",
          "Contribute to open source projects",
        ],
      },
      githubAnalysis: { repositories: 5, topLanguages: ["Python", "JavaScript", "TypeScript"], commitActivity: "Active", projectQuality: "Good" },
      leetcodeAnalysis: { problemsSolved: 150, contestRating: "1600", strengths: ["Arrays", "DP"], weaknesses: ["Graphs"] },
    };
  }

  // ==================== HANDLERS ====================
  const handleFileUpload = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleAnalyze = async () => {
    if (!selectedRole) { alert("Please select a target role"); return; }

    setAnalyzing(true);

    try {
      // === CALL REAL PYTHON SLM BACKEND ===
      const response = await fetch('/api/slm/gap-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: selectedRole,
          curriculum_topics: [], // Empty for now or derive from files later
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const apiData = await response.json();
      const result = apiData.data || apiData;

      // Map real API response to frontend AnalysisResult format
      const mappedResult = mapApiToAnalysisResult(result, selectedRole);
      setAnalysisResult(mappedResult);

      // Save to Firestore
      try {
        await addDoc(collection(db, "gapAnalyses"), {
          userId: user?.uid,
          role: selectedRole,
          githubUrl,
          leetcodeUrl,
          ...mappedResult,
          createdAt: new Date(),
        });
      } catch (error) {
        console.error("Error saving:", error);
      }

    } catch (error: any) {
      console.error("Analysis error:", error);
      alert(`Analysis failed: ${error.message}. Using demo data.`);
      // Fallback to mock data for demo purposes
      const mockResult = generateMockResult();
      setAnalysisResult(mockResult);
    } finally {
      setAnalyzing(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // ==================== RENDER HELPERS ====================
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const getReadinessColor = (level: string) => {
    switch (level) {
      case "Industry Ready": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Almost Ready": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Developing": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-red-500/20 text-red-400 border-red-500/30";
    }
  };

  if (loading) return <DashboardLayout><div className="min-h-[60vh] flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /><p className="text-text-secondary mt-4">Loading...</p></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="glass-card p-8 border border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">Skill Gap Analysis V2</h1>
              <p className="text-text-secondary">AI-powered career intelligence with comprehensive insights</p>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">Enhanced Version</Badge>
          </div>
        </div>

        {!analysisResult ? (
          /* === INPUT SECTION === */
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* GitHub & LeetCode */}
            <Card variant="glass">
              <CardHeader><CardTitle className="flex items-center gap-2 text-white"><Link2 className="h-5 w-5 text-primary" /> Professional Profiles</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary flex items-center gap-2"><Github className="h-4 w-4" /> GitHub Profile URL</label>
                    <input type="url" placeholder="https://github.com/username" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="input-field w-full" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary flex items-center gap-2"><Code className="h-4 w-4" /> LeetCode Profile URL</label>
                    <input type="url" placeholder="https://leetcode.com/username" value={leetcodeUrl} onChange={(e) => setLeetcodeUrl(e.target.value)} className="input-field w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Target Role */}
            <Card variant="glass">
              <CardHeader><CardTitle className="flex items-center gap-2 text-white"><Target className="h-5 w-5 text-primary" /> Select Target Role</CardTitle></CardHeader>
              <CardContent>
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="input-field w-full">
                  <option value="">Choose role...</option>
                  {TARGET_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card variant="glass">
              <CardHeader><CardTitle className="flex items-center gap-2 text-white"><FileUp className="h-5 w-5 text-primary" /> Upload Documents</CardTitle></CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-primary/50 transition-all">
                  <Upload className="h-12 w-12 text-text-tertiary mx-auto mb-4" />
                  <p className="text-text-secondary mb-2">Drag & drop or click to browse</p>
                  <p className="text-text-tertiary text-sm mb-4">Supports: PDF, DOCX, DOC, TXT, ZIP - Any document type</p>
                  <input type="file" multiple accept=".pdf,.docx,.doc,.txt,.zip" onChange={(e) => { const f = Array.from(e.target.files || []); handleFileUpload(f); }} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg cursor-pointer hover:bg-primary/30"><FileUp className="h-4 w-4" /> Browse Files</label>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-text-secondary">{files.length} file(s) uploaded:</p>
                    <div className="flex flex-wrap gap-2">
                      {files.map((file, i) => (
                        <Badge key={i} variant="outline" className="bg-primary/10 text-primary">
                          <FileText className="h-3 w-3 mr-1" /> {file.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analyze Button */}
            <div className="flex justify-center">
              <Button size="lg" onClick={handleAnalyze} disabled={analyzing || !selectedRole} className="bg-gradient-to-r from-primary to-primary/80 px-8">
                {analyzing ? <><RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Analyzing...</> : <><Target className="w-5 h-5 mr-2" /> Run Analysis</>}
              </Button>
            </div>
          </motion.div>
        ) : (
          /* === RESULTS SECTION (10 Sections) === */
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* Section 1: Summary - Professional Stats */}
            <Card variant="glass" className="border-primary/20">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                  {/* Left: Title & Badge */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedRole}</h2>
                        <p className="text-sm text-text-secondary">Career Readiness Assessment</p>
                      </div>
                    </div>
                    <Badge className={`${getReadinessColor(analysisResult.readinessLevel)} px-4 py-2 text-sm`}>{analysisResult.readinessLevel}</Badge>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6 p-4 rounded-xl bg-surface/50 border border-border/30">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-text-tertiary">Matched</span>
                        </div>
                        <p className="text-2xl font-bold text-emerald-400">{analysisResult.skillCoverage.matched.length}</p>
                      </div>
                      <div className="text-center border-l border-border/50">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span className="text-xs text-text-tertiary">Missing</span>
                        </div>
                        <p className="text-2xl font-bold text-red-400">{analysisResult.skillCoverage.missing.length}</p>
                      </div>
                      <div className="text-center border-l border-border/50">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Layers className="w-4 h-4 text-primary" />
                          <span className="text-xs text-text-tertiary">Total</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">{analysisResult.totalSkillsDetected}</p>
                      </div>
                    </div>
                  </div>

                  {/* Center: Score Gauge */}
                  <div className="relative">
                    <div className="w-48 h-48">
                      <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
                        <defs>
                          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
                        <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#1e293b" strokeWidth="8" />
                        <circle cx="21" cy="21" r="15.9155" fill="none" stroke="url(#scoreGrad)" strokeWidth="8" strokeDasharray={`${analysisResult.readinessScore}, 100`} strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-white">{analysisResult.readinessScore}</span>
                      <span className="text-xs text-text-tertiary mt-1">Readiness Score</span>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        <span className="text-xs text-emerald-400">{analysisResult.matchPercentage}% match</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Detailed Metrics */}
                  <div className="flex-1 w-full">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      Performance Metrics
                    </h3>
                    <div className="space-y-4">
                      {/* Match Percentage */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-text-secondary">Skill Match</span>
                          <span className="text-sm font-bold text-emerald-400">{analysisResult.matchPercentage}%</span>
                        </div>
                        <div className="h-2 bg-surface rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: `${analysisResult.matchPercentage}%` }} />
                        </div>
                      </div>

                      {/* Gap Percentage */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-text-secondary">Skills Gap</span>
                          <span className="text-sm font-bold text-red-400">{analysisResult.gapPercentage}%</span>
                        </div>
                        <div className="h-2 bg-surface rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full" style={{ width: `${analysisResult.gapPercentage}%` }} />
                        </div>
                      </div>

                      {/* Coverage Breakdown */}
                      <div className="pt-4 border-t border-border/50">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <p className="text-xs text-emerald-400 mb-1">Coverage Rate</p>
                            <p className="text-lg font-bold text-white">{Math.round((analysisResult.skillCoverage.matched.length / (analysisResult.skillCoverage.matched.length + analysisResult.skillCoverage.missing.length)) * 100)}%</p>
                          </div>
                          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-xs text-red-400 mb-1">Gap Rate</p>
                            <p className="text-lg font-bold text-white">{Math.round((analysisResult.skillCoverage.missing.length / (analysisResult.skillCoverage.matched.length + analysisResult.skillCoverage.missing.length)) * 100)}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: GitHub/LeetCode - Only show if URLs provided */}
            {(githubUrl || leetcodeUrl) && (
              <div className="grid md:grid-cols-2 gap-6">
                {githubUrl && (
                  <Card variant="glass"><CardHeader><CardTitle className="flex items-center gap-2"><Github className="h-5 w-5" /> GitHub</CardTitle></CardHeader><CardContent><p className="text-white">Repos: {analysisResult.githubAnalysis?.repositories}</p><p className="text-white">Languages: {analysisResult.githubAnalysis?.topLanguages.join(", ")}</p></CardContent></Card>
                )}
                {leetcodeUrl && (
                  <Card variant="glass"><CardHeader><CardTitle className="flex items-center gap-2"><Code className="h-5 w-5" /> LeetCode</CardTitle></CardHeader><CardContent><p className="text-white">Solved: {analysisResult.leetcodeAnalysis?.problemsSolved}</p><p className="text-white">Rating: {analysisResult.leetcodeAnalysis?.contestRating}</p></CardContent></Card>
                )}
              </div>
            )}

            {/* Section 3: Skill Coverage - Donut Chart */}
            <Card variant="glass">
              <CardHeader><CardTitle><PieChart className="h-5 w-5" /> Skill Coverage</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Donut Chart SVG */}
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
                      {/* Background circle */}
                      <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#1e293b" strokeWidth="7" />
                      {/* Matched skills - Emerald Green */}
                      <circle
                        cx="21" cy="21" r="15.9155"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="7"
                        strokeDasharray={`${analysisResult.matchPercentage}, 100`}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                      />
                      {/* Missing skills - Coral Red (starts where matched ends) */}
                      <circle
                        cx="21" cy="21" r="15.9155"
                        fill="none"
                        stroke="#f87171"
                        strokeWidth="7"
                        strokeDasharray={`${analysisResult.gapPercentage}, 100`}
                        strokeDashoffset={-(analysisResult.matchPercentage)}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-white">{analysisResult.matchPercentage}%</span>
                      <span className="text-xs text-text-tertiary">Matched</span>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                      <div>
                        <p className="text-sm font-semibold text-white">Matched Skills</p>
                        <p className="text-xs text-text-tertiary">{analysisResult.skillCoverage.matched.length} skills</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-400 shadow-lg shadow-red-400/50" />
                      <div>
                        <p className="text-sm font-semibold text-white">Missing Skills</p>
                        <p className="text-xs text-text-tertiary">{analysisResult.skillCoverage.missing.length} skills</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Skills Lists */}
                <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border/50">
                  {analysisResult.skillCoverage.matched.map(s => <Badge key={s} variant="success">{s}</Badge>)}
                  {analysisResult.skillCoverage.missing.map(s => <Badge key={s} variant="danger">{s}</Badge>)}
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Skill Radar */}
            <div className="grid md:grid-cols-2 gap-6"><Card variant="glass"><CardHeader><CardTitle className="text-emerald-400"><CheckCircle className="h-5 w-5" /> Your Skills</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{analysisResult.skillsBreakdown.technical.map(s => <Badge key={s} variant="success">{s}</Badge>)}</CardContent></Card><Card variant="glass"><CardHeader><CardTitle className="text-red-400"><XCircle className="h-5 w-5" /> Missing Skills</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{analysisResult.skillCoverage.missing.map(s => <Badge key={s} variant="danger">{s}</Badge>)}</CardContent></Card></div>

            {/* Section 6: Gap Insights */}
            <Card variant="glass"><CardHeader><CardTitle><AlertCircle className="h-5 w-5" /> Gap Insights</CardTitle></CardHeader><CardContent className="space-y-4">{analysisResult.gapInsights.map((g, i) => <div key={i} className="glass-card p-4 rounded-xl"><h4 className="font-semibold text-white">{g.skill}</h4><p className="text-sm text-text-secondary">{g.whyItMatters}</p><Badge className={getPriorityColor(g.priority)}>{g.priority}</Badge></div>)}</CardContent></Card>

            {/* Section 7: Roadmap */}
            <Card variant="glass"><CardHeader><CardTitle><Map className="h-5 w-5" /> Roadmap</CardTitle></CardHeader><CardContent className="space-y-4">{analysisResult.roadmap.map((p, i) => <div key={i} className="glass-card p-4 rounded-xl border-l-4 border-primary"><Badge className="bg-primary/20 text-primary">Phase {p.phase}</Badge><h4 className="font-semibold text-white mt-2">{p.name}</h4><p className="text-sm text-text-secondary">{p.description}</p><div className="flex flex-wrap gap-2 mt-2">{p.skills.map(s => <Badge key={s} variant="outline">{s}</Badge>)}</div></div>)}</CardContent></Card>

            {/* Section 8: Projects */}
            <Card variant="glass"><CardHeader><CardTitle><Rocket className="h-5 w-5" /> Projects</CardTitle></CardHeader><CardContent className="space-y-4">{analysisResult.projectRecommendations.map((p, i) => <div key={i} className="glass-card p-4 rounded-xl"><h4 className="font-semibold text-white">{p.title}</h4><p className="text-sm text-text-secondary">{p.description}</p><div className="flex gap-2 mt-2"><Badge>{p.difficulty}</Badge><span className="text-xs text-text-tertiary">{p.estimatedDuration}</span></div></div>)}</CardContent></Card>

            {/* Section 9: Courses */}
            <Card variant="glass"><CardHeader><CardTitle><BookOpen className="h-5 w-5" /> Courses</CardTitle></CardHeader><CardContent className="space-y-4">{analysisResult.courseRecommendations.map((c, i) => <div key={i} className="glass-card p-4 rounded-xl flex justify-between"><div><h4 className="font-semibold text-white">{c.title}</h4><p className="text-sm text-text-tertiary">{c.platform} • {c.duration}</p></div><Badge>{c.difficulty}</Badge></div>)}</CardContent></Card>

            {/* Section 10: Export */}
            <Card variant="glass"><CardHeader><CardTitle><Share2 className="h-5 w-5" /> Export</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-4"><Button><Download className="w-4 h-4 mr-2" /> PDF</Button><Button variant="secondary"><Save className="w-4 h-4 mr-2" /> Save</Button><Button variant="outline" onClick={() => { setAnalysisResult(null); setFiles([]); }}><RefreshCw className="w-4 h-4 mr-2" /> New Analysis</Button></CardContent></Card>

          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}