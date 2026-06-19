/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0D',
        surface: '#17171A',
        'surface-2': '#1E1E22',
        ivory: '#F2EEE3',
        muted: '#A9A49A',
        'muted-2': '#76726A',
        'gold-1': '#F7E7A6',
        'gold-2': '#D6BC63',
        'gold-3': '#A8862C',
        'available-text': '#9FCDA9',
        'available-bg': 'rgba(111,163,126,0.15)',
        'leased-text': '#B9B9BC',
        'leased-bg': 'rgba(138,138,142,0.18)',
        hairline: 'rgba(214,188,99,0.35)',
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        body: ['"EB Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
