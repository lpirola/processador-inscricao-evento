import Rules from '../../../src/modules/rules'
import Util from '../../support/util'
import Mailer from '../../../src/modules/mailer'
import onRegister from '../../../src/modules/rules/onRegister'

describe('Subscriber has invalid email (Rules)', () => {
	beforeAll(function() {
		let u = new Util()
		let m = new Mailer()
		m.setTransporter(u.mailerTransport())

		this.rl = new Rules(u.validDatasource())
		this.rl.setMailer(m)
		spyOn(this.rl, 'warningOrganizer').and.callThrough()
		spyOn(this.rl, 'invalidateSubscriber').and.callThrough()
		this.rl.rows[0]["e-mail"] = 'inválidoemail/.com'
	})
	it('Given Datasource has at least 1 row', function () {
		expect(this.rl.rows.length).toEqual(2)
	})
	it('And One Subscriber has invalid email', function() {
		expect(this.rl.rows[0]["e-mail"]).toEqual('inválidoemail/.com')
	})
	it('When Organizer check if Subscriber fit rules', function (done) {
		let that = this
		that.rl.validate(function(err, results) {
			expect(err).toBe(['E-mail inválido encontrado: inválidoemail/.com'].join('\n'))
			expect(that.rl.valid).toBe(false)
			done(err, results)
		})
	})
	it('Then Organizer must receive a email warning about spreadsheet error', function () {
		expect(this.rl.invalidateSubscriber).toHaveBeenCalled()
		expect(this.rl.warningOrganizer).toHaveBeenCalled()
	})
	it('And Subscriber status should be set to "Inválida"', function () {
		expect(this.rl.rows[0]["status"]).toEqual('Inválida')
	})
})

describe('Subscriber already receive payment instructions (Rule 1)', () => {
	beforeAll(function() {
		let u = new Util()
		let m = new Mailer()
		let r = u.validDatasource()
		r[0]['status'] = 'Boleto Enviado'
		m.setTransporter(u.mailerTransport())

		this.rl = new onRegister(r)
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
