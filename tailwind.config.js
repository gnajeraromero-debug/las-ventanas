/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#FAFAF8',
          100: '#F5F5F0',
          150: '#EEEEE6',
          200: '#E8E6DE',
          300: '#D4D0C4',
          400: '#B8B3A4',
          500: '#9C9686',
          600: '#7A7468',
          700: '#5C574E',
          800: '#3D3A34',
          900: '#2A2824',
          950: '#1A1916',
        },
        bone: '#F2F0EB',
        ivory: '#FAF9F6',
        olive: {
          100: '#E8EBE0',
          200: '#D1D7C1',
          300: '#B3BD96',
          400: '#8E9B6B',
          500: '#6B7A4A',
          600: '#556338',
          700: '#3F4A2A',
        },
        charcoal: {
          DEFAULT: '#3A3A38',
          light: '#5A5A56',
          dark: '#2A2A28',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-plus': '0.2em',
        'ultra-wide': '0.3em',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
