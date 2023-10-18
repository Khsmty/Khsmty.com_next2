// @ts-check
const colors = require('tailwindcss/colors');

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        gray: colors.gray,
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#187f57',
          secondary: '#8dc064',
          accent: '#f27649',
          neutral: '#eae5d4',
          'base-100': '#ffffff',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
      {
        dark: {
          primary: '#187f57',
          secondary: '#8dc064',
          accent: '#f27649',
          neutral: '#22232f',
          'base-100': '#202124',
          info: '#2670e8',
          success: '#20a783',
          warning: '#f0bd33',
          error: '#f53874',
        },
      },
    ],
  },
};
