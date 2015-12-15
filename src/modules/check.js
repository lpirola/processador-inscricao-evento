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
			callback('As configurações da fonte de dados não foram informados')
		} else if (!this.ML.isConfigEmpty()) {
			callback('As configurações do envio do email não foram informados')
		} else {
			// valida datasource
			async.series([
				function (done) { that.DS.testConnection(done) },
				function (done) { that.DS.readContent(done) },
				function (done) { that.ML.testSend(done) }
			], function (err, results) {
				if (!err) {
					that.validate = true
					callback(null, [
						'-> Checagem de conexão com a planilha ok.',
						'-> Checagem de envio de e-mail ok.'
					].join('\n'))
				} else {
					callback(err.toString())
				}
			})
		}
	}
}

export default Check
