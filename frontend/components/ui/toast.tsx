"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ================================================================
   TOAST TYPES & CONTEXT
   ================================================================ */

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
  action?: React.ReactNode;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

/* ================================================================
   TOAST PROVIDER
   ================================================================ */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast-${toastId++}-${Date.now()}`;
    const newToast: Toast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration (default 5s)
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
    </ToastContext.Provider>
  );
}

/* ================================================================
   HOOK
   ================================================================ */
export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

/* ================================================================
   INDIVIDUAL TOAST
   ================================================================ */
function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const variants = {
    success: {
      icon: CheckCircle as LucideIcon,
      styles: "bg-[#13131C] border-[#22C55E]/30",
      iconColor: "text-[#22C55E]",
    },
    error: {
      icon: AlertCircle as LucideIcon,
      styles: "bg-[#13131C] border-[#EF4444]/30",
      iconColor: "text-[#EF4444]",
    },
    warning: {
      icon: AlertTriangle as LucideIcon,
      styles: "bg-[#13131C] border-[#F59E0B]/30",
      iconColor: "text-[#F59E0B]",
    },
    info: {
      icon: Info as LucideIcon,
      styles: "bg-[#13131C] border-[#6366F1]/30",
      iconColor: "text-[#6366F1]",
    },
  };

  const variant = variants[toast.variant];
  const Icon = variant.icon;

  // Progress bar animation
  const duration = toast.duration ?? 5000;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "relative w-full max-w-sm rounded-xl border shadow-xl overflow-hidden",
        variant.styles
      )}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5">
        <motion.div
          className={cn("h-full", variant.iconColor.replace("text-", "bg-"))}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      </div>

      <div className="p-4 flex items-start gap-3">
        <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", variant.iconColor)} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">{toast.title}</p>
          {toast.description && (
            <p className="text-xs text-white/60 mt-1">{toast.description}</p>
          )}
          {toast.action && <div className="mt-2">{toast.action}</div>}
        </div>
        <button
          onClick={onRemove}
          className="shrink-0 p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4 text-white/40" />
        </button>
      </div>
      <div
        className={cn("absolute bottom-0 left-0 h-0.5", variant.iconColor.replace("text-", "bg-"))}
        style={{
          width: "100%",
          animation: `shrink ${duration / 1000}s linear forwards`,
        }}
      />
    </motion.div>
  );
}

/* ================================================================
   TOASTER (Container)
   Renders all active toasts
   ================================================================ */
export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onRemove={() => removeToast(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================
   CONVENIENCE HOOK for quick success/error toasts
   ================================================================ */
export function useSonner() {
  const { addToast } = useToast();

  const success = React.useCallback(
    (title: string, description?: string) => {
      addToast({ title, description, variant: "success" });
    },
    [addToast]
  );

  const error = React.useCallback(
    (title: string, description?: string) => {
      addToast({ title, description, variant: "error" });
    },
    [addToast]
  );

  const warning = React.useCallback(
    (title: string, description?: string) => {
      addToast({ title, description, variant: "warning" });
    },
    [addToast]
  );

  const info = React.useCallback(
    (title: string, description?: string) => {
      addToast({ title, description, variant: "info" });
    },
    [addToast]
  );

  const promise = React.useCallback(
    <T extends unknown>(
      promiseFn: () => Promise<T>,
      {
        loading,
        success: successMsg,
        error: errorMsg,
      }: { loading: string; success: string; error: string }
    ) => {
      addToast({ title: loading, variant: "info", duration: 999999 });
      promiseFn()
        .then(() => {
          addToast({ title: successMsg, variant: "success" });
        })
        .catch(() => {
          addToast({ title: errorMsg, variant: "error" });
        });
    },
    [addToast]
  );

  return { success, error, warning, info, promise };
}
