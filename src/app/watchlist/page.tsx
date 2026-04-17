"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/hooks/useWatchlist";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WatchlistPage() {
  const { ids, hydrated } = useWatchlist();
  const saved = SEED_LISTINGS.filter((l) => ids.has(l.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-6 w-6 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-extrabold text-slate-900">Saved Accounts</h1>
          {hydrated && saved.length > 0 && (
            <span className="ml-2 bg-red-100 text-red-700 text-sm font-bold px-2.5 py-0.5 rounded-full">{saved.length}</span>
          )}
        </div>

        {!hydrated ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-white rounded-xl border border-slate-200 animate-pulse" />)}
          </div>
        ) : saved.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
              <Heart className="h-10 w-10 text-red-200" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No saved accounts yet</h2>
            <p className="text-slate-500 mb-6 text-sm">Click the ♥ on any listing to save it here for later.</p>
            <Button asChild><Link href="/marketplace" className="gap-2">Browse Accounts <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {saved.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
            <div className="mt-8 text-center">
              <Button variant="secondary" asChild><Link href="/marketplace">Browse more listings</Link></Button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
