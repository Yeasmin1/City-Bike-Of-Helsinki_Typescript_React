import Navigation from '../../src/container/Navigation.tsx';
import { BrowserRouter} from 'react-router-dom';

interface ProfileType {
  picture?:string;
  name: string;
  email?: string;
} 

describe('Navigation with logged in user', () => {
  beforeEach(() => {
    const setLoginProfileSpy = cy.spy().as('setLoginProfileSpy')
    const loginProfileMockValue = {
      picture:"",
      name: "Moushumi",
      email: ""
  }
    var loginProfileMock:ProfileType|null = loginProfileMockValue
    cy.mount(
      <BrowserRouter>
        <Navigation loginProfile={loginProfileMock} setLoginProfile={setLoginProfileSpy}/>
      </BrowserRouter>
    )  
  })
  it('compares intended login user name', () => {
    cy.get('#profileNameButton').contains('Moushumi')
  })
  it('clicking the profile button fires the event handler',() =>{
    cy.get('#profileNameButton').click()
    cy.get('#logoutButton').contains('Logout') 
  })
  it('check logout fires the event handler',() =>{
    cy.get('#profileNameButton').click()
    cy.get('#logoutButton').click()
    cy.get("@setLoginProfileSpy").should("have.been.calledOnceWith", null);
  })
})

describe('Navigation without logged in user', () => {
  beforeEach(() => {
    const setLoginProfileSpy = cy.spy().as('setLoginProfileSpy')
    var loginProfileMock:ProfileType|null = null
    cy.mount(
      <BrowserRouter>
        <Navigation loginProfile={loginProfileMock} setLoginProfile={setLoginProfileSpy}/>
      </BrowserRouter>
    )  
  })
  it('check login button exist', () => {
    cy.get('#loginUserButton').contains('Login')
  })
  it('checks login fires the event handler', () => {
    cy.get('#loginUserButton').click()
    cy.url().should('include', 'loginForm')
  })
  it('compares language',() =>{
    cy.get('#englishButton').contains('English')
    cy.get('#finnishButton').contains('Suomi')
  })
  it('checks english language button fires the event handler',() =>{
    cy.get('#englishButton').contains('English').click()
    cy.get('#navigation-page').should('be.visible', 'City bikes')
  }) 
  it('checks finnish language button fires the event handler',() =>{
    cy.get('#finnishButton').contains('Suomi').click()
    cy.get('#navigation-page').should('be.visible', 'Kaupunkipyörät')
  }) 
  it('checks CBH redirects to the expected home page', () => {
    cy.get('#homePage').click()
    cy.url().should('include', '/')
  })
  it('checks nav elements redirects to the expected links', () => {
    cy.get("a[href='/bikeStation']").click()
    cy.url().should('include', '/bikeStation')  
  })
})
