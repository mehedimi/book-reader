/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fira: "'Fira Sans', sans-serif",
        tiro: '"Tiro Bangla", serif',
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
