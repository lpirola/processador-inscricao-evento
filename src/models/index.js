"use strict";

// https://github.com/sequelize/express-example/blob/master/models/index.js
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var db_url    = process.env.DATABASE_URL || "mysql://root@127.0.0.1:/processador-inscricao-evento";
var sequelize = new Sequelize(db_url);
var db        = {};

fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf(".") !== 0) && (file !== "index.js");
	})
	.forEach(function(file) {
		var model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

