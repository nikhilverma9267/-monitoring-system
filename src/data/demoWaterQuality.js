/**
 * DEMO DATA — NOT LIVE SENSOR READINGS.
 *
 * Monthly pH / Turbidity / TDS series for every plant, generated with a
 * seeded pseudo-random walk so numbers look plausible and stay stable
 * across renders. This file is the single place to swap in a real
 * REST/WebSocket/database source later — every consumer in the app
 * reads through getMonthlySeries() / getCurrentReading() below.
 */

import { PLANTS, MONTHS } from "./plants.js";

// Small deterministic PRNG (mulberry32) keyed by a string seed, so the
// same plant always generates the same "demo" year instead of changing
// on every page load.
function seededRandom(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function walk(rand, { start, min, max, step }) {
  const series = [];
  let value = start;
  for (let i = 0; i < 12; i++) {
    value += (rand() - 0.5) * step;
    value = Math.min(max, Math.max(min, value));
    series.push(value);
  }
  return series;
}

function buildPlantSeries(plantId) {
  const rand = seededRandom(plantId);

  // Each plant gets a slightly different baseline so the dashboard
  // doesn't look identical across sites, while staying inside a
  // plausible band for a mining-area groundwater source.
  const phBase = 6.6 + rand() * 1.6; // ~6.6 - 8.2
  const turbidityBase = 2 + rand() * 6; // ~2 - 8 NTU
  const tdsBase = 250 + rand() * 500; // ~250 - 750 mg/L

  const ph = walk(rand, { start: phBase, min: 5.8, max: 9.4, step: 0.5 });
  const turbidity = walk(rand, { start: turbidityBase, min: 0.5, max: 13, step: 2.2 });
  const tds = walk(rand, { start: tdsBase, min: 120, max: 1150, step: 140 });

  return MONTHS.map((month, i) => ({
    month,
    ph: Number(ph[i].toFixed(2)),
    turbidity: Number(turbidity[i].toFixed(1)),
    tds: Math.round(tds[i]),
  }));
}

// Precompute once per plant id.
const SERIES_BY_PLANT = PLANTS.reduce((acc, plant) => {
  acc[plant.id] = buildPlantSeries(plant.id);
  return acc;
}, {});

export function getMonthlySeries(plantId) {
  return SERIES_BY_PLANT[plantId] ?? [];
}

/**
 * "Current" reading = latest month in the demo series. In a live
 * deployment this would instead come from the most recent sensor
 * payload.
 */
export function getCurrentReading(plantId) {
  const series = getMonthlySeries(plantId);
  return series[series.length - 1] ?? { ph: 0, turbidity: 0, tds: 0, month: "" };
}

export function getAllCurrentReadings() {
  return PLANTS.map((plant) => ({
    plant,
    reading: getCurrentReading(plant.id),
  }));
}
