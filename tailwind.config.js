/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // map semantic names to CSS variables (defined in src/styles/tokens.css)
        primary: 'var(--color-primary)',
        'primary-600': 'var(--color-primary-600)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        accent: 'var(--color-accent)'
      },
      spacing: {
        '7.5': '1.875rem'
      },
      fontSize: {
        'xs2': ['0.6875rem',{ lineHeight: '1rem' }]
      }
    },
  },
  plugins: [],
}