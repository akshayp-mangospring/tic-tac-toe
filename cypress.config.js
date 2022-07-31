const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  retries: 0,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    testEnv: 'prod',
  },
});
