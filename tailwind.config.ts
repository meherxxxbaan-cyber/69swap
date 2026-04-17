import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        border: "#e2e8f0",
        background: "#fafafa",
        foreground: "#0f172a",
        card: "#ffffff",
        muted: { DEFAULT: "#f1f5f9", foreground: "#64748b" },
        primary: { DEFAULT: "#6366f1", foreground: "#ffffff" },
        accent: { DEFAULT: "#eef2ff", foreground: "#6366f1" },
        success: { DEFAULT: "#059669", foreground: "#ffffff" }
      },
      borderRadius: { xl: "16px", "2xl": "20px" },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
        "card-hover": "0 4px 20px rgba(0,0,0,0.1)"
      },
      animation: { "accordion-down": "accordion-down 0.2s ease-out", "accordion-up": "accordion-up 0.2s ease-out" },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;
