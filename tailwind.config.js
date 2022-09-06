/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#468189",
        secondary: "#77ACA2",
        ternary: "#9DBEBB",
        dark: "#031926",
        light: "#F4E9CD",
      },
    },
  },
  plugins: [],
};
