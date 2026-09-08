import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { THRESHOLDS } from "../config/thresholds.js";

const PARAMETERS = [
  { key: "ph", label: "pH", color: "#5f9284", unit: "" },
  { key: "turbidity", label: "Turbidity", color: "#3a72b0", unit: "NTU" },
  { key: "tds", label: "TDS", color: "#d6a936", unit: "mg/L" },
];

const VIEWS = [
  { key: "area", label: "Area" },
  { key: "line", label: "Line" },
];

function ChartTooltip({ active, payload, label, unit }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="glass-panel-strong rounded-lg px-3.5 py-2.5 text-sm">
      <div className="text-stone-500 text-xs mb-1">{label}</div>
      <div className="data-figure text-stone-100">
        {payload[0].value}
        {unit ? <span className="text-stone-500 ml-1">{unit}</span> : null}
      </div>
    </div>
  );
}

export default function WaterQualityChart({ series }) {
  const [paramKey, setParamKey] = useState("ph");
  const [view, setView] = useState("area");

  const param = PARAMETERS.find((p) => p.key === paramKey);
  const thresholdInfo = THRESHOLDS[paramKey];

  const data = useMemo(
    () => series.map((row) => ({ month: row.month, value: row[paramKey] })),
    [series, paramKey]
  );

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h3 className="text-stone-100 font-medium">Monthly water-quality trend</h3>
          <p className="text-xs text-stone-500 mt-0.5">January – December, demo cycle</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            role="tablist"
            aria-label="Select parameter"
            className="flex items-center rounded-lg bg-base-800/70 border border-white/[0.06] p-1"
          >
            {PARAMETERS.map((p) => (
              <button
                key={p.key}
                role="tab"
                aria-selected={paramKey === p.key}
                onClick={() => setParamKey(p.key)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  paramKey === p.key
                    ? "bg-white/[0.08] text-stone-50"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div
            role="tablist"
            aria-label="Select chart type"
            className="flex items-center rounded-lg bg-base-800/70 border border-white/[0.06] p-1"
          >
            {VIEWS.map((v) => (
              <button
                key={v.key}
                role="tab"
                aria-selected={view === v.key}
                onClick={() => setView(v.key)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  view === v.key ? "bg-white/[0.08] text-stone-50" : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          {view === "area" ? (
            <AreaChart data={data} margin={{ top: 6, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={param.color} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={param.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.25)"
                tick={{ fill: "#78716c", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.25)"
                tick={{ fill: "#78716c", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip content={<ChartTooltip unit={param.unit} />} />
              <Legend
                formatter={() => `${param.label}${param.unit ? ` (${param.unit})` : ""}`}
                wrapperStyle={{ fontSize: 12, color: "#a8a29e" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                name={param.label}
                stroke={param.color}
                strokeWidth={2}
                fill="url(#chartFill)"
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 6, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.25)"
                tick={{ fill: "#78716c", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.25)"
                tick={{ fill: "#78716c", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip content={<ChartTooltip unit={param.unit} />} />
              <Legend
                formatter={() => `${param.label}${param.unit ? ` (${param.unit})` : ""}`}
                wrapperStyle={{ fontSize: 12, color: "#a8a29e" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                name={param.label}
                stroke={param.color}
                strokeWidth={2.25}
                dot={{ r: 3, fill: param.color, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {thresholdInfo ? (
        <p className="text-[11px] text-stone-600 mt-3">
          {paramKey === "ph"
            ? `Safe range ${thresholdInfo.safe.min}–${thresholdInfo.safe.max}, warning band ${thresholdInfo.warning.min}–${thresholdInfo.warning.max}.`
            : `Warning above ${thresholdInfo.warning}${thresholdInfo.unit}, critical above ${thresholdInfo.critical}${thresholdInfo.unit}.`}
        </p>
      ) : null}
    </div>
  );
}
