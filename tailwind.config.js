/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {},
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans SC', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: colors.gray,
        teal: colors.teal,
        fuchsia: colors.fuchsia,
        orange: colors.orange,
        rose: colors.rose
      },
      animation: {
        ping: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        hover: 'hover 20s linear infinite alternate',
        bg: 'bg 40s linear infinite'
      },
      keyframes: {
        hover: {
          from: { transform: 'translateX(0) scale(1)' },
          to: { transform: 'translateX(-10px) scale(1.2)' }
        },
        bg: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-600px)' }
        }
      },
      width: {
        screenh: '100vh'
      },
      lineHeight: {
        heading: '1.2 !important'
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      textOpacity: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
