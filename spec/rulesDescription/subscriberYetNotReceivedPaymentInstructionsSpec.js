import Rules from '../../src/rules'
import Util from '../util'
import Mailer from '../../src/mailer'
import onRegister from '../../src/rules/onRegister'

describe('Subscriber yet not received payment instructions (Rule 1)', () => {
	beforeAll(function() {
		let u = new Util()
		let m = new Mailer()
		m.setTransporter(u.mailerTransport())

		this.rl = new onRegister(u.validDatasource())
		this.rl.setMailer(m)
		spyOn(this.rl, 'warningOrganizer').and.callThrough()
		spyOn(this.rl, 'invalidateSubscriber').and.callThrough()
	})
	it('Given Datasource has at least 1 row', function () {
		expect(this.rl.rows.length).toEqual(2)
	})
	it('And Subscriber email is valid and status is ""', function () {
		expect(this.rl.filter(this.rl.rows[0])).toBe(true)
		expect(this.rl.rows[0]["status"]).toEqual('')
	})
	it('When Organizer check if Subscribers fit rules', function () {
		this.rl.validate()
		expect(this.rl.valid).toBe(true)
	})
	it('Then set Subscriber status to "Boleto Enviado"', function () {
		expect(this.rl.rows[0]["status"]).toEqual('Boleto Enviado')
	})
	it('And Subscriber should receive an email with payment instructions', function () {
		//expect(this.rl.).toHaveBeenCalled()
	})
})
