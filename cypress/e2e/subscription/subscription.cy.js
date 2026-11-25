/// <reference types="cypress" />


describe('Subscription', () => {

    var email   =   'hello@gmail.com'
    beforeEach(() => {

        cy.viewport(1920, 1080)
        cy.visit('https://www.bullvpn.com/')

        cy.on('uncaught:exception', (err) => {
            if (err.message.includes('dataLayer is not defined')) {
                return false
            }
        })

    })

    it('Subscription Packget', () => {

        cy.contains('a.nav-link', 'Order').should('be.visible').click()

        cy.get('.package-main-wrap').should('be.visible')
        cy.get('#price-item-79 > span').first().should('be.visible')
        cy.get('#price-item-1 > span').first().should('be.visible')
        cy.get('#price-item-4 > span').first().should('be.visible')
        cy.get('#price-item-2 > span').first().should('be.visible')
        cy.get('#price-item-3 > span').first().should('be.visible')
        cy.get('#price-item-77 > span').first().should('be.visible')
        cy.get('#email').should('be.visible')


        cy.get('#price-item-77 > span').first().click()
        cy.get('#email').type(email)
        cy.wait(2000)

        cy.get('#payment-method-container .card.card-body:visible').should('be.visible')
            .within(() => {
                cy.get('.img-tutorial img').should('be.visible')
                cy.get('.summary-username').should('have.text', email)
                cy.get('.summary-plan').should('have.text', '7 days (7)')
                cy.get('.summary-connection').should('have.text', '1')
                cy.get('.summary-startdate').should('have.text', 'Activate now')
                cy.get('input[placeholder="Enter discount code"]').should('be.visible')
                cy.contains('button', 'USE').should('be.visible')
                cy.contains('.summary-list', 'Total :').should('contain.text', '99 THB')
                cy.get('.summary-discount').should('have.text', '0')
                cy.get('.summary-amount').should('have.text', '99 THB')

            })

        cy.get('#headingQr').click()
        cy.get('button.btn-submit').click()

        cy.origin('https://gateway.ksher.com', () => {
            cy.on('uncaught:exception', (err) => {
                if (err.message.includes('appendChild') || err.message.includes('Unexpected token')) {
                return false
                }
            })

            cy.get('.header').should('be.visible').and('contain.text', 'Checkout')
            cy.get('.text-info .item p').first().should('be.visible').and('not.be.empty')
            cy.get('.text-info .item p').eq(1).should('have.text', 'PERSEC COMPANY LIMITED')
            cy.get('.pay-number').should('contain.text', '99.00').and('contain.text', 'THB')
            cy.get('.ksher-pay-header .label').should('have.text', 'PromptPay')
            cy.get('.ksher-pay-content').should('be.visible')
        })

    })
})