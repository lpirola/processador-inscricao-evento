import Check from './check'
import Process from './process'
import onRegister from './rules/onRegister'
import onConfirmation from './rules/onConfirmation'
import kue from 'kue'

let redis_url = process.env['REDIS_URL'] || 'redis://127.0.0.1:6379'
var queue = kue.createQueue({ redis: redis_url })

class Queue {
	constructor () {
		var jobR = queue.create('register', {}).save( function(err){
			if( !err ) console.log( jobR.id );
		});
		var jobC = queue.create('confirm', {}).save( function(err){
			if( !err ) console.log( jobC.id );
		});
		this.process()
	}

	process () {
		queue.process('register', function(job, done){
			// process.env['GOOGLE_SPREADSHEET_KEY']
			// let prc = new Process()
			// prc.setRule(new onRegister())
			// prc.run(done)
			console.log('enviando email de registro')
			var jobR = queue.create('register', {}).delay(60000).save( function(err){
				if( !err ) {
					console.log( jobR.id )
					done()
				}
			});
		});
		queue.process('confirm', function(job, done){
			// process.env['GOOGLE_SPREADSHEET_KEY']
			// let prc = new Process()
			// prc.setRule(new onConfirmation())
			// prc.run(done)
			console.log('enviando email de confirmacao')
			var jobC = queue.create('confirm', {}).delay(30000).save( function(err){
				if( !err ) {
					console.log( jobC.id )
					done()
				}
			});
		});
	}

	check () {
		let chk = new Check()
		chk.isValid()
	}
}
export default Queue
