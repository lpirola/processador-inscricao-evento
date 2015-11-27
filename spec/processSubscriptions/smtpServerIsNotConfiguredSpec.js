import mainCommand from '../../src'
var sinon = require('sinon').sandbox.create()
var stubExit, stubWrite
describe('Config, read and process subscriptions', () => {
	describe('SMTP server is not configured', () => {
		it('Given SMTP server details is not filled', () => {
			expect(process.env['MAIL_SERVICE']).toBeUndefined();
			expect(process.env['MAIL_USER']).toBeUndefined();
			expect(process.env['MAIL_PASS']).toBeUndefined();
		});
		it('When Developer try to process all subscriptions', () => {
			stubExit = sinon.stub(process, 'exit');
			stubWrite = sinon.stub(process.stdout, 'write');
			mainCommand.parse(['./node_modules/.bin/babel-node', 'src', 'check']);
		});
		it('Then a message must be output with information required', () => {
			var output = stubWrite.args;
			expect(output[0])
				.toEqual(['Os dados para configuração do envio do email não foram informados']);
		});
		it('And process must stop', () => {
			expect(stubExit.calledOnce).toBe(true);
			sinon.restore();
		});
	});
});
