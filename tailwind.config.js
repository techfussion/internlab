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
        customBlack1: '#202430',
        design: 'rgba(86, 205, 173, 0.10)',
        sales: 'rgba(235, 255, 51, 0.20)',
        marketing: 'rgba(235, 133, 51, 0.10)',
        finance: 'rgba(86, 205, 255, 0.10)',
        technology: 'rgba(255, 101, 80, 0.10)',
        engineering: 'rgba(255, 101, 200, 0.10)',
        business: 'rgba(70, 64, 222, 0.10)',
        hr: 'rgba(150, 205, 173, 0.10)',
        txtDesign: '#569BAD',
        txtSales: '#FFAB36',
        txtMarketing: '#FFB836',
        txtFinance: '#56CDFF',
        txtTechnology: '#FF6550',
        txtEngineering: '#FF65FF',
        txtBusiness: '#4640DE',
        txtHr: '#96ADAA',
      }
    },
  },
  plugins: [],
};

