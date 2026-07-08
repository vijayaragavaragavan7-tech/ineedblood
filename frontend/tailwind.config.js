/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blood: {
          DEFAULT: "#B91C1C", // primary red
          dark: "#7F1D1D",
          light: "#FEE2E2",
        },
      },
    },
  },
  plugins: [],
};
