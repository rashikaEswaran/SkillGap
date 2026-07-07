"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Linkedin,
  School,
  Building2,
  AlertCircle,
  ExternalLink,
  Search,
  Globe,
  MapPin,
  Briefcase,
  FileText,
  Bell,
  TrendingUp,
  Calendar,
} from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface IndustrySkill {
  id: string;
  name: string;
  source: string;
  demandScore: number;
  sourceUrl: string;
  date: any;
  location?: string;
}

interface NewsPost {
  id: string;
  title: string;
  source: string;
  content: string;
  url: string;
  category: "hiring" | "skill" | "news" | "report";
  company?: string;
  location?: string;
  skills?: string[];
  date: any;
  openings?: number;
  imageUrl?: string;
  ceoImage?: string;
  ceoName?: string;
  ceoQuote?: string;
}

const TABS = [
  { id: "all", label: "All" },
  { id: "hiring", label: "Hiring" },
  { id: "skill", label: "Skill Demand" },
  { id: "news", label: "News" },
  { id: "report", label: "Reports" },
];

export default function IndustryPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<IndustrySkill[]>([]);
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      await fetchData();
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchData = async () => {
    try {
      const skillsQuery = query(collection(db, "industrySkills"), orderBy("date", "desc"), limit(20));
      const skillsSnapshot = await getDocs(skillsQuery);
      const skillsData = skillsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as IndustrySkill));
      setSkills(skillsData);

      const mockPosts: NewsPost[] = [
        {
          id: "1",
          title: "Microsoft Hiring 500 AI Engineers in India",
          source: "Twitter/X",
          content: "Microsoft is expanding its AI division in Hyderabad and Bengaluru. Looking for engineers with strong DSA, Azure cloud, and ML deployment skills. Competitive packages and relocation support available.",
          url: "https://twitter.com/Microsoft",
          category: "hiring",
          company: "Microsoft",
          location: "Hyderabad, Bengaluru",
          skills: ["DSA", "Azure", "ML", "Python", "AI"],
          openings: 500,
          imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
          ceoImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
          ceoName: "Satya Nadella",
          ceoQuote: "AI is the defining technology of our time. We're building the future with the best minds.",
          date: { seconds: Date.now() / 1000 - 7200 },
        },
        {
          id: "2",
          title: "GenAI Skills Demand Surges 340% Globally",
          source: "LinkedIn Economic Graph",
          content: "LinkedIn's latest data reveals GenAI and LLM Engineering skills have grown 340% in job postings since 2023. Top companies hiring: OpenAI, Anthropic, Google DeepMind, Microsoft.",
          url: "https://economicgraph.linkedin.com",
          category: "skill",
          company: "Multiple",
          location: "Global",
          skills: ["GenAI", "LLM", "Prompt Engineering", "Python", "ML"],
          openings: 1200,
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
          date: { seconds: Date.now() / 1000 - 86400 },
        },
        {
          id: "3",
          title: "NASSCOM Future of Work Report 2025 Released",
          source: "NASSCOM",
          content: "New report reveals 67% of Indian tech workforce will need reskilling by 2027. AI/ML, Cloud, and Cybersecurity top the priority list. Download the full report for detailed insights.",
          url: "https://nasscom.in",
          category: "report",
          company: "NASSCOM",
          location: "Pan India",
          skills: ["AI/ML", "Cloud", "Cybersecurity", "DevOps"],
          openings: 0,
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
          date: { seconds: Date.now() / 1000 - 172800 },
        },
        {
          id: "4",
          title: "Google Students - SWE Intern 2026 Applications Open",
          source: "Twitter/X",
          content: "Google's SWE Intern 2026 cohort applications are now open! Looking for students with strong DSA, system design basics, and coding skills. Stipend: ₹80,000-1,20,000/month.",
          url: "https://twitter.com/GoogleStudents",
          category: "hiring",
          company: "Google",
          location: "Bangalore, Gurgaon",
          skills: ["DSA", "System Design", "Coding", "Python", "Java"],
          openings: 150,
          imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b7089b?w=800&h=400&fit=crop",
          ceoImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
          ceoName: "Sundar Pichai",
          ceoQuote: "We're looking for the next generation of engineers who will shape the future of technology.",
          date: { seconds: Date.now() / 1000 - 259200 },
        },
        {
          id: "5",
          title: "TCS Digital Hiring Requirements Updated",
          source: "TCS Careers",
          content: "TCS Digital roles now require cloud certifications (AWS/Azure) and advanced ML knowledge. GenAI experience is a plus. Freshers: 6+ LPA, Experienced: up to 22 LPA.",
          url: "https://tcs.com/careers",
          category: "hiring",
          company: "TCS",
          location: "Pan India",
          skills: ["AWS", "Azure", "ML", "GenAI", "Python"],
          openings: 800,
          imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0d9353?w=800&h=400&fit=crop",
          ceoImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
          ceoName: "K Krithivasan",
          ceoQuote: "Digital transformation is reshaping businesses. We need talent ready for the future.",
          date: { seconds: Date.now() / 1000 - 345600 },
        },
        {
          id: "6",
          title: "OpenAI Releases o3-mini with Better Code Generation",
          source: "TechCrunch",
          content: "OpenAI's new o3-mini model shows 40% improvement in code generation tasks. Benchmarks show significant gains in Python, JavaScript, and competitive programming problems.",
          url: "https://techcrunch.com",
          category: "news",
          company: "OpenAI",
          location: "San Francisco",
          skills: ["LLM", "Code Generation", "AI Research"],
          openings: 0,
          imageUrl: "https://images.unsplash.com/photo-1620712943563-649d0c6b41c8?w=800&h=400&fit=crop",
          ceoImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
          ceoName: "Sam Altman",
          ceoQuote: "We're making AI more capable and accessible for developers worldwide.",
          date: { seconds: Date.now() / 1000 - 432000 },
        },
        {
          id: "7",
          title: "Zoho Corporation Expands Chennai Office",
          source: "Zoho Careers",
          content: "Zoho is expanding its Chennai headquarters and hiring 300+ engineers across AI, Cloud, and SaaS teams. Known for its unique work culture and product-focused engineering.",
          url: "https://zoho.com/careers",
          category: "hiring",
          company: "Zoho",
          location: "Chennai",
          skills: ["Java", "Python", "Cloud", "SaaS", "Full Stack"],
          openings: 300,
          imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d0445?w=800&h=400&fit=crop",
          date: { seconds: Date.now() / 1000 - 518400 },
        },
        {
          id: "8",
          title: "AWS Announces New Cloud Certifications for 2026",
          source: "AWS Blog",
          content: "Amazon Web Services introduces new certifications focused on AI/ML integration, Security, and Data Engineering. Existing certifications will be updated with GenAI modules.",
          url: "https://aws.amazon.com/blogs",
          category: "skill",
          company: "AWS",
          location: "Global",
          skills: ["AWS", "Cloud", "AI/ML", "Security", "Data Engineering"],
          openings: 0,
          imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
          date: { seconds: Date.now() / 1000 - 604800 },
        },
        {
          id: "9",
          title: "Meta Hiring AI Research Scientists for Reality Labs",
          source: "Meta Careers",
          content: "Meta's Reality Labs is building the next generation of AR/VR experiences. Seeking AI researchers with expertise in computer vision, neural rendering, and real-time graphics. PhD preferred.",
          url: "https://metacareers.com",
          category: "hiring",
          company: "Meta",
          location: "Menlo Park, Remote",
          skills: ["Computer Vision", "Deep Learning", "PyTorch", "Neural Rendering", "3D Graphics"],
          openings: 75,
          imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
          ceoImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
          ceoName: "Mark Zuckerberg",
          ceoQuote: "The metaverse is the next frontier. We need brilliant minds to build it.",
          date: { seconds: Date.now() / 1000 - 129600 },
        },
        {
          id: "10",
          title: "NVIDIA CUDA Engineer Demand Hits All-Time High",
          source: "NVIDIA Developer Blog",
          content: "As AI workloads explode, NVIDIA CUDA engineers are in unprecedented demand. Jobs requiring CUDA skills have increased 280% year-over-year. Average salary range: $150K-$400K.",
          url: "https://developer.nvidia.com",
          category: "skill",
          company: "NVIDIA",
          location: "Global",
          skills: ["CUDA", "GPU Programming", "Parallel Computing", "C++", "AI Infrastructure"],
          openings: 450,
          imageUrl: "https://images.unsplash.com/photo-1591405351990-4726e334f237?w=800&h=400&fit=crop",
          ceoImage: "https://images.unsplash.com/photo-1485827404703-89c55fcc870e?w=200&h=200&fit=crop",
          ceoName: "Jensen Huang",
          ceoQuote: "AI is computing's most important revolution. CUDA powers the AI revolution.",
          date: { seconds: Date.now() / 1000 - 180000 },
        },
        {
          id: "11",
          title: "Infosys Launches Zero-Layoff Policy, Plans 40,000 Fresh Hires",
          source: "Economic Times",
          content: "Infosys commits to zero layoffs in FY2026 and plans to hire 40,000 fresh graduates. Focus areas: Cloud migration, AI transformation, and cybersecurity consulting.",
          url: "https://economictimes.com",
          category: "news",
          company: "Infosys",
          location: "Bangalore, India",
          skills: ["Cloud", "AI", "Cybersecurity", "Consulting"],
          openings: 40000,
          imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop",
          ceoImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
          ceoName: "Salil Parekh",
          ceoQuote: "We're investing in young talent and committing to job security for our employees.",
          date: { seconds: Date.now() / 1000 - 216000 },
        },
        {
          id: "12",
          title: "Apple Silicon Team Expands - M4 Chip Developers Wanted",
          source: "Apple Careers",
          content: "Apple's Silicon Design team is hiring engineers for next-generation M-series chips. Looking for ASIC designers, verification engineers, and performance architects.",
          url: "https://apple.com/careers",
          category: "hiring",
          company: "Apple",
          location: "Cupertino, Austin",
          skills: ["ASIC Design", "Verilog", "Computer Architecture", "Performance Analysis", "RTL Design"],
          openings: 120,
          imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
          ceoImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop",
          ceoName: "Tim Cook",
          ceoQuote: "Apple Silicon is revolutionizing computing. Join us in building the future.",
          date: { seconds: Date.now() / 1000 - 280000 },
        },
      ];
      setPosts(mockPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source?.toLowerCase()) {
      case "linkedin": return <Linkedin className="h-4 w-4" />;
      case "aicte": return <School className="h-4 w-4" />;
      case "nasscom": return <Building2 className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const formatDate = (date: any) => {
    if (!date?.seconds) return "Recent";
    const daysAgo = Math.floor((Date.now() / 1000 - date.seconds) / 86400);
    if (daysAgo === 0) return "Today";
    if (daysAgo === 1) return "Yesterday";
    return `${daysAgo} days ago`;
  };

  const filteredPosts = posts.filter((post) => {
    const matchesTab = activeTab === "all" || post.category === activeTab;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.company?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const topSkills = skills.slice(0, 10);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm uppercase tracking-widest">Loading industry data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 pt-8">
        {/* Industry Header with Stats */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-white/10 p-6">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop')] opacity-10 bg-cover bg-center" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Industry Insights</h1>
            <p className="text-gray-400 mb-6">Real-time hiring trends, skill demand, and industry news from top companies</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0f0f0f]/60 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Briefcase className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">43,000+</p>
                    <p className="text-xs text-gray-400">Active Openings</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0f0f0f]/60 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">340%</p>
                    <p className="text-xs text-gray-400">GenAI Demand Growth</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0f0f0f]/60 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">15+</p>
                    <p className="text-xs text-gray-400">Companies Tracking</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0f0f0f]/60 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Bell className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-xs text-gray-400">Latest Updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar - Fixed Position */}
        <div className="fixed top-32 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div className="relative w-full max-w-2xl pointer-events-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-pink-600/30 rounded-2xl blur-xl" />
            <div className="relative glass-card p-4 rounded-2xl border border-white/10 shadow-lg shadow-red-500/20">
              <div className="flex items-center gap-4">
                <Search className="h-6 w-6 text-red-500" />
                <input
                  type="text"
                  placeholder="Search skills, companies, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Below Search */}
        <div className="mt-24 flex gap-2 border-b border-white/10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? "text-red-500 border-red-500"
                  : "text-gray-400 border-transparent hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="glass" className="cursor-pointer hover:border-red-500/30 transition-all overflow-hidden">
              <div className="flex" onClick={() => window.open(post.url, '_blank')}>
                {/* Post Image - Square */}
                {post.imageUrl && (
                  <div className="relative w-64 h-64 flex-shrink-0 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={
                          post.category === "hiring" ? "success" :
                          post.category === "skill" ? "danger" :
                          post.category === "news" ? "warning" : "secondary"
                        }
                        size="sm"
                        className="shadow-lg"
                      >
                        {post.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs flex items-center gap-1">
                        {getSourceIcon(post.source)}
                        {post.source}
                      </span>
                    </div>
                  </div>
                )}
                {/* Content - Right Side */}
                <CardContent className="p-6 flex-1">
                    <div className="mb-4">
                      <h3 className="font-semibold text-xl text-text-primary hover:text-red-500 transition-colors mb-2">
                        {post.title}
                      </h3>
                    </div>

                    <p className="text-text-secondary text-base mb-4 leading-relaxed">{post.content}</p>

                  {/* CEO Quote Section */}
                  {post.ceoImage && post.ceoName && post.ceoQuote && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl">
                      <div className="flex items-start gap-4">
                        <img
                          src={post.ceoImage}
                          alt={post.ceoName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-red-500/30"
                        />
                        <div className="flex-1">
                          <p className="text-gray-300 text-sm italic mb-2">"{post.ceoQuote}"</p>
                          <p className="text-red-400 text-sm font-medium">— {post.ceoName}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {post.company && (
                      <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#0f0f0f]/50 rounded-lg p-2">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{post.company}</span>
                      </div>
                    )}
                    {post.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#0f0f0f]/50 rounded-lg p-2">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">{post.location}</span>
                      </div>
                    )}
                    {post.openings && post.openings > 0 && (
                      <div className="flex items-center gap-2 text-sm text-green-400 bg-[#0f0f0f]/50 rounded-lg p-2">
                        <Briefcase className="h-4 w-4" />
                        <span className="font-medium">{post.openings} openings</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#0f0f0f]/50 rounded-lg p-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">{formatDate(post.date)}</span>
                    </div>
                  </div>

                  {post.skills && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 pb-4">
                      <span className="text-xs text-gray-500 mr-2">Required Skills:</span>
                      {post.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" size="sm" className="border-red-500/30 text-red-400 bg-red-500/10">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </div>
              </Card>
            </motion.div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No posts found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}