import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: false,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          100: '#F5F5DC',
          200: '#E8E4C9',
          300: '#DCD8B6',
          400: '#CFCBA3',
          500: '#C3BF90',
        },
      },
    },
  },
  plugins: [],
};

export default config; 