"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, ArrowLeft, Bug } from "lucide-react";
import { cn } from "@/lib/utils";

/* ================================================================
   ERROR BOUNDARY
   Catches errors in child components and shows fallback UI
   ================================================================ */

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    this.props.onReset?.();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <ErrorFallback
          error={this.state.error!}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

/* ================================================================
   ERROR FALLBACK UI
   ================================================================ */
function ErrorFallback({
  error,
  errorInfo,
  onRetry,
  className,
}: {
  error: Error;
  errorInfo: ErrorInfo | null;
  onRetry: () => void;
  className?: string;
}) {
  const copyToClipboard = () => {
    const errorDetails = `
Error: ${error.message}
Stack: ${error.stack}
${errorInfo?.componentStack ? `Component Stack: ${errorInfo.componentStack}` : ""}
`;
    navigator.clipboard.writeText(errorDetails).catch(() => {});
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/dashboard";
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center min-h-[400px] p-8 text-center",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-[#EF4444]" />
      </div>

      <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
      <p className="text-white/50 max-w-md mb-6">
        We encountered an unexpected error. This has been logged and our team will look into it.
      </p>

      {/* Error details (collapsible) */}
      <details className="w-full max-w-lg mb-6 text-left">
        <summary className="text-sm text-white/40 cursor-pointer hover:text-white/60 transition-colors flex items-center gap-2 mb-2">
          <Bug className="w-4 h-4" />
          View error details
        </summary>
        <div className="mt-2 p-4 bg-[#0A0A0F] rounded-lg border border-white/5 overflow-x-auto">
          <code className="text-xs text-[#EF4444] font-mono whitespace-pre-wrap break-all">
            {error.message}
          </code>
          {errorInfo?.componentStack && (
            <pre className="mt-2 text-xs text-white/30 font-mono whitespace-pre-wrap">
              {errorInfo.componentStack}
            </pre>
          )}
        </div>
      </details>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>

        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 bg-[#13131C] hover:bg-[#1C1C2A] text-white/70 font-medium px-5 py-2.5 rounded-lg transition-colors border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 text-white/50 hover:text-white/70 text-sm transition-colors"
        >
          Copy error details
        </button>
      </div>
    </motion.div>
  );
}

/* ================================================================
   PAGE ERROR BOUNDARY
   Wraps an entire page
   ================================================================ */
export function PageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}

/* ================================================================
   SECTION ERROR BOUNDARY
   For smaller component trees
   ================================================================ */
export function SectionErrorBoundary({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={
        fallback || (
          <div className="p-6 bg-[#13131C] rounded-xl border border-white/5 text-center">
            <AlertTriangle className="w-6 h-6 text-[#F59E0B] mx-auto mb-2" />
            <p className="text-sm text-white/70">Failed to load this section</p>
          </div>
        )
      }
    >
      {children}
    </ErrorBoundary>
  );
}
