import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal:  "#43766C",
          cream: "#F8FAE5",
          tan:   "#B19470",
          brown: "#76453B",
        },
      },
      fontFamily: {
        title: ["var(--font-atkinson)"],
        sans:  ["var(--font-ubuntu)"],
      },
    },
  },
  plugins: [],
};

export default config;