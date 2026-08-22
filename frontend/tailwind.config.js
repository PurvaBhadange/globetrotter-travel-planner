/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // GlobeTrotter Travel Startup Brand Palette
        navy: {
          900: "#0A192F",
          800: "#0F172A",
          700: "#1E293B",
        },
        ocean: {
          500: "#0284C7",
          600: "#0369A1",
        },
        sky: {
          400: "#38BDF8",
          500: "#0EA5E9",
        },
        coral: {
          500: "#FF6B5B",
          600: "#E05545",
        },
        gold: {
          400: "#FBBF24",
          500: "#F59E0B",
        },
        canvas: "#F8FAFC",

        // Neo-brutalism Palette
        neo: {
          bg: "#FFFDF5",
          fg: "#000000",
          accent: "#FF6B6B",
          secondary: "#FFD93D",
          muted: "#C4B5FD",
          card: "#FFFFFF",
        },
        // Swiss International Palette
        swiss: {
          bg: "#FFFFFF",
          fg: "#000000",
          muted: "#F2F2F2",
          accent: "#FF3000",
          border: "#000000",
        },
        // Travel-Tech Legacy Palette
        tech: {
          bg: "#111318",
          surface: "#1B1E24",
          primary: "#0F6E6E",
          accent: "#FF7A59",
          text: "#F5F5F5",
        },
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Poppins", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "neo-sm": "4px 4px 0px 0px #000000",
        "neo-md": "8px 8px 0px 0px #000000",
        "neo-lg": "12px 12px 0px 0px #000000",
        "neo-xl": "16px 16px 0px 0px #000000",
        "travel": "0 20px 25px -5px rgba(10, 25, 47, 0.1), 0 8px 10px -6px rgba(10, 25, 47, 0.05)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
