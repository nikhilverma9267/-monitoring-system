/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#06090a",
          900: "#0a0f0f",
          850: "#0d1414",
          800: "#111a1a",
          700: "#182424",
        },
        seam: {
          200: "#8fb8ac",
          300: "#5f9284",
          400: "#3f7a68",
          500: "#2f9e6f",
          600: "#237a56",
        },
        depth: {
          400: "#4f8fd6",
          500: "#3a72b0",
          600: "#2c5686",
        },
        signal: {
          normal: "#39b37d",
          watch: "#d6a936",
          alert: "#d1553f",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.7)",
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "70%": { transform: "scale(1.9)", opacity: "0" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        driftUp: {
          "0%": { transform: "translateY(4px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scrollX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
        driftUp: "driftUp 0.5s ease-out both",
        scrollX: "scrollX 38s linear infinite",
      },
    },
  },
  plugins: [],
};
