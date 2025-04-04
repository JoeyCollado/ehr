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
        sans: ["Inter", "sans-serif"], // Default UI font - modern and highly readable
        heading: ["Poppins", "sans-serif"], // Headings - sleek and professional
        body: ["Roboto", "sans-serif"], // Body text - neutral and readable
        display: ["Montserrat", "sans-serif"], // Display sections - strong and contemporary
        accent: ["Lato", "sans-serif"], // Accent text - friendly yet professional
        alt: ["Nunito", "sans-serif"], // Alternative font - balanced and inviting
      },
    },
  },
  plugins: [],
};
