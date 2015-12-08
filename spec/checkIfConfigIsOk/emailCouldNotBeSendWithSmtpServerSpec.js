import Check from '../../src/check'
import Util from '../util'

describe('E-mail could not be send with SMTP server', () => {
	beforeAll((done) => {
		spyOn(process, 'exit')
		spyOn(process.stdout, 'write')

		process.env['MAIL_SERVICE'] = 'Gmail';
		process.env['MAIL_USER'] = 'teste@teste.com';
		process.env['MAIL_PASS'] = '123';
		process.env['GOOGLE_SPREADSHEET_KEY'] = '1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw'

		let chk = new Check()
		let u = new Util()
		chk.ML.setTransporter(u.mailerTransport({
			error: new Error('Invalid recipient')
		}))
		chk.isValid(done)
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
	it('Then a message must be output with error details', () => {
		expect(process.stdout.write.calls.argsFor(0))
			.toEqual(['Não foi possível enviar o email de teste.']);
	});
	it('And process must stop', () => {
		expect(process.exit.calls.count()).toBe(1);
	})
	afterAll(() => {
		delete process.env['MAIL_SERVICE']
		delete process.env['MAIL_USER']
		delete process.env['MAIL_PASS']
		delete process.env['GOOGLE_SPREADSHEET_KEY']
	})
})
