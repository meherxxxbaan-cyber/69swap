"use client";
import { useState } from "react";
import Link from "next/link";
import { formatNumber, formatPrice } from "@/lib/utils";
import type { Listing } from "@/lib/seed-data";
import { OfferModal } from "@/components/offer-modal";
import { PlatformIcon } from "@/components/platform-icons";
import { useWatchlist } from "@/hooks/useWatchlist";
import { CheckCircle, TrendingUp, Users, DollarSign, ShoppingBag, Zap, Star, GitCompare, Heart, ImageIcon } from "lucide-react";

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
      <div className={`bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl border ${compareSelected ? "border-indigo-400 ring-2 ring-indigo-100 shadow-lg" : "border-slate-200 shadow-sm"}`}>

        {/* Platform header - clean gradient with real icon */}
        <div className="relative h-[88px] flex items-center px-4 gap-3" style={{ background: listing.gradient }}>
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Platform icon circle */}
          <div className="relative z-10 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 flex-shrink-0">
            <PlatformIcon platform={listing.platform} size={22} />
          </div>

          {/* Username + platform */}
          <div className="relative z-10 flex-1 min-w-0">
            <div className="text-white font-bold text-base leading-tight truncate">{listing.username}</div>
            <div className="text-white/70 text-xs mt-0.5">{listing.platform} · {listing.niche}</div>
          </div>

          {/* Action buttons */}
          <div className="relative z-10 flex items-center gap-1.5 flex-shrink-0">
            {listing.featured && (
              <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">Featured</span>
            )}
            <button
              onClick={(e) => { e.preventDefault(); toggle(listing.id); }}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${saved ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}
            >
              <Heart className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
            </button>
            {showCompare && (
              <button
                onClick={(e) => { e.preventDefault(); onCompareToggle?.(listing); }}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${compareSelected ? "bg-indigo-500 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}
              >
                <GitCompare className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Image preview strip - shows if listing has images */}
        <div className="flex gap-1 px-4 pt-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 h-14 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 overflow-hidden">
              <ImageIcon className="h-4 w-4 text-slate-300" />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="px-4 pt-3 pb-0 grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <Users className="h-3 w-3" />
            </div>
            <div className="text-sm font-bold text-slate-900">{formatNumber(listing.followers)}</div>
            <div className="text-[10px] text-slate-400">Followers</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <DollarSign className="h-3 w-3" />
            </div>
            <div className="text-sm font-bold text-emerald-600">{formatPrice(listing.monthly_income)}</div>
            <div className="text-[10px] text-slate-400">Mo. Income</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <TrendingUp className="h-3 w-3" />
            </div>
            <div className="text-sm font-bold text-slate-900">{listing.engagement_rate}%</div>
            <div className="text-[10px] text-slate-400">Engagement</div>
          </div>
        </div>

        {/* Badges */}
        <div className="px-4 pt-2.5 flex flex-wrap gap-1">
          {listing.verified_income && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
              <CheckCircle className="h-2.5 w-2.5" /> Verified Income
            </span>
          )}
          {listing.monetized && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
              <Zap className="h-2.5 w-2.5" /> Monetized
            </span>
          )}
          {listing.tiktok_shop_eligible && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
              <ShoppingBag className="h-2.5 w-2.5" /> Shop
            </span>
          )}
        </div>

        {/* Seller + location */}
        <div className="px-4 pt-2 flex items-center gap-1.5 text-xs text-slate-400">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="font-medium text-slate-600">{listing.seller_rating}</span>
          <span>·</span>
          <span>{listing.seller_sales} sales</span>
          <span>·</span>
          <span className="truncate">{listing.location}</span>
        </div>

        {/* Price + CTA */}
        <div className="p-4 mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-2xl font-extrabold text-slate-900">{formatPrice(listing.price)}</div>
              <div className="text-[11px] text-slate-400">Min offer: {formatPrice(listing.minimum_offer)}</div>
            </div>
            <Link href={`/listing/${listing.id}`} className="text-xs text-indigo-600 hover:underline font-medium">
              View Details →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/listing/${listing.id}`}
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
            >
              Buy Now
            </Link>
            <button
              onClick={() => setOfferOpen(true)}
              disabled={offerSent}
              className="flex items-center justify-center border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium py-2.5 rounded-xl transition-colors disabled:opacity-60"
            >
              {offerSent ? "✓ Offered" : "Make Offer"}
            </button>
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
