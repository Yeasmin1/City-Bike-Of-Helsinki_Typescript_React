//Cypress.Commands.add() - use to add a custom command to use when writing tests
Cypress.Commands.add('loginByGoogleApi', () => { 
    cy.session( 'Logging with Google',() => 
    {
        cy.request({
            method: 'POST',//user authentication request
            url: 'https://www.googleapis.com/oauth2/v4/token',
            //request body
            body: {
              grant_type: 'refresh_token',
              client_id: Cypress.env('googleClientId'),
              client_secret: Cypress.env('googleClientSecret'),
              //performs automatic login which is define for the user
              refresh_token: Cypress.env('googleRefreshToken'),
            },
        })
        // (res body) after succesful authentication we recieved an access token for the user
        .then(({ body }) => { 
            const { access_token, id_token } = body
            //request to receive user information for the authenticated user by using the previous access token
            cy.request({
              method: 'GET',
              url: 'https://www.googleapis.com/oauth2/v3/userinfo',
              headers: { Authorization: `Bearer ${access_token}` },
            })
            .then(({ body }) => {
              window.sessionStorage.setItem('userProfile',JSON.stringify(body))
            })
        })
    },
    {
        //The validate function is used to ensure the session has been correctly established.
        validate() {
            cy.window()
                .its('sessionStorage')
                .invoke('getItem', 'userProfile')
                .should('exist')
        }
    }) 
})
  
  /* 
  Typescript need an interface to be decsribed. 
  Cypress has its Chainable interface, 
  but we wish it to have a 'loginByGoogleApi' property too. 
  With this code, we are saying that we want to extend 'Cypress.Chainable' 
  to have a loginByGoogleApi property. 
  */
  export {}
  declare global {
    namespace Cypress {
     interface Chainable {
           loginByGoogleApi(): Chainable<void>
      }
    }
  }