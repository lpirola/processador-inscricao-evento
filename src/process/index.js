import Check from '../check'

class Process {
	constructor () {
		this.CK = new Check()
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
	run () {}
	filterDatasource (DS) {}
	actOnDatasource (DS) {}
	get filters () {}
	get actions () {}
}

export default Process
