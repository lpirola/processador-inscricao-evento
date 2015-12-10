#!/usr/bin/env node
import program from 'commander'
import Check from './check'
import Process from './process'

import onRegister from './rules/onRegister'
import onConfirmation from './rules/onConfirmation'

let prc = new Process()
let chk = new Check()
program
	.version('0.0.1')
	.description('Processador de inscrições de evento')
	.option('-r, --register', 'Envia o boleto para os participantes cadastrados')
	.option('-c, --confirm', 'Confirma o pagamento para os participantes que pagaram')
	.command('process')
	.action(function() {
		if (options.register) {
			prc.setRule(new onRegister())
		} else if (options.confirmation) {
			prc.setRule(new onConfirmation())
		}
		prc.run()
	})
	.command('check')
	.action(function () {
		chk.isValid()
	})
program.parse(process.argv)
