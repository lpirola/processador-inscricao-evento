import Datasource from './datasource'
import Mailer from './mailer'
import async from 'async'

class Check {
	constructor () {
		this.DS = new Datasource()
		this.ML = new Mailer()
		this.validate = false
	}

	setMailer (mailer) {
		this.ML = mailer
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
				function (done) { that.DS.testConnection(done) },
				function (done) { that.DS.readContent(done) },
				function (done) { that.ML.testSend(done) }
			], function (err, results) {
				if (!err) {
					that.validate = true
					process.stdout.write([
						'-> Checagem de conexão com a planilha ok.',
						'-> Checagem de envio de e-mail ok.'
					].join('\n'))
					process.exit(1)
					callback(null, that)
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
