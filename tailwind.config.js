module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {}
  },
  variants: {
    borderBottomColor: ['hover'],
    borderBottomWidth: ['hover'],
    borderBottomStyle: ['hover']
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
