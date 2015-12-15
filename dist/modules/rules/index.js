'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _mailer = require('./../mailer');

var _mailer2 = _interopRequireDefault(_mailer);

/**
 * Implementa a de validação de e-mail, execução de ações de acordo com o filtro definido
 * e deve ser extendida na criação de novas regras
 */

var Rule = (function () {
	/**
  * @param {SpreadsheetRow[]} rows - Lista de linhas disponíveis para verificação
  * @construct
  */

	function Rule() {
		var rows = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

		_classCallCheck(this, Rule);

		this.rows = rows;
		this.ML = new _mailer2['default']();
		this.valid = false;

		this._actions = [];
	}

	/**
  * Valida o e-mail presente na linha da planilha em análise
  * @param {string[]} row - Linha da planilha contendo informações do participante
  * @returns {Boolean} - retorna verdadeiro se e-mail for inválido,
  * truque para ação ser executada filtro é inválido
  * @abstract
  */

	_createClass(Rule, [{
		key: 'filter',
		value: function filter(row) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (re.test(row['e-mail'].trim())) {
				return false;
			}
			return true;
		}

		/**
   * Executa ações previamente adicionadas na regra em execução
   * @param {Spreadsheetrow[]} row - linha que será passada para as ações
   * @param {Function} done2 - callback
   * @abstract
   */
	}, {
		key: 'action',
		value: function action(row, done2) {
			var that = this;
			_async2['default'].eachSeries(that.getActions(), function (action, done) {
				that[action](row, done);
			}, done2);
		}

		/**
   * Filtra todas as linhas da planilha e executa ação nas que passarem pelo filtro
   * @param {Function} done2 - callback
   * @public
   */
	}, {
		key: 'validate',
		value: function validate(done2) {
			var that = this;
			that.addActions();
			_async2['default'].eachSeries(that.rows, function (row, done) {
				if (that.filter(row)) {
					that.action(row, done);
				} else {
					that.valid = true;
					done(null, row);
				}
			}, done2);
		}

		/**
   * Marca linha da planilha como inválida
   * @param {Spreadsheetrow[]} row - linha que será passada para as ações
   * @param {Function} done2 - callback
   * @protected
   */
	}, {
		key: 'invalidateSubscriber',
		value: function invalidateSubscriber(row, done) {
			row.status = 'Inválida';
			row.save(function (err, results) {
				done('E-mail inválido encontrado: ' + row['e-mail']);
			});
		}

		/**
   * Envia e-mail para organizador avisando que foi encontrado e-mail inválido na planilha
   * @param {Spreadsheetrow[]} row - linha que será passada para as ações
   * @param {Function} done2 - callback
   * @protected
   */
	}, {
		key: 'warningOrganizer',
		value: function warningOrganizer(row, done) {
			this.ML.send('lucaspirola@gmail.com', 'email inválido encontrado na planilha', 'conteúdo da planilha', done);
		}

		/**
   * Adiciona ações a serem executadas para essa regra
   * @abstract
   */
	}, {
		key: 'addActions',
		value: function addActions() {
			this._actions.push('warningOrganizer');
			this._actions.push('invalidateSubscriber');
		}

		/**
   * Retorna ações adicionadas
   * @returns {string[]} - ações disponíveis
   * @public
   */
	}, {
		key: 'getActions',
		value: function getActions() {
			return this._actions;
		}

		/**
   * Configura módulo envio de e-mail
   * @param {Mailer} mailer - Classe que implementa método send
   */
	}, {
		key: 'setMailer',
		value: function setMailer(mailer) {
			this.ML = mailer;
		}

		/**
   * Define conteúdo a ser usado como fonte de dados
   * @param {Object[]} content - Conteúdo a ser usado nos filtros e ações
   */
	}, {
		key: 'setRows',
		value: function setRows(content) {
			this.rows = content;
		}
	}]);

	return Rule;
})();

exports['default'] = Rule;
module.exports = exports['default'];