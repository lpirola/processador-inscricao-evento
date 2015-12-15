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
 * Implementa verificação no participante se já recebeu informações
 * para pagamento, as envia em caso negativo e realiza mudança de
 * status do participante na planilha
 */

var Register = (function (_Rules) {
	_inherits(Register, _Rules);

	function Register() {
		_classCallCheck(this, Register);

		_get(Object.getPrototypeOf(Register.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Register, [{
		key: 'addActions',
		value: function addActions() {
			this._actions.push('markSubscriberReceivedInstructions');
			this._actions.push('sendInstructions');
		}

		/**
   * Valida se a linha está com a coluna status em branco e possui e-mail válido
   * @param {string[]} row - Linha da planilha contendo informações do participante
   * @return {Boolean}
   * @public
   */
	}, {
		key: 'filter',
		value: function filter(row) {
			// pegadinha com "!" por causa da validação por e-mail
			return !_get(Object.getPrototypeOf(Register.prototype), 'filter', this).call(this, row) && row['status'] === '';
		}

		/**
   * Envia instruções para pagamento
   * @param {Spreadsheetrow[]} row - linha que será passada para as ações
   * @param {Function} done2 - callback
   * @protected
   */
	}, {
		key: 'sendInstructions',
		value: function sendInstructions(row, done) {
			var that = this,
			    data = {
				email: row['e-mail'],
				nome: row['nomecompleto'],
				link_boleto: "https://ww8.banrisul.com.br/brb/link/Brbw2Lhw_Bloqueto_Titulos_Internet.aspx?Origem=EX&CodCedente=0051101408020&Valor=20,00&SeuNumero=645364312&DiaVcto=15&MesVcto=01&AnoVcto=2016&NomeSacado=" + encodeURIComponent(row['nomecompleto']) + '&UF=' + row['estadobrasileiro'] + "&OcultarFormulario=S&Observacoes=Aten%E7%E3o%3A%20Este%20comprovante%20poder%E1%20ser%20solicitado%20no%20CREDENCIAMENTO."
			};
			this.ML.send(data.email, 'Instruções para pagamento da inscrição', 'Olá ' + data.nome + ',\n\nSua inscrição como participante foi iniciada com sucesso! Clique no link abaixo para acessar o boleto e realizar o pagamento.\n\n' + data.link_boleto + '\n\nEle poderá ser feito até 15 de janeiro de 2016 em qualquer agência bancária, lotérica ou através do seu internet banking.\n\nA confirmação da inscrição será enviada assim que recebermos do banco responsável a confirmação de pagamento (o que pode demorar até 5 dias úteis a partir da data de pagamento).\n\nObrigado!', function (err, results) {
				that.valid = true;
				done(err, 'Registro de: ' + data.email);
			});
		}

		/**
   * @param {Spreadsheetrow[]} row - linha que será passada para as ações
   * @param {Function} done2 - callback
   * @protected
   */
	}, {
		key: 'markSubscriberReceivedInstructions',
		value: function markSubscriberReceivedInstructions(row, done) {
			var that = this;
			row.status = 'Boleto Enviado';
			return row.save(done);
		}
	}]);

	return Register;
})(_index2['default']);

exports['default'] = Register;
module.exports = exports['default'];