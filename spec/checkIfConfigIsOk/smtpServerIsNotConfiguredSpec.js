import Check from '../../src/modules/check'
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
