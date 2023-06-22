/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#25bc53',
          secondary: '#d8cc1e',
          accent: '#ffcc42',
          neutral: '#342438',
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
