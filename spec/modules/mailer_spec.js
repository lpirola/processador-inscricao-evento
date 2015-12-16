import Check from '../../src/modules/check'
import Util from '../support/util'

describe('E-mail could not be send with SMTP server', () => {
	beforeAll(function () {
		process.env['MAIL_SERVICE'] = 'Gmail';
		process.env['MAIL_USER'] = 'teste@teste.com';
		process.env['MAIL_PASS'] = '123';
		process.env['GOOGLE_SPREADSHEET_KEY'] = '1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw'

		this.chk = new Check()
		let u = new Util()
		this.chk.ML.setTransporter(u.mailerTransport({
			error: new Error('Invalid recipient')
		}))
	})
	it('Given SMTP server details is filled', () => {
		expect(process.env['MAIL_SERVICE']).toBeDefined()
		expect(process.env['MAIL_USER']).toBeDefined()
		expect(process.env['MAIL_PASS']).toBeDefined()
	})
	it('And Datasource is configured, acessible and not empty', () => {
		expect(process.env['GOOGLE_SPREADSHEET_KEY']).toBeDefined();
	})
	it('When Developer try to check if configs are ok', () => {})
	it('Then a message must be output with error details', function (done) {
		this.chk.isValid(function(err, results) {
			expect(err).toEqual('Não foi possível enviar o email de teste.');
			done()
		})
	});
	afterAll(() => {
		delete process.env['MAIL_SERVICE']
		delete process.env['MAIL_USER']
		delete process.env['MAIL_PASS']
		delete process.env['GOOGLE_SPREADSHEET_KEY']
	})
})
