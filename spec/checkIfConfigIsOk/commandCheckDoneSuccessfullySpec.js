import Check from '../../src/check'
import Util from '../util'

var chk
describe('Command check done successfully', () => {
	beforeAll(() => {
		spyOn(process, 'exit')
		spyOn(process.stdout, 'write')

		process.env['MAIL_SERVICE'] = 'Gmail';
		process.env['MAIL_USER'] = 'teste@teste.com';
		process.env['MAIL_PASS'] = '123';
		process.env['GOOGLE_SPREADSHEET_KEY'] = '1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw'

		chk = new Check()
		let u = new Util()
		chk.ML.setTransporter(u.mailerTransport())
	})
	it('Given Email is configured and could be send', (done) => {
		expect(process.stdout.write.calls.any()).toBe(false)
		chk.ML.testSend(function (err, results) {
			expect(err).toBeNull()
			expect(results).toContain('hello world!')
			done(null)
		})
	})
	it('And Datasource is configured and is validated', (done) => {
		//expect(process.stdout.write.calls.any()).toBe(false)
		chk.DS.readContent((err, results) => {
			done(null)
		})
	})
	it('When Developer try to check if configs are ok', (done) => {
		expect(chk.ML.validate).toBe(true)
		expect(chk.DS.validate).toBe(true)
		chk.isValid(done)
	})
	it('Then Process should output a message with success details from configs tests', () => {
		expect(process.stdout.write.calls.argsFor(2)[0])
			.toEqual(['-> Checagem de conexão com a planilha ok.', '-> Checagem de envio de e-mail ok.'].join('\n'))
	});
	it('And process must stop', () => {
		expect(process.exit.calls.count()).toBe(1);
	})
	afterAll( () => {
		delete process.env['MAIL_SERVICE']
		delete process.env['MAIL_USER']
		delete process.env['MAIL_PASS']

		delete process.env['GOOGLE_SPREADSHEET_KEY']
	})
})
