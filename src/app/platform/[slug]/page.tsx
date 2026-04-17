import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { PLATFORMS, PLATFORM_GRADIENTS, PLATFORM_EMOJIS, formatNumber, formatPrice } from "@/lib/utils";
import type { Platform } from "@/lib/utils";
import { ArrowRight, TrendingUp, Users, DollarSign, ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const PLATFORM_MAP: Record<string, Platform> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  x: "X",
  telegram: "Telegram",
};

const PLATFORM_INFO: Record<Platform, { tagline: string; description: string; why: string[] }> = {
  TikTok: {
    tagline: "The fastest-growing social platform",
    description: "TikTok accounts offer explosive growth potential, viral reach, and some of the highest engagement rates in social media. Shop-eligible accounts can generate passive income through affiliate sales.",
    why: ["Highest engagement rates (avg 8–15%)", "TikTok Shop monetization available", "Viral algorithm favors new owners", "Young demographic (18–34) — premium CPM"],
  },
  Instagram: {
    tagline: "The gold standard for brand deals",
    description: "Instagram remains the top platform for influencer marketing. Established accounts command premium brand deal rates with Fashion, Beauty, Fitness, and Lifestyle brands paying top dollar.",
    why: ["Brand deal rates: $1K–$50K per post", "Reels & Stories monetization", "Shoppable posts built-in", "Premium 25–45 demographic"],
  },
  YouTube: {
    tagline: "Evergreen content, recurring revenue",
    description: "YouTube channels provide stable, recurring AdSense income that compounds over time. Evergreen content keeps generating views and revenue years after publishing.",
    why: ["AdSense CPM: $5–$25+", "Revenue grows month-over-month", "Sponsorship rates highest per view", "YouTube Premium revenue share"],
  },
  X: {
    tagline: "High-value audiences, direct reach",
    description: "X (Twitter) accounts in Finance, Crypto, Tech, and News niches have uniquely valuable, high-income audiences that are hard to find elsewhere. Paid subscriptions via X Premium available.",
    why: ["Finance/Crypto CPM: highest on any platform", "X Premium subscription revenue", "Direct newsletter integration", "High-trust authority positioning"],
  },
  Telegram: {
    tagline: "The subscription revenue machine",
    description: "Telegram channels with subscription models are pure cash-flow businesses. Crypto signals, finance, and premium content channels can generate $5K–$50K/month in recurring subscriptions.",
    why: ["Subscription revenue: fully recurring", "No algorithm — guaranteed reach", "Premium channel monetization", "Global audience, zero censorship risk"],
  },
};

export default async function PlatformPage({ params }: Props) {
  const { slug } = await params;
  const platform = PLATFORM_MAP[slug.toLowerCase()];
  if (!platform) notFound();

  const listings = SEED_LISTINGS.filter((l) => l.platform === platform);
  const info = PLATFORM_INFO[platform];
  const avgPrice = Math.round(listings.reduce((s, l) => s + l.price, 0) / listings.length);
  const avgFollowers = Math.round(listings.reduce((s, l) => s + l.followers, 0) / listings.length);
  const avgEngagement = (listings.reduce((s, l) => s + l.engagement_rate, 0) / listings.length).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-16"
        style={{ background: PLATFORM_GRADIENTS[platform] }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/marketplace" className="hover:text-white">Marketplace</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{platform}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{PLATFORM_EMOJIS[platform]}</div>
            <div>
              <h1 className="text-4xl font-extrabold text-white">{platform} Accounts for Sale</h1>
              <p className="text-white/70 mt-1">{info.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-xl">
            {[
              { icon: <TrendingUp className="h-4 w-4" />, value: `${listings.length} listed`, label: "Available now" },
              { icon: <Users className="h-4 w-4" />, value: formatNumber(avgFollowers), label: "Avg followers" },
              { icon: <DollarSign className="h-4 w-4" />, value: formatPrice(avgPrice), label: "Avg price" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-1.5 text-white/60 text-xs mb-1.5">{s.icon}{s.label}</div>
                <div className="text-xl font-bold text-white">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar info */}
          <aside className="lg:col-span-1 space-y-5">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-3">Why {platform}?</h3>
              <ul className="space-y-2.5">
                {info.why.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Market Stats</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Avg engagement", value: `${avgEngagement}%` },
                  { label: "Avg price", value: formatPrice(avgPrice) },
                  { label: "Avg followers", value: formatNumber(avgFollowers) },
                  { label: "Listings", value: listings.length.toString() },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between">
                    <span className="text-slate-500">{s.label}</span>
                    <span className="font-semibold text-slate-900">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-5">
              <h3 className="font-bold text-indigo-900 mb-1 text-sm">Selling a {platform} account?</h3>
              <p className="text-xs text-indigo-600 mb-3">List for free and reach 50,000+ buyers.</p>
              <Button size="sm" className="w-full" asChild>
                <Link href="/sell">List for Free <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
              </Button>
            </div>
          </aside>

          {/* Listings grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                {listings.length} {platform} accounts
              </h2>
              <Button variant="secondary" size="sm" asChild>
                <Link href={`/marketplace?platform=${platform}`}>All filters</Link>
              </Button>
            </div>

            {listings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {listings.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-5xl mb-3">{PLATFORM_EMOJIS[platform]}</div>
                <p className="text-slate-500">No {platform} listings right now. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(PLATFORM_MAP).map((slug) => ({ slug }));
}
