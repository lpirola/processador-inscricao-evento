import Check from '../../src/modules/check'
import Util from '../support/util'

describe('SMTP server is not configured', () => {
	beforeAll(function () {
		process.env['GOOGLE_SPREADSHEET_KEY'] = 'xxxxx'
		this.chk = new Check()
	})
	it('Given SMTP server details is not filled', () => {
		expect(process.env['MAIL_SERVICE']).toBeUndefined();
		expect(process.env['MAIL_USER']).toBeUndefined();
		expect(process.env['MAIL_PASS']).toBeUndefined();
	});
	it('When Developer try to check if config is ok', () => {});
	it('Then a message must be output with information required', function(done) {
		this.chk.isValid(function(err, results) {
			expect(err).toEqual('As configurações do envio do email não foram informados');
			done()
		})
	});
});

describe('Command check done successfully', () => {
	beforeAll(function ()  {
		process.env['MAIL_SERVICE'] = 'Gmail';
		process.env['MAIL_USER'] = 'teste@teste.com';
		process.env['MAIL_PASS'] = '123';
		process.env['GOOGLE_SPREADSHEET_KEY'] = '1gKGxto-RDqS5k2F3TbLXnOoj6IB6RFp18K_MUzBP_Hw'

		this.chk = new Check()
		let u = new Util()
		this.chk.ML.setTransporter(u.mailerTransport())
	})
	it('Given Email is configured and could be send', function (done) {
		this.chk.ML.testSend(function (err, results) {
			expect(err).toBeNull()
			expect(results).toContain('hello world!')
			done(null)
		})
	})
	it('And Datasource is configured and is validated', function (done) {
		//expect(process.stdout.write.calls.any()).toBe(false)
		this.chk.DS.readContent((err, results) => {
			done(null)
		})
	})
	it('When Developer try to check if configs are ok', function () {
		expect(this.chk.ML.validate).toBe(true)
		expect(this.chk.DS.validate).toBe(true)
	})
	it('Then Process should output a message with success details from configs tests', function (done) {
		this.chk.isValid(function(err, results) {
			expect(results)
				.toEqual(['-> Checagem de conexão com a planilha ok.', '-> Checagem de envio de e-mail ok.'].join('\n'))
			done()
		})
	});
	afterAll( () => {
		delete process.env['MAIL_SERVICE']
		delete process.env['MAIL_USER']
		delete process.env['MAIL_PASS']

		delete process.env['GOOGLE_SPREADSHEET_KEY']
	})
})
