import Rules from './index'
import async from 'async'

class Register extends Rules{
	filter (row) {
		return !(super.filter(row) && (row['status'] === ''))
	}

	action (row, done) {
		let that = this
		let a = super.action
		async.series([
			function (cb1) {
				return a(row, cb1)
			},
			function (cb2) {
				return that.sendInstructions(row, cb2)
			},
			function (cb3) {
				return that.markSubscriberReceivedInstructions(row, cb3)
			}
		], done)
	}
}

export default Register
