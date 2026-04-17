import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { ListingCard } from "@/components/listing-card";
import { BuyNowButton } from "@/components/buy-now-button";
import { RevenueCalculator } from "@/components/revenue-calculator";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { formatNumber, formatPrice } from "@/lib/utils";
import {
  CheckCircle, Users, DollarSign, TrendingUp,
  ShoppingBag, Zap, MapPin, Star, Shield, Clock,
  ChevronRight, Eye, BarChart3,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const l = SEED_LISTINGS.find((x) => x.id === id);
  if (!l) return {};
  return {
    title: `${l.username} — ${l.platform} ${formatNumber(l.followers)} followers | 69Swap`,
    description: `Buy ${l.username} on ${l.platform}. ${formatNumber(l.followers)} followers, ${l.engagement_rate}% engagement, ${formatPrice(l.monthly_income)}/mo income. Asking ${formatPrice(l.price)}. Escrow-protected.`,
    alternates: { canonical: `https://69swap.com/listing/${id}` },
  };
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const listing = SEED_LISTINGS.find((l) => l.id === id);
  if (!listing) notFound();

  const similar = SEED_LISTINGS.filter((l) => l.id !== id && l.platform === listing.platform).slice(0, 3);
  const platformFee = Math.round(listing.price * 0.03);
  const totalCost = listing.price + platformFee;
  const viewerCount = 5 + ((parseInt(id.replace("listing-", "")) * 7) % 20);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/marketplace" className="hover:text-slate-900 transition-colors">Marketplace</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/platform/${listing.platform.toLowerCase()}`} className="hover:text-slate-900 transition-colors">{listing.platform}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-900 font-medium truncate max-w-[160px]">{listing.username}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Hero card */}
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
              <div className="h-36 flex items-end px-6 pb-5 relative" style={{ background: listing.gradient }}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border border-white/30 shadow-lg">
                    {listing.emoji}
                  </div>
                  <div>
                    <h1 className="text-3xl font-extrabold text-white leading-tight">{listing.username}</h1>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-white/80 text-sm">{listing.platform}</span>
                      <span className="text-white/40 text-sm">·</span>
                      <span className="text-white/80 text-sm">{listing.niche_emoji} {listing.niche}</span>
                      {listing.featured && (
                        <span className="bg-amber-400/90 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">⭐ Featured</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="bg-white px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <Users className="h-5 w-5 text-indigo-500" />, value: formatNumber(listing.followers), label: "Followers", green: false },
                  { icon: <DollarSign className="h-5 w-5 text-emerald-500" />, value: formatPrice(listing.monthly_income), label: "Monthly Income", green: true },
                  { icon: <TrendingUp className="h-5 w-5 text-blue-500" />, value: `${listing.engagement_rate}%`, label: "Engagement", green: false },
                  { icon: <MapPin className="h-5 w-5 text-slate-400" />, value: listing.location, label: "Location", green: false },
                ].map((s) => (
                  <div key={s.label} className="text-center p-3 bg-slate-50 rounded-xl">
                    <div className="flex justify-center mb-2">{s.icon}</div>
                    <div className={`font-bold text-lg leading-tight ${s.green ? "text-emerald-600" : "text-slate-900"}`}>{s.value}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2">
              {listing.verified_income && (
                <Badge variant="success" className="gap-1.5 px-3 py-1.5 text-sm">
                  <CheckCircle className="h-3.5 w-3.5" /> Verified Income
                </Badge>
              )}
              {listing.monetized && (
                <Badge variant="indigo" className="gap-1.5 px-3 py-1.5 text-sm">
                  <Zap className="h-3.5 w-3.5" /> Monetized
                </Badge>
              )}
              {listing.tiktok_shop_eligible && (
                <Badge variant="warning" className="gap-1.5 px-3 py-1.5 text-sm">
                  <ShoppingBag className="h-3.5 w-3.5" /> TikTok Shop Eligible
                </Badge>
              )}
            </div>

            {/* Revenue Calculator */}
            <RevenueCalculator monthlyIncome={listing.monthly_income} price={listing.price} />

            {/* Description */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <h2 className="font-bold text-slate-900 mb-3">About This Account</h2>
              <p className="text-slate-600 leading-relaxed">{listing.description}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-4 text-sm text-slate-400 flex-wrap">
                <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" />{(viewerCount * 3) + 47} views today</span>
                <span className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4" />Listed {new Date(listing.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
            </div>

            {/* Income proof */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900">Income Proof & Analytics</h2>
                {listing.verified_income && (
                  <Badge variant="success" className="gap-1 text-xs">
                    <CheckCircle className="h-3 w-3" /> Independently Verified
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["Analytics Dashboard", "Audience Insights", "Revenue Screenshot"].map((label, i) => (
                  <div key={i} className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl aspect-video flex flex-col items-center justify-center gap-2 border border-slate-200 cursor-pointer hover:border-indigo-300 transition-colors group">
                    <BarChart3 className="h-7 w-7 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                    <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors text-center px-2">{label}</span>
                  </div>
                ))}
              </div>
              {!listing.verified_income && (
                <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
                  <Shield className="h-3 w-3" /> Screenshots provided by seller — not independently verified.
                </p>
              )}
            </div>

            {/* Seller card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <h2 className="font-bold text-slate-900 mb-4">About the Seller</h2>
              <div className="flex items-center gap-4">
                <Link href={`/profile/user-${(parseInt(id.replace("listing-", "")) % 5) + 1}`}>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg flex-shrink-0 hover:ring-2 hover:ring-indigo-300 transition-all">
                    {listing.seller_name[0]}
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/profile/user-${(parseInt(id.replace("listing-", "")) % 5) + 1}`} className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
                    {listing.seller_name}
                  </Link>
                  <div className="flex items-center gap-1.5 text-sm mt-0.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(listing.seller_rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                      ))}
                    </div>
                    <span className="font-medium text-slate-700">{listing.seller_rating}</span>
                    <span className="text-slate-400">· {listing.seller_sales} completed sales</span>
                  </div>
                </div>
                <Badge variant="success" className="gap-1 flex-shrink-0">
                  <CheckCircle className="h-3 w-3" /> Verified
                </Badge>
              </div>
            </div>

            {/* Similar */}
            {similar.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-900">Similar {listing.platform} Accounts</h2>
                  <Link href={`/platform/${listing.platform.toLowerCase()}`} className="text-sm text-indigo-600 hover:underline">
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similar.map((l) => <ListingCard key={l.id} listing={l} />)}
                </div>
              </div>
            )}
          </div>

          {/* ── Right sticky column ── */}
          <div>
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                <div className="text-4xl font-extrabold text-emerald-600 mb-0.5">{formatPrice(listing.price)}</div>
                <div className="text-sm text-slate-400 mb-5">Minimum offer: <span className="font-medium text-slate-600">{formatPrice(listing.minimum_offer)}</span></div>

                <div className="space-y-2.5 mb-5">
                  <BuyNowButton listing={listing} />
                </div>

                {/* Fee breakdown */}
                <div className="space-y-1.5 text-sm border-t border-slate-100 pt-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Account price</span>
                    <span>{formatPrice(listing.price)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-xs">
                    <span>Platform fee (3%)</span>
                    <span>{formatPrice(platformFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-100 mt-2">
                    <span>Total</span>
                    <span className="text-emerald-600">{formatPrice(totalCost)}</span>
                  </div>
                </div>
              </div>

              {/* Buyer protection */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-indigo-600" /> Buyer Protection
                </h3>
                <ul className="space-y-2">
                  {[
                    "Stripe escrow on all payments",
                    "7-day full inspection period",
                    "100% refund if not as described",
                    "24/7 dispute resolution team",
                    "All sellers KYC verified",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Live viewers */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                <p className="text-sm text-amber-800 font-medium flex-1">
                  {viewerCount} people viewing right now
                </p>
                <Clock className="h-4 w-4 text-amber-400 flex-shrink-0" />
              </div>

              {/* Quick stats */}
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Multiple of income</div>
                    <div className="text-lg font-bold text-slate-900">
                      {listing.monthly_income > 0 ? `${(listing.price / listing.monthly_income).toFixed(1)}×` : "—"}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Cost per follower</div>
                    <div className="text-lg font-bold text-slate-900">
                      ${(listing.price / listing.followers).toFixed(3)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return SEED_LISTINGS.map((l) => ({ id: l.id }));
}
