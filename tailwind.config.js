/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ajoutez les extensions JSX/TSX
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(214, 26%, 54%)",
        contrast: "#101020",
        text: "#ffffff",
        paper: "hsl(214, 26%, 11%)",
        card: "hsl(214, 26%, 7%)",
        buttonHover: "hsl(214deg 26% 54% / 19%)",
        spinnerColor2: "#ccbbff",
        spinnerColor3: "#aaffff",
      },
      fontSize: {
        titleH1: "3rem",
        titleH3: "1.3rem",
      },
      gradientColorStops: {
        gradientStart: "hsl(235 26% 11% / 1)",
        gradientStop: "hsl(235deg 26% 11% / 50%)",
      },
    },
  },
  plugins: [],
};
