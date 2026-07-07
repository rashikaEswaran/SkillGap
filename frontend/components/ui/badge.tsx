"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface BadgeProps extends HTMLMotionProps<"span"> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  variant = "primary",
  size = "md",
  children,
  className,
  icon,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center gap-1.5 font-semibold rounded-sm";

  const variants = {
    primary: "bg-primary/20 text-primary border border-primary/30",
    secondary: "bg-secondary/20 text-secondary border border-secondary/30",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5",
    danger: "bg-danger/20 text-danger border border-danger/30",
    success: "bg-success/20 text-success border border-success/30",
    warning: "bg-warning/20 text-warning border border-warning/30",
    info: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  return (
    <motion.span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.span>
  );
}