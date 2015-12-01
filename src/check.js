import Datasource from './datasource'
import Mailer from './mailer'

class Check {
	constructor () {
		this.ds = new Datasource()
		this.ml = new Mailer()
	}

	isValid () {
		if (!this.ds.isValid()) {
			process.stdout.write('Os dados para configuração da fonte de dados não foram informados')
		} else if (!this.ml.isValid()) {
			process.stdout.write('Os dados para configuração do envio do email não foram informados')
		}
		process.exit(1)
	}
}

export default Check
