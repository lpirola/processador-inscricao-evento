import Check from '../check'
import Datasource from '../datasource'
import async from 'async'

class Process {
	constructor () {
		this.CK = new Check()
		this.DS = new Datasource()
		this._filters = []
		this._actions = []
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
	addFilter (filter) {
		this._filters.push(filter)
	}
	addAction (action) {
		this._actions.push(action)
	}
	reset () {
		this._actions = []
		this._filters = []
	}
	run (callback) {
		let that = this
		async.series([
			(done) => { that.readDatasource(done) },
			(done) => { that.filterDatasource(done) },
			(done) => { that.actOnDatasource(done) }
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
	filterDatasource (done) {
		console.log(this.DS.content)
		done(null)
	}
	actOnDatasource (done) {
		done(null)
	}
	get filters () { return this._filters }
	get actions () { return this._actions }
}

export default Process
