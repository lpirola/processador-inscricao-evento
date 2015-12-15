import Rules from '../../src/modules/rules'
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
	it('When Organizer check if Subscribers fit rules', function (done) {
		let that = this
		that.rl.validate(function(err, results) {
			expect(that.rl.valid).toBe(true)
			done(err, results)
		})
	})
	it('Then set Subscriber status to "Confirmado"', function () {
		expect(this.rl.rows[0]["status"]).toEqual('Confirmado')
	})
	it('And Subscriber should receive an email with confirmation instructions',
	function () {
		expect(this.rl.warningSubscriber).toHaveBeenCalled()
	})
})
