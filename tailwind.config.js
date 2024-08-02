/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const createFontSize = (start, end) => {
  let obj = {}
  for (let i = start; i <= end; i += 2) {
    obj[i] = `${i}px`
  }
  return obj
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fsizes: createFontSize(10, 50),
    extend: {},
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities({
        fsizes: value => ({
          fontSize: value
        })
      }, {
        values: theme('fsizes')
      })
    })
  ],
}

