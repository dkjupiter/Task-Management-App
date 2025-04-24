Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:5173/')

  cy.get('#username').type('admin') // input username

  cy.get('#password').type('123456') // input password

  cy.get('.bg-\\[\\#3D3432\\]').click() 
})

describe('TC7_1 Logout', () => { 
  beforeEach(() => {
    cy.login()
  })
  
  it('Visits <Task Manage>', () => {
    cy.get('.text-red-600').click() // คลิก Logout

  })
})