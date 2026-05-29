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
        green: {
          dark: '#1a3d1f',
          mid: '#4a7c3f',
          light: '#d4e8d0',
        },
        cream: '#f5ead6',
        wood: '#d4b896',
        brown: '#2c1a0e',
        parchment: '#fdf6ec',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Lora', 'serif'],
        chalk: ['Caveat', 'cursive'],
      },
      backgroundImage: {
        'wood-texture': `repeating-linear-gradient(
          90deg,
          transparent,
          transparent 2px,
          rgba(180,140,100,0.04) 2px,
          rgba(180,140,100,0.04) 4px
        ), repeating-linear-gradient(
          180deg,
          transparent,
          transparent 40px,
          rgba(160,120,80,0.06) 40px,
          rgba(160,120,80,0.06) 41px
        )`,
      },
    },
  },
  plugins: [],
}
export default config
