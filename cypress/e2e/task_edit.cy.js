Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:5173/')

  cy.get('#username').type('admin') // input username

  cy.get('#password').type('123456') // input password

  cy.get('.bg-\\[\\#3D3432\\]').click() 
})

describe('TC4_1 Edit Task', () => { 
  beforeEach(() => {
    cy.login()
  })
  
  it('Visits <Task Manage>', () => {
    cy.get(':nth-child(1) > .flex > .text-blue-600').click()

    cy.get('#title').clear()
    cy.get('#title').type('Edit Test Task')

    cy.get('#description').clear()
    cy.get('#description').type('Edit Test Task')

    cy.get('#status').select('Done')

    cy.get('.bg-blue-600').click() // คลิก Logout

  })
})