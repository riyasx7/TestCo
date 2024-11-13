/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        DEFAULT: '#E3E3E3', // Default text color for body on dark backgrounds
        primary: '#FFD700', // Bright primary color for headings or highlights
        secondary: '#FFA07A', // Softer secondary color for subheadings or accents
      },
      colors: {
        myColor: {
          DEFAULT: '#1E1E2E',  // Dark background color for UI elements
          primary: '#FFD700',  // Bright gold as the primary highlight color
          secondary: '#FFA07A', // Light salmon for secondary accent elements
          dark: '#2A2A3A',      // Darker shade for navbar or footer
          light: '#272738',     // Lighter variant for contrast in dark mode
          extraLight: '#E3E3E3', // Light color for text or background in light mode
          accent: '#4FD1C5',    // Teal accent for interactive elements (buttons, links)
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), // Hides the scrollbar
  ],
}
