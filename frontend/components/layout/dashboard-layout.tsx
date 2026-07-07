"use client";

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { ThemeProvider } from "@/components/theme";
import { BarChart3, FileText, TrendingUp, Upload, Briefcase, Activity, Calendar, Settings as SettingsIcon } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { name: "Overview", href: "/dashboard", icon: <BarChart3 className="w-5 h-5" /> },
  { name: "Industry", href: "/industry", icon: <TrendingUp className="w-5 h-5" /> },
  { name: "Skill Gap", href: "/analysis", icon: <FileText className="w-5 h-5" /> },
  { name: "Analysis", href: "/gap-analysis", icon: <Activity className="w-5 h-5" /> },
  { name: "Current Demand", href: "/demand", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Your Performance", href: "/performance", icon: <Activity className="w-5 h-5" /> },
  { name: "Future Forecast", href: "/forecast", icon: <Calendar className="w-5 h-5" /> },
  { name: "Settings", href: "/settings", icon: <SettingsIcon className="w-5 h-5" /> },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <TopNav user={user} onLogout={handleLogout} />
        <main className="mt-32 min-h-[calc(100vh-8rem)]">
          <div className="p-8 pb-24">
            {children}
          </div>
        </main>
        {/* Bottom Navigation Bar */}
        <Sidebar items={sidebarItems} />
      </div>
    </ThemeProvider>
  );
}