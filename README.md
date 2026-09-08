# Jharkhand Rural Mining Area — Water Quality Monitoring System

A React + Vite dashboard for monitoring pH, turbidity and TDS across
demo mining-area water sources in Jharkhand.

## Status: demo data

Every reading in this app — dashboard cards, the monthly chart, alerts,
the "live" panel and the map popups — comes from a seeded pseudo-random
generator in `src/data/demoWaterQuality.js`. Nothing here is connected
to a physical sensor. Look for the "DEMO DATA" / "SIMULATED LIVE DATA"
labels in the UI.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/   UI components (Navbar, Hero, cards, chart, map, ...)
  data/         plants.js, demoWaterQuality.js, plantLocations.js
  config/       thresholds.js — NORMAL/WARNING/CRITICAL thresholds
  utils/        waterQualityStatus.js — status logic, reused everywhere
  pages/        Dashboard.jsx — assembles the page
  App.jsx, main.jsx, index.css
```

## Wiring up real data

1. **Historical / monthly data** — replace the body of
   `getMonthlySeries()` in `src/data/demoWaterQuality.js` with a fetch
   to your API or database. The return shape it expects is an array of
   `{ month, ph, turbidity, tds }` objects.
2. **Live data** — replace the `setInterval` block in
   `src/components/LiveMonitoring.jsx` with a WebSocket subscription
   or polling loop that calls `setLive(...)` with fresh readings.
3. **Map coordinates** — `src/data/plantLocations.js` currently holds
   placeholder coordinates. Replace them with verified GPS coordinates
   per site.
4. **Thresholds** — adjust `src/config/thresholds.js` to match the
   regulatory standard you're monitoring against (e.g. BIS 10500).

## Stack

React 18, Vite, Tailwind CSS, Recharts, React Leaflet + OpenStreetMap,
Lucide React icons.
