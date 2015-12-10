import Check from './check'
import Process from './process'
import onRegister from './rules/onRegister'
import onConfirmation from './rules/onConfirmation'

class Command {
	process (options) {
		let prc = new Process()
		if (options.register) {
			prc.setRule(new onRegister())
		} else if (options.confirm) {
			prc.setRule(new onConfirmation())
		}
		prc.run()
	}

	check () {
		let chk = new Check()
		chk.isValid()
	}
}
export default Command
