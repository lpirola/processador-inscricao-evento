#!/usr/bin/env node
import program from 'commander'
import Check from './check'

let chk = new Check()
program
	.version('0.0.1')
	.description('Application simple description')
	.option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
	.command('check')
	.action(() => {
		chk.isValid()
	})
//program.parse(process.argv)
export default program
