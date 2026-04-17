"use client";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNumber, formatPrice } from "@/lib/utils";
import type { Listing } from "@/lib/seed-data";
import { OfferModal } from "@/components/offer-modal";
import { useWatchlist } from "@/hooks/useWatchlist";
import {
  CheckCircle, TrendingUp, Users, DollarSign,
  ShoppingBag, Zap, Star, GitCompare, Heart,
} from "lucide-react";

interface ListingCardProps {
  listing: Listing;
  compareSelected?: boolean;
  onCompareToggle?: (listing: Listing) => void;
  showCompare?: boolean;
}

export function ListingCard({ listing, compareSelected, onCompareToggle, showCompare }: ListingCardProps) {
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerSent, setOfferSent] = useState(false);
  const { toggle, has, hydrated } = useWatchlist();
  const saved = hydrated && has(listing.id);

  return (
    <>
      <div
        className={`bg-white rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.11)] transition-all duration-200 hover:-translate-y-0.5 overflow-hidden flex flex-col group ${
          compareSelected ? "border-indigo-400 ring-2 ring-indigo-100" : "border-slate-200"
        }`}
      >
        {/* Platform gradient header */}
        <div
          className="h-[76px] relative flex items-end px-4 pb-3 overflow-hidden flex-shrink-0"
          style={{ background: listing.gradient }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0">{listing.emoji}</span>
            <div className="min-w-0">
              <div className="text-white font-bold text-sm leading-tight truncate">{listing.username}</div>
              <div className="text-white/70 text-xs">{listing.platform}</div>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {listing.featured && (
              <div className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">⭐ TOP</div>
            )}

            {/* Watchlist heart */}
            <button
              onClick={(e) => { e.preventDefault(); toggle(listing.id); }}
              className={`p-1.5 rounded-lg transition-all duration-150 ${
                saved
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              aria-label={saved ? "Remove from watchlist" : "Save to watchlist"}
            >
              <Heart className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
            </button>

            {/* Compare toggle */}
            {showCompare && (
              <button
                onClick={(e) => { e.preventDefault(); onCompareToggle?.(listing); }}
                className={`p-1.5 rounded-lg transition-all duration-150 ${
                  compareSelected ? "bg-indigo-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
                }`}
                aria-label="Compare"
              >
                <GitCompare className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col gap-3">
          {/* Niche + location */}
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{listing.niche_emoji}</span>
            <Badge variant="default" className="text-xs">{listing.niche}</Badge>
            <span className="text-[11px] text-slate-400 ml-auto truncate max-w-[90px]">{listing.location}</span>
          </div>

          {/* Metric boxes */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { icon: <Users className="h-3 w-3 text-slate-400 mx-auto mb-0.5" />,         val: formatNumber(listing.followers),         label: "Followers", green: false },
              { icon: <DollarSign className="h-3 w-3 text-emerald-400 mx-auto mb-0.5" />,  val: formatPrice(listing.monthly_income),      label: "Mo. Income", green: true  },
              { icon: <TrendingUp className="h-3 w-3 text-blue-400 mx-auto mb-0.5" />,     val: `${listing.engagement_rate}%`,            label: "Engage",     green: false },
            ].map((m) => (
              <div key={m.label} className="bg-slate-50 rounded-lg p-2 text-center">
                {m.icon}
                <div className={`text-sm font-bold leading-tight ${m.green ? "text-emerald-600" : "text-slate-900"}`}>{m.val}</div>
                <div className="text-[10px] text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-1">
            {listing.verified_income && (
              <Badge variant="success" className="text-[10px] gap-1 px-1.5 py-0.5">
                <CheckCircle className="h-2.5 w-2.5" /> Verified
              </Badge>
            )}
            {listing.monetized && (
              <Badge variant="indigo" className="text-[10px] gap-1 px-1.5 py-0.5">
                <Zap className="h-2.5 w-2.5" /> Monetized
              </Badge>
            )}
            {listing.tiktok_shop_eligible && (
              <Badge variant="warning" className="text-[10px] gap-1 px-1.5 py-0.5">
                <ShoppingBag className="h-2.5 w-2.5" /> Shop
              </Badge>
            )}
          </div>

          {/* Seller rating */}
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-medium text-slate-600">{listing.seller_rating}</span>
            <span>·</span>
            <span>{listing.seller_sales} sales</span>
            <Link href={`/profile/${listing.seller_id}`} className="ml-auto text-indigo-500 hover:text-indigo-700 hover:underline text-[10px] truncate max-w-[70px]">
              {listing.seller_name}
            </Link>
          </div>

          {/* Price + CTAs */}
          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div>
              <div className="text-xl font-extrabold text-emerald-600">{formatPrice(listing.price)}</div>
              <div className="text-[10px] text-slate-400">Min: {formatPrice(listing.minimum_offer)}</div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Button size="sm" variant="success" asChild className="text-xs px-3">
                <Link href={`/listing/${listing.id}`}>Buy Now</Link>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="text-xs px-3"
                onClick={() => setOfferOpen(true)}
                disabled={offerSent}
              >
                {offerSent ? "✓ Offered" : "Make Offer"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {offerOpen && (
        <OfferModal
          listing={listing}
          onClose={() => setOfferOpen(false)}
          onSubmit={() => { setOfferSent(true); setOfferOpen(false); }}
        />
      )}
    </>
  );
}
