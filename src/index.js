#!/usr/bin/env node
var program = require('commander');

program
	.version('0.0.1')
	.description('Application simple description')
	.option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
	.command('check')
	.action(()  => {
		let mail_service = process.env['MAIL_SERVICE'],
			mail_user    = process.env['MAIL_USER'],
			mail_pass    = process.env['MAIL_PASS'];

		let google_spreadsheet_key = process.env['GOOGLE_SPREADSHEET_KEY'],
			google_client_email    = process.env['GOOGLE_CLIENT_EMAIL'],
			google_private_key     = process.env['GOOGLE_PRIVATE_KEY'];

		if (!mail_service || !mail_user || !mail_pass) {
			process.stdout.write('Os dados para configuração do envio do email não foram informados');
			process.exit(1);
		}else if (!google_spreadsheet_key || !google_client_email || !google_private_key) {
			process.stdout.write('Os dados para configuração da fonte de dados não foram informados');
			process.exit(1);
		}
	});
//program.parse(process.argv);
module.exports = program;
