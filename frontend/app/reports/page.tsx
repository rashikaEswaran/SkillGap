"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Download,
  BarChart3,
  CheckCircle,
  XCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";

interface GapAnalysis {
  id: string;
  syllabusTitle: string;
  coverage: number;
  taughtSkills: string[];
  missingSkills: {
    skill: string;
    demand: number;
    source: string;
  }[];
  createdAt: any;
}

export default function ReportsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<GapAnalysis[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      await fetchReports();
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchReports = async () => {
    try {
      const q = query(
        collection(db, "gapAnalyses"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as GapAnalysis));
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return "text-green-600 bg-green-100";
    if (coverage >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const formatDate = (date: any) => {
    if (!date) return "N/A";
    const secs = date.seconds || date;
    return new Date(secs * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Reports
              </h1>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export All</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{reports.length}</span>
            </div>
            <p className="text-gray-600 font-medium">Total Reports</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">
                {reports.filter(r => r.coverage >= 70).length}
              </span>
            </div>
            <p className="text-gray-600 font-medium">Well Covered</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">
                {reports.filter(r => r.coverage < 70).length}
              </span>
            </div>
            <p className="text-gray-600 font-medium">Needs Improvement</p>
          </div>
        </div>

        {/* Reports List */}
        {reports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border p-12 text-center">
            <BarChart3 className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Reports Yet</h3>
            <p className="text-gray-600 mb-6">
              Upload a syllabus to generate your first gap analysis report
            </p>
            <Link
              href="/analysis"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <FileText className="h-5 w-5 mr-2" />
              Upload Syllabus
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {report.syllabusTitle}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(report.createdAt)}
                      </span>
                      <span>{report.taughtSkills.length} skills analyzed</span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold ${getCoverageColor(report.coverage)}`}>
                    {report.coverage}% Coverage
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Taught Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {report.taughtSkills.slice(0, 5).map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                      {report.taughtSkills.length > 5 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          +{report.taughtSkills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      Missing Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {report.missingSkills?.slice(0, 5).map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center">
                          {skill.skill}
                          <span className="ml-1 text-xs opacity-75">({skill.demand}%)</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>
                      {report.missingSkills?.length || 0} skills recommended by industry
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <FileText className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}