describe('User Login', () => {
  beforeEach(() => {
    cy.visit('/')

  })


  it("should error with the wrong username", function () {
    cy.getBySel("username").type("f")
    cy.getBySel("password").type(Cypress.env("password"))
    cy.getBySel("login-button").click()
    cy.contains("Username and password do not match any user in this service")
    
  });


  it("should error with the wrong password", function () {
    cy.getBySel("username").type(Cypress.env("user_name"))
    cy.getBySel("password").type("f")
    cy.getBySel("login-button").click()
    cy.contains("Username and password do not match any user in this service")
  });

  it("should login with correct credentials and logout", function () {
    cy.login(Cypress.env("user_name"), Cypress.env("password"));
    cy.contains("Open Menu").click()
    cy.contains("Logout")
  });


})