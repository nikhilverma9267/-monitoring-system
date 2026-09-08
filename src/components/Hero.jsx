import { ArrowRight, Radio, Droplet, Waves, Gauge } from "lucide-react";

export default function Hero({ onViewDashboard, onViewLive }) {
  return (
    <section id="top" className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 50% at 18% 10%, rgba(47,158,111,0.14) 0%, transparent 60%), radial-gradient(50% 45% at 88% 30%, rgba(58,114,176,0.14) 0%, transparent 65%)",
        }}
      />

      <div className="section-shell">
        <div className="flex items-center gap-2 text-seam-300 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-seam-400 animate-pulseRing" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-seam-400" />
          </span>
          <span className="text-xs tracking-[0.14em] text-stone-400">
            Live monitoring · rural mining-area water sources
          </span>
        </div>

        <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl sm:leading-[1.03] lg:text-7xl text-stone-50 max-w-4xl">
          Real-time water quality monitoring
        </h1>

        <p className="mt-6 text-lg text-stone-400 max-w-2xl leading-relaxed">
          Continuous monitoring of critical water parameters across rural mining
          areas of Jharkhand — tracking pH, turbidity and total dissolved solids
          at each site, with alerts when a reading drifts out of a safe range.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <button
            onClick={onViewDashboard}
            className="inline-flex items-center gap-2 rounded-lg bg-seam-500 hover:bg-seam-400 text-stone-950 font-medium px-5 py-3 transition-colors"
          >
            View dashboard
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            onClick={onViewLive}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] text-stone-100 font-medium px-5 py-3 transition-colors"
          >
            <Radio className="h-4 w-4 text-seam-300" aria-hidden="true" />
            Live monitoring
          </button>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          {[
            { icon: Droplet, label: "pH", detail: "Acidity / alkalinity balance" },
            { icon: Waves, label: "Turbidity", detail: "Suspended particulate load" },
            { icon: Gauge, label: "TDS", detail: "Total dissolved solids" },
          ].map(({ icon: Icon, label, detail }) => (
            <div key={label} className="glass-panel rounded-xl p-4 flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-depth-500/10 border border-depth-500/25 text-depth-400">
                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <div className="text-sm font-medium text-stone-100">{label}</div>
                <div className="text-xs text-stone-500 mt-0.5">{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
