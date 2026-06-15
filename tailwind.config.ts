import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0B1110",
        temple: "#FF9B00",
        sandalwood: "#F2EEE6",
        lotus: "#FF9B00",
        jasmine: "#F2EEE6",
        peacock: "#8A9A95",
        indigo: "#1B2321",
        charcoal: "#263331",
        amberglow: "#FF9B00"
      },
      fontFamily: {
        serif: ["var(--font-display)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255, 155, 0, 0.22)",
        soft: "0 24px 70px rgba(11, 17, 16, 0.12)"
      },
      keyframes: {
        "slow-spin": {
          to: { transform: "rotate(360deg)" }
        },
        "soft-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 rgba(201,168,76,0)" },
          "50%": { boxShadow: "0 0 34px rgba(201,168,76,0.28)" }
        }
      },
      animation: {
        "slow-spin": "slow-spin 60s linear infinite",
        "soft-pulse": "soft-pulse 1.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
