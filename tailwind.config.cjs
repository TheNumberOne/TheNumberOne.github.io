const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{svx,svelte,html}'],
  theme: {
    extend: {
      colors: {
        grey: colors.gray
      }
    }
  },
  plugins: []
}
