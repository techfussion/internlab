/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx,js,jsx,scss,css}'],
  theme: {
    extend: {
      colors: {
        customGray1: '#F8F8FD',
        customGray2: '#EFF0F3',
        textBlack1: '#202430',
        textGray1: '#7B8599',
        textGray2: '#BBBCC3',
        textGray3: '#515B6F',
        textBlue1: '#4640DE',
        textBlue2: '#26A4FF',
        textDarkBlue1: '#25324B',
        customBlue1: '#4640DE',
      }
    },
  },
  plugins: [],
};

