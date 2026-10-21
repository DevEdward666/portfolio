import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          soft: '#181818',
          raised: '#232323',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          soft: '#F4F4F4',
        },
        rosso: {
          DEFAULT: '#DA291C',
          deep: '#B01E14',
        },
        line: {
          DEFAULT: '#D8D8D8',
          dark: '#2E2E2E',
        },
        mute: {
          DEFAULT: '#6B6B6B',
          dark: '#A3A3A3',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Narrow', 'sans-serif'],
        body: ['var(--font-body)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        caps: '0.14em',
      },
      maxWidth: {
        page: '1360px',
      },
    },
  },
  plugins: [],
}

export default config
