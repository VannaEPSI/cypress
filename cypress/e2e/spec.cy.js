describe('template spec', () => {
  const BASE_URL = Cypress.env('BASE_URL')
  const Email = 'toto@gmail.com'
  const Password = 'toto'

  it.skip('should have a link to go to login page', () => {
    // Demander à Cypress de se rendre sur une page web
    cy.visit(BASE_URL)
    // Cibler l'élément "lien" (<a>) qui est contenu dans une balise qui a la classe ".header"
    cy.get('.header a[href="/account/login"]').click()

    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    //Assert : Pour vérifier que l'on est sur la page login
    cy.get('input[name="email"]').type('toto@gmail.com')
    cy.get('input[name="password"]').type('toto')

    cy.get('button[type="submit"]').click()
    //Nous sommes redirigés sur la page d'accueil : le login a fonctionné
    cy.url().should('be.oneOf', [BASE_URL,BASE_URL+'/'])
    cy.visit(BASE_URL + '/account')


    cy.get('input[name="email"]').should('not.exist')
    cy.get('input[name="password"]').should('not.exist')
    cy.get('.account-details').should('contain', 'toto@gmail.com')

    cy.visit(BASE_URL + '/account')
    cy.contains('Logout').click()
    cy.visit(BASE_URL)
  })

  it('should have a link to go to login page on the home page', () => {
    // Demander à Cypress de se rendre sur une page web
    cy.visit(BASE_URL)
    // Cibler l'élément "lien" (<a>) qui est contenu dans une balise qui a la classe ".header"
    cy.get('.header a[href="/account/login"]').click()

    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
  })

  it('should be successful to login account with existing credentials', () => {
    //cy.visit(BASE_URL+'/account/login')
    //cy.get('input[name="email"]').type('toto@gmail.com')
    //cy.get('input[name="password"]').type('toto')
    cy.login(Email, Password)

    //Nous sommes redirigés sur la page d'accueil : le login a fonctionné
    cy.url().should('be.oneOf', [BASE_URL,BASE_URL+'/'])
    cy.visit(BASE_URL + '/account')

    cy.get('input[name="email"]').should('not.exist')
    cy.get('input[name="password"]').should('not.exist')
    cy.get('.account-details').should('contain', 'toto@gmail.com')
  })

  it('should be able to log out', () => {
    cy.login(Email, Password)
    cy.visit(BASE_URL + '/account')
    cy.contains('Logout').click()
    cy.url().should('contain', BASE_URL)
    //cy.visit(BASE_URL)
  })

  it('should display an error message on invalid email',() => {
    cy.visit(BASE_URL+'/account/login')
    cy.get('input[name="email"]').type('titi@gmail.com')
    cy.get('input[name="password"]').type('toto')

    cy.get('button[type="submit"]').click()

    cy.contains('Invalid email or password').should('exist')
  })

  it('should display an error message on invalid password',() => {
    cy.visit(BASE_URL+'/account/login')
    cy.get('input[name="email"]').type('toto@gmail.com')
    cy.get('input[name="password"]').type('titi')

    cy.get('button[type="submit"]').click()

    cy.contains('Invalid email or password').should('exist')
  })

  it('should display an error message on empty email and password',() => {
    cy.visit(BASE_URL+'/account/login')

    cy.get('button[type="submit"]').click()

    cy.contains('This field can not be empty').should('exist')
  })


})