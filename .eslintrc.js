module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
  },
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
