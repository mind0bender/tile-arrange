import type { Config } from "tailwindcss";
import { orange } from "tailwindcss/colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: orange,
      },
    },
  },
  plugins: [],
} satisfies Config;
