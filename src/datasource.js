class Datasource {
	constructor () {
		this.google_spreadsheet_key = process.env['GOOGLE_SPREADSHEET_KEY']
		this.google_client_email    = process.env['GOOGLE_CLIENT_EMAIL']
		this.google_private_key     = process.env['GOOGLE_PRIVATE_KEY']
	}

	isValid () {
		if (!this.google_spreadsheet_key || !this.google_client_email || !this.google_private_key) {
			return false
		}
		return true
	}
}

export default Datasource
