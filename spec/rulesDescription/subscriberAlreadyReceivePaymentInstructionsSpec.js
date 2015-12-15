import Rules from '../../src/modules/rules'
import Util from '../util'
import Mailer from '../../src/modules/mailer'
import onRegister from '../../src/modules/rules/onRegister'

describe('Subscriber already receive payment instructions (Rule 1)', () => {
	beforeAll(function() {
		let u = new Util()
		let m = new Mailer()
		m.setTransporter(u.mailerTransport())

		this.rl = new onRegister(u.validDatasource())
		this.rl.setMailer(m)
		spyOn(this.rl, 'warningOrganizer')
		spyOn(this.rl, 'invalidateSubscriber')
		spyOn(this.rl, 'sendInstructions').and.callThrough()
		spyOn(this.rl, 'markSubscriberReceivedInstructions').and.callThrough()
	})
	it('Given Datasource has at least 1 row', function () {
		expect(this.rl.rows.length).toEqual(2)
	})
	it('And Subscriber email is valid and status is "Boleto Enviado"', function () {
		expect(this.rl.rows[0]["status"]).toEqual('Boleto Enviado')
	})
	it('When Subscribers not fit rules', function (done) {
		let that = this
		that.rl.validate(function(err, results) {
			expect(that.rl.valid).toBe(true)
			done(err, results)
		})
	})
	it('Then Subscriber should not be changed', function () {
		expect(this.rl.rows[0]["status"]).toEqual('Boleto Enviado')
	})
})
