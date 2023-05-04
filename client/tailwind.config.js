/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    colors: {
      'blue': '#87BCDE',
      'charcoal-dark': '#243843',
      'charcoal-light': '#2D4654',
      'violet': '#805E73',
      'gray' : '#4E4D5C',
      'light-gray':"#6C7D87",
      'orange': "#FFA500"
    },
    extend: {},
  },
  plugins: [],
}

