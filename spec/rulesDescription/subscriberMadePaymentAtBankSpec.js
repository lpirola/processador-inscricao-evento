import Rules from '../../src/rules'
import Util from '../util'

describe('Subscriber made payment at bank (Rule 2)', () => {
	beforeAll(function() {
		let u = new Util()
		this.rl = new Rules(u.validDatasource())
	})
	it('Given Datasource has at least 1 row', function () {
		expect(this.rl.rows.length).toEqual(2)
	})
	it('And Subscriber email is valid and status is "Boleto Pago"', function () {
		expect(this.rl.rows[0]["e-mail"]).toBe(true) // validate
		expect(this.rl.rows[0]["status"]).toEqual('Boleto Pago')
	})
	it('When Organizer check if Subscribers fit rules', function () {
		expect(this.rl.validate()).toBe(true)
	})
	it('Then set Subscriber status to "Confirmado"', function () {
		expect(this.rl.rows[0]["status"]).toEqual('Confirmado')
	})
	it('And Subscriber should receive an email with confirmation instructions',
	function () {
		expect(this.rl.warningSubscriber).toHaveBeenCalled()
	})
})
