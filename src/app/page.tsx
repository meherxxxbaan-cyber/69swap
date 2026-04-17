import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { PlatformIcon } from "@/components/platform-icons";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { PLATFORM_GRADIENTS, formatNumber, formatPrice } from "@/lib/utils";
import { ShieldCheck, TrendingUp, Star, DollarSign, Lock, Search } from "lucide-react";

const PLATFORMS = [
  { name: "TikTok",    count: 13, slug: "tiktok"    },
  { name: "Instagram", count: 12, slug: "instagram" },
  { name: "YouTube",   count: 12, slug: "youtube"   },
  { name: "X",         count: 7,  slug: "x"         },
  { name: "Telegram",  count: 6,  slug: "telegram"  },
  { name: "Discord",   count: 4,  slug: "discord"   },
  { name: "Facebook",  count: 5,  slug: "facebook"  },
  { name: "Twitch",    count: 3,  slug: "twitch"    },
];

const FEATURED = SEED_LISTINGS.filter((l) => l.featured).slice(0, 6);
const RECENT   = SEED_LISTINGS.slice(0, 8);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Navbar />

      {/* ── Hero — search first ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Buy & Sell Social Media Accounts
          </h1>
          <p className="text-lg text-slate-500 mb-8">
            5,000+ verified accounts · Stripe escrow · 7-day buyer protection
          </p>

          {/* Search bar */}
          <Link href="/marketplace" className="block max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 hover:border-indigo-400 rounded-2xl px-5 py-4 cursor-pointer transition-all shadow-sm hover:shadow-md">
              <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
              <span className="text-slate-400 text-base flex-1 text-left">Search by platform, niche, username…</span>
              <span className="bg-indigo-600 text-white text-sm font-semibold px-4 py-1.5 rounded-xl flex-shrink-0">Search</span>
            </div>
          </Link>

          {/* Trust strip */}
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            {[
              { icon: <ShieldCheck className="h-4 w-4 text-emerald-500" />, text: "Escrow protected" },
              { icon: <Star className="h-4 w-4 text-amber-400 fill-amber-400" />, text: "4.98★ rating" },
              { icon: <TrendingUp className="h-4 w-4 text-indigo-500" />, text: "3,842 transfers" },
              { icon: <Lock className="h-4 w-4 text-slate-400" />, text: "7-day inspection" },
            ].map((s) => (
              <div key={s.text} className="flex items-center gap-1.5 text-sm text-slate-500">
                {s.icon}{s.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform pills ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <Link href="/marketplace"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold flex-shrink-0 hover:bg-indigo-700 transition-colors">
              All Platforms
            </Link>
            {PLATFORMS.map((p) => (
              <Link key={p.name} href={`/platform/${p.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium flex-shrink-0 transition-colors">
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: PLATFORM_GRADIENTS[p.name] }}>
                  <PlatformIcon platform={p.name} size={12} />
                </span>
                {p.name}
                <span className="text-slate-400 text-xs">{p.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">

        {/* ── Featured listings ─────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">⭐ Featured Accounts</h2>
              <p className="text-sm text-slate-500 mt-0.5">Hand-picked, verified by our team</p>
            </div>
            <Link href="/marketplace?featured=true" className="text-sm text-indigo-600 font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>

        {/* ── Stats bar ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: <DollarSign className="h-5 w-5 text-emerald-500" />, val: "$14M+",  label: "Total Volume",       color: "text-emerald-600" },
            { icon: <TrendingUp className="h-5 w-5 text-indigo-500" />,  val: "3,842",  label: "Completed Transfers",color: "text-indigo-600"  },
            { icon: <Star className="h-5 w-5 text-amber-400" />,         val: "4.98★",  label: "Average Rating",     color: "text-amber-600"   },
            { icon: <ShieldCheck className="h-5 w-5 text-slate-400" />,  val: "100%",   label: "Escrow Protected",   color: "text-slate-700"   },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <div className={`text-xl font-extrabold ${s.color}`}>{s.val}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Recent listings ───────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-900">🆕 Recently Listed</h2>
            <Link href="/marketplace?sort=newest" className="text-sm text-indigo-600 font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {RECENT.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>

        {/* ── How it works — minimal ─────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-5 text-center">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { n: "1", title: "Browse",         desc: "Filter by platform, niche & price" },
              { n: "2", title: "Pay Escrow",      desc: "Stripe holds funds securely"       },
              { n: "3", title: "Receive Access",  desc: "Seller transfers within 24h"       },
              { n: "4", title: "Confirm & Done",  desc: "7 days to inspect before release"  },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mx-auto mb-2">
                  {s.n}
                </div>
                <div className="font-semibold text-slate-900 text-sm">{s.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
