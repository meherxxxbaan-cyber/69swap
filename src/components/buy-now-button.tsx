"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OfferModal } from "@/components/offer-modal";
import { createClient } from "@/lib/supabase/client";
import type { Listing } from "@/lib/seed-data";
import { ShoppingCart, MessageSquare, Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface BuyNowButtonProps {
  listing: Listing;
}

export function BuyNowButton({ listing }: BuyNowButtonProps) {
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerSent, setOfferSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleBuyNow = async () => {
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      // Require login — redirect naturally, no scary message
      if (!user) {
        router.push(`/login?redirect=/listing/${listing.id}&action=buy`);
        return;
      }

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          listingTitle: `${listing.platform} — ${listing.username}`,
          price: listing.price,
          sellerId: listing.seller_id,
          buyerId: user.id,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-2.5">
        <button
          onClick={handleBuyNow}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white font-bold py-3.5 rounded-xl text-base transition-colors"
        >
          {loading ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Redirecting to Stripe…</>
          ) : (
            <><ShoppingCart className="h-5 w-5" /> Buy Now — Secure Checkout</>
          )}
        </button>

        {error && (
          <p className="text-xs text-red-500 text-center">{error}</p>
        )}

        <button
          onClick={() => setOfferOpen(true)}
          disabled={offerSent}
          className="w-full flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-indigo-300 hover:text-indigo-700 text-slate-700 font-semibold py-3 rounded-xl transition-all disabled:opacity-60"
        >
          <MessageSquare className="h-4 w-4" />
          {offerSent ? "✓ Offer Sent" : "Make an Offer"}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <Lock className="h-3 w-3" />
          Stripe escrow · 7-day inspection · Full refund guarantee
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
