/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        DEFAULT: '#EDF2F4',    // Ivory White for general text on dark backgrounds
        primary: '#8DA9C4',    // Teal Blue for primary highlights or headings
        secondary: '#3A3F58',  // Charcoal for subheadings or muted text
        success: '#3ECF8E',    // Green Mint for success messages or positive feedback
        warning: '#FFB648',    // Amber Orange for warnings or cautionary text
        error: '#E63946',      // Crimson Red for errors or alerts
      },
      colors: {
        myColor: {
          DEFAULT: '#2B2D42',   // Slate Gray as the main background color for UI elements      // Darker slate gray for navbar or footer
          primary: '#1E293B',   // Teal Blue for interactive or primary elements
          secondary: '#2D4059', // Charcoal for card backgrounds or secondary sections
          dark: '#111827',
          medium: '#A0AEC0',
          light: '#cbd5e1',     // Ivory White for text or lighter elements on dark mode
          extraLight: '#e2e8f0',
          accent: '#58A4B0',    // Sky Blue for hovers, borders, or selected items
          go: '#047857',   // Green Mint for success indicators
          success: '#065F46',
          warning: '#FFB648',   // Amber Orange for warnings
          error: '#E63946',     // Crimson Red for errors
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), // Hides the scrollbar
  ],
}
