import { useEffect, useMemo, useState } from "react";
import { Radio, Clock, Satellite } from "lucide-react";
import { PLANTS } from "../data/plants.js";
import { getCurrentReading } from "../data/demoWaterQuality.js";
import { getParameterStatus } from "../utils/waterQualityStatus.js";
import { THRESHOLDS } from "../config/thresholds.js";
import StatusBadge from "./StatusBadge.jsx";

/**
 * SIMULATED LIVE DATA.
 *
 * No sensor or WebSocket connection exists yet. This component takes
 * the plant's current demo reading and perturbs it slightly every
 * few seconds so the panel behaves like a live feed. Swap the
 * `useEffect` body below for a WebSocket subscription (or polling a
 * REST endpoint) to go live — the rest of the component doesn't need
 * to change since it just renders whatever is in `live`.
 */
function jitter(value, amount) {
  return value + (Math.random() - 0.5) * amount;
}

export default function LiveMonitoring({ selectedPlantId }) {
  const plant = PLANTS.find((p) => p.id === selectedPlantId) ?? PLANTS[0];
  const base = useMemo(() => getCurrentReading(plant.id), [plant]);

  const [live, setLive] = useState(base);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    setLive(base);
    setLastUpdated(new Date());
  }, [base]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLive((prev) => ({
        ph: Math.min(9.4, Math.max(5.8, jitter(prev.ph, 0.08))),
        turbidity: Math.min(13, Math.max(0.3, jitter(prev.turbidity, 0.35))),
        tds: Math.min(1150, Math.max(100, jitter(prev.tds, 12))),
      }));
      setLastUpdated(new Date());
    }, 4000);
    return () => clearInterval(interval);
  }, [plant.id]);

  const rows = [
    {
      key: "ph",
      label: THRESHOLDS.ph.label,
      value: live.ph.toFixed(2),
      unit: THRESHOLDS.ph.unit,
      status: getParameterStatus("ph", live.ph),
    },
    {
      key: "turbidity",
      label: THRESHOLDS.turbidity.label,
      value: live.turbidity.toFixed(1),
      unit: THRESHOLDS.turbidity.unit,
      status: getParameterStatus("turbidity", live.turbidity),
    },
    {
      key: "tds",
      label: THRESHOLDS.tds.label,
      value: Math.round(live.tds),
      unit: THRESHOLDS.tds.unit,
      status: getParameterStatus("tds", live.tds),
    },
  ];

  return (
    <section id="live" className="py-16 sm:py-24 scroll-mt-20">
      <div className="section-shell">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs tracking-[0.14em] text-depth-400">Live monitoring</span>
            <h2 className="font-display text-3xl sm:text-4xl text-stone-50 mt-2">
              {plant.name}, streaming now
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-depth-500/25 bg-depth-500/[0.06] px-3.5 py-2.5">
            <Satellite className="h-4 w-4 text-depth-400" aria-hidden="true" />
            <span className="text-xs text-stone-300">
              <span className="text-depth-400 font-medium">SIMULATED LIVE DATA</span> — not connected
              to a physical sensor
            </span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-seam-400 animate-pulseRing" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-seam-400" />
              </span>
              <span className="text-sm font-medium text-stone-100 tracking-wide flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-seam-300" aria-hidden="true" />
                Live monitoring — DEMO
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-500">
              <span>
                Connection: <span className="text-seam-300 font-medium">DEMO</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Last updated {lastUpdated.toLocaleTimeString()}
              </span>
              <span>
                Plant: <span className="text-stone-300">{plant.name}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-6">
            {rows.map((row) => (
              <div key={row.key} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-stone-400">{row.label}</span>
                  <StatusBadge status={row.status} size="sm" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="data-figure text-3xl text-stone-50 transition-all">{row.value}</span>
                  {row.unit ? <span className="text-xs text-stone-500">{row.unit}</span> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
