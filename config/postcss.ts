import autoprefixer from 'autoprefixer';
import nesting from 'postcss-nesting';
import tailwind from 'tailwindcss';
import { type CSSOptions } from 'vite';

export const PostCSS: CSSOptions = {
  postcss: {
    plugins: [autoprefixer, nesting, tailwind],
  },
};
