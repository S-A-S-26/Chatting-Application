/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        secondary:'#0147ff',
        background:'#f6f8fc',
      }
    },
  },
  plugins: [],
}