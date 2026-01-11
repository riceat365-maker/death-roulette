/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'squid-pink': '#FF007A',
        'squid-red': '#FF0000',
        'squid-black': '#000000',
      },
      fontFamily: {
        'dot': ['DotGothic16', 'monospace'],
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glow: {
          '0%': { textShadow: '0 0 5px #FF007A, 0 0 10px #FF007A, 0 0 15px #FF007A' },
          '100%': { textShadow: '0 0 10px #FF007A, 0 0 20px #FF007A, 0 0 30px #FF007A, 0 0 40px #FF007A' },
        },
      },
    },
  },
  plugins: [],
}

