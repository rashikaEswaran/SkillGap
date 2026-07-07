"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  Activity,
  TrendingUp,
  Award,
  Target,
  Calendar,
  CheckCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function PerformancePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  // Mock performance data
  const performanceData = {
    readinessOverTime: [
      { month: "Jan", score: 45 },
      { month: "Feb", score: 52 },
      { month: "Mar", score: 58 },
      { month: "Apr", score: 63 },
      { month: "May", score: 68 },
      { month: "Jun", score: 72 },
    ],
    skillsCompleted: [
      { name: "Python", status: "completed", date: "2025-01-15" },
      { name: "Data Structures", status: "completed", date: "2025-02-20" },
      { name: "SQL", status: "completed", date: "2025-03-10" },
      { name: "Machine Learning", status: "in-progress", progress: 75 },
      { name: "Cloud (AWS)", status: "in-progress", progress: 40 },
      { name: "GenAI", status: "not-started", progress: 0 },
    ],
    companyImprovement: [
      { company: "Microsoft", before: 52, after: 68, improvement: 16 },
      { company: "Google", before: 48, after: 62, improvement: 14 },
      { company: "Amazon", before: 55, after: 71, improvement: 16 },
      { company: "Infosys", before: 62, after: 78, improvement: 16 },
    ],
    milestones: [
      { id: 1, title: "First Analysis Complete", icon: "🎯", date: "2025-01-10", achieved: true },
      { id: 2, title: "Gap Reduced by 10%", icon: "📈", date: "2025-02-15", achieved: true },
      { id: 3, title: "5 Skills Learned", icon: "📚", date: "2025-04-20", achieved: true },
      { id: 4, title: "Microsoft Ready (70%+)", icon: "🏆", date: null, achieved: false },
      { id: 5, title: "All Core Skills Mastered", icon: "⭐", date: null, achieved: false },
    ],
    heatmapData: Array.from({ length: 52 }, (_, i) => ({
      week: i,
      activity: Math.floor(Math.random() * 5),
    })),
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading your performance...</p>
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
            Your Performance
          </h1>
          <p className="text-text-secondary">
            Track your journey from skill gaps to industry ready
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card variant="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-success/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <ArrowUp className="h-5 w-5 text-success" />
              </div>
              <p className="text-text-tertiary text-sm mb-2">Readiness Score</p>
              <p className="text-3xl font-bold gradient-text">72%</p>
              <p className="text-success text-xs mt-1">+27% from start</p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-text-tertiary text-sm mb-2">Skills Completed</p>
              <p className="text-3xl font-bold text-text-primary">12</p>
              <p className="text-text-tertiary text-xs mt-1">5 in progress</p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-warning/20 rounded-lg">
                  <Target className="h-6 w-6 text-warning" />
                </div>
              </div>
              <p className="text-text-tertiary text-sm mb-2">Gap Reduction</p>
              <p className="text-3xl font-bold text-text-primary">-29%</p>
              <p className="text-success text-xs mt-1">Skills gap closing</p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-secondary/20 rounded-lg">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <p className="text-text-tertiary text-sm mb-2">Milestones Achieved</p>
              <p className="text-3xl font-bold text-text-primary">3/5</p>
              <p className="text-text-tertiary text-xs mt-1">2 remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Readiness Over Time */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Readiness Score Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {performanceData.readinessOverTime.map((item, i) => (
                <div key={item.month} className="flex-1 flex flex-col items-center">
                  <motion.div
                    className="w-full bg-gradient-primary rounded-t-lg"
                    initial={{ height: 0 }}
                    animate={{ height: `${item.score * 2}px` }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                  <span className="text-text-tertiary text-xs mt-2">{item.month}</span>
                  <span className="text-text-primary text-sm font-semibold">{item.score}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Progress */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Skills Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.skillsCompleted.map((skill, i) => (
                <div key={skill.name} className="flex items-center gap-4">
                  <div className="w-40 text-text-primary font-medium">{skill.name}</div>
                  <div className="flex-1 h-3 bg-surface rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        skill.status === "completed"
                          ? "bg-success"
                          : skill.status === "in-progress"
                          ? "bg-warning"
                          : "bg-border"
                      }`}
                      initial={{ width: 0 }}
                      animate={{
                        width: skill.status === "completed" ? "100%" : `${skill.progress || 0}%`,
                      }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                  </div>
                  <div className="w-24 text-right">
                    {skill.status === "completed" && (
                      <Badge variant="success" size="sm">Done</Badge>
                    )}
                    {skill.status === "in-progress" && (
                      <span className="text-warning text-sm">{skill.progress}%</span>
                    )}
                    {skill.status === "not-started" && (
                      <Badge variant="secondary" size="sm">Pending</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Company Readiness Improvement */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Company Readiness Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.companyImprovement.map((company, i) => (
                <div key={company.company}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-primary font-medium">{company.company}</span>
                    <span className="text-success text-sm font-semibold">
                      +{company.improvement}% improvement
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-4 bg-surface rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 flex">
                        <div
                          className="bg-border h-full"
                          style={{ width: `${company.before}%` }}
                        />
                        <div
                          className="bg-gradient-primary h-full"
                          style={{ width: `${company.after - company.before}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-text-tertiary text-xs w-20 text-right">
                      {company.before}% → {company.after}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Heatmap */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Learning Activity (Last 52 Weeks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {performanceData.heatmapData.map((week, i) => (
                <div
                  key={week.week}
                  className={`w-4 h-4 rounded-sm ${
                    week.activity === 0
                      ? "bg-surface"
                      : week.activity === 1
                      ? "bg-primary/30"
                      : week.activity === 2
                      ? "bg-primary/50"
                      : week.activity === 3
                      ? "bg-primary/70"
                      : "bg-primary"
                  }`}
                  title={`Week ${week.week + 1}: ${week.activity} activities`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-text-tertiary">
              <span>Less</span>
              <div className="w-3 h-3 bg-surface rounded-sm" />
              <div className="w-3 h-3 bg-primary/30 rounded-sm" />
              <div className="w-3 h-3 bg-primary/50 rounded-sm" />
              <div className="w-3 h-3 bg-primary/70 rounded-sm" />
              <div className="w-3 h-3 bg-primary rounded-sm" />
              <span>More</span>
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Milestones & Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {performanceData.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`p-4 rounded-lg border text-center ${
                    milestone.achieved
                      ? "bg-success/10 border-success/30"
                      : "bg-surface/50 border-border opacity-50"
                  }`}
                >
                  <div className="text-3xl mb-2">{milestone.icon}</div>
                  <p className="text-text-primary text-sm font-medium">{milestone.title}</p>
                  {milestone.achieved && milestone.date && (
                    <p className="text-text-tertiary text-xs mt-1">{milestone.date}</p>
                  )}
                  {!milestone.achieved && (
                    <p className="text-text-tertiary text-xs mt-1">In Progress</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}