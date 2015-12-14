var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	models.Datasource.findAll({})
	.then(function(ds) {
		res.json(ds)
	});
});

router.post('/', function(req, res) {
	models.Datasource.create({
		key: req.body.key,
		interval_update: req.body.interval_update
	}).then(function(err, result) {
		res.json(result);
	});
});

router.put('/', function(req, res) {
	models.Datasources.upsert({
		key: req.body.key,
		interval_update: req.body.interval_update
	}).then(function(err, result) {
		res.json(result);
	});
});

router.delete('/:ds_id', function(req, res) {
	models.Datasource.destroy({
		where: {
			id: req.params.ds_id
		}
	}).then(function() {
		res.redirect('/');
	});
});

module.exports = router;
