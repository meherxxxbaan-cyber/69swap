import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { SalesTicker } from "@/components/sales-ticker";
import { AnimatedCounter } from "@/components/animated-counter";
import { Button } from "@/components/ui/button";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { PLATFORM_GRADIENTS, PLATFORM_EMOJIS, NICHE_EMOJIS } from "@/lib/utils";
import type { Platform } from "@/lib/utils";
import {
  ShieldCheck, TrendingUp, Star, DollarSign, ArrowRight,
  CheckCircle, Users, Zap, Lock, ChevronRight, Play,
} from "lucide-react";

const FEATURED = SEED_LISTINGS.filter((l) => l.featured).slice(0, 6);
const PLATFORMS: Platform[] = ["TikTok", "Instagram", "YouTube", "X", "Telegram"];
const NICHES = ["Fitness", "Finance", "Beauty", "Gaming", "Travel", "Food", "Tech", "Lifestyle"];

const TESTIMONIALS = [
  { name: "Alex R.", role: "Serial buyer · 3 purchases", rating: 5, avatar: "A", color: "bg-violet-100 text-violet-700", text: "Bought 3 accounts through 69Swap. The escrow system is legit — I disputed one sale and got a full refund within 48 hours. Best marketplace by far." },
  { name: "Sarah M.", role: "Instagram seller", rating: 5, avatar: "S", color: "bg-pink-100 text-pink-700", text: "Sold my fitness account for $12,000. Process was smooth, buyer confirmed within 3 days. Stripe payout landed same day. Highly recommend." },
  { name: "Jordan T.", role: "TikTok buyer", rating: 5, avatar: "J", color: "bg-indigo-100 text-indigo-700", text: "The verified income badges and analytics screenshots give so much confidence. Bought a 500K TikTok account and the seller was incredibly professional." },
];

const HOW_IT_WORKS = [
  { step: "01", icon: <Users className="h-5 w-5" />, title: "Browse & Compare", desc: "Filter by platform, niche, followers, and price. Compare up to 4 accounts side by side." },
  { step: "02", icon: <DollarSign className="h-5 w-5" />, title: "Pay into Escrow", desc: "Stripe holds your payment securely — never released until you confirm the account transfer." },
  { step: "03", icon: <Zap className="h-5 w-5" />, title: "Receive Access", desc: "Seller transfers credentials within 24h. You have 7 full days to inspect everything." },
  { step: "04", icon: <CheckCircle className="h-5 w-5" />, title: "Confirm & Done", desc: "Confirm receipt, funds release to seller. Leave a review for the community." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #eef2ff 0%, #f5f3ff 40%, #fafafa 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.12),transparent)]" />
        {/* Floating blobs */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute bottom-10 left-5 w-48 h-48 rounded-full bg-violet-100/40 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-indigo-200 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-7 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              3,842 accounts successfully transferred
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
              The Safest Way to{" "}
              <span className="relative">
                <span className="relative z-10 text-indigo-600">Buy & Sell</span>
                <span className="absolute inset-x-0 -bottom-1 h-3 bg-indigo-100 -skew-x-2 z-0 rounded" />
              </span>
              <br />Social Media Accounts
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Browse 5,000+ verified TikTok, Instagram, YouTube, X, and Telegram accounts.
              Every transaction protected by Stripe escrow.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <Button size="xl" asChild>
                <Link href="/marketplace" className="gap-2">
                  Browse Accounts <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="secondary" asChild>
                <Link href="/how-it-works" className="gap-2">
                  <Play className="h-4 w-4" /> How It Works
                </Link>
              </Button>
            </div>

            {/* Social proof avatars */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {["A", "S", "J", "M", "T"].map((l, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold ${["bg-violet-200 text-violet-700","bg-pink-200 text-pink-700","bg-indigo-200 text-indigo-700","bg-amber-200 text-amber-700","bg-emerald-200 text-emerald-700"][i]}`}>
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">50,000+</span> buyers & sellers trust 69Swap
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sales ticker ───────────────────────────────────────────────────── */}
      <SalesTicker />

      {/* ── Trust stats ────────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: <TrendingUp className="h-5 w-5 text-indigo-500" />, value: <AnimatedCounter end={3842} />, label: "Successful Transfers" },
              { icon: <DollarSign className="h-5 w-5 text-emerald-500" />, value: <><AnimatedCounter end={14} prefix="$" suffix="M+" /></>, label: "Volume Traded" },
              { icon: <Star className="h-5 w-5 text-amber-400" />, value: <AnimatedCounter end={4.98} decimals={2} suffix="★" />, label: "Average Rating" },
              { icon: <Lock className="h-5 w-5 text-slate-400" />, value: <AnimatedCounter end={100} suffix="%" />, label: "Escrow Protected" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">{s.icon}</div>
                <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform showcase ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">Browse by Platform</h2>
          <p className="text-slate-500 mt-2">5 platforms, thousands of verified accounts</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {PLATFORMS.map((p) => (
            <Link
              key={p}
              href={`/platform/${p.toLowerCase()}`}
              className="group relative rounded-xl overflow-hidden h-28 flex items-end p-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1"
              style={{ background: PLATFORM_GRADIENTS[p] }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="relative z-10">
                <div className="text-2xl mb-1">{PLATFORM_EMOJIS[p]}</div>
                <div className="text-white font-bold text-sm">{p}</div>
                <div className="text-white/60 text-xs flex items-center gap-1">
                  {SEED_LISTINGS.filter(l => l.platform === p).length} listings
                  <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Listings ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Featured Accounts</h2>
            <p className="text-slate-500 mt-1">Hand-picked, verified listings from top sellers</p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/marketplace" className="gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* ── Niche grid ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">Browse by Niche</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {NICHES.map((niche) => (
              <Link
                key={niche}
                href={`/marketplace?niche=${niche}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="text-2xl">{NICHE_EMOJIS[niche]}</span>
                <span className="text-xs font-semibold text-slate-700">{niche}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">How It Works</h2>
          <p className="text-slate-500 mt-2">Buy or sell in 4 simple steps · <Link href="/how-it-works" className="text-indigo-600 hover:underline">Full guide →</Link></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.step} className="relative">
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-slate-200 -translate-x-4 z-0" />
              )}
              <div className="bg-white rounded-xl border border-slate-200 p-6 relative z-10 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-indigo-500 mb-1">STEP {step.step}</div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">What Our Users Say</h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
              <span className="text-slate-500 text-sm ml-2">4.98 from 1,200+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${t.color}`}>{t.avatar}</div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                  <ShieldCheck className="h-4 w-4 text-emerald-500 ml-auto" aria-label="Verified buyer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-indigo-600 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.1),transparent)]" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to Buy Your Next Account?
          </h2>
          <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
            Join 50,000+ buyers and sellers on the most trusted social media account marketplace. Listing is always free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="xl" className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold" asChild>
              <Link href="/marketplace">Browse All Listings</Link>
            </Button>
            <Button size="xl" className="bg-indigo-500 text-white hover:bg-indigo-400 border border-indigo-400 font-bold" asChild>
              <Link href="/sell">Sell Your Account</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
