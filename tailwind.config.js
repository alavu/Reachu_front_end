/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*/.{html,js}"],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#0D0C22',
      },
    },
  },
  plugins: [
    require('flowbite/plugin') 
  ],
}