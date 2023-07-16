/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        textOutline: "0 1.2px 1.2px rgba(0,0,0,0.8)",
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "8.5rem" }],
      },
    },
    screens: {
      sm: "576px",
      md: "900px",
      lg: "1140px",
    },
  },
  plugins: [],
};
