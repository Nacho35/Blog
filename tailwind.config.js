/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#E1E0DE",
        secondary: "#A0D6B4",
        tertiary: "#F0EADA",
        info: "#A6CAF0",
        danger: "#FFB7B2",
        warning: "#FFF3B0",
        dark: "#0e1b20",
        light: "#aaa",
        muted: "#abafb3",
        border: "#DDDFE1",
        inverse: "#2F3D4A",
        shaft: "#333",
        white: "#fff",
        black: "#000",
      },
    },
  },
  plugins: [],
};
