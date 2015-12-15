import Check from './check'
import Process from './process'
import onRegister from './rules/onRegister'
import onConfirmation from './rules/onConfirmation'
import kue from 'kue'
import models from '../models'

let redis_url = process.env['REDIS_URL'] || 'redis://127.0.0.1:6379'
let queue = kue.createQueue({ redis: redis_url })
let jobs = {
	createRegister : function(ds) {
		let j = queue.create('register', {
			id: ds.id,
			title: 'Verificando inscritos que não receberam boleto: ' + ds.name
		})
		.delay(parseInt(ds.interval_update))
		.save()
	},
	processRegister : function (job, done) {
		if (job.data.id == undefined) {
			models.Datasource.findAll({}).then(function (dss) {
				dss.forEach(jobs.createRegister)
			})
			done()
		} else {
			models.Datasource.findById(job.data.id).then(function(ds) {
				jobs.createRegister(ds)
				process.env['GOOGLE_SPREADSHEET_KEY'] = ds.key
				let prc = new Process()
				prc.setRule(new onRegister())
				prc.run(done)
			})
		}
	},
	createConfirm : function(ds) {
		queue.create('confirm', {
			id: ds.id,
			title: 'Confirmando inscritos que já pagaram: ' + ds.name
		})
		.delay(parseInt(ds.interval_update))
		.save()
	},
	processConfirm : function (job, done) {
		if (job.data.id == undefined) {
			models.Datasource.findAll({}).then(function(dss) {
				dss.forEach(jobs.createConfirm)
			})
			done()
		} else {
			models.Datasource.findById(job.data.id).then(function(ds) {
				jobs.createConfirm(ds)
				process.env['GOOGLE_SPREADSHEET_KEY'] = ds.key
				let prc = new Process()
				prc.setRule(new onConfirmation())
				prc.run(done)
			})
		}
	},
	init : function () {
		var jobR = queue.create('register', {title: 'Iniciando verificação registros.'}).save();
		var jobC = queue.create('confirm', {title: 'Iniciando confirmação inscritos.'}).save();
		queue.process('register', jobs.processRegister)
		queue.process('confirm', jobs.processConfirm)
	}
}

export default jobs
