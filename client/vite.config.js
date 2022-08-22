const path = require('path');
const { defineConfig } = require('vite');

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, './scripts')
    },
  },
});
