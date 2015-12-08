import Rules from '../../src/rules'
import Util from '../util'

describe('Subscriber already receive payment instructions (Rule 1)', () => {
	beforeAll(function() {
		let u = new Util()
		this.rl = new Rules(u.validDatasource())
		this.rl.rows[0]["status"] = 'Boleto Enviado'
	})
	it('Given Datasource has at least 1 row', function () {
		expect(this.rl.rows.length).toEqual(2)
	})
	it('And Subscriber email is valid and status is "Boleto Enviado"', function () {
		expect(this.rl.rows[0]["status"]).toEqual('Boleto Enviado')
	})
	it('When Subscribers not fit rules', function () {
		expect(this.rl.validate()).toBe(true)
	})
	it('Then Subscriber should not be changed', function () {
		expect(this.rl.rows[0]["status"]).toEqual('Boleto Enviado')
	})
})
