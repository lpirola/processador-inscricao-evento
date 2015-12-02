import nodemailer from 'nodemailer'

class Mailer {
	constructor () {
		this.mail_service = process.env['MAIL_SERVICE']
		this.mail_user    = process.env['MAIL_USER']
		this.mail_pass    = process.env['MAIL_PASS']

		this.transporter = nodemailer.createTransport({
			service: this.mail_service,
			auth: {
				user: this.mail_user,
				pass: this.mail_pass
			}
		}, {
			// default values for sendMail method
			from: 'nao-responda@forumsocialportoalegre.org.br',
		})
	}

	isConfigEmpty () {
		if (!this.mail_service || !this.mail_user || !this.mail_pass) {
			return false
		}
		return true
	}

	testSend (done) {
		this.transporter.sendMail({
			to: 'lucaspirola@gmail.com',
			subject: 'hello',
			text: 'hello world!'
		}, (err, info) => {
			if (err) {
				done('Não foi possível enviar o email de teste.', null)
			} else {
				done(null, info.response.toString())
			}
		});
	}
}

export default Mailer
