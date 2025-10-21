// PostCSS configuration
// Note: Warnings about "flex-end" from survey-core library are expected and harmless
module.exports = {
  plugins: {
    autoprefixer: {
      flexbox: 'no-2009',
    },
  },
}

