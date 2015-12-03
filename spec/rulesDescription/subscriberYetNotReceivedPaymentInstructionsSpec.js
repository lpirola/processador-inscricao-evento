import Rules from '../../src/rules'
import Util from '../util'

describe('Subscriber yet not received payment instructions (Rule 1)', () => {
	beforeAll(function() {
		let u = new Util()
		this.rl = new Rules(u.validDatasource())
	})
	it('Given Datasource has at least 1 row', function () {
		expect(this.rl.rows.length).toEqual(2)
	})
	it('And Subscriber email is valid and status is ""', function () {
		expect(this.rl.rows[0]["e-mail"]).toBe(true) // validate
		expect(this.rl.rows[0]["status"]).toEqual('')
	})
	it('When Organizer check if Subscribers fit rules', function () {
		expect(this.rl.validate()).toBe(true)
		expect(this.rl.rows[0]["status"]).toEqual('')
	})
	it('Then set Subscriber status to "Boleto Enviado"', function () {
		expect(this.rl.rows[0]["status"]).toEqual('Boleto Enviado')
	})
	it('And Subscriber should receive an email with payment instructions', function () {
		expect(this.rl.warningOrganize).toHaveBeenCalled()
	})
})
