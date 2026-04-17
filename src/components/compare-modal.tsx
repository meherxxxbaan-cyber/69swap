"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatPrice } from "@/lib/utils";
import type { Listing } from "@/lib/seed-data";
import { X, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CompareModalProps {
  listings: Listing[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

type MetricRow = { label: string; key: keyof Listing; format?: (v: unknown) => string; best?: "max" | "min" };

const ROWS: MetricRow[] = [
  { label: "Platform",      key: "platform" },
  { label: "Followers",     key: "followers",       format: (v) => formatNumber(v as number), best: "max" },
  { label: "Monthly Income",key: "monthly_income",  format: (v) => formatPrice(v as number),  best: "max" },
  { label: "Engagement",    key: "engagement_rate", format: (v) => `${v}%`,                   best: "max" },
  { label: "Asking Price",  key: "price",           format: (v) => formatPrice(v as number),  best: "min" },
  { label: "Niche",         key: "niche" },
  { label: "Location",      key: "location" },
  { label: "Verified Income",key: "verified_income" },
  { label: "Monetized",     key: "monetized" },
  { label: "TikTok Shop",   key: "tiktok_shop_eligible" },
];

export function CompareModal({ listings, onClose, onRemove }: CompareModalProps) {
  const getBest = (row: MetricRow): number | null => {
    if (!row.best || !row.format) return null;
    const vals = listings.map((l) => l[row.key] as number);
    return row.best === "max" ? Math.max(...vals) : Math.min(...vals);
  };

  const renderCell = (listing: Listing, row: MetricRow) => {
    const raw = listing[row.key];
    if (typeof raw === "boolean") {
      return raw
        ? <CheckCircle className="h-4 w-4 text-emerald-500 mx-auto" />
        : <XCircle className="h-4 w-4 text-slate-300 mx-auto" />;
    }
    const formatted = row.format ? row.format(raw) : String(raw);
    const best = getBest(row);
    const isBest = best !== null && raw === best;
    return (
      <span className={isBest ? "font-bold text-emerald-600" : "text-slate-700"}>
        {formatted}
        {isBest && <span className="ml-1 text-[10px] text-emerald-500">▲ best</span>}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-slate-900">Compare Accounts ({listings.length}/4)</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Account headers */}
            <thead>
              <tr>
                <th className="w-36 py-4 px-6 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50">
                  Metric
                </th>
                {listings.map((l) => (
                  <th key={l.id} className="py-4 px-4 min-w-[180px]">
                    <div className="relative">
                      <div
                        className="h-14 rounded-xl flex items-center px-3 gap-2 mb-2"
                        style={{ background: l.gradient }}
                      >
                        <span className="text-xl">{l.emoji}</span>
                        <div className="text-left">
                          <div className="text-white font-bold text-sm leading-tight truncate max-w-[120px]">{l.username}</div>
                          <div className="text-white/70 text-xs">{l.platform}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(l.id)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 text-xs"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.key} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="py-3 px-6 text-sm font-medium text-slate-500 whitespace-nowrap">{row.label}</td>
                  {listings.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-sm text-center">
                      {renderCell(l, row)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* CTA row */}
              <tr className="border-t border-slate-200">
                <td className="py-4 px-6 text-sm font-semibold text-slate-900">Price</td>
                {listings.map((l) => (
                  <td key={l.id} className="py-4 px-4 text-center">
                    <div className="text-lg font-extrabold text-emerald-600 mb-2">{formatPrice(l.price)}</div>
                    <Button size="sm" variant="success" asChild className="w-full gap-1">
                      <Link href={`/listing/${l.id}`}>
                        View <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
