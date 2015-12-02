import Datasource from './datasource'
import Mailer from './mailer'
import async from 'async'

class Check {
	constructor () {
		this.DS = new Datasource()
		this.ML = new Mailer()
	}

	setMailerTransporter (transporter) {
		this.ML.transporter = transporter
	}

	isValid (callback = (err, results) => {}) {
		let that = this

		if (!this.DS.isConfigEmpty()) {
			process.stdout.write('As configurações da fonte de dados não foram informados')
			process.exit(1)
		} else if (!this.ML.isConfigEmpty()) {
			process.stdout.write('As configurações do envio do email não foram informados')
			process.exit(1)
		} else {
			// valida datasource
			async.series([
				(done) => { that.DS.testConnection(done) },
				(done) => { that.DS.readContent(done) },
				(done) => { that.ML.testSend(done) }
			], (err, results) => {
				if (!err) {
					that.validate = true
					process.stdout.write('Testes finalizados com sucesso.')
					process.exit(1)
					callback(null)
				} else {
					that.handleErrors(err, results, callback)
				}
			})
		}
	}

	handleErrors (err, results, callback) {
		if (err) {
			process.stdout.write(err.toString())
			process.exit(1)
		}
		callback(null, results)
	}
}

export default Check
