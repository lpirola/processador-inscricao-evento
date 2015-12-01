var GoogleSpreadsheet = require("google-spreadsheet");

class Datasource {
	constructor () {
		this.google_spreadsheet_key = process.env['GOOGLE_SPREADSHEET_KEY']
		this.google_client_email    = process.env['GOOGLE_CLIENT_EMAIL']
		this.google_private_key     = process.env['GOOGLE_PRIVATE_KEY']
	}

	isConfigEmpty () {
		if (!this.google_spreadsheet_key || !this.google_client_email || !this.google_private_key) {
			return false
		}
		return true
	}

	isValidAccount (callback) {
		let creds = {
			client_email: this.google_client_email,
			private_key: this.google_private_key
		}
		this.doc = new GoogleSpreadsheet(this.google_spreadsheet_key)
		this.doc.useServiceAccountAuth(creds, function (err) {
			callback(err)
		})
	}

// 	read () {
// 		this.doc = new GoogleSpreadsheet(this.google_spreadsheet_key);
// 		//doc.getInfo( function(err, sheet_info){
// 	}
}

export default Datasource
