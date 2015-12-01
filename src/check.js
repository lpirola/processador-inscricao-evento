import Datasource from './datasource'
import Mailer from './mailer'
import async from 'async'

class Check {
	constructor () {
		this.ds = new Datasource
		this.ml = new Mailer
	}

	isValid (done = (err, results) => {}) {
		if (!this.ds.isConfigEmpty()) {
			process.stdout.write('Os dados para configuração da fonte de dados não foram informados')
			process.exit(1)
		} else if (!this.ml.isConfigEmpty()) {
			process.stdout.write('Os dados para configuração do envio do email não foram informados')
			process.exit(1)
		} else {
			let that = this
			async.series([
				function(done) {
					that.ds.isValidAccount(done)
				},
				function(done) {
					that.ds.read(done)
				},
			], function (err, results) {
				if (err) {
					process.stdout.write(err)
					process.exit(1)
				}
				done(null, results)
			})
		}
	}
}

export default Check
