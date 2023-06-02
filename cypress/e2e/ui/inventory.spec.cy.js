describe('Inventory', () => {
    beforeEach(() => {
        cy.login(Cypress.env("user_name"), Cypress.env("password"));


    })


    it("should add and remove product from cart", function () {
        //cy.debug()
        cy.fixture('inventory').then((inventory) => {
            cy.addProductToCart("add-to-cart-sauce-labs-backpack", inventory.backpack_name, inventory.backpack_description, inventory.backpack_price)
            cy.removeProductFromCart("remove-sauce-labs-backpack", 'Sauce Labs Backpack', 'add-to-cart-sauce-labs-backpack')

        })

    });

    it("should order inventory from A to Z", function () {
        cy.getBySel("product_sort_container").select('az')
        orderMembers(".inventory_item_name", "sort")
    })

    it("should order inventory from Z to A", function () {
        cy.getBySel("product_sort_container").select('za')
        orderMembers(".inventory_item_name", "reverse")

    })

    it("should order prices from low to high", function () {
        cy.getBySel("product_sort_container").select('lohi')
        orderMembers(".inventory_item_price", "sort")

    })

    it("should order prices from high to low", function () {
        cy.getBySel("product_sort_container").select('hilo')
        orderMembers(".inventory_item_price", "reverse")

    })


    function orderMembers(selector, operation) {
        cy.get(selector).invoke("text").then(($elements) => {
            var arrayOfElementText = []
            arrayOfElementText.push($elements)
            if (operation == "reverse") {
                cy.wrap(arrayOfElementText).should("have.ordered.members", arrayOfElementText.reverse());
            }
            else {
                cy.wrap(arrayOfElementText).should("have.ordered.members", arrayOfElementText.sort());
            }


        })
    }



})