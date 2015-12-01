import Datasource from './datasource'
import Mailer from './mailer'

class Check {
	constructor () {
		this.ds = new Datasource()
		this.ml = new Mailer()
	}

	isValid () {
		if (!this.ds.isConfigEmpty()) {
			process.stdout.write('Os dados para configuração da fonte de dados não foram informados')
		} else if (!this.ml.isConfigEmpty()) {
			process.stdout.write('Os dados para configuração do envio do email não foram informados')
		} else {
			this.ds.isValidAccount((err) => {
				if (err) {
					process.stdout.write('As configurações fornecidas para fonte de dados não são válidos')
				}
			})
		}

		process.exit(1)
	}
}

export default Check
