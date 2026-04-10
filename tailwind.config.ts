import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dorado exacto del logo Gold Rush (#F5B800 base)
        gold: {
          50:  "#FFFDF0",
          100: "#FFF8D6",
          200: "#FEEEA0",
          300: "#FDE064",
          400: "#FCD02E",
          500: "#F5B800",   // ← color primario del logo
          600: "#D09B00",
          700: "#A67A00",
          800: "#7A5A00",
          900: "#4D3800",
        },
        charcoal: {
          DEFAULT: "#1C1C1E",
          light: "#3A3A3C",
          muted: "#6D6D72",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "luxury": "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        "luxury-hover": "0 12px 48px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)",
        "gold": "0 4px 20px rgba(232, 169, 0, 0.3)",
      },
      animation: {
        "fade-in":       "fadeIn 0.4s ease-out",
        "slide-up":      "slideUp 0.35s ease-out",
        "pulse-gold":    "pulseGold 2s infinite",
        "hero-title":    "heroTitle 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "hero-sub":      "heroSub 0.7s 0.25s cubic-bezier(0.22,1,0.36,1) both",
        "underline-grow":"underlineGrow 0.8s 0.55s cubic-bezier(0.22,1,0.36,1) both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(245, 184, 0, 0.4)" },
          "50%":      { boxShadow: "0 0 0 10px rgba(245, 184, 0, 0)" },
        },
        heroTitle: {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heroSub: {
          "0%":   { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        underlineGrow: {
          "0%":   { transform: "scaleX(0)", opacity: "0" },
          "100%": { transform: "scaleX(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
