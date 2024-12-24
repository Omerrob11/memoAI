/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // colors: {
    //   primary: "#ff0000",
    //   grey: {
    //     100: "#f5f5f5",
    //     200: "#e5e5e5",
    //     300: "#d4d4d4",
    //     400: "#a3a3a3",
    //     500: "#737373",
    //     600: "#525252",
    //     700: "#404040",
    //     800: "#262626",
    //     900: "#171717",
    //   },
    // },
    // spacing: {},
    // fontSize: {},
    // fontFamily: {},
    // fontWeight: {},
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
