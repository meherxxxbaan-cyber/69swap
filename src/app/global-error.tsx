"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#fafafa] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-3">Something went wrong</h1>
          <p className="text-slate-500 mb-2 text-sm leading-relaxed">
            An unexpected error occurred. Our team has been notified.
          </p>
          {error.digest && (
            <p className="text-xs text-slate-400 mb-6 font-mono">Error ID: {error.digest}</p>
          )}
          <div className="flex gap-3 justify-center">
            <Button onClick={reset} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Try Again
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/" className="gap-2">
                <Home className="h-4 w-4" /> Go Home
              </Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
