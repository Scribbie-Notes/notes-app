/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        primary: "#2b85ff",
        secondary: "#ef863e",
        darkmode:'#1F2937'
      }
    },
  },
  plugins: [
  ],
}

