/// <reference types="Cypress" />

context('Smoke test', () => {
  it('The frontend should work', () => {
    cy.visit('/').contains('conduit')
  })

})
