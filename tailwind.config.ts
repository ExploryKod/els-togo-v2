import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./app/**/*.{ts,tsx}", 
    "./sanity/**/*.{ts,tsx}",
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    flowbite.content(),
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px'
      }
    },
    extend: {
      minHeight: {
        'hero': 'calc(100vh - 96px)',
      },
      backgroundImage: {
        'span-bg': 'var(--span-bg)'
      },
      colors: {
        primary: 'var(--els-primary)',
        'primary-darken': 'var(--els-primary-darken)',
        'primary-05': 'var(--els-primary-05)',
        'primary-08': 'var(--els-primary-08)',

        secondary: 'var(--els-secondary)',
        'secondary-darken': 'var(--els-secondary-darken)',
        'secondary-08': 'var(--els-secondary-08)',

        tertiary: 'var(--els-tertiary)',
        'tertiary-darken': 'var(--els-tertiary-darken)',
        'tertiary-08': 'var(--els-tertiary-08)',

        horizon: 'var(--els-horizon)',
        'horizon-darken': 'var(--els-horizon-darken)',

        white: 'var(--els-white)',
        black: 'var(--els-black)',
      },
      boxShadow: {
        'secondary-blue': '0 7.4px 0 rgba(149, 127, 165, 0.7)', 
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'var(--rubik)', "var(--font-inter)"]
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    }
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    typography,
    require('tailwindcss-animate'),
    flowbite.plugin()
  ],
} satisfies Config;

