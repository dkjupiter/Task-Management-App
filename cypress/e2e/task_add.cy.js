Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:5173/')

  cy.get('#username').type('admin') // input username

  cy.get('#password').type('123456') // input password

  cy.get('.bg-\\[\\#3D3432\\]').click() 
})

describe('TC2_1 Add Task with Title, Description', () => { 
  beforeEach(() => {
    cy.login()
  })
  
  it('Visits <Task Manage>', () => {
    cy.get('#title').type('Test Task')

    cy.get('#description').type('Test Task')

    cy.get('.bg-blue-600').click() // คลิก Logout

  })
})

describe('TC2_2 Add Task with Empty Title', () => { 
  beforeEach(() => {
    cy.login()
  })
  
  it('Visits <Task Manage>', () => {

    cy.get('.bg-blue-600').click() // คลิก Logout

  })
})

describe('TC2_1 Add Task with Title, Empty Description', () => { 
  beforeEach(() => {
    cy.login()
  })
  
  it('Visits <Task Manage>', () => {
    cy.get('#title').type('Test Task')

    cy.get('.bg-blue-600').click() // คลิก Logout

  })
})