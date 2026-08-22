/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F6E6E",
        accent: "#FF7A59",
        surfaceDark: "#1B1E24",
        bgDark: "#111318",
        surfaceLight: "#FFFFFF",
        bgLight: "#FAFAF8",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        control: "8px",
      },
    },
  },
  plugins: [],
};
