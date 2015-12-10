import Rules from './index'
import async from 'async'

class Confirmation extends Rules {
	addActions() {
		this._actions.push('markSubscriberMakePayment')
		this._actions.push('sendConfirmationMessage')
	}


	filter (row) {
		// pegadinha com "!" por causa da validação por e-mail
		return (!super.filter(row)) && (row['status'] === 'Boleto Pago')
	}

	sendConfirmationMessage (row, done) {
		let data = {
			email : row['e-mail'],
			nome : row['nomecompleto'],
		}
		return this.ML.send (data.email, 'Confirmação do pagamento da inscrição',
`Olá ${data.nome},

O pagamento da sua inscrição como participante foi confirmado.

Obrigado!`, done)
	}

	markSubscriberMakePayment (row, done) {
		let that = this
		row.status = 'Confirmado'
		return row.save(function (err, results) {
			that.valid = true
			done(err, results)
		})
	}
}

export default Confirmation
