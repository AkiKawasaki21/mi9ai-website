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
        mi9: {
          black: "var(--mi9-black)",
          navy: "var(--mi9-navy)",
          red: "var(--mi9-red)",
          redDim: "var(--mi9-red-dim)",
          white: "var(--mi9-white)",
          muted: "var(--mi9-white-muted)",
          border: "var(--mi9-border)",
          glass: "var(--mi9-glass)"
        }
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      boxShadow: {
        glow: "0 0 30px rgba(255, 23, 68, 0.2)"
      },
      backgroundImage: {
        "mi9-grid":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
