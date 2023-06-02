describe('Checkout', () => {
    beforeEach(() => {
        cy.login(Cypress.env("user_name"), Cypress.env("password"));


    })

    it("should add a product to the cart and checkout", function () {
        cy.fixture('inventory').then((inventory) => {
        
            cy.addProductToCart("add-to-cart-sauce-labs-backpack", inventory.backpack_name, inventory.backpack_description, inventory.backpack_price)
            cy.getBySel("checkout").click()
            
        })

        cy.fixture('users').then((users) => {
            cy.getBySel("firstName").type(users[0].firstname)
            cy.getBySel("lastName").type(users[0].lastname)
            cy.getBySel("postalCode").type("60611")
            
        })
        cy.getBySel("continue").click()
        cy.fixture('inventory').then((inventory) => {
            cy.contains(inventory.backpack_name)
            cy.contains(inventory.backpack_description)
            cy.contains(inventory.backpack_price)
        
            cy.contains("Payment Information")
            cy.contains("Shipping Information")
            cy.contains("Price Total")


        })   
        cy.getBySel("finish").click()
        cy.contains("Thank you for your order!")
        cy.contains("Your order has been dispatched, and will arrive just as fast as the pony can get there!")

    });

    it("should checkout and continue shopping", function () {
        cy.fixture('inventory').then((inventory) => {
        
            cy.addProductToCart("add-to-cart-sauce-labs-backpack", inventory.backpack_name, inventory.backpack_description, inventory.backpack_price)
            cy.getBySel("continue-shopping").click()
            cy.addProductToCart("add-to-cart-sauce-labs-bike-light", inventory.light_name, inventory.light_description, inventory.light_price)
        })
       
        
       

    });


})