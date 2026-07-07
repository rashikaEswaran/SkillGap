"use client";

import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, orderBy, limit, getDocs, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Briefcase,
  Award,
  Target,
  ArrowRight,
  Download,
  ExternalLink,
} from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AnalysisResult {
  coverage: number;
  readinessScore: number;
  taughtSkills: string[];
  missingSkills: {
    skill: string;
    demand: number;
    source: string;
    sourceUrl: string;
    priority: "critical" | "high" | "medium" | "low";
  }[];
  companyReadiness: {
    company: string;
    readiness: number;
    missingSkills: string[];
    proof: {
      source: string;
      text: string;
      url: string;
    };
  }[];
  recommendations: {
    skill: string;
    why: string;
    impact: string;
    resources: { type: string; title: string; url: string }[];
  }[];
}

const FILE_TYPES = {
  resume: "Resume",
  syllabus: "Syllabus/Curriculum",
  projects: "Projects",
  certificates: "Certificates",
  experience: "Experience Letters",
  achievements: "Achievements/Awards",
};

const TARGET_ROLES = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Data Engineer",
  "Cloud Engineer",
  "Full Stack Developer",
  "MLOps Engineer",
  "AI Research Scientist",
  "Cybersecurity Analyst",
  "DevOps Engineer",
  "Software Development Engineer",
  "Backend Developer",
  "Frontend Developer",
  "Platform Engineer",
  "Research Scientist",
];

export default function GapAnalysisPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  type FileUploadMap = {
    resume: File | null;
    syllabus: File | null;
    projects: File | null;
    certificates: File | null;
  };

  const [files, setFiles] = useState<FileUploadMap>({
    resume: null,
    syllabus: null,
    projects: null,
    certificates: null,
  });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

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

  const handleFileUpload = useCallback((type: keyof FileUploadMap, file: File | null) => {
    setFiles((prev) => ({ ...prev, [type]: file }));
  }, []);

  const handleAnalyze = async () => {
    if (!selectedRole) {
      alert("Please select your target role");
      return;
    }

    const hasFile = Object.values(files).some((f) => f !== null);
    if (!hasFile) {
      alert("Please upload at least one document");
      return;
    }

    setAnalyzing(true);

    try {
      // Extract text from uploaded files
      const extractedText = await extractTextFromFiles(files);

      // Build the context with role and extracted text
      const analysisText = `
Target Role: ${selectedRole}

${extractedText}

Analyze this candidate's profile for ${selectedRole} role. Extract skills from their resume/syllabus/projects and identify gaps vs industry standards.
      `.trim();

      // Call REAL AI Analysis API (Gemini)
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: analysisText,
          role: selectedRole,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();
      const analysisResult: AnalysisResult = result.data;

      setAnalysisResult(analysisResult);

      // Save to Firestore
      try {
        await addDoc(collection(db, "gapAnalyses"), {
          userId: user?.uid,
          role: selectedRole,
          ...analysisResult,
          createdAt: new Date(),
        });
      } catch (error) {
        console.error("Error saving analysis:", error);
      }

    } catch (error: any) {
      console.error("Analysis error:", error);
      alert(`Analysis failed: ${error.message}. Please try again.`);
    } finally {
      setAnalyzing(false);
    }
  };

  // Helper function to extract text from files
  const extractTextFromFiles = async (files: FileUploadMap): Promise<string> => {
    const textParts: string[] = [];

    for (const [type, file] of Object.entries(files)) {
      if (!file) continue;

      try {
        const text = await readFileAsText(file);
        textParts.push(`=== ${type.toUpperCase()} ===\n${text}`);
      } catch (error) {
        console.error(`Failed to read ${type}:`, error);
      }
    }

    return textParts.join('\n\n');
  };

  // Read file as text (for PDF/DOCX, this is a simplified version)
  const readFileAsText = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // For text-based files
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string || '');
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        // For PDF, we'll send a simplified version
        // In production, use pdfjs-dist or send to backend for proper parsing
        resolve(`PDF Document: ${file.name}\n[PDF content analysis requires server-side processing - using metadata for now]\nFile: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB`);
      } else {
        // For other files (docx, etc.), send metadata
        resolve(`Document: ${file.name}\nType: ${file.type || 'unknown'}\nSize: ${(file.size / 1024).toFixed(1)} KB\n[Candidate uploaded this document demonstrating their skills]`);
      }
    });
  };

  const FileUploadCard = ({ type, file }: { type: keyof FileUploadMap; file: File | null }) => (
    <Card variant="glass" className="cursor-pointer hover:border-primary/40">
      <CardContent className="p-6">
        <label className="flex flex-col items-center justify-center h-40 cursor-pointer">
          {file ? (
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
              <p className="text-text-primary font-semibold">{file.name}</p>
              <p className="text-text-tertiary text-sm">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-text-tertiary mb-3" />
              <p className="text-text-secondary font-medium">{FILE_TYPES[type]}</p>
              <p className="text-text-tertiary text-sm mt-1">Drag & Drop or Click</p>
              <p className="text-text-tertiary text-xs mt-2">PDF, DOCX, ZIP</p>
            </>
          )}
          <input
            type="file"
            accept=".pdf,.docx,.doc,.xlsx,.zip,.png,.jpg"
            onChange={(e) => handleFileUpload(type, e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading...</p>
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
            Skill Gap Analysis
          </h1>
          <p className="text-text-secondary">
            Upload your documents and discover your industry readiness with proof-backed insights
          </p>
        </div>

        {!analysisResult ? (
          <>
            {/* Upload Section - Left Side */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Your Documents (Any Format Supported)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(FILE_TYPES).map(([key, label]) => (
                    <FileUploadCard
                      key={key}
                      type={key as keyof FileUploadMap}
                      file={files[key as keyof FileUploadMap]}
                    />
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <p className="text-text-tertiary text-sm">
                    📎 Supported: PDF, DOCX, DOC, XLSX, ZIP, PNG, JPG - Any document type
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Target Role - Right Side */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Select Your Target Role
                </CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="">Choose a role...</option>
                  {TARGET_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>

                <div className="mt-6 flex justify-center">
                  <Button
                    size="lg"
                    onClick={handleAnalyze}
                    disabled={analyzing || !selectedRole}
                    rightIcon={!analyzing && <ArrowRight className="w-5 h-5" />}
                  >
                    {analyzing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing with AI...
                      </>
                    ) : (
                      "Analyze Now"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <AnimatePresence>
            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Readiness Score */}
              <Card variant="glass">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center gap-12">
                    <div className="relative w-48 h-48">
                      <svg className="w-48 h-48 transform -rotate-90">
                        <circle cx="96" cy="96" r="80" stroke="#1E1E2E" strokeWidth="16" fill="none" />
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          stroke={analysisResult.readinessScore >= 70 ? "#00E676" : analysisResult.readinessScore >= 50 ? "#FFD600" : "#FF6B6B"}
                          strokeWidth="16"
                          fill="none"
                          strokeDasharray={`${(analysisResult.readinessScore / 100) * 502} 502`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-5xl font-bold gradient-text">{analysisResult.readinessScore}%</span>
                        <span className="text-text-tertiary text-sm">Industry Ready</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="font-display text-2xl font-bold text-text-primary">
                        {selectedRole}
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-text-tertiary text-sm">Skills Matched</p>
                          <p className="text-2xl font-bold text-success">{analysisResult.taughtSkills.length}</p>
                        </div>
                        <div>
                          <p className="text-text-tertiary text-sm">Skills Missing</p>
                          <p className="text-2xl font-bold text-danger">{analysisResult.missingSkills.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Breakdown */}
              <div className="grid lg:grid-cols-3 gap-6">
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-success">
                      <CheckCircle className="h-5 w-5" />
                      Strong Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.taughtSkills.map((skill) => (
                        <Badge key={skill} variant="success">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card variant="glass" className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-danger">
                      <XCircle className="h-5 w-5" />
                      Critical Skill Gaps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.missingSkills.map((gap, i) => (
                        <motion.div
                          key={gap.skill}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center justify-between p-4 bg-surface/50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-semibold text-text-primary">{gap.skill}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant={gap.priority === "critical" ? "danger" : gap.priority === "high" ? "warning" : "info"}
                                size="sm"
                              >
                                {gap.priority.toUpperCase()}
                              </Badge>
                              <span className="text-text-tertiary text-sm">{gap.source}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-danger font-bold">{gap.demand}% Demand</p>
                            <a href={gap.sourceUrl} target="_blank" className="text-primary text-sm hover:underline">
                              Proof →
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Company-Wise Readiness */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Your Readiness Across Top Companies ({selectedRole})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {analysisResult.companyReadiness.map((company, i) => (
                      <motion.div
                        key={company.company}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border border-border rounded-lg p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-display text-xl font-bold text-text-primary">
                              {company.company}
                            </h3>
                            <div className="flex gap-2 mt-2">
                              {company.missingSkills.slice(0, 3).map((skill) => (
                                <Badge key={skill} variant="danger" size="sm">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold gradient-text">{company.readiness}%</p>
                            <p className="text-text-tertiary text-sm">Readiness</p>
                          </div>
                        </div>

                        {/* Proof Panel */}
                        <div className="bg-surface/50 rounded-lg p-4 border-l-4 border-primary">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="text-text-secondary text-sm font-medium">{company.proof.source}</p>
                              <p className="text-text-tertiary text-sm mt-1">{company.proof.text}</p>
                              <a
                                href={company.proof.url}
                                target="_blank"
                                className="text-primary text-sm hover:underline inline-flex items-center gap-1 mt-2"
                              >
                                View Original <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    AI Career Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {analysisResult.recommendations.map((rec, i) => (
                      <motion.div
                        key={rec.skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-display text-xl font-bold text-text-primary">
                              Learn: {rec.skill}
                            </h3>
                            <p className="text-text-secondary mt-2">{rec.why}</p>
                            <p className="text-primary font-semibold mt-2">{rec.impact}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-text-tertiary text-sm mb-3">Recommended Resources:</p>
                          <div className="flex flex-wrap gap-2">
                            {rec.resources.map((resource) => (
                              <a
                                key={resource.title}
                                href={resource.url}
                                target="_blank"
                                className="inline-flex items-center gap-1 px-3 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-primary hover:border-primary/40 transition-all text-sm"
                              >
                                {resource.type === "Course" && <BookOpen className="h-4 w-4" />}
                                {resource.type === "Practice" && <Target className="h-4 w-4" />}
                                {resource.type === "Video" && <FileText className="h-4 w-4" />}
                                {resource.type === "Cert" && <Award className="h-4 w-4" />}
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Button size="lg" variant="primary" rightIcon={<Download className="w-5 h-5" />}>
                  Download PDF Report
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    setAnalysisResult(null);
                    setFiles({ resume: null, syllabus: null, projects: null, certificates: null });
                  }}
                >
                  Analyze Another
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </DashboardLayout>
  );
}

// Missing icon import
function BookOpen({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}