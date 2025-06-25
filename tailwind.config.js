/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Custom colors for your portfolio
      colors: {
        primary: {
          50: '#f0f9ff',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
}
