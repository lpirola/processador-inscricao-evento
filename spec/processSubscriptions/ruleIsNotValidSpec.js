import onRegister from '../../src/modules/rules/onRegister'
import Process from '../../src/modules/process'
import Mailer from '../../src/modules/mailer'
import Util from '../util'

describe('Rules has invalid options', () => {
	beforeAll(function () {
		spyOn(process, 'exit')
		spyOn(process.stdout, 'write')
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
		spyOn(this.prc, 'parseRules').and.callThrough()
	})
	it('Given E-mail and Datasource is configured and valid', function (done) {
		let that = this
		this.prc.check(function (err, results) {
			that.prc = results
			expect(results.validate).toBe(true)
			expect(process.stdout.write.calls.argsFor(0)[0])
				.toEqual(['-> Checagem de conexão com a planilha ok.', '-> Checagem de envio de e-mail ok.'].join('\n'))
			done(err, results)
		})
	})
	it('And Rules has invalid options', function () {
		this.prc.setRule(new onRegister([]))
	})
	it('When Developer try to process all subscriptions', function (done) {
		let that = this
		that.prc.run(function (err, results) {
			expect(that.prc.readDatasource).toHaveBeenCalled()
			expect(that.prc.parseRules).toHaveBeenCalled()
			expect(that.prc.finished).toBe(false)
			done(err, results)
		})
	})
	it('Then Process should output a message with details of pattern error', function(done) {
		let that = this
		that.prc.run(function (err, results) {
			expect(that.prc.finished).toBe(false)
			expect(process.stdout.write.calls.argsFor(3)[0])
				.toEqual(['-> Falha ao validar email dos inscritos'].join('\n'))
			done(err, results)
		})
	})
})
