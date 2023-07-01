/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black": "#121212",
        "fadedBlack": "#25262b",
        "backgroundBlack": "#1a1b1e",
        "warningRed": "#a31d00",
        "fadedWarningRed": "#951c01",
        "plainGray": "#979797",
        "fadedWhite": "#c1c2c5",
        "tableHover": "#373A40",
        "brightPurple": "#8687e7",
        "fadedPurple": "#8687e7cc",
      }
    },
  },
  plugins: [],
}

