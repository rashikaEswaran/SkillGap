"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  TrendingUp,
  Briefcase,
  Search,
  Globe,
  Zap,
  Target,
  Building2,
  MapPin,
  ExternalLink,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Layers,
  RefreshCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Types
interface Skill {
  name: string;
  demand: number;
  source: string;
  sourceUrl?: string;
  category: string;
}

interface AnalysisResult {
  skills: Skill[];
  summary: string;
  query: string;
  method?: string;
}

interface JobData {
  title: string;
  company: string;
  location: string;
  source_url: string;
  posted: string;
}

export default function LiveAnalysisPage() {
  const router = useRouter();
  const [query, setQuery] = useState("Artificial Intelligence");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [error, setError] = useState("");
  const [slmStatus, setSlmStatus] = useState<"connected" | "disconnected" | "checking">("checking");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Check SLM status on mount
  useEffect(() => {
    checkSlmStatus();
  }, []);

  const checkSlmStatus = async () => {
    try {
      const res = await fetch("/api/slm/analyze", { method: "GET" });
      if (res.ok) {
        setSlmStatus("connected");
      } else {
        setSlmStatus("disconnected");
      }
    } catch {
      setSlmStatus("disconnected");
    }
  };

  const handleAnalyze = async () => {
    if (!query.trim()) return;

    setAnalyzing(true);
    setError("");
    setResults(null);
    setJobs([]);

    try {
      const res = await fetch("/api/slm/analyze", {
        method: "POST",
        body: JSON.stringify({ query, type: "analyze" }),
      });

      if (!res.ok) {
        throw new Error("Analysis failed");
      }

      const data = await res.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.error || "Analysis failed");
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to SLM server");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFetchJobs = async () => {
    if (!results?.skills?.length) return;

    setLoadingJobs(true);
    try {
      const res = await fetch("/api/slm/jobs", {
        method: "POST",
        body: JSON.stringify({
          skill: results.query,
          platforms: ["linkedin", "naukri", "indeed"],
          limit: 12,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setJobs(data.data.jobs || []);
      }
    } catch (err) {
      console.error("Job fetch error:", err);
    } finally {
      setLoadingJobs(false);
    }
  };

  const getDemandColor = (demand: number) => {
    if (demand >= 85) return "text-red-500 bg-red-500/10 border-red-500/30";
    if (demand >= 70) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
    return "text-green-500 bg-green-500/10 border-green-500/30";
  };

  const quickQueries = [
    "Generative AI",
    "Data Science",
    "Cloud Computing",
    "Cybersecurity",
    "MLOps",
    "Full Stack Development",
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pt-8 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <Brain className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">
              Live Industry Analysis
            </h1>
          </div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            AI-powered real-time skill trend analysis using Small Language Models
          </p>

          {/* SLM Status Badge */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={`w-2 h-2 rounded-full ${
              slmStatus === "connected" ? "bg-green-500" : "bg-red-500"
            }`} />
            <span className="text-xs text-text-tertiary uppercase tracking-wider">
              SLM Agent: {slmStatus === "connected" ? "Online" : "Offline"}
            </span>
          </div>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Card variant="glass-pro" glow>
            <CardContent className="p-6">
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    placeholder="Enter skill, role, or technology..."
                    className="w-full pl-12 pr-4 py-4 bg-[#0f0f0f]/80 border border-white/10 rounded-xl text-white placeholder:text-text-tertiary focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_30px_rgba(255,0,51,0.3)] transition-all"
                  />
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={analyzing || !query.trim()}
                  glow
                  className="px-8"
                >
                  {analyzing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>

              {/* Quick Queries */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-text-tertiary mr-2">Quick:</span>
                {quickQueries.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuery(q)}
                    className="px-3 py-1.5 bg-glass-bg border border-glass-border rounded-lg text-xs text-text-secondary hover:text-white hover:border-red-500/30 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl mx-auto"
            >
              <Card variant="glass" className="border-red-500/30">
                <CardContent className="p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-400">{error}</span>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {analyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <Card variant="glass-pro">
                <CardContent className="p-8 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full mx-auto mb-4"
                  />
                  <p className="text-text-secondary text-sm uppercase tracking-widest">
                    🤔 SLM Agent is analyzing...
                  </p>
                  <p className="text-text-tertiary text-xs mt-2">
                    Searching the web • Extracting insights • Generating report
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Summary Card */}
              <motion.div variants={itemVariants}>
                <Card variant="glass-pro" glow>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-red-500" />
                      </div>
                      <span>Analysis: {results.query}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-secondary">{results.summary}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <Badge variant="secondary">
                        <Globe className="w-3 h-3 mr-1" />
                        {results.skills?.length || 0} skills found
                      </Badge>
                      <Badge variant="secondary">
                        <Layers className="w-3 h-3 mr-1" />
                        {results.method || "SLM Agent"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skills Grid */}
              <motion.div variants={itemVariants}>
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Target className="w-5 h-5 text-green-500" />
                      </div>
                      <span>Top Skills in Demand</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {results.skills?.map((skill, i) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.02, y: -4 }}
                          className="group relative bg-[#0f0f0f]/80 rounded-xl border border-white/5 hover:border-red-500/30 transition-all overflow-hidden cursor-pointer"
                          onClick={() => skill.sourceUrl && window.open(skill.sourceUrl, "_blank")}
                        >
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-text-primary group-hover:text-red-500 transition-colors">
                                {skill.name}
                              </h4>
                              <span
                                className={`px-2 py-1 rounded-lg text-xs font-bold ${getDemandColor(
                                  skill.demand
                                )}`}
                              >
                                {skill.demand}%
                              </span>
                            </div>

                            <div className="space-y-1 text-xs text-text-tertiary">
                              <div className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                <span>{skill.category || "General"}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                <span className="truncate">{skill.source}</span>
                              </div>
                            </div>
                          </div>

                          {/* Demand Bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.demand}%` }}
                              transition={{ delay: i * 0.1 }}
                              className={`h-full ${
                                skill.demand >= 85
                                  ? "bg-red-500"
                                  : skill.demand >= 70
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Fetch Jobs Button */}
              <motion.div variants={itemVariants} className="text-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleFetchJobs}
                  disabled={loadingJobs}
                  className="gap-2"
                >
                  {loadingJobs ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Briefcase className="w-5 h-5" />
                      Fetch Live Jobs
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Jobs Section */}
              {jobs.length > 0 && (
                <motion.div variants={itemVariants}>
                  <Card variant="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Briefcase className="w-5 h-5 text-purple-500" />
                        </div>
                        <span>Live Job Openings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {jobs.map((job, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ x: 4 }}
                            className="p-4 bg-[#0f0f0f]/50 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer"
                            onClick={() => window.open(job.source_url, "_blank")}
                          >
                            <h4 className="font-semibold text-text-primary mb-2">
                              {job.title}
                            </h4>
                            <div className="space-y-1 text-xs text-text-tertiary">
                              <div className="flex items-center gap-2">
                                <Building2 className="w-3 h-3" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ExternalLink className="w-3 h-3" />
                                <span>{job.posted}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        {!results && !analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Globe,
                title: "Live Web Search",
                description: "Fetches real-time data from industry sources",
                color: "red",
              },
              {
                icon: Brain,
                title: "SLM Analysis",
                description: "Phi-3 AI model extracts and ranks skills",
                color: "purple",
              },
              {
                icon: BarChart3,
                title: "Gap Detection",
                description: "Compare curriculum with industry demands",
                color: "green",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card variant="glass-pro" glow>
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-3 bg-${feature.color}-500/20 rounded-xl mb-4`}>
                      <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-text-secondary text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}