import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Roboto', 'sans-serif']
      }
    }
  },
  daisyui: {
    themes: ['light']
  },
  plugins: [daisyui]
};
export default config;
