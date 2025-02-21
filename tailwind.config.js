/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '1091p': '1091px',
      }
    },
  },
  plugins: [],
  daisyui: { themes: false, base: false }
}

