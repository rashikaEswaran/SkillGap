// Skeleton Loading Components
// Reusable shimmer/skeleton loaders for cards, text, tables, and lists

import { cn } from "@/lib/utils";

/* ── Base shimmer animation styles ── */
const shimmerBase = "animate-pulse rounded-lg bg-[#1C1C2A]";

/* ================================================================
   SKELETON
   ================================================================ */
interface SkeletonProps {
  className?: string;
  variant?: "rect" | "circle" | "text" | "rounded";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "rect",
  width,
  height,
}: SkeletonProps) {
  const variantStyles = {
    rect: "",
    circle: "rounded-full",
    text: "h-4 rounded",
    rounded: "rounded-xl",
  };

  return (
    <div
      className={cn(shimmerBase, variantStyles[variant], className)}
      style={{
        width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
      }}
    />
  );
}

/* ================================================================
   CARD SKELETON
   Use inside card-shaped areas
   ================================================================ */
interface CardSkeletonProps {
  className?: string;
  hasImage?: boolean;
  lines?: number;
  imageHeight?: string;
}

export function CardSkeleton({
  className,
  hasImage = false,
  lines = 3,
  imageHeight = "h-40",
}: CardSkeletonProps) {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)}>
      {hasImage && (
        <div className={cn("w-full", imageHeight)}>
          <Skeleton className="w-full h-full rounded-none" />
        </div>
      )}
      <div className="p-4 space-y-3">
        <Skeleton width="70%" height={20} className="rounded-lg" />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            width={i === lines - 1 ? "60%" : "100%"}
            height={12}
            className="rounded"
          />
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   STAT CARD SKELETON
   For stat/dashboard cards
   ================================================================ */
export function StatCardSkeleton() {
  return (
    <div className="bg-[#13131C] rounded-xl p-5 Bloomberg space-y-3">
      <div className="flex items-start justify-between">
        <Skeleton width={36} height={36} variant="rounded" className="rounded-lg" />
        <Skeleton width={16} height={16} variant="rounded" />
      </div>
      <Skeleton width="50%" height={28} className="rounded-lg" />
      <Skeleton width="70%" height={14} className="rounded" />
      <Skeleton width="40%" height={12} className="rounded" />
    </div>
  );
}

/* ================================================================
   TABLE SKELETON
   For data tables
   ================================================================ */
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({ rows = 5, columns = 4, className }: TableSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-center gap-4 pb-3 border-b border-white/5">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} width={`${80 / columns}%`} height={16} className="rounded" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-4 py-3 border-b border-white/5">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              width={`${colIndex === 0 ? "40%" : "20%"}`}
              height={14}
              className="rounded"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ================================================================
   LIST SKELETON
   For list items
   ================================================================ */
interface ListSkeletonProps {
  items?: number;
  className?: string;
  hasAvatar?: boolean;
}

export function ListSkeleton({ items = 5, className, hasAvatar = false }: ListSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-2">
          {hasAvatar && <Skeleton width={40} height={40} variant="circle" />}
          <div className="flex-1 space-y-2">
            <Skeleton width="60%" height={16} className="rounded" />
            <Skeleton width="40%" height={12} className="rounded" />
          </div>
          <Skeleton width={60} height={24} className="rounded-full" />
        </div>
      ))}
    </div>
  );
}

/* ================================================================
   TEXT BLOCK SKELETON
   For paragraphs / text areas
   ================================================================ */
interface TextBlockSkeletonProps {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}

export function TextBlockSkeleton({
  lines = 4,
  className,
  lastLineWidth = "60%",
}: TextBlockSkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? lastLineWidth : "100%"}
          height={14}
          className="rounded"
        />
      ))}
    </div>
  );
}

/* ================================================================
   CHART SKELETON
   For chart areas
   ================================================================ */
export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl bg-[#13131C] p-6", className)}>
      <Skeleton width="40%" height={20} className="rounded-lg mb-6" />
      <div className="flex items-end gap-2 h-48">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            width="100%"
            height={`${Math.random() * 80 + 20}%`}
            className="rounded-t-lg"
          />
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   FULL PAGE SKELETON
   For entire page loading state
   ================================================================ */
export function PageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header area */}
      <div className="space-y-2">
        <Skeleton width="40%" height={32} className="rounded-lg" />
        <Skeleton width="60%" height={16} className="rounded" />
      </div>
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      {/* Content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CardSkeleton hasImage lines={3} />
        </div>
        <div className="space-y-4">
          <Skeleton width="60%" height={20} className="rounded-lg" />
          <ListSkeleton items={4} />
        </div>
      </div>
    </div>
  );
}
