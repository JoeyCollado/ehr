/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", 
        foreground: "var(--foreground)", 
        primary: "#FEC5BB", 
        secondary: "#FCD5CE", 
        accent: "#FAE1DD", 
        muted: "#F8EDEB", 
        soft: "#E8E8E4", 
        contrast: "#D8E2DC", 
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Default UI font
        heading: ["Poppins", "sans-serif"], // Custom font for headings
      },
    },
  },
  plugins: [],
};
