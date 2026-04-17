"use client";
import * as React from "react";
import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (opts: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback((opts: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...opts, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />,
  error: <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />,
  info: <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />,
};

const STYLES: Record<ToastType, string> = {
  success: "border-emerald-200 bg-emerald-50",
  error: "border-red-200 bg-red-50",
  warning: "border-amber-200 bg-amber-50",
  info: "border-blue-200 bg-blue-50",
};

function ToastViewport({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 w-[360px] max-w-[calc(100vw-2rem)]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-in slide-in-from-bottom-5 fade-in-0",
            STYLES[t.type]
          )}
        >
          {ICONS[t.type]}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900">{t.title}</p>
            {t.description && <p className="text-sm text-slate-600 mt-0.5">{t.description}</p>}
          </div>
          <button onClick={() => dismiss(t.id)} className="text-slate-400 hover:text-slate-600 flex-shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
