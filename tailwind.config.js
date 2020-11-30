module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.ts'],
  theme: {
    extend: {}
  },
  variants: {
    borderBottomColor: ['responsive', 'hover', 'focus', 'group-hover'],
    borderBottomWidth: ['responsive', 'hover', 'focus', 'group-hover'],
    borderBottomStyle: ['responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover']
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ]
}
