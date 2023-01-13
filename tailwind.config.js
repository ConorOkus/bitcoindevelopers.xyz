/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
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
        'bd-orange-100': 'hsla(35, 100%, 10%, 1.0)',
        'bd-orange-200': 'hsla(35, 100%, 20%, 1.0)',
        'bd-orange-300': 'hsla(35, 100%, 30%, 1.0)',
        'bd-orange-400': 'hsla(35, 100%, 40%, 1.0)',
        'bd-orange-500': 'hsla(35, 100%, 50%, 1.0)',
        'bd-orange-600': 'hsla(35, 100%, 60%, 1.0)',
        'bd-orange-700': 'hsla(35, 100%, 70%, 1.0)',
        'bd-orange-800': 'hsla(35, 100%, 80%, 1.0)',
        'bd-orange-900': 'hsla(35, 100%, 90%, 1.0)',
      },
      backgroundImage: {
        'dark-1': "url('/bg-dark-1.svg')"
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      }
    },
    fontFamily: {
      'sans': ['Manrope', 'system-ui', 'sans-serif']
    },
  },
  plugins: [],
}
