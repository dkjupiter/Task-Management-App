describe('TC1_1 Valid Username Valid Password', () => { 
  it('Visits <Login>', () => {
    cy.visit('http://localhost:5173/')

    cy.get('#username').type('admin') // input username

    cy.get('#password').type('123456') // input password

    // cy.get('.bg-\[\#3D3432\]').click แบบนี้ใช้กับ tailwild ไม่ได้
    cy.get('.bg-\\[\\#3D3432\\]').click() // คลิก Enter

  })
})

describe('TC1_2 Invalid Username Valid Password', () => {
  it('Visits <Login>', () => {
    cy.visit('http://localhost:5173/')

    cy.get('#username').type('user') // input username

    cy.get('#password').type('123456') // input password

    // cy.get('.bg-\[\#3D3432\]').click แบบนี้ใช้กับ tailwild ไม่ได้
    cy.get('.bg-\\[\\#3D3432\\]').click() // คลิก Enter

  })
})

describe('TC1_3 Valid Username Invalid Password  >= 6 char', () => {
  it('Visits <Login>', () => {
    cy.visit('http://localhost:5173/')

    cy.get('#username').type('admin') // input username

    cy.get('#password').type('456789') // input password

    // cy.get('.bg-\[\#3D3432\]').click แบบนี้ใช้กับ tailwild ไม่ได้
    cy.get('.bg-\\[\\#3D3432\\]').click() // คลิก Enter

  })
})

describe('TC1_4 Valid Username Invalid Password < 6 char', () => {
  it('Visits <Login>', () => {
    cy.visit('http://localhost:5173/')

    cy.get('#username').type('admin') // input username

    cy.get('#password').type('456') // input password

    // cy.get('.bg-\[\#3D3432\]').click แบบนี้ใช้กับ tailwild ไม่ได้
    cy.get('.bg-\\[\\#3D3432\\]').click() // คลิก Enter

  })
})

describe('TC1_5 Empty Username Valid Password', () => {
  it('Visits <Login>', () => {
    cy.visit('http://localhost:5173/')

    cy.get('#password').type('123456') // input password

    // cy.get('.bg-\[\#3D3432\]').click แบบนี้ใช้กับ tailwild ไม่ได้
    cy.get('.bg-\\[\\#3D3432\\]').click() // คลิก Enter

  })
})

describe('TC1_6 Valid Username Empty Password', () => {
  it('Visits <Login>', () => {
    cy.visit('http://localhost:5173/')

    cy.get('#username').type('admin') // input username

    // cy.get('.bg-\[\#3D3432\]').click แบบนี้ใช้กับ tailwild ไม่ได้
    cy.get('.bg-\\[\\#3D3432\\]').click() // คลิก Enter

  })
})

describe('TC1_7 Empty Username Empty Password', () => {
  it('Visits <Login>', () => {
    cy.visit('http://localhost:5173/')

    // cy.get('.bg-\[\#3D3432\]').click แบบนี้ใช้กับ tailwild ไม่ได้
    cy.get('.bg-\\[\\#3D3432\\]').click() // คลิก Enter

  })
})
