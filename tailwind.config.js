/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        neutral: {
          850: '#1f1f1f',
          900: '#171717',
          925: '#121212', 
          950: '#0a0a0a',
        },
        primary: {
          500: '#8b5cf6', // Violet
          400: '#a78bfa',
        },
        secondary: {
          500: '#06b6d4', // Cyan
          400: '#22d3ee',
        }
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'blob': 'blob 10s infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      }
    },
  },
  plugins: [],
}