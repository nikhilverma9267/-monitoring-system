import { Droplet, Waves, Gauge, Info } from "lucide-react";
import { PLANTS } from "../data/plants.js";
import { getMonthlySeries, getCurrentReading } from "../data/demoWaterQuality.js";
import { THRESHOLDS } from "../config/thresholds.js";
import { getParameterStatus, getOverallStatus } from "../utils/waterQualityStatus.js";
import MetricCard from "./MetricCard.jsx";
import StatusBadge from "./StatusBadge.jsx";
import WaterQualityChart from "./WaterQualityChart.jsx";

export default function WaterQualityDashboard({ selectedPlantId }) {
  const plant = PLANTS.find((p) => p.id === selectedPlantId) ?? PLANTS[0];
  const series = getMonthlySeries(plant.id);
  const current = getCurrentReading(plant.id);
  const previous = series[series.length - 2] ?? current;
  const overall = getOverallStatus(current);

  const metrics = [
    {
      key: "ph",
      icon: Droplet,
      label: THRESHOLDS.ph.label,
      value: current.ph.toFixed(2),
      unit: THRESHOLDS.ph.unit,
      trend: current.ph - previous.ph,
      status: getParameterStatus("ph", current.ph),
    },
    {
      key: "turbidity",
      icon: Waves,
      label: THRESHOLDS.turbidity.label,
      value: current.turbidity.toFixed(1),
      unit: THRESHOLDS.turbidity.unit,
      trend: current.turbidity - previous.turbidity,
      status: getParameterStatus("turbidity", current.turbidity),
    },
    {
      key: "tds",
      icon: Gauge,
      label: THRESHOLDS.tds.label,
      value: current.tds,
      unit: THRESHOLDS.tds.unit,
      trend: current.tds - previous.tds,
      status: getParameterStatus("tds", current.tds),
    },
  ];

  return (
    <section id="dashboard" className="py-16 sm:py-24 scroll-mt-20">
      <div className="section-shell">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs tracking-[0.14em] text-depth-400">Water quality dashboard</span>
            <h2 className="font-display text-3xl sm:text-4xl text-stone-50 mt-2">{plant.name}</h2>
            <p className="text-stone-500 text-sm mt-1">
              Last updated · {series[series.length - 1]?.month} (demo cycle) — Overall status:{" "}
              <span className="align-middle inline-block ml-1">
                <StatusBadge status={overall} size="sm" />
              </span>
            </p>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-signal-watch/25 bg-signal-watch/[0.06] px-3.5 py-2.5 max-w-sm">
            <Info className="h-4 w-4 text-signal-watch shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-stone-300 leading-relaxed">
              <span className="font-medium text-signal-watch">DEMO DATA</span> — replace with
              live sensor / API data before operational use.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {metrics.map((m) => (
            <MetricCard
              key={m.key}
              icon={m.icon}
              label={m.label}
              value={m.value}
              unit={m.unit}
              status={m.status}
              trend={m.trend}
            />
          ))}
        </div>

        <div className="mt-6">
          <WaterQualityChart series={series} />
        </div>
      </div>
    </section>
  );
}
