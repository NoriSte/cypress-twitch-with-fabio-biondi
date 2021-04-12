/// <reference types="Cypress" />

let previousJwt
let previousCredentials = {}

Cypress.Commands.add('register', { prevSubject: 'optional' }, function (_subject) {
  // ------------------------------
  // leverage the previous token
  if (previousJwt) {
    // please note: cy.log accepts markdown too
    cy.log('Try to reuse jwt token 🤞')
    // set the token
    localStorage.setItem('jwt', previousJwt)

    cy.visit('/')

    // use the 'New Post' string to detect if the user is authenticated or not
    cy.findByText('New Post').should('be.visible')

    // the user has been already registered and it's logged in
    // yield the credentials for te next command
    cy.log('The previous user is recycled 🚀')

    // yield the credentials for the next command
    cy.wrap(previousCredentials)
    return
  }

  // we need to register the user
  cy.log('A new user must be registered ⚙️')

  // ------------------------------
  // the registration flow
  const random = Math.round(Math.random() * 1000000)
  const credentials = {
    username: `foo${random}`,
    email: `foo${random}@bar.com`,
    password: 'bazbazbaz',
  }
  cy.intercept('POST', '**/api/users').as('signup-request')
  cy.visit('/register')
  cy.window().its('appActions').invoke('signup', credentials)
  cy.wait('@signup-request').then(_interception => {
    // ... all the payload assertions are skipped for brevity...
  })

  // ------------------------------
  // wait until the localStorage token is saved
  cy.wrap(localStorage)
    .its('jwt')
    .should(jwt => expect(jwt).to.be.a('string').and.not.to.be.empty)
    .then(jwt => {
      // store the token and the credentials
      previousJwt = jwt
      previousCredentials = credentials
      return credentials
    })
})

context('The New Post page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
  })

  it('Should get the user registered', () => {
    cy.register().should(user => {
      expect(user).to.have.property('username').and.not.to.be.empty
      expect(user).to.have.property('email').and.not.to.be.empty
      expect(user).to.have.property('password').and.not.to.be.empty
    })

    cy.visit('/editor')
    cy.findByText('New Post').should('be.visible')
  })

  it('Should get the user registered (leveraging the previous user)', () => {
    cy.register()
    cy.visit('/editor')
    cy.findByText('New Post').should('be.visible')
  })
})
