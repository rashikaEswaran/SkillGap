"use client";

import { cn } from "@/lib/utils";
import { User } from "firebase/auth";
import { Bell, Search, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme";

interface TopNavProps {
  user?: User | null;
  onLogout?: () => void;
  className?: string;
}

export function TopNav({ user, onLogout, className }: TopNavProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 h-32 bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/10 z-30",
        className
      )}
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Section - Welcome + Scrolling Marquee */}
        <div className="flex items-center gap-4 flex-1">
          <span className="text-base text-gray-400 whitespace-nowrap">
            Welcome back, <span className="text-white font-semibold text-lg">{user?.displayName || user?.email?.split("@")[0] || "User"}</span>!
          </span>

          {/* Scrolling Marquee */}
          <div className="flex-1 max-w-xl overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
            <motion.div
              className="flex whitespace-nowrap"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="text-red-500 font-semibold text-lg mx-8">
                ✨ Where Students Meet Opportunity
              </span>
              <span className="text-green-500 font-semibold text-lg mx-8">
                🚀 Discover Your Career Potential
              </span>
              <span className="text-blue-500 font-semibold text-lg mx-8">
                📈 Real-Time Industry Insights
              </span>
              <span className="text-yellow-500 font-semibold text-lg mx-8">
                💼 Connect with Top Companies
              </span>
              <span className="text-purple-500 font-semibold text-lg mx-8">
                🎯 Your Path to Success Starts Here
              </span>
              <span className="text-red-500 font-semibold text-lg mx-8">
                ✨ Where Students Meet Opportunity
              </span>
              <span className="text-green-500 font-semibold text-lg mx-8">
                🚀 Discover Your Career Potential
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <motion.button
            className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface2 rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
          </motion.button>

          {/* User Menu */}
          {user && (
            <Link href="/settings">
              <motion.div
                className="flex items-center space-x-3 px-3 py-2 bg-surface2 border border-border rounded-lg cursor-pointer hover:border-primary/40 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-text-primary">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-text-tertiary">{user.email}</p>
                </div>
              </motion.div>
            </Link>
          )}

          {/* Logout */}
          {onLogout && (
            <motion.button
              onClick={onLogout}
              className="p-2 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}