describe('template spec', () => {
    const BASE_URL = Cypress.env('BASE_URL')
    const Email = 'toto@gmail.com'
    const Password = 'toto'

    it('should go to shoes description page', () => {
        cy.login(Email, Password)
        cy.visit(BASE_URL+'/men')
        //cy.contains('/men/seasonal-color-chuck-70-102').click()
        cy.get('img[alt="Seasonal color chuck 70"]').click()
        cy.url().should('contain', BASE_URL+'/men/seasonal-color-chuck-70-102')
    

        cy.get('.variant-option-list a').contains('S').click()
        cy.get('.variant-option-list a').contains('Pink').click()
        cy.url().should('contain', BASE_URL+'/men/seasonal-color-chuck-70-102?color=19')

        cy.intercept('POST', '/api/cart/mine/items').as('addToCart')
      
        cy.get('button[type="button"]').should('contain', 'ADD TO CART').click()
        cy.wait('@addToCart').then(()=>{
            cy.get('.toast-mini-cart a[href="/cart"]').click()
            cy.url().should('contain', BASE_URL+'/cart')
        })
        cy.get('body a[href="/checkout"]').click()

        cy.get('input[name="address[full_name]"]').type('toto')
        cy.get('input[name="address[telephone]"]').type('0645000000')
        cy.get('input[name="address[address_1]"]').type('123 rue du soleil')
        cy.get('input[name="address[city]"]').type('Lyon')

        //cy.intercept('POST', '/api/cart/mine/items').as('addToCart')
        
        cy.contains('Country').click()
        cy.get('select').select('China')
        cy.contains('Province').click()
        cy.get('select').should('contain', '#address[province]').select('Beijing')

        cy.get('input[name="address[postcode]"]').type('69000')
        
    })
    it.skip('', () => {})
})