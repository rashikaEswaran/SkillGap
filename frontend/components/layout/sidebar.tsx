"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarItem {
  name: string;
  href: string;
  icon: ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

export function Sidebar({ items, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("fixed bottom-4 left-1/2 -translate-x-1/2 z-40", className)}>
      <nav className="flex items-center justify-around px-2 py-2 bg-[#0A0A0F]/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-lg h-20">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer min-w-[64px]",
                  isActive
                    ? "bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5">{item.icon}</span>
                <span className="font-medium text-xs mt-1 whitespace-nowrap">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
