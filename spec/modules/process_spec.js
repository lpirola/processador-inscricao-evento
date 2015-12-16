import onRegister from '../../src/modules/rules/onRegister'
import Process from '../../src/modules/process'
import Mailer from '../../src/modules/mailer'
import Util from '../support/util'

describe('Rules has invalid options', () => {
	beforeAll(function () {
		process.env['MAIL_SERVICE'] = 'Gmail';
		process.env['MAIL_USER'] = 'teste@teste.com';
		process.env['MAIL_PASS'] = '123';
		process.env['GOOGLE_SPREADSHEET_KEY'] = '1ptzoR99AfWHBiJW4vrzeAc05Ca_d7ykUIdkLyA4oDMs'
		let u = new Util()
		let m = new Mailer()
		m.setTransporter(u.mailerTransport())

		this.prc = new Process()
		this.prc.setMailer(m)
		spyOn(this.prc, 'readDatasource').and.callThrough()
		spyOn(this.prc, 'parseRule').and.callThrough()
	})
	it('Given E-mail and Datasource is configured and valid', function (done) {
		let that = this
		this.prc.check(function (err, results) {
			expect(results)
				.toEqual(['-> Checagem de conexão com a planilha ok.', '-> Checagem de envio de e-mail ok.'].join('\n'))
			done()
		})
	})
	it('And Rules has invalid options', function () {
		//this.prc.setRule(new onRegister([]))
	})
	it('When Developer try to process all subscriptions', function (done) {
		let that = this
		that.prc.run(function (err, results) {
			expect(that.prc.readDatasource).toHaveBeenCalled()
			expect(that.prc.parseRule).toHaveBeenCalled()
			expect(that.prc.finished).toBe(false)
			done(err, results)
		})
	})
	it('Then Process should output a message with details of pattern error', function(done) {
		let that = this
		that.prc.run(function (err, results) {
			expect(err)
				.toEqual(['-> E-mail inválido encontrado: lucaspirolagmail.com'].join('\n'))
			done(err, results)
		})
	})
})

