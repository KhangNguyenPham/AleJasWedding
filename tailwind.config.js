/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-pink-blue': 'linear-gradient(to right, theme("colors.pink.400") 20%, theme("colors.blue.400") 100%)',
      },
      fontFamily: {
        romantic: ['Great Vibes', 'cursive'],
        script: ['Dancing Script', 'cursive'],
        body: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'pink-pastel': '#F8C8DC',
        'blue-pastel': '#A7C7E7',
        'beige-soft': '#FFF5E1',
        'gold-soft': '#E6C200',
      }
    },
  },
  plugins: [],
};
