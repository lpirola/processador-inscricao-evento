import Check from '../../src/check'

describe('Datasource config is empty', () => {
	beforeAll(() => {
		spyOn(process, 'exit')
		spyOn(process.stdout, 'write')

		process.env['MAIL_SERVICE'] = 'gmail'
		process.env['MAIL_USER'] = 'teste@teste.com'
		process.env['MAIL_PASS'] = '123'

		let chk = new Check()
		chk.isValid()

	})
	it('Given E-mail is configured and could be send', () => {
		expect(process.env['MAIL_SERVICE']).toBeDefined()
		expect(process.env['MAIL_USER']).toBeDefined()
		expect(process.env['MAIL_PASS']).toBeDefined()
	})
	it('And Datasource config is empty', () => {
		expect(process.env['GOOGLE_SPREADSHEET_KEY']).toBeUndefined()
		expect(process.env['GOOGLE_CREDS']).toBeUndefined()
	})
	it('When Developer try to check if config is ok', () => {})

	it('Then output a message with information required', () => {
		expect(process.stdout.write.calls.argsFor(0))
			.toEqual(['As configurações da fonte de dados não foram informados'])
	})
	it('And Process must stop', () => {
		expect(process.exit.calls.count()).toBe(1)
	})
	afterAll( () => {
		delete process.env['MAIL_SERVICE']
		delete process.env['MAIL_USER']
		delete process.env['MAIL_PASS']
	})
})
