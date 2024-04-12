module.exports = {
  plugins: ['prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports'
      }
    ]
  }
}
