import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";

/**
 * A single parameter's current-value card (pH / Turbidity / TDS).
 * `trend` is the difference vs. the previous month's demo reading.
 */
export default function MetricCard({ label, value, unit, status, trend, icon: Icon }) {
  const trendDirection = trend > 0.01 ? "up" : trend < -0.01 ? "down" : "flat";
  const TrendIcon =
    trendDirection === "up" ? ArrowUpRight : trendDirection === "down" ? ArrowDownRight : Minus;

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 flex flex-col gap-4 animate-driftUp">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5 text-stone-400">
          {Icon ? <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" /> : null}
          <span className="text-sm">{label}</span>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="data-figure text-4xl sm:text-[2.65rem] leading-none text-stone-50">
            {value}
          </span>
          {unit ? <span className="text-sm text-stone-500">{unit}</span> : null}
        </div>
        <div
          className={`flex items-center gap-0.5 text-xs ${
            trendDirection === "up"
              ? "text-signal-watch"
              : trendDirection === "down"
              ? "text-seam-300"
              : "text-stone-500"
          }`}
        >
          <TrendIcon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          <span className="data-figure">{Math.abs(trend).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
