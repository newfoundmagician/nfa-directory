import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213D",
        paper: "#F7F5EF",
        paperDark: "#EDE9DF",
        signal: "#FF6B35",
        slate: "#5B6270",
        charcoal: "#1F2430",
        forest: "#2D6A4F",
        rule: "#D8D3C4",
      },
      fontFamily: {
        display: ["var(--font-slab)", "serif"],
        body: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grain: "radial-gradient(circle, rgba(20,33,61,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grain: "14px 14px",
      },
    },
  },
  plugins: [],
};
export default config;
