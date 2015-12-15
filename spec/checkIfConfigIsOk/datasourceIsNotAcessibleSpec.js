import Check from '../../src/modules/check'

describe('Datasource is not acessible', () => {
	beforeAll(function () {
		process.env['MAIL_SERVICE'] = 'gmail'
		process.env['MAIL_USER']    = 'teste@teste.com'
		process.env['MAIL_PASS']    = '123'

		process.env['GOOGLE_SPREADSHEET_KEY'] = 'xxxxxxx'
		process.env['GOOGLE_CREDS']    = '{"client_email":"testes@gmail.com","private_key":"ddd"}'
		this.chk = new Check()
	})
	it('Given E-mail is configured and could be send', () => {
		expect(process.env['MAIL_SERVICE']).toBeDefined()
		expect(process.env['MAIL_USER']).toBeDefined()
		expect(process.env['MAIL_PASS']).toBeDefined()
	})
	it('And Datasource config is valid', () => {
		expect(process.env['GOOGLE_SPREADSHEET_KEY']).toBeDefined()
		expect(process.env['GOOGLE_CREDS']).toBeDefined()
	})
	it('When Developer try to check if configs are ok', () => {})
	it('Then output a message with information required', function () {
		this.chk.isValid(function (err, results) {
			expect(err).toEqual('As configurações fornecidas para fonte de dados não são válidosError: HTTP error 400: Bad Request "A planilha deste URL não foi encontrada. Verifique se você tem o URL correto e se o proprietário da planilha não a excluiu."');
			done()
		})
	})
	afterAll( () => {
		delete process.env['MAIL_SERVICE']
		delete process.env['MAIL_USER']
		delete process.env['MAIL_PASS']

		delete process.env['GOOGLE_SPREADSHEET_KEY']
		delete process.env['GOOGLE_CREDS']
	})
})
