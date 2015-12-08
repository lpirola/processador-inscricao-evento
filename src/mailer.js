import nodemailer from 'nodemailer'

class Mailer {
	constructor () {
		this.mail_service = process.env['MAIL_SERVICE']
		this.mail_user    = process.env['MAIL_USER']
		this.mail_pass    = process.env['MAIL_PASS']
		this.validate = false

		this.transporter = nodemailer.createTransport({
			service: this.mail_service,
			auth: {
				user: this.mail_user,
				pass: this.mail_pass
			}
		}, {
			// default values for sendMail method
			from: 'Fórum Social Porto Alegre <contato@forumsocialportoalegre.org.br>',
		})
	}

	setTransporter (transporter) {
		this.transporter = transporter
	}

	isConfigEmpty () {
		if (!this.mail_service || !this.mail_user || !this.mail_pass) {
			return false
		}
		return true
	}

	send (to, subject, content, done) {
		let that = this
		this.transporter.sendMail({
			to: to,
			subject: subject,
			text: content
		}, (err, info) => {
			if (err) {
				done('Não foi possível enviar o email de teste.', null)
			} else {
				that.validate = true
				done(null, info.response.toString())
			}
		});

	}

	testSend (done) {
		this.send('lucaspirola@gmail.com', 'hello', 'hello world!', done)
	}
}

export default Mailer
