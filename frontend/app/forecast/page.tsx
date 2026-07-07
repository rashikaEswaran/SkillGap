"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Brain,
  Shield,
  Cloud,
  Code,
  Cpu,
  Lock,
  Zap,
} from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const emergingRoles = [
  {
    title: "AI Governance Engineer",
    description: "Ensures AI systems comply with regulations and ethical guidelines",
    skills: ["AI Ethics", "Compliance", "Risk Assessment", "Policy Design"],
    companies: ["Microsoft", "Google", "Government Agencies"],
    source: "WEF Future of Jobs 2025",
    icon: Shield,
  },
  {
    title: "Agentic Systems Architect",
    description: "Designs autonomous AI agent systems for enterprise workflows",
    skills: ["Agentic AI", "Multi-Agent Systems", "Orchestration", "LLM Integration"],
    companies: ["OpenAI", "Anthropic", "Startups"],
    source: "LinkedIn Economic Graph 2026",
    icon: Brain,
  },
  {
    title: "AI Security Specialist",
    description: "Protects AI systems from adversarial attacks and data poisoning",
    skills: ["AI Security", "Adversarial ML", "Cryptography", "Threat Detection"],
    companies: ["NVIDIA", "CrowdStrike", "Palantir"],
    source: "OECD AI Policy 2025",
    icon: Lock,
  },
  {
    title: "Multimodal AI Engineer",
    description: "Builds AI systems that process text, images, audio, and video together",
    skills: ["Computer Vision", "NLP", "Audio Processing", "Transformer Architecture"],
    companies: ["Meta", "Apple", "Adobe"],
    source: "NASSCOM Tech Report 2026",
    icon: Cpu,
  },
  {
    title: "AI Infrastructure Engineer",
    description: "Builds and scales infrastructure for training and deploying AI models",
    skills: ["Kubernetes", "GPU Clusters", "MLOps", "Distributed Systems"],
    companies: ["AWS", "Google Cloud", "Azure"],
    source: "LinkedIn Hiring Data 2026",
    icon: Cloud,
  },
  {
    title: "Synthetic Data Engineer",
    description: "Creates artificial training data for AI model development",
    skills: ["Data Generation", "Privacy-Preserving ML", "Simulation", "Statistical Modeling"],
    companies: ["Tesla", "Waymo", "Healthcare AI"],
    source: "MIT Tech Review 2026",
    icon: Zap,
  },
];

const skillForecast = [
  { skill: "Agentic AI", growth: 340, current: 25, future: 85 },
  { skill: "MLOps", growth: 280, current: 40, future: 90 },
  { skill: "AI Security", growth: 220, current: 20, future: 75 },
  { skill: "Prompt Engineering", growth: 190, current: 35, future: 80 },
  { skill: "Data Engineering", growth: 175, current: 55, future: 88 },
  { skill: "Cloud Architecture", growth: 160, current: 60, future: 92 },
  { skill: "LLM Fine-tuning", growth: 250, current: 15, future: 70 },
  { skill: "AI Ethics & Governance", growth: 140, current: 30, future: 65 },
];

export default function ForecastPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2026);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading forecast data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
                Future Workforce Forecast
              </h1>
              <p className="text-text-secondary">
                Skills and roles the world will hire for in 2026–2030
              </p>
            </div>
            <div className="flex items-center gap-2">
              {[2026, 2027, 2028, 2029, 2030].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedYear === year
                      ? "bg-gradient-primary text-white"
                      : "bg-surface text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Skill Demand Growth Projection (2026 → 2030)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillForecast.map((item, i) => (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-40 text-text-primary font-medium truncate">{item.skill}</div>
                  <div className="flex-1 relative h-6 bg-surface rounded-full overflow-hidden">
                    {/* Current demand */}
                    <div
                      className="absolute inset-y-0 left-0 bg-border"
                      style={{ width: `${item.current}%` }}
                    />
                    {/* Future demand */}
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-primary"
                      initial={{ width: `${item.current}%` }}
                      animate={{ width: `${item.future}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                  <div className="w-28 text-right">
                    <span className="text-danger font-bold text-lg">{item.growth}%</span>
                    <span className="text-text-tertiary text-xs ml-1">growth</span>
                  </div>
                  <div className="w-16 text-right">
                    <Badge variant={item.growth >= 200 ? "danger" : item.growth >= 150 ? "warning" : "info"}>
                      {item.future}%
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-6 text-sm text-text-tertiary">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-border rounded" />
                <span>Current Demand (2026)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-primary rounded" />
                <span>Projected Demand ({selectedYear})</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emerging Roles */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Emerging Roles by 2030
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergingRoles.map((role, i) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary/20 rounded-lg text-primary">
                      <role.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-text-primary">{role.title}</h3>
                      <p className="text-text-tertiary text-xs">{role.source}</p>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm mb-4">{role.description}</p>
                  <div className="mb-4">
                    <p className="text-text-tertiary text-xs mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {role.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-text-tertiary text-xs mb-2">Expected Hiring:</p>
                    <div className="flex flex-wrap gap-1">
                      {role.companies.map((company) => (
                        <Badge key={company} variant="primary" size="sm">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Heatmap */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Skill Heatmap (2026–2030)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-text-secondary font-medium">Skill</th>
                    <th className="text-center p-4 text-text-secondary font-medium">2026</th>
                    <th className="text-center p-4 text-text-secondary font-medium">2027</th>
                    <th className="text-center p-4 text-text-secondary font-medium">2028</th>
                    <th className="text-center p-4 text-text-secondary font-medium">2029</th>
                    <th className="text-center p-4 text-text-secondary font-medium">2030</th>
                  </tr>
                </thead>
                <tbody>
                  {skillForecast.map((skill) => (
                    <tr key={skill.skill} className="border-b border-border/50">
                      <td className="p-4 text-text-primary font-medium">{skill.skill}</td>
                      {[skill.current, ...Array.from({ length: 4 }, (_, i) =>
                        Math.min(skill.current + (skill.future - skill.current) * ((i + 1) / 5), skill.future)
                      )].map((value, i) => (
                        <td key={i} className="p-2 text-center">
                          <div
                            className={`w-full h-8 rounded flex items-center justify-center text-xs font-medium transition-all ${
                              value >= 80
                                ? "bg-danger/20 text-danger"
                                : value >= 60
                                ? "bg-warning/20 text-warning"
                                : value >= 40
                                ? "bg-primary/20 text-primary"
                                : "bg-surface text-text-tertiary"
                            }`}
                          >
                            {Math.round(value)}%
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-primary" />
              Key Insights from WEF Future of Jobs 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "50% of workers need reskilling",
                  description: "By 2030, half of all workers will need significant reskilling due to AI automation.",
                  source: "OECD Skills Outlook",
                },
                {
                  title: "AI creates more jobs than it displaces",
                  description: "85 million jobs displaced, 97 million new AI-related roles created globally.",
                  source: "WEF Report 2025",
                },
                {
                  title: "Tech skills half-life is 2.5 years",
                  description: "Technical skills become obsolete every 2.5 years. Continuous learning is mandatory.",
                  source: "LinkedIn Learning Report",
                },
                {
                  title: "India to be top AI talent hub",
                  description: "India projected to supply 30% of global AI/ML workforce by 2030.",
                  source: "NASSCOM Future of Work",
                },
              ].map((insight, i) => (
                <div key={i} className="glass-card p-6">
                  <h3 className="font-display font-bold text-text-primary mb-2">{insight.title}</h3>
                  <p className="text-text-secondary text-sm mb-3">{insight.description}</p>
                  <p className="text-text-tertiary text-xs">Source: {insight.source}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}