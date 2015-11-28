import mainCommand from '../../src'

describe('Config, read and process subscriptions', () => {
	beforeAll(() => {
		spyOn(process, 'exit')
		spyOn(process.stdout, 'write')

		process.env['MAIL_SERVICE'] = 'Gmail';
		process.env['MAIL_USER'] = 'teste@teste.com';
		process.env['MAIL_PASS'] = '123';
		process.env['GOOGLE_SPREADSHEET_KEY'] = 'xxx'
		process.env['GOOGLE_CLIENT_EMAIL'] = 'teste@teste.com'
		process.env['GOOGLE_PRIVATE_KEY'] = 'xxx'

		mainCommand.parse(['./node_modules/.bin/babel-node', 'src', 'check']);
	})
	describe('Scenario: E-mail could not be send with SMTP server', () => {
		it('Given SMTP server details is filled', () => {
			expect(process.env['MAIL_SERVICE']).toBeDefined()
			expect(process.env['MAIL_USER']).toBeDefined()
			expect(process.env['MAIL_PASS']).toBeDefined()
		})
		it('And Datasource is configured, acessible and not empty', () => {
			expect(process.env['GOOGLE_SPREADSHEET_KEY']).toBeDefined();
			expect(process.env['GOOGLE_CLIENT_EMAIL']).toBeDefined();
			expect(process.env['GOOGLE_PRIVATE_KEY']).toBeDefined();
		})
		it('When Developer try to check if configs are ok', () => {})
		it('Then a message must be output with error details', () => {
			expect(process.stdout.write.calls.argsFor(0))
				.toEqual(['Não foi possível enviar o email de teste.']);
		});
		it('And process must stop', () => {
			expect(process.exit.calls.count()).toBe(1);
		})
	})
	afterAll(() => {
		delete process.env['MAIL_SERVICE']
		delete process.env['MAIL_USER']
		delete process.env['MAIL_PASS']
		delete process.env['GOOGLE_SPREADSHEET_KEY']
		delete process.env['GOOGLE_CLIENT_EMAIL']
		delete process.env['GOOGLE_PRIVATE_KEY']
	})
})
