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

    fontFamily: {},
    colors: {
      black: "#000000",
      white: "#ffffff",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      primary: "#0083FA",
      secondary: "#00ff00",
      background: "#FFFFFF",
      mainText: "#37352F",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
