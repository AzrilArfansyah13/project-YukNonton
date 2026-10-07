/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A1128',
        panel: '#111D3B',
        velvet: '#E50914',
        gold: '#FFC000',
        paper: '#F9F6EE',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'shine': 'shine 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shine: {
          '100%': { left: '125%' },
        }
      }
    },
  },
  plugins: [],
}
