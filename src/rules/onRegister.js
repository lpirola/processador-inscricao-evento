import Rules from './index'
import async from 'async'

class Register extends Rules{
	constructor (SpreadsheetRows) {
		super(SpreadsheetRows)
	}

	addActions() {
		this._actions.push('sendInstructions')
		this._actions.push('markSubscriberReceivedInstructions')
	}

	filter (row) {
		// pegadinha com "!" por causa da validação por e-mail
		return (!super.filter(row)) && (row['status'] === '')
	}

	sendInstructions (row, done) {
		let data = {
			email : row['e-mail'],
			name : row['nomecompleto'],
			uf : row['estadobrasileiro'],
			link_boleto: 'https://ww8.banrisul.com.br/brb/link/Brbw2Lhw_Bloqueto_Titulos_Internet.aspx?Origem=EX&CodCedente=0051101408020&Valor=20,00&SeuNumero=645364312&DiaVcto=15&MesVcto=01&AnoVcto=2016&NomeSacado=' + this.nome + '&UF=' + this.uf + '&OcultarFormulario=S&Observacoes=Atenção: Este comprovante poderá ser solicitado no CREDENCIAMENTO.'
		}
		return this.ML.send (data.email, 'Instruções pagamento da inscrição de participante',
`Olá ${data.nome},

Sua inscrição como participante foi iniciada com sucesso!

Clique aqui ${data.link_boleto} para visualizar o boleto e poder realizar o pagamento. Ele poderá ser pago até 15 de janeiro de 2016 em qualquer agência bancária, lotérica ou através do seu internet banking.

A confirmação da inscrição será enviada assim que recebermos do banco responsável a confirmação de pagamento (o que pode demorar até 5 dias úteis a partir da data de pagamento).

Obrigado!`, done)
	}

	markSubscriberReceivedInstructions (row, done) {
		row.status = 'Boleto Enviado'
		return row.save(done)
	}
}

export default Register
