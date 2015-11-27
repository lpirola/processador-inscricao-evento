import mainCommand from '../../src'
describe('Config, read and process subscriptions', () => {
	describe('Datasource config is empty', () => {
		beforeAll(() => {
			spyOn(process, 'exit')
			spyOn(process.stdout, 'write')

			process.env['MAIL_SERVICE'] = 'gmail'
			process.env['MAIL_USER'] = 'teste@teste.com'
			process.env['MAIL_PASS'] = '123'

			mainCommand.parse(['./node_modules/.bin/babel-node', 'src', 'check']);
		})
		it('Given E-mail is configured and could be send', () => {
			expect(process.env['MAIL_SERVICE']).toBeDefined();
			expect(process.env['MAIL_USER']).toBeDefined();
			expect(process.env['MAIL_PASS']).toBeDefined();
		})
		it('And Datasource config is empty', () => {
			expect(process.env['GOOGLE_SPREADSHEET_KEY']).toBeUndefined();
			expect(process.env['GOOGLE_CLIENT_EMAIL']).toBeUndefined();
			expect(process.env['GOOGLE_PRIVATE_KEY']).toBeUndefined();
		})
		it('When Developer try to process all subscriptions', () => {})
		it('Then output a message with information required', () => {
			expect(process.stdout.write.calls.argsFor(0))
				.toEqual(['Os dados para configuração da fonte de dados não foram informados']);
		})
		it('And Process must stop', () => {
			expect(process.exit.calls.count()).toBe(1);
		})
		afterAll( () => {
			delete process.env['MAIL_SERVICE'];
			delete process.env['MAIL_USER'];
			delete process.env['MAIL_PASS'];
		})
	})
})
