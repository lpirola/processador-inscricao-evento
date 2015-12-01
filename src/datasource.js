import GoogleSpreadsheet from 'google-spreadsheet'
import async from 'async'

class Datasource {
	constructor () {
		this.google_spreadsheet_key = process.env['GOOGLE_SPREADSHEET_KEY']
		this.creds = {}
		this.creds.client_email = process.env['GOOGLE_CLIENT_EMAIL']
		this.creds.private_key = process.env['GOOGLE_PRIVATE_KEY']
	}

	isConfigEmpty () {
		if (!this.google_spreadsheet_key) {
			return false
		}
		return true
	}

	isValidAccount (callback) {
		let doc = new GoogleSpreadsheet(this.google_spreadsheet_key)
		async.series([
			function(done){
				doc.getInfo(function(err, results) {
					if (err) {
						done('As configurações fornecidas para fonte de dados não são válidos'+err, null)
					} else {
						done(null, results)
					}
				})
			}
		], callback)
	}

	read (callback) {
		let doc = new GoogleSpreadsheet(this.google_spreadsheet_key)
		let worksheet_id = '';
		let that = this
		async.series([
			function(done) {
				if (that.creds.client_email && that.creds.private_key) {
					doc.useServiceAccountAuth(this.creds, done)
				} else {
					done(null, true)
				}
			},
			function(done) {
				doc.getInfo(function(err, results) {
					if (err) {
						done('As configurações fornecidas para fonte de dados não são válidos'+err, null)
					} else {
						worksheet_id = results.worksheets[0].id
						done(null, results)
					}
				})
			},
			function(done) {
				doc.getCells(worksheet_id, {}, function (err, results) {
					if (err) {
						done('Problema ao tentar ler detalhes da planilha' + err, null)
					} else {
						if (parseInt(results.length) < 2) {
							done('Datasource não pode ser vazio.')
						} else {
							done(null, results)
						}
					}
				})
			}
		], callback)
	}
}

export default Datasource
