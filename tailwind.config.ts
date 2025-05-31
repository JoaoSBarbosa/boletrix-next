import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor:{
        primary: '#00384D',
        secondary: "#E5B96C",
        tertiary: '#B8860B',
        quaternary: '#8B6508',
      },

      colors:{
        primaryColor: '#00384D',
        secondaryColor: "#E5B96C",
        tertiaryColor: '#B8860B',
        quaternaryColor: '#8B6508',
      }
    },
  },
  plugins: [],
}
export default config
