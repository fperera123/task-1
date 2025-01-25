module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    semi: [1, 'always'],
    quotes: [1, 'double'],
    'max-len': 'off',
    'linebreak-style': [1],
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }],
    'arrow-parens': ['error', 'as-needed'],
    'vue/multiline-html-element-content-newline': [1],
    'vue/no-unused-components': [1],
    'no-multiple-empty-lines': [1],
    'import/newline-after-import': [1],
    'import/first': [1],
    'import/extensions': [1],
  },
}
