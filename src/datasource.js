import GoogleSpreadsheet from 'google-spreadsheet'
import async from 'async'

class Datasource {
	constructor () {
		this.google_spreadsheet_key = process.env['GOOGLE_SPREADSHEET_KEY']
		this.creds = null
		this.validate = false
		if (process.env['GOOGLE_CREDS']) {
			this.creds = JSON.parse(process.env['GOOGLE_CREDS'])
		}
	}

	isConfigEmpty () {
		if (!this.google_spreadsheet_key) {
			return false
		}
		return true
	}

	testConnection (callback) {
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

	readContent (callback) {
		let doc = new GoogleSpreadsheet(this.google_spreadsheet_key)
		let worksheet_id = '';
		let that = this
		async.series([
			// Tenta autenticar com credenciais do ambiente
			function(done) {
				if (that.creds) {
					doc.useServiceAccountAuth(that.creds, done)
				} else {
					done(null, true)
				}
			},
			// Testa conexão e retorna infos básicas da planilha
			function(done) {
				doc.getInfo(function(err, results) {
					if (err) {
						done('As configurações fornecidas para fonte de dados não são válidos'+err, null)
					} else {
						worksheet_id = results.worksheets[0].id
						that.validate = true
						done(null, results)
					}
				})
			},
			// Lê conteúdo e certifica-se que planilha não está vazia
			function(done) {
				doc.getCells(worksheet_id, {}, function (err, results) {
					if (err) {
						done('Problema ao tentar ler detalhes da planilha' + err, null)
					} else {
						if (parseInt(results.length) < 2) {
							done('Datasource não pode ser vazio.')
						} else {
							that.content = results
							done(null, results)
						}
					}
				})
			}
		], callback)
	}
}

export default Datasource
