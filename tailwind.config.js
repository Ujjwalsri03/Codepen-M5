/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#131417",
        secondary: "#1e1f26",
        primaryText: "#868ca0",
        text555: "#555",
      },
      keyframes: {
        'border-spin': {
          '0%': { borderColor: 'blue' },
          '50%': { borderColor: 'red' },
          '100%': { borderColor: 'blue' },
        },
      },
      animation: {
        'border-spin': 'border-spin 2`s linear infinite',
      },
    },
  },
  plugins: [],
}