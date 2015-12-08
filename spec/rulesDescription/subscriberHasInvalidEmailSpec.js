import Rules from '../../src/rules'
import Util from '../util'

describe('Subscriber has invalid email (Rules)', () => {
	beforeAll(function() {
		let u = new Util()
		this.rl = new Rules(u.validDatasource())
		this.rl.ML.setTransporter(u.mailerTransport())
		// spyOn(this.rl, 'warningOrganizer').and.callThrough()
		// spyOn(this.rl, 'invalidateSubscriber').and.callThrough()
		this.rl.rows[0]["e-mail"] = 'inválidoemail/.com'
	})
	it('Given Datasource has at least 1 row', function () {
		expect(this.rl.rows.length).toEqual(2)
	})
	it('And One Subscriber has invalid email', function() {
		expect(this.rl.rows[0]["e-mail"]).toEqual('inválidoemail/.com')
	})
	it('When Organizer check if Subscriber fit rules', function () {
		expect(this.rl.validate()).toBe(false)
	})
	it('Then Organizer must receive a email warning about spreadsheet error', function () {
		// expect(this.rl.invalidateSubscriber).toHaveBeenCalled()
		// expect(this.rl.warningOrganizer).toHaveBeenCalled()
	})
	it('And Subscriber status should be set to "Inválida"', function () {
		expect(this.rl.rows[0]["status"]).toEqual('Inválida')
	})
})
