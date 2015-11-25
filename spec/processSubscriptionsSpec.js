var sinon = require('sinon').sandbox.create();
var mainCommand = require('../src');

describe('Config, read and process subscriptions', function() {
	beforeEach(function() {
		sinon.stub(process, 'exit');
		sinon.stub(process.stdout, 'write');
	});
	describe('SMTP server is not configured', function() {
		it('Given SMTP server details is not filled', function() {
			expect(process.env['MAIL_SERVICE']).toBe(undefined);
			expect(process.env['MAIL_USER']).toBe(undefined);
			expect(process.env['MAIL_PASS']).toBe(undefined);
		});
		it('When Developer try to process all subscriptions', function() {
			mainCommand.parse(process.argv);
		});
		it('Then a message must be output with information required', function() {
			var output = process.stdout.write.args[0];

			output[0].should.containEql([
				'Os dados para configuração do envio do email não foram informados'
			].join('\n'));
		});
		it('And process must stop', function() {
			expect(process.exit.calledOnce).toBe(true);
		});
	});
	afterEach(function() {
		sinon.restore();
	});
});
