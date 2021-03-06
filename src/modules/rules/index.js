import async from 'async'
import Mailer from './../mailer'

/**
 * Implementa a de validação de e-mail, execução de ações de acordo com o filtro definido
 * e deve ser extendida na criação de novas regras
 */
class Rule {
	/**
	 * @param {SpreadsheetRow[]} rows - Lista de linhas disponíveis para verificação
	 * @construct
	 */
	constructor (rows = []) {
		this.rows = rows
		this.ML = new Mailer()
		this.valid = false

		this._actions = []
	}

	/**
	 * Valida o e-mail presente na linha da planilha em análise
	 * @param {string[]} row - Linha da planilha contendo informações do participante
	 * @returns {Boolean} - retorna verdadeiro se e-mail for inválido,
	 * truque para ação ser executada filtro é inválido
	 * @abstract
	 */
	filter (row) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(row['e-mail'].trim())) {
			return false
		}
		return true
	}

	/**
	 * Executa ações previamente adicionadas na regra em execução
	 * @param {Spreadsheetrow[]} row - linha que será passada para as ações
	 * @param {Function} done2 - callback
	 * @abstract
	 */
	action (row, done2) {
		let that = this;
		async.eachSeries(that.getActions(), function(action, done) {
			that[action](row, done)
		}, done2)
	}

	/**
	 * Filtra todas as linhas da planilha e executa ação nas que passarem pelo filtro
	 * @param {Function} done2 - callback
	 * @public
	 */
	validate (done2) {
		let that = this
		that.addActions()
		async.eachSeries(that.rows, function (row, done) {
			if (that.filter(row)) {
				that.action(row, done)
			} else {
				that.valid = true
				done(null, row)
			}
		}, done2)
	}

	/**
	 * Marca linha da planilha como inválida
	 * @param {Spreadsheetrow[]} row - linha que será passada para as ações
	 * @param {Function} done2 - callback
	 * @protected
	 */
	invalidateSubscriber (row, done) {
		row.status = 'Inválida'
		row.save(function(err, results) {
			done('E-mail inválido encontrado: ' + row['e-mail'])
		})
	}

	/**
	 * Envia e-mail para organizador avisando que foi encontrado e-mail inválido na planilha
	 * @param {Spreadsheetrow[]} row - linha que será passada para as ações
	 * @param {Function} done2 - callback
	 * @protected
	 */
	warningOrganizer(row, done) {
		this.ML.send ('lucaspirola@gmail.com', 'email inválido encontrado na planilha', 'conteúdo da planilha', done)
	}

	/**
	 * Adiciona ações a serem executadas para essa regra
	 * @abstract
	 */
	addActions() {
		this._actions.push('warningOrganizer')
		this._actions.push('invalidateSubscriber')
	}

	/**
	 * Retorna ações adicionadas
	 * @returns {string[]} - ações disponíveis
	 * @public
	 */
	getActions() {
		return this._actions
	}

	/**
	 * Configura módulo envio de e-mail
	 * @param {Mailer} mailer - Classe que implementa método send
	 */
	setMailer (mailer) {
		this.ML = mailer
	}

	/**
	 * Define conteúdo a ser usado como fonte de dados
	 * @param {Object[]} content - Conteúdo a ser usado nos filtros e ações
	 */
	setRows (content) {
		this.rows = content
	}
}

export default Rule
