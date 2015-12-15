import Check from './check'
import Datasource from './datasource'
import async from 'async'
import Mailer from './mailer'
import Rule from './rules/index'

class Process {
	constructor () {
		this.CK = new Check()
		this.DS = new Datasource()
		this.setMailer()
		this._rule = new Rule([])
		this.finished = false
	}

	setMailer (mailer='') {
		if (!mailer) {
			mailer = new Mailer()
		}
		this.ML = mailer
		this.CK.setMailer(mailer)
	}

	check (done) {
		let that = this
		this.CK.isValid(function(err, results) {
			that.CK = results
			done(err, results)
		})
	}

	run (callback = (err, results) => {}) {
		let that = this
		async.waterfall([
			function (done) { that.readDatasource(done) },
			function (sheet_content, done) { that.parseRules(sheet_content, done) }
		], function (err, results) {
			if (!err) {
				callback(null, ['-> Processamento finalizado com sucesso.'].join('\n'))
				that.finished = true
			} else {
				callback(['-> ' + err].join('\n'))
			}
		})
	}

	readDatasource (done) {
		this.DS.readContent(done)
	}

	parseRules (sheet_content, done) {
		let r = this.getRule()
		r.setRows(sheet_content)
		r.setMailer(this.ML)
		r.validate(function(err, results) {
			if (err) {
				done('Falha ao processar os inscritos ' + err.toString())
			} else {
				done(null, results)
			}
		})
	}

	setRule (rule) {
		this._rule = rule
	}

	getRule () {
		return this._rule
	}
}

export default Process
