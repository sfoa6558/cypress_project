Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add("login", (username, password) => {
  //cy.session(
    //username,
   // () => {
      cy.visit('/')
      cy.getBySel("username").type(username)
      cy.getBySel("password").type(password)
      cy.getBySel("login-button").click()
      cy.url().should('include', '/inventory')
      cy.get('.app_logo').should('exist')
      cy.screenshot()
    //})

});

Cypress.Commands.add("addProductToCart", (productAdd, productName, productDescription, productPrice) => {
  cy.getBySel(productAdd).click()
  cy.get(".shopping_cart_link").click()
  cy.contains(productName)
  cy.contains(productDescription)
  cy.contains(productPrice)



});

Cypress.Commands.add("removeProductFromCart", (productRemove, productName, productAdd) => {
  cy.getBySel(productRemove).click()
  cy.contains(productName).should('not.exist')
  cy.getBySel("continue-shopping").click()
  cy.getBySel(productAdd).should('exist')


});



