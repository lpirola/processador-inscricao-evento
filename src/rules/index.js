import async from 'async'
import Mailer from './../mailer'

class Rule {
	constructor (SpreadsheetRows) {
		this.rows = SpreadsheetRows
		this.ML = new Mailer()
		this.valid = false

		this._actions = []
	}

	filter (row) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return !re.test(row['e-mail'])
	}

	action (row, done2) {
		let that = this;
		return async.map(that.getActions(), function(action, done) {
			that[action](row, done)
		}, done2)
	}

	validate (done2) {
		let that = this
		that.addActions()
		return async.eachSeries(that.rows, function (row, done) {
			if (that.filter(row)) {
				that.action(row, done)
			} else {
				done(null, row)
			}
		}, function (err, results) {
			that.valid = true
			return done2(err, results)
		})
	}

	invalidateSubscriber (row, done) {
		row.status = 'Inválida'
		row.save(done)
	}

	warningOrganizer(row, done) {
		return this.ML.send ('lucaspirola@gmail.com', 'email inválido encontrado na planilha', 'conteúdo da planilha', done)
	}

	addActions() {
		this._actions.push('invalidateSubscriber')
		this._actions.push('warningOrganizer')
	}

	getActions() {
		return this._actions
	}

	setMailer (mailer) {
		this.ML = mailer
	}
}

export default Rule
