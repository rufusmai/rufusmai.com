// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // The rules below keep the code style this project was already written in.
    '@stylistic/space-before-function-paren': ['error', 'always'],
    'vue/object-curly-spacing': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 5 },
      multiline: { max: 1 }
    }]
  }
})
