import models  from '../models'
import express from 'express'

let router = express.Router()

router.get('/', function(req, res) {
	models.Datasource.findAll({})
	.then(function(ds) {
		res.json(ds)
	})
})

router.post('/', function(req, res) {
	models.Datasource.create({
		name: req.body.name,
		key: req.body.key,
		interval_update: req.body.interval_update*60000
	}).then(function(err, result) {
		res.json(result)
	})
})

router.put('/', function(req, res) {
	models.Datasources.upsert({
		name: req.body.name,
		key: req.body.key,
		interval_update: req.body.interval_update*60000
	}).then(function(err, result) {
		res.json(result)
	})
})

router.delete('/:ds_id', function(req, res) {
	models.Datasource.destroy({
		where: {
			id: req.params.ds_id
		}
	}).then(function() {
		res.redirect('/')
	})
})

export default router
