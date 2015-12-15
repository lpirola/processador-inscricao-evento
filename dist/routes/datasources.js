'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var router = _express2['default'].Router();

router.get('/', function (req, res) {
	_models2['default'].Datasource.findAll({}).then(function (ds) {
		res.json(ds);
	});
});

router.post('/', function (req, res) {
	_models2['default'].Datasource.create({
		name: req.body.name,
		key: req.body.key,
		interval_update: req.body.interval_update * 60000
	}).then(function (err, result) {
		res.json(result);
	});
});

router.put('/', function (req, res) {
	_models2['default'].Datasources.upsert({
		name: req.body.name,
		key: req.body.key,
		interval_update: req.body.interval_update * 60000
	}).then(function (err, result) {
		res.json(result);
	});
});

router['delete']('/:ds_id', function (req, res) {
	_models2['default'].Datasource.destroy({
		where: {
			id: req.params.ds_id
		}
	}).then(function () {
		res.redirect('/');
	});
});

exports['default'] = router;
module.exports = exports['default'];