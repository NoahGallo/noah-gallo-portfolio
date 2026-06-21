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
 * Colors are CSS variables defined in src/index.css; the names below just
 * expose them as Tailwind utilities (bg-canvas, text-ink, text-accent, …).
 * To recolor the site, change the variable in index.css — nothing else.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        sans: ["'IBM Plex Sans'", 'system-ui', '-apple-system', 'sans-serif'],
        display: ["'Bricolage Grotesque'", "'IBM Plex Sans'", 'sans-serif'],
        mono: ["'JetBrains Mono'", "'Courier New'", 'monospace'],
      },
      colors: {
        canvas: 'var(--canvas)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        edge: 'var(--edge)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
