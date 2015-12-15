"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

// https://github.com/sequelize/express-example/blob/master/models/index.js

var db_url = process.env.DATABASE_URL || "mysql://root@127.0.0.1:/processador-inscricao-evento";
var sequelize = new _sequelize2["default"](db_url);
var db = {};

_fs2["default"].readdirSync(__dirname).filter(function (file) {
	return file.indexOf(".") !== 0 && file !== "index.js";
}).forEach(function (file) {
	var model = sequelize["import"](_path2["default"].join(__dirname, file));
	db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2["default"];

exports["default"] = db;
module.exports = exports["default"];