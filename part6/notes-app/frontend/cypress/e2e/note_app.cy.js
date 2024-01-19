describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Testing User',
      username: 'user',
      password: 'secret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('test')
    cy.get('#password').type('dogcoin')
    cy.get('#login-btn').click()

    cy.get('.error').should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Testing User logged in')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can log in', function() {
    cy.contains('log in').click()
    cy.get('#username').type('user')
    cy.get('#password').type('secret')
    cy.get('#login-btn').click()

    cy.contains('Testing User logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user', password: 'secret' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a new note cypress')
      cy.contains('save').click()
      cy.contains('a new note cypress')
    })

    describe('and several notes exist', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function() {
        cy.contains('second note').parent().find('button').click()
        cy.contains('second note').parent().find('button')
          .should('contain', 'make not important')
      })
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made not important', function() {
        cy.contains('another note cypress')
        cy.contains('make not important').click()

        cy.contains('another note cypress')
        cy.contains('make important')
      })
    })
  })
})
