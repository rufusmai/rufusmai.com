/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ],
    options: {
      whitelist: ['bg-green-700', 'bg-red-600'],
      whitelistPatterns: [/^bg-.*-(500|800)$/, /^(from|via|to)-.*-(400|600)$/, /^text-.*-300/]
    }
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: colors.gray,
        teal: colors.teal,
        fuchsia: colors.fuchsia,
        orange: colors.orange,
        rose: colors.rose
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
