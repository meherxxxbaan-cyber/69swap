"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "@/components/user-menu";
import { useWatchlist } from "@/hooks/useWatchlist";
import { ShieldCheck, Menu, X, Heart } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/marketplace",  label: "Browse"       },
  { href: "/sell",         label: "Sell Account" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/fees",         label: "Fees"         },
  { href: "/sales-ledger", label: "Sales Ledger" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, hydrated } = useWatchlist();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            69<span className="text-indigo-600">Swap</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.href ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Watchlist */}
          <Link href="/watchlist"
            className={`relative p-2 rounded-lg transition-colors ${
              pathname === "/watchlist" ? "bg-red-50 text-red-500" : "text-slate-400 hover:text-red-500 hover:bg-red-50"
            }`}
          >
            <Heart className={`h-5 w-5 ${pathname === "/watchlist" ? "fill-red-500" : ""}`} />
            {hydrated && count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>

          <UserMenu />

          {/* Mobile menu */}
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className={`block py-2.5 px-3 rounded-lg text-sm font-medium ${
                pathname === l.href ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 flex gap-2 border-t border-slate-100 mt-2">
            <Link href="/login" className="flex-1 text-center py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700">Log In</Link>
            <Link href="/register" className="flex-1 text-center py-2 rounded-xl bg-indigo-600 text-sm font-medium text-white">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  );
}
