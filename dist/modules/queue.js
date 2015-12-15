'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _check = require('./check');

var _check2 = _interopRequireDefault(_check);

var _process = require('./process');

var _process2 = _interopRequireDefault(_process);

var _rulesOnRegister = require('./rules/onRegister');

var _rulesOnRegister2 = _interopRequireDefault(_rulesOnRegister);

var _rulesOnConfirmation = require('./rules/onConfirmation');

var _rulesOnConfirmation2 = _interopRequireDefault(_rulesOnConfirmation);

var _kue = require('kue');

var _kue2 = _interopRequireDefault(_kue);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var redis_url = process.env['REDIS_URL'] || 'redis://127.0.0.1:6379';
var queue = _kue2['default'].createQueue({ redis: redis_url });
var jobs = {
	createRegister: function createRegister(ds) {
		var j = queue.create('register', {
			id: ds.id,
			title: 'Verificando inscritos que não receberam boleto: ' + ds.name
		}).delay(parseInt(ds.interval_update)).save();
	},
	processRegister: function processRegister(job, done) {
		if (job.data.id == undefined) {
			_models2['default'].Datasource.findAll({}).then(function (dss) {
				dss.forEach(jobs.createRegister);
			});
			done();
		} else {
			_models2['default'].Datasource.findById(job.data.id).then(function (ds) {
				jobs.createRegister(ds);
				process.env['GOOGLE_SPREADSHEET_KEY'] = ds.key;
				var prc = new _process2['default']();
				prc.setRule(new _rulesOnRegister2['default']());
				prc.run(done);
			});
		}
	},
	createConfirm: function createConfirm(ds) {
		queue.create('confirm', {
			id: ds.id,
			title: 'Confirmando inscritos que já pagaram: ' + ds.name
		}).delay(parseInt(ds.interval_update)).save();
	},
	processConfirm: function processConfirm(job, done) {
		if (job.data.id == undefined) {
			_models2['default'].Datasource.findAll({}).then(function (dss) {
				dss.forEach(jobs.createConfirm);
			});
			done();
		} else {
			_models2['default'].Datasource.findById(job.data.id).then(function (ds) {
				jobs.createConfirm(ds);
				process.env['GOOGLE_SPREADSHEET_KEY'] = ds.key;
				var prc = new _process2['default']();
				prc.setRule(new _rulesOnConfirmation2['default']());
				prc.run(done);
			});
		}
	},
	init: function init() {
		var jobR = queue.create('register', { title: 'Iniciando verificação registros.' }).save();
		var jobC = queue.create('confirm', { title: 'Iniciando confirmação inscritos.' }).save();
		queue.process('register', jobs.processRegister);
		queue.process('confirm', jobs.processConfirm);
	}
};

exports['default'] = jobs;
module.exports = exports['default'];