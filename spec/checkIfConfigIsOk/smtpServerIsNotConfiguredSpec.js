import mainCommand from '../../src'
describe('SMTP server is not configured', () => {
	beforeAll(() => {
		spyOn(process, 'exit')
		spyOn(process.stdout, 'write')
		mainCommand.parse(['./node_modules/.bin/babel-node', 'src', 'check']);
	})
	it('Given SMTP server details is not filled', () => {
		expect(process.env['MAIL_SERVICE']).toBeUndefined();
		expect(process.env['MAIL_USER']).toBeUndefined();
		expect(process.env['MAIL_PASS']).toBeUndefined();
	});
	it('When Developer try to check if config is ok', () => {
		// mainCommand.parse(['./node_modules/.bin/babel-node', 'src', 'check']);
	});
	it('Then a message must be output with information required', () => {
		expect(process.stdout.write.calls.argsFor(0))
			.toEqual(['Os dados para configuração do envio do email não foram informados']);
	});
	it('And process must stop', () => {
		expect(process.exit.calls.count()).toBe(1);
	});
});
