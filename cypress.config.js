const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "BASE_URL" : "https://demo.evershop.io",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
