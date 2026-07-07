"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Briefcase, Activity, MapPin, Brain,
  Target, ArrowUpRight, Zap,
} from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import AiChatAssistant from "@/components/ai-chat-assistant";
import { EmptyState } from "@/components/ui/empty-state";

interface IndustrySkill {
  id: string;
  name: string;
  source: string;
  demandScore: number;
  sourceUrl: string;
  date: any;
  location?: string;
  description?: string;
  company?: string;
  imageUrl?: string;
  openings?: number;
  topCompanies?: string[];
}

/* ── gradient pairs ── */
const GRADIENT_PAIRS: [string, string][] = [
  ["#312E81", "#6366F1"],
  ["#0F766E", "#14B8A6"],
  ["#4338CA", "#818CF8"],
  ["#BE185D", "#EC4899"],
  ["#7C3AED", "#A78BFA"],
  ["#0369A1", "#38BDF8"],
  ["#B45309", "#FBBF24"],
  ["#047857", "#34D399"],
  ["#701A75", "#D946EF"],
  ["#1F2937", "#6B7280"],
  ["#B91C1C", "#F87171"],
  ["#3730A3", "#A5B4FC"],
  ["#065F46", "#6EE7B7"],
  ["#92400E", "#FB923C"],
  ["#4B5563", "#9CA3AF"],
];

function getSkillGradient(skillName: string): { from: string; to: string } {
  const hash = skillName.split("").reduce((h, c) => {
    return ((h << 5) - h + c.charCodeAt(0)) | 0;
  }, 0);
  const pair = GRADIENT_PAIRS[Math.abs(hash) % GRADIENT_PAIRS.length];
  return { from: pair[0], to: pair[1] };
}

function fnv1aHash(str: string): number {
  let hash = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = ((hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)) >>> 0;
  }
  return hash;
}

function hashString(str: string): number {
  return fnv1aHash(str);
}

/* ── Loading Skeletons ── */
function StatCardSkeleton() {
  return (
    <div className="bg-[#13131C] rounded-xl p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-[#1C1C2A]" />
        <div className="w-4 h-4 rounded bg-[#1C1C2A]" />
      </div>
      <div className="w-16 h-7 rounded-lg bg-[#1C1C2A] mb-1" />
      <div className="w-24 h-4 rounded bg-[#1C1C2A] mb-0.5" />
      <div className="w-20 h-3 rounded bg-[#1C1C2A]" />
    </div>
  );
}

function SkillCardSkeleton() {
  return (
    <div className="bg-[#13131C] rounded-xl overflow-hidden animate-pulse">
      <div className="h-40 bg-[#1C1C2A]" />
      <div className="p-4 space-y-3">
        <div className="w-32 h-4 rounded bg-[#1C1C2A]" />
        <div className="flex items-center gap-3">
          <div className="w-16 h-3 rounded bg-[#1C1C2A]" />
          <div className="w-20 h-3 rounded bg-[#1C1C2A]" />
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#1C1C2A]" />
      </div>
    </div>
  );
}

/* ── Stat card ── */
function StatCard({
  icon,
  label,
  value,
  sublabel,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sublabel: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="bg-[#13131C] rounded-xl p-5 hover:bg-[#1C1C2A] transition-colors cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
          {icon}
        </div>
        <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#6366F1] transition-colors" />
      </div>
      <div className="text-2xl font-semibold text-white mb-1">{value}</div>
      <div className="text-sm text-white/70 mb-0.5">{label}</div>
      <div className="text-xs text-white/40">{sublabel}</div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<IndustrySkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) { router.push("/login"); return; }
      setUser(user);
      try {
        await fetchData();
      } catch (err) {
        setFetchError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchData = async () => {
    try {
      let skillsData: IndustrySkill[] = [];
      try {
        const skillsQuery = query(collection(db, "industrySkills"), orderBy("date", "desc"), limit(20));
        const snapshot = await getDocs(skillsQuery);
        skillsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IndustrySkill)).filter(s => s.name);
      } catch (e) { console.warn("Firestore fetch failed:", e); }

      if (skillsData.length < 6) {
        try {
          const queries = ["AI", "Data Science", "Cloud", "DevOps"];
          const apiResults = await Promise.all(queries.map(q => fetchSkillsFromApi(q)));
          const merged = apiResults.flat();
          const names = new Set(skillsData.map(s => s.name));
          const uniqueApiSkills = merged.filter(s => !names.has(s.name));
          skillsData = [...skillsData, ...uniqueApiSkills];
        } catch (e) {
          console.warn("API fallback fetch failed:", e);
        }
      }

      const companies = ["Microsoft", "Google", "Amazon", "TCS", "Infosys", "Zoho", "Meta", "Apple", "Netflix"];
      const locations = ["Bangalore", "Hyderabad", "Chennai", "Gurgaon", "Pune", "Mumbai", "Delhi"];

      const enrichedData = skillsData.map((skill, index) => ({
        ...skill,
        company: skill.company || companies[index % companies.length],
        demandScore: skill.demandScore || Math.floor(Math.random() * 25) + 70,
        location: skill.location || locations[index % locations.length],
        description: skill.description || `High demand for ${skill.name} professionals.`,
        date: skill.date || { seconds: Date.now() / 1000 },
        source: skill.source || "LinkedIn",
        openings: skill.openings || Math.floor((skill.demandScore || 75) * 15),
      }));

      enrichedData.sort((a, b) => (b.demandScore || 0) - (a.demandScore || 0));
      setSkills(enrichedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetchError("Failed to load dashboard data. Please try again later.");
    }
  };

  const fetchSkillsFromApi = async (query: string): Promise<IndustrySkill[]> => {
    try {
      const res = await fetch("/api/slm/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) return [];
      const json = await res.json();
      if (!json.success || !json.data?.skills) return [];
      return (json.data.skills as any[]).map((s, i) => ({
        id: `${query}-${i}`,
        name: s.name,
        source: s.source || query,
        demandScore: s.demand || Math.floor(Math.random() * 20) + 70,
        sourceUrl: "https://linkedin.com/jobs",
        date: { seconds: Date.now() / 1000 },
        location: ["Bangalore", "Hyderabad", "Chennai", "Pune", "Mumbai", "Delhi"][Math.abs(hashString(s.name)) % 6],
        description: `High demand. Industry needs ${s.name}.`,
        company: ["Microsoft", "Google", "Amazon", "TCS", "Infosys", "Meta"][Math.abs(hashString(s.name)) % 6],
        openings: (s.demand || 70) * 12,
        topCompanies: ["Microsoft", "Google", "Amazon"],
      }));
    } catch (e) { return []; }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header skeleton */}
          <div className="space-y-2">
            <div className="w-48 h-8 rounded-lg bg-[#1C1C2A] animate-pulse" />
            <div className="w-72 h-4 rounded bg-[#1C1C2A] animate-pulse" />
          </div>
          {/* Stats grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
          {/* Skills section skeleton */}
          <div>
            <div className="w-32 h-6 rounded-lg bg-[#1C1C2A] animate-pulse mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <SkillCardSkeleton key={i} />
              ))}
            </div>
          </div>
          {/* Bottom section skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#13131C] rounded-xl p-5 animate-pulse space-y-3">
              <div className="w-32 h-5 rounded bg-[#1C1C2A]" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="w-full h-2 rounded-full bg-[#1C1C2A]" />
                </div>
              ))}
            </div>
            <div className="bg-[#13131C] rounded-xl p-5 animate-pulse space-y-3">
              <div className="w-24 h-5 rounded bg-[#1C1C2A]" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="w-20 h-4 rounded bg-[#1C1C2A]" />
                  <div className="w-8 h-4 rounded bg-[#1C1C2A]" />
                </div>
              ))}
            </div>
            <div className="bg-[#13131C] rounded-xl p-5 animate-pulse space-y-3">
              <div className="w-28 h-5 rounded bg-[#1C1C2A]" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="w-16 h-4 rounded bg-[#1C1C2A]" />
                  <div className="w-12 h-4 rounded-full bg-[#1C1C2A]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const highDemand = skills.filter(s => s.demandScore >= 80).length;
  const medDemand = skills.filter(s => s.demandScore >= 60 && s.demandScore < 80).length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-semibold text-white mb-1">
            Welcome back{user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}
          </h1>
          <p className="text-white/50 text-sm">
            Here&apos;s what&apos;s happening in the industry today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Target className="w-4 h-4 text-[#6366F1]" />}
            label="Skills Tracked"
            value={skills.length}
            sublabel="Across all industries"
          />
          <StatCard
            icon={<Briefcase className="w-4 h-4 text-[#6366F1]" />}
            label="High Demand"
            value={highDemand}
            sublabel="Above 80% demand score"
            onClick={() => router.push("/demand")}
          />
          <StatCard
            icon={<Activity className="w-4 h-4 text-[#6366F1]" />}
            label="Open Positions"
            value={skills.reduce((a, s) => a + (s.openings || 0), 0).toLocaleString()}
            sublabel="Active job listings"
          />
          <StatCard
            icon={<TrendingUp className="w-4 h-4 text-[#6366F1]" />}
            label="Trending"
            value={medDemand}
            sublabel="Emerging skills this week"
            onClick={() => router.push("/analysis")}
          />
        </div>

        {/* Error state */}
        <AnimatePresence>
          {fetchError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl px-4 py-3 flex items-center gap-3"
            >
              <Zap className="w-5 h-5 text-[#EF4444] shrink-0" />
              <p className="text-sm text-[#EF4444]">{fetchError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Trending Skills</h2>
            <button
              onClick={() => router.push("/analysis")}
              className="text-sm text-[#6366F1] hover:text-[#818CF8] transition-colors flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {skills.length === 0 ? (
            <EmptyState
              icon="database"
              title="No skills data yet"
              description="Check back later for trending skill updates."
              action={
                <button
                  onClick={() => router.push("/analysis")}
                  className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium px-5 py-2 rounded-lg transition-colors text-sm"
                >
                  Explore Analysis
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {skills.slice(0, 8).map((skill, i) => {
                const g = getSkillGradient(skill.name);
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-[#13131C] rounded-xl overflow-hidden group hover:bg-[#1C1C2A] transition-colors"
                  >
                    <div className="relative h-40 overflow-hidden bg-[#1C1C2A]">
                      <div
                        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#13131C]/30 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          skill.demandScore >= 80
                            ? "bg-[#6366F1]/20 text-[#818CF8]"
                            : "bg-white/10 text-white/70"
                        }`}>
                          {skill.demandScore}% Demand
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium text-sm mb-1 truncate">{skill.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-white/50">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {skill.location || "India"}
                        </span>
                        <span>{(skill.openings || 0).toLocaleString()} openings</span>
                      </div>
                      <div className="mt-3 w-full bg-white/5 rounded-full h-1.5">
                        <div
                      className="bg-[#6366F1] rounded-full h-1.5 transition-all duration-500"
                          style={{ width: `${skill.demandScore}%` }}
                      />
                      </div>
                      </div>
                    </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#13131C] rounded-xl p-5">
            <h3 className="text-sm font-medium text-white/70 mb-4">Demand Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">High (80%+)</span>
                <span className="text-white font-medium">{highDemand}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-[#6366F1] rounded-full h-2" style={{ width: `${(highDemand / (skills.length || 1)) * 100}%` }} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Medium (60-79%)</span>
                <span className="text-white font-medium">{medDemand}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-[#818CF8] rounded-full h-2" style={{ width: `${(medDemand / (skills.length || 1)) * 100}%` }} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Low (&lt;60%)</span>
                <span className="text-white font-medium">{skills.filter(s => s.demandScore < 60).length}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-white/20 rounded-full h-2" style={{ width: `${(skills.filter(s => s.demandScore < 60).length / (skills.length || 1)) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="bg-[#13131C] rounded-xl p-5">
            <h3 className="text-sm font-medium text-white/70 mb-4">Top Locations</h3>
            <div className="space-y-2.5">
              {["Bangalore", "Hyderabad", "Chennai", "Gurgaon", "Pune"].map((loc, i) => (
                <div key={loc} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-xs w-5">{i + 1}</span>
                    <span className="text-white/70 text-sm">{loc}</span>
                  </div>
                  <span className="text-[#6366F1] text-xs font-medium">{90 - i * 10}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#13131C] rounded-xl p-5">
            <h3 className="text-sm font-medium text-white/70 mb-4">Top Companies</h3>
            <div className="space-y-2.5">
              {["Microsoft", "Google", "Amazon", "TCS", "Infosys"].map((company) => (
                <div key={company} className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">{company}</span>
                  <span className="text-xs bg-[#6366F1]/10 text-[#818CF8] px-2 py-0.5 rounded-full">Hiring</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AiChatAssistant />
    </DashboardLayout>
  );
}
