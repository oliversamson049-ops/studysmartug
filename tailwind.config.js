/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EFE6D2",
        ink: "#1F2A22",
        navy: "#1F3A5F",
        gold: "#D9A441",
        red: "#B33A3A",
        green: "#2D4A3E",
      },
    },
  },
  plugins: [],
};
