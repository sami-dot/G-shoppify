/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        clrOrangePeel: '#F9A109',
        clrYellowishOrange: '#FFF0DE',
        clrRosyFinch: '#80485B',
        clrGranite: '#828282',
        clrShowDrift: '#F8F8F8',
        clrGhostWhite: '#FAFAFE',
        clrCottonSeed: '#BDBDBD',
        clrGravel: '#454545',
        clrValentineRed: '#EB5757',
        clrSliverSand: '#C1C1C4',
        clrDarkGrey: '#34333A',
        clrMalibu: '#56CCF2',
        clrPearlBush: '#E0E0E0',
      },
      fontFamily: {
        Quicksand: ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 0px 15px -8px rgba(0, 0, 0, 0.3)',
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
};
