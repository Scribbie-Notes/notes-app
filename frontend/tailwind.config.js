/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2b85ff",
        secondary: "#ef863e",
      }
    },
  },
  plugins: [
  ],
}

