/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Surfaces
        background: "#0A0A0F",
        surface: "#13131C",
        "surface-elevated": "#1C1C2A",
        "surface-hover": "#232336",

        // Accent - Professional Indigo
        primary: {
          DEFAULT: "#6366F1",
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },

        // Text colors
        "text-primary": "#FFFFFF",
        "text-secondary": "rgba(255, 255, 255, 0.7)",
        "text-tertiary": "rgba(255, 255, 255, 0.3)",
        "text-muted": "rgba(255, 255, 255, 0.5)",
        "text-dim": "rgba(255, 255, 255, 0.3)",

        // Status colors
        danger: {
          DEFAULT: "#EF4444",
          500: "#EF4444",
        },
        success: {
          DEFAULT: "#22C55E",
          500: "#22C55E",
        },
        warning: {
          DEFAULT: "#F59E0B",
          500: "#F59E0B",
        },
        info: {
          DEFAULT: "#3B82F6",
          500: "#3B82F6",
        },
        secondary: {
          DEFAULT: "rgba(255, 255, 255, 0.4)",
        },

        // Border variants
        borderLight: "rgba(255, 255, 255, 0.18)",
        border: "rgba(255, 255, 255, 0.1)",

        // Surface aliases
        surface2: "#1C1C2A",

        // Gradients
        "gradient-primary": "linear-gradient(135deg, #6366F1, #818CF8)",
      },

      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },

      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
        "5xl": "56px",
        "6xl": "64px",
      },

      borderRadius: {
        none: "0",
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "16px",
      },

      boxShadow: {
        sm: "0 1px 3px rgba(0, 0, 0, 0.3)",
        md: "0 4px 12px rgba(0, 0, 0, 0.4)",
        lg: "0 8px 24px rgba(0, 0, 0, 0.5)",
      },

      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
