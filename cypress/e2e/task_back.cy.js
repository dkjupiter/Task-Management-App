Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:5173/')

  cy.get('#username').type('admin') // input username

  cy.get('#password').type('123456') // input password

  cy.get('.bg-\\[\\#3D3432\\]').click() 
})

Cypress.Commands.add('view', () => {
  cy.get(':nth-child(2) > .flex > .text-green-600').click()
})

describe('TC5_1 Back to Task List', () => { 
  beforeEach(() => {
    cy.login()
    cy.view()
  })
  
  it('Visits <Task Detail>', () => {

    cy.get('.mt-4').click() // คลิก Logout

  })
})