import mainCommand from '../../src'

describe('Datasource is not acessible', () => {
	beforeAll(() => {
		spyOn(process, 'exit')
		spyOn(process.stdout, 'write')

		process.env['MAIL_SERVICE'] = 'gmail'
		process.env['MAIL_USER']    = 'teste@teste.com'
		process.env['MAIL_PASS']    = '123'

		process.env['GOOGLE_SPREADSHEET_KEY'] = 'xxxxxxx'
		process.env['GOOGLE_CLIENT_EMAIL']    = 'testes@gmail.com'
		process.env['GOOGLE_PRIVATE_KEY']     = 'fdsssxxxrtgjnfxbvcxa'

		mainCommand.parse(['./node_modules/.bin/babel-node', 'src', 'check'])
	})
	it('Given E-mail is configured and could be send', () => {
		expect(process.env['MAIL_SERVICE']).toBeDefined()
		expect(process.env['MAIL_USER']).toBeDefined()
		expect(process.env['MAIL_PASS']).toBeDefined()
	})
	it('And Datasource config is valid', () => {
		expect(process.env['GOOGLE_SPREADSHEET_KEY']).toBeDefined()
		expect(process.env['GOOGLE_CLIENT_EMAIL']).toBeDefined()
		expect(process.env['GOOGLE_PRIVATE_KEY']).toBeDefined()
	})
	it('When Developer try to check if configs are', () => {})
	it('Then output a message with information required', () => {
		expect(process.stdout.write.calls.argsFor(0))
			.toEqual(['As configurações fornecidas para fonte de dados não são válidos']);
	})
	it('And Process must stop', () => {
		expect(process.exit.calls.count()).toBe(1)
	})
	afterAll( () => {
		delete process.env['MAIL_SERVICE']
		delete process.env['MAIL_USER']
		delete process.env['MAIL_PASS']

		delete process.env['GOOGLE_SPREADSHEET_KEY']
		delete process.env['GOOGLE_CLIENT_EMAIL']
		delete process.env['GOOGLE_PRIVATE_KEY']
	})
})
