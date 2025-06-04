/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
        'gradient-light': 'linear-gradient(to bottom right, #ca8a04, #22c55e)', 
        'gradient-dark': 'linear-gradient(to bottom right, #854d0e, #065f46)',
      },
      textAlign: {
        'justify-center-last': 'justify; text-align-last: center;',
      },
      fontFamily: {
        alexBrush: ['Alex Brush', 'cursive'],
        poppins: ['Poppins', 'sans-serif',],
      },
    },
  },
  plugins: [],
});
