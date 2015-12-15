import fs        from "fs"
import path      from "path"
import Sequelize from "sequelize"
// https://github.com/sequelize/express-example/blob/master/models/index.js

let db_url    = process.env.DATABASE_URL || "mysql://root@127.0.0.1:/processador-inscricao-evento"
let sequelize = new Sequelize(db_url)
let db        = {}

fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf(".") !== 0) && (file !== "index.js")
	})
	.forEach(function(file) {
		var model = sequelize.import(path.join(__dirname, file))
		db[model.name] = model
	});

Object.keys(db).forEach(function(modelName) {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
