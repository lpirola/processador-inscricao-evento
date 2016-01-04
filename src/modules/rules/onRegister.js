import Rules from './index'
import async from 'async'

/**
 * Implementa verificação no participante se já recebeu informações
 * para pagamento, as envia em caso negativo e realiza mudança de
 * status do participante na planilha
 */
class Register extends Rules{

	addActions() {
		this._actions.push('markSubscriberReceivedInstructions')
		this._actions.push('sendInstructions')
	}

	/**
	 * Valida se a linha está com a coluna status em branco e possui e-mail válido
	 * @param {string[]} row - Linha da planilha contendo informações do participante
	 * @return {Boolean}
	 * @public
	 */
	filter (row) {
		// pegadinha com "!" por causa da validação por e-mail
		return (!super.filter(row))
				&& (row['status'] === '')
				&& (row['pagamentodataxadeinscriçãor2000'] === 'Boleto Eletrônico - clique aqui')
	}

	/**
	 * Envia instruções para pagamento
	 * @param {Spreadsheetrow[]} row - linha que será passada para as ações
	 * @param {Function} done2 - callback
	 * @protected
	 */
	sendInstructions (row, done) {
		let that = this,
			data = {
			email : row['e-mail'],
			nome : row['nomecompleto'],
			link_boleto: "https://ww8.banrisul.com.br/brb/link/Brbw2Lhw_Bloqueto_Titulos_Internet.aspx?Origem=EX&CodCedente=0051101408020&Valor=20,00&SeuNumero=645364312&DiaVcto=15&MesVcto=01&AnoVcto=2016&NomeSacado=" + encodeURIComponent(row['nomecompleto']) + '&UF=' + row['estadobrasileiro'] + "&OcultarFormulario=S&Observacoes=Aten%E7%E3o%3A%20Este%20comprovante%20poder%E1%20ser%20solicitado%20no%20CREDENCIAMENTO."
		}
		this.ML.send (data.email, 'Instruções para pagamento da inscrição',
`Olá ${data.nome},

Sua inscrição como participante foi iniciada com sucesso! Clique no link abaixo para acessar o boleto e realizar o pagamento.

${data.link_boleto}

Ele poderá ser feito até 15 de janeiro de 2016 em qualquer agência bancária, lotérica ou através do seu internet banking.

A confirmação da inscrição será enviada assim que recebermos do banco responsável a confirmação de pagamento (o que pode demorar até 5 dias úteis a partir da data de pagamento).

Não esqueça de apresentar o comprovante de pagamento do boleto bancário no credenciamento.

Obrigado!`, function (err, results) {
				that.valid = true
				done(err, 'Registro de: ' + data.email)
		})
	}
	/**
	 * @param {Spreadsheetrow[]} row - linha que será passada para as ações
	 * @param {Function} done2 - callback
	 * @protected
	 */
	markSubscriberReceivedInstructions (row, done) {
		let that = this
		row.status = 'Boleto Enviado'
		return row.save(done)
	}
}

export default Register
