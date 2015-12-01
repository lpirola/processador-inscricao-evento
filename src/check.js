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
			this.ds.isValidAccount()
			.then((result) => {
				console.log(result)
			})
			//.catch(error => console.log(error))
				  // {
				// process.stdout.write('Os dados para configuração do envio do email não são válidos')
			// }).catch(err => {
				// console.log(err)
			// })
		}

		process.exit(1)
	}
}

export default Check
