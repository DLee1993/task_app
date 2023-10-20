/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
        extend: {
            colors: {
                silver: "#edf2f4",
                blue: "#2b2d42",
                gray: "#8d99ae",
                red: "#ef233c",
                warningRed: "#fa5252",
            },
        },
    },
    plugins: [],
};
