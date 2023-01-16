/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-background": "#D4D4CD",
        "theme-green": "#1FD996",
        "theme-grey": "#1D1D1B"
      },
    },
  },
  plugins: [],
}
