const path = require('path');
const { defineConfig } = require('vite');

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@base': path.resolve(__dirname, './'),
      '@scripts': path.resolve(__dirname, './scripts'),
    },
  },
});
