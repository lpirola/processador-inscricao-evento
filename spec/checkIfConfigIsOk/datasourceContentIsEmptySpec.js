import Check from '../../src/modules/check'

describe('Datasource content is empty', () => {
	beforeAll(function () {
		process.env['MAIL_SERVICE'] = 'gmail'
		process.env['MAIL_USER']    = 'teste@teste.com'
		process.env['MAIL_PASS']    = '123'

		process.env['GOOGLE_SPREADSHEET_KEY'] = '1sEMeSOtywIqCsBCaHCJlNWYOsujGm_1gxX_FVQ8iBvQ'
		this.chk = new Check()
	})
	it('Given E-mail is configured and could be send', () => {
		expect(process.env['MAIL_SERVICE']).toBeDefined()
		expect(process.env['MAIL_USER']).toBeDefined()
		expect(process.env['MAIL_PASS']).toBeDefined()
	})
	it('And Datasource config is valid', () => {
		expect(process.env['GOOGLE_SPREADSHEET_KEY']).toBeDefined()
	})
	it('When Developer try to process all subscriptions', () => {})
	it('Then a message must be output with error details', function (done) {
		this.chk.isValid(function (err, results) {
			expect(err).toBe('Datasource não pode ser vazio.')
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
