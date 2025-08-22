/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-black-red": "linear-gradient(180deg, #000000, #810101ff)",
      },
    },
  },
  plugins: [],
}