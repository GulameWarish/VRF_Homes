/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        hvac: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7', // Primary HVAC Blue
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        navy: {
          800: '#132238',
          900: '#0a1628', // Dark Navy Accent
          950: '#050c18',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(2, 132, 199, 0.08), 0 4px 12px rgba(0,0,0,0.04)',
        'premium-hover': '0 20px 50px -12px rgba(2, 132, 199, 0.16), 0 8px 20px rgba(0,0,0,0.06)',
      }
    },
  },
  plugins: [],
}
