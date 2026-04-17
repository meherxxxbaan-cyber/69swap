"use client";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { formatPrice, formatNumber } from "@/lib/utils";

const ITEMS = SEED_LISTINGS.slice(0, 14).map((l) => ({
  text: `${l.emoji} ${l.username} · ${formatNumber(l.followers)} followers · ${formatPrice(l.price)}`,
}));

export function SalesTicker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden bg-indigo-600 border-y border-indigo-700 py-2.5 relative select-none">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-indigo-600 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-indigo-600 to-transparent z-10 pointer-events-none" />
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{ animation: "ticker 50s linear infinite", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-sm text-indigo-100 font-medium flex-shrink-0 inline-flex items-center gap-2">
            <span className="text-indigo-400 text-xs">✦</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
