//Test suits for End-to-End testing

describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('login with google button exist' , () => {
    cy.contains('Login').click()
    cy.url().should('include', 'loginForm')
    cy.contains('Login with Google').should('be.visible') 
  })
})

describe('Google API Login', () => {
  beforeEach(() => {
    cy.loginByGoogleApi()
    cy.visit('/')
  })
  it('check logged in user', () =>  {
    cy.contains('Moushumi').should('be.visible') 
  })  
  it('check logged in user after page refresh', () =>  {
    cy.reload()
    cy.contains('Moushumi').should('be.visible') 
  })  
  it('logout', () =>  {
    cy.get('#profileNameButton').click()
    cy.get('#logoutButton').click()
    cy.contains('Login').should('be.visible') 
  })  
})
