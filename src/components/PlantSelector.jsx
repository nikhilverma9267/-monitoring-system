import { Check, MapPin } from "lucide-react";
import { STATES} from "../data/plants.js";
import { getCurrentReading } from "../data/demoWaterQuality.js";
import { getOverallStatus, STATUS_STYLES } from "../utils/waterQualityStatus.js";
import StatusBadge from "./StatusBadge.jsx";

export default function PlantSelector({
  selectedState,
  onSelectState,
  plants,
  selectedPlantId,
  onSelectPlant,
}) {
  return (
    <section id="plants" className="py-16 sm:py-24 scroll-mt-20">
      <div className="section-shell">
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-xs tracking-[0.14em] text-seam-300">Site selection</span>
          <h2 className="font-display text-3xl sm:text-4xl text-stone-50">Plants &amp; monitored areas</h2>
          <p className="text-stone-400 max-w-2xl mt-1">
            Choose a state, then a monitored water source, to load its readings across the
            dashboard, chart, alerts, live panel and map below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <div className="glass-panel rounded-2xl p-5 h-fit">
            <label htmlFor="state-select" className="block text-xs text-stone-500 mb-2">
              State
            </label>
            <div className="relative">
              <select
  id="state-select"
  value={selectedState}
  onChange={(e) => onSelectState(e.target.value)}
  className="w-full appearance-none rounded-lg bg-base-800/80 border border-stone-700"
>
  {STATES.map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
  ))}
</select>
              <Check className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-seam-400" aria-hidden="true" />
            </div>
            <p className="text-xs text-stone-600 mt-3 leading-relaxed">
              Additional states can be added here as the monitoring network expands beyond
              Jharkhand.
            </p>
          </div>

          <div
            role="listbox"
            aria-label="Monitored mining areas"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5"
          >
            {plants.map((plant) => {
              const reading = getCurrentReading(plant.id);
              const status = getOverallStatus(reading);
              const isSelected = plant.id === selectedPlantId;
              const style = STATUS_STYLES[status];

              return (
                <button
                  key={plant.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelectPlant(plant.id)}
                  className={`text-left rounded-xl p-4 border transition-all ${
                    isSelected
                      ? "bg-seam-500/[0.08] border-seam-400/50 shadow-[0_0_0_1px_rgba(95,146,132,0.35)]"
                      : "bg-white/[0.02] border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin
                        className={`h-4 w-4 ${isSelected ? "text-seam-300" : "text-stone-500"}`}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className={`text-sm font-medium ${isSelected ? "text-stone-50" : "text-stone-200"}`}>
                        {plant.name}
                      </span>
                    </div>
                    {isSelected ? (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-seam-400 text-stone-950">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-stone-60">Current status</span>
                    <StatusBadge status={status} size="sm" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
