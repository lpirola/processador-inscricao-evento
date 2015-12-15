'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

/**
 * Implementa verificação do participante se já pagou boleto,
 * se verdadeiro, faz envio de confirmação e mudança de status na planilha
 */

var Confirmation = (function (_Rules) {
	_inherits(Confirmation, _Rules);

	function Confirmation() {
		_classCallCheck(this, Confirmation);

		_get(Object.getPrototypeOf(Confirmation.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Confirmation, [{
		key: 'addActions',
		value: function addActions() {
			this._actions.push('markSubscriberMakePayment');
			this._actions.push('sendConfirmationMessage');
		}

		/**
   * Verifica se participante está marcado como quem pagou boleto
   * @param {string[]} row - Linha da planilha contendo informações do participante
   * @returns {Boolean} -
   */
	}, {
		key: 'filter',
		value: function filter(row) {
			// pegadinha com "!" por causa da validação por e-mail
			return !_get(Object.getPrototypeOf(Confirmation.prototype), 'filter', this).call(this, row) && row['status'] === 'Boleto Pago';
		}

		/**
   * Envia por e-mail mensagem de confirmação para participante
   * @param {Spreadsheetrow[]} row - linha que será passada para as ações
   * @param {Function} done2 - callback
   */
	}, {
		key: 'sendConfirmationMessage',
		value: function sendConfirmationMessage(row, done) {
			var that = this,
			    data = {
				email: row['e-mail'],
				nome: row['nomecompleto']
			};
			this.ML.send(data.email, 'Confirmação do pagamento da inscrição', 'Olá ' + data.nome + ',\n\n\t\tO pagamento da sua inscrição como participante foi confirmado.\n\n\t\tObrigado!', function (err, results) {
				that.valid = true;
				done(err, 'Confirmação de: ' + data.email);
			});
		}

		/**
   * Marca na planilha que participante está confirmado
   * @param {Spreadsheetrow[]} row - linha que será passada para as ações
   * @param {Function} done2 - callback
   */
	}, {
		key: 'markSubscriberMakePayment',
		value: function markSubscriberMakePayment(row, done) {
			row.status = 'Confirmado';
			row.save(done);
		}
	}]);

	return Confirmation;
})(_index2['default']);

exports['default'] = Confirmation;
module.exports = exports['default'];