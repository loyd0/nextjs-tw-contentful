module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    linearGradientColors: theme => theme('colors'),
    radialGradientColors: theme => theme('colors'),
    conicGradientColors: theme => theme('colors'),
    extend: {
    },
  },
  variants: {
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
}
