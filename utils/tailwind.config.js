/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */

module.exports = {
  content: ['./src/**/*.js', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    extend: {
      spacing: {
        0.5: '0.5rem',
        1: '1rem',
        1.5: '1.5rem',
        2: '2rem',
        3: '3rem',
        4: '4rem',
        5: '5rem',
        6: '6rem',
        7: '7rem',
        8: '8rem',
        9: '9rem',
        10: '10rem',
      },
      colors: {
        brown: 'rgb(102,66,77)',
        yellow: 'rgb(248,222,126)',
        green: 'rgb(80,200,120)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
