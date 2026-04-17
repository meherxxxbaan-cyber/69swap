"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OfferModal } from "@/components/offer-modal";
import { createClient } from "@/lib/supabase/client";
import type { Listing } from "@/lib/seed-data";
import { ShoppingCart, MessageSquare, Loader2 } from "lucide-react";

interface BuyNowButtonProps {
  listing: Listing;
}

export function BuyNowButton({ listing }: BuyNowButtonProps) {
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerSent, setOfferSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBuyNow = async () => {
    setLoading(true);
    setError("");

    try {
      // Get current user if logged in
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          listingTitle: `${listing.platform} — ${listing.username}`,
          price: listing.price,
          sellerId: listing.seller_id,
          buyerId: user?.id || "guest",
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-2.5">
        <Button
          size="lg"
          variant="success"
          className="w-full text-base gap-2"
          onClick={handleBuyNow}
          disabled={loading}
        >
          {loading ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Redirecting to Stripe…</>
          ) : (
            <><ShoppingCart className="h-5 w-5" /> Buy Now — Secure Checkout</>
          )}
        </Button>

        {error && (
          <p className="text-xs text-red-500 text-center">{error}</p>
        )}

        <Button
          size="lg"
          variant="secondary"
          className="w-full gap-2"
          onClick={() => setOfferOpen(true)}
          disabled={offerSent}
        >
          <MessageSquare className="h-5 w-5" />
          {offerSent ? "✓ Offer Sent" : "Make an Offer"}
        </Button>
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
