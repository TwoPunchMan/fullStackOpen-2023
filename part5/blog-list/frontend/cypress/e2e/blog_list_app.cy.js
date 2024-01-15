describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'theYesMan',
      password: 'nukethencr',
      name: 'Marty Robbins'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in to application')
      cy.get('#username').type('theYesMan')
      cy.get('#password').type('nukethencr')
      cy.get('#login-btn').click()

      cy.contains('Marty Robbins logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in to application')
      cy.get('#username').type('thiswillfail')
      cy.get('#password').type('notpassword')
      cy.get('#login-btn').click()

      cy.get('.notification').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})
