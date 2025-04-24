Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:5173/')

  cy.get('#username').type('admin') // input username

  cy.get('#password').type('123456') // input password

  cy.get('.bg-\\[\\#3D3432\\]').click() 
})

describe('TC3_1 Delete Task', () => { 
  beforeEach(() => {
    cy.login()
  })
  
  it('Visits <Task Manage>', () => {

    cy.get(':nth-child(1) > .flex > .text-red-500').click() // คลิก Logout

  })
})