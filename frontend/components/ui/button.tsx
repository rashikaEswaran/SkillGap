"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { spring, springBouncy, snap } from "@/lib/motion-presets";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "vision"
    | "linear"
    | "stripe"
    | "hologram";
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  glow = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";

  const variants = {
    // === ORIGINAL VARIANTS ===
    primary:
      "bg-gradient-to-r from-[#ff0033] to-[#ff6699] text-white hover:opacity-90",
    secondary:
      "bg-surface border border-borderLight text-text-primary hover:bg-surface2 hover:border-primary/40",
    outline:
      "border-2 border-[#ff0033] text-[#ff0033] hover:bg-[#ff0033]/10",
    ghost:
      "text-text-secondary hover:text-text-primary hover:bg-surface",
    danger:
      "bg-gradient-to-r from-red-600 to-red-700 text-white hover:opacity-90",

    // === NEW VISION PRO VARIANT ===
    vision:
      "bg-glass-bg backdrop-blur-xl border border-glass-border-strong text-white hover:bg-glass-bg-light",

    // === NEW LINEAR VARIANT ===
    linear:
      "bg-[#1a1a1a] border border-white/10 text-white hover:border-white/20 hover:bg-[#1f1f1f]",

    // === NEW STRIPE VARIANT ===
    stripe:
      "bg-gradient-to-r from-[#635BFF] to-[#00D4FF] text-white hover:opacity-90",

    // === NEW HOLOGRAM VARIANT ===
    hologram:
      "bg-transparent border border-white/20 text-white hover:border-[#ff0033]/50 hover:bg-[#ff0033]/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg rounded-xl",
    xl: "px-10 py-5 text-xl rounded-2xl",
  };

  const glowStyles = glow
    ? "shadow-[0_0_30px_rgba(255,0,51,0.4)] hover:shadow-[0_0_50px_rgba(255,0,51,0.6)]"
    : "";

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], sizes[size], glowStyles, className)}
      whileHover={{ scale: loading ? 1 : 1.02, transition: springBouncy }}
      whileTap={{ scale: loading ? 1 : 0.98, transition: snap }}
      disabled={loading || props.disabled}
      {...props}
    >
      {/* Shimmer effect for hijack/hologram variants */}
      {(variant === "hologram" || variant === "linear") && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      )}

      {/* Vision variant inner glow */}
      {variant === "vision" && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff0033]/5 to-[#ff6699]/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}

      {/* Loading spinner */}
      {loading && (
        <motion.svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </motion.svg>
      )}

      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}

      {/* Particle dots on corners for vision variant */}
      {variant === "vision" && (
        <>
          <div className="absolute top-0 left-0 w-1 h-1 bg-[#ff0033] rounded-full m-1" />
          <div className="absolute top-0 right-0 w-1 h-1 bg-[#ff6699] rounded-full m-1" />
          <div className="absolute bottom-0 left-0 w-1 h-1 bg-[#ff6699] rounded-full m-1" />
          <div className="absolute bottom-0 right-0 w-1 h-1 bg-[#ff0033] rounded-full m-1" />
        </>
      )}
    </motion.button>
  );
}