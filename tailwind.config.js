/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#4F46E5',     // Indigo
          secondary: '#6366F1',   // Lighter Indigo
          accent: '#F59E0B',      // Amber
          background: '#F9FAFB',  // Light gray background
          text: '#1F2937',        // Dark gray text
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '1.5rem',
        },
        boxShadow: {
          soft: '0 4px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: [],
  }
  