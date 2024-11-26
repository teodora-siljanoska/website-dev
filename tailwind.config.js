const colors = require('tailwindcss/');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    boxShadow: {
      custom: '0px 0px 10px 0px rgba(0,0,0,0.1);',
      customDropdown: '0px 10px 10px 0px rgba(0,0,0,0.1);',
      customPink: '-4px 4px 10px 0px rgba(0,0,0,0.1);',
      customDropdown: '0px 10px 10px 0px rgba(0,0,0,0.1);',
    },
    colors: {
      purple: '#552B71',
      white: '#FFFFFF',
      darkTeal: '#009D98',
      lightTeal: '#03B8B2',
      extraLightTeal: '#e5f5f5',
      black: '#000000',
      white: '#FFFFFF',
      transparent: 'transparent',
      darkGrey: '#2C2933',
      lightGrey: '#E1E1E1',
      liliac: '#9D64A9',
      pink: '#D73B5F',
      priceRed: '#D94567',
      yellow: '#F9AE00',
      grey: '#ADADAD',
      formDarkPink: '#D73B5F',
      formLightPink: '#FF6C8E',
      darkGreen: '#00A651',
      lightGreen: '#A0CC5F',
      lightPurple: '#f6f0f7',
    },
    screens: {
      smallest: '320px',
      small: '330px',
      phoneSmall: '340px',
      xxs: '356px',
      phone: '370px',
      xs: '400px',
      phoneLarge: '450px',
      phoneS: '505px',
      heroBreakOne: '560px',
      sm: '640px',
      heroBreakTwo: '690px',
      md: '736px',
      heroBreakThree: '934px',
      lg: '1024px',
      registerPopup: '1149px',
      heroBreakFour: '1250px',
      xl: '1280px',
      xlSpecial: '1430px',
      '2xl': '1620px',
      '3xl': '2120px',
      't':'1170px'
    },
    // container: {
    //   padding: {
    //     DEFAULT: '1rem',
    //     sm: '2rem',
    //     lg: '4rem',
    //     // xl: '5rem',
    //     // '2xl': '6rem',
    //   },
    // },
    extend: {
      fontFamily: {
        mont: ['mont', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 140s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        // center: true,
        // xl: '5rem',
        // '2xl': '6rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('eslint-plugin-tailwindcss'),
  ],
};
