'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _googleSpreadsheet = require('google-spreadsheet');

var _googleSpreadsheet2 = _interopRequireDefault(_googleSpreadsheet);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

// TODO: melhorar trafego das mensagens de erro e acerto para fora da classe

var Datasource = (function () {
	function Datasource() {
		_classCallCheck(this, Datasource);

		this.google_spreadsheet_key = process.env['GOOGLE_SPREADSHEET_KEY'];
		this.creds = null;
		this.validate = false;
		if (process.env['GOOGLE_CREDS']) {
			this.creds = JSON.parse(process.env['GOOGLE_CREDS']);
		}
	}

	_createClass(Datasource, [{
		key: 'isConfigEmpty',
		value: function isConfigEmpty() {
			if (!this.google_spreadsheet_key) {
				return false;
			}
			return true;
		}
	}, {
		key: 'testConnection',
		value: function testConnection(callback) {
			var doc = new _googleSpreadsheet2['default'](this.google_spreadsheet_key);
			_async2['default'].series([function (done) {
				doc.getInfo(function (err, results) {
					if (err) {
						done('As configurações fornecidas para fonte de dados não são válidos' + err, null);
					} else {
						done(null, results);
					}
				});
			}], callback);
		}
	}, {
		key: 'readContent',
		value: function readContent(callback) {
			var doc = new _googleSpreadsheet2['default'](this.google_spreadsheet_key);
			var worksheet_id = '';
			var that = this;
			_async2['default'].waterfall([
			// Tenta autenticar com credenciais do ambiente
			function (done) {
				if (that.creds) {
					doc.useServiceAccountAuth(that.creds, done);
				} else {
					done(null);
				}
			},
			// Testa conexão e retorna infos básicas da planilha
			function (done) {
				doc.getInfo(function (err, results) {
					if (err) {
						done('As configurações fornecidas para fonte de dados não são válidos' + err, null);
					} else {
						worksheet_id = results.worksheets[0].id;
						that.validate = true;
						done(null, results);
					}
				});
			},
			// Lê conteúdo e certifica-se que planilha não está vazia
			function (sheetinfo, done) {
				doc.getRows(worksheet_id, {}, function (err, results) {
					if (err) {
						done('Problema ao tentar ler detalhes da planilha' + err, null);
					} else {
						if (parseInt(results.length) <= 1) {
							done('Datasource não pode ser vazio.');
						} else {
							that.content = results;
							done(null, results);
						}
					}
				});
			}], callback);
		}
	}]);

	return Datasource;
})();

exports['default'] = Datasource;
module.exports = exports['default'];