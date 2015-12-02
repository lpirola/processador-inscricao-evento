import Filter from '../../src/process/filter'
import Action from '../../src/process/action'
import Process from '../../src/process/index'

var prc;
describe('One Action is not valid', () => {
	beforeAll((done) => {
		//spyOn()
		prc = new Process()
		prc.checkConfigs(done)
	})
	it('Given E-mail and Datasource is configured and valid', () => {
		expect(prc.validate).toBe(true)
	})
	it('And Filters is valid', () => {
		let fil = new Filter()
		prc.addFilter(fil)
	})
	it('And Actions is not a pattern', () => {
		let act = new Action()
		prc.addAction(act)
	})
	it('When Developer try to process all subscriptions', () => {
		prc.run()
	})
	it('Then Process should stop')
	it('And output a message with details of pattern error')
})
