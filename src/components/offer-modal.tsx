"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/utils";
import type { Listing } from "@/lib/seed-data";
import { X, DollarSign, MessageSquare, Send } from "lucide-react";

interface OfferModalProps {
  listing: Listing;
  onClose: () => void;
  onSubmit: (amount: number, message: string) => void;
}

export function OfferModal({ listing, onClose, onSubmit }: OfferModalProps) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!amount || Number(amount) < listing.minimum_offer) return;
    setSubmitted(true);
    onSubmit(Number(amount), message);
  };

  const pct = amount ? Math.round((Number(amount) / listing.price) * 100) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="h-16 rounded-t-2xl flex items-center px-5 gap-3"
          style={{ background: listing.gradient }}
        >
          <span className="text-2xl">{listing.emoji}</span>
          <div className="flex-1">
            <div className="text-white font-bold">{listing.username}</div>
            <div className="text-white/70 text-xs">Make an offer</div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {!submitted ? (
            <>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-slate-500">Asking price</span>
                <span className="font-bold text-emerald-600">{formatPrice(listing.price)}</span>
              </div>
              <div className="flex justify-between text-sm mb-5 pb-4 border-b border-slate-100">
                <span className="text-slate-500">Minimum offer</span>
                <span className="font-semibold text-slate-700">{formatPrice(listing.minimum_offer)}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Your Offer Amount</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="number"
                      placeholder={`Min ${formatPrice(listing.minimum_offer)}`}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  {pct && (
                    <p className={`text-xs mt-1 ${pct >= 90 ? "text-emerald-600" : pct >= 75 ? "text-amber-600" : "text-red-500"}`}>
                      {pct}% of asking price · {pct >= 90 ? "Strong offer" : pct >= 75 ? "Fair offer" : "Low offer — seller may decline"}
                    </p>
                  )}
                  {amount && Number(amount) < listing.minimum_offer && (
                    <p className="text-xs mt-1 text-red-500">Below minimum offer of {formatPrice(listing.minimum_offer)}</p>
                  )}
                </div>

                <div>
                  <Label>Message to Seller <span className="text-slate-400 font-normal">(optional)</span></Label>
                  <div className="relative mt-1.5">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <textarea
                      className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[80px] resize-none"
                      placeholder="Explain why you're interested, your timeline, etc."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  className="w-full gap-2"
                  onClick={handleSubmit}
                  disabled={!amount || Number(amount) < listing.minimum_offer}
                >
                  <Send className="h-4 w-4" /> Send Offer
                </Button>
                <p className="text-xs text-slate-400 text-center">
                  Offers expire in 48 hours. No payment captured until accepted.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Offer Sent!</h3>
              <p className="text-slate-500 text-sm mb-1">Your offer of <strong className="text-emerald-600">{formatPrice(Number(amount))}</strong> has been sent.</p>
              <p className="text-slate-400 text-xs mb-5">The seller has 48 hours to respond.</p>
              <Button variant="secondary" onClick={onClose} className="w-full">Close</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
