/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Primary color
        primary: {
          DEFAULT: '#000000',
          50: '#404040',
          100: '#333333',
          200: '#262626',
          300: '#1A1A1A',
          400: '#0D0D0D',
          500: '#000000',
          600: '#000000',
          700: '#000000',
        },
        // Secondary colors
        teal: {
          DEFAULT: '#0B9FBD',
          50: '#B8E8F2',
          100: '#8FDBE9',
          200: '#66CDE1',
          300: '#3DBFD8',
          400: '#0B9FBD',
          500: '#025067',
          600: '#024557',
          700: '#013947',
        },
        magenta: {
          DEFAULT: '#B31B6F',
          50: '#F9B4D5',
          100: '#F68FC1',
          200: '#F369AD',
          300: '#F04499',
          400: '#B31B6F',
          500: '#6c0E42',
          600: '#5A0C37',
          700: '#47092C',
        },
        // Supporting colors
        success: {
          DEFAULT: '#10B981',
          50: '#ECFDF5',
          500: '#10B981',
          700: '#047857',
        },
        warning: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB',
          500: '#F59E0B',
          700: '#B45309',
        },
        error: {
          DEFAULT: '#EF4444',
          50: '#FEF2F2',
          500: '#EF4444',
          700: '#B91C1C',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-mesh': 'radial-gradient(circle at 30% 30%, rgba(179, 27, 111, 0.2), transparent 40%), radial-gradient(circle at 70% 70%, rgba(11, 159, 189, 0.2), transparent 40%)',
        'gradient-text': 'linear-gradient(90deg, #B31B6F, #0B9FBD)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
};