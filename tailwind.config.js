/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        screens: {
          'xs': '400px',
          'lg': '1030px',
          'xl': '1180px',
        },
      },
    },
    plugins: [],
  }