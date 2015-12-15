'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _datasource = require('./datasource');

var _datasource2 = _interopRequireDefault(_datasource);

var _mailer = require('./mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var Check = (function () {
	function Check() {
		_classCallCheck(this, Check);

		this.DS = new _datasource2['default']();
		this.ML = new _mailer2['default']();
		this.validate = false;
	}

	_createClass(Check, [{
		key: 'setMailer',
		value: function setMailer(mailer) {
			this.ML = mailer;
		}
	}, {
		key: 'isValid',
		value: function isValid() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? function (err, results) {} : arguments[0];

			var that = this;

			if (!this.DS.isConfigEmpty()) {
				callback('As configurações da fonte de dados não foram informados');
			} else if (!this.ML.isConfigEmpty()) {
				callback('As configurações do envio do email não foram informados');
			} else {
				// valida datasource
				_async2['default'].series([function (done) {
					that.DS.testConnection(done);
				}, function (done) {
					that.DS.readContent(done);
				}, function (done) {
					that.ML.testSend(done);
				}], function (err, results) {
					if (!err) {
						that.validate = true;
						callback(null, ['-> Checagem de conexão com a planilha ok.', '-> Checagem de envio de e-mail ok.'].join('\n'));
					} else {
						callback(err.toString());
					}
				});
			}
		}
	}]);

	return Check;
})();

exports['default'] = Check;
module.exports = exports['default'];