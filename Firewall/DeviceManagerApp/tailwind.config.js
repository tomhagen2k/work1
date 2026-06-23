/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // blue-700
        secondary: '#475569', // slate-600
        background: '#f1f5f9', // slate-100
        surface: '#ffffff',
      }
    },
  },
  plugins: [],
}
