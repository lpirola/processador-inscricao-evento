#!/usr/bin/env node
var program = require('commander');

program
	.version('0.0.1')
	.description('Application simple description')
	.option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
	.command('check')
	.action(function () {
		let mail_service = process.env['MAIL_SERVICE'],
			mail_user    = process.env['MAIL_USER'],
			mail_pass    = process.env['MAIL_PASS'];
		if (!mail_service || !mail_user || !mail_pass) {
			process.stdout.write('Os dados para configuração do envio do email não foram informados');
			process.exit(1);
		}
	});
//program.parse(process.argv);
module.exports = program;
