/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF8F5',
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F3EFE9',
          300: '#ECE5DB',
        },
        beige: {
          DEFAULT: '#E8DED1',
          50: '#FBF9F6',
          100: '#F4EFEA',
          200: '#E8DED1',
          300: '#DCCDBB',
          400: '#CBB49B',
          500: '#B89B7B',
        },
        walnut: {
          DEFAULT: '#654832',
          50: '#F5EFEB',
          100: '#E6D7CB',
          200: '#C8A992',
          300: '#A97E5D',
          400: '#865E3E',
          500: '#654832',
          600: '#523A28',
          700: '#3F2C1E',
          800: '#2C1E15',
          900: '#1A120C',
        },
        gold: {
          DEFAULT: '#C6A77B',
          50: '#FAF7F2',
          100: '#F3EDE0',
          200: '#E6D9C0',
          300: '#D7C29E',
          400: '#C6A77B',
          500: '#B69260',
          600: '#9B7848',
          700: '#7B5E36',
          800: '#5A4426',
        },
        charcoal: {
          DEFAULT: '#242424',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#999999',
          400: '#666666',
          500: '#404040',
          600: '#2E2E2E',
          700: '#242424',
          800: '#1A1A1A',
          900: '#121212',
          950: '#0A0A0A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(36, 36, 36, 0.07)',
        'luxury-hover': '0 30px 60px -12px rgba(101, 72, 50, 0.16)',
        'gold-glow': '0 0 25px rgba(198, 167, 123, 0.25)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        }
      }
    },
  },
  plugins: [],
}
