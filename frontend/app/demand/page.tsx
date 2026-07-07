"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  MapPin,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from "recharts";

interface SkillDemand {
  id: string;
  name: string;
  demandScore: number;
  trend: "rising" | "stable" | "falling";
  changePercent: number;
  jobPostings: number;
  topCompanies: string[];
  topLocations: string[];
  avgSalary: string;
  source: string;
}

export default function DemandPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<SkillDemand[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      // Mock data (replace with actual Firestore fetch)
      const mockSkills: SkillDemand[] = [
        {
          id: "1",
          name: "GenAI / LLM Engineering",
          demandScore: 95,
          trend: "rising",
          changePercent: 340,
          jobPostings: 45000,
          topCompanies: ["Microsoft", "Google", "OpenAI", "Anthropic"],
          topLocations: ["Bangalore", "Hyderabad", "Pune", "Gurgaon"],
          avgSalary: "₹18-45 LPA",
          source: "LinkedIn 2026",
        },
        {
          id: "2",
          name: "MLOps",
          demandScore: 88,
          trend: "rising",
          changePercent: 280,
          jobPostings: 32000,
          topCompanies: ["Amazon", "Netflix", "Uber", "Flipkart"],
          topLocations: ["Bangalore", "Chennai", "Hyderabad"],
          avgSalary: "₹15-38 LPA",
          source: "NASSCOM 2026",
        },
        {
          id: "3",
          name: "Cloud Architecture (AWS/Azure)",
          demandScore: 85,
          trend: "rising",
          changePercent: 160,
          jobPostings: 58000,
          topCompanies: ["AWS", "Azure", "GCP", "Infosys"],
          topLocations: ["Bangalore", "Gurgaon", "Mumbai"],
          avgSalary: "₹12-32 LPA",
          source: "AICTE Report",
        },
        {
          id: "4",
          name: "Advanced DSA & System Design",
          demandScore: 82,
          trend: "stable",
          changePercent: 15,
          jobPostings: 72000,
          topCompanies: ["Google", "Microsoft", "Amazon", "Meta"],
          topLocations: ["Bangalore", "Hyderabad", "Pune"],
          avgSalary: "₹15-40 LPA",
          source: "Glassdoor 2026",
        },
        {
          id: "5",
          name: "Data Engineering",
          demandScore: 79,
          trend: "rising",
          changePercent: 175,
          jobPostings: 41000,
          topCompanies: ["Databricks", "Snowflake", "Google", "Amazon"],
          topLocations: ["Bangalore", "Hyderabad", "Chennai"],
          avgSalary: "₹14-35 LPA",
          source: "LinkedIn 2026",
        },
        {
          id: "6",
          name: "AI Security",
          demandScore: 76,
          trend: "rising",
          changePercent: 220,
          jobPostings: 18000,
          topCompanies: ["NVIDIA", "CrowdStrike", "Palantir", "Microsoft"],
          topLocations: ["Bangalore", "Gurgaon", "Pune"],
          avgSalary: "₹18-42 LPA",
          source: "OECD AI Policy",
        },
        {
          id: "7",
          name: "Prompt Engineering",
          demandScore: 73,
          trend: "rising",
          changePercent: 190,
          jobPostings: 28000,
          topCompanies: ["OpenAI", "Anthropic", "Google", "Startups"],
          topLocations: ["Bangalore", "Remote", "Hyderabad"],
          avgSalary: "₹10-28 LPA",
          source: "FutureSkills Prime",
        },
        {
          id: "8",
          name: "Cybersecurity",
          demandScore: 71,
          trend: "stable",
          changePercent: 45,
          jobPostings: 38000,
          topCompanies: ["Quick Heal", "K7", "IBM Security", "Palo Alto"],
          topLocations: ["Bangalore", "Pune", "Chennai"],
          avgSalary: "₹10-30 LPA",
          source: "NASSCOM Security",
        },
        {
          id: "9",
          name: "DevOps",
          demandScore: 69,
          trend: "stable",
          changePercent: 35,
          jobPostings: 52000,
          topCompanies: ["Amazon", "Microsoft", "Atlassian", "Zoho"],
          topLocations: ["Bangalore", "Chennai", "Pune"],
          avgSalary: "₹10-28 LPA",
          source: "LinkedIn 2026",
        },
        {
          id: "10",
          name: "Full Stack Development",
          demandScore: 67,
          trend: "falling",
          changePercent: -12,
          jobPostings: 89000,
          topCompanies: ["TCS", "Infosys", "Wipro", "Startups"],
          topLocations: ["Bangalore", "Chennai", "Hyderabad"],
          avgSalary: "₹6-20 LPA",
          source: "Glassdoor 2026",
        },
      ];

      setSkills(mockSkills);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const filteredSkills = skills.filter((skill) => {
    const matchesLocation =
      selectedLocation === "all" ||
      skill.topLocations.some((loc) => loc.toLowerCase().includes(selectedLocation.toLowerCase()));
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  const getTrendIcon = (trend: string) => {
    if (trend === "rising") return <ArrowUpRight className="h-4 w-4 text-success" />;
    if (trend === "falling") return <ArrowDownRight className="h-4 w-4 text-danger" />;
    return <span className="h-4 w-4 text-text-tertiary">-</span>;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading demand data...</p>
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
          <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
            Current Skill Demand
          </h1>
          <p className="text-text-secondary">
            Real-time analysis of what companies are hiring for right now
          </p>
        </div>

        {/* Filters */}
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <Search className="h-4 w-4 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-surface border border-border rounded-lg px-4 py-2 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-text-tertiary" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-surface border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none"
                >
                  <option value="all">All Locations</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="chennai">Chennai</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="pune">Pune</option>
                  <option value="gurgaon">Gurgaon</option>
                  <option value="mumbai">Mumbai</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section - Professional */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart - Demand Score */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Skills Demand Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredSkills.slice(0, 8)} layout="vertical" margin={{ left: 20, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" domain={[0, 100]} stroke="#666" />
                  <YAxis type="category" dataKey="name" stroke="#666" width={120} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="demandScore" fill="#ff0033" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Area Chart - Growth Trends */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-success" />
                Growth Trends (%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={filteredSkills.slice(0, 8)} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E676" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00E676" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 10, transform: 'rotate(-45)' }} textAnchor="end" height={80} />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="changePercent" stroke="#00E676" fillOpacity={1} fill="url(#colorGrowth)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Job Postings & Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Postings Comparison */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-500" />
                Job Postings Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredSkills.slice(0, 6)} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px' }}
                  />
                  <Bar dataKey="jobPostings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Demand Distribution Pie Chart */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-500" />
                Demand Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={filteredSkills.slice(0, 6).map(s => ({
                      name: s.name,
                      value: s.demandScore,
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {filteredSkills.slice(0, 6).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.demandScore >= 80 ? '#ff0033' : entry.demandScore >= 60 ? '#FFD600' : '#00E676'}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px' }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Skills List */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Skills by Demand Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-48 text-text-primary font-semibold truncate">{skill.name}</div>
                    <div className="flex-1 h-6 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          skill.demandScore >= 80
                            ? "bg-gradient-primary"
                            : skill.demandScore >= 60
                            ? "bg-warning"
                            : "bg-border"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.demandScore}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                      />
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-text-primary font-bold">{skill.demandScore}</span>
                    </div>
                    <div className="w-20 flex items-center justify-end gap-1">
                      {getTrendIcon(skill.trend)}
                      <span
                        className={`text-xs font-medium ${
                          skill.trend === "rising"
                            ? "text-success"
                            : skill.trend === "falling"
                            ? "text-danger"
                            : "text-text-tertiary"
                        }`}
                      >
                        {skill.changePercent > 0 ? "+" : ""}
                        {skill.changePercent}%
                      </span>
                    </div>
                  </div>

                  {/* Expanded Details on Hover */}
                  <div className="ml-52 p-3 bg-surface/50 rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1 text-text-tertiary">
                        <Briefcase className="h-3 w-3" />
                        {(skill.jobPostings / 1000).toFixed(0)}K jobs
                      </div>
                      <div className="flex items-center gap-1 text-text-tertiary">
                        <MapPin className="h-3 w-3" />
                        {skill.topLocations.slice(0, 3).join(", ")}
                      </div>
                      <div className="text-text-primary font-medium">{skill.avgSalary}</div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {skill.topCompanies.slice(0, 5).map((company) => (
                        <Badge key={company} variant="secondary" size="sm">
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

        {/* Regional Demand */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Regional Demand Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  city: "Bangalore",
                  topSkill: "GenAI",
                  demand: 95,
                  jobs: "28K",
                  growth: "+45%",
                },
                {
                  city: "Chennai",
                  topSkill: "Cloud",
                  demand: 82,
                  jobs: "15K",
                  growth: "+32%",
                },
                {
                  city: "Hyderabad",
                  topSkill: "ML",
                  demand: 88,
                  jobs: "22K",
                  growth: "+38%",
                },
                {
                  city: "Pune",
                  topSkill: "DevOps",
                  demand: 79,
                  jobs: "12K",
                  growth: "+28%",
                },
                {
                  city: "Gurgaon",
                  topSkill: "Data Eng",
                  demand: 84,
                  jobs: "18K",
                  growth: "+42%",
                },
                {
                  city: "Mumbai",
                  topSkill: "FinTech AI",
                  demand: 76,
                  jobs: "10K",
                  growth: "+25%",
                },
              ].map((region) => (
                <div
                  key={region.city}
                  className="glass-card p-6 hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-text-primary">{region.city}</h3>
                    <Badge variant={region.demand >= 85 ? "danger" : region.demand >= 75 ? "warning" : "primary"}>
                      {region.demand} Score
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-tertiary">Top Skill</span>
                      <span className="text-text-primary font-medium">{region.topSkill}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-tertiary">Open Jobs</span>
                      <span className="text-text-primary font-medium">{region.jobs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-tertiary">Growth</span>
                      <span className="text-success font-medium">{region.growth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trending This Week */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-success" />
              🔥 Trending Skills This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { skill: "o3-mini Integration", change: "+180%", source: "TechCrunch" },
                { skill: "Agentic AI", change: "+145%", source: "NASSCOM" },
                { skill: "AI Governance", change: "+92%", source: "OECD" },
                { skill: "Multimodal AI", change: "+88%", source: "LinkedIn" },
              ].map((trend) => (
                <div
                  key={trend.skill}
                  className="p-4 bg-surface/50 rounded-lg border border-border hover:border-success/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-text-primary font-medium">{trend.skill}</h4>
                    <span className="text-success font-bold text-sm">{trend.change}</span>
                  </div>
                  <p className="text-text-tertiary text-xs">Spiking on {trend.source}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
