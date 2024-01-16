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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'theYesMan', password: 'nukethencr' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.contains('create new blog')
      cy.get('#title').type('Big Iron on your hip')
      cy.get('#author').type('Marty Robbins')
      cy.get('#url').type('http://falloutnewvegas.com')
      cy.get('#create-blog-btn').click()

      cy.contains('A new blog Big Iron on your hip by Marty Robbins added')
    })

    describe('And a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Piper mods',
          author: 'Nora Nate',
          url: 'http://www.blockchain.net'
        })
      })

      it('Like a blog', function() {
        cy.contains('show').click()
        cy.get('#like-btn').click()
        cy.contains("+1 like to the blog 'Piper mods' by 'Nora Nate' added")
      })
    })


  })


})
