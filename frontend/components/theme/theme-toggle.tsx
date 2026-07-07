"use client";

import { useTheme } from "./theme-provider";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full bg-surface/50 backdrop-blur-sm border border-border flex items-center justify-center hover:border-red-500/50 transition-all group overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:via-red-500/5 group-hover:to-red-500/10 transition-all" />

      {theme === "night" ? (
        <Moon className="w-5 h-5 text-text-secondary group-hover:text-red-400 transition-colors" />
      ) : (
        <Sun className="w-5 h-5 text-text-secondary group-hover:text-red-400 transition-colors" />
      )}
    </motion.button>
  );
}