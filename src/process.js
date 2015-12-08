import Check from './check'
import Datasource from './datasource'
import async from 'async'
import Mailer from './mailer'
import Rules from './rules/index'
class Process {
	constructor () {
		this.CK = new Check()
		this.DS = new Datasource()
		this.setMailer()
		this._rules = []
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

	run (callback) {
		let that = this
		async.waterfall([
			function (done) { that.readDatasource(done) },
			function (sheet_content, done) { that.parseRules(sheet_content, done) }
		], function (err, results) {
			if (!err) {
				process.stdout.write(['-> Processamento finalizado com sucesso.'].join('\n'))
				process.exit(1)
				that.finished = true
			} else {
				process.stdout.write(['-> ' + err].join('\n'))
				process.exit(1)
			}
			callback(err, results)
		})
	}

	readDatasource (done) {
		this.DS.readContent(done)
	}

	parseRules (sheet_content, done) {
		let r = new Rules(sheet_content)
		r.setMailer(this.ML)
		if(!r.validate()){
			done('Falha ao validar email dos inscritos')
		}
		done(null)
	}

	addRule (rule) {
		this._rules.push(rule)
	}

	reset () {
		this._rules = []
	}

	get rules () { return this._rules }
}

export default Process
