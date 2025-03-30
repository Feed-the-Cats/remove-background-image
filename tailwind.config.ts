import svgToDataUri from "mini-svg-data-uri";
import scrollbarHide from "tailwind-scrollbar-hide";
import type { Config } from "tailwindcss";
import { dropZone } from "./src/assets/dropZoneIco";

export const colors = {
  primary: "hsl(214, 26%, 54%)",
  contrast: "#101020",
  text: "#ffffff",
  paper: "hsl(214, 26%, 11%)",
  card: "hsl(214, 26%, 7%)",
  buttonHover: "hsl(214deg 26% 54% / 19%)",
  spinnerColor2: "#ccbbff",
  spinnerColor3: "#aaffff",
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/assets/**/*.js",
  ],
  theme: {
    extend: {
      minHeight: {
        192.5: "48,5rem",
      },
      width: {
        73: "18.75rem",
      },
      height: {
        17: "4.5rem",
        73: "18.75rem",
      },
      colors,
      fontSize: {
        titleH1: "3rem",
        titleH3: "1.3rem",
      },
      gradientColorStops: {
        gradientStart: "hsl(235 26% 11% / 1)",
        gradientStop: "hsl(235deg 26% 11% / 50%)",
      },
      boxShadow: {
        shadow: "1px 1px 25px #101020",
      },
      backgroundImage: {
        dropzoneBorder: `URL("${svgToDataUri(dropZone)}")`,
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;
