/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
  
  ],
  theme: {
    extend: {
      colors: {
        'bd-navy-100': 'hsla(230, 45%, 10%, 1.0)',
        'bd-navy-200': 'hsla(230, 45%, 20%, 1.0)',
        'bd-navy-300': 'hsla(230, 45%, 30%, 1.0)',
        'bd-navy-400': 'hsla(230, 45%, 40%, 1.0)',
        'bd-navy-500': 'hsla(230, 45%, 50%, 1.0)',
        'bd-navy-600': 'hsla(230, 45%, 60%, 1.0)',
        'bd-navy-700': 'hsla(230, 45%, 70%, 1.0)',
        'bd-navy-800': 'hsla(230, 45%, 80%, 1.0)',
        'bd-navy-900': 'hsla(230, 45%, 90%, 1.0)',
      }
    },
  },
  plugins: [],
}
