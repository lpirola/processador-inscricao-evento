import Check from './check'
import Datasource from './datasource'
import async from 'async'

class Process {
	constructor () {
		this.CK = new Check()
		this.DS = new Datasource()
		this._rules = []
		this.validate = false
	}

	setMailerTransporter (transport) {
		this.CK.setMailerTransporter(transport)
	}

	check (done) {
		let that = this
		this.CK.isValid(function(err, results) {
			that.validate = true
			done(err, results)
		})
	}

	addRule (rule) {
		this._rules.push(rule)
	}

	reset () {
		this._rules = []
	}
	run (callback) {
		let that = this
		async.series([
			(done) => { that.readDatasource(done) },
			(done) => { that.parseRules(done) },
		], (err, results) => {
			if (!err) {
				process.stdout.write('Processo terminado com sucesso')
				process.exit(1)
			}
			callback(err, results)
		})
	}

	readDatasource (done) {
		this.DS.readContent(done)
	}

	parseRules (done) {
		// console.log(this.DS.content)
		done(null)
	}

	get rules () { return this._rules }
}

export default Process
