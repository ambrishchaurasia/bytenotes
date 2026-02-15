 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
   theme: {
     extend: {
      colors:{
        primary:"#ffa116",
        secondary:"#06a529",
      }
     },
   },
   plugins: [],
 }
 