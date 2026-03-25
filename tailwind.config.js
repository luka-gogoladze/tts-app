/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        "primary-light": "#EFF6FF",
        surface: "#F8FAFC",
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["Nino-Normal"],
        nino: ["Nino-Normal"],
        "nino-bold": ["Nino-Bold"],
      },
    },
  },
  plugins: [],
};
