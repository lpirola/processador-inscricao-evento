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

	checkEmailPattern (email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	invalidateSubscriber (row, done) {
		row.status = 'Inválida'
		row.save(done)
	}

	warningOrganizer(row, done) {
		this.ML.send ('lucaspirola@gmail.com', 'email inválido encontrado na planilha', 'conteúdo da planilha', done)
	}

	action (row, done2) {
		let that = this;
		async.parallel([
			function (cb2) {
				that.invalidateSubscriber(row, cb2)
			},
			function (cb3) {
				that.warningOrganizer(row, cb3)
			}
		], done2)
	}

	validate () {
		let that = this
		async.eachSeries(that.rows, function(row, done) {
			if (!that.checkEmailPattern(row['e-mail'])) {
				that.action(row, done)
			} else {
				done(null, true)
			}
		}, function (err) {
			if (!err) {
				that.valid = true
			}
		})
		return that.valid
	}
}

export default Rule
