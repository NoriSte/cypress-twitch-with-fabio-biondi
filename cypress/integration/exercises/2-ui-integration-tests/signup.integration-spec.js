/// <reference types="Cypress" />

const headers = { 'Access-Control-Allow-Origin': '*' }

context('The sign up page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
    cy.visit('/register')
  })

  it('Should allow registering and redirects the user to the home page', () => {
    // the fixtures aren't in the body of the test anymore
    cy.intercept('POST', '**/api/users', { fixture: 'private/users/signup', headers }).as(
      'signup-request',
    )
    cy.intercept('GET', '**/api/tags', { fixture: 'private/tags/empty-tags', headers }).as(
      'tags-request',
    )
    cy.intercept('GET', '**/api/articles/feed**', {
      fixture: 'private/articles/empty-articles',
      headers,
    }).as('feed-request')

    cy.findByPlaceholderText('Username').type('Tester', { delay: 0 })
    cy.findByPlaceholderText('Email').type('user@realworld.io', { delay: 0 })
    cy.findByPlaceholderText('Password').type('mysupersecretpassword', { delay: 0 })

    cy.get('form').within(() => cy.findByText('Sign up').click())

    cy.wait('@signup-request').then(interception => {
      // assert about the request payload
      expect(interception.request.body).to.deep.eq({
        user: {
          username: 'Tester',
          email: 'user@realworld.io',
          password: 'mysupersecretpassword',
        },
      })
    })

    // the home page performs more than one request
    cy.wait(['@tags-request', '@feed-request'])

    cy.findByText('No articles are here... yet.').should('be.visible')
  })
})
