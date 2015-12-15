import onConfirmation from '../../src/modules/rules/onConfirmation'
import Mailer from '../../src/modules/mailer'
import Util from '../util'

describe('Subscriber made payment at bank (Rule 2)', function () {
	beforeAll(function() {
		let u = new Util()

		let m = new Mailer()
		m.setTransporter(u.mailerTransport())
		let r = u.validDatasource()
		r[0]['status'] = 'Boleto Pago'

		this.rl = new onConfirmation(r)
		this.rl.setMailer(m)

		spyOn(this.rl, 'warningOrganizer')
		spyOn(this.rl, 'invalidateSubscriber')
		spyOn(this.rl, 'sendConfirmationMessage').and.callThrough()
		spyOn(this.rl, 'markSubscriberMakePayment').and.callThrough()
	})
	it('Given Datasource has at least 1 row', function () {
		expect(this.rl.rows.length).toEqual(2)
	})
	it('And Subscriber email is valid and status is "Boleto Pago"', function () {
		expect(this.rl.filter(this.rl.rows[0])).toBe(true)
		expect(this.rl.rows[0]["status"]).toEqual('Boleto Pago')
	})
	it('When Organizer check if Subscribers fit rules', function (done) {
		let that = this
		this.rl.validate(function(err, results) {
			expect(that.rl.valid).toBe(true)
			done(err, results)
		})
	})
	it('Then set Subscriber status to "Confirmado"', function () {
		expect(this.rl.invalidateSubscriber).not.toHaveBeenCalled()
		expect(this.rl.warningOrganizer).not.toHaveBeenCalled()

		expect(this.rl.rows[0]["status"]).toEqual('Confirmado')
	})
	it('And Subscriber should receive an email with confirmation instructions', function () {
		expect(this.rl.markSubscriberMakePayment).toHaveBeenCalled()
		expect(this.rl.sendConfirmationMesssage).toHaveBeenCalled()
	})
})
