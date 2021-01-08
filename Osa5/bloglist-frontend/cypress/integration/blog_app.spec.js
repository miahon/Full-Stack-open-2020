describe('Blog ', function() {

    beforeEach(function() {
        

        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
          name: 'Mika Ahonen',
          username: 'miahon',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.visit('http://localhost:3000')


      })

    it('user can login', function() {
      cy.contains('login').click()
      cy.get('#username').type('miahon')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Mika Ahonen logged in')
    })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('miahon')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

   
        cy.contains('virhe kirjautumisessa')
        cy.get('html').should('not.contain', 'Mika Ahonen logged in')
      })


    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'miahon', password: 'salainen' })
        })
    
        it('a new blog can be created, liked and deleted', function() {
          cy.contains('new blog').click()
          cy.get('#title').type('a blog created by cypress')
          cy.get('#author').type('ma itte')
          cy.get('#url').type('www.wwww.fi')
          cy.contains('create').click()
          cy.contains('a blog created by cypress')
          cy.reload()
          cy.contains('view').click()
          cy.contains('like').click()
          cy.contains('1')
          cy.contains('delete').click()
          cy.get('html').should('contain', 'deleted')

        })
      })

      describe('logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'miahon', password: 'salainen' })
        })
    
        it.only('most liked first', function() {
          cy.contains('new blog').click()
          cy.get('#title').type('a blog created by cypress')
          cy.get('#author').type('ma itte')
          cy.get('#url').type('www.wwww.fi')
          cy.contains('create').click()
          cy.contains('a blog created by cypress')
          cy.reload()
          cy.contains('view').click()
          cy.contains('like').click()
          cy.contains('1')

          cy.contains('new blog').click()
          cy.get('#title').type('blog2')
          cy.get('#author').type('ma itte')
          cy.get('#url').type('www.wwww2.fi')
          cy.get('#create-button').click()
          cy.contains('blog2')
          cy.reload()
          cy.get('#blog2').click()
          cy.contains('like').click()
          cy.contains('like').click()
          cy.contains('like').click()
          cy.contains('like').click()
          cy.reload()

          cy.contains('view').click() // eka view
          cy.contains('4')



        })
      })


  })