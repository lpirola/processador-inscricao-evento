import Check from '../../src/modules/check'

describe('Datasource content is empty', () => {
	beforeAll((done) => {
		spyOn(process, 'exit')
		spyOn(process.stdout, 'write')

		process.env['MAIL_SERVICE'] = 'gmail'
		process.env['MAIL_USER']    = 'teste@teste.com'
		process.env['MAIL_PASS']    = '123'

		process.env['GOOGLE_SPREADSHEET_KEY'] = '1sEMeSOtywIqCsBCaHCJlNWYOsujGm_1gxX_FVQ8iBvQ'
		let chk = new Check()
		chk.isValid(done)
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
	it('Then a message must be output with error details', () => {
		expect(process.stdout.write.calls.argsFor(0))
			.toEqual(['Datasource não pode ser vazio.'])
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
