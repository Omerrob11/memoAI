/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,mdx}", // This catches all JS/JSX files in src
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
    "./src/services/**/*.{js,jsx}", // Include your servlcies directory
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
      error: {
        50: "#FEF2F2", // Very light red for subtle backgrounds
        100: "#FEE2E2", // Light red for hover states
        500: "#EF4444", // Main error color (bright red)
        600: "#DC2626", // Slightly darker for hover states
        700: "#B91C1C", // Dark red for text
      },
      success: "#22C55E",
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
