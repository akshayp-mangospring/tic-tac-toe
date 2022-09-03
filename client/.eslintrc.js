module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
  },
  root: true,
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@base', './client'],
          ['@scripts', './client/scripts'],
        ],
        extensions: ['.js', '.json'],
      },
    },
  },
};
