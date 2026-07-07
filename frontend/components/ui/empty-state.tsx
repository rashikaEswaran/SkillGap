"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Inbox,
  Search,
  FileX,
  AlertCircle,
  FolderOpen,
  Database,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Icon mapping ── */
const iconMap: Record<string, LucideIcon> = {
  inbox: Inbox,
  search: Search,
  file: FileX,
  alert: AlertCircle,
  folder: FolderOpen,
  database: Database,
  offline: WifiOff,
};

/* ================================================================
   EMPTY STATE
   ================================================================ */
interface EmptyStateProps {
  icon?: keyof typeof iconMap | ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function EmptyState({
  icon = "inbox",
  title,
  description,
  action,
  className,
  size = "md",
}: EmptyStateProps) {
  const IconComponent = typeof icon === "string" ? iconMap[icon] || Inbox : null;

  const sizeClasses = {
    sm: {
      icon: "w-8 h-8",
      title: "text-sm",
      desc: "text-xs",
      padding: "py-8 px-4",
    },
    md: {
      icon: "w-12 h-12",
      title: "text-lg",
      desc: "text-sm",
      padding: "py-12 px-6",
    },
    lg: {
      icon: "w-16 h-16",
      title: "text-xl",
      desc: "text-base",
      padding: "py-16 px-8",
    },
  };

  const s = sizeClasses[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        s.padding,
        className
      )}
    >
      <div
        className={cn(
          "rounded-full bg-[#1C1C2A] flex items-center justify-center mb-4",
          s.icon
        )}
      >
        {typeof icon === "string" ? (
          IconComponent && <IconComponent className={cn("text-white/30", s.icon)} />
        ) : (
          <div className={s.icon}>{icon}</div>
        )}
      </div>
      <h3 className={cn("font-semibold text-white mb-2", s.title)}>{title}</h3>
      {description && (
        <p className={cn("text-white/50 max-w-md mb-4", s.desc)}>{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </motion.div>
  );
}

/* ================================================================
   EMPTY STATE VARIANTS
   Quick-use components for common empty states
   ================================================================ */

export function NoDataState({
  title = "No data available",
  description = "There are no items to display at the moment.",
  ...props
}: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      icon="database"
      title={title}
      description={description}
      {...props}
    />
  );
}

export function NoSearchResults({
  title = "No results found",
  description = "Try adjusting your search terms or filters to find what you're looking for.",
  ...props
}: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      icon="search"
      title={title}
      description={description}
      {...props}
    />
  );
}

export function NoFilesState({
  title = "No files uploaded",
  description = "Upload your first file to get started with the analysis.",
  ...props
}: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      icon="folder"
      title={title}
      description={description}
      {...props}
    />
  );
}

export function OfflineState({
  title = "You're offline",
  description = "Please check your internet connection and try again.",
  ...props
}: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      icon="offline"
      title={title}
      description={description}
      {...props}
    />
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "We encountered an error while loading this data. Please try again.",
  ...props
}: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      icon="alert"
      title={title}
      description={description}
      {...props}
    />
  );
}
