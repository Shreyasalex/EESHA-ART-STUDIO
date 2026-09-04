/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: 'rgb(var(--color-cream-rgb) / <alpha-value>)',
        teal: 'rgb(var(--color-teal-rgb) / <alpha-value>)',
        lavender: 'rgb(var(--color-lavender-rgb) / <alpha-value>)',
        gold: 'rgb(var(--color-gold-rgb) / <alpha-value>)',
        green: 'rgb(var(--color-green-rgb) / <alpha-value>)',
        sandal: 'rgb(var(--color-sandal-rgb) / <alpha-value>)',
        ink: 'rgb(var(--color-ink-rgb) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.65, 0, 0.35, 1)',
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
