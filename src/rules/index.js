class Rule {
	constructor (SpreadsheetRow) {
		this.rows = SpreadsheetRow
	}

	validate () {
		return true
	}
}

export default Rule
