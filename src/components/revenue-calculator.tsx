"use client";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { TrendingUp, DollarSign, Calculator } from "lucide-react";

interface RevenueCalculatorProps {
  monthlyIncome: number;
  price: number;
}

export function RevenueCalculator({ monthlyIncome, price }: RevenueCalculatorProps) {
  const [growthRate, setGrowthRate] = useState(10); // % monthly growth
  const [months, setMonths] = useState(12);

  const projectedIncome = Array.from({ length: months }, (_, i) =>
    Math.round(monthlyIncome * Math.pow(1 + growthRate / 100, i))
  );
  const totalRevenue = projectedIncome.reduce((a, b) => a + b, 0);
  const roi = totalRevenue > 0 ? Math.round(((totalRevenue - price) / price) * 100) : 0;
  const breakEvenMonth = projectedIncome.findIndex((_, i) =>
    projectedIncome.slice(0, i + 1).reduce((a, b) => a + b, 0) >= price
  ) + 1;
  const maxBar = Math.max(...projectedIncome);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <h2 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
        <Calculator className="h-5 w-5 text-indigo-500" />
        ROI Calculator
      </h2>
      <p className="text-slate-500 text-sm mb-5">Project your return based on growth assumptions.</p>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-2">
            Monthly growth rate: <span className="text-indigo-600">{growthRate}%</span>
          </label>
          <input
            type="range" min={0} max={50} step={5} value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>0% (flat)</span><span>25%</span><span>50%</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-2">
            Projection period: <span className="text-indigo-600">{months} months</span>
          </label>
          <input
            type="range" min={6} max={36} step={6} value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>6mo</span><span>18mo</span><span>36mo</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-emerald-50 rounded-xl p-3 text-center">
          <div className="text-xs text-emerald-600 mb-1 font-medium">Total Revenue</div>
          <div className="text-lg font-extrabold text-emerald-700">{formatPrice(totalRevenue)}</div>
        </div>
        <div className={`rounded-xl p-3 text-center ${roi >= 0 ? "bg-indigo-50" : "bg-red-50"}`}>
          <div className={`text-xs mb-1 font-medium ${roi >= 0 ? "text-indigo-600" : "text-red-500"}`}>ROI</div>
          <div className={`text-lg font-extrabold ${roi >= 0 ? "text-indigo-700" : "text-red-600"}`}>
            {roi >= 0 ? "+" : ""}{roi}%
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl p-3 text-center">
          <div className="text-xs text-amber-600 mb-1 font-medium">Break Even</div>
          <div className="text-lg font-extrabold text-amber-700">
            {breakEvenMonth > 0 && breakEvenMonth <= months ? `Mo. ${breakEvenMonth}` : "—"}
          </div>
        </div>
      </div>

      {/* Mini bar chart */}
      <div className="space-y-1.5">
        <div className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5 text-indigo-500" /> Monthly income projection
        </div>
        <div className="flex items-end gap-1 h-20">
          {projectedIncome.map((val, i) => {
            const h = maxBar > 0 ? Math.round((val / maxBar) * 100) : 0;
            const isBreakEven = i + 1 === breakEvenMonth;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5 group relative">
                <div
                  className={`w-full rounded-t transition-all ${isBreakEven ? "bg-amber-400" : "bg-indigo-200 group-hover:bg-indigo-400"}`}
                  style={{ height: `${Math.max(h, 4)}%` }}
                />
                {/* Tooltip */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {formatPrice(val)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>Month 1</span>
          <span>Month {Math.round(months / 2)}</span>
          <span>Month {months}</span>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 mt-3">
        * Projections are illustrative only. Actual results depend on content quality, algorithm changes, and market conditions.
      </p>
    </div>
  );
}
