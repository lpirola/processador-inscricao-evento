#!/usr/bin/env node
import program from 'commander'
import Command from './command'

let c = new Command()
program
	.version('0.0.1')
	.description('Processador de inscrições de evento')

	.command('process')
	.option('-r, --register', 'Envia o boleto para os participantes cadastrados')
	.option('-c, --confirm', 'Confirma o pagamento para os participantes que pagaram')
	.action(c.process)

	.command('check')
	.action(c.check)

program.parse(process.argv)
