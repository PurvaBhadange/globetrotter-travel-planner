/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
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
        // Travel-Tech Dark Palette
        tech: {
          bg: "#111318",
          surface: "#1B1E24",
          primary: "#0F6E6E",
          accent: "#FF7A59",
          text: "#F5F5F5",
        },
      },
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
        heading: ["Space Grotesk", "Poppins", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "neo-sm": "4px 4px 0px 0px #000000",
        "neo-md": "8px 8px 0px 0px #000000",
        "neo-lg": "12px 12px 0px 0px #000000",
        "neo-xl": "16px 16px 0px 0px #000000",
      },
    },
  },
  plugins: [],
};
