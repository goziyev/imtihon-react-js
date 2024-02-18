/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dracula Shabloni ranglari
        dracula: {
          dark: "#282a36",
          light: "#f8f8f2",
          purple: "#bd93f9",
          pink: "#ff79c6",
          orange: "#ffb86c",
          yellow: "#f1fa8c",
          green: "#50fa7b",
          cyan: "#8be9fd",
          blue: "#6272a4",
          comment: "#6272a4",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
