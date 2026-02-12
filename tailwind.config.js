/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        gray: {
          900: '#111111',
          800: '#222222',
          700: '#333333',
        },
      },
    },
  },
  plugins: [],
};
