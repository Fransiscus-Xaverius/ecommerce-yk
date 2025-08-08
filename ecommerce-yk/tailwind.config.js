/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "475px", // Large phones
      sm: "640px", // Small tablets
      md: "768px", // iPad Portrait
      lg: "1024px", // iPad Landscape / Small Desktop
      xl: "1280px", // Desktop
      "2xl": "1536px", // Large Desktop
    },
    extend: {
      colors: {
        'milky-blue': '#00A0E9',
        'light-gray': '#D6D6D6',
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      keyframes: {
        "fade-in-fast": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in-fast": "fade-in-fast 0.2s ease-in-out",
      },
    },
  },

  plugins: [],
};
