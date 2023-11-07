/** @type {import('tailwindcss').Config} */
import { withUt } from 'uploadthing/tw'

export default withUt({
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
      }
    }
  },
  plugins: [],
});