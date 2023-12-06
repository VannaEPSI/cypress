describe('template spec', () => {
    const BASE_URL = Cypress.env('BASE_URL')

    it('should go to shoes description page', () => {
        cy.visit(BASE_URL+'/men')
        //cy.contains('/men/seasonal-color-chuck-70-102').click()
        cy.get('img[alt="Seasonal color chuck 70"]').click()
        cy.url().should('contain', BASE_URL+'/men/seasonal-color-chuck-70-102')
    })
    it.only('add a shoes', () => {
        cy.visit(BASE_URL+'/men/seasonal-color-chuck-70-102')
        cy.get('.variant-option-list a').contains('S').click()
        cy.get('.variant-option-list a').contains('Pink').click()
        cy.url().should('contain', BASE_URL+'/men/seasonal-color-chuck-70-102?color=19')

        cy.intercept('POST', '/api/cart/mine/items').as('addToCart')
      
        cy.get('button[type="button"]').should('contain', 'ADD TO CART').click()
        cy.wait('@addToCart').then(()=>{
            cy.get('.toast-mini-cart a[href="/cart"]').click()
        })
        
    })
    it('', () => {})
})