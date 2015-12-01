class Mailer {
	constructor () {
		this.mail_service = process.env['MAIL_SERVICE']
		this.mail_user    = process.env['MAIL_USER']
		this.mail_pass    = process.env['MAIL_PASS']
	}

	isValid () {
		if (!this.mail_service || !this.mail_user || !this.mail_pass) {
			return false
		}
		return true
	}
}

export default Mailer
