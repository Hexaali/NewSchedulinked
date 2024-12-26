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
      textAlign: {
        'justify-center-last': 'justify; text-align-last: center;',
      },
      fontFamily: {
        alexBrush: ['Alex Brush', 'cursive'],
        poppins: ['Poppins', 'sans-serif',],
      },
      colors: {
        brown: {
          50: "#dfbe70",
          100: "#0D2D59",//blue
          200: "#FFBD59", //Golden
          300: "#9c7830",
        },
      },
    },
  },
  plugins: [],
});
