'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _check = require('./check');

var _check2 = _interopRequireDefault(_check);

var _datasource = require('./datasource');

var _datasource2 = _interopRequireDefault(_datasource);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _mailer = require('./mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _rulesIndex = require('./rules/index');

var _rulesIndex2 = _interopRequireDefault(_rulesIndex);

var Process = (function () {
	function Process() {
		_classCallCheck(this, Process);

		this.CK = new _check2['default']();
		this.DS = new _datasource2['default']();
		this.setMailer();
		this._rule = new _rulesIndex2['default']([]);
		this.finished = false;
	}

	_createClass(Process, [{
		key: 'setMailer',
		value: function setMailer() {
			var mailer = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

			if (!mailer) {
				mailer = new _mailer2['default']();
			}
			this.ML = mailer;
			this.CK.setMailer(mailer);
		}
	}, {
		key: 'check',
		value: function check(done) {
			this.CK.isValid(done);
		}
	}, {
		key: 'run',
		value: function run() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? function (err, results) {} : arguments[0];

			var that = this;
			_async2['default'].waterfall([function (done) {
				that.readDatasource(done);
			}, function (sheet_content, done) {
				var r = that.getRule();
				that.parseRule(r, sheet_content, done);
			}], function (err, results) {
				if (!err) {
					that.finished = true;
					callback(null, ['-> Processamento finalizado com sucesso.'].join('\n'));
				} else {
					callback(['-> ' + err].join('\n'));
				}
			});
		}
	}, {
		key: 'readDatasource',
		value: function readDatasource(done) {
			this.DS.readContent(done);
		}
	}, {
		key: 'parseRule',
		value: function parseRule(r, sheet_content, done) {
			r.setRows(sheet_content);
			r.setMailer(this.ML);
			r.validate(done);
		}
	}, {
		key: 'setRule',
		value: function setRule(rule) {
			this._rule = rule;
		}
	}, {
		key: 'getRule',
		value: function getRule() {
			return this._rule;
		}
	}]);

	return Process;
})();

exports['default'] = Process;
module.exports = exports['default'];