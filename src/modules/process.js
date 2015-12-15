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
		this.CK.isValid(done)
	}

	run (callback = (err, results) => {}) {
		let that = this
		async.waterfall([
			function (done) { that.readDatasource(done) },
			function (sheet_content, done) {
				let r = that.getRule()
				that.parseRule(r, sheet_content, done)
			}
		], function (err, results) {
			if (!err) {
				that.finished = true
				callback(null, ['-> Processamento finalizado com sucesso.'].join('\n'))
			} else {
				callback(['-> ' + err].join('\n'))
			}
		})
	}

	readDatasource (done) {
		this.DS.readContent(done)
	}

	parseRule (r, sheet_content, done) {
		r.setRows(sheet_content)
		r.setMailer(this.ML)
		r.validate(done)
	}

	setRule (rule) {
		this._rule = rule
	}

	getRule () {
		return this._rule
	}
}

export default Process
