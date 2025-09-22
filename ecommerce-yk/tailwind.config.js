/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
    },
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
