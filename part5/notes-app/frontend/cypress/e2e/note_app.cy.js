describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testing User',
      username: 'user',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
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
      cy.contains('log in').click()
      cy.get('input:first').type('user')
      cy.get('input:last').type('secret')
      cy.get('#login-btn').click()

      cy.contains('Testing User logged in')
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
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
