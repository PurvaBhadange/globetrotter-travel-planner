/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Swiss International Palette
        swiss: {
          bg: "#FFFFFF",
          fg: "#000000",
          muted: "#F2F2F2",
          accent: "#FF3000",
          border: "#000000",
        },
        // Existing tokens mapped to Swiss theme
        primary: "#000000",
        accent: "#FF3000",
        surfaceDark: "#000000",
        bgDark: "#FFFFFF",
        surfaceLight: "#FFFFFF",
        bgLight: "#F2F2F2",
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "0px",
        control: "0px",
        DEFAULT: "0px",
      },
      borderWidth: {
        3: "3px",
        4: "4px",
      },
      letterSpacing: {
        tighter: "-0.05em",
        widest: "0.25em",
      },
    },
  },
  plugins: [],
};
