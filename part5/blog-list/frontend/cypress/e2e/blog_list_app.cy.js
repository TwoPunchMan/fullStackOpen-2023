describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const userOne = {
      username: 'theYesMan',
      password: 'nukethencr',
      name: 'Marty Robbins'
    }
    const userTwo = {
      username: 'syonBoy',
      password: 'anyaDog',
      name: 'Anya Forger'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, userOne)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, userTwo)
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
        cy.createBlog({
          title: 'Defense of hoover dam',
          author: 'James Hsu',
          url: 'http://www.l33tc0de.com'
        })
        cy.createBlog({
          title: 'Programming C++',
          author: 'Gary Clemens',
          url: 'http://www.dogcoin.com'
        })
      })

      it('Like a blog', function() {
        cy.contains('Piper mods').contains('show').click()
        cy.get('#like-btn').click()
        cy.contains("+1 like to the blog 'Piper mods' by 'Nora Nate'")
      })
    })
  })

  describe('Multiple users', function() {
    describe('logged in as Yes Man', function() {
      beforeEach(function() {
        cy.login({ username: 'theYesMan', password: 'nukethencr' })
        cy.createBlog({
          title: 'Piper mods',
          author: 'Nora Nate',
          url: 'http://www.blockchain.net'
        })
        cy.contains('logout').click()
        cy.login({ username: 'syonBoy', password: 'anyaDog' })
        cy.createBlog({
          title: 'Programming C++',
          author: 'Gary Clemens',
          url: 'http://www.dogcoin.com'
        })
        cy.contains('logout').click()
      })

      it('Deleting blogs only for Yes Man', function() {
        cy.login({ username: 'theYesMan', password: 'nukethencr' })
        cy.contains('show').click()
        cy.contains('remove').click()
      })

      it('Cannot delete Programming C++ as Yes Man', function() {
        cy.login({ username: 'theYesMan', password: 'nukethencr' })
        cy.contains('Programming C++').contains('show').click()
        cy.contains('remove').should('not.exist')
      })
    })

    describe('Blog with the most likes', function() {
      const blogs = [
        {
          title: 'Piper mods',
          author: 'Nora Nate',
          url: 'http://www.blockchain.net'
        },
        {
          title: 'Defense of hoover dam',
          author: 'James Hsu',
          url: 'http://www.l33tc0de.com'
        },
        {
          title: 'Programming C++',
          author: 'Gary Clemens',
          url: 'http://www.dogcoin.com'
        }
      ]

      beforeEach(function() {
        cy.login({ username: 'theYesMan', password: 'nukethencr' })
        cy.createBlog(blogs[0])
        cy.createBlog(blogs[1])
        cy.createBlog(blogs[2])
      })

      it('Blogs sorted according to the most likes top-down', function() {
        cy.contains(blogs[0].title).contains('show').click()
        cy.contains(blogs[0].title).contains('like').as('like1')

        cy.contains(blogs[1].title).contains('show').click()
        cy.contains(blogs[1].title).contains('like').as('like2')

        cy.contains(blogs[2].title).contains('show').click()
        cy.contains(blogs[2].title).contains('like').as('like3')

        cy.get('@like3').click()
        cy.get('@like3').click()
        cy.get('@like3').click()
        cy.get('@like3').click()

        cy.get('@like2').click()
        cy.get('@like2').click()

        cy.get('@like1').click()

        cy.get('.blog').eq(0).should('contain', blogs[2].title)
        cy.get('.blog').eq(1).should('contain', blogs[1].title)
        cy.get('.blog').eq(2).should('contain', blogs[0].title)
      })
    })
  })
})
