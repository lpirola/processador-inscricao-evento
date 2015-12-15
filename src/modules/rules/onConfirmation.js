import Rules from './index'
import async from 'async'

/**
 * Implementa verificação do participante se já pagou boleto,
 * se verdadeiro, faz envio de confirmação e mudança de status na planilha
 */
class Confirmation extends Rules {
	addActions() {
		this._actions.push('markSubscriberMakePayment')
		this._actions.push('sendConfirmationMessage')
	}

	/**
	 * Verifica se participante está marcado como quem pagou boleto
	 * @param {string[]} row - Linha da planilha contendo informações do participante
	 * @returns {Boolean} -
	 */
	filter (row) {
		// pegadinha com "!" por causa da validação por e-mail
		return (!super.filter(row)) && (row['status'] === 'Boleto Pago')
	}

	/**
	 * Envia por e-mail mensagem de confirmação para participante
	 * @param {Spreadsheetrow[]} row - linha que será passada para as ações
	 * @param {Function} done2 - callback
	 */
	sendConfirmationMessage (row, done) {
		let that = this,
			data = {
			email : row['e-mail'],
			nome : row['nomecompleto'],
		}
		this.ML.send (data.email, 'Confirmação do pagamento da inscrição',
		`Olá ${data.nome},

		O pagamento da sua inscrição como participante foi confirmado.

		Obrigado!`, function(err, results) {
			that.valid = true
			done(err, 'Confirmação de: ' + data.email)
		})
	}

	/**
	 * Marca na planilha que participante está confirmado
	 * @param {Spreadsheetrow[]} row - linha que será passada para as ações
	 * @param {Function} done2 - callback
	 */
	markSubscriberMakePayment (row, done) {
		row.status = 'Confirmado'
		row.save(done)
	}
}

export default Confirmation
