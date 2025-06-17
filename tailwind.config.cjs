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
      colors: {
        limeCustom: '#C9FF57',
      },
        backgroundImage: {
        'gradient-light': 'linear-gradient(to bottom right, #ca8a04, #22c55e)', 
        'gradient-dark': 'linear-gradient(to bottom right, #854d0e, #065f46)',
        'gradient-button-dark' : 'bg-gradient-to-br to-yellow-600 from-gray-600',
        'text-gradient-light': 'linear-gradient(to right, #eab308, #1f2937)',
        'text-gradient-dark': 'linear-gradient(to right, #facc15, #f97316)',
      },
      textAlign: {
        'justify-center-last': 'justify; text-align-last: center;',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
});
