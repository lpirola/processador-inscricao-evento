import mainCommand from '../../src'

describe('Config, read and process subscriptions', () => {
	beforeAll(() => {
		process.env['MAIL_SERVICE'] = 'Gmail';
		process.env['MAIL_USER'] = 'teste@teste.com';
		process.env['MAIL_PASS'] = '123';
		process.env['GOOGLE_SPREADSHEET_KEY'] = 'xxx'
		process.env['GOOGLE_CLIENT_EMAIL'] = 'teste@teste.com'
		process.env['GOOGLE_PRIVATE_KEY'] = 'xxx'
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
		it('When Developer try to process all subscriptions', () => {
			mainCommand.parse(['./node_modules/.bin/babel-node', 'src', 'check']);
		})
		it('Then Process should stop')
		it('And output a message with error details')
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
