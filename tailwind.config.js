/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      rb: ['Roboto', 'sans-serif']
    },
    screens: {
      sm: { max: '949px' },
      md: { min: '949px', max: '1299px' },
      xl: '1300px'
    },
    extend: {
      fontSize: {
        2.75: '0.688rem', // 11px
        5.5: '1.375rem', // 22px
        6.5: '1.625rem', // 26px
        8: '2rem', // 32px
        10: '2.5rem', // 40px
        12.5: '3.125rem', // 50px
        16.25: '4.063rem', // 65px
        20: '5rem' // 80px
      },
      lineHeight: {
        3.5: '0.875rem', // 14px
        4.5: '1.125rem', // 18px
        5.5: '1.375rem', // 22px
        11: '2.75rem', // 44px
        12: '3rem', // 48px
        15: '3.75rem', // 60px
        20: '5rem', // 80px
        25: '6.25rem' // 100px
      },
      spacing: {
        2.25: '0.563rem', // 9px
        3.25: '0.813rem', // 13px
        4.5: '1.125rem', // 18px
        5.5: '1.375rem', // 22px
        6.5: '1.625rem', // 26px
        7.5: '1.875rem', // 30px
        15: '3.75rem', // 60px
        24: '6rem', // 96px
        27.5: '6.875rem', // 110px
        30: '7.5rem', // 120px
        71.5: '17.875rem', // 286px
        76: '19rem',
        82: '20.5rem', //328px
        90: '22.5rem' //360px
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4'
      }
    },
  },
  plugins: [],
};