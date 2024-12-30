/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(221, 100%, 96%)',
          100: 'hsl(221, 100%, 91%)',
          200: 'hsl(221, 100%, 86%)',
          300: 'hsl(221, 100%, 81%)',
          400: 'hsl(221, 100%, 71%)',
          500: 'hsl(221, 83%, 53%)',
          600: 'hsl(221, 83%, 43%)',
          700: 'hsl(221, 83%, 33%)',
          800: 'hsl(221, 83%, 23%)',
          900: 'hsl(221, 83%, 13%)',
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgb(0 0 0 / 0.05)',
        'soft-lg': '0 4px 12px 0 rgb(0 0 0 / 0.05)',
      }
    },
  },
  plugins: [],
};