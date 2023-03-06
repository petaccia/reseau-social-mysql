/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#404040",
      pink: "#C91961",
      darkPink: "#851342",
      indigo: "#818cf8",
      grey: "#D9D9D9",
      orange: "#EA580C",
      fushia: "#9d174d",
      grayZinc: "#374151",
      grayLight: "#6b7280",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        tomorow: ["Tomorrow", "sans-serif"],
      },
    },
  },
  plugins: [],
};
