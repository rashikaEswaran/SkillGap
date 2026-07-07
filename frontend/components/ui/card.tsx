"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { spring, springBouncy, cardHover as cardHoverVariants } from "@/lib/motion-presets";
import { useSpotlight } from "@/hooks/useSpatial";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?:
    | "default"
    | "glass"
    | "glass-pro"
    | "gradient"
    | "floating"
    | "holographic"
    | "depth";
  hover?: boolean;
  children: ReactNode;
  className?: string;
  glow?: boolean;
  tilt?: boolean;
}

export function Card({
  variant = "glass",
  hover = false,
  children,
  className,
  glow = false,
  tilt = false,
  ...props
}: CardProps) {
  const cardRef = useSpotlight(undefined);

  const baseStyles = "relative rounded-xl p-6 backdrop-filter";

  const variants = {
    // === DEFAULT ===
    default: "bg-surface border border-border",

    // === GLASS (Original) ===
    glass: "bg-surface/70 backdrop-blur-xl border border-borderLight",

    // === GLASS PRO (New) ===
    "glass-pro":
      "bg-glass-bg backdrop-blur-[40px] border border-glass-border-strong shadow-lg",

    // === GRADIENT ===
    gradient:
      "bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10",

    // === FLOATING (New) ===
    floating:
      "bg-glass-bg backdrop-blur-xl border border-glass-border shadow-xl",

    // === HOLOGRAPHIC (New) ===
    holographic:
      "bg-transparent backdrop-blur-xl border border-white/10 hover:border-[#ff0033]/30",

    // === DEPTH (New - 3D effect) ===
    depth: "bg-glass-bg backdrop-blur-xl border border-glass-border-strong transform-style-3d",
  };

  const hoverStyles = hover
    ? "hover:scale-[1.02] hover:border-[#ff0033]/40 transition-all duration-300 cursor-pointer"
    : "";

  const glowStyles = glow
    ? "shadow-[0_0_30px_rgba(255,0,51,0.3)] hover:shadow-[0_0_50px_rgba(255,0,51,0.5)]"
    : "";

  // Spotlight effect for glass-pro variant
  const spotlightStyle =
    variant === "glass-pro" || variant === "floating"
      ? {
          "--mouse-x": cardRef.x,
          "--mouse-y": cardRef.y,
        } as React.CSSProperties
      : {};

  return (
    <motion.div
      className={cn(
        baseStyles,
        variants[variant],
        hoverStyles,
        glowStyles,
        className
      )}
      variants={cardHoverVariants}
      initial="initial"
      whileHover={hover ? "hover" : undefined}
      whileTap={hover ? "tap" : undefined}
      transition={spring}
      style={spotlightStyle}
      {...props}
    >
      {/* Spotlight gradient overlay */}
      {(variant === "glass-pro" || variant === "floating") && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 0, 51, 0.1), transparent 40%)`,
          }}
        />
      )}

      {/* Holographic edge effect */}
      {variant === "holographic" && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `
              linear-gradient(45deg,
                rgba(255, 0, 51, 0.1) 0%,
                transparent 25%,
                rgba(100, 150, 255, 0.1) 50%,
                transparent 75%,
                rgba(180, 100, 255, 0.1) 100%)
            `,
            backgroundSize: "400% 400%",
            animation: "gradient-shift 3s ease infinite",
          }}
        />
      )}

      {/* Depth effect - pseudo 3D layers */}
      {variant === "depth" && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: `
              0 1px 0 rgba(255, 255, 255, 0.1),
              0 2px 0 rgba(255, 255, 255, 0.05),
              0 4px 8px rgba(0, 0, 0, 0.3),
              0 8px 16px rgba(0, 0, 0, 0.4)
            `,
          }}
        />
      )}

      {/* Inner glow for glass-pro */}
      {(variant === "glass-pro") && (
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-white/5" />
      )}

      {children}
    </motion.div>
  );
}

// ============================================
// CARD HEADER
// ============================================
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

// ============================================
// CARD TITLE
// ============================================
interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "font-display text-xl font-bold text-text-primary tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

// ============================================
// CARD CONTENT
// ============================================
interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("text-text-secondary", className)}>{children}</div>;
}

// ============================================
// CARD FOOTER
// ============================================
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        "mt-4 pt-4 border-t border-glass-border text-sm text-text-tertiary",
        className
      )}
    >
      {children}
    </div>
  );
}