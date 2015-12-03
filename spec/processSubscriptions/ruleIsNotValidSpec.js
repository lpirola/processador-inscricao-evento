import Rules from '../../src/rules'
import Process from '../../src/process'
import nodemailer from 'nodemailer'
import stubTransport from 'nodemailer-stub-transport'

var prc
describe('One Filter is not valid', () => {
	beforeAll(function (done) {
		// spyOn(prc, 'check').and.returnValue(true)
		spyOn(process, 'exit')
		// spyOn(process.stdout, 'write')
		process.env['MAIL_SERVICE'] = 'Gmail';
		process.env['MAIL_USER'] = 'teste@teste.com';
		process.env['MAIL_PASS'] = '123';
		process.env['GOOGLE_SPREADSHEET_KEY'] = '1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw'

		prc = new Process()
		let transp = nodemailer.createTransport(stubTransport())
		prc.setMailerTransporter(transp)
		prc.check(done)
	})
	beforeEach(function () {
		this.prc = prc
	})
	it('Given E-mail and Datasource is configured and valid', function () {
		expect(this.prc.validate).toBe(true)
	})
	it('And Rules has invalid options', function () {
				let fil = new Filter()
		this.prc.addFilter(fil)
	})
	it('When Developer try to process all subscriptions', function (done) {
		this.prc.run(done)
	})
	it('Then Process should stop')
	it('And output a message with details of pattern error')
})
