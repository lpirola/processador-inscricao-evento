import async from 'async'
import Mailer from './../mailer'

class Rule {
	constructor (SpreadsheetRows) {
		this.rows = SpreadsheetRows
		this.ML = new Mailer()
		this.valid = false
	}

	setMailer (mailer) {
		this.ML = mailer
	}

	invalidateSubscriber (row, done) {
		row.status = 'Inválida'
		return row.save(done)
	}

	warningOrganizer(row, done) {
		return this.ML.send ('lucaspirola@gmail.com', 'email inválido encontrado na planilha', 'conteúdo da planilha', done)
	}

	filter (row) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(row['e-mail']);
	}

	action (row, done2) {
		let that = this;
		async.parallel([
			function (cb2) {
				return that.invalidateSubscriber(row, cb2)
			},
			function (cb3) {
				return that.warningOrganizer(row, cb3)
			}
		], done2)
	}

	validate () {
		let that = this
		return async.map(that.rows, function (row, done) {
			if (!that.filter(row)) {
				return that.action(row, done)
			} else {
				return done(null, true)
			}
		}, function done (err, results) {
			if (!err) {
				that.valid = true
			}
			return that.valid
		})
	}
}

export default Rule
