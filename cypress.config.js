const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://saucedemo.com',
    apiUrl: 'https://petstore.swagger.io/v2'
  },
  env: {
     user_name: 'standard_user',
     password: 'secret_sauce'

  },
  
  pageLoadTimeout : 8000,
  chromeWebSecurity: false

});
