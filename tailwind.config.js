/**
 * Tailwind CSS configuration.
 *
 * NOTE: This project intentionally stays on Tailwind CSS v3.x.
 * Tailwind v4 introduced significant breaking changes (CSS-first config,
 * removed `tailwind.config.js`, renamed utilities, new dark-mode mechanism).
 * Because this site is maintained without a dedicated developer, we prefer
 * the stable v3 line — it still receives patch updates and works seamlessly
 * with the existing PostCSS setup.
 *
 * If a future migration to v4 is desired, the main work will be:
 *   - Move custom colors / animations / keyframes below into a `@theme`
 *     block in `src/index.css`
 *   - Remove this file
 *   - Replace `@tailwind base/components/utilities` with `@import "tailwindcss"`
 *   - Audit any utilities that were renamed in v4
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',

  /*
   * Safelist: these classes are built dynamically via template strings
   * (e.g. `bg-${color}-100`) inside AboutSection / ContactSection. Tailwind's
   * JIT scanner can't see them in source, so we list them here so they get
   * generated. If you add a new color to those data arrays, add it here too.
   */
  safelist: [
    'bg-blue-100', 'dark:bg-blue-900/30', 'text-blue-600', 'dark:text-blue-400',
    'bg-green-100', 'dark:bg-green-900/30', 'text-green-600', 'dark:text-green-400',
    'bg-purple-100', 'dark:bg-purple-900/30', 'text-purple-600', 'dark:text-purple-400',
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      // Only ambient/decorative animations live here. Scroll-reveal animations
      // are handled per-element with Tailwind's `transition-*` utilities.
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '700': '700ms',
      },
    },
  },
  plugins: [],
}
