/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        dark: "#0f172a",
        light: "#f8fafc",
        accent: "#ec4899",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        title: ['var(--font-title)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}