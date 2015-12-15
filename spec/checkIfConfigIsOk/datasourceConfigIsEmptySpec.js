import Check from '../../src/modules/check'

describe('Datasource config is empty', () => {
	beforeAll(function () {
		process.env['MAIL_SERVICE'] = 'gmail'
		process.env['MAIL_USER'] = 'teste@teste.com'
		process.env['MAIL_PASS'] = '123'

		this.chk = new Check()
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

	it('Then output a message with information required', function (done) {
		this.chk.isValid(function (err, results) {
			expect(err).toBe('As configurações da fonte de dados não foram informados')
			done()
		})
	})

	afterAll( () => {
		delete process.env['MAIL_SERVICE']
		delete process.env['MAIL_USER']
		delete process.env['MAIL_PASS']
	})
})
