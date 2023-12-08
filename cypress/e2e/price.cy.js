describe('test price', () => {

    it('should test each price in a page', () => {
        cy.visit('https://demo.evershop.io/men')
        cy.get('.listing-tem .sale-price').each($el => {
            cy.get($el).invoke('text').should('match', /\$\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/)
        }) 
    })
})
