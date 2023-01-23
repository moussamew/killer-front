/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */

module.exports = {
  content: ['./source/**/*.js', './source/**/*.ts', './source/**/*.tsx'],
  theme: {
    extend: {
      fontSize: {
        '2xl': '1.6rem',
        '3xl': '1.8rem',
      },
      spacing: {
        0.5: '0.5rem',
        1: '1rem',
        1.5: '1.5rem',
        2: '2rem',
        2.5: '2.5rem',
        3: '3rem',
        4: '4rem',
        5: '5rem',
        6: '6rem',
        7: '7rem',
        8: '8rem',
        9: '9rem',
        10: '10rem',
      },
      margin: {
        '1/2': '50%',
        '1/3': '33%',
        '1/4': '25%',
        '1/10': '10%',
        '2/5': '40%',
      },
      colors: {
        brand: '#FBF6F0',
        lightDark: '#666260',
        disabled: 'rgba(72, 72, 72, 0.5)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
