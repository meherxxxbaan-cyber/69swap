import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const COLS = {
  Marketplace: [
    { href: "/marketplace",          label: "Browse All" },
    { href: "/platform/tiktok",      label: "TikTok Accounts" },
    { href: "/platform/instagram",   label: "Instagram Accounts" },
    { href: "/platform/youtube",     label: "YouTube Channels" },
    { href: "/platform/x",           label: "X Accounts" },
    { href: "/platform/telegram",    label: "Telegram Channels" },
  ],
  Niches: [
    { href: "/niche/fitness",  label: "💪 Fitness" },
    { href: "/niche/finance",  label: "💰 Finance" },
    { href: "/niche/beauty",   label: "💄 Beauty" },
    { href: "/niche/gaming",   label: "🎮 Gaming" },
    { href: "/niche/travel",   label: "✈️ Travel" },
    { href: "/niche/tech",     label: "💻 Tech" },
  ],
  Company: [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/fees",         label: "Fees & Pricing" },
    { href: "/about",        label: "About Us" },
    { href: "/sales-ledger", label: "Sales Ledger" },
    { href: "/contact",      label: "Contact" },
  ],
  Account: [
    { href: "/sell",       label: "List an Account" },
    { href: "/watchlist",  label: "Saved Listings" },
    { href: "/dashboard",  label: "Dashboard" },
    { href: "/terms",      label: "Terms of Service" },
    { href: "/privacy",    label: "Privacy Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-extrabold text-slate-900">69<span className="text-indigo-600">Swap</span></span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              The safest marketplace to buy and sell social media accounts. Stripe escrow on every transaction.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">© 2025 69Swap.com — All rights reserved</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>3% platform fee · Always free to list</span>
            <span>·</span>
            <span>Powered by Stripe Escrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
