module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    '@nuxtjs/eslint-config-typescript'
  ],
  parser: '@babel/eslint-parser',
  plugins: ['vue', 'prettier'],
  rules: {},
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
};
