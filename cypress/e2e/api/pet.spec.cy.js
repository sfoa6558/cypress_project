describe('Pets', () => {
    beforeEach(() => {
        Cypress.config('baseUrl', "https://petstore.swagger.io/v2")


    })

    it('creates a pet', () => {
        
        cy.request({
            method: 'POST', url: '/pet', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
                'api_key': 'special-key'
            }, body: {
                "id": 1, "category": { "id": 452, "name": "canines" }, "name": "barney",
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 9,
                        "name": "going to the park"
                    }
                ],
                "status": "available"
            }
        })
            .then((resp) => {
                debugger
                expect(resp.status).to.eq(200)
                expect(resp.headers).to.include({
                    'access-control-allow-headers': 'Content-Type, api_key, Authorization',
                    'access-control-allow-methods': 'GET, POST, DELETE, PUT',
                    'access-control-allow-origin': '*',
                    'content-type': 'application/json'

                })


                expect(resp.body).to.deep.include(
                    {
                        "id": 1,
                        "category": {
                            "id": 452,
                            "name": "canines"
                        },
                        "name": "barney",
                        "photoUrls": [
                            "string"
                        ],
                        "tags": [
                            {
                                "id": 9,
                                "name": "going to the park"
                            }
                        ],
                        "status": "available"

                    })

            })

    })

    it('gets an existing pet', () => {
        cy.request('POST', '/pet', { "id": 2, "category": { "id": 14, "name": "dinosaurs" } })

        cy.request('GET', '/pet/2').then((resp) => { expect(resp.body).to.deep.include({ "id": 2, "category": { "id": 14, "name": "dinosaurs" } }) })

    })
    it('deletes an existing pet', () => {
        cy.request('POST', '/pet', { "id": 2, "category": { "id": 14, "name": "dinosaurs" } })
        cy.request('DELETE', '/pet/2', { "api_key": "special_key", "headers":{'Accept': 'application/json'} }).then((resp) => {expect(resp.status).equal(200)})
        cy.request({method:'GET', url: '/pet/2',failOnStatusCode: false})
        .then((resp) => {expect(resp.status).to.equal(404)})

   
    })
    it('updates an existing pet', () => {
        cy.request('POST', '/pet', { "id": 1, "category": { "id": 14, "name": "dinosaurs" } })

        cy.request('PUT','/pet', { "id": 1, "category": { "id": 14, "name": "animals"  }}).then((resp) => {expect(resp.status).to.equal(200)})

        cy.request('GET', '/pet/1').then((resp) => { expect(resp.body).to.deep.include({ "category": { "id": 14, "name": "animals" } }) })

    })

})